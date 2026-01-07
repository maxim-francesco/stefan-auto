
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Car, CheckCircle, Send, FileText, Phone, Loader2, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { submitContactForm } from "@/services/api";
import { toast } from "@/components/ui/use-toast";

const buyBackFormSchema = z.object({
  marca: z.string().min(1, "Marca este obligatorie"),
  model: z.string().min(1, "Modelul este obligatoriu"),
  an: z.preprocess((val) => Number(val), z.number().min(1990, "An invalid").max(new Date().getFullYear(), "An invalid")),
  km: z.string().min(1, "Kilometrajul este obligatoriu"),
  motorizare: z.string().min(1, "Motorizarea este obligatorie"),
  pretEstimativ: z.string().min(1, "Prețul este obligatoriu"),
  nume: z.string().min(2, "Numele este obligatoriu"),
  telefon: z.string().min(10, "Telefon invalid"),
  email: z.string().email("Email invalid"),
});

type BuyBackFormValues = z.infer<typeof buyBackFormSchema>;

const SpecialServices = () => {
  const [activeTab, setActiveTab] = useState<"comanda" | "buyback">("comanda");
  
  const buyBackForm = useForm<BuyBackFormValues>({
    resolver: zodResolver(buyBackFormSchema),
    defaultValues: {
      marca: "", model: "", an: undefined, km: "", motorizare: "", pretEstimativ: "",
      nume: "", telefon: "", email: "",
    },
  });

  const onBuyBackSubmit = async (values: BuyBackFormValues) => {
    const subject = `Cerere Buy-Back - ${values.marca} ${values.model}`;
    const message = `
CERERE BUY-BACK: ${values.marca} ${values.model}

Detalii Mașină Client:
Marcă: ${values.marca}
Model: ${values.model}
An Fabricație: ${values.an}
Kilometraj: ${values.km} km
Motorizare: ${values.motorizare}
Preț Estimat: ${values.pretEstimativ} €

Date Contact:
Nume: ${values.nume}
Telefon: ${values.telefon}
Email: ${values.email}
    `.trim();

    try {
      await submitContactForm({
        name: values.nume,
        email: values.email,
        phone: values.telefon,
        message,
      });
      buyBackForm.reset();
      toast({
        title: "Cerere Trimisă!",
        description: "Vă mulțumim! Vă vom contacta în curând pentru o evaluare.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Eroare la trimitere",
        description: "A apărut o problemă. Vă rugăm să încercați din nou.",
      });
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
                <div className="glass rounded-2xl p-6 relative min-h-[500px]">
                  <AnimatePresence mode="wait">
                  {buyBackForm.formState.isSubmitSuccessful ? (
                       <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                      >
                        <h3 className="font-display text-2xl text-gold-gradient mb-4">Cerere Trimisă!</h3>
                        <p className="text-muted-foreground mb-6">
                          Am primit detaliile mașinii tale. Un specialist te va contacta în cel mai scurt timp pentru o evaluare.
                        </p>
                        <button
                          onClick={() => buyBackForm.reset()}
                          className="btn-luxury flex items-center justify-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Trimite o altă cerere
                        </button>
                      </motion.div>
                  ) : (
                  <motion.div key="form">
                    <h3 className="font-display text-xl mb-6">Detalii Mașină</h3>
                    <Form {...buyBackForm}>
                      <form onSubmit={buyBackForm.handleSubmit(onBuyBackSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField control={buyBackForm.control} name="marca" render={({ field }) => (
                            <FormItem><FormLabel>Marcă</FormLabel><FormControl><Input placeholder="Ex: BMW" {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={buyBackForm.control} name="model" render={({ field }) => (
                            <FormItem><FormLabel>Model</FormLabel><FormControl><Input placeholder="Ex: Seria 3" {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                          )} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <FormField control={buyBackForm.control} name="an" render={({ field }) => (
                            <FormItem><FormLabel>An fabricație</FormLabel><FormControl><Input type="number" placeholder="2019" {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={buyBackForm.control} name="km" render={({ field }) => (
                            <FormItem><FormLabel>Kilometraj</FormLabel><FormControl><Input placeholder="Ex: 85.000" {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                          )} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField control={buyBackForm.control} name="motorizare" render={({ field }) => (
                            <FormItem><FormLabel>Motorizare</FormLabel><FormControl><Input placeholder="Ex: 2.0 Diesel" {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={buyBackForm.control} name="pretEstimativ" render={({ field }) => (
                            <FormItem><FormLabel>Preț Estimat (€)</FormLabel><FormControl><Input placeholder="Ex: 15.000" {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                          )} />
                        </div>
                        <hr className="border-border/50 !my-6" />
                        <FormField control={buyBackForm.control} name="nume" render={({ field }) => (
                          <FormItem><FormLabel>Numele tău</FormLabel><FormControl><Input placeholder="Nume Prenume" {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField control={buyBackForm.control} name="telefon" render={({ field }) => (
                            <FormItem><FormLabel>Telefon</FormLabel><FormControl><Input placeholder="07XX XXX XXX" {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={buyBackForm.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="contact@exemplu.ro" {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                          )} />
                        </div>
                        <button type="submit" className="btn-luxury-filled w-full flex items-center justify-center gap-2" disabled={buyBackForm.formState.isSubmitting}>
                           {buyBackForm.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                          Solicită Evaluare Gratuită
                        </button>
                      </form>
                    </Form>
                  </motion.div>
                  )}
                  </AnimatePresence>
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

    