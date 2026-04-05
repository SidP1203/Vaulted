import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ExternalLink, RotateCcw } from "lucide-react";

/* ─── Hero data ──────────────────────────────────────────────────── */

const heroSlides = [
  { img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1920&q=80" },
  { img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80" },
  { img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1920&q=80" },
];

/* ─── Service cards ("Grow your business" pattern) ───────────────── */

const serviceCards = [
  {
    id: "business",
    label: "Business Sites",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    title: "Launch a professional website",
    desc: "Establish trust and generate leads with a site built to represent your brand at its best.",
    tags: ["Agencies · Consultants · Retailers"],
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80",
    title: "Sell online with confidence",
    desc: "Custom storefronts with clean checkout flows, payment integrations, and inventory management.",
    tags: ["Artisans · Retailers · Limited Releases"],
  },
  {
    id: "nonprofit",
    label: "Non-Profits",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    title: "Amplify your mission",
    desc: "Donation processing, event management, and resource systems — built for organizations like CSEL Cincinnati.",
    tags: ["Non-profits · Advocacy Groups · Foundations"],
  },
  {
    id: "portfolio",
    label: "Portfolios",
    img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    title: "Show your work beautifully",
    desc: "Image-forward layouts that put your projects first. Case studies, galleries, and booking built in.",
    tags: ["Designers · Photographers · Architects"],
  },
];

/* ─── Feature cards ("Everything you need" pattern) ─────────────── */

const featureCards = [
  {
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    title: "Hand-written code",
    desc: "Every line crafted by a human. No page builders, no template bloat — just clean, purposeful code.",
  },
  {
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80",
    title: "Security hardening",
    desc: "No vulnerable plugins. No generic attack vectors. Built to resist threats from the ground up.",
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    title: "Performance tuned",
    desc: "Optimized for Core Web Vitals. Fast on every device, every connection, every time.",
  },
  {
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    title: "Analytics-ready",
    desc: "Proper metadata, sitemaps, and structured data. Built for both search engines and real people.",
  },
  {
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    title: "Ongoing support",
    desc: "We don't vanish after launch. Monthly updates, content changes, and feature additions as you grow.",
  },
  {
    img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80",
    title: "You own it",
    desc: "Your code is yours. No subscription lock-in. Host it anywhere, with anyone, forever.",
  },
];

/* ─── Portfolio mosaic ("Made with Vaulted") ─────────────────────── */

const portfolioSites = [
  { title: "CSEL Cincinnati", tag: "Non-profit", url: "https://cselcincy.org", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" },
  { title: "E-Commerce Platform", tag: "Online Store", url: "#", img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80" },
  { title: "Corporate Dashboard", tag: "SaaS", url: "#", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
  { title: "Creative Portfolio", tag: "Portfolio", url: "#", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80" },
  { title: "Local Business", tag: "Business", url: "#", img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80" },
  { title: "Restaurant & Events", tag: "Hospitality", url: "#", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" },
];

/* ─── Process steps ("How it works" numbered list) ───────────────── */

const processSteps = [
  { num: "01", title: "Discovery call", desc: "We talk through your goals, timeline, and constraints. No assumptions made, no sales pitch given." },
  { num: "02", title: "Design direction", desc: "Wireframes and visual concepts before a single line of code is written. You approve before we build." },
  { num: "03", title: "Development", desc: "Hand-written, documented code in modern frameworks. Clean architecture from day one." },
  { num: "04", title: "QA & security review", desc: "Full cross-browser testing, performance audits, and a security hardening pass before launch." },
  { num: "05", title: "Launch", desc: "Zero-downtime deployment. We handle domains, DNS, hosting configuration, and go-live." },
  { num: "06", title: "Support & growth", desc: "Monthly updates, content changes, and new features as your business evolves." },
];

/* ─── Animation demo helpers ─────────────────────────────────────── */

function TiltDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [14, -14]), { stiffness: 280, damping: 28 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-14, 14]), { stiffness: 280, damping: 28 });
  const glowX = useSpring(useTransform(rawX, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 30 });
  const glowY = useSpring(useTransform(rawY, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 30 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() { rawX.set(0); rawY.set(0); }

  return (
    <div ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave}
      className="w-full h-full flex items-center justify-center" style={{ perspective: 1000 }}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative w-36 h-44">
        <div className="absolute inset-0 bg-foreground flex flex-col items-center justify-center gap-3" style={{ transform: "translateZ(0px)" }}>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }}
            className="w-10 h-10 rounded-full bg-background/20" />
          <div className="w-20 h-2 bg-background/20" />
          <div className="w-14 h-2 bg-background/15" />
        </div>
        <div className="absolute -top-4 -right-4 w-14 h-14 border border-border bg-background" style={{ transform: "translateZ(32px)" }} />
        <div className="absolute -bottom-3 -left-3 w-9 h-9 bg-muted border border-border" style={{ transform: "translateZ(18px)" }} />
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.08) 0%, transparent 65%)`, transform: "translateZ(1px)" }} />
      </motion.div>
    </div>
  );
}

function TextRevealDemo() {
  const [key, setKey] = useState(0);
  const words = ["Fast.", "Secure.", "Crafted.", "Yours."];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 px-4">
      <div className="text-center min-h-[80px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div key={key} className="flex flex-wrap justify-center gap-x-4">
            {words.map((w, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span initial={{ y: 56, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.14, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-3xl md:text-4xl font-medium block">{w}
                </motion.span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <button onClick={() => setKey(k => k + 1)}
        className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-border px-4 py-2 hover:border-foreground/40 hover:text-foreground transition-all"
        data-testid="button-replay-text">
        <RotateCcw className="w-3 h-3" /> Replay
      </button>
    </div>
  );
}

function CounterDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "0px" });
  const [counts, setCounts] = useState([0, 0, 0]);
  const rafRef = useRef<number>(0);
  const played = useRef(false);
  const targets = [99, 0, 100];
  const labels = ["Lighthouse score", "Template files", "Custom code"];
  const suffixes = ["", "", "%"];

  function run() {
    cancelAnimationFrame(rafRef.current);
    setCounts([0, 0, 0]);
    const start = Date.now();
    const tick = () => {
      const t = Math.min((Date.now() - start) / 1400, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setCounts(targets.map(v => Math.round(v * e)));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    if (isInView && !played.current) { played.current = true; run(); }
    if (!isInView) played.current = false;
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView]);

  return (
    <div ref={ref} className="w-full h-full flex flex-col items-center justify-center gap-6 px-4">
      <div className="grid grid-cols-3 gap-4 w-full">
        {targets.map((_, i) => (
          <div key={i} className="text-center">
            <p className="font-display text-4xl md:text-5xl font-medium tabular-nums" data-testid={`stat-count-${i}`}>
              {counts[i]}{suffixes[i]}
            </p>
            <p className="text-xs text-muted-foreground mt-2">{labels[i]}</p>
          </div>
        ))}
      </div>
      <button onClick={() => { played.current = false; run(); }}
        className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-border px-4 py-2 hover:border-foreground/40 hover:text-foreground transition-all"
        data-testid="button-replay-counter">
        <RotateCcw className="w-3 h-3" /> Replay
      </button>
    </div>
  );
}

function ParallaxDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const fX = useSpring(useTransform(mx, [-0.5, 0.5], [-28, 28]), { stiffness: 130, damping: 20 });
  const fY = useSpring(useTransform(my, [-0.5, 0.5], [-28, 28]), { stiffness: 130, damping: 20 });
  const mX = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 100, damping: 22 });
  const mY = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), { stiffness: 100, damping: 22 });
  const bX = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 80, damping: 24 });
  const bY = useSpring(useTransform(my, [-0.5, 0.5], [-5, 5]), { stiffness: 80, damping: 24 });
  const aX = useSpring(useTransform(mx, [-0.5, 0.5], [18, -18]), { stiffness: 90, damping: 18 });
  const aY = useSpring(useTransform(my, [-0.5, 0.5], [18, -18]), { stiffness: 90, damping: 18 });
  const cX = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), { stiffness: 70, damping: 16 });
  const cY = useSpring(useTransform(my, [-0.5, 0.5], [22, -22]), { stiffness: 70, damping: 16 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }}
      className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <motion.div style={{ x: bX, y: bY }} className="absolute w-40 h-40 border border-border/40" />
      <motion.div style={{ x: mX, y: mY }} className="absolute w-24 h-24 border border-border/70 bg-muted/30" />
      <motion.div style={{ x: fX, y: fY }} className="absolute w-12 h-12 bg-foreground" />
      <motion.div style={{ x: aX, y: aY }} className="absolute w-6 h-6 border border-foreground/40 top-[calc(50%-40px)] left-[calc(50%+36px)]" />
      <motion.div style={{ x: cX, y: cY }} className="absolute w-5 h-5 bg-foreground/20 bottom-[calc(50%-40px)] left-[calc(50%-50px)]" />
    </div>
  );
}

/* ─── Animated stat (for stats bar) ─────────────────────────────── */

function AnimStat({ target, prefix = "", suffix = "", label }: { target: number; prefix?: string; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const t = Math.min((Date.now() - start) / 1800, 1);
      setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight tabular-nums leading-none">
        {prefix}{n}{suffix}
      </p>
      <p className="text-muted-foreground text-sm md:text-base mt-3">{label}</p>
    </div>
  );
}

/* ─── Demo card wrapper ──────────────────────────────────────────── */

function DemoCard({ tag, label, desc, children }: { tag: string; label: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="border border-border hover:border-foreground/20 transition-colors duration-300 flex flex-col overflow-hidden">
      <div className="px-6 pt-6 pb-3 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{tag}</span>
        <span className="text-[10px] text-muted-foreground/40 font-mono">live</span>
      </div>
      <div className="flex-1 min-h-[220px] md:min-h-[260px] px-6 py-4">{children}</div>
      <div className="px-6 pb-7 pt-4 border-t border-border/50">
        <p className="font-display text-lg font-medium mb-1">{label}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────── */

export default function Home() {
  const [slide, setSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOp = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {heroSlides.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: i === slide ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }} className="absolute inset-0">
            <img src={s.img} className="w-full h-full object-cover" alt="" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/40 to-transparent" />

        <motion.div style={{ y: heroY, opacity: heroOp }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-white/60 text-sm font-medium tracking-widest uppercase mb-8">
            Vaulted Web Solutions
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.8rem,8vw,6.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white mb-10">
            A website
            <br />built right.
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="flex flex-col items-center gap-5">
            <motion.button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,1)" }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-black text-sm font-medium px-10 py-4 transition-colors"
              data-testid="button-start-project">
              GET STARTED
            </motion.button>
            <p className="text-white/55 text-sm">Hand-written code. No templates. No compromises.</p>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`h-[3px] transition-all duration-400 ${i === slide ? "w-8 bg-white" : "w-3 bg-white/40"}`} />
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-muted-foreground mb-16 md:mb-20 text-base">
            Join businesses that chose real code over page builders.
          </motion.p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14 divide-x-0 lg:divide-x divide-border">
            <AnimStat target={100} suffix="%" label="Custom code, always" />
            <AnimStat target={0} label="Template files shipped" />
            <AnimStat target={35} prefix="$" suffix="+/hr" label="Starting hourly rate" />
            <AnimStat target={24} suffix="hr" label="Average response time" />
          </div>
        </div>
      </section>

      {/* ── "Grow your business" equivalent — service card scroll ── */}
      <section id="services" className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
              You deserve a website
              <br />that works.
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
              Whatever your business, we build it from scratch — no templates, no shortcuts.
            </p>
          </motion.div>
        </div>

        {/* Horizontally scrollable service cards */}
        <div className="pl-6 md:pl-12 lg:pl-20 overflow-x-auto scrollbar-hide">
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="flex gap-5 pb-4 w-max">
            {serviceCards.map((card, i) => (
              <motion.div key={i} whileHover={{ y: -6 }} transition={{ duration: 0.3 }}
                className="flex-shrink-0 w-[300px] md:w-[340px] bg-[#f5f4f0] dark:bg-muted/40 group cursor-pointer"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                data-testid={`service-card-${card.id}`}>
                <div className="overflow-hidden aspect-[3/2]">
                  <img src={card.img} alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <p className="font-display text-xl font-medium mb-2">{card.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{card.desc}</p>
                  <p className="text-xs text-muted-foreground/70">Great for: {card.tags[0]}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                    Start this project <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── "Everything you need" — feature card scroll (dark) ── */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
              Everything you need.
              <br />Nothing you don't.
            </h2>
            <p className="text-background/60 text-lg md:text-xl max-w-xl">
              Every project includes the full stack — no upsells, no hidden add-ons.
            </p>
          </motion.div>
        </div>
        <div className="pl-6 md:pl-12 lg:pl-20 overflow-x-auto scrollbar-hide">
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="flex gap-4 pb-4 w-max">
            {featureCards.map((f, i) => (
              <motion.div key={i} whileHover={{ y: -4 }} transition={{ duration: 0.25 }}
                className="flex-shrink-0 w-[260px] md:w-[300px] bg-background/8 border border-background/15">
                <div className="overflow-hidden aspect-[3/2]">
                  <img src={f.img} alt={f.title} className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="p-6">
                  <p className="font-display text-lg font-medium mb-2">{f.title}</p>
                  <p className="text-background/60 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── "Made with Vaulted" mosaic ── */}
      <section id="work" className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-3">
                Made with Vaulted
              </h2>
              <p className="text-muted-foreground text-lg max-w-md">
                Real sites, hand-built for real businesses.
              </p>
            </div>
            <a href="https://cselcincy.org" target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium inline-flex items-center gap-2 hover:gap-3 transition-all group"
              data-testid="link-view-all-work">
              See our featured project <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {portfolioSites.map((site, i) => (
              <motion.div key={i}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="group relative overflow-hidden cursor-pointer aspect-[4/3]"
                onClick={() => site.url !== "#" && window.open(site.url, "_blank")}
                data-testid={`portfolio-item-${i}`}>
                <img src={site.img} alt={site.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-display text-lg font-medium leading-tight">{site.title}</p>
                  <p className="text-white/70 text-xs mt-0.5">{site.tag}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center text-sm text-muted-foreground mt-8">
            Made with Vaulted
          </motion.p>
        </div>
      </section>

      {/* ── Animation showcase ── */}
      <section id="capabilities" className="py-24 md:py-32 border-y border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="mb-16 md:mb-20">
            <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-muted-foreground inline-block" />
              Interactive demos — live on this page
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
              Built to move.
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
              Every animation below is hand-coded into this page. This is what we build into yours.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
            className="grid md:grid-cols-2 gap-5">
            <DemoCard tag="3D depth" label="Hover to tilt" desc="Perspective transforms that respond to cursor position in real time.">
              <TiltDemo />
            </DemoCard>
            <DemoCard tag="Text motion" label="Staggered reveal" desc="Words enter the frame in sequence — press replay any time.">
              <TextRevealDemo />
            </DemoCard>
            <DemoCard tag="Scroll trigger" label="Animated counters" desc="Numbers spring to life when they scroll into view.">
              <CounterDemo />
            </DemoCard>
            <DemoCard tag="Parallax" label="Multi-layer depth" desc="Layers move at different speeds, creating depth from a flat surface.">
              <ParallaxDemo />
            </DemoCard>
          </motion.div>
        </div>
      </section>

      {/* ── "How it works" — editorial numbered list ── */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="mb-16 md:mb-20">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
              How it works
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
              A clear process from first conversation to launch day — no surprises.
            </p>
          </motion.div>

          <div className="divide-y divide-border">
            {processSteps.map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                className="group grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr_1fr] gap-6 md:gap-10 py-8 md:py-10 hover:bg-muted/20 px-4 -mx-4 transition-colors duration-200">
                <p className="font-display text-2xl md:text-3xl font-medium text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors pt-1">
                  {step.num}
                </p>
                <p className="font-display text-xl md:text-2xl font-medium self-center">{step.title}</p>
                <p className="text-muted-foreground text-base leading-relaxed col-start-2 md:col-start-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 md:py-32 bg-[#f5f4f0] dark:bg-muted/20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="mb-16 md:mb-20">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
              Simple, honest pricing.
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
              No retainers. No surprise invoices. Just straightforward hourly work.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="mb-10">
                <span className="font-display text-[clamp(4rem,10vw,8rem)] font-medium leading-none">$35</span>
                <span className="font-display text-4xl md:text-5xl text-muted-foreground"> – $50</span>
                <span className="text-muted-foreground text-xl ml-2">/hr</span>
              </div>
              <p className="text-muted-foreground text-lg mb-10">
                Rate depends on project scope and complexity. Most projects are estimated upfront — you'll always know what you're paying before we start.
              </p>
              <motion.button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-foreground text-background py-4 px-10 text-base font-medium hover:bg-foreground/90 transition-colors inline-flex items-center gap-2"
                data-testid="button-get-quote">
                Get a free quote <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-8">What's included</p>
              <div className="divide-y divide-border">
                {["Custom design & development", "Mobile-first responsive layouts", "SEO-optimized structure", "Security hardening", "Performance tuning", "Post-launch support"].map((item, i) => (
                  <div key={i} className="py-4 flex items-center justify-between group">
                    <span className="text-base">{item}</span>
                    <span className="text-muted-foreground text-sm opacity-0 group-hover:opacity-100 transition-opacity">Included</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  No subscription lock-in. Your code, your server, your way. You own everything we build.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Featured project callout ── */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <span className="text-xs text-background/50 uppercase tracking-widest mb-5 block">Featured project</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
                CSEL Cincinnati
              </h2>
              <p className="text-background/65 text-lg md:text-xl leading-relaxed mb-10">
                A complete platform for the Center for Social-Emotional Learning, serving schools across Greater Cincinnati with resource management, event calendars, and donation processing.
              </p>
              <motion.a href="https://cselcincy.org" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-background/30 text-background px-8 py-4 font-medium hover:bg-background hover:text-foreground transition-all duration-300 group"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                data-testid="link-featured-project">
                Visit live site <ExternalLink className="w-4 h-4" />
              </motion.a>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="overflow-hidden aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80"
                alt="CSEL Cincinnati" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="mb-16 md:mb-20">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
              Start a project.
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
              Tell us what you're building. We'll get back within 24 hours.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="divide-y divide-border">
              {[
                { label: "Our work", value: "cselcincy.org", href: "https://cselcincy.org" },
                { label: "Availability", value: "Taking new projects now" },
                { label: "Rate", value: "$35–50 per hour" },
                { label: "Response time", value: "Within 24 hours" },
              ].map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="py-6 flex items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground w-32 shrink-0">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      className="font-display text-xl font-medium hover:underline underline-offset-4">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-display text-xl font-medium">{item.value}</p>
                  )}
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 md:py-16 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="font-display text-xl font-medium">Vaulted Web Solutions</p>
              <p className="text-sm text-muted-foreground mt-1">Custom web development · Cincinnati, OH</p>
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Vaulted Web Solutions. All rights reserved.</p>
            <div className="flex gap-6">
              {["Twitter", "LinkedIn", "GitHub"].map(s => (
                <motion.a key={s} href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ y: -2 }}
                  data-testid={`link-social-${s.toLowerCase()}`}>
                  {s}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
