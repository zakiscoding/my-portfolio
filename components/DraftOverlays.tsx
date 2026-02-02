import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/DisableDraftMode";

export default async function DraftOverlays() {
  const { isEnabled } = await draftMode();

  if (!isEnabled) return null;

  return (
    <>
      <VisualEditing />
      <DisableDraftMode />
    </>
  );
}
