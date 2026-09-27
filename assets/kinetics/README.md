# Kinetics — Spring Physics Motion & LLM Prompts

Contains **153** spring-driven micro-interactions with exact cubic-bezier curves, React code, and generation prompts.

## Card Resize

*Height spring with no JS layout thrash*

**Tags:** expand, collapse, expandable, grow, height, reveal

**Prompt Recipe:**
> Build a card that expands and collapses its height when clicked. Animate only the height with a single spring-like cubic-bezier(0.34, 1.56, 0.64, 1) over ~0.5s so it gently overshoots before settling, and fade in secondary text with a small delay once expanded. Pure CSS transitions — no JS height measurement, no max-height hacks.

**React Implementation:**
```tsx
function SpringCard() {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        height: open ? 120 : 64,
        overflow: 'hidden',
        transition: 'height 0.5s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      <p>Tap to expand</p>
    </div>
  );
}
```

---

## Magnetic Button

*Cursor pulls the button toward it inside a dead zone*

**Tags:** magnet, hover, attract, pull, cursor, sticky

**Prompt Recipe:**
> Build a button that is magnetically pulled toward the cursor while the pointer is inside its surrounding zone. On mousemove, translate the button toward the pointer by ~35% of the offset from its center; reset to translate(0,0) on mouseleave. Use a short transform transition (~0.15s ease-out) so it glides rather than snaps.

**React Implementation:**
```tsx
function MagneticButton() {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    ref.current.style.transform =
      `translate(${x * 0.35}px, ${y * 0.35}px)`;
  };
  const onLeave = () => {
    ref.current.style.transform = 'translate(0,0)';
  };
  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave}>
      <button ref={ref} style={{ transition: 'transform .15s ease-out' }}>
        Hover near me
      </button>
    </div>
  );
}
```

---

## Number Counter

*Digit bumps and overshoots on every increment*

**Tags:** count, increment, digits, numeric, stats, dollar amount

**Prompt Recipe:**
> Build a number that increments on click and bumps elastically each time. On each increment briefly apply scale(1.22) translateY(-6px), then settle back with a spring cubic-bezier(0.34,1.56,0.64,1) over ~0.4s. Restart the animation cleanly on rapid clicks by forcing a reflow.

**React Implementation:**
```tsx
function ElasticCounter() {
  const [val, setVal] = useState(12);
  const [bump, setBump] = useState(false);

  const increment = () => {
    setVal(v => v + 1);
    setBump(true);
    setTimeout(() => setBump(false), 400);
  };

  return (
    <span
      onClick={increment}
      style={{
        display: 'inline-block',
        transform: bump ? 'scale(1.25) translateY(-6px)' : 'none',
        transition: 'transform 0.4s cubic-bezier(.34,1.56,.64,1)',
      }}
    >
      {val}
    </span>
  );
}
```

---

## Toast Overshoot

*Slides past rest position before settling*

**Tags:** notification, alert, message, snackbar, popup, banner

**Prompt Recipe:**
> Build a toast that slides up from the bottom, overshoots its rest position, then settles. Transition transform from translateY(140%) scale(0.9) to translateY(0) scale(1) with cubic-bezier(0.18,1.25,0.4,1) over ~0.55s while opacity fades in. Auto-hide after a couple seconds.

**React Implementation:**
```tsx
function Toast({ message, show }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        transform: show
          ? 'translate(-50%, 0) scale(1)'
          : 'translate(-50%, 140%) scale(0.9)',
        opacity: show ? 1 : 0,
        transition:
          'transform .55s cubic-bezier(.18,1.25,.4,1), opacity .3s',
      }}
    >
      {message}
    </div>
  );
}
```

---

## Tab Pill Glide

*Indicator measures target width before moving*

**Tags:** tabs, navigation, segmented control, indicator, switcher, menu

**Prompt Recipe:**
> Build a segmented tab control where a highlighted pill slides between tabs. On click, read the target button's offsetLeft and offsetWidth and animate the pill's left and width to match with cubic-bezier(0.65,0,0.35,1) over ~0.4s; the active label color crossfades as the pill arrives.

**React Implementation:**
```tsx
function GlidingTabs({ tabs }) {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  const [style, setStyle] = useState({});

  useEffect(() => {
    const el = refs.current[active];
    if (el) setStyle({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  return (
    <div style={{ position: 'relative' }}>
      <span
        style={{
          position: 'absolute',
          ...style,
          transition: 'left .4s cubic-bezier(.65,0,.35,1), width .4s cubic-bezier(.65,0,.35,1)',
        }}
      />
      {tabs.map((t, i) => (
        <button key={t} ref={el => (refs.current[i] = el)} onClick={() => setActive(i)}>
          {t}
        </button>
      ))}
    </div>
  );
}
```

---

## Accordion Spring

*Max-height transition with rotating chevron*

**Tags:** faq, collapse, expand, disclosure, dropdown, details

**Prompt Recipe:**
> Build an accordion whose panels open with a springy feel and a rotating chevron. Animate max-height (0 to content height) with cubic-bezier(0.16,1,0.3,1) and rotate the chevron 180deg with a springy cubic-bezier(0.34,1.56,0.64,1). Pure CSS toggled by an .open class.

**React Implementation:**
```tsx
function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        {title}
        <span style={{ transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform .35s cubic-bezier(.34,1.56,.64,1)' }}>⌄</span>
      </button>
      <div style={{
        maxHeight: open ? 100 : 0,
        overflow: 'hidden',
        transition: 'max-height .45s cubic-bezier(.16,1,.3,1)',
      }}>
        {children}
      </div>
    </div>
  );
}
```

---

## Drag to Dismiss

*Pointer-tracked drag, snaps back or flies off past threshold*

**Tags:** swipe, delete, remove, gesture, flick, card

**Prompt Recipe:**
> Build a card you can drag horizontally with the pointer to dismiss. Track pointerdown/move/up, translate by the drag delta plus a subtle rotation, and fade opacity with distance. On release past a 100px threshold fling it off-screen; otherwise spring it back with cubic-bezier(0.34,1.56,0.64,1).

**React Implementation:**
```tsx
function DraggableCard({ onDismiss, children }) {
  const [x, setX] = useState(0);
  const start = useRef(0);
  const dragging = useRef(false);

  const onDown = (e) => { dragging.current = true; start.current = e.clientX; };
  const onMove = (e) => {
    if (!dragging.current) return;
    setX(e.clientX - start.current);
  };
  const onUp = () => {
    dragging.current = false;
    if (Math.abs(x) > 100) onDismiss();
    else setX(0);
  };

  return (
    <div
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      style={{
        transform: `translateX(${x}px) rotate(${x * 0.05}deg)`,
        opacity: Math.max(1 - Math.abs(x) / 250, 0.3),
        transition: dragging.current ? 'none' : 'transform .5s cubic-bezier(.34,1.56,.64,1)',
      }}
    >
      {children}
    </div>
  );
}
```

---

## Ripple Feedback

*Radial fade-out anchored to the exact click point*

**Tags:** click, tap, material, touch, wave, button press

**Prompt Recipe:**
> Build a button with a material-style ripple that starts at the exact click point. On click, spawn an absolutely-positioned circle at the pointer coordinates inside an overflow-hidden button, animate it from scale(0) to scale(2.6) while fading out over ~0.6s, then remove it.

**React Implementation:**
```tsx
function RippleButton({ children }) {
  const [ripples, setRipples] = useState([]);

  const addRipple = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const id = Date.now();
    setRipples(prev => [...prev, {
      id, size,
      x: e.clientX - r.left - size / 2,
      y: e.clientY - r.top - size / 2,
    }]);
    setTimeout(() => setRipples(prev => prev.filter(rp => rp.id !== id)), 650);
  };

  return (
    <button onClick={addRipple} style={{ position: 'relative', overflow: 'hidden' }}>
      {children}
      {ripples.map(rp => (
        <span key={rp.id} className="ripple" style={{
          width: rp.size, height: rp.size, left: rp.x, top: rp.y,
        }} />
      ))}
    </button>
  );
}
```

---

## Hold to Confirm

*Press and hold; a ring fills, release early to cancel*

**Tags:** long press, destructive, delete confirmation, safety, dangerous action, press and hold

**Prompt Recipe:**
> Build a circular 'hold to confirm' button with an SVG progress ring. On pointerdown animate the ring's stroke-dashoffset from full to 0 over 800ms linear; if held the whole time fire confirm and flash a success state, otherwise cancel and snap the ring back on early release.

**React Implementation:**
```tsx
function HoldToConfirm({ onConfirm, ms = 800 }) {
  const [holding, setHolding] = useState(false);
  const timer = useRef(null);

  const start = () => {
    setHolding(true);
    timer.current = setTimeout(() => { setHolding(false); onConfirm(); }, ms);
  };
  const cancel = () => { clearTimeout(timer.current); setHolding(false); };

  return (
    <button
      className={holding ? 'hold-btn holding' : 'hold-btn'}
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
    >
      <svg className="ring" viewBox="0 0 72 72">
        <circle className="track" cx="36" cy="36" r="33" />
        <circle className="prog" cx="36" cy="36" r="33" />
      </svg>
      <span>Hold</span>
    </button>
  );
}
```

---

## Rubber-band Slider

*Drag past either end and it stretches, then springs back*

**Tags:** range, slider, volume, brightness, scrub, overscroll

**Prompt Recipe:**
> Build a horizontal slider whose thumb resists past the ends like a rubber band. While dragging, map the pointer to 0–1, but when it exceeds the range add only ~32% of the overshoot so it stretches; on release remove the overshoot and spring the thumb back into range with cubic-bezier(0.34,1.56,0.64,1).

**React Implementation:**
```tsx
function RubberSlider() {
  const track = useRef(null);
  const [pct, setPct] = useState(0.5);
  const [snap, setSnap] = useState(false);

  const at = (clientX, rubber) => {
    const r = track.current.getBoundingClientRect();
    const raw = (clientX - r.left) / r.width;
    const clamped = Math.min(Math.max(raw, 0), 1);
    return rubber ? clamped + (raw - clamped) * 0.32 : clamped;
  };

  return (
    <div ref={track} className="track"
      onPointerMove={(e) => e.buttons && (setSnap(false), setPct(at(e.clientX, true)))}
      onPointerUp={(e) => { setSnap(true); setPct(at(e.clientX, false)); }}
    >
      <span className={snap ? 'thumb snap' : 'thumb'} style={{ left: `${pct * 100}%` }} />
    </div>
  );
}
```

---

## Like Burst

*Toggles, pops the heart, and emits a radial particle ring*

**Tags:** heart, favorite, love, reaction, social, twitter

**Prompt Recipe:**
> Build a like button that pops its heart and emits a particle burst when toggled on. Scale the heart to ~1.35 and back with a spring curve, fill it with the accent color, increment the count, and spawn ~8 small particles outward on an even circle that translate out and shrink to scale(0) over ~0.6s.

**React Implementation:**
```tsx
function LikeButton({ start = 128 }) {
  const [liked, setLiked] = useState(false);
  const [bits, setBits] = useState([]);

  const toggle = () => {
    const next = !liked;
    setLiked(next);
    if (next) {
      setBits(Array.from({ length: 8 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 8, d = 28;
        return { id: Date.now() + i, tx: Math.cos(a) * d, ty: Math.sin(a) * d };
      }));
      setTimeout(() => setBits([]), 600);
    }
  };

  return (
    <button className={liked ? 'like-btn liked pop' : 'like-btn'} onClick={toggle}>
      <Heart /> <span>{start + (liked ? 1 : 0)}</span>
      {bits.map(b => (
        <span key={b.id} className="particle"
          style={{ '--tx': `${b.tx}px`, '--ty': `${b.ty}px` }} />
      ))}
    </button>
  );
}
```

---

## Cursor Trail

*A chain of dots chases the pointer with eased lag*

**Tags:** mouse, pointer, follow, dots, playful, decoration

**Prompt Recipe:**
> Build a contained area where a chain of dots follows the cursor with eased lag. Track the pointer; each animation frame, lerp each dot ~35% toward the dot ahead of it (the first toward the cursor) so they form a comet tail. Decrease size and opacity down the chain and hide when the pointer leaves.

**React Implementation:**
```tsx
function CursorTrail({ count = 6 }) {
  const dots = useRef([]);
  const pts = useRef(Array.from({ length: count }, () => ({ x: 0, y: 0 })));
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let id;
    const tick = () => {
      let lead = target.current;
      pts.current.forEach((p, i) => {
        p.x += (lead.x - p.x) * 0.35;
        p.y += (lead.y - p.y) * 0.35;
        const el = dots.current[i];
        if (el) el.style.transform = `translate(${p.x}px, ${p.y}px)`;
        lead = p;
      });
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div onPointerMove={(e) => {
      const r = e.currentTarget.getBoundingClientRect();
      target.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} ref={el => (dots.current[i] = el)} className="trail-dot" />
      ))}
    </div>
  );
}
```

---

## Push Button

*A tactile depress with a real bottom edge — pure CSS*

**Tags:** 3d button, press, tactile, depth, keyboard, mechanical

**Prompt Recipe:**
> Build a button that physically depresses when pressed, pure CSS. Give it a solid bottom box-shadow to act as a 3D edge; on :active translateY it down by the edge height and shrink the shadow to ~1px over ~0.06s so it reads as a tactile push.

**React Implementation:**
```tsx
function PushButton({ children }) {
  // Pure CSS: the bottom box-shadow is the button's "edge".
  // :active drops it down and shrinks the edge so it reads
  // as a physical press — pair this with the .push-btn rule.
  return (
    <button className="push-btn">
      {children}
    </button>
  );
}
```

---

## Star Rating

*Hover previews a value, click locks it with a pop*

**Tags:** review, feedback, score, rank, stars, rate

**Prompt Recipe:**
> Build a five-star rating control. On hover, light every star up to the hovered index in the accent color as a live preview; on click, lock that value and briefly pop the clicked star with a spring scale. On mouse leave, fall back to showing the locked value.

**React Implementation:**
```tsx
function StarRating({ count = 5 }) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div onMouseLeave={() => setHover(0)}>
      {Array.from({ length: count }).map((_, i) => {
        const n = i + 1;
        const lit = (hover || value) >= n;
        return (
          <button
            key={n}
            onMouseEnter={() => setHover(n)}
            onClick={() => setValue(n)}
            style={{ color: lit ? '#FF8A00' : '#2A2A2E' }}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
```

---

## Floating Label

*Placeholder lifts into a label on focus — pure CSS*

**Tags:** form, input, text field, placeholder, label, material design

**Prompt Recipe:**
> Build a text field whose placeholder floats up into a label when focused or filled, pure CSS. Give the input a single-space placeholder so :placeholder-shown reflects emptiness; position the label over the input and, on input:focus or :not(:placeholder-shown), translate it up and scale it down into the accent color over ~0.2s.

**React Implementation:**
```tsx
function FloatingField({ label }) {
  // The motion is pure CSS: keep a " " placeholder so
  // :placeholder-shown tracks emptiness, and animate the
  // adjacent label on :focus / :not(:placeholder-shown).
  return (
    <div className="field">
      <input id="email" placeholder=" " />
      <label htmlFor="email">{label}</label>
    </div>
  );
}
```

---

## Copy Button

*Icon crossfades to a check and the label swaps, then reverts*

**Tags:** clipboard, copy paste, code, snippet, share, duplicate

**Prompt Recipe:**
> Build a copy-to-clipboard button that confirms with a crossfade. On click write the value to the clipboard, then crossfade the copy glyph out and a green check in with a spring scale while the label swaps from "Copy" to "Copied"; revert both after ~1.4s.

**React Implementation:**
```tsx
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <button className={copied ? 'copy-btn copied' : 'copy-btn'} onClick={copy}>
      <span className="copy-icon">
        <CopyIcon className="ic-copy" />
        <CheckIcon className="ic-check" />
      </span>
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
```

---

## Quantity Stepper

*Value pops on each change; clamps at zero*

**Tags:** cart, ecommerce, plus minus, amount, count, checkout

**Prompt Recipe:**
> Build a quantity stepper with − and + buttons around a number. On each change update the value (clamped at a minimum) and briefly pop it with a spring scale(1.3) that settles via cubic-bezier(0.34,1.56,0.64,1); dip the pressed button with a quick scale(0.9) on :active. Use tabular-nums so the digits don't shift.

**React Implementation:**
```tsx
function Stepper({ min = 0 }) {
  const [n, setN] = useState(1);
  const [bump, setBump] = useState(false);

  const change = (d) => {
    setN((v) => Math.max(min, v + d));
    setBump(true);
    setTimeout(() => setBump(false), 350);
  };

  return (
    <div className="stepper">
      <button className="step-btn" onClick={() => change(-1)}>−</button>
      <span className={bump ? 'step-val bump' : 'step-val'}>{n}</span>
      <button className="step-btn" onClick={() => change(1)}>+</button>
    </div>
  );
}
```

---

## Choice Chips

*Toggle filters that pop as they switch on and off*

**Tags:** filter, tags, multi select, options, categories, toggle

**Prompt Recipe:**
> Build a row of selectable filter chips. Clicking a chip toggles an .on state that fills it with the accent color and flips the text to the dark background color, with a brief spring pop (scale ~1.12) on each toggle. Multiple chips can be active at once.

**React Implementation:**
```tsx
function ChoiceChips({ options }) {
  const [on, setOn] = useState(() => new Set());

  const toggle = (opt) =>
    setOn((prev) => {
      const next = new Set(prev);
      next.has(opt) ? next.delete(opt) : next.add(opt);
      return next;
    });

  return (
    <div>
      {options.map((opt) => (
        <button
          key={opt}
          className={on.has(opt) ? 'chip on' : 'chip'}
          onClick={() => toggle(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
```

---

## PIN Input

*Each digit pops and auto-advances to the next box*

**Tags:** otp, one time password, verification code, 2fa, mfa, security code

**Prompt Recipe:**
> Build a one-time-code / PIN input of four single-character boxes. When a digit is typed, mark that box filled (accent border) and give it a brief spring pop (scale ~1.14 with cubic-bezier(0.34, 1.56, 0.64, 1)), then move focus to the next box automatically. On Backspace in an empty box, move focus to the previous box. Keep focus rings on the active box.

**React Implementation:**
```tsx
function PinInput({ length = 4 }) {
  const refs = useRef([]);
  const onChange = (i, e) => {
    const el = e.target;
    if (el.value) {
      el.classList.add('filled', 'pop');
      setTimeout(() => el.classList.remove('pop'), 350);
      refs.current[i + 1]?.focus();
    } else {
      el.classList.remove('filled');
    }
  };
  const onKey = (i, e) => {
    if (e.key === 'Backspace' && !e.target.value)
      refs.current[i - 1]?.focus();
  };
  return (
    <div>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          maxLength={1}
          ref={(el) => (refs.current[i] = el)}
          onChange={(e) => onChange(i, e)}
          onKeyDown={(e) => onKey(i, e)}
        />
      ))}
    </div>
  );
}
```

---

## Password Meter

*Segments fill and shift color as strength climbs*

**Tags:** strength, security, signup, validation, form, gauge

**Prompt Recipe:**
> Build a password strength meter of four segment bars under a text field. On every keystroke score the value (length tiers, plus a point each for containing a digit and a symbol), clamp to 0–4, and reveal that many bars by scaling them from scaleX(0) to scaleX(1) with a spring cubic-bezier(0.34, 1.56, 0.64, 1). Tint the filled bars red at weak, amber at medium, green at strong, and show a matching text label.

**React Implementation:**
```tsx
function PasswordMeter() {
  const [score, setScore] = useState(0);
  const rate = (v) => {
    let s = 0;
    if (v.length > 4) s++;
    if (v.length > 8) s++;
    if (/[0-9]/.test(v)) s++;
    if (/[^a-zA-Z0-9]/.test(v)) s++;
    return Math.min(s, 4);
  };
  const colors = ['#FF5C5C', '#FF8A00', '#FF8A00', '#4CD08A'];
  return (
    <div>
      <input onChange={(e) => setScore(rate(e.target.value))} />
      <div className="meter">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            style={{
              transform: i < score ? 'scaleX(1)' : 'scaleX(0)',
              background: colors[score - 1],
            }}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## Pointer Tooltip

*Label trails the cursor with eased follow*

**Tags:** hover, hint, label, cursor follow, info, help

**Prompt Recipe:**
> Build a tooltip label that smoothly trails the cursor inside a zone. On mousemove store the target x/y relative to the zone; in a requestAnimationFrame loop, lerp the label's current position toward the target by ~0.18 each frame and apply it as a translate, so it eases behind the pointer instead of snapping. Fade the label in on hover and show the live coordinates.

**React Implementation:**
```tsx
function PointerTooltip() {
  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    let raf;
    const loop = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.18;
      p.y += (p.ty - p.y) * 0.18;
      if (ref.current)
        ref.current.style.transform = `translate(${p.x}px, ${p.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    pos.current.tx = e.clientX - r.left;
    pos.current.ty = e.clientY - r.top;
  };
  return (
    <div onMouseMove={onMove} style={{ position: 'relative' }}>
      <span ref={ref} className="tip">follow</span>
    </div>
  );
}
```

---

## Swipe to Reveal

*Drag an item horizontally to expose action buttons*

**Tags:** actions, delete, archive, mobile, list item, gesture

**Prompt Recipe:**
> Build a list item that can be swiped left to reveal archive and delete action buttons behind it. Track pointerdown/move/up, translate the item left following the pointer (clamped to 0 on the right). On release, if dragged past ~96px add an .open class that holds it at translateX(-96px) with a spring transition; otherwise spring it back to 0. The action buttons sit absolutely behind the item.

**React Implementation:**
```tsx
function SwipeToReveal() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const start = useRef(0);
  const dragging = useRef(false);

  const onDown = (e) => {
    dragging.current = true;
    start.current = e.clientX;
    ref.current.classList.add('dragging');
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    const dx = Math.min(0, e.clientX - start.current);
    ref.current.style.transform = `translateX(${dx}px)`;
  };
  const onUp = (e) => {
    if (!dragging.current) return;
    dragging.current = false;
    ref.current.classList.remove('dragging');
    const dx = e.clientX - start.current;
    setOpen(dx < -96);
    ref.current.style.transform = '';
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: 0 }}>
        <button>Archive</button>
        <button>Delete</button>
      </div>
      <div
        ref={ref}
 className={open ? 'swipe-item open' : 'swipe-item'}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
      >
        Swipe me left
      </div>
    </div>
  );
}
```

---

## Rotary Knob

*Drag in a circle to set a value; snaps to detents on release*

**Tags:** dial, volume, control, audio, synth, angle

**Prompt Recipe:**
> Build a rotary knob that the user can drag in a circle to set a value from 0 to 270 degrees. On pointerdown record the starting angle from the knob center; on pointermove compute the delta angle, clamp it to 0–270, and rotate the knob. On release snap to the nearest detent (e.g. 10 steps) with a spring cubic-bezier(0.34,1.56,0.64,1). Show the current value as a number below the knob and fill an SVG arc proportional to the angle.

**React Implementation:**
```tsx
function RotaryKnob({ max = 270, steps = 10 }) {
  const ref = useRef(null);
  const [angle, setAngle] = useState(0);
  const dragging = useRef(false);
  const prevAngle = useRef(0);
  const pointerOffset = 225;

  const getAngle = (e) => {
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    return Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI + 90;
  };

  const onDown = (e) => {
    dragging.current = true;
    prevAngle.current = getAngle(e);
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    const cur = getAngle(e);
    let delta = cur - prevAngle.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    prevAngle.current = cur;
    setAngle((a) => Math.min(max, Math.max(0, a + delta)));
  };
  const onUp = () => {
    dragging.current = false;
    setAngle((a) => Math.round(a / (max / steps)) * (max / steps));
  };

  return (
    <div
      ref={ref}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      style={{ transform: `rotate(${angle + pointerOffset}deg)`, transition: dragging.current ? 'none' : 'transform .5s cubic-bezier(.34,1.56,.64,1)' }}
    />
  );
}
```

---

## Reorderable List

*Drag items up and down; others shift to make room*

**Tags:** drag and drop, sort, rank, todo, playlist, kanban

**Prompt Recipe:**
> Build a reorderable vertical list where items can be dragged up or down to rearrange. On pointerdown on an item, mark it as dragging (disable its transition, add a shadow). On pointermove translate it by the drag delta; when it crosses the midpoint of an adjacent item, swap their positions in the array and reset the drag origin so the dragged item stays under the cursor. On release, snap it into place with a glide cubic-bezier(0.16,1,0.3,1) transition. Show a drag handle on each item.

**React Implementation:**
```tsx
function ReorderList({ items: initial }) {
  const [items, setItems] = useState(initial);
  const [dragIdx, setDragIdx] = useState(null);
  const [dragY, setDragY] = useState(0);
  const startY = useRef(0);
  const itemH = 44;

  const onDown = (i, e) => {
    setDragIdx(i);
    startY.current = e.clientY;
  };
  const onMove = (e) => {
    if (dragIdx === null) return;
    const dy = e.clientY - startY.current;
    setDragY(dy);
    const target = Math.min(items.length - 1,
      Math.max(0, Math.round((i * itemH + dy) / itemH)));
    if (target !== dragIdx) {
      const next = [...items];
      const [m] = next.splice(dragIdx, 1);
      next.splice(target, 0, m);
      setItems(next);
      setDragIdx(target);
      startY.current = e.clientY;
      setDragY(0);
    }
  };
  const onUp = () => { setDragIdx(null); setDragY(0); };

  return (
    <div onPointerMove={onMove} onPointerUp={onUp}>
      {items.map((item, i) => (
        <div
          key={item}
          onPointerDown={(e) => onDown(i, e)}
          style={{
            transform: dragIdx === i ? `translateY(${dragY}px)` : '',
            transition: dragIdx === i ? 'none' : 'transform .3s cubic-bezier(.16,1,.3,1)',
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
```

---

## Expanding Search

*Field grows on hover or focus, glide easing*

**Tags:** search bar, find, magnifier, filter, lookup, query

**Prompt Recipe:**
> Build a pill-shaped search field that starts collapsed to just its icon (~56px) and expands to full width when focused. Use :focus-within and animate only the width over ~0.4s with a glide cubic-bezier(0.16, 1, 0.3, 1). Keep overflow hidden so the input text is clipped while collapsed, and let the icon stay pinned on the left.

**React Implementation:**
```tsx
function ExpandingSearch() {
  return (
    <div
      style={{
        width: 56,
        overflow: 'hidden',
        transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}
      onFocusCapture={(e) => (e.currentTarget.style.width = '230px')}
      onBlurCapture={(e) => (e.currentTarget.style.width = '56px')}
    >
      <SearchIcon />
      <input placeholder="Search…" />
    </div>
  );
}
```

---

