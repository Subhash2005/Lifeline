import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Heart, Menu, X, User, LogOut, 
  LayoutDashboard, Activity, AlertCircle, 
  Users, Hospital, Trophy, Briefcase, 
  Hexagon, PlusCircle
} from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { to: '/campaigns', label: 'Campaigns', icon: <Activity className="w-4 h-4" /> },
        { to: '/emergency', label: 'Emergency', icon: <AlertCircle className="w-4 h-4 text-red-500" /> },
        { to: '/volunteers', label: 'Volunteers', icon: <Users className="w-4 h-4" /> },
        { to: '/hospitals', label: 'Hospitals', icon: <Hospital className="w-4 h-4" /> },
        { to: '/leaderboard', label: 'Leaderboard', icon: <Trophy className="w-4 h-4" /> },
        { to: '/ledger', label: 'Transparency', icon: <Hexagon className="w-4 h-4" /> },
    ];

    if (user?.role === 'corporate') {
        navLinks.push({ to: '/csr', label: 'CSR', icon: <Briefcase className="w-4 h-4" /> });
    }

    return (
        <nav className="sticky top-0 z-50 glass border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-primary-600 p-2 rounded-xl group-hover:bg-primary-500 transition-colors shadow-lg">
                            <Heart className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
                            LifeLink+
                        </span>
                    </Link>

                    {/* Desktop Navigation (Wide Screens Only) */}
                    <div className="hidden xl:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 font-bold text-sm"
                            >
                                <span className={link.to === '/emergency' ? 'text-red-500' : ''}>{link.icon}</span>
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Compact Navigation (Laptop Screens) */}
                    <div className="hidden lg:flex xl:hidden items-center gap-2">
                        {navLinks.slice(0, 2).map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="flex items-center space-x-1.5 px-3 py-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-bold text-xs"
                            >
                                <span className={link.to === '/emergency' ? 'text-red-500' : ''}>{link.icon}</span>
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-2 xl:space-x-4">
                                <Link to="/dashboard" className="hidden xl:flex p-2.5 bg-slate-100 text-slate-500 hover:text-primary-600 hover:bg-white rounded-xl transition-all border border-slate-200 shadow-sm" title="Donation History">
                                    <Activity className="w-5 h-5" />
                                </Link>
                                <Link to="/create" className="btn-primary flex items-center space-x-2 py-2 px-4 xl:py-2.5 xl:px-6 text-xs xl:text-sm">
                                    <PlusCircle className="w-4 h-4" />
                                    <span>Start <span className="hidden xl:inline">Fundraising</span><span className="xl:hidden">Fund</span></span>
                                </Link>
                                <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                                    <Link to="/dashboard" className="flex items-center space-x-2 text-xs xl:text-sm font-black hover:text-primary-600 transition-colors">
                                        <div className="bg-primary-600 p-1 rounded-full">
                                            <User className="w-3 h-3 xl:w-4 xl:h-4 text-white" />
                                        </div>
                                        <span className="truncate max-w-[50px] xl:max-w-none">{user.name.split(' ')[0]}</span>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 xl:space-x-4">
                                <Link to="/login" className="text-slate-600 hover:text-primary-600 font-bold px-2 text-sm">Login</Link>
                                <Link to="/register" className="btn-primary py-2 px-4 xl:py-2.5 xl:px-6 text-xs xl:text-sm">Get Started</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="xl:hidden flex items-center">
                        <button onClick={toggleMenu} className="p-2 rounded-xl text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-all border border-transparent hover:border-primary-100">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="xl:hidden bg-white border-t border-slate-100 shadow-xl overflow-y-auto max-h-[calc(100vh-80px)] pb-10">
                    <div className="px-6 pt-6 pb-6 space-y-2">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-4">Missions & Help</div>
                        <div className="grid grid-cols-1 gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={toggleMenu}
                                    className="flex items-center space-x-4 px-5 py-4 text-slate-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-2xl transition-all font-bold"
                                >
                                    <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-primary-100 transition-colors">
                                        {link.icon}
                                    </div>
                                    <span>{link.label}</span>
                                </Link>
                            ))}
                        </div>
                        
                        <div className="my-6 border-t border-slate-100 pt-6">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-4">Account</div>
                            {user ? (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 px-5 py-4 bg-primary-50 rounded-2xl border border-primary-100">
                                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-black">
                                            {user.name[0]}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-900">{user.name}</span>
                                            <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">{user.role}</span>
                                        </div>
                                    </div>
                                    <Link to="/dashboard" onClick={toggleMenu} className="flex items-center space-x-4 px-5 py-4 text-slate-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-2xl transition-all font-bold">
                                        <LayoutDashboard className="w-5 h-5 text-slate-400" />
                                        <span>User Dashboard</span>
                                    </Link>
                                    <button onClick={handleLogout} className="flex items-center space-x-4 px-5 py-4 w-full text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold">
                                        <LogOut className="w-5 h-5" />
                                        <span>Secure Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    <Link to="/login" onClick={toggleMenu} className="flex items-center justify-center py-4 text-slate-600 font-bold bg-slate-50 rounded-2xl">
                                        Login
                                    </Link>
                                    <Link to="/register" onClick={toggleMenu} className="flex items-center justify-center py-4 btn-primary rounded-2xl">
                                        Join Us
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
