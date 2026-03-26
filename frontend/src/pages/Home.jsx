import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Zap, Globe, ArrowRight, Users, Hospital, Activity, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const features = [
        {
            icon: <Heart className="w-8 h-8 text-red-500" />,
            title: "Quick Fundraising",
            desc: "Start a campaign in minutes for medical emergencies with zero hassle."
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
            title: "AI Trust Engine",
            desc: "Every campaign is verified by our AI and medical experts for maximum trust."
        },
        {
            icon: <Zap className="w-8 h-8 text-yellow-500" />,
            title: "Instant Support",
            desc: "Connect with blood donors, caretakers, and ambulances in real-time."
        },
        {
            icon: <Globe className="w-8 h-8 text-green-500" />,
            title: "Global Transparency",
            desc: "Simulated blockchain ledger allows anyone to track every penny donated."
        }
    ];

    return (
        <div className="relative overflow-x-hidden min-h-screen">
            {/* Background Orbs */}
            <div className="absolute top-0 -left-10 w-72 h-72 md:w-96 md:h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-10 w-72 h-72 md:w-96 md:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-20 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-4000"></div>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
                <div className="section-container">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-10"
                        >
                            <div className="inline-flex items-center space-x-3 px-5 py-2.5 bg-white shadow-sm border border-slate-100 rounded-full">
                                <span className="flex h-2 w-2 rounded-full bg-primary-600 animate-pulse"></span>
                                <span className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                    Revolutionizing Healthcare
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1] tracking-[-0.04em] text-slate-900 uppercase">
                                Connecting <span className="text-primary-600 italic">Hearts</span>, <br className="hidden md:block" />
                                Saving <span className="text-primary-600">Lives</span>.
                            </h1>

                            <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-xl font-medium">
                                LifeLink+ is an advanced ecosystem for healthcare crowdfunding, 
                                volunteer networking, and AI-driven medical assistance. 
                                Transparency you can trust, support you can feel.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                                <Link to="/campaigns" className="btn-primary w-full sm:w-auto gap-3">
                                    <span>Explore Missions</span>
                                    <ArrowRight className="w-5 h-5 flex-shrink-0" />
                                </Link>
                                <Link to="/emergency" className="btn-secondary w-full sm:w-auto group">
                                    <AlertCircle className="w-5 h-5 mr-3 text-red-500 group-hover:animate-pulse" />
                                    <span>Emergency help</span>
                                </Link>
                            </div>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-10 lg:gap-14 pt-2 w-full lg:w-auto">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-black text-slate-900 leading-none">10k+</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Lives Saved</span>
                                </div>
                                <div className="h-10 w-px bg-slate-100 hidden sm:block"></div>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-black text-slate-900 leading-none">₹150Cr+</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Funded</span>
                                </div>
                                <div className="h-10 w-px bg-slate-100 hidden sm:block"></div>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-black text-slate-900 leading-none">100k</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Volunteers</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="lg:w-1/2 relative w-full max-w-2xl"
                        >
                            <div className="relative z-10 animate-float">
                                <img 
                                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070" 
                                    alt="Healthcare Support" 
                                    className="rounded-[2.5rem] shadow-[0_48px_100px_-24px_rgba(0,0,0,0.15)] border-8 border-white object-cover aspect-video lg:aspect-square"
                                />
                            </div>
                            {/* Floating Stats */}
                            <div className="absolute -top-12 -right-4 glass p-6 rounded-3xl shadow-xl z-20 hidden md:block animate-float animation-delay-1000">
                                <div className="flex items-center space-x-4">
                                    <Activity className="w-10 h-10 text-primary-600 p-2 bg-primary-50 rounded-xl" />
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Status</p>
                                        <p className="text-sm font-black text-slate-900">143 Active Needs</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-8 -left-4 glass p-6 rounded-3xl shadow-xl z-20 hidden md:block animate-float animation-delay-2000">
                                <div className="flex items-center space-x-4">
                                    <ShieldCheck className="w-10 h-10 text-green-500 p-2 bg-green-50 rounded-xl" />
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trust Engine</p>
                                        <p className="text-sm font-black text-slate-900">99.9% Verified</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Features Grid */}
            <section id="how-it-works" className="py-24">
                <div className="section-container">
                    <div className="text-center mb-20 space-y-6">
                        <h2 className="text-4xl lg:text-6xl font-black text-slate-900 uppercase tracking-tight">Support Ecosystem</h2>
                        <div className="h-1.5 w-24 bg-primary-600 mx-auto rounded-full"></div>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">Beyond money, we provide a network that saves lives when every second counts.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                        {features.map((feature, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ y: -12 }}
                                className="card group cursor-pointer border-none shadow-none hover:shadow-2xl hover:bg-white transition-all duration-500"
                            >
                                <div className="bg-slate-50 p-6 rounded-3xl inline-block mb-10 group-hover:bg-primary-50 transition-colors w-fit">
                                    {React.cloneElement(feature.icon, { className: "w-10 h-10 group-hover:scale-110 transition-transform" })}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">{feature.title}</h3>
                                <p className="text-slate-500 text-base leading-relaxed font-medium">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Emergency CTA */}
            <section id="emergency-help" className="py-24 mb-20">
                <div className="section-container">
                    <div className="bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-24 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600 opacity-20 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                            <div className="lg:w-3/5 space-y-10 flex flex-col items-center lg:items-start text-center lg:text-left">
                                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight uppercase tracking-tighter">
                                    One-Click <br /> <span className="text-primary-500 underline underline-offset-8">Emergency</span>
                                </h2>
                                <p className="text-xl text-slate-400 max-w-xl font-medium">In extreme cases, speed saves lives. Upload medical documents and start raising funds instantly with our professional emergency system.</p>
                                <Link to="/emergency" className="btn-primary bg-white text-slate-900 hover:bg-slate-100 py-6 px-12 text-lg w-full sm:w-auto shadow-2xl">
                                    <span>Launch Emergency Support</span>
                                    <ArrowRight className="w-6 h-6 ml-4" />
                                </Link>
                            </div>
                            <div className="lg:w-2/5 w-full max-w-md">
                                <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[2rem] border border-white/10 space-y-10">
                                    <div className="space-y-6">
                                        {[
                                            { step: 1, text: "Upload Medical Doc" },
                                            { step: 2, text: "Set Goal & Target" },
                                            { step: 3, text: "Automated Verification" },
                                            { step: 4, text: "Go Live Instantly" }
                                        ].map((item) => (
                                            <div key={item.step} className="flex items-center space-x-6 group">
                                                <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center text-white font-black text-xl group-hover:scale-110 transition-transform">
                                                    {item.step}
                                                </div>
                                                <span className="text-lg font-black uppercase tracking-[0.1em] text-slate-200">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
