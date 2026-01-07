
import { motion } from "framer-motion";
import { ChevronDown, Shield, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={heroBg}
          alt="Showroom Auto Premium Stefan Auto GVR"
          className="w-full h-full object-cover"
        />
        {/* Multi-layer gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/50 to-navy" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-transparent to-navy/40" />
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(220_40%_3%/0.4)_100%)]" />
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[80px] animate-float" style={{ animationDelay: "-3s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block text-primary text-sm tracking-luxury uppercase border border-primary/20 px-5 py-2.5 rounded-full backdrop-blur-sm bg-navy/20">
              Autoturisme Rulate Premium
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-medium mb-6 leading-tight"
          >
            <span className="text-foreground">Stefan Auto GVR -</span>
            <br />
            <span className="text-gold-gradient text-shadow-luxury">Autoturisme Rulate Selecționate</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-foreground/70 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Stefan Auto GVR SRL din Dobroești oferă o selecție premium de mașini second hand, fiecare vehicul fiind selectat cu grijă și oferit cu garanție inclusă și posibilitate de finanțare tbi bank sau BT.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/stoc" className="btn-luxury-filled py-4 px-10 rounded-sm">
              Vezi Stocul
            </Link>
            <Link to="/contact" className="btn-luxury py-4 px-10 rounded-sm">
              Contactează-ne
            </Link>
          </motion.div>

          {/* Trust Badges with stagger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {[
              { icon: Shield, label: "Garanție Premium Inclusă", sublabel: "Pe fiecare vehicul" },
              { icon: Award, label: "Calitate Premium", sublabel: "Verificare completă" },
              { icon: Clock, label: "Livrare Rapidă", sublabel: "În toată țara" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                className="flex items-center justify-center gap-3 px-5 py-4 glass rounded-lg border border-primary/10 hover:border-primary/25 transition-all duration-300"
              >
                <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                <div className="text-left">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sublabel}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-primary/50" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
