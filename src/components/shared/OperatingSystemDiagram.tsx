import { site } from "@/lib/site";
export default function OperatingSystemDiagram() {
  return (
    <ol className="method-diagram" aria-label="The Four Rs in sequence">
      {site.phases.map((phase, i) => (
        <li key={phase.name}>
          <span className="method-node" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{phase.name}</span>
        </li>
      ))}
    </ol>
  );
}
