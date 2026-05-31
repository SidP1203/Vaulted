import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Services",     id: "services"     },
  { label: "Work",         id: "work"         },
  { label: "Capabilities", id: "capabilities" },
  { label: "Pricing",      id: "pricing"      },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Focus management for the mobile menu dialog (a11y rule: focus-management)
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogFirstFocusableRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Move focus into the dialog
      const id = window.setTimeout(() => dialogFirstFocusableRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    } else {
      // Restore focus to the trigger when closing
      triggerRef.current?.focus();
    }
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-[background,border,backdrop-filter] duration-300"
        style={{
          background: isScrolled ? "hsl(var(--ink-1) / 0.78)" : "transparent",
          borderBottom: `1px solid ${isScrolled ? "hsl(var(--paper) / 0.08)" : "transparent"}`,
          backdropFilter: isScrolled ? "blur(18px) saturate(140%)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(18px) saturate(140%)" : "none",
        }}
        aria-label="Primary"
      >
        <div className="container-x">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-[17px] font-semibold text-white tracking-tight rounded px-1"
              data-testid="button-logo"
              aria-label="Vaulted home"
            >
              Vaulted<span className="t-quaternary">.</span>
            </button>

            {/* Desktop nav — centered */}
            <div className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-[14px] text-white/70 hover:text-white transition-colors duration-150 rounded px-1 py-1"
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA (one primary action) */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2 text-[14px] font-medium bg-white text-black rounded-full hover:bg-white/90 active:scale-[0.97] transition-all min-h-[40px]"
              data-testid="nav-contact"
            >
              Start a project
            </button>

            {/* Mobile toggle */}
            <button
              ref={triggerRef}
              className="lg:hidden p-2 -mr-2 text-white rounded"
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
      </motion.nav>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col surface-sunken"
            onKeyDown={(e) => { if (e.key === "Escape") setIsMobileMenuOpen(false); }}
          >
            <div className="flex items-center justify-between px-6 py-4 hairline-bottom">
              <span className="text-[17px] font-semibold text-white">Vaulted<span className="t-quaternary">.</span></span>
              <button
                ref={dialogFirstFocusableRef}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white rounded"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-1">
              {[...navItems, { label: "Start a project", id: "contact" }].map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-[32px] font-medium text-white py-4 hairline-bottom rounded"
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
