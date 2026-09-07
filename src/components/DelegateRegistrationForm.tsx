"use client";

import { FormEvent, useState } from "react";
import Button from "./ui/Button";
import { CheckCircle2, AlertCircle } from "lucide-react";

const POSITIONS = ["Newbie", "Oldie", "MM", "LCVP", "LCP"];
const DEPARTMENTS = ["OGT", "OGV", "IGT", "IGV", "MKT", "TM", "F&L", "BD&EWA"];

const initialForm = {
  full_name: "",
  email: "",
  organization: "",
  position: "",
  department: "",
  phone: "",
  dietary_restrictions: "",
  emergency_contact_name: "",
  emergency_contact_phone: "",
};

export default function DelegateRegistrationForm() {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (name: string, value: string) =>
    setFormData((current) => ({ ...current, [name]: value }));

  const showDepartment =
    formData.position !== "" &&
    formData.position !== "Newbie" &&
    formData.position !== "LCP";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const finalOrg = showDepartment
        ? (formData.department ? `Department: ${formData.department}` : "")
        : "";

      const response = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          position: formData.position,
          organization: finalOrg,
          dietary_restrictions: formData.dietary_restrictions,
          emergency_contact_name: formData.emergency_contact_name,
          emergency_contact_phone: formData.emergency_contact_phone,
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

        {/* Position / Role Selector */}
        <div className="sm:col-span-2">
          <label className={labelClass}>
            Role / Position *
          </label>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {POSITIONS.map((pos) => {
              const isSelected = formData.position === pos;
              return (
                <button
                  key={pos}
                  type="button"
                  onClick={() => {
                    updateField("position", pos);
                    if (pos === "Newbie" || pos === "LCP") {
                      updateField("department", "");
                    }
                  }}
                  className={`flex-1 min-w-[75px] rounded-xl border py-3 text-xs font-bold transition-all cursor-pointer text-center ${
                    isSelected
                      ? "border-amber-400 bg-gradient-to-r from-amber-500 to-amber-600 text-obsidian shadow-md shadow-amber-500/20 font-extrabold"
                      : "border-amber-500/20 bg-obsidian-surface/60 text-ivory-muted hover:border-amber-500/50 hover:text-ivory"
                  }`}
                >
                  {pos}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Department Selector (shown when position is not Newbie and not LCP) */}
        {showDepartment && (
          <div className="sm:col-span-2">
            <label className={`${labelClass} flex items-center justify-between`}>
              <span>Department *</span>
              <span className="text-[0.65rem] text-amber-400 font-normal">Select your AIESEC Department</span>
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {DEPARTMENTS.map((dept) => {
                const isSelected = formData.department === dept;
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => updateField("department", isSelected ? "" : dept)}
                    className={`rounded-xl border py-2.5 text-xs font-bold uppercase transition-all cursor-pointer text-center ${
                      isSelected
                        ? "border-amber-400 bg-amber-500 text-obsidian shadow-md shadow-amber-500/30 font-extrabold"
                        : "border-amber-500/20 bg-obsidian-surface/60 text-ivory-muted hover:border-amber-500/50 hover:text-ivory"
                    }`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>
          </div>
        )}


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
