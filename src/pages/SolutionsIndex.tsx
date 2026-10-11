import { useState } from "react";
import { Link } from "react-router-dom";
import { Activity, ArrowRight, Search, Award, Layers, MapPin, Sparkles } from "lucide-react";
import { SEO_TOPICS } from "../data/seoTopics";

export default function SolutionsIndex() {
    const [filterPriority, setFilterPriority] = useState<number | "all">("all");
    const [searchQuery, setSearchQuery] = useState("");

    const topicsList = Object.values(SEO_TOPICS);

    const filtered = topicsList.filter((item) => {
        const matchesPriority = filterPriority === "all" || item.priority === filterPriority;
        const matchesSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.metaDescription.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesPriority && matchesSearch;
    });

    const p1Count = topicsList.filter((t) => t.priority === 1).length;
    const p2Count = topicsList.filter((t) => t.priority === 2).length;
    const p3Count = topicsList.filter((t) => t.priority === 3).length;

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                            <Activity className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-lg">OpdSeva<span className="text-primary">.in</span></span>
                    </Link>
                    <div className="flex items-center gap-4 text-sm">
                        <Link to="/" className="text-muted-foreground hover:text-foreground">Back to Home</Link>
                        <button
                            data-cal-link="himang305"
                            data-cal-config='{"layout":"month_view"}'
                            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 text-sm cursor-pointer"
                        >
                            Book Demo
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-primary/5 via-background to-background border-b border-border text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="text-xs uppercase tracking-widest font-bold text-primary mb-3 block">
                        Search Intent Directory
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        Specialized Solutions &amp; Guides
                    </h1>
                    <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-xl mx-auto">
                        Dedicated pages optimized for specific search intentions, operational clinic bottlenecks, and regional healthcare setups in India.
                    </p>

                    {/* Search & Filter Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
                        <div className="relative w-full">
                            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search targeted solutions or cities..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-semibold">
                        <button
                            onClick={() => setFilterPriority("all")}
                            className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${filterPriority === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                        >
                            All ({topicsList.length})
                        </button>
                        <button
                            onClick={() => setFilterPriority(1)}
                            className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${filterPriority === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                        >
                            <Award className="w-3 h-3" /> Priority 1: Software Buyers ({p1Count})
                        </button>
                        <button
                            onClick={() => setFilterPriority(2)}
                            className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${filterPriority === 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                        >
                            <Layers className="w-3 h-3" /> Priority 2: Clinic Problems ({p2Count})
                        </button>
                        <button
                            onClick={() => setFilterPriority(3)}
                            className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${filterPriority === 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                        >
                            <MapPin className="w-3 h-3" /> Priority 3: Regional &amp; Cities ({p3Count})
                        </button>
                    </div>
                </div>
            </section>

            {/* List Section */}
            <main className="py-12 px-4 sm:px-6 max-w-5xl mx-auto flex-1 w-full">
                <div className="grid md:grid-cols-2 gap-5">
                    {filtered.map((topic) => (
                        <Link
                            key={topic.slug}
                            to={`/solutions/${topic.slug}`}
                            className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all group flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                                        {topic.badge}
                                    </span>
                                    <span className="text-xs text-muted-foreground font-mono">
                                        /solutions/{topic.slug}
                                    </span>
                                </div>
                                <h2 className="text-lg font-bold group-hover:text-primary transition-colors mb-2">
                                    {topic.title}
                                </h2>
                                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                    {topic.metaDescription}
                                </p>
                            </div>

                            <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary">
                                <span>Explore Dedicated Page</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground">
                        <p className="text-base font-semibold">No targeted search pages match your query.</p>
                        <p className="text-xs mt-1">Try searching for other terms like 'appointment', 'token', or city names.</p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="py-8 px-4 sm:px-6 border-t border-border bg-card mt-auto">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <span>© {new Date().getFullYear()} OpdSeva.in — Dedicated SEO Search Pages Directory</span>
                    <div className="flex gap-4">
                        <Link to="/" className="hover:text-foreground">Home</Link>
                        <button data-cal-link="himang305" data-cal-config='{"layout":"month_view"}' className="hover:text-foreground cursor-pointer">
                            Contact / Book Demo
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
