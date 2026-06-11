import SectionHeading from "@/components/SectionHeading";
import { blogPosts } from "@/lib/data";

export const metadata = {
  title: "Blog & Wellness",
  description: "SEO-ready blog and wellness foundation for Moorland House & SPA."
};

export default function BlogPage() {
  return (
    <main className="pt-24">
      <section className="section-pad bg-cream">
        <div className="luxury-container">
          <SectionHeading
            eyebrow="Blog & Wellness"
            title="A foundation for search-friendly hospitality stories."
            text="Opening news, wellness guidance, cuisine features, and Migori travel content can be managed from admin later."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.title} className="soft-card rounded-lg p-6">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-pool">{post.tag}</p>
                <h2 className="mt-3 font-serif text-3xl font-bold">{post.title}</h2>
                <p className="mt-4 leading-7 text-mist">{post.excerpt}</p>
                <button type="button" className="btn-secondary mt-6">Read Preview</button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
