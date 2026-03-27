import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Shield, TrendingUp, CheckCircle2, MessageCircle, BadgeCheck } from "lucide-react";
import { navLinks } from "@/data/siteData";
import SEO from "@/components/SEO";

const fader: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// ─── Image maps (corrected paths) ─────────────────────────────────────────────
const SUBCATEGORY_IMG: Record<string, string> = {
  "Protected Farming Projects":       "/assets/projects/project subcategories/subcategories/protected farming .png",
  "Hydroponic Farming Projects":      "/assets/projects/project subcategories/subcategories/hydroponic farming .jpg",
  "Vertical Farming Projects":        "/assets/projects/project subcategories/subcategories/Vertical  farming .jpg",
  "Open Field Cultivation Projects":  "/assets/projects/project subcategories/subcategories/open field cultivation .jpg",
  "Vegetable Cultivation Projects":   "/assets/projects/project subcategories/subcategories/vegetable cultivations .jpg",
  "Medicinal Crop Projects":          "/assets/projects/project subcategories/subcategories/medicinal crop .jpg",
  "Floriculture Projects":            "/assets/projects/project subcategories/subcategories/flooriculture project .jpg",
  "Mushroom Farming Projects":        "/assets/projects/project subcategories/subcategories/mushroom farming .jpg",
  "Urban Farming Projects":           "/assets/projects/project subcategories/subcategories/urban farming .jpg",
  "Nursery Projects":                 "/assets/projects/project subcategories/subcategories/nursery projcts .jpg",
  "Fish Farming Projects":            "/assets/projects/project subcategories/subcategories/fish farming .jpg",
  "Biofloc Farming Projects":         "/assets/projects/project subcategories/subcategories/biofloc farming .jpg",
  "Shrimp Farming Projects":          "/assets/projects/project subcategories/subcategories/shrimp farming .jpg",
  "Crab Farming Projects":            "/assets/projects/project subcategories/subcategories/crab farming .jpg",
  "Integrated Aquaculture":           "/assets/projects/project subcategories/subcategories/integarated farming .jpg",
  "Goat Farming":                     "/assets/projects/project subcategories/subcategories/goat farming .jpg",
  "Sheep Farming":                    "/assets/projects/project subcategories/subcategories/sheep farming .jpg",
  "Dairy Farming":                    "/assets/projects/project subcategories/subcategories/dairy farming .jpg",
  "Poultry Farming":                  "/assets/projects/project subcategories/subcategories/poultry farming .jpg",
  "Integrated Livestock Farming":     "/assets/projects/project subcategories/subcategories/intergarated live stock farming .jpg",
  "Farm Infrastructure Projects":     "/assets/projects/project subcategories/subcategories/farm infrastructure .jpg",
  "Water Management Projects":        "/assets/projects/project subcategories/subcategories/water management .jpg",
  "Solar Agriculture Projects":       "/assets/projects/project subcategories/subcategories/solar agriculture project .jpg",
  "Farm Development Projects":        "/assets/projects/project subcategories/subcategories/farm devedlopment project .jpg",
};

const TYPE_IMG: Record<string, string> = {
  "Naturally Ventilated Polyhouse":    "/assets/projects/project subcategories/types/naturally ventilated polyhouse .jpg",
  "Climate Controlled Polyhouse":      "/assets/projects/project subcategories/types/climate controlled polyhouse .jpg",
  "Polycarbonate Greenhouse":          "/assets/projects/project subcategories/types/polycarbonate green house .png",
  "Shade Net House":                   "/assets/projects/project subcategories/types/shade net house .jpg",
  "Mist Chamber":                      "/assets/projects/project subcategories/types/mist chamber .jpg",
  "NFT Hydroponic System":             "/assets/projects/project subcategories/types/NFT hydroponic system .jpg",
  "Deep Water Culture System":         "/assets/projects/project subcategories/types/Deep Water Culture (DWC)_ What Is It And How To Get Started.jpg",
  "Vertical Hydroponic Towers":        "/assets/projects/project subcategories/types/vertical hydroponic towers .jpg",
  "Commercial Hydroponic Farms":       "/assets/projects/project subcategories/types/commercial hydroponic farms .jpg",
  "Indoor Hydroponic Units":           "/assets/projects/project subcategories/types/indoor hydroponic farm .jpg",
  "Indoor Vertical Farms":             "/assets/projects/project subcategories/types/indoor vertical farming .jpg",
  "Commercial Vertical Farming Units": "/assets/projects/project subcategories/types/commercial farming .jpg",
  "Smart Grow Room Systems":           "/assets/projects/project subcategories/types/indoor vertical farming .jpg",
  "Dragon Fruit Plantation":           "/assets/projects/project subcategories/types/dragon fruit plantation .jpg",
  "Guava Plantation":                  "/assets/projects/project subcategories/types/guva plantation .jpg",
  "Mango Plantation":                  "/assets/projects/project subcategories/types/mango plantantion .jpg",
  "Papaya Plantation":                 "/assets/projects/project subcategories/types/papaya plantantion .jpg",
  "Fig Plantation":                    "/assets/projects/project subcategories/types/fig plantation .jpg",
  "Blueberry Plantation":              "/assets/projects/project subcategories/types/blueberry plantation.jpg",
  "Cucumber Farming":                  "/assets/projects/project subcategories/types/cucumber farming .jpg",
  "Capsicum Farming":                  "/assets/projects/project subcategories/types/capsicum poject .jpg",
  "Tomato Farming":                    "/assets/projects/project subcategories/types/tamato farming .jpg",
  "Chilli Farming":                    "/assets/projects/project subcategories/types/chilli farming .jpg",
  "Muskmelon Farming":                 "/assets/projects/project subcategories/types/muskmelon farming .jpg",
  "Watermelon Farming":                "/assets/projects/project subcategories/types/watermelon farming .jpg",
  "Aloe Vera Farming":                 "/assets/projects/project subcategories/types/aloe vera farming .jpg",
  "Moringa Plantation":                "/assets/projects/project subcategories/types/moringa plantantnion .jpg",
  "Ginger Farming":                    "/assets/projects/project subcategories/types/ginger farming .jpg",
  "Turmeric Farming":                  "/assets/projects/project subcategories/types/turmeric farming .jpg",
  "Tapioca Cultivation":               "/assets/projects/project subcategories/types/tapacio cultivation .jpg",
  "Rose Farming":                      "/assets/projects/project subcategories/types/rose famring .jpg",
  "Jasmine Farming":                   "/assets/projects/project subcategories/types/jasmine farming .jpg",
  "Marigold Farming":                  "/assets/projects/project subcategories/types/exotic farming.jpg",
  "Exotic Flower Farming":             "/assets/projects/project subcategories/types/exotic farming.jpg",
  "Oyster Mushroom Units":             "/assets/projects/project subcategories/types/Oyster Mushroom Cultivation.jpg",
  "Button Mushroom Units":             "/assets/projects/project subcategories/types/button mushroom farming.jpg",
  "Commercial Mushroom Farms":         "/assets/projects/project subcategories/types/mushroom farming .jpg",
  "Rooftop Gardening Projects":        "/assets/projects/project subcategories/types/ooftopnfarming.jpg",
  "Terrace Farming Projects":          "/assets/projects/project subcategories/types/terrece farminng.jpg",
  "Kitchen Garden Projects":           "/assets/projects/project subcategories/types/kitchen gardening projects .jpg",
  "Microgreens Production Units":      "/assets/projects/project subcategories/types/Microgreens productions.jpg",
  "Commercial Plant Nursery":          "/assets/projects/project subcategories/types/commercial plant nursery.jpg",
  "Seedling Production Units":         "/assets/projects/project subcategories/types/seedling productu .jpg",
  "Tissue Culture Plant Nursery":      "/assets/projects/project subcategories/types/Tissue Culture Plant Propagation Modern Agricultural Education.jpg",
  "Traditional Fish Farming":          "/assets/projects/project subcategories/types/traditional fish farming .jpg",
  "Intensive Fish Farming":            "/assets/projects/project subcategories/types/intensive fish farming .jpg",
  "Cage Fish Farming":                 "/assets/projects/project subcategories/types/cage fish farming .jpg",
  "Biofloc Fish Farming":              "/assets/projects/project subcategories/types/biofloc fish farming .jpg",
  "Biofloc Shrimp Farming":            "/assets/projects/project subcategories/types/bioflock shrimp farming.jpg",
  "Vannamei Shrimp Farming":           "/assets/projects/project subcategories/types/bioflock shrimp farming.jpg",
  "Freshwater Prawn Farming":          "/assets/projects/project subcategories/types/freshwater prawn farming .jpg",
  "Mud Crab Farming":                  "/assets/projects/project subcategories/types/mud crab farming .jpg",
  "Aquaponics Systems":                "/assets/projects/project subcategories/types/aquaponics system .jpg",
  "Integrated Fish + Crop Farming":    "/assets/projects/project subcategories/types/intergrated farming .jpg",
  "Commercial Goat Farming":           "/assets/projects/project subcategories/types/commercial goat farming .jpg",
  "Integrated Goat Farming":           "/assets/projects/project subcategories/types/intergrated goat farming .jpg",
  "Commercial Sheep Farming":          "/assets/projects/project subcategories/types/commercial sheep farming .jpg",
  "Dairy Farm Setup":                  "/assets/projects/project subcategories/types/dairy farming .jpg",
  "Automated Dairy Systems":           "/assets/projects/project subcategories/types/dairy farming .jpg",
  "Broiler Chicken Farms":             "/assets/projects/project subcategories/types/poultry farming .jpg",
  "Layer Chicken Farms":               "/assets/projects/project subcategories/types/poultry farming .jpg",
  "Goat + Fish Farming":               "/assets/projects/project subcategories/types/intergrated farming .jpg",
  "Dairy + Crop Farming":              "/assets/projects/project subcategories/types/intergrated farming .jpg",
  "Cold Storage":                      "/assets/projects/project subcategories/types/cold storage .jpg",
  "Pack House":                        "/assets/projects/project subcategories/types/packn=house .jpg",
  "Farm Buildings":                    "/assets/projects/project subcategories/types/farm buildings .jpg",
  "Farm Roads":                        "/assets/projects/project subcategories/types/farm irrigation system .jpg",
  "Rainwater Harvesting":              "/assets/projects/project subcategories/types/Rainwater Harvesting.jpg",
  "Pond Liner Installation":           "/assets/projects/project subcategories/types/pond liner installation.jpg",
  "Farm Irrigation Systems":           "/assets/projects/project subcategories/types/farm irrigation system .jpg",
  "Borewell & Water Storage Systems":  "/assets/projects/project subcategories/types/borewell .jpg",
  "Solar Crop Dryer":                  "/assets/projects/project subcategories/types/solar crop dryer .jpg",
  "Solar Heater":                      "/assets/projects/project subcategories/types/solary heater .jpg",
  "Solar Fencing":                     "/assets/projects/project subcategories/types/solar fencing.jpg",
  "Solar Lighting":                    "/assets/projects/project subcategories/types/solar lighting '.jpg",
  "Land Surveying":                    "/assets/projects/project subcategories/types/land surveing .jpg",
  "Topographic Mapping":               "/assets/projects/project subcategories/types/topographis mappin g.jpg",
  "Contour Mapping":                   "/assets/projects/project subcategories/types/contour mapping .jpg",
  "Land Leveling":                     "/assets/projects/project subcategories/types/landleveling .jpg",
};

const CATEGORY_FALLBACK: Record<string, string> = {
  agri:        "/assets/projects/main page/agri farming project .jpg",
  aquaculture: "/assets/projects/main page/aquaculture farming .jpg",
  livestock:   "/assets/projects/main page/livestock farming.jpg",
  engineering: "/assets/projects/main page/farm engineering .jpg",
};

const getImage = (label: string, cat: string) =>
  TYPE_IMG[label] || SUBCATEGORY_IMG[label] || CATEGORY_FALLBACK[cat] || "/assets/projects/main page/agri farming project .jpg";

// ─── LazyCardImage — skeleton + lazy load + error fallback ───────────────────
const LazyCardImage: React.FC<{
  src: string;
  alt: string;
  fallbackSrc: string;
  priority?: boolean;
}> = ({ src, alt, fallbackSrc, priority = false }) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <>
      <div className={`absolute inset-0 bg-[#E8F0EA] transition-opacity duration-300 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100 animate-pulse"}`} />
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        onError={e => {
          const el = e.currentTarget as HTMLImageElement;
          if (el.src !== fallbackSrc) el.src = fallbackSrc;
        }}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110"
        style={{
          opacity: loaded ? 1 : 0,
          transitionProperty: "opacity, transform",
          transitionDuration: "0.5s, 1.2s",
          transitionTimingFunction: "ease-in-out, cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </>
  );
};

// ─── Rich content data ────────────────────────────────────────────────────────
const SUBCATEGORY_DESC: Record<string, string> = {
  "Protected Farming Projects":      "Climate-controlled polyhouses, shade nets, mist chambers & greenhouses for high-value crop production year-round.",
  "Hydroponic Farming Projects":     "Soil-less NFT, DWC & vertical hydroponic systems for high-yield, water-efficient cultivation.",
  "Vertical Farming Projects":       "Multi-tier indoor farms and smart grow rooms maximising yield per square metre with LED lighting.",
  "Open Field Cultivation Projects": "Dragon fruit, guava, mango, papaya, fig & blueberry plantation projects with precision irrigation.",
  "Vegetable Cultivation Projects":  "Cucumber, capsicum, tomato, chilli, muskmelon & watermelon farming with drip irrigation systems.",
  "Medicinal Crop Projects":         "Aloe vera, moringa, ginger, turmeric & tapioca cultivation for high-value medicinal and export markets.",
  "Floriculture Projects":           "Rose, jasmine, marigold & exotic flower farming with climate-controlled precision.",
  "Mushroom Farming Projects":       "Oyster, button & commercial mushroom production with controlled environment and substrate management.",
  "Urban Farming Projects":          "Rooftop, terrace, kitchen garden & microgreens systems for urban and peri-urban spaces.",
  "Nursery Projects":                "Commercial plant nursery, seedling production & tissue culture facilities for mass propagation.",
  "Fish Farming Projects":           "Traditional, intensive & cage fish farming across freshwater species with full pond management.",
  "Biofloc Farming Projects":        "Zero water exchange biofloc technology for fish and shrimp with high stocking density and low FCR.",
  "Shrimp Farming Projects":         "Vannamei & freshwater prawn farming with professional biofloc pond setup and biosecurity.",
  "Crab Farming Projects":           "Mud crab fattening and commercial crab aquaculture with specialised feeding and harvesting systems.",
  "Integrated Aquaculture":          "Aquaponics combining fish and vegetable production; integrated fish-crop farming for dual income.",
  "Goat Farming":                    "Commercial & integrated goat farming with breed selection, shed design and health management.",
  "Sheep Farming":                   "Commercial sheep farming with scientific breed management and integrated crop systems.",
  "Dairy Farming":                   "Dairy farm setup and automated milking systems for commercial milk production.",
  "Poultry Farming":                 "Broiler & layer chicken farms with climate-controlled shed design and biosecurity protocols.",
  "Integrated Livestock Farming":    "Goat-fish and dairy-crop integrated systems for diversified, resilient farm income.",
  "Farm Infrastructure Projects":    "Cold storage, packhouses, farm buildings & roads for post-harvest logistics and processing.",
  "Water Management Projects":       "Rainwater harvesting, pond liners, drip & sprinkler irrigation, and borewell installations.",
  "Solar Agriculture Projects":      "Solar crop dryers, heaters, fencing & lighting for sustainable, off-grid farm energy.",
  "Farm Development Projects":       "Land surveying, topographic & contour mapping, and precision land leveling for farm development.",
};

// Key highlights per project type — the most important content for client conversion
const PROJECT_HIGHLIGHTS: Record<string, string[]> = {
  // Protected Farming
  "Naturally Ventilated Polyhouse":    ["UV-stabilised poly film, 200-micron thickness", "Natural side & top vents for passive temperature control", "Suitable for vegetables, flowers & nursery crops", "Government subsidy up to 50% under NHM scheme", "Structural lifespan 10–15 years with minimal maintenance"],
  "Climate Controlled Polyhouse":      ["Automated temperature, humidity & CO₂ control", "HVAC with evaporative cooling and fan-pad system", "Optimal for exotic vegetables, floriculture & tissue culture", "Sensor-based monitoring with remote alert system", "Subsidy eligible under NHM & state horticulture boards"],
  "Polycarbonate Greenhouse":          ["Twin-wall polycarbonate panels — 90% diffused light transmission", "High-tensile galvanised steel structure with 20-year frame warranty", "Ideal for year-round cultivation in any Indian climate zone", "Integrated shading, drip irrigation & fertigation included", "Premium grade, suitable for institutional & export-grade produce"],
  "Shade Net House":                   ["HDPE shade nets — 35% to 75% shade factor options", "Cost-effective protected cultivation for nursery, vegetables & flowers", "Wind-resistant structure design with UV-stabilised netting", "Pest & bird exclusion integrated into net design", "Quick installation — typically 7–14 days per acre"],
  "Mist Chamber":                      ["High-pressure misting nozzles maintaining 95%+ relative humidity", "Ideal for cutting propagation, cloning & seedling hardening", "Timer-controlled misting cycles for precise moisture management", "Compatible with all rooting media types", "Used in commercial nurseries, tissue culture labs & R&D units"],
  // Hydroponic
  "NFT Hydroponic System":             ["Nutrient Film Technique with shallow channel continuous flow", "Ideal for leafy greens, lettuce, herbs & microgreens", "Water usage 90% less than conventional soil farming", "Food-grade HDPE or stainless steel channels", "Subsidy available under MIDH & state horticulture schemes"],
  "Deep Water Culture System":         ["Plants suspended in aerated nutrient solution for fastest growth rates", "Dissolved oxygen maintained via industrial air pumps", "Ideal for lettuce, spinach, basil & leafy greens", "Scalable from 500 to 100,000 plant sites", "Simple maintenance with low operational cost"],
  "Vertical Hydroponic Towers":        ["Tower-based growing maximising yield per square metre", "Gravity-fed or pump-driven nutrient delivery to each plant site", "Suitable for leafy greens, strawberries & herbs", "Perfect for urban rooftops, limited-space & indoor farms", "IoT monitoring for EC, pH and reservoir levels"],
  "Commercial Hydroponic Farms":       ["Full turnkey commercial-scale setup with central nutrient management", "Automated EC, pH & temperature monitoring with data logging", "Crop planning and market linkage support provided", "Typical ROI within 2.5–3 years for commercial operations", "Subsidy eligible — we assist with NHM & MIDH applications"],
  "Indoor Hydroponic Units":           ["Fully enclosed climate-controlled growing rooms", "Full-spectrum LED grow lights with programmable cycles", "Year-round production independent of season or weather", "Smart IoT monitoring, automation & remote dashboard", "Ideal for premium herbs, microgreens & pharmaceutical-grade produce"],
  // Vertical Farming
  "Indoor Vertical Farms":             ["Multi-tier racking systems with LED grow lights per tier", "Fully climate-controlled: temperature, humidity & CO₂", "Up to 10× higher yield per square metre vs. field farming", "Year-round continuous harvesting cycles", "Suitable for leafy greens, herbs & specialty crops"],
  "Commercial Vertical Farming Units": ["Institutional-scale multi-tier farming with automation", "Central nutrient management and irrigation control", "Integration with cold-chain and direct market supply", "Data-driven crop cycle management for consistent output", "Subsidy-eligible for agri-startup & horticulture schemes"],
  "Smart Grow Room Systems":           ["Fully automated grow rooms with programmable climate control", "CO₂ enrichment, VPD management & precision lighting schedules", "Suitable for cannabis, microgreens, specialty herbs & propagation", "Remote monitoring via mobile dashboard", "Modular — scalable from 200 sqft to 10,000 sqft"],
  // Open Field
  "Dragon Fruit Plantation":           ["Trellised plantation with concrete post & wire support structure", "Varieties: Yellow (H. megalanthus), Red (H. polyrhizus)", "Drip irrigation with fertigation scheduling", "First harvest in 12–18 months; 25+ year productive lifespan", "High market value — ₹80–200/kg farm gate price"],
  "Guava Plantation":                  ["High-density planting (600–1500 plants/acre) for maximum yield", "Varieties: Taiwan Pink, VNR Bihi, Allahabad Safeda", "Drip irrigation with micro-sprinklers for canopy cooling", "First harvest within 12 months of planting", "Excellent export potential to Gulf & Southeast Asian markets"],
  "Mango Plantation":                  ["Ultra-high-density planting with dwarf rootstock varieties", "Varieties: Alphonso, Kesar, Banganapalli, Dashehari", "Drip irrigation with soil moisture sensors", "Canopy management for uniform light distribution & early bearing", "APEDA certified export-grade production possible"],
  "Papaya Plantation":                 ["Hybrid varieties: Red Lady, Surya, CO-7 with 6-month bearing cycle", "High plant density — 800–1000 plants/acre", "Drip irrigation + fertigation for consistent fruit quality", "Multiple crops per year with proper canopy management", "Strong domestic & export demand from food processing industry"],
  "Fig Plantation":                    ["Varieties: Poona Fig, Deanna, Brown Turkey suited to Indian climate", "Drip irrigation for water-efficient cultivation", "High-value fresh & dried fig market demand", "Low pesticide requirement — naturally pest-resistant crop", "Subsidy available under horticulture development schemes"],
  "Blueberry Plantation":              ["Requires soil pH 4.5–5.5 — we handle soil amendment & preparation", "Varieties: O'Neal, Sharpblue suited to tropical & subtropical zones", "Drip irrigation with acidic water management", "Premium crop — ₹400–800/kg farm gate pricing", "High export value to Europe, Japan & Middle East markets"],
  // Vegetable
  "Cucumber Farming":                  ["Polyhouse or open field hybrid variety cultivation", "Drip irrigation with fertigation scheduling", "25–30 tonnes/acre yield achievable in polyhouse conditions", "Short crop cycle — harvest in 45–60 days", "Direct supply to supermarkets, hotels & export markets"],
  "Capsicum Farming":                  ["Coloured capsicum (red, yellow, green) for premium markets", "Polyhouse cultivation for year-round production", "Drip & fertigation with precise nutrient management", "20–30 tonnes/acre expected yield", "High market value — export-grade capsicum fetches ₹60–200/kg"],
  "Tomato Farming":                    ["Indeterminate hybrid varieties for polyhouse high-wire cultivation", "Drip irrigation with calcium & potassium management for shelf life", "40–60 tonnes/acre achievable under protected conditions", "Integrated pest management protocols included", "Market linkage support for wholesale & retail supply chains"],
  "Chilli Farming":                    ["Hybrid varieties for commercial spice & fresh market production", "Drip irrigation for consistent pod development", "12–15 tonnes/acre fresh chilli yield", "Dry chilli processing support available", "Strong domestic demand + export opportunity to USA & EU"],
  "Muskmelon Farming":                 ["Drip irrigation for water-efficient summer cultivation", "Polyhouse or mulched open field systems", "Short crop duration — 75–90 days from planting", "Premium table-grade muskmelon for hotel & retail supply", "2–3 crop cycles possible per year with proper planning"],
  "Watermelon Farming":                ["Drip irrigation with plastic mulch for weed suppression", "Seedless & seeded hybrid varieties for premium market", "20–25 tonnes/acre achievable yield", "Short crop cycle — 70–85 days per cycle", "Direct supply partnerships with APMC & supermarket chains"],
  // Medicinal
  "Aloe Vera Farming":                 ["Low water requirement — ideal for arid & semi-arid zones", "Commercial varieties: IEC-111, AAL-1 for high gel content", "First harvest in 18–24 months, then every 3 months", "Strong demand from cosmetics, pharma & FMCG industries", "Minimum price support available under NHM in select states"],
  "Moringa Plantation":                ["Annual & perennial cultivation options", "High-density planting for leaf, pod & seed production", "Drip irrigation — drought-tolerant once established", "Dried leaf powder commands ₹150–400/kg export price", "Strong demand from nutraceutical & food supplement industry"],
  "Ginger Farming":                    ["Raised bed cultivation for improved drainage and yield", "Varieties: Rio-de-Janeiro, Maran for high rhizome yield", "Drip irrigation for optimal soil moisture management", "15–20 tonnes/acre achievable fresh ginger yield", "Post-harvest drying and storage support available"],
  "Turmeric Farming":                  ["Varieties: Pratibha, Suguna, IISR Prabha for high curcumin content", "Raised bed or flat bed cultivation with mulching", "Drip irrigation for 30–35% water saving vs flood irrigation", "Export-grade curcumin content testing support available", "Strong global demand — India exports 80% of world turmeric supply"],
  "Tapioca Cultivation":               ["High starch-yielding varieties for industrial & food use", "Drip irrigation with periodic earthing-up", "15–25 tonnes/acre fresh cassava root yield", "8–10 month crop duration with single or ratoon system", "Strong demand from starch, ethanol & bioplastics industries"],
  // Floriculture
  "Rose Farming":                      ["Polyhouse cultivation of Dutch Rose varieties for premium cut flower market", "Drip irrigation with fertigation for continuous bloom cycles", "12 months × 4–5 harvests per year production cycle", "Cold chain support for export-grade flower quality", "Subsidy available under NHM for protected floriculture"],
  "Jasmine Farming":                   ["Madurai Malli & CO-1 varieties for south Indian garland market", "Drip irrigation with mulching for weed management", "Open field or shade net house cultivation", "Daily harvest from 2nd year onwards — strong local demand", "Minimum support price assured under state horticulture schemes"],
  "Marigold Farming":                  ["African & French marigold for garland, dye & essential oil markets", "High-density planting under drip irrigation", "Short crop cycle — 45–60 days to first harvest", "Multiple crop cycles per year — 4–5 possible", "Strong demand from religious, FMCG & pharma dye sectors"],
  "Exotic Flower Farming":             ["Gerbera, anthurium, orchid & bird-of-paradise in climate-controlled polyhouses", "Substrate-based cultivation with Dutch growing system", "Premium cut flower pricing — ₹5–50 per stem for export grade", "Cold chain & airport linkage for direct export", "High value, low volume — ideal for small landholding enterprises"],
  // Mushroom
  "Oyster Mushroom Units":             ["Substrate bags with paddy straw, cotton waste or saw dust", "Controlled humidity 80–90%, temperature 20–28°C", "Harvest in 30–45 days per crop cycle", "Multiple flushes per batch — 3–4 harvests per bag", "Strong urban demand — ₹120–200/kg fresh oyster mushroom"],
  "Button Mushroom Units":             ["Phase I & II composting with bulk spawning on beds", "Climate-controlled rooms with precise temperature & humidity", "Button mushroom price ranges ₹80–150/kg fresh weight", "Requires 55–65 days from spawning to harvest", "Canning & export market available for commercial volumes"],
  "Commercial Mushroom Farms":         ["Multi-species commercial mushroom production facility", "Central climate control for multiple growing rooms", "Substrate preparation & spawn production included", "Market linkage to hotels, restaurants, supermarkets & exporters", "Subsidy available under NHM & state agriculture development schemes"],
  // Urban Farming
  "Rooftop Gardening Projects":        ["Structural load assessment before installation by our engineers", "Lightweight growing media & insulated containers to protect slab", "Drip irrigation & fertigation for minimal water use", "Suitable for residential, commercial & institutional rooftops", "Reduces urban heat island effect & building cooling costs"],
  "Terrace Farming Projects":          ["Modular raised bed systems for terrace & balcony spaces", "Lightweight growing substrate — expanded clay, cocopeat mix", "Drip irrigation with timer-controlled watering", "Suitable for vegetables, herbs & small fruit crops", "Educational farming programmes available for schools & colleges"],
  "Kitchen Garden Projects":           ["Custom-designed kitchen herb & vegetable gardens for homes", "Vertical planter, grow bag & raised bed systems", "Drip or manual irrigation options", "Suitable for year-round fresh herb, leafy & vegetable production", "Soil health management & organic growing protocols included"],
  "Microgreens Production Units":      ["Tray-based cultivation with 7–14 day harvest cycle", "Varieties: sunflower, radish, pea shoot, wheatgrass & 20+ more", "LED lighting for indoor year-round production", "Premium pricing — ₹300–800/kg for hotel & restaurant supply", "Low capital, high ROI business model for urban entrepreneurs"],
  // Nursery
  "Commercial Plant Nursery":          ["Mother plant block, propagation unit & hardening zone designed", "Shade net houses (50% shade) for seedling production", "Drip & mist irrigation with fertigation system", "Production capacity from 50,000 to 5,000,000 seedlings/year", "Subsidy available under NHM for commercial nursery units"],
  "Seedling Production Units":         ["Tray propagation with coco peat substrate & plug trays", "Climate-controlled germination chambers for uniform sprouting", "Suitable for vegetable, flower & forestry seedling production", "Automated misting & drip irrigation in hardening zone", "Government subsidy available for certified nursery setup"],
  "Tissue Culture Plant Nursery":      ["Laminar flow hood, autoclave & culture room infrastructure setup", "Compatible with banana, sugarcane, orchid, teak & cardamom TC plants", "ISO-grade cleanliness protocols & contamination control systems", "From lab design to establishment, training & protocol support", "NCBI/DST approved lab setup assistance available"],
  // Aquaculture
  "Traditional Fish Farming":          ["Pond preparation, liming & soil treatment protocols", "Species: Rohu, Catla, Mrigal, Common Carp for Indian conditions", "Stocking density: 5,000–8,000 fingerlings/acre", "Supplementary feeding & water quality management included", "Average yield: 2–3 tonnes/acre/year in single-crop system"],
  "Intensive Fish Farming":            ["Aeration-based intensive system with high stocking density", "Stocking: 15,000–25,000 fingerlings/acre with continuous aeration", "Feed conversion ratio (FCR) management protocols included", "Average yield: 6–10 tonnes/acre/year achievable", "Subsidy available under PMMSY for intensive aquaculture"],
  "Cage Fish Farming":                 ["Floating cage systems for reservoir, river & lake farming", "HDPE cage frames with knotless nylon net enclosures", "Ideal for tilapia, rohu, catla & pangasius production", "High stocking density — 100–200 fish per cubic metre", "Subsidy eligible under PMMSY — up to 40% government support"],
  "Biofloc Fish Farming":              ["Zero water exchange technology with microbial protein supplementation", "Stocking density 500–1000 fish/m³ in circular tanks", "Reduces feed cost by 20–30% via in-situ protein production", "Species: tilapia, catfish, pangasius & rohu", "Subsidy available under PMMSY & state fisheries departments"],
  "Biofloc Shrimp Farming":            ["Lined ponds with biofloc technology for water quality management", "Vannamei stocking @ 100–150 PL/m² with zero water exchange", "Aerator installation for DO maintenance above 5 mg/L", "Average production: 8–15 tonnes/hectare/crop cycle", "Subsidy under PMMSY for shrimp biofloc units"],
  "Vannamei Shrimp Farming":           ["Lined pond construction with HDPE liner installation", "Certified SPF (Specific Pathogen Free) post larvae sourcing", "Automatic paddle wheel & air diffuser aeration systems", "Biosecurity protocols — screens, bird nets & monitoring", "Average production: 5–12 tonnes/hectare in 90-day cycle"],
  "Freshwater Prawn Farming":          ["Macrobrachium rosenbergii (giant river prawn) farming", "Polyculture compatible with carp species for dual income", "Nursery rearing phase management for juvenile survival", "Harvest size: 60–80 grams in 6-month production cycle", "Excellent price realisation — ₹400–600/kg live prawn"],
  "Mud Crab Farming":                  ["Scylla serrata (mud crab) fattening pens or cage systems", "Brackish water requirement — 15–25 ppt salinity", "Fattening period: 4–6 weeks from soft shell to marketable size", "Premium pricing — ₹500–1500/kg for live export grade crab", "Strong demand from seafood exporters & high-end restaurants"],
  "Aquaponics Systems":                ["Recirculating system combining fish tanks & grow beds/NFT", "Fish species: tilapia, catfish; plants: leafy greens, herbs", "Zero waste — fish effluent fertilises plants, plants clean water", "Water usage 90% less than conventional farming", "Dual income stream from fish and vegetable produce"],
  "Integrated Fish + Crop Farming":    ["Rice-fish or vegetable-fish integrated farming systems", "Synergistic — fish control weeds, their waste fertilises crops", "30–40% higher income vs. mono-cropping on same land area", "Technical design of water management & crop rotation schedule", "Widely practiced in Andhra Pradesh, West Bengal & Kerala"],
  // Livestock
  "Commercial Goat Farming":           ["Breed selection: Boer, Sirohi, Black Bengal based on region", "Shed design: well-ventilated, slatted floor for hygiene", "20–50 goat capacity to 500+ animal commercial units", "Breeding, health management & vaccination schedule included", "Subsidy under National Livestock Mission — up to 25%"],
  "Integrated Goat Farming":           ["Goat farming combined with crop production on same land", "Goat manure improves soil fertility — reduces fertiliser cost", "Stall-fed & semi-grazing systems designed per land availability", "Dual income: milk, meat & manure for crop farms", "Training in integrated farm management included"],
  "Commercial Sheep Farming":          ["Breeds: Nellore, Deccani, Marwari selected for local conditions", "Shed design with paddock & feeding infrastructure", "Wool, meat & dairy dual-purpose systems designed", "Vaccination, deworming & disease management protocols", "Subsidy available under National Livestock Mission scheme"],
  "Dairy Farm Setup":                  ["Breed selection: HF, Jersey, Sahiwal, Gir for climate suitability", "Milking parlour, milk storage & cooling infrastructure", "Automated TMR (Total Mixed Ration) feed system available", "Waste management with biogas unit integration", "Subsidy under National Dairy Plan — up to 25% capital subsidy"],
  "Automated Dairy Systems":           ["Robotic milking parlour with automated teat prep & post dipping", "Milk yield & health monitoring via ear tag sensors", "Automated feed dispensing by yield group", "Milk cooling & bulk tank with remote temperature monitoring", "Ideal for 50+ cow commercial dairy operations"],
  "Broiler Chicken Farms":             ["Shed design: fully enclosed with tunnel ventilation system", "Capacity from 5,000 to 100,000 birds per shed", "Automated feeding, drinking & climate control systems", "Poultry litter management & biogas integration", "Contract farming tie-ups with major integrators arranged"],
  "Layer Chicken Farms":               ["Cage-based or cage-free shed systems per client preference", "Automated nipple drinking & chain feeding systems", "Egg collection, washing & grading infrastructure", "Production: 300–320 eggs per bird per year expected", "APEDA & FSSAI compliant facility design for export market"],
  "Goat + Fish Farming":               ["Goat shed constructed over fish pond for space efficiency", "Goat droppings supplement fish nutrition — reduces feed cost", "Dual income from fish, milk & meat on same land", "Water quality maintained via natural biofloc formation", "Widely practiced integrated model in coastal Andhra Pradesh"],
  "Dairy + Crop Farming":              ["Dairy manure biogas plant feeding energy needs of farm", "Digested slurry used as organic fertiliser for crops", "Crop fodder production reduces feed purchase cost", "Zero-waste circular farming model design included", "Higher combined income vs. standalone dairy or crop farm"],
  // Engineering
  "Cold Storage":                      ["Insulated PUF panel construction for temperature uniformity", "Capacity: 10 MT to 5,000 MT as per client requirement", "Temperature range: -25°C to +10°C multizone options", "Energy-efficient reciprocating & screw compressor units", "Subsidy under NHM — up to ₹35/MT capacity for horticulture produce"],
  "Pack House":                        ["Grading, sorting, washing & packing line infrastructure design", "APEDA & GlobalG.A.P. compliant facility layout", "Pre-cooling & cold room integration for post-harvest quality", "Covered area design as per crop type and throughput requirement", "Subsidy under PMKSY, NHM & state post-harvest development schemes"],
  "Farm Buildings":                    ["RCC & pre-engineered building (PEB) options for storage, workshops", "Wind-load and seismic zone compliant structural design", "FSSAI & APEDA compliant layout for processing facilities", "Low-maintenance industrial-grade materials and finishes", "Full civil engineering drawings & government approval assistance"],
  "Farm Roads":                        ["WBM (Water Bound Macadam) or CC road design for farm access", "Culverts, drainage channels & slope stabilisation included", "PMGSY & RKVY linked farm road subsidy assistance provided", "Road width design as per machinery & transport requirement", "Improves post-harvest logistics & reduces crop damage losses"],
  "Rainwater Harvesting":              ["Farm pond, percolation tank & check dam design & construction", "Lined storage ponds with HDPE liner for water conservation", "Capacity from 500 m³ to 50,000 m³ as per requirement", "Recharge structures to restore groundwater table", "Subsidy under PMKSY Har Khet Ko Paani & MGNREGA schemes"],
  "Pond Liner Installation":           ["HDPE liner — 500 micron to 1500 micron as per application", "Aquaculture, rainwater storage & seepage prevention use cases", "Professional welding & installation with leak testing", "UV stabilised — 25+ year material lifespan guaranteed", "Improves water use efficiency by eliminating pond seepage"],
  "Farm Irrigation Systems":           ["Drip, sprinkler & micro-irrigation system design & installation", "Subsidy up to 90% under PM Krishi Sinchayee Yojana (PMKSY)", "Fertigation unit integration for nutrition management", "Soil moisture sensor integration for smart irrigation", "Covers crops from vegetables to plantations, paddy & sugarcane"],
  "Borewell & Water Storage Systems":  ["Hydrogeological survey before borewell siting for best yield", "Borewell drilling, casing, pump & motor installation", "Ground-level sump & overhead tank design & construction", "Solar pump systems for energy-independent water supply", "Subsidy under PM-KUSUM scheme for solar pump installation"],
  "Solar Crop Dryer":                  ["Indirect & direct type solar dryers for fruits, vegetables & spices", "Reduces post-harvest losses by 30–40% vs. open sun drying", "Consistent drying temperature for better colour & quality", "Stainless steel mesh trays — food-grade & easy to clean", "Subsidy under PM-KUSUM & state renewable energy schemes"],
  "Solar Heater":                      ["Flat plate & evacuated tube collector systems for farm use", "Dairy milk pasteurisation, water heating & biogas pre-heating", "Reduces LPG & electricity cost for heating applications", "25-year system design life with 5-year warranty on collectors", "Subsidy under MNRE & state energy department schemes"],
  "Solar Fencing":                     ["Energiser-powered electric fence for crop & livestock protection", "Solar powered — no grid dependency for remote fields", "15–20 km perimeter coverage per energiser unit", "Non-lethal pulse shock — safe for humans & animals", "Reduces crop losses from wildlife, cattle & straying animals"],
  "Solar Lighting":                    ["Off-grid LED solar street lights for farm roads & perimeter", "Integrated LED lighting for polyhouse & livestock sheds", "Solar lanterns & task lights for night farm operations", "System design: 10W to 1000W as per requirement", "Subsidy under PM-KUSUM Component C & MNRE schemes"],
  "Land Surveying":                    ["Total station & GPS DGPS survey for legal & engineering purpose", "Survey of India compliant boundary & area measurement", "Topographic survey with contour interval as low as 0.5m", "Digital output: DXF / DWG / PDF format delivery", "Required for farm development, irrigation & land registration"],
  "Topographic Mapping":               ["Drone-based photogrammetry & LiDAR topographic mapping", "Contour maps at 0.5m to 1m interval for irrigation planning", "Digital Terrain Model (DTM) & Digital Surface Model (DSM) output", "Orthorectified aerial imagery for crop planning & land use", "Turnaround: typically 3–7 working days for up to 100 acres"],
  "Contour Mapping":                   ["Critical for design of bunds, terraces & water harvesting structures", "Identifies natural drainage lines & catchment areas", "Combined with slope analysis for precision land development", "GIS-compatible output for integration with farm planning tools", "Used in PMKSY, watershed development & land leveling projects"],
  "Land Leveling":                     ["Laser-guided precision land leveling for improved water distribution", "Reduces water use by 20–30% in flood-irrigated crops", "Improves crop uniformity & reduces weed pressure", "Earth cut & fill calculation for minimum soil movement", "Eligible for subsidy under PMKSY & state land development schemes"],
};

// Subsidy-eligible project types
const SUBSIDY_ELIGIBLE = new Set([
  "Naturally Ventilated Polyhouse", "Climate Controlled Polyhouse", "Polycarbonate Greenhouse",
  "Shade Net House", "NFT Hydroponic System", "Deep Water Culture System",
  "Vertical Hydroponic Towers", "Commercial Hydroponic Farms", "Indoor Hydroponic Units",
  "Commercial Vertical Farming Units", "Commercial Plant Nursery", "Seedling Production Units",
  "Biofloc Fish Farming", "Biofloc Shrimp Farming", "Vannamei Shrimp Farming",
  "Intensive Fish Farming", "Cage Fish Farming", "Commercial Goat Farming",
  "Dairy Farm Setup", "Commercial Sheep Farming", "Broiler Chicken Farms",
  "Layer Chicken Farms", "Cold Storage", "Pack House", "Farm Buildings",
  "Farm Roads", "Rainwater Harvesting", "Farm Irrigation Systems",
  "Borewell & Water Storage Systems", "Solar Crop Dryer", "Solar Heater",
  "Solar Fencing", "Solar Lighting", "Land Surveying", "Land Leveling",
  "Topographic Mapping", "Contour Mapping", "Rose Farming", "Oyster Mushroom Units",
  "Button Mushroom Units", "Commercial Mushroom Farms",
]);

// Context-aware description by category
const CATEGORY_CONTEXT: Record<string, string> = {
  agri:        "Our team handles complete civil structure, growing media, irrigation, crop protocol training, and ongoing AMC — delivered turnkey at your farm gate.",
  aquaculture: "We manage pond or tank construction, liner installation, aeration systems, water quality protocols, and species-specific stocking plans from start to harvest.",
  livestock:   "We handle breed consultation, shed construction with ventilation systems, feed infrastructure, veterinary tie-ups, and full operational handover.",
  engineering: "We manage civil and structural engineering, certified material procurement, on-site precision execution, and commissioning with full documentation.",
};

// ─── navLinks helpers ──────────────────────────────────────────────────────────
const getProjectLinks = () => navLinks.find(l => l.label === "Projects")?.children || [];
const getCategoryItem   = (cat: string) => getProjectLinks().find((c: any) => c.href === `/projects/${cat}`) as any;
const getSubcategoryItem = (cat: string, sub: string) => getCategoryItem(cat)?.children?.find((s: any) => s.href === `/projects/${cat}/${sub}`) as any;
const getFeatureItem     = (cat: string, sub: string, feat: string) => getSubcategoryItem(cat, sub)?.children?.find((f: any) => f.href === `/projects/${cat}/${sub}/${feat}`) as any;

// ─── Category View ─────────────────────────────────────────────────────────────
const CategoryView: React.FC<{ category: string }> = ({ category }) => {
  const catItem = getCategoryItem(category);
  if (!catItem) return <Navigate to="/projects" />;
  const heroImg = catItem.cardImage || CATEGORY_FALLBACK[category];
  const allCategories = getProjectLinks();

  const catBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.igoagritechfarms.com/" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.igoagritechfarms.com/projects" },
      { "@type": "ListItem", "position": 3, "name": catItem.label, "item": `https://www.igoagritechfarms.com/projects/${category}` }
    ]
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen selection:bg-[#E8F5E9] selection:text-[#1A4231]">
      <SEO
        title={`${catItem.label} Projects`}
        description={`Explore ${catItem.label} projects by IGO Agritech Farms. Turnkey agricultural project setup with expert engineering, site survey, and operational training across India.`}
        keywords={`${catItem.label}, agricultural projects India, IGO Agritech Farms, farming projects`}
        url={`/projects/${category}`}
        image={heroImg || undefined}
        jsonLd={catBreadcrumb}
      />
      {/* Hero */}
      <section className="relative pt-40 pb-40 overflow-hidden bg-black">
        <motion.div
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src={heroImg} alt={catItem.label} className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

        <div className="container mx-auto px-6 relative z-10">
          <Link to="/projects" className="inline-flex items-center gap-2 text-[#C5A03F] font-bold text-[10px] uppercase tracking-widest mb-14 hover:opacity-60 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> All Projects
          </Link>

          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.15 } } }} className="max-w-4xl">
            <motion.div variants={fader} className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-[#C5A03F]/60" />
              <span className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.3em]">{catItem.children?.length || 0} Project Types</span>
            </motion.div>
            <motion.h1 variants={fader} className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tight leading-[0.93]">
              {catItem.label}
            </motion.h1>
            <motion.p variants={fader} className="text-white/60 text-xl font-light leading-relaxed max-w-2xl">
              Turnkey implementations across every dimension of {catItem.label.toLowerCase()}, executed with institutional-grade precision across India.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Sibling category pills */}
      <div className="bg-white border-b border-black/5 sticky top-[72px] z-30">
        <div className="container mx-auto px-6 py-4 flex gap-3 overflow-x-auto no-scrollbar">
          {allCategories.map((c: any) => {
            const active = c.href === `/projects/${category}`;
            return (
              <Link
                key={c.href}
                to={c.href}
                className={`shrink-0 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all ${
                  active
                    ? "bg-[#1A4231] text-white border-[#1A4231]"
                    : "bg-white text-black/50 border-black/10 hover:border-[#1A4231] hover:text-[#1A4231]"
                }`}
              >
                {c.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Subcategory overlay cards grid */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catItem.children?.map((sub: any, i: number) => {
            const img = SUBCATEGORY_IMG[sub.label] || CATEGORY_FALLBACK[category];
            const desc = SUBCATEGORY_DESC[sub.label] || "";
            return (
              <motion.div
                key={sub.href}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={sub.href} className="group relative block aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <LazyCardImage src={img} alt={sub.label} fallbackSrc={CATEGORY_FALLBACK[category]} priority={i === 0} />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500" />
                  {/* Count pill */}
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-[9px] text-white font-bold uppercase tracking-widest">
                      {sub.children?.length || 0} Projects
                    </span>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-5 right-5 w-10 h-10 bg-[#C5A03F] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-400 shadow-lg">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                  {/* Text */}
                  <div className="absolute inset-x-5 bottom-5">
                    <h3 className="text-xl font-serif text-white mb-1.5 group-hover:-translate-y-1 transition-transform duration-400 leading-tight">
                      {sub.label}
                    </h3>
                    {desc && (
                      <p className="text-white/50 text-xs leading-relaxed line-clamp-2 group-hover:text-white/70 transition-colors duration-400">{desc}</p>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#1A4231] text-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-3">Plan your {catItem.label.replace(" Projects", "")} project</h2>
            <p className="text-white/60 font-light">Free site assessment & feasibility report by our expert engineering team.</p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-3 px-10 py-4 bg-[#C5A03F] text-white text-[10px] font-bold rounded-full hover:bg-white hover:text-[#1A4231] transition-all uppercase tracking-widest shadow-lg"
          >
            Book Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

// ─── Subcategory View ──────────────────────────────────────────────────────────
const SubcategoryView: React.FC<{ category: string; subcategory: string }> = ({ category, subcategory }) => {
  const catItem = getCategoryItem(category);
  const subItem = getSubcategoryItem(category, subcategory);
  if (!subItem || !catItem) return <Navigate to={`/projects/${category}`} />;
  const heroImg = SUBCATEGORY_IMG[subItem.label] || CATEGORY_FALLBACK[category];

  const subBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.igoagritechfarms.com/" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.igoagritechfarms.com/projects" },
      { "@type": "ListItem", "position": 3, "name": catItem.label, "item": `https://www.igoagritechfarms.com/projects/${category}` },
      { "@type": "ListItem", "position": 4, "name": subItem.label, "item": `https://www.igoagritechfarms.com/projects/${category}/${subcategory}` }
    ]
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen selection:bg-[#E8F5E9] selection:text-[#1A4231]">
      <SEO
        title={subItem.label}
        description={SUBCATEGORY_DESC[subItem.label] || `${subItem.label} projects by IGO Agritech Farms. Precision-engineered solutions with turnkey installation, training, and AMC support across India.`}
        keywords={`${subItem.label}, ${catItem.label}, agricultural projects India, IGO Agritech Farms`}
        url={`/projects/${category}/${subcategory}`}
        image={heroImg || undefined}
        jsonLd={subBreadcrumb}
      />
      {/* Hero */}
      <section className="relative pt-40 pb-40 overflow-hidden bg-black">
        <motion.div
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src={heroImg} alt={subItem.label} className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold uppercase tracking-widest mb-14 flex-wrap">
            <Link to="/projects" className="hover:text-[#C5A03F] transition-colors">Projects</Link>
            <span>/</span>
            <Link to={`/projects/${category}`} className="hover:text-[#C5A03F] transition-colors">{catItem.label}</Link>
            <span>/</span>
            <span className="text-[#C5A03F]">{subItem.label}</span>
          </div>

          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.15 } } }} className="max-w-4xl">
            <motion.div variants={fader} className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-[#C5A03F]/60" />
              <span className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.3em]">{subItem.children?.length || 0} Specialisations</span>
            </motion.div>
            <motion.h1 variants={fader} className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tight leading-[0.93]">
              {subItem.label}
            </motion.h1>
            <motion.p variants={fader} className="text-white/60 text-xl font-light leading-relaxed max-w-2xl">
              {SUBCATEGORY_DESC[subItem.label] || `Precision-engineered solutions across every dimension of ${subItem.label.toLowerCase()}.`}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Types grid — wider cards with name on image */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subItem.children?.map((feat: any, i: number) => {
            const img = getImage(feat.label, category);
            return (
              <motion.div
                key={feat.href}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={feat.href} className="group relative block aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <LazyCardImage src={img} alt={feat.label} fallbackSrc={CATEGORY_FALLBACK[category]} priority={i === 0} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent group-hover:from-black/65 transition-all duration-500" />
                  {SUBSIDY_ELIGIBLE.has(feat.label) && (
                    <div className="absolute top-5 left-5">
                      <span className="px-3 py-1.5 rounded-full bg-[#C5A03F]/90 backdrop-blur-sm text-[9px] text-white font-bold uppercase tracking-widest flex items-center gap-1">
                        <BadgeCheck className="w-3 h-3" /> Subsidy Eligible
                      </span>
                    </div>
                  )}
                  <div className="absolute top-5 right-5 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-400 shadow-lg">
                    <ArrowRight className="w-4 h-4 text-[#1A4231]" />
                  </div>
                  <div className="absolute inset-x-5 bottom-5">
                    <h3 className="text-xl font-serif text-white group-hover:-translate-y-1 transition-transform duration-400 leading-tight">
                      {feat.label}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20 bg-[#1A4231] text-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-serif mb-3">Interested in {subItem.label}?</h2>
            <p className="text-white/60 font-light">Get a free feasibility report and cost estimate from our experts.</p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-3 px-10 py-4 bg-[#C5A03F] text-white text-[10px] font-bold rounded-full hover:bg-white hover:text-[#1A4231] transition-all uppercase tracking-widest shadow-lg"
          >
            Enquire Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

// ─── Detail View ───────────────────────────────────────────────────────────────
const DetailView: React.FC<{ category: string; subcategory: string; feature: string }> = ({ category, subcategory, feature }) => {
  const catItem  = getCategoryItem(category);
  const subItem  = getSubcategoryItem(category, subcategory);
  const featItem = getFeatureItem(category, subcategory, feature);
  if (!featItem || !subItem || !catItem) return <Navigate to={`/projects/${category}/${subcategory}`} />;

  const heroImg    = getImage(featItem.label, category);
  const highlights = PROJECT_HIGHLIGHTS[featItem.label] || [
    "Turnkey installation by IGO's expert engineering teams",
    "Precision site survey and structural design",
    "Drip or sprinkler irrigation with fertigation system",
    "Operational training and crop cycle management guide",
    "Annual Maintenance Contract (AMC) available",
  ];
  const isSubsidy = SUBSIDY_ELIGIBLE.has(featItem.label);
  const contextDesc = CATEGORY_CONTEXT[category] || "Our team handles all phases from survey and design to installation and operational handover.";
  const waLink = `https://wa.me/917397789803?text=I'm%20interested%20in%20${encodeURIComponent(featItem.label)}%20project.%20Please%20share%20details.`;

  // Related projects (siblings, max 3)
  const related = (subItem.children as any[])
    ?.filter((f: any) => f.href !== featItem.href)
    .slice(0, 3) || [];

  const deliverables = [
    { title: "Site Survey",       desc: "Comprehensive land assessment, soil or water analysis, and engineering feasibility report." },
    { title: "Turnkey Setup",     desc: "End-to-end installation by expert teams using institutional-grade, certified materials." },
    { title: "Training",          desc: "Hands-on operational training covering system management, crop protocol, and troubleshooting." },
    { title: "AMC Support",       desc: "Annual maintenance contracts ensuring long-term performance, yield consistency and uptime." },
  ];

  const featBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.igoagritechfarms.com/" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.igoagritechfarms.com/projects" },
      { "@type": "ListItem", "position": 3, "name": catItem.label, "item": `https://www.igoagritechfarms.com/projects/${category}` },
      { "@type": "ListItem", "position": 4, "name": subItem.label, "item": `https://www.igoagritechfarms.com/projects/${category}/${subcategory}` },
      { "@type": "ListItem", "position": 5, "name": featItem.label, "item": `https://www.igoagritechfarms.com/projects/${category}/${subcategory}/${feature}` }
    ]
  };

  return (
    <div className="bg-white min-h-screen selection:bg-[#E8F5E9] selection:text-[#1A4231] pt-28">
      <SEO
        title={featItem.label}
        description={`${featItem.label} projects by IGO Agritech Farms. ${contextDesc.slice(0, 120)} Get a free site assessment and project report.`}
        keywords={`${featItem.label}, ${subItem.label}, ${catItem.label}, IGO Agritech Farms${isSubsidy ? ", government subsidy" : ""}`}
        url={`/projects/${category}/${subcategory}/${feature}`}
        image={heroImg || undefined}
        jsonLd={featBreadcrumb}
      />

      {/* ── Hero split section ── */}
      <section className="pb-0 container mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-black/35 font-bold uppercase tracking-widest mb-12 flex-wrap">
          <Link to="/projects" className="hover:text-[#C5A03F] transition-colors">Projects</Link>
          <span className="text-black/20">/</span>
          <Link to={`/projects/${category}`} className="hover:text-[#C5A03F] transition-colors">{catItem.label}</Link>
          <span className="text-black/20">/</span>
          <Link to={`/projects/${category}/${subcategory}`} className="hover:text-[#C5A03F] transition-colors">{subItem.label}</Link>
          <span className="text-black/20">/</span>
          <span className="text-[#C5A03F]">{featItem.label}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — content */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <motion.div variants={fader} className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-[#C5A03F]" />
                <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.4em]">{subItem.label}</p>
              </motion.div>
              <motion.h1 variants={fader} className="text-5xl md:text-7xl leading-[0.9] font-serif tracking-tight text-[#1A1A1A]">
                {featItem.label}
              </motion.h1>
              {isSubsidy && (
                <motion.div variants={fader}>
                  <span className="inline-flex items-center gap-2 px-5 py-2 bg-[#E8F5E9] text-[#1A4231] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#1A4231]/20">
                    <BadgeCheck className="w-4 h-4" /> Government Subsidy Eligible
                  </span>
                </motion.div>
              )}
            </div>

            <motion.p variants={fader} className="text-black/60 text-lg leading-relaxed font-light">
              {contextDesc}
            </motion.p>

            {/* Highlights list */}
            <motion.ul variants={fader} className="space-y-3">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1A4231] shrink-0 mt-0.5" />
                  <span className="text-black/70 text-sm leading-relaxed">{h}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div variants={fader} className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/contact"
                className="px-8 py-4 bg-[#1A4231] text-white text-[10px] font-bold rounded-full hover:bg-black transition-all uppercase tracking-[0.2em] inline-flex items-center justify-center gap-3 shadow-lg shadow-[#1A4231]/20"
              >
                Enquire Project <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#25D366] text-white text-[10px] font-bold rounded-full hover:bg-[#20b858] transition-all uppercase tracking-[0.2em] inline-flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/20"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
            </motion.div>
          </motion.div>

          {/* Right — landscape image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
          >
            <div className="absolute -inset-3 bg-[#C5A03F]/8 rounded-[36px] blur-2xl group-hover:bg-[#C5A03F]/14 transition-colors duration-700" />
            <div className="relative rounded-[28px] overflow-hidden aspect-[3/2] shadow-2xl border border-black/5">
              <img
                src={heroImg}
                alt={featItem.label}
                loading="eager"
                onError={e => {
                  const el = e.currentTarget as HTMLImageElement;
                  const fb = CATEGORY_FALLBACK[category] ?? "/assets/projects/main page/agri farming project .jpg";
                  if (el.src !== fb) el.src = fb;
                }}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Deliverables ── */}
      <section className="py-32 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-black/5 pt-20"
        >
          <div className="flex items-center gap-4 text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.4em] mb-14">
            <div className="w-12 h-[1px] bg-[#C5A03F]" />
            What We Deliver
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {deliverables.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-8 bg-[#F8F8F8] rounded-[2rem] border border-black/[0.04] hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-full bg-[#1A4231]/10 flex items-center justify-center text-[#1A4231] mb-7">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h5 className="text-xl font-serif text-black mb-2">{item.title}</h5>
                <p className="text-black/40 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Process section ── */}
      <section className="py-40 bg-[#0A0A0A] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-[#1A4231]/10 blur-[120px] rounded-full translate-x-1/2 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.4em] mb-8">Our Workflow</p>
              <h2 className="text-5xl md:text-6xl font-serif mb-14 leading-tight">Professional<br />Turnkey Workflow</h2>
              <div className="space-y-12">
                {[
                  { title: "Technical Feasibility", desc: "Rigorous site assessment and precision engineering design tailored to your land, climate, and budget." },
                  { title: "Expert Installation",   desc: "Professional on-site execution using certified materials, precision equipment, and our trained field teams." },
                  { title: "Handover & Training",   desc: "Comprehensive handover documentation, operational training, and long-term AMC support for sustained performance." },
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="text-6xl font-serif text-white/5 group-hover:text-[#C5A03F]/25 transition-colors duration-500 leading-none pt-1">{i + 1}</div>
                    <div>
                      <h4 className="text-2xl font-serif text-white mb-3">{step.title}</h4>
                      <p className="text-white/40 leading-relaxed font-light">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Bento grid — no duplicate image */}
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-5 pt-10">
                <div className="aspect-square rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/8 transition-colors duration-500">
                  <div className="w-10 h-10 rounded-full bg-[#C5A03F]/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#C5A03F]" />
                  </div>
                  <p className="text-sm font-light text-white/60 leading-relaxed">Guaranteed structural integrity — institutional grade, 10+ years lifespan</p>
                </div>
                <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-[#1A4231] to-[#0D2118] p-8 flex flex-col justify-between">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">IGO Advantage</p>
                  <div>
                    <p className="text-3xl font-serif text-white mb-1">1,000+</p>
                    <p className="text-xs text-[#C5A03F] uppercase tracking-widest font-bold">Projects Delivered</p>
                  </div>
                </div>
              </div>
              <div className="space-y-5">
                <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-[#C5A03F]/20 to-[#C5A03F]/5 border border-[#C5A03F]/20 p-8 flex flex-col justify-between">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Market Focus</p>
                  <div>
                    <p className="text-3xl font-serif text-white mb-1">ROI First</p>
                    <p className="text-xs text-white/40 font-light leading-relaxed">Every project designed for maximum commercial viability</p>
                  </div>
                </div>
                <div className="aspect-square rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/8 transition-colors duration-500">
                  <div className="w-10 h-10 rounded-full bg-[#C5A03F]/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#C5A03F]" />
                  </div>
                  <p className="text-sm font-light text-white/60 leading-relaxed">Scalable from pilot units to full commercial enterprise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Projects ── */}
      {related.length > 0 && (
        <section className="py-32 container mx-auto px-6">
          <div className="flex items-center justify-between mb-14">
            <div>
              <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-3">More from {subItem.label}</p>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A]">Related Projects</h2>
            </div>
            <Link
              to={`/projects/${category}/${subcategory}`}
              className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#1A4231] hover:text-[#C5A03F] transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((rel: any, i: number) => {
              const img = getImage(rel.label, category);
              return (
                <motion.div
                  key={rel.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                >
                  <Link to={rel.href} className="group relative block aspect-[4/3] rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500">
                    <LazyCardImage src={img} alt={rel.label} fallbackSrc={CATEGORY_FALLBACK[category]} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    {SUBSIDY_ELIGIBLE.has(rel.label) && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-[#C5A03F]/90 text-[8px] text-white font-bold uppercase tracking-widest flex items-center gap-1">
                          <BadgeCheck className="w-3 h-3" /> Subsidy
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-x-5 bottom-5">
                      <h3 className="text-lg font-serif text-white group-hover:-translate-y-1 transition-transform duration-400 leading-tight">{rel.label}</h3>
                    </div>
                    <div className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-400 shadow-lg">
                      <ArrowRight className="w-3.5 h-3.5 text-[#1A4231]" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Final CTA ── */}
      <section className="py-32 bg-[#F4F8F4] border-t border-[#1A4231]/10">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <p className="text-[#C5A03F] font-bold text-[10px] uppercase tracking-[0.35em] mb-6">Next Step</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-8 leading-tight">
            Ready to start your<br />{featItem.label} project?
          </h2>
          <p className="text-black/50 text-lg leading-relaxed mb-12 font-light">
            Get a free site assessment, detailed project report, and cost estimate from IGO's engineering team.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              to="/contact"
              className="px-12 py-5 bg-[#1A4231] text-white text-[10px] font-bold rounded-full hover:bg-black transition-all uppercase tracking-widest shadow-xl shadow-[#1A4231]/20 inline-flex items-center gap-3"
            >
              Get Free Report <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 bg-[#25D366] text-white text-[10px] font-bold rounded-full hover:bg-[#20b858] transition-all uppercase tracking-widest shadow-xl shadow-[#25D366]/20 inline-flex items-center gap-3"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── Router ───────────────────────────────────────────────────────────────────
const ProjectRouter: React.FC = () => {
  const { category, subcategory, feature } = useParams<{
    category: string;
    subcategory: string;
    feature: string;
  }>();

  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [category, subcategory, feature]);

  if (!category)    return <Navigate to="/projects" />;
  if (!subcategory) return <CategoryView category={category} />;
  if (!feature)     return <SubcategoryView category={category} subcategory={subcategory} />;
  return <DetailView category={category} subcategory={subcategory} feature={feature} />;
};

export default ProjectRouter;
