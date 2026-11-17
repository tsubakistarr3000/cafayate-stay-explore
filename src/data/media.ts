import exteriorBarricas from "@/assets/photos/exterior-barricas.png.asset.json";
import cafayateVinedos from "@/assets/photos/cafayate-vinedos.png.asset.json";
import quebradaConchas from "@/assets/photos/quebrada-conchas.png.asset.json";
import rosadoBano from "@/assets/photos/rosado-bano.webp.asset.json";
import rosadoCamas from "@/assets/photos/rosado-camas.webp.asset.json";
import rosado1 from "@/assets/photos/rosado-1.jpg.asset.json";
import rosado2 from "@/assets/photos/rosado-2.jpg.asset.json";
import rosado3 from "@/assets/photos/rosado-3.jpg.asset.json";
import rosado4 from "@/assets/photos/rosado-4.jpg.asset.json";
import exteriorLavanda from "@/assets/photos/exterior-lavanda.jpg.asset.json";
import cocinaCompartida from "@/assets/photos/cocina-compartida.jpg.asset.json";
import patioCompartido from "@/assets/photos/patio-compartido.jpg.asset.json";
import sendero from "@/assets/photos/sendero.jpg.asset.json";
import mesaGaleria from "@/assets/photos/mesa-galeria.jpg.asset.json";
import malbec1 from "@/assets/photos/malbec-1.jpg.asset.json";
import malbec2 from "@/assets/photos/malbec-2.jpg.asset.json";
import malbec3 from "@/assets/photos/malbec-3.jpg.asset.json";
import malbec4 from "@/assets/photos/malbec-4.jpg.asset.json";
import malbec5 from "@/assets/photos/malbec-5.jpg.asset.json";
import exteriorSuculentas from "@/assets/photos/exterior-suculentas.jpg.asset.json";
import exteriorNoche from "@/assets/photos/exterior-noche.jpg.asset.json";
import parrilla from "@/assets/photos/parrilla.jpg.asset.json";
import cabernet1 from "@/assets/photos/cabernet-1.jpg.asset.json";
import cabernet2 from "@/assets/photos/cabernet-2.jpg.asset.json";
import cabernet3 from "@/assets/photos/cabernet-3.jpg.asset.json";
import cabernet4 from "@/assets/photos/cabernet-4.jpg.asset.json";
import cabernet5 from "@/assets/photos/cabernet-5.jpg.asset.json";
import exteriorBarrica from "@/assets/photos/exterior-barrica.jpg.asset.json";
import exteriorCactus from "@/assets/photos/exterior-cactus.jpg.asset.json";
import vistaConjunto from "@/assets/photos/vista-conjunto.jpg.asset.json";
import cocinaExterior from "@/assets/photos/cocina-exterior.jpg.asset.json";
import galeria from "@/assets/photos/galeria.jpg.asset.json";
import cieloNoche from "@/assets/photos/cielo-noche.jpg.asset.json";
import vAereoRocas from "@/assets/videos/cafayate-aereo-rocas.mp4.asset.json";
import vQuebradaPaisaje from "@/assets/videos/quebrada-paisaje.mp4.asset.json";
import vQuebradaAereo from "@/assets/videos/quebrada-aereo.mp4.asset.json";
import vEntradaBarrica from "@/assets/videos/entrada-barrica.mp4.asset.json";

export type Photo = { src: string; alt: string };
const p = (a: { url: string }, alt: string): Photo => ({ src: a.url, alt });

export const img = {
  exteriorBarricas: p(exteriorBarricas, "Fachada curva de las barricas con barrica de roble en primer plano"),
  exteriorLavanda: p(exteriorLavanda, "Las barricas vistas desde el jardín con lavandas"),
  exteriorBarrica: p(exteriorBarrica, "Entrada de madera de una barrica junto a un tonel de roble"),
  exteriorCactus: p(exteriorCactus, "Barrica con cardones en el ingreso"),
  exteriorSuculentas: p(exteriorSuculentas, "Barrica de madera detrás de suculentas"),
  exteriorNoche: p(exteriorNoche, "Exterior de una barrica al anochecer"),
  vistaConjunto: p(vistaConjunto, "Conjunto de barricas bajo el cielo de Cafayate"),
  sendero: p(sendero, "Sendero de piedra entre las barricas"),
  cocinaCompartida: p(cocinaCompartida, "Cocina compartida con anafe y pileta"),
  cocinaExterior: p(cocinaExterior, "Galería con mesa y cocina compartida"),
  parrilla: p(parrilla, "Parrilla y mesada compartidas"),
  patioCompartido: p(patioCompartido, "Patio compartido con mesa y quincho"),
  galeria: p(galeria, "Galería de ladrillo con mesa"),
  mesaGaleria: p(mesaGaleria, "Mesa de madera en la galería"),
  cieloNoche: p(cieloNoche, "Cielo rosado al anochecer sobre los cerros"),
  rosadoBano: p(rosadoBano, "Baño privado de Rosado con bacha rosa"),
  rosadoCamas: p(rosadoCamas, "Interior abovedado de Rosado con muro terracota"),
  rosado1: p(rosado1, "Dormitorio de Rosado con dos camas"),
  rosado2: p(rosado2, "Interior de Rosado mirando hacia la puerta"),
  rosado3: p(rosado3, "Bacha sobre mesada de madera en Rosado"),
  rosado4: p(rosado4, "Baño privado de Rosado"),
  malbec1: p(malbec1, "Dormitorio de Malbec con muro rojo"),
  malbec2: p(malbec2, "Camas de Malbec bajo la bóveda"),
  malbec3: p(malbec3, "Ingreso al baño de Malbec"),
  malbec4: p(malbec4, "Bacha roja sobre mesada de madera en Malbec"),
  malbec5: p(malbec5, "Baño de Malbec con vista al dormitorio"),
  cabernet1: p(cabernet1, "Dormitorio de Cabernet con mesa de barrica"),
  cabernet2: p(cabernet2, "Camas de Cabernet con muro bordó"),
  cabernet3: p(cabernet3, "Interior de Cabernet hacia la entrada"),
  cabernet4: p(cabernet4, "Baño de Cabernet con espejo redondo"),
  cabernet5: p(cabernet5, "Baño privado de Cabernet"),
  cafayateVinedos: p(cafayateVinedos, "Viñedos de Cafayate frente a cerros rojizos al atardecer"),
  quebradaConchas: p(quebradaConchas, "Formaciones rojas de la Quebrada de las Conchas"),
};

export const video = {
  aereoRocas: vAereoRocas.url,
  quebradaPaisaje: vQuebradaPaisaje.url,
  quebradaAereo: vQuebradaAereo.url,
  entradaBarrica: vEntradaBarrica.url,
};
