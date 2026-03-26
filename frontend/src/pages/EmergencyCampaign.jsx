import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
    AlertCircle, FileText, DollarSign, Activity, 
    ArrowRight, Loader2, Sparkles, UploadCloud, 
    Zap, ShieldCheck
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const EmergencyCampaign = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mockFile, setMockFile] = useState(null);

    const emergencyImages = [
        'https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200'
    ];

    const [formData, setFormData] = useState({
        patientName: '',
        requiredAmount: 5000,
        disease: '',
        description: '',
        timeLeft: 7,
        isEmergency: true,
        imageUrl: emergencyImages[Math.floor(Math.random() * emergencyImages.length)]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to continue');
            return navigate('/login');
        }
        if (!mockFile) {
            toast.error('Please upload a medical proof document');
            return;
        }

        setIsSubmitting(true);
        // Add auto-generated title
        const dataToSend = {
            ...formData,
            title: `EMERGENCY: Immediate Medical Help for ${formData.patientName}`
        };

        try {
            const res = await api.post('/campaigns', dataToSend);
            if (res.data.success && res.data.data?._id) {
                toast.success('EMERGENCY CAMPAIGN LIVE! Donors notified.', {
                    duration: 5000,
                    icon: '🚀'
                });
                navigate(`/campaign/${res.data.data._id}`);
            } else {
                throw new Error('Failed to retrieve campaign data');
            }
        } catch (err) {
            console.error('Creation failed:', err);
            toast.error(err.response?.data?.message || 'Failed to create emergency campaign');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
            {/* Urgency Header */}
            <div className="bg-gradient-to-br from-red-600 to-red-900 rounded-[3rem] p-10 lg:p-16 text-white shadow-2xl relative overflow-hidden text-center lg:text-left">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-24 -mt-24 blur-2xl"></div>
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="space-y-4 max-w-xl">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg border border-white/10">
                            <Zap className="w-4 h-4 fill-white text-white" />
                            <span>Immediate Action Required</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight">One-Click <br />Emergency help</h1>
                        <p className="text-lg text-red-100 font-medium italic opacity-90 leading-relaxed">
                            Skipping standard verification queues for verified life-saving emergencies. Funds start flowing in minutes.
                        </p>
                    </div>
                    <div className="animate-float">
                        <AlertCircle className="w-32 h-32 text-white/40" />
                    </div>
                </div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="card p-10 lg:p-16 rounded-[3rem] shadow-2xl border-2 border-red-50 bg-white/90 backdrop-blur-xl"
            >
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Patient Full Name</label>
                            <div className="relative group">
                                <Activity className="absolute left-6 top-5 w-6 h-6 text-slate-300 group-hover:text-red-500 transition-colors" />
                                <input 
                                    type="text" required
                                    className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:ring-4 focus:ring-red-100 focus:border-red-500 outline-none transition-all font-extrabold text-lg"
                                    placeholder="Enter Name"
                                    value={formData.patientName}
                                    onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Required Amount (₹)</label>
                            <div className="relative group">
                                <DollarSign className="absolute left-6 top-5 w-6 h-6 text-slate-300 group-hover:text-green-500 transition-colors" />
                                <input 
                                    type="number" required
                                    className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all font-extrabold text-lg"
                                    placeholder="Amount"
                                    value={formData.requiredAmount}
                                    onChange={(e) => setFormData({...formData, requiredAmount: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Minimalist File Upload */}
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Medical Proof (Image/PDF)</label>
                        <div 
                            onClick={() => document.getElementById('fileInput').click()}
                            className={`flex flex-col items-center justify-center border-4 border-dashed rounded-[2.5rem] p-12 transition-all cursor-pointer group ${
                                mockFile ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-red-300'
                            }`}
                        >
                            {mockFile ? (
                                <div className="space-y-3 text-center">
                                    <FileText className="w-16 h-16 text-green-500 mx-auto" />
                                    <p className="text-sm font-black text-green-700">{mockFile.name}</p>
                                    <span className="text-xs font-bold text-green-500 bg-white px-3 py-1 rounded-full border border-green-100 shadow-sm uppercase tracking-widest">Selected</span>
                                </div>
                            ) : (
                                <div className="space-y-4 text-center">
                                    <div className="w-20 h-20 bg-white rounded-[2rem] shadow-xl flex items-center justify-center mx-auto transform group-hover:-translate-y-2 transition-transform">
                                        <UploadCloud className="w-8 h-8 text-primary-600" />
                                    </div>
                                    <p className="text-slate-500 font-bold">Tap to upload medical documentation</p>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-300">Max size 10MB • PNG, JPG, PDF</p>
                                </div>
                            )}
                            <input 
                                id="fileInput"
                                type="file" 
                                className="hidden" 
                                onChange={(e) => setMockFile(e.target.files[0])}
                            />
                        </div>
                    </div>

                    <div className="space-y-6 pt-6">
                        <button 
                            disabled={isSubmitting}
                            className="w-full btn-primary py-6 text-2xl font-black bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 shadow-[0_20px_50px_rgba(239,68,68,0.3)] rounded-[2.5rem] flex items-center justify-center space-x-4 transform active:scale-95 transition-all"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-10 h-10 animate-spin" />
                            ) : (
                                <>
                                    <span>Launch Emergency Now</span>
                                    <Zap className="w-8 h-8 fill-white" />
                                </>
                            )}
                        </button>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4 border-t border-slate-100">
                             <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                 <ShieldCheck className="w-4 h-4 text-green-500" />
                                 <span>Doctor-Review Verified</span>
                             </div>
                             <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                 <Sparkles className="w-4 h-4 text-primary-500" />
                                 <span>AI Urgency Scaled</span>
                             </div>
                        </div>
                    </div>
                </form>
            </motion.div>

            <div className="bg-primary-50 p-8 rounded-[2rem] border border-primary-100 flex items-start space-x-6">
                <div className="bg-primary-100 p-4 rounded-2xl">
                    <AlertCircle className="w-8 h-8 text-primary-600" />
                </div>
                <div className="space-y-2">
                    <h4 className="text-lg font-extrabold text-primary-900 tracking-tight">Abuse Prevention Notice</h4>
                    <p className="text-sm text-primary-700 leading-relaxed font-medium">
                        Emergency campaigns are subject to strict manual review. Fraudulent documentation will result in immediate bans 
                        and potential legal action. LifeLink+ ensures donor safety through our 
                        BlockTrust system.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmergencyCampaign;
