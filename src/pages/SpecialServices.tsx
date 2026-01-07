
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Car, CheckCircle, ArrowRight, Upload, Send, FileText, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SpecialServices = () => {
  const [activeTab, setActiveTab] = useState<"comanda" | "buyback">("comanda");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-primary text-sm tracking-luxury uppercase">
              Servicii Speciale
            </span>
            <h1 className="font-display text-4xl md:text-5xl mt-2 mb-4">
              Soluții <span className="text-gold-gradient">Personalizate</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Indiferent dacă dorești o mașină anume sau vrei să vinzi, suntem aici pentru tine.
            </p>
          </motion.div>

          {/* Tab Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-12"
          >
            <div className="glass inline-flex p-1 rounded-full">
              <button
                onClick={() => setActiveTab("comanda")}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === "comanda"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Search className="w-4 h-4 inline mr-2" />
                Mașini la Comandă
              </button>
              <button
                onClick={() => setActiveTab("buyback")}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === "buyback"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Car className="w-4 h-4 inline mr-2" />
                Buy-Back
              </button>
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {activeTab === "comanda" ? (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Info */}
                <div className="space-y-6">
                  <h2 className="font-display text-3xl">
                    Serviciul <span className="text-gold-gradient">Concierge</span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Nu ai găsit mașina dorită în stocul nostru? Lasă-ne pe noi să o căutăm pentru tine. 
                    Aducem vehiculul visurilor tale direct din Germania, Italia, Austria sau alte țări europene.
                  </p>

                  <div className="space-y-4">
                    {[
                      "Căutare personalizată în toată Europa",
                      "Verificare istorică și tehnică completă",
                      "Transport și import incluse",
                      "Asistență completă la înmatriculare",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground/90">{item}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="tel:+40731758666"
                    className="btn-luxury-filled inline-flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Sună pentru Consultanță
                  </a>
                </div>

                {/* Form */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-display text-xl mb-6">Spune-ne ce cauți</h3>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">Marcă dorită</label>
                      <input
                        type="text"
                        placeholder="Ex: BMW, Mercedes, Audi..."
                        className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">Model</label>
                      <input
                        type="text"
                        placeholder="Ex: Seria 5, C-Class..."
                        className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">An minim</label>
                        <input
                          type="number"
                          placeholder="2018"
                          className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Buget maxim</label>
                        <input
                          type="text"
                          placeholder="30.000 €"
                          className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">Telefon</label>
                      <input
                        type="tel"
                        placeholder="07XX XXX XXX"
                        className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <button type="submit" className="btn-luxury-filled w-full flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Trimite Cererea
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Info */}
                <div className="space-y-6">
                  <h2 className="font-display text-3xl">
                    Vinde-ne <span className="text-gold-gradient">Mașina Ta</span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Ai o mașină pe care vrei să o vinzi? Îți oferim o evaluare gratuită și un preț corect.
                    Procesul este simplu și rapid - primești banii în 24 de ore.
                  </p>

                  <div className="space-y-4">
                    {[
                      { step: "1", text: "Completezi formularul cu detaliile mașinii" },
                      { step: "2", text: "Te contactăm pentru programare" },
                      { step: "3", text: "Inspectăm mașina și îți facem oferta" },
                      { step: "4", text: "Dacă accepți, primești banii imediat" },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {item.step}
                        </div>
                        <span className="text-foreground/90 pt-1">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-display text-xl mb-6">Detalii Mașină</h3>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Marcă</label>
                        <input type="text" placeholder="Ex: BMW" className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Model</label>
                        <input type="text" placeholder="Ex: Seria 3" className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">An fabricație</label>
                        <input type="number" placeholder="2019" className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Kilometraj</label>
                        <input type="text" placeholder="Ex: 85.000" className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
                      </div>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Motorizare</label>
                        <input type="text" placeholder="Ex: 2.0 Diesel" className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Preț Estimativ</label>
                        <input type="text" placeholder="Ex: 15.000 €" className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
                      </div>
                    </div>
                    <hr className="border-border/50 my-4" />
                     <div>
                        <label className="text-sm text-muted-foreground block mb-2">Nume</label>
                        <input type="text" placeholder="Numele tău" className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
                      </div>
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">Telefon</label>
                      <input type="tel" placeholder="07XX XXX XXX" className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">Email</label>
                      <input type="email" placeholder="contact@exemplu.ro" className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
                    </div>
                    <button type="submit" className="btn-luxury-filled w-full flex items-center justify-center gap-2">
                      <FileText className="w-4 h-4" />
                      Solicită Evaluare Gratuită
                    </button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SpecialServices;

    