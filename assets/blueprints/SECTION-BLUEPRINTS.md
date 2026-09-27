# Section Blueprints — Navbars, Footers, CTAs & 404s

Curated architectural patterns synthesized from **navbar.gallery**, **footer.design**, **cta.gallery**, and **404s.design**.

---

## 1. Navbars (`navbar.gallery`)

### Archetype A: The Floating Capsule / Pill Nav
* **Best for:** Modern SaaS, AI products, portfolios, editorial landings.
* **Geometry:** Floating fixed pill (`top-4`, `mx-auto`, `w-fit`, `rounded-full`).
* **Visual Treatment:** `bg-background/80`, `backdrop-blur-md`, `border border-border/50`, `shadow-sm`.
* **Motion:** Scale down slightly on scroll (`scale-[0.98]`), border opacity increases.
* **Anatomy:**
  ```tsx
  <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
    <nav className="pointer-events-auto flex items-center gap-4 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/40 shadow-sm">
      <Logo />
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link href="#features">Features</Link>
        <Link href="#pricing">Pricing</Link>
        <Link href="#docs">Docs</Link>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">Sign In</Button>
        <Button size="sm" className="rounded-full">Get Started</Button>
      </div>
    </nav>
  </header>
  ```

### Archetype B: The Precision Instrument Header
* **Best for:** DevTools, Data Analytics, Fintech (Linear, Raycast, Supabase style).
* **Geometry:** Full width (`h-12` or `h-14`), hairline bottom border (`border-b border-border/40`).
* **Hierarchy:** Monospaced keyboard shortcut badges (`⌘K` command palette), breadcrumbs, status dot.

---

## 2. Footers (`footer.design`)

### Archetype A: The Cathedral Sitemap (Multi-Column)
* **Best for:** Enterprise SaaS, developer platforms, marketplaces.
* **Layout:** Top section with brand identity + newsletter signup; 4-5 category columns (Product, Resources, Company, Legal); bottom bar with copyright, live system status badge (`All systems operational`), and theme toggle.
* **Key Detail:** Never use dull grey text; use high-contrast primary text on hover with subtle transition (`transition-colors duration-150`).

### Archetype B: The Editorial Broadsheet Footer
* **Best for:** Luxury, design agencies, creator tools.
* **Layout:** Giant typography watermark brandmark across the bottom; single-line horizontal link strip; physical office timezones and local weather/time clock.

---

## 3. High-Converting CTAs (`cta.gallery`)

### Archetype A: The Glowing Bento Card CTA
* **Structure:** Deep dark container (`bg-neutral-950`), radial gradient glow or spotlight in the background (`radial-gradient(circle at 50% 0%, rgba(120,119,198,0.15), transparent 70%)`), hairline border (`border border-white/10`).
* **Content Flow:**
  1. Eyebrow badge: e.g. `✨ v2.0 is now live`
  2. Urgent, high-contrast headline: `Ready to eliminate design slop?`
  3. Action strip: Primary high-contrast button + secondary "Book a demo" or terminal command.
  4. Friction reducer: `No credit card required · 14-day free trial · Cancel anytime`.

### Archetype B: The Sticky Floating Action Dock
* **Structure:** Appears when the user scrolls past the hero section. Fixed bottom dock (`bottom-6 inset-x-0 mx-auto w-fit z-40`).
* **Anatomy:** Compact avatar stack + active trial counter + high-impact CTA button.

---

## 4. Creative 404 Error Pages (`404s.design`)

### Core Principles for Delightful Error Handling:
1. **Never a Dead End:** Always provide an instant escape hatch (`Back to Home` or quick search).
2. **Contextual Wit:** Use humor or metaphor aligned with the product (e.g. for an audio app: *"Looks like this frequency is out of range"*; for an agent tool: *"The agent explored everywhere, but found nothing here"*).
3. **Interactive Easter Egg:** A mini canvas physics ball, ASCII art, or an interactive terminal command prompt.
