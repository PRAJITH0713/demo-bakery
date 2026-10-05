import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, MapPin, ChefHat, Sparkles, X, Phone, Receipt } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderSuccessModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const [activeStep, setActiveStep] = useState<number>(1);
  const [estimatedSeconds, setEstimatedSeconds] = useState<number>(18 * 60);

  // Simulate kitchen progress over time
  useEffect(() => {
    const timer = setInterval(() => {
      setEstimatedSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);

    const stepTimer = setTimeout(() => {
      setActiveStep(2);
    }, 6000);

    return () => {
      clearInterval(timer);
      clearTimeout(stepTimer);
    };
  }, []);

  const formatMinutes = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const steps = [
    { title: 'Order Confirmed', desc: 'Ticket sent to baker & grill chef', completed: activeStep >= 1 },
    { title: 'In The Ovens & Sizzle Plancha', desc: 'Baking sourdough & grilling hot street skewers', completed: activeStep >= 2 },
    { title: 'Packing Fresh', desc: 'Sealing in thermal eco-boxes with warm dipping sauces', completed: activeStep >= 3 },
    { title: order.orderType === 'delivery' ? 'Out for Delivery' : 'Ready at Counter', desc: order.orderType === 'delivery' ? 'Courier en route to your door' : 'Ready for pickup at pickup cubby #3', completed: activeStep >= 4 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-[#FAF8F5] rounded-2xl overflow-hidden shadow-2xl border border-[#E0D7C8] my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 bg-[#2C2620] text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 rounded-full bg-emerald-700/80 text-white flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <h2 className="font-serif text-2xl font-bold">
            Order #{order.orderId} Confirmed!
          </h2>
          <p className="text-xs text-amber-200 mt-1">
            Thank you, {order.customerName}. Your feast is sizzling hot right now.
          </p>
        </div>

        {/* Live Kitchen Status Bar */}
        <div className="p-6 space-y-6">
          
          {/* Estimated time countdown box */}
          <div className="p-4 bg-white rounded-xl border border-[#E0D7C8] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#70675D]">Estimated Time Remaining</p>
                <p className="font-serif text-xl font-bold text-[#1F1E1D] font-mono tabular-nums">
                  ~{formatMinutes(estimatedSeconds)} mins
                </p>
              </div>
            </div>
            <div className="text-right text-xs">
              <span className="font-semibold text-[#1F1E1D] block">
                {order.orderType === 'delivery' ? 'Direct Delivery' : 'Curbside Pickup'}
              </span>
              <span className="text-[#8C8275]">
                {order.orderType === 'delivery' ? (order.address || 'Address provided') : (order.pickupTime || 'Ready in ~15 mins')}
              </span>
            </div>
          </div>

          {/* Interactive Steps Progress */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2620]">
              Live Kitchen Progress
            </h4>
            
            <div className="space-y-3">
              {steps.map((st, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold ${
                    st.completed ? 'bg-[#2C2620] text-white' : 'bg-[#EAE1D2] text-[#8C8275]'
                  }`}>
                    {st.completed ? '✓' : idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${st.completed ? 'text-[#1F1E1D]' : 'text-[#8C8275]'}`}>
                      {st.title}
                    </p>
                    <p className="text-[#70675D] text-[11px]">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Receipt Breakdown */}
          <div className="p-4 bg-white rounded-xl border border-[#E0D7C8] space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#1F1E1D] pb-2 border-b border-[#F0EBE1]">
              <Receipt className="w-4 h-4 text-[#8C8275]" />
              <span>Itemized Receipt ({order.items.reduce((s, i) => s + i.quantity, 0)} items)</span>
            </div>
            
            <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
              {order.items.map((i, idx) => (
                <div key={idx} className="flex justify-between text-[#5C564E]">
                  <span className="truncate pr-2">{i.quantity}x {i.item.name}</span>
                  <span className="font-mono tabular-nums shrink-0">${(i.unitPrice * i.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#F0EBE1] space-y-1">
              <div className="flex justify-between text-[#70675D]">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Discount</span>
                  <span className="font-mono tabular-nums">-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#70675D]">
                <span>{order.orderType === 'delivery' ? 'Delivery Fee' : 'Pickup Fee'}</span>
                <span className="font-mono tabular-nums">${order.deliveryFee.toFixed(2)}</span>
              </div>
              {order.tip > 0 && (
                <div className="flex justify-between text-[#70675D]">
                  <span>Crew Tip</span>
                  <span className="font-mono tabular-nums">${order.tip.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#EAE1D2] flex justify-between font-bold text-sm text-[#1F1E1D]">
                <span>Paid via {order.paymentMethod.toUpperCase()}</span>
                <span className="font-serif text-lg text-amber-900 tabular-nums">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-[#2C2620] hover:bg-[#1B1713] text-white rounded-xl text-xs font-semibold text-center cursor-pointer transition-colors"
            >
              Back to Storefront
            </button>
            <a
              href="tel:5558392253"
              className="py-3 px-4 bg-white border border-[#DDD3C4] hover:border-[#2C2620] text-[#1F1E1D] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Bakery Counter</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
