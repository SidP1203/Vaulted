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
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
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
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? "bg-background/96 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`font-display text-xl font-medium tracking-tight transition-colors duration-300 ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-logo"
            >
              Vaulted
            </motion.button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium transition-colors duration-300 group py-2 ${
                    isScrolled
                      ? "text-foreground/70 hover:text-foreground"
                      : "text-white/75 hover:text-white"
                  }`}
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 -bottom-0.5 w-0 h-[1px] group-hover:w-full transition-all duration-300 ${
                      isScrolled ? "bg-foreground" : "bg-white"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              onClick={() => scrollToSection("contact")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`hidden lg:flex items-center h-10 px-6 text-sm font-medium transition-all duration-300 ${
                isScrolled
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "border border-white text-white hover:bg-white hover:text-black"
              }`}
              data-testid="nav-contact"
            >
              Get started
            </motion.button>

            {/* Mobile Toggle */}
            <motion.button
              className={`lg:hidden p-2 -mr-2 transition-colors duration-300 ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-[72px] left-0 right-0 bg-background border-b border-border z-40 lg:hidden"
            >
              <div className="px-6 py-5 space-y-1">
                {[...navItems, { label: "Contact", id: "contact" }].map(
                  (item, idx) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left text-lg font-medium py-3 hover:pl-2 transition-all text-foreground"
                    >
                      {item.label}
                    </motion.button>
                  )
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
