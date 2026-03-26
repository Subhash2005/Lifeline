import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
    Hospital, Search, MapPin, Activity, 
    ShieldCheck, Star, BedDouble, Tag, 
    ChevronRight, Loader2, Hospital as HospitalIcon,
    Stethoscope, Clock, Phone, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const HospitalMarketplace = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const dummyHospitals = [
        {
            _id: 'h1',
            name: 'City General Hospital',
            location: 'Mumbai, Maharashtra',
            rating: 4.8,
            availableBeds: 24,
            discountPercentage: 15,
            imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e56f723697d?auto=format&fit=crop&q=80&w=800',
            treatmentCost: {
                'ICU Daily': 12000,
                'Angioplasty': 150000,
                'MRI Scan': 8000
            }
        },
        {
            _id: 'h2',
            name: 'Apollo Medical Center',
            location: 'Bangalore, Karnataka',
            rating: 4.9,
            availableBeds: 12,
            discountPercentage: 10,
            imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
            treatmentCost: {
                'Chemotherapy': 35000,
                'Dialysis': 4500,
                'CT Scan': 6000
            }
        },
        {
            _id: 'h3',
            name: 'Red Cross Specialty',
            location: 'Delhi, NCR',
            rating: 4.5,
            availableBeds: 45,
            discountPercentage: 25,
            imageUrl: 'https://images.unsplash.com/photo-1586773860418-d3b97978c65a?auto=format&fit=crop&q=80&w=800',
            treatmentCost: {
                'Trauma Care': 8000,
                'X-Ray': 1200,
                'Emergency Visit': 500
            }
        },
        {
            _id: 'h4',
            name: 'St. Jude Children Hospital',
            location: 'Chennai, Tamil Nadu',
            rating: 4.7,
            availableBeds: 8,
            discountPercentage: 30,
            imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800',
            treatmentCost: {
                'Pediatric Surgery': 85000,
                'Vaccination': 1500,
                'NICU daily': 15000
            }
        }
    ];

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const res = await api.get('/hospitals');
                if (res.data.success && res.data.data.length > 0) {
                    // Filter out exact duplicates based on name and location
                    const realData = res.data.data.filter((item, index, self) =>
                        index === self.findIndex((t) => (
                            t.name === item.name && t.location === item.location
                        ))
                    );
                    setHospitals(realData);
                } else {
                    setHospitals(dummyHospitals);
                }
            } catch (err) {
                console.error('Failed to fetch hospital records, using dummy data');
                setHospitals(dummyHospitals);
            } finally {
                setLoading(false);
            }
        };
        fetchHospitals();
    }, []);

    const filteredHospitals = hospitals.filter(h => 
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        h.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-16 py-12 px-4 max-w-7xl mx-auto overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-40 left-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            {/* Header Section */}
            <header className="relative bg-white p-12 lg:p-20 rounded-[4rem] shadow-2xl border border-slate-100 text-center lg:text-left space-y-10 group overflow-hidden">
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary-50 rounded-full opacity-50 group-hover:scale-125 transition-transform duration-700"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="space-y-6 max-w-2xl">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary-50 rounded-full text-[10px] font-black uppercase tracking-widest text-primary-600 border border-primary-100 border-dashed">
                             <HospitalIcon className="w-4 h-4" />
                             <span>National Healthcare Grid</span>
                        </div>
                        <h1 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight">
                            Find the <span className="text-primary-600 text-shadow-glow">Best care</span> <br />
                            at the <span className="text-primary-600 underline underline-offset-8 decoration-primary-200">Right Price</span>.
                        </h1>
                        <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed italic opacity-80">
                            Partnered with 500+ top hospitals. Get verified treatment costs, live bed updates, 
                            and exclusive LifeLink+ discounts for your medical fundraisers.
                        </p>
                    </div>
                </div>

                {/* Quick Info Bar */}
                <div className="relative z-10 flex flex-wrap gap-8 pt-6 border-t border-slate-100 text-slate-400 font-black uppercase tracking-widest text-xs">
                    <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        <span>ISD 9001 Certified Partners</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-primary-500" />
                        <span>Real-time Bed Tracking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <BedDouble className="w-4 h-4 text-orange-500" />
                        <span>Dedicated ICU Support</span>
                    </div>
                </div>
            </header>

            {/* Search Bar */}
            <div className="sticky top-24 z-30 p-4 glass rounded-[3.5rem] shadow-2xl border border-slate-200 max-w-4xl mx-auto flex items-center justify-between group overflow-hidden">
                 <Search className="ml-6 w-8 h-8 text-slate-300 group-hover:text-primary-600 transition-colors" />
                 <input 
                    type="text" 
                    className="flex-grow pl-6 pr-6 bg-transparent border-none focus:ring-0 font-extrabold text-lg text-slate-600 placeholder:text-slate-300"
                    placeholder="Search by hospital name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
                 <button className="hidden sm:flex btn-primary py-4 px-10 rounded-[3rem] text-sm items-center space-x-2 font-black shadow-primary-200">
                    <MapPin className="w-4 h-4" />
                    <span>Search Nearby</span>
                 </button>
            </div>

            {/* Hospital Grid */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-40">
                    <Loader2 className="w-16 h-16 text-primary-600 animate-spin" />
                    <p className="mt-6 text-slate-400 font-black uppercase tracking-widest text-xs animate-pulse">Syncing with hospital data nodes...</p>
                </div>
            ) : filteredHospitals.length === 0 ? (
                <div className="card p-20 text-center border-dashed border-2 border-slate-100 space-y-6 flex flex-col items-center max-w-2xl mx-auto">
                    <Hospital className="w-20 h-20 text-slate-100" />
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">No partner hospitals found</h3>
                    <p className="text-slate-400 font-medium">Try broadening your search or contact our support team for offline assistance.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {filteredHospitals.map((hospital, idx) => (
                        <motion.div 
                            key={hospital._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="card p-0 rounded-[4rem] group overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(2,132,197,0.2)]"
                        >
                            {/* Image Header */}
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={hospital.imageUrl || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-1000"
                                    alt={hospital.name}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-6 left-8 flex flex-col gap-1">
                                    <div className="flex items-center space-x-1.5 text-yellow-400">
                                        {[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 fill-yellow-400 ${s > hospital.rating ? 'opacity-30' : ''}`} />)}
                                        <span className="text-xs font-black text-white ml-2">{hospital.rating} Rated</span>
                                    </div>
                                    <h4 className="text-2xl font-black text-white tracking-tight leading-7 break-words pr-8">
                                        {hospital.name}
                                    </h4>
                                </div>
                                {hospital.discountPercentage > 0 && (
                                    <div className="absolute top-6 right-6 p-4 glass rounded-[2.5rem] text-center border-white/20 animate-float shadow-2xl">
                                        <p className="text-[10px] font-black uppercase text-primary-600 tracking-tighter">Discount</p>
                                        <p className="text-2xl font-black text-slate-900">-{hospital.discountPercentage}%</p>
                                    </div>
                                )}
                            </div>

                            {/* Info Section */}
                            <div className="p-10 space-y-8 flex flex-col h-[calc(100%-16rem)]">
                                <div className="flex items-center space-x-3 text-slate-400 font-bold group-hover:text-primary-600 transition-colors">
                                    <MapPin className="w-5 h-5" />
                                    <span className="text-sm">{hospital.location}</span>
                                </div>

                                <div className="space-y-4">
                                     <h5 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2">Live Availability</h5>
                                     <div className="flex items-center justify-between bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 shadow-inner group-hover:bg-white transition-colors duration-500">
                                         <div className="flex items-center space-x-4">
                                            <div className="p-3 bg-white rounded-2xl shadow-sm text-primary-600">
                                                <BedDouble className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Beds Open</p>
                                                <p className="text-xl font-black text-slate-900">{hospital.availableBeds}</p>
                                            </div>
                                         </div>
                                         <div className="w-12 h-12 rounded-full border-4 border-slate-100 flex items-center justify-center relative shadow-sm">
                                             <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin opacity-50"></div>
                                             <span className="text-[9px] font-black text-green-600">Live</span>
                                         </div>
                                     </div>
                                </div>

                                <div className="space-y-4">
                                     <h5 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2">Treatment Cost Benchmarks</h5>
                                     <div className="space-y-3">
                                         {Object.entries(hospital.treatmentCost || {}).slice(0, 3).map(([treatment, cost]) => (
                                             <div key={treatment} className="flex justify-between items-center px-4 py-2 hover:bg-slate-50 rounded-xl transition-colors">
                                                 <span className="text-sm font-bold text-slate-500">{treatment}</span>
                                                  <span className="font-extrabold text-slate-900">₹{cost.toLocaleString()}</span>
                                             </div>
                                         ))}
                                         {Object.keys(hospital.treatmentCost || {}).length === 0 && (
                                              <p className="text-xs text-slate-400 italic font-medium text-center py-4 px-6 bg-slate-50 rounded-2xl">Contact for detailed itemized quotes.</p>
                                         )}
                                     </div>
                                </div>

                                <div className="mt-auto pt-8 border-t border-slate-100 flex gap-4">
                                    <button 
                                        onClick={() => toast.success('Quote Requested')}
                                        className="flex-grow btn-primary py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center space-x-2"
                                    >
                                        <span>Request Quote</span>
                                        <Tag className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => toast('Direct linking is available when creating a campaign.', { icon: '🏥'})}
                                        className="p-5 bg-slate-50 rounded-3xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all transform active:scale-95 shadow-sm"
                                    >
                                        <HospitalIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Support section */}
            <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden group shadow-2xl">
                 <div className="absolute top-0 right-0 w-80 h-80 bg-primary-600 rounded-full opacity-20 -mr-40 -mt-40 blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                 <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                     <div className="space-y-6 max-w-xl text-center lg:text-left">
                         <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">Need urgent <br />Hospital placement?</h2>
                         <p className="text-slate-400 font-medium leading-relaxed">
                            Our team works 24/7 to negotiate treatment costs and secure emergency beds in partner hospitals for verified LifeLink+ users.
                         </p>
                         <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-6">
                             <div className="flex items-center space-x-3">
                                 <Phone className="w-6 h-6 text-primary-500" />
                                 <span className="font-bold text-lg">+1 (800) LIFELINK</span>
                             </div>
                             <div className="flex items-center space-x-3">
                                 <Globe className="w-6 h-6 text-primary-500" />
                                 <span className="font-bold text-lg">24/7 Dedicated Support</span>
                             </div>
                         </div>
                     </div>
                     <button className="btn-primary py-6 px-12 rounded-[2.5rem] bg-white text-slate-900 hover:bg-primary-50 text-xl font-black shadow-none flex items-center space-x-4 border-none transition-all transform active:scale-95 group">
                        <span>Get Expert Help</span>
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                     </button>
                 </div>
            </div>
        </div>
    );
};

export default HospitalMarketplace;
