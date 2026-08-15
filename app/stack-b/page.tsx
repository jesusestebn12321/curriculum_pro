"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { HeroScene } from "../components/HeroScene";

type Locale = "es" | "en";

const NAV_LINKS = [
  { href: "#sobre-mi", icon: "user" as const },
  { href: "#experiencia", icon: "briefcase" as const },
  { href: "#habilidades", icon: "code" as const },
  { href: "#contacto", icon: "doc" as const },
];

const SKILLS_KEYS = ["Backend", "Frontend", "Databases", "Tools"] as const;
const SKILLS_ITEMS: Record<string, string[]> = {
  Backend: [
    "C#",
    ".NET 10",
    "ASP.NET Core",
    "Entity Framework Core",
    "Django",
    "Python",
    "RESTful APIs",
    "SignalR",
    "JWT",
    "Autofac",
    "FluentValidation",
  ],
  Frontend: [
    "Angular",
    "Razor Views",
    "Vue.js",
    "React.js",
    "TypeScript",
    "Tailwind",
    "Bootstrap",
    "Sass",
    "Flutter",
    "Dart",
  ],
  Databases: ["PostgreSQL", "MySQL", "SQL Server", "SQLite", "Redis"],
  Tools: [
    "Docker",
    "Docker Compose",
    "Git/GitHub",
    "Linux VPS",
    "Nginx/Caddy",
    "Postman",
    "Cursor",
    "Claude",
    "Stripe",
    "PayPal",
    "OAuth",
  ],
};

const TRANSLATIONS = {
  es: {
    brand: "Jesús Villalta",
    nav: ["Sobre mí", "Experiencia", "Habilidades", "Contacto"],
    menu: "Menú",
    menuClose: "Cerrar menú",
    ctaDownload: "Descargar CV",
    hero: {
      at: "Fullstack · Software Engineer",
      headlineStart: "Diseñando ",
      products: "productos",
      systems: "sistemas",
      headlineEnd: " en los que los equipos confían.",
      subtitle:
        "Backends en .NET y Django, frontends en Angular y apps Flutter: e-commerce, POS y SaaS de la idea a producción.",
      letsTalk: "Hablemos",
      downloadCv: "Descargar CV",
      exploreExperience: "Ver experiencia",
    },
    aboutTitle: "Soy Jesús Villalta.",
    aboutBio:
      "Ingeniero de Software con más de 5 años de experiencia diseñando y escalando sistemas web para mercados en Europa y América Latina. Especialista en .NET / ASP.NET Core, Django/Python y Angular, con Flutter como plus móvil. Enfocado en e-commerce, POS/SaaS, automatización y entrega en producción. Ingeniero en Sistemas (UNERG, 2020). Español nativo · Inglés A2.",
    aboutMe: "Sobre mí",
    aboutStats: [
      {
        value: "5+",
        label: "años",
        desc: "Diseñando y escalando sistemas web para empresas en Europa y América Latina.",
        bar: 88,
      },
      {
        value: "5+",
        label: "proyectos",
        desc: "Desde SaaS multi-tenant e-commerce (.NET/Angular/Flutter) y POS de restaurantes hasta facturación móvil y GovTech con Django.",
        bar: 76,
      },
      {
        value: "25+",
        label: "tecnologías",
        desc: ".NET, C#, Angular, Django, Python, Flutter, Docker, SignalR, PostgreSQL/MySQL y más.",
        bar: 94,
      },
    ],
    expTag: "Experiencia",
    expViewAll: "Ver todo",
    expTitle: "Construyendo productos con impacto, esfuerzo y un toque de zen",
    projectType: "Tipo de proyecto",
    viewDetails: "Ver detalles",
    skillsTag: "Habilidades",
    skillsTitle: "Stack técnico",
    skillsCategories: {
      Backend: "Backend",
      Frontend: "Frontend",
      Databases: "Bases de datos",
      Tools: "Herramientas",
    },
    footer: {
      role: "Software Developer & Fullstack Engineer",
      cta: "¿Listo para crear con propósito?",
      ctaDesc:
        "Si buscas un desarrollador que escucha, entiende el negocio y construye con intención — en .NET, Django o fullstack — iniciemos la conversación.",
      letsTalk: "Hablemos",
      sendEmail: "Enviar email",
      nav: "Navegación",
      home: "Inicio",
      experience: "Experiencia",
      skills: "Habilidades",
      about: "Sobre mí",
      copyright: "Todos los derechos reservados a Jesús Villalta.",
    },
    jobs: [
      {
        company: "pideloChevere",
        location: "Freelancer (Remoto)",
        role: "Desarrollador .NET / Full Stack",
        period: "Ene 2026 – Jul 2026",
        type: "POS / Sistema de comandas — https://pidelo-chevere.food/",
        summary:
          "POS SaaS multi-tenant en producción (pidelo-chevere.food): mesas, comandas en tiempo real, cocina, caja, menú público e impresión de tickets, con API .NET y frontend Angular.",
        points: [
          "Diseñé backend Clean Architecture (.NET 10 / ASP.NET Core) con EF Core, JWT, SignalR y PostgreSQL 16 para mesas, comandas, cocina y facturación.",
          "Construí el frontend Angular 19 (standalone, signals, Tailwind): landing SaaS, menú cliente, POS staff, cocina y caja con actualizaciones en tiempo real.",
          "Implementé flujo MVP: mapa de mesas → comanda → cocina → cobro (IVA) → tickets; agent de impresión ESC/POS y multimoneda (USD/VES/EUR/COP).",
          "Containericé API, web, PostgreSQL y print-agent con Docker Compose para entorno reproducible.",
        ],
        stack:
          "C#, .NET 10, ASP.NET Core, EF Core, SignalR, JWT, Angular 19, TypeScript, Tailwind, PostgreSQL 16, Docker Compose, ESC/POS",
      },
      {
        company: "Invoice Nexusdevtech",
        location: "Freelancer (Remoto)",
        role: "Fullstack Developer",
        period: "Ene 2026",
        type: "SaaS + Flutter — https://invoices.nexusdevtech.com/",
        summary:
          "SaaS de facturación/inventario multiempresa en producción (invoices.nexusdevtech.com) con API REST y app móvil Flutter para operación en campo.",
        points: [
          "App móvil en Flutter (Dart) integrada con la API: facturación, inventario, ventas y operación en campo.",
          "Arquitectura multiempresa con roles, autenticación y portal de clientes.",
          "Despliegue Docker, colas y operación en producción.",
        ],
        stack: "Flutter, Dart, APIs REST, Docker, MariaDB",
      },
      {
        company: "Pymees",
        location: "Freelancer (Remoto)",
        role: "Desarrollador .NET / Full Stack",
        period: "Jul 2025 – Dic 2025",
        type: "SaaS multi-tenant e-commerce — http://pymees.store/",
        summary:
          "SaaS multi-tenant de tiendas virtuales para PYMES (pymees.store): API .NET 10, Angular 19, Flutter, PostgreSQL, SignalR y Docker — catálogo, pedidos, caja y operación en tiempo real.",
        points: [
          "Diseñé e implementé multi-tenancy por StoreId (header X-Store-Id + JWT), roles PlatformAdmin/StoreOwner/Staff y Clean Architecture (.NET 10 / EF Core / PostgreSQL).",
          "Desarrollé frontend Angular 19 (standalone, Signals, Tailwind) y tienda pública por slug con catálogo, checkout y branding por tenant.",
          "Integré SignalR para sincronizar pedidos entre panel web y app Flutter staff; impresión ESC/POS y métodos de pago configurables.",
          "Contenericé API, web, PostgreSQL y print-agent con Docker Compose; módulos de caja, facturación, planes SaaS y panel de plataforma.",
        ],
        stack:
          "C#, .NET 10, ASP.NET Core, EF Core, SignalR, JWT, Angular 19, TypeScript, Tailwind, Flutter, PostgreSQL 16, Docker Compose, ESC/POS",
      },
      {
        company: "Sigma",
        location: "Venezuela (Remoto)",
        role: "Fullstack Engineer",
        period: "Ago 2021 – Jul 2022",
        type: "GovTech / Nómina",
        summary:
          "Sistema de obras públicas y nóminas con Django y Python: APIs, reportes PDF, PostgreSQL y pruebas.",
        points: [
          "Desarrollé gestión de obras públicas y procesamiento de nóminas con Django/Python.",
          "Frontend Bootstrap, generación de PDFs y normalización SQL.",
          "Pruebas unitarias e integración con mocks.",
        ],
        stack: "Python, Django, PostgreSQL, Bootstrap, jQuery, Git",
      },
    ],
  },
  en: {
    brand: "Jesús Villalta",
    nav: ["About me", "Experience", "Skills", "Contact"],
    menu: "Menu",
    menuClose: "Close menu",
    ctaDownload: "Download CV",
    hero: {
      at: "Fullstack · Software Engineer",
      headlineStart: "Designing ",
      products: "products",
      systems: "systems",
      headlineEnd: " teams rely on.",
      subtitle:
        ".NET and Django backends, Angular frontends and Flutter apps: e-commerce, POS and SaaS — from idea to production.",
      letsTalk: "Let's talk",
      downloadCv: "Download CV",
      exploreExperience: "View experience",
    },
    aboutTitle: "I'm Jesús Villalta.",
    aboutBio:
      "Software Engineer with 5+ years designing and scaling web systems for European and Latin American markets. Specialist in .NET / ASP.NET Core, Django/Python and Angular, plus Flutter for mobile. Focused on e-commerce, POS/SaaS, automation and production delivery. Systems Engineer (UNERG, 2020). Native Spanish · English A2.",
    aboutMe: "About me",
    aboutStats: [
      {
        value: "5+",
        label: "years",
        desc: "Designing and scaling web systems for companies in Europe and Latin America.",
        bar: 88,
      },
      {
        value: "5+",
        label: "projects",
        desc: "From multi-tenant e-commerce SaaS (.NET/Angular/Flutter) and restaurant POS to mobile billing and Django GovTech.",
        bar: 76,
      },
      {
        value: "25+",
        label: "technologies",
        desc: ".NET, C#, Angular, Django, Python, Flutter, Docker, SignalR, PostgreSQL/MySQL and more.",
        bar: 94,
      },
    ],
    expTag: "Experience",
    expViewAll: "View all",
    expTitle: "Building products with impact, grit and a touch of zen",
    projectType: "Project type",
    viewDetails: "View details",
    skillsTag: "Skills",
    skillsTitle: "Tech stack",
    skillsCategories: {
      Backend: "Backend",
      Frontend: "Frontend",
      Databases: "Databases",
      Tools: "Tools",
    },
    footer: {
      role: "Software Developer & Fullstack Engineer",
      cta: "Ready to create with purpose?",
      ctaDesc:
        "If you're looking for a developer who listens, understands the business and builds with intention — in .NET, Django or fullstack — let's start the conversation.",
      letsTalk: "Let's talk",
      sendEmail: "Email me",
      nav: "Navigation",
      home: "Home",
      experience: "Experience",
      skills: "Skills",
      about: "About me",
      copyright: "All rights reserved to Jesús Villalta.",
    },
    jobs: [
      {
        company: "pideloChevere",
        location: "Freelancer (Remote)",
        role: ".NET / Full Stack Developer",
        period: "Jan 2026 – Jul 2026",
        type: "POS / Restaurant orders — https://pidelo-chevere.food/",
        summary:
          "Multi-tenant restaurant POS SaaS in production (pidelo-chevere.food): tables, real-time orders, kitchen, billing, public menu and ticket printing — .NET API + Angular frontend.",
        points: [
          "Built Clean Architecture backend (.NET 10 / ASP.NET Core) with EF Core, JWT, SignalR and PostgreSQL 16 for tables, orders, kitchen and billing.",
          "Shipped Angular 19 frontend (standalone, signals, Tailwind): SaaS landing, customer menu, staff POS, kitchen and cashier with live updates.",
          "Delivered MVP flow: table map → order → kitchen → payment (VAT) → tickets; ESC/POS print agent and multi-currency (USD/VES/EUR/COP).",
          "Containerized API, web, PostgreSQL and print-agent with Docker Compose.",
        ],
        stack:
          "C#, .NET 10, ASP.NET Core, EF Core, SignalR, JWT, Angular 19, TypeScript, Tailwind, PostgreSQL 16, Docker Compose, ESC/POS",
      },
      {
        company: "Invoice Nexusdevtech",
        location: "Freelancer (Remote)",
        role: "Fullstack Developer",
        period: "Jan 2026",
        type: "SaaS + Flutter — https://invoices.nexusdevtech.com/",
        summary:
          "Multi-company billing/inventory SaaS in production (invoices.nexusdevtech.com) with REST API and Flutter mobile app for field ops.",
        points: [
          "Flutter (Dart) mobile app integrated with the API for billing, inventory and sales.",
          "Multi-company architecture with roles, auth and client portal.",
          "Docker deploy, queues and production operations.",
        ],
        stack: "Flutter, Dart, REST APIs, Docker, MariaDB",
      },
      {
        company: "Pymees",
        location: "Freelancer (Remote)",
        role: ".NET / Full Stack Developer",
        period: "Jul 2025 – Dec 2025",
        type: "Multi-tenant e-commerce SaaS — http://pymees.store/",
        summary:
          "Multi-tenant virtual-store SaaS for SMEs (pymees.store): .NET 10 API, Angular 19, Flutter, PostgreSQL, SignalR and Docker — catalog, orders, cash register and real-time ops.",
        points: [
          "Designed StoreId multi-tenancy (X-Store-Id header + JWT), PlatformAdmin/StoreOwner/Staff roles and Clean Architecture (.NET 10 / EF Core / PostgreSQL).",
          "Built Angular 19 frontend (standalone, Signals, Tailwind) and public storefront by slug with catalog, checkout and per-tenant branding.",
          "Integrated SignalR to sync orders across web panel and Flutter staff app; ESC/POS printing and configurable payment methods.",
          "Containerized API, web, PostgreSQL and print-agent with Docker Compose; cash register, invoicing, SaaS plans and platform admin.",
        ],
        stack:
          "C#, .NET 10, ASP.NET Core, EF Core, SignalR, JWT, Angular 19, TypeScript, Tailwind, Flutter, PostgreSQL 16, Docker Compose, ESC/POS",
      },
      {
        company: "Sigma",
        location: "Venezuela (Remote)",
        role: "Fullstack Engineer",
        period: "Aug 2021 – Jul 2022",
        type: "GovTech / Payroll",
        summary:
          "Public works and payroll system with Django/Python: APIs, PDF reports, PostgreSQL and tests.",
        points: [
          "Built public works and payroll flows with Django/Python.",
          "Bootstrap frontend, PDF generation and SQL normalization.",
          "Unit/integration tests with mocks.",
        ],
        stack: "Python, Django, PostgreSQL, Bootstrap, jQuery, Git",
      },
    ],
  },
} as const;

export default function StackBPortfolio() {
  const [locale, setLocale] = useState<Locale>("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );
  const t = TRANSLATIONS[locale];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll("[data-animate], [data-animate-stagger]").forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, [locale]);

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
    if (name === "briefcase")
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    if (name === "doc")
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    if (name === "user")
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    if (name === "code")
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    return null;
  };

  const DownloadIcon = () => (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
  const PhoneIcon = () => (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
  const ChatIcon = () => (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="site-header-shell fixed top-0 left-0 right-0 z-50">
        <div className="nav-pill-wrapper px-4 pb-3 pt-3 lg:px-8 lg:pb-4 lg:pt-4">
          <nav
            className={`nav-pill mx-auto max-w-6xl${scrolled ? " nav-pill--scrolled" : ""}${menuOpen && mobileNav ? " nav-pill--menu-open" : ""}`}
            aria-label="Principal"
          >
            <a
              href="#top"
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
                {t.brand}
              </span>
            </a>

            <ul className="nav-pill-links hidden md:flex">
              {NAV_LINKS.map((link, i) => (
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
                href="/jesus-villalta-cv-stack-b.pdf"
                download={locale === "es" ? "Jesus-Villalta-CV-NET-Django.pdf" : "Jesus-Villalta-CV-NET-Django.pdf"}
                className="nav-pill-cta nav-pill-cta--desktop hidden md:inline-flex items-center gap-1.5"
              >
                <DownloadIcon />
                {t.ctaDownload}
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
                  {NAV_LINKS.map((link, i) => (
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
                    href="/jesus-villalta-cv-stack-b.pdf"
                    download={locale === "es" ? "Jesus-Villalta-CV-NET-Django.pdf" : "Jesus-Villalta-CV-NET-Django.pdf"}
                    onClick={() => setMenuOpen(false)}
                    className="nav-pill-cta mb-2 inline-flex w-full items-center justify-center gap-2"
                  >
                    <DownloadIcon />
                    {t.ctaDownload}
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

      <main id="top" className="pt-[5.5rem] lg:pt-24">
        <section
          className="hero-section hero-section--clarika relative overflow-hidden bg-white px-6 pb-24 pt-6 text-foreground lg:px-8 lg:pb-28 lg:pt-10"
          data-animate
        >
          <HeroScene />
          <div className="hero-content relative z-10 mx-auto flex min-h-[min(78vh,760px)] max-w-3xl flex-col items-center justify-center text-center text-foreground lg:max-w-4xl">
            <div className="hero-copy-panel w-full">
              <div className="mb-6 flex flex-wrap items-center justify-center gap-2 lg:mb-7">
                <span className="hero-eyebrow-clarika inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em]">
                  <span className="hero-eyebrow-dot" aria-hidden>
                    ●
                  </span>
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
              <p className="hero-subtitle mx-auto mb-8 max-w-xl text-base leading-relaxed lg:mb-9 lg:max-w-2xl lg:text-lg">
                {t.hero.subtitle}
              </p>
              <div className="hero-cta-row flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#contacto"
                  className="btn-hero inline-flex h-12 min-w-[9.5rem] items-center justify-center gap-2 rounded-full bg-foreground px-7 text-sm font-semibold text-background"
                >
                  <PhoneIcon />
                  {t.hero.letsTalk}
                </a>
                <a
                  href="#experiencia"
                  className="btn-hero btn-outline inline-flex h-12 min-w-[9.5rem] items-center justify-center rounded-full border-2 border-foreground bg-white px-7 text-sm font-semibold text-foreground"
                >
                  {t.hero.exploreExperience}
                </a>
                <a
                  href="/jesus-villalta-cv-stack-b.pdf"
                  download={locale === "es" ? "Jesus-Villalta-CV-NET-Django.pdf" : "Jesus-Villalta-CV-NET-Django.pdf"}
                  className="btn-hero btn-outline inline-flex h-12 min-w-[9.5rem] items-center justify-center gap-2 rounded-full border-2 border-foreground bg-white px-7 text-sm font-semibold text-foreground"
                >
                  <DownloadIcon />
                  {t.hero.downloadCv}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="sobre-mi"
          className="scroll-mt-24 border-t border-border bg-background px-6 py-24 text-foreground lg:px-8"
          data-animate
        >
          <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
            <div className="rounded-2xl bg-foreground p-8 text-background lg:p-10">
              <h2 className="mb-6 text-2xl font-bold tracking-tight lg:text-3xl">{t.aboutTitle}</h2>
              <p className="mb-8 leading-relaxed opacity-90">{t.aboutBio}</p>
              <a
                href="#experiencia"
                className="btn-about inline-flex items-center justify-center rounded-xl bg-background px-6 py-3 text-sm font-semibold text-foreground"
              >
                {t.aboutMe}
              </a>
            </div>
            <div className="flex flex-col gap-3" data-animate-stagger>
              {t.aboutStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`stat-card stat-card--${i + 1}`}
                  style={
                    {
                      "--stat-pct": stat.bar,
                      "--stat-delay": `${i * 0.1}s`,
                    } as CSSProperties
                  }
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

        <section
          id="experiencia"
          className="scroll-mt-24 border-t border-border bg-card px-6 py-24 lg:px-8"
          data-animate
        >
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <span className="rounded-full border border-amber-200 bg-amber-50/80 px-4 py-1.5 text-sm font-medium text-amber-900">
                {t.expTag}
              </span>
              <a
                href="#contacto"
                className="flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
              >
                {t.expViewAll}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            <h2 className="mb-16 text-3xl font-bold leading-tight tracking-tight text-foreground lg:text-4xl">
              {t.expTitle}
            </h2>
            <div className="space-y-8">
              {t.jobs.map((job) => (
                <article
                  key={job.company}
                  className="project-card grid gap-8 rounded-2xl border border-border bg-background p-8 shadow-sm lg:grid-cols-2 lg:p-10"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{job.company}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {job.role} · {job.location}
                    </p>
                    <p className="mt-2 leading-relaxed text-muted">{job.summary}</p>
                    <p className="mt-4 text-sm text-muted">
                      <span className="font-medium text-foreground">{t.projectType}</span>
                      <br />
                      {job.type}
                    </p>
                    <a
                      href="#contacto"
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-3.5 text-sm font-semibold text-background transition-all hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      {t.viewDetails}
                    </a>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
                      {job.company} · {job.location} · {job.period}
                    </p>
                    <ul className="space-y-2 text-sm text-muted">
                      {job.points.slice(0, 4).map((point) => (
                        <li key={point} className="flex gap-2">
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

        <section
          id="habilidades"
          className="scroll-mt-24 border-t border-border bg-background px-6 py-24 lg:px-8"
          data-animate
        >
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <span className="rounded-full border border-amber-200 bg-amber-50/80 px-4 py-1.5 text-sm font-medium text-amber-900">
                {t.skillsTag}
              </span>
              <a
                href="#experiencia"
                className="flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
              >
                {t.hero.exploreExperience}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            <h2 className="mb-16 text-3xl font-bold leading-tight tracking-tight text-foreground lg:text-4xl">
              {t.skillsTitle}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2" data-animate-stagger>
              {SKILLS_KEYS.map((key) => (
                <div key={key} className="skill-card rounded-2xl border border-border bg-card p-8 shadow-sm">
                  <h3 className="skill-category-title mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">
                    {t.skillsCategories[key]}
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

        <section
          id="contacto"
          className="footer-section scroll-mt-24 bg-foreground px-6 py-24 lg:px-8 [&_a:focus-visible]:outline-[rgb(255,255,255)]"
          data-animate
        >
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
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
                    <p className="text-lg font-semibold text-background">{t.brand}</p>
                    <p className="text-sm text-background/70">{t.footer.role}</p>
                  </div>
                </div>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-background lg:text-4xl">
                  {t.footer.cta}
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-background/80">{t.footer.ctaDesc}</p>
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
                  <a href="tel:+584128210569" className="hover:text-background">
                    +58 412 821-05-69
                  </a>
                  <a href="mailto:jesusesteban12321@gmail.com" className="hover:text-background">
                    jesusesteban12321@gmail.com
                  </a>
                </div>
              </div>
              <div className="lg:pt-2">
                <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-background/60">
                  {t.footer.nav}
                </p>
                <nav className="flex flex-col gap-4" aria-label="Footer">
                  <a href="#top" className="footer-nav-link text-background/90 transition-colors hover:text-background">
                    {t.footer.home}
                  </a>
                  <a
                    href="#experiencia"
                    className="footer-nav-link text-background/90 transition-colors hover:text-background"
                  >
                    {t.footer.experience}
                  </a>
                  <a
                    href="#habilidades"
                    className="footer-nav-link text-background/90 transition-colors hover:text-background"
                  >
                    {t.footer.skills}
                  </a>
                  <a
                    href="#sobre-mi"
                    className="footer-nav-link text-background/90 transition-colors hover:text-background"
                  >
                    {t.footer.about}
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jes%C3%BAs-villalta-gonzalez-83368722b/"
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
