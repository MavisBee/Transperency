import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Send,
  ArrowLeft,
  Calendar,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SubscriptionRecord } from '../../types';

export const SubscriptionsManagerScreen: React.FC = () => {
  const {
    subscriptions,
    currentMetrics,
    activeChapter,
    setActiveSubScreen,
    addAuditLog
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'active' | 'pending_renewal' | 'expired'>('All');
  const [sentNoticeId, setSentNoticeId] = useState<string | null>(null);

  const filteredSubs = subscriptions.filter(sub => {
    if (statusFilter !== 'All' && sub.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = sub.memberName.toLowerCase().includes(q);
      const matchEmail = sub.memberEmail.toLowerCase().includes(q);
      const matchTier = sub.planTier.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchTier) return false;
    }
    return true;
  });

  const handleSendReminder = (sub: SubscriptionRecord) => {
    setSentNoticeId(sub.id);
    addAuditLog('Renewal Reminder Sent', `Sent automated renewal notice to ${sub.memberName} (${sub.planTier})`, sub.id, 'Subscriptions');
    setTimeout(() => setSentNoticeId(null), 3000);
  };

  return (
    <div className="space-y-4 pb-24 animate-in fade-in">
      {/* Top Header */}
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
              Subscriptions Management
            </h1>
            <p className="text-xs text-[#71808A]">
              Member tiers & automated renewal schedules for {activeChapter.name}
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="bg-white p-3 rounded-xl border border-[#E6EAED] shadow-xs text-center">
          <span className="text-lg font-bold text-[#172B36] font-mono block">
            {currentMetrics.activeSubscriptions.toLocaleString()}
          </span>
          <span className="text-[10px] text-[#71808A]">Active Plans</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#E6EAED] shadow-xs text-center">
          <span className="text-lg font-bold text-[#D99A2B] font-mono block">
            {currentMetrics.pendingRenewals}
          </span>
          <span className="text-[10px] text-[#71808A]">Pending Renewal</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#E6EAED] shadow-xs text-center">
          <span className="text-lg font-bold text-[#D94B4B] font-mono block">
            18
          </span>
          <span className="text-[10px] text-[#71808A]">Lapsed / Expired</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#71808A] absolute left-3 top-3 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by member name, tier, email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E6EAED] text-xs text-[#172B36] placeholder-[#71808A] focus:outline-none focus:ring-1 focus:ring-[#006699] shadow-xs"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <button
          onClick={() => setStatusFilter('All')}
          className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
            statusFilter === 'All'
              ? 'bg-[#006699] text-white shadow-xs'
              : 'bg-white text-[#71808A] border border-[#E6EAED]'
          }`}
        >
          All Records
        </button>
        <button
          onClick={() => setStatusFilter('active')}
          className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
            statusFilter === 'active'
              ? 'bg-[#006699] text-white shadow-xs'
              : 'bg-white text-[#71808A] border border-[#E6EAED]'
          }`}
        >
          Active Plans
        </button>
        <button
          onClick={() => setStatusFilter('pending_renewal')}
          className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
            statusFilter === 'pending_renewal'
              ? 'bg-[#006699] text-white shadow-xs'
              : 'bg-white text-[#71808A] border border-[#E6EAED]'
          }`}
        >
          Pending Renewal ({currentMetrics.pendingRenewals})
        </button>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-3">
        {filteredSubs.map((sub) => (
          <div
            key={sub.id}
            className="bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#172B36]">{sub.memberName}</h3>
                <p className="text-xs text-[#006699] font-semibold">{sub.planTier}</p>
                <p className="text-[11px] text-[#71808A] mt-0.5">{sub.memberEmail}</p>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold text-[#172B36] font-mono">
                  ${sub.amount}
                </span>
                <span className="text-[10px] text-[#71808A] block">/{sub.billingCycle}</span>
              </div>
            </div>

            <div className="p-2.5 bg-[#F7F9FA] rounded-xl border border-[#E6EAED] flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-[#71808A] uppercase font-bold tracking-wider">
                  Renewal Date
                </span>
                <p className="font-semibold text-[#172B36]">{sub.renewalDate}</p>
              </div>

              <div className="text-right space-y-0.5">
                <span className="text-[10px] text-[#71808A] uppercase font-bold tracking-wider">
                  Payment Method
                </span>
                <p className="font-semibold text-[#172B36]">{sub.paymentMethod}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                {sub.status === 'active' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#21865B]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Auto-Renew Active
                  </span>
                )}
                {sub.status === 'pending_renewal' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D99A2B]">
                    <Clock className="w-3.5 h-3.5" />
                    Renewal Overdue
                  </span>
                )}
              </div>

              {sub.status === 'pending_renewal' && (
                <button
                  onClick={() => handleSendReminder(sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    sentNoticeId === sub.id
                      ? 'bg-[#21865B] text-white'
                      : 'bg-[#006699] hover:bg-[#004B70] text-white shadow-xs'
                  }`}
                >
                  <Send className="w-3 h-3" />
                  <span>{sentNoticeId === sub.id ? 'Notice Sent!' : 'Send Reminder'}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
