import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
    Users, Heart, Activity, Info, 
    Phone, MapPin, Search, PlusCircle, 
    Loader2, AlertCircle, ShieldCheck, 
    Zap, Clock, Ambulance, Briefcase, Pill,
    ArrowRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const VolunteerPage = () => {
    const { user } = useAuth();
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: user?.name || '',
        type: 'blood donor',
        location: '',
        phone: '',
        // Conditional fields
        age: '',
        gender: 'male',
        bloodGroup: 'O+',
        hasDisease: 'no',
        experience: '',
        medSource: '',
        purchaseLocation: ''
    });

    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [showContactModal, setShowContactModal] = useState(false);

    // New Interactive States
    const [ambulanceStatus, setAmbulanceStatus] = useState('idle'); // idle, searching, dispatched, arrived
    const [showBedRadar, setShowBedRadar] = useState(false);
    const [showMedicineList, setShowMedicineList] = useState(false);
    const [selectedBed, setSelectedBed] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [isBooking, setIsBooking] = useState(false);

    const medicineNeeded = [
        { id: 1, name: 'Remdesivir', quantity: '5 vials', priority: 'High', location: 'Apollo, Mumbai', distance: '2.4km' },
        { id: 2, name: 'Tocilizumab', quantity: '2 doses', priority: 'High', location: 'City Gen, Delhi', distance: '5.1km' },
        { id: 3, name: 'Fabiflu', quantity: '10 tablets', priority: 'Medium', location: 'Local Clinic, Pune', distance: '1.2km' },
        { id: 4, name: 'Oxygen Concentrator', quantity: '1 unit', priority: 'Critical', location: 'NGO Center, Pune', distance: '0.8km' },
    ];

    const dummyVolunteers = [
        {
            _id: 'v1',
            type: 'blood donor',
            location: 'Mumbai, Maharashtra',
            phone: '9876543210',
            status: 'available',
            skills: ['O+ Blood', 'Available anytime'],
            user: { name: 'Rahul Khanna' }
        },
        {
            _id: 'v2',
            type: 'caretaker',
            location: 'Bangalore, Karnataka',
            phone: '8765432109',
            status: 'available',
            skills: ['Senior care', 'First Aid'],
            user: { name: 'Anita Desai' }
        },
        {
            _id: 'v3',
            type: 'medicine donor',
            location: 'Delhi, NCR',
            phone: '7654321098',
            status: 'available',
            skills: ['Life-saving meds', 'Unused'],
            user: { name: 'Vikram Singh' }
        },
        {
            _id: 'v4',
            type: 'blood donor',
            location: 'Chennai, Tamil Nadu',
            phone: '6543210987',
            status: 'busy',
            skills: ['B- Blood', 'City center'],
            user: { name: 'Priya Rajan' }
        }
    ];

    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                const res = await api.get('/volunteers');
                if (res.data.success && res.data.data.length > 0) {
                    // Filter out exact duplicates based on phone
                    const realData = res.data.data.filter((item, index, self) =>
                        index === self.findIndex((t) => t.phone === item.phone)
                    );
                    setVolunteers(realData);
                } else {
                    setVolunteers(dummyVolunteers);
                }
            } catch (err) {
                console.error('Failed to fetch volunteer data, using dummy data');
                setVolunteers(dummyVolunteers);
            } finally {
                setLoading(false);
            }
        };
        fetchVolunteers();
    }, []);

    const handleContact = (v) => {
        if (!user) {
            toast.error('Please login to contact volunteers');
            return navigate('/login');
        }
        setSelectedVolunteer(v);
        setShowContactModal(true);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!user) return toast.error('Please login first');

        setIsSubmitting(true);
        // Construct detailed skills/description based on type
        let skillsArray = [];
        if (formData.type === 'blood donor') {
            skillsArray = [`Group: ${formData.bloodGroup}`, `Age: ${formData.age}`, `Gender: ${formData.gender}`, `Healthy: ${formData.hasDisease}`];
        } else if (formData.type === 'caretaker') {
            skillsArray = [`Exp: ${formData.experience}`, `Gender: ${formData.gender}`];
        } else if (formData.type === 'medicine donor') {
            skillsArray = [`Source: ${formData.medSource}`, `Store: ${formData.purchaseLocation}`];
        }

        try {
            const res = await api.post('/volunteers', {
                ...formData,
                skills: skillsArray
            });
            if (res.data.success) {
                toast.success('Volunteer registered successfully! Thank you for your kindness.');
                setShowRegister(false);
                setVolunteers([res.data.data, ...volunteers]);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRequestAmbulance = () => {
        setAmbulanceStatus('searching');
        setTimeout(() => {
            toast.success('Nearby Ambulance Found! Dispatching now...', { icon: '🚑' });
            setAmbulanceStatus('dispatched');
        }, 3000);
    };

    const filteredVolunteers = volunteers.filter(v => 
        (v.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
        v.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-slate-50/50 pb-32 pt-24 lg:pt-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob pointer-events-none"></div>
            <div className="absolute bottom-40 left-0 w-[40rem] h-[40rem] bg-green-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

            <div className="section-container space-y-16 md:space-y-24 relative z-10">
                {/* Header Section */}
                <header className="relative bg-white p-8 md:p-16 lg:px-24 lg:py-28 rounded-[2rem] md:rounded-[4rem] shadow-2xl border border-slate-100 text-center space-y-10 group overflow-hidden">
                    <div className="absolute top-0 right-0 w-3 h-full bg-primary-600/5 group-hover:bg-primary-600/10 transition-colors"></div>
                    <div className="inline-flex items-center space-x-3 px-4 py-2 bg-primary-50 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary-700 border border-primary-100 italic">
                        <Heart className="w-4 h-4 fill-primary-600" />
                        <span>The Human Network Grid</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1] uppercase italic">
                        Beyond wealth, <br />
                        we need <span className="text-primary-600 underline underline-offset-[12px] decoration-primary-200">Action</span>.
                    </h1>
                    <p className="max-w-3xl mx-auto text-base md:text-xl text-slate-500 font-bold leading-relaxed opacity-80">
                        Join an elite network of high-impact volunteers providing critical support like <span className="text-slate-900">Blood Augmentation</span>, <span className="text-slate-900">Patient Logistics</span>, 
                        and <span className="text-slate-900">Medicine Relays</span>.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                        <button 
                            onClick={() => setShowRegister(true)}
                            className="btn-primary w-full sm:w-auto py-5 px-14 text-sm font-black shadow-primary-500/20"
                        >
                            <span>Become Operative</span>
                            <Zap className="w-5 h-5 ml-4" />
                        </button>
                        <a href="#quick-emergency" className="btn-secondary w-full sm:w-auto py-5 px-14 text-sm font-black rounded-3xl border-2 border-slate-100 bg-white">
                            Emergency Rescue
                        </a>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-12 border-t border-slate-50">
                        <div className="flex items-center space-x-3 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">
                            <ShieldCheck className="w-4 h-4 text-healthcare-green" />
                            <span>Verified Assets</span>
                        </div>
                        <div className="flex items-center space-x-3 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">
                            <Activity className="w-4 h-4 text-primary-500" />
                            <span>Real-time Response Grid</span>
                        </div>
                    </div>
                </header>

            {/* Support Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Module 1: Ambulance */}
                <div id="quick-emergency" className={`card p-10 rounded-[3rem] text-white shadow-2xl border-none space-y-6 relative overflow-hidden group transition-all duration-500 ${ambulanceStatus === 'idle' ? 'bg-gradient-to-br from-red-600 to-red-800' : 'bg-slate-900'}`}>
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                     
                     {ambulanceStatus === 'idle' ? (
                        <>
                            <div className="p-4 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20 inline-block shadow-lg">
                                <Ambulance className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-black tracking-tight leading-tight">Request <br />Ambulance</h3>
                            <p className="text-red-100 font-medium opacity-90 leading-relaxed text-sm">
                                Need immediate transport? Our smart dispatch system connects you with the nearest emergency vehicle.
                            </p>
                            <button onClick={handleRequestAmbulance} className="w-full py-5 bg-white text-red-600 font-black rounded-3xl shadow-xl hover:bg-red-50 transition-all transform active:scale-95 text-xs uppercase tracking-widest">
                                Dispatch Request Now
                            </button>
                        </>
                     ) : ambulanceStatus === 'searching' ? (
                        <div className="flex flex-col items-center justify-center py-10 space-y-6">
                            <div className="relative">
                                <motion.div 
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-red-500 rounded-full"
                                ></motion.div>
                                <div className="relative bg-red-600 p-8 rounded-full shadow-2xl">
                                    <Search className="w-12 h-12 animate-pulse" />
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-black uppercase tracking-widest">Scanning Locality...</h3>
                                <p className="text-xs text-red-200 font-bold mt-2">Connecting to nearest 24/7 dispatcher</p>
                            </div>
                        </div>
                     ) : (
                        <div className="space-y-6 py-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black uppercase tracking-tight text-red-500">Vehicle LL-429 Dispatched</h3>
                                <div className="bg-red-500/20 px-3 py-1 rounded-full text-[10px] font-black uppercase text-red-400 border border-red-500/30">Live</div>
                            </div>
                            {/* Visual Tracking Line */}
                            <div className="relative h-20 flex items-center">
                                <div className="absolute left-0 right-0 h-1 bg-slate-800 rounded-full"></div>
                                <motion.div 
                                    initial={{ left: '0%' }}
                                    animate={{ left: '60%' }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                    className="absolute"
                                >
                                    <div className="relative">
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-600 px-3 py-1 rounded-lg text-[10px] font-black whitespace-nowrap shadow-xl">8 mins arrival</div>
                                        <Ambulance className="w-10 h-10 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                                    </div>
                                </motion.div>
                                <div className="absolute right-0 w-4 h-4 bg-primary-600 rounded-full border-4 border-slate-900 shadow-xl"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => window.location.href='tel:9876543210'} className="py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center space-x-2 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                    <Phone className="w-4 h-4" />
                                    <span>Call Driver</span>
                                </button>
                                <button onClick={() => setAmbulanceStatus('idle')} className="py-4 bg-red-600 rounded-2xl flex items-center justify-center space-x-2 text-xs font-black uppercase tracking-widest hover:bg-red-500 shadow-lg">
                                    <span>Cancel</span>
                                </button>
                            </div>
                        </div>
                     )}
                </div>

                {/* Module 2: Medicine Needed */}
                <div className="card p-10 rounded-[3rem] bg-indigo-900 text-white shadow-2xl border-none space-y-6 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                     <div className="flex items-center justify-between">
                        <div className="p-4 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20 inline-block shadow-lg">
                            <Pill className="w-10 h-10" />
                        </div>
                        <span className="text-[10px] font-black bg-red-500 px-3 py-1 rounded-full uppercase tracking-widest">4 Critical Needs</span>
                     </div>
                     <h3 className="text-3xl font-black tracking-tight leading-tight">Urgent Medicine Needed</h3>
                     <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2 scrollbar-hide py-2">
                        {medicineNeeded.map((m) => (
                            <div key={m.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group/item">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-black text-sm uppercase tracking-tight">{m.name}</h4>
                                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${m.priority === 'Critical' ? 'bg-red-500' : 'bg-orange-500'}`}>{m.priority}</span>
                                </div>
                                <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest flex items-center gap-2">
                                    <MapPin className="w-3 h-3" />
                                    {m.location} • {m.distance}
                                </p>
                            </div>
                        ))}
                     </div>
                     <button onClick={() => setShowMedicineList(true)} className="w-full py-5 bg-white text-indigo-900 font-black rounded-3xl shadow-xl hover:bg-indigo-50 transition-all transform active:scale-95 text-xs uppercase tracking-widest flex items-center justify-center space-x-2">
                        <span>View All Requirements</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Module 3: Hospital Beds */}
                <div className="card p-10 rounded-[3rem] bg-white text-slate-900 shadow-2xl space-y-8 border border-slate-100 relative overflow-hidden group">
                     <div className="flex items-center justify-between">
                        <div className="p-4 bg-slate-100 rounded-[2rem] inline-block shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                            <Activity className="w-10 h-10" />
                        </div>
                        <div className="bg-green-100 px-4 py-2 rounded-full border border-green-200">
                            <span className="text-[10px] font-black text-green-700 uppercase tracking-widest animate-pulse">Live Tracking</span>
                        </div>
                     </div>
                     <h3 className="text-3xl font-black tracking-tight leading-tight">Bed <br />Availability</h3>
                     <p className="text-slate-500 font-medium opacity-90 leading-relaxed text-sm">
                         Real-time tracking of ICU and standard beds in partner hospitals. Updated every 5 minutes.
                     </p>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                            <span>ICU Capacity</span>
                            <span className="text-slate-900">82%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-50 shadow-inner">
                            <div className="w-[82%] h-full bg-primary-600 rounded-full"></div>
                        </div>
                     </div>
                     <button onClick={() => setShowBedRadar(true)} className="w-full py-5 bg-primary-600 text-white font-black rounded-3xl shadow-xl hover:bg-primary-700 transition-all transform active:scale-95 text-xs uppercase tracking-widest flex items-center justify-center space-x-2">
                        <Search className="w-4 h-4" />
                        <span>Check Nearby Beds</span>
                    </button>
                </div>
            </div>

            {/* Volunteer List Section */}
            {/* Volunteer List Section */}
            <div className="space-y-12 md:space-y-16 pt-12">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 px-2">
                    <div className="space-y-4 max-w-2xl">
                        <div className="flex items-center gap-4 text-primary-600">
                            <Users className="w-10 h-10" />
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase italic leading-none">
                                Community <br className="md:hidden" /> Support Center
                            </h2>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">Protocol: Peer-to-Peer Humanitarian Grid</p>
                    </div>
                    <div className="relative w-full lg:w-[450px] group">
                        <div className="absolute inset-0 bg-primary-600/5 blur-2xl group-hover:bg-primary-600/10 transition-all rounded-full"></div>
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary-600 transition-colors z-10" />
                        <input 
                            type="text" 
                            className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-primary-50 focus:border-primary-200 outline-none font-bold text-sm text-slate-600 placeholder:text-slate-300 transition-all shadow-xl relative z-0"
                            placeholder="Filter by skill, type, or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-48 bg-white/50 rounded-[3rem] border-2 border-dashed border-slate-100 backdrop-blur-sm">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                            <Loader2 className="w-20 h-20 text-primary-600 animate-spin relative z-10" />
                        </div>
                        <p className="mt-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse italic">Synchronizing with Support Grid</p>
                    </div>
                ) : filteredVolunteers.length === 0 ? (
                    <div className="card p-24 text-center border-dashed border-2 border-slate-100 space-y-8 flex flex-col items-center bg-white/50">
                        <div className="w-28 h-28 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200 border border-slate-100 shadow-inner">
                            <Users className="w-14 h-14" />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">No Active Assets Found</h3>
                            <p className="text-slate-400 font-bold max-w-sm italic">The current sector has no volunteers matching your criteria. Be the first to mobilize.</p>
                        </div>
                        <button onClick={() => setShowRegister(true)} className="btn-secondary px-12 py-4 rounded-2xl border-dashed uppercase text-[10px] font-black tracking-widest">Initial Registration</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredVolunteers.map((v, idx) => (
                            <motion.div 
                                key={v._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="card p-8 rounded-[2.5rem] bg-white hover:bg-slate-900 group transition-all duration-500 shadow-xl border border-slate-50 hover:border-slate-800 relative flex flex-col justify-between"
                            >
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-50 group-hover:bg-primary-600 flex items-center justify-center shadow-inner group-hover:shadow-2xl group-hover:shadow-primary-600/40 transition-all duration-500 transform group-hover:rotate-12">
                                            <span className="text-slate-300 group-hover:text-white text-3xl font-black italic">{v.user?.name[0]}</span>
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border ${
                                            v.status === 'available' 
                                            ? 'bg-healthcare-green/10 text-healthcare-green border-healthcare-green/20' 
                                            : 'bg-healthcare-red/10 text-healthcare-red border-healthcare-red/20'
                                        }`}>
                                            {v.status}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-xl font-black text-slate-900 group-hover:text-white transition-colors uppercase tracking-tight italic leading-none">{v.user?.name}</h4>
                                        <p className="text-[10px] font-black text-primary-600 group-hover:text-primary-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                                            <span>{v.type}</span>
                                        </p>
                                    </div>
                                    <div className="space-y-4 pt-4 border-t border-slate-50 group-hover:border-slate-800 transition-colors">
                                        <div className="flex items-center space-x-4 text-slate-400 group-hover:text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                            <MapPin className="w-4 h-4 text-primary-500" />
                                            <span>{v.location}</span>
                                        </div>
                                        <div className="flex items-center space-x-4 text-slate-400 group-hover:text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                            <Phone className="w-4 h-4 text-primary-500" />
                                            <span className="tracking-[0.1em]">{user ? v.phone : 'SECURED LINE'}</span>
                                        </div>
                                    </div>
                                    {v.skills?.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {v.skills.slice(0, 3).map((s, i) => (
                                                <span key={i} className="text-[8px] font-black uppercase tracking-widest bg-slate-50 group-hover:bg-white/5 px-2.5 py-1 rounded-lg text-slate-400 group-hover:text-slate-500 border border-transparent group-hover:border-white/5">{s}</span>
                                            ))}
                                            {v.skills.length > 3 && <span className="text-[8px] font-black text-slate-300">+{v.skills.length - 3}</span>}
                                        </div>
                                    )}
                                </div>
                                <button 
                                    onClick={() => handleContact(v)}
                                    className="w-full mt-10 py-5 bg-slate-900 group-hover:bg-primary-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl transition-all transform active:scale-95 group-hover:shadow-primary-600/40"
                                >
                                    Engage Contact
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Volunteer Contact Modal */}
            <AnimatePresence>
                {showContactModal && selectedVolunteer && (
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
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 to-indigo-600"></div>
                            
                            <button 
                                onClick={() => setShowContactModal(false)}
                                className="absolute top-8 right-8 p-3 bg-slate-100 text-slate-400 hover:text-red-500 rounded-2xl hover:bg-red-50 transition-all"
                            >
                                <Zap className="w-6 h-6 transform rotate-45" />
                            </button>

                            <div className="space-y-8">
                                <div className="text-center space-y-3">
                                    <div className="w-20 h-20 bg-primary-50 rounded-3xl flex items-center justify-center mx-auto ring-4 ring-primary-100 border-2 border-primary-200">
                                        <Users className="w-10 h-10 text-primary-600" />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedVolunteer.user?.name}</h2>
                                    <p className="text-primary-500 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                                        <Heart className="w-4 h-4" />
                                        <span>Verified {selectedVolunteer.type}</span>
                                    </p>
                                </div>

                                <div className="bg-slate-50 rounded-[2rem] p-8 space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4 border-b border-slate-200 pb-4">
                                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                                                <p className="font-extrabold text-slate-900">{selectedVolunteer.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Preferred Location</p>
                                                <p className="font-extrabold text-slate-900">{selectedVolunteer.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <button 
                                        onClick={() => window.location.href = `tel:${selectedVolunteer.phone}`}
                                        className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-3 hover:bg-primary-600 transition-all shadow-xl"
                                    >
                                        <Phone className="w-5 h-5" />
                                        <span>Call Now</span>
                                    </button>
                                    <button 
                                        onClick={() => {
                                            navigator.clipboard.writeText(selectedVolunteer.phone);
                                            toast.success('Volunteer number copied!');
                                        }}
                                        className="w-full py-4 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-primary-600 transition-colors"
                                    >
                                        Copy Number Instead
                                    </button>
                                </div>
                                <p className="text-center text-[10px] font-bold text-slate-400 italic">"Kindness is the language which the deaf can hear and the blind can see."</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Registration Modal Overlay */}
            <AnimatePresence>
                {showRegister && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-2xl flex items-center justify-center p-4 lg:p-12"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-2xl p-8 lg:p-16 w-full max-w-2xl relative overflow-y-auto max-h-[90vh] custom-scrollbar"
                        >
                            <button 
                                onClick={() => setShowRegister(false)}
                                className="absolute top-8 right-8 p-4 bg-slate-50 text-slate-400 hover:text-healthcare-red rounded-2xl transition-all hover:bg-red-50"
                            >
                                <Zap className="w-6 h-6 rotate-45" />
                            </button>
                            <div className="space-y-12">
                                <header className="space-y-4">
                                    <div className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] font-mono italic">Sector: Mobiliation_Init</div>
                                    <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic leading-none">Enter the <br />Human Net</h2>
                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest italic border-l-4 border-slate-100 pl-5">Deploy your skills to save vital resources and human lives.</p>
                                </header>

                                <form onSubmit={handleRegister} className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-1">Identified_Name</label>
                                            <div className="relative group">
                                                <Users className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-200 group-focus-within:text-primary-600 transition-colors" />
                                                <input 
                                                    type="text" required
                                                    className="w-full pl-16 pr-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary-50 outline-none font-black text-slate-700 placeholder:text-slate-200 transition-all shadow-inner"
                                                    placeholder="FULL LEGAL NAME"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-1">Utility_Profile</label>
                                            <div className="relative group">
                                                <Heart className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-200 group-focus-within:text-primary-600 transition-colors z-10" />
                                                <select 
                                                    className="w-full pl-16 pr-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary-50 outline-none font-black text-slate-700 appearance-none transition-all shadow-inner uppercase text-sm"
                                                    value={formData.type}
                                                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                                                >
                                                    <option value="blood donor">Blood_Augmentation</option>
                                                    <option value="caretaker">Patient_Logistics</option>
                                                    <option value="medicine donor">Medical_Relay</option>
                                                    <option value="other">General_Grid_Support</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                         <div className="space-y-4">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-1">Comm_Uplink</label>
                                            <div className="relative group">
                                                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-200 group-focus-within:text-primary-600 transition-colors" />
                                                <input 
                                                    type="tel" required
                                                    className="w-full pl-16 pr-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary-50 outline-none font-black text-slate-700 placeholder:text-slate-200 transition-all shadow-inner"
                                                    placeholder="+91 00000 00000"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-1">Station_Sector</label>
                                            <div className="relative group">
                                                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-200 group-focus-within:text-healthcare-green transition-colors" />
                                                <input 
                                                    type="text" required
                                                    className="w-full pl-16 pr-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-healthcare-green/10 outline-none font-black text-slate-700 placeholder:text-slate-200 transition-all shadow-inner"
                                                    placeholder="CITY / REGION"
                                                    value={formData.location}
                                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Conditional Blood Donor Fields */}
                                    {formData.type === 'blood donor' && (
                                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-healthcare-red/5 rounded-3xl border border-healthcare-red/10">
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-healthcare-red italic">Blood_Group</label>
                                                <select className="w-full p-4 bg-white text-healthcare-red rounded-xl font-black outline-none border border-healthcare-red/10 shadow-sm" value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})}>
                                                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-healthcare-red italic">Age_Verif</label>
                                                <input type="number" className="w-full p-4 bg-white rounded-xl font-black outline-none border border-healthcare-red/10 shadow-sm" placeholder="18-60" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-healthcare-red italic">Gender</label>
                                                <select className="w-full p-4 bg-white rounded-xl font-black outline-none border border-healthcare-red/10 shadow-sm" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                                                    <option value="male">MALE</option>
                                                    <option value="female">FEMALE</option>
                                                    <option value="other">OTHER</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-healthcare-red italic">Status_OK?</label>
                                                <select className="w-full p-4 bg-white rounded-xl font-black outline-none border border-healthcare-red/10 shadow-sm" value={formData.hasDisease} onChange={e => setFormData({...formData, hasDisease: e.target.value})}>
                                                    <option value="no">HEALTHY</option>
                                                    <option value="yes">CONDITION</option>
                                                </select>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Conditional Caretaker Fields */}
                                    {formData.type === 'caretaker' && (
                                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 p-6 bg-primary-50 rounded-3xl border border-primary-100">
                                            <div className="space-y-4">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-primary-600 italic">Field_Experience</label>
                                                <textarea 
                                                    className="w-full p-6 bg-white rounded-2xl font-black text-slate-700 outline-none focus:ring-4 focus:ring-primary-50 min-h-[120px] resize-none border border-primary-100 shadow-sm text-sm"
                                                    placeholder="DESCRIBE PREVIOUS PATIENT CARE LOGS..."
                                                    value={formData.experience}
                                                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                                                ></textarea>
                                            </div>
                                            <div className="grid grid-cols-2 gap-8">
                                                 <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-600">Gender</label>
                                                    <select className="w-full p-4 bg-white rounded-xl font-black outline-none border border-primary-100" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                                                        <option value="male">MALE</option>
                                                        <option value="female">FEMALE</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-600">Age</label>
                                                    <input type="number" className="w-full p-4 bg-white rounded-xl font-black outline-none border border-primary-100" placeholder="AGE" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Conditional Medicine Donor Fields */}
                                    {formData.type === 'medicine donor' && (
                                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                                            <div className="space-y-4">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-indigo-600 italic">Acquisition_Log</label>
                                                <input 
                                                    type="text"
                                                    className="w-full p-5 bg-white border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-100 outline-none font-black text-slate-700 shadow-sm uppercase text-xs"
                                                    placeholder="UNUSED SURPLUS / FAMILY REMAINING"
                                                    value={formData.medSource}
                                                    onChange={(e) => setFormData({...formData, medSource: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-indigo-600 italic">Source_Pharmacy</label>
                                                <input 
                                                    type="text"
                                                    className="w-full p-5 bg-white border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-100 outline-none font-black text-slate-700 shadow-sm uppercase text-xs"
                                                    placeholder="OFFICIAL PHARMACY NAME"
                                                    value={formData.purchaseLocation}
                                                    onChange={(e) => setFormData({...formData, purchaseLocation: e.target.value})}
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    <button 
                                        disabled={isSubmitting}
                                        className="w-full py-6 text-lg font-black bg-slate-900 group-hover:bg-primary-600 text-white rounded-[2rem] flex items-center justify-center space-x-6 shadow-2xl shadow-slate-900/40 transform active:scale-95 transition-all mt-8 uppercase tracking-[0.2em] italic"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="w-10 h-10 animate-spin" />
                                        ) : (
                                            <>
                                                <span>Deploy Deployment</span>
                                                <ArrowRight className="w-6 h-6" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Medicine Requirements Modal */}
            <AnimatePresence>
                {showMedicineList && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-2xl">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="w-full max-w-2xl bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-2xl p-8 lg:p-14 overflow-hidden relative max-h-[90vh] flex flex-col">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/50 rounded-full -mr-24 -mt-24 pointer-events-none"></div>
                            
                            <div className="relative space-y-10 flex flex-col h-full">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-3">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[8px] font-black uppercase tracking-[0.2em] italic">System: Pharmacy_Grid</div>
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Urgent <br />Relay Stock</h2>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-l-4 border-indigo-100 pl-4 max-w-sm">Critical pharmaceutical shortage detected. Mobilize surplus assets immediately.</p>
                                    </div>
                                    <button onClick={() => setShowMedicineList(false)} className="p-4 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-indigo-600 rounded-2xl transition-all border border-slate-100">
                                        <Pill className="w-6 h-6 rotate-45" />
                                    </button>
                                </div>

                                <div className="space-y-5 overflow-y-auto pr-4 custom-scrollbar flex-1 pb-4">
                                    {medicineNeeded.map((m) => (
                                        <div key={m.id} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-indigo-200 transition-all group relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-1 h-full bg-indigo-600/0 group-hover:bg-indigo-600 transition-all"></div>
                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                                                <div className="space-y-4">
                                                    <div className="space-y-1">
                                                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight italic leading-none">{m.name}</h3>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{m.quantity}</span>
                                                            <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest italic border ${
                                                                m.priority === 'Critical' 
                                                                ? 'bg-healthcare-red/10 text-healthcare-red border-healthcare-red/20' 
                                                                : 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20'
                                                            }`}>
                                                                {m.priority}_PRIORITY
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex items-center space-x-3 text-slate-400">
                                                            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest italic">{m.location}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-3 text-slate-400">
                                                            <Activity className="w-3.5 h-3.5 text-indigo-400" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest italic">{m.distance} FROM BASE</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex sm:flex-col gap-3 w-full sm:w-auto">
                                                    <button onClick={() => toast.success(`Communication uplinked with ${m.location}`)} className="flex-1 sm:w-16 h-12 bg-white text-indigo-600 rounded-xl shadow-sm border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all transform active:scale-95 group/btn">
                                                        <Phone className="w-5 h-5 group-hover/btn:animate-tada" />
                                                    </button>
                                                    <button onClick={() => toast.success('Navigation coordinates deployed to primary device')} className="flex-1 sm:w-16 h-12 bg-indigo-600 text-white rounded-xl shadow-lg flex items-center justify-center hover:bg-slate-900 transition-all transform active:scale-95">
                                                        <ArrowRight className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-slate-50 flex items-center justify-center">
                                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em] font-mono italic">Sector: Pharma_Exchange_Secure</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bed Radar Modal */}
            <AnimatePresence>
                {showBedRadar && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-3xl">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="w-full max-w-xl bg-slate-950 rounded-[3rem] md:rounded-[5rem] shadow-2xl border border-white/5 p-8 lg:p-16 overflow-hidden text-center relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-600/10 to-transparent opacity-50"></div>
                            
                            <div className="relative py-24 flex items-center justify-center">
                                {/* Concentric Circles */}
                                {[1, 2, 3, 4].map((i) => (
                                    <motion.div 
                                        key={i}
                                        animate={{ 
                                            scale: [1, 3], 
                                            opacity: [0.3, 0] 
                                        }}
                                        transition={{ 
                                            duration: 5, 
                                            repeat: Infinity, 
                                            delay: i * 1.5,
                                            ease: "linear"
                                        }}
                                        className="absolute w-48 h-48 border border-primary-500/30 rounded-full"
                                    ></motion.div>
                                ))}
                                
                                {/* Radar Sweeper */}
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-[400px] h-[400px] bg-gradient-to-r from-primary-500/20 to-transparent rounded-full origin-center opacity-30 pointer-events-none"
                                    style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)' }}
                                ></motion.div>

                                <div className="relative z-10 w-28 h-28 bg-primary-600 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(2,132,199,0.4)] border-4 border-white/10 group cursor-pointer">
                                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-20"></div>
                                    <Activity className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
                                </div>
                                
                                {/* Detected Points */}
                                {[
                                    { id: 1, t: '15%', l: '25%', d: 0.5, name: 'METRO GENERAL', type: 'ICU_DEPLOY', price: 15000 },
                                    { id: 2, t: '75%', l: '35%', d: 1.2, name: 'APOLLO_VITAL', type: 'O2_SUPPORT', price: 8000 },
                                    { id: 3, t: '45%', l: '80%', d: 2.0, name: 'LIFECARE_UNIT', type: 'GEN_WARD', price: 3500 },
                                ].map((p, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1.5 + p.d, type: 'spring' }}
                                        onClick={() => {
                                            setSelectedBed(p);
                                            setShowBookingModal(true);
                                        }}
                                        style={{ top: p.t, left: p.l }}
                                        className="absolute w-6 h-6 bg-healthcare-green rounded-full shadow-[0_0_30px_#22c55e] cursor-pointer hover:scale-150 transition-all z-20 group/point flex items-center justify-center border-2 border-white/20"
                                    >
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 px-3 py-1.5 rounded-xl text-[8px] font-black text-white whitespace-nowrap opacity-0 group-hover/point:opacity-100 transition-all pointer-events-none shadow-2xl">
                                            <div className="flex flex-col items-center gap-1">
                                                <span>{p.name}</span>
                                                <span className="text-healthcare-green">AVAIL_NOW</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="space-y-6 relative z-10 pt-10">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-black text-white tracking-[0.2em] uppercase italic leading-none">Scanning_Support_Grid</h3>
                                    <div className="h-1 w-32 bg-primary-600 mx-auto rounded-full"></div>
                                </div>
                                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest max-w-sm mx-auto italic">Identifying emergency logistic assets within 12 nautical miles. Visual confirmation required to lock asset.</p>
                            </div>

                            <button onClick={() => setShowBedRadar(false)} className="relative z-10 w-full mt-12 py-5 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl transition-all uppercase tracking-[0.3em] text-[10px] border border-white/10">
                                Terminate Session
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bed Booking Modal */}
            <AnimatePresence>
                {showBookingModal && selectedBed && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-2xl">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl p-10 lg:p-14 space-y-10 text-center relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-primary-600 to-indigo-600"></div>
                             
                             <div className="space-y-4">
                                <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-3xl inline-flex items-center justify-center shadow-inner">
                                    <Lock className="w-10 h-10" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic leading-none">{selectedBed.name}</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{selectedBed.type} • PRIORITY_RESERVE</p>
                                </div>
                             </div>

                             <div className="bg-slate-50 rounded-[2.5rem] p-8 space-y-5 border border-slate-100 shadow-inner">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <span>Asset_Value</span>
                                    <span className="text-slate-900">₹{selectedBed.price.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <span>Sync_Protocol (18%)</span>
                                    <span className="text-slate-900">₹{(selectedBed.price * 0.18).toLocaleString()}</span>
                                </div>
                                <div className="pt-5 border-t border-slate-200 flex justify-between items-center">
                                    <span className="text-sm font-black uppercase tracking-tight text-slate-900 italic">Total Acquisition</span>
                                    <span className="text-2xl font-black text-primary-600 tracking-tighter">₹{(selectedBed.price * 1.18).toLocaleString()}</span>
                                </div>
                             </div>

                             <div className="space-y-5">
                                <button 
                                    disabled={isBooking}
                                    onClick={() => {
                                        setIsBooking(true);
                                        setTimeout(() => {
                                            toast.success('Asset Locked Successfully! Unit notified.', { 
                                                style: { background: '#0f172a', color: '#fff', borderRadius: '20px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase' } 
                                            });
                                            setIsBooking(false);
                                            setShowBookingModal(false);
                                            setShowBedRadar(false);
                                        }, 2000);
                                    }}
                                    className="w-full py-6 bg-slate-900 text-white font-black rounded-2xl hover:bg-primary-600 transition-all uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-slate-900/40 flex items-center justify-center space-x-4 transform active:scale-95 italic"
                                >
                                    {isBooking ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            <ShieldCheck className="w-6 h-6" />
                                            <span>Authorize Acquisition</span>
                                        </>
                                    )}
                                </button>
                                <button onClick={() => setShowBookingModal(false)} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-healthcare-red transition-colors italic">
                                    Abort Operation
                                </button>
                             </div>

                             <p className="text-[8px] font-bold text-slate-400 italic px-6 uppercase tracking-wider leading-relaxed">System Note: Electronic reservation valid for 120 minutes post-authorization. LifeLink+ Grid guarantee applied.</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </div>
);
};

export default VolunteerPage;
