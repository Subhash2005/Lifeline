import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, UserPlus, ShieldCheck, Briefcase, Stethoscope } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await register({ name, email, password, role });
        if (res.success) {
            toast.success('Registration Successful!');
            navigate('/dashboard');
        } else {
            toast.error(res.message);
        }
        setIsLoading(false);
    };

    const roles = [
        { id: 'user', icon: <User className="w-5 h-5" />, label: 'Standard User', desc: 'Donate & fundraise' },
        { id: 'doctor', icon: <Stethoscope className="w-5 h-5" />, label: 'Doctor', desc: 'Verify medical cases' },
        { id: 'corporate', icon: <Briefcase className="w-5 h-5" />, label: 'CSR Representative', desc: 'Corporate donations' }
    ];

    return (
        <div className="flex justify-center items-center py-12 lg:py-24">
            <div className="w-full max-w-2xl card p-10 space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
                
                <div className="text-center relative z-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create a LifeLink+ Account</h1>
                    <p className="mt-3 text-slate-500">Join the healthcare revolution and start saving lives</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <input 
                                        type="text"
                                        required 
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <input 
                                        type="email"
                                        required 
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <input 
                                        type="password" 
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Register as:</label>
                            <div className="space-y-3">
                                {roles.map((r) => (
                                    <div 
                                        key={r.id}
                                        onClick={() => setRole(r.id)}
                                        className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-all ${
                                            role === r.id 
                                            ? 'border-primary-600 bg-primary-50 ring-1 ring-primary-600' 
                                            : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50'
                                        }`}
                                    >
                                        <div className={`p-2 rounded-lg ${role === r.id ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                            {r.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{r.label}</p>
                                            <p className="text-xs text-slate-500">{r.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button 
                        disabled={isLoading}
                        className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center space-x-2"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span>Get Started</span>
                                <UserPlus className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center space-y-4">
                    <p className="text-slate-500 text-sm">
                        Existing member? <Link to="/login" className="text-primary-600 font-bold hover:underline">Log in</Link>
                    </p>
                    <div className="pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Privacy protected by advanced trust engine</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
