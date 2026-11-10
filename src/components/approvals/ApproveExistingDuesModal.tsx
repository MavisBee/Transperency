import React, { useState } from 'react';
import {
  CheckCircle2,
  DollarSign,
  Building2,
  User,
  Calendar,
  CreditCard,
  ShieldCheck,
  X,
  FileCheck
} from 'lucide-react';
import { RegisteredMember } from '../../types';
import { useApp } from '../../context/AppContext';

interface ApproveExistingDuesModalProps {
  member: RegisteredMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ApproveExistingDuesModal: React.FC<ApproveExistingDuesModalProps> = ({
  member,
  isOpen,
  onClose
}) => {
  const { activeChapter, approveExistingMemberDues } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('Direct Bank Deposit (Treasury Cleared)');
  const [reference, setReference] = useState(`TREAS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
  const [adminNote, setAdminNote] = useState('Dues reconciled against chapter treasury bank statement.');

  if (!isOpen || !member) return null;

  const duesAmount = member.duesAmount || 150;

  const handleApprove = () => {
    approveExistingMemberDues(member.id, paymentMethod, reference, adminNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#E6EAED] flex items-center justify-between bg-[#F7F9FA]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#172B36]">
                Direct Dues Approval
              </h3>
              <p className="text-xs text-[#71808A]">
                Exempt from Receipt Upload • Chapter Treasury Clearance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#71808A] hover:bg-slate-50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs flex-1">
          {/* Member Card Summary */}
          <div className="p-3 bg-[#F7F9FA] rounded-2xl border border-[#E6EAED] flex items-center justify-between">
            <div className="flex items-center gap-3">
              {member.avatarUrl ? (
                <img
                  src={member.avatarUrl}
                  alt={member.fullName}
                  className="w-10 h-10 rounded-full object-cover border border-[#E6EAED]"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#E6F2F7] text-[#006699] font-bold flex items-center justify-center text-sm">
                  {member.initials}
                </div>
              )}
              <div>
                <h4 className="font-bold text-sm text-[#172B36]">{member.fullName}</h4>
                <p className="text-[#71808A] text-xs">
                  {member.subChapterName || activeChapter.name} • Class of {member.graduationYear}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-amber-50 text-[#D99A2B] text-[10px] font-bold border border-amber-200">
                  {member.duesCycle || '2026/2027 Annual Dues'}: ${duesAmount} Pending
                </span>
              </div>
            </div>
          </div>

          {/* Direct Clearance Policy Notice */}
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1.5">
            <h5 className="font-bold text-emerald-800 text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Direct Admin Clearance Policy</span>
            </h5>
            <p className="text-[11px] text-emerald-900/80 leading-relaxed">
              As an established alumnus in the chapter registry, <strong>{member.fullName}</strong> is not required to upload a receipt. Upon confirming chapter bank ledger credits or cash collections, administrators can directly approve and clear dues.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="font-bold text-[#172B36]">Payment Channel / Verification Source</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
              >
                <option value="Direct Bank Deposit (Treasury Cleared)">Direct Bank Deposit (Treasury Cleared)</option>
                <option value="Cash at Chapter Annual General Assembly">Cash at Chapter Annual General Assembly</option>
                <option value="Standing Bank Order / Wire">Standing Bank Order / Wire</option>
                <option value="Executive Board Waived / Honorarium">Executive Board Waived / Honorarium</option>
                <option value="Chapter Mobile Treasury Clearing">Chapter Mobile Treasury Clearing</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Treasury Reference #</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs font-mono text-[#006699]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Cleared Dues Amount</label>
                <input
                  type="text"
                  readOnly
                  value={`$${duesAmount}.00`}
                  className="w-full px-3 py-2 bg-slate-100 border border-[#E6EAED] rounded-xl text-xs font-bold text-[#172B36]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#172B36]">Administrative Audit Note</label>
              <textarea
                rows={2}
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Audit remarks for chapter records..."
                className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#E6EAED] bg-[#F7F9FA] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-[#E6EAED] bg-white text-[#172B36] font-semibold text-xs hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleApprove}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#21865B] hover:bg-[#1a6b49] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 active:scale-98"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Approve & Clear Dues (No Receipt Required)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
