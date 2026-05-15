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
import { ArrowRight, ExternalLink, RotateCcw, ChevronDown, ArrowUp } from "lucide-react";

/* ─── Custom Cursor ──────────────────────────────────────────────── */

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || window.innerWidth <= 768) return;

    let rafId: number;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
      });
    };

    const onEnter = () => cursor.classList.add("cursor-grow");
    const onLeave = () => cursor.classList.remove("cursor-grow");

    document.addEventListener("mousemove", onMove);
    const els = document.querySelectorAll("a, button");
    els.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={cursorRef} id="vaulted-cursor" />;
}

/* ─── Marquee ────────────────────────────────────────────────────── */

function Marquee() {
  const text = "CUSTOM CODE\u00A0\u00A0·\u00A0\u00A0NO TEMPLATES\u00A0\u00A0·\u00A0\u00A0HAND-WRITTEN\u00A0\u00A0·\u00A0\u00A0FAST\u00A0\u00A0·\u00A0\u00A0SECURE\u00A0\u00A0·\u00A0\u00A0BUILT TO LAST\u00A0\u00A0·\u00A0\u00A0";
  const repeated = text.repeat(8);
  return (
    <div
      className="overflow-hidden py-4"
      style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="marquee-track">
        <span
          className="text-[11px] pr-0"
          style={{ color: "#c9a96e", letterSpacing: "0.2em", fontFamily: "var(--font-body)" }}
        >
          {repeated}
        </span>
      </div>
    </div>
  );
}

/* ─── Hero data ──────────────────────────────────────────────────── */

const heroSlides = [
  { img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1920&q=80" },
  { img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80" },
  { img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1920&q=80" },
];

/* ─── Service cards ──────────────────────────────────────────────── */

const serviceCards = [
  {
    id: "business",
    label: "Business Sites",
    category: "Business",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    title: "Launch a professional website",
    desc: "Establish trust and generate leads with a site built to represent your brand at its best.",
    tags: "Agencies · Consultants · Retailers",
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    category: "E-Commerce",
    img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    title: "Sell online with confidence",
    desc: "Custom storefronts with clean checkout flows, payment integrations, and inventory management.",
    tags: "Artisans · Retailers · Limited Releases",
  },
  {
    id: "nonprofit",
    label: "Non-Profits",
    category: "Non-Profits",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    title: "Amplify your mission",
    desc: "Donation processing, event management, and resource systems — built for organizations like CSEL Cincinnati.",
    tags: "Non-profits · Advocacy Groups · Foundations",
  },
  {
    id: "portfolio",
    label: "Portfolios",
    category: "Portfolios",
    img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    title: "Show your work beautifully",
    desc: "Image-forward layouts that put your projects first. Case studies, galleries, and booking built in.",
    tags: "Designers · Photographers · Architects",
  },
];

/* ─── Feature cards ──────────────────────────────────────────────── */

const featureCards = [
  {
    title: "Hand-written code",
    desc: "Every line crafted by a human. No page builders, no template bloat — just clean, purposeful code.",
    icon: "{ }",
  },
  {
    title: "Security hardening",
    desc: "No vulnerable plugins. No generic attack vectors. Built to resist threats from the ground up.",
    icon: "🔒",
  },
  {
    title: "Performance tuned",
    desc: "Optimized for Core Web Vitals. Fast on every device, every connection, every time.",
    icon: "⚡",
  },
  {
    title: "Analytics-ready",
    desc: "Proper metadata, sitemaps, and structured data. Built for both search engines and real people.",
    icon: "📊",
  },
  {
    title: "Ongoing support",
    desc: "We don't vanish after launch. Monthly updates, content changes, and feature additions as you grow.",
    icon: "🔄",
  },
  {
    title: "You own it",
    desc: "Your code is yours. No subscription lock-in. Host it anywhere, with anyone, forever.",
    icon: "🔑",
  },
];

/* ─── Portfolio mosaic ───────────────────────────────────────────── */

const portfolioSites = [
  { title: "CSEL Cincinnati", tag: "Non-profit", url: "https://cselcincy.org", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" },
  { title: "E-Commerce Platform", tag: "Online Store", url: "#", img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80" },
  { title: "Corporate Dashboard", tag: "SaaS", url: "#", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
  { title: "Creative Portfolio", tag: "Portfolio", url: "#", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80" },
  { title: "Local Business", tag: "Business", url: "#", img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80" },
  { title: "Restaurant & Events", tag: "Hospitality", url: "#", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" },
];

/* ─── Process steps ──────────────────────────────────────────────── */

const processSteps = [
  { num: "01", title: "Discovery call", desc: "We talk through your goals, timeline, and constraints. No assumptions made, no sales pitch given." },
  { num: "02", title: "Design direction", desc: "Wireframes and visual concepts before a single line of code is written. You approve before we build." },
  { num: "03", title: "Development", desc: "Hand-written, documented code in modern frameworks. Clean architecture from day one." },
  { num: "04", title: "QA & security review", desc: "Full cross-browser testing, performance audits, and a security hardening pass before launch." },
  { num: "05", title: "Launch", desc: "Zero-downtime deployment. We handle domains, DNS, hosting configuration, and go-live." },
  { num: "06", title: "Support & growth", desc: "Monthly updates, content changes, and new features as your business evolves." },
];

/* ─── FAQ ────────────────────────────────────────────────────────── */

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most projects run 2–6 weeks depending on scope. A simple business site can be live in two weeks. Larger platforms with custom features take longer. We'll give you a realistic timeline during our discovery call — no inflated estimates to manage expectations later.",
  },
  {
    q: "Do I need to provide my own designs?",
    a: "No. We handle everything from visual direction to final code. If you have brand assets, logos, or inspiration, we'll incorporate them. If you're starting from scratch, we'll develop a direction together before writing a single line of code.",
  },
  {
    q: "Can you work with my existing domain or hosting provider?",
    a: "Yes — we deploy to any provider you prefer. AWS, DigitalOcean, Vercel, Netlify, your current host. We handle DNS configuration and zero-downtime launches. You're never locked into our infrastructure.",
  },
  {
    q: "What do I actually own after the project is done?",
    a: "Everything. The code, the design files, the domain, the data. There's no ongoing license fee to keep your site running. If you ever want to work with a different developer, you can hand them the full codebase.",
  },
  {
    q: "Is there a minimum project size or budget?",
    a: "No minimums. We bill hourly at $35–$50/hr and will always give you an upfront estimate. Small jobs are just as welcome as large ones — and many of our longest client relationships started with a single small fix.",
  },
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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", transform: "translateZ(0px)" }}>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }}
            className="w-10 h-10 rounded-full" style={{ background: "#c9a96e", opacity: 0.7 }} />
          <div className="w-20 h-2" style={{ background: "rgba(255,255,255,0.15)" }} />
          <div className="w-14 h-2" style={{ background: "rgba(255,255,255,0.08)" }} />
        </div>
        <div className="absolute -top-4 -right-4 w-14 h-14"
          style={{ border: "1px solid rgba(201,169,110,0.4)", background: "rgba(201,169,110,0.06)", transform: "translateZ(32px)" }} />
        <div className="absolute -bottom-3 -left-3 w-9 h-9"
          style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.3)", transform: "translateZ(18px)" }} />
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(201,169,110,0.12) 0%, transparent 65%)`, transform: "translateZ(1px)" }} />
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
                  className="font-display text-3xl md:text-4xl block text-white">{w}
                </motion.span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <button onClick={() => setKey(k => k + 1)}
        className="inline-flex items-center gap-2 text-xs px-4 py-2 transition-all"
        style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#888" }}
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
            <p className="font-display text-4xl md:text-5xl tabular-nums" style={{ color: "#c9a96e" }}
              data-testid={`stat-count-${i}`}>
              {counts[i]}{suffixes[i]}
            </p>
            <p className="text-xs mt-2" style={{ color: "#888" }}>{labels[i]}</p>
          </div>
        ))}
      </div>
      <button onClick={() => { played.current = false; run(); }}
        className="inline-flex items-center gap-2 text-xs px-4 py-2 transition-all"
        style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#888" }}
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
      <motion.div style={{ x: bX, y: bY }} className="absolute w-40 h-40 border border-white/10" />
      <motion.div style={{ x: mX, y: mY, border: "1px solid rgba(201,169,110,0.3)", background: "rgba(201,169,110,0.05)" }} className="absolute w-24 h-24" />
      <motion.div style={{ x: fX, y: fY, background: "#c9a96e" }} className="absolute w-12 h-12" />
      <motion.div style={{ x: aX, y: aY }} className="absolute w-6 h-6 border border-white/20 top-[calc(50%-40px)] left-[calc(50%+36px)]" />
      <motion.div style={{ x: cX, y: cY, background: "rgba(201,169,110,0.2)" }} className="absolute w-5 h-5 bottom-[calc(50%-40px)] left-[calc(50%-50px)]" />
    </div>
  );
}

/* ─── Animated stat ──────────────────────────────────────────────── */

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
      <p className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight tabular-nums leading-none" style={{ color: "#c9a96e" }}>
        {prefix}{n}{suffix}
      </p>
      <p className="text-sm mt-3" style={{ color: "#888" }}>{label}</p>
    </div>
  );
}

/* ─── Demo card wrapper ──────────────────────────────────────────── */

function DemoCard({ tag, label, desc, children }: { tag: string; label: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="glass-card flex flex-col overflow-hidden" style={{ borderRadius: 0 }}>
      <div className="px-6 pt-6 pb-3 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="eyebrow">{tag}</span>
        <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>live</span>
      </div>
      <div className="flex-1 min-h-[220px] md:min-h-[260px] px-6 py-4">{children}</div>
      <div className="px-6 pb-7 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="font-display text-lg text-white mb-1">{label}</p>
        <p className="text-sm" style={{ color: "#888" }}>{desc}</p>
      </div>
    </div>
  );
}

/* ─── FAQ Item ───────────────────────────────────────────────────── */

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <button
        className="w-full flex items-center justify-between py-6 text-left group"
        onClick={onToggle}
        data-testid={`faq-${q.slice(0, 20).replace(/\s/g, "-").toLowerCase()}`}
      >
        <span className="font-display text-lg md:text-xl text-white group-hover:text-[#c9a96e] transition-colors pr-8">{q}</span>
        <ChevronDown
          className="flex-shrink-0 transition-transform duration-300 text-white/40"
          size={20}
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base leading-relaxed" style={{ color: "#888" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────── */

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [activeService, setActiveService] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOp = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 6000);
    return () => clearInterval(id);
  }, []);

  const serviceCategories = ["All", ...serviceCards.map(c => c.category)];
  const filteredServices = activeService === "All" ? serviceCards : serviceCards.filter(c => c.category === activeService);

  const wordVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.4 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
        {heroSlides.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === slide ? 1 : 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={s.img}
              className={`w-full h-full object-cover ${i === slide ? "ken-burns-active" : ""}`}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        ))}
        <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.72)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-64" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.8), transparent)" }} />

        <motion.div style={{ y: heroY, opacity: heroOp }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="eyebrow mb-8 block"
          >
            Custom Web Development
          </motion.p>

          <div className="flex flex-wrap justify-center gap-x-5 md:gap-x-6 mb-10"
            style={{ fontSize: "clamp(2.6rem,8vw,6rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            {["A", "website", "built", "right."].map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="font-display text-white block"
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-lg mb-10"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Hand-written code. No templates. No compromises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary"
              data-testid="button-start-project"
            >
              Get started <ArrowRight size={14} />
            </button>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className="h-[2px] transition-all duration-500"
              style={{ width: i === slide ? 32 : 12, background: i === slide ? "#c9a96e" : "rgba(255,255,255,0.3)" }}
            />
          ))}
        </div>
      </section>

      {/* ── Marquee ── */}
      <Marquee />

      {/* ── Stats ── */}
      <section className="py-24 md:py-32" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20 text-base"
            style={{ color: "#888" }}
          >
            Join businesses that chose real code over page builders.
          </motion.p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
            <AnimStat target={100} suffix="%" label="Custom code, always" />
            <AnimStat target={100} suffix="%" label="Clients who own their code" />
            <AnimStat target={35} prefix="$" suffix="+/hr" label="Starting hourly rate" />
            <AnimStat target={24} suffix="hr" label="Average response time" />
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="eyebrow mb-5">What we build</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-white mb-4 leading-[1.1]">
              You deserve a website<br />that works.
            </h2>
            <p className="text-lg md:text-xl max-w-xl" style={{ color: "#888" }}>
              Whatever your business, we build it from scratch — no templates, no shortcuts.
            </p>
          </motion.div>

          {/* Pill tab filter */}
          <div className="mt-10 overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-2 w-max md:w-auto md:flex-wrap">
              {serviceCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveService(cat)}
                  className="px-5 py-2 text-sm font-medium transition-all duration-300"
                  style={activeService === cat
                    ? { background: "#c9a96e", color: "#0a0a0a", border: "1.5px solid #c9a96e" }
                    : { background: "transparent", color: "#888", border: "1px solid rgba(255,255,255,0.1)" }
                  }
                  data-testid={`pill-${cat.toLowerCase().replace(" ", "-")}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pl-6 md:pl-12 lg:pl-20 overflow-x-auto scrollbar-hide">
          <div className="flex gap-5 pb-4 w-max">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((card) => (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-[300px] md:w-[340px] group cursor-pointer glass-card"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  data-testid={`service-card-${card.id}`}
                >
                  <div className="overflow-hidden aspect-[3/2]">
                    <img src={card.img} alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <p className="eyebrow mb-3">{card.label}</p>
                    <p className="font-display text-xl text-white mb-2">{card.title}</p>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "#888" }}>{card.desc}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Great for: {card.tags}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-white group-hover:gap-2 transition-all" style={{ color: "#c9a96e" }}>
                      Start this project <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Everything included (features) ── */}
      <section className="py-24 md:py-32" style={{ background: "#0f0f0f" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-14">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="eyebrow mb-5">Every project</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-white mb-4 leading-[1.1]">
              Everything you need.<br />Nothing you don't.
            </h2>
            <p className="text-lg md:text-xl max-w-xl" style={{ color: "#888" }}>
              Every project includes the full stack — no upsells, no hidden add-ons.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }}
          className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {featureCards.map((f, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="glass-card p-8 md:p-10"
            >
              <div className="text-3xl mb-5">{f.icon}</div>
              <p className="font-display text-xl text-white mb-3">{f.title}</p>
              <p className="text-base leading-relaxed" style={{ color: "#888" }}>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Portfolio / "Made with Vaulted" ── */}
      <section id="work" className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow mb-5">Our work</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-white leading-[1.1] mb-3">
                Made with Vaulted
              </h2>
              <p className="text-lg max-w-md" style={{ color: "#888" }}>
                Real sites, hand-built for real businesses.
              </p>
            </div>
            <a href="https://cselcincy.org" target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium inline-flex items-center gap-2 hover:gap-3 transition-all group"
              style={{ color: "#c9a96e" }}
              data-testid="link-view-all-work">
              See our featured project <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          >
            {portfolioSites.map((site, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="group relative overflow-hidden cursor-pointer"
                style={{ aspectRatio: i === 0 ? "16/10" : "4/3" }}
                onClick={() => site.url !== "#" && window.open(site.url, "_blank")}
                data-testid={`portfolio-item-${i}`}
              >
                <img src={site.img} alt={site.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
                  loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(10,10,10,0.65)" }} />
                <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-display text-lg text-white leading-tight">{site.title}</p>
                  <p className="text-xs mt-1" style={{ color: "#c9a96e" }}>{site.tag}</p>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.3)", color: "#c9a96e" }}>
                  {site.tag}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Animation showcase ── */}
      <section id="capabilities" className="py-24 md:py-32" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="mb-16 md:mb-20">
            <p className="eyebrow mb-5">Interactive demos — live on this page</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-white mb-4 leading-[1.1]">
              Built to move.
            </h2>
            <p className="text-lg md:text-xl max-w-2xl" style={{ color: "#888" }}>
              Every animation below is hand-coded into this page. This is what we build into yours.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
            className="grid md:grid-cols-2 gap-5"
          >
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

      {/* ── Process ── */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="mb-16 md:mb-20">
            <p className="eyebrow mb-5">How it works</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-white mb-4 leading-[1.1]">
              A clear path, start to finish.
            </h2>
            <p className="text-lg md:text-xl max-w-xl" style={{ color: "#888" }}>
              A clear process from first conversation to launch day — no surprises.
            </p>
          </motion.div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                className="group grid grid-cols-[3.5rem_1fr] md:grid-cols-[5rem_1fr_1.5fr] gap-6 md:gap-10 py-8 md:py-10 px-4 -mx-4 hover:bg-white/[0.02] transition-colors duration-200"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="font-display text-3xl md:text-5xl pt-1 transition-colors duration-300"
                  style={{ color: "#c9a96e", opacity: 0.7 }}>
                  {step.num}
                </p>
                <p className="font-display text-xl md:text-2xl text-white self-center">{step.title}</p>
                <p className="text-base leading-relaxed col-start-2 md:col-start-auto" style={{ color: "#888" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 md:py-32" style={{ background: "#0f0f0f" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="mb-16 md:mb-20">
            <p className="eyebrow mb-5">Pricing</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-white mb-4 leading-[1.1]">
              Simple, honest pricing.
            </h2>
            <p className="text-lg md:text-xl max-w-xl" style={{ color: "#888" }}>
              No retainers. No surprise invoices. Just straightforward hourly work.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="mb-10 flex items-baseline gap-2 flex-wrap">
                <span className="font-display leading-none" style={{ fontSize: "clamp(4rem,10vw,7rem)", color: "#c9a96e" }}>$35</span>
                <span className="font-display text-4xl md:text-5xl" style={{ color: "rgba(255,255,255,0.3)" }}> – $50</span>
                <span className="text-xl ml-1" style={{ color: "#888" }}>/hr</span>
              </div>
              <p className="text-lg mb-10 leading-relaxed" style={{ color: "#888" }}>
                Rate depends on project scope and complexity. Most projects are estimated upfront — you'll always know what you're paying before we start.
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
                data-testid="button-get-quote"
              >
                Get a free quote <ArrowRight size={14} />
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
              <p className="eyebrow mb-8">What's included</p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                {["Custom design & development", "Mobile-first responsive layouts", "SEO-optimized structure", "Security hardening", "Performance tuning", "Post-launch support"].map((item, i) => (
                  <div key={i} className="py-4 flex items-center justify-between group"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <span className="text-base text-white">{item}</span>
                    <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#c9a96e" }}>Included</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-sm" style={{ color: "#888" }}>
                  No subscription lock-in. Your code, your server, your way. You own everything we build.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Featured project ── */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className="eyebrow mb-5">Featured project</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-white mb-6 leading-[1.1]">
                CSEL Cincinnati
              </h2>
              <p className="text-lg md:text-xl leading-relaxed mb-10" style={{ color: "#888" }}>
                A complete platform for the Center for Social-Emotional Learning, serving schools across Greater Cincinnati with resource management, event calendars, and donation processing.
              </p>
              <a
                href="https://cselcincy.org"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex"
                data-testid="link-featured-project"
              >
                Visit live site <ExternalLink size={14} />
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden"
              style={{ aspectRatio: "4/3", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80"
                alt="CSEL Cincinnati"
                className="w-full h-full object-cover opacity-80"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 md:py-32" style={{ background: "#0f0f0f" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="mb-16">
            <p className="eyebrow mb-5">FAQ</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-white leading-[1.1]">
              Common questions.
            </h2>
          </motion.div>

          <div className="max-w-3xl" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="mb-16 md:mb-20">
            <p className="eyebrow mb-5">Let's work together</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-white mb-4 leading-[1.1]">
              Start a project.
            </h2>
            <p className="text-lg md:text-xl max-w-xl" style={{ color: "#888" }}>
              Tell us what you're building. We'll get back within 24 hours.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {[
                { label: "Our work", value: "cselcincy.org", href: "https://cselcincy.org" },
                { label: "Availability", value: "Taking new projects now" },
                { label: "Rate", value: "$35–50 per hour" },
                { label: "Response time", value: "Within 24 hours" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="py-6 flex items-center justify-between gap-4"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <p className="text-sm w-32 shrink-0" style={{ color: "#888" }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      className="font-display text-xl text-white hover:text-[#c9a96e] transition-colors underline-offset-4 hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-display text-xl text-white">{item.value}</p>
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
      <footer className="py-12 md:py-16" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "#0a0a0a" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="font-display text-xl text-white">Vaulted Web Solutions</p>
              <p className="text-sm mt-1" style={{ color: "#888" }}>Custom web development · Cincinnati, OH</p>
            </div>
            <p className="text-sm" style={{ color: "#888" }}>© {new Date().getFullYear()} Vaulted Web Solutions. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {["Twitter", "LinkedIn", "GitHub"].map(s => (
                <motion.a
                  key={s}
                  href="#"
                  className="text-sm transition-colors"
                  style={{ color: "#888" }}
                  whileHover={{ y: -2, color: "#c9a96e" } as any}
                  data-testid={`link-social-${s.toLowerCase()}`}
                >
                  {s}
                </motion.a>
              ))}
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="ml-4 p-2 transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#888" }}
                whileHover={{ borderColor: "#c9a96e", color: "#c9a96e" } as any}
                whileTap={{ scale: 0.9 }}
                data-testid="button-back-to-top"
              >
                <ArrowUp size={16} />
              </motion.button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
