
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Car, CheckCircle, Send, FileText, Phone, Loader2, RefreshCw, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { submitContactForm } from "@/services/api";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { EUR_TO_RON } from "@/config/api";


const numericField = (errorMessage: string) => z.string().regex(/^\d+$/, errorMessage);

// Schema for "Mașini la Comandă" form
const comandaFormSchema = z.object({
  marcaModel: z.string().min(3, "Marca și modelul sunt obligatorii."),
  bugetMaxim: numericField("Bugetul trebuie să fie un număr."),
  anMinim: z.preprocess((val) => Number(val), z.number().min(2000, "Anul trebuie să fie după 2000").max(new Date().getFullYear() + 1)),
  kmMaximi: numericField("Kilometrajul trebuie să fie un număr."),
  caroserie: z.string().min(3, "Caroseria este obligatorie."),
  combustibil: z.string().min(3, "Tipul de combustibil este obligatoriu."),
  alteDetalii: z.string().optional(),
  nume: z.string().min(2, "Numele este obligatoriu."),
  telefon: z.string().min(10, "Număr de telefon invalid.").regex(/^[0-9+ ]+$/, "Format invalid."),
  email: z.string().email("Email invalid."),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: "Trebuie să fii de acord cu Politica de Confidențialitate.",
  }),
});

type ComandaFormValues = z.infer<typeof comandaFormSchema>;


const buyBackFormSchema = z.object({
  marca: z.string().min(1, "Marca este obligatorie"),
  model: z.string().min(1, "Modelul este obligatoriu"),
  an: z.preprocess((val) => Number(val), z.number().min(1990, "Anul trebuie să fie după 1990").max(new Date().getFullYear(), "Anul nu poate fi în viitor")),
  km: z.string().min(1, "Kilometrajul este obligatoriu").regex(/^\d+$/, "Kilometraj invalid"),
  motorizare: z.string().min(1, "Motorizarea este obligatorie"),
  pretEstimativ: z.string().min(1, "Prețul este obligatoriu").regex(/^\d+$/, "Preț invalid"),
  nume: z.string().min(2, "Numele este obligatoriu"),
  telefon: z.string().min(10, "Telefon invalid").regex(/^[0-9+ ]+$/, "Telefon invalid"),
  email: z.string().email("Email invalid"),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: "Trebuie să fii de acord cu Politica de Confidențialitate.",
  }),
});

type BuyBackFormValues = z.infer<typeof buyBackFormSchema>;

const SpecialServices = () => {
  const [activeTab, setActiveTab] = useState<"comanda" | "buyback">("comanda");
  
  const comandaForm = useForm<ComandaFormValues>({ resolver: zodResolver(comandaFormSchema), defaultValues: { gdprConsent: false } });
  const buyBackForm = useForm<BuyBackFormValues>({ resolver: zodResolver(buyBackFormSchema), defaultValues: { gdprConsent: false } });

  const bugetMaximVal = comandaForm.watch("bugetMaxim");
  const pretEstimativVal = buyBackForm.watch("pretEstimativ");

  const onComandaSubmit = async (values: ComandaFormValues) => {
    const message = `
CERERE MAȘINĂ LA COMANDĂ:

Mașină dorită: ${values.marcaModel}
Buget: ${values.bugetMaxim} EUR (~${(Number(values.bugetMaxim) * EUR_TO_RON).toLocaleString('ro-RO')} LEI)
An minim: ${values.anMinim}
Km maximi: ${values.kmMaximi} km
Caroserie: ${values.caroserie}
Combustibil: ${values.combustibil}
Detalii suplimentare: ${values.alteDetalii || 'Niciunul'}

Date Contact Client:
Nume: ${values.nume}
Telefon: ${values.telefon}
Email: ${values.email}
    `.trim();

    try {
      await submitContactForm({
        name: values.nume,
        email: values.email,
        phone: values.telefon,
        message: message,
        type: 'ORDER',
      });
    } catch (error) {
       console.error("Submission error:", error);
       throw new Error("Submission failed");
    }
  };


  const onBuyBackSubmit = async (values: BuyBackFormValues) => {
    const message = `
CERERE BUY-BACK: ${values.marca} ${values.model}

Detalii Mașină Client:
Marcă: ${values.marca}
Model: ${values.model}
An Fabricație: ${values.an}
Kilometraj: ${values.km} km
Motorizare: ${values.motorizare}
Preț Estimat: ${values.pretEstimativ} EUR (~${(Number(values.pretEstimativ) * EUR_TO_RON).toLocaleString('ro-RO')} LEI)

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
        message: message,
        type: 'BUYBACK',
      });
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
                    Mașini la comandă din Germania, Olanda, Belgia.
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
                    href="tel:0731758666"
                    className="btn-luxury-filled inline-flex items-center gap-2"
                    aria-label="Sună pentru o consultație"
                  >
                    <Phone className="w-4 h-4" />
                    Sună pentru Consultanță
                  </a>
                </div>

                {/* Form */}
                <div className="glass rounded-2xl p-6 relative min-h-[500px]">
                   <AnimatePresence mode="wait">
                    {comandaForm.formState.isSubmitSuccessful ? (
                      <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                        <h3 className="font-display text-2xl text-gold-gradient mb-4">Solicitare Înregistrată!</h3>
                        <p className="text-muted-foreground mb-6">Echipa Stefan Auto GVR va începe căutările și te va contacta în cel mai scurt timp.</p>
                        <button onClick={() => comandaForm.reset()} className="btn-luxury flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Trimite o altă cerere</button>
                      </motion.div>
                    ) : comandaForm.formState.isSubmitted && !comandaForm.formState.isSubmitSuccessful ? (
                      <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                        <h3 className="font-display text-2xl text-destructive mb-4">Eroare la trimitere</h3>
                        <p className="text-muted-foreground mb-6">Vă rugăm să ne contactați direct la <a href="tel:0731758666" className="text-primary hover:underline">0731 758 666</a> pentru comanda dumneavoastră.</p>
                        <button onClick={() => comandaForm.reset(comandaForm.getValues())} className="btn-luxury flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Încearcă din nou</button>
                      </motion.div>
                    ) : (
                      <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <h3 className="font-display text-xl mb-6">Spune-ne ce cauți</h3>
                         <Form {...comandaForm}>
                          <form onSubmit={comandaForm.handleSubmit(onComandaSubmit)} className="space-y-4">
                            <FormField control={comandaForm.control} name="marcaModel" render={({ field }) => (
                                <FormItem><FormLabel>Marcă & Model</FormLabel><FormControl><Input placeholder="Ex: BMW Seria 5" {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                            )} />
                             <div className="grid grid-cols-2 gap-4">
                                <FormField control={comandaForm.control} name="bugetMaxim" render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Buget Maxim (EUR)</FormLabel>
                                      <FormControl>
                                        <Input placeholder="30000" {...field} className="input-luxury" />
                                      </FormControl>
                                      {bugetMaximVal && !isNaN(Number(bugetMaximVal)) && (
                                        <span className="text-xs text-primary/80 mt-1 block">
                                          Echivalent: {(Number(bugetMaximVal) * EUR_TO_RON).toLocaleString('ro-RO')} LEI
                                        </span>
                                      )}
                                      <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={comandaForm.control} name="anMinim" render={({ field }) => (
                                    <FormItem><FormLabel>An Minim</FormLabel><FormControl><Input type="number" placeholder="2020" {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                                )} />
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                               <FormField control={comandaForm.control} name="kmMaximi" render={({ field }) => (
                                    <FormItem><FormLabel>Km Maxim</FormLabel><FormControl><Input placeholder="90000" {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={comandaForm.control} name="combustibil" render={({ field }) => (
                                    <FormItem><FormLabel>Combustibil</FormLabel><FormControl><Input placeholder="Diesel" {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                             <FormField control={comandaForm.control} name="caroserie" render={({ field }) => (
                                <FormItem><FormLabel>Caroserie</FormLabel><FormControl><Input placeholder="Sedan, SUV..." {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                            )}/>
                             <FormField control={comandaForm.control} name="alteDetalii" render={({ field }) => (
                                <FormItem><FormLabel>Alte Detalii</FormLabel><FormControl><Textarea placeholder="Culoare, dotări specifice..." {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <hr className="!my-6 border-border/50"/>
                             <div className="grid grid-cols-2 gap-4">
                                <FormField control={comandaForm.control} name="nume" render={({ field }) => (
                                    <FormItem><FormLabel>Numele tău</FormLabel><FormControl><Input placeholder="Nume Prenume" {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                                )}/>
                                 <FormField control={comandaForm.control} name="telefon" render={({ field }) => (
                                    <FormItem><FormLabel>Telefon</FormLabel><FormControl><Input placeholder="07XX XXX XXX" {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                            <FormField control={comandaForm.control} name="email" render={({ field }) => (
                                <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="contact@exemplu.ro" {...field} className="input-luxury" /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField
                              control={comandaForm.control}
                              name="gdprConsent"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                                  <FormControl>
                                    <Checkbox
                                      id="comanda-gdpr"
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel htmlFor="comanda-gdpr" className="text-sm font-normal text-muted-foreground cursor-pointer">
                                      Sunt de acord cu <a href="/politica-de-confidentialitate" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Politica de Confidențialitate</a>.
                                    </FormLabel>
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              )}
                            />
                            <button type="submit" className="btn-luxury-filled w-full flex items-center justify-center gap-2" disabled={comandaForm.formState.isSubmitting}>
                              {comandaForm.formState.isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Se trimite solicitarea...</> : <><Send className="w-4 h-4" /> Trimite Cererea</>}
                            </button>
                          </form>
                        </Form>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <a
                      href="tel:0731758666"
                      className="btn-luxury-filled flex-1 flex items-center justify-center gap-2 py-3"
                      aria-label="Sună pentru o evaluare buy-back"
                    >
                      <Phone className="w-4 h-4" />
                      Apel Consultanță
                    </a>
                    <a
                      href="https://wa.me/40731758666?text=Bună!%20Sunt%20interesat%20de%20o%20evaluare%20buy-back%20pentru%20mașina%20mea."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white flex-1 flex items-center justify-center gap-2 py-3 rounded-sm font-medium uppercase text-sm transition-colors hover:bg-[#25D366]/90"
                      aria-label="Contactează pe WhatsApp pentru buy-back"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Contact WhatsApp
                    </a>
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
                          Echipa Stefan Auto GVR va analiza datele și te va contacta pentru o ofertă în cel mai scurt timp.
                        </p>
                        <button
                          onClick={() => {buyBackForm.reset(); buyBackForm.clearErrors();}}
                          className="btn-luxury flex items-center justify-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Trimite o altă cerere
                        </button>
                      </motion.div>
                  ) : buyBackForm.formState.isSubmitted && !buyBackForm.formState.isSubmitSuccessful ? (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                      >
                         <h3 className="font-display text-2xl text-destructive mb-4">Eroare la trimitere</h3>
                        <p className="text-muted-foreground mb-6">
                          Te rugăm să ne contactezi direct la <a href="tel:0731758666" className="text-primary hover:underline">0731 758 666</a>.
                        </p>
                         <button
                          onClick={() => buyBackForm.reset(buyBackForm.getValues())}
                          className="btn-luxury flex items-center justify-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Încearcă din nou
                        </button>
                      </motion.div>
                  ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="font-display text-xl mb-6">Detalii Mașină</h2>
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
                            <FormItem>
                              <FormLabel>Preț Estimat (EUR)</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: 15000" {...field} className="input-luxury" />
                              </FormControl>
                              {pretEstimativVal && !isNaN(Number(pretEstimativVal)) && (
                                <span className="text-xs text-primary/80 mt-1 block">
                                  Echivalent: {(Number(pretEstimativVal) * EUR_TO_RON).toLocaleString('ro-RO')} LEI
                                </span>
                              )}
                              <FormMessage />
                            </FormItem>
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
                        <FormField
                          control={buyBackForm.control}
                          name="gdprConsent"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                              <FormControl>
                                <Checkbox
                                  id="buyback-gdpr"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel htmlFor="buyback-gdpr" className="text-sm font-normal text-muted-foreground cursor-pointer">
                                  Sunt de acord cu <a href="/politica-de-confidentialitate" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Politica de Confidențialitate</a>.
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
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
