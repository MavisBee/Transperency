import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Shield,
  ArrowLeft,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RegisteredMember } from '../../types';

export const MembersDirectoryScreen: React.FC = () => {
  const {
    registeredMembers,
    activeChapter,
    currentMetrics,
    setActiveSubScreen,
    selectedMemberId,
    setSelectedMemberId,
    approveExistingMemberDues
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'active' | 'pending_renewal' | 'lapsed'>('All');

  const chapterMembers = registeredMembers.filter(
    m => activeChapter.id === 'org-wide' || m.chapterId === activeChapter.id
  );

  const filteredMembers = chapterMembers.filter(m => {
    if (tierFilter !== 'All' && m.membershipType !== tierFilter) return false;
    if (statusFilter !== 'All' && m.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = m.fullName.toLowerCase().includes(q);
      const matchEmail = m.email.toLowerCase().includes(q);
      const matchTier = m.membershipType.toLowerCase().includes(q);
      const matchGrad = String(m.graduationYear).includes(q);
      if (!matchName && !matchEmail && !matchTier && !matchGrad) return false;
    }
    return true;
  });

  const activeMember = registeredMembers.find(m => m.id === selectedMemberId);

  return (
    <div className="space-y-4 pb-24 pt-1 animate-in fade-in">
      {/* KPI Overview Summary Strip */}

      {/* KPI Overview Summary Strip */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="bg-white p-3 rounded-xl border border-[#E6EAED] shadow-xs text-center">
          <span className="text-lg font-bold text-[#172B36] font-mono block">
            {currentMetrics.totalMembers.toLocaleString()}
          </span>
          <span className="text-[10px] text-[#71808A]">Total Enrolled</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#E6EAED] shadow-xs text-center">
          <span className="text-lg font-bold text-[#21865B] font-mono block">
            {currentMetrics.activeSubscriptions.toLocaleString()}
          </span>
          <span className="text-[10px] text-[#71808A]">Good Standing</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#E6EAED] shadow-xs text-center">
          <span className="text-lg font-bold text-[#D94B4B] font-mono block">
            {currentMetrics.pendingRenewals}
          </span>
          <span className="text-[10px] text-[#71808A]">Renewal Due</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#71808A] absolute left-3 top-3 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name, email, class year (e.g. 2012)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E6EAED] text-xs text-[#172B36] placeholder-[#71808A] focus:outline-none focus:ring-1 focus:ring-[#006699] shadow-xs"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {(['All', 'Executive Tier', 'Lifetime Fellow', 'Regular Alumnus', 'Young Alumni'] as const).map(tier => (
          <button
            key={tier}
            onClick={() => setTierFilter(tier)}
            className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
              tierFilter === tier
                ? 'bg-[#006699] text-white shadow-xs'
                : 'bg-white text-[#71808A] border border-[#E6EAED] hover:bg-slate-50'
            }`}
          >
            {tier}
          </button>
        ))}
      </div>

      {/* Members List */}
      <div className="space-y-2.5">
        {filteredMembers.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-[#E6EAED] text-center space-y-2">
            <Users className="w-10 h-10 text-[#71808A]/40 mx-auto" />
            <h3 className="text-sm font-bold text-[#172B36]">No members found</h3>
            <p className="text-xs text-[#71808A]">
              Try adjusting your search query or tier filters.
            </p>
          </div>
        ) : (
          filteredMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMemberId(member.id)}
              className="bg-white rounded-2xl p-3.5 border border-[#E6EAED] shadow-xs hover:border-[#006699]/40 transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-99"
            >
              <div className="flex items-center gap-3 min-w-0">
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.fullName}
                    className="w-11 h-11 rounded-full object-cover border border-[#E6EAED] shrink-0"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#E6F2F7] text-[#006699] font-bold text-xs flex items-center justify-center border border-[#E6EAED] shrink-0">
                    {member.initials}
                  </div>
                )}

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-[#172B36] group-hover:text-[#006699] truncate">
                      {member.fullName}
                    </h3>
                    <span className="text-[10px] text-[#71808A] font-mono">
                      #{member.id}
                    </span>
                  </div>

                  <p className="text-xs text-[#006699] font-semibold mt-0.5">
                    {member.membershipType}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-[#71808A] mt-0.5">
                    <span>Class of '{String(member.graduationYear).slice(-2)}</span>
                    <span>•</span>
                    <span className="truncate">{member.subChapterName || activeChapter.name}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                {member.duesStatus === 'up_to_date' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#21865B] bg-[#21865B]/10 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Current
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#D94B4B] bg-[#D94B4B]/10 px-2 py-0.5 rounded-full">
                    <AlertCircle className="w-3 h-3" />
                    Due
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-[#71808A] group-hover:text-[#006699] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Member Details Modal / Bottom Sheet */}
      {activeMember && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[#E6EAED] flex items-center justify-between bg-[#F7F9FA]">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#006699]" />
                <h3 className="text-sm font-bold text-[#172B36]">
                  Member Profile
                </h3>
              </div>
              <button
                onClick={() => setSelectedMemberId(null)}
                className="w-8 h-8 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#71808A]"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4 text-xs">
              <div className="flex items-center gap-3.5 p-3 bg-[#F7F9FA] rounded-xl border border-[#E6EAED]">
                <div className="w-14 h-14 rounded-full bg-[#E6F2F7] text-[#006699] font-bold text-base flex items-center justify-center border border-[#E6EAED] shrink-0">
                  {activeMember.initials}
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-[#172B36]">{activeMember.fullName}</h4>
                  <p className="text-[#006699] font-semibold">{activeMember.membershipType}</p>
                  <p className="text-[#71808A] font-mono text-[11px]">ID: {activeMember.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`mailto:${activeMember.email}`}
                  className="p-2.5 rounded-xl border border-[#E6EAED] bg-white hover:bg-slate-50 flex items-center justify-center gap-2 font-semibold text-[#172B36]"
                >
                  <Mail className="w-4 h-4 text-[#006699]" />
                  <span>Send Email</span>
                </a>
                <a
                  href={`tel:${activeMember.phone}`}
                  className="p-2.5 rounded-xl border border-[#E6EAED] bg-white hover:bg-slate-50 flex items-center justify-center gap-2 font-semibold text-[#172B36]"
                >
                  <Phone className="w-4 h-4 text-[#006699]" />
                  <span>Call Member</span>
                </a>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E6EAED] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#71808A]">Class Year</span>
                  <span className="font-bold text-[#172B36]">{activeMember.graduationYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71808A]">Chapter Assignment</span>
                  <span className="font-bold text-[#172B36]">{activeMember.subChapterName || activeChapter.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71808A]">Enrolled Since</span>
                  <span className="font-bold text-[#172B36]">{activeMember.joinedDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#71808A]">Dues Status</span>
                  <span className={`font-bold ${activeMember.duesStatus === 'up_to_date' ? 'text-[#21865B]' : 'text-[#D94B4B]'}`}>
                    {activeMember.duesStatus === 'up_to_date' ? 'Up to date' : `Overdue ($${activeMember.duesAmount || 150})`}
                  </span>
                </div>
                {activeMember.duesApprovedByAdmin && (
                  <div className="flex justify-between items-center text-[11px] pt-1 border-t border-[#E6EAED]/60 text-emerald-700">
                    <span>Approved by Admin</span>
                    <span className="font-semibold">{activeMember.duesPaymentMethod || 'Treasury Cleared'}</span>
                  </div>
                )}
              </div>

              {activeMember.duesStatus !== 'up_to_date' && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Direct Admin Dues Clearance</span>
                  </div>
                  <p className="text-[11px] text-emerald-950/80">
                    Existing members do not need to upload a receipt. Admin can directly approve annual dues.
                  </p>
                  <button
                    onClick={() => {
                      approveExistingMemberDues(activeMember.id, 'Chapter Treasury Direct Clearance');
                      setSelectedMemberId(null);
                    }}
                    className="w-full py-2 bg-[#21865B] hover:bg-[#1a6b49] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Dues for {activeMember.fullName} (No Receipt Needed)</span>
                  </button>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-[#E6EAED] bg-[#F7F9FA] flex justify-end">
              <button
                onClick={() => setSelectedMemberId(null)}
                className="px-4 py-2 bg-[#006699] text-white rounded-xl font-semibold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
