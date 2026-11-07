import React from 'react';
import { Smartphone, Monitor, Wifi, Battery, Signal, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DeviceFrameWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobileFrameEnabled, setIsMobileFrameEnabled, activeChapter } = useApp();

  return (
    <div className="min-h-screen bg-[#EAEFF2] flex flex-col items-center justify-start sm:py-6 sm:px-4">
      {/* Top Desktop Helper & Frame Mode Switcher */}
      <div className="w-full max-w-[420px] mb-3 hidden sm:flex items-center justify-between px-2 text-xs text-[#71808A]">
        <div className="flex items-center gap-1.5 font-semibold text-[#172B36]">
          <Shield className="w-4 h-4 text-[#006699]" />
          <span>Transparency Hub Network</span>
        </div>

        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E6EAED] shadow-xs">
          <button
            onClick={() => setIsMobileFrameEnabled(true)}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
              isMobileFrameEnabled
                ? 'bg-[#006699] text-white font-bold shadow-xs'
                : 'text-[#71808A] hover:text-[#172B36]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
          <button
            onClick={() => setIsMobileFrameEnabled(false)}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
              !isMobileFrameEnabled
                ? 'bg-[#006699] text-white font-bold shadow-xs'
                : 'text-[#71808A] hover:text-[#172B36]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Full Width</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div
        className={`w-full transition-all duration-300 relative ${
          isMobileFrameEnabled
            ? 'max-w-[390px] bg-[#F7F9FA] sm:rounded-[44px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] sm:border-[8px] sm:border-[#1F2937] sm:ring-1 sm:ring-black/10 overflow-hidden min-h-[844px] flex flex-col'
            : 'max-w-2xl bg-[#F7F9FA] rounded-2xl shadow-sm border border-[#E6EAED] min-h-screen flex flex-col'
        }`}
      >
        {/* iOS Native Status Bar (matches screenshot 9:41, wifi, battery) */}
        {isMobileFrameEnabled && (
          <div className="sticky top-0 z-40 bg-[#F7F9FA]/90 backdrop-blur-md pt-2 px-6 pb-1 flex items-center justify-between text-xs font-semibold text-[#172B36] select-none">
            {/* Time */}
            <span className="font-semibold tracking-tight text-[13px] ml-1">9:41</span>

            {/* Dynamic Island Pill */}
            <div className="w-24 h-4 bg-black rounded-full mx-auto hidden sm:block" />

            {/* System Icons */}
            <div className="flex items-center gap-1.5 mr-1 text-[#172B36]">
              <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
              <div className="flex items-center">
                <Battery className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>
          </div>
        )}

        {/* Child Screen Content */}
        <div className="flex-1 flex flex-col min-h-0 relative">
          {children}
        </div>

        {/* iOS Home Indicator Bar */}
        {isMobileFrameEnabled && (
          <div className="w-full pb-2 pt-1 flex justify-center pointer-events-none sticky bottom-0 z-40 bg-transparent">
            <div className="w-32 h-1 bg-slate-900/40 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};
