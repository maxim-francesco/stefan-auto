
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import logo from "@/assets/Stefan.png";

const navLinks = [
  { name: "Acasă", path: "/" },
  { name: "Stoc Auto", path: "/stoc" },
  { name: "Finanțare", path: "/finantare" },
  { name: "Servicii", path: "/servicii" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-strong py-3 shadow-dark"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 touch-feedback">
            <img
              src={logo}
              alt="Stefan Auto GVR Logo"
              className="h-24 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm tracking-widest uppercase transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1.5 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+40731758666"
              className="flex items-center gap-2 text-primary hover:text-gold-light transition-colors"
              aria-label="Sună acum la Stefan Auto GVR"
            >
              <Phone className="w-4 h-4 icon-gold" strokeWidth={1.5} />
              <span className="text-sm tracking-wide">+40 731 758 666</span>
            </a>
            <a
              href="https://wa.me/40731758666"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white text-xs py-2.5 px-5 flex items-center gap-2 rounded-sm hover:bg-[#25D366]/90 transition-colors"
              aria-label="Contactează Stefan Auto GVR pe WhatsApp"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-foreground touch-feedback"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu - iOS/Android Native Feel */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-md lg:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-4 top-20 z-50 glass-strong rounded-2xl lg:hidden overflow-hidden"
            >
              <div className="p-6 flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`block py-3 px-4 rounded-lg text-lg font-display tracking-wide transition-all touch-feedback ${
                        location.pathname === link.path
                          ? "text-primary bg-primary/10"
                          : "text-foreground/80 hover:bg-muted/50"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-3"
                >
                  <a
                    href="tel:+40731758666"
                    className="flex items-center gap-3 text-primary text-lg py-3 px-4 rounded-lg bg-primary/5 touch-feedback"
                    aria-label="Sună acum la Stefan Auto GVR"
                  >
                    <Phone className="w-5 h-5" strokeWidth={1.5} />
                    +40 731 758 666
                  </a>
                  <a
                    href="https://wa.me/40731758666"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white text-center py-4 rounded-lg touch-feedback hover:bg-[#25D366]/90 transition-colors"
                    aria-label="Contactează Stefan Auto GVR pe WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5 inline mr-2" strokeWidth={1.5} />
                    Scrie-ne pe WhatsApp
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
