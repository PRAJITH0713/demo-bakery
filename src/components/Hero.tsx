import React from 'react';
import { ArrowRight, Flame, Sparkles, Star } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenFeastBox: () => void;
  onOpenCakeStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onOpenFeastBox,
  onOpenCakeStudio,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] border-b border-[#EAE1D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Subtle editorial kicker (no pill boxes) */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
              <span>Artisanal Hearth & Street Sizzle Grill</span>
              <span aria-hidden="true" className="text-[#8C8275]">·</span>
              <span className="text-[#696156]">Everything Made Fresh Daily</span>
            </div>

            {/* Headline with balanced wrapping */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1F1E1D] leading-[1.15] text-balance">
              Where the baker’s hearth meets the world’s street food sizzle.
            </h1>

            {/* Body copy */}
            <p className="text-base sm:text-lg text-[#524B43] leading-relaxed max-w-2xl">
              From 36-hour slow-fermented sourdough batards and 32-layer French viennoiserie, to sizzling slow-braised birria quesatacos, fluffy steamed bao buns, and custom multi-tier celebration cakes. Every craving crafted under one roof.
            </p>

            {/* Primary Action Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3 bg-[#2C2620] hover:bg-[#1B1713] text-[#FAF8F5] text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Order From Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenFeastBox}
                className="px-5 py-3 bg-white border border-[#DDD3C4] hover:border-[#1F1E1D] text-[#1F1E1D] text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Build Feast Platter Box</span>
              </button>

              <button
                onClick={onOpenCakeStudio}
                className="px-5 py-3 bg-[#F4EFE6] hover:bg-[#EAE1D2] text-[#2C2620] text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Custom Cake Studio</span>
              </button>
            </div>

            {/* Adjacent Proof Bar: Real qualitative & quantitative rigor */}
            <div className="pt-4 border-t border-[#EAE1D2] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <p className="font-serif text-xl font-bold text-[#1F1E1D] tabular-nums">100% Scratch</p>
                <p className="text-[#6E665B] mt-0.5">Unbleached flours & cultured butter</p>
              </div>
              <div>
                <p className="font-serif text-xl font-bold text-[#1F1E1D] tabular-nums">4.9 / 5.0 Rating</p>
                <p className="text-[#6E665B] mt-0.5">1,240+ verified neighborhood reviews</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="font-serif text-xl font-bold text-[#1F1E1D] tabular-nums">15 Min Pickup</p>
                <p className="text-[#6E665B] mt-0.5">Curbside box or direct delivery</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E0D7C8] aspect-[4/3] bg-[#EAE1D2]">
              <img
                src="/src/assets/images/hero_bakery_streetfood_1791180943477.jpg"
                alt="Table banquet of freshly baked artisan sourdough bread, croissants, steaming street food bao buns, tacos and dipping sauces"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Crumb & Sizzle Promise</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white mt-1">
                  Baker’s Precision Meets Street Food Soul
                </h3>
                <p className="text-xs text-stone-200 mt-0.5">
                  Over 30 signature bakery and street food recipes available hot daily.
                </p>
              </div>
            </div>

            {/* Subtle floating trust badge */}
            <div className="absolute -bottom-3 -left-3 bg-white/95 backdrop-blur-xs border border-[#DDD3C4] rounded-lg p-3 shadow-md flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-amber-50 flex items-center justify-center text-amber-700 font-serif font-bold text-base">
                ★
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1F1E1D]">Fresh Oven Alarm</p>
                <p className="text-[11px] text-[#6E665B]">Croissants & Buns pulled at 8:00 AM</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
