import OperatingSystemDiagram from "@/components/shared/OperatingSystemDiagram";

export default function OperatingSystemSection() {
  return (
    <section id="operating-system" className="section-y bg-cream">
      <div className="container-content">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The Intermix Operating System</p>
          <h2 className="mt-4 text-3xl md:text-4xl">Read. Rank. Run. Rise.</h2>
          <p className="mt-6 text-charcoal">
            One method, four phases, zero guesswork. We don&apos;t start with
            technology. We start by reading your operation — then proving
            what deserves to scale, before asking for a broader commitment.
          </p>
        </div>
        <div className="mt-16">
          <OperatingSystemDiagram />
        </div>
      </div>
    </section>
  );
}
