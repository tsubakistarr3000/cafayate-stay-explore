export type Inquiry = {
  unit: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message?: string;
};

export function validateInquiry(i: Inquiry, maxGuests?: number): string[] {
  const errors: string[] = [];
  if (!i.unit) errors.push("Elegí una barrica.");
  if (!i.checkIn || !i.checkOut) errors.push("Indicá las fechas de ingreso y salida.");
  else if (i.checkOut <= i.checkIn) errors.push("La fecha de salida debe ser posterior al ingreso.");
  if (!Number.isInteger(i.guests) || i.guests < 1) errors.push("La cantidad de huéspedes debe ser al menos 1.");
  else if (maxGuests && i.guests > maxGuests) errors.push(`Esta barrica admite hasta ${maxGuests} huéspedes.`);
  return errors;
}

const fmt = (d: string) => {
  const [y, m, day] = d.split("-");
  return y && m && day ? `${day}/${m}/${y}` : d;
};

export function buildInquiryMessage(i: Inquiry): string {
  return [
    "Hola, quisiera consultar disponibilidad en Barricas de Cafayate.",
    `Barrica: ${i.unit}`,
    `Ingreso: ${fmt(i.checkIn)}`,
    `Salida: ${fmt(i.checkOut)}`,
    `Huéspedes: ${i.guests}`,
    `Consulta adicional: ${i.message?.trim() || "—"}`,
    "¿Podrían confirmarme disponibilidad y tarifa para esas fechas?",
  ].join("\n");
}

export function whatsappUrl(number: string, text: string): string {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}
