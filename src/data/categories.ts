import { Category, Collection } from '../types';

export const CATEGORIES: Category[] = [
  // ==========================================
  // WOMEN'S CATEGORIES
  // ==========================================
  {
    id: 'women-outerwear',
    name: 'Outerwear & Coats',
    slug: 'outerwear',
    group: 'Women',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
    description: 'Double-breasted trench coats, wool overcoats, and tailored wrap coats crafted in England.',
    itemCount: 8
  },
  {
    id: 'women-blazers',
    name: 'Tailored Blazers',
    slug: 'blazers',
    group: 'Women',
    image: 'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?q=80&w=1200&auto=format&fit=crop',
    description: 'Architectural shoulder lines, relaxed wool-blend suiting, and double-breasted tailoring.',
    itemCount: 6
  },
  {
    id: 'women-dresses',
    name: 'Dresses & Evening Gowns',
    slug: 'dresses',
    group: 'Women',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop',
    description: 'Minimalist column slip dresses, fluid mulberry silk gowns, and pleated daywear.',
    itemCount: 7
  },
  {
    id: 'women-tops',
    name: 'Tops & Shirting',
    slug: 'tops',
    group: 'Women',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
    description: 'Crisp Egyptian cotton poplin shirts, asymmetric drapery, and ribbed knit camisoles.',
    itemCount: 7
  },
  {
    id: 'women-knitwear',
    name: 'Cashmere & Knitwear',
    slug: 'knitwear',
    group: 'Women',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop',
    description: 'Fine-gauge Mongolian cashmere, chunky ribbed turtlenecks, and relaxed cardigans.',
    itemCount: 8
  },
  {
    id: 'women-trousers',
    name: 'Trousers & Pants',
    slug: 'trousers',
    group: 'Women',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
    description: 'High-waisted wide leg wool trousers, pleated fluid silhouettes, and straight-cut tailoring.',
    itemCount: 6
  },
  {
    id: 'women-denim',
    name: 'Denim & Jeans',
    slug: 'denim',
    group: 'Women',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop',
    description: 'Rigid organic cotton denim, vintage straight cuts, and raw indigo washes.',
    itemCount: 5
  },
  {
    id: 'women-skirts',
    name: 'Skirts & Columns',
    slug: 'skirts',
    group: 'Women',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=90&w=1200&auto=format&fit=crop',
    description: 'Bias-cut silk satin skirts, wool column midis, and structural wrap styles.',
    itemCount: 5
  },
  {
    id: 'women-loungewear',
    name: 'Silk Sets & Loungewear',
    slug: 'loungewear',
    group: 'Women',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop',
    description: 'Ultra-soft cashmere lounge pants, silk robes, and seamless camisoles.',
    itemCount: 4
  },
  {
    id: 'women-footwear',
    name: 'Artisan Boots & Heels',
    slug: 'women-footwear',
    group: 'Women',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop',
    description: 'Handcrafted leather ankle boots, sculpted block heels, and minimal mules.',
    itemCount: 5
  },

  // ==========================================
  // MEN'S CATEGORIES
  // ==========================================
  {
    id: 'men-outerwear',
    name: 'Outerwear & Overcoats',
    slug: 'outerwear',
    group: 'Men',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
    description: 'Double-faced wool overcoats, raglan cashmere blend coats, and storm-proof macs.',
    itemCount: 7
  },
  {
    id: 'men-blazers',
    name: 'Blazers & Tailoring',
    slug: 'blazers',
    group: 'Men',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
    description: 'Unstructured hopsack blazers, double-breasted navy jackets, and bespoke trousers.',
    itemCount: 5
  },
  {
    id: 'men-jackets',
    name: 'Jackets & Overshirts',
    slug: 'jackets',
    group: 'Men',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1200&auto=format&fit=crop',
    description: 'Minimalist zip jackets, heavyweight twill overshirts, and unlined wool utility jackets.',
    itemCount: 6
  },
  {
    id: 'men-shirts',
    name: 'Shirts & Shirting',
    slug: 'shirts',
    group: 'Men',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop',
    description: 'Relaxed poplin button-downs, camp collar linen shirts, and brushed flannel staples.',
    itemCount: 7
  },
  {
    id: 'men-tshirts',
    name: 'T-Shirts & Polos',
    slug: 't-shirts',
    group: 'Men',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
    description: 'Heavyweight organic jersey tees, merino knitted polos, and relaxed crewnecks.',
    itemCount: 6
  },
  {
    id: 'men-knitwear',
    name: 'Knitwear & Sweaters',
    slug: 'knitwear',
    group: 'Men',
    image: 'https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?q=80&w=1200&auto=format&fit=crop',
    description: 'Waffle-knit merino wool, mock neck pullovers, and Scottish lambswool cardigans.',
    itemCount: 6
  },
  {
    id: 'men-trousers',
    name: 'Trousers & Chinos',
    slug: 'trousers',
    group: 'Men',
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1200&auto=format&fit=crop',
    description: 'Single-pleat tailored wool trousers, relaxed cotton chinos, and drawstring dress pants.',
    itemCount: 6
  },
  {
    id: 'men-denim',
    name: 'Denim & Selvedge',
    slug: 'denim',
    group: 'Men',
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop',
    description: 'Japanese selvedge denim, classic straight cut, and washed black minimal denim.',
    itemCount: 5
  },
  {
    id: 'men-loungewear',
    name: 'Cashmere Loungewear',
    slug: 'men-loungewear',
    group: 'Men',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop',
    description: 'Relaxed cashmere joggers, waffle robes, and premium organic cotton lounge sets.',
    itemCount: 4
  },
  {
    id: 'men-footwear',
    name: 'Derbies & Loafers',
    slug: 'men-footwear',
    group: 'Men',
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1200&auto=format&fit=crop',
    description: 'Goodyear-welted dress shoes, suede loafers, and minimalist leather sneakers.',
    itemCount: 6
  },

  // ==========================================
  // ACCESSORIES & LEATHER GOODS
  // ==========================================
  {
    id: 'acc-bags',
    name: 'Bags & Leather Totes',
    slug: 'bags',
    group: 'Accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
    description: 'Full-grain Tuscan calfskin totes, structured shoulder bags, and suede messengers.',
    itemCount: 7
  },
  {
    id: 'acc-travel',
    name: 'Travel & Weekender Bags',
    slug: 'travel',
    group: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
    description: 'Canvas and bridle leather holdalls, duffles, and garment carriers.',
    itemCount: 4
  },
  {
    id: 'acc-footwear',
    name: 'Artisan Footwear & Loafers',
    slug: 'footwear',
    group: 'Accessories',
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1200&auto=format&fit=crop',
    description: 'Hand-stitched leather loafers, Chelsea boots, and minimal court sneakers.',
    itemCount: 7
  },
  {
    id: 'acc-belts',
    name: 'Belts & Small Goods',
    slug: 'belts',
    group: 'Accessories',
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1200&auto=format&fit=crop',
    description: 'Saddle leather belts with minimal brass hardware and zipped card cases.',
    itemCount: 5
  },
  {
    id: 'acc-sunglasses',
    name: 'Sunglasses & Eyewear',
    slug: 'eyewear',
    group: 'Accessories',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop',
    description: 'Hand-polished Japanese acetate sunglasses with 100% UV Zeiss lenses.',
    itemCount: 5
  },
  {
    id: 'acc-jewelry',
    name: 'Fine Jewelry & Cuffs',
    slug: 'jewelry',
    group: 'Accessories',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
    description: 'Sculptural 18k gold vermeil cuffs, recycled silver bands, and minimal pendants.',
    itemCount: 6
  },
  {
    id: 'acc-watches',
    name: 'Timepieces & Watches',
    slug: 'watches',
    group: 'Accessories',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop',
    description: 'Minimalist Swiss-movement watches with vegetable-tanned leather straps.',
    itemCount: 4
  },
  {
    id: 'acc-scarves',
    name: 'Scarves & Cashmere Wraps',
    slug: 'scarves',
    group: 'Accessories',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1200&auto=format&fit=crop',
    description: 'Featherlight woven cashmere shawls, fringed wool stoles, and silk neckties.',
    itemCount: 4
  },
  {
    id: 'acc-hats',
    name: 'Hats & Headwear',
    slug: 'hats',
    group: 'Accessories',
    image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=90&w=1200&auto=format&fit=crop',
    description: 'Hand-blocked felt fedoras, ribbed cashmere beanies, and wool berets.',
    itemCount: 4
  },
  {
    id: 'acc-fragrance',
    name: 'Haute Parfumerie & Fragrance',
    slug: 'fragrance',
    group: 'Accessories',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=90&w=1200&auto=format&fit=crop',
    description: 'Rare botanical extraits de parfum and artisanal amber glass candle vessels.',
    itemCount: 5
  },
  {
    id: 'women-evening',
    name: 'Haute Evening & Gala',
    slug: 'evening',
    group: 'Women',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=90&w=1200&auto=format&fit=crop',
    description: 'Floor-length sculpted velvet and obsidian silk charmeuse bespoke gowns.',
    itemCount: 6
  },

  // ==========================================
  // KIDS & JUNIOR ATELIER
  // ==========================================
  {
    id: 'kids-outerwear',
    name: 'Kids Outerwear & Coats',
    slug: 'kids-outerwear',
    group: 'Kids',
    image: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=1200&auto=format&fit=crop',
    description: 'English melton wool duffel coats, weatherproof waxed field parkas, and hooded down jackets.',
    itemCount: 4
  },
  {
    id: 'kids-knitwear',
    name: 'Cashmere & Wool Knitwear',
    slug: 'kids-knitwear',
    group: 'Kids',
    image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=1200&auto=format&fit=crop',
    description: 'Grade-A Scottish cashmere cable crews, organic merino cardigans, and ribbed beanie sets.',
    itemCount: 5
  },
  {
    id: 'kids-dresses',
    name: 'Girls Dresses & Rompers',
    slug: 'kids-dresses',
    group: 'Kids',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop',
    description: 'Hand-smocked Liberty cotton party frocks, silk-blend velvet dresses, and washed flax rompers.',
    itemCount: 4
  },
  {
    id: 'kids-tailoring',
    name: 'Junior Tailoring & Shirts',
    slug: 'kids-tailoring',
    group: 'Kids',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop',
    description: 'Unstructured Neapolitan wool blazers, organic cotton Breton sailor shirts, and tailored trousers.',
    itemCount: 4
  },
  {
    id: 'kids-footwear',
    name: 'Artisan Kids Footwear',
    slug: 'kids-footwear',
    group: 'Kids',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
    description: 'Handcrafted Italian calfskin Chelsea boots and soft nappa leather T-bar shoes.',
    itemCount: 3
  }
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'col-aw25',
    name: 'Autumn / Winter 2025',
    slug: 'autumn-winter-2025',
    headline: 'The Architecture of Form',
    description: 'Clean tailoring, heavy wools, and sculptural silhouettes designed for effortless urban winter layering.',
    coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop',
    season: 'AW 2025',
    itemCount: 22
  },
  {
    id: 'col-essentials',
    name: 'The Minimalist Uniform',
    slug: 'minimalist-uniform',
    headline: 'Everyday Permanence',
    description: 'Timeless foundation pieces: organic cotton poplin, virgin wool trousers, and signature knitwear.',
    coverImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1400&auto=format&fit=crop',
    season: 'Core Essentials',
    itemCount: 18
  },
  {
    id: 'col-evening',
    name: 'Evening Noir',
    slug: 'evening-noir',
    headline: 'Fluid Elegance',
    description: 'Deep obsidian silks, bias-cut drapery, and understated evening suiting for nocturnal occasions.',
    coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1400&auto=format&fit=crop',
    season: 'Evening Capsule',
    itemCount: 12
  },
  {
    id: 'col-cashmere',
    name: 'Pure Cashmere Edit',
    slug: 'pure-cashmere',
    headline: 'Tactile Warmth',
    description: 'Spun from grade-A Mongolian cashmere fibers for extraordinary softness and multi-decade longevity.',
    coverImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1400&auto=format&fit=crop',
    season: 'Limited Spin',
    itemCount: 10
  },
  {
    id: 'col-tailoring',
    name: 'Studio Bespoke Tailoring',
    slug: 'bespoke-tailoring',
    headline: 'Crafted Precision',
    description: 'Full-canvas blazers, sculpted waistlines, and hand-finished lapels from our Yorkshire studio.',
    coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1400&auto=format&fit=crop',
    season: 'Atelier Signature',
    itemCount: 14
  }
];
