"use client";

import { FormEvent, useState } from "react";
import Button from "./ui/Button";
import { CheckCircle2, AlertCircle, Shirt } from "lucide-react";

type TshirtSize = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL";
const tshirtSizes: TshirtSize[] = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

const initialForm = {
  full_name: "",
  email: "",
  organization: "",
  position: "",
  phone: "",
  dietary_restrictions: "",
  emergency_contact_name: "",
  emergency_contact_phone: "",
  tshirt_size: "" as TshirtSize | "",
};

export default function DelegateRegistrationForm() {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (name: string, value: string) =>
    setFormData((current) => ({ ...current, [name]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tshirt_size: formData.tshirt_size || undefined,
        }),
      });

      let result: any = {};
      try {
        result = await response.json();
      } catch (parseErr) {
        result = { error: "Server response error. Please try again." };
      }
      if (!response.ok) throw new Error(result.error || "Registration failed. Please try again.");

      setIsSuccess(true);
      setMessage("Your registration has been confirmed! We will contact you with event details.");
      setFormData(initialForm);
    } catch (error) {
      setIsSuccess(false);
      setMessage(error instanceof Error ? error.message : "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-amber-500/20 bg-obsidian-surface/80 px-4 py-3.5 text-sm text-ivory placeholder:text-ivory-dark outline-none transition focus:border-gold focus:ring-2 focus:ring-amber-500/20";
  const labelClass =
    "mb-2 block text-xs font-bold uppercase tracking-wider text-ivory-muted";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Response Alert Message */}
      {message && (
        <div
          className={`flex items-start gap-3 rounded-2xl border p-4 text-sm font-medium ${
            isSuccess
              ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
              : "border-red-500/40 bg-red-950/40 text-red-200"
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          )}
          <span>{message}</span>
        </div>
      )}

      {/* Form Fields Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="full_name" className={labelClass}>
            Full Name *
          </label>
          <input
            id="full_name"
            name="full_name"
            required
            value={formData.full_name}
            onChange={(e) => updateField("full_name", e.target.value)}
            className={inputClass}
            placeholder="e.g. Alexander Vance"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={inputClass}
            placeholder="alexander@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={inputClass}
            placeholder="+216 98 123 456"
          />
        </div>

        <div>
          <label htmlFor="organization" className={labelClass}>
            Organization / University
          </label>
          <input
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={(e) => updateField("organization", e.target.value)}
            className={inputClass}
            placeholder="AIESEC / Company / University"
          />
        </div>

        <div>
          <label htmlFor="position" className={labelClass}>
            Role / Position
          </label>
          <input
            id="position"
            name="position"
            value={formData.position}
            onChange={(e) => updateField("position", e.target.value)}
            className={inputClass}
            placeholder="e.g. Delegate / Team Leader"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="dietary_restrictions" className={labelClass}>
            Dietary Notes or Special Requirements
          </label>
          <textarea
            id="dietary_restrictions"
            name="dietary_restrictions"
            rows={3}
            value={formData.dietary_restrictions}
            onChange={(e) => updateField("dietary_restrictions", e.target.value)}
            className={inputClass}
            placeholder="Let us know about vegetarian, vegan, or allergy requirements"
          />
        </div>

        <div>
          <label htmlFor="emergency_contact_name" className={labelClass}>
            Emergency Contact Name
          </label>
          <input
            id="emergency_contact_name"
            name="emergency_contact_name"
            value={formData.emergency_contact_name}
            onChange={(e) => updateField("emergency_contact_name", e.target.value)}
            className={inputClass}
            placeholder="Full name"
          />
        </div>

        <div>
          <label htmlFor="emergency_contact_phone" className={labelClass}>
            Emergency Contact Phone
          </label>
          <input
            id="emergency_contact_phone"
            name="emergency_contact_phone"
            type="tel"
            value={formData.emergency_contact_phone}
            onChange={(e) => updateField("emergency_contact_phone", e.target.value)}
            className={inputClass}
            placeholder="+216 ..."
          />
        </div>
      </div>

      {/* T-Shirt Size Selector */}
      <div className="pt-2">
        <label className={`${labelClass} flex items-center gap-2`}>
          <Shirt size={14} className="text-gold" />
          <span>Select T-Shirt Size</span>
        </label>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {tshirtSizes.map((size) => {
            const isSelected = formData.tshirt_size === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => updateField("tshirt_size", isSelected ? "" : size)}
                className={`rounded-xl border py-2.5 text-xs font-bold uppercase transition-all cursor-pointer ${
                  isSelected
                    ? "border-amber-400 bg-amber-500 text-obsidian shadow-md shadow-amber-500/20"
                    : "border-amber-500/20 bg-obsidian-surface/60 text-ivory-muted hover:border-amber-500/50 hover:text-ivory"
                }`}
                aria-pressed={isSelected}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full text-center"
        >
          {isSubmitting ? "Processing Registration..." : "Complete Registration"}
        </Button>
      </div>
    </form>
  );
}
