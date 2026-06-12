"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Locale = "es" | "en";

const NAV_LINKS_BASE = [
  { href: "#", icon: "home" as const },
  { href: "#experiencia", icon: "briefcase" as const },
  { href: "#habilidades", icon: "code" as const },
  { href: "#sobre-mi", icon: "user" as const },
];

const SKILLS_KEYS = ["Backend", "Frontend", "Databases", "Tools"] as const;
const SKILLS_ITEMS: Record<string, string[]> = {
  Backend: ["PHP (Laravel)", "Livewire", "RESTful APIs", "React.js", "Vue.js", "Express", "Selenium", "SOAP APIs", "Axios"],
  Frontend: ["React.js", "Vue.js", "AngularJS", "Tailwind", "SASS", "Material Design", "Bootstrap", "HTML", "CSS", "SCSS", "jQuery", "WordPress"],
  Databases: ["PostgreSQL", "MySQL", "MariaDB", "SQLite"],
  Tools: ["AWS", "Docker", "OpenAI API", "Groq API", "aaPanel", "cPanel", "Plesk", "HeidiSQL", "Cursor", "VS Code", "Git/GitHub", "Postman", "SCRUM", "Jira", "Trello"],
};

const TRANSLATIONS: Record<
  Locale,
  {
    nav: string[];
    menu: string;
    menuClose: string;
    hero: { at: string; headlineStart: string; products: string; headlineMid: string; systems: string; headlineEnd: string; pills: string[]; subtitle: string; letsTalk: string; sendEmail: string; downloadCv: string };
    about: { title: string; bio: string; aboutMe: string; stats: { value: string; label: string; desc: string }[] };
    experience: { tag: string; viewAll: string; title: string; projectType: string; viewDetails: string; jobs: { company: string; location: string; role: string; period: string; type: string; summary: string; points: string[]; stack: string }[] };
    skills: { tag: string; title: string; categories: Record<string, string> };
    footer: { role: string; cta: string; ctaDesc: string; letsTalk: string; sendEmail: string; nav: string; home: string; experience: string; skills: string; about: string; copyright: string };
  }
> = {
  es: {
    nav: ["Inicio", "Experiencia", "Habilidades", "Sobre mí"],
    menu: "Menú",
    menuClose: "Cerrar menú",
    hero: {
      at: "Fullstack at",
      headlineStart: "Diseñando ",
      products: "productos",
      headlineMid: " que la gente usa, y ",
      systems: "sistemas",
      headlineEnd: " en los que los equipos confían.",
      pills: ["Desarrollo Fullstack", "APIs y Sistemas", "Experiencia de usuario"],
      subtitle: "Combinando sentido de negocio y claridad técnica para crear soluciones que impulsan el crecimiento y deleitan a los usuarios.",
      letsTalk: "Hablemos",
      sendEmail: "Enviar email",
      downloadCv: "Descargar CV",
    },
    about: {
      title: "Soy Jesús Villalta.",
      bio: "Ingeniero de Software con más de 5 años de experiencia diseñando y escalando sistemas web para mercados en Europa y América Latina. Especialista en PHP, Python y ecosistemas React, con capacidad para liderar el ciclo completo de desarrollo. Enfocado en automatización de procesos, optimización de sistemas complejos y mejora de UX. Ingeniero en Sistemas (UNERG, 2020). Español nativo · Inglés A2.",
      aboutMe: "Sobre mí",
      stats: [
        { value: "5+", label: "años", desc: "Diseñando y escalando sistemas web para empresas en Europa y América Latina." },
        { value: "5+", label: "proyectos", desc: "Desde SaaS fiscal y facturación hasta legal tech, media y GovTech." },
        { value: "25+", label: "tecnologías", desc: "Laravel, Vue, React, Python, Django, IA, Stripe, Docker y bases de datos." },
      ],
    },
    experience: {
      tag: "Experiencia",
      viewAll: "Ver todo",
      title: "Construyendo productos con impacto, esfuerzo y un toque de zen",
      projectType: "Tipo de proyecto",
      viewDetails: "Ver detalles",
      jobs: [
        { company: "Notario.org", location: "España (Remoto)", role: "Fullstack Engineer", period: "Abr 2024 – Presente", type: "Legal Tech / CRM", summary: "Desarrollo integral de un CRM empresarial de alto rendimiento con Laravel y MariaDB, optimizando flujos de trabajo complejos mediante componentes reactivos en Vue.js y React.js.", points: ["CRM empresarial con Laravel y MariaDB; flujos complejos con Vue.js y React.js.", "Facturación automatizada y suscripciones con Stripe; control centralizado de pagos.", "Integración de Groq para analítica avanzada y extracción de métricas en lenguaje natural.", "APIs de terceros (Vintegrid, Diabolocom) y administración de servidores Linux con aaPanel."], stack: "Laravel, Livewire, Vue.js, React.js, JavaScript, MariaDB, aaPanel, Stripe." },
        { company: "Invoice Nexusdevtech", location: "Freelancer (Remoto)", role: "Fullstack Developer", period: "Ene 2026", type: "SaaS / Facturación e inventario", summary: "Plataforma SaaS de facturación, inventario y ventas. Arquitectura multiempresa con Laravel y Vue 3 SPA, aislamiento por tenant, roles granulares y portal de clientes.", points: ["Arquitectura multiempresa (Laravel + Vue 3 SPA) con Bouncer, Sanctum y portal de clientes.", "Inventario transaccional vinculado a facturación y módulo POS con carrito, multimoneda y emisión fiscal.", "Catálogo público configurable con PDF de códigos QR; landing bilingüe con suscripciones Stripe.", "Despliegue Docker multi-etapa, Gotenberg, S3/Dropbox, colas, backups Spatie y tests con Pest."], stack: "Laravel, PHP 8.5, Vue 3, Pinia, TypeScript, Tailwind CSS v4, MariaDB/SQLite, Docker Compose, Redis, Sanctum, Bouncer, Stripe, Gotenberg, Vite, Pest." },
        { company: "TaxDay", location: "Freelancer (Remoto)", role: "Fullstack Engineer", period: "Dic 2025", type: "SaaS / Cumplimiento fiscal", summary: "SaaS de residencia fiscal. Reimplementación en Laravel 12 con arquitectura de dominio, UI Livewire 3 / Volt / Flux y modelo multi-año con varias residencias por ejercicio.", points: ["Motor de scoring de riesgo auditable: calendario 365 días, cobertura de estancias, umbrales por país e informes PDF.", "Stripe y AWS S3: suscripciones con webhooks, almacenamiento privado y sincronización de planes.", "Asistente IA (Groq) con datos fiscales del usuario, colas asíncronas y exportaciones GDPR en background.", "2FA, roles Spatie, impersonación trazable y tests Pest en billing, storage, IA y exportaciones."], stack: "PHP 8.3, Laravel 12, Livewire 3, Volt, Flux UI, Fortify, Spatie Permission, Stripe, AWS S3, Groq API, DomPDF, Tailwind CSS 4, Vite, Pest, SweetAlert2." },
        { company: "Maidan Holding", location: "España (Remoto)", role: "Fullstack Engineer", period: "Feb 2021 – Abr 2024", type: "Media & Automatización", summary: "Automatización de publicaciones, integración de IA y herramientas de scraping que redujeron tareas manuales en un 80%, junto con CRM a medida y optimización de backend.", points: ["Integración de OpenAI para traducción multilingüe, moderación de comentarios y asistencia en redacción.", "Automatización con Selenium/Dusk; reducción del 80% en tareas manuales.", "Refactorización de queries y bases de datos; mejora significativa de tiempos de respuesta.", "CRM automatizado para generación y gestión de leads; incremento de tasas de conversión."], stack: "Laravel, Livewire, Vue.js, React.js, JavaScript, MariaDB, Selenium (Dusk), Plesk, WordPress, aaPanel, Stripe." },
        { company: "Sigma", location: "Venezuela (Remoto)", role: "Fullstack Engineer", period: "Ago 2020 – Jul 2021", type: "GovTech / Nómina", summary: "Sistema integral para gestión de obras públicas y procesamiento de nóminas con Django y Python, con frontend Bootstrap, PDFs automatizados y pruebas unitarias e integración.", points: ["Sistema de obras públicas y nóminas con Django y Python.", "Frontend con Bootstrap y componentes personalizados.", "Generación de PDFs con plantillas reutilizables y paquetes internos de Python.", "Bases de datos normalizadas y pruebas unitarias/de integración con mocks."], stack: "Django, Python, Bootstrap, PostgreSQL, jQuery, Mock." },
      ],
    },
    skills: {
      tag: "Habilidades",
      title: "Stack técnico",
      categories: { Backend: "Backend", Frontend: "Frontend", Databases: "Bases de datos", Tools: "Herramientas" },
    },
    footer: {
      role: "Software Developer & Fullstack Engineer",
      cta: "¿Listo para crear con propósito?",
      ctaDesc: "Si buscas un desarrollador que escucha, entiende el negocio y construye con intención, iniciemos la conversación.",
      letsTalk: "Hablemos",
      sendEmail: "Enviar email",
      nav: "Navegación",
      home: "Inicio",
      experience: "Experiencia",
      skills: "Habilidades",
      about: "Sobre mí",
      copyright: "Todos los derechos reservados a Jesús Villalta.",
    },
  },
  en: {
    nav: ["Home", "Experience", "Skills", "About me"],
    menu: "Menu",
    menuClose: "Close menu",
    hero: {
      at: "Fullstack at",
      headlineStart: "Designing ",
      products: "products",
      headlineMid: " people love, and ",
      systems: "systems",
      headlineEnd: " teams rely on.",
      pills: ["Fullstack Development", "APIs & Systems", "User Experience"],
      subtitle: "Merging business sense and technical clarity to build solutions that drive growth and delight users.",
      letsTalk: "Let's talk",
      sendEmail: "Email me",
      downloadCv: "Download CV",
    },
    about: {
      title: "I'm Jesús Villalta.",
      bio: "Software Engineer with 5+ years designing and scaling web systems for European and Latin American markets. Specialist in PHP, Python, and React ecosystems, leading the full development lifecycle. Focused on process automation, complex system optimization, and UX. Systems Engineer (UNERG, 2020). Native Spanish · English A2.",
      aboutMe: "About me",
      stats: [
        { value: "5+", label: "years", desc: "Designing and scaling web systems for companies in Europe and Latin America." },
        { value: "5+", label: "projects", desc: "From fiscal and billing SaaS to legal tech, media, and GovTech." },
        { value: "25+", label: "technologies", desc: "Laravel, Vue, React, Python, Django, AI, Stripe, Docker, and databases." },
      ],
    },
    experience: {
      tag: "Experience",
      viewAll: "View all",
      title: "Building products with impact, grit and a touch of zen",
      projectType: "Project type",
      viewDetails: "View details",
      jobs: [
        { company: "Notario.org", location: "Spain (Remote)", role: "Fullstack Engineer", period: "Apr 2024 – Present", type: "Legal Tech / CRM", summary: "End-to-end development of a high-performance business CRM with Laravel and MariaDB, optimizing complex workflows through reactive Vue.js and React.js components.", points: ["Business CRM with Laravel and MariaDB; complex flows with Vue.js and React.js.", "Automated billing and Stripe subscriptions; centralized payment control.", "Groq integration for advanced analytics and natural-language metric extraction.", "Third-party APIs (Vintegrid, Diabolocom) and Linux server administration with aaPanel."], stack: "Laravel, Livewire, Vue.js, React.js, JavaScript, MariaDB, aaPanel, Stripe." },
        { company: "Invoice Nexusdevtech", location: "Freelancer (Remote)", role: "Fullstack Developer", period: "Jan 2026", type: "SaaS / Billing & inventory", summary: "SaaS platform for billing, inventory, and sales. Multi-company architecture with Laravel and Vue 3 SPA, tenant isolation, granular roles, and a client portal.", points: ["Multi-company architecture (Laravel + Vue 3 SPA) with Bouncer, Sanctum, and client portal.", "Transactional inventory tied to billing and POS module with cart, multi-currency, and fiscal issuance.", "Configurable public catalog with QR PDFs; bilingual landing with Stripe subscriptions.", "Multi-stage Docker deployment, Gotenberg, S3/Dropbox, queues, Spatie backups, and Pest tests."], stack: "Laravel, PHP 8.5, Vue 3, Pinia, TypeScript, Tailwind CSS v4, MariaDB/SQLite, Docker Compose, Redis, Sanctum, Bouncer, Stripe, Gotenberg, Vite, Pest." },
        { company: "TaxDay", location: "Freelancer (Remote)", role: "Fullstack Engineer", period: "Dec 2025", type: "SaaS / Fiscal residence compliance", summary: "Fiscal residence SaaS. Rebuilt on Laravel 12 with domain architecture, Livewire 3 / Volt / Flux UI, and a multi-year model with multiple residencies per tax year.", points: ["Auditable risk scoring: 365-day calendar, stay coverage, per-country thresholds, and PDF reports.", "Stripe and AWS S3: webhook subscriptions, private storage, and plan sync.", "Groq AI assistant with user tax data, async queues, and GDPR exports in the background.", "2FA, Spatie roles, traceable impersonation, and Pest tests for billing, storage, AI, and exports."], stack: "PHP 8.3, Laravel 12, Livewire 3, Volt, Flux UI, Fortify, Spatie Permission, Stripe, AWS S3, Groq API, DomPDF, Tailwind CSS 4, Vite, Pest, SweetAlert2." },
        { company: "Maidan Holding", location: "Spain (Remote)", role: "Fullstack Engineer", period: "Feb 2021 – Apr 2024", type: "Media & Automation", summary: "Publication automation, AI integration, and scraping tools that cut manual tasks by 80%, plus custom CRM and backend optimization.", points: ["OpenAI integration for multilingual translation, comment moderation, and writing assistance.", "Selenium/Dusk automation; 80% reduction in manual tasks.", "Query and database refactoring; significant response time improvements.", "Automated CRM for lead generation and management; higher conversion rates."], stack: "Laravel, Livewire, Vue.js, React.js, JavaScript, MariaDB, Selenium (Dusk), Plesk, WordPress, aaPanel, Stripe." },
        { company: "Sigma", location: "Venezuela (Remote)", role: "Fullstack Engineer", period: "Aug 2020 – Jul 2021", type: "GovTech / Payroll", summary: "Full system for public works and payroll processing with Django and Python, Bootstrap frontend, automated PDFs, and unit/integration testing.", points: ["Public works and payroll system with Django and Python.", "Bootstrap frontend and custom components.", "PDF generation with reusable templates and internal Python packages.", "Normalized databases and unit/integration tests with mocks."], stack: "Django, Python, Bootstrap, PostgreSQL, jQuery, Mock." },
      ],
    },
    skills: {
      tag: "Skills",
      title: "Tech stack",
      categories: { Backend: "Backend", Frontend: "Frontend", Databases: "Databases", Tools: "Tools" },
    },
    footer: {
      role: "Software Developer & Fullstack Engineer",
      cta: "Ready to create with purpose?",
      ctaDesc: "If you're looking for a developer who listens, understands the business and builds with intention, let's start the conversation.",
      letsTalk: "Let's talk",
      sendEmail: "Email me",
      nav: "Navigation",
      home: "Home",
      experience: "Experience",
      skills: "Skills",
      about: "About me",
      copyright: "All rights reserved to Jesús Villalta.",
    },
  },
};

function useInView() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll("[data-animate], [data-animate-stagger]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>("es");
  const t = TRANSLATIONS[locale];
  useInView();

  const Icon = ({ name }: { name: string }) => {
    const c = "w-5 h-5 shrink-0 text-muted";
    if (name === "home") return (<svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>);
    if (name === "briefcase") return (<svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>);
    if (name === "doc") return (<svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);
    if (name === "user") return (<svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>);
    if (name === "code") return (<svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>);
    return null;
  };

  const PhoneIcon = () => (<svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>);
  const ChatIcon = () => (<svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>);
  const DownloadIcon = () => (<svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header: avatar + nombre | Menu + Plus */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#" className="flex items-center gap-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
            <Image
              src="/jesus_villalta.png"
              alt="Jesús Villalta"
              width={40}
              height={40}
              className="h-9 w-9 rounded-full object-cover"
              priority
            />
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Jesús Villalta
            </span>
          </a>
          <div className="relative flex items-center gap-3">
            <div className="flex rounded-full border border-border bg-card p-0.5 text-sm font-medium">
              <button
                type="button"
                onClick={() => setLocale("es")}
                className={`rounded-full px-3 py-1.5 transition-colors ${locale === "es" ? "bg-foreground text-background" : "text-muted hover:text-foreground"}`}
                aria-label="Español"
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`rounded-full px-3 py-1.5 transition-colors ${locale === "en" ? "bg-foreground text-background" : "text-muted hover:text-foreground"}`}
                aria-label="English"
              >
                EN
              </button>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
              aria-label={menuOpen ? t.menuClose : t.menu}
            >
              <span>{t.menu}</span>
              {menuOpen ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              )}
            </button>
            <a
              href="https://www.linkedin.com/in/jesus-villalta-83368722b/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            {/* Dropdown menú con iconos */}
            {menuOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-border bg-card py-3 shadow-lg">
                {NAV_LINKS_BASE.map((link, i) => (
                  <a
                    key={link.href + i}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="nav-link-effect flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-background"
                  >
                    <Icon name={link.icon} />
                    {t.nav[i]}
                  </a>
                ))}
                <a
                  href="https://www.linkedin.com/in/jesus-villalta-83368722b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="nav-link-effect flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-background"
                >
                  <svg className="w-5 h-5 shrink-0 text-muted" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main>
        {/* Hero - fondo 3D + blobs + headline */}
        <section className="hero-stripes relative min-h-[85vh] overflow-hidden px-6 pt-28 pb-20 lg:px-8" data-animate>
          {/* Fondo 3D: cubo grande detrás del contenido */}
          <div className="hero-3d-bg" aria-hidden>
            <div className="hero-3d-cube">
              <div className="hero-3d-face front" />
              <div className="hero-3d-face back" />
              <div className="hero-3d-face right" />
              <div className="hero-3d-face left" />
              <div className="hero-3d-face top" />
              <div className="hero-3d-face bottom" />
            </div>
          </div>
          {/* Blobs de gradiente (rojo-rosa + teal) */}
          <div className="hero-blob hero-blob-1" aria-hidden />
          <div className="hero-blob hero-blob-2" aria-hidden />
          <div className="hero-blob hero-blob-3" aria-hidden />
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-pill px-4 py-1.5 text-sm font-medium text-pill-text">
                {t.hero.at}
              </span>
            </div>
            <h1 className="hero-headline mb-8 font-bold leading-[1.1] tracking-tight">
              <span className="text-foreground">{t.hero.headlineStart}</span>
              <span className="hero-word-accent text-[#e11d48]">{t.hero.products}</span>
              <span className="text-foreground">{t.hero.headlineMid}</span>
              <span className="hero-word-accent text-[#ea580c]">{t.hero.systems}</span>
              <span className="text-foreground">{t.hero.headlineEnd}</span>
            </h1>
            <div className="mb-8 flex flex-wrap gap-3">
              {t.hero.pills.map((pill, i) => (
                <span key={i} className={`pill-dotted pill-stagger-${i + 1} rounded-full px-4 py-2 text-sm font-medium text-foreground`}>
                  {pill}
                </span>
              ))}
            </div>
            <p className="mb-12 max-w-2xl text-lg leading-relaxed text-muted lg:text-xl">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="btn-hero btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background"
              >
                <PhoneIcon />
                {t.hero.letsTalk}
              </a>
              <a
                href="mailto:jesusesteban12321@gmail.com"
                className="btn-hero btn-outline btn-shine inline-flex items-center justify-center rounded-full border-2 border-foreground px-8 py-4 text-sm font-semibold text-foreground"
              >
                {t.hero.sendEmail}
              </a>
              <a
                href="/jesus-villalta-cv.pdf"
                download={locale === "es" ? "Jesús-Villalta-CV.pdf" : "Jesus-Villalta-CV.pdf"}
                className="btn-hero inline-flex items-center justify-center gap-2 rounded-full border-2 border-border bg-card px-8 py-4 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <DownloadIcon />
                {t.hero.downloadCv}
              </a>
            </div>
          </div>
        </section>

        {/* About - tarjeta negra izquierda + 3 stats derecha (estilo Aman) */}
        <section id="sobre-mi" className="scroll-mt-24 border-t border-border bg-background px-6 py-24 lg:px-8" data-animate>
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
            <div className="rounded-2xl bg-foreground p-8 text-background lg:p-10">
              <h2 className="mb-6 text-2xl font-bold tracking-tight lg:text-3xl">
                {t.about.title}
              </h2>
              <p className="mb-8 leading-relaxed opacity-90">
                {t.about.bio}
              </p>
              <a
                href="#experiencia"
                className="btn-about inline-flex items-center justify-center rounded-xl bg-background px-6 py-3 text-sm font-semibold text-foreground"
              >
                {t.about.aboutMe}
              </a>
            </div>
            <div className="grid gap-6 sm:grid-cols-3 sm:grid-rows-1">
              {t.about.stats.map((stat) => (
                <div key={stat.label} className="stat-card rounded-2xl border border-border bg-card p-6">
                  <p className="stat-number mb-2 text-foreground">{stat.value}</p>
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
                    {stat.label}
                  </p>
                  <p className="text-sm leading-relaxed text-muted">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience - tag oval + cards + botón Ver detalles (estilo Aman) */}
        <section id="experiencia" className="scroll-mt-24 border-t border-border bg-card px-6 py-24 lg:px-8" data-animate>
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <span className="rounded-full border border-amber-200 bg-amber-50/80 px-4 py-1.5 text-sm font-medium text-amber-900">
                {t.experience.tag}
              </span>
              <a href="#contacto" className="flex items-center gap-1 text-sm font-medium text-foreground hover:underline">
                {t.experience.viewAll}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
            <h2 className="mb-16 text-3xl font-bold leading-tight tracking-tight text-foreground lg:text-4xl">
              {t.experience.title}
            </h2>
            <div className="space-y-8">
              {t.experience.jobs.map((job) => (
                <article
                  key={job.company}
                  className="project-card grid gap-8 rounded-2xl border border-border bg-background p-8 shadow-sm lg:grid-cols-2 lg:p-10"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{job.company}</h3>
                    <p className="mt-2 leading-relaxed text-muted">
                      {job.summary}
                    </p>
                    <p className="mt-4 text-sm text-muted">
                      <span className="font-medium text-foreground">{t.experience.projectType}</span>
                      <br />
                      {job.type}
                    </p>
                    <a
                      href="#contacto"
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-3.5 text-sm font-semibold text-background transition-all hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      {t.experience.viewDetails}
                    </a>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
                      {job.location} · {job.period}
                    </p>
                    <ul className="space-y-2 text-sm text-muted">
                      {job.points.slice(0, 4).map((point, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-muted">
                      <span className="font-medium text-foreground">Stack:</span> {job.stack}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Skills / Habilidades */}
        <section id="habilidades" className="scroll-mt-24 border-t border-border bg-background px-6 py-24 lg:px-8" data-animate>
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted">
              {t.skills.tag}
            </p>
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              {t.skills.title}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2" data-animate-stagger>
              {SKILLS_KEYS.map((key) => (
                <div key={key} className="skill-card rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                    {t.skills.categories[key]}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {(SKILLS_ITEMS[key] || []).map((skill) => (
                      <li
                        key={skill}
                        className="skill-chip rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + Footer negro mejorado */}
        <section id="contacto" className="footer-section scroll-mt-24 bg-foreground px-6 py-24 lg:px-8 [&_a:focus-visible]:outline-[rgb(255,255,255)]" data-animate>
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
              {/* Izquierda: foto + nombre, headline, texto, CTAs */}
              <div className="max-w-xl">
                <div className="mb-8 flex items-center gap-4">
                  <div className="overflow-hidden rounded-2xl ring-2 ring-background/20 shadow-xl">
                    <Image
                      src="/jesus_villalta.png"
                      alt="Jesús Villalta"
                      width={72}
                      height={72}
                      className="h-[72px] w-[72px] object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-background">Jesús Villalta</p>
                    <p className="text-sm text-background/70">{t.footer.role}</p>
                  </div>
                </div>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-background lg:text-4xl">
                  {t.footer.cta}
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-background/80">
                  {t.footer.ctaDesc}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:jesusesteban12321@gmail.com"
                    className="footer-btn-primary inline-flex items-center justify-center gap-2 rounded-full border-2 border-background bg-background px-8 py-4 text-sm font-semibold text-foreground"
                  >
                    <ChatIcon />
                    {t.footer.letsTalk}
                  </a>
                  <a
                    href="mailto:jesusesteban12321@gmail.com"
                    className="footer-btn-outline inline-flex items-center justify-center rounded-full border-2 border-background px-8 py-4 text-sm font-semibold text-background"
                  >
                    {t.footer.sendEmail}
                  </a>
                </div>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-1 text-sm text-background/70">
                  <a href="tel:+584128210569" className="hover:text-background">+58 412 821-05-69</a>
                  <a href="mailto:jesusesteban12321@gmail.com" className="hover:text-background">jesusesteban12321@gmail.com</a>
                </div>
              </div>
              {/* Derecha: navegación */}
              <div className="lg:pt-2">
                <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-background/60">
                  {t.footer.nav}
                </p>
                <nav className="flex flex-col gap-4" aria-label="Footer">
                  <a href="#" className="footer-nav-link text-background/90 transition-colors hover:text-background">{t.footer.home}</a>
                  <a href="#experiencia" className="footer-nav-link text-background/90 transition-colors hover:text-background">{t.footer.experience}</a>
                  <a href="#habilidades" className="footer-nav-link text-background/90 transition-colors hover:text-background">{t.footer.skills}</a>
                  <a href="#sobre-mi" className="footer-nav-link text-background/90 transition-colors hover:text-background">{t.footer.about}</a>
                  <a
                    href="https://www.linkedin.com/in/jesus-villalta-83368722b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-nav-link text-background/90 transition-colors hover:text-background"
                  >
                    LinkedIn
                  </a>
                </nav>
              </div>
            </div>
            <div className="mt-16 border-t border-background/20 pt-8">
              <p className="text-sm text-background/50">
                © {new Date().getFullYear()} {t.footer.copyright}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
