import { useState } from "react";
import { motion } from "motion/react";
import {
    Clock, Users, Bell, BarChart3, Smartphone, CheckCircle,
    Star, ChevronDown, ArrowRight, Wifi, Shield, MessageSquare,
    Calendar, Activity, Building2, MapPin,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
];

const FEATURES = [
    { icon: Activity, title: "Live Queue Tracking", desc: "Patients see their current queue position and estimated waiting time in real time." },
    { icon: Calendar, title: "Online Appointment Booking", desc: "Allow patients to book appointments anytime from mobile or web." },
    { icon: MessageSquare, title: "WhatsApp & SMS Alerts", desc: "Automatically notify patients when their turn is approaching." },
    { icon: Bell, title: "Digital Token System", desc: "Replace manual token systems with smart digital queue management." },
    { icon: Users, title: "Doctor Availability Status", desc: "Show live doctor availability and delay updates instantly." },
    { icon: BarChart3, title: "Reception Dashboard", desc: "Simple interface for clinic staff to manage walk-ins and appointments." },
    { icon: Building2, title: "Multi-Clinic Support", desc: "Manage multiple branches from one centralized dashboard." },
    { icon: Clock, title: "Analytics & Reports", desc: "Track patient flow, waiting time, and clinic efficiency with ease." },
    { icon: MapPin, title: "Remote Check-In", desc: "Patients can check in before arriving at the clinic, reducing crowds." },
    { icon: Smartphone, title: "Follow-Up Reminders", desc: "Automatically remind patients about follow-up visits via SMS/WhatsApp." },
];

const STEPS = [
    { num: "1", title: "Clinic Sets Up Schedules", desc: "The clinic creates doctor schedules, defines OPD timings, and sets patient capacity for each slot." },
    { num: "2", title: "Patients Book Appointments", desc: "Patients book appointments online via mobile or web, or walk in and get registered by the receptionist." },
    { num: "3", title: "Smart Token Generated", desc: "The system automatically generates a digital queue token and calculates the estimated waiting time." },
    { num: "4", title: "Live Updates & Alerts", desc: "Patients receive live waiting updates via SMS and WhatsApp, and arrive at the clinic at the right time." },
];

const WHY_CHOOSE = [
    { icon: "👌", title: "Easy to Use", desc: "No technical knowledge required. If you can use WhatsApp, you can use OpdSeva." },
    { icon: "⏱️", title: "Saves Reception Time", desc: "Automates token and patient flow management — freeing up your staff." },
    { icon: "🏥", title: "Reduces Crowding", desc: "Patients arrive closer to their actual consultation time, reducing lobby congestion." },
    { icon: "⭐", title: "Improves Patient Satisfaction", desc: "Transparent waiting experience builds trust and loyalty." },
    { icon: "📱", title: "Works on Mobile", desc: "Use from desktop, tablet, or smartphone — no installation needed." },
    { icon: "💰", title: "Affordable Pricing", desc: "Specially designed for small and medium clinics with budget-friendly plans." },
];

const TESTIMONIALS = [
    { initials: "RS", name: "Dr. Rajesh Sharma", role: "General Physician", clinic: "Sharma Clinic, Lucknow", color: "bg-blue-500", quote: "Patient complaints about waiting time reduced significantly. Our patients now know exactly when to arrive — the chaos is gone." },
    { initials: "AG", name: "Mr. Anil Gupta", role: "Clinic Manager", clinic: "Sunrise Clinic, Kanpur", color: "bg-green-500", quote: "Our reception staff now manages OPD much more smoothly. Everything is organised and patients wait comfortably at home." },
    { initials: "MV", name: "Dr. Meena Verma", role: "Medical Director", clinic: "City Care Hospital, Bhopal", color: "bg-purple-500", quote: "The live queue system is very useful for working patients. They can check their turn from the office and come just in time." },
    { initials: "SP", name: "Dr. Sunil Patel", role: "Orthopedic Surgeon", clinic: "Patel Healthcare, Surat", color: "bg-orange-500", quote: "We manage 3 branches from one dashboard. OpdSeva has made multi-location management surprisingly easy." },
    { initials: "KS", name: "Mrs. Kavita Singh", role: "Head Receptionist", clinic: "Jeevan Hospital, Patna", color: "bg-pink-500", quote: "The WhatsApp alerts are a game changer. We receive far fewer 'when is my turn?' phone calls now." },
    { initials: "PN", name: "Dr. Pradeep Nair", role: "Paediatrician", clinic: "Nair Child Clinic, Nagpur", color: "bg-teal-500", quote: "Very affordable for a small clinic like ours. Setup was done in one day and staff learned it in an hour." },
];

const PRICING = [
    {
        name: "Starter", price: "₹999", period: "/month", tag: "Perfect for small clinics",
        highlight: false, cta: "Start Free Trial",
        features: ["Appointment booking", "Digital token management", "SMS alerts to patients", "Up to 2 doctors", "Reception dashboard", "Basic patient records", "Email support"],
    },
    {
        name: "Professional", price: "₹2,499", period: "/month", tag: "For growing clinics",
        badge: "Most Popular", highlight: true, cta: "Book Free Demo",
        features: ["Everything in Starter", "Live queue tracking", "Analytics dashboard", "WhatsApp alerts", "Multi-doctor support", "Remote check-in", "Follow-up reminders", "Priority support"],
    },
    {
        name: "Enterprise", price: "Custom", period: "", tag: "For hospitals & chains",
        highlight: false, cta: "Contact Us",
        features: ["Everything in Professional", "Multi-branch management", "Dedicated account manager", "Custom integrations", "Advanced analytics", "Staff training support", "SLA guarantee", "24/7 phone support"],
    },
];

const FAQS = [
    { q: "Is OpdSeva difficult to use?", a: "Not at all! OpdSeva is designed for clinic staff with no technical background. If you can use a smartphone, you can use OpdSeva. We also provide onboarding support." },
    { q: "Can walk-in patients also be managed?", a: "Yes! Receptionists can register walk-in patients directly from the dashboard and assign them a digital token in seconds." },
    { q: "Does it work on mobile phones?", a: "Absolutely. OpdSeva works seamlessly on smartphones, tablets, and desktop computers — no app installation required." },
    { q: "Will patients receive notifications?", a: "Yes. Patients get automatic SMS and WhatsApp alerts when their turn is approaching so they can arrive at the right time." },
    { q: "Is patient data secure?", a: "Yes. All patient data is encrypted and stored securely. We follow healthcare data privacy best practices." },
    { q: "Can small clinics use OpdSeva?", a: "Absolutely! Our Starter plan is designed for small clinics with up to 2 doctors, at just ₹999/month." },
    { q: "Is internet required to use OpdSeva?", a: "Yes, a basic internet connection is required. OpdSeva works well even on slower 3G/4G connections." },
    { q: "Can I manage multiple clinic branches?", a: "Yes! Our Professional and Enterprise plans support multiple branches from a single centralized dashboard." },
];

const CLINICS = [
    { abbr: "SC", name: "Sunrise Clinic", color: "bg-blue-100 text-blue-700" },
    { abbr: "CC", name: "City Care", color: "bg-green-100 text-green-700" },
    { abbr: "AH", name: "Arogya Health", color: "bg-purple-100 text-purple-700" },
    { abbr: "JH", name: "Jeevan Hospital", color: "bg-orange-100 text-orange-700" },
    { abbr: "SW", name: "Swasthya Clinic", color: "bg-teal-100 text-teal-700" },
    { abbr: "NH", name: "Nagar Hospital", color: "bg-red-100 text-red-700" },
];

const QUEUE_ROWS = [
    { num: "42", name: "Ramesh Kumar", wait: "Now", status: "Consulting", sc: "bg-blue-100 text-blue-700" },
    { num: "43", name: "Priya Sharma", wait: "5 min wait", status: "Waiting", sc: "bg-yellow-100 text-yellow-700" },
    { num: "44", name: "Mohd. Arif", wait: "18 min wait", status: "Notified", sc: "bg-green-100 text-green-700" },
    { num: "45", name: "Sunita Devi", wait: "30 min wait", status: "Registered", sc: "bg-gray-100 text-gray-600" },
];

// ─── Small reusable pieces ────────────────────────────────────────────────────

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}>
            {children}
        </span>
    );
}

function SectionLabel({ children }: { children: string }) {
    return <Badge className="mb-3 bg-primary/10 text-primary">{children}</Badge>;
}

function Stars({ count = 5, size = "w-4 h-4" }: { count?: number; size?: string }) {
    return (
        <div className="flex">
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} className={`${size} fill-yellow-400 text-yellow-400`} />
            ))}
        </div>
    );
}

// ─── Dashboard mockup ─────────────────────────────────────────────────────────

function DashboardMockup() {
    return (
        <div className="bg-white rounded-2xl shadow-2xl border border-border p-5 w-full max-w-sm mx-auto">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-xs text-muted-foreground font-medium">Sunrise Multi-Specialty Clinic</p>
                    <p className="text-sm font-semibold">OpdSeva Dashboard</p>
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-green-600 font-medium">Live</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
                {[["68", "Today's Patients"], ["12", "Waiting Now"], ["43", "Completed"]].map(([v, l]) => (
                    <div key={l} className="bg-muted rounded-lg p-2 text-center">
                        <p className="text-lg font-bold text-primary">{v}</p>
                        <p className="text-[10px] text-muted-foreground">{l}</p>
                    </div>
                ))}
            </div>

            <p className="text-xs font-semibold mb-2">Live Queue</p>
            <div className="space-y-2">
                {QUEUE_ROWS.map((r) => (
                    <div key={r.num} className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-muted-foreground w-6">{r.num}</span>
                            <span className="text-xs font-medium">{r.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-muted-foreground">{r.wait}</span>
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${r.sc}`}>{r.status}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold">Dr. Sharma</p>
                        <p className="text-[10px] text-green-600">Running on time</p>
                    </div>
                </div>
                <span className="text-[10px] font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">Available</span>
            </div>
        </div>
    );
}

// ─── FAQ accordion item ───────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-border">
            <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left cursor-pointer gap-4">
                <span className="font-medium text-sm sm:text-base">{q}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>
            {open && <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{a}</p>}
        </div>
    );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function Navbar() {
    return (


        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border">
            <div className="max-w-6xl mx-auto px-0.5 sm:px-1 flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <Activity className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-lg">OpdSeva<span className="text-primary">.in</span></span>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    {NAV_LINKS.map((l) => (
                        <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{l.label}</a>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <button className="hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">Login</button>
                    <button className="text-sm font-semibold px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer">Book Free Demo</button>
                </div>
            </div>
        </nav>
    );
}

function HeroSection() {
    const trustBadges = [
        { icon: Shield, label: "Secure Healthcare Platform" },
        { icon: Wifi, label: "WhatsApp & SMS Enabled" },
        { icon: Users, label: "Easy Staff Training" },
        { icon: Star, label: "Made for Indian Healthcare" },
    ];
    return (
        <section className="pt-32 pb-20 px-1 sm:px-2 max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Badge className="mb-4 bg-primary/10 text-primary">Made for Indian Clinics &amp; Hospitals</Badge>
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5 text-balance">
                        No More OPD<br /><span className="text-primary">Waiting Chaos</span>
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
                        OpdSeva.in helps clinics and hospitals manage patient appointments, live OPD queues, waiting times, and doctor schedules in real time. Built specially for Indian clinics in Tier-2 and Tier-3 cities.
                    </p>
                    <div className="flex flex-wrap gap-3 mb-10">
                        <button className="flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer">
                            Book Free Demo <ArrowRight className="w-4 h-4" />
                        </button>
                        <button className="text-sm font-semibold px-5 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer">
                            Start Free Trial
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {trustBadges.map((b) => (
                            <div key={b.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <b.icon className="w-3.5 h-3.5 text-primary" />{b.label}
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                    <DashboardMockup />
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-16 pt-10 border-t border-border">
                <p className="text-center text-xs text-muted-foreground font-medium mb-6 uppercase tracking-widest">500+ clinics trust OpdSeva</p>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                    {CLINICS.map((c) => (
                        <div key={c.abbr} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${c.color}`}>{c.abbr}</div>
                            <span className="text-sm text-muted-foreground hidden sm:block">{c.name}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

function ProblemSection() {
    const sides = [
        {
            tag: "Patients Face", title: "Patient Frustrations",
            border: "border-red-200", tagCls: "bg-red-100 text-red-600",
            items: ["Long waiting times with no end in sight", "No queue visibility — patients wait blindly", "Overcrowded and uncomfortable waiting rooms", "Confusing doctor schedules and delays", "Repeated clinic visits due to missed turns"],
        },
        {
            tag: "Clinics Face", title: "Clinic Challenges",
            border: "border-orange-200", tagCls: "bg-orange-100 text-orange-600",
            items: ["Manual token systems that cause confusion", "Reception staff overloaded with calls", "Missed appointments and no-shows", "Patient frustration damaging your reputation", "No operational analytics to improve flow"],
        },
    ];
    return (
        <section className="py-20 px-2 sm:px-4 bg-muted/40">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <Badge className="mb-3 bg-red-100 text-red-600">The Real Problem</Badge>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Healthcare Waiting Rooms Are Still Chaotic</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">Every day, thousands of patients and clinics across India struggle with the same broken OPD experience.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {sides.map((s) => (
                        <div key={s.title} className={`bg-white rounded-2xl border-2 ${s.border} p-6`}>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.tagCls}`}>{s.tag}</span>
                            <h3 className="text-xl font-bold mt-3 mb-4">{s.title}</h3>
                            <ul className="space-y-3">
                                {s.items.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1.5 shrink-0" />{item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <p className="text-center mt-8 text-sm text-muted-foreground font-medium">
                    OpdSeva.in transforms traditional OPD management into a smart digital experience.
                </p>
            </div>
        </section>
    );
}

function FeaturesSection() {
    return (
        <section id="features" className="py-20 px-2 sm:px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <SectionLabel>The Solution</SectionLabel>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Smart OPD Management for Modern Clinics</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">Everything your clinic needs to run a smooth, efficient OPD — all in one simple platform.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {FEATURES.map((f, i) => (
                        <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                            className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                                <f.icon className="w-4 h-4 text-primary" />
                            </div>
                            <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-12 rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
                    <h3 className="text-2xl font-bold mb-2">Ready to digitize your OPD?</h3>
                    <p className="text-muted-foreground mb-6">Join 500+ clinics already using OpdSeva.in</p>
                    <button className="flex items-center gap-2 mx-auto text-sm font-semibold px-5 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer">
                        Book Free Demo <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}

function HowItWorksSection() {
    return (
        <section id="how-it-works" className="py-20 px-2 sm:px-4 bg-muted/40">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <SectionLabel>How It Works</SectionLabel>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">How OpdSeva.in Works</h2>
                    <p className="text-muted-foreground">Up and running in minutes. No technical expertise required.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STEPS.map((s, i) => (
                        <motion.div key={s.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="relative bg-white rounded-xl border border-border p-6">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mb-4">{s.num}</div>
                            <h3 className="font-semibold mb-2">{s.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                            {i < STEPS.length - 1 && (
                                <div className="hidden lg:flex absolute top-10 -right-3 z-10 items-center justify-center w-6 h-6 bg-muted rounded-full">
                                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
                <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                    {["🕐 Less Crowding", "⚡ Less Waiting", "😊 Better Patient Experience"].map((t) => (
                        <span key={t} className="bg-white border border-border rounded-full px-4 py-1.5 font-medium">{t}</span>
                    ))}
                </div>
            </div>
        </section>
    );
}

function WhyChooseSection() {
    return (
        <section className="py-20 px-2 sm:px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <SectionLabel>Why Doctors Choose Us</SectionLabel>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Built for Real Indian Clinics</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {WHY_CHOOSE.map((w, i) => (
                        <motion.div key={w.title} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                            className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
                            <span className="text-3xl mb-3 block">{w.icon}</span>
                            <h3 className="font-semibold mb-2">{w.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-20 px-2 sm:px-4 bg-muted/40">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <SectionLabel>Client Stories</SectionLabel>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">What Clinics Say</h2>
                    <p className="text-muted-foreground mb-3">Real feedback from doctors and clinic managers across India.</p>
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                        <Stars /><span className="font-semibold text-foreground ml-1">4.9/5</span><span>from 500+ clinics</span>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {TESTIMONIALS.map((t, i) => (
                        <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                            className="bg-white rounded-xl border border-border p-6 flex flex-col gap-4">
                            <Stars size="w-3.5 h-3.5" />
                            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{`"${t.quote}"`}</p>
                            <div className="flex items-center gap-3 pt-3 border-t border-border">
                                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{t.initials}</div>
                                <div>
                                    <p className="text-sm font-semibold">{t.name}</p>
                                    <p className="text-xs text-muted-foreground">{t.role}</p>
                                    <p className="text-xs text-muted-foreground">{t.clinic}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function PricingSection() {
    return (
        <section id="pricing" className="py-20 px-2 sm:px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <SectionLabel>Pricing</SectionLabel>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">Simple &amp; Affordable Pricing</h2>
                    <p className="text-muted-foreground">No hidden charges. No complicated contracts. Cancel anytime.</p>
                    <p className="text-sm text-primary font-medium mt-2">All plans include a 14-day free trial</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-6 mt-6">
                    {PRICING.map((p, i) => (
                        <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="relative">
                            {p.badge && (
                                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">{p.badge}</span>
                                </div>
                            )}
                            <div className={`bg-white rounded-xl border-2 p-6 h-full flex flex-col ${p.highlight ? "border-primary shadow-lg" : "border-border"}`}>
                                <p className="text-xs text-muted-foreground mb-1">{p.tag}</p>
                                <h3 className="text-xl font-bold mb-1">{p.name}</h3>
                                <div className="flex items-end gap-0.5 mb-5">
                                    <span className={`font-extrabold text-foreground ${p.price === "Custom" ? "text-2xl" : "text-3xl"}`}>{p.price}</span>
                                    {p.period && <span className="text-sm text-muted-foreground mb-0.5">{p.period}</span>}
                                </div>
                                <ul className="space-y-2.5 mb-6 flex-1">
                                    {p.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2 text-sm">
                                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer ${p.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                                    {p.cta}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <p className="text-center text-sm text-muted-foreground mt-8">Need something specific? Contact us for custom pricing — we work with clinics of all sizes.</p>
            </div>
        </section>
    );
}

function FaqSection() {
    return (
        <section className="py-20 px-2 sm:px-4 bg-muted/40">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <SectionLabel>FAQ</SectionLabel>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground">Everything you need to know before getting started with OpdSeva.in.</p>
                </div>
                <div className="bg-white rounded-2xl border border-border px-6">
                    {FAQS.map((faq) => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
                </div>
                <div className="mt-8 text-center">
                    <p className="text-muted-foreground text-sm mb-4">Still have questions? Our team is happy to help.</p>
                    <div className="flex justify-center gap-3">
                        <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer">
                            <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
                        </button>
                        <button className="text-sm font-medium px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer">
                            Email Us
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CtaSection() {
    return (
        <section className="py-24 px-2 sm:px-4 bg-primary text-white">
            <div className="max-w-3xl mx-auto text-center">
                <p className="text-sm font-medium text-white/70 uppercase tracking-widest mb-4">Join 500+ clinics already using OpdSeva</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Modernize Your OPD Today</h2>
                <p className="text-white/80 text-lg mb-4 max-w-xl mx-auto">Reduce waiting chaos, improve patient satisfaction, and digitize your clinic operations with OpdSeva.in.</p>
                <p className="text-white/70 italic text-sm mb-8">"Know Your Turn Before You Go"</p>
                <div className="flex flex-wrap justify-center gap-3">
                    <button className="flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-lg bg-white text-primary hover:bg-white/90 transition-colors cursor-pointer">
                        Schedule Demo <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="text-sm font-semibold px-5 py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors cursor-pointer">
                        Talk to Our Team
                    </button>
                </div>
                <p className="text-white/60 text-xs mt-6">No credit card required · 14-day free trial · Setup in 1 day</p>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="py-8 px-4 sm:px-6 border-t border-border bg-white">
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
                    {["Privacy", "Terms", "Contact"].map((l) => (
                        <a key={l} href="#" className="hover:text-foreground transition-colors cursor-pointer">{l}</a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Index() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <HeroSection />
            <ProblemSection />
            <FeaturesSection />
            <HowItWorksSection />
            <WhyChooseSection />
            <TestimonialsSection />
            <PricingSection />
            <FaqSection />
            <CtaSection />
            <Footer />
        </div>
    );
}
