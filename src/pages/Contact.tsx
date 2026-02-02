
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, MapPin, Clock, Send, Loader2, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/services/api";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Numele este obligatoriu." }),
  phone: z.string().min(10, { message: "Numărul de telefon este invalid." }),
  email: z.string().email({ message: "Adresa de email este invalidă." }),
  message: z.string().min(10, { message: "Mesajul trebuie să conțină cel puțin 10 caractere." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await submitContactForm(values);
      form.reset();
    } catch (error) {
       console.error("Submission error:", error);
       // The error state is handled by the form's submission status
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
                    aria-label="Sună acum la Stefan Auto GVR"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Phone className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telefon</p>
                      <p className="text-xl font-medium text-primary">0731 758 666</p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/40731758666"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass rounded-xl p-6 flex items-center gap-5 group hover:border-primary/30 transition-all duration-300"
                    aria-label="Contactează Stefan Auto GVR pe WhatsApp"
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
                      <p className="text-sm text-muted-foreground">Adresă</p>
                      <p className="text-lg font-medium">Str. Dr. între Tarlale 21, 077106 Cățelu</p>
                      <p className="text-sm text-primary/80">Parc auto rulate Cățelu, Ilfov</p>
                    </div>
                  </div>

                </div>

                {/* Map */}
                <div className="rounded-xl overflow-hidden h-64 border border-border">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d712.5876788321549!2d26.213135828584548!3d44.40544849818474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1fc689e1beb13%3A0x7dd894a8b3898792!2sStr.%20Dr.%20%C3%AEntre%20Tarlale%2021%2C%20077106%20C%C4%83%C8%9Belu!5e0!3m2!1sen!2sro!4v1769992660274!5m2!1sen!2sro" width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="glass rounded-2xl p-8 relative min-h-[500px]">
                  <AnimatePresence mode="wait">
                    {form.formState.isSubmitSuccessful ? (
                       <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                      >
                        <h3 className="font-display text-2xl text-gold-gradient mb-4">Mulțumim!</h3>
                        <p className="text-muted-foreground mb-6">
                          Mesajul tău a fost trimis către echipa Stefan Auto GVR. Te vom contacta în cel mai scurt timp.
                        </p>
                        <button
                          onClick={() => form.reset()}
                          className="btn-luxury flex items-center justify-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Trimite un alt mesaj
                        </button>
                      </motion.div>
                    ) : form.formState.isSubmitted && !form.formState.isSubmitSuccessful ? (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
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
                        <h2 className="font-display text-2xl mb-6">Trimite-ne un Mesaj</h2>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="name"
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
                                name="phone"
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
                                name="message"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Mesaj</FormLabel>
                                    <FormControl>
                                      <Textarea placeholder="Scrie mesajul tău aici..." {...field} className="input-luxury" rows={4} />
                                    </FormControl>
                                    <FormMessage />
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
                                  Trimite Mesajul
                                </>
                              )}
                            </button>
                          </form>
                        </Form>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
