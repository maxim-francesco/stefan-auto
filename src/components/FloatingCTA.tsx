import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

const FloatingCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 lg:hidden"
    >
      <a
        href="tel:0731758666"
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-gold active:scale-95 transition-transform"
        aria-label="Sună acum"
      >
        <Phone className="w-6 h-6" />
      </a>
      <a
        href="https://wa.me/40731758666"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </motion.div>
  );
};

export default FloatingCTA;
