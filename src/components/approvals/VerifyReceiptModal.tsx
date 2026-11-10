import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Receipt,
  Download,
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  CreditCard,
  User,
  X,
  ZoomIn
} from 'lucide-react';
import { MemberApplication } from '../../types';

interface VerifyReceiptModalProps {
  application: MemberApplication;
  isOpen: boolean;
  onClose: () => void;
  onVerify: (verified: boolean, note?: string) => void;
}

export const VerifyReceiptModal: React.FC<VerifyReceiptModalProps> = ({
  application,
  isOpen,
  onClose,
  onVerify
}) => {
  const [clarificationNote, setClarificationNote] = useState('');
  const [showClarificationInput, setShowClarificationInput] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen) return null;

  const appName = application.receiptApp || '3rd-Party Bank';
  const refCode = application.receiptReference || application.paymentReference || 'REF-PENDING';
  const feeAmount = application.membershipFee;
  const payer = application.receiptPayerName || application.fullName;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#E6EAED] flex items-center justify-between bg-[#F7F9FA]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E6F2F7] text-[#006699] flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#172B36]">
                Verify 3rd-Party Payment Receipt
              </h3>
              <p className="text-xs text-[#71808A]">
                Prospective Member: <strong className="text-[#172B36]">{application.fullName}</strong>
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

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs flex-1">
          {/* Simulated 3rd Party Receipt Graphic */}
          <div className="rounded-2xl border-2 border-dashed border-[#006699]/30 bg-[#F7F9FA] p-4 text-center space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#E6EAED] pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#006699] text-white font-bold text-xs uppercase tracking-wider">
                  {appName}
                </span>
                <span className="text-xs font-semibold text-[#172B36]">Payment Confirmation</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                SUCCESSFUL TRANSFER
              </span>
            </div>

            {/* Receipt Amount Display */}
            <div className="py-2">
              <span className="text-3xl font-bold font-mono text-[#172B36] tracking-tight">
                ${feeAmount.toFixed(2)}
              </span>
              <p className="text-[11px] text-[#71808A] mt-0.5">
                Induction Fee for {application.membershipType}
              </p>
            </div>

            {/* Receipt Details Table */}
            <div className="bg-white rounded-xl p-3 border border-[#E6EAED] space-y-2 text-left">
              <div className="flex justify-between items-center py-1 border-b border-[#E6EAED]/60 text-[11px]">
                <span className="text-[#71808A]">Transfer App / Channel:</span>
                <span className="font-bold text-[#172B36]">{appName} Mobile Transfer</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-[#E6EAED]/60 text-[11px]">
                <span className="text-[#71808A]">Transaction Ref Code:</span>
                <span className="font-bold font-mono text-[#006699]">{refCode}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-[#E6EAED]/60 text-[11px]">
                <span className="text-[#71808A]">Payer Account Name:</span>
                <span className="font-bold text-[#172B36]">{payer}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-[#E6EAED]/60 text-[11px]">
                <span className="text-[#71808A]">Beneficiary:</span>
                <span className="font-semibold text-[#172B36]">Transparency Hub Alumni Network</span>
              </div>

              <div className="flex justify-between items-center py-1 text-[11px]">
                <span className="text-[#71808A]">Transfer Date & Time:</span>
                <span className="font-medium text-[#172B36]">{application.receiptDate || application.applicationDate}</span>
              </div>
            </div>

            {/* Receipt image snapshot preview */}
            {application.receiptThumbnail && (
              <div className="space-y-1 pt-1">
                <span className="text-[10px] text-[#71808A] font-semibold block text-left">
                  Attached 3rd-Party Receipt Snapshot:
                </span>
                <div
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="relative rounded-xl overflow-hidden border border-[#E6EAED] h-28 bg-slate-900 cursor-pointer group"
                >
                  <img
                    src={application.receiptThumbnail}
                    alt="Receipt Screenshot"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-2.5 py-1 bg-black/70 text-white rounded-lg text-xs font-semibold flex items-center gap-1">
                      <ZoomIn className="w-3.5 h-3.5" />
                      {isZoomed ? 'Zoom Out' : 'Inspect Full Screenshot'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Verification Audit Checklist */}
          <div className="p-3 bg-[#E6F2F7]/50 rounded-xl border border-[#006699]/20 space-y-2">
            <h4 className="font-bold text-[#004B70] text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#006699]" />
              <span>Administrative Verification Checklist</span>
            </h4>
            <div className="space-y-1 text-[11px] text-[#172B36]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Payer name matches application records ({application.fullName})</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Transferred amount (${feeAmount}) covers full induction dues</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>3rd-party reference code recorded in chapter treasury ledger</span>
              </div>
            </div>
          </div>

          {/* Clarification Notes Input if active */}
          {showClarificationInput && (
            <div className="space-y-1.5 p-3 bg-amber-50 rounded-xl border border-amber-200 animate-in fade-in">
              <label className="font-bold text-[#172B36] block">
                Clarification Instructions for Candidate:
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Please upload the full PDF confirmation slip showing the transaction timestamp."
                value={clarificationNote}
                onChange={(e) => setClarificationNote(e.target.value)}
                className="w-full p-2 bg-white border border-amber-300 rounded-lg text-xs"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowClarificationInput(false)}
                  className="px-3 py-1 bg-white border border-[#E6EAED] rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onVerify(false, clarificationNote || 'Please upload a legible 3rd-party transfer receipt.');
                    onClose();
                  }}
                  className="px-3 py-1 bg-amber-600 text-white rounded-lg font-bold text-xs"
                >
                  Send Clarification Request
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-[#E6EAED] bg-[#F7F9FA] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setShowClarificationInput(!showClarificationInput)}
            className="py-2.5 px-3 rounded-xl border border-[#E6EAED] bg-white text-[#D99A2B] font-bold text-xs hover:bg-slate-50 transition-colors"
          >
            Request Re-upload
          </button>

          <button
            type="button"
            onClick={() => {
              onVerify(true);
              onClose();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#21865B] hover:bg-[#1a6b49] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 active:scale-98"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Verify Receipt & Induct Member</span>
          </button>
        </div>
      </div>
    </div>
  );
};
