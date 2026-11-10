import React from 'react';
import {
  Bell,
  ChevronDown,
  Search,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileHeader: React.FC = () => {
  const {
    activeChapter,
    unreadNotifCount,
    setIsChapterSelectorOpen,
    setIsNotificationsOpen,
    setIsGlobalSearchOpen,
    globalSearchQuery,
    setGlobalSearchQuery,
    activeTab,
    activeSubScreen,
    setActiveSubScreen
  } = useApp();

  const isDashboard = activeTab === 'home' && !activeSubScreen;

  const getScreenTitle = () => {
    if (activeSubScreen === 'members_directory') return 'Chapter Members';
    if (activeSubScreen === 'subscriptions_manager') return 'Pending Renewals';
    if (activeSubScreen === 'dues_ledger') return 'Dues Ledger';
    if (activeSubScreen === 'billing_manager') return 'Billing & Invoices';
    if (activeSubScreen === 'verify_new_members') return 'Verify New Members';
    if (activeSubScreen === 'existing_dues_approvals') return 'Existing Members Dues';
    if (activeSubScreen === 'create_meeting') return 'Create Meeting';

    switch (activeTab) {
      case 'approvals':
        return 'Membership Approvals';
      case 'events':
        return 'Events Management';
      case 'meet':
        return 'Chapter Meetings';
      case 'drive':
        return 'Transparency Hub Drive';
      case 'more':
        return 'Administrative Hub';
      default:
        return 'Dashboard';
    }
  };

  const getScreenSubtitle = () => {
    if (activeSubScreen === 'verify_new_members') return 'Verify 3rd-party payment receipts';
    if (activeSubScreen === 'existing_dues_approvals') return 'Direct dues approval without receipt';
    if (activeSubScreen === 'create_meeting') return 'Schedule live or virtual chapter sync';
    if (activeSubScreen) return activeChapter.name;

    switch (activeTab) {
      case 'approvals':
        return 'Applications awaiting review & verification';
      case 'events':
        return 'Chapter galas, webinars & assemblies';
      case 'meet':
        return 'Live video rooms, executive syncs & town halls';
      case 'drive':
        return 'Official document vault & signed records';
      case 'more':
        return 'Broadcasts, elections, guilds & settings';
      default:
        return "Admin here's what's happening in your chapter";
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#F7F9FA] px-4 pt-3 pb-3 border-b border-[#E6EAED]/60 backdrop-blur-md">
      {/* HOMEPAGE ONLY: Chapter Selector, Greeting, Notification Bell, and Global Search */}
      {isDashboard ? (
        <div className="space-y-2.5">
          <div className="flex items-start justify-between">
            {/* Crest Emblem + Chapter Selector + Greeting */}
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-11 h-11 rounded-full bg-white border border-[#E6EAED] p-1 flex flex-col items-center justify-center shadow-xs shrink-0">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  className="w-full h-full text-[#006699]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 24C12 18 16 12 24 10C32 12 36 18 36 24C36 32 28 38 24 40C20 38 12 32 12 24Z"
                    fill="#E6F2F7"
                    stroke="#006699"
                    strokeWidth="2"
                  />
                  <path
                    d="M24 13V37M17 20C17 20 20 22 24 22C28 22 31 20 31 20M16 27C16 27 20 29 24 29C28 29 32 27 32 27"
                    stroke="#006699"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 26C8 33 13 39 21 42"
                    stroke="#004B70"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="2 3"
                  />
                  <path
                    d="M40 26C40 33 35 39 27 42"
                    stroke="#004B70"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="2 3"
                  />
                </svg>
                <span className="text-[6px] font-bold text-[#004B70] tracking-tighter uppercase leading-none mt-0.5">
                  ALUMNI
                </span>
              </div>

              <div className="min-w-0">
                {/* Chapter Selector Dropdown Pill (Homepage Only) */}
                <button
                  onClick={() => setIsChapterSelectorOpen(true)}
                  className="group inline-flex items-center gap-1.5 px-2.5 py-0.5 -ml-1 rounded-full bg-[#E6F2F7] hover:bg-[#d6eaf3] text-[#006699] text-[11px] font-semibold transition-all active:scale-98"
                >
                  <span className="truncate max-w-[170px]">
                    {activeChapter.id === 'us-chapter' ? 'Evans National Alum..' : activeChapter.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#006699] transition-transform group-hover:translate-y-0.5 shrink-0" />
                </button>

                {/* Greeting on Dashboard */}
                <h1 className="text-xl font-bold tracking-tight text-[#172B36] mt-0.5 leading-snug truncate">
                  Good morning, Mavis
                </h1>
                <p className="text-xs text-[#71808A] font-medium leading-none mt-0.5 truncate">
                  Admin here's what's happening in your chapter
                </p>
              </div>
            </div>

            {/* Notification Bell (Homepage Only) */}
            <div className="pt-1 shrink-0">
              <button
                onClick={() => setIsNotificationsOpen(true)}
                aria-label="Open notifications"
                className="relative w-10 h-10 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#172B36] hover:bg-slate-50 transition-colors shadow-xs active:scale-95"
              >
                <Bell className="w-5 h-5 text-[#172B36]" />
                {unreadNotifCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D94B4B] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                    {unreadNotifCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Global Search Bar (Homepage Only) */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#006699] absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder={`Find members, events, records in ${activeChapter.name}...`}
              value={globalSearchQuery}
              onFocus={() => setIsGlobalSearchOpen(true)}
              onClick={() => setIsGlobalSearchOpen(true)}
              onChange={(e) => {
                setGlobalSearchQuery(e.target.value);
                setIsGlobalSearchOpen(true);
              }}
              className="w-full pl-8 pr-3 py-1.5 bg-white rounded-xl border border-[#E6EAED] text-xs text-[#172B36] placeholder-[#71808A] focus:outline-none focus:ring-1 focus:ring-[#006699] shadow-2xs hover:border-[#006699]/30 transition-colors cursor-pointer"
            />
          </div>
        </div>
      ) : (
        /* OTHER PAGES: Clean Single Top Header — No search, No bell, No chapter switch */
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {activeSubScreen ? (
              <button
                onClick={() => setActiveSubScreen(null)}
                aria-label="Back to dashboard"
                className="w-9 h-9 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#172B36] hover:bg-slate-50 transition-colors shadow-xs active:scale-95 shrink-0"
              >
                <ArrowLeft className="w-4 h-4 text-[#006699]" />
              </button>
            ) : (
              <div className="w-9 h-9 rounded-full bg-white border border-[#E6EAED] p-1 flex items-center justify-center shadow-xs shrink-0">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  className="w-full h-full text-[#006699]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 24C12 18 16 12 24 10C32 12 36 18 36 24C36 32 28 38 24 40C20 38 12 32 12 24Z"
                    fill="#E6F2F7"
                    stroke="#006699"
                    strokeWidth="2"
                  />
                  <path
                    d="M24 13V37M17 20C17 20 20 22 24 22C28 22 31 20 31 20"
                    stroke="#006699"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}

            <div className="min-w-0">
              <h1 className="text-base font-bold tracking-tight text-[#172B36] leading-snug truncate">
                {getScreenTitle()}
              </h1>
              <p className="text-[11px] text-[#71808A] font-medium leading-none mt-0.5 truncate">
                {getScreenSubtitle()}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
