import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { accommodations, site } from "@/data/site";
import { buildInquiryMessage, validateInquiry, whatsappUrl } from "@/lib/inquiry";

export function InquiryForm({ defaultUnit, compact = false }: { defaultUnit?: string; compact?: boolean }) {
  const [unit, setUnit] = useState(defaultUnit ?? accommodations[0]!.name);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const acc = accommodations.find((a) => a.name === unit);
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { unit, checkIn, checkOut, guests, message };
    const errs = validateInquiry(data, acc?.maxGuests);
    setErrors(errs);
    if (errs.length) return;
    const text = buildInquiryMessage(data);
    if (site.whatsappNumber) window.open(whatsappUrl(site.whatsappNumber, text), "_blank", "noopener");
    else setPreview(text);
  };

  const copy = async () => {
    if (!preview) return;
    await navigator.clipboard.writeText(preview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-7">
      <label className="block">
        <span className="label-meta text-muted-foreground">Barrica</span>
        <select value={unit} onChange={(e) => setUnit(e.target.value)} className="field-line">
          {accommodations.map((a) => (
            <option key={a.id} value={a.name}>{a.displayNumber} — {a.name}{a.provisional ? " (nombre a confirmar)" : ""}</option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-6">
        <label className="block">
          <span className="label-meta text-muted-foreground">Ingreso</span>
          <input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="field-line" required />
        </label>
        <label className="block">
          <span className="label-meta text-muted-foreground">Salida</span>
          <input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="field-line" required />
        </label>
      </div>
      <label className="block">
        <span className="label-meta text-muted-foreground">Huéspedes {acc && !acc.capacityConfirmed ? `(hasta ${acc.maxGuests}, a confirmar)` : ""}</span>
        <input type="number" min={1} max={acc?.maxGuests} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="field-line" />
      </label>
      {!compact && (
        <label className="block">
          <span className="label-meta text-muted-foreground">Consulta adicional (opcional)</span>
          <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className="field-line resize-none" />
        </label>
      )}
      {errors.length > 0 && (
        <ul role="alert" className="space-y-1 text-sm text-destructive">{errors.map((er) => <li key={er}>{er}</li>)}</ul>
      )}
      <button type="submit" className="btn-solid w-full">
        {site.whatsappNumber ? "Consultar por WhatsApp" : "Preparar consulta"} <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
      </button>
      <p className="text-xs text-muted-foreground">Enviar esta consulta no confirma una reserva. Te responderemos con disponibilidad y tarifa.</p>

      {preview && (
        <div className="border-t border-border pt-6 animate-in fade-in duration-500">
          <p className="label-meta mb-3 text-muted-foreground">Tu consulta</p>
          <pre className="whitespace-pre-wrap bg-ivory p-5 font-sans text-sm leading-relaxed">{preview}</pre>
          <p className="mt-3 text-xs text-muted-foreground">El número de WhatsApp todavía no está configurado. Copiá el mensaje para enviarlo por el canal que prefieras.</p>
          <button type="button" onClick={copy} className="btn-ghost mt-4">
            {copied ? <><Check className="h-4 w-4" /> Copiado</> : <><Copy className="h-4 w-4" strokeWidth={1.25} /> Copiar mensaje</>}
          </button>
        </div>
      )}
    </form>
  );
}
