export type TwinSource = { label: string; href: string };
export type SourceEntry = TwinSource & { terms: string[] };
export function matchTwinSources(
  text: string,
  catalog: SourceEntry[],
): TwinSource[] {
  const normalized = ` ${text.toLowerCase().replace(/[^a-z0-9]+/g, " ")} `;
  const selected = catalog.filter((source) =>
    source.terms.some((term) =>
      normalized.includes(
        ` ${term.toLowerCase().replace(/[^a-z0-9]+/g, " ")} `,
      ),
    ),
  );
  return selected
    .filter(
      (source, index) =>
        selected.findIndex((item) => item.href === source.href) === index,
    )
    .slice(0, 4)
    .map(({ label, href }) => ({ label, href }));
}
