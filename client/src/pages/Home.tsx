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
import {
  ArrowRight,
  ExternalLink,
  ArrowUpRight,
  RotateCcw,
  Check,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────── */

interface DemoCardProps {
  label: string;
  description: string;
  tag: string;
  children: React.ReactNode;
}

/* ─── Data ───────────────────────────────────────────────────────── */

const heroSlides = [
  {
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1920&q=80",
    label: "Business Websites",
  },
  {
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80",
    label: "Collaborative Work",
  },
  {
    img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1920&q=80",
    label: "Custom Development",
  },
];

const whatWeBuildTabs = [
  {
    id: "business",
    label: "Business Sites",
    heading: "Professional websites that convert.",
    description:
      "Whether you're a local service provider or a growing company, we build websites that establish trust, generate leads, and represent your brand at its best.",
    bullets: ["SEO-optimized from day one", "Fast, secure, and mobile-first", "Fully custom to your brand"],
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    heading: "Online stores built to sell.",
    description:
      "Custom storefronts with clean checkout flows, inventory management, and payment integrations — built to perform, not built from a template.",
    bullets: ["Stripe & payment integrations", "Inventory & order management", "Conversion-optimized UX"],
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "nonprofit",
    label: "Non-Profits",
    heading: "Mission-driven sites with purpose.",
    description:
      "We believe in the work non-profits do. We've built for organizations like CSEL Cincinnati — sites with donation processing, event calendars, and resource management.",
    bullets: ["Donation integrations", "Event & resource management", "Accessible & inclusive design"],
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "portfolio",
    label: "Portfolios",
    heading: "Your work, beautifully presented.",
    description:
      "Photographers, designers, architects, and creatives — we build portfolio sites that put your work first and your story second.",
    bullets: ["Image-forward layouts", "Case study templates", "Contact & booking integration"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  },
];

const includedFeatures = [
  { title: "Hand-written code", desc: "Every line crafted by humans. No page builders, no hidden bloat." },
  { title: "Mobile-first design", desc: "Looks great on every screen, from phones to 4K displays." },
  { title: "Security hardening", desc: "No vulnerable plugins. No generic attack surfaces." },
  { title: "Performance tuning", desc: "Optimized for Core Web Vitals and real-world speed." },
  { title: "SEO-ready", desc: "Proper metadata, sitemaps, and structure from the start." },
  { title: "Ongoing support", desc: "We don't vanish after launch. We're your dev team." },
];

const processSteps = [
  { num: "01", title: "Discovery", desc: "We learn your goals, audience, and constraints. No assumptions." },
  { num: "02", title: "Design direction", desc: "Wireframes and visual direction before a single line of code is written." },
  { num: "03", title: "Development", desc: "Hand-written code in modern frameworks — clean, documented, and maintainable." },
  { num: "04", title: "QA & security review", desc: "Full cross-browser testing, performance audits, and security hardening." },
  { num: "05", title: "Launch", desc: "Deploy with zero downtime. We handle domains, hosting configuration, and go-live." },
  { num: "06", title: "Support & iteration", desc: "Monthly updates, content changes, and feature additions as you grow." },
];

const madeWithVaulted = [
  { title: "CSEL Cincinnati", url: "https://cselcincy.org", tag: "Non-profit", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" },
  { title: "E-Commerce Platform", url: "#", tag: "Online Store", img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=600&q=80" },
  { title: "Business Dashboard", url: "#", tag: "SaaS", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" },
  { title: "Creative Portfolio", url: "#", tag: "Portfolio", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80" },
  { title: "Local Business Site", url: "#", tag: "Business", img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80" },
  { title: "Restaurant & Events", url: "#", tag: "Hospitality", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80" },
];

/* ─── Animation Demo Components ─────────────────────────────────── */

function TiltDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [14, -14]), { stiffness: 280, damping: 28 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-14, 14]), { stiffness: 280, damping: 28 });
  const glowX = useSpring(useTransform(rawX, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 30 });
  const glowY = useSpring(useTransform(rawY, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 30 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() { rawX.set(0); rawY.set(0); }

  return (
    <div ref={cardRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      className="w-full h-full flex items-center justify-center" style={{ perspective: 1000 }}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative w-36 h-44">
        <div className="absolute inset-0 bg-foreground flex flex-col items-center justify-center gap-3" style={{ transform: "translateZ(0px)" }}>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
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
            {words.map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span initial={{ y: 56, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.14, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-3xl md:text-4xl font-medium block">
                  {word}
                </motion.span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <button onClick={() => setKey((k) => k + 1)}
        className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-border px-4 py-2 hover:border-foreground/40 hover:text-foreground transition-all duration-200"
        data-testid="button-replay-text">
        <RotateCcw className="w-3 h-3" /> Replay
      </button>
    </div>
  );
}

function CountUpDemoMini() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "0px" });
  const [counts, setCounts] = useState([0, 0, 0]);
  const rafRef = useRef<number>(0);
  const hasPlayed = useRef(false);
  const targets = [99, 0, 100];
  const labels = ["Lighthouse score", "Template files", "Custom code"];
  const suffixes = ["", "", "%"];

  function runAnimation() {
    cancelAnimationFrame(rafRef.current);
    setCounts([0, 0, 0]);
    const duration = 1400;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCounts(targets.map((target) => Math.round(target * eased)));
      if (t < 1) { rafRef.current = requestAnimationFrame(tick); }
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    if (isInView && !hasPlayed.current) { hasPlayed.current = true; runAnimation(); }
    if (!isInView) { hasPlayed.current = false; }
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
            <p className="text-xs text-muted-foreground mt-2 leading-tight">{labels[i]}</p>
          </div>
        ))}
      </div>
      <button onClick={() => { hasPlayed.current = false; runAnimation(); }}
        className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-border px-4 py-2 hover:border-foreground/40 hover:text-foreground transition-all duration-200"
        data-testid="button-replay-counter">
        <RotateCcw className="w-3 h-3" /> Replay
      </button>
    </div>
  );
}

function ParallaxDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const frontX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-28, 28]), { stiffness: 130, damping: 20 });
  const frontY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-28, 28]), { stiffness: 130, damping: 20 });
  const midX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), { stiffness: 100, damping: 22 });
  const midY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-14, 14]), { stiffness: 100, damping: 22 });
  const backX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 80, damping: 24 });
  const backY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-5, 5]), { stiffness: 80, damping: 24 });
  const accentAX = useSpring(useTransform(mouseX, [-0.5, 0.5], [18, -18]), { stiffness: 90, damping: 18 });
  const accentAY = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), { stiffness: 90, damping: 18 });
  const accentBX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-22, 22]), { stiffness: 70, damping: 16 });
  const accentBY = useSpring(useTransform(mouseY, [-0.5, 0.5], [22, -22]), { stiffness: 70, damping: 16 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() { mouseX.set(0); mouseY.set(0); }

  return (
    <div ref={containerRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <motion.div style={{ x: backX, y: backY }} className="absolute w-40 h-40 border border-border/40" />
      <motion.div style={{ x: midX, y: midY }} className="absolute w-24 h-24 border border-border/70 bg-muted/30" />
      <motion.div style={{ x: frontX, y: frontY }} className="absolute w-12 h-12 bg-foreground" />
      <motion.div style={{ x: accentAX, y: accentAY }} className="absolute w-6 h-6 border border-foreground/40 top-[calc(50%-40px)] left-[calc(50%+36px)]" />
      <motion.div style={{ x: accentBX, y: accentBY }} className="absolute w-5 h-5 bg-foreground/20 bottom-[calc(50%-40px)] left-[calc(50%-50px)]" />
    </div>
  );
}

function DemoCard({ label, description, tag, children }: DemoCardProps) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
      className="group border border-border hover:border-foreground/20 transition-colors duration-300 flex flex-col overflow-hidden"
    >
      <div className="px-6 pt-6 pb-3 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{tag}</span>
        <span className="text-xs text-muted-foreground/50 font-mono">live</span>
      </div>
      <div className="flex-1 min-h-[220px] md:min-h-[260px] px-6 py-4">{children}</div>
      <div className="px-6 pb-7 pt-4 border-t border-border/60">
        <h3 className="font-display text-lg font-medium mb-1">{label}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

/* ─── Stat Counter ───────────────────────────────────────────────── */

function AnimatedStat({ target, prefix = "", suffix = "", label }: { target: number; prefix?: string; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(target * eased));
      if (t < 1) { rafRef.current = requestAnimationFrame(tick); }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center md:text-left">
      <p className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight tabular-nums">
        {prefix}{count}{suffix}
      </p>
      <p className="text-muted-foreground text-base md:text-lg mt-2">{label}</p>
    </div>
  );
}

/* ─── Browser Mockup Card ────────────────────────────────────────── */

function BrowserCard({ img, title, tag, url }: { img: string; title: string; tag: string; url: string }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 w-[320px] md:w-[380px] overflow-hidden border border-border bg-background group cursor-pointer"
      onClick={() => url !== "#" && window.open(url, "_blank")}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-muted/60 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-border" />
        <div className="w-2.5 h-2.5 rounded-full bg-border" />
        <div className="w-2.5 h-2.5 rounded-full bg-border" />
        <div className="ml-3 flex-1 bg-background/70 border border-border/60 text-xs text-muted-foreground px-3 py-1 truncate font-mono">
          {url !== "#" ? url.replace("https://", "") : `vaulted-${title.toLowerCase().replace(/\s+/g, "-")}.dev`}
        </div>
      </div>
      {/* Screenshot */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      {/* Label */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div>
          <p className="font-medium text-sm">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{tag}</p>
        </div>
        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("business");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  /* Auto-rotate hero slides */
  useEffect(() => {
    const id = setInterval(() => setActiveSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

  const activeTabData = whatWeBuildTabs.find((t) => t.id === activeTab) ?? whatWeBuildTabs[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Cycling background slides */}
        {heroSlides.map((slide, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === activeSlide ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img src={slide.img} alt={slide.label} className="w-full h-full object-cover" />
          </motion.div>
        ))}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Gradient at bottom for slide-in content */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Content */}
        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/60 text-sm font-medium tracking-widest uppercase mb-8"
          >
            Vaulted Web Solutions
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.8rem,8vw,6.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white mb-10"
          >
            A website
            <br />
            built right.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col items-center gap-5"
          >
            <motion.button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,1)" }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-black text-sm font-medium h-13 px-10 py-4 transition-colors duration-200"
              data-testid="button-start-project"
            >
              GET STARTED
            </motion.button>
            <p className="text-white/55 text-sm">Hand-written code. No templates. No compromises.</p>
          </motion.div>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-[3px] transition-all duration-400 ${i === activeSlide ? "w-8 bg-white" : "w-3 bg-white/40"}`}
            />
          ))}
        </div>
      </section>

      {/* ── Website Showcase ── */}
      <section className="py-20 md:py-28 bg-background overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm text-muted-foreground mb-3">Our work</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">
              Sites built by Vaulted
            </h2>
          </motion.div>
        </div>
        {/* Horizontally scrollable cards */}
        <div className="pl-6 md:pl-12 lg:pl-20 overflow-x-auto scrollbar-hide">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-5 pb-4 w-max"
          >
            {madeWithVaulted.map((site, i) => (
              <BrowserCard key={i} img={site.img} title={site.title} tag={site.tag} url={site.url} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 md:py-28 border-y border-border bg-muted/20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16"
          >
            <AnimatedStat target={100} suffix="%" label="Hand-written code" />
            <AnimatedStat target={100} suffix="%" label="Secure & tested" />
            <AnimatedStat target={35} prefix="$" suffix="+/hr" label="Starting rate" />
            <AnimatedStat target={24} suffix="hr" label="Response time" />
          </motion.div>
        </div>
      </section>

      {/* ── What We Build (tabs) ── */}
      <section id="services" className="py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
              What we build
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
              Great websites for every type of business. Custom-coded, every time.
            </p>
          </motion.div>

          {/* Tab row */}
          <div className="flex gap-1 mb-12 overflow-x-auto pb-2">
            {whatWeBuildTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                data-testid={`tab-${tab.id}`}
                className={`flex-shrink-0 px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              <div>
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6">
                  {activeTabData.heading}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {activeTabData.description}
                </p>
                <ul className="space-y-3 mb-10">
                  {activeTabData.bullets.map((b, i) => (
                    <li key={i} className="flex items-center gap-3 text-base">
                      <Check className="w-4 h-4 shrink-0" strokeWidth={2} />
                      {b}
                    </li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 font-medium text-base group"
                  data-testid="button-tab-cta"
                >
                  Start this project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
              <div className="overflow-hidden aspect-[4/3]">
                <img
                  src={activeTabData.img}
                  alt={activeTabData.heading}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── What's Included (card carousel) ── */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
              Everything included
            </h2>
            <p className="text-background/70 text-lg md:text-xl max-w-xl">
              No upsells. No add-ons. Every project gets our full attention and full stack.
            </p>
          </motion.div>
        </div>
        <div className="pl-6 md:pl-12 lg:pl-20 overflow-x-auto scrollbar-hide">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex gap-4 pb-4 w-max"
          >
            {includedFeatures.map((feat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="flex-shrink-0 w-[260px] border border-background/20 bg-background/5 p-8"
              >
                <p className="font-display text-lg font-medium mb-3">{feat.title}</p>
                <p className="text-background/60 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Animation Showcase ── */}
      <section id="capabilities" className="py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-16 md:mb-24"
          >
            <motion.span
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground mb-6 block"
            >
              <span className="w-8 h-[1px] bg-muted-foreground" />
              Interactive demos — live on this page
            </motion.span>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6"
            >
              Built to move
            </motion.h2>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl"
            >
              Every animation below is hand-coded and embedded in this site — this is what we build into yours.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-6"
          >
            <DemoCard tag="3D depth" label="Hover to tilt" description="Perspective transforms that respond to cursor position in real time.">
              <TiltDemo />
            </DemoCard>
            <DemoCard tag="Text motion" label="Staggered reveal" description="Words enter the frame in sequence — replay it as many times as you like.">
              <TextRevealDemo />
            </DemoCard>
            <DemoCard tag="Scroll trigger" label="Animated counters" description="Numbers spring to life when they scroll into view, then reset and repeat.">
              <CountUpDemoMini />
            </DemoCard>
            <DemoCard tag="Parallax" label="Multi-layer depth" description="Layers move at independent speeds, creating depth from a flat surface.">
              <ParallaxDemo />
            </DemoCard>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm text-muted-foreground mt-12"
          >
            These are just four patterns. We implement whatever your site calls for.
          </motion.p>
        </div>
      </section>

      {/* ── How We Work ── */}
      <section className="py-24 md:py-36 bg-muted/20 border-y border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 md:mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
              How we work
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
              A clear, predictable process from first conversation to launch day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
                className="bg-background p-8 md:p-10 group hover:bg-muted/30 transition-colors duration-300"
              >
                <p className="font-display text-4xl font-medium text-muted-foreground/30 mb-6 group-hover:text-muted-foreground/50 transition-colors">
                  {step.num}
                </p>
                <h3 className="font-display text-xl md:text-2xl font-medium mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
                Simple, honest pricing
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl mb-12">
                No retainers. No surprises. We charge for time and deliver value.
              </p>

              <div className="border border-border p-8 md:p-12 mb-8">
                <div className="mb-8">
                  <span className="font-display text-6xl md:text-7xl font-medium">$35–50</span>
                  <span className="text-muted-foreground text-xl ml-2">/hr</span>
                </div>
                <p className="text-muted-foreground mb-8">
                  Rate varies based on project scope, complexity, and timeline.
                </p>
                <div className="space-y-3">
                  {["Custom development", "Responsive design", "SEO optimization", "Security hardening", "Performance tuning", "Ongoing support"].map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="w-4 h-4 shrink-0" strokeWidth={2} />
                      <span className="text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-foreground text-background py-4 text-base font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
                data-testid="button-get-quote"
              >
                Get a quote <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h3 className="font-display text-2xl md:text-3xl font-medium mb-10">
                Why not a page builder?
              </h3>
              <div className="space-y-10">
                {[
                  { title: "No template bloat", desc: "Generic builders ship 100kb+ of unused JavaScript. We ship exactly what your site needs." },
                  { title: "Real security", desc: "Drag-and-drop platforms are high-value targets. Hand-written code eliminates whole categories of vulnerabilities." },
                  { title: "You own it forever", desc: "No subscription lock-in. Your code is yours — you can host it anywhere, with anyone." },
                  { title: "Built to scale", desc: "When you're ready to add features, we add them cleanly. No franken-code duct-taped onto a theme." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="border-l-2 border-border pl-6"
                  >
                    <h4 className="font-display text-lg font-medium mb-2">{item.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Featured Project ── */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-sm text-background/50 font-medium mb-4 block">Featured project</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
                CSEL Cincinnati
              </h2>
              <p className="text-background/70 text-lg md:text-xl leading-relaxed mb-10">
                A complete platform for the Center for Social-Emotional Learning, serving schools across Greater Cincinnati with resource management, events, and donation capabilities.
              </p>
              <motion.a
                href="https://cselcincy.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-background/40 text-background px-8 py-4 font-medium hover:bg-background hover:text-foreground transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="link-featured-project"
              >
                View live site <ExternalLink className="w-4 h-4" />
              </motion.a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden aspect-[4/3]"
            >
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80"
                alt="CSEL Cincinnati"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
                Let's build something.
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl mb-14">
                Send us a message and we'll get back within 24 hours.
              </p>
              <div className="space-y-8">
                {[
                  { label: "Our work", value: "cselcincy.org →", href: "https://cselcincy.org" },
                  { label: "Availability", value: "Taking new projects" },
                  { label: "Rate", value: "$35–50 per hour" },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer"
                        className="font-display text-2xl font-medium hover:underline underline-offset-4">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-display text-2xl font-medium">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
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
              <p className="font-display text-2xl font-medium mb-1">Vaulted Web Solutions</p>
              <p className="text-sm text-muted-foreground">Custom web development</p>
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Vaulted Web Solutions</p>
            <div className="flex gap-6">
              {["Twitter", "LinkedIn", "GitHub"].map((s) => (
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
