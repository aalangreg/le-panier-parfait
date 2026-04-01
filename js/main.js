const products = [
  {
    name: "Panier Crystal",
    description: "Jus Crystal, fruits frais, chocolats Ferrero",
    price: "15.000 FCFA",
    image: null,
    alt: "Illustration du Panier Crystal"
  },
  {
    name: "Panier Femme",
    description: "Soins corporels, accessoires beauté",
    price: "18.000 FCFA",
    image: "assets/images/femme/panier-femme.jpeg",
    alt: "Panier Femme"
  },
  {
    name: "Panier Épicerie",
    description: "Produits du quotidien, La Vache qui rit, jus, pain",
    price: "23.000 FCFA",
    image: "assets/images/epicerie/panier-epicerie.jpeg",
    alt: "Panier Épicerie"
  },
  {
    name: "Panier Homme",
    description: "Soins Nivea, montre, accessoires homme",
    price: "28.000 FCFA",
    image: "assets/images/homme/panier-homme.jpeg",
    alt: "Panier Homme"
  },
  {
    name: "Panier Fruit",
    description: "Assortiment de fruits frais",
    price: "30.000 FCFA",
    image: "assets/images/fruit/panier-fruit.jpeg",
    alt: "Panier Fruit"
  },
  {
    name: "Panier Baileys",
    description: "Baileys, chocolats, snacks gourmands",
    price: "30.000 FCFA",
    image: "assets/images/baileys/panier-baileys.jpeg",
    alt: "Panier Baileys"
  },
  {
    name: "Panier Garnis",
    description: "Camembert Président, vin, biscuits fins",
    price: "60.000 FCFA",
    image: "assets/images/garnis/panier-garnis.jpeg",
    alt: "Panier Garnis"
  },
  {
    name: "Money Cake",
    description: "Gâteau composé de billets, fleurs et décorations",
    price: "Prix sur demande",
    image: "assets/images/money-cake/money-cake.jpeg",
    alt: "Money Cake"
  },
  {
    name: "Money Bouquet",
    description: "Bouquet de billets et fleurs",
    price: "Prix sur demande",
    image: null,
    alt: "Illustration du Money Bouquet"
  },
  {
    name: "Bouquet de Fleurs",
    description: "Bouquet artisanal fait main",
    price: "Prix sur demande",
    image: "assets/images/bouquet-fleurs/bouquet-fleurs.jpeg",
    alt: "Bouquet de Fleurs"
  }
];

const createPlaceholder = (name) => `
  <div class="flex h-full min-h-[280px] items-center justify-center bg-gradient-to-br from-cream via-white to-stone-100 p-6 text-center">
    <div>
      <div class="mx-auto h-16 w-16 rounded-full bg-burgundy/10"></div>
      <p class="mt-5 font-serif text-4xl font-semibold text-burgundy">${name}</p>
    </div>
  </div>
`;

const createProductCard = (product) => {
  const whatsappMessage = encodeURIComponent(`Bonjour, je suis intéressé(e) par le ${product.name}`);
  const media = product.image
    ? `<img src="${product.image}" alt="${product.alt}" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">`
    : createPlaceholder(product.name);

  return `
    <article class="reveal group overflow-hidden rounded-[28px] border border-stone-100 bg-white shadow-soft">
      <div class="h-72 overflow-hidden">
        ${media}
      </div>
      <div class="p-6">
        <p class="text-xs font-bold uppercase tracking-[0.28em] text-gold">Collection premium</p>
        <h3 class="mt-3 font-serif text-4xl font-semibold text-burgundy">${product.name}</h3>
        <p class="mt-3 text-sm leading-7 text-stone-600">${product.description}</p>
        <div class="mt-6 flex items-center justify-between gap-4">
          <span class="text-lg font-extrabold uppercase tracking-[0.08em] text-burgundy">${product.price}</span>
          <a href="https://wa.me/24107955233?text=${whatsappMessage}" target="_blank" rel="noopener noreferrer" class="inline-flex rounded-full bg-gold px-5 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-white transition hover:opacity-90">
            Commander
          </a>
        </div>
      </div>
    </article>
  `;
};

const renderProducts = () => {
  const grid = document.querySelector("#product-grid");
  if (!grid) return;
  grid.innerHTML = products.map(createProductCard).join("");
};

const setupMobileMenu = () => {
  const toggle = document.querySelector("#menu-toggle");
  const menu = document.querySelector("#mobile-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
    });
  });
};

const setupSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
};

const setupRevealAnimations = () => {
  const revealItems = document.querySelectorAll(".reveal");
  revealItems.forEach((item) => {
    item.classList.add("translate-y-8", "opacity-0", "transition", "duration-700");
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("translate-y-8", "opacity-0");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => observer.observe(item));
};

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  setupMobileMenu();
  setupSmoothScroll();
  setupRevealAnimations();
});
