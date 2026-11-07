import React, { useState } from 'react';
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Download,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Receipt,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MONTHLY_DUES_DATA } from '../../data/mockData';

export const DuesLedgerScreen: React.FC = () => {
  const {
    currentMetrics,
    activeChapter,
    setActiveSubScreen
  } = useApp();

  const [selectedMonth, setSelectedMonth] = useState('All');

  return (
    <div className="space-y-4 pb-24 animate-in fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubScreen(null)}
            className="w-8 h-8 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#71808A] hover:text-[#172B36] shadow-xs active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#172B36]">
              Chapter Dues Collection
            </h1>
            <p className="text-xs text-[#71808A]">
              Treasury reconciliation & receipts in {activeChapter.currency}
            </p>
          </div>
        </div>
      </div>

      {/* Main Dues Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-[#71808A]">Total Dues Collected</span>
            <h2 className="text-2xl font-bold text-[#21865B] font-mono mt-0.5">
              {currentMetrics.duesCollectedFormatted}
            </h2>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#21865B]/10 text-[#21865B] text-xs font-bold">
            {currentMetrics.duesPercent}% of Target
          </span>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="w-full bg-[#E6EAED] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#006699] h-full rounded-full transition-all duration-500"
              style={{ width: `${currentMetrics.duesPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-[#71808A]">
            <span>Collected: {currentMetrics.duesCollectedFormatted}</span>
            <span>Target: {currentMetrics.totalBillingFormatted}</span>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-[#172B36]">
          Monthly Collections Breakdown (YTD)
        </h3>

        <div className="divide-y divide-[#E6EAED] text-xs">
          {MONTHLY_DUES_DATA.map((row) => (
            <div key={row.month} className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#172B36] w-8">{row.month}</span>
                <span className="text-[11px] text-[#71808A]">
                  Confirmed: <strong className="text-[#21865B]">${row.confirmed.toFixed(1)}k</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                {row.awaiting > 0 ? (
                  <span className="text-[10px] font-semibold text-[#D99A2B] bg-amber-50 px-2 py-0.5 rounded-full">
                    Awaiting: ${row.awaiting.toFixed(1)}k
                  </span>
                ) : (
                  <span className="text-[10px] text-[#71808A] bg-slate-100 px-2 py-0.5 rounded-full">
                    Cleared
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Dues Receipts */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-[#172B36] px-1">
          Recent Reconciled Dues Deposits
        </h3>

        <div className="space-y-2">
          {[
            { id: 'REC-991', name: 'Dr. Kelechi Okafor', amount: '$250', date: 'Nov 06, 2026', ref: 'TXN-NY-992014-OK', method: 'Stripe Gateway' },
            { id: 'REC-990', name: 'Amara Diallo', amount: '$75', date: 'Nov 02, 2026', ref: 'PAYPAL-991204', method: 'PayPal Direct' },
            { id: 'REC-989', name: 'David Adeleke', amount: '$1,000', date: 'Nov 04, 2026', ref: 'STRIPE-CHG-993881', method: 'Bank Wire Transfer' },
            { id: 'REC-988', name: 'Elena Rostova', amount: '$500', date: 'Oct 28, 2026', ref: 'REF-#MEM-4491', method: 'Mastercard Corporate' }
          ].map(item => (
            <div
              key={item.id}
              className="bg-white p-3.5 rounded-2xl border border-[#E6EAED] shadow-xs flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#21865B]/10 text-[#21865B] flex items-center justify-center">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#172B36]">{item.name}</h4>
                  <p className="text-[11px] text-[#71808A]">{item.date} • {item.method}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="font-bold font-mono text-[#21865B] block">{item.amount}</span>
                <span className="text-[9px] text-[#71808A] font-mono">{item.ref}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
