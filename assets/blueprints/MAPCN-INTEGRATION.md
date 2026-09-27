# MapCN Integration — Vector Maps for shadcn/ui

Synthesized from **mapcn.dev** (MapLibre GL + Tailwind CSS + shadcn/ui).

---

## Overview
MapCN provides copy-paste React vector map components built on open-source **MapLibre GL**. Unlike heavy proprietary wrappers or Google Maps iframes, MapCN components:
1. Integrate natively with shadcn/ui tokens and theme switching (Dark & Light vector tiles).
2. Support interactive markers, animated route lines, flight arcs, GeoJSON boundary layers, and popups.
3. Have zero monthly billing fees when using open tile providers (e.g. Carto, OpenStreetMap, Stadia, Protomaps).

---

## 1. Core Primitives

### Basic Map Canvas (`Map.tsx`)
```tsx
import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  theme?: 'dark' | 'light';
  children?: React.ReactNode;
}

export const Map: React.FC<MapProps> = ({
  initialCenter = [-74.006, 40.7128], // New York
  initialZoom = 12,
  theme = 'dark',
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const styleUrl = theme === 'dark'
    ? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
    : 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

  useEffect(() => {
    if (!containerRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: styleUrl,
      center: initialCenter,
      zoom: initialZoom,
      attributionControl: false,
    });
    mapRef.current = map;
    return () => map.remove();
  }, [styleUrl]);

  return (
    <div className="relative w-full h-full min-h-[350px] rounded-xl overflow-hidden border border-border">
      <div ref={containerRef} className="w-full h-full" />
      {children}
    </div>
  );
};
```

---

## 2. Animated Route Polylines (`RouteLine.tsx`)
Renders glowing paths between coordinates (e.g., delivery tracking, flight paths, fitness routes):
* Uses GeoJSON LineString with dashed line animation or gradient stroke.
* Layer styles: `line-color: hsl(var(--primary))`, `line-width: 3`, `line-blur: 1`.

---

## 3. Precision Pulsing Marker
```tsx
export const PulsingMarker = ({ label }: { label: string }) => (
  <div className="relative flex items-center justify-center">
    <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-primary opacity-75" />
    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary border-2 border-background shadow-md" />
  </div>
);
```
