import { notFound } from "next/navigation";
import { frameworks } from "@/lib/content";
import GatedDownloadForm from "@/components/sections/GatedDownloadForm";

export function generateStaticParams() {
  return frameworks.map((f) => ({ slug: f.slug }));
}

export default function FrameworkPage({
  params,
}: {
  params: { slug: string };
}) {
  const framework = frameworks.find((f) => f.slug === params.slug);
  if (!framework) notFound();

  return (
    <section className="section-y bg-cream">
      <div className="container-content max-w-2xl">
        <p className="eyebrow">{framework.format}</p>
        <h1 className="mt-4 text-3xl md:text-4xl">{framework.title}</h1>
        <p className="mt-4 text-charcoal">{framework.description}</p>
        <GatedDownloadForm
          frameworkSlug={framework.slug}
          frameworkTitle={framework.title}
        />
      </div>
    </section>
  );
}
