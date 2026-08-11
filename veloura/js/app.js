/* ==========================================================================
   VELOURA — Shared application logic
   Renders the navbar/footer/cart-drawer into every page, and manages
   cart + wishlist state via localStorage so it persists across pages.
   ========================================================================== */

const STORE_KEYS = { cart:"veloura_cart", wishlist:"veloura_wishlist", searchHist:"veloura_search_history" };

/* ---------- storage helpers ---------- */
function readStore(key){ try{ return JSON.parse(localStorage.getItem(key)) || []; }catch(e){ return []; } }
function writeStore(key, val){ localStorage.setItem(key, JSON.stringify(val)); }

function getCart(){ return readStore(STORE_KEYS.cart); }
function getWishlist(){ return readStore(STORE_KEYS.wishlist); }

function addToCart(productId, opts={}){
  const cart = getCart();
  const size = opts.size || "One Size", color = opts.color || null, qty = opts.qty || 1;
  const existing = cart.find(c => c.id===productId && c.size===size && c.color===color);
  if(existing){ existing.qty += qty; } else { cart.push({ id:productId, size, color, qty, saved:false }); }
  writeStore(STORE_KEYS.cart, cart);
  updateBadges();
  showToast(`${findProduct(productId).name} added to cart`);
}
function removeFromCart(index){ const cart=getCart(); cart.splice(index,1); writeStore(STORE_KEYS.cart,cart); updateBadges(); renderCartDrawer(); if(window.renderCartPage) renderCartPage(); }
function setCartQty(index, qty){ const cart=getCart(); if(qty<1) qty=1; cart[index].qty=qty; writeStore(STORE_KEYS.cart,cart); updateBadges(); renderCartDrawer(); if(window.renderCartPage) renderCartPage(); }
function toggleSaveForLater(index){ const cart=getCart(); cart[index].saved=!cart[index].saved; writeStore(STORE_KEYS.cart,cart); if(window.renderCartPage) renderCartPage(); }

function isWished(id){ return getWishlist().includes(id); }
function toggleWishlist(id){
  let list = getWishlist();
  if(list.includes(id)){ list = list.filter(x=>x!==id); showToast("Removed from wishlist"); }
  else { list.push(id); showToast("Saved to wishlist"); }
  writeStore(STORE_KEYS.wishlist, list);
  updateBadges();
  document.querySelectorAll(`.pc-fav[data-id="${id}"]`).forEach(b=>b.classList.toggle("active", isWished(id)));
  if(window.renderWishlistPage) renderWishlistPage();
}
function moveWishToCart(id){ addToCart(id); toggleWishlist(id); }

function cartCount(){ return getCart().filter(c=>!c.saved).reduce((s,c)=>s+c.qty,0); }
function updateBadges(){
  document.querySelectorAll(".cart-badge").forEach(b=>{ b.textContent = cartCount(); b.style.display = cartCount()>0 ? "flex":"none"; });
  document.querySelectorAll(".wish-badge").forEach(b=>{ b.textContent = getWishlist().length; b.style.display = getWishlist().length>0 ? "flex":"none"; });
}

/* ---------- toasts ---------- */
function showToast(msg){
  let stack = document.getElementById("toast-stack");
  if(!stack){ stack = document.createElement("div"); stack.id="toast-stack"; document.body.appendChild(stack); }
  const t = document.createElement("div"); t.className="toast";
  t.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg><span>${msg}</span>`;
  stack.appendChild(t);
  setTimeout(()=>{ t.style.opacity="0"; t.style.transform="translateY(10px)"; setTimeout(()=>t.remove(),300); }, 2600);
}

/* ---------- icons ---------- */
const ICONS = {
  search:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>`,
  user:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>`,
  heart:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.6-9.5-9C.8 8.2 2 4.5 5.5 4c2-.3 3.7.8 4.5 2.2C10.8 4.8 12.5 3.7 14.5 4 18 4.5 19.2 8.2 17.5 12c-2.5 4.4-9.5 9-9.5 9z"/></svg>`,
  bag:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>`,
  box:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>`,
  close:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
  menu:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,
};

/* ---------- navbar / footer templates ---------- */
function headerTemplate(active){
  const link = (href,label) => `<a href="${href}" ${active===label?'style="color:var(--ink)"':''}>${label}</a>`;
  return `
  <div class="promo-bar">THIS SEASON — FREE SHIPPING ON ORDERS OVER $120 · CODE VELOURA10 FOR 10% OFF</div>
  <div class="navbar">
    <div class="wrap nav-inner">
      <button class="icon-btn mobile-toggle" id="mobileNavToggle" aria-label="Menu">${ICONS.menu}</button>
      <a href="index.html" class="logo">Vel<em>our</em>a</a>
      <nav class="nav-links" id="navLinks">
        ${link("index.html","Home")}
        ${link("shop.html","Categories")}
        ${link("shop.html?filter=new","New Arrivals")}
        ${link("shop.html?filter=sale","Deals")}
        ${link("dashboard.html","Dashboard")}
        ${link("wishlist.html","Wishlist")}
        ${link("dashboard.html#orders","Orders")}
      </nav>
      <div class="nav-search">
        <input type="text" id="navSearchInput" placeholder="Search for products, brands..." autocomplete="off">
        <button aria-label="Search" id="navSearchBtn">${ICONS.search}</button>
        <div class="search-panel" id="searchPanel"></div>
      </div>
      <div class="nav-icons">
        <a href="dashboard.html" class="icon-btn" aria-label="Account">${ICONS.user}</a>
        <a href="wishlist.html" class="icon-btn" aria-label="Wishlist">${ICONS.heart}<span class="badge wish-badge" style="display:none">0</span></a>
        <button class="icon-btn" id="cartOpenBtn" aria-label="Cart">${ICONS.bag}<span class="badge cart-badge" style="display:none">0</span></button>
      </div>
    </div>
  </div>`;
}

function footerTemplate(){
  return `
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <a href="index.html" class="logo">Vel<em>our</em>a</a>
      <p>Considered clothing and objects for a quieter kind of luxury. Designed in small batches, made to be worn for years.</p>
      <div class="newsletter-row">
        <input type="email" placeholder="Your email">
        <button class="btn btn-gold btn-sm" onclick="showToast('Subscribed — welcome to Veloura')">Join</button>
      </div>
    </div>
    <div class="footer-col"><h5>Company</h5>
      <a href="#">About Us</a><a href="#">Careers</a><a href="#">Community</a><a href="#">Contact</a>
    </div>
    <div class="footer-col"><h5>Support</h5>
      <a href="#">FAQ</a><a href="#">Shipping Policy</a><a href="#">Returns &amp; Refunds</a><a href="#">Track Order</a>
    </div>
    <div class="footer-col"><h5>Legal</h5>
      <a href="#">Privacy Policy</a><a href="#">Terms &amp; Conditions</a><a href="#">Accessibility</a>
    </div>
    <div class="footer-col"><h5>Shop</h5>
      <a href="shop.html">New Arrivals</a><a href="shop.html?filter=sale">Deals</a><a href="wishlist.html">Wishlist</a>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <span>© 2026 Veloura. All rights reserved.</span>
    <div class="social-row">
      <a href="#" aria-label="Instagram">IG</a><a href="#" aria-label="Pinterest">PI</a><a href="#" aria-label="TikTok">TT</a>
    </div>
  </div>`;
}

function cartDrawerTemplate(){
  return `
  <div class="overlay" id="drawerOverlay"></div>
  <div class="drawer" id="cartDrawer">
    <div class="drawer-head">
      <h3 style="font-size:20px;">Your Bag</h3>
      <button class="icon-btn" id="cartCloseBtn">${ICONS.close}</button>
    </div>
    <div class="drawer-body" id="cartDrawerBody"></div>
    <div class="drawer-foot" id="cartDrawerFoot"></div>
  </div>`;
}

/* ---------- render into page ---------- */
function mountChrome(active){
  const h = document.getElementById("site-header"); if(h) h.innerHTML = headerTemplate(active);
  const f = document.getElementById("site-footer"); if(f) f.innerHTML = footerTemplate();
  const d = document.getElementById("drawer-root"); if(d) d.innerHTML = cartDrawerTemplate();
  wireChromeEvents();
  updateBadges();
  renderCartDrawer();
}

function wireChromeEvents(){
  const openBtn = document.getElementById("cartOpenBtn");
  const closeBtn = document.getElementById("cartCloseBtn");
  const overlay = document.getElementById("drawerOverlay");
  const drawer = document.getElementById("cartDrawer");
  if(openBtn) openBtn.addEventListener("click", ()=>{ drawer.classList.add("open"); overlay.classList.add("open"); renderCartDrawer(); });
  const closeDrawer = ()=>{ drawer.classList.remove("open"); overlay.classList.remove("open"); };
  if(closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if(overlay) overlay.addEventListener("click", closeDrawer);

  const toggle = document.getElementById("mobileNavToggle");
  const links = document.getElementById("navLinks");
  if(toggle) toggle.addEventListener("click", ()=>{
    links.style.display = links.style.display==="flex" ? "none":"flex";
    links.style.cssText += "position:absolute;top:100%;left:0;width:100%;background:var(--ivory);flex-direction:column;padding:18px 32px;border-bottom:1px solid var(--line);gap:16px;";
  });

  const input = document.getElementById("navSearchInput");
  const panel = document.getElementById("searchPanel");
  if(input){
    input.addEventListener("focus", ()=> renderSearchPanel(input.value));
    input.addEventListener("input", ()=> renderSearchPanel(input.value));
    input.addEventListener("keydown", (e)=>{ if(e.key==="Enter" && input.value.trim()) goSearch(input.value.trim()); });
    document.addEventListener("click", (e)=>{ if(!e.target.closest(".nav-search")) panel.classList.remove("open"); });
  }
}

function goSearch(term){
  const hist = readStore(STORE_KEYS.searchHist);
  writeStore(STORE_KEYS.searchHist, [term, ...hist.filter(h=>h!==term)].slice(0,6));
  window.location.href = `shop.html?q=${encodeURIComponent(term)}`;
}

function renderSearchPanel(query){
  const panel = document.getElementById("searchPanel");
  if(!panel) return;
  panel.classList.add("open");
  const trending = ["Silk saree","Leather boots","Chronograph watch","Linen blazer","Kids backpack"];
  const hist = readStore(STORE_KEYS.searchHist);

  if(!query){
    panel.innerHTML = `
      ${hist.length ? `<h5>Recent searches</h5><div style="margin-bottom:14px;">${hist.map(h=>`<span class="search-chip" onclick="goSearch('${h}')" style="cursor:pointer">${h}</span>`).join("")}</div>`:""}
      <h5>Trending now</h5>
      <div>${trending.map(t=>`<span class="search-chip" onclick="goSearch('${t}')" style="cursor:pointer">${t}</span>`).join("")}</div>`;
    return;
  }
  const results = PRODUCTS.filter(p=>p.name.toLowerCase().includes(query.toLowerCase())).slice(0,5);
  panel.innerHTML = `<h5>Products</h5>` + (results.length ? results.map(p=>`
      <a class="search-result-row" href="product.html?id=${p.id}">
        <img src="${p.images[0]}" alt="">
        <span class="name">${p.name}</span>
        <span class="price">$${finalPrice(p)}</span>
      </a>`).join("") : `<p style="font-size:13px;color:var(--ink-45);padding:10px 4px;">No matches — try “saree” or “watch”.</p>`)
      + `<button class="btn btn-outline btn-sm btn-block" style="margin-top:12px;" onclick="goSearch('${query}')">See all results for “${query}”</button>`;
}

/* ---------- cart drawer contents ---------- */
function renderCartDrawer(){
  const body = document.getElementById("cartDrawerBody");
  const foot = document.getElementById("cartDrawerFoot");
  if(!body) return;
  const cart = getCart().filter(c=>!c.saved);
  if(!cart.length){
    body.innerHTML = `<div class="empty-state">
      ${ICONS.bag.replace('viewBox="0 0 24 24"','viewBox="0 0 24 24" width="48" height="48"')}
      <p>Your bag is empty.</p></div>`;
    foot.innerHTML = `<a href="shop.html" class="btn btn-primary btn-block">Start Shopping</a>`;
    return;
  }
  let subtotal = 0;
  body.innerHTML = cart.map((c)=>{
    const idx = getCart().indexOf(c);
    const p = findProduct(c.id); const price = finalPrice(p)*c.qty; subtotal += price;
    return `<div class="cart-row">
      <img src="${p.images[0]}" alt="">
      <div class="meta">
        <h5>${p.name}</h5>
        <div class="opts">${c.size} ${c.color?`· ${c.color}`:""}</div>
        <div class="row-bottom">
          <div class="qty-stepper">
            <button onclick="setCartQty(${idx},${c.qty-1})">−</button><span>${c.qty}</span><button onclick="setCartQty(${idx},${c.qty+1})">+</button>
          </div>
          <span class="hangtag">$${price.toFixed(2)}</span>
        </div>
        <button class="link-btn" style="margin-top:8px" onclick="removeFromCart(${idx})">Remove</button>
      </div>
    </div>`;
  }).join("");
  foot.innerHTML = `
    <div class="sum-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
    <div class="sum-row total"><span>Estimated Total</span><span>$${subtotal.toFixed(2)}</span></div>
    <a href="checkout.html" class="btn btn-primary btn-block" style="margin-top:14px;">Checkout</a>
    <a href="cart.html" class="btn btn-outline btn-block" style="margin-top:10px;">View Full Cart</a>`;
}

/* ---------- scroll reveal ---------- */
function initReveal(){
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold:.14 });
  els.forEach(el=>io.observe(el));
}

/* ---------- star rating render ---------- */
function starString(rating){
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5-full);
}

document.addEventListener("DOMContentLoaded", initReveal);
