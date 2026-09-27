# 90 Pure-CSS Text Effects & LLM Prompts

Extracted from [text-effects.colorion.co](https://text-effects.colorion.co).
Zero-JS, zero-dependency pure CSS text animations with exact generation prompts.

### 01. Borealis (`aurora`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Borealis" text effect applied to the word "AURORA": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-aurora">AURORA</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 01 Borealis — aurora gradient drifting through the letters */
.fx-aurora {
  font: 600 30px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .06em;
  background: linear-gradient(115deg, var(--ink-2), var(--ink-3), var(--ink-2), var(--ink-3)) 0 0 / 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: fx-aurora 7s linear infinite;
}
@keyframes fx-aurora {
  0%   { background-position: 0% 50%;   filter: hue-rotate(0deg); }
  100% { background-position: 300% 50%; filter: hue-rotate(360deg); }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "AURORA" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-aurora">AURORA</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 01 Borealis — aurora gradient drifting through the letters */
.fx-aurora {
  font: 600 30px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .06em;
  background: linear-gradient(115deg, var(--ink-2), var(--ink-3), var(--ink-2), var(--ink-3)) 0 0 / 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: fx-aurora 7s linear infinite;
}
@keyframes fx-aurora {
  0%   { background-position: 0% 50%;   filter: hue-rotate(0deg); }
  100% { background-position: 300% 50%; filter: hue-rotate(360deg); }
}
```

---

### 02. Glitchcore (`glitch`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Glitchcore" text effect applied to the word "GLITCH": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-glitch" data-text="GLITCH">GLITCH</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 02 Glitchcore — RGB channel-split glitch with sliced jumps */
.fx-glitch {
  position: relative;
  font: 600 30px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .06em;
  color: var(--ink);
}
.fx-glitch::before, .fx-glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
}
.fx-glitch::before {
  color: var(--ink-2);
  clip-path: inset(0 0 55% 0);
  animation: fx-glitch-a 2.6s steps(1) infinite;
}
.fx-glitch::after {
  color: var(--ink-3);
  clip-path: inset(45% 0 0 0);
  animation: fx-glitch-b 2.6s steps(1) infinite;
}
@keyframes fx-glitch-a {
  0%, 12%, 20%, 55%, 100% { transform: translate(0); opacity: 0; }
  13% { transform: translate(-5px, -2px); opacity: .9; }
  16% { transform: translate(4px, 1px);   opacity: .9; }
  48% { transform: translate(-3px, 2px);  opacity: .9; }
  51% { transform: translate(2px, -1px);  opacity: .9; }
}
@keyframes fx-glitch-b {
  0%, 14%, 22%, 60%, 100% { transform: translate(0); opacity: 0; }
  15% { transform: translate(5px, 2px);   opacity: .9; }
  18% { transform: translate(-4px, -1px); opacity: .9; }
  52% { transform: translate(3px, -2px);  opacity: .9; }
  56% { transform: translate(-2px, 1px);  opacity: .9; }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "GLITCH" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-glitch" data-text="GLITCH">GLITCH</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 02 Glitchcore — RGB channel-split glitch with sliced jumps */
.fx-glitch {
  position: relative;
  font: 600 30px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .06em;
  color: var(--ink);
}
.fx-glitch::before, .fx-glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
}
.fx-glitch::before {
  color: var(--ink-2);
  clip-path: inset(0 0 55% 0);
  animation: fx-glitch-a 2.6s steps(1) infinite;
}
.fx-glitch::after {
  color: var(--ink-3);
  clip-path: inset(45% 0 0 0);
  animation: fx-glitch-b 2.6s steps(1) infinite;
}
@keyframes fx-glitch-a {
  0%, 12%, 20%, 55%, 100% { transform: translate(0); opacity: 0; }
  13% { transform: translate(-5px, -2px); opacity: .9; }
  16% { transform: translate(4px, 1px);   opacity: .9; }
  48% { transform: translate(-3px, 2px);  opacity: .9; }
  51% { transform: translate(2px, -1px);  opacity: .9; }
}
@keyframes fx-glitch-b {
  0%, 14%, 22%, 60%, 100% { transform: translate(0); opacity: 0; }
  15% { transform: translate(5px, 2px);   opacity: .9; }
  18% { transform: translate(-4px, -1px); opacity: .9; }
  52% { transform: translate(3px, -2px);  opacity: .9; }
  56% { transform: translate(-2px, 1px);  opacity: .9; }
}
```

---

### 03. Teletype (`typewriter`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Teletype" text effect applied to the word "TYPEWRITER": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-typewriter">TYPEWRITER</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 03 Teletype — typewriter with blinking caret (word must match the ch width) */
.fx-typewriter {
  font: 600 24px/1.2 "JetBrains Mono", monospace;
  letter-spacing: 0;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  width: 10ch; /* = number of characters typed */
  border-right: .55ch solid var(--ink-2);
  animation: fx-type 3.6s steps(10) infinite,
             fx-caret .65s steps(1) infinite;
}
@keyframes fx-type {
  0%, 8%    { width: 0; }
  55%, 100% { width: 10ch; }
}
@keyframes fx-caret {
  50% { border-color: transparent; }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "TYPEWRITER" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-typewriter">TYPEWRITER</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 03 Teletype — typewriter with blinking caret (word must match the ch width) */
.fx-typewriter {
  font: 600 24px/1.2 "JetBrains Mono", monospace;
  letter-spacing: 0;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  width: 10ch; /* = number of characters typed */
  border-right: .55ch solid var(--ink-2);
  animation: fx-type 3.6s steps(10) infinite,
             fx-caret .65s steps(1) infinite;
}
@keyframes fx-type {
  0%, 8%    { width: 0; }
  55%, 100% { width: 10ch; }
}
@keyframes fx-caret {
  50% { border-color: transparent; }
}
```

---

### 04. Neon-Haus (`neon`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Neon-Haus" text effect applied to the word "NEON": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-neon">NEON</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 04 Neon-Haus — buzzing neon sign with unstable tube flicker */
.fx-neon {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .14em;
  color: var(--ink);
  animation: fx-neon 3.2s linear infinite;
}
@keyframes fx-neon {
  0%, 18%, 21%, 24%, 100% {
    opacity: 1;
    text-shadow:
      0 0 4px var(--ink),
      0 0 11px var(--ink-2),
      0 0 24px var(--ink-2),
      0 0 48px var(--ink-2);
  }
  19%, 22%, 62% {
    opacity: .35;
    text-shadow: none;
  }
  63%, 64.5% {
    opacity: .6;
    text-shadow: 0 0 4px var(--ink-2);
  }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "NEON" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-neon">NEON</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 04 Neon-Haus — buzzing neon sign with unstable tube flicker */
.fx-neon {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .14em;
  color: var(--ink);
  animation: fx-neon 3.2s linear infinite;
}
@keyframes fx-neon {
  0%, 18%, 21%, 24%, 100% {
    opacity: 1;
    text-shadow:
      0 0 4px var(--ink),
      0 0 11px var(--ink-2),
      0 0 24px var(--ink-2),
      0 0 48px var(--ink-2);
  }
  19%, 22%, 62% {
    opacity: .35;
    text-shadow: none;
  }
  63%, 64.5% {
    opacity: .6;
    text-shadow: 0 0 4px var(--ink-2);
  }
}
```

---

### 05. Aqua-Fill (`liquid`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Aqua-Fill" text effect applied to the word "LIQUID": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-liquid">LIQUID</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 05 Aqua-Fill — the word fills with liquid that rises and drains */
.fx-liquid {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .06em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in srgb, var(--ink-3) 65%, transparent);
  background: linear-gradient(0deg,
      var(--ink-3) 0 46%,
      color-mix(in srgb, var(--ink-3) 55%, transparent) 48%,
      transparent 52% 100%
    ) 0 0 / 100% 220%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: fx-liquid 3.4s ease-in-out infinite;
}
@keyframes fx-liquid {
  0%, 100% { background-position: 0 -110%; }
  50%      { background-position: 0 10%; }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "LIQUID" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-liquid">LIQUID</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 05 Aqua-Fill — the word fills with liquid that rises and drains */
.fx-liquid {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .06em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in srgb, var(--ink-3) 65%, transparent);
  background: linear-gradient(0deg,
      var(--ink-3) 0 46%,
      color-mix(in srgb, var(--ink-3) 55%, transparent) 48%,
      transparent 52% 100%
    ) 0 0 / 100% 220%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: fx-liquid 3.4s ease-in-out infinite;
}
@keyframes fx-liquid {
  0%, 100% { background-position: 0 -110%; }
  50%      { background-position: 0 10%; }
}
```

---

### 06. Chromia (`chrome`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Chromia" text effect applied to the word "CHROME": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-chrome">CHROME</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 06 Chromia — brushed-metal letters with a passing sheen */
.fx-chrome {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .06em;
  background: linear-gradient(105deg,
      color-mix(in srgb, var(--ink) 40%, transparent) 0 38%,
      var(--ink) 47%,
      #fff 50%,
      var(--ink) 53%,
      color-mix(in srgb, var(--ink) 40%, transparent) 62% 100%
    ) 0 0 / 260% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: fx-chrome 2.8s ease-in-out infinite;
}
@keyframes fx-chrome {
  0%   { background-position: 130% 0; }
  60%, 100% { background-position: -130% 0; }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "CHROME" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-chrome">CHROME</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 06 Chromia — brushed-metal letters with a passing sheen */
.fx-chrome {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .06em;
  background: linear-gradient(105deg,
      color-mix(in srgb, var(--ink) 40%, transparent) 0 38%,
      var(--ink) 47%,
      #fff 50%,
      var(--ink) 53%,
      color-mix(in srgb, var(--ink) 40%, transparent) 62% 100%
    ) 0 0 / 260% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: fx-chrome 2.8s ease-in-out infinite;
}
@keyframes fx-chrome {
  0%   { background-position: 130% 0; }
  60%, 100% { background-position: -130% 0; }
}
```

---

### 07. Lens-Drift (`focus`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Lens-Drift" text effect applied to the word "FOCUS": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-focus" role="img" aria-label="FOCUS"><b aria-hidden="true" style="--i:0">F</b><b aria-hidden="true" style="--i:1">O</b><b aria-hidden="true" style="--i:2">C</b><b aria-hidden="true" style="--i:3">U</b><b aria-hidden="true" style="--i:4">S</b></div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 07 Lens-Drift — letters slip in and out of focus, one after another */
.fx-focus {
  font: 600 30px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .08em;
  color: var(--ink);
}
.fx-focus b {
  font-weight: inherit;
  display: inline-block;
  animation: fx-focus 2.6s ease-in-out infinite;
  animation-delay: calc(var(--i) * .18s);
}
@keyframes fx-focus {
  0%, 100% { filter: blur(0);   opacity: 1; }
  50%      { filter: blur(7px); opacity: .35; }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "FOCUS" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-focus" role="img" aria-label="FOCUS"><b aria-hidden="true" style="--i:0">F</b><b aria-hidden="true" style="--i:1">O</b><b aria-hidden="true" style="--i:2">C</b><b aria-hidden="true" style="--i:3">U</b><b aria-hidden="true" style="--i:4">S</b></div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 07 Lens-Drift — letters slip in and out of focus, one after another */
.fx-focus {
  font: 600 30px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .08em;
  color: var(--ink);
}
.fx-focus b {
  font-weight: inherit;
  display: inline-block;
  animation: fx-focus 2.6s ease-in-out infinite;
  animation-delay: calc(var(--i) * .18s);
}
@keyframes fx-focus {
  0%, 100% { filter: blur(0);   opacity: 1; }
  50%      { filter: blur(7px); opacity: .35; }
}
```

---

### 08. Tidal-Type (`wave`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Tidal-Type" text effect applied to the word "WAVE": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-wave" role="img" aria-label="WAVE"><b aria-hidden="true" style="--i:0">W</b><b aria-hidden="true" style="--i:1">A</b><b aria-hidden="true" style="--i:2">V</b><b aria-hidden="true" style="--i:3">E</b></div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 08 Tidal-Type — letters ride a rolling sine wave */
.fx-wave {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .1em;
  color: var(--ink-3);
}
.fx-wave b {
  font-weight: inherit;
  display: inline-block;
  animation: fx-wave 1.3s ease-in-out infinite;
  animation-delay: calc(var(--i) * -.14s);
}
@keyframes fx-wave {
  0%, 100% { transform: translateY(7px); }
  50%      { transform: translateY(-7px); }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "WAVE" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-wave" role="img" aria-label="WAVE"><b aria-hidden="true" style="--i:0">W</b><b aria-hidden="true" style="--i:1">A</b><b aria-hidden="true" style="--i:2">V</b><b aria-hidden="true" style="--i:3">E</b></div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 08 Tidal-Type — letters ride a rolling sine wave */
.fx-wave {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .1em;
  color: var(--ink-3);
}
.fx-wave b {
  font-weight: inherit;
  display: inline-block;
  animation: fx-wave 1.3s ease-in-out infinite;
  animation-delay: calc(var(--i) * -.14s);
}
@keyframes fx-wave {
  0%, 100% { transform: translateY(7px); }
  50%      { transform: translateY(-7px); }
}
```

---

### 09. Bisect (`sliced`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Bisect" text effect applied to the word "SLICED": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-sliced" data-text="SLICED">SLICED</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 09 Bisect — the word is sliced horizontally; halves drift apart and re-align */
.fx-sliced {
  position: relative;
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .06em;
  color: transparent;
}
.fx-sliced::before, .fx-sliced::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  color: var(--ink);
}
.fx-sliced::before {
  clip-path: inset(0 0 50% 0);
  animation: fx-sliced-top 3s ease-in-out infinite;
}
.fx-sliced::after {
  clip-path: inset(50% 0 0 0);
  animation: fx-sliced-bot 3s ease-in-out infinite;
}
@keyframes fx-sliced-top {
  0%, 22%, 78%, 100% { transform: translateX(0); }
  38%, 62% { transform: translateX(8px); color: var(--ink-2); }
}
@keyframes fx-sliced-bot {
  0%, 22%, 78%, 100% { transform: translateX(0); }
  38%, 62% { transform: translateX(-8px); color: var(--ink-3); }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "SLICED" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-sliced" data-text="SLICED">SLICED</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 09 Bisect — the word is sliced horizontally; halves drift apart and re-align */
.fx-sliced {
  position: relative;
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .06em;
  color: transparent;
}
.fx-sliced::before, .fx-sliced::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  color: var(--ink);
}
.fx-sliced::before {
  clip-path: inset(0 0 50% 0);
  animation: fx-sliced-top 3s ease-in-out infinite;
}
.fx-sliced::after {
  clip-path: inset(50% 0 0 0);
  animation: fx-sliced-bot 3s ease-in-out infinite;
}
@keyframes fx-sliced-top {
  0%, 22%, 78%, 100% { transform: translateX(0); }
  38%, 62% { transform: translateX(8px); color: var(--ink-2); }
}
@keyframes fx-sliced-bot {
  0%, 22%, 78%, 100% { transform: translateX(0); }
  38%, 62% { transform: translateX(-8px); color: var(--ink-3); }
}
```

---

### 10. Cipher (`decoder`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Cipher" text effect applied to the word "DECODER": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-decoder" role="img" aria-label="DECODER"></div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 10 Cipher — scrambled characters decode into the word, then re-encrypt */
.fx-decoder {
  font: 600 28px/1.2 "JetBrains Mono", monospace;
  letter-spacing: .08em;
  color: var(--ink-3);
}
.fx-decoder::after {
  content: "▓K#R1&Q";
  animation: fx-decoder 4s steps(1) infinite;
}
@keyframes fx-decoder {
  0%   { content: "▓K#R1&Q"; color: var(--ink-3); }
  8%   { content: "D%#OD3▒"; }
  16%  { content: "DE☰O*ER"; }
  24%  { content: "DEC0D£R"; }
  32%  { content: "DECOD€R"; }
  40%, 82% { content: "DECODER"; color: var(--ink); }
  88%  { content: "D3C0*€R"; color: var(--ink-3); }
  94%  { content: "▒#COD1Q"; }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "DECODER" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-decoder" role="img" aria-label="DECODER"></div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 10 Cipher — scrambled characters decode into the word, then re-encrypt */
.fx-decoder {
  font: 600 28px/1.2 "JetBrains Mono", monospace;
  letter-spacing: .08em;
  color: var(--ink-3);
}
.fx-decoder::after {
  content: "▓K#R1&Q";
  animation: fx-decoder 4s steps(1) infinite;
}
@keyframes fx-decoder {
  0%   { content: "▓K#R1&Q"; color: var(--ink-3); }
  8%   { content: "D%#OD3▒"; }
  16%  { content: "DE☰O*ER"; }
  24%  { content: "DEC0D£R"; }
  32%  { content: "DECOD€R"; }
  40%, 82% { content: "DECODER"; color: var(--ink); }
  88%  { content: "D3C0*€R"; color: var(--ink-3); }
  94%  { content: "▒#COD1Q"; }
}
```

---

### 11. Redactor (`scanner`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Redactor" text effect applied to the word "SCANNER": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-scanner">SCANNER</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 11 Redactor — a scanning bar sweeps the word, lighting letters as it passes */
.fx-scanner {
  position: relative;
  font: 600 28px/1.2 "JetBrains Mono", monospace;
  letter-spacing: .08em;
  background: linear-gradient(90deg,
      color-mix(in srgb, var(--ink) 25%, transparent) 0 40%,
      var(--ink) 50%,
      color-mix(in srgb, var(--ink) 25%, transparent) 60% 100%
    ) 0 0 / 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: fx-scan-glow 2.6s ease-in-out infinite alternate;
}
.fx-scanner::after {
  content: "";
  position: absolute;
  top: -6px;
  bottom: -6px;
  left: 0;
  width: 3px;
  background: var(--ink-2);
  box-shadow: 0 0 14px var(--ink-2);
  animation: fx-scan-bar 2.6s ease-in-out infinite alternate;
}
@keyframes fx-scan-glow {
  0%   { background-position: 100% 0; }
  100% { background-position: 0% 0; }
}
@keyframes fx-scan-bar {
  0%   { left: 0; transform: translateX(0); }
  100% { left: 100%; transform: translateX(-100%); }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "SCANNER" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-scanner">SCANNER</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 11 Redactor — a scanning bar sweeps the word, lighting letters as it passes */
.fx-scanner {
  position: relative;
  font: 600 28px/1.2 "JetBrains Mono", monospace;
  letter-spacing: .08em;
  background: linear-gradient(90deg,
      color-mix(in srgb, var(--ink) 25%, transparent) 0 40%,
      var(--ink) 50%,
      color-mix(in srgb, var(--ink) 25%, transparent) 60% 100%
    ) 0 0 / 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: fx-scan-glow 2.6s ease-in-out infinite alternate;
}
.fx-scanner::after {
  content: "";
  position: absolute;
  top: -6px;
  bottom: -6px;
  left: 0;
  width: 3px;
  background: var(--ink-2);
  box-shadow: 0 0 14px var(--ink-2);
  animation: fx-scan-bar 2.6s ease-in-out infinite alternate;
}
@keyframes fx-scan-glow {
  0%   { background-position: 100% 0; }
  100% { background-position: 0% 0; }
}
@keyframes fx-scan-bar {
  0%   { left: 0; transform: translateX(0); }
  100% { left: 100%; transform: translateX(-100%); }
}
```

---

### 12. Emberglow (`ember`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Emberglow" text effect applied to the word "EMBER": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-ember">EMBER</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 12 Emberglow — letters smoulder under rising fire light */
.fx-ember {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .1em;
  color: #ffd9a0;
  animation: fx-ember 1.7s ease-in-out infinite alternate;
}
@keyframes fx-ember {
  0% {
    text-shadow:
      0 -2px 6px  #ffab40,
      0 -6px 14px #ff6d00,
      0 -12px 28px #dd2c00,
      0 -20px 44px rgba(213, 0, 0, .55);
  }
  100% {
    text-shadow:
      0 -3px 8px  #ffc46b,
      0 -9px 20px #ff8f1f,
      0 -18px 38px #ff3d00,
      0 -30px 60px rgba(213, 0, 0, .8);
  }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "EMBER" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-ember">EMBER</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 12 Emberglow — letters smoulder under rising fire light */
.fx-ember {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .1em;
  color: #ffd9a0;
  animation: fx-ember 1.7s ease-in-out infinite alternate;
}
@keyframes fx-ember {
  0% {
    text-shadow:
      0 -2px 6px  #ffab40,
      0 -6px 14px #ff6d00,
      0 -12px 28px #dd2c00,
      0 -20px 44px rgba(213, 0, 0, .55);
  }
  100% {
    text-shadow:
      0 -3px 8px  #ffc46b,
      0 -9px 20px #ff8f1f,
      0 -18px 38px #ff3d00,
      0 -30px 60px rgba(213, 0, 0, .8);
  }
}
```

---

### 13. Echo-Verse (`echo`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Echo-Verse" text effect applied to the word "ECHO": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-echo" data-text="ECHO">ECHO</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 13 Echo-Verse — ghost copies of the word ripple outward */
.fx-echo {
  position: relative;
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .12em;
  color: var(--ink);
}
.fx-echo::before, .fx-echo::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  animation: fx-echo 2s ease-out infinite;
}
.fx-echo::before { color: var(--ink-2); }
.fx-echo::after  { color: var(--ink-3); animation-delay: 1s; }
@keyframes fx-echo {
  0%   { opacity: .8; transform: scale(1);   filter: blur(0); }
  100% { opacity: 0;  transform: scale(1.9); filter: blur(3px); }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "ECHO" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-echo" data-text="ECHO">ECHO</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 13 Echo-Verse — ghost copies of the word ripple outward */
.fx-echo {
  position: relative;
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .12em;
  color: var(--ink);
}
.fx-echo::before, .fx-echo::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  animation: fx-echo 2s ease-out infinite;
}
.fx-echo::before { color: var(--ink-2); }
.fx-echo::after  { color: var(--ink-3); animation-delay: 1s; }
@keyframes fx-echo {
  0%   { opacity: .8; transform: scale(1);   filter: blur(0); }
  100% { opacity: 0;  transform: scale(1.9); filter: blur(3px); }
}
```

---

### 14. Deep-Type (`extrude`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Deep-Type" text effect applied to the word "DEPTH": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-extrude">DEPTH</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 14 Deep-Type — extruded 3D block letters rocking on their axis */
.fx-extrude {
  font: 600 34px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .08em;
  color: var(--ink);
  text-shadow:
    1px 1px 0 color-mix(in srgb, var(--ink-2) 80%, #000),
    2px 2px 0 color-mix(in srgb, var(--ink-2) 70%, #000),
    3px 3px 0 color-mix(in srgb, var(--ink-2) 60%, #000),
    4px 4px 0 color-mix(in srgb, var(--ink-2) 50%, #000),
    5px 5px 0 color-mix(in srgb, var(--ink-2) 40%, #000),
    6px 6px 0 color-mix(in srgb, var(--ink-2) 30%, #000),
    7px 7px 12px rgba(0, 0, 0, .5);
  animation: fx-extrude 3s ease-in-out infinite;
}
@keyframes fx-extrude {
  0%, 100% { transform: rotate(-3.5deg) translateY(2px); }
  50%      { transform: rotate(3.5deg)  translateY(-4px); }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "DEPTH" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-extrude">DEPTH</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 14 Deep-Type — extruded 3D block letters rocking on their axis */
.fx-extrude {
  font: 600 34px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .08em;
  color: var(--ink);
  text-shadow:
    1px 1px 0 color-mix(in srgb, var(--ink-2) 80%, #000),
    2px 2px 0 color-mix(in srgb, var(--ink-2) 70%, #000),
    3px 3px 0 color-mix(in srgb, var(--ink-2) 60%, #000),
    4px 4px 0 color-mix(in srgb, var(--ink-2) 50%, #000),
    5px 5px 0 color-mix(in srgb, var(--ink-2) 40%, #000),
    6px 6px 0 color-mix(in srgb, var(--ink-2) 30%, #000),
    7px 7px 12px rgba(0, 0, 0, .5);
  animation: fx-extrude 3s ease-in-out infinite;
}
@keyframes fx-extrude {
  0%, 100% { transform: rotate(-3.5deg) translateY(2px); }
  50%      { transform: rotate(3.5deg)  translateY(-4px); }
}
```

---

### 15. Wireframe (`contour`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Wireframe" text effect applied to the word "OUTLINE": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<svg class="fx-contour" viewBox="0 0 260 56" role="img" aria-label="OUTLINE"><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle">OUTLINE</text></svg>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 15 Wireframe — a dashed outline endlessly traces the letterforms */
.fx-contour {
  width: 240px;
  height: 56px;
  overflow: visible;
}
.fx-contour text {
  font: 600 40px "JetBrains Mono", monospace;
  letter-spacing: .02em;
  fill: color-mix(in srgb, var(--ink) 10%, transparent);
  stroke: var(--ink-3);
  stroke-width: 1.2;
  stroke-dasharray: 34 66;
  animation: fx-contour 3.2s linear infinite;
}
@keyframes fx-contour {
  to { stroke-dashoffset: -100; }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "OUTLINE" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <svg class="fx-contour" viewBox="0 0 260 56" role="img" aria-label="OUTLINE"><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle">OUTLINE</text></svg> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 15 Wireframe — a dashed outline endlessly traces the letterforms */
.fx-contour {
  width: 240px;
  height: 56px;
  overflow: visible;
}
.fx-contour text {
  font: 600 40px "JetBrains Mono", monospace;
  letter-spacing: .02em;
  fill: color-mix(in srgb, var(--ink) 10%, transparent);
  stroke: var(--ink-3);
  stroke-width: 1.2;
  stroke-dasharray: 34 66;
  animation: fx-contour 3.2s linear infinite;
}
@keyframes fx-contour {
  to { stroke-dashoffset: -100; }
}
```

---

### 16. Prisma (`spectrum`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Prisma" text effect applied to the word "SPECTRUM": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-spectrum" role="img" aria-label="SPECTRUM"><b aria-hidden="true" style="--i:0">S</b><b aria-hidden="true" style="--i:1">P</b><b aria-hidden="true" style="--i:2">E</b><b aria-hidden="true" style="--i:3">C</b><b aria-hidden="true" style="--i:4">T</b><b aria-hidden="true" style="--i:5">R</b><b aria-hidden="true" style="--i:6">U</b><b aria-hidden="true" style="--i:7">M</b></div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 16 Prisma — each letter refracts a different band of the spectrum */
.fx-spectrum {
  font: 600 26px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .08em;
}
.fx-spectrum b {
  font-weight: inherit;
  display: inline-block;
  color: #ff2d78;
  filter: hue-rotate(calc(var(--i) * 42deg));
  animation: fx-spectrum 2.4s linear infinite;
  animation-delay: calc(var(--i) * -.1s);
}
@keyframes fx-spectrum {
  to { filter: hue-rotate(calc(var(--i) * 42deg + 360deg)); }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "SPECTRUM" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-spectrum" role="img" aria-label="SPECTRUM"><b aria-hidden="true" style="--i:0">S</b><b aria-hidden="true" style="--i:1">P</b><b aria-hidden="true" style="--i:2">E</b><b aria-hidden="true" style="--i:3">C</b><b aria-hidden="true" style="--i:4">T</b><b aria-hidden="true" style="--i:5">R</b><b aria-hidden="true" style="--i:6">U</b><b aria-hidden="true" style="--i:7">M</b></div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 16 Prisma — each letter refracts a different band of the spectrum */
.fx-spectrum {
  font: 600 26px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .08em;
}
.fx-spectrum b {
  font-weight: inherit;
  display: inline-block;
  color: #ff2d78;
  filter: hue-rotate(calc(var(--i) * 42deg));
  animation: fx-spectrum 2.4s linear infinite;
  animation-delay: calc(var(--i) * -.1s);
}
@keyframes fx-spectrum {
  to { filter: hue-rotate(calc(var(--i) * 42deg + 360deg)); }
}
```

---

### 17. Jitterbug (`jitter`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Jitterbug" text effect applied to the word "JITTER": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-jitter">JITTER</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 17 Jitterbug — nervous analogue jitter: skews, jumps and dropped frames */
.fx-jitter {
  font: 600 30px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .06em;
  color: var(--ink);
  animation: fx-jitter 1.9s steps(1) infinite;
}
@keyframes fx-jitter {
  0%, 7%, 15%, 55%, 100% { transform: none; opacity: 1; }
  8%  { transform: skewX(-14deg) translateX(-4px); }
  10% { transform: skewX(10deg) translateX(3px); }
  12% { transform: translateY(-3px); opacity: .6; }
  46% { transform: skewX(8deg); }
  48% { transform: skewX(-6deg) translateY(2px); opacity: .75; }
  50% { transform: translateX(2px); }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "JITTER" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-jitter">JITTER</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 17 Jitterbug — nervous analogue jitter: skews, jumps and dropped frames */
.fx-jitter {
  font: 600 30px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .06em;
  color: var(--ink);
  animation: fx-jitter 1.9s steps(1) infinite;
}
@keyframes fx-jitter {
  0%, 7%, 15%, 55%, 100% { transform: none; opacity: 1; }
  8%  { transform: skewX(-14deg) translateX(-4px); }
  10% { transform: skewX(10deg) translateX(3px); }
  12% { transform: translateY(-3px); opacity: .6; }
  46% { transform: skewX(8deg); }
  48% { transform: skewX(-6deg) translateY(2px); opacity: .75; }
  50% { transform: translateX(2px); }
}
```

---

### 18. Anaglyph-3D (`anaglyph`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Anaglyph-3D" text effect applied to the word "DEPTH-3D": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-anaglyph">DEPTH-3D</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 18 Anaglyph-3D — red/cyan stereo channels drift apart and snap back */
.fx-anaglyph {
  font: 600 30px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .1em;
  color: var(--ink);
  animation: fx-anaglyph 2.4s ease-in-out infinite;
}
@keyframes fx-anaglyph {
  0%, 100% { text-shadow: 0 0 0 #ff3355, 0 0 0 #33ddff; }
  50% {
    text-shadow:
      -6px 0 1px #ff3355,
       6px 0 1px #33ddff;
  }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "DEPTH-3D" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-anaglyph">DEPTH-3D</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 18 Anaglyph-3D — red/cyan stereo channels drift apart and snap back */
.fx-anaglyph {
  font: 600 30px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .1em;
  color: var(--ink);
  animation: fx-anaglyph 2.4s ease-in-out infinite;
}
@keyframes fx-anaglyph {
  0%, 100% { text-shadow: 0 0 0 #ff3355, 0 0 0 #33ddff; }
  50% {
    text-shadow:
      -6px 0 1px #ff3355,
       6px 0 1px #33ddff;
  }
}
```

---

### 19. Split-Flap (`flap`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Split-Flap" text effect applied to the word "DEPART": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-flap" role="img" aria-label="DEPART"><b aria-hidden="true" style="--i:0">D</b><b aria-hidden="true" style="--i:1">E</b><b aria-hidden="true" style="--i:2">P</b><b aria-hidden="true" style="--i:3">A</b><b aria-hidden="true" style="--i:4">R</b><b aria-hidden="true" style="--i:5">T</b></div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 19 Split-Flap — airport departure board; letters flip on their plates */
.fx-flap {
  font: 600 24px/1 "JetBrains Mono", monospace;
  letter-spacing: 0;
  display: inline-flex;
  gap: 3px;
  perspective: 400px;
  color: var(--ink);
}
.fx-flap b {
  font-weight: inherit;
  display: grid;
  place-items: center;
  width: 1.5em;
  height: 1.9em;
  background: linear-gradient(
      color-mix(in srgb, var(--ink) 16%, transparent) 0 49%,
      color-mix(in srgb, var(--ink) 8%, transparent) 51% 100%);
  border-radius: 4px;
  transform-origin: center;
  animation: fx-flap 3.2s ease-in-out infinite;
  animation-delay: calc(var(--i) * .12s);
}
@keyframes fx-flap {
  0%, 55%, 100% { transform: rotateX(0); }
  62% { transform: rotateX(-88deg); }
  69% { transform: rotateX(0); }
  74% { transform: rotateX(-25deg); }
  79% { transform: rotateX(0); }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "DEPART" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-flap" role="img" aria-label="DEPART"><b aria-hidden="true" style="--i:0">D</b><b aria-hidden="true" style="--i:1">E</b><b aria-hidden="true" style="--i:2">P</b><b aria-hidden="true" style="--i:3">A</b><b aria-hidden="true" style="--i:4">R</b><b aria-hidden="true" style="--i:5">T</b></div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 19 Split-Flap — airport departure board; letters flip on their plates */
.fx-flap {
  font: 600 24px/1 "JetBrains Mono", monospace;
  letter-spacing: 0;
  display: inline-flex;
  gap: 3px;
  perspective: 400px;
  color: var(--ink);
}
.fx-flap b {
  font-weight: inherit;
  display: grid;
  place-items: center;
  width: 1.5em;
  height: 1.9em;
  background: linear-gradient(
      color-mix(in srgb, var(--ink) 16%, transparent) 0 49%,
      color-mix(in srgb, var(--ink) 8%, transparent) 51% 100%);
  border-radius: 4px;
  transform-origin: center;
  animation: fx-flap 3.2s ease-in-out infinite;
  animation-delay: calc(var(--i) * .12s);
}
@keyframes fx-flap {
  0%, 55%, 100% { transform: rotateX(0); }
  62% { transform: rotateX(-88deg); }
  69% { transform: rotateX(0); }
  74% { transform: rotateX(-25deg); }
  79% { transform: rotateX(0); }
}
```

---

### 20. Phosphor (`crt`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Phosphor" text effect applied to the word "CRT_MODE": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-crt">CRT_MODE</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 20 Phosphor — CRT terminal: green glow, rolling scanlines, tube flicker */
.fx-crt {
  position: relative;
  font: 600 26px/1.2 "JetBrains Mono", monospace;
  letter-spacing: .1em;
  padding: .3em .5em;
  color: #4dff88;
  text-shadow: 0 0 7px rgba(77, 255, 136, .8);
  background: rgba(20, 60, 35, .18);
  border-radius: 4px;
  animation: fx-crt-flicker 3.4s steps(1) infinite;
}
.fx-crt::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: repeating-linear-gradient(0deg,
      transparent 0 2px,
      rgba(0, 0, 0, .38) 2px 4px);
  animation: fx-crt-roll 6s linear infinite;
}
@keyframes fx-crt-flicker {
  0%, 6%, 100% { opacity: 1; }
  3%   { opacity: .82; }
  4.5% { opacity: .95; transform: translateY(1px); }
  70%  { opacity: .9; }
  71%  { opacity: 1; transform: none; }
}
@keyframes fx-crt-roll {
  to { background-position: 0 48px; }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "CRT_MODE" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-crt">CRT_MODE</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 20 Phosphor — CRT terminal: green glow, rolling scanlines, tube flicker */
.fx-crt {
  position: relative;
  font: 600 26px/1.2 "JetBrains Mono", monospace;
  letter-spacing: .1em;
  padding: .3em .5em;
  color: #4dff88;
  text-shadow: 0 0 7px rgba(77, 255, 136, .8);
  background: rgba(20, 60, 35, .18);
  border-radius: 4px;
  animation: fx-crt-flicker 3.4s steps(1) infinite;
}
.fx-crt::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: repeating-linear-gradient(0deg,
      transparent 0 2px,
      rgba(0, 0, 0, .38) 2px 4px);
  animation: fx-crt-roll 6s linear infinite;
}
@keyframes fx-crt-flicker {
  0%, 6%, 100% { opacity: 1; }
  3%   { opacity: .82; }
  4.5% { opacity: .95; transform: translateY(1px); }
  70%  { opacity: .9; }
  71%  { opacity: 1; transform: none; }
}
@keyframes fx-crt-roll {
  to { background-position: 0 48px; }
}
```

---

### 21. Pop-Riot (`pop`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Pop-Riot" text effect applied to the word "POP!": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-pop" role="img" aria-label="POP!"><b aria-hidden="true" style="--i:0">P</b><b aria-hidden="true" style="--i:1">O</b><b aria-hidden="true" style="--i:2">P</b><b aria-hidden="true" style="--i:3">!</b></div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 21 Pop-Riot — letters leap with a hard comic-book drop shadow */
.fx-pop {
  font: 600 34px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .04em;
  color: var(--ink);
}
.fx-pop b {
  font-weight: inherit;
  display: inline-block;
  animation: fx-pop 1.5s cubic-bezier(.3, 1.6, .4, 1) infinite;
  animation-delay: calc(var(--i) * .09s);
}
@keyframes fx-pop {
  0%, 55%, 100% { transform: translateY(0); text-shadow: 0 0 0 var(--ink-2); }
  25% { transform: translateY(-12px) rotate(-4deg); text-shadow: 0 12px 0 var(--ink-2); }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "POP!" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-pop" role="img" aria-label="POP!"><b aria-hidden="true" style="--i:0">P</b><b aria-hidden="true" style="--i:1">O</b><b aria-hidden="true" style="--i:2">P</b><b aria-hidden="true" style="--i:3">!</b></div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 21 Pop-Riot — letters leap with a hard comic-book drop shadow */
.fx-pop {
  font: 600 34px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .04em;
  color: var(--ink);
}
.fx-pop b {
  font-weight: inherit;
  display: inline-block;
  animation: fx-pop 1.5s cubic-bezier(.3, 1.6, .4, 1) infinite;
  animation-delay: calc(var(--i) * .09s);
}
@keyframes fx-pop {
  0%, 55%, 100% { transform: translateY(0); text-shadow: 0 0 0 var(--ink-2); }
  25% { transform: translateY(-12px) rotate(-4deg); text-shadow: 0 12px 0 var(--ink-2); }
}
```

---

### 22. Limelight (`spotlight`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Limelight" text effect applied to the word "SPOTLIGHT": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-spotlight">SPOTLIGHT</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 22 Limelight — a spotlight sweeps across otherwise unlit letters */
.fx-spotlight {
  font: 600 26px/1.2 "JetBrains Mono", monospace;
  letter-spacing: .08em;
  background: radial-gradient(3.5ch 100% at 50% 50%,
      var(--ink) 20%,
      color-mix(in srgb, var(--ink) 14%, transparent) 75%
    ) 0 0 / 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: fx-spotlight 3.4s ease-in-out infinite alternate;
}
@keyframes fx-spotlight {
  0%   { background-position: 100% 0; }
  100% { background-position: 0% 0; }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "SPOTLIGHT" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-spotlight">SPOTLIGHT</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 22 Limelight — a spotlight sweeps across otherwise unlit letters */
.fx-spotlight {
  font: 600 26px/1.2 "JetBrains Mono", monospace;
  letter-spacing: .08em;
  background: radial-gradient(3.5ch 100% at 50% 50%,
      var(--ink) 20%,
      color-mix(in srgb, var(--ink) 14%, transparent) 75%
    ) 0 0 / 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: fx-spotlight 3.4s ease-in-out infinite alternate;
}
@keyframes fx-spotlight {
  0%   { background-position: 100% 0; }
  100% { background-position: 0% 0; }
}
```

---

### 23. Rubber-Band (`elastic`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Rubber-Band" text effect applied to the word "BOING": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-elastic">BOING</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 23 Rubber-Band — the word squashes and stretches like an elastic band */
.fx-elastic {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .08em;
  color: var(--ink-2);
  animation: fx-elastic 1.6s ease-in-out infinite;
}
@keyframes fx-elastic {
  0%, 100% { transform: scale(1, 1); }
  28% { transform: scale(1.28, .72); }
  44% { transform: scale(.78, 1.24); }
  60% { transform: scale(1.12, .9); }
  74% { transform: scale(.96, 1.05); }
  86% { transform: scale(1.02, .98); }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "BOING" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-elastic">BOING</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 23 Rubber-Band — the word squashes and stretches like an elastic band */
.fx-elastic {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .08em;
  color: var(--ink-2);
  animation: fx-elastic 1.6s ease-in-out infinite;
}
@keyframes fx-elastic {
  0%, 100% { transform: scale(1, 1); }
  28% { transform: scale(1.28, .72); }
  44% { transform: scale(.78, 1.24); }
  60% { transform: scale(1.12, .9); }
  74% { transform: scale(.96, 1.05); }
  86% { transform: scale(1.02, .98); }
}
```

---

### 24. Still-Water (`mirror`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Still-Water" text effect applied to the word "MIRROR": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-mirror">MIRROR</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 24 Still-Water — the word floats over its own rippling reflection
   (uses -webkit-box-reflect: Chromium & Safari; degrades gracefully) */
.fx-mirror {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .1em;
  color: var(--ink);
  -webkit-box-reflect: below 2px linear-gradient(transparent 45%, rgba(255, 255, 255, .28));
  animation: fx-mirror 3s ease-in-out infinite;
}
@keyframes fx-mirror {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "MIRROR" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-mirror">MIRROR</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 24 Still-Water — the word floats over its own rippling reflection
   (uses -webkit-box-reflect: Chromium & Safari; degrades gracefully) */
.fx-mirror {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .1em;
  color: var(--ink);
  -webkit-box-reflect: below 2px linear-gradient(transparent 45%, rgba(255, 255, 255, .28));
  animation: fx-mirror 3s ease-in-out infinite;
}
@keyframes fx-mirror {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}
```

---

### 25. Ransom-Note (`ransom`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Ransom-Note" text effect applied to the word "RANSOM": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-ransom" role="img" aria-label="RANSOM"><b aria-hidden="true" style="--i:0">R</b><b aria-hidden="true" style="--i:1">A</b><b aria-hidden="true" style="--i:2">N</b><b aria-hidden="true" style="--i:3">S</b><b aria-hidden="true" style="--i:4">O</b><b aria-hidden="true" style="--i:5">M</b></div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 25 Ransom-Note — mismatched cut-out letters shifting on the page */
.fx-ransom {
  font: 600 24px/1 "JetBrains Mono", monospace;
  letter-spacing: 0;
  display: inline-flex;
  gap: 4px;
  color: var(--ink);
}
.fx-ransom b {
  font-weight: inherit;
  display: grid;
  place-items: center;
  padding: .28em .3em;
  border-radius: 3px;
  background: color-mix(in srgb, var(--ink) 14%, transparent);
  animation: fx-ransom 2.8s ease-in-out infinite alternate;
  animation-delay: calc(var(--i) * -.5s);
}
.fx-ransom b:nth-child(odd) {
  background: var(--ink-2);
  color: #14020f;
}
.fx-ransom b:nth-child(3n) {
  background: transparent;
  outline: 1.5px dashed color-mix(in srgb, var(--ink) 55%, transparent);
  color: var(--ink-3);
}
@keyframes fx-ransom {
  0%   { transform: rotate(-6deg) translateY(1.5px); }
  100% { transform: rotate(6deg)  translateY(-1.5px); }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "RANSOM" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-ransom" role="img" aria-label="RANSOM"><b aria-hidden="true" style="--i:0">R</b><b aria-hidden="true" style="--i:1">A</b><b aria-hidden="true" style="--i:2">N</b><b aria-hidden="true" style="--i:3">S</b><b aria-hidden="true" style="--i:4">O</b><b aria-hidden="true" style="--i:5">M</b></div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 25 Ransom-Note — mismatched cut-out letters shifting on the page */
.fx-ransom {
  font: 600 24px/1 "JetBrains Mono", monospace;
  letter-spacing: 0;
  display: inline-flex;
  gap: 4px;
  color: var(--ink);
}
.fx-ransom b {
  font-weight: inherit;
  display: grid;
  place-items: center;
  padding: .28em .3em;
  border-radius: 3px;
  background: color-mix(in srgb, var(--ink) 14%, transparent);
  animation: fx-ransom 2.8s ease-in-out infinite alternate;
  animation-delay: calc(var(--i) * -.5s);
}
.fx-ransom b:nth-child(odd) {
  background: var(--ink-2);
  color: #14020f;
}
.fx-ransom b:nth-child(3n) {
  background: transparent;
  outline: 1.5px dashed color-mix(in srgb, var(--ink) 55%, transparent);
  color: var(--ink-3);
}
@keyframes fx-ransom {
  0%   { transform: rotate(-6deg) translateY(1.5px); }
  100% { transform: rotate(6deg)  translateY(-1.5px); }
}
```

---

### 26. Meltdown (`melt`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Meltdown" text effect applied to the word "MELT": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-melt" role="img" aria-label="MELT"><b aria-hidden="true" style="--i:0">M</b><b aria-hidden="true" style="--i:1">E</b><b aria-hidden="true" style="--i:2">L</b><b aria-hidden="true" style="--i:3">T</b></div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 26 Meltdown — letters sag, stretch and drip before snapping back */
.fx-melt {
  font: 600 34px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .1em;
  color: var(--ink-2);
}
.fx-melt b {
  font-weight: inherit;
  display: inline-block;
  transform-origin: top center;
  animation: fx-melt 2.8s ease-in infinite;
  animation-delay: calc(var(--i) * .22s);
}
@keyframes fx-melt {
  0%, 45%  { transform: scaleY(1) translateY(0); filter: blur(0); }
  70%      { transform: scaleY(1.55) translateY(7px) scaleX(.92); filter: blur(1.5px); }
  85%, 100% { transform: scaleY(1) translateY(0); filter: blur(0); }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "MELT" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-melt" role="img" aria-label="MELT"><b aria-hidden="true" style="--i:0">M</b><b aria-hidden="true" style="--i:1">E</b><b aria-hidden="true" style="--i:2">L</b><b aria-hidden="true" style="--i:3">T</b></div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 26 Meltdown — letters sag, stretch and drip before snapping back */
.fx-melt {
  font: 600 34px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .1em;
  color: var(--ink-2);
}
.fx-melt b {
  font-weight: inherit;
  display: inline-block;
  transform-origin: top center;
  animation: fx-melt 2.8s ease-in infinite;
  animation-delay: calc(var(--i) * .22s);
}
@keyframes fx-melt {
  0%, 45%  { transform: scaleY(1) translateY(0); filter: blur(0); }
  70%      { transform: scaleY(1.55) translateY(7px) scaleX(.92); filter: blur(1.5px); }
  85%, 100% { transform: scaleY(1) translateY(0); filter: blur(0); }
}
```

---

### 27. Cardio (`heartbeat`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Cardio" text effect applied to the word "PULSE": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-heartbeat">PULSE</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 27 Cardio — a lub-dub heartbeat with a systolic glow */
.fx-heartbeat {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .12em;
  color: var(--ink-2);
  animation: fx-heartbeat 1.4s ease-in-out infinite;
}
@keyframes fx-heartbeat {
  0%, 100% { transform: scale(1); text-shadow: 0 0 0 transparent; }
  14% { transform: scale(1.14); text-shadow: 0 0 18px color-mix(in srgb, var(--ink-2) 65%, transparent); }
  28% { transform: scale(1); }
  42% { transform: scale(1.18); text-shadow: 0 0 26px color-mix(in srgb, var(--ink-2) 80%, transparent); }
  70% { transform: scale(1); text-shadow: 0 0 0 transparent; }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "PULSE" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-heartbeat">PULSE</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 27 Cardio — a lub-dub heartbeat with a systolic glow */
.fx-heartbeat {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .12em;
  color: var(--ink-2);
  animation: fx-heartbeat 1.4s ease-in-out infinite;
}
@keyframes fx-heartbeat {
  0%, 100% { transform: scale(1); text-shadow: 0 0 0 transparent; }
  14% { transform: scale(1.14); text-shadow: 0 0 18px color-mix(in srgb, var(--ink-2) 65%, transparent); }
  28% { transform: scale(1); }
  42% { transform: scale(1.18); text-shadow: 0 0 26px color-mix(in srgb, var(--ink-2) 80%, transparent); }
  70% { transform: scale(1); text-shadow: 0 0 0 transparent; }
}
```

---

### 28. Hi-Liter (`marker`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Hi-Liter" text effect applied to the word "MARKED": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-marker">MARKED</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 28 Hi-Liter — a marker pen paints across the word, then lifts off */
.fx-marker {
  font: 600 28px/1.3 "JetBrains Mono", monospace;
  letter-spacing: .08em;
  color: var(--ink);
  padding: .1em .2em;
  background: linear-gradient(100deg,
      color-mix(in srgb, var(--ink-2) 85%, transparent),
      color-mix(in srgb, var(--ink-2) 60%, transparent)
    ) no-repeat 0 62%;
  background-size: 0% 46%;
  animation: fx-marker 3s ease-in-out infinite;
}
@keyframes fx-marker {
  0%        { background-size: 0% 46%;   background-position: 0 62%; }
  38%, 62%  { background-size: 100% 46%; background-position: 0 62%; }
  100%      { background-size: 0% 46%;   background-position: 100% 62%; }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "MARKED" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-marker">MARKED</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 28 Hi-Liter — a marker pen paints across the word, then lifts off */
.fx-marker {
  font: 600 28px/1.3 "JetBrains Mono", monospace;
  letter-spacing: .08em;
  color: var(--ink);
  padding: .1em .2em;
  background: linear-gradient(100deg,
      color-mix(in srgb, var(--ink-2) 85%, transparent),
      color-mix(in srgb, var(--ink-2) 60%, transparent)
    ) no-repeat 0 62%;
  background-size: 0% 46%;
  animation: fx-marker 3s ease-in-out infinite;
}
@keyframes fx-marker {
  0%        { background-size: 0% 46%;   background-position: 0 62%; }
  38%, 62%  { background-size: 100% 46%; background-position: 0 62%; }
  100%      { background-size: 0% 46%;   background-position: 100% 62%; }
}
```

---

### 29. Sundial (`sundial`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Sundial" text effect applied to the word "SHADOW": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-sundial">SHADOW</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 29 Sundial — a long cast shadow circles the letters like a passing sun */
.fx-sundial {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .1em;
  color: var(--ink);
  animation: fx-sundial 5s linear infinite;
}
@keyframes fx-sundial {
  0%, 100% {
    text-shadow:
      4px 0 var(--ink-2),
      8px 0 color-mix(in srgb, var(--ink-2) 55%, transparent),
      12px 0 color-mix(in srgb, var(--ink-2) 25%, transparent);
  }
  12.5% {
    text-shadow:
      2.8px 2.8px var(--ink-2),
      5.6px 5.6px color-mix(in srgb, var(--ink-2) 55%, transparent),
      8.4px 8.4px color-mix(in srgb, var(--ink-2) 25%, transparent);
  }
  25% {
    text-shadow:
      0 4px var(--ink-2),
      0 8px color-mix(in srgb, var(--ink-2) 55%, transparent),
      0 12px color-mix(in srgb, var(--ink-2) 25%, transparent);
  }
  37.5% {
    text-shadow:
      -2.8px 2.8px var(--ink-2),
      -5.6px 5.6px color-mix(in srgb, var(--ink-2) 55%, transparent),
      -8.4px 8.4px color-mix(in srgb, var(--ink-2) 25%, transparent);
  }
  50% {
    text-shadow:
      -4px 0 var(--ink-2),
      -8px 0 color-mix(in srgb, var(--ink-2) 55%, transparent),
      -12px 0 color-mix(in srgb, var(--ink-2) 25%, transparent);
  }
  62.5% {
    text-shadow:
      -2.8px -2.8px var(--ink-2),
      -5.6px -5.6px color-mix(in srgb, var(--ink-2) 55%, transparent),
      -8.4px -8.4px color-mix(in srgb, var(--ink-2) 25%, transparent);
  }
  75% {
    text-shadow:
      0 -4px var(--ink-2),
      0 -8px color-mix(in srgb, var(--ink-2) 55%, transparent),
      0 -12px color-mix(in srgb, var(--ink-2) 25%, transparent);
  }
  87.5% {
    text-shadow:
      2.8px -2.8px var(--ink-2),
      5.6px -5.6px color-mix(in srgb, var(--ink-2) 55%, transparent),
      8.4px -8.4px color-mix(in srgb, var(--ink-2) 25%, transparent);
  }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "SHADOW" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-sundial">SHADOW</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 29 Sundial — a long cast shadow circles the letters like a passing sun */
.fx-sundial {
  font: 600 32px/1.1 "JetBrains Mono", monospace;
  letter-spacing: .1em;
  color: var(--ink);
  animation: fx-sundial 5s linear infinite;
}
@keyframes fx-sundial {
  0%, 100% {
    text-shadow:
      4px 0 var(--ink-2),
      8px 0 color-mix(in srgb, var(--ink-2) 55%, transparent),
      12px 0 color-mix(in srgb, var(--ink-2) 25%, transparent);
  }
  12.5% {
    text-shadow:
      2.8px 2.8px var(--ink-2),
      5.6px 5.6px color-mix(in srgb, var(--ink-2) 55%, transparent),
      8.4px 8.4px color-mix(in srgb, var(--ink-2) 25%, transparent);
  }
  25% {
    text-shadow:
      0 4px var(--ink-2),
      0 8px color-mix(in srgb, var(--ink-2) 55%, transparent),
      0 12px color-mix(in srgb, var(--ink-2) 25%, transparent);
  }
  37.5% {
    text-shadow:
      -2.8px 2.8px var(--ink-2),
      -5.6px 5.6px color-mix(in srgb, var(--ink-2) 55%, transparent),
      -8.4px 8.4px color-mix(in srgb, var(--ink-2) 25%, transparent);
  }
  50% {
    text-shadow:
      -4px 0 var(--ink-2),
      -8px 0 color-mix(in srgb, var(--ink-2) 55%, transparent),
      -12px 0 color-mix(in srgb, var(--ink-2) 25%, transparent);
  }
  62.5% {
    text-shadow:
      -2.8px -2.8px var(--ink-2),
      -5.6px -5.6px color-mix(in srgb, var(--ink-2) 55%, transparent),
      -8.4px -8.4px color-mix(in srgb, var(--ink-2) 25%, transparent);
  }
  75% {
    text-shadow:
      0 -4px var(--ink-2),
      0 -8px color-mix(in srgb, var(--ink-2) 55%, transparent),
      0 -12px color-mix(in srgb, var(--ink-2) 25%, transparent);
  }
  87.5% {
    text-shadow:
      2.8px -2.8px var(--ink-2),
      5.6px -5.6px color-mix(in srgb, var(--ink-2) 55%, transparent),
      8.4px -8.4px color-mix(in srgb, var(--ink-2) 25%, transparent);
  }
}
```

---

### 30. Negativ (`negative`)

**Generation Prompt:**
> Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "Negativ" text effect applied to the word "INVERTED": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

<div class="fx-negative">INVERTED</div>

Apply this CSS:

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 30 Negative — an inversion bar sweeps the word, flipping letters to their
   photographic negative via mix-blend-mode: difference */
.fx-negative {
  position: relative;
  font: 600 28px/1.2 "JetBrains Mono", monospace;
  letter-spacing: .08em;
  color: var(--ink);
  padding: .18em .22em;
}
.fx-negative::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 34%;
  background: var(--ink);
  mix-blend-mode: difference;
  animation: fx-negative 2.4s ease-in-out infinite alternate;
}
@keyframes fx-negative {
  0%   { left: 0;    transform: translateX(0); }
  100% { left: 100%; transform: translateX(-100%); }
}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the `--ink`, `--ink-2` and `--ink-3` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "INVERTED" (per-letter effects index each letter with an inline `--i` custom property).
- Respect `prefers-reduced-motion: reduce` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.

```css
<!-- Markup: <div class="fx-negative">INVERTED</div> -->

/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

/* 30 Negative — an inversion bar sweeps the word, flipping letters to their
   photographic negative via mix-blend-mode: difference */
.fx-negative {
  position: relative;
  font: 600 28px/1.2 "JetBrains Mono", monospace;
  letter-spacing: .08em;
  color: var(--ink);
  padding: .18em .22em;
}
.fx-negative::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 34%;
  background: var(--ink);
  mix-blend-mode: difference;
  animation: fx-negative 2.4s ease-in-out infinite alternate;
}
@keyframes fx-negative {
  0%   { left: 0;    transform: translateX(0); }
  100% { left: 100%; transform: translateX(-100%); }
}
```

---

