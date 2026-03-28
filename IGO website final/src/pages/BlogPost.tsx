import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, User, Calendar, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/siteData';
import SEO from '@/components/SEO';

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!post) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <Link to="/blog" className="text-primary hover:underline">Back to Journal</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-white">
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.image}
        url={`/blog/${post.id}`}
        type="article"
        publishedTime={post.date}
        author={post.author}
        keywords={`${post.category}, agriculture blog, IGO Agritech, farming insights India`}
      />
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-50 origin-[0%] shadow-[0_2px_10px_rgba(26,66,49,0.2)]"
        style={{ scaleX }}
      />

      <article className="pb-16">
        {/* Article Header — Horizontal Layout */}
        <header className="py-12 md:py-16 bg-[#FDFDFB] border-b border-black/[0.05] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(26,66,49,0.04),transparent_55%)]" />

          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-black/40 hover:text-primary transition-all text-[10px] font-black uppercase tracking-[0.3em] mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Journal
            </Link>

            {/* Horizontal split */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
              {/* Left — meta + title + excerpt */}
              <div className="flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 flex-wrap mb-5"
                >
                  {post.category && (
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.25em] border border-primary/20">
                      {post.category}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                    <Calendar className="w-3.5 h-3.5 text-primary" /> {post.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-black/20" />
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                    <User className="w-3.5 h-3.5 text-primary" /> {post.author}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug tracking-tight mb-5"
                >
                  {post.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-base text-black/50 font-medium leading-relaxed border-l-4 border-primary/30 pl-5"
                >
                  {post.excerpt}
                </motion.p>
              </div>

              {/* Right — Feature image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="w-full lg:w-[480px] xl:w-[560px] shrink-0"
              >
                <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="container mx-auto px-6 max-w-5xl py-12">
          <div className="grid lg:grid-cols-[1fr_260px] gap-12">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="prose prose-2xl prose-primary !max-w-none editorial-container"
            >
              <div 
                className="editorial-body font-light text-black/80 leading-[1.6]"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </motion.div>
            
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 space-y-20">
                <div className="space-y-8">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 border-b border-black/5 pb-4">Share Insights</h4>
                  <div className="flex flex-col gap-4">
                    <button className="social-share-btn-premium group" type="button">
                      <Facebook className="w-5 h-5 group-hover:text-[#1877F2]" />
                      <span className="text-xs font-bold">Facebook</span>
                    </button>
                    <button className="social-share-btn-premium group" type="button">
                      <Twitter className="w-5 h-5 group-hover:text-[#1DA1F2]" />
                      <span className="text-xs font-bold">Twitter</span>
                    </button>
                    <button className="social-share-btn-premium group" type="button">
                      <Linkedin className="w-5 h-5 group-hover:text-[#0A66C2]" />
                      <span className="text-xs font-bold">LinkedIn</span>
                    </button>
                    <button className="social-share-btn-premium group" type="button">
                      <Share2 className="w-5 h-5 group-hover:text-primary" />
                      <span className="text-xs font-bold">Copy Link</span>
                    </button>
                  </div>
                </div>
                
                <div className="p-10 rounded-[3rem] bg-black text-white relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/40 transition-colors" />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">Authority Weekly</h4>
                  <p className="text-sm font-medium text-white/60 leading-relaxed mb-10">Join 2,000+ agricultural leaders receiving our strategic insights.</p>
                  <button className="w-full py-5 bg-primary text-white rounded-2xl text-[10px] uppercase font-black tracking-[0.2em] hover:bg-white hover:text-black hover:scale-[1.02] transition-all" type="button">Subscribe Now</button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Suggested Reading */}
      <section className="py-14 bg-[#F9F9F7] border-t border-black/[0.05]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
            <div>
              <div className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-2">Continue Exploring</div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                More from the <span className="text-primary italic font-serif">Journal</span>
              </h2>
            </div>
            <Link to="/blog" className="px-7 py-3 rounded-full border border-black/10 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white hover:border-black transition-all whitespace-nowrap">
              View All Articles
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogPosts.filter(p => p.id !== id).slice(0, 3).map((related) => (
              <Link key={related.id} to={`/blog/${related.id}`} className="group h-full">
                <div className="flex flex-col h-full space-y-8">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-500">
                    <img src={related.image} alt={related.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="space-y-3 px-1">
                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">{related.date}</div>
                    <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">{related.title}</h3>
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] group-hover:gap-5 transition-all opacity-50">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .editorial-container .editorial-body h2 {
          font-size: 1.6rem;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
          line-height: 1.25;
          color: black;
          font-weight: 700;
        }
        .editorial-container .editorial-body p {
          margin-bottom: 1.5rem;
          font-size: 1.05rem;
        }
        .editorial-container .editorial-body blockquote {
          border: none;
          padding: 2rem 0;
          margin: 2rem 0;
          border-top: 1px solid rgba(0,0,0,0.05);
          border-bottom: 1px solid rgba(0,0,0,0.05);
          font-style: italic;
          font-family: serif;
          font-size: 1.35rem;
          line-height: 1.5;
          color: #1a4231;
          text-align: center;
        }
        .social-share-btn-premium {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          border-radius: 1rem;
          border: 1px solid rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          color: rgba(0,0,0,0.6);
        }
        .social-share-btn-premium:hover {
          background: rgba(0,0,0,0.02);
          border-color: rgba(0,0,0,0.1);
          color: black;
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
