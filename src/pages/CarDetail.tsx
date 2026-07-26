
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
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
  Calculator,
  Building2,
  ChevronRight,
  X,
  CheckCircle,
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
import { useState, useRef, useEffect, useMemo } from "react";
import { Slider } from "@/components/ui/slider";

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

const partners = [
  "tbi bank",
  "Mogo",
  "Ontopay",
  "BT",
];

const FinancingCalculator = ({ price, carTitle }: { price: number, carTitle: string }) => {
  const [downPayment, setDownPayment] = useState(Math.round(price * 0.15));
  const [term, setTerm] = useState(60);
  const interestRate = 7.99 / 100; // 7.99% annual interest rate

  const loanAmount = price - downPayment;
  const monthlyInterestRate = interestRate / 12;
  const numberOfPayments = term;

  const monthlyPayment =
    loanAmount > 0
      ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
      : 0;

  return (
    <div className="glass rounded-2xl p-6 md:p-8 mt-8 border border-primary/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
            <Calculator className="w-6 h-6 text-primary-foreground" />
        </div>
        <h2 className="font-display text-2xl">Calculator Finanțare</h2>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-end mb-2">
            <label className="text-sm font-medium text-muted-foreground">Avans</label>
            <span className="text-primary font-medium">{downPayment.toLocaleString('ro-RO')} €</span>
          </div>
          <Slider
            min={0}
            max={price * 0.5}
            step={500}
            value={[downPayment]}
            onValueChange={(value) => setDownPayment(value[0])}
          />
        </div>
        <div>
          <div className="flex justify-between items-end mb-2">
            <label className="text-sm font-medium text-muted-foreground">Perioadă</label>
            <span className="text-primary font-medium">{term} luni</span>
          </div>
          <Slider
            min={12}
            max={60}
            step={12}
            value={[term]}
            onValueChange={(value) => setTerm(value[0])}
          />
        </div>
        <div className="text-center bg-navy-lighter rounded-xl p-6 mt-4">
            <p className="text-muted-foreground text-sm mb-2">Rată lunară estimativă</p>
            <p className="font-display text-4xl text-gold-gradient">
                {Math.round(monthlyPayment).toLocaleString('ro-RO')} € / lună
            </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full">
            <a href="tel:0731758666" className="btn-luxury-filled flex-1 flex items-center justify-center gap-2 py-3">
                <Phone className="w-4 h-4" />
                Sună Acum
            </a>
            <a
            href={`https://wa.me/40731758666?text=Bună!%20Sunt%20interesat%20de%20o%20ofertă%20de%20finanțare%20pentru%20${encodeURIComponent(carTitle)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white flex-1 flex items-center justify-center gap-2 py-3 rounded-sm font-medium uppercase text-sm transition-colors hover:bg-[#25D366]/90"
            >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
            </a>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">*Calcul orientativ. Dobândă de la 7.99%.</p>


        <div className="text-center pt-4 border-t border-border/50">
            <div className="flex items-center justify-center gap-2 mb-4">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-xs">Parteneri de încredere</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                {partners.map(p => (
                    <span key={p} className="text-xs text-muted-foreground/80">{p}</span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};


const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const contactFormRef = useRef<HTMLDivElement>(null);

  const [imageIndex, setImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);


  const { data: car, isLoading, isError } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => fetchPublicListingById(id!),
    enabled: !!id,
    onSuccess: () => setImageIndex(0)
  });

  const carDetailsMemo = useMemo(() => {
    if (!car) return {};
    return {
      marca: getAttribute(car, 'marca') as string || '',
      model: getAttribute(car, 'model') as string || '',
      year: getAttribute(car, 'an') as number || new Date().getFullYear(),
      mileage: getAttribute(car, 'kilometraj') as number || 0,
      price: car.price,
    };
  }, [car]);

  useEffect(() => {
    if (car) {
      const { marca, model, year, mileage, price } = carDetailsMemo;
      const newTitle = `${marca} ${model} ${year} | Stefan Auto GVR`;
      const newDescription = `Descoperă acest ${marca} ${model} din ${year} la Stefan Auto GVR. ${mileage.toLocaleString('ro-RO')} km, stare impecabilă, preț ${price ? price.toLocaleString('ro-RO') + '€' : 'la cerere'}. Vezi detalii și finanțare.`;
      const imageUrl = car.images[0]?.url || '';

      document.title = newTitle;
      document.querySelector('meta[name="description"]')?.setAttribute("content", newDescription);
      
      // Update Open Graph tags
      document.querySelector('meta[property="og:title"]')?.setAttribute("content", newTitle);
      document.querySelector('meta[property="og:description"]')?.setAttribute("content", newDescription);
      document.querySelector('meta[property="og:image"]')?.setAttribute("content", imageUrl);
      
      // Update Twitter Card tags
      document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", newTitle);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", newDescription);
      document.querySelector('meta[name="twitter:image"]')?.setAttribute("content", imageUrl);
    }
  }, [car, carDetailsMemo]);


  const { techSpecs, features } = useMemo(() => {
    if (!car?.attributeValues) {
      return { techSpecs: [], features: [] };
    }

    const techSpecs: { name: string; value: string | number }[] = [];
    const features: string[] = [];
    
    // These are displayed prominently already, so we exclude them from the detailed specs list.
    const displayedSpecs = new Set([
      'marca', 'model', 'an', 'kilometraj', 'combustibil', 'cutie de viteze', 'pret'
    ]);

    car.attributeValues.forEach(attr => {
      const { attribute, stringValue, numberValue, booleanValue } = attr;
      const attrNameLower = attribute.name.toLowerCase();
      
      if ((attribute.type === 'STRING' || attribute.type === 'NUMBER') && (stringValue !== null || numberValue !== null)) {
        let value = stringValue ?? numberValue;
        if (value !== null && !displayedSpecs.has(attrNameLower)) {
          // Format specific values with units
          if (attrNameLower === 'putere' && typeof value === 'number') {
            value = `${value} CP`;
          } else if (attrNameLower === 'capacitate cilindrica' && typeof value === 'number') {
            value = `${value.toLocaleString('ro-RO')} cm³`;
          }
          techSpecs.push({ name: attribute.name, value: value! });
        }
      } else if (attribute.type === 'BOOLEAN' && booleanValue === true) {
        features.push(attribute.name);
      }
    });

    return { techSpecs, features };
  }, [car]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", phone: "", email: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    if (!id || !car) return;

    const messageWithSubject = `Subiect: Interes pentru ${car.title} (ID: ${id})\n\n${values.message || "Solicit mai multe detalii despre acest vehicul."}`;

    try {
      await submitContactForm({
        name: values.name,
        email: values.email || 'contact@stefanautogvr.ro', // Use a placeholder if email is not required/provided
        phone: values.phone,
        message: messageWithSubject,
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


  const handleFinancingCTA = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    form.setValue('message', `Salut, sunt interesat de o ofertă de finanțare pentru ${car?.title}.`);
  }

  const paginate = (newDirection: number) => {
    if (car && car.images) {
      let newIndex = imageIndex + newDirection;
      if (newIndex < 0) {
        newIndex = car.images.length - 1;
      } else if (newIndex >= car.images.length) {
        newIndex = 0;
      }
      setImageIndex(newIndex);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (event.key === "ArrowRight") {
          paginate(1);
        } else if (event.key === "ArrowLeft") {
          paginate(-1);
        } else if (event.key === "Escape") {
          setIsLightboxOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, imageIndex, car]);


  const galleryVariants = {
    enter: { opacity: 0, scale: 0.95 },
    center: { zIndex: 1, opacity: 1, scale: 1 },
    exit: { zIndex: 0, opacity: 0, scale: 0.95 },
  };

  const images = car?.images || [];
  
  const LightboxContent = () => (
    <div className="relative w-full h-full flex items-center justify-center">
       <AnimatePresence initial={false}>
            <motion.img
              key={imageIndex}
              src={images[imageIndex]?.url || "https://placehold.co/1200x800?text=Imagine+Indisponibilă"}
              alt={`Foto ${car?.title} - Stefan Auto GVR Dobroesti (${imageIndex + 1}/${images.length})`}
              className="max-w-full max-h-full object-contain"
              variants={galleryVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(_e, { offset, velocity }) => {
                const swipePower = Math.abs(offset.x) * velocity.x;
                if (swipePower < -10000) {
                  paginate(1);
                } else if (swipePower > 10000) {
                  paginate(-1);
                }
              }}
            />
          </AnimatePresence>

        {images.length > 1 && (
            <>
              {/* Prev Arrow */}
              <button 
                onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 text-white/70 hover:bg-black/50 hover:text-white transition-all duration-300 flex items-center justify-center z-20"
                aria-label="Imaginea anterioară"
              >
                <ChevronLeft className="w-7 h-7 text-gold" />
              </button>
              
              {/* Next Arrow */}
              <button 
                onClick={(e) => { e.stopPropagation(); paginate(1); }}
                className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 text-white/70 hover:bg-black/50 hover:text-white transition-all duration-300 flex items-center justify-center z-20"
                aria-label="Imaginea următoare"
              >
                <ChevronRight className="w-7 h-7 text-gold" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-4 py-2 rounded-full z-20 backdrop-blur-sm">
                Poza {imageIndex + 1} din {images.length}
              </div>
            </>
          )}
    </div>
  );


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
          <h1 className="font-display text-2xl text-destructive-foreground mb-2">Autoturism Indisponibil</h1>
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


  const carDetails = {
    marca: getAttribute(car, 'marca'),
    model: getAttribute(car, 'model'),
    year: getAttribute(car, 'an'),
    mileage: getAttribute(car, 'kilometraj'),
    fuel: getAttribute(car, 'combustibil'),
    transmission: getAttribute(car, 'cutie de viteze'),
  };
  
  const VehicleDetailsSection = ({ isMobile = false }) => (
     <motion.div variants={staggerItem} className={isMobile ? "lg:hidden" : "hidden lg:block"}>
        <div className="glass rounded-2xl p-6">
            <h2 className="font-display text-2xl mb-4">Detalii Vehicul</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary/70" />
                    <div>
                        <p className="text-xs text-muted-foreground">An</p>
                        <p className="text-sm font-medium">{String(carDetails.year) || 'N/A'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Gauge className="w-5 h-5 text-primary/70" />
                    <div>
                        <p className="text-xs text-muted-foreground">Kilometraj</p>
                        <p className="text-sm font-medium">{carDetails.mileage ? `${Number(carDetails.mileage).toLocaleString('ro-RO')} km` : 'N/A'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Fuel className="w-5 h-5 text-primary/70" />
                    <div>
                        <p className="text-xs text-muted-foreground">Combustibil</p>
                        <p className="text-sm font-medium">{String(carDetails.fuel) || 'N/A'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Settings2 className="w-5 h-5 text-primary/70" />
                    <div>
                        <p className="text-xs text-muted-foreground">Transmisie</p>
                        <p className="text-sm font-medium">{String(carDetails.transmission) || 'N/A'}</p>
                    </div>
                </div>
            </div>
            {!isMobile && (
                <div className="border-t border-border pt-6 flex flex-col gap-3">
                    <a
                        href="tel:0731758666"
                        className="btn-luxury-filled w-full flex items-center justify-center gap-2 py-3"
                        aria-label="Sună acum la Stefan Auto GVR"
                    >
                        <Phone className="w-4 h-4" />
                        Sună Acum
                    </a>
                    <a
                        href="https://wa.me/40731758666"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] text-white w-full flex items-center justify-center gap-2 py-3 rounded-sm font-medium tracking-widest uppercase text-sm transition-colors hover:bg-[#25D366]/90"
                        aria-label="Contactează Stefan Auto GVR pe WhatsApp"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Contactează pe WhatsApp
                    </a>
                </div>
            )}
        </div>
    </motion.div>
  );

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
            
            {car.price ? (
              <motion.p variants={staggerItem} className="font-semibold text-4xl text-gold-gradient mb-6">
                {car.price.toLocaleString('ro-RO', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}
              </motion.p>
            ) : (
              <motion.p variants={staggerItem} className="bg-primary/10 text-primary px-4 py-2 rounded-lg mb-6 inline-block">
                Preț la cerere
              </motion.p>
            )}



            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mt-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-12">
                {/* 1. Image Gallery */}
                <motion.div variants={staggerItem}>
                  <div 
                    className="relative aspect-[16/10] rounded-xl overflow-hidden glass group cursor-pointer"
                    onClick={() => images.length > 0 && setIsLightboxOpen(true)}
                  >
                    <AnimatePresence initial={false}>
                      <motion.img
                        key={imageIndex}
                        src={images[imageIndex]?.url || "https://placehold.co/1200x800?text=Imagine+Indisponibilă"}
                        alt={`Foto ${car.title} - Stefan Auto GVR Dobroesti`}
                        className="absolute w-full h-full object-cover"
                        variants={galleryVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          opacity: { duration: 0.3 },
                          scale: { duration: 0.3 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.5}
                        onDragEnd={(_e, { offset, velocity }) => {
                          const swipePower = Math.abs(offset.x) * velocity.x;
                          if (swipePower < -10000) {
                            paginate(1);
                          } else if (swipePower > 10000) {
                            paginate(-1);
                          }
                        }}
                      />
                    </AnimatePresence>
                    
                    {images.length > 1 && (
                      <>
                        <button 
                          onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                          className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white/70 hover:bg-black/50 hover:text-white transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
                          aria-label="Imaginea anterioară"
                        >
                          <ChevronLeft className="w-6 h-6 text-gold" />
                        </button>
                        
                        <button 
                          onClick={(e) => { e.stopPropagation(); paginate(1); }}
                          className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white/70 hover:bg-black/50 hover:text-white transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
                          aria-label="Imaginea următoare"
                        >
                          <ChevronRight className="w-6 h-6 text-gold" />
                        </button>

                        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full z-10 backdrop-blur-sm">
                          Poza {imageIndex + 1} din {images.length}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>

                <div className="block lg:hidden">
                   <VehicleDetailsSection />
                </div>

                {/* Specificații Tehnice */}
                {techSpecs.length > 0 && (
                  <motion.div variants={staggerItem}>
                    <h2 className="font-display text-2xl mb-6 text-gold-gradient">Specificații Tehnice</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {techSpecs.map((spec) => (
                        <div key={spec.name} className="flex justify-between border-b border-border/50 pb-2">
                          <span className="text-muted-foreground">{spec.name}</span>
                          <span className="font-medium text-foreground text-right">{String(spec.value)}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Dotări și Echipamente */}
                {features.length > 0 && (
                  <motion.div variants={staggerItem}>
                    <h2 className="font-display text-2xl mb-6 text-gold-gradient">Dotări și Echipamente</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                      {features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-foreground/90">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Descriere */}
                <motion.div variants={staggerItem}>
                  <h2 className="font-display text-2xl mb-4 text-gold-gradient">Descriere</h2>
                  <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    <p>{car.description || "Descriere indisponibilă."}</p>
                  </div>
                </motion.div>
                
                 {/* Contact Form */}
                <motion.div ref={contactFormRef} variants={staggerItem} className="glass rounded-2xl p-6 md:p-8">
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
                                <Input placeholder="contact@stefan.ro" {...field} className="input-luxury" />
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
              </div>

              {/* Right Column */}
              <div className="lg:col-span-1">
                 <div className="sticky top-24 space-y-8">
                   <div className="hidden lg:block">
                      <VehicleDetailsSection />
                   </div>

                  {/* Calculator Finanțare */}
                  {car.price && (
                    <motion.div variants={staggerItem}>
                      <FinancingCalculator price={car.price} carTitle={car.title} />
                    </motion.div>
                  )}
                 </div>
              </div>
            </div>
          </StaggerContainer>
        </div>
      </main>

      {/* Lightbox */}
       <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the content
            >
              <LightboxContent />
            </motion.div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center z-[110]"
              aria-label="Închide galeria"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

       {/* Mobile Sticky Bar */}
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
        className="fixed bottom-0 left-0 right-0 glass-strong p-3 flex gap-3 lg:hidden z-40"
      >
        <a href="tel:0731758666" className="btn-luxury flex-1 flex items-center justify-center py-3" aria-label="Sună acum">
          <Phone className="w-4 h-4 mr-2" />
          Sună Acum
        </a>
         <a href="https://wa.me/40731758666" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white flex-1 flex items-center justify-center py-3 rounded-sm font-medium tracking-widest uppercase text-sm transition-colors hover:bg-[#25D366]/90" aria-label="Contactează pe WhatsApp">
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp
        </a>
      </motion.div>

      <Footer />
    </div>
  );
};

export default CarDetail;
