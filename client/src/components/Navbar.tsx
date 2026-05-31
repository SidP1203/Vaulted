import { useState, useEffect } from "react";
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled ? "rgba(10,10,10,0.92)" : "transparent",
          borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          backdropFilter: isScrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-lg font-semibold text-white tracking-tight"
              data-testid="button-logo"
            >
              Vaulted
            </button>

            {/* Desktop nav — centered */}
            <div className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-[14px] text-white/70 hover:text-white transition-colors duration-150"
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden lg:flex items-center gap-2 px-6 py-[10px] text-[14px] font-medium bg-white text-black rounded-full hover:bg-white/90 transition-all"
              data-testid="nav-contact"
            >
              Get started
            </button>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 -mr-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
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
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col"
            style={{ background: "#0a0a0a" }}
          >
            <div className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="text-lg font-semibold text-white">Vaulted</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white">
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {[...navItems, { label: "Contact", id: "contact" }].map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.35 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-[32px] font-medium text-white py-3 hover:text-white/50 transition-colors"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
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
