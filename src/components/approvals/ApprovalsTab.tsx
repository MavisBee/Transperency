import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  CreditCard,
  MessageSquare,
  FileText,
  User,
  Shield,
  ShieldCheck,
  ChevronRight,
  Send,
  Plus,
  Receipt,
  FileCheck,
  Building2,
  Upload,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MemberApplication, ApplicationStatus, RegisteredMember } from '../../types';
import { VerifyReceiptModal } from './VerifyReceiptModal';
import { ApproveExistingDuesModal } from './ApproveExistingDuesModal';

export const ApprovalsTab: React.FC = () => {
  const {
    applications,
    registeredMembers,
    activeChapter,
    approveApplication,
    rejectApplication,
    requestApplicationInfo,
    addApplicationNote,
    verifyNewMemberReceipt,
    simulateUploadReceipt,
    bulkApproveExistingDues,
    selectedApplicationId,
    setSelectedApplicationId
  } = useApp();

  // Workflow Mode: 'new_members' (with receipts) vs 'existing_dues' (direct approval without receipt)
  const [workflowMode, setWorkflowMode] = useState<'new_members' | 'existing_dues'>('new_members');

  // New Members Filter
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'ready_to_verify' | 'awaiting_receipt' | 'approved'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Existing Members Filter
  const [existingDuesFilter, setExistingDuesFilter] = useState<'all' | 'overdue' | 'approved'>('all');
  const [existingSearchQuery, setExistingSearchQuery] = useState('');

  // Modals state
  const [receiptModalApp, setReceiptModalApp] = useState<MemberApplication | null>(null);
  const [selectedMemberForDues, setSelectedMemberForDues] = useState<RegisteredMember | null>(null);
  const [showPaymentWarningModal, setShowPaymentWarningModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('Qualifications not verified with registrar');
  const [requestInfoMessage, setRequestInfoMessage] = useState('Please attach your verified degree certificate or transcript.');
  const [newNoteText, setNewNoteText] = useState('');

  // Selected application for detail drawer
  const activeApp = applications.find(a => a.id === selectedApplicationId);

  // Counts for New Members
  const pendingCount = applications.filter(a => a.status === 'pending' || a.status === 'awaiting_payment').length;
  const readyToVerifyCount = applications.filter(a => a.status === 'pending' && a.receiptReference && !a.receiptVerified).length;
  const awaitingReceiptCount = applications.filter(a => a.status === 'awaiting_payment' || (a.status === 'pending' && !a.receiptReference)).length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;

  // Existing Members counts
  const chapterMembers = registeredMembers.filter(
    m => m.chapterId === activeChapter.id || m.chapterId === 'org-wide'
  );
  const overdueDuesCount = chapterMembers.filter(m => m.duesStatus === 'overdue').length;
  const clearedDuesCount = chapterMembers.filter(m => m.duesStatus === 'up_to_date').length;

  // Filtered New Members
  const filteredApps = applications.filter(app => {
    if (activeFilter === 'pending' && app.status !== 'pending' && app.status !== 'awaiting_payment') return false;
    if (activeFilter === 'ready_to_verify' && (!app.receiptReference || app.receiptVerified)) return false;
    if (activeFilter === 'awaiting_receipt' && app.receiptReference) return false;
    if (activeFilter === 'approved' && app.status !== 'approved') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = app.fullName.toLowerCase().includes(q);
      const matchId = app.id.toLowerCase().includes(q);
      const matchEmail = app.email.toLowerCase().includes(q);
      const matchType = app.membershipType.toLowerCase().includes(q);
      if (!matchName && !matchId && !matchEmail && !matchType) return false;
    }
    return true;
  });

  // Filtered Existing Members
  const filteredExistingMembers = chapterMembers.filter(m => {
    if (existingDuesFilter === 'overdue' && m.duesStatus !== 'overdue') return false;
    if (existingDuesFilter === 'approved' && m.duesStatus !== 'up_to_date') return false;

    if (existingSearchQuery.trim()) {
      const q = existingSearchQuery.toLowerCase();
      const matchName = m.fullName.toLowerCase().includes(q);
      const matchId = m.id.toLowerCase().includes(q);
      const matchEmail = m.email.toLowerCase().includes(q);
      if (!matchName && !matchId && !matchEmail) return false;
    }
    return true;
  });

  const handleApproveClick = () => {
    if (!activeApp) return;
    if (activeApp.paymentStatus === 'outstanding' || activeApp.outstandingBalance > 0) {
      setShowPaymentWarningModal(true);
    } else {
      approveApplication(activeApp.id);
    }
  };

  const confirmApproveWithOutstandingPayment = () => {
    if (!activeApp) return;
    approveApplication(activeApp.id, 'Approved with conditional pending dues payment.');
    setShowPaymentWarningModal(false);
  };

  const handleConfirmReject = () => {
    if (!activeApp) return;
    rejectApplication(activeApp.id, rejectReason);
    setShowRejectModal(false);
  };

  const handleConfirmRequestInfo = () => {
    if (!activeApp) return;
    requestApplicationInfo(activeApp.id, requestInfoMessage);
    setShowRequestInfoModal(false);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !activeApp) return;
    addApplicationNote(activeApp.id, newNoteText.trim());
    setNewNoteText('');
  };

  return (
    <div className="space-y-4 pb-24 pt-1 animate-in fade-in">
      {/* 1. Workflow Mode Switcher: Verify New Members vs Existing Members Dues */}
      <div className="bg-[#E6F2F7] p-1 rounded-2xl flex items-center gap-1 text-xs font-bold border border-[#006699]/20 shadow-xs">
        <button
          onClick={() => setWorkflowMode('new_members')}
          className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            workflowMode === 'new_members'
              ? 'bg-[#006699] text-white shadow-xs'
              : 'text-[#006699] hover:bg-white/60'
          }`}
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>Verify New Members ({readyToVerifyCount} Ready)</span>
        </button>

        <button
          onClick={() => setWorkflowMode('existing_dues')}
          className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            workflowMode === 'existing_dues'
              ? 'bg-[#006699] text-white shadow-xs'
              : 'text-[#006699] hover:bg-white/60'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Existing Member Dues ({overdueDuesCount} Pending)</span>
        </button>
      </div>

      {workflowMode === 'new_members' ? (
        /* SECTION A: VERIFY NEW MEMBERS (3RD-PARTY APP RECEIPTS) */
        <div className="space-y-4">
          {/* Overview Metric Strip */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white p-2.5 rounded-xl border border-[#E6EAED] shadow-xs text-center">
              <span className="text-base font-bold text-[#172B36] font-mono tabular-nums block">
                {pendingCount}
              </span>
              <span className="text-[10px] text-[#71808A] font-medium block">Total Pending</span>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-[#E6EAED] shadow-xs text-center">
              <span className="text-base font-bold text-[#006699] font-mono tabular-nums block">
                {readyToVerifyCount}
              </span>
              <span className="text-[10px] text-[#71808A] font-medium block">Ready to Verify</span>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-[#E6EAED] shadow-xs text-center">
              <span className="text-base font-bold text-[#D99A2B] font-mono tabular-nums block">
                {awaitingReceiptCount}
              </span>
              <span className="text-[10px] text-[#71808A] font-medium block">Awaiting Receipt</span>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-[#E6EAED] shadow-xs text-center">
              <span className="text-base font-bold text-[#21865B] font-mono tabular-nums block">
                {approvedCount}
              </span>
              <span className="text-[10px] text-[#71808A] font-medium block">Inducted</span>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#71808A] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search candidate by name, degree, or reference code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-white rounded-xl border border-[#E6EAED] text-xs focus:ring-1 focus:ring-[#006699] shadow-2xs"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none font-medium">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-[#006699] text-white font-bold'
                    : 'bg-white text-[#71808A] border border-[#E6EAED] hover:bg-slate-50'
                }`}
              >
                All Applications ({applications.length})
              </button>

              <button
                onClick={() => setActiveFilter('ready_to_verify')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
                  activeFilter === 'ready_to_verify'
                    ? 'bg-[#006699] text-white font-bold'
                    : 'bg-white text-[#006699] border border-[#006699]/30 hover:bg-[#E6F2F7]'
                }`}
              >
                <Receipt className="w-3 h-3" />
                <span>Receipt Uploaded ({readyToVerifyCount})</span>
              </button>

              <button
                onClick={() => setActiveFilter('awaiting_receipt')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  activeFilter === 'awaiting_receipt'
                    ? 'bg-[#006699] text-white font-bold'
                    : 'bg-white text-[#71808A] border border-[#E6EAED] hover:bg-slate-50'
                }`}
              >
                Awaiting Receipt ({awaitingReceiptCount})
              </button>

              <button
                onClick={() => setActiveFilter('approved')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  activeFilter === 'approved'
                    ? 'bg-[#006699] text-white font-bold'
                    : 'bg-white text-[#71808A] border border-[#E6EAED] hover:bg-slate-50'
                }`}
              >
                Inducted ({approvedCount})
              </button>
            </div>
          </div>

          {/* New Member Application Cards */}
          <div className="space-y-3">
            {filteredApps.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-[#E6EAED] text-center space-y-2">
                <Receipt className="w-10 h-10 text-[#71808A]/40 mx-auto" />
                <h3 className="text-sm font-bold text-[#172B36]">No new member applications found</h3>
                <p className="text-xs text-[#71808A] max-w-xs mx-auto">
                  Try adjusting search or check back when prospective members submit induction receipts.
                </p>
              </div>
            ) : (
              filteredApps.map((app) => {
                const hasReceipt = Boolean(app.receiptReference);
                const isVerified = app.receiptVerified;

                return (
                  <div
                    key={app.id}
                    className="bg-white rounded-2xl border border-[#E6EAED] shadow-xs p-4 space-y-3 hover:border-[#006699]/40 transition-all group"
                  >
                    {/* Header info */}
                    <div className="flex items-start justify-between gap-3">
                      <div
                        onClick={() => setSelectedApplicationId(app.id)}
                        className="flex items-start gap-3 min-w-0 cursor-pointer"
                      >
                        {app.avatarUrl ? (
                          <img
                            src={app.avatarUrl}
                            alt={app.fullName}
                            className="w-11 h-11 rounded-full object-cover border border-[#E6EAED] shrink-0"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-[#E6F2F7] text-[#006699] font-bold flex items-center justify-center text-sm shrink-0">
                            {app.initials}
                          </div>
                        )}

                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-[#172B36] group-hover:text-[#006699] transition-colors truncate">
                            {app.fullName}
                          </h3>
                          <p className="text-xs text-[#71808A] truncate">
                            {app.membershipType} • {app.subChapterName || app.chapterName}
                          </p>
                          <p className="text-[11px] text-[#71808A] mt-0.5">
                            {app.degree} (Class of {app.graduationYear})
                          </p>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        {isVerified ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                            Receipt Verified
                          </span>
                        ) : hasReceipt ? (
                          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#006699] text-[10px] font-bold border border-[#006699]/30 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#006699] animate-pulse" />
                            Receipt Uploaded
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-[#D99A2B] text-[10px] font-bold border border-amber-200">
                            Awaiting Payment
                          </span>
                        )}
                        <span className="text-[10px] text-[#71808A]">Fee: ${app.membershipFee}</span>
                      </div>
                    </div>

                    {/* 3rd-Party Receipt Snapshot Banner */}
                    {hasReceipt ? (
                      <div className="p-2.5 rounded-xl bg-[#F7F9FA] border border-[#E6EAED] flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-[#E6F2F7] text-[#006699] flex items-center justify-center shrink-0">
                            <Receipt className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-[#172B36] truncate block">
                              {app.receiptApp || '3rd-Party'} Receipt: {app.receiptReference}
                            </span>
                            <span className="text-[11px] text-[#71808A] truncate block">
                              Payer: {app.receiptPayerName || app.fullName} • {app.receiptDate || app.applicationDate}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => setReceiptModalApp(app)}
                          className="px-3 py-1.5 bg-[#006699] hover:bg-[#004B70] text-white rounded-lg font-bold text-xs shrink-0 transition-colors shadow-2xs"
                        >
                          Inspect Receipt
                        </button>
                      </div>
                    ) : (
                      /* Simulate Upload option for candidates who haven't uploaded yet */
                      <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 flex items-center justify-between gap-2 text-xs">
                        <span className="text-amber-900 text-[11px]">
                          Candidate has not uploaded 3rd-party receipt yet.
                        </span>
                        <button
                          onClick={() => {
                            simulateUploadReceipt(app.id, {
                              receiptApp: 'Zelle',
                              receiptReference: `ZEL-${Math.floor(10000000 + Math.random() * 90000000)}`,
                              receiptPayerName: `${app.fullName} (Mobile App)`,
                              receiptThumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80'
                            });
                          }}
                          className="px-2.5 py-1 bg-white border border-amber-300 hover:bg-amber-100 text-amber-800 rounded-lg font-bold text-[11px] transition-colors shrink-0 flex items-center gap-1"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Simulate Upload (Zelle)</span>
                        </button>
                      </div>
                    )}

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between pt-1 border-t border-[#E6EAED]/60 text-xs">
                      <button
                        onClick={() => setSelectedApplicationId(app.id)}
                        className="text-[#006699] font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>View Application Q&A</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      {app.status === 'pending' && hasReceipt && !isVerified && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => verifyNewMemberReceipt(app.id, true)}
                            className="px-3 py-1.5 bg-[#21865B] hover:bg-[#1a6b49] text-white rounded-xl font-bold text-xs flex items-center gap-1 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Quick Induct</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        /* SECTION B: EXISTING MEMBERS DUES (DIRECT ADMIN APPROVAL - NO RECEIPT REQUIRED) */
        <div className="space-y-4">
          {/* Direct Approval Policy Banner */}
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Direct Clearance: Existing members are exempt from receipt uploads</span>
            </div>
            <p className="text-emerald-950/80 text-[11px] leading-relaxed">
              Existing alumni in the active roster pay dues through chapter treasury accounts, meeting collections, or direct bank transfer. Chapter administrators directly approve their dues without requiring any receipt upload.
            </p>
          </div>

          {/* Quick Actions & Search */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-[#71808A] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Find existing member by name or email..."
                  value={existingSearchQuery}
                  onChange={(e) => setExistingSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-white rounded-xl border border-[#E6EAED] text-xs focus:ring-1 focus:ring-[#006699]"
                />
              </div>

              {overdueDuesCount > 0 && (
                <button
                  onClick={() => {
                    const overdueIds = chapterMembers.filter(m => m.duesStatus === 'overdue').map(m => m.id);
                    bulkApproveExistingDues(overdueIds, 'Direct Chapter Bank Transfer');
                  }}
                  className="px-3 py-2 bg-[#21865B] hover:bg-[#1a6b49] text-white rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-transform active:scale-95 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Bulk Approve All ({overdueDuesCount})</span>
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <button
                onClick={() => setExistingDuesFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  existingDuesFilter === 'all'
                    ? 'bg-[#006699] text-white font-bold'
                    : 'bg-white text-[#71808A] border border-[#E6EAED] hover:bg-slate-50'
                }`}
              >
                All Members ({chapterMembers.length})
              </button>

              <button
                onClick={() => setExistingDuesFilter('overdue')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  existingDuesFilter === 'overdue'
                    ? 'bg-[#006699] text-white font-bold'
                    : 'bg-white text-[#D94B4B] border border-[#D94B4B]/30 hover:bg-red-50'
                }`}
              >
                Pending Dues ({overdueDuesCount})
              </button>

              <button
                onClick={() => setExistingDuesFilter('approved')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  existingDuesFilter === 'approved'
                    ? 'bg-[#006699] text-white font-bold'
                    : 'bg-white text-[#21865B] border border-[#21865B]/30 hover:bg-emerald-50'
                }`}
              >
                Cleared Dues ({clearedDuesCount})
              </button>
            </div>
          </div>

          {/* Existing Member Dues List */}
          <div className="space-y-3">
            {filteredExistingMembers.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-[#E6EAED] text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500/40 mx-auto" />
                <h3 className="text-sm font-bold text-[#172B36]">No member dues pending</h3>
                <p className="text-xs text-[#71808A] max-w-xs mx-auto">
                  All chapter alumni in this selection are up-to-date with annual dues.
                </p>
              </div>
            ) : (
              filteredExistingMembers.map((member) => {
                const isCleared = member.duesStatus === 'up_to_date';
                const duesAmount = member.duesAmount || 150;

                return (
                  <div
                    key={member.id}
                    className="bg-white rounded-2xl border border-[#E6EAED] p-4 shadow-xs space-y-3 hover:border-[#006699]/40 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        {member.avatarUrl ? (
                          <img
                            src={member.avatarUrl}
                            alt={member.fullName}
                            className="w-11 h-11 rounded-full object-cover border border-[#E6EAED] shrink-0"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-[#E6F2F7] text-[#006699] font-bold flex items-center justify-center text-sm shrink-0">
                            {member.initials}
                          </div>
                        )}

                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-[#172B36] truncate">
                            {member.fullName}
                          </h4>
                          <p className="text-xs text-[#71808A] truncate">
                            {member.membershipType} • {member.subChapterName || activeChapter.name}
                          </p>
                          <p className="text-[11px] text-[#71808A] mt-0.5">
                            Class of {member.graduationYear} • Member ID: {member.id}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold font-mono text-[#172B36] block">
                          ${duesAmount}
                        </span>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mt-1 ${
                          isCleared
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-[#D99A2B] border border-amber-200'
                        }`}>
                          {isCleared ? 'Dues Cleared' : 'Pending Approval'}
                        </span>
                      </div>
                    </div>

                    {/* Dues Status & Direct Clearance Channel */}
                    <div className="p-2.5 rounded-xl bg-[#F7F9FA] border border-[#E6EAED] text-xs flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="font-semibold text-[#172B36] block truncate">
                          Cycle: {member.duesCycle || '2026/2027 Annual Dues'}
                        </span>
                        <span className="text-[11px] text-[#71808A] block truncate">
                          {isCleared
                            ? `Approved by Admin: ${member.duesPaymentMethod || 'Treasury Bank Credit'}`
                            : 'Exempt from receipt • Ready for chapter admin approval'}
                        </span>
                      </div>

                      {!isCleared ? (
                        <button
                          onClick={() => setSelectedMemberForDues(member)}
                          className="px-3.5 py-1.5 bg-[#21865B] hover:bg-[#1a6b49] text-white rounded-xl font-bold text-xs shrink-0 shadow-2xs flex items-center gap-1.5 transition-transform active:scale-95"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve Dues</span>
                        </button>
                      ) : (
                        <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Cleared</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Verify 3rd-Party Receipt Modal */}
      {receiptModalApp && (
        <VerifyReceiptModal
          application={receiptModalApp}
          isOpen={Boolean(receiptModalApp)}
          onClose={() => setReceiptModalApp(null)}
          onVerify={(verified, note) => {
            verifyNewMemberReceipt(receiptModalApp.id, verified, note);
            setReceiptModalApp(null);
          }}
        />
      )}

      {/* Approve Existing Member Dues Modal */}
      {selectedMemberForDues && (
        <ApproveExistingDuesModal
          member={selectedMemberForDues}
          isOpen={Boolean(selectedMemberForDues)}
          onClose={() => setSelectedMemberForDues(null)}
        />
      )}

      {/* Application Details Sheet (Full Profile & Q&A) */}
      {activeApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-[#E6EAED] flex items-center justify-between bg-[#F7F9FA]">
              <div className="flex items-center gap-3">
                {activeApp.avatarUrl ? (
                  <img src={activeApp.avatarUrl} alt={activeApp.fullName} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#E6F2F7] text-[#006699] font-bold flex items-center justify-center">
                    {activeApp.initials}
                  </div>
                )}
                <div>
                  <h3 className="text-base font-bold text-[#172B36]">{activeApp.fullName}</h3>
                  <p className="text-xs text-[#71808A]">{activeApp.membershipType} • {activeApp.chapterName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApplicationId(null)}
                className="w-8 h-8 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#71808A]"
              >
                ✕
              </button>
            </div>

            {/* Scrollable details */}
            <div className="p-4 overflow-y-auto space-y-4 text-xs flex-1">
              {/* Receipt Quick Check */}
              <div className="p-3 bg-[#E6F2F7]/50 rounded-xl border border-[#006699]/20 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#004B70] block">
                    {activeApp.receiptReference ? `3rd-Party Receipt: ${activeApp.receiptApp || 'Attached'}` : 'Receipt Upload Status'}
                  </span>
                  <span className="text-[#71808A] text-[11px]">
                    {activeApp.receiptReference ? `Reference: #${activeApp.receiptReference}` : 'Awaiting 3rd-party receipt upload'}
                  </span>
                </div>
                {activeApp.receiptReference && (
                  <button
                    onClick={() => setReceiptModalApp(activeApp)}
                    className="px-3 py-1.5 bg-[#006699] text-white rounded-lg font-bold text-xs"
                  >
                    Inspect
                  </button>
                )}
              </div>

              {/* Bio & Education */}
              <div className="bg-[#F7F9FA] p-3 rounded-xl border border-[#E6EAED] space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[#71808A] text-[10px] uppercase font-bold block">Degree</span>
                    <span className="text-[#172B36] font-semibold">{activeApp.degree}</span>
                  </div>
                  <div>
                    <span className="text-[#71808A] text-[10px] uppercase font-bold block">Graduation</span>
                    <span className="text-[#172B36] font-semibold">Class of {activeApp.graduationYear}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E6EAED]/60">
                  <div>
                    <span className="text-[#71808A] text-[10px] uppercase font-bold block">Email</span>
                    <span className="text-[#172B36] truncate block">{activeApp.email}</span>
                  </div>
                  <div>
                    <span className="text-[#71808A] text-[10px] uppercase font-bold block">Phone</span>
                    <span className="text-[#172B36]">{activeApp.phone}</span>
                  </div>
                </div>
              </div>

              {/* Application Questionnaire */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#172B36] uppercase tracking-wider text-[10px]">
                  Application Questionnaire Responses
                </h4>
                {activeApp.responses.map((resp, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-[#F7F9FA] border border-[#E6EAED] space-y-1">
                    <p className="font-semibold text-[#172B36]">{resp.question}</p>
                    <p className="text-[#71808A] leading-relaxed">{resp.answer}</p>
                  </div>
                ))}
              </div>

              {/* Admin Notes */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#172B36] uppercase tracking-wider text-[10px]">
                  Admin Review Audit Trail
                </h4>
                <div className="space-y-1.5">
                  {activeApp.adminNotes.map(note => (
                    <div key={note.id} className="p-2 bg-slate-50 rounded-lg border border-[#E6EAED] text-[11px]">
                      <div className="flex justify-between font-bold text-[#172B36]">
                        <span>{note.author}</span>
                        <span className="text-[10px] text-[#71808A] font-normal">{note.timestamp}</span>
                      </div>
                      <p className="text-[#71808A] mt-0.5">{note.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddNote} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add internal verification note..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  />
                  <button type="submit" className="px-3 py-1.5 bg-[#006699] text-white rounded-xl font-bold text-xs">
                    Post
                  </button>
                </form>
              </div>
            </div>

            {/* Actions */}
            <div className="p-3 border-t border-[#E6EAED] bg-[#F7F9FA] flex items-center justify-between gap-2">
              <button
                onClick={() => setShowRejectModal(true)}
                className="py-2.5 px-3 rounded-xl border border-red-200 text-red-600 font-bold text-xs hover:bg-red-50"
              >
                Reject
              </button>

              <button
                onClick={() => setReceiptModalApp(activeApp)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#21865B] hover:bg-[#1a6b49] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify Receipt & Induct</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Confirmation Modal */}
      {showRejectModal && activeApp && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#D94B4B]/10 text-[#D94B4B] flex items-center justify-center mx-auto">
              <XCircle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="text-base font-bold text-[#172B36]">Confirm Rejection</h4>
              <p className="text-xs text-[#71808A]">
                Please select reason for declining application of {activeApp.fullName}:
              </p>
            </div>

            <select
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs font-medium"
            >
              <option value="Qualifications not verified with registrar">Qualifications not verified with registrar</option>
              <option value="Payment receipt invalid or mismatched">Payment receipt invalid or mismatched</option>
              <option value="Duplicate membership record detected">Duplicate membership record detected</option>
              <option value="Ineligible for requested membership tier">Ineligible for requested membership tier</option>
            </select>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-2 rounded-xl border border-[#E6EAED] text-xs font-semibold text-[#71808A]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="flex-1 py-2 rounded-xl bg-[#D94B4B] text-white text-xs font-semibold"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
