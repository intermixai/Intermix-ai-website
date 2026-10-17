import Link from "next/link";
export default function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Intermix AI home">
      Inter<span>mix</span>
      <sup>AI</sup>
    </Link>
  );
}
