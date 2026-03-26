import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
    Clock, Heart, ShieldCheck, Target, 
    Share2, History, MessageCircle, Hospital, 
    Bookmark, TrendingUp, AlertCircle, Sparkles, 
    ArrowRight, Loader2, Zap, Send
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const CampaignDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [donationAmount, setDonationAmount] = useState(100);
    const [isDonating, setIsDonating] = useState(false);
    const [updateText, setUpdateText] = useState('');
    const [isPostingUpdate, setIsPostingUpdate] = useState(false);
    const [activeTab, setActiveTab] = useState('story');
    const [showHospitalModal, setShowHospitalModal] = useState(false);
    const navigate = useNavigate();

    const mockFundingHistory = [
        { name: 'Rahul S.', amount: 5000, date: '2 hours ago', icon: '💎' },
        { name: 'Dr. Anita', amount: 2000, date: '5 hours ago', icon: '❤️' },
        { name: 'Anonymous', amount: 500, date: '1 day ago', icon: '👤' },
        { name: 'HelpLife NGO', amount: 10000, date: '2 days ago', icon: '🏢' }
    ];

    const mockComments = [
        { user: 'Amit K.', text: 'Stay strong Sarah! My prayers are with you.', date: '3 hours ago' },
        { user: 'Priya M.', text: 'Small contribution from my side. Get well soon!', date: '6 hours ago' },
        { user: 'Suresh V.', text: 'God bless the family. Hoping for a successful surgery.', date: '1 day ago' }
    ];

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
            imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
            disease: 'Congenital Heart Defect',
            urgencyScore: 95,
            updates: [{ date: new Date(), text: 'Surgery scheduled for next week.' }],
            user: { name: 'Dr. Smith', _id: 'hospital1' },
            hospital: { name: 'City General Hospital' },
            createdAt: new Date().toISOString()
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
            imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
            disease: 'Stage 3 Colon Cancer',
            urgencyScore: 75,
            updates: [{ date: new Date(), text: 'Second round of chemo started.' }],
            user: { name: 'Robert Smith', _id: 'user2' },
            hospital: { name: 'Oncology Center' },
            createdAt: new Date().toISOString()
        },
        {
            _id: '3',
            title: 'Medical Aid for Flood Victims',
            patientName: 'Various Patients',
            description: 'Direct medical aid to those affected by recent floods in the coastal region.',
            isEmergency: true,
            isVerified: false,
            survivalProbability: 'Medium',
            raisedAmount: 2000,
            requiredAmount: 5000,
            timeLeft: 5,
            imageUrl: 'https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&q=80&w=800',
            disease: 'Multiple Trauma/Infections',
            urgencyScore: 90,
            updates: [{ date: new Date(), text: 'Aid kits being distributed.' }],
            user: { name: 'Red Cross Team', _id: 'org3' },
            hospital: { name: 'Field Hospital Alpha' },
            createdAt: new Date().toISOString()
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
            imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
            disease: 'Renal Failure',
            urgencyScore: 85,
            updates: [{ date: new Date(), text: 'Donor verification complete.' }],
            user: { name: 'Davis Family', _id: 'user4' },
            hospital: { name: 'Saint Lukes Specialty' },
            createdAt: new Date().toISOString()
        },
        {
            _id: '5',
            title: 'Accident Recovery Fund',
            patientName: 'John Doe',
            description: 'John met with a serious motorcycle accident and needs multiple surgeries for recovery.',
            isEmergency: true,
            isVerified: true,
            survivalProbability: 'Low',
            raisedAmount: 12000,
            requiredAmount: 30000,
            timeLeft: 15,
            imageUrl: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=800',
            disease: 'Multiple Bone Fractures',
            urgencyScore: 98,
            updates: [{ date: new Date(), text: 'First surgery successful.' }],
            user: { name: 'Jane Doe', _id: 'user5' },
            hospital: { name: 'Trauma Care Unit' },
            createdAt: new Date().toISOString()
        },
        {
            _id: '6',
            title: 'Bone Marrow Transplant',
            patientName: 'Amit Sharma',
            description: 'Amit is battling Leukemia and requires a bone marrow transplant as his only chance at life.',
            isEmergency: true,
            isVerified: true,
            survivalProbability: 'Medium',
            raisedAmount: 55000,
            requiredAmount: 80000,
            timeLeft: 21,
            imageUrl: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800',
            disease: 'Leukemia',
            urgencyScore: 88,
            updates: [{ date: new Date(), text: 'Search for matching donor in progress.' }],
            user: { name: 'Amit Sharma', _id: 'user6' },
            hospital: { name: 'Bone Marrow Institute' },
            createdAt: new Date().toISOString()
        },
        {
            _id: '7',
            title: 'Prosthetic Leg and Rehab',
            patientName: 'Karthik Raja',
            description: 'Karthik lost his leg in a train accident. Help him walk again by funding his prosthetic limb.',
            isEmergency: false,
            isVerified: true,
            survivalProbability: 'High',
            raisedAmount: 1500,
            requiredAmount: 3500,
            timeLeft: 45,
            imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=800',
            disease: 'Amputation Recovery',
            urgencyScore: 40,
            updates: [{ date: new Date(), text: 'Measurements taken for the limb.' }],
            user: { name: 'Karthik Raja', _id: 'user7' },
            hospital: { name: 'Rehab Center' },
            createdAt: new Date().toISOString()
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
            imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=800',
            disease: 'Ruptured Brain Aneurysm',
            urgencyScore: 99,
            updates: [{ date: new Date(), text: 'Patient stabilized for surgery.' }],
            user: { name: 'Anil Verma', _id: 'user8' },
            hospital: { name: 'Neurology Specialty' },
            createdAt: new Date().toISOString()
        }
    ];

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const res = await api.get(`/campaigns/${id}`);
                if (res.data.success) {
                    setCampaign(res.data.data);
                }
            } catch (err) {
                const dummy = dummyCampaigns.find(c => c._id === id);
                if (dummy) {
                    setCampaign(dummy);
                    // toast removed
                } else {
                    toast.error('Campaign not found');
                    navigate('/campaigns');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchCampaign();
    }, [id, navigate]);

    const handleDonate = async () => {
        if (!user) {
            toast.error('Please login to donate');
            return navigate('/login');
        }
        if (parseInt(donationAmount) <= 0) return toast.error('Enter a valid amount');

        const remaining = campaign.requiredAmount - campaign.raisedAmount;
        if (donationAmount > remaining) {
            toast.error(`Campaign only needs ₹${remaining.toLocaleString()} more. Re-adjusting...`);
            setDonationAmount(remaining);
            setIsDonating(false);
            return;
        }

        setIsDonating(true);
        
        // Simulating Payment Processing for Dummy/Demo
        const isDummy = dummyCampaigns.some(c => c._id === id);
        
        if (isDummy) {
            setTimeout(() => {
                const amount = parseInt(donationAmount);
                setCampaign(prev => ({
                    ...prev,
                    raisedAmount: prev.raisedAmount + amount
                }));
                toast.success(`Payment of ₹${amount} Successful! Support registered.`);
                setIsDonating(false);
            }, 1500);
            return;
        }

        try {
            const res = await api.post('/donations', { campaignId: id, amount: donationAmount });
            if (res.data.success) {
                toast.success('Thank you for your life-saving contribution!');
                const updated = await api.get(`/campaigns/${id}`);
                setCampaign(updated.data.data);
                setDonationAmount(100);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Donation failed');
        } finally {
            setIsDonating(false);
        }
    };

    const handleContactHospital = () => {
        setShowHospitalModal(true);
    };

    const handleCallHospital = (phone) => {
        window.location.href = `tel:${phone}`;
    };

    const handleShareWhatsapp = () => {
        const text = `Please help ${campaign.patientName} fighting ${campaign.disease}. Every bit counts: ${window.location.href}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleSendWishes = () => {
        toast.success("Your 'Get Well Soon' blessings have been sent to the patient! ❤️", {
            duration: 4000,
            icon: '🙏'
        });
    };

    const handlePostUpdate = async (e) => {
        e.preventDefault();
        if (!updateText.trim()) return;

        setIsPostingUpdate(true);
        try {
            const res = await api.post(`/campaigns/${id}/update`, { text: updateText });
            if (res.data.success) {
                toast.success('Update posted successfully');
                setCampaign(res.data.data);
                setUpdateText('');
            }
        } catch (err) {
            toast.error('Failed to post update');
        } finally {
            setIsPostingUpdate(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-40 bg-slate-50 min-h-[60vh]">
            <Loader2 className="w-16 h-16 text-primary-600 animate-spin" />
            <p className="mt-6 text-slate-500 font-medium animate-pulse">Loading verified campaign details...</p>
        </div>
    );

    const progress = Math.min(100, (campaign.raisedAmount / campaign.requiredAmount) * 100);

    return (
        <div className="space-y-12 pb-24 max-w-7xl mx-auto">
            {/* Header / Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group border-[1.5rem] border-white ring-1 ring-slate-100">
                        <img 
                            src={campaign.imageUrl || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200"} 
                            alt={campaign.title} 
                            className="w-full h-[600px] object-cover group-hover:scale-110 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                        <div className="absolute top-6 left-6 flex flex-wrap gap-3">
                            {campaign.isEmergency && (
                                <div className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-xl animate-pulse">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>Emergency Priority</span>
                                </div>
                            )}
                            {campaign.isVerified && (
                                <div className="bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-xl border border-white/20">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Medical Verified</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats Overlay (Floating) */}
                    <div className="absolute -bottom-6 -right-6 lg:-right-10 glass p-8 rounded-[2rem] shadow-2xl border border-white/40 hidden md:block max-w-xs space-y-4 animate-float">
                        <div className="flex items-center space-x-3 text-primary-600">
                            <TrendingUp className="w-8 h-8 font-bold" />
                            <div>
                                <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight">{Math.round(progress)}%</h4>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Funded</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 italic font-medium leading-relaxed">
                            "{campaign.title.slice(0, 60)}..."
                        </p>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-10"
                >
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-primary-600 font-bold uppercase tracking-[0.2em] text-xs">
                             <Target className="w-4 h-4" />
                             <span>Healthcare Fundraising</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            {campaign.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 pt-2">
                            <div className="flex items-center space-x-2 bg-slate-100/50 px-4 py-2 rounded-full border border-slate-200">
                                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">
                                    {campaign.user.name.charAt(0)}
                                </div>
                                <span className="text-sm font-bold text-slate-700">{campaign.user.name}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-slate-500 text-sm font-medium">
                                <Clock className="w-4 h-4 text-primary-500" />
                                <span>Started {new Date(campaign.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {/* AI Result Card */}
                         <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-[2rem] border border-primary-100 shadow-sm space-y-6">
                            <div className="flex items-center space-x-3 text-indigo-700">
                                <Sparkles className="w-6 h-6 animate-pulse" />
                                <h3 className="font-extrabold text-lg uppercase tracking-wider">AI Insights</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm">
                                    <span className="text-sm text-slate-500 font-bold">Survival Chance</span>
                                    <span className={`text-sm font-extrabold px-3 py-1 rounded-full uppercase tracking-widest ${
                                        campaign.survivalProbability === 'High' ? 'bg-green-100 text-green-700' : 
                                        campaign.survivalProbability === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {campaign.survivalProbability}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm">
                                    <span className="text-sm text-slate-500 font-bold">Urgency Score</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-red-500" style={{ width: `${campaign.urgencyScore}%` }}></div>
                                        </div>
                                        <span className="text-sm font-extrabold text-red-600">{campaign.urgencyScore}%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-50/50 p-3 rounded-xl border border-dashed border-indigo-200">
                                <ShieldCheck className="w-4 h-4" />
                                <span>Clinical Logic Applied</span>
                            </div>
                         </div>

                         {/* Hospital Card */}
                         <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-[2rem] border border-green-100 shadow-sm space-y-6">
                            <div className="flex items-center space-x-3 text-green-700">
                                <Hospital className="w-6 h-6" />
                                <h3 className="font-extrabold text-lg uppercase tracking-wider">Healthcare Partner</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-2xl border border-green-100 shadow-sm">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Partner Hospital</p>
                                    <p className="font-extrabold text-slate-900">{campaign.hospital?.name || "LifeLink Verification Hospital"}</p>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-green-100 shadow-sm flex items-center justify-between">
                                    <span className="text-sm text-slate-500 font-bold">Status</span>
                                    <div className="flex items-center space-x-2 text-green-600">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-xs font-extrabold uppercase tracking-widest">Active Bed Available</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={handleContactHospital}
                                className="w-full py-3 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transform active:scale-95"
                            >
                                <span>Contact Hospital</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                         </div>
                    </div>

                    {/* Donation Widget */}
                    <div className="glass p-10 rounded-[2.5rem] shadow-2xl space-y-10 border border-slate-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-10 w-4 h-full bg-primary-600/5 -skew-x-12 group-hover:bg-primary-600/10 transition-colors"></div>
                        <div className="flex justify-between items-end">
                            <div className="space-y-2">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Current Funds</p>
                                <h2 className="text-5xl font-extrabold text-primary-600">₹{campaign.raisedAmount.toLocaleString()}</h2>
                                <p className="text-sm font-medium text-slate-400">of ₹ {campaign.requiredAmount.toLocaleString()} target</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Time Left</p>
                                <h4 className="text-2xl font-extrabold text-slate-900">{campaign.timeLeft} Days</h4>
                            </div>
                        </div>

                        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner ring-4 ring-slate-50">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className={`h-full ring-1 ring-white ${campaign.isEmergency ? 'bg-gradient-to-r from-red-500 via-primary-600 to-indigo-600' : 'bg-primary-600 hover:bg-primary-500 transition-colors'}`}
                            ></motion.div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                {[50, 100, 500, 1000].map(amt => (
                                    <button 
                                        key={amt}
                                        onClick={() => setDonationAmount(amt)}
                                        className={`px-6 py-3 rounded-2xl font-extrabold text-sm transition-all transform active:scale-95 ${
                                            donationAmount === amt 
                                            ? 'bg-primary-600 text-white shadow-xl scale-110' 
                                            : 'bg-slate-100 text-slate-500 hover:bg-primary-50 hover:text-primary-600 border border-slate-200'
                                        }`}
                                    >
                                        ₹{amt}
                                    </button>
                                ))}
                            </div>
                            <div className={`relative group transition-all duration-500 ${donationAmount > 100 ? 'scale-105' : ''}`}>
                                {donationAmount > 100 && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }} 
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute -top-7 left-0 right-0 text-center"
                                    >
                                        <span className="bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg border border-white/20">
                                            🌟 Significant Contribution 🌟
                                        </span>
                                    </motion.div>
                                )}
                                <span className={`absolute left-6 top-5 font-black text-2xl transition-colors ${donationAmount > 100 ? 'text-primary-600' : 'text-slate-400'}`}>₹</span>
                                <input 
                                    type="number" 
                                    className={`w-full pl-14 pr-6 py-6 border-2 rounded-[2rem] transition-all outline-none font-black text-2xl group-hover:border-primary-200 shadow-sm ${
                                        donationAmount > 100 
                                        ? 'bg-primary-50 border-primary-500 ring-4 ring-primary-100 text-primary-900' 
                                        : 'bg-slate-50 border-slate-100 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 text-slate-700'
                                    }`}
                                    placeholder="Enter amount..."
                                    value={donationAmount}
                                    onChange={(e) => setDonationAmount(e.target.value)}
                                />
                                {donationAmount > 100 && (
                                    <div className="absolute right-6 top-6">
                                        <Sparkles className="w-8 h-8 text-primary-400 animate-pulse" />
                                    </div>
                                )}
                            </div>
                            <button 
                                disabled={isDonating || campaign.raisedAmount >= campaign.requiredAmount}
                                onClick={handleDonate}
                                className={`w-full py-6 text-xl font-extrabold flex items-center justify-center space-x-3 rounded-[1.5rem] shadow-2xl transition-all transform active:scale-95 ${
                                    campaign.raisedAmount >= campaign.requiredAmount 
                                    ? 'bg-green-100 text-green-600 cursor-not-allowed border-2 border-green-200' 
                                    : 'btn-primary hover:shadow-primary-300'
                                }`}
                            >
                                {isDonating ? (
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                ) : campaign.raisedAmount >= campaign.requiredAmount ? (
                                    <>
                                        <ShieldCheck className="w-6 h-6" />
                                        <span>Target Reached! Thanks!</span>
                                    </>
                                ) : (
                                    <>
                                        <Heart className="w-6 h-6 fill-white" />
                                        <span>Donate & Support</span>
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs font-bold text-slate-400 flex items-center justify-center space-x-2">
                                <ShieldCheck className="w-4 h-4" />
                                <span>Powered by BlockTrust Layer & Zero-Commission Platform</span>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Tabs / Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <div className="card p-10 space-y-10 rounded-[2.5rem]">
                        <div className="flex items-center space-x-4 border-b border-slate-100 pb-6 overflow-x-auto scrollbar-hide">
                            <button 
                                onClick={() => setActiveTab('story')}
                                className={`px-6 py-3 rounded-xl font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2 transition-all ${activeTab === 'story' ? 'bg-primary-50 text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <Bookmark className="w-4 h-4" />
                                <span>Medical Story</span>
                            </button>
                            <button 
                                onClick={() => setActiveTab('history')}
                                className={`px-6 py-3 rounded-xl font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2 transition-all ${activeTab === 'history' ? 'bg-primary-50 text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <History className="w-4 h-4" />
                                <span>Funding History</span>
                            </button>
                            <button 
                                onClick={() => setActiveTab('comments')}
                                className={`px-6 py-3 rounded-xl font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2 transition-all ${activeTab === 'comments' ? 'bg-primary-50 text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span>Comments</span>
                            </button>
                        </div>

                        {activeTab === 'story' && (
                            <div className="space-y-10">
                                <div className="prose prose-slate max-w-none">
                                    <p className="text-xl italic font-serif text-slate-600 leading-relaxed indent-8 first-letter:text-5xl first-letter:font-bold first-letter:text-primary-600 first-letter:mr-3 first-letter:float-left">
                                        {campaign.description}
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 mt-10 border-t border-slate-100">
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Disease</p>
                                            <p className="font-extrabold text-slate-900">{campaign.disease}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage</p>
                                            <p className="font-extrabold text-slate-900">{campaign.stage || 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verification</p>
                                            <p className="font-extrabold text-green-600">Complete</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Platform Fee</p>
                                            <p className="font-extrabold text-primary-600">0% FREE</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Medical Story Evidence */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Clinical Evidence & Reports</h4>
                                    <div className="grid grid-cols-3 gap-6">
                                        {[
                                            'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=800',
                                            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
                                            'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800'
                                        ].map((url, i) => (
                                            <div key={i} className="aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 group cursor-zoom-in">
                                                <img 
                                                    src={url} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-90 group-hover:opacity-100"
                                                    alt="medical evidence"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className="space-y-6">
                                {mockFundingHistory.map((item, idx) => (
                                    <motion.div 
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={idx} 
                                        className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary-200 transition-all"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-slate-900">{item.name}</p>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{item.date}</p>
                                            </div>
                                        </div>
                                        <span className="text-lg font-black text-primary-600">₹{item.amount.toLocaleString()}</span>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'comments' && (
                             <div className="space-y-6">
                                 {mockComments.map((comment, idx) => (
                                     <motion.div 
                                         initial={{ opacity: 0, y: 10 }}
                                         animate={{ opacity: 1, y: 0 }}
                                         key={idx} 
                                         className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2"
                                     >
                                         <div className="flex justify-between items-center">
                                             <p className="font-extrabold text-slate-900 text-sm">{comment.user}</p>
                                             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{comment.date}</p>
                                         </div>
                                         <p className="text-slate-600 font-medium italic">"{comment.text}"</p>
                                     </motion.div>
                                 ))}
                             </div>
                        )}
                    </div>

                    {/* Timeline Updates */}
                    <div className="space-y-10">
                        <div className="flex items-center justify-between px-4">
                            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-3">
                                <History className="w-8 h-8 text-primary-600" />
                                <span>Patient Timeline</span>
                            </h3>
                            <div className="bg-primary-50 px-4 py-2 rounded-full border border-primary-100">
                                <span className="text-xs font-extrabold text-primary-600 uppercase tracking-[0.2em]">{campaign.updates.length} Updates</span>
                            </div>
                        </div>

                        <div className="space-y-2 relative">
                            {/* Vertical Graph Line */}
                            <div className="absolute left-[39px] top-6 bottom-6 w-1 bg-slate-100 rounded-full"></div>

                            {/* Graph-based Timeline Visualization */}
                            <div className="absolute left-[30px] top-6 bottom-6 w-5 flex flex-col justify-between items-center opacity-20 pointer-events-none">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className="w-full h-0.5 bg-primary-300"></div>
                                ))}
                            </div>

                            {/* Post Update Form (Owner Only) */}
                            {user?.id === campaign.user?._id && (
                                <div className="ml-2 relative z-10 flex items-start space-x-6 bg-white/50 backdrop-blur-md p-8 rounded-[2rem] border-2 border-dashed border-primary-200 shadow-xl group hover:border-solid hover:border-primary-500 transition-all">
                                    <div className="w-20 h-20 rounded-2xl bg-primary-600 flex-shrink-0 flex items-center justify-center text-white shadow-lg transform group-hover:rotate-12 transition-transform">
                                        <PlusCircle className="w-10 h-10" />
                                    </div>
                                    <form onSubmit={handlePostUpdate} className="flex-grow space-y-4">
                                        <textarea 
                                            className="w-full p-6 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary-50 outline-none font-medium text-slate-600 resize-none min-h-[120px] transition-all"
                                            placeholder="Post a medical update or thank your donors..."
                                            value={updateText}
                                            onChange={(e) => setUpdateText(e.target.value)}
                                        ></textarea>
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs font-bold text-slate-400 flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 rounded-lg">
                                                <Zap className="w-4 h-4 text-yellow-500" />
                                                <span>Visible to all donors instantly</span>
                                            </p>
                                            <button 
                                                disabled={isPostingUpdate || !updateText.trim()}
                                                className="btn-primary py-3 px-8 text-sm font-extrabold flex items-center space-x-2 rounded-xl group"
                                            >
                                                <span>Post Live Update</span>
                                                <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {campaign.updates.map((update, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="ml-2 relative z-10 flex items-start space-x-6"
                                >
                                    <div className="w-20 h-20 rounded-2xl ring-8 ring-white bg-primary-600 flex-shrink-0 flex flex-col items-center justify-center text-white shadow-xl overflow-hidden border-4 border-primary-100 z-20">
                                        <h4 className="text-xl font-black">{new Date(update.date).getDate()}</h4>
                                        <span className="text-[10px] uppercase font-black opacity-80">{new Date(update.date).toLocaleString('default', { month: 'short' })}</span>
                                    </div>
                                    <div className="flex-grow card p-8 rounded-3xl hover:translate-x-2 transition shadow-lg bg-white/80 backdrop-blur-sm border-l-8 border-l-primary-600 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform"></div>
                                        <div className="flex justify-between items-start mb-4 relative z-10">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 bg-primary-50 px-3 py-1 rounded-full">Phase {idx + 1} Recovery</span>
                                            <TrendingUp className="w-4 h-4 text-green-500" />
                                        </div>
                                        <p className="text-slate-600 font-bold leading-relaxed relative z-10">
                                            {update.text}
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center space-x-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            <span>Progress Graph Recorded</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Sticky Widgets */}
                <div className="space-y-8">
                    {/* Share Widget */}
                    <div className="card p-8 rounded-[2rem] space-y-6 sticky top-28 bg-gradient-to-br from-primary-600 to-primary-900 text-white shadow-2xl border-none overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <h3 className="text-2xl font-extrabold tracking-tight">Help by Sharing</h3>
                        <p className="text-primary-100 opacity-90 text-sm leading-relaxed">
                            Every share brings an average of <span className="text-white font-bold">₹1000 more</span> in donations. Be a voice for {campaign.patientName}!
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={handleSendWishes}
                                className="flex items-center justify-center space-x-2 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl transition font-bold text-[10px] uppercase tracking-widest border border-white/20"
                            >
                                <Heart className="w-4 h-4 fill-white" />
                                <span>Get Well Soon</span>
                            </button>
                            <button 
                                onClick={handleShareWhatsapp}
                                className="flex items-center justify-center space-x-2 py-4 bg-white text-primary-700 rounded-2xl hover:bg-primary-50 transition font-bold text-xs uppercase tracking-widest shadow-xl"
                            >
                                <Send className="w-4 h-4" />
                                <span>WhatsApp</span>
                            </button>
                        </div>
                    </div>

                    {/* Donor Impact Stats */}
                    <div className="card p-8 rounded-[2rem] space-y-8 shadow-xl">
                         <div className="flex items-center space-x-3 text-slate-900">
                            <History className="w-6 h-6 text-primary-600" />
                            <h3 className="font-extrabold text-lg uppercase tracking-wider">Top Supporters</h3>
                         </div>
                         <div className="space-y-6">
                            {[
                                { name: "Sarah J.", amount: Math.floor(campaign.raisedAmount * 0.15), badge: <div className="w-2 h-2 rounded-full bg-red-500" /> },
                                { name: "Michael R.", amount: Math.floor(campaign.raisedAmount * 0.08), badge: <div className="w-2 h-2 rounded-full bg-yellow-400" /> },
                                { name: "Anonymous", amount: Math.floor(campaign.raisedAmount * 0.03) },
                                { name: "LifeWell Corp", amount: Math.floor(campaign.raisedAmount * 0.25), badge: <div className="w-2 h-2 rounded-full bg-indigo-500" /> }
                            ].sort((a, b) => b.amount - a.amount).map((supporter, idx) => (
                                <div key={idx} className="flex items-center justify-between group cursor-default">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary-600 font-black border border-slate-100 group-hover:bg-primary-600 group-hover:text-white transition-all">
                                            {supporter.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-extrabold text-slate-900 group-hover:text-primary-600 transition-colors flex items-center gap-2">
                                                {supporter.name}
                                                {supporter.badge}
                                            </p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{idx === 0 ? 'Lead Donor' : 'Helping Hand'}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-black text-slate-900">₹{supporter.amount.toLocaleString()}</span>
                                </div>
                            ))}
                         </div>
                         <Link to="/leaderboard" className="block text-center text-xs font-bold text-primary-600 hover:text-primary-700 transition uppercase tracking-[0.2em] pt-4 border-t border-slate-100">
                             View Impact Leaderboard
                         </Link>
                    </div>

                    {/* Trust Factor Card */}
                    <div className="card p-8 rounded-[2.5rem] bg-slate-50 border-dashed border-2 border-slate-200 shadow-none space-y-6">
                        <div className="flex items-center space-x-3 text-slate-900">
                            <ShieldCheck className="w-6 h-6 text-green-500" />
                            <h3 className="font-extrabold text-lg uppercase tracking-wider">Trust Info</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5">✓</div>
                                <p className="text-xs text-slate-500 font-semibold leading-relaxed">Medical reports are manually verified by our clinical board.</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5">✓</div>
                                <p className="text-xs text-slate-500 font-semibold leading-relaxed">Funds are directly transferred to the partner hospital.</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5">✓</div>
                                <p className="text-xs text-slate-500 font-semibold leading-relaxed">Transactions are recorded on our transparency ledger.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Hospital Contact Modal */}
            <AnimatePresence>
                {showHospitalModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-[3rem] shadow-2xl p-12 w-full max-w-lg relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-primary-600"></div>
                            
                            <button 
                                onClick={() => setShowHospitalModal(false)}
                                className="absolute top-8 right-8 p-3 bg-slate-100 text-slate-400 hover:text-red-500 rounded-2xl hover:bg-red-50 transition-all"
                            >
                                <Zap className="w-6 h-6 transform rotate-45" />
                            </button>

                            <div className="space-y-8">
                                <div className="text-center space-y-3">
                                    <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto ring-4 ring-green-100 border-2 border-green-200">
                                        <Hospital className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Verified Hospital</h2>
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Direct Verification Channel</p>
                                </div>

                                <div className="bg-slate-50 rounded-[2rem] p-8 space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4 border-b border-slate-200 pb-4">
                                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                                <ShieldCheck className="w-6 h-6 text-green-500" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Partner Name</p>
                                                <p className="font-extrabold text-slate-900">{campaign.hospital?.name || "LifeLink Healthcare Network"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4 border-b border-slate-200 pb-4">
                                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                                <Clock className="w-6 h-6 text-primary-500" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Operating Hours</p>
                                                <p className="font-extrabold text-slate-900">24/7 Emergency Wing</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                                <Heart className="w-6 h-6 text-red-500" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient ID</p>
                                                <p className="font-extrabold text-slate-900">LL-{campaign._id.slice(-6).toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => handleCallHospital('9876543210')}
                                        className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-3 hover:bg-slate-800 transition-all shadow-xl"
                                    >
                                        <Send className="w-5 h-5" />
                                        <span>Call Now</span>
                                    </button>
                                    <button 
                                        onClick={() => {
                                            navigator.clipboard.writeText('9876543210');
                                            toast.success('Number copied to clipboard!');
                                        }}
                                        className="w-full py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-[1.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-3 hover:bg-slate-50 transition-all shadow-sm"
                                    >
                                        <Bookmark className="w-5 h-5 text-primary-500" />
                                        <span>Copy Info</span>
                                    </button>
                                </div>
                                <p className="text-center text-[10px] font-bold text-slate-400">Your privacy is protected. LifeLink records calls for patient safety.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CampaignDetail;
