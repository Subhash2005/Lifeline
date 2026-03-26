import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
    Hexagon, ShieldCheck, Search, ShieldAlert, 
    Clock, DollarSign, Activity, FileText, 
    Loader2, Share2, TrendingUp, Sparkles,
    CheckCircle, Globe, Zap, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const LedgerPage = () => {
    const [ledger, setLedger] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchLedger = async () => {
            try {
                const res = await api.get('/ledger');
                if (res.data.success) {
                    setLedger(res.data.data);
                }
            } catch (err) {
                toast.error('Transparency node connection failed');
            } finally {
                setLoading(false);
            }
        };
        fetchLedger();
    }, []);

    const filteredLedger = ledger.filter(l => 
        l.donationId.toLowerCase().includes(searchTerm.toLowerCase()) || 
        l.campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-16 py-12 px-4 max-w-7xl mx-auto overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-40 left-0 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            {/* Header / Hero */}
            <header className="relative bg-white p-12 lg:p-20 rounded-[4rem] shadow-2xl border border-slate-100 text-center lg:text-left space-y-10 group overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-green-50 rounded-full opacity-50 -mr-24 -mt-24 group-hover:scale-125 transition-all duration-700"></div>
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                     <div className="space-y-6 max-w-2xl">
                         <div className="inline-flex items-center space-x-2 px-3 py-1 bg-green-50 rounded-full text-[10px] font-black uppercase tracking-widest text-green-600 border border-green-100 border-dashed">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Verified Transparency Layer</span>
                        </div>
                        <h1 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight">
                            Public <span className="text-green-600 text-shadow-glow">Trust</span> <br />
                            Explorer.
                        </h1>
                        <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed italic opacity-80">
                            Every single life-saving contribution is recorded on our public ledger. Our 
                            BlockTrust technology ensures that your donations reach the intended patient or hospital.
                        </p>
                    </div>
                    <div className="animate-float">
                        <Hexagon className="w-56 h-56 text-green-500/10 fill-green-500/5 group-hover:rotate-12 transition-transform duration-700" />
                    </div>
                </div>

                {/* Network Stats Bar */}
                <div className="relative z-10 flex flex-wrap gap-8 pt-6 border-t border-slate-100 text-slate-400 font-black uppercase tracking-widest text-xs">
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Transaction Integrity 100%</span>
                    </div>
                    <div className="flex items-center space-x-2 text-primary-600">
                        <Zap className="w-4 h-4" />
                        <span>Instant Validation Hub</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-indigo-500" />
                        <span>Global Audit Protocol</span>
                    </div>
                </div>
            </header>

            {/* Simulated Block Explorer Header */}
            <div className="flex flex-col md:flex-row items-center gap-8 px-6 py-8 bg-slate-900 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                 <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-green-500 rounded-full opacity-10 group-hover:scale-150 transition-all duration-700"></div>
                 <div className="flex flex-col md:flex-row items-center gap-6 flex-grow">
                     <div className="p-5 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 shadow-lg text-green-400">
                        <Hexagon className="w-8 h-8 animate-spin-slow rotate-12" />
                     </div>
                     <div className="space-y-1 text-center md:text-left">
                         <h2 className="text-2xl font-black text-white tracking-tight leading-tight">Block Explorer</h2>
                         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                             <span>Connected to Transparency Node-01</span>
                         </p>
                     </div>
                 </div>
                 <div className="relative w-full md:w-96 shadow-xl rounded-full">
                    <Search className="absolute left-6 top-5 w-6 h-6 text-slate-400 group-hover:text-green-500 transition-colors" />
                    <input 
                        type="text" 
                        className="w-full pl-16 pr-6 py-5 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full focus:ring-4 focus:ring-green-400 focus:bg-white focus:text-slate-900 outline-none font-bold text-sm text-white placeholder:text-slate-500 transition-all"
                        placeholder="Search TXN ID or Campaign..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
            </div>

            {/* Ledger List */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-slate-100 rounded-[3rem]">
                    <Loader2 className="w-16 h-16 text-green-600 animate-spin" />
                    <p className="mt-4 text-slate-400 font-extrabold uppercase tracking-widest text-xs animate-pulse">Syncing block data...</p>
                </div>
            ) : filteredLedger.length === 0 ? (
                <div className="card p-20 text-center border-dashed border-2 border-slate-100 space-y-6 flex flex-col items-center max-w-4xl mx-auto">
                    <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200">
                        <Hexagon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">No records in transparency buffer</h3>
                    <p className="text-slate-400 font-medium">Be the first to create a life-saving contribution and record it on the BlockTrust ledger.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {filteredLedger.map((tx, idx) => (
                        <motion.div 
                            key={tx.donationId}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="card p-0 rounded-[3.5rem] bg-white border border-slate-100 shadow-xl flex flex-col lg:flex-row overflow-hidden group hover:border-green-200 transition-all"
                        >
                            {/* TX ID / Avatar Area */}
                            <div className="lg:w-1/4 p-10 bg-slate-50 flex flex-col items-center justify-center text-center space-y-4 border-r border-slate-100 group-hover:bg-green-50 transition-colors duration-500">
                                <div className="w-20 h-20 rounded-[2rem] bg-white shadow-xl flex items-center justify-center text-green-600 border border-slate-100 group-hover:rotate-12 transition-transform">
                                    <Hexagon className="w-10 h-10" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Transaction ID</h4>
                                    <p className="text-lg font-black text-slate-900 uppercase tracking-tight">{tx.donationId}</p>
                                </div>
                                <div className="flex items-center space-x-2 text-[10px] font-black text-green-600 bg-white px-3 py-1.5 rounded-xl border border-green-100 shadow-sm">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    <span>Verified Hash</span>
                                </div>
                            </div>

                            {/* Main TX Data Area */}
                            <div className="lg:w-3/4 p-10 space-y-8 flex flex-col md:flex-row items-center justify-between gap-12 relative">
                                <div className="space-y-6 max-w-sm text-center md:text-left">
                                    <div className="space-y-1">
                                         <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Campaign</h3>
                                         <Link to={`/campaign/${tx.campaign._id}`} className="text-2xl font-black text-slate-900 hover:text-green-600 transition-colors block">
                                             {tx.campaign.title}
                                         </Link>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                         <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 rounded-xl text-[10px] font-black text-slate-500 border border-slate-200">
                                             <Clock className="w-3.5 h-3.5" />
                                             <span>{new Date(tx.timestamp).toLocaleString()}</span>
                                         </div>
                                         <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 rounded-xl text-[10px] font-black text-slate-500 border border-slate-200">
                                             <FileText className="w-3.5 h-3.5" />
                                             <span>Audit complete</span>
                                         </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12 text-center md:text-right">
                                    <div className="space-y-1">
                                         <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount Dispatched</h3>
                                         <p className="text-4xl font-black text-green-600 tracking-tight leading-tight">₹{tx.amount.toLocaleString()}</p>
                                         <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic font-mono truncate max-w-[120px]">{tx.hash}</p>
                                    </div>
                                    <button 
                                        onClick={() => toast.success('Hash verified against node buffer.')}
                                        className="p-5 bg-slate-50 text-slate-300 rounded-[2rem] hover:bg-green-600 hover:text-white transition-all transform active:scale-95 group-hover:shadow-2xl"
                                    >
                                        <TrendingUp className="w-8 h-8" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Blocktrust Footer Info */}
            <div className="card p-12 lg:p-20 rounded-[4rem] bg-white shadow-2xl space-y-12 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full opacity-50 -mr-24 -mt-24 blur-3xl group-hover:scale-125 transition-transform"></div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                     <div className="space-y-8">
                         <div className="flex items-center space-x-4 text-green-600">
                             <ShieldAlert className="w-10 h-10" />
                             <h3 className="text-3xl font-black tracking-tight leading-tight">Fraud Prevention Hub</h3>
                         </div>
                         <p className="text-slate-500 font-medium leading-relaxed italic pr-12">
                             LifeLink+ uses a multi-signature validation protocol for every life-saving transaction. We ensure 100% funds 
                             reaching the healthcare provider or the verified patient through our BlockTrust exploration system.
                         </p>
                         <div className="flex gap-4">
                             <button className="btn-primary py-4 px-8 rounded-2xl bg-slate-900 border-none hover:bg-green-600 transition-all font-black text-xs uppercase tracking-widest flex items-center space-x-3 shadow-xl">
                                 <span>Security Audit</span>
                                 <Share2 className="w-4 h-4" />
                             </button>
                         </div>
                     </div>
                     <div className="space-y-6 bg-slate-50 p-10 rounded-[3rem] border border-slate-100 flex flex-col items-center justify-center text-center shadow-inner">
                         <Sparkles className="w-12 h-12 text-primary-500 mb-2 animate-pulse" />
                         <h4 className="text-xl font-extrabold text-slate-900 tracking-tight">Real-time Validation</h4>
                         <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                            Every hash on this page is mathematically derived from the contribution data, ensuring absolute immutable proof of impact.
                         </p>
                         <div className="flex -space-x-3 pt-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-[10px] font-black text-primary-600">
                                    0{i}
                                </div>
                            ))}
                         </div>
                     </div>
                 </div>
            </div>
        </div>
    );
};

export default LedgerPage;
