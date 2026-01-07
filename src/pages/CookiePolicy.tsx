
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
                <h1 className="font-display text-4xl md:text-5xl mt-2 mb-4 text-gold-gradient">
                    Politică de Cookies
                </h1>
                <p className="text-muted-foreground">Ultima actualizare: 29 Iulie 2024</p>
            </div>

            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
                <h2 className="text-xl font-display text-foreground">1. Ce sunt Cookie-urile?</h2>
                <p>
                    Un "cookie" este un fișier text de mici dimensiuni pe care un site îl salvează pe computerul sau dispozitivul dumneavoastră mobil atunci când îl vizitați. Cookie-urile sunt larg utilizate pentru a face site-urile să funcționeze sau să funcționeze mai eficient, precum și pentru a furniza informații deținătorilor site-ului.
                </p>

                <h2 className="text-xl font-display text-foreground">2. Cum Folosim Cookie-urile?</h2>
                <p>
                    Site-ul nostru, stefanautogvr.ro, utilizează cookie-uri pentru a îmbunătăți experiența dumneavoastră de navigare. Folosim următoarele tipuri de cookie-uri:
                </p>
                <ul>
                    <li>
                        <strong>Cookie-uri strict necesare:</strong> Acestea sunt esențiale pentru a vă permite să navigați pe site și să utilizați funcțiile acestuia. Fără aceste cookie-uri, serviciile pe care le-ați solicitat (cum ar fi navigarea între pagini) nu pot fi furnizate.
                    </li>
                    <li>
                        <strong>Cookie-uri de performanță și analiză:</strong> Aceste cookie-uri colectează informații despre modul în care vizitatorii utilizează un site web, de exemplu, ce pagini vizitează cel mai des și dacă primesc mesaje de eroare. Aceste cookie-uri nu colectează informații care identifică un vizitator. Toate informațiile pe care le colectează aceste cookie-uri sunt agregate și, prin urmare, anonime. Ele sunt folosite doar pentru a îmbunătăți modul în care funcționează un site web (de ex., prin Google Analytics).
                    </li>
                </ul>

                <h2 className="text-xl font-display text-foreground">3. Google Analytics</h2>
                <p>
                    Acest site utilizează Google Analytics, un serviciu de analiză web furnizat de Google, Inc. ("Google"). Google Analytics folosește cookie-uri pentru a ajuta site-ul să analizeze modul în care utilizatorii îl utilizează. Informațiile generate de cookie cu privire la utilizarea de către dumneavoastră a site-ului vor fi transmise și stocate de Google pe servere din Statele Unite.
                </p>

                <h2 className="text-xl font-display text-foreground">4. Cum Puteți Controla Cookie-urile?</h2>
                <p>
                    Puteți controla și/sau șterge cookie-urile după cum doriți. Puteți șterge toate cookie-urile care sunt deja pe computerul dumneavoastră și puteți seta majoritatea browserelor să prevină plasarea acestora. Dacă faceți acest lucru, este posibil să trebuiască să ajustați manual unele preferințe de fiecare dată când vizitați un site, iar unele servicii și funcționalități s-ar putea să nu funcționeze.
                </p>
                <p>
                    Pentru mai multe informații despre cookie-uri, puteți vizita <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.allaboutcookies.org</a>.
                </p>
                
                <h2 className="text-xl font-display text-foreground">5. Modificări ale Politicii de Cookies</h2>
                <p>
                    Ne rezervăm dreptul de a actualiza această politică de cookies ori de câte ori este necesar. Orice modificare va fi publicată pe această pagină.
                </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
