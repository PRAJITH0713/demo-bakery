import React, { useState } from 'react';
import { Flame, Check, Sparkles, Plus, ArrowRight } from 'lucide-react';
import { MenuItem } from '../types';
import { STREET_DIPS } from '../data/menu';

interface FeastBoxBuilderProps {
  allItems: MenuItem[];
  onAddFeastBoxToCart: (feastItem: MenuItem, summary: string) => void;
}

export const FeastBoxBuilder: React.FC<FeastBoxBuilderProps> = ({
  allItems,
  onAddFeastBoxToCart,
}) => {
  // Available selections
  const streetMainsList = allItems.filter(
    (i) => i.category === 'asian-street' || i.category === 'indian-street' || i.category === 'tacos-latin' || i.category === 'burgers-sliders'
  );
  const bakeryList = allItems.filter(
    (i) => i.category === 'bakery-breads' || i.category === 'viennoiserie'
  );
  const drinksList = allItems.filter((i) => i.category === 'drinks-brews');

  // Selected state
  const [selectedMains, setSelectedMains] = useState<MenuItem[]>([
    streetMainsList[0] || allItems[0],
    streetMainsList[1] || allItems[1],
  ]);
  const [selectedBakes, setSelectedBakes] = useState<MenuItem[]>([
    bakeryList[0] || allItems[0],
    bakeryList[1] || allItems[1],
  ]);
  const [selectedDips, setSelectedDips] = useState<string[]>([
    STREET_DIPS[0],
    STREET_DIPS[2],
  ]);
  const [selectedDrinks, setSelectedDrinks] = useState<MenuItem[]>([
    drinksList[0] || allItems[0],
    drinksList[1] || allItems[1],
  ]);

  const [isAdded, setIsAdded] = useState(false);

  // Bundle pricing
  const standardPrice = 46.50;
  const bundleDiscountPrice = 36.00; // ~23% bundle savings

  const toggleSelectMain = (item: MenuItem) => {
    if (selectedMains.some((m) => m.id === item.id)) {
      if (selectedMains.length > 1) {
        setSelectedMains(selectedMains.filter((m) => m.id !== item.id));
      }
    } else {
      if (selectedMains.length < 2) {
        setSelectedMains([...selectedMains, item]);
      } else {
        // replace second
        setSelectedMains([selectedMains[0], item]);
      }
    }
  };

  const toggleSelectBake = (item: MenuItem) => {
    if (selectedBakes.some((b) => b.id === item.id)) {
      if (selectedBakes.length > 1) {
        setSelectedBakes(selectedBakes.filter((b) => b.id !== item.id));
      }
    } else {
      if (selectedBakes.length < 2) {
        setSelectedBakes([...selectedBakes, item]);
      } else {
        setSelectedBakes([selectedBakes[0], item]);
      }
    }
  };

  const toggleSelectDip = (dip: string) => {
    if (selectedDips.includes(dip)) {
      if (selectedDips.length > 1) {
        setSelectedDips(selectedDips.filter((d) => d !== dip));
      }
    } else {
      if (selectedDips.length < 2) {
        setSelectedDips([...selectedDips, dip]);
      } else {
        setSelectedDips([selectedDips[0], dip]);
      }
    }
  };

  const toggleSelectDrink = (item: MenuItem) => {
    if (selectedDrinks.some((d) => d.id === item.id)) {
      if (selectedDrinks.length > 1) {
        setSelectedDrinks(selectedDrinks.filter((d) => d.id !== item.id));
      }
    } else {
      if (selectedDrinks.length < 2) {
        setSelectedDrinks([...selectedDrinks, item]);
      } else {
        setSelectedDrinks([selectedDrinks[0], item]);
      }
    }
  };

  const handleAddBundle = () => {
    const summary = `Mains: ${selectedMains.map((m) => m.name).join(', ')} | Bakes: ${selectedBakes.map((b) => b.name).join(', ')} | Dips: ${selectedDips.join(', ')} | Brews: ${selectedDrinks.map((d) => d.name).join(', ')}`;

    const feastMenuItem: MenuItem = {
      id: `feast-box-${Date.now()}`,
      name: 'Crumb & Sizzle Street Feast Box (Bundle of 8 Items)',
      category: 'asian-street',
      price: bundleDiscountPrice,
      description: summary,
      image: '/src/assets/images/hero_bakery_streetfood_1791180943477.jpg',
      tags: ['Chef Special'],
      prepTime: 'Packed fresh in thermo-box (15 mins)',
      isHotFresh: true,
      allergens: ['Gluten', 'Dairy'],
    };

    onAddFeastBoxToCart(feastMenuItem, summary);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <section id="street-feast" className="py-14 bg-white border-b border-[#EAE1D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#EAE1D2]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Signature Party Pairing</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1E1D] mt-1">
              Create Your Street & Bake Feast Box
            </h2>
          </div>
          <div className="text-sm text-[#5C564E] max-w-md">
            The ultimate crowd-pleaser for 2–4 people. Mix your favorite hot street food mains with warm bakery loaves, dipping pots, and artisan drinks.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 4-Step Builder */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step 1: Street Food Mains */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C2620]">
                  1. Pick 2 Street Food Mains ({selectedMains.length}/2 selected)
                </span>
                <span className="text-xs text-[#8C8275]">Hot from the plancha & steamers</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {streetMainsList.slice(0, 6).map((item) => {
                  const isSelected = selectedMains.some((m) => m.id === item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleSelectMain(item)}
                      className={`p-3.5 rounded-xl border text-left flex items-start justify-between text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'border-[#2C2620] bg-[#FAF8F5] ring-1 ring-[#2C2620]'
                          : 'border-[#DDD3C4] bg-white hover:border-[#B5A895]'
                      }`}
                    >
                      <div className="pr-2">
                        <span className="font-bold text-[#1F1E1D] block">{item.name}</span>
                        <span className="text-[11px] text-[#70675D] line-clamp-1 mt-0.5">{item.description}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#2C2620] text-white' : 'border border-[#CCC2B4]'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Fresh Bakery Delights */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C2620]">
                  2. Pick 2 Hearth Bakery Items ({selectedBakes.length}/2 selected)
                </span>
                <span className="text-xs text-[#8C8275]">Stoneground flours & flaky layers</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bakeryList.slice(0, 6).map((item) => {
                  const isSelected = selectedBakes.some((b) => b.id === item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleSelectBake(item)}
                      className={`p-3.5 rounded-xl border text-left flex items-start justify-between text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'border-[#2C2620] bg-[#FAF8F5] ring-1 ring-[#2C2620]'
                          : 'border-[#DDD3C4] bg-white hover:border-[#B5A895]'
                      }`}
                    >
                      <div className="pr-2">
                        <span className="font-bold text-[#1F1E1D] block">{item.name}</span>
                        <span className="text-[11px] text-[#70675D] line-clamp-1 mt-0.5">{item.description}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#2C2620] text-white' : 'border border-[#CCC2B4]'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Dips & Sauces */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C2620]">
                  3. Pick 2 House Dips ({selectedDips.length}/2 selected)
                </span>
                <span className="text-xs text-[#8C8275]">Hand-pounded fresh</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {STREET_DIPS.map((dip) => {
                  const isSelected = selectedDips.includes(dip);
                  return (
                    <button
                      key={dip}
                      type="button"
                      onClick={() => toggleSelectDip(dip)}
                      className={`p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#2C2620] bg-[#FAF8F5] font-semibold text-[#1F1E1D]'
                          : 'border-[#DDD3C4] bg-white text-[#524B43] hover:border-[#B5A895]'
                      }`}
                    >
                      <span className="truncate pr-1">{dip}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#2C2620] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Artisan Brews & Coolers */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C2620]">
                  4. Pick 2 Artisan Brews ({selectedDrinks.length}/2 selected)
                </span>
                <span className="text-xs text-[#8C8275]">Steeped & shaken to order</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {drinksList.map((drink) => {
                  const isSelected = selectedDrinks.some((d) => d.id === drink.id);
                  return (
                    <button
                      key={drink.id}
                      type="button"
                      onClick={() => toggleSelectDrink(drink)}
                      className={`p-3.5 rounded-xl border text-left flex items-start justify-between text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'border-[#2C2620] bg-[#FAF8F5] ring-1 ring-[#2C2620]'
                          : 'border-[#DDD3C4] bg-white hover:border-[#B5A895]'
                      }`}
                    >
                      <div className="pr-2">
                        <span className="font-bold text-[#1F1E1D] block">{drink.name}</span>
                        <span className="text-[11px] text-[#70675D] line-clamp-1 mt-0.5">{drink.description}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#2C2620] text-white' : 'border border-[#CCC2B4]'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Feast Platter Box Summary */}
          <div className="lg:col-span-4 sticky top-24 bg-[#FAF8F5] rounded-2xl p-6 border border-[#E0D7C8] shadow-xs">
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C8275]">
                Feast Platter Summary
              </span>
              <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded">
                Save $10.50
              </span>
            </div>

            {/* List of 8 selected items */}
            <div className="space-y-4 text-xs">
              <div>
                <p className="font-semibold text-[#1F1E1D] mb-1">Street Mains (2):</p>
                <ul className="text-[#5C564E] space-y-1 list-disc list-inside">
                  {selectedMains.map((m) => (
                    <li key={m.id} className="truncate">{m.name}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-[#1F1E1D] mb-1">Bakery Items (2):</p>
                <ul className="text-[#5C564E] space-y-1 list-disc list-inside">
                  {selectedBakes.map((b) => (
                    <li key={b.id} className="truncate">{b.name}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-[#1F1E1D] mb-1">House Dips (2):</p>
                <ul className="text-[#5C564E] space-y-1 list-disc list-inside">
                  {selectedDips.map((d) => (
                    <li key={d} className="truncate">{d}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-[#1F1E1D] mb-1">Artisan Drinks (2):</p>
                <ul className="text-[#5C564E] space-y-1 list-disc list-inside">
                  {selectedDrinks.map((d) => (
                    <li key={d.id} className="truncate">{d.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Price Box */}
            <div className="mt-6 pt-4 border-t border-[#EAE1D2]">
              <div className="flex items-baseline justify-between text-xs text-[#70675D] line-through">
                <span>Standard A La Carte Price</span>
                <span className="tabular-nums">${standardPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="font-serif text-base font-bold text-[#1F1E1D]">Feast Bundle Price</span>
                <span className="font-serif text-2xl font-bold text-amber-900 tabular-nums">
                  ${bundleDiscountPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleAddBundle}
              className={`mt-6 w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                isAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#2C2620] hover:bg-[#1B1713] text-[#FAF8F5]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added Feast Box to Bag!</span>
                </>
              ) : (
                <>
                  <span>Add Feast Box to Bag</span>
                  <span>·</span>
                  <span className="tabular-nums font-mono">${bundleDiscountPrice.toFixed(2)}</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-[#8C8275] mt-3">
              Served in insulated eco-kraft party box with bamboo cutlery & wet wipes.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
