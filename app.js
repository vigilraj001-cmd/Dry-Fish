// Suvai Dry Fish - Application Logic
// Owner: Iqbal | Phone: 9361480769
// Address: Gandhi Market Road, near Pollachi Railway Bus Stop, Pollachi, Coimbatore - 642006

const PRODUCTS = [
    { id:"nethili", name:"Nethili Dry Fish", tamilName:"நெத்திலி கருவாடு", category:"small-fish", price:550, image:"assets/nethili.png", description:"Premium sun-dried anchovies. Very clean, crispy when deep-fried, and highly mineral-rich. A household favourite.", tag:"Best Seller" },
    { id:"paalsura", name:"Paalsura Dry Fish", tamilName:"பால்சுறா கருவாடு", category:"premium", price:1000, image:"assets/paalsura.png", description:"Boneless dried shark meat. Packed with protein and traditionally recommended for lactating mothers and health recovery.", tag:"Premium Grade" },
    { id:"prawn", name:"Prawn Dry Fish", tamilName:"இறால் கருவாடு", category:"shellfish", price:750, image:"assets/prawn.png", description:"Carefully shelled and dried coastal prawns. Intense, savory umami depth to gravies and stir-fries.", tag:"Top Rated" },
    { id:"vanjaram", name:"Vanjaram Dry Fish", tamilName:"வஞ்சரம் கருவாடு", category:"premium", price:980, image:"assets/hero_banner.png", description:"King of dry fish. Slices of premium Seer Fish / King Mackerel, salt-cured to perfection. Rich, meaty, and near-boneless.", tag:"Luxury Choice" },
    { id:"mathii", name:"Mathii Dry Fish", tamilName:"மத்தி கருவாடு", category:"small-fish", price:450, image:"assets/hero_banner.png", description:"Sun-dried oil sardines. Rich Omega-3 fatty acids and a strong traditional seafood aroma. Perfect for clay pot curries.", tag:"Traditional" },
    { id:"iirakunju", name:"Iirakunju Dry Fish", tamilName:"ஈரக்குஞ்சு கருவாடு", category:"small-fish", price:600, image:"assets/nethili.png", description:"Tiny baby anchovies (whitebait), dried immediately on harvest. Incredibly light, crunchy, and kid-friendly.", tag:"Rare Find" },
    { id:"eatta", name:"Eatta Dry Fish", tamilName:"ஏட்டா கருவாடு", category:"budget", price:650, image:"assets/paalsura.png", description:"Salt-cured catfish blocks. Firm, dense, satisfying texture that behaves like chicken in curries.", tag:"Meaty" },
    { id:"kolli", name:"Kolli Dry Fish", tamilName:"கொள்ளி கருவாடு", category:"budget", price:250, image:"assets/hero_banner.png", description:"Sun-dried flying fish. Very affordable, lightly salted, prepared following time-honoured drying techniques.", tag:"Value Pack" },
    { id:"chennakooni", name:"Chennakooni Dry Fish", tamilName:"சென்னாகூனி கருவாடு", category:"shellfish", price:350, image:"assets/prawn.png", description:"Extremely small dried krill/shrimp. Best roasted dry on a pan with onions, garlic, and red chilies.", tag:"Local Delicacy" },
    { id:"mullan", name:"Mullan Dry Fish", tamilName:"முள்ளன் கருவாடு", category:"small-fish", price:420, image:"assets/hero_banner.png", description:"Dried silver belly / ponyfish. Thin, salty, flat-bodied fish that gets perfectly crispy when pan-fried.", tag:"Crispy Fry" },
    { id:"neimeen", name:"Neimeen Dry Fish", tamilName:"நெய்மீன் கருவாடு", category:"premium", price:850, image:"assets/paalsura.png", description:"Salted slices of premium queenfish. Buttery texture, robust flavour, and highly satisfying.", tag:"Chef's Special" },
    { id:"bombay", name:"Bombay Dry Fish", tamilName:"பம்பாய் கருவாடு", category:"budget", price:650, image:"assets/hero_banner.png", description:"Classic dried Bombay Duck. Thin, crumbly texture and very strong flavor when cooked. Great for dry chutneys.", tag:"Strong Flavor" },
    { id:"vaala", name:"Vaala Dry Fish", tamilName:"வாளை கருவாடு", category:"budget", price:550, image:"assets/hero_banner.png", description:"Sun-dried ribbon fish fillets. Long and flat cuts, salted evenly. Excellent for tangier tomato-tamarind curries.", tag:"Coastal Classic" },
    { id:"small-prawn", name:"Small Prawn", tamilName:"சிறிய இறால் கருவாடு", category:"shellfish", price:480, image:"assets/prawn.png", description:"Small size sun-dried prawns, sorted and cleaned. High concentration of sweetness and oceanic aroma.", tag:"Great Value" },
    { id:"big-prawn", name:"Big Prawn", tamilName:"பெரிய இறால் கருவாடு", category:"shellfish", price:650, image:"assets/prawn.png", description:"Jumbo sized sun-dried prawns, selected for large, meaty bodies. Beautiful texture and exquisite visual presence.", tag:"Premium Shell" },
    { id:"small-eatta", name:"Small Eatta", tamilName:"சிறிய ஏட்டா கருவாடு", category:"budget", price:600, image:"assets/paalsura.png", description:"Catfish dry fish chunks in bite-sized pieces. Standard salted curing, quick to cook and absorb masala spices.", tag:"Easy Cook" },
    { id:"big-eatta", name:"Big Eatta", tamilName:"பெரிய ஏட்டா கருவாடு", category:"budget", price:800, image:"assets/paalsura.png", description:"Large, thick fillets of catfish dry fish. Rich white flesh with salt layers, ideal for authentic karuvadu kuzhambu.", tag:"Thick Fillet" },
    { id:"panna", name:"Panna Dry Fish", tamilName:"பன்னா கருவாடு", category:"budget", price:380, image:"assets/paalsura.png", description:"Dried Croaker Fish. Tender white meat flakes, highly affordable and great for pan frying.", tag:"Budget Buy" }
];

let cart = [];
let currentCategory = "all";
let searchQuery = "";
let currentSort = "default";
let productGrid, cartBadge, cartDrawer, cartItemsContainer, cartTotalDisplay, searchInput, sortSelect, categoryFilters;

document.addEventListener("DOMContentLoaded", () => {
    productGrid = document.getElementById("product-grid");
    cartBadge = document.getElementById("cart-badge");
    cartDrawer = document.getElementById("cart-drawer");
    cartItemsContainer = document.getElementById("cart-items-list");
    cartTotalDisplay = document.getElementById("cart-total-amount");
    searchInput = document.getElementById("search-input");
    sortSelect = document.getElementById("sort-select");
    categoryFilters = document.querySelectorAll(".filter-btn");

    loadCart();
    renderCatalog();
    updateCartUI();

    if (searchInput) searchInput.addEventListener("input", e => { searchQuery = e.target.value.trim().toLowerCase(); renderCatalog(); });
    if (sortSelect) sortSelect.addEventListener("change", e => { currentSort = e.target.value; renderCatalog(); });

    categoryFilters.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryFilters.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentCategory = btn.dataset.category;
            renderCatalog();
        });
    });

    const cartOverlay = document.getElementById("cart-overlay");
    if (cartOverlay) cartOverlay.addEventListener("click", toggleCart);

    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("active"); });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));
});

function renderCatalog() {
    if (!productGrid) return;
    let filtered = PRODUCTS.filter(p => {
        const matchCat = currentCategory === "all" || p.category === currentCategory;
        const matchSearch = p.name.toLowerCase().includes(searchQuery) || p.tamilName.includes(searchQuery) || p.description.toLowerCase().includes(searchQuery);
        return matchCat && matchSearch;
    });
    if (currentSort === "price-asc") filtered.sort((a,b) => a.price - b.price);
    else if (currentSort === "price-desc") filtered.sort((a,b) => b.price - a.price);
    else if (currentSort === "name-asc") filtered.sort((a,b) => a.name.localeCompare(b.name));

    productGrid.innerHTML = "";
    if (filtered.length === 0) {
        productGrid.innerHTML = `<div class="no-results-card"><i class="fas fa-search"></i><h3>No Dry Fish Found</h3><p>Try adjusting your filters or spelling!</p></div>`;
        return;
    }
    filtered.forEach(p => {
        const cartItem = cart.find(i => i.id === p.id);
        const qty = cartItem ? cartItem.qty : 0;
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div class="card-image-wrap">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
                ${p.tag ? `<span class="card-badge">${p.tag}</span>` : ""}
            </div>
            <div class="card-content">
                <div class="card-header-info">
                    <span class="card-category-label">${formatCategory(p.category)}</span>
                    <h3 class="card-title">${p.name}</h3>
                    <h4 class="card-tamil-title">${p.tamilName}</h4>
                </div>
                <p class="card-desc">${p.description}</p>
                <div class="card-price-row">
                    <div class="price-box">
                        <span class="price-val">₹${p.price}</span>
                        <span class="price-unit">/ 1 kg</span>
                    </div>
                </div>
                <div class="card-actions">
                    ${qty > 0 ? `
                        <div class="qty-selector">
                            <button onclick="updateQty('${p.id}',${qty-1})" class="qty-btn">-</button>
                            <span class="qty-value">${qty} kg</span>
                            <button onclick="updateQty('${p.id}',${qty+1})" class="qty-btn">+</button>
                        </div>` : `
                        <button onclick="addToCart('${p.id}')" class="btn btn-primary add-to-cart-btn">
                            <i class="fas fa-shopping-basket"></i> Add to Basket
                        </button>`}
                </div>
            </div>`;
        productGrid.appendChild(card);
    });
}

function formatCategory(cat) {
    const map = { premium:"💎 Premium Steak", "small-fish":"🐟 Small Fry", shellfish:"🦐 Shellfish", budget:"💰 Daily Value" };
    return map[cat] || "Dry Fish";
}

function toggleCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.toggle("open");
    document.getElementById("cart-overlay").classList.toggle("open");
    document.body.classList.toggle("cart-open-overflow");
}

function addToCart(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id:product.id, name:product.name, tamilName:product.tamilName, price:product.price, image:product.image, qty:1 });
    saveCart(); renderCatalog(); updateCartUI();
    if (cartBadge) { cartBadge.classList.add("shake-badge"); setTimeout(() => cartBadge.classList.remove("shake-badge"), 500); }
}

function updateQty(id, qty) {
    if (qty <= 0) cart = cart.filter(i => i.id !== id);
    else { const item = cart.find(i => i.id === id); if (item) item.qty = qty; }
    saveCart(); renderCatalog(); updateCartUI();
}

function updateCartUI() {
    if (!cartItemsContainer || !cartTotalDisplay || !cartBadge) return;
    const totalItems = cart.reduce((a,c) => a + c.qty, 0);
    cartBadge.textContent = totalItems;
    totalItems > 0 ? cartBadge.classList.remove("hidden") : cartBadge.classList.add("hidden");
    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<div class="empty-cart-state"><i class="fas fa-shopping-cart"></i><p>Your basket is empty.</p><button onclick="toggleCart()" class="btn btn-secondary" style="margin-top:15px;">Browse Dry Fish</button></div>`;
        cartTotalDisplay.textContent = "₹0";
        document.getElementById("checkout-form-container").classList.add("hidden");
        return;
    }
    document.getElementById("checkout-form-container").classList.remove("hidden");
    let total = 0;
    cart.forEach(item => {
        const sub = item.price * item.qty;
        total += sub;
        const el = document.createElement("div");
        el.className = "cart-item";
        el.innerHTML = `
            <div class="cart-item-img"><img src="${item.image}" alt="${item.name}"></div>
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">₹${item.price} / kg</p>
                <div class="cart-item-qty-row">
                    <div class="qty-selector small-selector">
                        <button onclick="updateQty('${item.id}',${item.qty-1})" class="qty-btn">-</button>
                        <span class="qty-value">${item.qty} kg</span>
                        <button onclick="updateQty('${item.id}',${item.qty+1})" class="qty-btn">+</button>
                    </div>
                    <span class="cart-item-subtotal">₹${sub}</span>
                </div>
            </div>`;
        cartItemsContainer.appendChild(el);
    });
    cartTotalDisplay.textContent = `₹${total}`;
}

function saveCart() { localStorage.setItem("suvai_dry_fish_cart", JSON.stringify(cart)); }

function loadCart() {
    try { const s = localStorage.getItem("suvai_dry_fish_cart"); if (s) cart = JSON.parse(s); }
    catch(e) { cart = []; }
}

function processCheckout(event) {
    event.preventDefault();
    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();
    if (!name || !phone || !address) { alert("Please fill in all details to complete your order."); return; }
    if (cart.length === 0) { alert("Your cart is empty!"); return; }
    let total = 0, itemsText = "";
    cart.forEach((item,i) => {
        const sub = item.price * item.qty;
        total += sub;
        itemsText += `${i+1}. *${item.name}* (${item.tamilName})\n   Qty: *${item.qty} kg* @ ₹${item.price}/kg\n   Subtotal: ₹${sub}\n\n`;
    });
    const orderId = "SDF-" + Math.floor(100000 + Math.random() * 900000);
    const dateText = new Date().toLocaleString();
    const message = `🐟 *SUVAI DRY FISH ORDER* 🐟\n--------------------------------\n*Order ID:* ${orderId}\n*Date:* ${dateText}\n\n*Customer Details:*\n👤 *Name:* ${name}\n📞 *Contact:* ${phone}\n📍 *Delivery Address:*\n${address}\n\n--------------------------------\n*Order Summary:*\n${itemsText}--------------------------------\n*Grand Total:* *₹${total}*\n--------------------------------\n*Thank you for ordering with Suvai Dry Fish!*\nOwner Iqbal will contact you shortly to confirm.`;
    const url = `https://wa.me/919361480769?text=${encodeURIComponent(message)}`;
    cart = []; saveCart(); updateCartUI(); renderCatalog(); toggleCart();
    window.open(url, "_blank");
}

function quickBuy(id) { addToCart(id); toggleCart(); }
