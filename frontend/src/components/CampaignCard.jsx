import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const CampaignCard = ({ campaign }) => {
    if (!campaign) return null;

    const raised = Number(campaign.raisedAmount) || 0;
    const target = Number(campaign.requiredAmount) || 1; // Avoid division by zero
    const progress = Math.min(100, (raised / target) * 100);

    return (
        <div className="card group overflow-hidden p-0 h-full flex flex-col border-none hover:shadow-[0_48px_100px_-24px_rgba(0,0,0,0.15)] bg-white ring-1 ring-slate-100/50">
            <div className="relative h-64 md:h-72 overflow-hidden">
                <img 
                    src={campaign.imageUrl || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"} 
                    alt={campaign.title || 'Healthcare Mission'}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute top-5 left-5 flex flex-col gap-2">
                    {campaign.isEmergency && (
                        <div className="bg-red-600 text-white text-[9px] font-black px-3 py-1.5 rounded-full flex items-center gap-2 shadow-2xl animate-pulse uppercase tracking-[0.2em]">
                            <AlertCircle className="w-3 h-3" />
                            <span>Emergency</span>
                        </div>
                    )}
                    {campaign.isVerified && (
                        <div className="bg-white/90 backdrop-blur-md text-primary-600 text-[9px] font-black px-3 py-1.5 rounded-full flex items-center gap-2 shadow-2xl uppercase tracking-[0.2em] border border-white">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Verified Medical</span>
                        </div>
                    )}
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                    <div className={`inline-flex px-3 py-1.5 rounded-lg text-[9px] font-black text-white shadow-2xl uppercase tracking-[0.2em] backdrop-blur-md ${
                        campaign.survivalProbability === 'High' ? 'bg-healthcare-green/80' : 
                        campaign.survivalProbability === 'Medium' ? 'bg-healthcare-blue/80' : 'bg-healthcare-red/80'
                    }`}>
                        Survival Odds: {campaign.survivalProbability || 'N/A'}
                    </div>
                </div>
            </div>

            <div className="p-8 md:p-10 flex flex-col flex-grow bg-white">
                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight line-clamp-1 uppercase group-hover:text-primary-600 transition-colors">
                    {campaign.title || 'Anonymous Mission'}
                </h3>
                <p className="text-[15px] text-slate-500 mb-8 line-clamp-2 h-12 font-medium leading-relaxed italic border-l-4 border-slate-50 pl-4">
                    {campaign.description || 'No description provided for this mission.'}
                </p>

                <div className="mt-auto space-y-6">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Raised</span>
                            <span className="text-2xl font-black text-slate-900 leading-none">₹{raised.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col items-end gap-1 text-right">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target</span>
                            <span className="text-sm font-black text-slate-500 leading-none opacity-60">₹{target.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={`h-full shadow-lg ${
                                campaign.isEmergency ? 'bg-gradient-to-r from-healthcare-red to-primary-600' : 'bg-primary-600'
                            }`}
                        ></motion.div>
                    </div>

                    <div className="flex justify-between items-center bg-slate-50/80 p-4 rounded-2xl border border-slate-100/50">
                        <div className="flex items-center text-[10px] text-slate-500 font-black gap-2 uppercase tracking-widest">
                            <Clock className="w-4 h-4 text-primary-500" />
                            <span>{campaign.timeLeft || '0'} Days Left</span>
                        </div>
                        <div className="flex items-center text-[10px] text-primary-700 font-black gap-2 uppercase tracking-widest bg-primary-100/50 px-3 py-1.5 rounded-lg">
                            <TrendingUp className="w-4 h-4" />
                            <span>{Math.round(progress)}% Funded</span>
                        </div>
                    </div>

                    <Link to={`/campaign/${campaign._id}`} className="btn-primary w-full py-5 rounded-2xl shadow-primary-500/10 hover:shadow-primary-500/30">
                        Invest in Hope
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CampaignCard;
