import React, { useState } from 'react';
import { ArrowUp, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#24201A] text-[#FAF8F5] pt-14 pb-10 border-t border-[#3A332B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-serif text-2xl font-bold tracking-tight text-white block">
              Crumb & Sizzle
            </span>
            <p className="text-xs text-[#A89E92] leading-relaxed max-w-sm">
              Artisan bakery and world street food house. Slow-fermented heritage sourdough, viennoiserie, gourmet birria tacos, steamed bao buns, and bespoke celebration cakes.
            </p>
            <p className="text-[11px] text-[#7A7165]">
              Freshly baked in batches from 6:30 AM to 10:30 PM.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-2 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Storefront
            </h4>
            <ul className="space-y-1.5 text-[#A89E92]">
              <li><a href="#menu-catalog" className="hover:text-white transition-colors">All Delights</a></li>
              <li><a href="#street-feast" className="hover:text-white transition-colors">Street Feast Box</a></li>
              <li><a href="#cake-studio" className="hover:text-white transition-colors">Custom Cake Studio</a></li>
              <li><a href="#live-kitchen" className="hover:text-white transition-colors">Live Oven Clocks</a></li>
            </ul>
          </div>

          {/* Catering & Events */}
          <div className="md:col-span-2 space-y-2 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Services
            </h4>
            <ul className="space-y-1.5 text-[#A89E92]">
              <li><span className="hover:text-white cursor-pointer">Corporate Breakfasts</span></li>
              <li><span className="hover:text-white cursor-pointer">Wedding Cake Consults</span></li>
              <li><span className="hover:text-white cursor-pointer">Street Food Night Stalls</span></li>
              <li><span className="hover:text-white cursor-pointer">Wholesale Bread Delivery</span></li>
            </ul>
          </div>

          {/* Newsletter for Weekend Secret Menu */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Weekend Secret Bakes Drop
            </h4>
            <p className="text-[#A89E92] text-[11px]">
              Get notified when special limited cruffins, smoked brisket tacos, and seasonal fruit tarts hit the counter every Friday.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-[#332D25] border border-[#4D4438] rounded-lg text-xs text-white placeholder-[#8C8275] focus:outline-hidden focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0"
              >
                {subscribed ? <Check className="w-4 h-4" /> : 'Join'}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-400">
                You’re on the secret weekend list!
              </p>
            )}
          </div>

        </div>

        {/* Bottom Bar: Clean copyright and back-to-top */}
        <div className="pt-8 border-t border-[#3A332B] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7A7165]">
          <div>
            © {new Date().getFullYear()} Crumb & Sizzle Artisanal Bakery & Street Food LLC. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#our-story" className="hover:text-white transition-colors">Privacy & Terms</a>
            <a href="#our-story" className="hover:text-white transition-colors">Allergen Matrix</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#A89E92] hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
