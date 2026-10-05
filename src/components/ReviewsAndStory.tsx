import React from 'react';
import { Star, Clock, MapPin, Heart, Shield, Award, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/menu';

export const ReviewsAndStory: React.FC = () => {
  return (
    <section id="our-story" className="py-16 bg-[#FAF8F5] border-b border-[#EAE1D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story Section: Split Grid with Bakery & Street Food Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-900">
              The Artisan Bakery & Street Food Manifesto
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1E1D] leading-tight">
              From 4 AM sourdough levain to midnight street wok smoke.
            </h2>

            <div className="space-y-4 text-sm text-[#544D44] leading-relaxed">
              <p>
                Crumb & Sizzle began with an uncompromising culinary dream: why must you choose between the delicate, buttery mastery of a Parisian boulangerie and the explosive, spice-laden exhilaration of world-famous street food stalls?
              </p>
              <p>
                Every single loaf of our sourdough undergoes a strict 36-hour cold fermentation using regionally milled, organic flours. Simultaneously, our street food planchas sear 8-hour braised Jalisco birria beef, our bamboo baskets steam Taiwanese pork baos, and our kadai fryers crisp Punjab samosas right in front of your eyes.
              </p>
              <p className="font-medium text-[#1F1E1D]">
                No frozen shortcuts. No commercial additive dough conditioners. Everything is available hot, fragrant, and made from scratch every day.
              </p>
            </div>

            {/* Core Values */}
            <div className="pt-2 grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-white rounded-xl border border-[#E0D7C8]">
                <p className="font-bold text-[#1F1E1D]">Stoneground Flours</p>
                <p className="text-[#70675D] mt-0.5">Heritage grains with natural high nutritional integrity</p>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-[#E0D7C8]">
                <p className="font-bold text-[#1F1E1D]">Authentic Global Spices</p>
                <p className="text-[#70675D] mt-0.5">Whole green cardamom, dried chiles, and roasted seeds</p>
              </div>
            </div>

          </div>

          {/* Visual Story Collage using generated assets */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden aspect-[4/3] bg-[#EAE1D2] border border-[#DDD3C4] shadow-xs">
                <img
                  src="/src/assets/images/bakery_croissant_sourdough_1791180957430.jpg"
                  alt="Golden croissants and scored artisan sourdough bread"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#E0D7C8]">
                <div className="font-serif text-2xl font-bold text-amber-900 tabular-nums">36 Hours</div>
                <div className="text-xs text-[#5C564E] mt-0.5">Natural wild levain fermentation</div>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="p-4 bg-[#2C2620] text-white rounded-xl">
                <div className="font-serif text-2xl font-bold text-amber-300 tabular-nums">450°F Hearth</div>
                <div className="text-xs text-stone-300 mt-0.5">Custom stone-deck bread ovens</div>
              </div>
              <div className="rounded-xl overflow-hidden aspect-[4/3] bg-[#EAE1D2] border border-[#DDD3C4] shadow-xs">
                <img
                  src="/src/assets/images/streetfood_tacos_baos_1791180968249.jpg"
                  alt="Street food feast with steamed baos and grilled tacos"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Customer Proof & Verified Reviews */}
        <div className="pt-10 border-t border-[#EAE1D2]">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-1 text-amber-600 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1E1D]">
              Loved by Neighborhood Foodies & Culinary Critics
            </h3>
            <p className="text-xs text-[#70675D] mt-1">
              Over 1,240+ verified 5-star ratings across local delivery and in-house dining.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#E0D7C8] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-600 mb-2">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <p className="font-serif text-base font-bold text-[#1F1E1D] mb-2">
                    &ldquo;{t.highlight}&rdquo;
                  </p>
                  <p className="text-xs text-[#524B43] leading-relaxed italic">
                    {t.quote}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F2EDE4] text-xs">
                  <p className="font-bold text-[#1F1E1D]">{t.name}</p>
                  <p className="text-[#8C8275]">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Hours & Kitchen Location Card */}
        <div className="bg-[#F2ECE1] rounded-2xl p-6 sm:p-8 border border-[#E0D7C8] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-[#1F1E1D] text-sm">
              <Clock className="w-4 h-4 text-amber-800" />
              <span>Oven & Grill Daily Schedule</span>
            </div>
            <p className="text-[#5C564E]"><strong>Morning Bakes:</strong> 6:30 AM – 1:00 PM</p>
            <p className="text-[#5C564E]"><strong>Street Grill & Wok:</strong> 11:30 AM – 10:30 PM</p>
            <p className="text-[#5C564E]"><strong>Celebration Cakes:</strong> 24/7 online orders (pickup anytime)</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-[#1F1E1D] text-sm">
              <MapPin className="w-4 h-4 text-amber-800" />
              <span>Bakery & Street Counter</span>
            </div>
            <p className="text-[#5C564E]">482 Flour & Flame Boulevard, Culinary District</p>
            <p className="text-[#5C564E]">Express pickup cubbies with dedicated curbside parking stalls.</p>
            <p className="text-[#7A7165]">Direct phone: (555) 839-2253</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-[#1F1E1D] text-sm">
              <Shield className="w-4 h-4 text-amber-800" />
              <span>Dietary Allergen Protocol</span>
            </div>
            <p className="text-[#5C564E]">
              We clearly disclose all 14 major allergens on every menu card. Dedicated gluten-friendly and 100% Halal preparation stations.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
