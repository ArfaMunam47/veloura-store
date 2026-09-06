export interface EditorialStory {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
}

export const EDITORIAL_STORIES: EditorialStory[] = [
  {
    id: 'story-01',
    title: 'The Architecture of the Trench: 100 Years of Gabardine',
    subtitle: 'Inside our historic Yorkshire mill where yarn is spun to repel rain without coating.',
    tag: 'Craft & Atelier',
    date: 'Autumn 2025',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=900&auto=format&fit=crop',
    excerpt: 'True weather resistance shouldn’t rely on plastic polymers. How breathable long-staple cotton twill defies storms.',
    content: [
      'In the damp chill of northern England, every thread of gabardine is woven under extreme tension. The result is a microscopic barrier where raindrops bead and roll away, yet air escapes freely.',
      'Unlike modern synthetic coats that deteriorate after three seasons, our coats are designed to be re-proofed and handed down through generations.'
    ]
  },
  {
    id: 'story-02',
    title: 'Sunlight & Stone: Summer in the Amalfi Cliffs',
    subtitle: 'Introducing lightweight silk twill and unlined linen tailoring.',
    tag: 'Collection Edit',
    date: 'Summer 2025',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=900&auto=format&fit=crop',
    excerpt: 'A palette inspired by washed limestone, aged terracotta, and twilight Mediterranean waters.',
    content: [
      'Summer dressing should never mean sacrificing structure. Our unlined jackets and bias-cut silks offer effortless elegance in high heat.'
    ]
  },
  {
    id: 'story-03',
    title: 'The Florentine Leather Tradition: Beyond Fast Fashion',
    subtitle: 'Why full-grain vegetable tanned calfskin ages better than polished synthetic alternatives.',
    tag: 'Materials & Provenance',
    date: 'June 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=900&auto=format&fit=crop',
    excerpt: 'A study in patience: how slow drum-tanning with chestnut bark creates supple leather with timeless patina.',
    content: [
      'In the hills around Florence, our master leatherworkers practice edge-painting by hand. Three coats of natural lacquer, sanded between each layer.'
    ]
  }
];

export const PRESS_REVIEWS = [
  {
    source: 'VOGUE EDITORIAL',
    quote: 'Velora cuts through the digital noise with quiet, uncompromising confidence. The Castleford trench is nothing short of exceptional.',
    author: 'Elena Rostova, Fashion Features Director'
  },
  {
    source: "HARPER'S BAZAAR",
    quote: 'In an era of fleeting micro-trends, Velora builds heirlooms. The drape of their silk slip gown is pure architectural poetry.',
    author: 'Marcus Vance, Senior Style Editor'
  },
  {
    source: 'ELLE INTERNATIONAL',
    quote: 'The luxury e-commerce experience we have been waiting for: seamless, realistic, and deeply rooted in genuine artisanal provenance.',
    author: 'Camille Laurent, Paris'
  }
];

export const FAQS = [
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        q: 'What are your delivery options and transit times?',
        a: 'We offer Complimentary Standard Shipping on all orders over $120 (2–5 business days), and Priority Atelier Express ($14, 1–2 business days). All orders are carefully packed in our signature archival boxes with cotton garment bags.'
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes. We deliver to over 18 international destinations via DHL Express. All duties, import taxes, and local customs clearances are calculated upfront at checkout with no surprise fees on delivery.'
      },
      {
        q: 'How can I track my order?',
        a: 'Once your order is dispatched from our atelier, you will receive real-time tracking updates via SMS/Email. You can also track your shipment live within your Velora Account Dashboard.'
      }
    ]
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your returns policy?',
        a: 'We provide a 30-day complimentary return window for all unworn garments in original condition with security tags attached. Return shipping labels are pre-printed and included inside your parcel.'
      },
      {
        q: 'How long does a refund take to process?',
        a: 'Once received at our atelier, returned items are inspected within 48 hours. Refunds are credited back to your original payment method within 3–5 business days.'
      }
    ]
  },
  {
    category: 'Materials & Sizing',
    questions: [
      {
        q: 'How do I choose the correct size?',
        a: 'Every product page features an interactive category-specific Size Guide with exact centimeter/inch measurements for chest, waist, hips, and sleeve length. If in doubt, we recommend your standard tailored size.'
      },
      {
        q: 'Where are your fabrics sourced?',
        a: 'Our cotton gabardine is woven in Yorkshire, our silk twill is printed in Lyon, our cashmeres are spun in Scotland, and our leathers are drum-tanned in Tuscany. Every item carries full provenance traceability.'
      }
    ]
  }
];
