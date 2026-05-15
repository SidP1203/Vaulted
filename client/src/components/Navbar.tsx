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
        style={isScrolled ? {
          background: "rgba(10,10,10,0.88)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        } : {}}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div
            className="flex items-center justify-between transition-all duration-300"
            style={{ height: isScrolled ? "60px" : "76px" }}
          >
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-display text-xl text-white tracking-tight"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-logo"
            >
              Vaulted
            </motion.button>

            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 group py-2"
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-[#c9a96e] group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            <motion.button
              onClick={() => scrollToSection("contact")}
              whileTap={{ scale: 0.97 }}
              className="hidden lg:flex btn-primary !py-3 !px-6 text-xs"
              data-testid="nav-contact"
            >
              Get started
            </motion.button>

            <motion.button
              className="lg:hidden p-2 -mr-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[280px] z-50 lg:hidden flex flex-col"
              style={{ background: "#0f0f0f", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
                <span className="font-display text-lg text-white">Vaulted</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/60 hover:text-white p-1">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 px-6 py-8 space-y-1">
                {[...navItems, { label: "Contact", id: "contact" }].map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-2xl font-display text-white/70 hover:text-white py-4 border-b border-white/[0.06] transition-colors"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
