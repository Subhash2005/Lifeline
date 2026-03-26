import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 lg:py-20 px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
            >
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-2xl text-primary-600 mb-4">
                        <Shield className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">Privacy Policy</h1>
                    <p className="text-slate-500 text-lg">Last Updated: March 2026</p>
                </div>

                <div className="glass p-8 lg:p-12 rounded-[2rem] space-y-10 border-slate-200 shadow-xl">
                    <section className="space-y-4">
                        <div className="flex items-center space-x-3 text-primary-600">
                            <Lock className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">1. Information We Collect</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            We collect information you provide directly to us when you create an account, start a campaign, or make a donation. This includes your name, email address, medical documentation (for campaign verification), and payment information handled securely via our partners.
                        </p>
                    </section> section

                    <section className="space-y-4">
                        <div className="flex items-center space-x-3 text-primary-600">
                            <Eye className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">2. How We Use Your Data</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            Your data is used to verify the legitimacy of campaigns, process life-saving donations, and keep you updated on the progress of causes you support. We never sell your personal information to third parties.
                        </p>
                        <ul className="list-disc list-inside text-slate-500 space-y-2 pl-4">
                            <li>To verify identity and prevent fraud</li>
                            <li>To facilitate peer-to-peer donations</li>
                            <li>To provide transparency through our blockchain ledger</li>
                            <li>To improve our AI trust engine algorithms</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center space-x-3 text-primary-600">
                            <Shield className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">3. Data Security</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            LifeLink+ uses industry-standard encryption and security protocols to project your sensitive medical and financial data. For maximum transparency and security, donation records are logged on a simulated blockchain ledger.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center space-x-3 text-primary-600">
                            <FileText className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">4. Your Rights</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            You have the right to access, update, or delete your personal information at any time via your dashboard. If you have any concerns regarding your privacy, please contact our support team.
                        </p>
                    </section>
                </div>

                <div className="bg-primary-50 rounded-3xl p-8 border border-primary-100 text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Have privacy questions?</h3>
                    <p className="text-slate-600 mb-6">Our security team is here to help you understand how we protect your life-saving data.</p>
                    <a 
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=privacy@lifelinkplus.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-primary inline-block"
                    >
                        Contact Privacy Team
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicy;
