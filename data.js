/* ==========================================================================
   ValueSense product database
   --------------------------------------------------------------------------
   Add one entry per reel. The "id" is the exact code you show at the end
   of the reel/video (keep it short — 1, 2, 3... or a simple code like "A1").
   "icon" picks one of the icon shapes defined in script.js (see ICONS).
   Swap "image" for a real product photo URL any time — if it's set, the
   photo is used instead of the icon.

   ONE PRODUCT, MULTIPLE LINKS (e.g. colours or sizes)
   --------------------------------------------------------------------------
   If the same reel/code covers more than one option — say a shirt in two
   colours, each with its own affiliate link — skip "affiliateLink" on the
   product itself and add a "variants" array instead. The page will show a
   picker and swap the link (and photo/price, if given) as the person
   chooses:

     variants: [
       { label: "Black",  affiliateLink: "https://example.com/shirt-black", image: "https://.../black.jpg" },
       { label: "Olive",  affiliateLink: "https://example.com/shirt-olive", image: "https://.../olive.jpg" }
     ]

   Each variant only needs "label" and "affiliateLink". "image", "price"
   and "originalPrice" are optional per variant — leave them out and the
   variant just falls back to the product's own image/price.
   ========================================================================== */

const PRODUCTS = {
//   "1": {
//     id: "1",
//     name: "AeroFit Wireless Earbuds",
//     category: "Tech",
//     icon: "earbuds",
//     image: "",
//     tagline: "All-day noise cancelling, half the price of the big brands.",
//     price: 1799,
//     originalPrice: 2999,
//     currency: "₹",
//     rating: 4.6,
//     reviews: 812,
//     highlights: [
//       "28 hours total battery with the case",
//       "Active noise cancellation + transparency mode",
//       "IPX5 sweat and splash resistant"
//     ],
//     affiliateLink: "https://example.com/aerofit-earbuds"
//   },
//   "2": {
//     id: "2",
//     name: "Lumen Desk Lamp",
//     category: "Home",
//     icon: "lamp",
//     image: "",
//     tagline: "Warm-to-cool light that actually helps you focus.",
//     price: 1249,
//     originalPrice: 1799,
//     currency: "₹",
//     rating: 4.8,
//     reviews: 356,
//     highlights: [
//       "Stepless brightness and colour temperature",
//       "USB-C powered, folds flat for travel",
//       "Eye-comfort flicker-free LEDs"
//     ],
//     affiliateLink: "https://example.com/lumen-lamp"
//   },
//   "3": {
//     id: "3",
//     name: "TrailPack 22L Daypack",
//     category: "Outdoor",
//     icon: "backpack",
//     image: "",
//     tagline: "The one bag that survived every trip this year.",
//     price: 2199,
//     originalPrice: 2899,
//     currency: "₹",
//     rating: 4.7,
//     reviews: 501,
//     highlights: [
//       "Water-resistant ripstop shell",
//       "Dedicated 15\" laptop sleeve",
//       "Chest strap for long hikes"
//     ],
//     affiliateLink: "https://example.com/trailpack-22l"
//   },
//   "4": {
//     id: "4",
//     name: "PulseFit Smart Watch",
//     category: "Tech",
//     icon: "watch",
//     image: "",
//     tagline: "Tracks everything, nags about nothing.",
//     price: 3499,
//     originalPrice: 4999,
//     currency: "₹",
//     rating: 4.5,
//     reviews: 1204,
//     highlights: [
//       "7-day battery life on a single charge",
//       "Heart rate, SpO2 and sleep tracking",
//       "Works with both iOS and Android"
//     ],
//     affiliateLink: "https://example.com/pulsefit-watch"
//   },
//   "5": {
//     id: "5",
//     name: "BrewMate Pour-Over Kit",
//     category: "Kitchen",
//     icon: "kettle",
//     image: "",
//     tagline: "Café-quality coffee without the café markup.",
//     price: 999,
//     originalPrice: 1499,
//     currency: "₹",
//     rating: 4.9,
//     reviews: 289,
//     highlights: [
//       "Gooseneck kettle for precise pouring",
//       "Reusable stainless steel filter included",
//       "Dishwasher safe carafe"
//     ],
//     affiliateLink: "https://example.com/brewmate-kit"
//   },
//   "6": {
//     id: "6",
//     name: "KeyForge Mechanical Keyboard",
//     category: "Tech",
//     icon: "keyboard",
//     image: "",
//     tagline: "Satisfying clicks, serious typing speed.",
//     price: 2799,
//     originalPrice: 3999,
//     currency: "₹",
//     rating: 4.7,
//     reviews: 674,
//     highlights: [
//       "Hot-swappable switches, no soldering needed",
//       "Per-key RGB with 16 lighting modes",
//       "Detachable braided USB-C cable"
//     ],
//     affiliateLink: "https://example.com/keyforge-keyboard"
//   },
//   "7": {
//     id: "7",
//     name: "HydroFlow Insulated Bottle",
//     category: "Everyday",
//     icon: "bottle",
//     image: "",
//     tagline: "Cold at noon, still cold at midnight.",
//     price: 649,
//     originalPrice: 999,
//     currency: "₹",
//     rating: 4.8,
//     reviews: 940,
//     highlights: [
//       "Keeps drinks cold for 24 hours, hot for 12",
//       "Leak-proof flip lid, one-hand open",
//       "750ml — fits most car cup holders"
//     ],
//     affiliateLink: "https://example.com/hydroflow-bottle"
//   },
//   "8": {
//     id: "8",
//     name: "GlideStep Running Shoes",
//     category: "Fitness",
//     icon: "shoe",
//     image: "",
//     tagline: "The pair that made three friends stop shoe-shopping.",
//     price: 2399,
//     originalPrice: 3299,
//     currency: "₹",
//     rating: 4.6,
//     reviews: 1032,
//     highlights: [
//       "Breathable knit upper, sock-like fit",
//       "Responsive foam midsole for daily runs",
//       "Reinforced heel for extra stability"
//     ],
//     affiliateLink: "https://example.com/glidestep-shoes"
//   },
  "1": {
    id: "1",
    name: "Trendy Men Formal Shirt",
    category: "Fashion",
    icon: "box",
    image: "beige.jpeg",
    tagline: "Premium Everyday Wear.",
    price: 257,
    originalPrice: 302,
    currency: "₹",
    rating: 3.9,
    reviews: 180,
    highlights: [
      "Brand - PROBIZ, Platform - Meesho",
      "Men's Modern Cotton Stripped Formal",
      "Excellent shirt quality, low budget."
    ],
    /* No single affiliateLink here — each colour has its own link below.
       The page will show a colour picker and swap the link automatically. */
    variants: [
  {
    label: "Beige",
    affiliateLink: "https://www.meesho.com/af_invite/460511969:instagram_stories:10715702?p_id=657894314&ext_id=avoyi2&utm_source=instagram_stories",
    image: "beige.jpeg",
    price: 257,
    originalPrice: 302
  },
  {
    label: "Blue",
    affiliateLink: "https://www.meesho.com/af_invite/460511969:instagram_stories:10716132?p_id=657894315&ext_id=avoyi3&utm_source=instagram_stories",
    image: "blue.jpeg",
    price: 293,          // this one costs more
    originalPrice: 308
  }
]
  }
};