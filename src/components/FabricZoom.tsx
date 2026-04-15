import { useState, useRef, useCallback } from "react";

interface FabricZoomProps {
  src: string;
  alt: string;
}

export default function FabricZoom({ src, alt }: FabricZoomProps) {
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }, []);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="group relative cursor-crosshair overflow-hidden"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={src}
          alt={alt}
          className="aspect-[3/4] w-full object-cover"
          width={800}
          height={1000}
        />

        {/* Zoom overlay */}
        {isZooming && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "250%",
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              backgroundRepeat: "no-repeat",
            }}
          />
        )}

        {/* Gold ring magnifier indicator */}
        {isZooming && (
          <div
            className="pointer-events-none absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${zoomPos.x}%`,
              top: `${zoomPos.y}%`,
              boxShadow: "0 0 0 2px var(--gold-bright), 0 0 20px rgba(212, 175, 55, 0.3)",
            }}
          />
        )}
      </div>

      {/* Zoom instruction */}
      <p className="mt-3 text-center font-body text-xs text-muted-foreground">
        Hover over the image to zoom into fabric detail
      </p>
    </div>
  );
}
