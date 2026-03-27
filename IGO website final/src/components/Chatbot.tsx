import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ChevronRight } from "lucide-react";
import { companyInfo } from "@/data/siteData";

// ─── Knowledge Base ──────────────────────────────────────────────────────────
type KB = { keywords: string[]; answer: string };

const KNOWLEDGE: KB[] = [
  // Greetings
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "namaste", "hola", "start"],
    answer: `Hello! 👋 Welcome to **IGO Agritech Farms**.\n\nI'm your IGO assistant — ask me anything about:\n🌱 Services & Projects\n🛒 Products\n🎓 Training & Courses\n💼 Careers\n🚀 Agri Startup Platform\n📞 Contact & Locations\n\nUse the quick options below or type your question!`,
  },
  // About company
  {
    keywords: ["about", "who are you", "what is igo", "company", "overview", "tell me about"],
    answer: `**IGO Agritech Farms** is India's Leading Agri Engineering & Consulting Brand 🌿\n\n• **1,000+** projects completed across India\n• **10+ years** of experience (since 2013)\n• **28 states** & UTs covered\n• **2,000+** expert team members\n• **75+** awards & recognitions\n\nFounded by Dr. John Yesudhas, we specialize in Agri Farming, Aquaculture, Livestock, and Farm Engineering.`,
  },
  // Founder
  {
    keywords: ["founder", "ceo", "john", "yesudhas", "dr john", "director"],
    answer: `**Dr. John Yesudhas** is the Founder & CEO of IGO Agritech Farms 🏆\n\nHe has been recognized as:\n• *Icon of India for Positive Change*\n• India's Best Innovative Agritech Entrepreneur\n• Tech Farming Expert\n\nHis mission: empower every farmer with precision technology and sustainable engineering.`,
  },
  // Awards
  {
    keywords: ["award", "recognition", "msme", "achievement", "certificate", "honour"],
    answer: `IGO has received **75+ awards** including:\n\n🏅 MSME Awards 2024 – Best Agri-Consulting Brand\n🏅 SISI Award for Industrial Development\n🏅 Trade Award for Export Excellence\n🏅 Valluvam Award for Agricultural Excellence\n🏅 National Excellence Award\n🏅 Best Innovative Start-up Agri Tech Brand 2022`,
  },
  // Services overview
  {
    keywords: ["service", "what do you offer", "offer", "provide", "specialize"],
    answer: `We offer **4 core service categories**:\n\n🌱 **Farm Planning & Consulting**\nLand survey, crop selection, GIS mapping, business planning\n\n🏗️ **Farming Project Setup**\nPolyhouse, hydroponics, fish farms, livestock sheds & more\n\n⚙️ **Farm Infrastructure**\nIrrigation, cold storage, solar systems, pack houses\n\n🔧 **Maintenance & Support (AMC)**\nPolyhouse AMC, hydroponic system AMC, equipment maintenance\n\nWhich area would you like to explore?`,
  },
  // Farm Planning / Consulting
  {
    keywords: ["planning", "consulting", "consult", "gis", "mapping", "survey", "land survey", "crop selection", "business plan", "feasibility"],
    answer: `🌱 **Farm Planning & Consulting Services:**\n\n• Farm Business Planning\n• Land Survey & Soil Analysis\n• Crop Selection Consulting\n• Farm Layout Design\n• GIS Mapping & Topographic Survey\n• Agri Investment Consulting\n\nWe provide free site assessments! Call **+91 73977 89803** to schedule yours.`,
  },
  // Polyhouse
  {
    keywords: ["polyhouse", "greenhouse", "poly house", "protected", "climate control", "shade net", "nethouse"],
    answer: `🏡 **Polyhouse Projects by IGO:**\n\n• Naturally Ventilated Polyhouse\n• Climate Controlled Polyhouse\n• Polycarbonate Greenhouse\n• Shade Net House\n• Mist Chamber\n\n✅ **Benefits:** Year-round production, 40–60% higher yields, pest protection\n💰 **Subsidy:** Eligible under NHM scheme\n\nCall **+91 73977 89803** for a free site assessment!`,
  },
  // Hydroponics
  {
    keywords: ["hydroponic", "nft", "dwc", "soilless", "soil less", "aquaponics", "vertical hydro"],
    answer: `💧 **Hydroponic Solutions by IGO:**\n\n• NFT (Nutrient Film Technique) systems\n• DWC (Deep Water Culture) systems\n• Indoor & commercial hydroponic farms\n• Vertical hydroponic towers\n• Aquaponics systems\n\n✅ **90% less water**, 3× faster growth, no pesticides\n💰 Government subsidies available!\n\nAsk us about hydroponic setup costs.`,
  },
  // Aquaculture
  {
    keywords: ["aquaculture", "fish", "shrimp", "prawn", "biofloc", "crab", "aqua", "pond", "fishing"],
    answer: `🐟 **Aquaculture Farming Projects:**\n\n• Biofloc fish & shrimp farming\n• Traditional & intensive fish farming\n• Cage fish farming\n• Mud crab farming\n• Freshwater prawn farming\n• Aquaponics systems\n\nWe handle pond construction, liner installation, water systems & stock management end-to-end!\n💰 Eligible under **PMMSY** government scheme.`,
  },
  // Livestock
  {
    keywords: ["livestock", "goat", "sheep", "dairy", "poultry", "cow", "cattle", "hen", "chicken", "animal"],
    answer: `🐐 **Livestock Farming Projects:**\n\n• Commercial goat farming\n• Commercial sheep farming\n• Dairy farming setup\n• Poultry farm setup\n• Integrated livestock systems\n\nIncludes shed design, feeding systems, waste management & herd management consulting.\n\nCall **+91 73977 89803** for your livestock project plan!`,
  },
  // Farm Engineering
  {
    keywords: ["engineering", "irrigation", "drip", "sprinkler", "cold storage", "borewell", "pump", "solar fencing", "packhouse", "pack house"],
    answer: `⚙️ **Farm Engineering Services:**\n\n• Drip & sprinkler irrigation installation\n• Solar agriculture (PM-KUSUM eligible)\n• Cold storage construction\n• Pack house & farm buildings\n• Borewell & water pump systems\n• Land leveling & contour mapping\n• Solar fencing & solar lighting`,
  },
  // Mushroom
  {
    keywords: ["mushroom", "oyster", "button mushroom", "fungi"],
    answer: `🍄 **Mushroom Farming Projects:**\n\n• Oyster mushroom cultivation\n• Button mushroom farming\n• Climate-controlled grow rooms\n\n✅ **High ROI** – 45–60 day production cycles\nIGO provides substrate, spawn, training & complete setup.\n\nWant to know the investment & returns for mushroom farming?`,
  },
  // Vertical farming
  {
    keywords: ["vertical", "indoor", "multilayer", "multi layer", "multi-layer", "tier", "rooftop", "urban farm"],
    answer: `🌿 **Vertical & Indoor Farming:**\n\n• Indoor vertical farming systems\n• Multi-tier growing racks\n• Vertical hydroponic towers\n• Rooftop farming solutions\n\nPerfect for urban spaces with limited land. Maximize yield per sq. meter with LED grow lights & automated irrigation.`,
  },
  // Open field / plantation
  {
    keywords: ["mango", "guava", "dragon fruit", "papaya", "plantation", "open field", "moringa", "turmeric", "ginger", "aloe vera", "fig"],
    answer: `🌳 **Open Field & Plantation Projects:**\n\n• Mango, guava, dragon fruit, papaya plantations\n• Moringa & aloe vera farming\n• Turmeric & ginger cultivation\n• Blueberry & fig plantation\n• Medicinal crop farming\n\nWe handle land preparation, drip irrigation, crop management & buyback support.`,
  },
  // Solar / Renewable
  {
    keywords: ["solar", "renewable", "pm kusum", "energy", "solar dryer", "solar heater"],
    answer: `☀️ **Solar Agriculture Projects:**\n\n• Solar crop dryer\n• Solar water heater\n• Solar lighting for farms\n• Solar fencing\n• Solar-powered irrigation pumps (PM-KUSUM)\n\n💰 **PM-KUSUM scheme** provides up to 90% subsidy on solar pumps!\nAsk us how to apply.`,
  },
  // Subsidy / Government schemes
  {
    keywords: ["subsidy", "government", "scheme", "nhm", "pmmsy", "pm-kusum", "grant", "funding", "eligible", "loan"],
    answer: `💰 **Government Subsidies We Help With:**\n\n• **NHM** (National Horticulture Mission) — Polyhouse, nurseries, cold storage\n• **PMMSY** (PM Matsya Sampada Yojana) — Fish & shrimp farming\n• **PM-KUSUM** — Solar agriculture systems\n• State horticulture & fisheries schemes\n\nIGO provides **complete subsidy documentation & liaison support**.\nCall us to check eligibility for your project!`,
  },
  // Cost / Pricing
  {
    keywords: ["cost", "price", "pricing", "how much", "budget", "investment", "fee", "charge", "rate", "expensive"],
    answer: `Project costs depend on land size, crop type, technology & location. We offer:\n\n✅ **Free site assessment**\n📋 Detailed feasibility report\n💡 Transparent cost breakdown\n📈 ROI projections\n\nCall **+91 73977 89803** for a customised quote tailored to your budget & goals.\n\nNo commitment required!`,
  },
  // How to start
  {
    keywords: ["start", "begin", "how to", "process", "steps", "procedure", "get started", "new project"],
    answer: `🚀 **How to Start with IGO:**\n\n1. 📞 Call/WhatsApp **+91 73977 89803**\n2. 🗺️ Free site visit & assessment\n3. 📋 Receive feasibility report & cost estimate\n4. ✅ Project approval & agreement\n5. 🏗️ Turnkey implementation by our expert team\n6. 🎓 Training & handover\n7. 🔧 Ongoing AMC support\n\nReady? Tap **WhatsApp** below to start now!`,
  },
  // Contact
  {
    keywords: ["contact", "phone", "call", "reach", "number", "address", "talk", "speak"],
    answer: `📞 **Contact IGO Agritech Farms:**\n\n📱 Phone: **+91 73977 89803**\n📧 Email: bankingbackend.indiagreen@gmail.com\n📍 HQ: No 17, Kovalan Street, Uthandi Kanathur, Chennai 600119\n🕐 Hours: Mon–Sat, 9 AM – 6 PM\n\nOr tap **WhatsApp** below for instant chat!`,
  },
  // WhatsApp
  {
    keywords: ["whatsapp", "whats app", "instant", "message"],
    answer: `📲 Chat with us instantly on **WhatsApp**!\n\nTap the button below to open a direct WhatsApp conversation with our team. We typically respond within 30 minutes during business hours.`,
  },
  // Location / Office
  {
    keywords: ["location", "office", "where", "chennai", "mysore", "visit", "headquarters", "hq"],
    answer: `📍 **IGO Offices:**\n\n🏢 **Chennai HQ:**\nNo 17, Kovalan Street, Uthandi Kanathur,\nChennai – 600119, Tamil Nadu\n\n🎓 **Mysore Training Centre:**\nM.G. Road, Lakshmipuram,\nMysore – 570004, Karnataka\n\nBoth offices open Mon–Sat, 9 AM – 6 PM`,
  },
  // Training / Courses
  {
    keywords: ["training", "course", "learn", "workshop", "academy", "certificate", "study", "education"],
    answer: `🎓 **IGO Training Academy:**\n\nHands-on programs at our Mysore Training Centre:\n\n• Polyhouse Farming (5 Days)\n• Hydroponics Farming (5 Days)\n• Aquaculture Farming\n• Mushroom Cultivation\n• Agri Business Management\n\nVisit our **Courses** page or call **+91 73977 89803** to enroll!`,
  },
  // AMC / Maintenance
  {
    keywords: ["amc", "maintenance", "support", "after", "repair", "breakdown", "service contract"],
    answer: `🔧 **IGO AMC Services:**\n\n• Polyhouse Annual Maintenance Contract\n• Hydroponic System AMC\n• Farm Equipment Maintenance\n• Scheduled inspections & repairs\n• Emergency support for AMC clients\n\nAsk us about AMC packages for your farm setup!`,
  },
  // Projects stats / experience
  {
    keywords: ["experience", "how many", "completed", "years", "track record", "projects done", "states"],
    answer: `📊 **IGO Track Record:**\n\n• **1,000+** projects completed\n• **10+ years** of experience (since 2013)\n• **28 states** & UTs covered\n• **2,000+** expert team members\n• **75+ awards** & recognitions\n• **4 core disciplines** — Agri, Aqua, Livestock, Engineering`,
  },
  // Products overview
  {
    keywords: ["product", "buy", "agrimart", "purchase", "equipment", "material", "seed", "fertilizer", "shop", "store", "catalog"],
    answer: `🛒 **IGO Products — 4 Categories:**\n\n🌱 **Agri Farming Products**\nPolyhouse materials, hydroponic systems, grow lights, nursery supplies, seeds & nutrients\n\n🐟 **Aquaculture Products**\nPond liners, aerators, feed, biofloc equipment, water quality kits\n\n🐐 **Livestock Products**\nFeed supplements, shed materials, veterinary supplies, milking equipment\n\n⚙️ **Farm Engineering Products**\nDrip & sprinkler systems, solar pumps, cold storage units, pack house materials\n\nVisit our **Products** page for the full catalog!`,
  },
  // Agri Farming Products detail
  {
    keywords: ["polyhouse material", "grow light", "nursery supply", "hydroponic kit", "nft channel", "grow media", "coco peat", "nutrient solution"],
    answer: `🌱 **Agri Farming Products:**\n\n• Polyhouse covering films & structures\n• NFT channels & DWC systems\n• LED grow lights & timers\n• Coco peat, perlite & grow media\n• Nutrient solutions & fertilizers\n• Seedling trays & nursery supplies\n• Climate control equipment\n\nAll products are sourced from certified suppliers. Visit our Products page or call **+91 73977 89803**.`,
  },
  // Aquaculture Products detail
  {
    keywords: ["pond liner", "aerator", "fish feed", "biofloc kit", "water quality", "aqua product", "aeration"],
    answer: `🐟 **Aquaculture Products:**\n\n• HDPE pond liners (all sizes)\n• Aerators & paddle wheel systems\n• Fish & shrimp feed (all stages)\n• Biofloc starter kits\n• Water quality testing kits\n• Probiotics & water treatments\n• Nets, cages & harvest equipment\n\nCall **+91 73977 89803** for bulk pricing!`,
  },
  // Livestock Products detail
  {
    keywords: ["feed supplement", "cattle feed", "shed material", "milking", "veterinary", "livestock product", "goat feed"],
    answer: `🐐 **Livestock Products:**\n\n• Mineral & vitamin supplements\n• Cattle, goat & poultry feed\n• Shed construction materials\n• Milking machines & accessories\n• Ear tags & weighing scales\n• Vaccination & healthcare supplies\n\nVisit our Products page or WhatsApp us for quotes!`,
  },
  // Farm Engineering Products
  {
    keywords: ["drip tape", "sprinkler head", "solar pump", "filter", "valve", "pipe", "irrigation product", "cold storage unit"],
    answer: `⚙️ **Farm Engineering Products:**\n\n• Drip tapes, emitters & laterals\n• Sprinkler heads & rain guns\n• Solar water pumps (PM-KUSUM)\n• Sand filters & fertigation units\n• HDPE & PVC pipes & fittings\n• Cold storage panels & refrigeration\n• Pack house equipment & conveyors\n\nCall **+91 73977 89803** for technical specs & pricing!`,
  },
  // Careers
  {
    keywords: ["career", "job", "vacancy", "hiring", "employment", "work", "join", "apply", "opening", "opportunity", "recruit"],
    answer: `💼 **Careers at IGO Agritech Farms:**\n\nWe're always looking for passionate people to join our growing team!\n\n**Current Opportunities:**\n• Agri Engineers & Project Managers\n• Farm Technicians & Supervisors\n• Sales & Business Development Executives\n• Hydroponic & Aquaculture Specialists\n• Marketing & Digital Content Creators\n• Admin & Operations Staff\n\n📍 Positions across Chennai, Mysore & field locations pan-India\n\n📧 Send your CV to: bankingbackend.indiagreen@gmail.com\n📞 Call **+91 73977 89803** for openings\n\nVisit our **Careers** page for current listings!`,
  },
  // Internship
  {
    keywords: ["intern", "internship", "fresher", "graduate", "student", "college"],
    answer: `🎓 **Internships at IGO Agritech Farms:**\n\nWe welcome fresh graduates and students passionate about agriculture!\n\n• **Farm Internship** — Hands-on training at live project sites\n• **Tech Internship** — Hydroponics, IoT & precision agri\n• **Business Internship** — Sales, marketing & agri consulting\n\n**Duration:** 1–6 months\n**Locations:** Chennai, Mysore & pan-India farm sites\n\n📧 Email your resume: bankingbackend.indiagreen@gmail.com\n📞 Call **+91 73977 89803** to know more!`,
  },
  // Agri Startup Platform
  {
    keywords: ["startup", "agri startup", "startup platform", "incubat", "entrepreneur", "new business", "agri business", "startup support"],
    answer: `🚀 **IGO Agri Startup Platform:**\n\nYour growth partner for agri entrepreneurship!\n\n**5 Ways We Support You:**\n1. 🌱 **Startup Incubation** — Mentorship, infrastructure & pilot support\n2. 📊 **Business Planning** — Financial models, ROI projections & pitch decks\n3. 🤝 **Partnership & Joint Ventures** — Co-build farms together\n4. 🔧 **Farm & Tech Support** — Turnkey setup, training & AMC\n5. 📈 **Market Access** — Buyer network, exports & retail linkages\n\n✅ Free initial consultation · 48-hour response\n\nVisit our **Agri Startup Platform** page or tap WhatsApp below!`,
  },
  // Joint Venture
  {
    keywords: ["joint venture", "jv", "partner", "partnership", "co-farm", "invest together", "land owner"],
    answer: `🤝 **IGO Joint Venture Farming:**\n\nWe invest together. We grow together.\n\n**You bring:** Land, capital, or local network\n**IGO brings:** Technology, expertise & full management\n\n• Formal JV agreement with clear terms\n• Profit-sharing model\n• End-to-end farm management by IGO\n• No farming experience needed on your part\n\n📞 Call **+91 73977 89803** or visit the **Agri Startup Platform** page to apply!`,
  },
  // Franchise
  {
    keywords: ["franchise", "franchis", "own farm", "blueprint", "brand", "igo brand"],
    answer: `🏪 **IGO Franchise Farming:**\n\nStart your own smart farm under the IGO brand!\n\n• Use IGO's proven, standardised farm blueprints\n• Full turnkey setup by IGO team\n• SOP training & handover\n• Leverage the IGO brand & buyer network\n• Independently profitable operation\n\n📞 Call **+91 73977 89803** to learn about franchise eligibility & investment!`,
  },
  // Investor / Funding
  {
    keywords: ["invest", "investor", "fund", "capital", "roi", "return", "profit", "money", "earn"],
    answer: `💰 **Invest with IGO Agritech:**\n\n**High-ROI Agri Investment Models:**\n\n• **Joint Venture Farming** — Shared investment, shared profits with IGO managing everything\n• **Agri Project Investment** — Fund specific projects (polyhouse, aquaculture, livestock)\n• **Franchise Model** — Own a farm under the IGO brand\n\nAll models backed by:\n✅ Real data from 1,000+ live farms\n✅ Transparent financial projections\n✅ Formal legal agreement\n\n📞 Call **+91 73977 89803** to discuss investment opportunities!`,
  },
  // Training detail
  {
    keywords: ["training", "course", "learn", "workshop", "academy", "certificate", "study", "education", "enroll", "enrol", "duration", "fee"],
    answer: `🎓 **IGO Training Academy — Mysore Centre:**\n\n**Available Courses:**\n• 🏡 Polyhouse Farming — 5 Days\n• 💧 Hydroponics Farming — 5 Days\n• 🐟 Aquaculture Farming — 3–5 Days\n• 🍄 Mushroom Cultivation — 2–3 Days\n• 🌿 Vertical Farming — 3 Days\n• 📊 Agri Business Management — 5 Days\n\n**What's Included:**\n✅ Hands-on live farm training\n✅ Theory + practical sessions\n✅ Certificate of completion\n✅ Post-training consultation support\n\n📍 Mysore Training Centre, Karnataka\n📞 Call **+91 73977 89803** to check schedules & fees!`,
  },
  // Buyback
  {
    keywords: ["buyback", "buy back", "sell produce", "sell crop", "market", "offtake", "who will buy"],
    answer: `🛒 **IGO Buyback Programme:**\n\nWorried about where to sell your produce? IGO has you covered!\n\n• IGO connects farmers to its **direct buyer network**\n• Retail chains, exporters, restaurants & FPOs\n• **Price assurance** for select crops\n• Available to all IGO project clients & startup partners\n\nThis means you focus on farming — we handle the market!\n\n📞 Call **+91 73977 89803** to know which crops are covered.`,
  },
  // Projects overview
  {
    keywords: ["project", "what project", "project type", "project category", "all project"],
    answer: `🏗️ **IGO Projects — 4 Core Categories:**\n\n🌾 **Agri Farming Projects**\nPolyhouse, hydroponics, vertical farming, open-field, floriculture, mushroom, nursery & urban farming\n\n🐟 **Aquaculture Farming Projects**\nFish, biofloc, shrimp, crab, prawn farming & aquaponics\n\n🐐 **Livestock Farming Projects**\nGoat, sheep, dairy, poultry & integrated livestock systems\n\n⚙️ **Farm Engineering Projects**\nCold storage, packhouses, irrigation, solar agriculture & land development\n\n**1,000+ projects delivered across 28 states!**\nTap WhatsApp below to discuss your project.`,
  },
  // FAQ - Is IGO registered
  {
    keywords: ["registered", "legal", "msme", "certified", "license", "verified", "authentic", "genuine", "trust"],
    answer: `✅ **IGO Agritech Farms — Verified & Certified:**\n\n• **MSME Registered** — Certified by the Government of India\n• **MSME Awards 2024** winner — Best Agri-Consulting Brand\n• **75+ national awards** from government & industry bodies\n• Operating since **2013** — 10+ years of verified track record\n• Formal legal agreements for all JV, franchise & project contracts\n\nYou can trust IGO — we've built 1,000+ farms across India with full transparency.`,
  },
  // FAQ - Which states
  {
    keywords: ["which state", "which city", "pan india", "all india", "operate", "available", "my state", "location serve"],
    answer: `🗺️ **IGO operates Pan-India across 28 states & UTs:**\n\nWe have delivered projects in Tamil Nadu, Karnataka, Andhra Pradesh, Telangana, Kerala, Maharashtra, Gujarat, Rajasthan, Punjab, Haryana, Uttar Pradesh, Madhya Pradesh, Bihar, West Bengal, Odisha, and many more!\n\n📍 HQ: Chennai, Tamil Nadu\n📍 Training Centre: Mysore, Karnataka\n\nOur logistics & partner network ensures on-time delivery anywhere in India.\n\n📞 Call **+91 73977 89803** to confirm availability in your area!`,
  },
  // Blog / News
  {
    keywords: ["blog", "news", "article", "read", "latest", "update", "post"],
    answer: `📰 **IGO Blog & News:**\n\nStay updated with the latest in agritech:\n\n• IGO Agrimart — Farming Solutions Guide\n• Dr. John Yesudhas — Icon of India Feature\n• Independence Day Special at IGO Farms\n• Project updates & success stories\n• Government scheme guides\n\nVisit our **Blog** page to read all articles and stay informed about modern farming!`,
  },
  // Social Media
  {
    keywords: ["social media", "instagram", "facebook", "youtube", "linkedin", "twitter", "follow"],
    answer: `📱 **Follow IGO Agritech Farms:**\n\n• 📘 Facebook: /IGOAgriTechfarms\n• 📸 Instagram: @igoagritechfarms\n• 💼 LinkedIn: IGO Agritech Farms\n• 🐦 Twitter: @igoagritechfarm\n• ▶️ YouTube: @IGOAgriTechfarms\n\nFollow us for project updates, farming tips, scheme news & success stories!`,
  },
  // Associated brands
  {
    keywords: ["farmers factory", "valluvam", "nursery", "protein cuts", "financial service", "igo group", "brand", "sister", "associate"],
    answer: `🏢 **IGO Group of Companies:**\n\n• 🏭 **Farmers Factory** — Agri product processing & manufacturing\n• 🌿 **Valluvam** — Award-winning agri consultancy brand\n• 🌱 **IGO Nursery** — Premium plant propagation unit\n• 🥩 **Protein Cuts** — Farm-to-table premium protein products\n• 💼 **Financial Services** — Agri financing, loans & subsidy processing\n\nAll 5 brands work together under the IGO Group to deliver end-to-end agricultural solutions across India.`,
  },
];

// ─── Quick Replies ────────────────────────────────────────────────────────────
const QUICK_REPLIES = [
  "What services do you offer?",
  "Tell me about projects",
  "Products & AgriMart",
  "Training courses",
  "Careers at IGO",
  "Agri Startup Platform",
  "Government subsidies",
  "Contact info",
];

// ─── Match function ───────────────────────────────────────────────────────────
function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const kb of KNOWLEDGE) {
    if (kb.keywords.some((kw) => lower.includes(kw))) {
      return kb.answer;
    }
  }
  return `Thank you for your message! 🌿 Our team will be happy to help.\n\nFor immediate assistance:\n📞 Call **+91 73977 89803**\n📲 WhatsApp us using the button below\n📧 Email: bankingbackend.indiagreen@gmail.com\n\nYou can also try asking about our **services**, **projects**, or **subsidies**.`;
}

// ─── Render markdown-style bold ──────────────────────────────────────────────
function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <span className="whitespace-pre-line text-sm leading-relaxed">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Msg = { role: "user" | "bot"; text: string };

// ─── Component ────────────────────────────────────────────────────────────────
const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: `Hello! 👋 Welcome to **IGO Agritech Farms**.\n\nI'm your IGO assistant. Ask me anything about our projects, services, subsidies, or how to get started!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = getBotReply(text);
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* ── Floating Toggle Button ── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#1A4231] shadow-2xl shadow-[#1A4231]/40 flex items-center justify-center text-white"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#1A4231] animate-ping opacity-20 pointer-events-none" />
        )}
        {/* Unread dot */}
        {!open && (
          <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-[#C5A03F] rounded-full border-2 border-white" />
        )}
      </motion.button>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[370px] flex flex-col rounded-[1.75rem] overflow-hidden shadow-2xl border border-black/8"
            style={{ maxHeight: "calc(100vh - 140px)" }}
          >
            {/* ── Header ── */}
            <div className="bg-[#1A4231] px-5 py-4 flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#C5A03F]/20 border border-[#C5A03F]/40 flex items-center justify-center shrink-0">
                <span className="text-[#C5A03F] font-serif font-bold text-sm">I</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight">IGO Agritech Assistant</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-white/50 text-[10px] font-medium uppercase tracking-wide">Online — replies instantly</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* ── Messages Area ── */}
            <div className="flex-1 overflow-y-auto bg-[#F7F9F8] p-4 space-y-3" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
                >
                  {/* Bot avatar */}
                  {msg.role === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-[#1A4231] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white font-serif font-bold text-[10px]">I</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-[#C5A03F] text-white rounded-br-md shadow-md shadow-[#C5A03F]/20"
                        : "bg-white text-[#1A1A1A] rounded-bl-md shadow-sm border border-black/5"
                    }`}
                  >
                    <RichText text={msg.text} />
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#1A4231] flex items-center justify-center shrink-0">
                      <span className="text-white font-serif font-bold text-[10px]">I</span>
                    </div>
                    <div className="bg-white border border-black/5 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1 shadow-sm">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="w-1.5 h-1.5 bg-[#1A4231]/40 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick replies — shown only after first bot message, before user replies */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-2 mt-2"
                >
                  {QUICK_REPLIES.map((qr) => (
                    <button
                      key={qr}
                      onClick={() => sendMessage(qr)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#1A4231]/20 text-[#1A4231] text-[11px] font-semibold hover:bg-[#1A4231] hover:text-white hover:border-[#1A4231] transition-all shadow-sm"
                    >
                      {qr} <ChevronRight className="w-2.5 h-2.5 opacity-50" />
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ── Input Area ── */}
            <div className="bg-white border-t border-black/6 p-3 shrink-0">
              <div className="flex gap-2 items-center">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about projects, services…"
                  className="flex-1 px-4 py-2.5 rounded-full bg-[#F7F9F8] border border-black/8 text-sm text-[#1A1A1A] placeholder:text-black/30 outline-none focus:border-[#1A4231]/40 focus:ring-2 focus:ring-[#1A4231]/10 transition-all"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-full bg-[#1A4231] disabled:opacity-40 flex items-center justify-center text-white hover:bg-[#C5A03F] transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={companyInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 flex items-center justify-center gap-2 w-full py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/25 text-[#128C7E] text-[11px] font-bold hover:bg-[#25D366]/20 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp — instant reply
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
