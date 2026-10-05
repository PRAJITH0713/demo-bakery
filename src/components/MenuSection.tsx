import React, { useState } from 'react';
import { Plus, Flame, Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import { MenuItem, MenuCategory, DietaryTag } from '../types';
import { MENU_CATEGORIES } from '../data/menu';

interface MenuSectionProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  searchQuery: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
  searchQuery,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [activeDietaryFilter, setActiveDietaryFilter] = useState<DietaryTag | 'All'>('All');
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  // Filter items based on Category, Dietary, and Search
  const filteredItems = items.filter((item) => {
    // 1. Category check
    if (activeCategory !== 'all' && item.category !== activeCategory) {
      return false;
    }
    // 2. Dietary filter check
    if (activeDietaryFilter !== 'All' && !item.tags.includes(activeDietaryFilter)) {
      return false;
    }
    // 3. Search query check
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTags) return false;
    }
    return true;
  });

  const handleQuickAddClick = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    onQuickAdd(item);
    setQuickAddedId(item.id);
    setTimeout(() => {
      setQuickAddedId(null);
    }, 600);
  };

  return (
    <section id="menu-catalog" className="py-12 md:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#EAE1D2]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C8275]">
              Freshly Baked & Sizzled To Order
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1E1D] mt-1">
              The Full Counter & Street Menu
            </h2>
          </div>
          <p className="text-sm text-[#5C564E] max-w-md">
            Everything made fresh daily in our open kitchen. From morning slow-fermented bakes to sizzling evening street delights.
          </p>
        </div>

        {/* Interactive Category Segmented Bar */}
        <div className="pt-6 pb-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 p-1 bg-[#EFE9DD] rounded-xl w-max">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as MenuCategory)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#1F1E1D] shadow-xs font-semibold'
                      : 'text-[#5C564E] hover:text-[#1F1E1D]'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dietary Filter Segmented Row */}
        <div className="flex items-center gap-2 pb-8 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[#8C8275] font-medium mr-1 flex items-center gap-1 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          {(['All', 'Vegetarian', 'Vegan', 'Halal', 'Gluten-Friendly', 'Chef Special', 'Spicy'] as const).map(
            (tag) => {
              const isSelected = activeDietaryFilter === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveDietaryFilter(tag)}
                  className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#2C2620] text-[#FAF8F5] font-medium'
                      : 'bg-white border border-[#DDD3C4] text-[#524B43] hover:border-[#2C2620]'
                  }`}
                >
                  {tag}
                </button>
              );
            }
          )}
        </div>

        {/* Active Search / Filter State Indicator */}
        {searchQuery && (
          <div className="mb-6 p-3 bg-[#F4EFE6] rounded-lg text-xs text-[#524B43] flex items-center justify-between">
            <span>Showing results for &ldquo;{searchQuery}&rdquo; ({filteredItems.length} items found)</span>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-[#F4EFE6] rounded-2xl border border-dashed border-[#DDD3C4]">
            <p className="font-serif text-lg font-bold text-[#1F1E1D]">No culinary delights match your filter</p>
            <p className="text-xs text-[#6E665B] mt-1">Try switching categories or clearing search keywords.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveDietaryFilter('All');
              }}
              className="mt-4 px-4 py-2 bg-[#2C2620] text-white text-xs font-medium rounded-lg hover:bg-black transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Product Grid: 3-column desktop, uniform cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredItems.map((item) => {
            const isJustAdded = quickAddedId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group flex flex-col bg-white rounded-xl border border-[#E0D7C8] hover:border-[#B5A895] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
              >
                {/* Product Image: 65% visual weight */}
                <div className="relative aspect-[4/3] w-full bg-[#EAE1D2] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Subtle top indicator if Chef Special or Hot */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {item.isHotFresh && (
                      <span className="bg-amber-900/90 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-300" />
                        <span>Hot & Fresh</span>
                      </span>
                    )}
                    {item.tags.includes('Chef Special') && !item.isHotFresh && (
                      <span className="bg-[#2C2620]/90 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>Chef’s Signature</span>
                      </span>
                    )}
                  </div>

                  {/* Quick Add Floating Button on Image */}
                  <button
                    onClick={(e) => handleQuickAddClick(e, item)}
                    aria-label={`Quick add ${item.name}`}
                    className={`absolute bottom-3 right-3 w-9 h-9 rounded-lg flex items-center justify-center shadow-md transition-all cursor-pointer ${
                      isJustAdded
                        ? 'bg-emerald-700 text-white scale-110'
                        : 'bg-white hover:bg-[#2C2620] text-[#1F1E1D] hover:text-white'
                    }`}
                  >
                    {isJustAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>

                {/* Card Content & Metadata */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  
                  <div>
                    {/* Unboxed Metadata with Typographic Dots (Anti-Pill Rule) */}
                    <div className="flex items-center gap-1.5 text-xs text-[#70675D] mb-1.5">
                      <span>{item.prepTime}</span>
                      {item.calories && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{item.calories} kcal</span>
                        </>
                      )}
                      {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-800 font-medium">
                            {'🌶️'.repeat(item.spiceLevel)}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Product Name */}
                    <h3 className="font-serif text-lg font-bold text-[#1F1E1D] group-hover:text-amber-900 transition-colors leading-snug">
                      {item.name}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-1.5 text-xs text-[#5C564E] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Bottom Bar: Price & Action */}
                  <div className="pt-4 mt-4 border-t border-[#F0EBE1] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#8C8275] block">Price</span>
                      <span className="font-serif text-lg font-bold text-[#1F1E1D] tabular-nums">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem(item);
                      }}
                      className="text-xs font-semibold text-[#2C2620] hover:text-amber-800 transition-colors py-1 px-2.5 rounded hover:bg-[#F2EDE4]"
                    >
                      {item.optionGroups && item.optionGroups.length > 0 ? 'Customize →' : 'Details →'}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
