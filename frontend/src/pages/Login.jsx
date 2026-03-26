import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, AlertCircle, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await login(email, password);
        if (res.success) {
            toast.success('Login Successful!');
            navigate('/dashboard');
        } else {
            toast.error(res.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="flex justify-center items-center py-12 lg:py-24">
            <div className="w-full max-w-md card p-10 space-y-8 relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
                
                <div className="text-center relative z-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h1>
                    <p className="mt-3 text-slate-500">Sign in to manage your impact and support</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
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

                    <button 
                        disabled={isLoading}
                        className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center space-x-2"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span>Sign In</span>
                                <LogIn className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center space-y-4">
                    <p className="text-slate-500 text-sm">
                        Don't have an account? <Link to="/register" className="text-primary-600 font-bold hover:underline">Register now</Link>
                    </p>
                    <div className="pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Secure & Encrypted Connection</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
