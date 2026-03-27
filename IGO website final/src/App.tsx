import React, { lazy, Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
// Lazy-loaded pages for better code splitting
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectRouter = lazy(() => import("./pages/ProjectRouter"));
const ServiceRouter = lazy(() => import("./pages/ServiceRouter"));
const ProductRouter = lazy(() => import("./pages/ProductRouter"));
const Services = lazy(() => import("./pages/Services"));
const Products = lazy(() => import("./pages/Products"));
const Courses = lazy(() => import("./pages/Courses"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Careers = lazy(() => import("./pages/Careers"));
const AgriStartupPlatform = lazy(() => import("./pages/AgriStartupPlatform"));
const AgriStartupEnquiry = lazy(() => import("./pages/AgriStartupEnquiry"));
const IgoGroupBrands = lazy(() => import("./pages/IgoGroupBrands"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdsLogin = lazy(() => import("./pages/AdsLogin"));
const AdsDashboard = lazy(() => import("./pages/AdsDashboard"));
const OffersPage = lazy(() => import("./pages/OffersPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// ─── Error Boundary ───────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Page error caught by ErrorBoundary:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
          <h2 className="text-2xl font-bold text-[#1A4231]">Something went wrong</h2>
          <p className="text-gray-500">Please refresh the page or go back home.</p>
          <a href="/" className="px-6 py-2.5 bg-[#1A4231] text-white rounded-full text-sm font-semibold hover:opacity-80 transition-opacity">
            Go Home
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── ScrollToTop ──────────────────────────────────────────────────────────────
// Resets scroll position to top on every route change.
// Must be rendered inside <BrowserRouter> to use useLocation().
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
};

// ─── AppRoutes ────────────────────────────────────────────────────────────────
// AnimatePresence wraps a motion.div (not Routes itself).
// The motion.div carries the key so Framer Motion animates it in/out.
// Routes stays stable — no blank-page unmount gap.
// initial={false} on AnimatePresence prevents the entrance animation
// on first render (page reload), so there is no blank flash on reload.
const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <Suspense fallback={<div className="min-h-screen" />}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/legacy/:id" element={<Projects />} />
          <Route path="/projects/:category" element={<ProjectRouter />} />
          <Route path="/projects/:category/:subcategory" element={<ProjectRouter />} />
          <Route path="/projects/:category/:subcategory/:feature" element={<ProjectRouter />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:category" element={<ServiceRouter />} />
          <Route path="/services/:category/:subcategory" element={<ServiceRouter />} />
          <Route path="/services/:category/:subcategory/:feature" element={<ServiceRouter />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<ProductRouter />} />
          <Route path="/products/:category/:productSlug" element={<ProductRouter />} />
          <Route path="/agri-startup-platform" element={<AgriStartupPlatform />} />
          <Route path="/igo-groups" element={<IgoGroupBrands />} />
          <Route path="/startup-enquiry" element={<AgriStartupEnquiry />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/ads/login" element={<AdsLogin />} />
          <Route path="/ads/dashboard" element={<AdsDashboard />} />
          {/* /startup-platform is an alias handled by /agri-startup-platform above */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────
const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <ErrorBoundary>
              <main className="min-h-screen relative z-10">
                <AppRoutes />
              </main>
            </ErrorBoundary>
            <Footer />
            <Chatbot />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
