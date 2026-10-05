import React, { useState } from 'react';
import { ShoppingBag, Search, Clock, MapPin, X, Menu as MenuIcon } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  orderType: 'pickup' | 'delivery';
  onToggleOrderType: (type: 'pickup' | 'delivery') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenFeastModal?: () => void;
  onOpenCakeStudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  orderType,
  onToggleOrderType,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE1D2]">
      {/* 1. Slim Announcement Header Strip (single row, under 36px) */}
      <div className="bg-[#2C2620] text-[#FAF8F5] text-xs py-1.5 px-4 text-center tracking-wide">
        <span>Fresh Bakes Out Every 30 Mins · Sizzling Street Food Hot to Order · Use code </span>
        <span className="font-semibold text-amber-400">CRUMB10</span>
        <span> for 10% off</span>
      </div>

      {/* 2. Top Bar Contract: Zone 1 (Wordmark), Zone 2 (4-5 Nav Links), Zone 3 (Primary Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="font-serif text-2xl font-bold tracking-tight text-[#1F1E1D] hover:text-amber-800 transition-colors whitespace-nowrap">
          Crumb & Sizzle
        </a>

        {/* Zone 2: 4–6 nav links, 1–2 word labels, single-line text links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A453F]">
          <a href="#menu-catalog" className="hover:text-[#1F1E1D] transition-colors">
            All Delights
          </a>
          <a href="#street-feast" className="hover:text-[#1F1E1D] transition-colors">
            Feast Box
          </a>
          <a href="#cake-studio" className="hover:text-[#1F1E1D] transition-colors">
            Cake Studio
          </a>
          <a href="#live-kitchen" className="hover:text-[#1F1E1D] transition-colors">
            Live Ovens
          </a>
          <a href="#our-story" className="hover:text-[#1F1E1D] transition-colors">
            Our Story
          </a>
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-3">
          
          {/* Quick Order Mode Toggle (Segmented control) */}
          <div className="hidden sm:flex items-center p-0.5 bg-[#EFE9DD] rounded-lg text-xs font-medium">
            <button
              onClick={() => onToggleOrderType('pickup')}
              className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                orderType === 'pickup'
                  ? 'bg-white text-[#1F1E1D] shadow-xs'
                  : 'text-[#5C564E] hover:text-[#1F1E1D]'
              }`}
            >
              Pickup (15m)
            </button>
            <button
              onClick={() => onToggleOrderType('delivery')}
              className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                orderType === 'delivery'
                  ? 'bg-white text-[#1F1E1D] shadow-xs'
                  : 'text-[#5C564E] hover:text-[#1F1E1D]'
              }`}
            >
              Delivery (30m)
            </button>
          </div>

          {/* Search Toggle */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center bg-white border border-[#DDD3C4] rounded-lg px-2.5 py-1 text-sm shadow-xs">
                <Search className="w-4 h-4 text-[#8C8275] mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search sourdough, taco, bao..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="w-36 sm:w-48 text-xs bg-transparent focus:outline-hidden"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="text-[#8C8275] hover:text-[#1F1E1D]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                aria-label="Search menu"
                className="p-2 rounded-lg text-[#4A453F] hover:bg-[#EFE9DD] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Primary Action: Shopping Bag Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-4 py-2 bg-[#2C2620] hover:bg-[#1B1713] text-[#FAF8F5] rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-amber-500 text-stone-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {totalItemsCount}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">Bag</span>
            <span className="text-xs font-semibold tabular-nums text-amber-200">
              ${cartSubtotal.toFixed(2)}
            </span>
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A453F] hover:bg-[#EFE9DD] rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-5 border-t border-[#EAE1D2] bg-[#FAF8F5] space-y-3">
          <div className="flex items-center justify-between p-2 bg-[#EFE9DD] rounded-lg text-xs font-medium">
            <button
              onClick={() => onToggleOrderType('pickup')}
              className={`flex-1 py-1.5 rounded-md text-center ${
                orderType === 'pickup' ? 'bg-white shadow-xs font-semibold' : 'text-[#5C564E]'
              }`}
            >
              Pickup (15m)
            </button>
            <button
              onClick={() => onToggleOrderType('delivery')}
              className={`flex-1 py-1.5 rounded-md text-center ${
                orderType === 'delivery' ? 'bg-white shadow-xs font-semibold' : 'text-[#5C564E]'
              }`}
            >
              Delivery (30m)
            </button>
          </div>

          <div className="flex flex-col space-y-2 text-sm font-medium text-[#4A453F]">
            <a
              href="#menu-catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EFE9DD]"
            >
              All Delights
            </a>
            <a
              href="#street-feast"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EFE9DD]"
            >
              Feast Box Builder
            </a>
            <a
              href="#cake-studio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EFE9DD]"
            >
              Custom Cake Studio
            </a>
            <a
              href="#live-kitchen"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EFE9DD]"
            >
              Live Kitchen Counter
            </a>
            <a
              href="#our-story"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EFE9DD]"
            >
              Our Story & Hours
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
