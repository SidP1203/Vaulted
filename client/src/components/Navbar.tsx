import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { 
    label: "Services", 
    id: "services",
    submenu: [
      { label: "Web Design", desc: "Custom websites built from scratch" },
      { label: "Development", desc: "Clean, hand-written code" },
      { label: "SEO", desc: "Search engine optimization" },
    ]
  },
  { label: "Work", id: "work" },
  { label: "Pricing", id: "pricing" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-white/98 backdrop-blur-md shadow-sm" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-display text-2xl tracking-tight relative group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-logo"
            >
              Vaunt
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-foreground group-hover:w-full transition-all duration-300" />
            </motion.button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div 
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => item.submenu && setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-1 px-5 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group"
                    data-testid={`nav-${item.id}`}
                  >
                    {item.label}
                    {item.submenu && <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />}
                    <span className="absolute bottom-0 left-5 right-5 h-[2px] bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.submenu && activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 pt-2"
                      >
                        <div className="bg-white border border-border shadow-xl min-w-[280px] p-2">
                          {item.submenu.map((sub, idx) => (
                            <motion.button
                              key={idx}
                              onClick={() => scrollToSection(item.id)}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="w-full text-left px-4 py-3 hover:bg-muted transition-colors group"
                            >
                              <p className="font-medium text-sm group-hover:translate-x-1 transition-transform">{sub.label}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{sub.desc}</p>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button 
              onClick={() => scrollToSection("contact")}
              className="hidden lg:block px-6 py-2.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="nav-contact"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>

            {/* Mobile Toggle */}
            <motion.button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/20" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl"
            >
              <div className="p-6 pt-24">
                {[...navItems, { label: "Contact", id: "contact" }].map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-2xl font-display py-4 border-b border-border hover:pl-2 transition-all"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
