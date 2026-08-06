export const WARRANTY_META = {
  lastUpdated: "26 februarie 2026",
  durationMonths: 12,
  durationKm: 8000,
  coverageLimitRon: 5000,
  contactEmail: "Stefanautogvr@gmail.com",
  contactPhone: "0731758666",
  contactPhoneDisplay: "0731 758 666",
};

export interface WarrantySection {
  id: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
  listAfter?: string[];
  highlight?: boolean;
}

export const WARRANTY_SECTIONS: WarrantySection[] = [
  {
    id: "obiectul-garantiei",
    title: "1. Obiectul garanției",
    highlight: true,
    paragraphs: [
      "Autovehiculele comercializate de STEFAN AUTO GVR SRL beneficiază de garanție comercială pe o perioadă de 12 luni sau 8.000 km parcurși de la momentul achiziției, în funcție de care dintre cele două condiții este atinsă prima.",
      "Limita maximă de despăgubire acordată în baza prezentei garanții comerciale este de 5.000 EUR.",
      "Prezenta garanție comercială se acordă suplimentar față de garanția legală de conformitate și nu limitează drepturile conferite consumatorului de OUG nr. 140/2021 și de OG nr. 21/1992 privind protecția consumatorilor.",
    ],
  },
  {
    id: "elemente-acoperite",
    title: "2. Elemente acoperite",
    paragraphs: [
      "Garanția se referă la capacitatea funcțională a următoarelor elemente:",
    ],
    list: [
      "Motor: bloc motor, pistoane, cămăși, segmenți, bielă, cuzineți, arbore cu came, arbore cotit, chiulasă, garnitură de chiulasă.",
      "Cutie de viteze manuală, automată sau cu variație continuă (CVT): toate piesele interne lubrifiate.",
    ],
    listAfter: [
      "Nu sunt cuprinse în garanție elementele de legătură dintre motor și cutia de viteze (rulment de presiune, placă de presiune, disc de ambreiaj, ambreiaje).",
      "Reparațiile aferente oricăror alte piese sau elemente care nu sunt prevăzute mai sus nu sunt acoperite de prezenta garanție.",
    ],
  },
  {
    id: "elemente-neacoperite",
    title: "3. Elemente care nu sunt acoperite",
    paragraphs: ["Garanția nu acoperă:"],
    list: [
      "Anexele motorului: elemente ale sistemului de injecție (pompă de injecție, injectoare, pompă de combustibil, senzori, regulatori).",
      "Turbina, intercoolerul și sistemul de evacuare a gazelor (eșapament, filtru de particule).",
      "Garnituri, simeringuri, furtunuri.",
      "Bujii, filtre, lichide, lubrifianți.",
      "Componente ale sistemelor de suspensie, direcție, frânare și electric.",
      "Alte elemente de uzură și consumabile.",
      "Defecțiunile cauzate de ruperea curelei sau a lanțului de distribuție ca urmare a nerespectării intervalului de înlocuire recomandat de producător.",
      "Scurgerile exterioare de ulei.",
      "Senzorii.",
    ],
  },
  {
    id: "situatii-excluse",
    title: "4. Situații în care garanția nu se aplică",
    paragraphs: ["De asemenea, garanția nu acoperă defecțiunile:"],
    list: [
      "Rezultate din circulația cu autovehiculul fără ulei de motor, ulei de cutie de viteze sau lichid de răcire, ori cu nivelul acestor lichide sub nivelul minim.",
      "Rezultate din circulația cu martori de avertizare aprinși.",
      "Rezultate din accidente, respectiv defecțiuni cauzate prin forță mecanică.",
      "Datorate incendiului, exploziei, furtului, utilizării neautorizate sau necorespunzătoare, tâlhăriei ori sustragerii, precum și cele produse prin efectul direct al factorilor meteorologici.",
      "Apărute ca urmare a supunerii autovehiculului unor sarcini de remorcare mai mari decât cele stabilite ca admisibile de către producător.",
      "Apărute ca urmare a alimentării cu combustibil greșit.",
      "Apărute în situația în care asupra autovehiculului au fost efectuate lucrări de reparație în afara unui service autorizat.",
    ],
  },
  {
    id: "hibrid-electric",
    title: "5. Autovehicule hibride și electrice",
    paragraphs: [
      "În cazul autoturismelor cu motoare hibride sau electrice, nu se acordă garanție pentru motorul electric și nici pentru bateria acestuia.",
    ],
  },
  {
    id: "consignatie",
    title: "6. Autovehicule în regim de consignație",
    highlight: true,
    paragraphs: [
      "Autovehiculele comercializate în regim de consignație nu beneficiază de garanție comercială.",
    ],
  },
  {
    id: "costuri-neacoperite",
    title: "7. Costuri care nu sunt acoperite",
    list: [
      "Costurile pentru lucrările de testare, măsurare și reglare, în măsura în care acestea nu se datorează unei defecțiuni acoperite de garanție.",
      "Costurile de remorcare și cele de depozitare, dacă acestea nu survin ca urmare a unei defecțiuni acoperite de garanție.",
      "Costurile rezultate în urma pierderii unor oportunități ale clientului, cum ar fi: bilet de tren, bilet de avion, oportunități de afaceri.",
      "Costurile pentru cazare, în măsura în care acestea nu se datorează unei defecțiuni acoperite de garanție.",
    ],
  },
  {
    id: "transmisibilitate",
    title: "8. Transmiterea garanției",
    paragraphs: [
      "Garanția poate fi transmisă de Cumpărător unei terțe persoane în cazul vânzării autovehiculului. Cumpărătorul are obligația de a notifica vânzătorul cu privire la înstrăinarea autovehiculului.",
    ],
  },
  {
    id: "drepturile-cumparatorului",
    title: "9. Drepturile Cumpărătorului",
    paragraphs: [
      "Defecțiunile acoperite de prezentele condiții, apărute în perioada de garanție, se remediază prin repararea sau înlocuirea componentelor defecte.",
      "Termenul de remediere a deficiențelor constatate este de 15–30 de zile calendaristice din momentul în care Cumpărătorul a informat vânzătorul cu privire la neconformitate. Cumpărătorului i se va comunica termenul estimat de remediere primit de la Service-ul Partener.",
    ],
  },
  {
    id: "obligatiile-cumparatorului",
    title: "10. Obligațiile Cumpărătorului",
    paragraphs: [
      "În cazul apariției unei defecțiuni la elementele aflate în garanție, Cumpărătorul este obligat să anunțe de îndată acest fapt la datele de contact ale vânzătorului, în scopul constatării cauzelor care au determinat defecțiunea, fără a interveni asupra autovehiculului.",
      "Orice intervenție efectuată personal de către Cumpărător sau de către o persoană terță ori un service ales de Cumpărător, fără autorizarea expresă și în scris a vânzătorului, duce la anularea în întregime a garanției.",
      "Pentru a beneficia de garanție, Cumpărătorul are următoarele obligații:",
    ],
    list: [
      "Să efectueze revizia tehnică periodică într-un service autorizat RAR, în termen de maximum 10 zile calendaristice sau maximum 1.000 km parcurși de la momentul intrării în posesia autovehiculului. Prin aceasta se înțelege schimbul de ulei și filtre pentru toate componentele cu piese în mișcare care funcționează prin lubrifiere și care sunt acoperite de garanție, precum și distribuția.",
      "Să respecte intervalul de schimb pentru ulei și filtre specificat de producător pentru autovehiculele cu un rulaj sub 100.000 km. Pentru autovehiculele cu rulaj de peste 100.000 km, să respecte un interval de schimb pentru ulei și filtre de 10.000 km sau un an.",
      "Să anunțe de îndată vânzătorul la apariția oricărei situații anormale în funcționarea autovehiculului. Este interzisă intervenția asupra autovehiculului a persoanelor neautorizate de vânzător.",
      "Să efectueze orice intervenție asupra componentelor acoperite de garanție exclusiv în unitățile Service Partenere RAR.",
      "Să păstreze certificatul de garanție și dovada tuturor reviziilor efectuate asupra elementelor acoperite.",
    ],
    listAfter: [
      "Nerespectarea obligațiilor de mai sus atrage pierderea garanției.",
    ],
  },
  {
    id: "cadru-legal",
    title: "11. Cadru legal și contact",
    paragraphs: [
      "Prezentele condiții de acordare a garanției sunt în conformitate cu OUG nr. 140/2021 privind anumite aspecte referitoare la contractele de vânzare de bunuri și cu OG nr. 21/1992 privind protecția consumatorilor.",
      "Pentru orice solicitare legată de garanție, ne puteți contacta la adresa de e-mail Stefanautogvr@gmail.com sau la numărul de telefon 0731 758 666.",
    ],
  },
];
