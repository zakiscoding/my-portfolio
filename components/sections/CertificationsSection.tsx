import { ArrowUpRight, Award } from "lucide-react";
import Image from "next/image";
import { defineQuery } from "next-sanity";
import { CometCard } from "@/components/ui/comet-card";
import { supplementalCertifications } from "@/lib/portfolio";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { SectionHeading } from "./SectionHeading";

const CERTIFICATIONS_QUERY =
  defineQuery(`*[_type == "certification"] | order(issueDate desc){
  name,
  issuer,
  issueDate,
  expiryDate,
  credentialId,
  credentialUrl,
  logo,
  description,
  skills[]->{name, category},
  order
}`);

export async function CertificationsSection() {
  const { data: certifications } = await sanityFetch({
    query: CERTIFICATIONS_QUERY,
  });
  const credentials = [
    ...supplementalCertifications,
    ...(certifications ?? []).filter(
      (cert) =>
        !supplementalCertifications.some(
          (local) =>
            local.credentialUrl === cert.credentialUrl ||
            local.name === cert.name,
        ),
    ),
  ];

  return (
    <section id="certifications" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          title="Certifications"
          description="Professional credentials in cloud engineering and machine learning"
        />
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {credentials.map((cert) => (
            <CometCard
              key={`${cert.issuer}-${cert.name}`}
              rotateDepth={4}
              translateDepth={4}
              className="h-full"
            >
              <article className="h-full bg-card border rounded-xl p-5 md:p-6 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="relative size-12 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
                    {cert.logo ? (
                      <Image
                        src={urlFor(cert.logo).width(64).height(64).url()}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-contain p-2"
                      />
                    ) : (
                      <Award
                        aria-hidden="true"
                        className="size-6 text-primary"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {cert.issuer}
                    </p>
                    <h3 className="text-xl font-semibold leading-snug">
                      {cert.name}
                    </h3>
                  </div>
                </div>
                {cert.issueDate && (
                  <p className="text-sm text-muted-foreground">
                    Issued{" "}
                    {new Date(
                      `${cert.issueDate.slice(0, 10)}T00:00:00Z`,
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </p>
                )}
                {cert.credentialId && (
                  <p className="text-sm text-muted-foreground break-all">
                    <span className="font-medium text-foreground">
                      Credential ID:{" "}
                    </span>
                    {cert.credentialId}
                  </p>
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verify ${cert.name} (opens in new tab)`}
                    className="mt-auto self-start inline-flex items-center gap-2 border rounded-lg px-3 py-2 text-sm hover:bg-accent transition-colors"
                  >
                    Verify credential
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                )}
              </article>
            </CometCard>
          ))}
        </div>
      </div>
    </section>
  );
}
