/* ==========================================================================
   VELOURA — Reusable render helpers for product & category cards
   ========================================================================== */

function productCardHTML(p){
  const price = finalPrice(p);
  const wished = isWished(p.id);
  return `
  <div class="product-card reveal in">
    <div class="pc-media">
      <a href="product.html?id=${p.id}">
        <img class="img-a" src="${p.images[0]}" alt="${p.name}">
        <img class="img-b" src="${p.images[1]}" alt="${p.name}">
      </a>
      <div class="pc-tags">
        ${p.isNew ? `<span class="hangtag gold">New</span>` : ""}
        ${p.discount ? `<span class="hangtag sale">-${p.discount}%</span>` : ""}
      </div>
      <button class="pc-fav ${wished?'active':''}" data-id="${p.id}" aria-label="Save to wishlist" onclick="toggleWishlist('${p.id}')">${ICONS.heart}</button>
      ${!p.stock ? `<div class="pc-stock"><span class="hangtag ghost">Out of stock</span></div>` : ""}
      <div class="pc-actions">
        <button class="btn btn-primary" onclick="addToCart('${p.id}')">Add to Cart</button>
        <a class="btn btn-outline" href="product.html?id=${p.id}">Quick View</a>
      </div>
    </div>
    <div class="pc-body">
      <div class="brand">${p.brand}</div>
      <a href="product.html?id=${p.id}"><h4>${p.name}</h4></a>
      <div class="pc-rating"><span class="stars">${starString(p.rating)}</span> ${p.rating} · ${p.reviews}</div>
      <div class="pc-price-row">
        <span class="hangtag">${p.discount?`<span class="strike">$${p.price}</span>`:''}$${price}</span>
      </div>
    </div>
  </div>`;
}

function categoryCardHTML(c){
  return `
  <a class="cat-card reveal in" href="shop.html?cat=${c.id}">
    <img src="${c.img}" alt="${c.name}">
    <span class="cat-arrow">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8"/></svg>
    </span>
    <div class="cat-label"><span>${c.group}</span><h3>${c.name}</h3></div>
  </a>`;
}

function renderGrid(containerId, products){
  const el = document.getElementById(containerId);
  if(!el) return;
  el.innerHTML = products.length ? products.map(productCardHTML).join("") :
    `<p style="grid-column:1/-1;text-align:center;color:var(--ink-45);padding:60px 0;">No products match these filters yet — try widening your search.</p>`;
}
