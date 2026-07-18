"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HeroScene } from "./components/HeroScene";

type Locale = "es" | "en";

const NAV_LINKS_BASE = [
  { href: "#sobre-mi", icon: "user" as const },
  { href: "#experiencia", icon: "briefcase" as const },
  { href: "#habilidades", icon: "code" as const },
  { href: "#contacto", icon: "doc" as const },
];

const SKILLS_KEYS = ["Backend", "Frontend", "Databases", "Tools"] as const;
const SKILLS_ITEMS: Record<string, string[]> = {
  Backend: ["PHP (Laravel)", "Python", "Django", "Livewire", "RESTful APIs", "React.js", "Vue.js", "Express", "Selenium", "SOAP APIs", "Axios"],
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
    header: { ctaDownload: string };
    hero: { at: string; headlineStart: string; products: string; headlineMid: string; systems: string; headlineEnd: string; pills: string[]; subtitle: string; subtitleSecondary: string; letsTalk: string; sendEmail: string; downloadCv: string; exploreExperience: string };
    about: { title: string; bio: string; aboutMe: string; stats: { value: string; label: string; desc: string; bar: number }[] };
    experience: { tag: string; viewAll: string; title: string; projectType: string; viewDetails: string; jobs: { company: string; location: string; role: string; period: string; type: string; summary: string; points: string[]; stack: string }[] };
    skills: { tag: string; title: string; categories: Record<string, string> };
    footer: { role: string; cta: string; ctaDesc: string; letsTalk: string; sendEmail: string; nav: string; home: string; experience: string; skills: string; about: string; copyright: string };
  }
> = {
  es: {
    nav: ["Sobre mí", "Experiencia", "Habilidades", "Contacto"],
    menu: "Menú",
    menuClose: "Cerrar menú",
    header: {
      ctaDownload: "Descargar CV",
    },
    hero: {
      at: "Fullstack · Software Engineer",
      headlineStart: "Diseñando ",
      products: "productos",
      headlineMid: " que la gente usa, y ",
      systems: "sistemas",
      headlineEnd: " en los que los equipos confían.",
      pills: ["Desarrollo Fullstack", "APIs y Sistemas", "Experiencia de usuario"],
      subtitle: "Combinando sentido de negocio y claridad técnica para crear soluciones que impulsan el crecimiento y deleitan a los usuarios.",
      subtitleSecondary: "De la conceptualización al despliegue, construidos para rendir en producción.",
      letsTalk: "Hablemos",
      sendEmail: "Enviar email",
      downloadCv: "Descargar CV",
      exploreExperience: "Ver experiencia",
    },
    about: {
      title: "Soy Jesús Villalta.",
      bio: "Ingeniero de Software con más de 5 años de experiencia diseñando y escalando sistemas web para mercados en Europa y América Latina. Especialista en PHP, Python y ecosistemas React, con capacidad para liderar el ciclo completo de desarrollo. Enfocado en automatización de procesos, optimización de sistemas complejos y mejora de UX. Ingeniero en Sistemas (UNERG, 2020). Español nativo · Inglés A2.",
      aboutMe: "Sobre mí",
      stats: [
        { value: "5+", label: "años", desc: "Diseñando y escalando sistemas web para empresas en Europa y América Latina.", bar: 88 },
        { value: "6+", label: "proyectos", desc: "Desde SaaS fiscal, facturación y WhatsApp hasta legal tech, media y GovTech.", bar: 76 },
        { value: "25+", label: "tecnologías", desc: "Laravel, Vue, React, Python, Django, IA, Stripe, Docker y bases de datos.", bar: 94 },
      ],
    },
    experience: {
      tag: "Experiencia",
      viewAll: "Ver todo",
      title: "Construyendo productos con impacto, esfuerzo y un toque de zen",
      projectType: "Tipo de proyecto",
      viewDetails: "Ver detalles",
      jobs: [
        { company: "Notario.org", location: "España (Remoto)", role: "Fullstack Engineer", period: "Abr 2024 – Jul 2026", type: "Legal Tech / CRM", summary: "Arquitectura de alto rendimiento: desarrollo integral de un CRM empresarial con Laravel y MariaDB, optimizando flujos de trabajo complejos mediante componentes reactivos en Vue.js y React.js.", points: ["Arquitectura de alto rendimiento: CRM empresarial con Laravel y MariaDB; flujos complejos con Vue.js y React.js.", "Automatización financiera: facturación y suscripciones con Stripe; control centralizado de pagos y mayor precisión contable.", "Integraciones inteligentes: API de Groq para analítica con IA y extracción de métricas en lenguaje natural.", "Gestión de ecosistemas: APIs de terceros (Vintegrid para certificados digitales y Diabolocom para telefonía IP).", "Infraestructura: administración y despliegue de servidores Linux con aaPanel; alta disponibilidad y seguridad en producción."], stack: "Laravel, Livewire, Vue.js, React.js, JavaScript, MariaDB, aaPanel, Stripe." },
        { company: "Invoice Nexusdevtech", location: "Freelancer (Remoto)", role: "Fullstack Developer", period: "Ene 2026", type: "SaaS / Facturación e inventario", summary: "Plataforma SaaS de facturación, inventario y ventas. Arquitectura multiempresa con Laravel y Vue 3 SPA, aislamiento por tenant, roles granulares y portal de clientes.", points: ["Arquitectura multiempresa (Laravel + Vue 3 SPA) con Bouncer, Sanctum y portal de clientes.", "Inventario transaccional vinculado a facturación y módulo POS con carrito, multimoneda y emisión fiscal.", "Catálogo público configurable con PDF de códigos QR; landing bilingüe con suscripciones Stripe.", "Despliegue Docker multi-etapa, Gotenberg, S3/Dropbox, colas, backups Spatie y tests con Pest."], stack: "Laravel, PHP 8.5, Vue 3, Pinia, TypeScript, Tailwind CSS v4, MariaDB/SQLite, Docker Compose, Redis, Sanctum, Bouncer, Stripe, Gotenberg, Vite, Pest." },
        { company: "Chatext (WhatsApp Lite)", location: "Freelancer (Remoto)", role: "Fullstack Developer", period: "Mar 2026", type: "SaaS / Atención al cliente WhatsApp", summary: "Plataforma SaaS de atención al cliente y automatización por WhatsApp. Arquitectura multi-tenant con API REST, tiempo real vía Socket.IO y gestión concurrente de sesiones con Baileys.", points: ["Multi-tenant (empresas, planes, colas y usuarios) con API REST, Socket.IO y múltiples sesiones WhatsApp vía Baileys.", "Auth M2M multi-etapa (trusted apps, JWT, API tokens), rotación de API keys, feature flags y módulos de facturación/suscripción.", "Flow Builder visual, webhooks, campañas masivas y conectores (Typebot, n8n, OpenAI, Azure Speech); multimedia con FFmpeg.", "Colas Bull/Redis con rate limiting y Sentry; deploy Docker en VPS (PostgreSQL, Nginx/WebSocket, React) y pagos PIX vía Gerencianet."], stack: "Node.js, TypeScript, Express, Sequelize, PostgreSQL, Redis, Bull, Socket.IO, Baileys, Docker, Nginx, OpenAI, Azure Speech, Puppeteer, Jest, Sentry." },
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
    nav: ["About me", "Experience", "Skills", "Contact"],
    menu: "Menu",
    menuClose: "Close menu",
    header: {
      ctaDownload: "Download CV",
    },
    hero: {
      at: "Fullstack · Software Engineer",
      headlineStart: "Designing ",
      products: "products",
      headlineMid: " people love, and ",
      systems: "systems",
      headlineEnd: " teams rely on.",
      pills: ["Fullstack Development", "APIs & Systems", "User Experience"],
      subtitle: "Merging business sense and technical clarity to build solutions that drive growth and delight users.",
      subtitleSecondary: "From concept to deployment, built to perform in production.",
      letsTalk: "Let's talk",
      sendEmail: "Email me",
      downloadCv: "Download CV",
      exploreExperience: "View experience",
    },
    about: {
      title: "I'm Jesús Villalta.",
      bio: "Software Engineer with 5+ years designing and scaling web systems for European and Latin American markets. Specialist in PHP, Python, and React ecosystems, leading the full development lifecycle. Focused on process automation, complex system optimization, and UX. Systems Engineer (UNERG, 2020). Native Spanish · English A2.",
      aboutMe: "About me",
      stats: [
        { value: "5+", label: "years", desc: "Designing and scaling web systems for companies in Europe and Latin America.", bar: 88 },
        { value: "6+", label: "projects", desc: "From fiscal, billing, and WhatsApp SaaS to legal tech, media, and GovTech.", bar: 76 },
        { value: "25+", label: "technologies", desc: "Laravel, Vue, React, Python, Django, AI, Stripe, Docker, and databases.", bar: 94 },
      ],
    },
    experience: {
      tag: "Experience",
      viewAll: "View all",
      title: "Building products with impact, grit and a touch of zen",
      projectType: "Project type",
      viewDetails: "View details",
      jobs: [
        { company: "Notario.org", location: "Spain (Remote)", role: "Fullstack Engineer", period: "Apr 2024 – Jul 2026", type: "Legal Tech / CRM", summary: "High-performance architecture: end-to-end business CRM with Laravel and MariaDB, optimizing complex workflows through reactive Vue.js and React.js components.", points: ["High-performance architecture: business CRM with Laravel and MariaDB; complex flows with Vue.js and React.js.", "Financial automation: Stripe billing and subscriptions; centralized payment control and better accounting accuracy.", "Smart integrations: Groq API for AI analytics and natural-language metric extraction.", "Ecosystem management: third-party APIs (Vintegrid for digital certificates and Diabolocom for IP telephony).", "Infrastructure: Linux server admin and deploy with aaPanel; high availability and production security."], stack: "Laravel, Livewire, Vue.js, React.js, JavaScript, MariaDB, aaPanel, Stripe." },
        { company: "Invoice Nexusdevtech", location: "Freelancer (Remote)", role: "Fullstack Developer", period: "Jan 2026", type: "SaaS / Billing & inventory", summary: "SaaS platform for billing, inventory, and sales. Multi-company architecture with Laravel and Vue 3 SPA, tenant isolation, granular roles, and a client portal.", points: ["Multi-company architecture (Laravel + Vue 3 SPA) with Bouncer, Sanctum, and client portal.", "Transactional inventory tied to billing and POS module with cart, multi-currency, and fiscal issuance.", "Configurable public catalog with QR PDFs; bilingual landing with Stripe subscriptions.", "Multi-stage Docker deployment, Gotenberg, S3/Dropbox, queues, Spatie backups, and Pest tests."], stack: "Laravel, PHP 8.5, Vue 3, Pinia, TypeScript, Tailwind CSS v4, MariaDB/SQLite, Docker Compose, Redis, Sanctum, Bouncer, Stripe, Gotenberg, Vite, Pest." },
        { company: "Chatext (WhatsApp Lite)", location: "Freelancer (Remote)", role: "Fullstack Developer", period: "Mar 2026", type: "SaaS / WhatsApp customer support", summary: "SaaS platform for customer support and WhatsApp automation. Multi-tenant architecture with REST API, real-time via Socket.IO, and concurrent session management with Baileys.", points: ["Multi-tenant (companies, plans, queues, users) with REST API, Socket.IO, and multi-session WhatsApp via Baileys.", "Multi-stage M2M auth (trusted apps, JWT, API tokens), API key rotation, feature flags, and billing/subscription modules.", "Visual Flow Builder, webhooks, bulk campaigns, and connectors (Typebot, n8n, OpenAI, Azure Speech); multimedia with FFmpeg.", "Bull/Redis queues with rate limiting and Sentry; Docker VPS deploy (PostgreSQL, Nginx/WebSocket, React) and PIX payments via Gerencianet."], stack: "Node.js, TypeScript, Express, Sequelize, PostgreSQL, Redis, Bull, Socket.IO, Baileys, Docker, Nginx, OpenAI, Azure Speech, Puppeteer, Jest, Sentry." },
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );
  const [locale, setLocale] = useState<Locale>("es");
  const t = TRANSLATIONS[locale];
  useInView();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  useEffect(() => {
    const desktopNav = window.matchMedia("(min-width: 768px)");
    const syncNavMode = () => {
      const isMobile = !desktopNav.matches;
      setMobileNav(isMobile);
      if (!isMobile) setMenuOpen(false);
    };
    syncNavMode();
    desktopNav.addEventListener("change", syncNavMode);
    return () => desktopNav.removeEventListener("change", syncNavMode);
  }, []);

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
      <header className="site-header-shell fixed top-0 left-0 right-0 z-50">
        <div className="nav-pill-wrapper px-4 pb-3 pt-3 lg:px-8 lg:pb-4 lg:pt-4">
          <nav
            className={`nav-pill mx-auto max-w-6xl${scrolled ? " nav-pill--scrolled" : ""}${menuOpen && mobileNav ? " nav-pill--menu-open" : ""}`}
            aria-label="Principal"
          >
            <a
              href="#"
              className="nav-pill-brand flex shrink-0 items-center gap-2.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:gap-3"
            >
              <span className="nav-pill-brand-icon relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl sm:h-10 sm:w-10">
                <Image
                  src="/jesus_villalta.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                  priority
                />
              </span>
              <span className="hidden text-sm font-bold tracking-tight text-foreground sm:inline lg:text-base">
                Jesús Villalta
              </span>
            </a>

            <ul className="nav-pill-links hidden md:flex">
              {NAV_LINKS_BASE.map((link, i) => (
                <li key={link.href + i}>
                  <a href={link.href} className="nav-pill-link">
                    {t.nav[i]}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="nav-lang-switch hidden sm:flex" role="group" aria-label="Idioma">
                <button
                  type="button"
                  onClick={() => setLocale("es")}
                  className={`nav-lang-btn${locale === "es" ? " nav-lang-btn--active" : ""}`}
                  aria-label="Español"
                  aria-pressed={locale === "es"}
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className={`nav-lang-btn${locale === "en" ? " nav-lang-btn--active" : ""}`}
                  aria-label="English"
                  aria-pressed={locale === "en"}
                >
                  EN
                </button>
              </div>

              <a href="#contacto" className="nav-pill-secondary hidden md:inline-flex">
                {t.hero.letsTalk}
              </a>

              <a
                href="/jesus-villalta-cv.pdf"
                download={locale === "es" ? "Jesús-Villalta-CV.pdf" : "Jesus-Villalta-CV.pdf"}
                className="nav-pill-cta nav-pill-cta--desktop hidden md:inline-flex items-center gap-1.5"
              >
                <DownloadIcon />
                {t.header.ctaDownload}
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="nav-hamburger nav-hamburger--mobile"
                aria-label={menuOpen ? t.menuClose : t.menu}
                aria-expanded={menuOpen ? "true" : "false"}
              >
                <span className={`nav-hamburger-line${menuOpen ? " nav-hamburger-line--top-open" : ""}`} />
                <span className={`nav-hamburger-line${menuOpen ? " nav-hamburger-line--mid-open" : ""}`} />
                <span className={`nav-hamburger-line${menuOpen ? " nav-hamburger-line--bot-open" : ""}`} />
              </button>
            </div>
          </nav>

          {mobileNav && menuOpen && (
            <>
              <button
                type="button"
                className="nav-mobile-backdrop"
                aria-label={t.menuClose}
                onClick={() => setMenuOpen(false)}
              />
              <div className="nav-pill-mobile-menu mx-auto max-w-6xl">
                <nav className="flex flex-col gap-1 p-3">
                  {NAV_LINKS_BASE.map((link, i) => (
                    <a
                      key={link.href + i}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="nav-pill-mobile-link flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium"
                    >
                      <Icon name={link.icon} />
                      {t.nav[i]}
                    </a>
                  ))}
                </nav>
                <div className="border-t border-border/50 p-3">
                  <div className="nav-lang-switch mb-3 w-fit">
                    <button
                      type="button"
                      onClick={() => setLocale("es")}
                      className={`nav-lang-btn${locale === "es" ? " nav-lang-btn--active" : ""}`}
                      aria-pressed={locale === "es"}
                    >
                      ES
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocale("en")}
                      className={`nav-lang-btn${locale === "en" ? " nav-lang-btn--active" : ""}`}
                      aria-pressed={locale === "en"}
                    >
                      EN
                    </button>
                  </div>
                  <a
                    href="/jesus-villalta-cv.pdf"
                    download={locale === "es" ? "Jesús-Villalta-CV.pdf" : "Jesus-Villalta-CV.pdf"}
                    onClick={() => setMenuOpen(false)}
                    className="nav-pill-cta mb-2 inline-flex w-full items-center justify-center gap-2"
                  >
                    <DownloadIcon />
                    {t.header.ctaDownload}
                  </a>
                  <a
                    href="#contacto"
                    onClick={() => setMenuOpen(false)}
                    className="nav-pill-secondary inline-flex w-full items-center justify-center rounded-full py-3"
                  >
                    {t.hero.letsTalk}
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      <main className="pt-[5.5rem] lg:pt-24">
        <section className="hero-section hero-section--clarika relative overflow-hidden bg-white px-6 pb-24 pt-6 text-foreground lg:px-8 lg:pb-28 lg:pt-10" data-animate>
          <HeroScene />
          <div className="hero-content relative z-10 mx-auto flex min-h-[min(78vh,760px)] max-w-3xl flex-col items-center justify-center text-center text-foreground lg:max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-2 lg:mb-7">
              <span className="hero-eyebrow-clarika inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em]">
                <span className="hero-eyebrow-dot" aria-hidden>●</span>
                {t.hero.at}
              </span>
            </div>
            <h1 className="hero-headline hero-headline-clarika mb-6 max-w-4xl font-bold tracking-tight text-foreground lg:mb-7">
              <span className="hero-headline-line block text-foreground">
                {t.hero.headlineStart}
                <span className="hero-word-accent hero-word-accent--rose">{t.hero.products}</span>
                {locale === "es" ? " que la gente usa," : " people love,"}
              </span>
              <span className="hero-headline-highlight mt-3 inline-block">
                {locale === "es" ? "y " : "and "}
                <span className="hero-word-accent hero-word-accent--orange">{t.hero.systems}</span>
                {t.hero.headlineEnd}
              </span>
            </h1>
            <div className="mb-6 flex flex-wrap justify-center gap-2.5 lg:mb-7">
              {t.hero.pills.map((pill, i) => (
                <span key={i} className={`hero-pill-light pill-stagger-${i + 1} rounded-full px-3.5 py-1.5 text-xs font-medium lg:px-4 lg:py-2 lg:text-sm`}>
                  {pill}
                </span>
              ))}
            </div>
            <p className="mb-2 max-w-xl text-base leading-relaxed text-muted lg:max-w-2xl lg:text-lg">
              {t.hero.subtitle}
            </p>
            <p className="mb-9 max-w-lg text-sm leading-relaxed text-muted/80 lg:mb-10 lg:max-w-xl lg:text-base">
              {t.hero.subtitleSecondary}
            </p>
            <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
              <a
                href="#contacto"
                className="btn-hero btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background lg:px-8 lg:py-4"
              >
                <PhoneIcon />
                {t.hero.letsTalk}
              </a>
              <a
                href="#experiencia"
                className="btn-hero btn-outline btn-shine inline-flex items-center justify-center rounded-full border-2 border-foreground px-7 py-3.5 text-sm font-semibold text-foreground lg:px-8 lg:py-4"
              >
                {t.hero.exploreExperience}
              </a>
              <a
                href="/jesus-villalta-cv.pdf"
                download={locale === "es" ? "Jesús-Villalta-CV.pdf" : "Jesus-Villalta-CV.pdf"}
                className="btn-hero hidden items-center justify-center gap-2 rounded-full border-2 border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-foreground sm:inline-flex lg:px-8 lg:py-4"
              >
                <DownloadIcon />
                {t.hero.downloadCv}
              </a>
            </div>
          </div>
        </section>

        {/* About - tarjeta negra izquierda + 3 stats derecha (estilo Aman) */}
        <section id="sobre-mi" className="scroll-mt-24 border-t border-border bg-background px-6 py-24 lg:px-8" data-animate>
          <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
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
            <div className="flex flex-col gap-3" data-animate-stagger>
              {t.about.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`stat-card stat-card--${i + 1}`}
                  style={{ "--stat-pct": stat.bar, "--stat-delay": `${i * 0.1}s` } as React.CSSProperties}
                >
                  <div className="stat-ring-wrap" aria-hidden>
                    <svg className="stat-ring" viewBox="0 0 72 72">
                      <circle className="stat-ring-track" cx="36" cy="36" r="30" />
                      <circle className="stat-ring-progress" cx="36" cy="36" r="30" />
                    </svg>
                    <span className="stat-ring-value">{stat.value}</span>
                  </div>
                  <div className="stat-card-body">
                    <p className="stat-label">{stat.label}</p>
                    <p className="stat-desc">{stat.desc}</p>
                  </div>
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

        {/* Skills / Habilidades — mismo encabezado que Experiencia */}
        <section id="habilidades" className="scroll-mt-24 border-t border-border bg-background px-6 py-24 lg:px-8" data-animate>
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <span className="rounded-full border border-amber-200 bg-amber-50/80 px-4 py-1.5 text-sm font-medium text-amber-900">
                {t.skills.tag}
              </span>
              <a href="#experiencia" className="flex items-center gap-1 text-sm font-medium text-foreground hover:underline">
                {t.hero.exploreExperience}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
            <h2 className="mb-16 text-3xl font-bold leading-tight tracking-tight text-foreground lg:text-4xl">
              {t.skills.title}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2" data-animate-stagger>
              {SKILLS_KEYS.map((key) => (
                <div key={key} className="skill-card rounded-2xl border border-border bg-card p-8 shadow-sm">
                  <h3 className="skill-category-title mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">
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
