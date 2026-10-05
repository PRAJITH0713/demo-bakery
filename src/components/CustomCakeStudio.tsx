import React, { useState } from 'react';
import { Sparkles, Check, Cake, Heart, ChevronRight } from 'lucide-react';
import { CUSTOM_CAKE_SIZES, CUSTOM_CAKE_SPONGES, CUSTOM_CAKE_FILLINGS } from '../data/menu';
import { MenuItem } from '../types';

interface CustomCakeStudioProps {
  onAddCustomCakeToCart: (cakeItem: MenuItem, cakeConfigSummary: string) => void;
}

export const CustomCakeStudio: React.FC<CustomCakeStudioProps> = ({
  onAddCustomCakeToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState(CUSTOM_CAKE_SIZES[1]); // Default 8-inch
  const [selectedSponge, setSelectedSponge] = useState(CUSTOM_CAKE_SPONGES[0]);
  const [selectedFilling, setSelectedFilling] = useState(CUSTOM_CAKE_FILLINGS[0]);
  const [frostingStyle, setFrostingStyle] = useState('Velvety Swiss Meringue');
  const [pipedMessage, setPipedMessage] = useState('Happy Birthday!');
  const [topper, setTopper] = useState('Edible 24k Gold Leaf & Wildflowers');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  // Extra topper price
  const topperPriceDelta = topper.includes('Gold Leaf') ? 6.0 : topper.includes('Sparkler') ? 4.0 : 0;
  const totalCakePrice = selectedSize.price + topperPriceDelta;

  const handleAddCake = () => {
    const summary = `${selectedSize.label} | ${selectedSponge.name} | ${selectedFilling.name} | Frosting: ${frostingStyle} | Inscription: "${pipedMessage}" | Topper: ${topper}`;

    const customCakeMenuItem: MenuItem = {
      id: `custom-cake-${Date.now()}`,
      name: `Custom Artisan Cake (${selectedSize.label})`,
      category: 'patisserie-cakes',
      price: totalCakePrice,
      description: summary,
      image: '/src/assets/images/pastry_cheesecake_desserts_1791180980289.jpg',
      tags: ['Chef Special'],
      prepTime: 'Baked to order (24h pre-order)',
      allergens: ['Gluten', 'Dairy', 'Eggs'],
    };

    onAddCustomCakeToCart(customCakeMenuItem, summary);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <section id="cake-studio" className="py-14 bg-[#F5EFE6] border-b border-[#EAE1D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>The Patisserie Workshop</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1E1D]">
            Custom Celebration Cake Studio
          </h2>
          <p className="mt-2 text-sm text-[#5C564E]">
            Design your bespoke cake in 5 steps. Every sponge baked fresh, layered with house-made fruit preserves or rich creams, and piped by hand.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Customization Controls */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E0D7C8] shadow-xs space-y-6">
            
            {/* Step 1: Size */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#2C2620] block mb-2.5">
                1. Select Size & Guest Count
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {CUSTOM_CAKE_SIZES.map((size) => {
                  const isSelected = selectedSize.id === size.id;
                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#2C2620] bg-[#FAF8F5] ring-1 ring-[#2C2620]'
                          : 'border-[#DDD3C4] bg-white hover:border-[#B5A895]'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#1F1E1D]">{size.label}</span>
                      <span className="text-[11px] text-[#70675D] mt-0.5">{size.servings}</span>
                      <span className="text-xs font-semibold text-amber-900 tabular-nums mt-2">
                        ${size.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Sponge Flavor */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#2C2620] block mb-2.5">
                2. Select Sponge Base
              </label>
              <div className="space-y-2">
                {CUSTOM_CAKE_SPONGES.map((sponge) => {
                  const isSelected = selectedSponge.id === sponge.id;
                  return (
                    <button
                      key={sponge.id}
                      type="button"
                      onClick={() => setSelectedSponge(sponge)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'border-[#2C2620] bg-[#FAF8F5] font-semibold text-[#1F1E1D]'
                          : 'border-[#DDD3C4] bg-white text-[#524B43] hover:border-[#B5A895]'
                      }`}
                    >
                      <div>
                        <span className="block font-medium text-[#1F1E1D]">{sponge.name}</span>
                        <span className="text-[11px] text-[#7A7165] font-normal">{sponge.description}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#2C2620] shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Gourmet Filling */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#2C2620] block mb-2.5">
                3. Choose Layer Filling
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CUSTOM_CAKE_FILLINGS.map((filling) => {
                  const isSelected = selectedFilling.id === filling.id;
                  return (
                    <button
                      key={filling.id}
                      type="button"
                      onClick={() => setSelectedFilling(filling)}
                      className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'border-[#2C2620] bg-[#FAF8F5] font-semibold text-[#1F1E1D]'
                          : 'border-[#DDD3C4] bg-white text-[#524B43] hover:border-[#B5A895]'
                      }`}
                    >
                      <span>{filling.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Frosting Finish */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#2C2620] block mb-2.5">
                4. Exterior Frosting Finish
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  'Velvety Swiss Meringue',
                  'Rustic Semi-Naked Crumb',
                  'Vintage Lambeth Piping',
                ].map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setFrostingStyle(style)}
                    className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                      frostingStyle === style
                        ? 'border-[#2C2620] bg-[#FAF8F5] font-semibold text-[#1F1E1D]'
                        : 'border-[#DDD3C4] bg-white text-[#524B43] hover:border-[#B5A895]'
                    }`}
                  >
                    <span>{style}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Custom Message & Accents */}
            <div className="space-y-4 pt-2 border-t border-[#EAE1D2]">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#2C2620] block mb-1">
                  Custom Piped Inscription
                </label>
                <input
                  type="text"
                  maxLength={35}
                  value={pipedMessage}
                  onChange={(e) => setPipedMessage(e.target.value)}
                  placeholder="e.g. Happy 30th Birthday Elena!"
                  className="w-full text-xs p-3 bg-white border border-[#DDD3C4] rounded-lg focus:outline-hidden focus:border-[#2C2620]"
                />
                <span className="text-[11px] text-[#8C8275] mt-1 block">
                  Hand-piped in dark chocolate script (max 35 characters).
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#2C2620] block mb-1">
                  Artisanal Topper / Accents
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'Edible 24k Gold Leaf & Wildflowers', label: 'Gold Leaf & Florals (+$6)' },
                    { id: 'Golden Birthday Sparkler Wand', label: 'Golden Sparkler (+$4)' },
                    { id: 'Classic Birthday Candles (10 pack)', label: 'Classic Candles (Included)' },
                  ].map((top) => (
                    <button
                      key={top.id}
                      type="button"
                      onClick={() => setTopper(top.id)}
                      className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                        topper === top.id
                          ? 'border-[#2C2620] bg-[#FAF8F5] font-semibold text-[#1F1E1D]'
                          : 'border-[#DDD3C4] bg-white text-[#524B43] hover:border-[#B5A895]'
                      }`}
                    >
                      <span>{top.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Cake Mockup & Live Order Summary */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            
            {/* Live Cake Plate Visualizer */}
            <div className="bg-white rounded-2xl p-6 border border-[#E0D7C8] shadow-xs text-center">
              
              <div className="relative mx-auto w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-to-b from-[#F7F3EC] to-[#EAE0D0] border-8 border-white shadow-inner flex flex-col items-center justify-center p-4">
                
                {/* Cake icon illustration */}
                <div className="w-16 h-16 rounded-full bg-amber-100/80 flex items-center justify-center text-amber-800 mb-2">
                  <Cake className="w-8 h-8" />
                </div>

                <div className="text-xs font-bold text-[#1F1E1D] uppercase tracking-wide">
                  {selectedSize.label}
                </div>
                
                {/* Live Piped Message on Cake */}
                <div className="mt-2 px-3 py-1.5 bg-white/80 rounded-md border border-[#DDD3C4]/60 max-w-[190px]">
                  <p className="font-serif italic text-xs font-semibold text-amber-950 truncate">
                    &ldquo;{pipedMessage || 'Your Message Here'}&rdquo;
                  </p>
                </div>

                <div className="mt-2 text-[10px] text-[#70675D]">
                  {selectedSponge.name.split(' ')[0]} · {frostingStyle.split(' ')[0]}
                </div>
              </div>

              {/* Recipe Summary */}
              <div className="mt-6 text-left border-t border-[#EAE1D2] pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#70675D]">
                  <span>Tier & Size:</span>
                  <span className="font-medium text-[#1F1E1D]">{selectedSize.label}</span>
                </div>
                <div className="flex justify-between text-[#70675D]">
                  <span>Sponge:</span>
                  <span className="font-medium text-[#1F1E1D]">{selectedSponge.name}</span>
                </div>
                <div className="flex justify-between text-[#70675D]">
                  <span>Layer Filling:</span>
                  <span className="font-medium text-[#1F1E1D]">{selectedFilling.name}</span>
                </div>
                <div className="flex justify-between text-[#70675D]">
                  <span>Finish:</span>
                  <span className="font-medium text-[#1F1E1D]">{frostingStyle}</span>
                </div>
                <div className="flex justify-between text-[#70675D]">
                  <span>Topper:</span>
                  <span className="font-medium text-[#1F1E1D]">{topper}</span>
                </div>

                <div className="pt-3 border-t border-[#EAE1D2] flex justify-between items-baseline">
                  <span className="font-serif text-base font-bold text-[#1F1E1D]">Total Price</span>
                  <span className="font-serif text-2xl font-bold text-amber-900 tabular-nums">
                    ${totalCakePrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Add Custom Cake Button */}
              <button
                type="button"
                onClick={handleAddCake}
                className={`mt-6 w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  isAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#2C2620] hover:bg-[#1B1713] text-[#FAF8F5]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added Custom Cake to Bag!</span>
                  </>
                ) : (
                  <>
                    <span>Add Custom Cake to Bag</span>
                    <span>·</span>
                    <span className="tabular-nums font-mono">${totalCakePrice.toFixed(2)}</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-[#8C8275] mt-2">
                Need it within 24 hours? Call the bakery directly at (555) 839-2253.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
