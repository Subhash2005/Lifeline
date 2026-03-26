import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
    Briefcase, TrendingUp, ShieldCheck, 
    Hexagon, Globe, BarChart3, PieChart,
    Users, DollarSign, Building2, 
    ArrowUpRight, Share2, Award, Gem,
    PlusCircle, Activity, LayoutDashboard,
    Loader2, Target, Zap, Clock, FileText,
    ShieldAlert, Sparkles, Building, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const CSRDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [csrStats, setCsrStats] = useState({
        totalAllocated: 50000,
        totalSpent: 12450,
        taxSavings: 3735,
        impactMultiplier: 2.4,
        livesImpacted: 142
    });

    const [supportedCampaigns, setSupportedCampaigns] = useState([]);

    useEffect(() => {
        if (!user || user.role !== 'corporate') {
            toast.error('Access restricted to Corporate Partners');
            navigate('/dashboard');
            return;
        }

        const fetchCSRData = async () => {
             try {
                 const res = await api.get('/campaigns');
                 if (res.data.success) {
                    // Mocking some as "supported"
                    setSupportedCampaigns(res.data.data.slice(0, 3));
                 }
             } catch (err) {
                 toast.error('Failed to sync corporate impact grid');
             } finally {
                 setLoading(false);
             }
        };
        fetchCSRData();
    }, [user, navigate]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-60">
                 <Loader2 className="w-20 h-20 text-indigo-600 animate-spin" />
                 <p className="mt-6 text-slate-400 font-extrabold uppercase tracking-widest text-xs animate-pulse">Establishing Corporate Node Link...</p>
            </div>
        );
    }

    return (
        <div className="space-y-16 py-12 px-4 max-w-7xl mx-auto overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-100/50 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-blob"></div>
            <div className="absolute bottom-40 left-0 w-[30rem] h-[30rem] bg-primary-100/50 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-blob animation-delay-4000"></div>

            {/* Corporate Profile Header */}
            <header className="relative bg-white/80 backdrop-blur-3xl p-12 lg:p-20 rounded-[4rem] shadow-2xl border border-white/50 space-y-12 group overflow-hidden">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-50 rounded-full opacity-50 group-hover:scale-125 transition-all duration-1000"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                     <div className="flex flex-col md:flex-row items-center gap-10">
                         <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-indigo-900 to-indigo-600 flex items-center justify-center text-white shadow-3xl border-6 border-white transform hover:rotate-6 transition-all ring-12 ring-indigo-50">
                             <Building className="w-12 h-12" />
                         </div>
                         <div className="space-y-4 text-center md:text-left">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                <h1 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight uppercase font-mono">{user?.name}</h1>
                                <div className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center space-x-2 shadow-indigo-200">
                                    <ShieldCheck className="w-4 h-4 fill-white text-indigo-600" />
                                    <span>Verified CSR Partner</span>
                                </div>
                            </div>
                            <p className="max-w-xl text-lg text-slate-500 font-medium leading-relaxed italic opacity-80 decoration-indigo-200 underline underline-offset-8">
                                Managing healthcare philanthropy and transparency proofing for global human impact.
                            </p>
                         </div>
                     </div>
                     <div className="flex flex-col items-center lg:items-end gap-6">
                         <div className="text-center lg:text-right space-y-1">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global ESG Rating</p>
                             <div className="flex items-center space-x-2">
                                <div className="flex -space-x-1">
                                    {[1,2,3,4,5].map(i => <Star key={i} className={`w-5 h-5 fill-indigo-600 text-indigo-600`} />)}
                                </div>
                                <span className="text-xl font-black text-slate-900 uppercase tracking-tighter ml-2">A+ Platinum</span>
                             </div>
                         </div>
                         <button onClick={() => navigate('/ledger')} className="btn-primary py-5 px-10 bg-indigo-600 hover:bg-indigo-800 rounded-3xl text-sm font-black flex items-center space-x-3 shadow-indigo-100 transform active:scale-95 transition-all">
                             <span>Verify Transparency Nodes</span>
                             <Hexagon className="w-5 h-5 animate-spin-slow" />
                         </button>
                     </div>
                </div>

                {/* Key Metrics Strip */}
                <div className="relative z-10 flex flex-wrap gap-12 pt-10 border-t border-slate-100 text-slate-400 font-black uppercase tracking-widest text-xs">
                    <div className="flex items-center space-x-3">
                        <Activity className="w-5 h-5 text-indigo-500" />
                        <span>Real-time Multiplier Active</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-primary-500" />
                        <span>UN SDG-3 Alignment: 92%</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-green-500" />
                        <span>Automated G-Audit Ready</span>
                    </div>
                </div>
            </header>

            {/* Financial Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Metric 1 */}
                <div className="card p-12 rounded-[4rem] bg-indigo-50 border border-indigo-100 shadow-xl group hover:shadow-indigo-100 transition-all text-center space-y-6">
                     <p className="text-sm font-black text-indigo-400 uppercase tracking-[0.25em]">CSR Allocation (₹)</p>
                     <h3 className="text-5xl lg:text-7xl font-black text-indigo-900 tracking-tighter leading-tight italic">
                         {csrStats.totalAllocated.toLocaleString()}
                     </h3>
                     <div className="flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                         <Target className="w-4 h-4" />
                         <span>Fiscal Year 2026</span>
                     </div>
                </div>

                {/* Metric 2 */}
                <div className="card p-12 rounded-[4rem] bg-white border border-slate-100 shadow-xl group hover:shadow-primary-100 transition-all text-center space-y-10 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-full opacity-50 -mr-12 -mt-12 group-hover:scale-150 transition-all"></div>
                     <div className="space-y-4">
                        <p className="text-sm font-black text-slate-400 uppercase tracking-[0.25em]">Impact Dispatched</p>
                        <h3 className="text-5xl lg:text-7xl font-black text-primary-600 tracking-tighter italic">
                             {((csrStats.totalSpent / csrStats.totalAllocated) * 100).toFixed(1)}%
                        </h3>
                     </div>
                     <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                         <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(csrStats.totalSpent / csrStats.totalAllocated) * 100}%` }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-full bg-primary-500 rounded-full shadow-lg"
                         ></motion.div>
                     </div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Recently spent: ₹2,400 in Emergency Grid</span>
                     </p>
                </div>

                {/* Metric 3 */}
                <div className="card p-12 rounded-[4rem] bg-slate-900 border-none shadow-3xl text-white text-center space-y-8 relative overflow-hidden group">
                     <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-600 rounded-full opacity-10 group-hover:scale-150 transition-all duration-1000"></div>
                     <div className="space-y-2 relative z-10">
                        <p className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] mb-4">Accrued Tax Benefits</p>
                        <h3 className="text-5xl lg:text-7xl font-black text-white tracking-tighter italic shadow-sm">
                             ₹{csrStats.taxSavings.toLocaleString()}
                        </h3>
                     </div>
                     <div className="p-6 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-lg relative z-10">
                         <div className="flex items-center justify-between space-x-4 mb-4">
                            <span className="text-[10px] font-black uppercase text-indigo-300">Multiplier Effect</span>
                            <span className="text-xl font-black text-indigo-400 underline decoration-indigo-700 underline-offset-4">{csrStats.impactMultiplier}x</span>
                         </div>
                         <p className="text-xs text-slate-400 font-bold leading-relaxed italic pr-4">Every rupee you spend generates ₹2.4 worth of healthcare ecosystem value.</p>
                     </div>
                </div>
            </div>

            {/* Impact Grid Section */}
            <div className="space-y-12">
                 <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none flex items-center justify-center md:justify-start space-x-4 uppercase font-mono">
                            <BarChart3 className="w-10 h-10 text-indigo-600" />
                            <span>Supported Missions</span>
                        </h2>
                        <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] ml-1">Immutable proof of corporate philantropy</p>
                    </div>
                    <button onClick={() => navigate('/campaigns')} className="btn-secondary py-5 px-10 rounded-3xl text-xs font-black uppercase tracking-widest border border-slate-200 bg-white hover:bg-slate-50 transition-all flex items-center space-x-3">
                         <span>Allocated More Funds</span>
                         <PlusCircle className="w-4 h-4" />
                    </button>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                     {supportedCampaigns.map((c, idx) => (
                        <motion.div 
                            key={c._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="card p-0 rounded-[3.5rem] bg-white border border-slate-100 shadow-xl overflow-hidden group hover:border-indigo-300 transition-all"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img src={c.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={c.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-8 flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 text-white">
                                        <Award className="w-5 h-5 fill-white" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Corporate Pick</span>
                                </div>
                            </div>
                            <div className="p-10 space-y-8 flex flex-col h-[calc(100%-12rem)]">
                                <div className="space-y-2">
                                    <Link to={`/campaign/${c._id}`} className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-all leading-tight tracking-tight uppercase font-mono">
                                        {c.title}
                                    </Link>
                                    <div className="flex items-center space-x-4 pt-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-slate-400">{c.disease}</span>
                                        <span className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-indigo-500">
                                            <ShieldCheck className="w-3.5 h-3.5" />
                                            <span>Validation Lock</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-2 border-t border-slate-50 mt-auto">
                                     <div className="flex justify-between items-center bg-indigo-50/50 p-5 rounded-[2rem] border border-indigo-50">
                                         <div>
                                             <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">Impact Contributed</p>
                                             <p className="text-xl font-black text-indigo-900 tracking-tight leading-tight">₹4,200</p>
                                         </div>
                                         <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600 border border-indigo-100">
                                             <PieChart className="w-5 h-5" />
                                         </div>
                                     </div>
                                     <button className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 bg-white border-2 border-dashed border-indigo-100 rounded-2xl hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm">
                                         Acquire Impact Certificate
                                     </button>
                                </div>
                            </div>
                        </motion.div>
                     ))}
                     
                     {/* Empty Slot for Motivation */}
                     <div className="card p-12 rounded-[3.5rem] border-4 border-dashed border-indigo-50 bg-indigo-50/30 flex flex-col items-center justify-center text-center space-y-8 group transition-all hover:bg-white hover:border-indigo-200 shadow-none hover:shadow-2xl">
                          <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-indigo-600 transform group-hover:rotate-12 group-hover:scale-110 transition-all">
                              <Zap className="w-10 h-10 fill-indigo-600" />
                          </div>
                          <div className="space-y-4">
                              <h3 className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tight">Expand Your Impact <br />Footprint.</h3>
                              <p className="text-xs text-slate-400 font-bold leading-relaxed italic px-6">Allocation balance remaining: ₹37,550. Save 14 more lives to unlock Gold Tier ESG badge.</p>
                          </div>
                          <button onClick={() => navigate('/campaigns')} className="w-full py-5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-3xl shadow-xl transform active:scale-95 transition-all">
                              View High Priority Cases
                          </button>
                     </div>
                 </div>
            </div>

            {/* Corporate Summary & Analytics */}
            <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-white relative overflow-hidden group shadow-3xl">
                 <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-600 rounded-full opacity-10 filter blur-[150px] -mr-[20rem] -mt-[20rem] group-hover:scale-125 transition-all duration-1000"></div>
                 
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
                     <div className="space-y-12">
                         <div className="space-y-4">
                            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-300 border border-white/10">
                                <Activity className="w-4 h-4" />
                                <span>Advanced Impact Modeling</span>
                            </div>
                            <h2 className="text-4xl lg:text-7xl font-black tracking-tighter leading-[0.9] uppercase italic">
                                Healthcare <br /> Ecosystem <br /> <span className="text-indigo-500">Multiplier.</span>
                            </h2>
                         </div>
                         <p className="text-slate-400 font-medium leading-relaxed italic pr-20 text-lg decoration-indigo-800 underline underline-offset-8">
                             Your corporate contributions are automatically mapped against the UN Sustainable Development Goal 3. 
                             We provide real-time auditing and verification of every cent dispatched.
                         </p>
                         <div className="flex flex-wrap gap-8">
                             <div className="flex items-center space-x-4">
                                 <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl">
                                     <LayoutDashboard className="w-6 h-6" />
                                 </div>
                                 <div className="space-y-0.5">
                                     <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Audit Nodes</p>
                                     <p className="text-xl font-black tracking-tight">14 Active</p>
                                 </div>
                             </div>
                             <div className="flex items-center space-x-4">
                                 <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center text-white shadow-xl">
                                     <Sparkles className="w-6 h-6" />
                                 </div>
                                 <div className="space-y-0.5">
                                     <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Validation Speed</p>
                                     <p className="text-xl font-black tracking-tight">&lt; 2.4s</p>
                                 </div>
                             </div>
                         </div>
                     </div>

                     <div className="card p-12 lg:p-20 rounded-[4rem] bg-indigo-600 border-none shadow-3xl flex flex-col items-center justify-center text-center space-y-12 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full opacity-50 -mr-40 -mt-40 blur-3xl"></div>
                          <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center text-indigo-600 shadow-2xl relative z-10 animate-pulse">
                              <ShieldAlert className="w-10 h-10" />
                          </div>
                          <div className="space-y-4 relative z-10">
                              <h3 className="text-3xl font-black tracking-tight leading-tight uppercase font-mono">Generate Full <br />Fiscal Report</h3>
                              <p className="text-sm font-bold text-indigo-100 italic leading-relaxed px-4 opacity-80">Download a comprehensive PDF containing all impact verification certificates, tax receipts, and ledger hashes for your annual board meeting.</p>
                          </div>
                          <button className="w-full btn-primary py-6 bg-white text-indigo-900 hover:bg-slate-50 border-none rounded-[2.5rem] text-xl font-black shadow-none flex items-center justify-center space-x-4 transition-all transform active:scale-95 group relative z-10 font-mono italic">
                              <span>Acquire Report</span>
                              <ArrowUpRight className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </button>
                     </div>
                 </div>
            </div>
        </div>
    );
};

export default CSRDashboard;
