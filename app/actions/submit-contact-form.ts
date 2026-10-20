"use server";

import { validateContact } from "@/lib/contact-validation";
import { serverClient } from "@/sanity/lib/serverClient";

export async function submitContactForm(formData: FormData) {
  const validated = validateContact(formData);
  if (validated.error) return { success: false, error: validated.error };
  if (!process.env.SANITY_API_TOKEN)
    return {
      success: false,
      error:
        "The contact form is temporarily unavailable. Please use the email link instead.",
    };
  try {
    await serverClient.create({
      _type: "contact",
      ...validated.values,
      submittedAt: new Date().toISOString(),
      status: "new",
    });
    return { success: true };
  } catch {
    return {
      success: false,
      error:
        "Your message could not be saved. Please try again or use the email link.",
    };
  }
}
