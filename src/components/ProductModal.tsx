import React, { useState } from 'react';
import { X, Plus, Minus, Flame, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { MenuItem, CustomOptionChoice } from '../types';

interface ProductModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    selectedOptions: { [groupName: string]: CustomOptionChoice },
    specialInstructions: string
  ) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{ [groupName: string]: CustomOptionChoice }>(() => {
    const initial: { [groupName: string]: CustomOptionChoice } = {};
    if (item.optionGroups) {
      item.optionGroups.forEach((group) => {
        if (group.choices.length > 0) {
          initial[group.name] = group.choices[0];
        }
      });
    }
    return initial;
  });
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  // Calculate unit price with selected options
  const optionDelta = Object.values(selectedOptions).reduce((sum, opt) => sum + opt.priceDelta, 0);
  const finalUnitPrice = item.price + optionDelta;
  const totalPrice = finalUnitPrice * quantity;

  const handleSelectOption = (groupName: string, choice: CustomOptionChoice) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupName]: choice,
    }));
  };

  const handleAdd = () => {
    onAddToCart(item, quantity, selectedOptions, specialInstructions);
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl overflow-hidden shadow-2xl border border-[#E0D7C8] my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#2C2620] flex items-center justify-center shadow-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media Header */}
        <div className="relative h-64 sm:h-72 w-full bg-[#EAE1D2] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-black/20" />
          
          {item.isHotFresh && (
            <div className="absolute bottom-3 left-6 flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-100/90 backdrop-blur-xs px-2.5 py-1 rounded-md">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Hot & Freshly Prepared</span>
            </div>
          )}
        </div>

        {/* Modal Body / Purchase Module */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Metadata & Title */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#70675D] mb-1.5">
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
                    {'🌶️'.repeat(item.spiceLevel)} {item.spiceLevel === 1 ? 'Mild' : item.spiceLevel === 2 ? 'Medium' : 'Extra Hot'}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-start justify-between gap-4">
              <h2 className="font-serif text-2xl font-bold text-[#1F1E1D]">
                {item.name}
              </h2>
              <span className="font-serif text-2xl font-bold text-amber-900 tabular-nums shrink-0">
                ${finalUnitPrice.toFixed(2)}
              </span>
            </div>

            <p className="mt-2 text-sm text-[#544D44] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Allergens & Dietary Notice */}
          {item.allergens && item.allergens.length > 0 && (
            <div className="p-3 bg-[#F2EDE4] rounded-lg text-xs text-[#61594F] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Contains: {item.allergens.join(', ')}. Prepared in an artisanal kitchen handling nuts and gluten.</span>
            </div>
          )}

          {/* Option Groups */}
          {item.optionGroups && item.optionGroups.length > 0 && (
            <div className="space-y-4 pt-2 border-t border-[#EAE1D2]">
              {item.optionGroups.map((group) => (
                <div key={group.name} className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#2C2620]">
                    {group.name}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.choices.map((choice) => {
                      const isSelected = selectedOptions[group.name]?.id === choice.id;
                      return (
                        <button
                          key={choice.id}
                          type="button"
                          onClick={() => handleSelectOption(group.name, choice)}
                          className={`p-3 rounded-lg border text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                            isSelected
                              ? 'border-amber-800 bg-amber-50/50 text-[#1F1E1D] font-medium'
                              : 'border-[#DDD3C4] bg-white text-[#524B43] hover:border-[#B5A895]'
                          }`}
                        >
                          <span>{choice.name}</span>
                          {choice.priceDelta > 0 && (
                            <span className="text-amber-800 font-semibold tabular-nums ml-2">
                              +${choice.priceDelta.toFixed(2)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special Requests */}
          <div className="space-y-1.5 pt-2 border-t border-[#EAE1D2]">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#2C2620]">
              Special Kitchen Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Extra hot mint chutney, cut into quarters, allergy note..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full text-xs p-3 bg-white border border-[#DDD3C4] rounded-lg focus:outline-hidden focus:border-[#2C2620]"
            />
          </div>

          {/* Footer Controls: Quantity Stepper & Add to Bag CTA */}
          <div className="pt-4 border-t border-[#EAE1D2] flex items-center justify-between gap-4">
            
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#DDD3C4] rounded-lg bg-white p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-8 h-8 rounded-md flex items-center justify-center text-[#524B43] hover:bg-[#F2EDE4] transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-sm font-semibold tabular-nums text-[#1F1E1D]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-8 h-8 rounded-md flex items-center justify-center text-[#524B43] hover:bg-[#F2EDE4] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleAdd}
              className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                isAddedFeedback
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#2C2620] hover:bg-[#1B1713] text-[#FAF8F5]'
              }`}
            >
              {isAddedFeedback ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <span>Add to Bag</span>
                  <span>·</span>
                  <span className="tabular-nums font-mono">${totalPrice.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
