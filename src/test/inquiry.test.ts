import { describe, expect, it } from "vitest";
import { buildInquiryMessage, validateInquiry, whatsappUrl } from "@/lib/inquiry";

const base = { unit: "Malbec", checkIn: "2026-11-10", checkOut: "2026-11-14", guests: 2 };

describe("booking inquiry", () => {
  it("rejects check-out on or before check-in", () => {
    expect(validateInquiry({ ...base, checkOut: "2026-11-10" })).toContain("La fecha de salida debe ser posterior al ingreso.");
  });
  it("rejects zero guests", () => {
    expect(validateInquiry({ ...base, guests: 0 }).length).toBe(1);
  });
  it("rejects more guests than unit capacity", () => {
    expect(validateInquiry({ ...base, guests: 4 }, 3)).toEqual(["Esta barrica admite hasta 3 huéspedes."]);
  });
  it("accepts a valid inquiry", () => {
    expect(validateInquiry(base, 3)).toEqual([]);
  });
  it("builds the Spanish message with formatted dates and encodes the WhatsApp URL", () => {
    const msg = buildInquiryMessage(base);
    expect(msg).toContain("Ingreso: 10/11/2026");
    expect(whatsappUrl("+54 9 3868", msg)).toMatch(/^https:\/\/wa\.me\/5493868\?text=Hola%2C/);
  });
});
