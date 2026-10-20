"use client";

import { useState, useTransition } from "react";
import { submitContactForm } from "@/app/actions/submit-contact-form";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus({ type: null, message: "" });
    startTransition(async () => {
      try {
        const result = await submitContactForm(formData);
        if (result.success) {
          setStatus({
            type: "success",
            message: "Thank you! Your message has been received.",
          });
          form.reset();
        } else {
          setStatus({
            type: "error",
            message:
              result.error ||
              "Your message could not be sent. Please try again.",
          });
        }
      } catch {
        setStatus({
          type: "error",
          message: "Could not connect. Please try again or use the email link.",
        });
      }
    });
  };

  return (
    <div className="bg-card border rounded-xl p-5 md:p-6">
      <h3 className="text-xl font-semibold mb-6">Send a Message</h3>

      {status.type && (
        <div
          role={status.type === "error" ? "alert" : "status"}
          className={`mb-4 p-3 rounded-lg text-sm ${
            status.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
          }`}
        >
          {status.message}
        </div>
      )}

      <form aria-busy={isPending} className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            maxLength={100}
            className="w-full px-3 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-base"
            placeholder="Your name"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            maxLength={254}
            className="w-full px-3 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-base"
            placeholder="your.email@example.com"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            maxLength={200}
            className="w-full px-3 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-base"
            placeholder="What's this about?"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            maxLength={5000}
            rows={5}
            className="w-full px-3 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-y text-base"
            placeholder="Tell me about your project..."
            required
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
