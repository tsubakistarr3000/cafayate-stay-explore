import { img, type Photo } from "./media";

/** Central, editable site configuration. Empty strings = not configured yet (hidden in UI). */
export const site = {
  businessName: "Barricas de Cafayate",
  location: "Cafayate, Salta, Argentina",
  address: "", // a confirmar
  whatsappNumber: "", // formato internacional sin "+", ej. 5493868000000 — a confirmar
  email: "", // a confirmar
  instagramUrl: "", // a confirmar
  bookingUrl: "", // enlace directo a la ficha del alojamiento — a confirmar
  bookingSearchUrl: "https://www.booking.com/searchresults.es.html?ss=Barricas%20de%20Cafayate%2C%20Cafayate%2C%20Salta%2C%20Argentina",
  checkInTime: "", // a confirmar
  checkOutTime: "", // a confirmar
  coordinates: "26°04′S · 65°58′O",
};

export type Accommodation = {
  id: string;
  slug: string;
  name: string;
  displayNumber: string;
  provisional: boolean;
  subtitle: string;
  description: string;
  heroImage: Photo;
  gallery: Photo[];
  maxGuests: number;
  capacityConfirmed: boolean;
  bedConfiguration: string;
  privateAmenities: string[];
  sharedAmenities: string[];
  airbnbUrl: string;
};

const shared = ["Cocina compartida", "Parrilla compartida", "Galería y patio", "Estacionamiento"];

export const accommodations: Accommodation[] = [
  {
    id: "malbec",
    slug: "malbec",
    name: "Malbec",
    displayNumber: "01",
    provisional: false,
    subtitle: "Bóveda blanca, muro rojo profundo.",
    description:
      "Una habitación privada bajo una bóveda curva, con un muro de color intenso que recuerda al varietal que le da nombre. Baño privado y lo necesario para descansar después de recorrer Cafayate.",
    heroImage: img.malbec1,
    gallery: [img.malbec1, img.malbec2, img.malbec3, img.malbec4, img.malbec5, img.exteriorSuculentas],
    maxGuests: 3,
    capacityConfirmed: false,
    bedConfiguration: "Dos camas (configuración a confirmar)",
    privateAmenities: ["Baño privado", "Aire acondicionado", "Frigobar", "Wi-Fi"],
    sharedAmenities: shared,
    airbnbUrl: "https://www.airbnb.com.ar/rooms/1448576410581419125",
  },
  {
    id: "cabernet",
    slug: "cabernet",
    name: "Cabernet",
    displayNumber: "02",
    provisional: false,
    subtitle: "Tonos bordó y madera.",
    description:
      "Interior abovedado en tonos bordó, con detalles en madera y una pequeña mesa hecha de barrica. Una habitación privada con baño propio, pensada para estadías tranquilas.",
    heroImage: img.cabernet1,
    gallery: [img.cabernet1, img.cabernet2, img.cabernet3, img.cabernet4, img.cabernet5, img.exteriorBarrica],
    maxGuests: 3,
    capacityConfirmed: false,
    bedConfiguration: "Dos camas (configuración a confirmar)",
    privateAmenities: ["Baño privado", "Aire acondicionado", "Frigobar", "Wi-Fi"],
    sharedAmenities: shared,
    airbnbUrl: "https://www.airbnb.com/rooms/1409399931697439334",
  },
  {
    id: "rosado",
    slug: "rosado",
    name: "Rosado",
    displayNumber: "03",
    provisional: false,
    subtitle: "Terracota, rosa y luz cálida.",
    description:
      "Un muro terracota en arco, una bacha rosa y textiles suaves. Rosado es la barrica más luminosa: privada, con baño propio y la calidez de los colores del valle.",
    heroImage: img.rosadoCamas,
    gallery: [img.rosadoCamas, img.rosadoBano, img.rosado1, img.rosado2, img.rosado3, img.rosado4],
    maxGuests: 3,
    capacityConfirmed: false,
    bedConfiguration: "Dos camas (configuración a confirmar)",
    privateAmenities: ["Baño privado", "Aire acondicionado", "Frigobar", "Wi-Fi"],
    sharedAmenities: shared,
    airbnbUrl: "https://es.airbnb.com/rooms/1448670816410723300",
  },
  {
    id: "barrica-04",
    slug: "barrica-04",
    name: "Barrica 04",
    displayNumber: "04",
    provisional: true,
    subtitle: "Nombre a confirmar.",
    description:
      "Cuarta unidad del conjunto. Nombre, fotografías y detalles pendientes de confirmación por el alojamiento.",
    heroImage: img.exteriorCactus,
    gallery: [img.exteriorCactus, img.vistaConjunto],
    maxGuests: 3,
    capacityConfirmed: false,
    bedConfiguration: "A confirmar",
    privateAmenities: ["Baño privado"],
    sharedAmenities: shared,
    airbnbUrl: "",
  },
];

export const getAccommodation = (slug: string) => accommodations.find((a) => a.slug === slug);
