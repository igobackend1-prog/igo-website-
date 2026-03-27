import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { companyInfo } from "@/data/siteData";

const serviceLinks = [
  { label: "About Us",    href: "/about" },
  { label: "Projects",   href: "/projects" },
  { label: "Services",   href: "/services" },
  { label: "Products",   href: "/products" },
  { label: "FAQ",        href: "/faq" },
  { label: "Contact Us", href: "/contact" },
  { label: "Academy",    href: "/courses" },
  { label: "Careers",    href: "/careers" },
];

const phones = ["+91 73977 89803", "+91 73977 89804", "+91 73977 89805"];
const emails = ["bankingbackend.indiagreen@gmail.com", "bd2@igogroups.com"];

const socials = [
  { Icon: Facebook,  href: "https://www.facebook.com/IGOAgriTechfarms/",          label: "Facebook" },
  { Icon: Instagram, href: "https://www.instagram.com/igoagritechfarms/",         label: "Instagram" },
  { Icon: Linkedin,  href: "https://www.linkedin.com/company/igo-agritechfarms/", label: "LinkedIn" },
  { Icon: Youtube,   href: "https://www.youtube.com/@IGOAgriTechfarms",            label: "YouTube" },
];

const Footer = () => (
  <footer className="bg-[#0A1510] text-white pt-20 pb-10 relative overflow-hidden">
    {/* Subtle glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[200px] bg-primary/8 blur-[120px] rounded-full pointer-events-none" />

    <div className="container mx-auto px-6 relative z-10">

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        {/* Col 1 — Brand + Vision + Mission + Social */}
        <div className="lg:col-span-1 space-y-7">
          {/* Logo */}
          <Link to="/">
            <img
              src={companyInfo.logo}
              alt={companyInfo.name}
              className="h-20 object-contain invert brightness-0 invert"
            />
          </Link>

          {/* Vision */}
          <div>
            <p className="text-[#6FD898] font-bold text-xs uppercase tracking-[0.25em] mb-2">Vision</p>
            <p className="text-white/80 text-sm leading-relaxed font-light">
              {companyInfo.vision}
            </p>
          </div>

          {/* Mission */}
          <div>
            <p className="text-[#6FD898] font-bold text-xs uppercase tracking-[0.25em] mb-2">Mission</p>
            <p className="text-white/80 text-sm leading-relaxed font-light">
              {companyInfo.mission}
            </p>
          </div>

          {/* Social icons */}
          <div className="flex gap-3 pt-1">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-[#6FD898] hover:border-[#6FD898] transition-all group"
              >
                <Icon className="w-4 h-4 text-white/70 group-hover:text-[#0A1510]" />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Spacer on small, Our Services on large */}
        <div className="space-y-5">
          <h4 className="text-white font-bold text-sm uppercase tracking-[0.25em] pb-3 border-b border-white/10">
            Our Services
          </h4>
          <ul className="space-y-3">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="flex items-center gap-2 text-white/70 hover:text-[#6FD898] transition-colors text-sm font-medium group"
                >
                  <ArrowRight className="w-3 h-3 text-[#6FD898]/60 group-hover:text-[#6FD898] group-hover:translate-x-0.5 transition-all" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Contact Us */}
        <div className="space-y-5 lg:col-span-2">
          <h4 className="text-white font-bold text-sm uppercase tracking-[0.25em] pb-3 border-b border-white/10">
            Contact Us
          </h4>

          <div className="grid sm:grid-cols-2 gap-8">
            {/* Address + Phone */}
            <div className="space-y-5">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/8 border border-white/12 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#6FD898]" />
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  No 17, Kovalan street, 2nd main road,<br />
                  Uthandi Kanathur, Chennai 600119.
                </p>
              </div>

              {/* Phones */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/8 border border-white/12 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-[#6FD898]" />
                </div>
                <div className="space-y-1">
                  {phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="block text-white/80 hover:text-[#6FD898] text-sm font-medium transition-colors"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Emails */}
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/8 border border-white/12 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-[#6FD898]" />
                </div>
                <div className="space-y-2">
                  {emails.map((e) => (
                    <a
                      key={e}
                      href={`mailto:${e}`}
                      className="block text-white/80 hover:text-[#6FD898] text-sm font-medium transition-colors break-all"
                    >
                      {e}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick CTA */}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 mt-3 px-5 py-2.5 rounded-full bg-[#6FD898] text-[#0A1510] text-xs font-black uppercase tracking-[0.2em] hover:bg-white transition-all"
              >
                Get in Touch <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} {companyInfo.name}. All Rights Reserved.
        </p>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
          <Link to="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white/70 transition-colors">Terms of Use</Link>
          <Link to="/ads/login" className="hover:text-white/50 transition-colors">Advertising Portal</Link>
        </div>
      </div>

    </div>
  </footer>
);

export default Footer;
