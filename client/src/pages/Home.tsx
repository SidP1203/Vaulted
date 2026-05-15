import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight, ExternalLink, RotateCcw } from "lucide-react";

/* ─── Hero / contact cycling scenes ────────────────────────────── */

const heroScenes = [
  "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1920&q=80",
];

/* ─── Service tabs ──────────────────────────────────────────────── */

const serviceTabs = [
  {
    label: "Business Sites",
    heading: "Launch a professional website",
    desc: "Establish trust and generate leads with a site built to represent your brand at its best. No templates — hand-coded from scratch.",
    tags: "Agencies · Consultants · Retailers",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80",
  },
  {
    label: "E-Commerce",
    heading: "Sell online with confidence",
    desc: "Custom storefronts with clean checkout flows, payment integrations, and inventory management. Built to convert.",
    tags: "Artisans · Retailers · Limited Releases",
    img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1400&q=80",
  },
  {
    label: "Non-Profits",
    heading: "Amplify your mission",
    desc: "Donation processing, event management, and resource systems — built for organizations like CSEL Cincinnati.",
    tags: "Non-profits · Advocacy Groups · Foundations",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
  },
  {
    label: "Portfolios",
    heading: "Show your work beautifully",
    desc: "Image-forward layouts that put your projects first. Case studies, galleries, and booking built in.",
    tags: "Designers · Photographers · Architects",
    img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1400&q=80",
  },
];

/* ─── Portfolio sites ───────────────────────────────────────────── */

const portfolioSites = [
  { title: "CSEL Cincinnati",     tag: "Non-profit",   url: "https://cselcincy.org", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" },
  { title: "E-Commerce Platform", tag: "Online Store",  url: "#",                    img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80" },
  { title: "Corporate Dashboard", tag: "SaaS",          url: "#",                    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
  { title: "Creative Portfolio",  tag: "Portfolio",     url: "#",                    img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80" },
  { title: "Local Business",      tag: "Business",      url: "#",                    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80" },
  { title: "Restaurant & Events", tag: "Hospitality",   url: "#",                    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" },
];

/* ─── Process steps ─────────────────────────────────────────────── */

const processSteps = [
  { num: "01", title: "Discovery call",      desc: "We talk through your goals, timeline, and constraints. No assumptions made, no sales pitch given." },
  { num: "02", title: "Design direction",    desc: "Wireframes and visual concepts before a single line of code is written. You approve before we build." },
  { num: "03", title: "Development",         desc: "Hand-written, documented code in modern frameworks. Clean architecture from day one." },
  { num: "04", title: "QA & security review",desc: "Full cross-browser testing, performance audits, and a security hardening pass before launch." },
  { num: "05", title: "Launch",              desc: "Zero-downtime deployment. We handle domains, DNS, hosting configuration, and go-live." },
  { num: "06", title: "Support & growth",    desc: "Monthly updates, content changes, and new features as your business evolves." },
];

/* ─── FAQs ──────────────────────────────────────────────────────── */

const faqs = [
  { q: "How long does a typical project take?",              a: "Most projects run 2–6 weeks depending on scope. A simple business site can be live in two weeks. Larger platforms with custom features take longer. We'll give you a realistic timeline during our discovery call — no inflated estimates to manage expectations later." },
  { q: "Do I need to provide my own designs?",               a: "No. We handle everything from visual direction to final code. If you have brand assets, logos, or inspiration, we'll incorporate them. If you're starting from scratch, we'll develop a direction together before writing a single line of code." },
  { q: "Can you work with my existing domain or hosting?",   a: "Yes — we deploy to any provider you prefer. AWS, DigitalOcean, Vercel, Netlify, your current host. We handle DNS configuration and zero-downtime launches. You're never locked into our infrastructure." },
  { q: "What do I actually own after the project?",          a: "Everything. The code, the design files, the domain, the data. There's no ongoing license fee to keep your site running. If you ever want to work with a different developer, you can hand them the full codebase." },
  { q: "Is there a minimum project size or budget?",         a: "No minimums. We bill hourly at $35–$50/hr and will always give you an upfront estimate. Small jobs are just as welcome as large ones — and many of our longest client relationships started with a single small fix." },
];

/* ─── Slot machine stat ─────────────────────────────────────────── */

function SlotStat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  const triggered = useRef(false);

  useEffect(() => {
    if (!inView || triggered.current) return;
    triggered.current = true;
    const settleAt = 1800;
    const startTime = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= settleAt) { setDisplay(target); clearInterval(tick); return; }
      const progress = elapsed / settleAt;
      setDisplay(Math.floor(target * progress + Math.random() * target * (1 - progress) * 0.4));
    }, 80);
    return () => clearInterval(tick);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center px-8">
      <div className="text-5xl md:text-6xl font-semibold text-white tabular-nums leading-none tracking-tight">
        {display}{suffix}
      </div>
    </div>
  );
}

/* ─── Hero mockup card ──────────────────────────────────────────── */

function MockupCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="floating-card rounded-2xl overflow-hidden w-full max-w-[460px]"
      style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.55)" }}
    >
      <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 bg-white/10 rounded px-3 py-1 text-[11px] text-white/50 truncate">cselcincy.org</div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
        alt="Website preview"
        className="w-full block"
        style={{ height: "340px", objectFit: "cover", objectPosition: "top" }}
      />
    </motion.div>
  );
}

/* ─── Animation demos ───────────────────────────────────────────── */

function TiltDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0), rawY = useMotionValue(0);
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
  return (
    <div ref={cardRef} onMouseMove={onMove} onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
      className="w-full h-full flex items-center justify-center" style={{ perspective: 1000 }}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative w-36 h-44">
        <div className="absolute inset-0 bg-white/8 border border-white/15 flex flex-col items-center justify-center gap-3">
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }}
            className="w-10 h-10 rounded-full bg-white/20" />
          <div className="w-20 h-2 bg-white/20" />
          <div className="w-14 h-2 bg-white/10" />
        </div>
        <div className="absolute -top-4 -right-4 w-14 h-14 border border-white/20 bg-white/5"
          style={{ transform: "translateZ(32px)" }} />
        <div className="absolute -bottom-3 -left-3 w-9 h-9 bg-white/8 border border-white/15"
          style={{ transform: "translateZ(18px)" }} />
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.14) 0%, transparent 65%)`, transform: "translateZ(1px)" }} />
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
                  className="text-3xl md:text-4xl font-semibold text-white block">{w}
                </motion.span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <button onClick={() => setKey(k => k + 1)}
        className="inline-flex items-center gap-2 text-xs text-white/40 border border-white/15 px-4 py-2 rounded-full hover:border-white/50 hover:text-white/70 transition-all"
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
            <p className="text-4xl md:text-5xl font-semibold text-white tabular-nums" data-testid={`stat-count-${i}`}>
              {counts[i]}{suffixes[i]}
            </p>
            <p className="text-xs text-white/35 mt-2">{labels[i]}</p>
          </div>
        ))}
      </div>
      <button onClick={() => { played.current = false; run(); }}
        className="inline-flex items-center gap-2 text-xs text-white/40 border border-white/15 px-4 py-2 rounded-full hover:border-white/50 hover:text-white/70 transition-all"
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
      <motion.div style={{ x: bX, y: bY }} className="absolute w-40 h-40 border border-white/15" />
      <motion.div style={{ x: mX, y: mY }} className="absolute w-24 h-24 border border-white/20 bg-white/5" />
      <motion.div style={{ x: fX, y: fY }} className="absolute w-12 h-12 bg-white/80" />
      <motion.div style={{ x: aX, y: aY }} className="absolute w-6 h-6 border border-white/20 top-[calc(50%-40px)] left-[calc(50%+36px)]" />
      <motion.div style={{ x: cX, y: cY }} className="absolute w-5 h-5 bg-white/15 bottom-[calc(50%-40px)] left-[calc(50%-50px)]" />
    </div>
  );
}

/* ─── Demo card wrapper ─────────────────────────────────────────── */

function DemoCard({ tag, label, desc, children }: { tag: string; label: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="px-6 pt-6 pb-3 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <span className="text-[11px] font-medium text-white/35 uppercase tracking-widest">{tag}</span>
        <span className="text-[10px] text-white/20 font-mono">live</span>
      </div>
      <div className="flex items-center justify-center" style={{ height: 280 }}>{children}</div>
      <div className="px-6 pb-7 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <p className="text-lg font-semibold text-white mb-1">{label}</p>
        <p className="text-sm text-white/45">{desc}</p>
      </div>
    </div>
  );
}

/* ─── Squarespace-style dark accordion ──────────────────────────── */

function DarkAccordionItem({
  title, body, num, isOpen, onToggle, testId,
}: {
  title: string; body: string; num?: string; isOpen: boolean; onToggle: () => void; testId?: string;
}) {
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <button
        className="w-full flex items-center justify-between py-6 text-left group"
        onClick={onToggle}
        data-testid={testId}
      >
        <div className="flex items-center gap-6 flex-1 min-w-0 pr-8">
          {num && <span className="text-white/25 text-base font-medium shrink-0 w-8">{num}</span>}
          <span className="text-[17px] md:text-[19px] font-medium text-white group-hover:text-white/70 transition-colors leading-snug">
            {title}
          </span>
        </div>
        <span className="text-white/50 text-2xl font-light shrink-0 w-6 text-center leading-none select-none transition-colors group-hover:text-white">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className={`pb-6 text-[16px] md:text-[17px] leading-relaxed text-white/50 ${num ? "pl-14" : ""}`}>
              {body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Floating gallery (Made with Vaulted) ──────────────────────── */

const galleryImages = [
  { title: "CSEL Cincinnati",     img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" },
  { title: "E-Commerce Store",    img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80" },
  { title: "Corporate Dashboard", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" },
  { title: "Creative Portfolio",  img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80" },
  { title: "Local Business",      img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80" },
  { title: "Restaurant & Events", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80" },
  { title: "Fashion Brand",       img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80" },
  { title: "Law Firm",            img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80" },
  { title: "Music Studio",        img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },
  { title: "Architecture Firm",   img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=600&q=80" },
];

function GalleryCard({ item }: { item: typeof galleryImages[0] }) {
  return (
    <div className="shrink-0 w-[230px] rounded-xl overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: "#1c1c1c" }}>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#febc2e" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <div className="flex-1 rounded px-2 py-0.5 text-[9px] truncate"
          style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}>
          {item.title.toLowerCase().replace(/\s/g, "")}.com
        </div>
      </div>
      <img src={item.img} alt={item.title} loading="lazy"
        className="w-full object-cover" style={{ height: 145 }} />
    </div>
  );
}

function FloatingGallery() {
  const row1 = [...galleryImages, ...galleryImages];
  const row2 = [...galleryImages.slice(4), ...galleryImages.slice(0, 4), ...galleryImages.slice(4), ...galleryImages.slice(0, 4)];
  const row3 = [...galleryImages.slice(2), ...galleryImages.slice(0, 2), ...galleryImages.slice(2), ...galleryImages.slice(0, 2)];

  return (
    <div className="relative overflow-hidden" id="work"
      style={{ height: 530, background: "#0a0a0a" }}>

      {/* Row 1 — left */}
      <div className="absolute top-8 overflow-hidden w-full">
        <div className="gallery-scroll-left flex gap-3" style={{ width: "max-content" }}>
          {row1.map((item, i) => <GalleryCard key={i} item={item} />)}
        </div>
      </div>

      {/* Row 2 — right */}
      <div className="absolute overflow-hidden w-full" style={{ top: 8 + 145 + 32 + 12 }}>
        <div className="gallery-scroll-right flex gap-3" style={{ width: "max-content" }}>
          {row2.map((item, i) => <GalleryCard key={i} item={item} />)}
        </div>
      </div>

      {/* Row 3 — left fast */}
      <div className="absolute overflow-hidden w-full" style={{ top: 8 + 2 * (145 + 32 + 12) }}>
        <div className="gallery-scroll-left2 flex gap-3" style={{ width: "max-content" }}>
          {row3.map((item, i) => <GalleryCard key={i} item={item} />)}
        </div>
      </div>

      {/* Center vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.45) 55%, transparent 100%)" }} />

      {/* Center overlay text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 pointer-events-none">
        <h2 className="text-white font-medium text-center" style={{ fontSize: "clamp(2rem,4.5vw,3.25rem)", letterSpacing: "-0.02em" }}>
          Made with Vaulted
        </h2>
        <p className="text-white/50 text-[15px]">Real sites. Real businesses.</p>
      </div>

      {/* Bottom "see our work" link */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center">
        <a href="https://cselcincy.org" target="_blank" rel="noopener noreferrer"
          className="pointer-events-auto inline-flex items-center gap-2 text-[13px] text-white/45 hover:text-white transition-colors"
          data-testid="link-view-all-work">
          See our featured project <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

/* ─── Portfolio circular lens ───────────────────────────────────── */

function PortfolioLens() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0), rawY = useMotionValue(0);
  const lensX = useSpring(rawX, { stiffness: 220, damping: 28 });
  const lensY = useSpring(rawY, { stiffness: 220, damping: 28 });
  const LENS = 320;
  const lensLeft = useTransform(lensX, v => v - LENS / 2);
  const lensTop  = useTransform(lensY, v => v - LENS / 2);
  const [isInside, setIsInside] = useState(false);
  const [lensIdx, setLensIdx]   = useState(0);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    rawX.set(x); rawY.set(y);
    setLensIdx(Math.max(0, Math.min(Math.floor((x / rect.width) * portfolioSites.length), portfolioSites.length - 1)));
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden cursor-none select-none w-full"
      style={{ height: 520, background: "#0a0a0a" }}
      onMouseMove={onMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
    >
      <div className="absolute inset-0 grid pointer-events-none"
        style={{ gridTemplateColumns: `repeat(${portfolioSites.length}, 1fr)` }}>
        {portfolioSites.map((site, i) => (
          <div key={i} className="flex flex-col justify-end p-6"
            style={{ borderRight: i < portfolioSites.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
            <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1">{site.tag}</p>
            <p className="text-white/35 text-sm font-medium">{site.title}</p>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {!isInside && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none text-white/18 text-lg tracking-wide">
            Move your cursor to explore
          </motion.p>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isInside && (
          <motion.div
            initial={{ opacity: 0, scale: 0.55 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.55 }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute pointer-events-none overflow-hidden"
            style={{ width: LENS, height: LENS, borderRadius: "50%", x: lensLeft, y: lensTop,
              border: "1.5px solid rgba(255,255,255,0.22)", boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 28px 80px rgba(0,0,0,0.75)" }}
          >
            <AnimatePresence mode="wait">
              <motion.img key={lensIdx} src={portfolioSites[lensIdx].img} alt={portfolioSites[lensIdx].title}
                initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }} className="w-full h-full object-cover" />
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 p-5 text-center"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82), transparent)" }}>
              <p className="text-white text-[13px] font-semibold">{portfolioSites[lensIdx].title}</p>
              <p className="text-white/55 text-[11px] mt-0.5">{portfolioSites[lensIdx].tag}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Reveal wrapper ────────────────────────────────────────────── */

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Main page ─────────────────────────────────────────────────── */

export default function Home() {
  const [scene, setScene] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openProcess, setOpenProcess] = useState<number | null>(null);
  const tabDirRef = useRef(1);

  const handleTabChange = useCallback((i: number) => {
    tabDirRef.current = i > activeTab ? 1 : -1;
    setActiveTab(i);
  }, [activeTab]);

  useEffect(() => {
    const id = setInterval(() => setScene(s => (s + 1) % heroScenes.length), 4500);
    return () => clearInterval(id);
  }, []);

  // Auto-advance service tabs
  useEffect(() => {
    const id = setInterval(() => {
      tabDirRef.current = 1;
      setActiveTab(prev => (prev + 1) % serviceTabs.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const heroReveal = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as any },
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {heroScenes.map((src, i) => (
          <div key={i} className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${src})`, opacity: i === scene ? 1 : 0, transition: "opacity 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
        ))}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.48)" }} />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 py-32 md:py-0 md:min-h-screen flex items-center">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 w-full">
            <div className="flex-1 min-w-0 max-w-[540px]">
              <motion.p {...heroReveal(0.1)} className="text-white/60 text-[11px] font-medium tracking-[0.2em] uppercase mb-5">
                Vaulted Web Solutions
              </motion.p>
              <motion.h1 {...heroReveal(0.25)} className="text-white font-medium leading-[1.1] tracking-tight mb-2"
                style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)", letterSpacing: "-0.02em" }}>
                A website
              </motion.h1>
              <motion.h1 {...heroReveal(0.38)} className="text-white font-medium leading-[1.1] tracking-tight mb-7"
                style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)", letterSpacing: "-0.02em" }}>
                built right.
              </motion.h1>
              <motion.p {...heroReveal(0.52)} className="text-white/80 text-[17px] leading-relaxed mb-8" style={{ maxWidth: 420 }}>
                Hand-written code. No templates. No compromises.
              </motion.p>
              <motion.div {...heroReveal(0.68)} className="flex flex-wrap items-center gap-4">
                <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="sqsp-btn-white" data-testid="button-start-project">
                  Get started
                </button>
                <a href="https://cselcincy.org" target="_blank" rel="noopener noreferrer"
                  className="text-white text-[14px] underline underline-offset-4 hover:opacity-70 transition-opacity">
                  See our work
                </a>
              </motion.div>
            </div>
            <div className="hidden md:flex flex-1 justify-end">
              <MockupCard />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroScenes.map((_, i) => (
            <button key={i} onClick={() => setScene(i)}
              className="h-[2px] transition-all duration-500 rounded-full"
              style={{ width: i === scene ? 28 : 10, background: i === scene ? "#fff" : "rgba(255,255,255,0.3)" }} />
          ))}
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "#111" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-14">
          <Reveal className="mb-10">
            <p className="text-center text-white/45 text-[17px]">Join businesses that chose real code over page builders.</p>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { target: 100, suffix: "%",    label: "Custom code, always" },
              { target: 100, suffix: "%",    label: "Clients who own their code" },
              { target: 35,  suffix: "+/hr", label: "Starting hourly rate ($)" },
              { target: 24,  suffix: "hr",   label: "Average response time" },
            ].map((s, i) => (
              <div key={i} className="py-6" style={{ borderRight: "1px solid rgba(255,255,255,0.08)" }}>
                <SlotStat target={s.target} suffix={s.suffix} label={s.label} />
                <p className="text-center text-white/35 text-[14px] mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services — "Grow your business" — centered, full-width image ── */}
      <section id="services" className="py-[120px] max-md:py-[72px] overflow-hidden" style={{ background: "#0a0a0a" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">

          {/* Centered header */}
          <Reveal className="text-center mb-10">
            <h2 className="text-white font-medium mb-3" style={{ fontSize: "clamp(1.75rem,4vw,3rem)", letterSpacing: "-0.02em" }}>
              Grow your business.
            </h2>
            <p className="text-white/45 text-[17px] max-w-xl leading-relaxed mx-auto">
              Whatever your business, we build it from scratch — no templates, no shortcuts.
            </p>
          </Reveal>

          {/* Centered pill tabs */}
          <div className="overflow-x-auto scrollbar-hide mb-8">
            <div className="flex gap-2 justify-center w-max mx-auto">
              {serviceTabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => handleTabChange(i)}
                  className="px-5 py-2 text-[14px] rounded-full border transition-all duration-200 whitespace-nowrap"
                  style={activeTab === i
                    ? { background: "#fff", color: "#0a0a0a", border: "1px solid #fff" }
                    : { background: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.18)" }
                  }
                  data-testid={`tab-service-${i}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Full-width image with text overlay on left */}
          <div className="relative w-full overflow-hidden rounded-2xl" style={{ minHeight: 520 }}>
            <AnimatePresence mode="wait" custom={tabDirRef.current} initial={false}>
              <motion.img
                key={activeTab}
                src={serviceTabs[activeTab].img}
                alt={serviceTabs[activeTab].heading}
                custom={tabDirRef.current}
                variants={{
                  enter: (d: number) => ({ x: d * 60, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit:  (d: number) => ({ x: d * -60, opacity: 0 }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </AnimatePresence>

            {/* Dark gradient overlay — strong on left, fading right */}
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 100%)" }} />

            {/* Text content — bottom left */}
            <div className="relative z-10 flex items-end h-full" style={{ minHeight: 520 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="p-10 md:p-14 max-w-lg"
                >
                  <p className="text-[11px] font-medium text-white/45 tracking-widest uppercase mb-4">
                    {serviceTabs[activeTab].label}
                  </p>
                  <h3 className="text-white font-medium mb-4" style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)", letterSpacing: "-0.02em" }}>
                    {serviceTabs[activeTab].heading}
                  </h3>
                  <p className="text-white/65 text-[17px] leading-relaxed mb-3">
                    {serviceTabs[activeTab].desc}
                  </p>
                  <p className="text-[14px] text-white/35 mb-8">Great for: {serviceTabs[activeTab].tags}</p>
                  <button
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="sqsp-btn-white text-sm"
                    data-testid={`service-cta-${activeTab}`}
                  >
                    Start this project
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* ── Portfolio — floating gallery ── */}
      <FloatingGallery />

      {/* ── Animation showcase ── */}
      <section id="capabilities" className="py-[120px] max-md:py-[72px]" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <Reveal className="mb-14">
            <p className="text-[11px] font-medium text-white/35 uppercase tracking-widest mb-3">Interactive demos — live on this page</p>
            <h2 className="text-white font-medium mb-4" style={{ fontSize: "clamp(1.75rem,4vw,3rem)", letterSpacing: "-0.02em" }}>
              Built to move.
            </h2>
            <p className="text-white/45 text-[17px] max-w-2xl leading-relaxed">
              Every animation below is hand-coded into this page. This is what we build into yours.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            <Reveal delay={0}><DemoCard tag="3D depth" label="Hover to tilt" desc="Perspective transforms that respond to cursor position in real time."><TiltDemo /></DemoCard></Reveal>
            <Reveal delay={0.06}><DemoCard tag="Text motion" label="Staggered reveal" desc="Words enter the frame in sequence — press replay any time."><TextRevealDemo /></DemoCard></Reveal>
            <Reveal delay={0.12}><DemoCard tag="Scroll trigger" label="Animated counters" desc="Numbers spring to life when they scroll into view."><CounterDemo /></DemoCard></Reveal>
            <Reveal delay={0.18}><DemoCard tag="Parallax" label="Multi-layer depth" desc="Layers move at different speeds, creating depth from a flat surface."><ParallaxDemo /></DemoCard></Reveal>
          </div>
        </div>
      </section>

      {/* ── How it works + Common questions — 2-column side by side ── */}
      <section className="py-[120px] max-md:py-[72px]" style={{ background: "#111", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">

            {/* Left — How it works */}
            <div>
              <Reveal className="mb-10">
                <h2 className="text-white font-medium mb-2" style={{ fontSize: "clamp(1.4rem,2.8vw,2.25rem)", letterSpacing: "-0.02em" }}>
                  How it works
                </h2>
                <p className="text-white/40 text-[15px] leading-relaxed">
                  A clear process from first call to launch day.
                </p>
              </Reveal>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                {processSteps.map((step, i) => (
                  <DarkAccordionItem
                    key={i}
                    num={step.num}
                    title={step.title}
                    body={step.desc}
                    isOpen={openProcess === i}
                    onToggle={() => setOpenProcess(openProcess === i ? null : i)}
                    testId={`process-${step.num}`}
                  />
                ))}
              </div>
            </div>

            {/* Right — Common questions */}
            <div>
              <Reveal className="mb-10">
                <h2 className="text-white font-medium mb-2" style={{ fontSize: "clamp(1.4rem,2.8vw,2.25rem)", letterSpacing: "-0.02em" }}>
                  Common questions.
                </h2>
                <p className="text-white/40 text-[15px] leading-relaxed">
                  Everything you need to know before getting started.
                </p>
              </Reveal>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                {faqs.map((faq, i) => (
                  <DarkAccordionItem
                    key={i}
                    title={faq.q}
                    body={faq.a}
                    isOpen={openFaq === i}
                    onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                    testId={`faq-${i}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-[120px] max-md:py-[72px]" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <Reveal className="mb-14">
            <h2 className="text-white font-medium mb-4" style={{ fontSize: "clamp(1.75rem,4vw,3rem)", letterSpacing: "-0.02em" }}>
              Simple, honest pricing.
            </h2>
            <p className="text-white/45 text-[17px] max-w-xl leading-relaxed">
              No retainers. No surprise invoices. Just straightforward hourly work.
            </p>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <Reveal>
              <div className="mb-10">
                <span className="font-semibold leading-none tracking-tight text-white" style={{ fontSize: "clamp(4rem,10vw,7rem)" }}>$35</span>
                <span className="font-medium text-4xl md:text-5xl text-white/30"> – $50</span>
                <span className="text-xl text-white/25 ml-2">/hr</span>
              </div>
              <p className="text-white/45 text-[17px] leading-relaxed mb-10 max-w-md">
                Rate depends on project scope and complexity. Most projects are estimated upfront — you'll always know what you're paying before we start.
              </p>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="sqsp-btn-white" data-testid="button-get-quote">
                Get a free quote
              </button>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[11px] font-medium text-white/30 uppercase tracking-widest mb-8">What's included</p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                {["Custom design & development", "Mobile-first responsive layouts", "SEO-optimized structure", "Security hardening", "Performance tuning", "Post-launch support"].map((item, i) => (
                  <div key={i} className="py-4 flex items-center justify-between group"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <span className="text-[17px] text-white/80">{item}</span>
                    <span className="text-[14px] text-white/30 opacity-0 group-hover:opacity-100 transition-opacity">Included ✓</span>
                  </div>
                ))}
              </div>
              <p className="text-[14px] text-white/25 mt-8">
                No subscription lock-in. Your code, your server, your way. You own everything we build.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Featured project ── */}
      <section className="py-[120px] max-md:py-[72px]" style={{ background: "#111", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <p className="text-[11px] font-medium text-white/30 uppercase tracking-widest mb-5">Featured project</p>
              <h2 className="text-white font-medium mb-6" style={{ fontSize: "clamp(1.75rem,4vw,3rem)", letterSpacing: "-0.02em" }}>
                CSEL Cincinnati
              </h2>
              <p className="text-white/50 text-[17px] leading-relaxed mb-10 max-w-md">
                A complete platform for the Center for Social-Emotional Learning, serving schools across Greater Cincinnati with resource management, event calendars, and donation processing.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a href="https://cselcincy.org" target="_blank" rel="noopener noreferrer"
                  className="sqsp-btn-white" data-testid="link-featured-project">
                  Visit live site <ExternalLink size={14} />
                </a>
                <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="sqsp-btn-ghost !border-white/25 !text-white/60 hover:!bg-white hover:!text-black hover:!border-white">
                  Start your project
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3", boxShadow: "0 8px 60px rgba(0,0,0,0.5)" }}>
                <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80"
                  alt="CSEL Cincinnati" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ── Contact — cycling photo background (same rolling images as hero) ── */}
      <section id="contact" className="relative overflow-hidden" style={{ minHeight: 700 }}>
        {/* Cycling background — same heroScenes rolling in sync */}
        {heroScenes.map((src, i) => (
          <div key={i} className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${src})`, opacity: i === scene ? 1 : 0, transition: "opacity 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
        ))}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.72)" }} />

        {/* Content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 py-[120px] max-md:py-[72px]">
          <Reveal className="mb-14">
            <h2 className="text-white font-medium mb-4" style={{ fontSize: "clamp(1.75rem,4vw,3rem)", letterSpacing: "-0.02em" }}>
              Start a project.
            </h2>
            <p className="text-white/50 text-[17px] max-w-xl leading-relaxed">
              Tell us what you're building. We'll get back within 24 hours.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Info rows */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
              {[
                { label: "Our work",      value: "cselcincy.org",           href: "https://cselcincy.org" },
                { label: "Availability",  value: "Taking new projects now"                               },
                { label: "Rate",          value: "$35–50 per hour"                                       },
                { label: "Response time", value: "Within 24 hours"                                       },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="py-5 flex items-center justify-between gap-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                    <p className="text-[14px] text-white/35 w-32 shrink-0">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer"
                        className="text-xl font-medium text-white hover:opacity-60 transition-opacity underline-offset-4 hover:underline">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-xl font-medium text-white">{item.value}</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Form in glass card */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
            {[
              {
                heading: "Services",
                links: [
                  { label: "Business Sites", id: "services" },
                  { label: "E-Commerce",     id: "services" },
                  { label: "Non-Profits",    id: "services" },
                  { label: "Portfolios",     id: "services" },
                ],
              },
              {
                heading: "Work",
                links: [
                  { label: "Our Portfolio",   id: "work"         },
                  { label: "CSEL Cincinnati", url: "https://cselcincy.org" },
                  { label: "Capabilities",    id: "capabilities" },
                ],
              },
              {
                heading: "Company",
                links: [
                  { label: "Process", id: "capabilities" },
                  { label: "Pricing", id: "pricing"      },
                  { label: "FAQ",     id: "contact"      },
                ],
              },
              {
                heading: "Start",
                links: [
                  { label: "Get a quote", id: "contact" },
                  { label: "Contact us",  id: "contact" },
                ],
              },
            ].map((col, ci) => (
              <div key={ci}>
                <p className="text-[11px] font-semibold text-white/30 mb-4 uppercase tracking-widest">{col.heading}</p>
                <div className="space-y-2.5">
                  {col.links.map((link, li) => (
                    <div key={li}>
                      {"url" in link ? (
                        <a href={link.url as string} target="_blank" rel="noopener noreferrer"
                          className="text-[13px] text-white/40 hover:text-white transition-colors block">
                          {link.label}
                        </a>
                      ) : (
                        <button
                          onClick={() => document.getElementById(link.id as string)?.scrollIntoView({ behavior: "smooth" })}
                          className="text-[13px] text-white/40 hover:text-white transition-colors text-left">
                          {link.label}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-[12px] text-white/20">© {new Date().getFullYear()} Vaulted Web Solutions. All rights reserved.</p>
            <div className="flex gap-5">
              {["Twitter", "LinkedIn", "GitHub"].map(s => (
                <a key={s} href="#" className="text-[12px] text-white/25 hover:text-white transition-colors"
                  data-testid={`link-social-${s.toLowerCase()}`}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
