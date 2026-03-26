import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
    Activity, Heart, TrendingUp, Search, 
    ArrowUpRight, Clock, PlusCircle, 
    ShieldCheck, Award, Users, DollarSign,
    Loader2, MoreHorizontal, FileText,
    Zap, Gem, Target, LogOut, Share2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalDonations: 0,
        myCampaigns: 0,
        impactScore: 0,
        livesTouched: 0
    });
    const [userCampaigns, setUserCampaigns] = useState([]);
    const [pendingVerifications, setPendingVerifications] = useState([]);
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchDashData = async () => {
            try {
                const camRes = await api.get('/campaigns');
                if (camRes.data.success) {
                    const allCams = camRes.data.data;
                    const myCams = allCams.filter(c => c.user?._id === user?._id || c.createdBy === user?._id);
                    setUserCampaigns(myCams);
                    setStats(prev => ({ ...prev, myCampaigns: myCams.length }));

                    if (user.role === 'doctor') {
                        const pending = allCams.filter(c => !c.isVerified && c.user?._id !== user?._id);
                        setPendingVerifications(pending);
                    }
                }

                setStats(prev => ({
                    ...prev,
                    totalDonations: user.totalDonated || 0,
                    impactScore: user.impactScore || 0,
                    livesTouched: Math.floor((user.totalDonated || 0) / 100)
                }));
            } catch (err) {
                console.error('Failed to fetch dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashData();
    }, [user, navigate]);

    const handleVerify = async (id) => {
        try {
            const res = await api.put(`/campaigns/${id}/verify`);
            if (res.data.success) {
                toast.success('Campaign verified successfully! 🩺');
                setPendingVerifications(prev => prev.filter(c => c._id !== id));
            }
        } catch (err) {
            toast.error('Failed to verify campaign');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-60">
                <Loader2 className="w-16 h-16 text-primary-600 animate-spin" />
                <p className="mt-4 text-slate-400 font-extrabold uppercase tracking-widest text-xs animate-pulse">Syncing your impact grid...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 pb-32 pt-24 lg:pt-32 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob pointer-events-none"></div>
            <div className="absolute bottom-40 left-0 w-[40rem] h-[40rem] bg-indigo-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

            <div className="section-container space-y-12 md:space-y-16 lg:space-y-20 relative z-10">
                {/* Top Bar - Profile Summary */}
                <header className="flex flex-col lg:flex-row items-center justify-between gap-10 bg-white p-8 md:p-12 lg:px-20 lg:py-16 rounded-[2rem] md:rounded-[4rem] shadow-2xl border border-slate-100 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-3 h-full bg-primary-600/5 group-hover:bg-primary-600/10 transition-colors"></div>
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full lg:w-auto text-center md:text-left">
                        <div className="relative group/avatar">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center text-white shadow-2xl border-4 border-white transform group-hover/avatar:-rotate-6 transition-all duration-500">
                                <span className="text-4xl md:text-5xl font-black">{user?.name[0]}</span>
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center">
                                <ShieldCheck className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex flex-col md:flex-row items-center md:items-baseline gap-4">
                                <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase leading-none">{user?.name}</h1>
                                <span className="bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary-100">
                                    {user?.role || 'Lifesaver'}
                                </span>
                            </div>
                            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center md:justify-start gap-3">
                                <Activity className="w-4 h-4 text-primary-500" />
                                <span>Impact Grid Synchronized • {new Date().getFullYear()}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-5 w-full lg:w-auto">
                        <button onClick={() => navigate('/create')} className="btn-primary w-full sm:w-auto py-5 px-12 rounded-2xl md:rounded-3xl shadow-primary-500/20">
                            <PlusCircle className="w-6 h-6 mr-3" />
                            <span>New Mission</span>
                        </button>
                        <button onClick={logout} className="p-5 md:p-6 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-2xl md:rounded-3xl transition-all border border-slate-100 shadow-sm w-full sm:w-auto flex items-center justify-center">
                            <LogOut className="w-6 h-6" />
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {[
                        { label: 'Impact Score', value: stats.impactScore, icon: Award, color: 'text-orange-500', bg: 'bg-orange-50' },
                        { label: 'Total Donated', value: `₹${stats.totalDonations}`, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-50' },
                        { label: 'My Missions', value: stats.myCampaigns, icon: Target, color: 'text-primary-500', bg: 'bg-primary-50' },
                        { label: 'Lives Saved', value: stats.livesTouched, icon: Heart, color: 'text-red-500', bg: 'bg-red-50' }
                    ].map((s, idx) => (
                        <motion.div 
                            key={idx}
                            whileHover={{ y: -12 }}
                            className="card group cursor-default"
                        >
                            <div className={`p-5 ${s.bg} ${s.color} rounded-2xl w-16 h-16 flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 transition-transform`}>
                                <s.icon className="w-8 h-8" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{s.label}</p>
                                <h3 className="text-4xl font-black text-slate-900 tracking-tight leading-none italic">{s.value}</h3>
                            </div>
                            <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Velocity</span>
                                <TrendingUp className="w-5 h-5 text-green-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Areas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* My Active Campaigns */}
                    <div className="lg:col-span-2 space-y-12">

                        {user.role === 'doctor' && pendingVerifications.length > 0 && (
                            <div className="space-y-8">
                                <div className="flex items-center justify-between px-2">
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-none">Authorization Queue</h2>
                                        <p className="text-[10px] font-black text-healthcare-green uppercase tracking-[0.2em]">Medical Verification required</p>
                                    </div>
                                    <span className="bg-healthcare-green/10 text-healthcare-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-healthcare-green/20">{pendingVerifications.length} Active</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {pendingVerifications.map((c) => (
                                        <motion.div 
                                            key={c._id}
                                            whileHover={{ y: -8 }}
                                            className="card group border-none shadow-xl hover:shadow-2xl transition-all"
                                        >
                                            <div className="flex items-start justify-between mb-8">
                                                <div className="space-y-2">
                                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight line-clamp-1">{c.title}</h3>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{c.patientName} • {c.disease}</p>
                                                </div>
                                                <div className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] ${
                                                    c.urgencyScore > 80 ? 'bg-healthcare-red/10 text-healthcare-red' : 'bg-healthcare-blue/10 text-healthcare-blue'
                                                }`}>
                                                    SLA: {c.urgencyScore}%
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6 py-6 border-y border-slate-50 mb-8">
                                                <div className="flex-1">
                                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 text-center">Goal</p>
                                                    <p className="font-black text-slate-900 text-center">₹{c.requiredAmount.toLocaleString()}</p>
                                                </div>
                                                <div className="w-px h-8 bg-slate-100"></div>
                                                <div className="flex-1">
                                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 text-center">Survival</p>
                                                    <p className={`font-black uppercase text-xs text-center ${c.survivalProbability === 'High' ? 'text-healthcare-green' : 'text-healthcare-red'}`}>{c.survivalProbability}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <Link to={`/campaign/${c._id}`} className="flex-1 btn-secondary py-4 text-[9px] rounded-xl">
                                                    Inspect Case
                                                </Link>
                                                <button 
                                                    onClick={() => handleVerify(c._id)}
                                                    className="flex-1 btn-primary bg-healthcare-green hover:bg-green-700 py-4 text-[9px] rounded-xl"
                                                >
                                                    Authorize
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-10">
                            <div className="flex items-center justify-between px-2">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-none">Mission Control</h2>
                                    <p className="text-[10px] font-black text-primary-500 uppercase tracking-[0.2em]">Ongoing life-saving campaigns</p>
                                </div>
                                <button onClick={() => navigate('/campaigns')} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-primary-600 transition-colors">View Library</button>
                            </div>

                            {userCampaigns.length === 0 ? (
                                <div className="card py-32 text-center border-dashed border-2 border-slate-200 bg-slate-50/30 flex flex-col items-center space-y-8">
                                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-slate-200 shadow-xl">
                                        <Target className="w-12 h-12" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-black text-slate-900 uppercase">Station Idle</h3>
                                        <p className="text-slate-400 font-bold max-w-xs mx-auto text-lg leading-relaxed">No active missions detected. Ready to initialize new support protocols?</p>
                                    </div>
                                    <button onClick={() => navigate('/create')} className="btn-primary px-12 py-5 rounded-2xl">Initialize Unit</button>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {userCampaigns.map((c, idx) => (
                                        <motion.div 
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="card group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all"
                                        >
                                            <div className="flex flex-col md:flex-row">
                                                <div className="md:w-64 h-64 md:h-auto overflow-hidden relative">
                                                    <img src={c.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={c.title} />
                                                    <div className="absolute top-6 left-6">
                                                        <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-primary-600 shadow-xl border border-white">Live</span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 p-8 md:p-12 flex flex-col justify-between space-y-8">
                                                    <div className="flex justify-between items-start">
                                                        <div className="space-y-3">
                                                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight group-hover:text-primary-600 transition-colors">{c.title}</h3>
                                                            <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                                                <span className="px-3 py-1 bg-slate-100 rounded-lg">{c.disease}</span>
                                                                <span>{c.location || 'Global Hub'}</span>
                                                            </div>
                                                        </div>
                                                        <button className="p-4 bg-slate-50 text-slate-400 hover:bg-white hover:text-primary-600 rounded-2xl transition-all shadow-sm border border-slate-100">
                                                            <MoreHorizontal className="w-6 h-6" />
                                                        </button>
                                                    </div>
                                                    <div className="space-y-5">
                                                        <div className="flex justify-between items-end">
                                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Impact Progress</span>
                                                            <span className="text-xl font-black text-slate-900">{Math.round((c.raisedAmount / c.requiredAmount) * 100)}%</span>
                                                        </div>
                                                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                            <motion.div 
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${(c.raisedAmount / c.requiredAmount) * 100}%` }}
                                                                transition={{ duration: 1.5, delay: 0.5 }}
                                                                className="h-full bg-primary-600 rounded-full shadow-lg"
                                                            ></motion.div>
                                                        </div>
                                                        <div className="flex justify-between items-center pt-2">
                                                            <div className="flex -space-x-2">
                                                                {[1,2,3,4].map(i => (
                                                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-xl flex items-center justify-center text-[8px] font-black">
                                                                        {String.fromCharCode(64 + i)}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-healthcare-blue">
                                                                <Activity className="w-4 h-4" />
                                                                <span>Data Stream Optimal</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-12 lg:space-y-16">
                        {/* Rank Card */}
                        <div className="card p-12 rounded-[3.5rem] bg-slate-900 text-white shadow-2xl space-y-10 relative overflow-hidden group border-none">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-600/20 rounded-full -mr-24 -mt-24 blur-3xl group-hover:scale-125 transition-all duration-1000"></div>
                            <header className="text-center space-y-6">
                                <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center mx-auto border border-white/20 shadow-2xl group-hover:rotate-12 transition-all">
                                    <Gem className="w-12 h-12 text-primary-400" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-black tracking-tight uppercase leading-none">Guardian Rank</h3>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-400 opacity-80 italic">Status: Elite Defender</p>
                                </div>
                            </header>
                            <div className="space-y-4">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-primary-200">
                                    <span>Sync Progress</span>
                                    <span>{user.impactScore % 100}%</span>
                                </div>
                                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden shadow-inner">
                                    <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${user.impactScore % 100}%` }}></div>
                                </div>
                            </div>
                            <button className="w-full py-6 bg-white text-slate-900 font-black rounded-3xl shadow-2xl hover:bg-primary-50 transition-all text-[10px] uppercase tracking-[0.2em]">
                                Claim Daily Rewards
                            </button>
                        </div>

                        {/* Recent Activity */}
                        <div className="space-y-8">
                            <header className="flex items-center justify-between px-2">
                                <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none">Transmission Control</h2>
                                <span className="w-3 h-3 rounded-full bg-primary-600 animate-pulse border-2 border-primary-100"></span>
                            </header>
                            <div className="space-y-5">
                                {[
                                    { title: 'Inbound Donation', time: '2m ago', icon: DollarSign, color: 'text-healthcare-green', bg: 'bg-green-50' },
                                    { title: 'Medical Verified', time: '1h ago', icon: ShieldCheck, color: 'text-primary-600', bg: 'bg-primary-50' },
                                    { title: 'Network Update', time: '5h ago', icon: Share2, color: 'text-healthcare-blue', bg: 'bg-blue-50' }
                                ].map((n, idx) => (
                                    <div key={idx} className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-50 shadow-sm hover:translate-x-2 transition-all group cursor-pointer">
                                        <div className={`p-4 ${n.bg} ${n.color} rounded-2xl group-hover:scale-110 transition-transform`}>
                                            <n.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none">{n.title}</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                                <Clock className="w-3 h-3" />
                                                <span>{n.time}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reports Card */}
                        <div className="card p-12 rounded-[3.5rem] bg-white border border-slate-100 shadow-2xl space-y-10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="p-5 bg-slate-50 rounded-2xl inline-block text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-700">
                                <FileText className="w-8 h-8" />
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">Impact & Tax <br />Analytics</h4>
                                <p className="text-xs font-bold text-slate-400 leading-relaxed italic border-l-4 border-slate-50 pl-5">Download official medical aid certificates and tax compliance logs for 2026.</p>
                            </div>
                            <button className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl shadow-2xl hover:bg-primary-600 transition-all text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4">
                                <span>Export Data (PDF)</span>
                                <ArrowUpRight className="w-5 h-5" />
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
