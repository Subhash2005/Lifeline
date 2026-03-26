import React from 'react';
import { Heart, ShieldCheck, Mail, Activity, ArrowRight, UserCheck, AlertOctagon, Scale, Disc, Fingerprint, Eye, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const CookiePolicy = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 lg:py-20 px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
            >
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-2xl text-primary-600 mb-4">
                        <Disc className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">Cookie Policy</h1>
                    <p className="text-slate-500 text-lg">Last Updated: March 2026</p>
                </div>

                <div className="glass p-8 lg:p-12 rounded-[2rem] space-y-12 border-slate-200 shadow-xl">
                    <section className="space-y-4">
                        <div className="flex items-center space-x-3 text-primary-600">
                            <Fingerprint className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">1. What are Cookies?</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            Cookies are small data files stored on your browser when you visit LifeLink+. They help us remember your session, customize your dashboard, and keep your life-saving donations secure.
                        </p>
                    </section> section

                    <section className="space-y-4">
                        <div className="flex items-center space-x-3 text-primary-600">
                            <Eye className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">2. How We Use Cookies</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            LifeLink+ uses cookies to enhance your experience and maintain platform integrity. We categorize them as follows:
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                <div className="flex items-center space-x-2 text-slate-800 font-bold mb-2">
                                    <Database className="w-4 h-4 text-primary-600" />
                                    <span>Essential Cookies</span>
                                </div>
                                <p className="text-sm text-slate-500">Necessary for the platform to function, such as authentication and secure login.</p>
                            </div>
                             <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                <div className="flex items-center space-x-2 text-slate-800 font-bold mb-2">
                                    <Activity className="w-4 h-4 text-healthcare-green" />
                                    <span>Analytics Cookies</span>
                                </div>
                                <p className="text-sm text-slate-500">Help us understand how users interact with campaigns to improve our trust algorithms.</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center space-x-3 text-primary-600">
                            <Heart className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">3. Managing Your Preferences</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            You can choose to disable cookies through your browser settings, although some life-saving features of the platform may not function correctly as a result. By continuing to use LifeLink+, you consent to our use of cookies as described in this policy.
                        </p>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};

export default CookiePolicy;
