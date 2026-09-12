import Link from "next/link";
import DelegateRegistrationForm from "@/components/DelegateRegistrationForm";
import Badge from "@/components/ui/Badge";
import { ArrowLeft, Calendar, MapPin, Sparkles, ShieldCheck } from "lucide-react";

export default function RegistrationPage() {
  return (
    <main className="min-h-screen bg-[#050507] text-ivory px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
      {/* Background Velvet Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-rose-950/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl w-full relative z-10 my-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold hover:text-amber-300 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>Back to LMS 2K26 Homepage</span>
        </Link>

        {/* Main Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-amber-500/30 bg-[#0D0B10]/90 backdrop-blur-2xl shadow-2xl shadow-black overflow-hidden">
          {/* Left Invitation Banner */}
          <aside className="lg:col-span-5 relative p-8 sm:p-12 bg-gradient-to-b from-[#18111F] via-[#0E0B14] to-[#08060A] border-b lg:border-b-0 lg:border-r border-amber-500/20 flex flex-col justify-between overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full border border-amber-500/15 pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <Badge variant="gold" size="md">
                Official Registration
              </Badge>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ivory leading-tight">
                JOIN THE <span className="text-gradient-gold">SUMMIT.</span>
              </h1>

              <p className="text-sm sm:text-base text-ivory-muted font-light leading-relaxed">
                Reserve your place at LMS 2K26. Meet bold young minds, explore your leadership potential, and step into an unforgettable conference in Hammamet.
              </p>
            </div>

            {/* Event Info Summary */}
            <div className="mt-12 space-y-4 pt-8 border-t border-white/10 relative z-10 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <span className="font-bold text-ivory block">15–17 March 2026</span>
                  <span className="text-ivory-dark text-[0.7rem]">3 Days of Conference & Galas</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <span className="font-bold text-ivory block">Hammamet, Tunisia</span>
                  <span className="text-ivory-dark text-[0.7rem]">Luxury Seaside Resort</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <span className="font-bold text-ivory block">Leadership Development</span>
                  <span className="text-ivory-dark text-[0.7rem]">Empowerment & Strategic Impact</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Form Section */}
          <section className="lg:col-span-7 p-8 sm:p-12 bg-gradient-to-b from-[#0D0B10] to-[#050507]">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 block mb-1">
                Delegate Application Form
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-ivory">
                Make Your Entrance
              </h2>
              <p className="text-xs text-ivory-dark pt-1">
                Fields marked with * are required to secure your registration.
              </p>
            </div>

            <DelegateRegistrationForm />
          </section>
        </div>
      </div>
    </main>
  );
}
