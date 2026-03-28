import React from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { navLinks } from "@/data/siteData";
import { productDetailData } from "@/data/productDetailData";

const fader: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

const Products = () => {
  const productLinks = navLinks.find(l => l.label === "Products")?.children || [];

  return (
    <div className="bg-white min-h-screen selection:bg-[#E8F5E9] selection:text-[#1A4231]">
      <SEO
        title="Agri Products | Buy Farming Equipment & Supplies — IGO Agritech Farms"
        description="Shop agri products from IGO Agritech Farms — polyhouse materials, hydroponic systems, drip irrigation, grow lights, pond liners, agri nets, bio-inputs, and more. Quality assured."
        keywords="buy polyhouse material India, hydroponic system buy, drip irrigation products, agri net India, pond liner buy, grow lights farming, bio inputs agriculture"
        url="/products"
      />
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-black">
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="/assets/product/main page image/farm equipment .jpg"
            alt="IGO Products"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.2 } } }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fader} className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-8 bg-[#C5A03F]/60" />
              <span className="text-[#C5A03F] font-bold text-xs uppercase tracking-[0.3em]">Premium Agri Inputs</span>
              <div className="h-px w-8 bg-[#C5A03F]/60" />
            </motion.div>
            <motion.h1 variants={fader} className="text-6xl md:text-8xl font-serif text-white mb-10 tracking-tight leading-[0.95]">
              Professional <br /> <span className="italic text-[#C5A03F]">Agricultural</span> Supplies.
            </motion.h1>
            <motion.p variants={fader} className="text-white/60 text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              From high-yield seeds to advanced engineering components, IGO provides the essential inputs for modern, high-tech farming systems across India.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {productLinks.map((category, i) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <Link to={category.href} className="group relative block aspect-[16/10] rounded-[3rem] overflow-hidden bg-slate-100 border border-black/5 shadow-sm hover:shadow-2xl transition-all duration-700">
                {/* Image Background */}
                <div className="absolute inset-0">
                  <img 
                    src={(category as any).cardImage || (category.icon && typeof category.icon === 'string' && category.icon.startsWith('/') 
                      ? category.icon 
                      : "/assets/projects/agri_farming.jpg")
                    } 
                    alt={category.label}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                  <div className="mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest leading-none">
                      {productDetailData.filter(p => p.category === (category.href.split('/').pop() || '')).length} Products
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-serif mb-4 leading-tight group-hover:translate-x-2 transition-transform duration-500">
                    {category.label}
                  </h3>
                  <div className="flex items-center gap-3 text-white/70 font-medium text-sm group-hover:text-white transition-colors">
                     View All Products <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Corner Label */}
                <div className="absolute top-10 right-10 flex items-center gap-3">
                   <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                   </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-40 bg-[#1A1A1A] text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
               <h2 className="text-5xl md:text-7xl font-serif mb-12 leading-[1.1]">The Gold Standard <br /> in Agri Inputs.</h2>
               <p className="text-white/50 text-xl font-light leading-relaxed mb-12 max-w-xl">
                 Every product in our catalog undergoes rigorous quality testing to ensure it meets the highest standards for performance, durability, and safety in professional farming environments.
               </p>
               <div className="grid grid-cols-2 gap-8">
                  {[
                    { title: "Pan-India", desc: "Fast logistics to any farm-gate." },
                    { title: "ISO Certified", desc: "Global quality standards." },
                    { title: "Bulk Rates", desc: "Best prices for large projects." },
                    { title: "Expert Support", desc: "Free technical consultation." }
                  ].map(stat => (
                    <div key={stat.title}>
                       <h4 className="text-primary font-bold text-lg mb-2">{stat.title}</h4>
                       <p className="text-white/30 text-sm leading-relaxed">{stat.desc}</p>
                    </div>
                  ))}
               </div>
            </div>
            <div className="relative rounded-[3rem] overflow-hidden aspect-square border border-white/10">
               <img src="/assets/product/main page image/Agri Essentials.jpg" alt="Product Quality" loading="lazy" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
               <div className="absolute inset-0 flex items-center justify-center p-20 text-center">
                  <ShieldCheck className="w-32 h-32 text-primary opacity-20 absolute" />
                  <p className="text-2xl font-serif italic text-white relative z-10">"Quality is not an act, it is a habit in everything we build and sell."</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] mb-10">Ready to Grow Pro?</h2>
          <p className="text-black/50 text-xl leading-relaxed mb-12 font-light">
            Contact our sales engineering team for bulk pricing, distribution enquiries, or technical specifications for your specific farm project.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
             <Link to="/contact" className="px-12 py-5 bg-primary text-white text-xs font-bold rounded-full hover:bg-black transition-all uppercase tracking-widest shadow-xl shadow-primary/20">
               Contact Sales Team
             </Link>
             <Link to="/contact?subject=Catalog%20Request" className="px-12 py-5 bg-white border border-black/10 text-black text-xs font-bold rounded-full hover:bg-slate-50 transition-all uppercase tracking-widest">
                Request Catalog
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
