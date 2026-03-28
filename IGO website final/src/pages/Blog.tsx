import { Link } from "react-router-dom";
import { ArrowRight, User, Search, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/siteData";
import SEO from "@/components/SEO";

const Blog = () => (
  <div className="pt-20">
    <SEO
      title="Blog | Agriculture Insights & News — IGO Agritech Farms"
      description="Read the latest agriculture insights, company news, awards, and farming tips from IGO Agritech Farms. Articles on polyhouse, hydroponics, vertical farming, agri careers, and more."
      keywords="agriculture blog India, farming tips, polyhouse blog, hydroponics news, agri startup articles, IGO Agritech blog"
      url="/blog"
    />
    {/* Blog Hero — Horizontal Layout */}
    <section className="py-16 md:py-20 bg-[#FDFDFB] border-b border-black/[0.05] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(26,66,49,0.04),transparent_55%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          {/* Left — Title block */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-5 border border-primary/20">
              IGO Journal
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
              Agri <span className="text-primary italic font-serif">Insights</span> & News
            </h1>
            <p className="text-base text-muted-foreground font-medium leading-relaxed">
              Perspectives on modern farming technology, sustainable agriculture, company milestones, and agritech breakthroughs.
            </p>
          </div>
          {/* Right — Search + stats */}
          <div className="flex flex-col gap-5 w-full md:w-[420px]">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white border border-border/60 focus:ring-2 focus:ring-primary/10 focus:border-primary/40 outline-none transition-all font-medium text-sm shadow-sm"
              />
            </div>
            <div className="flex items-center gap-6 px-1">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{blogPosts.length}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">Articles</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">Categories</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">Years</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="premium-card overflow-hidden group">
              <Link to={`/blog/${post.id}`}>
                <div className="aspect-[16/10] overflow-hidden bg-muted relative">
                  <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute top-8 left-8 glass px-5 py-2.5 rounded-2xl text-[10px] font-black text-primary uppercase tracking-[0.3em] border border-white/40">
                    {post.date}
                  </div>
                </div>
              </Link>
              <div className="p-12">
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  {post.category && (
                    <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.25em] border border-primary/20">
                      {post.category}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-8">
                  <User className="w-4 h-4 text-primary" /> {post.author}
                </div>
                <h2 className="text-3xl mb-8 group-hover:text-primary transition-colors leading-[1.25]">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="text-muted-foreground text-lg mb-10 line-clamp-3 leading-[1.6] font-medium">
                  {post.excerpt}
                </p>
                <Link 
                  to={`/blog/${post.id}`} 
                  className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-foreground group-hover:text-primary group-hover:gap-6 transition-all border-b-2 border-primary/10 pb-2 group-hover:border-primary"
                >
                  Read Full Article <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* Newsletter */}
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-[#0C1A14] rounded-[40px] p-12 md:p-16 text-center relative overflow-hidden text-white shadow-[0_40px_80px_-20px_rgba(26,66,49,0.3)]">
          <BookOpen className="w-12 h-12 text-white mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-snug text-white">
            Subscribe to <span className="text-secondary italic font-serif">Agri-Weekly</span>
          </h2>
          <p className="text-white/60 text-base font-medium mb-10 max-w-xl mx-auto leading-relaxed">
            Farming insights and agritech trends delivered to your inbox every week.
          </p>
          <form className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto relative z-10">
            <input 
              type="email" 
              placeholder="Corporate email address..." 
              className="flex-1 px-10 py-7 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-lg backdrop-blur-3xl"
              required
            />
            <button className="premium-btn bg-primary text-white border-transparent px-16 group">
              Join Authority <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-3 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
);

export default Blog;
