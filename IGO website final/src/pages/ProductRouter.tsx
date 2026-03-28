import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import {
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Truck,
  Headphones,
  ArrowRight,
  ChevronRight,
  Minus,
  Plus,
  Info,
  Beaker,
  Zap,
  Package
} from 'lucide-react';
import { productDetailData, ProductDetail } from '@/data/productDetailData';
import { navLinks } from '@/data/siteData';

// ── helpers ──────────────────────────────────────────────────────────────────

const CATEGORY_META: Record<string, { label: string; cardImage: string; desc: string }> = {
  'agri-essentials': {
    label: 'Agri Essentials',
    cardImage: '/assets/product/main page image/Agri Essentials.jpg',
    desc: 'High-yield seeds, grafted plants, and specialty saplings for professional cultivation.'
  },
  'crop-solutions': {
    label: 'Crop Solutions',
    cardImage: '/assets/product/main page image/Crop Solutions.jpg',
    desc: 'Fertilizers, bio-stimulants, and crop-protection products for maximum farm yield.'
  },
  'animal-solutions': {
    label: 'Animal Solutions',
    cardImage: '/assets/product/main page image/Animal Solutions.jpg',
    desc: 'Complete nutrition, health, and equipment range for aquaculture and livestock farms.'
  },
  'farm-equipment': {
    label: 'Farm Equipment',
    cardImage: '/assets/product/main page image/farm equipment .jpg',
    desc: 'Polyhouse structures, hydroponic systems, irrigation, and solar farming equipment.'
  }
};

// ── Individual product images (mapped to product ID) ─────────────────────────
const PRODUCT_IMAGES: Record<string, string> = {
  // Agri Essentials
  'vegetable-seeds':               '/assets/product/types/vegetable seed .jpg',
  'fruit-plants':                  '/assets/product/types/fruit plants .jpg',
  'flower-seeds':                  '/assets/product/types/flower seeds .jpg',
  'medicinal-plants':              '/assets/product/types/medicinal plants .jpg',
  // Crop Solutions
  'npk-fertilizers':               '/assets/product/types/NPK fertilizers .jpg',
  'organic-fertilizers':           '/assets/product/types/organic fertilizer .jpg',
  'liquid-fertilizers':            '/assets/product/types/luquide fertilizers .jpg',
  'micronutrients':                '/assets/product/types/micronutrines .jpg',
  'azospirillum':                  '/assets/product/types/Azospirillum .png',
  'phosphate-solubilizing-bacteria':'/assets/product/types/phosphate solubilizing bacteria.jpg',
  'mycorrhiza':                    '/assets/product/types/mycoeehiza.jpg',
  'humic-acid':                    '/assets/product/types/humic acid .jpg',
  'fulvic-acid':                   '/assets/product/types/fulvic acid .jpg',
  'amino-acid-nutrients':          '/assets/product/types/amino acid .jpg',
  'insecticides':                  '/assets/product/types/insecticide .jpg',
  'fungicides':                    '/assets/product/types/fungicides .jpg',
  'herbicides':                    '/assets/product/types/herbisides .jpg',
  'bio-pesticides':                '/assets/product/types/bio bestiscide .jpg',
  // Animal Solutions
  'fish-feed':                     '/assets/product/types/fish feed .jpg',
  'aerators':                      '/assets/product/types/aerators .jpg',
  'biofloc-tanks':                 '/assets/product/types/biofloc tank .jpg',
  'pond-liners':                   '/assets/product/types/pond liner .jpg',
  'water-testing-kits':            '/assets/product/types/wter testing kits .jpg',
  'fish-medicines':                '/assets/product/types/fish medicins .jpg',
  'goat-feed':                     '/assets/product/types/goat feed s.jpg',
  'cattle-feed':                   '/assets/product/types/cattle feeds .jpg',
  'mineral-mixtures':              '/assets/product/types/mineral mixtures .jpg',
  'livestock-medicines':           '/assets/product/types/live stock medicines .jpg',
  'livestock-equipment':           '/assets/product/types/live stock equipmemts .jpg',
  // Farm Equipment
  'polyhouse-sheets':              '/assets/product/types/polyhouse sheets.jpg',
  'shade-nets':                    '/assets/product/types/shade nets .jpg',
  'insect-nets':                   '/assets/product/types/insect net .jpg',
  'gi-pipes':                      '/assets/product/types/GI pipes .jpg',
  'nft-channels':                  '/assets/product/types/NFT channels .jpg',
  'net-pots':                      '/assets/product/types/net pots .jpg',
  'hydroponic-nutrients':          '/assets/product/types/hydroponic nutrients .jpg',
  'grow-lights':                   '/assets/product/types/grow lights.jpg',
  'water-pumps':                   '/assets/product/types/waterpumpn.jpg',
  'drip-irrigation-systems':       '/assets/product/types/drip irrigation system .jpg',
  'sprinklers':                    '/assets/product/types/sprinklers .jpg',
  'irrigation-pipes':              '/assets/product/types/irrigation pipes .jpg',
  'solar-dryers':                  '/assets/product/types/solar dryers .jpg',
  'solar-pumps':                   '/assets/product/types/solar pumps .jpg',
  'solar-fencing-systems':         '/assets/product/types/solar fencing system .jpg',
};

const LOCAL_FALLBACK = '/assets/home page image .png';

// ── Category Listing View ─────────────────────────────────────────────────────

const CategoryView: React.FC<{ category: string }> = ({ category }) => {
  const meta = CATEGORY_META[category];
  const products = productDetailData.filter(p => p.category === category);

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h2>
          <Link to="/products" className="text-primary hover:underline flex items-center justify-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const catBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.igoagritechfarms.com/" },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.igoagritechfarms.com/products" },
      { "@type": "ListItem", "position": 3, "name": meta.label, "item": `https://www.igoagritechfarms.com/products/${category}` }
    ]
  };

  return (
    <div className="bg-white min-h-screen selection:bg-[#E8F5E9] selection:text-[#1A4231]">
      <SEO
        title={`${meta.label} Products`}
        description={`${meta.desc} Buy ${meta.label.toLowerCase()} from IGO Agritech Farms — premium quality, pan-India delivery, bulk pricing available.`}
        keywords={`${meta.label}, agricultural products India, buy farming products, IGO Agritech Farms`}
        url={`/products/${category}`}
        image={meta.cardImage}
        jsonLd={catBreadcrumb}
      />

      {/* Hero strip */}
      <section className="relative pt-36 pb-24 bg-black overflow-hidden">
        <motion.div
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.45 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img src={meta.cardImage} alt={meta.label} loading="eager" className="w-full h-full object-cover" />
        </motion.div>
        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-10">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 opacity-40" />
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4 opacity-40" />
            <span className="text-white font-semibold">{meta.label}</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.3em] mb-5">
              <div className="w-8 h-[1px] bg-[#C5A03F]" />
              {products.length} Products
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[0.95] mb-6">
              {meta.label}
            </h1>
            <p className="text-white/55 text-lg font-light max-w-xl leading-relaxed">
              {meta.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <Link
                to={`/products/${category}/${product.id}`}
                className="group flex flex-col bg-white rounded-[1.75rem] overflow-hidden border border-black/[0.06] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F4F8F4]">
                  <img
                    src={PRODUCT_IMAGES[product.id] || meta.cardImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={e => { (e.currentTarget as HTMLImageElement).src = meta.cardImage; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-[#1A4231]">
                    {meta.label}
                  </div>
                </div>
                {/* Info */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base font-black text-[#1A4231] mb-2 leading-snug group-hover:text-[#C5A03F] transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-black/50 leading-relaxed line-clamp-2 mb-4 flex-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/[0.06]">
                    <div>
                      <span className="text-[9px] font-bold text-black/30 uppercase tracking-widest block">Starting from</span>
                      <span className="text-lg font-black text-[#1A4231]">₹{product.pricing.retail.toLocaleString()}</span>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#F4F8F4] group-hover:bg-[#1A4231] flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4 text-[#1A4231] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20 bg-[#F4F8F4]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-[#1A4231] mb-4">Need Bulk Pricing or a Custom Order?</h2>
          <p className="text-black/50 mb-8 max-w-xl mx-auto">Contact our sales team for volume discounts, technical specifications, and pan-India delivery.</p>
          <Link
            to="/contact?subject=Bulk%20Enquiry"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#1A4231] text-white text-xs font-bold rounded-full hover:bg-[#2a5a45] transition-all uppercase tracking-widest shadow-xl shadow-[#1A4231]/20"
          >
            Contact Sales Team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

// ── Product Detail View ───────────────────────────────────────────────────────

const DetailView: React.FC<{ product: ProductDetail; category: string }> = ({ product, category }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'description' | 'howToUse' | 'specifications'>('description');
  const [quantity, setQuantity] = useState(1);
  const [selectedPackSize, setSelectedPackSize] = useState(product.packSizes[0]);
  const [selectedPriceTier, setSelectedPriceTier] = useState<'retail' | 'wholesale' | 'bulk'>('retail');
  const meta = CATEGORY_META[category];

  const productImg = PRODUCT_IMAGES[product.id] || meta?.cardImage || LOCAL_FALLBACK;
  const [imgUrl, setImgUrl] = useState(productImg);
  const [imgFallbackStage, setImgFallbackStage] = useState(0);

  useEffect(() => {
    setImgUrl(PRODUCT_IMAGES[product.id] || meta?.cardImage || LOCAL_FALLBACK);
    setImgFallbackStage(0);
  }, [product.id, category]);

  const onImageError = () => {
    if (imgFallbackStage === 0) {
      setImgUrl(meta?.cardImage || LOCAL_FALLBACK);
      setImgFallbackStage(1);
    } else if (imgFallbackStage === 1) {
      setImgUrl(LOCAL_FALLBACK);
      setImgFallbackStage(2);
    }
  };

  const handleEnquire = (subject?: string) => {
    const s = subject || `Enquiry: ${product.name}`;
    navigate(`/contact?subject=${encodeURIComponent(s)}`);
  };

  const priceTiers = [
    { id: 'retail' as const, label: 'Retail Price', value: product.pricing.retail },
    { id: 'wholesale' as const, label: 'Wholesale (Min 50)', value: product.pricing.wholesale },
    { id: 'bulk' as const, label: 'Bulk Institutional', value: product.pricing.bulk }
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": imgUrl.startsWith("/") ? `https://www.igoagritechfarms.com${imgUrl}` : imgUrl,
    "brand": { "@type": "Brand", "name": "IGO Agritech Farms" },
    "category": product.categoryName,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": product.pricing.retail,
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "IGO Agritech Farms" }
    }
  };

  const productBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.igoagritechfarms.com/" },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.igoagritechfarms.com/products" },
      { "@type": "ListItem", "position": 3, "name": meta?.label || category, "item": `https://www.igoagritechfarms.com/products/${category}` },
      { "@type": "ListItem", "position": 4, "name": product.name, "item": `https://www.igoagritechfarms.com/products/${category}/${product.id}` }
    ]
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20 selection:bg-[#E8F5E9] selection:text-[#1A4231]">
      <SEO
        title={product.name}
        description={`Buy ${product.name} from IGO Agritech Farms. ${product.description.slice(0, 100)} Starting from ₹${product.pricing.retail.toLocaleString()}. Pan-India delivery.`}
        keywords={`${product.name}, ${product.categoryName}, buy ${product.categoryName.toLowerCase()}, IGO Agritech Farms, agricultural products`}
        url={`/products/${category}/${product.id}`}
        image={imgUrl.startsWith("/") ? imgUrl : undefined}
        jsonLd={{ "@context": "https://schema.org", "@graph": [productBreadcrumb, productSchema] }}
      />
      <div className="container mx-auto px-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10 flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 opacity-30" />
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4 opacity-30" />
          <Link to={`/products/${category}`} className="hover:text-primary transition-colors capitalize">
            {meta?.label || category}
          </Link>
          <ChevronRight className="w-4 h-4 opacity-30" />
          <span className="text-black font-semibold truncate">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16">

          {/* LEFT — Image + Trust Badges */}
          <div className="lg:w-[40%]">
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-100 shadow-2xl border border-black/5 group">
              <img
                src={imgUrl}
                alt={product.name}
                onError={onImageError}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#1A4231] shadow-sm border border-black/5">
                  Premium Grade
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: ShieldCheck, label: '100% Genuine' },
                { icon: Headphones, label: 'Expert Support' },
                { icon: Truck, label: 'Pan India Delivery' }
              ].map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-50 border border-black/[0.03]">
                  <badge.icon className="w-6 h-6 text-[#C5A03F] mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black/60">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Product Details */}
          <div className="lg:w-[60%] flex flex-col justify-center">

            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-bold text-[#C5A03F] tracking-widest uppercase bg-[#C5A03F]/10 px-4 py-1.5 rounded-full">
                {product.categoryName}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-[#1A4231] mb-6 leading-[1.1]">
              {product.name}
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
              {product.description}
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-10">
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-[#E8F5E9] p-1 rounded-full shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#1A4231]" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Pack Size Selector */}
            <div className="mb-8">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 block">
                Select Pack Size / Variant
              </label>
              <div className="flex flex-wrap gap-3">
                {product.packSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedPackSize(size)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                      selectedPackSize === size
                        ? 'bg-[#1A4231] text-white border-[#1A4231] shadow-lg shadow-[#1A4231]/10'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#1A4231] hover:text-[#1A4231]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Tiers */}
            <div className="mb-10">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 block">
                Commercial Pricing (INR)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {priceTiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedPriceTier(tier.id)}
                    className={`p-4 rounded-2xl text-left transition-all border-2 ${
                      selectedPriceTier === tier.id
                        ? 'border-[#C5A03F] bg-[#C5A03F]/5'
                        : 'border-gray-100 hover:border-[#C5A03F]/30 bg-gray-50/50'
                    }`}
                  >
                    <span className={`text-[10px] font-black uppercase tracking-widest mb-1 block transition-colors ${
                      selectedPriceTier === tier.id ? 'text-[#C5A03F]' : 'text-gray-400'
                    }`}>
                      {tier.label}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-[#1A4231]">₹</span>
                      <span className="text-2xl font-black text-[#1A4231]">{tier.value.toLocaleString()}</span>
                    </div>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs text-gray-400 italic font-medium flex items-center gap-1">
                <Info className="w-3 h-3" /> Minimum Order Quantity (MOQ) varies per product and location.
              </p>
            </div>

            {/* Quantity + CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-100">
              <div className="flex items-center bg-gray-100 rounded-2xl p-1 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white transition-colors text-gray-500"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-12 text-center font-black text-[#1A4231]">{quantity}</div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white transition-colors text-gray-500"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => handleEnquire(`Enquiry: ${product.name} — ${selectedPackSize} × ${quantity}`)}
                className="flex-1 w-full bg-[#1A4231] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#2a5a45] transition-all shadow-xl shadow-[#1A4231]/20 active:scale-[0.98]"
              >
                <MessageSquare className="w-5 h-5" /> Enquire Now
              </button>

              <button
                onClick={() => handleEnquire(`Bulk Quote Request: ${product.name}`)}
                className="flex-1 w-full bg-white text-[#1A4231] border-2 border-[#1A4231] px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all active:scale-[0.98]"
              >
                <Package className="w-5 h-5" /> Get Quote
              </button>
            </div>
          </div>
        </div>

        {/* Tabs — Description / How To Use / Specifications */}
        <div className="mt-24 border-t border-gray-100 pt-16">
          <div className="flex flex-wrap gap-8 border-b border-gray-100 mb-10">
            {[
              { id: 'description', label: 'Description', icon: Info },
              { id: 'howToUse', label: 'How to Use', icon: Zap },
              { id: 'specifications', label: 'Specifications', icon: Beaker }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 pb-4 text-sm font-black uppercase tracking-[0.2em] transition-all relative ${
                  activeTab === tab.id ? 'text-[#C5A03F]' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A03F]" />
                )}
              </button>
            ))}
          </div>

          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="min-h-[300px]"
              >
                {activeTab === 'description' && (
                  <div className="prose prose-slate max-w-none">
                    <p className="text-gray-600 leading-relaxed text-lg">{product.tabDescription}</p>
                  </div>
                )}

                {activeTab === 'howToUse' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.howToUse.map((step, idx) => (
                      <div key={idx} className="flex gap-4 p-6 rounded-3xl bg-slate-50 border border-black/[0.03]">
                        <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-black/5 flex items-center justify-center font-black text-[#C5A03F] shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-sm font-medium text-gray-700 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white">
                    <table className="w-full text-left">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value], idx) => (
                          <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                            <td className="px-8 py-5 text-sm font-black text-gray-400 uppercase tracking-widest w-1/3 border-r border-gray-100">
                              {key}
                            </td>
                            <td className="px-8 py-5 text-sm font-bold text-[#1A4231]">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        {product.relatedProducts.length > 0 && (
          <div className="mt-32">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-xs font-black text-[#C5A03F] tracking-[0.3em] uppercase mb-3 block">Complementary</span>
                <h2 className="text-3xl font-black text-[#1A4231]">Related Products</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {product.relatedProducts.map((relatedId) => {
                const related = productDetailData.find(p => p.id === relatedId);
                if (!related) return null;
                const relatedMeta = CATEGORY_META[related.category];
                return (
                  <Link
                    key={related.id}
                    to={`/products/${related.category}/${related.id}`}
                    className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                      <img
                        src={PRODUCT_IMAGES[related.id] || relatedMeta?.cardImage || LOCAL_FALLBACK}
                        alt={related.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-[#1A4231] shadow-sm">
                        {related.categoryName}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-sm font-black text-[#1A4231] mb-2 group-hover:text-[#C5A03F] transition-colors line-clamp-1">
                        {related.name}
                      </h3>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs font-bold text-gray-400">From ₹{related.pricing.retail.toLocaleString()}</span>
                        <div className="flex items-center text-[#C5A03F] text-xs font-black uppercase tracking-widest gap-1">
                          View <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Smart Router — 2-mode detection ──────────────────────────────────────────

const ProductRouter: React.FC = () => {
  const { category, productSlug } = useParams<{ category: string; productSlug: string }>();

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [category, productSlug]);

  // Mode 1: no productSlug → Category listing
  if (!productSlug) {
    return <CategoryView category={category || ''} />;
  }

  // Mode 2: productSlug given → find the product and show detail
  const product = productDetailData.find(p => p.id === productSlug && p.category === category);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-500 mb-6">This product doesn't exist or may have been moved.</p>
          <Link to="/products" className="inline-flex items-center gap-2 text-primary hover:underline font-bold">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return <DetailView product={product} category={category || ''} />;
};

export default ProductRouter;
