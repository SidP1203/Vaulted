import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Navbar } from "@/components/Navbar";

/* ════════════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════════════ */

const works = [
  { id: "csel",       title: "CSEL Cincinnati",     tag: "Non-profit",  year: "2025", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80", link: "https://cselcincy.org" },
  { id: "halcyon",    title: "Halcyon Studio",      tag: "E-commerce",  year: "2025", img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1400&q=80" },
  { id: "northwind",  title: "Northwind Capital",   tag: "Business",    year: "2024", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80" },
  { id: "pierce",     title: "Pierce Architecture", tag: "Portfolio",   year: "2024", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1400&q=80" },
  { id: "field",      title: "Field & Co.",         tag: "Brand",       year: "2024", img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80" },
  { id: "maison",     title: "Maison Verde",        tag: "Hospitality", year: "2023", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80" },
];

const services = [
  { n: "01", label: "Strategy",      desc: "Discovery, goals, scope, sitemap." },
  { n: "02", label: "Brand & UI",    desc: "Identity, typography, design system." },
  { n: "03", label: "Engineering",   desc: "Hand-written, performant, accessible." },
  { n: "04", label: "Launch & care", desc: "Deploy, hand-off, 30-day support." },
];

const processSteps = [
  { n: "01", title: "Discovery",  body: "A 30-minute call to understand your business and decide together if we're a fit." },
  { n: "02", title: "Scope",      body: "A clear breakdown of pages, features, timeline, and a fixed price. No surprises." },
  { n: "03", title: "Design",     body: "Wireframes, then full mockups. You see every screen before code is written." },
  { n: "04", title: "Build",      body: "Hand-written code with a live staging link from day one." },
  { n: "05", title: "Launch",     body: "Deploy, transfer ownership, plus 30 days of free post-launch support." },
];

/* ════════════════════════════════════════════════════════════════
   PRIMITIVES
   ════════════════════════════════════════════════════════════════ */

function useInViewOnce(amount = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount, once: true });
  return { ref, inView };
}

/* Reduced-motion-aware scroll helper */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}

function Reveal({
  children, delay = 0, y = 24, className = "",
}: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewOnce();
  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 1, 0.5, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Letter-by-letter stagger — used for big statements */
function StaggerText({ text, className = "" }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewOnce(0.4);
  if (reduce) return <span ref={ref as any} className={className}>{text}</span>;
  const words = text.split(" ");
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } } };
  const word: Variants = {
    hidden: { y: "110%" },
    show:   { y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
  };
  return (
    <motion.span
      ref={ref as any}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
          <motion.span variants={word} className="inline-block">{w}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* Scattered image card with subtle hover lift */
function ScatterImage({
  src, alt, caption, className = "", style, delay = 0, rotate = 0,
}: {
  src: string; alt: string; caption?: { label: string; sub?: string; pos: "tl" | "tr" | "bl" | "br" };
  className?: string; style?: React.CSSProperties; delay?: number; rotate?: number;
}) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewOnce(0.2);
  return (
    <motion.figure
      ref={ref as any}
      initial={reduce ? false : { opacity: 0, y: 28, rotate: rotate * 0.5 }}
      animate={inView ? { opacity: 1, y: 0, rotate } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
      whileHover={reduce ? {} : { scale: 1.015, rotate: rotate + 0.4 }}
      className={`relative ${className}`}
      style={style}
    >
      <div className="relative overflow-hidden w-full h-full">
        <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover block" />
        {/* contrast scrim so white caption is always legible */}
        {caption && (
          <div
            aria-hidden
            className="absolute inset-x-0 pointer-events-none"
            style={
              caption.pos === "tl" || caption.pos === "tr"
                ? { top: 0, height: "45%", background: "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)" }
                : { bottom: 0, height: "45%", background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }
            }
          />
        )}
        {caption && (
          <figcaption
            className={`absolute text-[12px] leading-tight ${
              caption.pos === "tl" ? "top-3 left-3" :
              caption.pos === "tr" ? "top-3 right-3 text-right" :
              caption.pos === "bl" ? "bottom-3 left-3" :
                                     "bottom-3 right-3 text-right"
            }`}
            style={{ color: "hsl(var(--paper))" }}
          >
            <span className="block font-medium">{caption.label}</span>
            {caption.sub && <span className="block opacity-85">{caption.sub}</span>}
          </figcaption>
        )}
      </div>
    </motion.figure>
  );
}

/* The accent dot — pulsing orange */
function HotDot({ className = "", size = 14 }: { className?: string; size?: number }) {
  return (
    <span
      aria-hidden
      className={`inline-block rounded-full bg-hot pulse-dot align-middle ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION — HERO (asymmetric scatter, huge wordmark)
   ════════════════════════════════════════════════════════════════ */

function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wmY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -80]);

  return (
    <section ref={ref} id="top" className="relative pt-28 md:pt-36 pb-24 md:pb-32 overflow-hidden">
      <div className="container-x">
        {/* GIANT wordmark — bleeds right edge */}
        <motion.h1
          style={{ y: wmY }}
          className="display-mega t-primary select-none leading-[0.78] -ml-[0.06em]"
        >
          <StaggerText text="Vaulted." />
        </motion.h1>

        {/* Asymmetric scatter — desktop (lg+ only). Image cluster, then mission row below. */}
        <div className="hidden lg:block mt-14">
          {/* Image cluster — images live in their own zone, no text underneath */}
          <div className="relative h-[300px]">
            {/* Scatter image 1 — top left */}
            <ScatterImage
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80"
              alt="Recent project — CSEL Cincinnati"
              className="absolute top-0 left-0 w-[280px] h-[200px]"
              delay={0.15}
              rotate={-1.5}
            />

            {/* Caption next to scatter 1 */}
            <Reveal delay={0.4} className="absolute top-[212px] left-0 max-w-[220px]">
              <p className="text-[14px] leading-snug t-primary">
                recent &nbsp;<span className="t-tertiary">— CSEL Cincinnati</span>
              </p>
            </Reveal>

            {/* Scatter image 2 — middle */}
            <ScatterImage
              src="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=80"
              alt="Design detail"
              className="absolute top-[20px] left-[360px] w-[200px] h-[260px]"
              delay={0.25}
              rotate={2}
            />

            {/* Small caption */}
            <Reveal delay={0.45} className="absolute top-[24px] left-[600px] max-w-[180px]">
              <p className="text-[14px] leading-snug t-primary">
                hand-coded <br /><span className="t-tertiary">no templates, ever</span>
              </p>
            </Reveal>

            {/* Tiny accent square */}
            <motion.div
              initial={reduce ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="absolute top-[140px] left-[610px] w-4 h-4 bg-[hsl(var(--ink-1))]"
            />
          </div>

          {/* Mission + CTA row — normal flow, right-aligned statement, never overlaps */}
          <div className="flex items-end justify-between gap-12 mt-12">
            <Reveal delay={0.5} className="shrink-0">
              <button
                onClick={() => scrollToId("contact")}
                className="btn"
                data-testid="hero-cta"
              >
                <HotDot size={9} /> Start a project
              </button>
            </Reveal>

            <Reveal delay={0.3} className="max-w-[820px] text-right">
              <p className="display-2 t-primary text-balance">
                <StaggerText text="A small studio building hand-coded websites at the intersection of design, code, and care." />
              </p>
            </Reveal>
          </div>
        </div>

        {/* Mobile + tablet — stacked */}
        <div className="lg:hidden mt-10 space-y-10">
          <Reveal>
            <p className="display-3 t-primary text-balance">
              <StaggerText text="A small studio building hand-coded websites at the intersection of design, code, and care." />
            </p>
          </Reveal>
          <ScatterImage
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80"
            alt="Recent project"
            className="w-full h-[260px]"
            delay={0.1}
          />
          <Reveal>
            <button
              onClick={() => scrollToId("contact")}
              className="btn"
              data-testid="hero-cta-mobile"
            >
              <HotDot size={9} /> Start a project
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION — STUDIO (editorial)
   ════════════════════════════════════════════════════════════════ */

function Studio() {
  return (
    <section id="studio" className="container-x py-24 md:py-40">
      <div className="grid md:grid-cols-12 gap-8">
        <Reveal className="md:col-span-2">
          <span className="dot-label hot">Studio</span>
        </Reveal>
        <div className="md:col-span-9 md:col-start-4">
          <p className="display-2 t-primary text-balance">
            <StaggerText text="Vaulted is a one-person studio in Cincinnati. We build websites the slow way — by hand, line by line, with care for the details no one else notices but everyone feels." />
          </p>

          <div className="mt-16 grid sm:grid-cols-2 gap-y-10 gap-x-12 max-w-3xl">
            <Reveal delay={0.1}>
              <p className="text-[13px] t-tertiary mb-2">Founded</p>
              <p className="text-[18px] t-primary">2023, Cincinnati OH</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-[13px] t-tertiary mb-2">Working with</p>
              <p className="text-[18px] t-primary">Small businesses, non-profits, independent makers</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[13px] t-tertiary mb-2">Stack</p>
              <p className="text-[18px] t-primary">React, Next.js, Tailwind, hand-rolled CSS</p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-[13px] t-tertiary mb-2">Pricing</p>
              <p className="text-[18px] t-primary">$35–50 / hour or fixed scope. You own the code.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION — WORKS (scattered gallery)
   ════════════════════════════════════════════════════════════════ */

/* Hand-tuned scatter coordinates for desktop (% based, in a tall canvas) */
const workScatter = [
  { i: 0, left: "4%",   top: "0%",   w: "30%", h: 360, rot: -1.2 },
  { i: 1, left: "62%",  top: "6%",   w: "32%", h: 280, rot: 1.5 },
  { i: 2, left: "38%",  top: "30%",  w: "26%", h: 320, rot: -0.8 },
  { i: 3, left: "8%",   top: "50%",  w: "28%", h: 300, rot: 2 },
  { i: 4, left: "66%",  top: "44%",  w: "28%", h: 340, rot: -1.5 },
  { i: 5, left: "40%",  top: "72%",  w: "30%", h: 280, rot: 1 },
];

function Works() {
  return (
    <section id="works" className="py-24 md:py-32 border-t border-hair">
      <div className="container-x">
        <header className="flex items-end justify-between gap-6 mb-16 md:mb-24">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="dot-label hot">Works</span>
              <span className="text-[13px] t-tertiary">{works.length} selected</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}
              className="btn-link text-[13px]"
              data-testid="works-cta"
            >
              Discuss a project <ArrowUpRight className="inline w-3.5 h-3.5 ml-1" />
            </a>
          </Reveal>
        </header>

        {/* Desktop scatter (lg+ only) */}
        <div className="hidden lg:block relative" style={{ height: 1280 }}>
          {workScatter.map(({ i, left, top, w, h, rot }) => {
            const item = works[i];
            return (
              <ScatterImage
                key={item.id}
                src={item.img}
                alt={item.title}
                rotate={rot}
                className=""
                style={{ position: "absolute", left, top, width: w, height: h }}
                caption={{ label: item.title, sub: `${item.tag} · ${item.year}`, pos: "bl" }}
                delay={(i % 3) * 0.05}
              />
            );
          })}
        </div>

        {/* Mobile + tablet — clean stacked grid */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-10">
          {works.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.05}>
              <figure>
                <div className="w-full h-[260px] overflow-hidden">
                  <img src={w.img} alt={w.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between">
                  <span className="text-[14px] font-medium t-primary">{w.title}</span>
                  <span className="text-[12px] t-tertiary">{w.tag} · {w.year}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION — SERVICES (minimal list)
   ════════════════════════════════════════════════════════════════ */

function Services() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <section id="services" className="container-x py-24 md:py-32 border-t border-hair">
      <div className="grid md:grid-cols-12 gap-8 mb-16">
        <Reveal className="md:col-span-2">
          <span className="dot-label hot">Services</span>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-9 md:col-start-4">
          <h2 className="display-2 t-primary text-balance">
            <StaggerText text="What we do, end to end." />
          </h2>
        </Reveal>
      </div>

      <ul className="border-t border-hair">
        {services.map((s, i) => (
          <li
            key={s.n}
            onMouseEnter={() => setHover(s.n)}
            onMouseLeave={() => setHover(null)}
            className="border-b border-hair group cursor-default"
            data-testid={`service-${s.n}`}
          >
            <Reveal delay={i * 0.04}>
              <div className="py-7 md:py-10 grid md:grid-cols-12 gap-4 items-baseline">
                <span className="md:col-span-1 font-mono text-[12px] t-tertiary tracking-wider">{s.n}</span>
                <h3 className="md:col-span-5 display-3 font-medium t-primary transition-transform duration-300 group-hover:translate-x-2">
                  {s.label}
                </h3>
                <p className="md:col-span-5 text-[16px] t-secondary md:max-w-md">{s.desc}</p>
                <span aria-hidden className="md:col-span-1 justify-self-end transition-transform duration-300 group-hover:rotate-90 t-tertiary">
                  <Plus className="w-5 h-5" />
                </span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION — PROCESS (numbered)
   ════════════════════════════════════════════════════════════════ */

function Process() {
  return (
    <section id="process" className="container-x py-24 md:py-32 border-t border-hair">
      <div className="grid md:grid-cols-12 gap-8 mb-16">
        <Reveal className="md:col-span-2">
          <span className="dot-label hot">Process</span>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-9 md:col-start-4">
          <h2 className="display-2 t-primary text-balance">
            <StaggerText text="A clear path from call to launch." />
          </h2>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-5 gap-px bg-[hsl(var(--ink-1)/0.10)]">
        {processSteps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.05}>
            <article className="p-7 md:p-8 bg-[hsl(var(--paper))] h-full flex flex-col gap-3">
              <span className="font-mono text-[12px] t-tertiary tracking-wider">{s.n}</span>
              <h3 className="text-[20px] font-medium t-primary leading-tight">{s.title}</h3>
              <p className="text-[14px] t-secondary leading-relaxed mt-auto">{s.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION — CONTACT (huge "let's talk")
   ════════════════════════════════════════════════════════════════ */

function Contact() {
  return (
    <section id="contact" className="container-x py-24 md:py-40 border-t border-hair">
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-6">
          <Reveal>
            <span className="dot-label hot mb-8">Let's talk</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-1 t-primary text-balance">
              <StaggerText text="Got a project? Let's build it the right way." />
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <p className="text-[17px] t-secondary leading-relaxed max-w-md">
              Tell us a little about what you're working on. We respond within one business day — usually faster.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 space-y-3">
            <p className="text-[14px] t-tertiary">Or reach out directly</p>
            <a href="mailto:hello@vaulted.studio" className="block text-[20px] font-medium t-primary border-b border-[hsl(var(--ink-1))] inline-block pb-1 hover:t-hot transition-colors" data-testid="email-direct">
              hello@vaulted.studio
            </a>
          </Reveal>
        </div>

        <div className="md:col-span-6 md:pl-8">
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="border-t border-hair">
      <div className="container-x py-10 md:py-16">
        {/* Giant wordmark again */}
        <Reveal>
          <p className="display-mega t-primary leading-[0.78] -ml-[0.06em] select-none">vaulted.</p>
        </Reveal>
        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[13px]">
          <p className="t-tertiary">© {new Date().getFullYear()} Vaulted Web Solutions · Cincinnati, OH</p>
          <p className="t-quaternary font-mono">hand-coded, no templates</p>
        </div>
      </div>
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
      <main id="main" className="bg-[hsl(var(--paper))] min-h-screen">
        <Hero />
        <Studio />
        <Works />
        <Services />
        <Process />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
