import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
    Trophy, Search, Heart, ShieldCheck, 
    Star, Award, Activity, TrendingUp, 
    Zap, Gem, HandHeart, Loader2, Sparkles,
    Medal, Crown, Target, Share2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Leaderboard = () => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchDonors = async () => {
            const dummyData = [
                { _id: 'd1', name: "Alexander Pierce", impactScore: 15450, badges: ["Life Saver", "Emergency Hero", "Lead Donor"], role: 'corporate' },
                { _id: 'd2', name: "Sarah Jennings", impactScore: 12200, badges: ["Life Saver", "Regular Donor"], role: 'user' },
                { _id: 'd3', name: "Dr. Mark Sloan", impactScore: 9810, badges: ["Doctor Verified", "Medical Hero"], role: 'doctor' },
                { _id: 'd4', name: "Emma Watson", impactScore: 8500, badges: ["Life Saver", "Trendsetter"], role: 'user' },
                { _id: 'd5', name: "Global Relief", impactScore: 7200, badges: ["Corporate CSR", "Impact Plus"], role: 'corporate' },
                { _id: 'd6', name: "Michael Scott", impactScore: 6100, badges: ["Fun Run Organizer"], role: 'user' },
                { _id: 'd7', name: "Pam Beesly", impactScore: 5400, badges: ["Heart Pointer"], role: 'user' },
                { _id: 'd8', name: "Dwight Schrute", impactScore: 4900, badges: ["Emergency Assist"], role: 'user' },
                { _id: 'd9', name: "Jim Halpert", impactScore: 4200, badges: ["Generous Soul"], role: 'user' },
                { _id: 'd10', name: "Angela Martin", impactScore: 3800, badges: ["Consistent Contributor"], role: 'user' }
            ];

            try {
                const res = await api.get('/auth/leaderboard');
                if (res.data.success && res.data.data.length > 0) {
                    const realData = res.data.data;
                    // Combine real with dummy if needed for a full list
                    const combined = [...realData, ...dummyData.filter(d => !realData.some(r => r.name === d.name))];
                    setDonors(combined.sort((a,b) => b.impactScore - a.impactScore).map((d, i) => ({...d, rank: i + 1})));
                } else {
                    setDonors(dummyData.sort((a,b) => b.impactScore - a.impactScore).map((d, i) => ({...d, rank: i + 1})));
                }
            } catch (err) {
                console.error("Leaderboard fetch failed, using fallback data");
                setDonors(dummyData.sort((a,b) => b.impactScore - a.impactScore).map((d, i) => ({...d, rank: i + 1})));
            } finally {
                setLoading(false);
            }
        };
        fetchDonors();
    }, []);

    const filteredDonors = donors.filter(d => 
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-16 py-12 px-4 max-w-5xl mx-auto overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-40 left-0 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            {/* Header / Hero */}
            <header className="relative bg-white p-12 lg:p-20 rounded-[4rem] shadow-2xl border border-slate-100 text-center space-y-8 overflow-hidden group">
                 <div className="absolute top-0 right-0 w-2 h-full bg-primary-600/10 group-hover:bg-primary-600 transition-colors"></div>
                 <div className="inline-flex items-center space-x-2 px-3 py-1 bg-orange-50 rounded-full text-[10px] font-black uppercase tracking-widest text-orange-600 border border-orange-100 border-dashed">
                    <Trophy className="w-4 h-4" />
                    <span>Global Impact Rankings</span>
                </div>
                <h1 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight">
                    Heroes behind <br />
                    the <span className="text-primary-600 underline underline-offset-8 decoration-primary-200">Hope</span>.
                </h1>
                <p className="max-w-xl mx-auto text-lg text-slate-500 font-medium leading-relaxed italic opacity-80">
                    Recognizing the incredible kindness of our top supporters who go above and beyond to save lives and support families.
                </p>
            </header>

            {/* Top 3 Podiums */}
            {!loading && donors.length >= 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pt-12">
                    {/* Rank 2 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="order-2 md:order-1"
                    >
                        <div className="card p-10 rounded-[3rem] text-center space-y-6 relative overflow-hidden bg-slate-50 border-slate-100 group shadow-lg">
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-slate-200 rounded-full opacity-20 group-hover:scale-150 transition-all duration-700"></div>
                            <div className="relative mx-auto w-24 h-24 rounded-[1.5rem] bg-slate-200 flex items-center justify-center text-slate-500 shadow-xl border-4 border-white">
                                <span className="text-3xl font-black">{donors[1].name[0]}</span>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg">2</div>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-black text-slate-900 group-hover:text-primary-600 transition-colors">{donors[1].name}</h3>
                                <div className="flex justify-center flex-wrap gap-2 pt-2">
                                    {donors[1].badges.map(b => (
                                        <div key={b} className="bg-primary-50 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest text-primary-600 border border-primary-100">{b}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col items-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact Score</p>
                                <p className="text-2xl font-black text-slate-900">{donors[1].impactScore.toLocaleString()}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Rank 1 */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="order-1 md:order-2"
                    >
                        <div className="card p-12 rounded-[3rem] md:rounded-[4rem] text-center space-y-8 relative overflow-hidden bg-white border-primary-200 group shadow-2xl md:scale-110">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-100 rounded-full opacity-30 group-hover:scale-150 transition-all duration-700"></div>
                            <div className="relative mx-auto w-32 h-32 rounded-[2rem] bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center text-white shadow-2xl border-6 border-white animate-float">
                                <span className="text-5xl font-black">{donors[0].name[0]}</span>
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                                    <Crown className="w-12 h-12 text-yellow-500 fill-yellow-500 drop-shadow-xl" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-black shadow-lg ring-4 ring-white">1</div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{donors[0].name}</h3>
                                <div className="flex justify-center flex-wrap gap-2 pt-2">
                                    {donors[0].badges.map(b => (
                                        <div key={b} className="bg-primary-100/50 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-primary-700 shadow-sm flex items-center gap-1.5 border border-primary-200">
                                            <Sparkles className="w-3 h-3" />
                                            <span>{b}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6 bg-primary-50 rounded-[2.5rem] border border-primary-100 flex flex-col items-center shadow-inner">
                                <p className="text-[10px] font-black text-primary-500 uppercase tracking-[0.2em] mb-1">Elite Impact Score</p>
                                <p className="text-4xl font-black text-primary-900">{donors[0].impactScore.toLocaleString()}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Rank 3 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="order-3"
                    >
                        <div className="card p-10 rounded-[3rem] text-center space-y-6 relative overflow-hidden bg-slate-50 border-slate-100 group shadow-lg">
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-100 rounded-full opacity-20 group-hover:scale-150 transition-all duration-700"></div>
                            <div className="relative mx-auto w-24 h-24 rounded-[1.5rem] bg-orange-100 flex items-center justify-center text-orange-500 shadow-xl border-4 border-white">
                                <span className="text-3xl font-black">{donors[2].name[0]}</span>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg">3</div>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-black text-slate-900 group-hover:text-primary-600 transition-colors">{donors[2].name}</h3>
                                <div className="flex justify-center flex-wrap gap-2 pt-2">
                                    {donors[2].badges.map(b => (
                                        <div key={b} className="bg-orange-50 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest text-orange-600 border border-orange-100">{b}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col items-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact Score</p>
                                <p className="text-2xl font-black text-slate-900">{donors[2].impactScore.toLocaleString()}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Donor List Section */}
            <div className="space-y-10 pt-20">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100 sticky top-24 z-30">
                     <div className="flex items-center space-x-6">
                         <div className="p-4 bg-primary-600 rounded-[2rem] text-white shadow-xl">
                            <Medal className="w-8 h-8" />
                         </div>
                         <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Active Supporters</h2>
                     </div>
                     <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-6 top-5 w-6 h-6 text-slate-300 group-hover:text-primary-600 transition-colors" />
                        <input 
                            type="text" 
                            className="w-full pl-16 pr-6 py-5 bg-slate-50 border-none rounded-3xl focus:ring-4 focus:ring-primary-50 outline-none font-bold text-sm text-slate-600 placeholder:text-slate-300 transition-all"
                            placeholder="Find a donor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                     </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                         <Loader2 className="w-16 h-16 text-primary-600 animate-spin" />
                         <p className="mt-4 text-slate-400 font-extrabold uppercase tracking-widest text-xs animate-pulse">Syncing impact data nodes...</p>
                    </div>
                ) : (
                    <div className="card p-0 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl bg-white">
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse min-w-[600px] md:min-w-full">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 md:px-10 py-6 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-slate-400">Rank</th>
                                        <th className="px-6 md:px-10 py-6 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-slate-400">Donor</th>
                                        <th className="px-6 md:px-10 py-6 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-slate-400 hidden sm:table-cell">Impact Badges</th>
                                        <th className="px-6 md:px-10 py-6 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-slate-400 text-right">Impact Score</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredDonors.map((donor, idx) => (
                                        <tr key={donor._id || idx} className="group hover:bg-primary-50/50 transition-all cursor-default">
                                            <td className="px-6 md:px-10 py-6 md:py-8">
                                                <div className="flex items-center space-x-2 md:space-x-3">
                                                    <span className={`text-lg md:text-xl font-black ${idx < 3 ? 'text-primary-600' : 'text-slate-300'}`}>
                                                        #{donor.rank.toString().padStart(2, '0')}
                                                    </span>
                                                    {idx === 0 && <Award className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />}
                                                    {idx === 1 && <Award className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />}
                                                    {idx === 2 && <Award className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />}
                                                </div>
                                            </td>
                                            <td className="px-6 md:px-10 py-6 md:py-8">
                                                <div className="flex items-center space-x-3 md:space-x-4">
                                                    <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-xl md:rounded-2xl bg-slate-100 flex items-center justify-center text-primary-600 font-black text-base md:text-lg group-hover:bg-primary-600 group-hover:text-white transition-all transform group-hover:rotate-6">
                                                        {donor.name[0]}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-base md:text-lg font-black text-slate-900 group-hover:text-primary-600 transition-all uppercase tracking-tight truncate max-w-[120px] md:max-w-none">{donor.name}</p>
                                                        <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                                                            {donor.role === 'corporate' ? <Medal className="w-3 h-3 text-indigo-500" /> : <Heart className="w-3 h-3 text-red-500" />}
                                                            <span className="truncate">{donor.role === 'corporate' ? 'Corporate CSR' : 'Community Donor'}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 md:px-10 py-6 md:py-8 hidden sm:table-cell">
                                                <div className="flex flex-wrap gap-2">
                                                    {donor.badges?.map(b => (
                                                        <span key={b} className="text-[8px] md:text-[9px] font-black uppercase tracking-widest bg-white px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg md:rounded-xl border border-slate-100 text-slate-500 shadow-sm group-hover:border-primary-200 group-hover:text-primary-600 transition-colors">
                                                            {b}
                                                        </span>
                                                    ))}
                                                    {(!donor.badges || donor.badges.length === 0) && <span className="text-[10px] text-slate-300 italic font-medium">New Supporter</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 md:px-10 py-6 md:py-8 text-right">
                                                <div className="inline-block px-4 md:px-6 py-1.5 md:py-2 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 group-hover:bg-white group-hover:border-primary-100 transition-all">
                                                    <span className="text-lg md:text-xl font-black text-slate-900 group-hover:text-primary-700">{donor.impactScore.toLocaleString()}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Gamification Info */}
            <div className="bg-gradient-to-r from-primary-900 to-indigo-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl group">
                 <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40 blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                 <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                     <div className="space-y-6 max-w-xl">
                         <div className="p-4 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20 inline-block">
                             <TrendingUp className="w-10 h-10" />
                         </div>
                         <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">How is your Impact <br />Score calculated?</h2>
                         <p className="text-primary-100 font-medium leading-relaxed opacity-80">
                            Impact score is calculated based on donation consistency, total amount, emergency priority contributions, and shares.
                         </p>
                         <div className="grid grid-cols-2 gap-6 pt-6 text-sm font-bold opacity-90">
                             <div className="flex items-center space-x-3">
                                 <Heart className="w-5 h-5 text-red-500 animate-pulse" />
                                 <span>10 Points per ₹100 donated</span>
                             </div>
                             <div className="flex items-center space-x-3">
                                 <Zap className="w-5 h-5 text-yellow-500" />
                                 <span>500 Bonus: Emergency Assist</span>
                             </div>
                             <div className="flex items-center space-x-3">
                                 <Share2 className="w-5 h-5 text-blue-500" />
                                 <span>100 Points per Campaign Share</span>
                             </div>
                             <div className="flex items-center space-x-3">
                                 <ShieldCheck className="w-5 h-5 text-green-500" />
                                 <span>Verified Success Badge</span>
                             </div>
                         </div>
                     </div>
                     <div className="card p-10 rounded-[3rem] bg-white text-slate-900 border-none shadow-2xl flex flex-col items-center justify-center space-y-6 max-w-xs scale-105">
                         <h4 className="text-lg font-black uppercase tracking-widest text-primary-600">Your Current Rank</h4>
                         <div className="w-24 h-24 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-primary-600 border-4 border-primary-100 shadow-inner">
                            <span className="text-4xl font-black">
                                {donors.findIndex(d => d.name === "Sarah Jennings") + 1 || '?'}
                            </span>
                         </div>
                         <p className="text-center text-xs font-bold text-slate-400 leading-relaxed px-4">
                            Your impact is growing! You're currently in the <span className="text-slate-900">Top 10%</span> of global contributors.
                         </p>
                         <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full btn-primary py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl">Back to Top</button>
                     </div>
                 </div>
            </div>
        </div>
    );
};

export default Leaderboard;
