
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Shield, Clock, CheckCircle, Building2, Phone, MessageCircle, Send, Loader2, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { EUR_TO_RON } from "@/config/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { submitContactForm } from "@/services/api";

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

const financingFormSchema = z.object({
  nume: z.string().min(2, { message: "Numele este obligatoriu." }),
  telefon: z.string().min(10, { message: "Numărul de telefon este invalid." }).regex(/^[0-9+ ]+$/, { message: "Numărul de telefon este invalid." }),
  email: z.string().email({ message: "Adresa de email este invalidă." }),
  mesaj: z.string().optional(),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: "Trebuie să fii de acord cu Politica de Confidențialitate.",
  }),
});

type FinancingFormValues = z.infer<typeof financingFormSchema>;

const Financing = () => {
  const [carPrice, setCarPrice] = useState(25000);
  const [downPayment, setDownPayment] = useState(5000);
  const [months, setMonths] = useState(60);
  const interestRate = 7.99;

  const loanAmount = carPrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  const form = useForm<FinancingFormValues>({
    resolver: zodResolver(financingFormSchema),
    defaultValues: {
      nume: "",
      telefon: "",
      email: "",
      mesaj: "",
      gdprConsent: false,
    },
  });

  const onSubmit = async (values: FinancingFormValues) => {
    try {
      const calculatedEUR = isNaN(monthlyPayment) ? 0 : Math.round(monthlyPayment);
      const calculatedRON = isNaN(monthlyPayment) ? 0 : Math.round(monthlyPayment * EUR_TO_RON);

      const composedMessage = `SOLICITARE FINANȚARE AUTO:

Preț Mașină: ${carPrice.toLocaleString()} EUR (${(carPrice * EUR_TO_RON).toLocaleString()} LEI)
Avans: ${downPayment.toLocaleString()} EUR (${(downPayment * EUR_TO_RON).toLocaleString()} LEI)
Perioadă: ${months} luni
Rată Lunară Estimată: ${calculatedEUR.toLocaleString()} EUR (${calculatedRON.toLocaleString()} LEI)

${values.mesaj ? `Mesaj client: ${values.mesaj}` : ""}`.trim();

      const payload = {
        type: "FINANCING",
        name: values.nume,
        email: values.email,
        phone: values.telefon,
        message: composedMessage,
      };

      console.log("Submitting financing lead payload:", payload);

      await submitContactForm(payload);
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
      throw new Error("Submission failed");
    }
  };

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

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Inputs */}
                <div className="space-y-6">
                  {/* Car Price */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-muted-foreground">Prețul Mașinii</label>
                      <span className="text-primary font-medium">{carPrice.toLocaleString()} EUR / {(carPrice * EUR_TO_RON).toLocaleString()} LEI</span>
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
                      <span>5.000 EUR / 25.000 LEI</span>
                      <span>100.000 EUR / 500.000 LEI</span>
                    </div>
                  </div>

                  {/* Down Payment */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-muted-foreground">Avans</label>
                      <span className="text-primary font-medium">{downPayment.toLocaleString()} EUR / {(downPayment * EUR_TO_RON).toLocaleString()} LEI</span>
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
                      <span>0 EUR / 0 LEI</span>
                      <span>{(carPrice * 0.5).toLocaleString()} EUR / {(carPrice * 0.5 * EUR_TO_RON).toLocaleString()} LEI</span>
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
                  <p className="font-display text-5xl text-gold-gradient mb-1">
                    {isNaN(monthlyPayment) ? "0" : Math.round(monthlyPayment).toLocaleString()} EUR
                  </p>
                  <p className="text-lg text-muted-foreground mb-4">
                    ~ {isNaN(monthlyPayment) ? "0" : Math.round(monthlyPayment * EUR_TO_RON).toLocaleString()} LEI / lună
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

              {/* Lead Form Section BELOW Calculator Result */}
              <div className="border-t border-border pt-8 mt-6">
                <div className="max-w-2xl mx-auto relative min-h-[400px]">
                  <AnimatePresence mode="wait">
                    {form.formState.isSubmitSuccessful ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center justify-center text-center p-8"
                      >
                        <h3 className="font-display text-2xl text-gold-gradient mb-4">Mulțumim!</h3>
                        <p className="text-muted-foreground mb-6">
                          Solicitarea ta de finanțare a fost trimisă cu succes. Te vom contacta în cel mai scurt timp.
                        </p>
                        <button
                          onClick={() => form.reset()}
                          className="btn-luxury flex items-center justify-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Trimite o altă solicitare
                        </button>
                      </motion.div>
                    ) : form.formState.isSubmitted && !form.formState.isSubmitSuccessful ? (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center justify-center text-center p-8"
                      >
                        <h3 className="font-display text-2xl text-destructive mb-4">A apărut o eroare</h3>
                        <p className="text-muted-foreground mb-6">
                          Vă rugăm să ne contactați telefonic la <a href="tel:0731758666" className="text-primary hover:underline">0731 758 666</a>.
                        </p>
                        <button
                          onClick={() => form.reset(form.getValues())}
                          className="btn-luxury flex items-center justify-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Încearcă din nou
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full"
                      >
                        <h3 className="font-display text-2xl mb-2 text-center">Solicită Ofertă de Finanțare</h3>
                        <p className="text-muted-foreground text-sm text-center mb-6">
                          Completează datele tale mai jos pentru a primi o ofertă personalizată pe baza calculului efectuat.
                        </p>

                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="nume"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Nume</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Numele tău" {...field} className="input-luxury" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="telefon"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Telefon</FormLabel>
                                    <FormControl>
                                      <Input placeholder="07XX XXX XXX" {...field} className="input-luxury" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder="contact@exemplu.ro" {...field} className="input-luxury" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="mesaj"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Mesaj (opțional)</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="Alte detalii sau preferințe..." {...field} className="input-luxury" rows={3} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="gdprConsent"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                                  <FormControl>
                                    <Checkbox
                                      id="financing-gdpr"
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel htmlFor="financing-gdpr" className="text-sm font-normal text-muted-foreground cursor-pointer">
                                      Sunt de acord cu <a href="/politica-de-confidentialitate" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Politica de Confidențialitate</a>.
                                    </FormLabel>
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              )}
                            />
                            <button type="submit" className="btn-luxury-filled w-full flex items-center justify-center gap-2 py-4" disabled={form.formState.isSubmitting}>
                              {form.formState.isSubmitting ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Se trimite...
                                </>
                              ) : (
                                <>
                                  <Send className="w-4 h-4" />
                                  Trimite Solicitarea
                                </>
                              )}
                            </button>
                          </form>
                        </Form>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

