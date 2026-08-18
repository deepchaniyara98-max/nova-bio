import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "#070b14",
          color: "#f4f7fb",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 6 }}>
          NOVA BIO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 72, lineHeight: 0.95, fontWeight: 600, maxWidth: 900 }}>
            Engineering the future of life.
          </div>
          <div style={{ fontSize: 28, color: "#8aa0b8", maxWidth: 760 }}>
            Biology, computation, and advanced engineering — in one research platform.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
