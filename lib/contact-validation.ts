export function validateContact(formData: FormData) {
  const fields = ["name", "email", "subject", "message"] as const;
  const limits = { name: 100, email: 254, subject: 200, message: 5000 };
  const values = { name: "", email: "", subject: "", message: "" };
  for (const field of fields) {
    const value = formData.get(field);
    if (typeof value !== "string" || !value.trim())
      return { error: "Please fill in all required fields." } as const;
    if (value.trim().length > limits[field])
      return { error: `${field} is too long.` } as const;
    values[field] = value.trim();
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    return { error: "Please enter a valid email address." } as const;
  return { values } as const;
}
