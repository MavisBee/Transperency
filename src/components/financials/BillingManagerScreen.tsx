import React, { useState } from 'react';
import {
  ArrowLeft,
  CreditCard,
  FileText,
  Plus,
  Send,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InvoiceRecord } from '../../types';

export const BillingManagerScreen: React.FC = () => {
  const {
    invoices,
    currentMetrics,
    activeChapter,
    setActiveSubScreen,
    addAuditLog
  } = useApp();

  const [filter, setFilter] = useState<'All' | 'paid' | 'outstanding' | 'overdue'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sentInvoiceId, setSentInvoiceId] = useState<string | null>(null);
  const [isNewInvoiceModalOpen, setIsNewInvoiceModalOpen] = useState(false);
  const [newInvoiceForm, setNewInvoiceForm] = useState({
    memberName: '',
    memberEmail: '',
    description: '',
    amount: 150,
    dueDate: 'Nov 30, 2026'
  });

  const filteredInvoices = invoices.filter(inv => {
    if (filter !== 'All' && inv.status !== filter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = inv.memberName.toLowerCase().includes(q);
      const matchNum = inv.invoiceNumber.toLowerCase().includes(q);
      const matchDesc = inv.description.toLowerCase().includes(q);
      if (!matchName && !matchNum && !matchDesc) return false;
    }
    return true;
  });

  const handleSendReminder = (inv: InvoiceRecord) => {
    setSentInvoiceId(inv.id);
    addAuditLog('Invoice Reminder Sent', `Sent payment reminder for invoice ${inv.invoiceNumber} to ${inv.memberName}`, inv.id, 'Billing');
    setTimeout(() => setSentInvoiceId(null), 3000);
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
              Billing & Invoices
            </h1>
            <p className="text-xs text-[#71808A]">
              Chapter receivables and billing accounts ({activeChapter.currency})
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsNewInvoiceModalOpen(true)}
          className="px-3 py-1.5 bg-[#006699] text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Invoice</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="bg-white p-3 rounded-xl border border-[#E6EAED] shadow-xs text-center">
          <span className="text-lg font-bold text-[#172B36] font-mono block">
            {currentMetrics.totalBillingFormatted}
          </span>
          <span className="text-[10px] text-[#71808A]">Total Billed</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#E6EAED] shadow-xs text-center">
          <span className="text-lg font-bold text-[#21865B] font-mono block">
            {currentMetrics.duesCollectedFormatted}
          </span>
          <span className="text-[10px] text-[#71808A]">Paid</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#E6EAED] shadow-xs text-center">
          <span className="text-lg font-bold text-[#D94B4B] font-mono block">
            {currentMetrics.outstandingBalanceFormatted.split(' ')[0]}
          </span>
          <span className="text-[10px] text-[#D94B4B] font-semibold">Outstanding</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#71808A] absolute left-3 top-3 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by invoice #, member name, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E6EAED] text-xs text-[#172B36] placeholder-[#71808A] focus:outline-none focus:ring-1 focus:ring-[#006699] shadow-xs"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {(['All', 'outstanding', 'overdue', 'paid'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-full font-medium capitalize transition-colors ${
              filter === tab
                ? 'bg-[#006699] text-white shadow-xs'
                : 'bg-white text-[#71808A] border border-[#E6EAED]'
            }`}
          >
            {tab === 'All' ? 'All Invoices' : tab}
          </button>
        ))}
      </div>

      {/* Invoices List */}
      <div className="space-y-3">
        {filteredInvoices.map((inv) => (
          <div
            key={inv.id}
            className="bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#172B36]">{inv.memberName}</h3>
                  <span className="text-[10px] text-[#71808A] font-mono bg-slate-100 px-1.5 py-0.2 rounded-xs">
                    {inv.invoiceNumber}
                  </span>
                </div>
                <p className="text-xs text-[#006699] font-medium mt-0.5">{inv.description}</p>
                <p className="text-[11px] text-[#71808A] mt-0.5">Due: {inv.dueDate}</p>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold text-[#172B36] font-mono">
                  ${inv.amount}
                </span>
                <div className="mt-1">
                  {inv.status === 'paid' && (
                    <span className="px-2 py-0.5 rounded-full bg-[#21865B]/10 text-[#21865B] text-[10px] font-bold">
                      Paid
                    </span>
                  )}
                  {inv.status === 'outstanding' && (
                    <span className="px-2 py-0.5 rounded-full bg-[#D99A2B]/10 text-[#D99A2B] text-[10px] font-bold">
                      Outstanding
                    </span>
                  )}
                  {inv.status === 'overdue' && (
                    <span className="px-2 py-0.5 rounded-full bg-[#D94B4B]/10 text-[#D94B4B] text-[10px] font-bold">
                      Overdue
                    </span>
                  )}
                </div>
              </div>
            </div>

            {inv.status !== 'paid' && (
              <div className="pt-2 border-t border-[#E6EAED] flex items-center justify-between text-xs">
                <span className="text-[#D94B4B] font-semibold">
                  Balance: ${inv.outstandingBalance}
                </span>
                <button
                  onClick={() => handleSendReminder(inv)}
                  className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all ${
                    sentInvoiceId === inv.id
                      ? 'bg-[#21865B] text-white'
                      : 'bg-[#006699] hover:bg-[#004B70] text-white shadow-xs'
                  }`}
                >
                  <Send className="w-3 h-3" />
                  <span>{sentInvoiceId === inv.id ? 'Reminder Sent!' : 'Send Reminder'}</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Invoice Modal */}
      {isNewInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[#E6EAED] flex items-center justify-between bg-[#F7F9FA]">
              <h3 className="text-base font-bold text-[#172B36]">Issue Chapter Invoice</h3>
              <button
                onClick={() => setIsNewInvoiceModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#71808A]"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addAuditLog('Invoice Created', `Issued invoice for $${newInvoiceForm.amount} to ${newInvoiceForm.memberName}`, `INV-${Date.now()}`, 'Billing');
                setIsNewInvoiceModalOpen(false);
              }}
              className="p-4 space-y-3 text-xs"
            >
              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Member Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={newInvoiceForm.memberName}
                  onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, memberName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Description / Line Item</label>
                <input
                  type="text"
                  placeholder="e.g. 2027 Annual Chapter Membership Dues"
                  value={newInvoiceForm.description}
                  onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#172B36]">Amount ($)</label>
                  <input
                    type="number"
                    value={newInvoiceForm.amount}
                    onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#172B36]">Due Date</label>
                  <input
                    type="text"
                    value={newInvoiceForm.dueDate}
                    onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, dueDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewInvoiceModalOpen(false)}
                  className="px-4 py-2 border border-[#E6EAED] rounded-xl text-xs font-semibold text-[#71808A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#006699] text-white rounded-xl text-xs font-semibold hover:bg-[#004B70]"
                >
                  Issue Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
