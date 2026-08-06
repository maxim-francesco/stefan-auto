
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
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
                    Termeni și Condiții
                </h1>
                <p className="text-muted-foreground">Ultima actualizare: 29 Iulie 2024</p>
            </div>

            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
              <p>
                Bine ați venit pe site-ul nostru. Vă rugăm să citiți cu atenție acești termeni și condiții înainte de a utiliza site-ul operat de STEFAN AUTO GVR SRL.
              </p>

              <h2 className="text-xl font-display text-foreground">1. Informații despre Companie</h2>
              <p>
                Serviciul este furnizat de <strong>STEFAN AUTO GVR SRL</strong>, o societate comercială de naționalitate română, cu sediul social în Str. Cireșului 16 C, Dobroești 077086, înregistrată la Registrul Comerțului sub nr. J23/7668/2022, având Cod Unic de Înregistrare (CUI) 47133950.
              </p>

              <h2 className="text-xl font-display text-foreground">2. Obiectul Contractului</h2>
              <p>
                Prezentul document stabilește termenii și condițiile de utilizare a site-ului și de achiziționare a autoturismelor rulate comercializate de STEFAN AUTO GVR SRL. Utilizarea acestui site implică acceptarea necondiționată a acestor termeni.
              </p>

              <h2 className="text-xl font-display text-foreground">3. Descrierea Produselor și Prețuri</h2>
              <p>
                Ne străduim să oferim descrieri cât mai exacte și complete ale autoturismelor listate. Totuși, pot exista erori umane. Fotografiile au caracter informativ. Prețurile sunt exprimate în EUR și, dacă nu se specifică altfel, includ TVA. Ne rezervăm dreptul de a modifica prețurile fără o notificare prealabilă.
              </p>
              
              <h2 className="text-xl font-display text-foreground">4. Garanția Vehiculelor</h2>
              <p>
                Toate autoturismele comercializate beneficiază de garanție în conformitate cu legislația în vigoare din România (OUG nr. 140/2021 privind anumite aspecte referitoare la contractele de vânzare de bunuri și OG nr. 21/1992 privind protecția consumatorilor). Perioada specifică de garanție și condițiile detaliate (piese acoperite, excluderi) sunt specificate în{" "}
                <Link to="/garantie" className="text-primary hover:underline">
                  Termeni și condiții acordare garanție
                </Link>.
              </p>
              <p>
                Autovehiculele comercializate în regim de consignație nu beneficiază de garanție comercială.
              </p>

              <h2 className="text-xl font-display text-foreground">5. Responsabilitățile Utilizatorului</h2>
              <p>
                Utilizatorul se obligă:
              </p>
              <ul>
                <li>Să folosească site-ul doar în scopuri legale și legitime.</li>
                <li>Să furnizeze date de contact corecte și complete în formulare.</li>
                <li>Să nu încerce să fraudeze sau să perturbe funcționarea site-ului.</li>
                <li>Să verifice personal starea tehnică și estetică a vehiculului înainte de achiziție.</li>
              </ul>

              <h2 className="text-xl font-display text-foreground">6. Limitarea Răspunderii</h2>
              <p>
                STEFAN AUTO GVR SRL nu poate fi trasă la răspundere pentru daune indirecte sau accidentale ce ar putea rezulta din utilizarea sau incapacitatea de utilizare a site-ului. Răspunderea noastră maximă, în orice circumstanțe legate de achiziția unui vehicul, este limitată la valoarea prețului de achiziție al acestuia.
              </p>

              <h2 className="text-xl font-display text-foreground">7. Legea Aplicabilă și Litigii</h2>
              <p>
                Acești termeni și condiții sunt guvernați de legea română. Orice litigiu apărut între Utilizator și STEFAN AUTO GVR SRL va fi soluționat pe cale amiabilă. În cazul în care acest lucru nu este posibil, litigiul va fi înaintat spre soluționare instanțelor judecătorești competente din România.
              </p>

               <h2 className="text-xl font-display text-foreground">8. Modificări</h2>
                <p>
                    Ne rezervăm dreptul de a modifica acești termeni și condiții în orice moment. Versiunea actualizată va fi publicată pe această pagină și va intra în vigoare imediat.
                </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
