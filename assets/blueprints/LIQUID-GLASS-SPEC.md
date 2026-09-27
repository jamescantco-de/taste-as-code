# Liquid Glass — Apple-Style DOM Refraction Spec

Synthesized from **glass.samasante.com** (`@samasante/liquid-glass`).

---

## Overview
Liquid Glass creates real optical refraction over live DOM elements (text, cards, images, video) across Chrome, Safari, and Firefox with zero heavy 3D dependencies.

Unlike standard `backdrop-filter: blur()`, liquid glass dynamically distorts the light passing through the lens boundary, simulating physical glass bevels, specular sheen, and surface curvature.

---

## Package & Installation
```bash
# Package reference
@samasante/liquid-glass
```

## Core API & Usage
```tsx
import { LiquidGlass } from '@samasante/liquid-glass';

export function GlassCard() {
  return (
    <div className="relative p-8 rounded-2xl overflow-hidden">
      {/* Background content being refracted */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500" />
      
      {/* Refraction Lens Container */}
      <LiquidGlass
        refraction={0.35}       // Refraction intensity index
        bevelWidth={3.5}        // Thickness of edge bevel
        sheenFalloff={1.7}      // Optical sheen decay
        glow={0.1}              // Ambient border luminescence
        className="rounded-2xl border border-white/20 shadow-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white tracking-tight">Liquid Glass Lens</h2>
        <p className="text-white/80 text-sm mt-1">Live DOM elements underneath refract physically as you scroll.</p>
      </LiquidGlass>
    </div>
  );
}
```

---

## CSS-Only Fallback (Zero-Dependency)
For environments where WebGL/Canvas shaders are not loaded, use this optical physics approximation:

```css
.liquid-glass-fallback {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 
    0 8px 32px 0 rgba(0, 0, 0, 0.37),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 0 rgba(0, 0, 0, 0.4);
}
```
