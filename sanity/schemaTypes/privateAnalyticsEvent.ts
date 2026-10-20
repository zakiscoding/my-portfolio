import { defineField, defineType } from "sanity";
export default defineType({
  name: "privateAnalyticsEvent",
  title: "Encrypted analytics event",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "payload", type: "text", title: "Encrypted payload" }),
    defineField({ name: "nonce", type: "string", title: "Nonce" }),
    defineField({ name: "tag", type: "string", title: "Authentication tag" }),
  ],
  preview: {
    prepare: () => ({
      title: "Encrypted visitor event",
      subtitle: "View in the private analytics dashboard",
    }),
  },
});
