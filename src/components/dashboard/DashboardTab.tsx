import React, { useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  Clock,
  MapPin,
  CalendarPlus,
  Megaphone,
  FileUp,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  CreditCard,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MONTHLY_DUES_DATA, DEMOGRAPHIC_SEGMENTS } from '../../data/mockData';

export const DashboardTab: React.FC = () => {
  const {
    currentMetrics,
    events,
    activities,
    setActiveTab,
    setActiveSubScreen,
    setSelectedEventId,
    setActiveQuickAction
  } = useApp();

  const [duesInterval, setDuesInterval] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Monthly');
  const [selectedMonth, setSelectedMonth] = useState<string>('Sep');
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  // Active next chapter event (primary featured event)
  const nextEvent = events.find(e => e.status === 'upcoming') || events[0];

  return (
    <div className="space-y-4 pb-24">
      {/* 5.2 Chapter Metrics 2x2 Grid */}
      <section aria-label="Chapter Metrics" className="space-y-2">
        <h2 className="text-sm font-semibold text-[#172B36] tracking-tight px-1">
          Chapter Metrics
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Total Members */}
          <button
            onClick={() => setActiveSubScreen('members_directory')}
            className="text-left bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs hover:border-[#006699]/40 transition-all group active:scale-98"
          >
            <div className="flex items-start justify-between">
              <span className="text-2xl font-bold tracking-tight text-[#172B36] font-mono tabular-nums">
                {currentMetrics.totalMembers.toLocaleString()}
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#71808A] group-hover:text-[#006699] transition-colors" />
            </div>
            <p className="text-xs text-[#71808A] font-medium mt-3">
              Total Members
            </p>
            <div className="mt-1">
              <span className="inline-block px-2 py-0.5 rounded-full bg-[#E6F2F7] text-[#006699] text-[11px] font-semibold">
                {currentMetrics.memberGrowth}
              </span>
            </div>
          </button>

          {/* Card 2: Active Subscriptions */}
          <button
            onClick={() => setActiveSubScreen('subscriptions_manager')}
            className="text-left bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs hover:border-[#006699]/40 transition-all group active:scale-98"
          >
            <div className="flex items-start justify-between">
              <span className="text-2xl font-bold tracking-tight text-[#172B36] font-mono tabular-nums">
                {currentMetrics.activeSubscriptions.toLocaleString()}
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#71808A] group-hover:text-[#006699] transition-colors" />
            </div>
            <p className="text-xs text-[#71808A] font-medium mt-3">
              Active Subscriptions
            </p>
            <p className="text-[11px] text-[#71808A] font-medium mt-1">
              {currentMetrics.pendingRenewals} Pending
            </p>
          </button>

          {/* Card 3: Dues Collected */}
          <button
            onClick={() => setActiveSubScreen('dues_ledger')}
            className="text-left bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs hover:border-[#006699]/40 transition-all group active:scale-98"
          >
            <div className="flex items-start justify-between">
              <span className="text-2xl font-bold tracking-tight text-[#172B36] font-mono tabular-nums">
                {currentMetrics.duesCollectedFormatted}
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#71808A] group-hover:text-[#006699] transition-colors" />
            </div>
            <p className="text-xs text-[#71808A] font-medium mt-3">
              Dues Collected
            </p>
            <div className="w-full bg-[#E6EAED] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#006699] h-full rounded-full transition-all duration-500"
                style={{ width: `${currentMetrics.duesPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-[#71808A] font-medium mt-1">
              {currentMetrics.duesPercent}% of {currentMetrics.totalBillingFormatted} target
            </p>
          </button>

          {/* Card 4: Total Billing */}
          <button
            onClick={() => setActiveSubScreen('billing_manager')}
            className="text-left bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs hover:border-[#006699]/40 transition-all group active:scale-98"
          >
            <div className="flex items-start justify-between">
              <span className="text-2xl font-bold tracking-tight text-[#172B36] font-mono tabular-nums">
                {currentMetrics.totalBillingFormatted}
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#71808A] group-hover:text-[#006699] transition-colors" />
            </div>
            <p className="text-xs text-[#71808A] font-medium mt-3">
              Total Billing
            </p>
            <p className="text-[10px] text-[#D94B4B] font-semibold mt-1">
              {currentMetrics.outstandingBalanceFormatted}
            </p>
          </button>
        </div>
      </section>

      {/* 5.3 Quick Actions Bar */}
      <section aria-label="Quick Actions" className="bg-white rounded-2xl p-3 border border-[#E6EAED] shadow-xs">
        <div className="grid grid-cols-4 gap-2 text-center">
          <button
            onClick={() => setActiveQuickAction('create_event')}
            className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-[#E6F2F7]/50 transition-colors active:scale-95"
          >
            <div className="w-9 h-9 rounded-full bg-[#E6F2F7] text-[#006699] flex items-center justify-center mb-1">
              <CalendarPlus className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-[#172B36] leading-tight">Create Event</span>
          </button>

          <button
            onClick={() => setActiveQuickAction('make_announcement')}
            className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-[#E6F2F7]/50 transition-colors active:scale-95"
          >
            <div className="w-9 h-9 rounded-full bg-[#E6F2F7] text-[#006699] flex items-center justify-center mb-1">
              <Megaphone className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-[#172B36] leading-tight">Announce</span>
          </button>

          <button
            onClick={() => setActiveQuickAction('upload_minutes')}
            className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-[#E6F2F7]/50 transition-colors active:scale-95"
          >
            <div className="w-9 h-9 rounded-full bg-[#E6F2F7] text-[#006699] flex items-center justify-center mb-1">
              <FileUp className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-[#172B36] leading-tight">Upload Mins</span>
          </button>

          <button
            onClick={() => setActiveTab('approvals')}
            className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-[#E6F2F7]/50 transition-colors active:scale-95"
          >
            <div className="w-9 h-9 rounded-full bg-[#E6F2F7] text-[#006699] flex items-center justify-center mb-1">
              <UserCheck className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-[#172B36] leading-tight">Approvals</span>
          </button>
        </div>
      </section>

      {/* Chapter Dues Chart Card */}
      <section aria-label="Chapter Dues" className="bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#172B36] tracking-tight">
              Chapter Dues
            </h2>
            <p className="text-xs text-[#71808A] font-medium">
              Monthly dues collected
            </p>
          </div>

          <div className="relative">
            <select
              value={duesInterval}
              onChange={(e) => setDuesInterval(e.target.value as any)}
              className="appearance-none bg-[#F7F9FA] text-[#172B36] text-xs font-semibold px-3 py-1.5 pr-7 rounded-lg border border-[#E6EAED] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#006699]"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#71808A] absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="mt-6 pt-2 pb-2">
          <div className="relative h-44 flex items-end justify-between gap-1.5 px-1 border-b border-[#E6EAED]">
            {/* Horizontal Guide Lines */}
            <div className="absolute inset-x-0 top-0 border-t border-dashed border-[#E6EAED]" />
            <div className="absolute inset-x-0 top-1/4 border-t border-dashed border-[#E6EAED]" />
            <div className="absolute inset-x-0 top-2/4 border-t border-dashed border-[#E6EAED]" />
            <div className="absolute inset-x-0 top-3/4 border-t border-dashed border-[#E6EAED]" />

            {/* Left Y-axis labels */}
            <div className="absolute -left-1 inset-y-0 flex flex-col justify-between text-[9px] text-[#71808A] pointer-events-none">
              <span>1k</span>
              <span>2k</span>
              <span>3k</span>
              <span>4k</span>
              <span>5k</span>
            </div>

            {/* Bars for Each Month */}
            {MONTHLY_DUES_DATA.map((item) => {
              const isSelected = selectedMonth === item.month;
              // Bar height relative to 12k max
              const heightPercent = item.status === 'no-activity' ? 6 : Math.max(12, Math.min(95, (item.confirmed + item.awaiting) * 8.5));

              return (
                <div
                  key={item.month}
                  onClick={() => setSelectedMonth(item.month)}
                  className="relative flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
                >
                  {/* Tooltip on Selected Month (Sep or Clicked) */}
                  {isSelected && (
                    <div className="absolute -top-12 z-20 whitespace-nowrap bg-[#E6F2F7] border border-[#006699]/20 rounded-lg p-1.5 shadow-md text-left text-[10px] leading-tight">
                      <p className="text-[#006699] font-medium">
                        Awaiting payment: <span className="font-bold">${item.awaiting.toFixed(0)}k</span>
                      </p>
                      <p className="text-[#004B70] font-semibold">
                        Confirmed payment: <span className="font-bold">${item.confirmed.toFixed(1)}k</span>
                      </p>
                      <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-[#E6F2F7] rotate-45 border-r border-b border-[#006699]/20" />
                    </div>
                  )}

                  {/* The bar element */}
                  <div
                    className={`w-full max-w-[24px] rounded-t-md transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#004B70] shadow-sm'
                        : item.status === 'pending'
                        ? 'bg-[#89C2D9]'
                        : item.status === 'no-activity'
                        ? 'bg-[#E6EAED]'
                        : 'bg-[#CDE3EE] hover:bg-[#B3D6E7]'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />

                  {/* Month Label */}
                  <span
                    className={`text-[10px] mt-2 font-medium transition-colors ${
                      isSelected ? 'text-[#006699] font-bold' : 'text-[#71808A]'
                    }`}
                  >
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Chart Legend */}
          <div className="flex items-center justify-start gap-4 mt-4 px-1 text-[11px] text-[#71808A]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#21865B]" />
              <span>Successful</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D99A2B]" />
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E6EAED]" />
              <span>No activity</span>
            </div>
          </div>
        </div>
      </section>

      {/* Member Demographics Card */}
      <section aria-label="Member Demographics" className="bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs">
        <h2 className="text-base font-bold text-[#172B36] tracking-tight">
          Member Demographics
        </h2>
        <p className="text-xs text-[#71808A] font-medium">
          Distribution across association chapters
        </p>

        {/* Multi-segment continuous horizontal progress bar */}
        <div className="w-full h-3 rounded-full overflow-hidden flex mt-4 bg-[#E6EAED]">
          {DEMOGRAPHIC_SEGMENTS.map((seg) => (
            <div
              key={seg.label}
              style={{
                width: `${seg.percentage}%`,
                backgroundColor: seg.color
              }}
              title={`${seg.label}: ${seg.percentage}% (${seg.count})`}
              className="h-full transition-all duration-300"
            />
          ))}
        </div>

        {/* Demographics Legend with counts */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-4 text-xs">
          {DEMOGRAPHIC_SEGMENTS.map((seg) => (
            <div key={seg.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-xs"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-[#172B36] font-medium">{seg.label}</span>
              </div>
              <div className="text-[#71808A] font-mono tabular-nums">
                <span className="font-semibold text-[#172B36]">{seg.percentage}%</span>{' '}
                <span className="text-[11px]">({seg.count})</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Next Chapter Event Card */}
      <section aria-label="Next Chapter Event" className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-bold text-[#172B36] tracking-tight">
            Next Chapter Event
          </h2>
          <button
            onClick={() => setActiveTab('events')}
            className="text-xs font-semibold text-[#006699] hover:underline"
          >
            View All
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-[#E6EAED] shadow-xs overflow-hidden">
          {/* Event Cover Image Banner */}
          <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
            <img
              src={nextEvent.coverImage || '/assets/aistudio/Dashboard_266332e5.png'}
              alt={nextEvent.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                // styled fallback in case
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Badges on the image */}
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#172B36] text-xs font-semibold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#006699]" />
                {nextEvent.daysBadge}
              </span>
            </div>

            <div className="absolute bottom-3 right-3">
              <span className="px-2.5 py-1 rounded-md bg-white/95 text-[#172B36] text-xs font-bold shadow-xs">
                {nextEvent.bookedPercentBadge}
              </span>
            </div>
          </div>

          {/* Event Info Details */}
          <div className="p-4 space-y-3">
            <h3 className="text-lg font-bold text-[#172B36] tracking-tight leading-snug">
              {nextEvent.title}
            </h3>

            <div className="space-y-1.5 text-xs text-[#71808A]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#006699] shrink-0" />
                <span>{nextEvent.dateDisplay} • {nextEvent.timeDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#006699] shrink-0" />
                <span className="truncate">{nextEvent.location}</span>
              </div>
            </div>

            {/* Capacity Progress Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#172B36] font-mono tabular-nums">
                  {nextEvent.registeredCount} / {nextEvent.maxCapacity} Registered
                </span>
                <span className="text-[#71808A] font-medium">
                  {nextEvent.remainingSeats} seats remaining
                </span>
              </div>
              <div className="w-full bg-[#E6EAED] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#006699] h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.round((nextEvent.registeredCount / nextEvent.maxCapacity) * 100)}%`
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedEventId(nextEvent.id);
                  setActiveTab('events');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#006699] hover:bg-[#004B70] text-white text-xs font-semibold shadow-xs transition-all active:scale-98 flex items-center justify-center gap-1.5"
              >
                Manage Event
              </button>

              <button
                onClick={() => {
                  setSelectedEventId(nextEvent.id);
                  setActiveTab('events');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F7F9FA] hover:bg-[#E6EAED] text-[#172B36] border border-[#E6EAED] text-xs font-semibold transition-all active:scale-98 flex items-center justify-center gap-1.5"
              >
                Attendees ({nextEvent.registeredCount})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5.4 Recent Activity */}
      <section aria-label="Recent Activity" className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-bold text-[#172B36] tracking-tight">
            Recent Activity
          </h2>
          <button
            onClick={() => setIsActivityModalOpen(true)}
            className="text-xs font-semibold text-[#006699] hover:underline"
          >
            View All
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-[#E6EAED] shadow-xs divide-y divide-[#E6EAED]">
          {activities.slice(0, 3).map((act) => (
            <div key={act.id} className="p-3.5 flex items-start gap-3 hover:bg-[#F7F9FA]/60 transition-colors">
              {/* Avatar or Badge */}
              <div className="relative shrink-0">
                {act.authorAvatar ? (
                  <img
                    src={act.authorAvatar}
                    alt={act.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-[#E6EAED]"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#E6F2F7] text-[#006699] font-bold text-xs flex items-center justify-center border border-[#E6EAED]">
                    {act.authorInitials || act.authorName.slice(0, 2).toUpperCase()}
                  </div>
                )}
                {/* Micro category icon badge */}
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#006699] text-white flex items-center justify-center text-[9px] shadow-xs">
                  {act.type === 'disbursement' && <CreditCard className="w-2.5 h-2.5" />}
                  {act.type === 'renewal' && <UserCheck className="w-2.5 h-2.5" />}
                  {act.type === 'minutes' && <FileText className="w-2.5 h-2.5" />}
                  {act.type === 'approval' && <CheckCircle2 className="w-2.5 h-2.5" />}
                  {act.type === 'announcement' && <Megaphone className="w-2.5 h-2.5" />}
                  {act.type === 'event' && <CalendarPlus className="w-2.5 h-2.5" />}
                </span>
              </div>

              {/* Activity Description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#172B36] truncate">
                    {act.authorName}
                  </h4>
                  <span className="text-[10px] text-[#71808A] shrink-0 font-medium">
                    {act.timeAgo}
                  </span>
                </div>
                <p className="text-xs text-[#71808A] mt-0.5 line-clamp-1 leading-snug">
                  {act.description}
                </p>
                {act.referenceText && (
                  <p className="text-[11px] text-[#006699] font-medium mt-1 hover:underline cursor-pointer">
                    {act.referenceText}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Activity "View All" Modal */}
      {isActivityModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[#E6EAED] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#172B36]">
                  Organization Activity Feed
                </h3>
                <p className="text-xs text-[#71808A]">
                  Chronological records of chapter events & disbursements
                </p>
              </div>
              <button
                onClick={() => setIsActivityModalOpen(false)}
                className="text-xs font-semibold text-[#71808A] hover:text-[#172B36] px-2 py-1 rounded-md"
              >
                Close
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 divide-y divide-[#E6EAED]">
              {activities.map((act) => (
                <div key={act.id} className="pt-3 first:pt-0 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E6F2F7] text-[#006699] font-bold text-xs flex items-center justify-center shrink-0">
                    {act.authorInitials || act.authorName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#172B36]">{act.authorName}</h4>
                      <span className="text-[10px] text-[#71808A]">{act.timeAgo}</span>
                    </div>
                    <p className="text-xs text-[#71808A] mt-0.5">{act.description}</p>
                    {act.referenceText && (
                      <span className="text-[11px] font-semibold text-[#006699] block mt-1">
                        {act.referenceText}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
