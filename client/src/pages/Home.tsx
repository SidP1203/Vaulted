import { useState, useEffect, useRef, useCallback, useMemo, useId } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useScroll,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Check,
  Sparkles,
  Code2,
  Zap,
  MousePointer2,
  Hand,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ContactForm } from "@/components/ContactForm";
import { Navbar } from "@/components/Navbar";

/* ════════════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════════════ */

const heroScenes = [
  {
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=2400&q=80",
    headline: ["A website", "built right."],
    sub: "Hand-written code. No templates. No compromises.",
  },
  {
    img: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=2400&q=80",
    headline: ["A brand", "brought to life."],
    sub: "Pixel-precise design that tells your story.",
  },
  {
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=2400&q=80",
    headline: ["An experience", "crafted by hand."],
    sub: "Animations and interactions that feel intentional.",
  },
];

const serviceTabs = [
  {
    id: "business",
    label: "Business",
    title: "Sites that turn visitors into customers.",
    body: "Clean lead capture, trustworthy hierarchy, and copy that actually says what you do — built to convert from the very first scroll.",
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    title: "Stores that load fast and sell faster.",
    body: "Cart, checkout, payments, inventory — wired together cleanly. No bloated themes, no laggy plugins.",
    img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "nonprofits",
    label: "Non-Profits",
    title: "Tell your story. Take donations. Grow.",
    body: "Stripe-powered giving, volunteer signup, event pages, and a CMS your team can actually use.",
    img: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "portfolios",
    label: "Portfolios",
    title: "Show your work the way it deserves.",
    body: "Editorial layouts, smooth scroll, immersive case studies. Built so your work is the loudest thing on the page.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=1600&q=80",
  },
];

const tickerPhrases = ["Hand-written code", "No templates", "Pixel-perfect", "Real craft", "Built to last", "60fps everywhere"];

const processSteps = [
  { n: "01", title: "Discovery call",       body: "30 minutes. We talk about your business, your goals, and whether we're a fit. No pressure, no upsell." },
  { n: "02", title: "Scope & estimate",     body: "A clear breakdown of pages, features, timeline, and price. Fixed scope, no surprises." },
  { n: "03", title: "Design",               body: "Low-fi wireframes, then full mockups. You see every screen before a line of code is written." },
  { n: "04", title: "Build",                body: "Hand-written code. You get a live staging link from day one to watch progress in real time." },
  { n: "05", title: "Review & polish",      body: "Two rounds of revisions baked in. We sweat the details — micro-animations, copy, accessibility." },
  { n: "06", title: "Launch & support",     body: "We deploy, transfer ownership, and stick around for 30 days of free support after go-live." },
];

const faqs = [
  { q: "How much does a typical project cost?",     a: "Most marketing sites land between $1,500 and $5,000. E-commerce and custom builds start around $5,000. Hourly is $35–50/hr for ongoing work." },
  { q: "How long does it take?",                    a: "Marketing sites typically ship in 2–4 weeks. More complex builds run 4–8 weeks. Timeline is locked in during the scope phase." },
  { q: "Do you use templates or page builders?",    a: "No. Every site is hand-written in modern code (React, Next.js, or whatever fits the job). You own everything — no platform lock-in." },
  { q: "Who hosts the site?",                       a: "You do, under your accounts. We help you set up hosting, domain, and email — then hand over the keys. Optional managed hosting available." },
  { q: "What about ongoing changes?",               a: "Two options: a small monthly retainer for regular updates, or pay-as-you-go at $35–50/hr. You're never locked into a contract." },
  { q: "Will my site be fast and accessible?",      a: "Yes — that's not an upsell, it's the standard. Every build ships with proper performance budgets, semantic HTML, and WCAG-aligned accessibility." },
];

const galleryImages = [
  { title: "CSEL Cincinnati",     img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80" },
  { title: "Halcyon Studio",      img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=900&q=80" },
  { title: "Northwind Capital",   img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80" },
  { title: "Pierce Architecture", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=900&q=80" },
  { title: "Field & Co.",         img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80" },
  { title: "Maison Verde",        img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80" },
  { title: "Atelier Nine",        img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80" },
  { title: "Holloway Legal",      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80" },
  { title: "Lowtide Records",     img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80" },
  { title: "Fern + Slate",        img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=80" },
];

const pricingFeatures = [
  "Hand-written, lightning-fast code",
  "Custom design — never a template",
  "Mobile-first, fully responsive",
  "WCAG-aligned accessibility",
  "SEO foundations & performance budget",
  "CMS or static — your call",
  "Two rounds of revisions included",
  "30 days of free post-launch support",
];

/* ════════════════════════════════════════════════════════════════
   HOOKS
   ════════════════════════════════════════════════════════════════ */

function useInViewOnce(amount: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount, once: true });
  return { ref, inView };
}

/* ════════════════════════════════════════════════════════════════
   PRIMITIVES
   ════════════════════════════════════════════════════════════════ */

function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`${className} ${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}>
      {eyebrow && (
        <ScrollReveal>
          <span className="eyebrow mb-5 inline-flex">{eyebrow}</span>
        </ScrollReveal>
      )}
      <ScrollReveal delay={0.05}>
        <h2 className="display-3 text-balance t-primary">{title}</h2>
      </ScrollReveal>
      {sub && (
        <ScrollReveal delay={0.1}>
          <p className="mt-5 text-[17px] leading-relaxed t-tertiary max-w-xl">{sub}</p>
        </ScrollReveal>
      )}
    </div>
  );
}

function ScrollReveal({
  children,
  delay = 0,
  y = 18,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewOnce();
  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 1, 0.5, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Letter-by-letter stagger — used in hero */
function StaggerWords({ lines, keyId }: { lines: string[]; keyId: string | number }) {
  const reduce = useReducedMotion();
  // Reduced motion: render plain text, no JS animation at all (rule: reduced-motion)
  if (reduce) {
    return (
      <span className="block">
        {lines.map((line, li) => (<span key={li} className="block">{line}</span>))}
      </span>
    );
  }
  // Transform + opacity only (rule: animation-properties) — no blur/filter
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
  };
  const letter: Variants = {
    hidden: { opacity: 0, y: "0.5em" },
    show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] } },
  };
  return (
    <motion.span key={keyId} variants={container} initial="hidden" animate="show" className="block">
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((word, wi) => (
            <span key={wi} className="inline-block mr-[0.25em] whitespace-nowrap overflow-hidden align-bottom">
              {Array.from(word).map((ch, ci) => (
                <motion.span key={ci} variants={letter} className="inline-block">{ch}</motion.span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

/* Magnetic button — subtle cursor pull (gesture-feedback + scale-feedback) */
function MagneticButton({
  children,
  className = "",
  onClick,
  testId,
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  testId?: string;
  variant?: "primary" | "ghost";
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 280, damping: 22, mass: 0.5 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const mx = e.clientX - r.left - r.width / 2;
    const my = e.clientY - r.top  - r.height / 2;
    x.set(mx * 0.25);
    y.set(my * 0.35);
  }
  function onLeave() { x.set(0); y.set(0); }

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`}
      data-testid={testId}
    >
      {children}
    </motion.button>
  );
}

/* Live ticker — infinite marquee with separators */
function LiveTicker({ items }: { items: string[] }) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden marquee-mask py-7 hairline-top hairline-bottom">
      <div className="marquee-track">
        {doubled.map((p, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6 text-[14px] font-medium t-tertiary whitespace-nowrap">
            {p}
            <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-white/25" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* Browser-window chrome */
function BrowserChrome({ url, children, className = "" }: { url: string; children?: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl overflow-hidden ${className}`}
      style={{ border: "1px solid hsl(0 0% 100% / 0.10)", boxShadow: "var(--shadow-3)" }}>
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: "hsl(var(--ink-2))" }}>
        <span className="flex gap-1.5" aria-hidden>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(var(--os-red))" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(var(--os-yellow))" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(var(--os-green))" }} />
        </span>
        <span className="flex-1 truncate rounded px-2 py-0.5 text-[10px] t-tertiary font-mono"
          style={{ background: "hsl(0 0% 100% / 0.06)" }}>
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION — HERO
   ════════════════════════════════════════════════════════════════ */

function Hero() {
  const [scene, setScene] = useState(0);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], reduce ? [1, 1] : [1, 0.4]);
  const heroBgY     = useTransform(scrollY, [0, 800], reduce ? [0, 0] : [0, 200]);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setScene(s => (s + 1) % heroScenes.length), 5200);
    return () => clearInterval(id);
  }, [reduce]);

  const current = heroScenes[scene];

  return (
    <section id="top" className="relative h-[100svh] min-h-[680px] w-full overflow-hidden surface-sunken">
      {/* Cycling background images */}
      {heroScenes.map((s, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: scene === i ? 1 : 0 }}
          transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ y: scene === i ? heroBgY : 0 }}
          >
            <img src={s.img} alt="" className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"} />
          </motion.div>
        </motion.div>
      ))}

      {/* Dark scrim — keeps text readable (color-accessible-pairs) */}
      <div aria-hidden className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, hsl(0 0% 0% / 0.55) 0%, hsl(0 0% 0% / 0.30) 35%, hsl(0 0% 0% / 0.50) 75%, hsl(0 0% 0% / 0.85) 100%)" }} />
      <div aria-hidden className="absolute inset-0 aurora opacity-70 pointer-events-none" />

      {/* Content */}
      <motion.div style={{ opacity: heroOpacity }} className="relative h-full container-x flex flex-col justify-end pb-24 md:pb-32">
        <ScrollReveal>
          <span className="eyebrow mb-6 text-white/70">Vaulted Web Solutions</span>
        </ScrollReveal>

        <h1 className="display-1 text-white max-w-[18ch] text-balance">
          <AnimatePresence mode="wait">
            <StaggerWords key={scene} keyId={scene} lines={current.headline} />
          </AnimatePresence>
        </h1>

        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${scene}`}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="mt-7 max-w-md text-[17px] leading-relaxed text-white/75"
          >
            {current.sub}
          </motion.p>
        </AnimatePresence>

        <ScrollReveal delay={0.5} className="mt-9">
          <div className="flex flex-wrap items-center gap-3">
            {/* ONE primary CTA per screen */}
            <MagneticButton
              variant="primary"
              testId="hero-cta-start"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start a project <ArrowRight className="w-4 h-4" />
            </MagneticButton>

            <button
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-link"
              data-testid="hero-link-work"
            >
              See our work
            </button>
          </div>
        </ScrollReveal>

        {/* Slide indicators — also work as buttons (gesture-alternative) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2" role="tablist" aria-label="Hero scenes">
          {heroScenes.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={scene === i}
              aria-label={`Show scene ${i + 1}`}
              onClick={() => setScene(i)}
              className="h-1 rounded-full transition-all"
              style={{
                width: scene === i ? 28 : 14,
                background: scene === i ? "hsl(var(--paper))" : "hsl(var(--paper) / 0.35)",
              }}
              data-testid={`hero-indicator-${i}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION — TICKER
   ════════════════════════════════════════════════════════════════ */

function TickerSection() {
  return <LiveTicker items={tickerPhrases} />;
}

/* ════════════════════════════════════════════════════════════════
   SECTION — STATS
   ════════════════════════════════════════════════════════════════ */

function AnimatedNumber({ to, suffix = "" }: { to: number; suffix?: string }) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewOnce(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setVal(to); return; }
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);
  return (
    <span ref={ref} className="font-mono">{val.toLocaleString()}{suffix}</span>
  );
}

function Stats() {
  const items = [
    { value: 100, suffix: "%", label: "Hand-written code" },
    { value: 60,  suffix: "fps", label: "Animation budget" },
    { value: 30,  suffix: " days", label: "Of free post-launch support" },
    { value: 0,   suffix: "", label: "Templates used. Ever." },
  ];
  return (
    <section className="container-x section-y">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-10">
        {items.map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div>
              <p className="display-2 t-primary">
                <AnimatedNumber to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-[14px] t-tertiary max-w-[18ch]">{s.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION — SERVICES (Radix Tabs, auto-advance)
   ════════════════════════════════════════════════════════════════ */

function ServicesTabs() {
  const [active, setActive] = useState(serviceTabs[0].id);
  const reduce = useReducedMotion();
  const pausedRef = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setActive(curr => {
        const idx = serviceTabs.findIndex(t => t.id === curr);
        return serviceTabs[(idx + 1) % serviceTabs.length].id;
      });
    }, 4500);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section id="services" className="container-x section-y hairline-top">
      <SectionHeading
        eyebrow="What we build"
        title="Sites that work as hard as you do."
        sub="From a one-page launch to a full e-commerce build — every project is designed and coded to fit your business, not the other way around."
        align="center"
        className="mb-14 md:mb-16"
      />

      <Tabs
        value={active}
        onValueChange={setActive}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <TabsList className="mx-auto flex flex-wrap justify-center gap-1.5 bg-transparent p-0 h-auto mb-10">
          {serviceTabs.map(t => (
            <TabsTrigger
              key={t.id}
              value={t.id}
              className="relative rounded-full px-5 py-2.5 text-[14px] font-medium t-tertiary
                         data-[state=active]:bg-white data-[state=active]:text-black
                         hover:t-primary transition-colors"
              data-testid={`tab-${t.id}`}
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {serviceTabs.map(t => (
          <TabsContent key={t.id} value={t.id} className="mt-0">
            <ScrollReveal>
              <article className="relative overflow-hidden rounded-2xl surface-raised">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[460px] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={t.id}
                        src={t.img}
                        alt=""
                        initial={reduce ? false : { scale: 1.08, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center gap-5">
                    <span className="eyebrow">{t.label}</span>
                    <h3 className="display-4 t-primary text-balance">{t.title}</h3>
                    <p className="text-[16px] leading-relaxed t-secondary">{t.body}</p>
                    <div className="mt-2">
                      <button
                        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                        className="btn-link"
                        data-testid={`tab-cta-${t.id}`}
                      >
                        Discuss this project
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION — LOOK AROUND (drag canvas + arrow buttons fallback)
   ════════════════════════════════════════════════════════════════ */

const TILE_W = 2400;
const TILE_H = 1500;
const cardLayout = [
  { i: 0, x:  140, y:  140, w: 340, rot: -3 },
  { i: 1, x:  560, y:  220, w: 280, rot:  2 },
  { i: 2, x:  900, y:   80, w: 380, rot: -1 },
  { i: 3, x: 1380, y:  200, w: 300, rot:  3 },
  { i: 4, x: 1780, y:   80, w: 360, rot: -2 },
  { i: 5, x:  220, y:  640, w: 320, rot:  2 },
  { i: 6, x:  640, y:  720, w: 380, rot: -2 },
  { i: 7, x: 1120, y:  680, w: 300, rot:  1 },
  { i: 8, x: 1500, y:  760, w: 340, rot: -3 },
  { i: 9, x: 1900, y:  640, w: 280, rot:  2 },
  { i: 0, x:  120, y: 1180, w: 360, rot:  1 },
  { i: 2, x:  580, y: 1240, w: 300, rot: -2 },
  { i: 4, x:  980, y: 1180, w: 340, rot:  3 },
  { i: 6, x: 1420, y: 1280, w: 320, rot: -1 },
  { i: 8, x: 1840, y: 1200, w: 280, rot:  2 },
];

function LookAroundCard({ item, w, rot }: { item: typeof galleryImages[0]; w: number; rot: number }) {
  return (
    <BrowserChrome
      url={`${item.title.toLowerCase().replace(/[^a-z]/g, "")}.com`}
      className=""
    >
      <img src={item.img} alt={item.title} draggable={false} loading="lazy"
        className="w-full object-cover block select-none pointer-events-none"
        style={{ height: w * 0.62 }} />
    </BrowserChrome>
  );
}

function LookAround() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const wrappedX = useTransform(x, v => ((v % TILE_W) + TILE_W * 1.5) % TILE_W - TILE_W / 2);
  const wrappedY = useTransform(y, v => ((v % TILE_H) + TILE_H * 1.5) % TILE_H - TILE_H / 2);

  const tiles: Array<[number, number]> = [];
  for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) tiles.push([i, j]);

  // Keyboard / button fallback (gesture-alternative)
  const nudge = useCallback((dx: number, dy: number) => {
    setHasInteracted(true);
    x.set(x.get() + dx);
    y.set(y.get() + dy);
  }, [x, y]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) return;
      const el = document.activeElement;
      if (!el?.closest("[data-lookaround]")) return;
      e.preventDefault();
      const step = 220;
      if (e.key === "ArrowLeft")  nudge( step,  0);
      if (e.key === "ArrowRight") nudge(-step,  0);
      if (e.key === "ArrowUp")    nudge( 0,  step);
      if (e.key === "ArrowDown")  nudge( 0, -step);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nudge]);

  return (
    <section
      id="work"
      data-lookaround
      tabIndex={0}
      aria-label="Featured work — drag to explore"
      className="relative overflow-hidden surface-sunken hairline-top hairline-bottom focus:outline-none"
      style={{ height: 660 }}
    >
      {/* Drag canvas */}
      <motion.div
        drag={!reduce}
        dragMomentum
        dragTransition={{ power: 0.35, timeConstant: 350, bounceStiffness: 0, bounceDamping: 0 }}
        onDragStart={() => setHasInteracted(true)}
        style={{ x, y, width: TILE_W, height: TILE_H, position: "absolute", left: "50%", top: "50%", marginLeft: -TILE_W / 2, marginTop: -TILE_H / 2, cursor: reduce ? "default" : "grab" }}
        whileDrag={{ cursor: "grabbing" }}
        data-testid="lookaround-canvas"
      >
        <motion.div style={{ x: wrappedX, y: wrappedY, position: "absolute", inset: 0 }}>
          {tiles.map(([tx, ty]) => (
            <div key={`${tx}-${ty}`} style={{ position: "absolute", left: tx * TILE_W, top: ty * TILE_H, width: TILE_W, height: TILE_H }}>
              {cardLayout.map((c, idx) => (
                <div key={idx} style={{ position: "absolute", left: c.x, top: c.y }}>
                  <LookAroundCard item={galleryImages[c.i]} w={c.w} rot={c.rot} />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Vignette + edge fades */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 50%, hsl(var(--ink-0) / 0.92) 0%, hsl(var(--ink-0) / 0.55) 45%, hsl(var(--ink-0) / 0.15) 75%, transparent 100%)" }} />
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to right, hsl(var(--ink-1)) 0%, transparent 14%, transparent 86%, hsl(var(--ink-1)))" }} />

      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none px-6 text-center">
        <span className="eyebrow text-white/60">Made with Vaulted</span>
        <h2 className="display-2 text-white">Look around.</h2>
        <p className="t-secondary text-[15px] max-w-md leading-relaxed">
          Real sites, hand-built for real businesses.
        </p>
        <AnimatePresence>
          {!hasInteracted && (
            <motion.div
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-2 inline-flex items-center gap-2 text-white/55 text-[12px] font-medium tracking-wide"
            >
              <Hand className="w-3.5 h-3.5" /> Drag anywhere to explore
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Arrow nav fallback — full 2D (gesture-alternative + keyboard-shortcuts) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 grid grid-cols-3 gap-1.5 pointer-events-auto">
        <span />
        <button
          aria-label="Pan up"
          onClick={() => nudge(0, 220)}
          className="w-10 h-10 rounded-full grid place-items-center surface-elevated hover:bg-white/10 transition-colors"
          data-testid="lookaround-up"
        >
          <ArrowLeft className="w-4 h-4 text-white rotate-90" />
        </button>
        <span />
        <button
          aria-label="Pan left"
          onClick={() => nudge(220, 0)}
          className="w-10 h-10 rounded-full grid place-items-center surface-elevated hover:bg-white/10 transition-colors"
          data-testid="lookaround-left"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>
        <button
          aria-label="Pan down"
          onClick={() => nudge(0, -220)}
          className="w-10 h-10 rounded-full grid place-items-center surface-elevated hover:bg-white/10 transition-colors"
          data-testid="lookaround-down"
        >
          <ArrowLeft className="w-4 h-4 text-white -rotate-90" />
        </button>
        <button
          aria-label="Pan right"
          onClick={() => nudge(-220, 0)}
          className="w-10 h-10 rounded-full grid place-items-center surface-elevated hover:bg-white/10 transition-colors"
          data-testid="lookaround-right"
        >
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION — ANIMATION SHOWCASE (4 demos)
   ════════════════════════════════════════════════════════════════ */

function DemoCard({ tag, title, desc, children }: { tag: string; title: string; desc: string; children: React.ReactNode }) {
  return (
    <ScrollReveal>
      <article className="surface-raised rounded-2xl overflow-hidden flex flex-col">
        <div className="relative h-[280px] flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(180deg, hsl(var(--ink-3)) 0%, hsl(var(--ink-2)) 100%)" }}>
          {children}
        </div>
        <div className="p-6 hairline-top">
          <span className="eyebrow mb-2 inline-flex">{tag}</span>
          <h3 className="display-4 t-primary text-[20px] md:text-[22px]">{title}</h3>
          <p className="mt-2 text-[14px] t-tertiary leading-relaxed">{desc}</p>
        </div>
      </article>
    </ScrollReveal>
  );
}

/* 3D tilt + parallax depth */
function TiltDemo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-50, 50], [12, -12]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(x, [-50, 50], [-12, 12]), { stiffness: 200, damping: 18 });
  const px = useSpring(useTransform(x, [-50, 50], [-10, 10]), { stiffness: 200, damping: 18 });
  const py = useSpring(useTransform(y, [-50, 50], [-10, 10]), { stiffness: 200, damping: 18 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width  - 0.5) * 100);
    y.set(((e.clientY - r.top)  / r.height - 0.5) * 100);
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      className="w-full h-full flex items-center justify-center" style={{ perspective: 900 }}>
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative w-[210px] h-[150px] rounded-xl"
        animate={reduce ? {} : { y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <div className="absolute inset-0 rounded-xl"
          style={{ background: "linear-gradient(135deg, hsl(var(--accent-glow)) 0%, hsl(280 80% 55%) 100%)", boxShadow: "var(--shadow-3)" }} />
        <motion.div style={{ x: px, y: py, transform: "translateZ(40px)" }}
          className="absolute inset-x-5 top-5 h-3 rounded-full bg-white/40" />
        <motion.div style={{ x: px, y: py, transform: "translateZ(60px)" }}
          className="absolute inset-x-5 top-12 h-2 rounded-full bg-white/30 w-16" />
        <motion.div style={{ x: px, y: py, transform: "translateZ(80px)" }}
          className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-white/90 grid place-items-center">
          <Sparkles className="w-4 h-4 text-black" />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* Scramble text */
function ScrambleDemo() {
  const reduce = useReducedMotion();
  const targets = ["BUILT TO MOVE", "PIXEL PRECISE", "HAND CRAFTED"];
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState(targets[0]);
  const { ref, inView } = useInViewOnce(0.5);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setText(targets[idx]); return; }
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&";
    const target = targets[idx];
    let frame = 0;
    let iv: number;
    iv = window.setInterval(() => {
      frame++;
      const out = target.split("").map((c, i) => {
        if (c === " ") return " ";
        if (frame > i * 2 + 4) return c;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join("");
      setText(out);
      if (frame > target.length * 2 + 8) {
        clearInterval(iv);
        setTimeout(() => setIdx(p => (p + 1) % targets.length), 1400);
      }
    }, 45);
    return () => clearInterval(iv);
  }, [idx, inView, reduce]);

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center">
      <p className="font-mono text-white text-[24px] md:text-[28px] tracking-wider">{text}<span className="cursor-blink">_</span></p>
    </div>
  );
}

/* Magnetic button demo */
function MagneticDemo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.4);
    y.set((e.clientY - r.top  - r.height / 2) * 0.5);
  }

  return (
    <div onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      className="w-full h-full flex items-center justify-center">
      <motion.button
        ref={ref}
        style={{ x: sx, y: sy }}
        className="relative px-7 py-3.5 rounded-full bg-white text-black text-[15px] font-medium flex items-center gap-2"
      >
        <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity"
          style={{ background: "radial-gradient(circle at center, hsl(var(--accent-glow) / 0.4), transparent 70%)" }} />
        <MousePointer2 className="w-4 h-4" /> Move your cursor
      </motion.button>
    </div>
  );
}

/* Counter with stagger */
function CounterDemo() {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewOnce(0.5);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setCount(2024); return; }
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / 2000);
      const eased = 1 - Math.pow(1 - p, 5);
      setCount(Math.round(2024 * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="w-full h-full flex flex-col items-center justify-center gap-2">
      <p className="font-mono text-white text-[56px] md:text-[68px] leading-none tracking-tight">{count.toLocaleString()}</p>
      <p className="t-tertiary text-[13px] uppercase tracking-[0.18em]">Lines of hand-written code</p>
    </div>
  );
}

function AnimationShowcase() {
  return (
    <section id="capabilities" className="container-x section-y">
      <SectionHeading
        eyebrow="Built to move"
        title="Animation as craft, not decoration."
        sub="Every motion does work — it focuses attention, signals state, or rewards interaction. Nothing moves just to move."
        className="mb-14"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DemoCard tag="3D Tilt" title="Depth on hover"
          desc="Mouse-tracked perspective with parallax layers. Cards feel physical, not flat.">
          <TiltDemo />
        </DemoCard>
        <DemoCard tag="Text scramble" title="Headlines that arrive"
          desc="Characters resolve from noise to meaning — animates only on enter.">
          <ScrambleDemo />
        </DemoCard>
        <DemoCard tag="Magnetic" title="Cursor-aware buttons"
          desc="Subtle pull toward the cursor. Confirms intent before you click.">
          <MagneticDemo />
        </DemoCard>
        <DemoCard tag="Spring counter" title="Numbers that breathe"
          desc="Eased count-up triggered on scroll. Tabular figures, no layout jump.">
          <CounterDemo />
        </DemoCard>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION — PROCESS + FAQ (side-by-side, real Radix Accordion)
   ════════════════════════════════════════════════════════════════ */

function ProcessAndFAQ() {
  return (
    <section className="container-x section-y hairline-top">
      <div className="grid md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-16">
        {/* Process */}
        <div>
          <SectionHeading
            eyebrow="How it works"
            title="A clear path from call to launch."
            className="mb-10"
          />
          <Accordion type="single" collapsible defaultValue="01" className="w-full">
            {processSteps.map(s => (
              <AccordionItem
                key={s.n}
                value={s.n}
                className="border-b border-white/10 last:border-b-0"
              >
                <AccordionTrigger
                  className="group py-6 hover:no-underline text-left"
                  data-testid={`process-trigger-${s.n}`}
                >
                  <div className="flex items-center gap-5 flex-1 min-w-0">
                    <span className="font-mono text-[12px] t-quaternary w-7 shrink-0">{s.n}</span>
                    <span className="text-[19px] md:text-[20px] font-medium t-primary text-balance">{s.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-12 pr-2 text-[15px] leading-relaxed t-tertiary">
                  {s.body}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* FAQ */}
        <div>
          <SectionHeading
            eyebrow="Common questions"
            title="Everything you'd ask on a discovery call."
            className="mb-10"
          />
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`f${i}`}
                className="border-b border-white/10 last:border-b-0"
              >
                <AccordionTrigger
                  className="group py-6 hover:no-underline text-left text-[17px] md:text-[18px] font-medium t-primary text-balance"
                  data-testid={`faq-trigger-${i}`}
                >
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 pr-2 text-[15px] leading-relaxed t-tertiary">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION — FEATURED PROJECT
   ════════════════════════════════════════════════════════════════ */

function FeaturedProject() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 40]);

  return (
    <section className="container-x section-y" ref={ref}>
      <ScrollReveal>
        <a href="https://cselcincy.org" target="_blank" rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-3xl surface-raised"
          data-testid="featured-cselcincy">
          <div className="grid md:grid-cols-[1.2fr,1fr]">
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[460px] overflow-hidden">
              <motion.img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80"
                alt="CSEL Cincinnati"
                className="absolute inset-0 w-full h-full object-cover scale-110"
                style={{ y: imgY }}
              />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 40%, hsl(var(--ink-0) / 0.6))" }} />
            </div>

            <div className="p-8 md:p-14 flex flex-col justify-center gap-5">
              <span className="eyebrow">Featured project</span>
              <h3 className="display-3 t-primary text-balance">
                CSEL Cincinnati — bringing a community nonprofit online.
              </h3>
              <p className="text-[16px] leading-relaxed t-secondary">
                A full site rebuild for the Center for Special Education in Cincinnati: faster, accessible, and built so their team can update content without calling a developer.
              </p>
              <span className="inline-flex items-center gap-2 text-[14px] font-medium t-primary mt-2 group-hover:gap-3 transition-all">
                Visit cselcincy.org <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </a>
      </ScrollReveal>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION — PRICING
   ════════════════════════════════════════════════════════════════ */

function Pricing() {
  return (
    <section id="pricing" className="container-x section-y hairline-top">
      <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-20 items-start">
        <SectionHeading
          eyebrow="Pricing"
          title="Honest, hourly, no platform fees."
          sub="Most marketing sites land between $1,500 and $5,000. Hourly is $35–50 for ongoing work. You own the code. No subscriptions. No surprise renewals."
        />

        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl surface-raised noise">
            <div className="p-8 md:p-12">
              <div className="flex items-end gap-3 mb-2">
                <span className="display-2 t-primary">$35–50</span>
                <span className="t-tertiary text-[15px] mb-3">/ hour</span>
              </div>
              <p className="t-tertiary text-[15px] mb-9">Project quotes are fixed-fee once scope is agreed.</p>

              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-10">
                {pricingFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] t-secondary">
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(var(--accent-glow))" }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <MagneticButton
                variant="primary"
                testId="pricing-cta"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get a quote <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION — CONTACT
   ════════════════════════════════════════════════════════════════ */

function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden surface-sunken hairline-top">
      <div aria-hidden className="absolute inset-0 aurora opacity-80" />
      <div className="relative container-x section-y grid md:grid-cols-[1fr,1.1fr] gap-12 lg:gap-20 items-start">
        <SectionHeading
          eyebrow="Start a project"
          title="Let's build something worth visiting."
          sub="Tell us a little about your project. We respond within one business day — usually faster."
        />
        <ScrollReveal delay={0.05}>
          <div className="surface-raised rounded-2xl p-7 md:p-10">
            <ContactForm />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="container-x py-10 hairline-top flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <p className="t-tertiary text-[13px]">© {new Date().getFullYear()} Vaulted Web Solutions. Hand-coded.</p>
      <p className="t-quaternary text-[12px] font-mono">v2.0 • built with care</p>
    </footer>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main" className="surface min-h-screen">
        <Hero />
        <TickerSection />
        <Stats />
        <ServicesTabs />
        <LookAround />
        <AnimationShowcase />
        <ProcessAndFAQ />
        <FeaturedProject />
        <Pricing />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
