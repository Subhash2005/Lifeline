import React, { useState, useEffect } from 'react';
import api from '../services/api';
import CampaignCard from '../components/CampaignCard';
import { Search, Loader2, Sparkles, PlusCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const dummyCampaigns = [
        {
            _id: '1',
            title: 'Emergency: Heart Surgery for Sarah',
            patientName: 'Sarah Jenkins',
            description: 'Sarah needs urgent heart surgery to repair a congenital defect. Any help is appreciated.',
            isEmergency: true,
            isVerified: true,
            survivalProbability: 'High',
            raisedAmount: 18500,
            requiredAmount: 25000,
            timeLeft: 3,
            imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800'
        },
        {
            _id: '2',
            title: 'Cancer Treatment for Robert',
            patientName: 'Robert Smith',
            description: 'Robert is fighting stage 3 colon cancer and needs help with chemotherapy costs.',
            isEmergency: false,
            isVerified: true,
            survivalProbability: 'Medium',
            raisedAmount: 8500,
            requiredAmount: 15000,
            timeLeft: 12,
            imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800'
        },
        {
            _id: '4',
            title: 'Kidney Transplant for Emily',
            patientName: 'Emily Davis',
            description: 'Emily has been on the waitlist for 2 years and finally found a donor. Need funds for surgery.',
            isEmergency: false,
            isVerified: true,
            survivalProbability: 'High',
            raisedAmount: 43000,
            requiredAmount: 50000,
            timeLeft: 7,
            imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'
        },
        {
            _id: '8',
            title: 'Emergency: Brain Aneurysm Surgery',
            patientName: 'Priya Verma',
            description: 'Priya was admitted today with a ruptured aneurysm. Immediate surgery is her only hope.',
            isEmergency: true,
            isVerified: true,
            survivalProbability: 'Low',
            raisedAmount: 250000,
            requiredAmount: 500000,
            timeLeft: 2,
            imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=800'
        }
    ];

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const res = await api.get('/campaigns');
                if (res.data.success && res.data.data.length > 0) {
                    const realData = res.data.data.filter((item, index, self) =>
                        index === self.findIndex((t) => (
                            t.title === item.title && t.patientName === item.patientName
                        ))
                    );
                    setCampaigns([...realData, ...dummyCampaigns.filter(d => !realData.some(r => r.title === d.title))]);
                } else {
                    setCampaigns(dummyCampaigns);
                }
            } catch (err) {
                setCampaigns(dummyCampaigns);
            } finally {
                setLoading(false);
            }
        };
        fetchCampaigns();
    }, []);

    const filteredCampaigns = campaigns.filter(c => {
        const matchesSearch = (c.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || 
                             (c.patientName?.toLowerCase() || "").includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || 
                             (filter === 'emergency' && c.isEmergency) ||
                             (filter === 'verified' && c.isVerified);
        return matchesSearch && matchesFilter && c.raisedAmount < c.requiredAmount;
    });

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* SEO Focused Header */}
            <div className="bg-white border-b border-slate-100 sticky top-20 z-40 py-8 lg:py-16">
                <div className="section-container space-y-12">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                        <div className="space-y-6 text-center lg:text-left flex-shrink-0">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">
                                Healthcare <br className="hidden md:block" /> Missions
                            </h1>
                            <div className="flex items-center justify-center lg:justify-start space-x-3 text-[10px] font-black text-primary-600 uppercase tracking-[0.3em]">
                                <Sparkles className="w-5 h-5 flex-shrink-0" />
                                <span>Verified Community Support Hub</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-5 w-full lg:w-auto">
                            <div className="relative flex-1 sm:w-80 group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary-600 transition-colors" />
                                <input 
                                    type="text"
                                    placeholder="Search by name..."
                                    className="input-field pl-16 pr-6 h-16 md:h-18 shadow-2xl shadow-primary-500/5 border-slate-50"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Link to="/create" className="btn-primary h-16 md:h-18 px-10 flex items-center justify-center w-full sm:w-auto shadow-2xl shadow-primary-500/20">
                                <PlusCircle className="w-6 h-6 mr-3" />
                                <span>Start Mission</span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0">
                        {['all', 'emergency', 'verified'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-8 h-12 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all border-2 ${
                                    filter === type 
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xl scale-105' 
                                    : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                                }`}
                            >
                                {type === 'all' ? 'All' : type} Missions
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="section-container mt-12 md:mt-20 mb-32">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-48 space-y-8"
                        >
                            <div className="relative">
                                <Loader2 className="w-20 h-20 text-primary-600 animate-spin" />
                                <div className="absolute inset-0 bg-primary-600/20 blur-2xl rounded-full"></div>
                            </div>
                            <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">Synchronizing Data</p>
                        </motion.div>
                    ) : filteredCampaigns.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-40 space-y-12 card max-w-3xl mx-auto border-dashed border-2 bg-slate-50/50"
                        >
                            <div className="bg-white w-32 h-32 rounded-full flex items-center justify-center mx-auto shadow-xl">
                                <AlertCircle className="w-12 h-12 text-slate-300" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tight">No Missions Found</h3>
                                <p className="text-slate-400 font-bold text-lg max-w-sm mx-auto">We couldn't find any active missions matching your filters.</p>
                            </div>
                            <button onClick={() => {setSearchTerm(''); setFilter('all');}} className="btn-secondary px-12">
                                Clear All Filters
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div 
                            layout
                            className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 lg:gap-16"
                        >
                            {filteredCampaigns.map((campaign) => (
                                <motion.div
                                    key={campaign._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                >
                                    <CampaignCard campaign={campaign} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CampaignList;
