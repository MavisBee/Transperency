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
  ChevronRight,
  Send,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MemberApplication, ApplicationStatus } from '../../types';

export const ApprovalsTab: React.FC = () => {
  const {
    applications,
    approveApplication,
    rejectApplication,
    requestApplicationInfo,
    addApplicationNote,
    selectedApplicationId,
    setSelectedApplicationId
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'awaiting_payment' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newNoteText, setNewNoteText] = useState('');
  const [showPaymentWarningModal, setShowPaymentWarningModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('Qualifications not verified with registrar');
  const [requestInfoMessage, setRequestInfoMessage] = useState('Please attach your verified degree certificate or transcript.');

  // Selected application
  const activeApp = applications.find(a => a.id === selectedApplicationId);

  // Overview Counts
  const pendingCount = applications.filter(a => a.status === 'pending').length;
  const awaitingPaymentCount = applications.filter(a => a.status === 'awaiting_payment').length;
  const readyForReviewCount = applications.filter(a => a.status === 'pending' && a.paymentStatus === 'paid').length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;

  // Filtered applications
  const filteredApps = applications.filter(app => {
    // Status filter
    if (activeFilter === 'pending' && app.status !== 'pending') return false;
    if (activeFilter === 'awaiting_payment' && app.status !== 'awaiting_payment') return false;
    if (activeFilter === 'approved' && app.status !== 'approved') return false;
    if (activeFilter === 'rejected' && app.status !== 'rejected') return false;

    // Search query
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
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#172B36]">
          Membership Approvals
        </h1>
        <p className="text-xs text-[#71808A] font-medium">
          Review, authenticate credentials, and approve prospective members
        </p>
      </div>

      {/* 6.1 Approvals Overview Metric Strip */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-white p-2.5 rounded-xl border border-[#E6EAED] shadow-xs text-center">
          <span className="text-lg font-bold text-[#172B36] font-mono tabular-nums block">
            {pendingCount + awaitingPaymentCount}
          </span>
          <span className="text-[10px] text-[#71808A] font-medium block">Total Pending</span>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-[#E6EAED] shadow-xs text-center">
          <span className="text-lg font-bold text-[#D99A2B] font-mono tabular-nums block">
            {awaitingPaymentCount}
          </span>
          <span className="text-[10px] text-[#71808A] font-medium block">Awaiting Pay</span>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-[#E6EAED] shadow-xs text-center">
          <span className="text-lg font-bold text-[#006699] font-mono tabular-nums block">
            {readyForReviewCount}
          </span>
          <span className="text-[10px] text-[#71808A] font-medium block">Ready Review</span>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-[#E6EAED] shadow-xs text-center">
          <span className="text-lg font-bold text-[#21865B] font-mono tabular-nums block">
            {approvedCount}
          </span>
          <span className="text-[10px] text-[#71808A] font-medium block">Approved</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#71808A] absolute left-3 top-3 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name, ID (e.g. #APP-2025)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E6EAED] text-xs text-[#172B36] placeholder-[#71808A] focus:outline-none focus:ring-1 focus:ring-[#006699] shadow-xs"
        />
      </div>

      {/* Filter Chips / Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
            activeFilter === 'all'
              ? 'bg-[#006699] text-white shadow-xs'
              : 'bg-white text-[#71808A] border border-[#E6EAED] hover:bg-slate-50'
          }`}
        >
          All Applications ({applications.length})
        </button>

        <button
          onClick={() => setActiveFilter('pending')}
          className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
            activeFilter === 'pending'
              ? 'bg-[#006699] text-white shadow-xs'
              : 'bg-white text-[#71808A] border border-[#E6EAED] hover:bg-slate-50'
          }`}
        >
          Pending Review ({pendingCount})
        </button>

        <button
          onClick={() => setActiveFilter('awaiting_payment')}
          className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
            activeFilter === 'awaiting_payment'
              ? 'bg-[#006699] text-white shadow-xs'
              : 'bg-white text-[#71808A] border border-[#E6EAED] hover:bg-slate-50'
          }`}
        >
          Awaiting Payment ({awaitingPaymentCount})
        </button>

        <button
          onClick={() => setActiveFilter('approved')}
          className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
            activeFilter === 'approved'
              ? 'bg-[#006699] text-white shadow-xs'
              : 'bg-white text-[#71808A] border border-[#E6EAED] hover:bg-slate-50'
          }`}
        >
          Approved ({approvedCount})
        </button>

        <button
          onClick={() => setActiveFilter('rejected')}
          className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
            activeFilter === 'rejected'
              ? 'bg-[#006699] text-white shadow-xs'
              : 'bg-white text-[#71808A] border border-[#E6EAED] hover:bg-slate-50'
          }`}
        >
          Rejected
        </button>
      </div>

      {/* 6.2 Application Cards List */}
      <div className="space-y-2.5">
        {filteredApps.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-[#E6EAED] text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-[#71808A]/40 mx-auto" />
            <h3 className="text-sm font-bold text-[#172B36]">No applications found</h3>
            <p className="text-xs text-[#71808A] max-w-xs mx-auto">
              There are currently no member registration requests matching this filter.
            </p>
          </div>
        ) : (
          filteredApps.map((app) => (
            <div
              key={app.id}
              onClick={() => setSelectedApplicationId(app.id)}
              className="bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs hover:border-[#006699]/50 transition-all cursor-pointer active:scale-99 group"
            >
              <div className="flex items-start justify-between gap-3">
                {/* Avatar and name info */}
                <div className="flex items-start gap-3">
                  {app.avatarUrl ? (
                    <img
                      src={app.avatarUrl}
                      alt={app.fullName}
                      className="w-11 h-11 rounded-full object-cover border border-[#E6EAED]"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#E6F2F7] text-[#006699] font-bold text-sm flex items-center justify-center border border-[#E6EAED]">
                      {app.initials}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-[#172B36] group-hover:text-[#006699] transition-colors">
                        {app.fullName}
                      </h3>
                      <span className="text-[10px] text-[#71808A] font-mono">
                        #{app.id}
                      </span>
                    </div>

                    <p className="text-xs text-[#006699] font-medium">
                      {app.membershipType}
                    </p>

                    <p className="text-[11px] text-[#71808A] mt-0.5">
                      {app.subChapterName || app.chapterName} • {app.section}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-[#71808A] group-hover:text-[#006699] group-hover:translate-x-0.5 transition-all mt-1" />
              </div>

              {/* Status and Payment Row */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E6EAED]/60 text-xs">
                {/* Payment Status Indicator */}
                <div className="flex items-center gap-1.5">
                  {app.paymentStatus === 'paid' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#21865B]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Paid (${app.amountPaid})
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D94B4B]">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Outstanding (${app.outstandingBalance})
                    </span>
                  )}
                </div>

                {/* Application Lifecycle Badge */}
                <div>
                  {app.status === 'approved' && (
                    <span className="px-2 py-0.5 rounded-full bg-[#21865B]/10 text-[#21865B] text-[10px] font-bold">
                      Approved
                    </span>
                  )}
                  {app.status === 'rejected' && (
                    <span className="px-2 py-0.5 rounded-full bg-[#D94B4B]/10 text-[#D94B4B] text-[10px] font-bold">
                      Rejected
                    </span>
                  )}
                  {app.status === 'awaiting_payment' && (
                    <span className="px-2 py-0.5 rounded-full bg-[#D99A2B]/10 text-[#D99A2B] text-[10px] font-bold">
                      Awaiting Payment
                    </span>
                  )}
                  {app.status === 'pending' && (
                    <span className="px-2 py-0.5 rounded-full bg-[#006699]/10 text-[#006699] text-[10px] font-bold">
                      Ready for Review
                    </span>
                  )}
                  {app.status === 'info_requested' && (
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold">
                      Info Requested
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 6.3 Dedicated Application Details Modal/Sheet */}
      {activeApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#E6EAED] flex items-center justify-between bg-[#F7F9FA]">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#006699]" />
                <div>
                  <h3 className="text-sm font-bold text-[#172B36]">
                    Application Details
                  </h3>
                  <p className="text-[11px] text-[#71808A] font-mono">
                    {activeApp.id} • Submitted {activeApp.applicationDate}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedApplicationId(null)}
                className="w-8 h-8 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#71808A] hover:text-[#172B36]"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 overflow-y-auto space-y-4 text-xs">
              {/* Applicant Profile Card */}
              <div className="flex items-start gap-3 p-3 bg-[#F7F9FA] rounded-xl border border-[#E6EAED]">
                <div className="w-14 h-14 rounded-full bg-[#E6F2F7] text-[#006699] font-bold text-base flex items-center justify-center shrink-0 border border-[#E6EAED]">
                  {activeApp.initials}
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#172B36]">{activeApp.fullName}</h4>
                  <p className="text-[#006699] font-semibold">{activeApp.membershipType}</p>
                  <p className="text-[#71808A]">{activeApp.email}</p>
                  <p className="text-[#71808A]">{activeApp.phone} • {activeApp.location}, {activeApp.country}</p>
                </div>
              </div>

              {/* Education & Credentials */}
              <div className="space-y-1.5">
                <h5 className="font-bold text-[#172B36] uppercase tracking-wider text-[10px]">
                  Academic Credentials
                </h5>
                <div className="p-3 bg-white rounded-xl border border-[#E6EAED] space-y-1">
                  <p className="text-[#172B36] font-semibold">{activeApp.degree}</p>
                  <p className="text-[#71808A]">Class of {activeApp.graduationYear}</p>
                </div>
              </div>

              {/* Registration Answers */}
              <div className="space-y-1.5">
                <h5 className="font-bold text-[#172B36] uppercase tracking-wider text-[10px]">
                  Registration Questionnaire
                </h5>
                <div className="p-3 bg-white rounded-xl border border-[#E6EAED] space-y-2.5">
                  {activeApp.responses.map((resp, i) => (
                    <div key={i} className="space-y-0.5">
                      <p className="font-semibold text-[#172B36]">{resp.question}</p>
                      <p className="text-[#71808A] leading-relaxed">{resp.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Verification Card */}
              <div className="space-y-1.5">
                <h5 className="font-bold text-[#172B36] uppercase tracking-wider text-[10px]">
                  Payment & Verification
                </h5>
                <div className="p-3 bg-white rounded-xl border border-[#E6EAED] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#71808A]">Membership Tier Dues</span>
                    <span className="font-bold text-[#172B36]">${activeApp.membershipFee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#71808A]">Amount Paid</span>
                    <span className="font-bold text-[#21865B]">${activeApp.amountPaid}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#E6EAED]">
                    <span className="text-[#71808A]">Outstanding Balance</span>
                    <span className={`font-bold ${activeApp.outstandingBalance > 0 ? 'text-[#D94B4B]' : 'text-[#21865B]'}`}>
                      ${activeApp.outstandingBalance}
                    </span>
                  </div>
                  {activeApp.paymentReference && (
                    <div className="flex items-center justify-between text-[11px] text-[#71808A] pt-1">
                      <span>Gateway Reference:</span>
                      <span className="font-mono">{activeApp.paymentReference}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Administrative Notes Section */}
              <div className="space-y-1.5">
                <h5 className="font-bold text-[#172B36] uppercase tracking-wider text-[10px]">
                  Internal Admin Notes
                </h5>
                <div className="p-3 bg-white rounded-xl border border-[#E6EAED] space-y-2">
                  {activeApp.adminNotes.length === 0 ? (
                    <p className="text-[#71808A] italic">No admin notes yet.</p>
                  ) : (
                    activeApp.adminNotes.map(n => (
                      <div key={n.id} className="p-2 bg-[#F7F9FA] rounded-lg border border-[#E6EAED]/60 space-y-0.5">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-[#006699]">{n.author}</span>
                          <span className="text-[#71808A]">{n.timestamp}</span>
                        </div>
                        <p className="text-[#172B36]">{n.text}</p>
                      </div>
                    ))
                  )}

                  {/* Add note input form */}
                  <form onSubmit={handleAddNote} className="flex gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add an internal note..."
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-[#F7F9FA] border border-[#E6EAED] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#006699]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#006699] text-white rounded-lg text-xs font-semibold hover:bg-[#004B70] transition-colors"
                    >
                      Add
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-3 border-t border-[#E6EAED] bg-[#F7F9FA] flex items-center justify-between gap-2">
              <button
                onClick={() => setShowRejectModal(true)}
                className="py-2.5 px-3 rounded-xl border border-[#D94B4B] text-[#D94B4B] hover:bg-[#D94B4B]/10 font-semibold text-xs transition-colors"
              >
                Reject
              </button>

              <button
                onClick={() => setShowRequestInfoModal(true)}
                className="py-2.5 px-3 rounded-xl border border-[#E6EAED] bg-white text-[#172B36] hover:bg-slate-50 font-semibold text-xs transition-colors"
              >
                Request Info
              </button>

              <button
                onClick={handleApproveClick}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#006699] hover:bg-[#004B70] text-white font-semibold text-xs shadow-xs transition-all active:scale-98 flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Approve Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flow B Warning Modal: Outstanding Dues Warning Dialog */}
      {showPaymentWarningModal && activeApp && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#D99A2B]/10 text-[#D99A2B] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="text-base font-bold text-[#172B36]">
                Outstanding Balance Warning
              </h4>
              <p className="text-xs text-[#71808A]">
                Membership fee of <span className="font-bold text-[#D94B4B]">${activeApp.outstandingBalance}</span> for {activeApp.fullName} is still outstanding and unconfirmed by the payment gateway.
              </p>
              <p className="text-[11px] text-[#71808A] pt-1">
                Per Section 18: Approving does not automatically verify payment. Are you sure you want to approve this membership?
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowPaymentWarningModal(false)}
                className="flex-1 py-2 rounded-xl border border-[#E6EAED] text-xs font-semibold text-[#71808A] hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmApproveWithOutstandingPayment}
                className="flex-1 py-2 rounded-xl bg-[#006699] text-white text-xs font-semibold hover:bg-[#004B70]"
              >
                Approve Anyway
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
              <h4 className="text-base font-bold text-[#172B36]">
                Confirm Rejection
              </h4>
              <p className="text-xs text-[#71808A]">
                Please provide an official reason for declining the application of {activeApp.fullName}:
              </p>
            </div>

            <select
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs font-medium focus:ring-1 focus:ring-[#D94B4B]"
            >
              <option value="Qualifications not verified with registrar">Qualifications not verified with registrar</option>
              <option value="Duplicate membership record detected">Duplicate membership record detected</option>
              <option value="Ineligible for requested membership tier">Ineligible for requested membership tier</option>
              <option value="Background check flagged inconsistencies">Background check flagged inconsistencies</option>
              <option value="Application withdrawn by candidate">Application withdrawn by candidate</option>
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
                className="flex-1 py-2 rounded-xl bg-[#D94B4B] text-white text-xs font-semibold hover:bg-red-700"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Info Modal */}
      {showRequestInfoModal && activeApp && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="text-center space-y-1">
              <h4 className="text-base font-bold text-[#172B36]">
                Request Information
              </h4>
              <p className="text-xs text-[#71808A]">
                Send an automated verification notice to {activeApp.email}:
              </p>
            </div>

            <textarea
              rows={3}
              value={requestInfoMessage}
              onChange={(e) => setRequestInfoMessage(e.target.value)}
              className="w-full p-2.5 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs focus:ring-1 focus:ring-[#006699]"
            />

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setShowRequestInfoModal(false)}
                className="flex-1 py-2 rounded-xl border border-[#E6EAED] text-xs font-semibold text-[#71808A]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRequestInfo}
                className="flex-1 py-2 rounded-xl bg-[#006699] text-white text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
