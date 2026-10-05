import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveKitchenBar } from './components/LiveKitchenBar';
import { MenuSection } from './components/MenuSection';
import { FeastBoxBuilder } from './components/FeastBoxBuilder';
import { CustomCakeStudio } from './components/CustomCakeStudio';
import { ReviewsAndStory } from './components/ReviewsAndStory';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';

import { MENU_ITEMS } from './data/menu';
import { MenuItem, CartItem, OrderDetails, CustomOptionChoice } from './types';

export default function App() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');

  // Selected item for Product Modal
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);

  // Confirmed Order for live tracker
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  // Handlers
  const handleQuickAdd = (item: MenuItem) => {
    // If the item has required options, open modal; otherwise quick add
    if (item.optionGroups && item.optionGroups.length > 0) {
      setSelectedProduct(item);
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id && !ci.selectedOptions);
      if (existing) {
        return prev.map((ci) =>
          ci.cartItemId === existing.cartItemId
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      const newItem: CartItem = {
        cartItemId: `${item.id}-${Date.now()}`,
        item,
        quantity: 1,
        unitPrice: item.price,
      };
      return [...prev, newItem];
    });
  };

  const handleAddToCartWithOptions = (
    item: MenuItem,
    quantity: number,
    selectedOptions: { [groupName: string]: CustomOptionChoice },
    specialInstructions: string
  ) => {
    const optionDelta = Object.values(selectedOptions).reduce((sum, opt) => sum + opt.priceDelta, 0);
    const finalUnitPrice = item.price + optionDelta;

    const newCartItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}`,
      item,
      quantity,
      selectedOptions,
      specialInstructions: specialInstructions.trim() ? specialInstructions : undefined,
      unitPrice: finalUnitPrice,
    };

    setCartItems((prev) => [...prev, newCartItem]);
  };

  const handleAddCustomCakeToCart = (cakeItem: MenuItem, cakeConfigSummary: string) => {
    const newCartItem: CartItem = {
      cartItemId: `cake-${Date.now()}`,
      item: cakeItem,
      quantity: 1,
      specialInstructions: cakeConfigSummary,
      unitPrice: cakeItem.price,
    };
    setCartItems((prev) => [...prev, newCartItem]);
    setIsCartOpen(true);
  };

  const handleAddFeastBoxToCart = (feastItem: MenuItem, summary: string) => {
    const newCartItem: CartItem = {
      cartItemId: `feast-${Date.now()}`,
      item: feastItem,
      quantity: 1,
      specialInstructions: summary,
      unitPrice: feastItem.price,
    };
    setCartItems((prev) => [...prev, newCartItem]);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => (ci.cartItemId === cartItemId ? { ...ci, quantity: newQty } : ci))
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  const handleCompleteOrder = (orderDetails: OrderDetails) => {
    setCartItems([]);
    setIsCartOpen(false);
    setConfirmedOrder(orderDetails);
  };

  const handleScrollToMenu = () => {
    const el = document.getElementById('menu-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToFeast = () => {
    const el = document.getElementById('street-feast');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToCake = () => {
    const el = document.getElementById('cake-studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1E1D] flex flex-col selection:bg-amber-200 selection:text-amber-950">
      
      {/* Navigation */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        orderType={orderType}
        onToggleOrderType={setOrderType}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <Hero
        onExploreMenu={handleScrollToMenu}
        onOpenFeastBox={handleScrollToFeast}
        onOpenCakeStudio={handleScrollToCake}
      />

      {/* Live Oven & Grill Status Bar */}
      <LiveKitchenBar />

      {/* Primary Catalog & Street Menu */}
      <MenuSection
        items={MENU_ITEMS}
        onSelectItem={(item) => setSelectedProduct(item)}
        onQuickAdd={handleQuickAdd}
        searchQuery={searchQuery}
      />

      {/* Street & Bake Feast Platter Box Builder */}
      <FeastBoxBuilder
        allItems={MENU_ITEMS}
        onAddFeastBoxToCart={handleAddFeastBoxToCart}
      />

      {/* Custom Celebration Cake Studio */}
      <CustomCakeStudio
        onAddCustomCakeToCart={handleAddCustomCakeToCart}
      />

      {/* Craftsmanship Story, Reviews, & Kitchen Hours */}
      <ReviewsAndStory />

      {/* Domain Footer */}
      <Footer />

      {/* Detailed Product Modal / Purchase Module */}
      <ProductModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCartWithOptions}
      />

      {/* Slide-over Shopping Bag & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        orderType={orderType}
        onToggleOrderType={setOrderType}
        onCompleteOrder={handleCompleteOrder}
      />

      {/* Live Order Confirmation & Status Tracker Modal */}
      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

    </div>
  );
}
