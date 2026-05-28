import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const navItems = [
  { label: "works",    id: "works"    },
  { label: "studio",   id: "studio"   },
  { label: "services", id: "services" },
  { label: "process",  id: "process"  },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (isMobileMenuOpen) {
      const id = window.setTimeout(() => firstFocusableRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
    triggerRef.current?.focus();
  }, [isMobileMenuOpen]);

  const handleNav = (id: string) => {
    setIsMobileMenuOpen(false);
    const reduceNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: reduceNow ? "auto" : "smooth" });
    } else {
      scrollToId(id);
    }
  };

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--paper)/0.85)] backdrop-blur-md"
        style={{ borderBottom: "1px solid hsl(var(--ink-1) / 0.06)" }}
      >
        <div className="container-x">
          <div className="flex items-center justify-between h-16">
            {/* Logo — 44px min */}
            <button
              onClick={() => handleNav("top")}
              className="flex items-center gap-2 text-[16px] font-semibold t-primary tracking-tight min-h-11 px-2 -mx-2"
              data-testid="button-logo"
              aria-label="Vaulted home"
            >
              vaulted<span className="inline-block w-1.5 h-1.5 rounded-full bg-hot translate-y-[2px]" aria-hidden />
            </button>

            {/* Desktop nav — 44px min */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="text-[14px] t-secondary hover:t-primary transition-colors duration-150 min-h-11 px-3 inline-flex items-center"
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA — 44px min */}
            <button
              onClick={() => handleNav("contact")}
              className="hidden lg:inline-flex items-center gap-2 text-[14px] font-medium t-primary min-h-11 px-2 -mr-2"
              data-testid="nav-contact"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-hot pulse-dot" aria-hidden />
              let's talk
            </button>

            {/* Mobile toggle — 44px target */}
            <button
              ref={triggerRef}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 t-primary"
              onClick={() => setIsMobileMenuOpen(v => !v)}
              data-testid="button-mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dialog */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col bg-[hsl(var(--paper))]"
            onKeyDown={(e) => { if (e.key === "Escape") setIsMobileMenuOpen(false); }}
          >
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid hsl(var(--ink-1) / 0.06)" }}>
              <span className="flex items-center gap-2 text-[16px] font-semibold t-primary">
                vaulted<span className="inline-block w-1.5 h-1.5 rounded-full bg-hot translate-y-[2px]" aria-hidden />
              </span>
              <button
                ref={firstFocusableRef}
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center w-11 h-11 t-primary"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-1">
              {[...navItems, { label: "let's talk", id: "contact" }].map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : idx * 0.06, duration: reduce ? 0 : 0.3, ease: [0.25, 1, 0.5, 1] }}
                  onClick={() => handleNav(item.id)}
                  className="text-left display-3 t-primary py-4 min-h-11"
                  style={{ borderBottom: "1px solid hsl(var(--ink-1) / 0.08)" }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
