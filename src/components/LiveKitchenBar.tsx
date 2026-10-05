import React from 'react';
import { Flame, Clock, Sparkles } from 'lucide-react';
import { LIVE_OVEN_ITEMS } from '../data/menu';

export const LiveKitchenBar: React.FC = () => {
  return (
    <div id="live-kitchen" className="bg-[#F4EFE6] border-b border-[#EAE1D2] py-3 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Label */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#2C2620] shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="uppercase tracking-wider">Kitchen & Grill Live:</span>
        </div>

        {/* Ticker items */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar text-xs text-[#524B43]">
          {LIVE_OVEN_ITEMS.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 shrink-0">
              <span className="font-medium text-[#1F1E1D]">{item.item}</span>
              <span className="text-amber-800 bg-[#E8DECF] px-2 py-0.5 rounded text-[11px] font-mono tabular-nums">
                {item.status}
              </span>
              <span className="text-[#8C8275]">({item.temp})</span>
              {idx < LIVE_OVEN_ITEMS.length - 1 && (
                <span className="text-[#BDB2A3] ml-4">·</span>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
