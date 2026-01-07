import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Clock, Mail, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
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
              Contact
            </span>
            <h1 className="font-display text-4xl md:text-5xl mt-2 mb-4">
              Suntem Aici <span className="text-gold-gradient">Pentru Tine</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ai întrebări sau dorești să programezi o vizită? Nu ezita să ne contactezi.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <h2 className="font-display text-2xl">Informații de Contact</h2>

                {/* Contact Cards */}
                <div className="space-y-4">
                  {/* Phone */}
                  <a
                    href="tel:0731758666"
                    className="glass rounded-xl p-6 flex items-center gap-5 group hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Phone className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telefon</p>
                      <p className="text-xl font-display text-gold-gradient">0731 758 666</p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/40731758666"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass rounded-xl p-6 flex items-center gap-5 group hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <MessageCircle className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">WhatsApp</p>
                      <p className="text-lg font-medium">Scrie-ne acum</p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="glass rounded-xl p-6 flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Locație</p>
                      <p className="text-lg font-medium">Galați, România</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="glass rounded-xl p-6 flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Program</p>
                      <p className="text-lg font-medium">Luni - Sâmbătă: 09:00 - 19:00</p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-xl overflow-hidden h-64 border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87456.71394445746!2d27.972946!3d45.436988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b6de58b96b90d1%3A0xc4bb0b6d9f16b8c5!2sGala%C8%9Bi!5e0!3m2!1sen!2sro!4v1704540000000!5m2!1sen!2sro"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Stefan Auto GVR Location"
                  />
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="glass rounded-2xl p-8">
                  <h2 className="font-display text-2xl mb-6">Trimite-ne un Mesaj</h2>
                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Nume</label>
                        <input
                          type="text"
                          placeholder="Numele tău"
                          className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Telefon</label>
                        <input
                          type="tel"
                          placeholder="07XX XXX XXX"
                          className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="email@exemplu.ro"
                        className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">Subiect</label>
                      <select className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer">
                        <option>Selectează subiectul</option>
                        <option>Întrebare despre un vehicul</option>
                        <option>Finanțare</option>
                        <option>Mașini la comandă</option>
                        <option>Buy-back</option>
                        <option>Altele</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">Mesaj</label>
                      <textarea
                        rows={5}
                        placeholder="Scrie mesajul tău aici..."
                        className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      />
                    </div>
                    <button type="submit" className="btn-luxury-filled w-full flex items-center justify-center gap-2 py-4">
                      <Send className="w-4 h-4" />
                      Trimite Mesajul
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
