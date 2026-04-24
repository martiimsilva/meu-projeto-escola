import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import heroImg from "@/assets/hero-shapika.jpg";
import productsImg from "@/assets/products-shapika.jpg";

const SITE_URL = "https://shapika.lovable.app";
const SITE_TITLE = "Shapika — Molhos picantes artesanais | Pequena no nome, gigante no picante";
const SITE_DESCRIPTION =
  "Shapika: coleção premium de molhos picantes artesanais portugueses. 6 níveis de ardência, do Fogo Verde ao Carolina Reaper. Faz o quiz e descobre o teu favorito.";

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Shapika",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description: SITE_DESCRIPTION,
  slogan: "Pequena no nome, gigante no picante.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lisboa",
    addressCountry: "PT",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "ola@shapika.pt",
    telephone: "+351-910-000-000",
    contactType: "customer service",
    areaServed: "PT",
    availableLanguage: ["Portuguese", "English"],
  },
};

export const Route = createFileRoute("/")({
  component: ShapikaSite,
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "keywords", content: "molho picante, hot sauce, picante artesanal, Shapika, Carolina Reaper, habanero, chipotle, Portugal, scoville" },
      { name: "author", content: "Shapika" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#c2410c" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}${heroImg}` },
      { property: "og:image:width", content: "1536" },
      { property: "og:image:height", content: "1024" },
      { property: "og:locale", content: "pt_PT" },
      { property: "og:site_name", content: "Shapika" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: `${SITE_URL}${heroImg}` },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;900&display=swap",
      },
      { rel: "preload", as: "image", href: heroImg, fetchPriority: "high" } as any,
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORG_JSON_LD),
      },
    ],
  }),
});

type Product = {
  id: string;
  name: string;
  tag: string;
  description: string;
  heat: number; // 1-5
  scoville: string;
  price: number; // EUR numeric
  hue: string;
};

const PRODUCTS: Product[] = [
  { id: "fogo-verde", name: "Waka Waka", tag: "Jalapeño & Lima", description: "Frescura cítrica com um pontapé verde. O início perfeito para iniciados ousados.", heat: 1, scoville: "5.000 SHU", price: 10.99, hue: "oklch(0.75 0.18 140)" },
  { id: "rubi", name: "Jápica", tag: "Chipotle Artesanal", description: "Doçura defumada, profundidade lenta. Como uma fogueira numa noite fria.", heat: 2, scoville: "15.000 SHU", price: 12.99, hue: "oklch(0.5 0.18 30)" },
  { id: "lava", name: "Pika Forte", tag: "Cayenne & Alho", description: "O nosso clássico. Equilíbrio perfeito entre fogo, sabor e carácter.", heat: 3, scoville: "50.000 SHU", price: 14.99, hue: "oklch(0.62 0.24 27)" },
  { id: "inferno", name: "Piquênte", tag: "Habanero & Manga", description: "Tropical, traiçoeiro, viciante. A fruta esconde o golpe — bem-vindo ao inferno.", heat: 4, scoville: "150.000 SHU", price: 16.99, hue: "oklch(0.78 0.2 70)" },
  { id: "extincao", name: "La Tortura", tag: "Carolina Reaper", description: "Para os que perderam o medo. Edição limitada. Não recomendado a humanos comuns.", heat: 5, scoville: "1.500.000 SHU", price: 29.99, hue: "oklch(0.45 0.22 18)" },
  { id: "noir", name: "Colômbia", tag: "Ghost Pepper & Cacau", description: "Escuro, complexo, sedutor. Ardência elegante que se demora no paladar.", heat: 4, scoville: "300.000 SHU", price: 19.99, hue: "oklch(0.3 0.05 25)" },
];

const PRODUCT_LIST_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Coleção Shapika",
  itemListElement: PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: `Shapika ${p.name}`,
      description: p.description,
      brand: { "@type": "Brand", name: "Shapika" },
      category: "Molho picante",
      offers: {
        "@type": "Offer",
        price: p.price.toFixed(2),
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    },
  })),
};

const QUIZ = [
  { q: "Como descreves a tua relação com picante?", a: [{ t: "Mal aguento pimenta preta", s: 1 }, { t: "Gosto de um toquezinho", s: 2 }, { t: "Quanto mais melhor", s: 3 }, { t: "Vivo para sofrer", s: 4 }] },
  { q: "Que prato pedes num restaurante mexicano?", a: [{ t: "Quesadilla simples", s: 1 }, { t: "Tacos com molho médio", s: 2 }, { t: "Enchiladas extra picantes", s: 3 }, { t: "Habanero puro num shot", s: 4 }] },
  { q: "Qual é o teu lema?", a: [{ t: "Sabor antes de tudo", s: 1 }, { t: "Equilíbrio é a chave", s: 2 }, { t: "Sem dor não há glória", s: 3 }, { t: "Que arda até a alma", s: 4 }] },
];

const formatPrice = (n: number) =>
  n.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });

type CartItem = { product: Product; qty: number };

function ShapikaSite() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<Product | null>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [heatLevel, setHeatLevel] = useState(3);
  const [toast, setToast] = useState<string | null>(null);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<{ id: string; total: number } | null>(null);

  // Persist cart
  useEffect(() => {
    try {
      const saved = localStorage.getItem("shapika-cart");
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("shapika-cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [quizDone]);

  useEffect(() => {
    const id = setInterval(() => setCarouselIdx((i) => (i + 1) % PRODUCTS.length), 4500);
    return () => clearInterval(id);
  }, []);

  // Lock body scroll when modals open
  useEffect(() => {
    const anyOpen = !!active || cartOpen || checkoutOpen || !!orderConfirmed;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active, cartOpen, checkoutOpen, orderConfirmed]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Cart helpers
  const addToCart = (p: Product, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((i) => i.product.id === p.id);
      if (found) return prev.map((i) => i.product.id === p.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { product: p, qty }];
    });
    showToast(`${p.name} adicionado ao carrinho 🔥`);
  };
  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prev) => prev.map((i) => i.product.id === id ? { ...i, qty } : i));
  };
  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((i) => i.product.id !== id));

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((s, i) => s + i.product.price * i.qty, 0), [cart]);
  const shipping = cartSubtotal > 30 || cartSubtotal === 0 ? 0 : 3.9;
  const cartTotal = cartSubtotal + shipping;

  const answerQuiz = (score: number) => {
    const newScore = quizScore + score;
    if (quizStep + 1 < QUIZ.length) {
      setQuizScore(newScore);
      setQuizStep(quizStep + 1);
    } else {
      setQuizScore(newScore);
      setQuizDone(true);
    }
  };
  const resetQuiz = () => { setQuizStep(0); setQuizScore(0); setQuizDone(false); };
  const quizResult = () => {
    const avg = quizScore / QUIZ.length;
    if (avg <= 1.5) return PRODUCTS[0];
    if (avg <= 2.3) return PRODUCTS[2];
    if (avg <= 3.2) return PRODUCTS[3];
    return PRODUCTS[4];
  };

  const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const orderId = "SHP-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setOrderConfirmed({ id: orderId, total: cartTotal });
    setCheckoutOpen(false);
    setCart([]);
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Inject ItemList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_LIST_JSON_LD) }}
      />

      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border py-3" : "bg-transparent py-5"
        }`}
        role="banner"
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group" aria-label="Shapika — ir para o topo">
            <span className="text-3xl flame-flicker" aria-hidden="true">🌶️</span>
            <span className="text-2xl font-black tracking-widest text-gradient-fire" style={{ fontFamily: "var(--font-display)" }}>
              SHAPIKA
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium" aria-label="Navegação principal">
            {[["Início","home"],["Coleção","colecao"],["Quiz","quiz"],["História","historia"],["Galeria","galeria"],["Contacto","contacto"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="relative text-foreground/80 hover:text-foreground transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-gradient-fire after:transition-all hover:after:w-full">
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full bg-card border border-border hover:border-primary transition-colors"
              aria-label={`Abrir carrinho (${cartCount} ${cartCount === 1 ? "item" : "itens"})`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-gradient-fire text-primary-foreground text-[11px] font-bold flex items-center justify-center shadow-fire">
                  {cartCount}
                </span>
              )}
            </button>

            <button onClick={() => scrollTo("colecao")} className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-fire text-primary-foreground font-semibold text-sm shadow-fire hover:scale-105 transition-transform">
              Comprar 🔥
            </button>

            <button className="md:hidden text-foreground p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu" aria-expanded={menuOpen}>
              <div className="w-6 h-0.5 bg-foreground mb-1.5" />
              <div className="w-6 h-0.5 bg-foreground mb-1.5" />
              <div className="w-6 h-0.5 bg-foreground" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border">
            <div className="flex flex-col p-6 gap-4">
              {[["Início","home"],["Coleção","colecao"],["Quiz","quiz"],["História","historia"],["Galeria","galeria"],["Contacto","contacto"]].map(([label, id]) => (
                <button key={id} onClick={() => scrollTo(id)} className="text-left text-lg font-medium text-foreground/90 py-2 border-b border-border">
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden noise-overlay" aria-labelledby="hero-title">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-ember)" }} />
          <div className="absolute top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-30 float-slow" style={{ background: "var(--gradient-fire)" }} />
          <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full blur-3xl opacity-20 float-slow" style={{ background: "var(--flame)", animationDelay: "2s" }} />

          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-7 z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur text-xs font-medium text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary pulse-glow" aria-hidden="true" />
                Edição limitada — temporada 2026
              </div>
              <h1 id="hero-title" className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9]" style={{ fontFamily: "var(--font-display)" }}>
                Pequena no nome,<br />
                <span className="text-gradient-fire">gigante no picante.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Molhos picantes artesanais feitos para quem leva o sabor a sério. Da brasa à explosão — descobre o teu nível de fogo.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => scrollTo("colecao")} className="px-8 py-4 rounded-full bg-gradient-fire text-primary-foreground font-bold shadow-fire hover:shadow-glow hover:scale-105 transition-all">
                  Explorar coleção →
                </button>
                <button onClick={() => scrollTo("quiz")} className="px-8 py-4 rounded-full border-2 border-border bg-card/40 backdrop-blur font-bold hover:border-primary hover:bg-card transition-all">
                  Faz o quiz 🌶️
                </button>
              </div>
              <dl className="flex gap-8 pt-6">
                {[["6+","Variedades"],["1.5M","SHU máximo"],["100%","Artesanal"]].map(([n, l]) => (
                  <div key={l}>
                    <dt className="text-3xl font-black text-gradient-fire" style={{ fontFamily: "var(--font-display)" }}>{n}</dt>
                    <dd className="text-xs text-muted-foreground uppercase tracking-wider">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-3xl opacity-60 pulse-glow" style={{ background: "var(--gradient-fire)" }} />
              <img
                src={heroImg}
                alt="Garrafa de molho picante Shapika rodeada de pimentas vermelhas e chamas"
                width={1536}
                height={1024}
                fetchPriority="high"
                decoding="async"
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="relative rounded-3xl shadow-deep float-slow w-full h-auto"
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 overflow-hidden bg-card/40 backdrop-blur border-y border-border py-3" aria-hidden="true">
            <div className="marquee-track flex gap-12 whitespace-nowrap text-sm font-bold uppercase tracking-widest text-muted-foreground">
              {Array(2).fill(0).map((_, k) => (
                <div key={k} className="flex gap-12">
                  {["🔥 Artesanal","🌶️ Sem conservantes","⚡ Entrega 24h","🏆 Vencedor 2024","💀 Edição Reaper","🌿 Ingredientes naturais"].map((t) => (<span key={t}>{t}</span>))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COLEÇÃO */}
        <section id="colecao" className="py-24 md:py-32 relative" aria-labelledby="colecao-title">
          <div className="container mx-auto px-6">
            <header className="text-center max-w-2xl mx-auto mb-16 reveal">
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">A Coleção</p>
              <h2 id="colecao-title" className="text-5xl md:text-6xl font-black mt-4 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Seis molhos. <span className="text-gradient-fire">Infinitas histórias.</span>
              </h2>
              <p className="text-muted-foreground text-lg">Cada garrafa é uma viagem. Escolhe o teu nível, descobre o teu favorito. Pequena no nome, gigante no picante.</p>
            </header>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.map((p, i) => (
                <article
                  key={p.id}
                  className="reveal group relative bg-card border border-border rounded-3xl p-7 hover:-translate-y-2 hover:shadow-fire transition-all duration-500 overflow-hidden cursor-pointer"
                  style={{ transitionDelay: `${i * 50}ms` }}
                  onClick={() => setActive(p)}
                  itemScope
                  itemType="https://schema.org/Product"
                >
                  <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity" style={{ background: p.hue }} aria-hidden="true" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-16 h-20 rounded-lg shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform"
                        style={{ background: `linear-gradient(180deg, ${p.hue}, oklch(0.2 0.04 25))`, boxShadow: `0 10px 30px -5px ${p.hue}` }}
                        aria-hidden="true"
                      />
                      <span className="text-xs text-muted-foreground font-mono">{p.scoville}</span>
                    </div>
                    <p className="text-xs uppercase tracking-widest text-primary mb-1" itemProp="category">{p.tag}</p>
                    <h3 className="text-3xl font-black mb-3" style={{ fontFamily: "var(--font-display)" }} itemProp="name">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed" itemProp="description">{p.description}</p>
                    <div className="flex items-center justify-between">
                      <HeatBar level={p.heat} />
                      <span className="text-2xl font-black text-gradient-fire" style={{ fontFamily: "var(--font-display)" }} itemProp="offers" itemScope itemType="https://schema.org/Offer">
                        <meta itemProp="priceCurrency" content="EUR" />
                        <span itemProp="price" content={p.price.toFixed(2)}>{formatPrice(p.price)}</span>
                      </span>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <button
                        className="py-2.5 rounded-full bg-muted hover:bg-card border border-border font-semibold text-sm transition-all"
                        onClick={(e) => { e.stopPropagation(); setActive(p); }}
                      >
                        Detalhes
                      </button>
                      <button
                        className="py-2.5 rounded-full bg-gradient-fire text-primary-foreground font-semibold text-sm shadow-fire hover:scale-105 transition-transform"
                        onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                      >
                        + Carrinho
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CARROSSEL DESTAQUE */}
        <section className="py-20 bg-gradient-dark border-y border-border relative overflow-hidden" aria-label="Produtos em destaque">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 reveal">
              <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "var(--font-display)" }}>
                Em <span className="text-gradient-fire">destaque</span>
              </h2>
            </div>
            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-deep">
                <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${carouselIdx * 100}%)` }}>
                  {PRODUCTS.map((p) => (
                    <div key={p.id} className="min-w-full p-10 md:p-16 grid md:grid-cols-2 gap-8 items-center">
                      <div
                        className="aspect-square rounded-2xl mx-auto w-full max-w-xs flame-flicker"
                        style={{ background: `radial-gradient(circle at 50% 30%, ${p.hue}, oklch(0.15 0.02 25))`, boxShadow: `0 30px 60px -10px ${p.hue}` }}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-xs uppercase tracking-widest text-primary mb-2">{p.tag}</p>
                        <h3 className="text-5xl font-black mb-4" style={{ fontFamily: "var(--font-display)" }}>{p.name}</h3>
                        <p className="text-muted-foreground mb-5">{p.description}</p>
                        <HeatBar level={p.heat} large />
                        <div className="mt-6 flex flex-wrap gap-3">
                          <button onClick={() => setActive(p)} className="px-6 py-3 rounded-full border-2 border-border font-bold hover:border-primary">
                            Detalhes
                          </button>
                          <button onClick={() => addToCart(p)} className="px-6 py-3 rounded-full bg-gradient-fire text-primary-foreground font-bold shadow-fire">
                            Adicionar — {formatPrice(p.price)}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Selecionar produto em destaque">
                {PRODUCTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIdx(i)}
                    className={`h-2 rounded-full transition-all ${i === carouselIdx ? "w-10 bg-gradient-fire" : "w-2 bg-border hover:bg-muted-foreground"}`}
                    aria-label={`Slide ${i + 1}`}
                    aria-selected={i === carouselIdx}
                    role="tab"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section id="quiz" className="py-24 md:py-32 relative" aria-labelledby="quiz-title">
          <div className="container mx-auto px-6 max-w-3xl">
            <header className="text-center mb-12 reveal">
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Quiz interativo</p>
              <h2 id="quiz-title" className="text-5xl md:text-6xl font-black mt-4" style={{ fontFamily: "var(--font-display)" }}>
                Qual é o teu <span className="text-gradient-fire">nível de fogo</span>?
              </h2>
            </header>

            <div className="reveal bg-card border border-border rounded-3xl p-8 md:p-12 shadow-deep">
              {!quizDone ? (
                <div>
                  <div className="flex gap-2 mb-8" role="progressbar" aria-valuenow={quizStep + 1} aria-valuemin={1} aria-valuemax={QUIZ.length}>
                    {QUIZ.map((_, i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= quizStep ? "bg-gradient-fire" : "bg-muted"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Pergunta {quizStep + 1} de {QUIZ.length}</p>
                  <h3 className="text-3xl md:text-4xl font-black mb-8" style={{ fontFamily: "var(--font-display)" }}>{QUIZ[quizStep].q}</h3>
                  <div className="grid gap-3">
                    {QUIZ[quizStep].a.map((opt) => (
                      <button key={opt.t} onClick={() => answerQuiz(opt.s)} className="text-left p-5 rounded-2xl border border-border bg-background hover:border-primary hover:bg-muted hover:translate-x-2 transition-all font-medium">
                        {opt.t}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-4 flame-flicker" aria-hidden="true">🔥</div>
                  <p className="text-sm uppercase tracking-widest text-primary mb-2">O teu match</p>
                  <h3 className="text-5xl font-black mb-4 text-gradient-fire" style={{ fontFamily: "var(--font-display)" }}>{quizResult().name}</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">{quizResult().description}</p>
                  <div className="flex justify-center mb-6"><HeatBar level={quizResult().heat} large /></div>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button onClick={() => { addToCart(quizResult()); resetQuiz(); }} className="px-6 py-3 rounded-full bg-gradient-fire text-primary-foreground font-bold shadow-fire">
                      Adicionar ao carrinho
                    </button>
                    <button onClick={resetQuiz} className="px-6 py-3 rounded-full border-2 border-border font-bold hover:border-primary">
                      Refazer quiz
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-16 reveal bg-card border border-border rounded-3xl p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-black" style={{ fontFamily: "var(--font-display)" }}>Contador de ardência</h3>
                <span className="text-3xl font-black text-gradient-fire" style={{ fontFamily: "var(--font-display)" }}>{heatLevel}/5</span>
              </div>
              <label htmlFor="heat-slider" className="sr-only">Nível de ardência</label>
              <input id="heat-slider" type="range" min={1} max={5} value={heatLevel} onChange={(e) => setHeatLevel(Number(e.target.value))} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground mt-2 mb-6">
                <span>Suave</span><span>Médio</span><span>Forte</span><span>Brutal</span><span>Mortal</span>
              </div>
              <div className="grid grid-cols-5 gap-2" aria-hidden="true">
                {[1,2,3,4,5].map((n) => (
                  <div key={n} className={`h-3 rounded-full transition-all duration-300 ${n <= heatLevel ? "bg-gradient-fire shadow-glow" : "bg-muted"}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                {heatLevel === 1 && "Mal sentes. Ideal para bebés do picante."}
                {heatLevel === 2 && "Um aquecimento suave. Bem-vindo."}
                {heatLevel === 3 && "Aqui o jogo começa. Boa escolha."}
                {heatLevel === 4 && "Estás a brincar com o fogo."}
                {heatLevel === 5 && "Que Deus te ajude. 💀"}
              </p>
            </div>
          </div>
        </section>

        {/* HISTÓRIA */}
        <section id="historia" className="py-24 md:py-32 bg-gradient-dark border-y border-border" aria-labelledby="historia-title">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal relative">
              <img
                src={productsImg}
                alt="Garrafas de molho Shapika sobre uma mesa de madeira escura com pimentas"
                width={1280}
                height={896}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="rounded-3xl shadow-deep w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-fire text-primary-foreground rounded-2xl p-6 shadow-fire">
                <div className="text-4xl font-black" style={{ fontFamily: "var(--font-display)" }}>2021</div>
                <div className="text-xs uppercase tracking-wider">Desde</div>
              </div>
            </div>
            <div className="space-y-6 reveal">
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Quem somos</p>
              <h2 id="historia-title" className="text-5xl md:text-6xl font-black" style={{ fontFamily: "var(--font-display)" }}>
                Nascemos do <span className="text-gradient-fire">fogo</span>.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A Shapika começou numa cozinha pequena com uma obsessão grande: criar molhos picantes que tivessem alma. Hoje, somos uma marca artesanal portuguesa que escolhe a dedo cada pimenta, fermenta com paciência e engarrafa com orgulho.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Não fazemos picante por picante. Fazemos sabor — e o picante é o nosso idioma.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[["🌱","Natural","Zero conservantes"],["🇵🇹","Local","Pimentas de produtores"],["🏆","Premiado","3 prémios em 2024"]].map(([e, t, d]) => (
                  <div key={t} className="bg-card border border-border rounded-2xl p-4 text-center">
                    <div className="text-3xl mb-2" aria-hidden="true">{e}</div>
                    <div className="font-bold text-sm">{t}</div>
                    <div className="text-xs text-muted-foreground mt-1">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria" className="py-24 md:py-32" aria-labelledby="galeria-title">
          <div className="container mx-auto px-6">
            <header className="text-center mb-12 reveal">
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Galeria</p>
              <h2 id="galeria-title" className="text-5xl md:text-6xl font-black mt-4" style={{ fontFamily: "var(--font-display)" }}>
                Visualmente <span className="text-gradient-fire">incendiário</span>.
              </h2>
            </header>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PRODUCTS.concat(PRODUCTS.slice(0, 2)).map((p, i) => (
                <button
                  key={i}
                  className={`reveal relative aspect-square rounded-2xl overflow-hidden group cursor-pointer text-left ${i % 5 === 0 ? "md:col-span-2 md:row-span-2 md:aspect-auto" : ""}`}
                  style={{ background: `radial-gradient(circle at 30% 30%, ${p.hue}, oklch(0.12 0.02 25))` }}
                  onClick={() => setActive(p)}
                  aria-label={`Ver ${p.name}`}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-5">
                    <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                      <p className="text-xs uppercase tracking-widest text-white/70">{p.tag}</p>
                      <p className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>{p.name}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 text-2xl float-slow" style={{ animationDelay: `${i * 0.3}s` }} aria-hidden="true">🌶️</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="py-24 md:py-32 bg-gradient-dark border-t border-border" aria-labelledby="contacto-title">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">
            <div className="reveal">
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Contacto</p>
              <h2 id="contacto-title" className="text-5xl md:text-6xl font-black mt-4 mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Diz-nos <span className="text-gradient-fire">olá</span>.
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Encomendas em grosso, parcerias, colaborações ou simplesmente uma palavra picante — estamos sempre à escuta.
              </p>
              <address className="space-y-4 not-italic">
                {[["📍","Lisboa, Portugal"],["📧","ola@shapika.pt"],["📞","+351 910 000 000"],["🕐","Seg–Sex · 9h–18h"]].map(([e, t]) => (
                  <div key={t} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-xl" aria-hidden="true">{e}</div>
                    <span className="font-medium">{t}</span>
                  </div>
                ))}
              </address>
            </div>

            <form
              className="reveal bg-card border border-border rounded-3xl p-8 space-y-5 shadow-deep"
              onSubmit={(e) => { e.preventDefault(); showToast("Mensagem enviada! Vamos responder rapidamente. 🔥"); (e.target as HTMLFormElement).reset(); }}
            >
              {[{label:"Nome",type:"text",id:"nome",auto:"name"},{label:"Email",type:"email",id:"email",auto:"email"},{label:"Assunto",type:"text",id:"assunto",auto:"off"}].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">{f.label}</label>
                  <input required type={f.type} id={f.id} name={f.id} autoComplete={f.auto} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                </div>
              ))}
              <div>
                <label htmlFor="msg" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Mensagem</label>
                <textarea required id="msg" name="msg" rows={4} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none" />
              </div>
              <button type="submit" className="w-full py-4 rounded-full bg-gradient-fire text-primary-foreground font-bold shadow-fire hover:shadow-glow hover:scale-[1.02] transition-all">
                Enviar mensagem 🔥
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-background border-t border-border pt-16 pb-8" role="contentinfo">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl" aria-hidden="true">🌶️</span>
                <span className="text-2xl font-black tracking-widest text-gradient-fire" style={{ fontFamily: "var(--font-display)" }}>SHAPIKA</span>
              </div>
              <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
                Pequena no nome, gigante no picante. Molhos artesanais feitos em Portugal com paixão e fogo.
              </p>
              <div className="flex gap-3">
                {["IG","FB","TT","YT"].map((s) => (
                  <a key={s} href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-xs font-bold hover:bg-gradient-fire hover:text-primary-foreground hover:border-transparent transition-all" aria-label={`Shapika no ${s}`}>{s}</a>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-black mb-4 uppercase text-sm tracking-widest" style={{ fontFamily: "var(--font-display)" }}>Loja</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => scrollTo("colecao")} className="hover:text-foreground">Coleção</button></li>
                <li><button onClick={() => scrollTo("quiz")} className="hover:text-foreground">Quiz</button></li>
                <li><button onClick={() => setCartOpen(true)} className="hover:text-foreground">Carrinho</button></li>
              </ul>
            </div>
            <div>
              <h2 className="font-black mb-4 uppercase text-sm tracking-widest" style={{ fontFamily: "var(--font-display)" }}>Marca</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => scrollTo("historia")} className="hover:text-foreground">História</button></li>
                <li><button onClick={() => scrollTo("contacto")} className="hover:text-foreground">Contacto</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row gap-4 justify-between text-xs text-muted-foreground">
            <p>© 2026 Shapika. Todos os direitos reservados. Feito com 🔥 em Portugal.</p>
            <p>Contém ardência. Manter longe dos fracos de coração.</p>
          </div>
        </div>
      </footer>

      {/* PRODUCT MODAL */}
      {active && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]" onClick={() => setActive(null)} role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
          <div className="bg-card border border-border rounded-3xl max-w-2xl w-full p-8 md:p-10 shadow-deep relative animate-[scale-in_0.25s_ease-out] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActive(null)} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-muted hover:bg-gradient-fire hover:text-primary-foreground transition-colors flex items-center justify-center" aria-label="Fechar">✕</button>
            <div className="w-24 h-32 rounded-xl mb-6 shadow-lg" style={{ background: `linear-gradient(180deg, ${active.hue}, oklch(0.2 0.04 25))`, boxShadow: `0 20px 50px -10px ${active.hue}` }} aria-hidden="true" />
            <p className="text-xs uppercase tracking-widest text-primary mb-2">{active.tag}</p>
            <h3 id="product-modal-title" className="text-5xl font-black mb-4" style={{ fontFamily: "var(--font-display)" }}>{active.name}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">{active.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-background border border-border rounded-2xl p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Ardência</p>
                <div className="mt-2"><HeatBar level={active.heat} /></div>
              </div>
              <div className="bg-background border border-border rounded-2xl p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Scoville</p>
                <p className="text-2xl font-black mt-1" style={{ fontFamily: "var(--font-display)" }}>{active.scoville}</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <span className="text-4xl font-black text-gradient-fire" style={{ fontFamily: "var(--font-display)" }}>{formatPrice(active.price)}</span>
              <button onClick={() => { addToCart(active); setActive(null); }} className="px-6 py-3 rounded-full bg-gradient-fire text-primary-foreground font-bold shadow-fire hover:scale-105 transition-transform">
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]" onClick={() => setCartOpen(false)} />
          <aside className="absolute top-0 right-0 h-full w-full max-w-md bg-card border-l border-border shadow-deep flex flex-col animate-[slide-in-right_0.3s_ease-out]">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 id="cart-title" className="text-3xl font-black" style={{ fontFamily: "var(--font-display)" }}>
                Carrinho <span className="text-muted-foreground text-lg">({cartCount})</span>
              </h2>
              <button onClick={() => setCartOpen(false)} className="w-10 h-10 rounded-full bg-muted hover:bg-gradient-fire hover:text-primary-foreground transition-colors flex items-center justify-center" aria-label="Fechar carrinho">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4" aria-hidden="true">🌶️</div>
                  <p className="text-muted-foreground mb-6">O teu carrinho está vazio.</p>
                  <button onClick={() => { setCartOpen(false); scrollTo("colecao"); }} className="px-6 py-3 rounded-full bg-gradient-fire text-primary-foreground font-bold shadow-fire">
                    Explorar coleção
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 bg-background border border-border rounded-2xl p-4">
                    <div className="w-16 h-20 rounded-lg shrink-0" style={{ background: `linear-gradient(180deg, ${item.product.hue}, oklch(0.2 0.04 25))`, boxShadow: `0 8px 20px -5px ${item.product.hue}` }} aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-primary">{item.product.tag}</p>
                      <h3 className="font-black text-lg leading-tight" style={{ fontFamily: "var(--font-display)" }}>{item.product.name}</h3>
                      <p className="text-sm font-bold text-gradient-fire mt-1">{formatPrice(item.product.price * item.qty)}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-muted rounded-full p-1">
                          <button onClick={() => updateQty(item.product.id, item.qty - 1)} className="w-7 h-7 rounded-full bg-background hover:bg-gradient-fire hover:text-primary-foreground font-bold transition-colors" aria-label={`Diminuir ${item.product.name}`}>−</button>
                          <span className="w-7 text-center text-sm font-bold" aria-live="polite">{item.qty}</span>
                          <button onClick={() => updateQty(item.product.id, item.qty + 1)} className="w-7 h-7 rounded-full bg-background hover:bg-gradient-fire hover:text-primary-foreground font-bold transition-colors" aria-label={`Aumentar ${item.product.name}`}>+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-xs text-muted-foreground hover:text-destructive transition-colors">Remover</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-border p-6 space-y-3 bg-background/40">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span><span>{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Envio {shipping === 0 && <span className="text-primary">(grátis acima de €30)</span>}</span>
                  <span>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-2xl font-black pt-3 border-t border-border" style={{ fontFamily: "var(--font-display)" }}>
                  <span>Total</span><span className="text-gradient-fire">{formatPrice(cartTotal)}</span>
                </div>
                <button onClick={() => { setCartOpen(false); setCheckoutOpen(true); }} className="w-full py-4 rounded-full bg-gradient-fire text-primary-foreground font-bold shadow-fire hover:shadow-glow hover:scale-[1.02] transition-all">
                  Finalizar compra →
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]" onClick={() => setCheckoutOpen(false)} role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <div className="bg-card border border-border rounded-3xl max-w-lg w-full shadow-deep relative animate-[scale-in_0.25s_ease-out] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary mb-1">Checkout seguro 🔒</p>
                  <h2 id="checkout-title" className="text-4xl font-black" style={{ fontFamily: "var(--font-display)" }}>Finalizar compra</h2>
                </div>
                <button onClick={() => setCheckoutOpen(false)} className="w-10 h-10 rounded-full bg-muted hover:bg-gradient-fire hover:text-primary-foreground transition-colors flex items-center justify-center" aria-label="Fechar">✕</button>
              </div>

              <div className="bg-background border border-border rounded-2xl p-4 mb-6 space-y-2">
                {cart.map((i) => (
                  <div key={i.product.id} className="flex justify-between text-sm">
                    <span>{i.qty}× {i.product.name}</span>
                    <span className="font-medium">{formatPrice(i.product.price * i.qty)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm pt-2 border-t border-border">
                  <span className="text-muted-foreground">Envio</span>
                  <span>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-xl font-black pt-2 border-t border-border" style={{ fontFamily: "var(--font-display)" }}>
                  <span>Total</span><span className="text-gradient-fire">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <form onSubmit={handleCheckout} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Nome" id="co-nome" autoComplete="given-name" />
                  <Field label="Apelido" id="co-ap" autoComplete="family-name" />
                </div>
                <Field label="Email" id="co-email" type="email" autoComplete="email" />
                <Field label="Morada" id="co-morada" autoComplete="street-address" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Código postal" id="co-cp" autoComplete="postal-code" />
                  <Field label="Cidade" id="co-cidade" autoComplete="address-level2" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Cartão (simulado)</label>
                  <input required placeholder="4242 4242 4242 4242" inputMode="numeric" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-mono" />
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <input required placeholder="MM/AA" className="px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-mono" />
                    <input required placeholder="CVV" inputMode="numeric" maxLength={4} className="px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-mono" />
                  </div>
                </div>
                <button type="submit" className="w-full py-4 rounded-full bg-gradient-fire text-primary-foreground font-bold shadow-fire hover:shadow-glow hover:scale-[1.02] transition-all">
                  Pagar {formatPrice(cartTotal)} 🔥
                </button>
                <p className="text-[11px] text-muted-foreground text-center">
                  Demonstração — nenhum pagamento real será processado.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ORDER CONFIRMATION */}
      {orderConfirmed && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]" role="dialog" aria-modal="true">
          <div className="bg-card border border-border rounded-3xl max-w-md w-full p-10 text-center shadow-deep animate-[scale-in_0.25s_ease-out]">
            <div className="text-7xl mb-4 flame-flicker" aria-hidden="true">🎉</div>
            <h2 className="text-4xl font-black mb-3 text-gradient-fire" style={{ fontFamily: "var(--font-display)" }}>Encomenda confirmada!</h2>
            <p className="text-muted-foreground mb-2">Obrigado pela tua compra. Vais receber um email com os detalhes.</p>
            <p className="text-sm mb-6">
              Encomenda <span className="font-mono font-bold">{orderConfirmed.id}</span> · Total <span className="font-bold">{formatPrice(orderConfirmed.total)}</span>
            </p>
            <button onClick={() => setOrderConfirmed(null)} className="w-full py-3 rounded-full bg-gradient-fire text-primary-foreground font-bold shadow-fire">
              Continuar a explorar
            </button>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[130] bg-card border border-primary rounded-2xl px-6 py-4 shadow-fire animate-[slide-in-right_0.3s_ease-out] max-w-sm" role="status" aria-live="polite">
          <p className="font-medium">{toast}</p>
        </div>
      )}
    </div>
  );
}

function HeatBar({ level, large = false }: { level: number; large?: boolean }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`Nível de ardência ${level} de 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`transition-all ${large ? "text-2xl" : "text-base"} ${n <= level ? "opacity-100 grayscale-0" : "opacity-25 grayscale"}`} aria-hidden="true">🌶️</span>
      ))}
    </div>
  );
}

function Field({ label, id, type = "text", autoComplete }: { label: string; id: string; type?: string; autoComplete?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">{label}</label>
      <input required id={id} name={id} type={type} autoComplete={autoComplete} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
    </div>
  );
}
