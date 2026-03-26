import React from 'react';
import { Heart, ShieldCheck, Mail, Activity, ArrowRight, UserCheck, AlertOctagon, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 lg:py-20 px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
            >
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-2xl text-primary-600 mb-4">
                        <Scale className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">Terms of Service</h1>
                    <p className="text-slate-500 text-lg">Last Updated: March 2026</p>
                </div>

                <div className="glass p-8 lg:p-12 rounded-[2rem] space-y-12 border-slate-200 shadow-xl">
                    <section className="space-y-4">
                        <div className="flex items-center space-x-3 text-primary-600">
                            <Heart className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">1. Our Commitment</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            LifeLink+ is a mission-driven ecosystem dedicated to transparency and saving lives. By using our platform, you agree to engage in honest, ethical fundraising and support of healthcare causes.
                        </p>
                    </section> section

                    <section className="space-y-4">
                        <div className="flex items-center space-x-3 text-primary-600">
                            <UserCheck className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">2. User Conduct & Verification</h2>
                        </div>
                   <p className="text-slate-600 leading-relaxed">
                            All campaigns must be verified by medical documentation and undergo our AI trust analysis. Providing false information or attempting to misdirect funds is strictly prohibited and results in immediate account termination.
                        </p>
                    </section>

                    <section className="space-y-4 border-l-4 border-healthcare-red pl-6 py-2 bg-healthcare-red/5 rounded-r-2xl">
                        <div className="flex items-center space-x-3 text-healthcare-red">
                            <AlertOctagon className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">3. Prohibited Activities</h2>
                        </div>
                        <ul className="list-disc list-inside text-slate-600 space-y-2 pl-4 mt-4">
                            <li>Fundraising for non-healthcare purposes</li>
                            <li>Misrepresenting medical conditions or costs</li>
                            <li>Attempting to manipulate the transparency ledger</li>
                            <li>Harassing donors or volunteers</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center space-x-3 text-primary-600">
                            <ShieldCheck className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">4. Trust & Platform Integrity</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            LifeLink+ reserves the right to suspend any campaign or account that violates our trust standards. Our community depends on the honesty and integrity of every participant.
                        </p>
                    </section>

                    <section className="space-y-4 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="space-y-1">
                            <p className="font-bold text-slate-900">Questions about our terms?</p>
                            <p className="text-sm text-slate-500">Contact our compliance team for clarity.</p>
                        </div>
                        <a 
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=legal@lifelinkplus.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-secondary py-3 px-6 text-sm flex items-center space-x-2"
                        >
                            <span>Email Compliance Desk</span>
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};

export default TermsOfService;
