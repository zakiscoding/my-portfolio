"use server";

import {
  contactNotificationConfig,
  sendContactNotification,
} from "@/lib/contact-notification";
import { validateContact } from "@/lib/contact-validation";
import { serverClient } from "@/sanity/lib/serverClient";

export async function submitContactForm(formData: FormData) {
  const validated = validateContact(formData);
  if (validated.error) return { success: false, error: validated.error };
  const canStore = Boolean(process.env.SANITY_API_TOKEN);
  const canEmail = Boolean(contactNotificationConfig(process.env));
  if (!canStore && !canEmail)
    return {
      success: false,
      error:
        "The contact form is temporarily unavailable. Please use the email link instead.",
    };

  let stored = false;
  if (canStore) {
    try {
      await serverClient.create({
        _type: "contact",
        ...validated.values,
        submittedAt: new Date().toISOString(),
        status: "new",
      });
      stored = true;
    } catch {
      console.error("Contact form: saving to Sanity failed");
    }
  }

  const notification = await sendContactNotification(validated.values);
  if (canEmail && !notification.sent)
    console.error(
      `Contact form: email notification failed (${notification.reason})`,
    );

  // A saved message is not lost even if the notification fails.
  if (stored || notification.sent) return { success: true };
  return {
    success: false,
    error:
      "Your message could not be sent. Please try again or use the email link.",
  };
}
