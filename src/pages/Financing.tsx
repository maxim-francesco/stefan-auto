
import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Shield, Clock, CheckCircle, Building2, Phone, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const partners = [
  { name: "TBI Bank", logo: "TBI" },
  { name: "Mogo", logo: "MOGO" },
  { name: "Ontopay", logo: "ONTOPAY" },
  { name: "BT", logo: "BT" },
];

const benefits = [
  {
    icon: Clock,
    title: "Aprobare Rapidă",
    description: "Aprobare rapidă în 30 de minute.",
  },
  {
    icon: CheckCircle,
    title: "Avans Zero",
    description: "Posibilitate de finanțare cu avans zero.",
  },
  {
    icon: Shield,
    title: "Garanție Inclusă",
    description: "Fiecare vehicul finanțat vine cu garanție.",
  },
];

const Financing = () => {
  const [carPrice, setCarPrice] = useState(25000);
  const [downPayment, setDownPayment] = useState(5000);
  const [months, setMonths] = useState(60);
  const interestRate = 7.99;

  const loanAmount = carPrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-luxury uppercase">
              Finanțare Auto
            </span>
            <h1 className="font-display text-4xl md:text-5xl mt-2 mb-4">
              Rate <span className="text-gold-gradient">Avantajoase</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Oferim soluții de finanțare flexibile prin partenerii noștri de încredere.
              Calculează rata lunară și găsește opțiunea perfectă pentru tine.
            </p>
          </motion.div>

          {/* Calculator Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="glass rounded-2xl p-6 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="font-display text-2xl">Calculator de Credit</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-6">
                  {/* Car Price */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-muted-foreground">Prețul Mașinii</label>
                      <span className="text-primary font-medium">{carPrice.toLocaleString()} LEI</span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="100000"
                      step="1000"
                      value={carPrice}
                      onChange={(e) => setCarPrice(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>5.000 LEI</span>
                      <span>100.000 LEI</span>
                    </div>
                  </div>

                  {/* Down Payment */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-muted-foreground">Avans</label>
                      <span className="text-primary font-medium">{downPayment.toLocaleString()} LEI</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={carPrice * 0.5}
                      step="500"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0 LEI</span>
                      <span>{(carPrice * 0.5).toLocaleString()} LEI</span>
                    </div>
                  </div>

                  {/* Period */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-muted-foreground">Perioada</label>
                      <span className="text-primary font-medium">{months} luni</span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="60"
                      step="12"
                      value={months}
                      onChange={(e) => setMonths(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>12 luni</span>
                      <span>60 luni</span>
                    </div>
                  </div>
                </div>

                {/* Result */}
                <div className="flex flex-col justify-center items-center bg-navy-lighter rounded-xl p-8">
                  <p className="text-muted-foreground text-sm mb-2">Rata Lunară Estimată</p>
                  <p className="font-display text-5xl text-gold-gradient mb-4">
                    {isNaN(monthlyPayment) ? "0" : Math.round(monthlyPayment).toLocaleString()} LEI
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
                     <a
                      href="tel:0731758666"
                      className="btn-luxury-filled flex-1 flex items-center justify-center gap-2 py-3"
                      aria-label="Sună acum pentru finanțare"
                    >
                      <Phone className="w-4 h-4" />
                      Sună Acum
                    </a>
                    <a
                      href="https://wa.me/40731758666?text=Bună!%20Sunt%20interesat%20de%20o%20ofertă%20de%20finanțare."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white flex-1 flex items-center justify-center gap-2 py-3 rounded-sm font-medium uppercase text-sm transition-colors hover:bg-[#25D366]/90"
                      aria-label="Contactează pe WhatsApp pentru finanțare"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    *Dobândă indicativă de {interestRate}% p.a. Calculul este orientativ.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mb-20"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Partners */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-2 mb-8">
              <Building2 className="w-5 h-5 text-primary" />
              <h2 className="text-muted-foreground text-sm">Partenerii Noștri de Finanțare</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="glass px-8 py-4 rounded-lg"
                >
                  <span className="font-display text-lg tracking-wide text-muted-foreground">
                    {partner.logo}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Warranty Note */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center glass rounded-2xl p-8"
          >
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-display text-2xl mb-3">
              Garanție <span className="text-gold-gradient">Inclusă</span>
            </h2>
            <p className="text-muted-foreground">
              Toate autoturismele achiziționate prin finanțare beneficiază de garanție inclusă, 
              oferindu-ți liniște și încredere în investiția ta.
            </p>
          </motion.div>
        </div>

        <div className="mt-20">
          <CTASection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Financing;
