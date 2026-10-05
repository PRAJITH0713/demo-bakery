import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, Truck, Store } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  orderType: 'pickup' | 'delivery';
  onToggleOrderType: (type: 'pickup' | 'delivery') => void;
  onCompleteOrder: (orderDetails: OrderDetails) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  orderType,
  onToggleOrderType,
  onCompleteOrder,
}) => {
  if (!isOpen) return null;

  // Checkout inputs
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pickupTime, setPickupTime] = useState('As soon as possible (~15 mins)');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'instant'>('card');
  
  // Promo code
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  // Tip
  const [tipPercentage, setTipPercentage] = useState<number>(15);

  // Financial calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  
  // Promo discount
  let discount = 0;
  if (appliedPromo === 'CRUMB10') {
    discount = subtotal * 0.10;
  } else if (appliedPromo === 'STREET5') {
    discount = Math.min(subtotal, 5.0);
  }

  // Delivery fee
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 45 ? 0 : 3.99) : 0;
  
  // Tip amount
  const tipAmount = (subtotal - discount) * (tipPercentage / 100);
  
  // Total
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee + tipAmount);

  // Free delivery progress
  const freeDeliveryThreshold = 45;
  const deliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'CRUMB10' || code === 'STREET5') {
      setAppliedPromo(code);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "CRUMB10" or "STREET5"');
    }
  };

  const [validationError, setValidationError] = useState('');

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!customerName.trim()) {
      setValidationError('Please provide your name for the order.');
      return;
    }
    if (!customerPhone.trim()) {
      setValidationError('Please provide your contact phone number.');
      return;
    }
    if (orderType === 'delivery' && !address.trim()) {
      setValidationError('Please provide a delivery address.');
      return;
    }
    setValidationError('');

    const orderData: OrderDetails = {
      orderId: `CS-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName,
      customerPhone,
      orderType,
      address: orderType === 'delivery' ? address : undefined,
      pickupTime: orderType === 'pickup' ? pickupTime : undefined,
      paymentMethod,
      items: [...cartItems],
      subtotal,
      discount,
      deliveryFee,
      tip: tipAmount,
      total: finalTotal,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'confirmed',
    };

    onCompleteOrder(orderData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-lg bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#E0D7C8] animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#EAE1D2] bg-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#2C2620]" />
            <h2 className="font-serif text-lg font-bold text-[#1F1E1D]">
              Your Culinary Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#70675D] hover:bg-[#F2EDE4] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-5 space-y-6 flex-1">
          
          {/* Order Mode Switcher */}
          <div className="flex items-center p-1 bg-[#EFE9DD] rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => onToggleOrderType('pickup')}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                orderType === 'pickup'
                  ? 'bg-white text-[#1F1E1D] shadow-xs'
                  : 'text-[#6E665B] hover:text-[#1F1E1D]'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Curbside Pickup (15m)</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleOrderType('delivery')}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                orderType === 'delivery'
                  ? 'bg-white text-[#1F1E1D] shadow-xs'
                  : 'text-[#6E665B] hover:text-[#1F1E1D]'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Door Delivery (35m)</span>
            </button>
          </div>

          {/* Delivery Threshold Progress */}
          {orderType === 'delivery' && (
            <div className="p-3 bg-amber-50/80 border border-amber-200/60 rounded-xl text-xs text-amber-950">
              <div className="flex justify-between font-medium mb-1.5">
                <span>
                  {remainingForFreeDelivery === 0
                    ? '🎉 You unlocked Free Delivery!'
                    : `Add $${remainingForFreeDelivery.toFixed(2)} more for Free Delivery`}
                </span>
                <span className="font-mono tabular-nums">{Math.round(deliveryProgress)}%</span>
              </div>
              <div className="w-full bg-amber-200/60 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-600 h-full transition-all duration-300"
                  style={{ width: `${deliveryProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#EFE9DD] flex items-center justify-center mx-auto text-[#8C8275]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="font-serif text-base font-bold text-[#1F1E1D]">Your bag is hungry</p>
              <p className="text-xs text-[#70675D] max-w-xs mx-auto">
                Explore our slow-fermented bakes, warm croissants, tacos, and sizzling baos to fill it up!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((cartItem) => {
                const itemOptions = cartItem.selectedOptions ? Object.values(cartItem.selectedOptions) : [];

                return (
                  <div
                    key={cartItem.cartItemId}
                    className="p-3.5 bg-white rounded-xl border border-[#E0D7C8] flex gap-3 text-xs"
                  >
                    {/* Item Thumbnail */}
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-16 h-16 rounded-lg object-cover bg-[#EAE1D2] shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-semibold text-[#1F1E1D] truncate leading-tight">
                            {cartItem.item.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(cartItem.cartItemId)}
                            className="text-[#8C8275] hover:text-red-700 transition-colors p-0.5"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Options summary */}
                        {itemOptions.length > 0 && (
                          <p className="text-[11px] text-[#7A7165] mt-0.5 truncate">
                            {itemOptions.map((opt) => opt.name).join(', ')}
                          </p>
                        )}
                        {cartItem.specialInstructions && (
                          <p className="text-[11px] text-amber-900 italic mt-0.5 truncate">
                            Note: {cartItem.specialInstructions}
                          </p>
                        )}
                      </div>

                      {/* Quantity & Unit Total */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F2EDE4]">
                        <div className="flex items-center border border-[#DDD3C4] rounded-md bg-[#FAF8F5]">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                            className="px-2 py-0.5 text-[#5C564E] hover:text-[#1F1E1D]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-semibold tabular-nums text-[#1F1E1D]">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                            className="px-2 py-0.5 text-[#5C564E] hover:text-[#1F1E1D]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif font-bold text-sm text-[#1F1E1D] tabular-nums">
                          ${(cartItem.unitPrice * cartItem.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Checkout Form & Financials (When items present) */}
          {cartItems.length > 0 && (
            <div className="space-y-6 pt-2">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8C8275]" />
                    <input
                      type="text"
                      placeholder="Promo code (CRUMB10 or STREET5)"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#DDD3C4] rounded-lg uppercase placeholder:normal-case focus:outline-hidden focus:border-[#2C2620]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#2C2620] text-white text-xs font-medium rounded-lg hover:bg-black transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-[11px] text-emerald-800 font-medium">
                    ✓ Applied &ldquo;{appliedPromo}&rdquo; discount!
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-600 font-medium">{promoError}</p>
                )}
              </form>

              {/* Customer Contact Information */}
              <div className="p-4 bg-white rounded-xl border border-[#E0D7C8] space-y-3 text-xs">
                <div className="font-bold text-[#1F1E1D] text-xs uppercase tracking-wider">
                  Contact & Fulfillment
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-medium text-[#70675D] block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Elena Rostova"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2 bg-[#FAF8F5] border border-[#DDD3C4] rounded-lg focus:outline-hidden focus:border-[#2C2620]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#70675D] block mb-1">Mobile Phone (for SMS)</label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 019-2834"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full p-2 bg-[#FAF8F5] border border-[#DDD3C4] rounded-lg focus:outline-hidden focus:border-[#2C2620]"
                    />
                  </div>
                </div>

                {orderType === 'delivery' ? (
                  <div>
                    <label className="text-[11px] font-medium text-[#70675D] block mb-1">Delivery Address & Apt/Suite</label>
                    <input
                      type="text"
                      required
                      placeholder="742 Evergreen Terrace, Apt 4B"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2 bg-[#FAF8F5] border border-[#DDD3C4] rounded-lg focus:outline-hidden focus:border-[#2C2620]"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-[11px] font-medium text-[#70675D] block mb-1">Pickup Time Window</label>
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full p-2 bg-[#FAF8F5] border border-[#DDD3C4] rounded-lg focus:outline-hidden focus:border-[#2C2620]"
                    >
                      <option value="As soon as possible (~15 mins)">As soon as possible (~15 mins)</option>
                      <option value="In 30 minutes">In 30 minutes</option>
                      <option value="In 45 minutes">In 45 minutes</option>
                      <option value="This afternoon (1:00 PM - 2:00 PM)">This afternoon (1:00 PM - 2:00 PM)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Baker & Street Crew Tip */}
              <div className="space-y-1.5 text-xs">
                <span className="font-semibold text-[#2C2620] block">
                  Support Our Bakery & Street Cook Crew
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 10, 15, 20].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setTipPercentage(pct)}
                      className={`py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                        tipPercentage === pct
                          ? 'border-[#2C2620] bg-[#2C2620] text-white'
                          : 'border-[#DDD3C4] bg-white text-[#524B43] hover:border-[#2C2620]'
                      }`}
                    >
                      {pct === 0 ? 'None' : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-1.5 text-xs">
                <span className="font-semibold text-[#2C2620] block">
                  Payment Method
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', label: 'Credit Card' },
                    { id: 'instant', label: 'Apple / Google Pay' },
                    { id: 'cod', label: orderType === 'delivery' ? 'Cash on Delivery' : 'Pay at Counter' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id as 'cod' | 'card' | 'instant')}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                        paymentMethod === method.id
                          ? 'border-[#2C2620] bg-[#FAF8F5] font-semibold text-[#1F1E1D] ring-1 ring-[#2C2620]'
                          : 'border-[#DDD3C4] bg-white text-[#524B43] hover:border-[#B5A895]'
                      }`}
                    >
                      <span>{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cost Summary Breakdown */}
              <div className="p-4 bg-[#F4EFE6] rounded-xl border border-[#E0D7C8] space-y-2 text-xs">
                <div className="flex justify-between text-[#70675D]">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-mono">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Discount ({appliedPromo})</span>
                    <span className="tabular-nums font-mono">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#70675D]">
                  <span>{orderType === 'delivery' ? 'Delivery Fee' : 'Pickup Curbside Fee'}</span>
                  <span className="tabular-nums font-mono">
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {tipAmount > 0 && (
                  <div className="flex justify-between text-[#70675D]">
                    <span>Kitchen Tip ({tipPercentage}%)</span>
                    <span className="tabular-nums font-mono">${tipAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#E0D7C8] flex justify-between items-baseline font-bold text-sm text-[#1F1E1D]">
                  <span>Total Due</span>
                  <span className="font-serif text-xl text-amber-900 tabular-nums">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Drawer Sticky Footer / CTA */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#EAE1D2] bg-white sticky bottom-0 z-10">
            {validationError && (
              <div className="mb-3 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                {validationError}
              </div>
            )}
            <button
              onClick={handleCheckoutSubmit}
              className="w-full py-3.5 px-6 bg-[#2C2620] hover:bg-[#1B1713] text-[#FAF8F5] rounded-xl font-semibold text-sm transition-all flex items-center justify-between shadow-md cursor-pointer"
            >
              <span>Confirm & Place Order</span>
              <div className="flex items-center gap-2">
                <span className="font-mono tabular-nums text-amber-300">${finalTotal.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8C8275] mt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>100% Satisfaction Guarantee · Fresh & Hot On Delivery</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
