import { ImageResponse } from "next/og";
export const alt = "Intermix AI — From AI ambition to adoption";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        background: "#1C1C1E",
        color: "#F7F3EC",
        display: "flex",
        flexDirection: "column",
        padding: 72,
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontSize: 36, display: "flex" }}>
        Inter<span style={{ color: "#C4A16A" }}>mix</span>
        <span style={{ fontSize: 18, marginLeft: 12, marginTop: 5 }}>AI</span>
      </div>
      <div
        style={{
          fontSize: 82,
          lineHeight: 1.1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>From AI ambition</span>
        <span style={{ color: "#C4A16A" }}>to adoption.</span>
      </div>
      <div
        style={{
          fontSize: 22,
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #625948",
          paddingTop: 24,
        }}
      >
        <span>Review → Reframe → Run → Rise</span>
        <span>AI Adoption Review</span>
      </div>
    </div>,
    size,
  );
}
