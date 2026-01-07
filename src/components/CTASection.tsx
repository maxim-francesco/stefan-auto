import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-navy to-navy-light" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(42_45%_55%/0.08)_0%,transparent_70%)]" />
      
      {/* Gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl mb-6"
          >
            Găsește Mașina <span className="text-gold-gradient">Perfectă</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto"
          >
            Echipa noastră este pregătită să te ajute să găsești autoturismul ideal.
            Contactează-ne acum pentru o consultanță gratuită.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="tel:+40731758666"
              className="btn-luxury-filled flex items-center justify-center gap-3 py-4 px-8 rounded-sm touch-feedback"
              aria-label="Sună acum la Stefan Auto GVR"
            >
              <Phone className="w-5 h-5" strokeWidth={1.5} />
              Sună Acum: +40 731 758 666
            </a>
            <a
              href="https://wa.me/40731758666"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury flex items-center justify-center gap-3 py-4 px-8 rounded-sm touch-feedback"
              aria-label="Contactează Stefan Auto GVR pe WhatsApp"
            >
              <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
              Scrie pe WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
