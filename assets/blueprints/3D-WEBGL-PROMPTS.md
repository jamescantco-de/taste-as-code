# 3D & Scroll-Driven WebGL Site Prompts

Synthesized from **getlayers.ai** (Complete architectural briefs for 3D & scroll-driven sites).

---

## What Makes a 3D Site Prompt Work for AI Agents

Generic prompts (*"make a 3D website"*) fail because LLMs default to embedding an unlit spinning Three.js cube in a `div`.

A production 3D prompt must specify:
1. **Scene Composition:** Camera FOV, clipping planes, initial position, lighting rig (ambient + directional key + rim light).
2. **Scroll Hand-off:** How scroll progress maps to camera coordinates or 3D object rotation (`GSAP ScrollTrigger` or `lenis`).
3. **Canvas Depth Separation:** `z-index` layering between background canvas, WebGL floating meshes, and foreground DOM typography.
4. **Performance & Degradation:** Target 60/120 FPS via instanced meshes, pixel ratio clamping (`min(window.devicePixelRatio, 2)`), and reduced-motion fallback.

---

## 1. Archetype: The Orbital Product Stage (Three.js / React Three Fiber)
```text
Build a scroll-driven 3D landing page using React Three Fiber (@react-three/fiber) and @react-three/drei.

SCENE ARCHITECTURE:
- Canvas fills the viewport (fixed position, z-0).
- PerspectiveCamera at position [0, 0, 5] with FOV 45.
- Environment: Dark studio HDRI with two accent rim lights (#4F46E5 and #06B6D4) creating high-contrast edge reflections.
- Central Model: A precision metallic device (use standard PBR metallic roughness: metalness 0.9, roughness 0.15).

SCROLL INTERACTION:
- Section 1 (0% scroll): Hero angle — front-facing with slow floating idle wobble.
- Section 2 (33% scroll): Camera sweeps smoothly to side profile as headline "Precision Machined" enters from right.
- Section 3 (66% scroll): Model explodes slightly into internal component layers (expanded exploded view).
- Section 4 (100% scroll): Camera pulls back into top-down silhouette over the pricing cards.

DOM OVERLAY:
- Clean HTML content with pointer-events-none over canvas, buttons with pointer-events-auto.
- Smooth scroll driven by Lenis.
```

---

## 2. Archetype: The Fluid Cybernetic Particle Canvas
```text
Build an interactive WebGL particle wave canvas hero section.

CANVAS SPEC:
- 15,000 points arranged in a 2D undulating grid using custom BufferGeometry.
- Custom vertex shader with Perlin noise displacing Z-height based on time + cursor proximity.
- Color gradient across height: deep violet (#1e1b4b) at troughs to electric cyan (#22d3ee) at crests.
- Cursor interaction: Mouse position creates a dampening ripple wave across nearby particles.

HERO TYPOGRAPHY:
- Monospaced eyebrow: "SYS_STATUS: NOMINAL"
- Giant display title with mix-blend-mode: difference.
- Floating glassmorphic command palette.
```
