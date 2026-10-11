import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import {
    Activity, ArrowRight, CheckCircle2, Shield,
    Clock, HelpCircle, ChevronRight,
    Search, Award, PhoneCall
} from "lucide-react";
import { SEO_TOPICS } from "../data/seoTopics";
import { getCalApi } from "@calcom/embed-react";

export default function SeoLandingPage() {
    const { slug } = useParams<{ slug: string }>();
    const topic = slug ? SEO_TOPICS[slug] : undefined;

    useEffect(() => {
        (async function () {
            try {
                const cal = await getCalApi();
                cal("ui", { "styles": { "branding": { "brandColor": "#0051A3" } }, "hideEventTypeDetails": false, "layout": "month_view" });
            } catch (e) {
                console.error("Cal.com init error", e);
            }
        })();
    }, []);

    useEffect(() => {
        if (topic) {
            document.title = topic.metaTitle;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute("content", topic.metaDescription);
            }
            const canonical = document.querySelector('link[rel="canonical"]');
            if (canonical) {
                canonical.setAttribute("href", `https://opdseva.in/solutions/${topic.slug}`);
            }
            window.scrollTo(0, 0);
        }
    }, [topic]);

    if (!topic) {
        return <Navigate to="/solutions" replace />;
    }

    const otherTopics = Object.values(SEO_TOPICS).filter((t) => t.slug !== topic.slug);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
                            <Activity className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-lg">OpdSeva<span className="text-primary">.in</span></span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                        <Link to="/solutions" className="text-primary font-semibold">Solutions &amp; SEO Topics</Link>
                        <a href="/#features" className="hover:text-foreground transition-colors">Features</a>
                        <a href="/#pricing" className="hover:text-foreground transition-colors">Pricing</a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <button
                            data-cal-link="himang305"
                            data-cal-config='{"layout":"month_view"}'
                            className="text-sm font-semibold px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm hover:shadow cursor-pointer flex items-center gap-1.5"
                        >
                            <PhoneCall className="w-3.5 h-3.5" /> Book Demo
                        </button>
                    </div>
                </div>
            </header>

            {/* Breadcrumb Bar */}
            <div className="bg-muted/40 border-b border-border/60 py-2.5 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-muted-foreground">
                    <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
                    <Link to="/solutions" className="hover:text-foreground transition-colors">Solutions</Link>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
                    <span className="text-foreground font-medium truncate max-w-xs sm:max-w-md">{topic.title}</span>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-primary/5 via-background to-background border-b border-border/50">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-6"
                    >
                        <Award className="w-3.5 h-3.5" />
                        <span>{topic.badge}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.2] mb-6 text-balance"
                    >
                        {topic.heroHeadline}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-balance"
                    >
                        {topic.heroSubheadline}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        <button
                            data-cal-link="himang305"
                            data-cal-config='{"layout":"month_view"}'
                            className="flex items-center gap-2 text-base font-semibold px-6 py-3.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                        >
                            Book Free 1-on-1 Demo <ArrowRight className="w-4 h-4" />
                        </button>
                        <Link
                            to="/"
                            className="text-base font-semibold px-6 py-3.5 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-border/80"
                        >
                            Explore All Features
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Key Highlights Strip */}
            <section className="py-10 px-4 sm:px-6 bg-card border-b border-border">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-center text-xs font-bold uppercase tracking-wider text-muted-foreground mb-6">
                        Why Clinics Choose OPDSeva for {topic.title}
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {topic.keyTakeaways.map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border/60 shadow-xs">
                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-xs sm:text-sm font-medium leading-snug">{highlight}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Challenges Faced Section */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-destructive/10 text-destructive mb-3">
                        The Current Problem
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        Common Bottlenecks Clinics Face
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl mx-auto">
                        Without specialized software tailored to Indian clinical realities, outpatient departments face daily operational strain.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {topic.challenges.map((c, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-card border border-border shadow-xs flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold text-destructive/80 mb-2 block">Problem #{i + 1}</span>
                                <h3 className="font-semibold text-lg mb-3">{c.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* How OPDSeva Solves It */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 bg-muted/30 border-y border-border">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-3">
                            The OPDSeva Advantage
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                            How OPDSeva Solves {topic.title}
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl mx-auto">
                            Purpose-built tools designed to make OPD running seamless for doctors, receptionists, and patients alike.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {topic.solutions.map((s, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-background border border-border/80 shadow-xs flex flex-col justify-between">
                                <div>
                                    <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm mb-4">
                                        0{i + 1}
                                    </div>
                                    <h3 className="font-semibold text-lg mb-3">{s.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Demo CTA Box */}
            <section className="py-14 px-4 sm:px-6 max-w-4xl mx-auto">
                <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-primary to-primary/90 text-primary-foreground text-center relative overflow-hidden shadow-xl">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <span className="text-xs uppercase tracking-widest text-white/80 font-semibold mb-2 block">
                            Quick 15-Minute Live Walkthrough
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            Ready to Transform Your Clinic’s Patient Flow?
                        </h2>
                        <p className="text-white/90 text-sm sm:text-base mb-8">
                            See how OPDSeva handles your specific OPD appointments, token queues, and WhatsApp messaging in real time.
                        </p>
                        <button
                            data-cal-link="himang305"
                            data-cal-config='{"layout":"month_view"}'
                            className="bg-white text-primary font-bold px-7 py-3.5 rounded-xl hover:bg-white/95 transition-all shadow-md hover:scale-[1.02] cursor-pointer text-sm sm:text-base inline-flex items-center gap-2"
                        >
                            Schedule Free 15-Min Demo <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Frequently Asked Questions */}
            {topic.faqs && topic.faqs.length > 0 && (
                <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-secondary-foreground mb-3">
                            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                            Got Questions About {topic.title}?
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {topic.faqs.map((faq, i) => (
                            <div key={i} className="p-5 rounded-xl border border-border bg-card">
                                <h3 className="font-semibold text-base mb-2 text-foreground">{faq.q}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Related SEO Pages Grid (Priority 1, 2, 3) */}
            <section className="py-16 px-4 sm:px-6 bg-muted/20 border-t border-border mt-auto">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-lg font-bold">Related Specialized Solutions</h3>
                            <p className="text-xs text-muted-foreground">Explore other focused guides and operational software pages</p>
                        </div>
                        <Link to="/solutions" className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
                            View All Search Pages <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {otherTopics.slice(0, 6).map((item) => (
                            <Link
                                key={item.slug}
                                to={`/solutions/${item.slug}`}
                                className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-xs transition-all group flex flex-col justify-between"
                            >
                                <div>
                                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                                        {item.category}
                                    </span>
                                    <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h4>
                                </div>
                                <span className="text-xs text-primary font-medium mt-3 inline-flex items-center gap-1">
                                    Read Page <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Standard Footer */}
            <footer className="py-8 px-4 sm:px-6 border-t border-border bg-card">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                            <Activity className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="font-bold">OpdSeva<span className="text-primary">.in</span></span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} OpdSeva.in — Smart OPD Management for Indian Clinics
                    </p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                        <Link to="/solutions" className="hover:text-foreground transition-colors">Solutions Index</Link>
                        <button
                            data-cal-link="himang305"
                            data-cal-config='{"layout":"month_view"}'
                            className="hover:text-foreground transition-colors cursor-pointer"
                        >
                            Book Demo
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
