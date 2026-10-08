import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "./utils/cn";

/* ---------- Icons (inline SVG) ---------- */
const Icon = {
  Phone: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2.1Z" />
    </svg>
  ),
  Check: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="m5 12 5 5L20 7" />
    </svg>
  ),
  Chevron: (p: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true" className={p.className}>
      <path d="M9.99997 6.99999C9.99997 6.58098 9.84104 6.15975 9.52097 5.83998L4.93627 1.25945C4.29613 0.619897 3.25867 0.619897 2.61853 1.25945C1.97839 1.899 1.97839 2.93552 2.61853 3.57508L4.84135 5.79587C6.04216 6.99779 4.84135 8.20412 4.84135 8.20412L2.61853 10.4249C1.97839 11.0645 1.97839 12.101 2.61853 12.7405C3.25867 13.3801 4.29613 13.3801 4.93627 12.7405L9.52097 8.16001C9.84104 7.84024 10.0022 7.41901 9.99997 6.99999Z" fill="currentColor" />
      <path d="M1.60476 8.54839C2.49104 8.54839 3.20951 7.83057 3.20951 6.94509C3.20951 6.05962 2.49104 5.3418 1.60476 5.3418C0.718474 5.3418 0 6.05962 0 6.94509C0 7.83057 0.718474 8.54839 1.60476 8.54839Z" fill="currentColor" />
    </svg>
  ),
  Arrow: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Shield: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M12 2 4 5v6c0 5.5 3.4 9.7 8 11 4.6-1.3 8-5.5 8-11V5l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Clock: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  Laptop: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M2 19h20" />
    </svg>
  ),
  Users: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 14.5a5 5 0 0 1 5.5 5" />
    </svg>
  ),
  Lock: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  ),
  Star: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={p.className}>
      <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
    </svg>
  ),
  Plus: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={p.className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Menu: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={p.className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  X: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={p.className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  Clipboard: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <rect x="6" y="4.5" width="12" height="16" rx="2" />
      <path d="M9 4.5h6v-.2A1.8 1.8 0 0 0 13.2 2.5h-2.4A1.8 1.8 0 0 0 9 4.3v.2ZM9 11h6M9 15h4" />
    </svg>
  ),
  Briefcase: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12.5h18" />
    </svg>
  ),
  Heart: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M12 20s-6.5-4.2-6.5-8.4A3.6 3.6 0 0 1 12 9.2a3.6 3.6 0 0 1 6.5 2.4C18.5 15.8 12 20 12 20Z" />
    </svg>
  ),
  Spark: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M12 3.5 13.6 9 19 10.5 13.6 12 12 17.5 10.4 12 5 10.5 10.4 9 12 3.5Z" />
      <path d="M18.5 15.5 19.2 17.6 21.3 18.3 19.2 19 18.5 21.1 17.8 19 15.7 18.3 17.8 17.6 18.5 15.5Z" />
    </svg>
  ),
  User: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </svg>
  ),
  MapPin: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10.5" r="2.6" />
    </svg>
  ),
  ArrowUp: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  ),
};

const PHONE = "(424) 424-1838";
const PHONE_HREF = "tel:+14244241838";
const LOGO_SRC = "https://raw.githubusercontent.com/Binec/newview-lp/main/src/assets/logoNiuviu.png";

// Base URL for images stored in the GitHub repository (branch main)
const IMG_BASE = "https://raw.githubusercontent.com/Binec/newview-lp2/main/public/images/";

/* ---------- Shared bits ---------- */
function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="inline-flex shrink-0 items-center" aria-label="NuView Treatment Center - home">
      <img
        src={LOGO_SRC}
        alt="NuView Treatment Center"
        className={cn(
          "h-9 w-auto max-w-[168px] object-contain object-left transition-opacity duration-300 sm:h-10 sm:max-w-[196px]",
          light && "brightness-0 invert",
        )}
      />
    </a>
  );
}

function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand glass-brand sm:px-3.5 sm:text-[12px] sm:tracking-[0.14em]", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}

function Button({
  children, variant = "primary", href = "#verify", className, icon = true,
}: { children: React.ReactNode; variant?: "primary" | "call" | "ghost" | "glass"; href?: string; className?: string; icon?: boolean }) {
  const base = "group inline-flex items-center justify-center gap-2 rounded-full text-[15px] font-semibold transition-all duration-300";
  const styles = {
    primary: "bg-brand px-6 py-3.5 text-white shadow-[0_10px_24px_-10px_rgba(26,131,121,0.9)] hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_14px_30px_-10px_rgba(17,35,47,0.7)]",
    call: "border border-brand/30 bg-white px-5 py-3.5 text-brand hover:border-brand hover:bg-mint",
    ghost: "border border-white/80 bg-white/70 px-6 py-3.5 text-ink backdrop-blur-xl hover:bg-white",
    glass: "border border-white/25 bg-white/10 px-6 py-3.5 text-white backdrop-blur-xl hover:bg-white/18",
  }[variant];
  return (
    <a href={href} className={cn(base, styles, className)}>
      {icon && variant === "primary" && <Icon.Shield className="h-4 w-4 shrink-0" />}
      {icon && variant === "call" && <Icon.Phone className="h-4 w-4 shrink-0" />}
      {children}
    </a>
  );
}

/* ---------- Navbar ---------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(100, (y / h) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div aria-hidden="true" className="header-aura pointer-events-none absolute inset-x-0 top-0 h-[calc(100%+28px)]" />
      <div className={cn("glass-header relative transition-all duration-300", scrolled && "is-scrolled")}>
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-3 px-4 sm:px-5">
          <Logo />
          <div className="flex items-center gap-2">
            <Button variant="call" href={PHONE_HREF} className="hidden border-white/70 bg-white/85 px-4 py-2.5 shadow-sm backdrop-blur-xl sm:inline-flex">{PHONE}</Button>
            <Button className="px-4 py-2.5 sm:px-5">
              <span className="hidden sm:inline">Verify Insurance</span>
              <span className="sm:hidden">Verify</span>
            </Button>
          </div>
        </div>

        <div aria-hidden="true" className="relative h-[3px] w-full overflow-hidden bg-ink/5">
          <div
            className="h-full w-full origin-left bg-brand transition-transform duration-150 ease-out"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-12 sm:pt-36 sm:pb-16 lg:pb-24">
      <div className="pointer-events-none absolute -top-32 -left-24 h-[480px] w-[480px] rounded-full bg-brand/25 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute top-40 -right-32 h-[420px] w-[420px] rounded-full bg-sky/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-mint blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
        <div className="animate-rise">
          <Eyebrow>Los Angeles · In-person & virtual</Eyebrow>
          <h1 className="mt-5 text-[34px] font-semibold leading-[1.12] tracking-tight text-ink sm:mt-6 sm:text-[50px] lg:text-[58px]">
            Treatment that fits around <em className="em-serif text-brand">your life</em>, not the other way around.
          </h1>
          <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-steel sm:mt-6 sm:text-[17px]">
            Flexible PHP & IOP outpatient programs built for working professionals. Morning, evening and virtual tracks — so you can get well without stepping away from your career or family.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button className="w-full sm:w-auto">Verify Insurance Now</Button>
            <Button variant="call" href={PHONE_HREF} className="w-full sm:w-auto">Call {PHONE}</Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink">
            {["Same-day admissions", "Most PPO insurance accepted", "100% confidential"].map((t) => (
              <li key={t} className="flex items-center gap-2.5"><Icon.Chevron className="h-3.5 w-2.5 shrink-0 text-brand" />{t}</li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
          <div className="relative overflow-hidden rounded-[32px] border border-white/60 shadow-[0_40px_80px_-40px_rgba(17,35,47,0.6)]">
            <img src={`${IMG_BASE}hero.jpg`} alt="Calm group session in a bright treatment lounge" className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </div>
          <div className="glass-float absolute left-4 top-4 rounded-2xl px-4 py-3 backdrop-blur-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-steel">Avg. verification</p>
            <p className="text-2xl font-semibold text-ink">30 <span className="text-base font-medium">min</span></p>
          </div>
           <div className="glass-float absolute right-4 top-1/3 mt-[80px] rounded-2xl px-4 py-3 backdrop-blur-2xl sm:mt-0">
            <div className="flex items-center gap-1 text-peach">{[0,1,2,3,4].map(i => <Icon.Star key={i} className="h-3.5 w-3.5" />)}</div>
            <p className="mt-1 text-xs font-medium text-ink">4.9 · 300+ reviews</p>
          </div>
          <div className="glass-float-dark absolute bottom-4 left-4 right-4 rounded-2xl p-4 text-white backdrop-blur-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/70">Next intake</p>
                <p className="font-semibold">Today · 2 spots open</p>
              </div>
              <a href="#verify" className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink transition hover:bg-mint">Reserve</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust marquee ---------- */
const LOGO_UP = "https://help.nuviewtreatment.com/wp-content/uploads";
const INSURER_LOGOS = [
  { name: "Cigna", logo: `${LOGO_UP}/2025/09/cigna.webp` },
  { name: "Horizon", logo: `${LOGO_UP}/2025/09/horizon.webp` },
  { name: "Aetna", logo: `${LOGO_UP}/2025/09/aetna.webp` },
  { name: "Tufts", logo: `${LOGO_UP}/2025/09/tufts.webp` },
  { name: "Blue Cross", logo: `${LOGO_UP}/2025/09/blue-cross.webp` },
  { name: "Anthem", logo: `${LOGO_UP}/2025/09/anthem.webp` },
  { name: "Beacon", logo: `${LOGO_UP}/2025/09/beacon.webp` },
  { name: "AmeriHealth", logo: `${LOGO_UP}/2025/09/amerihealth.webp` },
  { name: "TriCare", logo: `${LOGO_UP}/2025/11/tricare-1024x514.png` },
  { name: "TriCare West", logo: `${LOGO_UP}/2025/11/tricare-west.png` },
  { name: "MultiPlan", logo: `${LOGO_UP}/2025/11/multiplan-1024x182.png` },
];

function InsurerLogo({ name, logo }: { name: string; logo: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="group flex h-16 w-40 shrink-0 items-center justify-center rounded-xl border border-white/70 bg-white/80 px-5 shadow-[0_10px_24px_-18px_rgba(17,35,47,0.45)] sm:h-[72px] sm:w-44">
      {failed ? (
        <span className="text-[15px] font-semibold text-ink/70">{name}</span>
      ) : (
        <img
          src={logo}
          alt={`${name} logo`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="max-h-9 w-auto max-w-full object-contain grayscale opacity-70 transition-[filter,opacity] duration-300 group-hover:grayscale-0 group-hover:opacity-100 sm:max-h-10"
        />
      )}
    </span>
  );
}

function TrustBar() {
  const list = [...INSURER_LOGOS, ...INSURER_LOGOS];
  return (
    <section className="relative py-6" aria-label="Insurance providers we work with">
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass marquee-mask marquee-paused overflow-hidden rounded-2xl px-2 py-4">
          <div className="marquee-track flex w-max animate-marquee items-center gap-4 pr-4">
            {list.map((ins, i) => (
              <div key={`${ins.name}-${i}`} aria-hidden={i >= INSURER_LOGOS.length}>
                <InsurerLogo name={ins.name} logo={ins.logo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Programs ---------- */
function Programs() {
  const programs = [
    {
      img: `${IMG_BASE}php.jpg`, short: "Daytime",
      tag: "PHP", title: "Partial Hospitalization", hours: "5–6 hrs/day · 5 days/wk",
      desc: "Structured, full-day clinical care without an overnight stay. Ideal when you need intensive support but want to sleep in your own bed.",
      items: ["Individual + group therapy daily", "Psychiatric care & medication management", "Return home each evening"],
      accent: "bg-brand",
    },
    {
      img: `${IMG_BASE}iop.jpg`, short: "AM / PM tracks",
      tag: "IOP", title: "Intensive Outpatient", hours: "3 hrs/day · 3–5 days/wk",
      desc: "Morning or evening tracks that fit around a workday. Keep your job, your routine and your privacy while you heal.",
      items: ["7am & 6pm tracks available", "Career-aware scheduling", "Family sessions included"],
      accent: "bg-brand",
      featured: true,
    },
    {
      img: `${IMG_BASE}virtual.jpg`, short: "Telehealth",
      tag: "Virtual", title: "Telehealth IOP", hours: "Secure video · Anywhere in CA",
      desc: "The same licensed clinicians and small groups — delivered through HIPAA-compliant video from wherever you are.",
      items: ["No commute, no waiting room", "Same evidence-based curriculum", "Private 1:1 check-ins"],
      accent: "bg-brand",
    },
  ];
  return (
    <section id="programs" className="relative py-14 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute right-0 top-20 h-[380px] w-[380px] rounded-full bg-brand/15 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Programs</Eyebrow>
          <h2 className="mt-5 text-[30px] font-semibold leading-tight tracking-tight text-ink sm:text-[44px]">Three levels of care. One <em className="em-serif text-brand">continuous path.</em></h2>
          <p className="mt-4 text-[15px] text-steel sm:text-base">Step down as you grow stronger — without switching teams, locations or starting over.</p>
        </div>

        <div className="mt-10 grid items-stretch gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, idx) => (
            <article key={p.tag} className={cn(
              "group relative flex flex-col overflow-hidden rounded-[28px] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_36px_70px_-40px_rgba(17,35,47,0.55)]",
              p.featured ? "glass-strong ring-1 ring-brand/25 shadow-[0_36px_70px_-40px_rgba(26,131,121,0.55)]" : "glass",
              idx === programs.length - 1 && programs.length % 2 === 1 && "sm:col-span-2 lg:col-span-1",
            )}>
              {p.featured && <span className="absolute left-5 top-5 z-10 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-lg shadow-brand/40">Most popular</span>}

              <div className={cn("relative h-44 overflow-hidden sm:h-48", idx === programs.length - 1 && programs.length % 2 === 1 && "sm:h-auto sm:w-[38%] sm:shrink-0 lg:h-48 lg:w-full")}>
                <img src={p.img} alt={`${p.title} at NuView Treatment Center`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent" />
                <span className="absolute bottom-3 right-4 rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-xl">{p.short}</span>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{p.tag}</p>
                <h3 className="mt-1.5 text-[21px] font-semibold leading-snug text-ink">{p.title}</h3>
                <span className={cn("mt-3 block h-[3px] w-12 rounded-full transition-all duration-500 group-hover:w-20", p.accent)} aria-hidden="true" />
                <p className="mt-3.5 text-xs font-semibold uppercase tracking-wider text-steel">{p.hours}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-steel">{p.desc}</p>
                <ul className={cn("mt-5 space-y-2.5 border-t border-ink/8 pt-5 pb-6 text-sm text-ink/85", idx === programs.length - 1 && programs.length % 2 === 1 && "sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0 lg:block lg:space-y-2.5")}>
                  {p.items.map((i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Icon.Chevron className="mt-[3px] h-3.5 w-2.5 shrink-0 text-brand" />
                      <span className="leading-snug">{i}</span>
                    </li>
                  ))}
                </ul>
                <a href={PHONE_HREF} className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand/30 px-5 py-3.5 text-[15px] font-semibold text-brand transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-mint">
                  <Icon.Phone className="h-4 w-4 shrink-0" /> Ask about {p.tag}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 flex flex-col items-stretch justify-between gap-4 rounded-[24px] p-4 glass sm:mt-6 sm:flex-row sm:items-center sm:rounded-[26px] sm:p-5 sm:px-7">
          <div className="flex items-start gap-3.5 sm:items-center sm:gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-md shadow-brand/30 sm:h-12 sm:w-12">
              <Icon.Users className="h-5 w-5" />
            </span>
            <p className="text-[14.5px] leading-relaxed text-ink sm:text-[15px]">
              <strong className="font-semibold">Not sure which level fits?</strong>{" "}
              <span className="text-steel">Our team will assess you at no cost and recommend the right program.</span>
            </p>
          </div>
          <div className="w-full shrink-0 sm:w-auto">
            <Button className="w-full px-6 py-3 sm:w-auto">Verify Insurance Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why NuView ---------- */
function Professionals() {
  const reasons = [
    {
      icon: Icon.Clipboard,
      t: "Free Confidential Assessment & Immediate Placement",
      d: "Get evaluated at no cost and start treatment right away. No waiting lists.",
      wide: true,
    },
    {
      icon: Icon.Clock,
      t: "True Flexibility: Virtual, Afternoon & Night Options",
      d: "Evening and afternoon programs designed to work around your job, school, or family commitments. Treatment fits your life, not the other way around.",
    },
    {
      icon: Icon.Briefcase,
      t: "Beyond Recovery: Career & Life Skills Development",
      d: "Job readiness, financial planning, resume building, and real-world skills for lasting success.",
    },
    {
      icon: Icon.Heart,
      t: "Integrated Dual-Diagnosis Care",
      d: "Integrated care for mental health and substance use. We address root causes, not just symptoms.",
    },
    {
      icon: Icon.Spark,
      t: "Personalized, Evidence-Based Care",
      d: "Treatment plans built specifically for you using proven methods like EMDR, CBT, and DBT.",
    },
  ];
  const stats = [
    ["Free", "Confidential assessment"],
    ["Same-day", "Admissions available"],
    ["30 min", "Insurance verification"],
  ];

  return (
    <section id="why" className="relative overflow-hidden bg-[#0c1e2b] py-16 text-white sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-32 top-0 h-[560px] w-[560px] rounded-full bg-brand/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-sky/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
        <div className="relative mx-auto w-full max-w-[380px] pb-10 sm:max-w-[440px] lg:max-w-none lg:pb-0">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#102838] shadow-[0_50px_90px_-46px_rgba(0,0,0,0.75)]">
            <img
              src={`${IMG_BASE}session.jpg`}
              alt="In-person counseling session at NuView"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-2 flex max-w-[220px] items-start gap-3 rounded-2xl bg-white p-3.5 text-ink shadow-[0_28px_50px_-28px_rgba(0,0,0,0.65)] sm:right-0 sm:max-w-[250px] sm:p-4 lg:-right-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/12 text-brand">
              <Icon.Laptop className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[13.5px] font-semibold leading-snug">In-person &amp; virtual options</p>
              <p className="mt-1 text-[12.5px] leading-snug text-steel">Afternoon and evening programming</p>
            </div>
          </div>
        </div>

        <div>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
            <span className="h-px w-7 bg-white/35" />
            Why NuView
          </p>
          <h2 className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-tight sm:text-[46px]">
            Why Choose <em className="em-serif text-white">NuView?</em>
          </h2>
          <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-white/65 sm:text-[15px]">
            Real Results, Real Support — whole-person care that treats the root causes, not just the symptoms, and keeps your life running while you heal.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {reasons.map((r) => {
              const I = r.icon;
              return (
                <article
                  key={r.t}
                  className={cn(
                    "rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.07]",
                    r.wide && "sm:col-span-2",
                  )}
                >
                  <div className={cn(r.wide && "sm:flex sm:items-start sm:gap-4")}>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-white shadow-lg shadow-brand/30">
                      <I className="h-[18px] w-[18px]" />
                    </span>
                    <div className={cn(!r.wide && "mt-4", r.wide && "mt-4 sm:mt-0.5")}>
                      <h3 className="text-[15px] font-semibold leading-snug">{r.t}</h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/58">{r.d}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-3 grid grid-cols-1 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-2 backdrop-blur-xl sm:grid-cols-3 sm:gap-3 sm:divide-y-0 sm:px-6 sm:py-7">
            {stats.map(([value, label]) => (
              <div key={label} className="flex items-baseline justify-between gap-4 py-4 sm:block sm:py-0">
                <p className="font-serif text-[32px] font-bold italic leading-none tracking-tight text-[#8ed9b8] drop-shadow-[0_2px_14px_rgba(142,217,184,0.35)] sm:text-[42px]">{value}</p>
                <p className="text-right text-[12.5px] leading-snug text-white/55 sm:mt-2.5 sm:text-left sm:text-[12px]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Facility gallery ---------- */
const UP = "https://help.nuviewtreatment.com/wp-content/uploads";

type GalleryItem = { src: string; fb: string; alt: string; caption: string };

const GALLERY: GalleryItem[] = [
  { src: `${UP}/2025/09/gallery-1.jpg`, fb: `${IMG_BASE}fac-1.jpg`, alt: "Lounge and seating area at NuView", caption: "Common lounge" },
  { src: `${UP}/2025/09/gallery-2.jpg`, fb: `${IMG_BASE}fac-2.jpg`, alt: "Group therapy room at NuView", caption: "Group room" },
  { src: `${UP}/2025/09/gallery-3.jpg`, fb: `${IMG_BASE}php.jpg`, alt: "Daytime program space at NuView", caption: "Day program" },
  { src: `${UP}/2025/09/gallery-4.jpg`, fb: `${IMG_BASE}iop.jpg`, alt: "Evening group space at NuView", caption: "Evening track" },
  { src: `${UP}/2025/09/gallery-5.jpg`, fb: `${IMG_BASE}fac-3.jpg`, alt: "Activity room at NuView", caption: "Activity room" },
  { src: `${UP}/2025/09/gallery-6.jpg`, fb: `${IMG_BASE}session.jpg`, alt: "One-to-one counseling room at NuView", caption: "Counseling room" },
  { src: `${UP}/2025/09/gallery-7.jpg`, fb: `${IMG_BASE}virtual.jpg`, alt: "Private office at NuView", caption: "Private office" },
  { src: `${UP}/2025/09/gallery-8.jpg`, fb: `${IMG_BASE}hero.jpg`, alt: "Exterior of the Los Angeles center", caption: "Our center" },
];

function SmartImg({ src, fallback, alt, className }: { src: string; fallback: string; alt: string; className?: string }) {
  const [current, setCurrent] = useState(src);
  useEffect(() => setCurrent(src), [src]);
  return (
    <img
      src={current}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setCurrent((c) => (c === fallback ? c : fallback))}
      className={className}
    />
  );
}

function Gallery() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const touchX = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);

  const goTo = useCallback((i: number) => {
    const n = (i + GALLERY.length) % GALLERY.length;
    setIndex(n);
    const track = trackRef.current;
    const child = track?.children[n] as HTMLElement | undefined;
    if (!track || !child) return;
    const tRect = track.getBoundingClientRect();
    const cRect = child.getBoundingClientRect();
    const delta = cRect.left - tRect.left - (track.clientWidth - cRect.width) / 2;
    track.scrollTo({ left: track.scrollLeft + delta, behavior: "smooth" });
  }, []);

  const nextLightbox = useCallback(() => setOpen((o) => ((o ?? 0) + 1) % GALLERY.length), []);
  const prevLightbox = useCallback(() => setOpen((o) => ((o ?? 0) - 1 + GALLERY.length) % GALLERY.length), []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const kids = Array.from(track.children) as HTMLElement[];
        const tRect = track.getBoundingClientRect();
        const center = tRect.left + tRect.width / 2;
        let best = 0;
        let bestDist = Infinity;
        kids.forEach((k, i) => {
          const r = k.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - center);
          if (d < bestDist) { bestDist = d; best = i; }
        });
        setIndex(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { track.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => ((o ?? 0) + 1) % GALLERY.length);
      if (e.key === "ArrowLeft") setOpen((o) => ((o ?? 0) - 1 + GALLERY.length) % GALLERY.length);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    touchY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    const dy = e.changedTouches[0].clientY - (touchY.current ?? 0);
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? nextLightbox : prevLightbox)();
    touchX.current = null;
    touchY.current = null;
  };

  return (
    <section id="facility" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -left-32 top-10 h-[380px] w-[380px] rounded-full bg-mint blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[320px] w-[320px] rounded-full bg-sky/12 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
          <span className="h-px w-8 bg-brand/40" />
          Take a look inside
          <span className="h-px w-8 bg-brand/40" />
        </span>
        <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-ink sm:text-[44px]">
          Explore Our <em className="em-serif text-brand">Facility</em>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-steel">
          Treatment rooms, lounges and outdoor space at our Los Angeles center. Select any photo to view it larger.
        </p>
      </div>

      <div className="relative mt-9">
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 lg:px-8"
        >
          {GALLERY.map((g, i) => (
            <button
              key={g.src}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View photo: ${g.caption}`}
              className={cn(
                "group relative aspect-[4/3] shrink-0 snap-center overflow-hidden rounded-3xl border bg-cloud shadow-[0_28px_60px_-34px_rgba(17,35,47,0.55)] transition-all duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
                "w-[78%] sm:w-[46%] lg:w-[31%]",
                i === index ? "border-brand/35" : "border-white/70",
              )}
            >
              <SmartImg
                src={g.src}
                fallback={g.fb}
                alt={g.alt}
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-95" />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[12px] font-semibold text-white backdrop-blur-xl">
                {g.caption}
              </span>
            </button>
          ))}
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#eef5f4] to-transparent lg:w-16" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#eef5f4] to-transparent lg:w-16" />

        <div className="mt-3 flex items-center justify-center gap-4 px-4 md:hidden">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous photo"
            className="grid h-11 w-11 place-items-center rounded-full border border-brand/30 bg-white text-brand shadow-sm transition hover:bg-mint"
          >
            <Icon.Arrow className="h-4 w-4 rotate-180" />
          </button>
          <p className="text-[13px] text-steel">Swipe to explore</p>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next photo"
            className="grid h-11 w-11 place-items-center rounded-full border border-brand/30 bg-white text-brand shadow-sm transition hover:bg-mint"
          >
            <Icon.Arrow className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {GALLERY.map((g, i) => (
            <button
              key={`dot-${g.src}`}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "relative h-2 rounded-full transition-all duration-300 before:absolute before:-inset-x-1.5 before:-inset-y-3 before:content-['']",
                i === index ? "w-7 bg-brand" : "w-2 bg-ink/20 hover:bg-brand/50",
              )}
            />
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Facility photo viewer"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(null); }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-4 bg-ink/92 p-4 backdrop-blur-xl"
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/20"
          >
            <Icon.X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={prevLightbox}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/20 sm:left-6 sm:grid"
          >
            <Icon.Arrow className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={nextLightbox}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/20 sm:right-6 sm:grid"
          >
            <Icon.Arrow className="h-5 w-5" />
          </button>

          <SmartImg
            key={GALLERY[open].src}
            src={GALLERY[open].src}
            fallback={GALLERY[open].fb}
            alt={GALLERY[open].alt}
            className="max-h-[66vh] w-full max-w-5xl rounded-2xl object-contain shadow-[0_50px_100px_-50px_rgba(0,0,0,0.9)] sm:max-h-[72vh]"
          />
          <div className="flex items-center gap-4 text-white">
            <button
              type="button"
              onClick={prevLightbox}
              aria-label="Previous photo"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-xl transition active:bg-white/25 sm:hidden"
            >
              <Icon.Arrow className="h-4 w-4 rotate-180" />
            </button>
            <div className="flex min-w-[120px] items-center justify-center gap-3">
              <p className="text-[15px] font-semibold">{GALLERY[open].caption}</p>
              <span className="h-3 w-px bg-white/30" />
              <p className="text-[13px] tabular-nums text-white/60">
                {open + 1} / {GALLERY.length}
              </p>
            </div>
            <button
              type="button"
              onClick={nextLightbox}
              aria-label="Next photo"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-xl transition active:bg-white/25 sm:hidden"
            >
              <Icon.Arrow className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- Insurance verification ---------- */
const INSURERS = ["Cigna", "Horizon", "Aetna", "Tufts", "Blue Cross", "Anthem", "Beacon", "AmeriHealth", "TriCare", "TriCare West", "MultiPlan"];

type VerifyFields = {
  forWhom: "Myself" | "A loved one";
  first: string;
  last: string;
  phone: string;
  email: string;
  dob: string;
  insurer: string;
  memberId: string;
};

const digits = (v: string) => v.replace(/\D/g, "");
const formatPhone = (v: string) => {
  const d = digits(v).slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

function Err({ id, msg }: { id: string; msg: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-ink/75">
      <span aria-hidden="true" className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-peach text-[10px] font-bold leading-none text-ink">!</span>
      {msg}
    </p>
  );
}

function Verify() {
  const [fields, setFields] = useState<VerifyFields>({
    forWhom: "Myself", first: "", last: "", phone: "", email: "", dob: "", insurer: "", memberId: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = <K extends keyof VerifyFields>(key: K, value: VerifyFields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (fields.first.trim().length < 2) e.first = "Enter a first name.";
    if (fields.last.trim().length < 2) e.last = "Enter a last name.";
    if (digits(fields.phone).length !== 10) e.phone = "Enter a 10-digit phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(fields.email.trim())) e.email = "Enter a valid email address.";
    if (!fields.insurer.trim()) e.insurer = "Enter your insurance provider.";
    setErrors(e);
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const keys = Object.keys(validate());
    if (keys.length) {
      document.getElementById(`vf-${keys[0]}`)?.focus();
      return;
    }
    setSent(true);
  };

  const input =
    "w-full min-w-0 rounded-2xl border bg-cloud/60 px-4 py-3.5 text-[16px] text-ink outline-none transition-all duration-200 placeholder:text-steel/60 focus:bg-white focus:ring-4 sm:py-4 sm:text-[15.5px]";
  const ok = "border-fog/60 focus:border-brand focus:ring-brand/15";
  const bad = "border-peach bg-peach/10 focus:border-peach focus:ring-peach/30";
  const label = "block text-[14px] font-semibold text-ink";
  const req = <span className="text-brand">*</span>;

  const reasons = [
    { icon: Icon.Clock, t: "Response within 30 minutes", d: "During business hours, Monday to Friday." },
    { icon: Icon.Lock, t: "Private and confidential", d: "Your information is never shared or sold." },
    { icon: Icon.Shield, t: "No obligation", d: "Verification is free and doesn't commit you to anything." },
  ];
  const forOptions = [
    { value: "Myself" as const, text: "For myself", icon: Icon.User },
    { value: "A loved one" as const, text: "For loved one", icon: Icon.Heart },
  ];

  return (
    <section id="verify" className="relative isolate overflow-hidden py-14 sm:py-20 lg:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img src={`${IMG_BASE}virtual.jpg`} alt="" className="h-full w-full scale-105 object-cover" />
        <div className="absolute inset-0 bg-ink/80 backdrop-blur-[6px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink/70 via-transparent to-brand/30" />
      </div>

      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
        <div className="text-white lg:pt-4">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-mint">
            <span className="h-px w-8 bg-mint/50" />
            Coverage check
          </span>
          <h2 className="mt-4 text-[30px] font-semibold leading-[1.15] tracking-tight sm:text-[40px]">
            Check Your <em className="em-serif text-mint">Coverage Today</em>
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-fog sm:mt-5 sm:text-[16.5px]">
            Insurance may cover 100% of your treatment costs. Don’t see yours? We accept many plans not listed here. Complete the form, and our team will verify your benefits and contact you within 30 minutes.
          </p>

          <ul className="mt-7 space-y-4 sm:mt-8">
            {reasons.map(({ icon: I, t, d }) => (
              <li key={t} className="flex gap-3.5 sm:gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/10 text-mint backdrop-blur-xl sm:h-11 sm:w-11">
                  <I className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[15.5px] font-semibold text-white">{t}</span>
                  <span className="block text-[13.5px] text-fog">{d}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-7 rounded-3xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur-2xl sm:mt-9 sm:p-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-mint sm:text-[12.5px]">In network with</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {INSURERS.slice(0, 8).map((name) => (
                <span key={name} className="rounded-full border border-white/15 px-3 py-1.5 text-[12.5px] font-medium text-fog">
                  {name}
                </span>
              ))}
              <span className="rounded-full border border-white/15 px-3 py-1.5 text-[12.5px] font-medium text-fog">+ more</span>
            </div>
          </div>
          <p className="mt-5 text-[15px] text-fog sm:mt-6">Prefer to talk?</p>
          <Button variant="call" href={PHONE_HREF} className="mt-3 w-full sm:w-auto">Call {PHONE}</Button>
        </div>

        <div className="rounded-[24px] bg-white p-5 shadow-[0_50px_100px_-50px_rgba(0,0,0,0.8)] ring-1 ring-white/40 sm:rounded-[28px] sm:p-8">
          {sent ? (
            <div className="flex min-h-[340px] flex-col items-center justify-center text-center animate-rise sm:min-h-[460px]">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-white shadow-[0_14px_30px_-10px_rgba(26,131,121,0.8)]">
                <Icon.Check className="h-8 w-8" />
              </span>
              <h3 className="mt-6 text-[24px] font-semibold tracking-tight text-ink">Thanks, {fields.first.trim()}!</h3>
              <p className="mt-3 max-w-sm text-[15.5px] leading-relaxed text-steel">
                Our team is reviewing your {fields.insurer.trim()} benefits now and will contact you within 30 minutes at{" "}
                <span className="font-semibold text-ink">{fields.phone}</span>.
              </p>
              <Button variant="call" href={PHONE_HREF} className="mt-6">Call {PHONE}</Button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:justify-between sm:gap-4">
                <h3 className="text-[24px] font-semibold leading-tight tracking-tight text-ink sm:text-[30px]">Verify Your Insurance</h3>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-mint px-3 py-2 text-[12.5px] font-medium text-ink sm:px-3.5 sm:py-2.5 sm:text-[13px]">
                  <Icon.Lock className="h-4 w-4 text-brand" />
                  HIPAA-secure
                </span>
              </div>
              <p className="mt-3 text-[14px] text-steel/80">“{req}” indicates required fields</p>

              <fieldset className="mt-5">
                <legend className="sr-only">Who is this for?</legend>
                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-cloud p-1.5">
                  {forOptions.map(({ value, text, icon: I }) => {
                    const active = fields.forWhom === value;
                    return (
                      <label
                        key={value}
                        className={cn(
                          "flex cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-3 text-[14.5px] font-semibold transition-all duration-300 has-focus-visible:ring-2 has-focus-visible:ring-brand/40",
                          active ? "bg-white text-ink shadow-[0_10px_24px_-16px_rgba(17,35,47,0.6)]" : "text-steel hover:text-ink",
                        )}
                      >
                        <input type="radio" name="forWhom" value={value} checked={active} onChange={() => set("forWhom", value)} className="sr-only" />
                        <I className={cn("h-4 w-4", active ? "text-brand" : "text-fog")} />
                        {text}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-5 space-y-4">
                <div>
                  <span className={label}>Full Name {req}</span>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="vf-first" className="sr-only">First name</label>
                      <input
                        id="vf-first" name="first" autoComplete="given-name" placeholder="First name"
                        value={fields.first} onChange={(e) => set("first", e.target.value)}
                        aria-invalid={Boolean(errors.first)} aria-describedby={errors.first ? "vf-first-err" : undefined}
                        className={cn(input, errors.first ? bad : ok)}
                      />
                      {errors.first && <Err id="vf-first-err" msg={errors.first} />}
                    </div>
                    <div>
                      <label htmlFor="vf-last" className="sr-only">Last name</label>
                      <input
                        id="vf-last" name="last" autoComplete="family-name" placeholder="Last name"
                        value={fields.last} onChange={(e) => set("last", e.target.value)}
                        aria-invalid={Boolean(errors.last)} aria-describedby={errors.last ? "vf-last-err" : undefined}
                        className={cn(input, errors.last ? bad : ok)}
                      />
                      {errors.last && <Err id="vf-last-err" msg={errors.last} />}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="vf-phone" className={label}>Phone {req}</label>
                    <input
                      id="vf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(555) 555-5555"
                      value={fields.phone} onChange={(e) => set("phone", formatPhone(e.target.value))}
                      aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "vf-phone-err" : undefined}
                      className={cn(input, "mt-2 tabular-nums", errors.phone ? bad : ok)}
                    />
                    {errors.phone && <Err id="vf-phone-err" msg={errors.phone} />}
                  </div>
                  <div>
                    <label htmlFor="vf-email" className={label}>Email {req}</label>
                    <input
                      id="vf-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com"
                      value={fields.email} onChange={(e) => set("email", e.target.value)}
                      aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "vf-email-err" : undefined}
                      className={cn(input, "mt-2", errors.email ? bad : ok)}
                    />
                    {errors.email && <Err id="vf-email-err" msg={errors.email} />}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="vf-dob" className={label}>DOB</label>
                    <input
                      id="vf-dob" name="dob" type="date" autoComplete="bday"
                      value={fields.dob} onChange={(e) => set("dob", e.target.value)}
                      className={cn(input, "mt-2 min-h-[54px] appearance-none text-left sm:min-h-[58px] [&::-webkit-date-and-time-value]:text-left", ok)}
                    />
                  </div>
                  <div>
                    <label htmlFor="vf-insurer" className={label}>Insurance Provider {req}</label>
                    <input
                      id="vf-insurer" name="insurer" list="vf-insurers" autoComplete="off" placeholder="Start typing…"
                      value={fields.insurer} onChange={(e) => set("insurer", e.target.value)}
                      aria-invalid={Boolean(errors.insurer)} aria-describedby={errors.insurer ? "vf-insurer-err" : undefined}
                      className={cn(input, "mt-2", errors.insurer ? bad : ok)}
                    />
                    <datalist id="vf-insurers">
                      {INSURERS.map((name) => <option key={name} value={name} />)}
                    </datalist>
                    {errors.insurer && <Err id="vf-insurer-err" msg={errors.insurer} />}
                  </div>
                </div>

                <div>
                  <label htmlFor="vf-memberId" className={label}>Member ID Policy Number</label>
                  <input
                    id="vf-memberId" name="memberId" autoComplete="off"
                    value={fields.memberId} onChange={(e) => set("memberId", e.target.value)}
                    className={cn(input, "mt-2", ok)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-[16px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(26,131,121,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_14px_30px_-10px_rgba(17,35,47,0.7)]"
              >
                <Icon.Shield className="h-5 w-5 shrink-0" />
                Verify My Insurance
              </button>

              <p className="mt-5 text-center text-[13px] leading-relaxed text-steel">
                Confidential and secure. Submitting this form does not obligate you to begin treatment. By submitting, you agree to be contacted by NuView Treatment Center about your benefits and options. We do not accept Medicaid, Medicare, or Kaiser.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Stories() {
  const stories = [
    { q: "I ran a 40-person team the entire time I was in IOP. Nobody at work knew, and honestly, I became a better manager because of it.", n: "Daniel R.", r: "VP Engineering · Alumni 2024" },
    { q: "The evening track saved my career. I could be in court by 9am and in group by 6pm. The clinicians actually understood that pressure.", n: "Priya M.", r: "Attorney · Alumni 2023" },
    { q: "Switching to virtual for two weeks while I traveled was seamless. Same group, same therapist, zero disruption.", n: "Marcus T.", r: "Founder · Alumni 2024" },
  ];
  return (
    <section id="stories" className="relative py-14 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-brand/15 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Eyebrow>Stories</Eyebrow>
            <h2 className="mt-5 text-[30px] font-semibold leading-tight tracking-tight text-ink sm:text-[44px]">Real people. Real careers. <em className="em-serif text-brand">Real recovery.</em></h2>
          </div>
          <div className="flex items-center gap-3 rounded-full px-4 py-2 glass w-fit">
            <div className="flex text-peach">{[0,1,2,3,4].map(i => <Icon.Star key={i} className="h-4 w-4" />)}</div>
            <span className="text-sm font-semibold text-ink">4.9 <span className="font-normal text-steel">on Google</span></span>
          </div>
        </div>
        <div className="mt-9 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3">
          {stories.map((s) => (
            <figure key={s.n} className="flex flex-col justify-between rounded-[24px] p-6 glass transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/75 sm:rounded-[28px] sm:p-7">
              <blockquote>
                <span className="font-serif text-6xl leading-none text-brand/30">"</span>
                <p className="-mt-4 text-[15.5px] leading-relaxed text-ink/85">{s.q}</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-deep text-sm font-bold text-white">{s.n[0]}</span>
                <div><p className="text-sm font-semibold text-ink">{s.n}</p><p className="text-xs text-steel">{s.r}</p></div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const faqs = [
    { q: "What's the difference between PHP and IOP?", a: "PHP (Partial Hospitalization) is our most structured outpatient level — roughly 5–6 hours a day, five days a week. IOP (Intensive Outpatient) is about 3 hours a day, 3–5 days a week, and offers morning or evening tracks so you can keep working." },
    { q: "Will my employer find out?", a: "No. Your treatment is protected by HIPAA and we never contact an employer without your written consent. If you choose to use FMLA or short-term disability, we'll help with the paperwork discreetly." },
    { q: "How much will it cost with insurance?", a: "It depends on your plan, but most PPO policies cover the majority of outpatient care. We verify your benefits for free and explain any deductible or co-pay before you commit to anything." },
    { q: "Can I start today?", a: "Often, yes. Same-day admissions are available most weekdays for both in-person and virtual programs once your assessment is complete." },
    { q: "Is virtual treatment as effective?", a: "Research shows telehealth IOP produces comparable outcomes to in-person care for most clients. You get the same licensed clinicians, the same curriculum, and the same small groups — just through secure video." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-14 sm:py-20 lg:py-28">
      <div className="relative mx-auto max-w-3xl px-4">
        <div className="text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-5 text-[30px] font-semibold leading-tight tracking-tight text-ink sm:text-[44px]">Questions we hear <em className="em-serif text-brand">most.</em></h2>
        </div>
        <div className="mt-9 space-y-3 sm:mt-12">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={cn("rounded-2xl transition-all duration-300", isOpen ? "glass-strong" : "glass hover:bg-white/70")}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5">
                  <span className="text-[15px] font-semibold leading-snug text-ink sm:text-base">{f.q}</span>
                  <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300", isOpen ? "rotate-45 bg-brand text-white" : "bg-white/80 text-brand")}><Icon.Plus className="h-4 w-4" /></span>
                </button>
                <div className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <div className="overflow-hidden"><p className="px-5 pb-5 text-[14.5px] leading-relaxed text-steel sm:px-6 sm:pb-6 sm:text-[15px]">{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA + Footer ---------- */
function CountUpStat({
  target,
  suffix = "",
  active,
  delay = 0,
}: {
  target: number;
  suffix?: string;
  active: boolean;
  delay?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    let timer = 0;
    const duration = 1250;
    timer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [active, delay, target]);

  return (
    <>
      <span aria-hidden="true">{value}{suffix}</span>
      <span className="sr-only">{target}{suffix}</span>
    </>
  );
}

function FinalCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || started) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [started]);

  const stats = [
    { target: 30, suffix: " min", label: "Avg. verification" },
    { text: "Same day", label: "Admissions" },
    { target: 5, suffix: ":1", label: "Client-to-clinician" },
    { target: 92, suffix: "%", label: "Would recommend" },
  ];

  return (
    <section ref={sectionRef} className="relative px-4 pb-14 pt-4 sm:pb-20 sm:pt-6 lg:pb-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-gradient-to-br from-ink via-[#163744] to-brand-deep p-6 text-white sm:rounded-[36px] sm:p-12 lg:p-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-sky/25 blur-3xl" />
        <div className="relative grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] backdrop-blur-xl sm:px-3.5 sm:text-[12px] sm:tracking-[0.14em]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />Admissions open 24/7</span>
            <h2 className="mt-5 text-[length:clamp(22px,7vw,34px)] font-semibold leading-tight tracking-tight sm:mt-6 sm:text-[46px]">The first step is a <em className="em-serif whitespace-nowrap text-mint">10-minute conversation.</em></h2>
            <p className="mt-4 max-w-lg text-[15px] text-white/75 sm:text-base">No pressure, no commitment. Just honest answers about what treatment could look like for you.</p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
              <Button className="w-full sm:w-auto">Verify Insurance Now</Button>
              <Button variant="call" href={PHONE_HREF} className="w-full sm:w-auto">{PHONE}</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "rounded-2xl p-4 glass-dark transition-[opacity,transform] duration-700 sm:p-5",
                  started ? "translate-y-0 opacity-100" : "translate-y-3 opacity-70",
                )}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <p className="text-[26px] font-semibold leading-tight tabular-nums sm:text-4xl">
                  {stat.target !== undefined ? (
                    <CountUpStat target={stat.target} suffix={stat.suffix} active={started} delay={i * 120} />
                  ) : (
                    stat.text
                  )}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-white/60 sm:text-xs sm:tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const ADDRESS = "2370 S Robertson Blvd, Los Angeles, CA 90034";

const FOOTER_NAV = [
  { id: "programs", label: "Levels of Care" },
  { id: "verify", label: "Insurance" },
  { id: "why", label: "Why NuView" },
  { id: "facility", label: "Facility" },
  { id: "stories", label: "Reviews" },
  { id: "faq", label: "FAQ" },
];

function Footer() {
  return (
    <footer className="bg-ink pb-24 pt-16 text-fog lg:pb-16">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed">
              A premier outpatient treatment center in Los Angeles offering flexible PHP, IOP and virtual care built around your life.
            </p>
            <a
              href={PHONE_HREF}
              aria-label={`Call NuView Treatment Center at ${PHONE}`}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-brand/30 bg-white px-4 py-2.5 text-[15px] font-semibold text-brand transition-all duration-300 hover:border-brand hover:bg-mint"
            >
              <Icon.Phone className="h-4 w-4 shrink-0" />
              <span className="tabular-nums">{PHONE}</span>
            </a>
          </div>

          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-mint">On this page</h3>
            <ul className="mt-5 space-y-3 text-[14.5px]">
              {FOOTER_NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="transition-colors hover:text-white">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-mint">Visit us</h3>
            <ul className="mt-5 space-y-4 text-[14.5px]">
              <li className="flex gap-3">
                <Icon.MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-mint" />
                <span>{ADDRESS}</span>
              </li>
              <li className="flex gap-3">
                <Icon.Clock className="mt-0.5 h-5 w-5 shrink-0 text-mint" />
                <span>Admissions line open 7 days a week</span>
              </li>
              <li className="flex gap-3">
                <Icon.Laptop className="mt-0.5 h-[18px] w-[18px] shrink-0 text-mint" />
                <span>In-person &amp; virtual appointments</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/12 pt-8">
          <p className="text-[12.5px] leading-relaxed text-fog/80">
            Please note: we do not accept Medicaid, Medicare, or Kaiser. Insurance may cover 100% of the costs associated with treatment. If you are experiencing a medical emergency or are in immediate danger, call 911 or go to your nearest emergency room.
          </p>
          <p className="mt-5 text-[12.5px] text-fog/70">
            © {new Date().getFullYear()} NuView Treatment Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function StickyMobileCTA() {
  return (
    <a
      href={PHONE_HREF}
      aria-label={`Call NuView Treatment Center at ${PHONE}`}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 inline-flex items-center justify-center gap-2 rounded-full border border-brand/30 bg-white px-4 py-2.5 text-[15px] font-semibold text-brand shadow-[0_18px_40px_-20px_rgba(17,35,47,0.6)] transition-all duration-300 hover:border-brand hover:bg-mint lg:hidden"
    >
      <Icon.Phone className="h-4 w-4 shrink-0" />
      Call Now
    </a>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 1200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-8 right-5 z-40 hidden h-12 w-12 place-items-center rounded-full border border-brand/25 bg-white text-brand shadow-[0_18px_40px_-20px_rgba(17,35,47,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-white lg:grid",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <Icon.ArrowUp className="h-5 w-5" />
    </button>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(60%_50%_at_20%_0%,rgba(26,131,121,0.18),transparent_60%),radial-gradient(50%_40%_at_90%_20%,rgba(14,194,247,0.12),transparent_60%),radial-gradient(60%_60%_at_50%_100%,rgba(230,249,247,0.9),transparent_60%)]" />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Programs />
        <Professionals />
        <Gallery />
        <Stories />
        <FAQ />
        <FinalCTA />
        <Verify />
      </main>
      <Footer />
      <StickyMobileCTA />
      <BackToTop />
    </div>
  );
}