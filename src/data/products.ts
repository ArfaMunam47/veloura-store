import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // ==========================================
  // WOMEN - OUTERWEAR & COATS
  // ==========================================
  {
    id: 'vl-trench-01',
    sku: 'VL-W-OUT-001',
    name: 'Castleford Storm Gabardine Trench Coat',
    subtitle: 'Triple-proofed long-staple cotton gabardine',
    brand: 'Velora Atelier',
    category: 'women-outerwear',
    group: 'Women',
    collectionId: 'col-aw25',
    price: 680,
    originalPrice: 750,
    discount: 10,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    stock: true,
    stockCount: 14,
    rating: 4.9,
    reviewsCount: 38,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Honey Sand', hex: '#D7B483', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Onyx Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Deep Olive', hex: '#4A5342', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['UK 6 / US 2', 'UK 8 / US 4', 'UK 10 / US 6', 'UK 12 / US 8', 'UK 14 / US 10'],
    description: 'An architectural double-breasted silhouette tailored in northern England from high-density weatherproof gabardine. Cut with a relaxed raglan sleeve for effortless layering over heavy knitwear.',
    details: [
      'Double-breasted horn button closure',
      'Weather-resistant gabardine with natural water repellency',
      'Removable waist belt with leather-wrapped buckle',
      'Storm flap, epaulettes, and deep welt pockets',
      'Internal cupro lining with piped seams'
    ],
    materials: '100% Long-Staple Egyptian Cotton Gabardine; Lining: 100% Bemberg Cupro',
    origin: 'Crafted in West Yorkshire, England',
    careGuide: 'Specialist dry clean only. Brush lightly with soft horsehair between wears.',
    modelInfo: 'Model is 178cm / 5\'10" wearing UK 8 / US 4'
  },
  {
    id: 'vl-wrap-coat-02',
    sku: 'VL-W-OUT-002',
    name: 'Sienna Double-Faced Cashmere Wrap Coat',
    subtitle: 'Hand-stitched Mongolian cashmere blend',
    brand: 'Velora Studio',
    category: 'women-outerwear',
    group: 'Women',
    collectionId: 'col-cashmere',
    price: 890,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    stock: true,
    stockCount: 8,
    rating: 5.0,
    reviewsCount: 24,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Oatmeal Melange', hex: '#E2DBD2', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Midnight Charcoal', hex: '#26282B', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['XS (UK 6)', 'S (UK 8)', 'M (UK 10)', 'L (UK 12)'],
    description: 'Double-faced cashmere hand-split and blind-stitched along every seam. Features a dramatic shawl collar, kimono drop-sleeves, and a self-tie belt creating a statuesque, fluid wrap.',
    details: [
      'Pure double-face split-seam construction (unlined)',
      'Sculptural shawl lapel',
      'Side-seam in-set pockets',
      'Hand-finished edge binding'
    ],
    materials: '70% Grade-A Cashmere, 30% Fine Merino Wool',
    origin: 'Hand-finished in Florence, Italy',
    careGuide: 'Dry clean using hydrocarbon solvent. Store on shaped cedar hanger.',
    modelInfo: 'Model is 177cm / 5\'9.5" wearing Size S'
  },

  // ==========================================
  // WOMEN - TAILORED BLAZERS
  // ==========================================
  {
    id: 'vl-blazer-01',
    sku: 'VL-W-BLZ-001',
    name: 'Atelier Structured Wool-Silk Blazer',
    subtitle: 'Full canvas architectural suiting',
    brand: 'Velora Studio',
    category: 'women-blazers',
    group: 'Women',
    collectionId: 'col-tailoring',
    price: 520,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    stock: true,
    stockCount: 11,
    rating: 4.8,
    reviewsCount: 19,
    images: [
      'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Raw Ecru', hex: '#EBE6DE', image: 'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Espresso Twill', hex: '#3B312B', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['UK 6', 'UK 8', 'UK 10', 'UK 12'],
    description: 'A sharp, confident blazer with defined peak lapels, high-gorge silhouette, and floating horsehair chest canvas that molds naturally to your posture over time.',
    details: [
      'Floating horsehair canvas chest piece',
      'Slightly padded structured shoulder',
      'Single-button natural horn closure',
      'Double back vents'
    ],
    materials: '85% Virgin Wool, 15% Mulberry Silk; Lining: 100% Cupro',
    origin: 'Tailored in Porto, Portugal',
    careGuide: 'Professional dry clean only.',
    modelInfo: 'Model is 176cm wearing UK 8'
  },

  // ==========================================
  // WOMEN - DRESSES & GOWNS
  // ==========================================
  {
    id: 'vl-silk-slip-01',
    sku: 'VL-W-DRS-001',
    name: 'Aura Bias-Cut Heavy Silk Satin Slip Dress',
    subtitle: '30mm heavyweight Mulberry silk',
    brand: 'Velora Atelier',
    category: 'women-dresses',
    group: 'Women',
    collectionId: 'col-evening',
    price: 440,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    stock: true,
    stockCount: 9,
    rating: 4.9,
    reviewsCount: 15,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Champagne Silk', hex: '#F0E5D8', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Midnight Noir', hex: '#0F1115', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Precision cut on a 45-degree true bias to drape gently over the body without clinging. Spun from 30-momme heavyweight Mulberry silk with an elegant low scooped back.',
    details: [
      'True 45-degree bias-cut architecture',
      'French seam construction throughout',
      'Adjustable ultra-fine rouleau straps',
      'Ankle-grazing column length'
    ],
    materials: '100% Mulberry Silk Charmeuse (Grade 6A, 30 Momme)',
    origin: 'Woven & sewn in Lyon, France',
    careGuide: 'Dry clean or gentle hand wash cold with silk detergent.',
    modelInfo: 'Model is 179cm wearing Size S'
  },

  // ==========================================
  // WOMEN - CASHMERE & KNITWEAR
  // ==========================================
  {
    id: 'vl-knit-turtleneck-01',
    sku: 'VL-W-KNT-001',
    name: 'Montmartre Chunky Ribbed Cashmere Turtleneck',
    subtitle: '7-gauge pure Scottish spun cashmere',
    brand: 'Velora Studio',
    category: 'women-knitwear',
    group: 'Women',
    collectionId: 'col-cashmere',
    price: 460,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    stock: true,
    stockCount: 16,
    rating: 5.0,
    reviewsCount: 42,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Alabaster Chalk', hex: '#F5F3EF', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Camel Tan', hex: '#C29B74', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Charcoal Marl', hex: '#3A3C3E', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'An oversized, cocooning roll-neck sweater knitted from 4-ply Mongolian cashmere yarn in the Scottish Borders. Designed with dropped shoulders and deep ribbed trims.',
    details: [
      'Heavy 7-gauge fisherman rib knit',
      'Seamless tubular high neckline',
      'Side-slit hems for front-tucking',
      'Anti-pilling dense twist yarn'
    ],
    materials: '100% Grade-A Mongolian Cashmere (15.5 Micron)',
    origin: 'Knitted in Hawick, Scotland',
    careGuide: 'Hand wash in lukewarm water with cashmere shampoo. Lay flat to dry.',
    modelInfo: 'Model is 177cm wearing Size S'
  },

  // ==========================================
  // WOMEN - TOPS & SHIRTS
  // ==========================================
  {
    id: 'vl-shirt-poplin-01',
    sku: 'VL-W-TOP-001',
    name: 'Oxford Relaxed Organic Cotton Poplin Shirt',
    subtitle: '120/2 two-ply crisp Italian poplin',
    brand: 'Velora Essentials',
    category: 'women-tops',
    group: 'Women',
    collectionId: 'col-essentials',
    price: 240,
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    stock: true,
    stockCount: 22,
    rating: 4.8,
    reviewsCount: 31,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Crisp Optical White', hex: '#FCFCFB', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Sky Blue Pinpoint', hex: '#C5D8E8', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 14'],
    description: 'The ultimate white shirting staple: cut with an elongated torso, dropped shoulder seam, mother-of-pearl buttons, and crisp double cuffs that roll effortlessly.',
    details: [
      '120/2 double-twisted organic cotton',
      'Natural Australian mother-of-pearl buttons',
      'Single chest patch pocket with pen divider',
      'High curved hemline'
    ],
    materials: '100% GOTS Certified Organic Long-Staple Cotton',
    origin: 'Milled in Bergamo, Italy',
    careGuide: 'Machine wash 30°C delicate. Warm steam iron while damp.',
    modelInfo: 'Model is 178cm wearing UK 8'
  },

  // ==========================================
  // WOMEN - TROUSERS & PANTS
  // ==========================================
  {
    id: 'vl-trouser-wide-01',
    sku: 'VL-W-TRS-001',
    name: 'Palazzo High-Waist Pleated Wool Trousers',
    subtitle: 'High-twist tropical wool with fluid drape',
    brand: 'Velora Studio',
    category: 'women-trousers',
    group: 'Women',
    collectionId: 'col-tailoring',
    price: 380,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    stock: true,
    stockCount: 13,
    rating: 4.9,
    reviewsCount: 18,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Dark Slate', hex: '#33363B', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Warm Taupe', hex: '#A89E92', image: 'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 14'],
    description: 'Dramatic double forward pleats lead into an expansive wide-leg column. Tailored from crease-resistant high-twist wool with an internal curtain waistband.',
    details: [
      'Deep double front pleats',
      'Curtain waistband construction',
      'Slanted side pockets and back welt pockets',
      'Blind hemmed with 5cm let-out allowance'
    ],
    materials: '100% Virgin High-Twist Wool (Super 120s)',
    origin: 'Crafted in Biella, Italy',
    careGuide: 'Dry clean only.',
    modelInfo: 'Model is 178cm wearing UK 8'
  },

  // ==========================================
  // WOMEN - DENIM & JEANS
  // ==========================================
  {
    id: 'vl-denim-straight-01',
    sku: 'VL-W-DNM-001',
    name: 'Vintage Straight-Leg Organic Raw Denim',
    subtitle: '13.5oz rigid Japanese ring-spun denim',
    brand: 'Velora Denim',
    category: 'women-denim',
    group: 'Women',
    collectionId: 'col-essentials',
    price: 260,
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    stock: true,
    stockCount: 15,
    rating: 4.7,
    reviewsCount: 27,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Raw Deep Indigo', hex: '#1C273C', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Faded Stonewash', hex: '#879EB8', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['25', '26', '27', '28', '29', '30', '31'],
    description: 'A classic mid-rise straight jean crafted from 13.5oz Kurabo Japanese denim. 100% organic cotton that softens and forms a unique individual wear pattern.',
    details: [
      '13.5oz Japanese shuttle-loom denim',
      'Antiqued solid copper hardware',
      'Button fly with reinforced chain stitching',
      'Embossed vegetable leather back patch'
    ],
    materials: '100% Certified Organic Cotton',
    origin: 'Woven in Okayama, Japan; Sewn in Portugal',
    careGuide: 'Wash inside out in cold water. Hang to air dry.',
    modelInfo: 'Model is 176cm wearing Waist 26'
  },

  // ==========================================
  // MEN - OUTERWEAR & OVERCOATS
  // ==========================================
  {
    id: 'vl-men-coat-01',
    sku: 'VL-M-OUT-001',
    name: 'Kensington Raglan Wool Overcoat',
    subtitle: '700gsm heavy double-cloth British wool',
    brand: 'Velora Atelier',
    category: 'men-outerwear',
    group: 'Men',
    collectionId: 'col-aw25',
    price: 790,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    stock: true,
    stockCount: 10,
    rating: 4.9,
    reviewsCount: 29,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Charcoal Herringbone', hex: '#2C2D30', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Camel Tan', hex: '#B89269', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['36 (S)', '38 (M)', '40 (L)', '42 (XL)', '44 (XXL)'],
    description: 'An authoritative single-breasted overcoat featuring a comfortable raglan sleeve, concealed horn button placket, deep storm collar tab, and generous knee-length cut.',
    details: [
      'Heavy 700gsm English wool double cloth',
      'Concealed horn-button fly front',
      'Deep welt fleece-lined handwarmer pockets',
      'Center back vent with button tab'
    ],
    materials: '90% Virgin Shetland Wool, 10% Cashmere; Lining: 100% Cupro',
    origin: 'Crafted in Leeds, England',
    careGuide: 'Specialist dry clean only. Brush with stiff bristle coat brush.',
    modelInfo: 'Model is 187cm / 6\'1.5" wearing Size 40 (L)'
  },

  // ==========================================
  // MEN - JACKETS & OVERSHIRTS
  // ==========================================
  {
    id: 'vl-men-jacket-01',
    sku: 'VL-M-JCK-001',
    name: 'Minimalist Wool-Twill Zip Blouson',
    subtitle: 'Raccagni brushed nickel two-way hardware',
    brand: 'Velora Studio',
    category: 'men-jackets',
    group: 'Men',
    collectionId: 'col-essentials',
    price: 490,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    stock: true,
    stockCount: 12,
    rating: 4.8,
    reviewsCount: 22,
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Dark Navy', hex: '#161F2E', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Tarmac Grey', hex: '#4B4D50', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Clean-lined blouson jacket engineered with Italian diagonal wool twill. Cut boxy through the torso with subtle elasticated back hem inserts.',
    details: [
      'Two-way Raccagni brushed nickel zipper',
      'Point collar with hidden throat latch',
      'Internal zippered passport pocket'
    ],
    materials: '100% Virgin Merino Wool Twill; Lining: 100% Viscose',
    origin: 'Made in Porto, Portugal',
    careGuide: 'Dry clean only.',
    modelInfo: 'Model is 185cm wearing Size M'
  },

  // ==========================================
  // MEN - SHIRTS & SHIRTING
  // ==========================================
  {
    id: 'vl-men-shirt-01',
    sku: 'VL-M-SHT-001',
    name: 'Camp Collar Long-Staple Linen Shirt',
    subtitle: 'Normandy washed linen with soft rumple',
    brand: 'Velora Essentials',
    category: 'men-shirts',
    group: 'Men',
    collectionId: 'col-essentials',
    price: 210,
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    stock: true,
    stockCount: 18,
    rating: 4.8,
    reviewsCount: 35,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Flax Natural', hex: '#E7DFC6', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Olive Drab', hex: '#535A4B', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Relaxed cuban camp collar shirt crafted from breathable Normandy flax linen. Garment washed for an immediate lived-in drape.',
    details: [
      'Relaxed camp open collar',
      'Natural river shell buttons',
      'Straight square hem with side vents'
    ],
    materials: '100% Certified French Normandy Linen',
    origin: 'Woven in Northern France',
    careGuide: 'Machine wash gentle 30°C. Line dry in shade.',
    modelInfo: 'Model is 186cm wearing Size M'
  },

  // ==========================================
  // MEN - T-SHIRTS & POLOS
  // ==========================================
  {
    id: 'vl-men-tee-01',
    sku: 'VL-M-TEE-001',
    name: 'Heavyweight Supima Jersey Crewneck Tee',
    subtitle: '280gsm dense American Supima cotton',
    brand: 'Velora Essentials',
    category: 'men-tshirts',
    group: 'Men',
    collectionId: 'col-essentials',
    price: 110,
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    stock: true,
    stockCount: 40,
    rating: 4.9,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Chalk White', hex: '#F7F6F2', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Washed Black', hex: '#222222', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'The definitive luxury t-shirt. Knitted from ultra-long-staple Supima cotton with a substantial 280gsm weight that holds its clean structural silhouette wash after wash.',
    details: [
      '280gsm long-staple combed cotton',
      'Reinforced bound rib collar that never sags',
      'Blind stitched sleeves and hem'
    ],
    materials: '100% Extra-Long Staple Supima Cotton',
    origin: 'Knitted and sewn in Portugal',
    careGuide: 'Machine wash cold. Do not tumble dry.',
    modelInfo: 'Model is 185cm wearing Size L'
  },

  // ==========================================
  // MEN - KNITWEAR & SWEATERS
  // ==========================================
  {
    id: 'vl-men-knit-01',
    sku: 'VL-M-KNT-001',
    name: 'Waffle-Knit Merino Mock Neck Pullover',
    subtitle: 'Extra-fine 19.5 micron Zegna Baruffa yarn',
    brand: 'Velora Studio',
    category: 'men-knitwear',
    group: 'Men',
    collectionId: 'col-cashmere',
    price: 340,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    stock: true,
    stockCount: 14,
    rating: 4.8,
    reviewsCount: 17,
    images: [
      'https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Oatmeal', hex: '#DED6C7', image: 'https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Forest Green', hex: '#2C3A2E', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Textured thermal waffle knit engineered for lightweight warmth. Knitted in Italy from Lane Borgosesia merino wool.',
    details: [
      '3-dimensional thermal waffle stitch',
      'Self-start ribbed mock collar',
      'Raglan shoulder construction'
    ],
    materials: '100% Extra-Fine Australian Merino Wool',
    origin: 'Knitted in Biella, Italy',
    careGuide: 'Hand wash cold. Lay flat on towel to dry.',
    modelInfo: 'Model is 187cm wearing Size L'
  },

  // ==========================================
  // MEN - TROUSERS & CHINOS
  // ==========================================
  {
    id: 'vl-men-trouser-01',
    sku: 'VL-M-TRS-001',
    name: 'Single-Pleat Flannel Dress Trousers',
    subtitle: 'Vitale Barberis Canonico 340gsm wool flannel',
    brand: 'Velora Studio',
    category: 'men-trousers',
    group: 'Men',
    collectionId: 'col-tailoring',
    price: 360,
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    stock: true,
    stockCount: 16,
    rating: 4.9,
    reviewsCount: 26,
    images: [
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Mid Grey Melange', hex: '#636569', image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Midnight Navy', hex: '#1C2230', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['30', '32', '34', '36', '38'],
    description: 'Refined single forward-pleat trousers crafted from Italian flannel. Features side adjusters with solid brass buckles instead of belt loops for a clean waist profile.',
    details: [
      'Adjustable side tabs with brass buckles',
      'Extended waistband tab with hidden hook closure',
      'Split back fish-tail waistband',
      'Unfinished hem for bespoke tailoring'
    ],
    materials: '100% Virgin Wool Flannel; Knee Lining: 100% Cupro',
    origin: 'Tailored in Italy',
    careGuide: 'Dry clean only.',
    modelInfo: 'Model is 185cm wearing Size 32'
  },

  // ==========================================
  // ACCESSORIES - LEATHER BAGS & TOTES
  // ==========================================
  {
    id: 'vl-tote-01',
    sku: 'VL-A-BAG-001',
    name: 'Palermo Full-Grain Vegetable Leather Tote',
    subtitle: 'Tuscan chestnut-tanned vacchetta calfskin',
    brand: 'Velora Leatherwork',
    category: 'acc-bags',
    group: 'Accessories',
    collectionId: 'col-essentials',
    price: 640,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    stock: true,
    stockCount: 7,
    rating: 5.0,
    reviewsCount: 45,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Cognac Saddle', hex: '#8B4E29', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Nero Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['One Size (42cm x 36cm x 14cm)'],
    description: 'An architectural carryall handcrafted in Santa Croce sull\'Arno. Vegetable-tanned full-grain leather that burnishes and develops a deep, golden patina with years of travel.',
    details: [
      'Triple-lacquered hand-burnished raw edges',
      'Reinforced bridle leather carry handles',
      'Internal zippered laptop pouch (fits up to 16")',
      'Solid brass feet and brushed nickel zip'
    ],
    materials: '100% Certified Tuscan Full-Grain Calfskin; Lining: Organic Cotton Twill',
    origin: 'Handmade in Florence, Italy',
    careGuide: 'Condition every six months with natural beeswax leather balm.',
    modelInfo: 'Capacity: 22 Liters. Holds 16" MacBook Pro'
  },

  // ==========================================
  // ACCESSORIES - FOOTWEAR & LOAFERS
  // ==========================================
  {
    id: 'vl-shoe-loafer-01',
    sku: 'VL-A-SHOE-001',
    name: 'Sloane Goodyear-Welted Penny Loafer',
    subtitle: 'French box calf leather with oak-bark tanned sole',
    brand: 'Velora Atelier',
    category: 'acc-footwear',
    group: 'Footwear',
    collectionId: 'col-tailoring',
    price: 480,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    stock: true,
    stockCount: 9,
    rating: 4.9,
    reviewsCount: 28,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Espresso Calf', hex: '#34261D', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Obsidian Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['EU 40 (US 7)', 'EU 41 (US 8)', 'EU 42 (US 9)', 'EU 43 (US 10)', 'EU 44 (US 11)', 'EU 45 (US 12)'],
    description: 'Benchmade in Northamptonshire using 200 individual artisanal processes. Hand-burnished French box calf uppers welted to an oak-bark channeled sole for lifelong resoleability.',
    details: [
      'Traditional 360-degree Goodyear welted construction',
      'Hand-stitched apron and penny strap cutout',
      'Natural cork filling with steel shank arch support',
      'Oak bark leather sole with dovetailed brass nail heel'
    ],
    materials: 'French Full-Grain Box Calf; Sole: Baker Oak Bark Tanned Leather',
    origin: 'Handmade in Northamptonshire, England',
    careGuide: 'Use cedar shoe trees after each wear. Polish with beeswax cream.',
    modelInfo: 'Fits true to UK tailored size'
  },

  // ==========================================
  // ACCESSORIES - SUNGLASSES & EYEWEAR
  // ==========================================
  {
    id: 'vl-eyewear-01',
    sku: 'VL-A-EYE-001',
    name: 'Kyoto Hand-Polished Acetate Sunglasses',
    subtitle: 'Takiron cellulose acetate with mineral Zeiss glass',
    brand: 'Velora Studio',
    category: 'acc-sunglasses',
    group: 'Accessories',
    collectionId: 'col-essentials',
    price: 320,
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    stock: true,
    stockCount: 16,
    rating: 4.8,
    reviewsCount: 33,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Vintage Tortoiseshell', hex: '#63472C', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Champagne Crystal', hex: '#EDE3D1', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['Universal Fit (48-22-145)'],
    description: 'Sculpted in Sabae, Japan from cured 8mm Takiron cellulose acetate. Features 7-barrel riveted hinges and scratch-resistant green Zeiss polarized mineral lenses.',
    details: [
      'Custom 7-barrel riveted pin hinges',
      'Zeiss CR-39 anti-reflective interior coating',
      '100% UVA/UVB Category 3 optical protection',
      'Includes hard leather storage pouch and microfiber cloth'
    ],
    materials: 'Japanese Plant-Based Cellulose Acetate, Titanium Core Wire',
    origin: 'Crafted in Fukui Prefecture, Japan',
    careGuide: 'Rinse with cold water and dry with clean microfiber.',
    modelInfo: 'Frame dimensions: 48mm lens, 22mm bridge, 145mm temple'
  },

  // ==========================================
  // ACCESSORIES - FINE JEWELRY & HOROLOGY
  // ==========================================
  {
    id: 'vl-jewel-cuff-01',
    sku: 'VL-A-JWL-001',
    name: 'Architectural Torus 18k Vermeil Cuff',
    subtitle: 'Heavy 5-micron gold over recycled 925 silver',
    brand: 'Velora Studio',
    category: 'acc-jewelry',
    group: 'Jewelry',
    collectionId: 'col-evening',
    price: 380,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    stock: true,
    stockCount: 11,
    rating: 5.0,
    reviewsCount: 22,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611591475155-42e9fba5ce55?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: '18k Yellow Gold', hex: '#D4AF37', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop' },
      { name: '925 Sterling Silver', hex: '#D1D5DB', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['Small (15cm wrist)', 'Medium (17cm wrist)', 'Large (19cm wrist)'],
    description: 'A minimalist sculptural cuff designed with rounded, tapered terminals. Cast by lost-wax process using 100% recycled precious metals with a brushed satin exterior and mirror-polished interior.',
    details: [
      'Lost-wax investment casting technique',
      '5-micron 18k gold vermeil thickness',
      'Laser-engraved Velora hallmark and 925 fineness stamp',
      'Comfort-fit beveled interior edge'
    ],
    materials: 'Recycled 925 Sterling Silver, 18k Yellow Gold Vermeil (5 Micron)',
    origin: 'Cast & hand-polished in Arezzo, Italy',
    careGuide: 'Wipe gently with the provided polishing cloth. Keep away from chlorine.',
    modelInfo: 'Weight: 38 grams solid silver core'
  },
  {
    id: 'vl-jewel-ring-01',
    sku: 'VL-A-JWL-002',
    name: 'Pavé Diamond & 18k Solid Gold Signet Ring',
    subtitle: 'Brilliant cut conflict-free diamonds set in warm 18k gold',
    brand: 'Velora Haute Joaillerie',
    category: 'acc-jewelry',
    group: 'Jewelry',
    collectionId: 'col-evening',
    price: 460,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    stock: true,
    stockCount: 8,
    rating: 4.9,
    reviewsCount: 17,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: '18k Warm Gold', hex: '#D4AF37', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Platinum White', hex: '#E5E7EB', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9'],
    description: 'An architectural signet ring combining masculine volume with micro-pavé lab diamonds. Mirror-polished along the top table with gentle chamfered edges for seamless stacking.',
    details: [
      'Micro-pavé setting with 16 brilliant round cut stones (0.32 ctw)',
      'Solid 18k gold construction with substantial band heft',
      'Comfort-fit rounded band profile',
      'Arrives in velvet lined archival gift box with certificate'
    ],
    materials: 'Solid 18k Yellow Gold, VVS1 Clarity Conflict-Free Stones',
    origin: 'Crafted by master goldsmiths in Valenza, Italy',
    careGuide: 'Clean with warm soapy water and a soft bristle brush.',
    modelInfo: 'Band width: 6mm at widest point'
  },
  {
    id: 'vl-jewel-neck-01',
    sku: 'VL-A-JWL-003',
    name: 'Heirloom Twisted 18k Gold Chain Necklace',
    subtitle: 'Hand-assembled intertwined links with custom architectural clasp',
    brand: 'Velora Studio',
    category: 'acc-jewelry',
    group: 'Jewelry',
    collectionId: 'col-evening',
    price: 540,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    stock: true,
    stockCount: 12,
    rating: 5.0,
    reviewsCount: 31,
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: '18k Rich Gold', hex: '#D4AF37', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['45cm (18 in)', '50cm (20 in)'],
    description: 'An iconic, tactile chain necklace composed of hand-woven rope links in deep yellow gold. Substantial enough to stand on its own as a signature collar piece or pair with tailored outerwear.',
    details: [
      'Interlocking twisted rope link pattern',
      'Hidden box safety clasp with dual security latches',
      'Anti-tarnish protective sealing',
      'Hand-buffed high luster finish'
    ],
    materials: '18k Yellow Gold Heavy Vermeil (6 Micron) over 925 Silver Core',
    origin: 'Hand-linked in Vicenza, Italy',
    careGuide: 'Store flat in suede travel pouch to prevent link kinking.',
    modelInfo: 'Chain width: 4.5mm'
  },
  {
    id: 'vl-jewel-ear-01',
    sku: 'VL-A-JWL-004',
    name: 'Baroque Freshwater Pearl Drop Earrings',
    subtitle: 'Selected organic freshwater pearls suspended from 18k gold studs',
    brand: 'Velora Studio',
    category: 'acc-jewelry',
    group: 'Jewelry',
    collectionId: 'col-evening',
    price: 340,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    stock: true,
    stockCount: 9,
    rating: 4.9,
    reviewsCount: 15,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Lustrous Pearl & Gold', hex: '#FAF9F5', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['One Size (Pair)'],
    description: 'Each earring pairs an architectural brushed gold disk with an organically shaped baroque freshwater pearl, ensuring no two pairs are ever identical.',
    details: [
      'Natural AAA grade baroque pearls with deep iridescence',
      '18k yellow gold post and butterfly backing',
      'Hypoallergenic and nickel-free certified',
      'Articulated jump ring for fluid kinetic movement'
    ],
    materials: 'Natural Baroque Freshwater Pearls, 18k Solid Gold Posts',
    origin: 'Assembled by hand in Paris, France',
    careGuide: 'Avoid contact with perfume and cosmetics. Wipe with damp cloth.',
    modelInfo: 'Drop length: approx 32mm'
  },
  {
    id: 'vl-jewel-hoop-01',
    sku: 'VL-A-JWL-005',
    name: 'Architectural Ribbed Gold Huggie Hoops',
    subtitle: 'Chunky fluted miniature hoops designed for everyday presence',
    brand: 'Velora Studio',
    category: 'acc-jewelry',
    group: 'Jewelry',
    collectionId: 'col-essentials',
    price: 290,
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    stock: true,
    stockCount: 16,
    rating: 4.8,
    reviewsCount: 39,
    images: [
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: '18k Warm Gold', hex: '#D4AF37', image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Sterling Silver', hex: '#D1D5DB', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['14mm diameter'],
    description: 'Fluted neoclassical ridges catch ambient light from every orientation. Engineered with a secure click-latch closure that hugs the earlobe comfortably throughout the day.',
    details: [
      'Precision CNC-fluted surface ridges',
      'Reinforced hinge with crisp auditory click closure',
      'Hollow-tube construction for all-day lightweight comfort'
    ],
    materials: 'Recycled 925 Sterling Silver, 18k Yellow Gold Vermeil (5 Micron)',
    origin: 'Crafted in Arezzo, Italy',
    careGuide: 'Store in airtight pouch when not worn.',
    modelInfo: 'Hoop outer diameter: 14mm, thickness: 4mm'
  },
  {
    id: 'vl-watch-01',
    sku: 'VL-A-WAT-001',
    name: 'Heritage Swiss Automatic Minimalist Timepiece',
    subtitle: 'Caliber 2824-2 self-winding movement with Tuscan bridle leather',
    brand: 'Velora Horology',
    category: 'acc-watches',
    group: 'Jewelry',
    collectionId: 'col-essentials',
    price: 890,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    stock: true,
    stockCount: 7,
    rating: 5.0,
    reviewsCount: 26,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Emerald Sunburst / Gold', hex: '#0B291B', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Onyx Dial / Steel', hex: '#111111', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['38mm Case Diameter'],
    description: 'An understated dress watch featuring an ultra-thin 38mm brushed 316L stainless steel case, anti-reflective sapphire crystal, and an exhibition caseback displaying the decorated Swiss automatic rotor.',
    details: [
      'Swiss Made Automatic Caliber with 38-hour power reserve',
      'Scratch-resistant double-domed sapphire crystal',
      '50-meter (5 ATM) water resistance',
      'Quick-release Italian vegetable-tanned bridle leather strap'
    ],
    materials: '316L Surgical Grade Stainless Steel, Sapphire Crystal, Tuscan Calf Leather',
    origin: 'Assembled in Biel/Bienne, Switzerland',
    careGuide: 'Service movement every 4–5 years. Keep away from magnetic fields.',
    modelInfo: 'Case diameter: 38mm, thickness: 9.2mm'
  },

  // ==========================================
  // FOOTWEAR - ARTISAN CHELSEA BOOTS & HEELS
  // ==========================================
  {
    id: 'vl-boot-chelsea-01',
    sku: 'VL-W-BOT-001',
    name: 'Florentine Calfskin Chelsea Ankle Boot',
    subtitle: 'Elasticated side gusset with stacked leather Cuban heel',
    brand: 'Velora Studio',
    category: 'women-footwear',
    group: 'Footwear',
    collectionId: 'col-aw25',
    price: 495,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    stock: true,
    stockCount: 14,
    rating: 4.9,
    reviewsCount: 38,
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Nero Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Cognac Saddle', hex: '#8B4513', image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41'],
    description: 'An enduring silhouette hand-lasted in Tuscany from vegetable-tanned French calfskin. Featuring tonal stretch side gores, pull tabs, and a Blake-stitched leather sole with rubber injection for all-weather traction.',
    details: [
      'Blake-welt construction for flexibility',
      'Tonal elasticated side stretch gussets',
      'Hand-painted sole edge finish',
      'Includes dual dust bags and cedar cream conditioner'
    ],
    materials: '100% Full-Grain French Calfskin, Calf Leather Lining',
    origin: 'Hand-lasted in Florence, Italy',
    careGuide: 'Condition with neutral leather balm every 3 months. Store on cedar shoe trees.',
    modelInfo: 'Heel height: 45mm (1.8 in). Fits true to European sizing.'
  },
  {
    id: 'vl-shoe-mule-01',
    sku: 'VL-W-SHOE-002',
    name: 'Sculptural Block-Heel Leather Mule',
    subtitle: 'Pointed toe with architecturally beveled 50mm heel',
    brand: 'Velora Studio',
    category: 'women-footwear',
    group: 'Footwear',
    collectionId: 'col-evening',
    price: 440,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    stock: true,
    stockCount: 11,
    rating: 4.8,
    reviewsCount: 19,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Espresso Box Calf', hex: '#2A1B14', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Chalk White', hex: '#FAF9F5', image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40'],
    description: 'A clean, razor-sharp mule crafted in Italy from polished box calf. Features an elongated square-pointed toe, padded memory-foam footbed, and a carved monolithic heel.',
    details: [
      'Cushioned arch support with breathable calfskin insole',
      'Sculpted 50mm geometric heel with non-slip cap',
      'Hand-buffed edge staining'
    ],
    materials: '100% Italian Box Calf Leather, Leather Sole with Rubber Inlay',
    origin: 'Made in Marche, Italy',
    careGuide: 'Buff with horsehair brush and apply delicate cream.',
    modelInfo: 'Heel height: 50mm (2 inches)'
  },
  {
    id: 'vl-shoe-derby-01',
    sku: 'VL-M-DRB-001',
    name: 'Goodyear-Welted Plain Toe Oxford Derby',
    subtitle: 'Classic French box calf with storm welt and Dainite rubber sole',
    brand: 'Velora Homme',
    category: 'men-footwear',
    group: 'Footwear',
    collectionId: 'col-tailoring',
    price: 520,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    stock: true,
    stockCount: 15,
    rating: 4.9,
    reviewsCount: 34,
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Midnight Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Dark Burgundy', hex: '#4A1521', image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'],
    description: 'An aristocratic derby shoe handcrafted with traditional English bench methods. Features blind eyelets, a refined storm welt for water resistance, and an English Dainite studded rubber sole.',
    details: [
      '360-degree storm welted construction',
      'British Dainite studded rubber sole for all-weather traction',
      'Cork footbed that molds to foot arch over time',
      'Full leather lining with padded collar'
    ],
    materials: 'Grade-A French Box Calf, English Dainite Sole',
    origin: 'Handmade in Northamptonshire, England',
    careGuide: 'Apply wax polish and use cedar shoe trees between wears.',
    modelInfo: 'Standard F width fit'
  },
  {
    id: 'vl-boot-combat-01',
    sku: 'VL-A-BOT-002',
    name: 'Architectural Commando Lug Sole Boot',
    subtitle: 'Waxy pull-up calfskin with Vibram Montagna lugged tread',
    brand: 'Velora Atelier',
    category: 'acc-footwear',
    group: 'Footwear',
    collectionId: 'col-aw25',
    price: 580,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    stock: true,
    stockCount: 10,
    rating: 5.0,
    reviewsCount: 27,
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Matte Onyx', hex: '#151515', image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'],
    description: 'A rugged yet refined military-inspired boot engineered with thick Italian oil-tanned calfskin. Constructed with rapid-stitch welt and authentic Vibram Italian lugged outsoles.',
    details: [
      'Vibram deep-tread Montagna rubber outsole',
      'Gunmetal speed hooks with waxed round laces',
      'Gusseted tongue to keep moisture out'
    ],
    materials: 'Oil-tanned Italian Full-Grain Calfskin, Vibram Rubber',
    origin: 'Handcrafted in Montebelluna, Italy',
    careGuide: 'Treat with dubbin wax or heavy leather balm seasonally.',
    modelInfo: 'Runs true to boot size with wool socks'
  },
  {
    id: 'vl-shoe-suede-01',
    sku: 'VL-M-SUD-001',
    name: 'Italian Split-Suede Driving Loafer',
    subtitle: 'Velvety Tuscany suede with segmented pebble rubber sole',
    brand: 'Velora Homme',
    category: 'men-footwear',
    group: 'Footwear',
    collectionId: 'col-essentials',
    price: 390,
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    stock: true,
    stockCount: 13,
    rating: 4.7,
    reviewsCount: 18,
    images: [
      'https://images.unsplash.com/photo-1582895123911-c0a1a3a41416?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Warm Taupe Suede', hex: '#8B7D6B', image: 'https://images.unsplash.com/photo-1582895123911-c0a1a3a41416?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Navy Blue Suede', hex: '#1E293B', image: 'https://images.unsplash.com/photo-1582895123911-c0a1a3a41416?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44'],
    description: 'An epitome of relaxed Mediterranean luxury, tailored from buttery Italian calf suede. Features hand-whipstitched toe aprons and rubber driving pebbles wrapping up the heel.',
    details: [
      'Unlined glove-soft construction for barefoot wear',
      'Pebbled rubber driving sole extending up heel counter',
      'Water-repellent Scotchgard treated suede'
    ],
    materials: '100% Italian Reverse Calf Suede, Natural Rubber Pebbles',
    origin: 'Crafted in Naples, Italy',
    careGuide: 'Brush with brass suede brush. Waterproof before rainy wear.',
    modelInfo: 'Supple fit molds directly to foot shape'
  },

  // ==========================================
  // MEN'S FOOTWEAR - MINIMAL COURT SNEAKER
  // ==========================================
  {
    id: 'vl-men-sneaker-01',
    sku: 'VL-M-SNK-001',
    name: 'Artisan Low-Top Nappa Court Sneaker',
    subtitle: 'Monochrome Italian leather with stitched Margom rubber cupsole',
    brand: 'Velora Homme',
    category: 'men-footwear',
    group: 'Footwear',
    collectionId: 'col-essentials',
    price: 320,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    stock: true,
    stockCount: 22,
    rating: 4.8,
    reviewsCount: 47,
    images: [
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Optic Chalk White', hex: '#F9F9F9', image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Matte Obsidian', hex: '#1C1C1C', image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'],
    description: 'A benchmark in minimalist footwear, crafted with supple full-grain Italian nappa leather and constructed with 360-degree sidewall stitching to authentic Italian Margom rubber soles.',
    details: [
      'Italian Margom vulcanized rubber outsole',
      'Waxed organic cotton tonal laces',
      'Removable cushioned calfskin footbed',
      'Discreet blind-stamped gold foil serial number on heel'
    ],
    materials: '100% Italian Nappa Leather Upper, Natural Margom Rubber Sole',
    origin: 'Crafted in Civitanova Marche, Italy',
    careGuide: 'Clean with damp cloth and leather foam cleaner.',
    modelInfo: 'Fits true to size. If between sizes, choose the smaller size.'
  },

  // ==========================================
  // ACCESSORIES - CASHMERE SCARF
  // ==========================================
  {
    id: 'vl-acc-scarf-01',
    sku: 'VL-A-SCF-001',
    name: 'Featherlight Cashmere & Silk Shawl',
    subtitle: 'Gossamer 70/30 blend woven in Yorkshire with eyelash fringe',
    brand: 'Velora Studio',
    category: 'acc-scarves',
    group: 'Accessories',
    collectionId: 'col-cashmere',
    price: 240,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    stock: true,
    stockCount: 18,
    rating: 5.0,
    reviewsCount: 29,
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Oatmeal Melange', hex: '#D8CFC4', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1200&auto=format&fit=crop' },
      { name: 'Charcoal Shadow', hex: '#374151', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1200&auto=format&fit=crop' }
    ],
    sizes: ['200cm × 90cm'],
    description: 'An ethereal gossamer shawl woven on historic shuttles. Impossibly light yet exceptionally insulating, finished with delicate hand-drawn eyelash fringing at both ends.',
    details: [
      '70% Mongolian Cashmere, 30% Mulberry Silk',
      'Hand-frayed eyelash edging',
      'Dimensions: 200cm length by 90cm width',
      'Arrives in archival gift presentation box'
    ],
    materials: '70% Grade-A Mongolian Cashmere, 30% Mulberry Silk',
    origin: 'Woven in West Yorkshire, United Kingdom',
    careGuide: 'Dry clean or gentle hand wash in cold water with wool detergent.',
    modelInfo: 'Unisex oversized proportions.'
  }
];
