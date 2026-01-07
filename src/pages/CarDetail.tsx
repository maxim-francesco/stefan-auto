import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Loader2,
  AlertTriangle,
  ChevronLeft,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Phone,
  MessageCircle,
  Send,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchPublicListingById, submitContactForm, ApiCar } from "@/services/api";
import StaggerContainer, { staggerItem } from "@/components/StaggerContainer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const getAttribute = (car: ApiCar, attributeName: string): string | number | boolean | null => {
  const attr = car.attributeValues.find(
    (a) => a.attribute.name.toLowerCase() === attributeName.toLowerCase()
  );
  if (!attr) return null;
  return attr.stringValue ?? attr.numberValue ?? attr.booleanValue;
};

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Numele este obligatoriu." }),
  phone: z.string().min(10, { message: "Numărul de telefon este invalid." }),
  email: z.string().email({ message: "Adresa de email este invalidă." }),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: car, isLoading, isError } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => fetchPublicListingById(id!),
    enabled: !!id,
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", phone: "", email: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    if (!id || !car) return;

    const message = `
      Nume: ${values.name}
      Telefon: ${values.phone}
      Email: ${values.email}
      ---
      Subiect: Interes pentru ${car.title} (ID: ${id})
      ---
      Mesaj: ${values.message || "Solicit mai multe detalii despre acest vehicul."}
    `;

    try {
      await submitContactForm({
        ...values,
        message,
      });
      toast({
        title: "Mesaj Trimis!",
        description: "Un consultant vă va contacta în cel mai scurt timp.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "A apărut o problemă. Vă rugăm să încercați din nou.",
      });
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (isError || !car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-center px-4">
        <div>
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="font-display text-2xl text-destructive-foreground mb-2">Autoturism Indisponibil</h2>
          <p className="text-muted-foreground mb-6">
            Ne pare rău, acest anunț nu a fost găsit sau nu mai este disponibil.
          </p>
          <Link to="/stoc" className="btn-luxury-filled">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Înapoi la Stoc
          </Link>
        </div>
      </div>
    );
  }

  const mainImage = car.images?.[0]?.url || "https://placehold.co/1200x800?text=Imagine+Indisponibilă";

  const carDetails = {
    year: getAttribute(car, 'an'),
    mileage: getAttribute(car, 'kilometraj'),
    fuel: getAttribute(car, 'combustibil'),
    transmission: getAttribute(car, 'cutie de viteze'),
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-40 md:pb-20">
        <div className="container mx-auto px-4">
          <StaggerContainer>
            {/* Back button */}
            <motion.div variants={staggerItem}>
              <Link
                to="/stoc"
                className="inline-flex items-center gap-2 text-primary hover:text-gold-light transition-colors mb-6 group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Înapoi la stoc</span>
              </Link>
            </motion.div>

            {/* Title */}
            <motion.h1 variants={staggerItem} className="font-display text-4xl md:text-5xl mt-2 mb-4">
              {car.title}
            </motion.h1>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mt-8">
              {/* Left Column - Gallery & Description */}
              <motion.div variants={staggerItem} className="lg:col-span-2 space-y-12">
                {/* Main Image */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden glass">
                  <img src={mainImage} alt={car.title} className="w-full h-full object-cover" />
                </div>
                
                {/* Description */}
                <div>
                  <h2 className="font-display text-2xl mb-4 text-gold-gradient">Descriere</h2>
                  <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                    <p>{car.description}</p>
                  </div>
                </div>

                {/* Contact Form */}
                <motion.div variants={staggerItem} className="glass rounded-2xl p-6 md:p-8">
                  <h2 className="font-display text-2xl mb-6">Contactează-ne pentru acest vehicul</h2>
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
                                <Input placeholder="email@exemplu.com" {...field} className="input-luxury" />
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
                              <FormLabel>Mesaj (opțional)</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Aș dori mai multe detalii despre..." {...field} className="input-luxury" rows={4} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      <button type="submit" className="btn-luxury-filled w-full flex items-center justify-center gap-2 py-4" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
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
              </motion.div>

              {/* Right Column - Details & CTA */}
              <motion.div variants={staggerItem} className="lg:col-span-1">
                <div className="sticky top-24 glass rounded-2xl p-6">
                  <h2 className="font-display text-2xl mb-4">Detalii Vehicul</h2>
                  
                  {car.price ? (
                    <p className="font-display text-4xl text-gold-gradient mb-6">
                      {car.price.toLocaleString('ro-RO', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}
                    </p>
                  ) : (
                    <p className="bg-primary/10 text-primary px-4 py-2 rounded-lg mb-6">
                      Preț la cerere
                    </p>
                  )}

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary/70" />
                      <div>
                        <p className="text-xs text-muted-foreground">An</p>
                        <p className="text-sm font-medium">{carDetails.year || 'N/A'}</p>
                      </div>
                    </div>
                     <div className="flex items-center gap-3">
                      <Gauge className="w-5 h-5 text-primary/70" />
                      <div>
                        <p className="text-xs text-muted-foreground">Kilometraj</p>
                        <p className="text-sm font-medium">{carDetails.mileage ? `${Number(carDetails.mileage).toLocaleString()} km` : 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Fuel className="w-5 h-5 text-primary/70" />
                      <div>
                        <p className="text-xs text-muted-foreground">Combustibil</p>
                        <p className="text-sm font-medium">{carDetails.fuel || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Settings2 className="w-5 h-5 text-primary/70" />
                      <div>
                        <p className="text-xs text-muted-foreground">Transmisie</p>
                        <p className="text-sm font-medium">{carDetails.transmission || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6 flex-col gap-3 hidden lg:flex">
                     <a
                        href="tel:0731758666"
                        className="btn-luxury-filled w-full flex items-center justify-center gap-2 py-3"
                      >
                        <Phone className="w-4 h-4" />
                        Sună Acum
                      </a>
                      <a
                        href="https://wa.me/40731758666"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-luxury w-full flex items-center justify-center gap-2 py-3"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Contactează pe WhatsApp
                      </a>
                  </div>

                </div>
              </motion.div>
            </div>
          </StaggerContainer>
        </div>
      </main>

       {/* Mobile Sticky Bar */}
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
        className="fixed bottom-0 left-0 right-0 glass-strong p-3 flex gap-3 lg:hidden z-40"
      >
        <a href="tel:0731758666" className="btn-luxury flex-1 flex items-center justify-center py-3">
          <Phone className="w-4 h-4 mr-2" />
          Sună Acum
        </a>
         <a href="https://wa.me/40731758666" target="_blank" rel="noopener noreferrer" className="btn-luxury-filled flex-1 flex items-center justify-center py-3">
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp
        </a>
      </motion.div>

      <Footer />
    </div>
  );
};

export default CarDetail;
