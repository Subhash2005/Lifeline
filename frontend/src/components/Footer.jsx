import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Mail, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight,
  ShieldCheck,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter a valid email');
      return;
    }
    setSubscribed(true);
    toast.success('Thank you for subscribing!', {
      icon: '💙',
      style: {
        borderRadius: '10px',
        background: '#0f172a',
        color: '#fff',
      },
    });
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Home', path: '/' },
        { name: 'All Campaigns', path: '/campaigns' },
        { name: 'Emergency Help', path: '/emergency' },
        { name: 'Start Fundraising', path: '/create' },
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'Volunteers', path: '/volunteers' },
        { name: 'Hospitals', path: '/hospitals' },
        { name: 'CSR Dashboard', path: '/csr' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'How it Works', path: '/#how-it-works' },
        { name: 'Trust & Safety', path: '#' },
        { name: 'Ledger', path: '/ledger' },
      ]
    }
  ];

  return (
    <footer className="mt-20 relative overflow-hidden bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-healthcare-red/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Top Section: Brand & Navigation Folders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 items-start">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-600/30">
                <Activity className="text-white w-7 h-7" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                LifeLink+
              </span>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Empowering healthcare through transparency, blockchain-verified donations, and community-driven support. Join us in making every life count.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700 flex items-center gap-2 group cursor-help transition-all hover:bg-slate-700">
                <ShieldCheck className="text-healthcare-green w-5 h-5" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Trust Verified</span>
              </div>
              <div className="px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700 flex items-center gap-2 group cursor-help transition-all hover:bg-slate-700">
                <Activity className="text-primary-500 w-5 h-5" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Active nodes</span>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="hover:text-primary-400 transition-colors flex items-center group text-sm font-medium"
                    >
                      <span className="w-0 group-hover:w-2 h-[2px] bg-primary-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Middle Section: Socials -> Subscribe -> Contacts */}
        <div className="py-12 border-y border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* 1. Social Media Icons (First) */}
          <div className="flex items-center gap-3 order-1">
            {[Twitter, Instagram, Facebook, Linkedin].map((Icon, idx) => (
              <motion.a
                key={idx}
                href="#"
                whileHover={{ scale: 1.15, backgroundColor: '#1e293b' }}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 transition-colors hover:text-primary-400 hover:border-primary-500/50"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* 2. Subscribe Section (Next, slight big) */}
          <div className="flex-grow max-w-xl w-full order-2">
            <div className="bg-slate-800/40 backdrop-blur-md rounded-[2rem] p-6 border border-slate-700/50 shadow-2xl">
              <div className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-4 opacity-70 ml-2">Stay Updated</div>
              <form onSubmit={handleSubscribe} className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-primary-500 transition-all text-white pr-16"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-5 bg-primary-600 rounded-xl text-white hover:bg-primary-500 transition-all shadow-lg active:scale-95"
                >
                  <AnimatePresence mode='wait'>
                    {subscribed ? (
                      <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <CheckCircle2 size={18} />
                      </motion.div>
                    ) : (
                      <motion.div key="arrow" initial={{ x: -5 }} animate={{ x: 0 }}>
                        <ArrowRight size={18} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </div>
          </div>

          {/* 3. Message, Contact, Another one (Then) */}
          <div className="flex flex-col gap-4 order-3 min-w-[200px]">
             <motion.a 
                href="mailto:support@lifelink.com" 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-600/10 flex items-center justify-center text-primary-500 border border-primary-500/10 group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Email Us</span>
                  <span className="text-sm text-slate-300 group-hover:text-primary-400 transition-colors">support@lifelink.com</span>
                </div>
              </motion.a>

              <motion.a 
                href="tel:+917695903778" 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-healthcare-green/10 flex items-center justify-center text-healthcare-green border border-healthcare-green/10 group-hover:bg-healthcare-green group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Call Support</span>
                  <span className="text-sm text-slate-300 group-hover:text-healthcare-green transition-colors">+91 76959 03778</span>
                </div>
              </motion.a>

              <div className="flex items-center gap-4 group cursor-help">
                <div className="w-10 h-10 rounded-xl bg-healthcare-red/10 flex items-center justify-center text-healthcare-red border border-healthcare-red/10">
                  <ShieldCheck size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Status</span>
                  <span className="text-sm text-slate-300">Blockchain Secured</span>
                </div>
              </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p className="text-slate-500 font-medium">
            &copy; {currentYear} LifeLink+. Saving lives, one link at a time.
          </p>
          <div className="flex gap-8 text-slate-500">
            <Link to="/privacy" className="hover:text-primary-400 transition-colors font-medium">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary-400 transition-colors font-medium">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-primary-400 transition-colors font-medium">Cookies</Link>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-[10px] uppercase tracking-tighter">
            <span>Made with</span>
            <Heart size={12} className="text-healthcare-red fill-healthcare-red animate-pulse" />
            <span>for humanity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
