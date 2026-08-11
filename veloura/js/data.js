/* ==========================================================================
   VELOURA — Sample data
   Placeholder catalogue across Women / Men / Children, used to populate
   every page so the site feels complete out of the box.
   Images use picsum.photos deterministic seeds so every image reliably
   resolves (no dependency on any specific external photo ID).
   ========================================================================== */

function img(seed, w, h){ return `https://picsum.photos/seed/${seed}/${w||800}/${h||1000}`; }

const CATEGORIES = [
  { id:"women-traditional", group:"Women", name:"Traditional Wear", img:img("veloura-women-traditional",800,1000) },
  { id:"women-western", group:"Women", name:"Western Wear", img:img("veloura-women-western",800,1000) },
  { id:"women-shoes", group:"Women", name:"Shoes", img:img("veloura-women-shoes",800,1000) },
  { id:"women-handbags", group:"Women", name:"Handbags", img:img("veloura-women-handbags",800,1000) },
  { id:"women-accessories", group:"Women", name:"Accessories", img:img("veloura-women-accessories",800,1000) },
  { id:"women-jewelry", group:"Women", name:"Jewelry", img:img("veloura-women-jewelry",800,1000) },
  { id:"men-traditional", group:"Men", name:"Traditional Wear", img:img("veloura-men-traditional",800,1000) },
  { id:"men-western", group:"Men", name:"Western Wear", img:img("veloura-men-western",800,1000) },
  { id:"men-shoes", group:"Men", name:"Shoes", img:img("veloura-men-shoes",800,1000) },
  { id:"men-watches", group:"Men", name:"Watches", img:img("veloura-men-watches",800,1000) },
  { id:"men-jackets", group:"Men", name:"Jackets", img:img("veloura-men-jackets",800,1000) },
  { id:"men-accessories", group:"Men", name:"Accessories", img:img("veloura-men-accessories",800,1000) },
  { id:"kids-boys", group:"Children", name:"Boys", img:img("veloura-kids-boys",800,1000) },
  { id:"kids-girls", group:"Children", name:"Girls", img:img("veloura-kids-girls",800,1000) },
  { id:"kids-baby", group:"Children", name:"Baby Collection", img:img("veloura-kids-baby",800,1000) },
  { id:"kids-shoes", group:"Children", name:"Shoes", img:img("veloura-kids-shoes",800,1000) },
  { id:"kids-toys", group:"Children", name:"Toys", img:img("veloura-kids-toys",800,1000) },
  { id:"kids-school", group:"Children", name:"School Essentials", img:img("veloura-kids-school",800,1000) },
];

// helper to build a product quickly
function P(o){ return Object.assign({
  brand:"Veloura", rating:4.5, reviews:120, colors:["#0B0B0C"], sizes:["S","M","L"],
  stock:true, isNew:false, discount:0
}, o, { images:[img(o.id+"-a",900,1125), img(o.id+"-b",900,1125), img(o.id+"-c",900,1125), img(o.id+"-d",900,1125)] }); }

const PRODUCTS = [
  P({ id:"p1", name:"Handwoven Silk Saree", category:"women-traditional", price:189, discount:15, rating:4.8, reviews:214, isNew:true,
     colors:["#8A5C80","#C9A961","#0B0B0C"], sizes:["Free Size"],
     desc:"A hand-loomed silk saree finished with a hand-block printed border. Each piece is woven by a small collective of artisans, so subtle variations are part of its character, not a flaw." }),
  P({ id:"p2", name:"Embroidered Anarkali Set", category:"women-traditional", price:145, rating:4.6, reviews:98,
     colors:["#3D1B36","#C9A961"], sizes:["XS","S","M","L","XL"] }),
  P({ id:"p3", name:"Tailored Linen Blazer", category:"women-western", price:132, discount:20, rating:4.4, reviews:76,
     colors:["#0B0B0C","#EAE2D4"], sizes:["XS","S","M","L"] }),
  P({ id:"p4", name:"Wide-Leg Trouser Set", category:"women-western", price:98, isNew:true, rating:4.5, reviews:61,
     colors:["#0B0B0C","#8A5C80"], sizes:["XS","S","M","L","XL"] }),
  P({ id:"p5", name:"Heeled Ankle Boot", category:"women-shoes", price:176, rating:4.7, reviews:143,
     colors:["#0B0B0C","#5B2E52"], sizes:["36","37","38","39","40"] }),
  P({ id:"p6", name:"Woven Leather Sandal", category:"women-shoes", price:88, discount:10, rating:4.3, reviews:52,
     colors:["#C9A961","#0B0B0C"], sizes:["36","37","38","39"] }),
  P({ id:"p7", name:"Structured Top-Handle Bag", category:"women-handbags", price:268, rating:4.9, reviews:187, isNew:true,
     colors:["#3D1B36","#0B0B0C","#C9A961"], sizes:["One Size"] }),
  P({ id:"p8", name:"Quilted Crossbody Bag", category:"women-handbags", price:154, discount:12, rating:4.5, reviews:99,
     colors:["#0B0B0C","#8A5C80"], sizes:["One Size"] }),
  P({ id:"p9", name:"Silk Wrap Scarf", category:"women-accessories", price:54, rating:4.4, reviews:41,
     colors:["#C9A961","#8A5C80"], sizes:["One Size"] }),
  P({ id:"p10", name:"Gold-Plated Hoop Earrings", category:"women-jewelry", price:64, rating:4.7, reviews:132,
     colors:["#C9A961"], sizes:["One Size"] }),
  P({ id:"p11", name:"Layered Chain Necklace", category:"women-jewelry", price:79, discount:18, rating:4.6, reviews:88,
     colors:["#C9A961","#0B0B0C"], sizes:["One Size"] }),
  P({ id:"p12", name:"Bandhgala Ceremonial Jacket", category:"men-traditional", price:212, rating:4.8, reviews:64, isNew:true,
     colors:["#3D1B36","#0B0B0C"], sizes:["S","M","L","XL","XXL"] }),
  P({ id:"p13", name:"Embroidered Kurta", category:"men-traditional", price:86, discount:15, rating:4.5, reviews:73,
     colors:["#EAE2D4","#0B0B0C"], sizes:["S","M","L","XL"] }),
  P({ id:"p14", name:"Oxford Cotton Shirt", category:"men-western", price:74, rating:4.4, reviews:110,
     colors:["#FAF8F4","#3D1B36"], sizes:["S","M","L","XL"] }),
  P({ id:"p15", name:"Tapered Chino Trouser", category:"men-western", price:69, discount:10, rating:4.3, reviews:58,
     colors:["#0B0B0C","#8A5C80"], sizes:["30","32","34","36"] }),
  P({ id:"p16", name:"Leather Chelsea Boot", category:"men-shoes", price:198, rating:4.7, reviews:151,
     colors:["#0B0B0C","#5B2E52"], sizes:["40","41","42","43","44"] }),
  P({ id:"p17", name:"Minimalist Leather Sneaker", category:"men-shoes", price:132, isNew:true, rating:4.6, reviews:97,
     colors:["#FAF8F4","#0B0B0C"], sizes:["40","41","42","43"] }),
  P({ id:"p18", name:"Automatic Chronograph Watch", category:"men-watches", price:340, discount:8, rating:4.9, reviews:203,
     colors:["#C9A961","#0B0B0C"], sizes:["One Size"] }),
  P({ id:"p19", name:"Minimal Field Watch", category:"men-watches", price:165, rating:4.5, reviews:84,
     colors:["#0B0B0C"], sizes:["One Size"] }),
  P({ id:"p20", name:"Waxed Cotton Field Jacket", category:"men-jackets", price:224, rating:4.7, reviews:112, isNew:true,
     colors:["#3D1B36","#0B0B0C"], sizes:["S","M","L","XL"] }),
  P({ id:"p21", name:"Quilted Bomber Jacket", category:"men-jackets", price:168, discount:22, rating:4.4, reviews:66,
     colors:["#0B0B0C","#8A5C80"], sizes:["S","M","L","XL"] }),
  P({ id:"p22", name:"Full-Grain Leather Belt", category:"men-accessories", price:58, rating:4.6, reviews:71,
     colors:["#0B0B0C","#5B2E52"], sizes:["S","M","L"] }),
  P({ id:"p23", name:"Boys' Denim Overall Set", category:"kids-boys", price:44, rating:4.5, reviews:39,
     colors:["#8A5C80","#0B0B0C"], sizes:["2Y","4Y","6Y","8Y"] }),
  P({ id:"p24", name:"Girls' Pleated Party Dress", category:"kids-girls", price:52, discount:15, rating:4.7, reviews:58, isNew:true,
     colors:["#C9A961","#8A5C80"], sizes:["2Y","4Y","6Y","8Y"] }),
  P({ id:"p25", name:"Organic Cotton Baby Romper", category:"kids-baby", price:28, rating:4.8, reviews:94,
     colors:["#EAE2D4","#8A5C80"], sizes:["0-3M","3-6M","6-12M"] }),
  P({ id:"p26", name:"Kids' Canvas Trainer", category:"kids-shoes", price:36, rating:4.4, reviews:47,
     colors:["#0B0B0C","#C9A961"], sizes:["28","29","30","31","32"] }),
  P({ id:"p27", name:"Wooden Stacking Toy Set", category:"kids-toys", price:32, discount:10, rating:4.9, reviews:66,
     colors:["#C9A961"], sizes:["One Size"] }),
  P({ id:"p28", name:"Everyday School Backpack", category:"kids-school", price:46, rating:4.6, reviews:81,
     colors:["#3D1B36","#0B0B0C"], sizes:["One Size"] }),
];

function findProduct(id){ return PRODUCTS.find(p=>p.id===id); }
function categoryOf(id){ return CATEGORIES.find(c=>c.id===id); }
function finalPrice(p){ return p.discount ? +(p.price*(1-p.discount/100)).toFixed(2) : p.price; }
function relatedProducts(p, count){ return PRODUCTS.filter(x=>x.category===p.category && x.id!==p.id).slice(0,count||4); }
