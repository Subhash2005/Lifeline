import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
    PlusCircle, Info, DollarSign, Activity, 
    Calendar, Hospital, ShieldCheck, Zap, 
    ArrowRight, Loader2, Sparkles, Image as ImageIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const CreateCampaign = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [hospitals, setHospitals] = useState([]);
    const [loadingHospitals, setLoadingHospitals] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        patientName: '',
        disease: '',
        stage: '1',
        timeLeft: 30,
        requiredAmount: 5000,
        hospital: '',
        imageUrl: ''
    });

    const dummyHospitals = [
        { _id: 'h1', name: 'City General Hospital' },
        { _id: 'h2', name: 'Apollo Medical Center' },
        { _id: 'h3', name: 'Red Cross Specialty' },
        { _id: 'h4', name: 'St. Jude Children Hospital' }
    ];

    useEffect(() => {
        if (!user) {
            toast.error('Please login to create a campaign');
            navigate('/login');
        }

        const fetchHospitals = async () => {
            try {
                const res = await api.get('/hospitals');
                if (res.data.success && res.data.data.length > 0) {
                    setHospitals(res.data.data);
                } else {
                    setHospitals(dummyHospitals);
                }
            } catch (err) {
                console.error('Failed to fetch hospitals, using dummy data');
                setHospitals(dummyHospitals);
            } finally {
                setLoadingHospitals(false);
            }
        };
        fetchHospitals();
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await api.post('/campaigns', formData);
            if (res.data.success) {
                toast.success('Campaign created successfully! AI verification in progress.');
                navigate(`/campaign/${res.data.data._id}`);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create campaign');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto py-12 px-4 relative overflow-hidden">
             {/* Background Blob */}
             <div className="absolute top-0 right-0 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
             <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

             {/* Guidance Sidebar */}
             <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/3 space-y-8"
             >
                <div className="glass p-10 rounded-[2.5rem] space-y-6 sticky top-28 border border-slate-200 shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 right-0 w-2 h-full bg-primary-600/10 -skew-x-12 group-hover:bg-primary-600 transition-colors"></div>
                    <div className="flex items-center space-x-3 text-primary-600">
                        <Sparkles className="w-8 h-8 animate-pulse" />
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">AI Assisted <br />Campaign Setup</h2>
                    </div>
                    <p className="text-slate-500 font-medium leading-relaxed italic">
                        "Your campaign is automatically scored by our healthcare AI. Ensuring your story is clear and your documentation is complete helps in achieving faster funding."
                    </p>
                    <div className="space-y-4 pt-6 border-t border-slate-100">
                        <div className="flex items-start space-x-3 group">
                            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 group-hover:text-white transition-all">✓</div>
                            <span className="text-sm font-semibold text-slate-600">Survival probability scoring</span>
                        </div>
                        <div className="flex items-start space-x-3 group">
                            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 group-hover:text-white transition-all">✓</div>
                            <span className="text-sm font-semibold text-slate-600">Urgency level detection</span>
                        </div>
                        <div className="flex items-start space-x-3 group">
                            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 group-hover:text-white transition-all">✓</div>
                            <span className="text-sm font-semibold text-slate-600">Trust-verified platform badge</span>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                         <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                             <ShieldCheck className="w-4 h-4 text-primary-500" />
                             <span>Trust Guarantee</span>
                         </div>
                         <p className="text-xs text-slate-400 font-bold leading-relaxed">
                            Millions in medical assistance already facilitated through LifeLink+. Our doctors review every case.
                         </p>
                    </div>
                </div>
             </motion.div>

             {/* Main form */}
             <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:w-2/3"
             >
                <div className="card p-10 lg:p-16 rounded-[3rem] shadow-2xl relative bg-white/80 backdrop-blur-xl border border-slate-100 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100/50 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div className="mb-12 space-y-2 relative z-10">
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">Create Fundraiser</h1>
                        <p className="text-slate-500 font-medium">Please fill in the medical and financial details accurately.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Patient Info Group */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg inline-block">Patient Information</h3>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Patient Name</label>
                                    <div className="relative">
                                        <PlusCircle className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
                                        <input 
                                            type="text" required 
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-semibold text-slate-700"
                                            placeholder="Full Name"
                                            value={formData.patientName}
                                            onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Diagnosis / Disease</label>
                                    <div className="relative">
                                        <Activity className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
                                        <input 
                                            type="text" required 
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-semibold text-slate-700"
                                            placeholder="e.g. Cancer, Surgery, etc."
                                            value={formData.disease}
                                            onChange={(e) => setFormData({...formData, disease: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Disease Stage</label>
                                        <select 
                                            className="w-full px-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-semibold text-slate-700"
                                            value={formData.stage}
                                            onChange={(e) => setFormData({...formData, stage: e.target.value})}
                                        >
                                            <option value="1">Stage 1</option>
                                            <option value="2">Stage 2</option>
                                            <option value="3">Stage 3</option>
                                            <option value="4">Stage 4 (Critical)</option>
                                            <option value="None">Not Applicable</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Time Left (Days)</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
                                            <input 
                                                type="number" required 
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-semibold text-slate-700"
                                                placeholder="30"
                                                value={formData.timeLeft}
                                                onChange={(e) => setFormData({...formData, timeLeft: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Campaign Details Group */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg inline-block">Campaign Details</h3>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Fundraiser Title</label>
                                    <input 
                                        type="text" required 
                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-semibold text-slate-700"
                                        placeholder="e.g. Help John fight Stage 3 Cancer"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Required Amount (₹)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
                                        <input 
                                            type="number" required 
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-semibold text-slate-700"
                                            placeholder="5000"
                                            value={formData.requiredAmount}
                                            onChange={(e) => setFormData({...formData, requiredAmount: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Link Hospital (Optional)</label>
                                    <div className="relative">
                                        <Hospital className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
                                        <select 
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-semibold text-slate-700"
                                            disabled={loadingHospitals}
                                            value={formData.hospital}
                                            onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                                        >
                                            <option value="">Select Hospital</option>
                                            {hospitals.map(h => (
                                                <option key={h._id} value={h._id}>{h.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Case History / Story</label>
                            <textarea 
                                required rows="6"
                                className="w-full p-6 bg-slate-50 border-2 border-transparent rounded-[2rem] focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-medium text-slate-600 resize-none"
                                placeholder="Describe the medical situation in detail..."
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Image URL (Optional)</label>
                            <div className="relative">
                                <ImageIcon className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
                                <input 
                                    type="text" 
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-semibold text-slate-700"
                                    placeholder="https://images.unsplash.com/..."
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <button 
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center space-x-3 py-6 btn-primary rounded-[2rem] text-xl font-bold tracking-tight shadow-2xl transform active:scale-95 transition-all"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                ) : (
                                    <>
                                        <span>Publish Fundraiser</span>
                                        <ArrowRight className="w-6 h-6" />
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs font-bold text-slate-400 mt-6 flex items-center justify-center space-x-2">
                                <ShieldCheck className="w-4 h-4 text-primary-500" />
                                <span>I confirm that all medical data provided is authentic and verified.</span>
                            </p>
                        </div>
                    </form>
                </div>
             </motion.div>
        </div>
    );
};

export default CreateCampaign;
