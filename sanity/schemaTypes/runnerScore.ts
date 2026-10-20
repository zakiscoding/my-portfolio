import { defineField, defineType } from "sanity";
export default defineType({
  name: "runnerScore",
  title: "Runner high score",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Player",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "score",
      title: "High score",
      type: "number",
      validation: (rule) => rule.required().integer().min(0).max(100000),
    }),
  ],
  preview: { select: { title: "name", subtitle: "score" } },
});
