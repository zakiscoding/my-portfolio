"use server";

import { submitContactForm as submit } from "@/app/actions/submit-contact-form";

// Retain the old import path without a second submission implementation.
export async function submitContactForm(formData: FormData) {
  return submit(formData);
}
