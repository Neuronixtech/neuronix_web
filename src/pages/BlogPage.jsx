import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { BlogCard } from "@/features/blog";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/features/blog";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { onImgError } from "@/lib/utils";

export default function BlogPage() {
  useDocumentMeta("Blog");
  const [selectedPost, setSelectedPost]   = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-20">

      {/* Hero */}
      <section className="py-10 lg:py-14 relative">
        <div className="absolute inset-0 gradient-orange-subtle opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-semibold uppercase tracking-widest"
          >
            Blog
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading mt-3"
          >
            Insights &amp; <span className="text-primary">Ideas</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-6 max-w-xl mx-auto text-base leading-relaxed"
          >
            Deep-dives on Generative AI, RAG, full stack development, cloud
            infrastructure, and the future of intelligent software.
          </motion.p>
        </div>
      </section>

      {/* Grid / Post View */}
      <section className="py-8 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {!selectedPost ? (
            <>
              {/* Category Filter */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                {BLOG_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground glow-orange-sm"
                        : "glass-card text-muted-foreground hover:text-foreground hover:border-white/20"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map((post, i) => (
                    <motion.div
                      key={post.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                    >
                      <BlogCard
                        {...post}
                        index={i}
                        onClick={() => setSelectedPost(post)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filtered.length === 0 && (
                <p className="text-center text-muted-foreground text-sm py-16">
                  No posts in this category yet.
                </p>
              )}
            </>
          ) : (

            /* Post Detail */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft size={16} /> Back to Blog
              </button>

              <div className="rounded-2xl overflow-hidden mb-8">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  onError={onImgError}
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {selectedPost.category}
                </span>
                <span className="flex items-center gap-1">
                  <User size={14} /> {selectedPost.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {selectedPost.readTime} min read
                </span>
                {selectedPost.date && (
                  <span className="text-xs text-muted-foreground/60">{selectedPost.date}</span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-6 leading-tight">
                {selectedPost.title}
              </h1>

              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => (
                      <h2 className="text-xl font-bold font-heading text-foreground mt-8 mb-3">
                        {children}
                      </h2>
                    ),
                    p: ({ children }) => (
                      <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground mb-4">
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => (
                      <li className="text-muted-foreground">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-foreground font-semibold">{children}</strong>
                    ),
                  }}
                >
                  {selectedPost.content}
                </ReactMarkdown>
              </div>
            </motion.div>

          )}
        </div>
      </section>
    </div>
  );
}
