export const products = [
  {
    id: 1,
    name: "ArcticPro 700 TN",
    category: "Armadi Refrigerati",
    description: "Armadio refrigerato professionale monoscocca in acciaio inox AISI 304. Sistema di refrigerazione ventilata tropicalizzata (fino a +43°C) con sbrinamento automatico a gas caldo. Angoli interni arrotondati per massima igiene.",
    specs: {
      capacita: "700 L",
      temperatura: "-2°C / +8°C",
      consumo: "2.8 kWh/24h",
      dimensioni: "700 x 830 x 2050 mm",
      allestimento: "3 griglie GN 2/1",
      gas: "R290 Eco-Friendly"
    },
    price: "Contattaci per preventivo",
    image: "/armadio-700.png",
    badge: "Top Seller"
  },
  {
    id: 2,
    name: "MeatMaster Dry-Age 500",
    category: "Maturatori Carne",
    description: "Vetrina professionale per frollatura a secco (dry aging). Controllo elettronico attivo di temperatura e umidità (60-90%) senza necessità di allaccio idrico. Sistema di sanificazione UV-C integrato per abbattimento carica batterica.",
    specs: {
      capacita: "500 L / 80kg carne",
      temperatura: "0°C / +4°C",
      umidità: "60% - 90% RH",
      finitura: "Inox Scotch Brite",
      tecnologia: "SmartAging® Cloud",
      illuminazione: "LED Rosa Meat-Specific"
    },
    price: "Configurazione Premium",
    image: "/frollatura-maturatore.png",
    badge: "Specialistico"
  },
  {
    id: 3,
    name: "PizzaChef Granite 3P",
    category: "Tavoli Pizza",
    description: "Tavolo refrigerato per pizzeria con piano di lavoro in granito sardo da 30mm. Struttura interna ed esterna in acciaio AISI 304. Vano motore indipendente e vani compatibili con cassette 600x400 mm.",
    specs: {
      capacita: "Vani 600x400",
      temperatura: "+2°C / +10°C",
      piano: "Granito Rettificato",
      dimensioni: "2020 x 800 x 1000 mm",
      motore: "Tropicalizzato 43°C",
      isolamento: "60mm Poliuretano"
    },
    price: "In Offerta",
    image: "/tavolo-pizza.png",
    badge: "Essenziale"
  },
  {
    id: 4,
    name: "ZeroPoint NX-15",
    category: "Abbattitori",
    description: "Abbattitore rapido di temperatura a 10 teglie GN 1/1. Cicli programmabili Hard/Soft per abbattimento (+3°C) e surgelazione rapida (-18°C). Sonda al cuore multipoint ribaltabile riscaldata.",
    specs: {
      resa: "+3°C (50kg) / -18°C (35kg)",
      capacita: "10 teglie GN 1/1",
      cicli: "Manuale / Automatico",
      dimensioni: "800 x 830 x 1750 mm",
      pannello: "Touch Screen 7\"",
      connettività: "Wi-Fi Ready"
    },
    price: "Alta Efficienza",
    image: "/abbattitore.png",
    badge: "Performance"
  },
  {
    id: 5,
    name: "FrostVault Modular 2.0",
    category: "Celle Frigorifere",
    description: "Cella frigorifera modulare walk-in con pannelli a gancio rapido da 80mm. Pavimento rinforzato antiscivolo e porta con apertura di sicurezza interna. Motore monoblocco a soffitto o a parete.",
    specs: {
      volume: "6.5 m³",
      temperatura: "-2°C / +5°C",
      pannelli: "Acciaio Zincopretinto",
      dimensioni: "1500 x 2100 x 2400 mm",
      porta: "Luce netta 800x1900",
      motore: "Plug & Play"
    },
    price: "In Finanziamento",
    image: "/cella-walkin.png",
    badge: "Personalizzabile"
  },
  {
    id: 6,
    name: "GlacierMax BT-700",
    category: "Armadi Refrigerati",
    description: "Armadio congelatore professionale Bassa Temperatura. Ideale per la conservazione a lungo termine di materie prime. Ventilazione forzata e resistenza elettrica anticonsensa sulla cornice porta.",
    specs: {
      capacita: "700 L",
      temperatura: "-18°C / -22°C",
      sbrinamento: "Elettrico Automatico",
      dimensioni: "700 x 830 x 2050 mm",
      classe: "Energetica B",
      materiale: "AISI 304"
    },
    price: "Consigliato",
    image: "/armadio-700.png",
    badge: "Bassa Temp"
  },
  {
    id: 7,
    name: "Aurora Pastry Luxury",
    category: "Vetrine Display",
    description: "Vetrina espositiva per pasticceria e cioccolateria con vetri doppi basso-emissivi. Sistema di umidità controllata per evitare l'essiccazione dei prodotti. Design minimalista con montanti a scomparsa.",
    specs: {
      illuminazione: "LED 3000K Cri95",
      temperatura: "+4°C / +12°C",
      umidità: "55% - 75% regolabile",
      dimensioni: "1500 x 850 x 1350 mm",
      ripiani: "Vetro Cristallo 10mm",
      colore: "Custom RAL / Inox"
    },
    price: "Artigianale",
    image: "/banco-deliz.png",
    badge: "Design"
  },
  {
    id: 8,
    name: "BarLine Slim 2P",
    category: "Sottobanco",
    description: "Fridobar sottobanco compatto per bevande e preparazioni bar. Doppia porta in vetro intelaiata inox con chiusura automatica. Dimensioni ottimizzate per l'incasso sotto banconi standard.",
    specs: {
      capacita: "320 L",
      temperatura: "+2°C / +10°C",
      porte: "Vetro Termostampato",
      dimensioni: "1350 x 600 x 850 mm",
      interno: "Alluminio Goffrato",
      ripiani: "Griglie Regolabili"
    },
    price: "Best Buy",
    image: "/armadio-700.png",
    badge: "Bar & Pub"
  },
  {
    id: 9,
    name: "OceanBlue Fish 700",
    category: "Conservazione Pesce",
    description: "Armadio refrigerato specifico per la conservazione del pesce fresco. Dotato di cassetti in ABS forati con sistema di drenaggio liquidi dedicato. Evaporatore trattato anti-corrosione salina.",
    specs: {
      dotazione: "7 Cassetti Fish-Grade",
      temperatura: "-2°C / +2°C",
      drenaggio: "Canalizzazione Inox",
      dimensioni: "700 x 830 x 2050 mm",
      materiale: "AISI 316 Acid-Resistant",
      sicurezza: "HACCP Certified"
    },
    price: "Tecnico",
    image: "/armadio-700.png",
    badge: "Special Mare"
  },
  {
    id: 10,
    name: "Tundra Island 250",
    category: "Espositori Gelati",
    description: "Isola refrigerata orizzontale per surgelati e gelati con coperture in vetro scorrevole. Illuminazione perimetrale e sistema di sbrinamento rapido. Elevata visibilità del prodotto.",
    specs: {
      capacita: "680 L Lordi",
      temperatura: "-24°C / -16°C",
      vetri: "Basso Emissivi",
      dimensioni: "2500 x 1000 x 900 mm",
      sito: "Promozionale",
      classe: "Energetica A"
    },
    price: "Promozione",
    image: "/abbattitore.png",
    badge: "Grande Distribuzione"
  }
];
