const products = [
  {
    id: "summit-a4",
    name: "Summit A4 Touring",
    type: "all-season",
    size: "225/55R17",
    price: 142,
    rating: "4.8",
    stock: "In stock",
    image: "assets/tire-all-season.png",
  },
  {
    id: "apex-gt",
    name: "Apex GT Sport",
    type: "performance",
    size: "245/45R18",
    price: 196,
    rating: "4.9",
    stock: "Low stock",
    image: "assets/tire-performance.png",
  },
  {
    id: "ridge-x",
    name: "Ridge X Terrain",
    type: "all-terrain",
    size: "265/70R17",
    price: 218,
    rating: "4.7",
    stock: "In stock",
    image: "assets/tire-terrain.png",
  },
  {
    id: "metro-eco",
    name: "Metro Eco Grip",
    type: "all-season",
    size: "215/60R16",
    price: 118,
    rating: "4.6",
    stock: "In stock",
    image: "assets/tire-economy.png",
  },
];

const services = [
  {
    id: "install",
    name: "Tire Mount & Balance",
    detail: "Professional install with new valve stems, road-force balance, and final pressure check.",
    price: 89,
  },
  {
    id: "alignment",
    name: "Four-Wheel Alignment",
    detail: "Digital alignment check and adjustment to protect tread life and handling.",
    price: 129,
  },
  {
    id: "coverage",
    name: "Road Hazard Plus",
    detail: "Twelve months of flat repair and replacement support for eligible tire damage.",
    price: 59,
  },
];

const cart = new Map();

const productGrid = document.querySelector("#productGrid");
const serviceGrid = document.querySelector("#serviceGrid");
const cartDrawer = document.querySelector("#cartDrawer");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function cardButton(item, label) {
  return `<button class="button dark" type="button" data-add="${item.id}">${label}</button>`;
}

function renderProducts(filter = "all") {
  const filtered = filter === "all" ? products : products.filter((product) => product.type === filter);

  productGrid.innerHTML = filtered
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name} tire">
          <div class="product-body">
            <div>
              <div class="product-meta">
                <span>${product.size}</span>
                <span class="rating">${product.rating} / 5</span>
              </div>
              <h3>${product.name}</h3>
              <p>${product.type.replace("-", " ")} tire with reliable grip and quiet road manners.</p>
            </div>
            <div class="price-line">
              <span class="price">${formatCurrency(product.price)}</span>
              <span class="stock">${product.stock}</span>
            </div>
            ${cardButton(product, "Add tire")}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderServices() {
  serviceGrid.innerHTML = services
    .map(
      (service) => `
        <article class="service-card">
          <div>
            <h3>${service.name}</h3>
            <p>${service.detail}</p>
          </div>
          <div>
            <div class="service-price">${formatCurrency(service.price)}</div>
            ${cardButton(service, "Add service")}
          </div>
        </article>
      `,
    )
    .join("");
}

function getItem(id) {
  return products.find((product) => product.id === id) || services.find((service) => service.id === id);
}

function addToCart(id) {
  const item = getItem(id);
  if (!item) return;

  const quantity = cart.get(id)?.quantity || 0;
  cart.set(id, { item, quantity: quantity + 1 });
  renderCart();
  openCart();
}

function removeFromCart(id) {
  const entry = cart.get(id);
  if (!entry) return;

  if (entry.quantity <= 1) {
    cart.delete(id);
  } else {
    cart.set(id, { ...entry, quantity: entry.quantity - 1 });
  }

  renderCart();
}

function renderCart() {
  const entries = Array.from(cart.values());
  const itemCount = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  const total = entries.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);

  cartCount.textContent = itemCount;
  cartTotal.textContent = formatCurrency(total);

  cartItems.innerHTML = entries.length
    ? entries
        .map(
          ({ item, quantity }) => `
            <div class="cart-line">
              <div>
                <strong>${item.name}</strong>
                <span>${quantity} × ${formatCurrency(item.price)}</span>
              </div>
              <button class="chip" type="button" data-remove="${item.id}">Remove</button>
            </div>
          `,
        )
        .join("")
    : `<div class="cart-empty">Add tires or services to build an order.</div>`;
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

document.querySelector("#openCart").addEventListener("click", openCart);
document.querySelector("#closeCart").addEventListener("click", closeCart);

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  const removeButton = event.target.closest("[data-remove]");
  const filterButton = event.target.closest("[data-filter]");

  if (addButton) addToCart(addButton.dataset.add);
  if (removeButton) removeFromCart(removeButton.dataset.remove);

  if (filterButton) {
    document.querySelectorAll("[data-filter]").forEach((button) => button.classList.remove("active"));
    filterButton.classList.add("active");
    renderProducts(filterButton.dataset.filter);
  }

  if (event.target === cartDrawer) closeCart();
});

document.querySelector("#fitmentForm").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector('[data-filter="all-season"]').click();
  document.querySelector("#shop").scrollIntoView({ behavior: "smooth" });
});

renderProducts();
renderServices();
renderCart();
