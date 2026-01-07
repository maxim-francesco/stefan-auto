
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
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
                    Politică de Confidențialitate (GDPR)
                </h1>
                <p className="text-muted-foreground">Ultima actualizare: 29 Iulie 2024</p>
            </div>

            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
                <p>
                    Confidențialitatea datelor dumneavoastră cu caracter personal reprezintă una dintre preocupările principale ale STEFAN AUTO GVR SRL. Acest document are rolul de a vă informa cu privire la prelucrarea datelor dumneavoastră cu caracter personal, în contextul utilizării paginii de internet stefanautogvr.ro.
                </p>

                <h2 className="text-xl font-display text-foreground">1. Categoriile de Date cu Caracter Personal Prelucrate</h2>
                <p>
                    Dacă sunteți vizitator al Site-ului, vom prelucra datele dumneavoastră cu caracter personal pe care le furnizați în mod direct în contextul utilizării Site-ului, cum ar fi datele pe care le furnizați în cadrul secțiunii de contact / formular, în măsura în care ne contactați în acest fel. Acestea includ, de regulă: nume, prenume, număr de telefon, adresă de e-mail.
                </p>

                <h2 className="text-xl font-display text-foreground">2. Scopurile și Temeiurile Prelucrării</h2>
                <p>
                    Datele dumneavoastră sunt prelucrate în scopul de a răspunde solicitărilor dumneavoastră transmise prin formularele de contact, pentru a menține și îmbunătăți relația comercială și pentru a vă oferi informații despre vehiculele de interes. Temeiul legal pentru această prelucrare este consimțământul dumneavoastră, exprimat prin trimiterea voluntară a datelor, și interesul nostru legitim de a desfășura activități comerciale.
                </p>

                <h2 className="text-xl font-display text-foreground">3. Durata pentru care vă Prelucrăm Datele</h2>
                <p>
                    STEFAN AUTO GVR SRL va prelucra datele dumneavoastră cu caracter personal atât cât este necesar pentru realizarea scopurilor de prelucrare menționate mai sus. În cazul în care sunteți un client, vom prelucra datele dumneavoastră pe întreaga durată a raporturilor contractuale și ulterior conform obligațiilor legale care revin în sarcina noastră (de ex., în cazul documentelor financiar-contabile pentru care termenul de păstrare prevăzut de lege este de 10 ani).
                </p>
                
                <h2 className="text-xl font-display text-foreground">4. Dezvăluirea Datelor cu Caracter Personal</h2>
                <p>
                    Nu vom dezvălui datele dumneavoastră cu caracter personal către terțe părți, cu excepția situațiilor în care acest lucru este necesar pentru executarea unui contract (ex: parteneri de finanțare, la solicitarea dumneavoastră) sau impus de lege (autorități publice).
                </p>

                <h2 className="text-xl font-display text-foreground">5. Drepturile Dumneavoastră</h2>
                <p>
                    În conformitate cu regulamentul GDPR, beneficiați de următoarele drepturi:
                </p>
                <ul>
                    <li><strong>Dreptul la informare:</strong> dreptul de a primi detalii privind activitățile de prelucrare.</li>
                    <li><strong>Dreptul la acces:</strong> dreptul de a obține confirmarea faptului că datele dumneavoastră sunt prelucrate, precum și detalii despre cum sunt prelucrate.</li>
                    <li><strong>Dreptul la rectificare:</strong> dreptul de a obține corectarea datelor inexacte sau completarea datelor incomplete.</li>
                    <li><strong>Dreptul la ștergerea datelor ("dreptul de a fi uitat"):</strong> puteți cere ștergerea datelor, în condițiile legii.</li>
                    <li><strong>Dreptul la restricționarea prelucrării:</strong> în anumite cazuri, puteți solicita restricționarea prelucrării datelor dumneavoastră.</li>
                    <li><strong>Dreptul la portabilitatea datelor:</strong> dreptul de a primi datele într-un format structurat, utilizat în mod curent și care poate fi citit automat.</li>
                    <li><strong>Dreptul la opoziție:</strong> dreptul de a vă opune prelucrării datelor.</li>
                    <li><strong>Dreptul de a vă adresa Autorității Naționale de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP).</strong></li>
                </ul>
                <p>
                    Pentru orice întrebări suplimentare cu privire la modul în care datele cu caracter personal sunt prelucrate și pentru a vă exercita drepturile menționate mai sus, vă rugăm să vă adresați la adresa de email: contact@stefan.ro.
                </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
