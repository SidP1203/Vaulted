import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Services", id: "services" },
  { label: "Work", id: "work" },
  { label: "Capabilities", id: "capabilities" },
  { label: "Pricing", id: "pricing" },
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
        className="fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300"
        style={{
          borderBottom: "1px solid #e8e8e8",
          boxShadow: isScrolled ? "0 1px 12px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-lg font-semibold text-[#111] tracking-tight"
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
                  className="text-[14px] text-[#111] hover:opacity-60 transition-opacity duration-150"
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden lg:flex sqsp-btn-primary !py-[10px] !px-6 !text-[14px]"
              data-testid="nav-contact"
            >
              Get started
            </button>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 -mr-2 text-[#111]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen mobile overlay — slides down from top */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 bg-white z-40 lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #e8e8e8" }}>
              <span className="text-lg font-semibold text-[#111]">Vaulted</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-[#111]">
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
                  className="text-left text-[32px] font-medium text-[#111] py-3 hover:opacity-50 transition-opacity"
                  style={{ borderBottom: "1px solid #f0f0f0" }}
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
