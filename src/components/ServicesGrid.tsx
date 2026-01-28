import { motion } from "framer-motion";
import { Truck, CreditCard, FileCheck, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: boolean;
  gridClass: string;
}

const services: Service[] = [
  {
    icon: CreditCard,
    title: "Finanțare Avantajoasă",
    description: "Rate flexibile prin partenerii noștri bancari. Aprobare rapidă.",
    accent: true,
    gridClass: "md:col-span-2",
  },
  {
    icon: Truck,
    title: "Livrare în Toată Țara",
    description: "Livrăm mașina direct la tine, oriunde în România.",
    gridClass: "",
  },
  {
    icon: FileCheck,
    title: "Numere Roșii",
    description: "Asistență completă pentru înmatriculare temporară.",
    gridClass: "",
  },
  {
    icon: ShieldCheck,
    title: "Garanție Inclusă",
    description: "Fiecare vehicul vine cu garanție pentru liniștea ta.",
    gridClass: "",
  },
  {
    icon: Sparkles,
    title: "Mașini la Comandă",
    description: "Găsim mașina perfectă pentru tine, din orice țară.",
    gridClass: "",
  },
  {
    icon: Clock,
    title: "Buy-Back Rapid",
    description: "Îți cumpărăm mașina veche la cel mai bun preț.",
    accent: true,
    gridClass: "md:col-span-2",
  },
];

const ServicesGrid = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(220_30%_8%/0.8)_0%,transparent_60%)]" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-primary text-sm tracking-luxury uppercase"
          >
            De Ce Noi
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-display text-3xl md:text-4xl mt-3 mb-4"
          >
            Servicii de <span className="text-gold-gradient">Elită</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="divider-gold mt-6"
          />
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`glass rounded-xl p-6 md:p-8 group hover:border-primary/20 transition-all duration-500 ${service.gridClass}`}
              style={{ borderColor: 'hsl(42 45% 55% / 0.08)' }}
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-all duration-300 ${
                  service.accent
                    ? "bg-gradient-to-br from-primary to-gold-dark text-primary-foreground"
                    : "bg-navy-lighter text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-gold"
                }`}
              >
                <service.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
