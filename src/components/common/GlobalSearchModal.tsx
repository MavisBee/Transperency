import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  User,
  Calendar,
  FileText,
  ChevronRight,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GlobalSearchResult } from '../../types';

export const GlobalSearchModal: React.FC = () => {
  const {
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    globalSearchQuery,
    setGlobalSearchQuery,
    activeChapter,
    registeredMembers,
    applications,
    events,
    driveFiles,
    minutes,
    setActiveTab,
    setActiveSubScreen,
    setSelectedApplicationId,
    setSelectedEventId,
    setSelectedFileId,
    setSelectedMemberId
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<'all' | 'members' | 'events' | 'documents'>('all');

  // Search indexing across current active chapter
  const searchResults = useMemo<GlobalSearchResult[]>(() => {
    const q = globalSearchQuery.trim().toLowerCase();
    if (!q) return [];

    const results: GlobalSearchResult[] = [];

    // 1. Registered Members & Applicants
    if (activeCategory === 'all' || activeCategory === 'members') {
      registeredMembers
        .filter(m => activeChapter.id === 'org-wide' || m.chapterId === activeChapter.id)
        .filter(m =>
          m.fullName.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.membershipType.toLowerCase().includes(q) ||
          (m.subChapterName && m.subChapterName.toLowerCase().includes(q))
        )
        .forEach(m => {
          results.push({
            id: m.id,
            title: m.fullName,
            subtitle: `${m.membershipType} • ${m.subChapterName || activeChapter.name}`,
            type: 'member',
            badge: m.status === 'active' ? 'Active' : 'Pending Renewal',
            targetTab: 'home',
            targetId: m.id
          });
        });

      applications
        .filter(a => activeChapter.id === 'org-wide' || a.chapterId === activeChapter.id)
        .filter(a =>
          a.fullName.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q) ||
          a.membershipType.toLowerCase().includes(q)
        )
        .forEach(a => {
          results.push({
            id: a.id,
            title: a.fullName,
            subtitle: `Applicant • ${a.membershipType} • #${a.id}`,
            type: 'applicant',
            badge: a.status === 'pending' ? 'Review Needed' : a.status === 'approved' ? 'Approved' : 'Awaiting Pay',
            targetTab: 'approvals',
            targetId: a.id
          });
        });
    }

    // 2. Events
    if (activeCategory === 'all' || activeCategory === 'events') {
      events
        .filter(e => activeChapter.id === 'org-wide' || e.chapterId === activeChapter.id)
        .filter(e =>
          e.title.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)
        )
        .forEach(e => {
          results.push({
            id: e.id,
            title: e.title,
            subtitle: `${e.dateDisplay} • ${e.location}`,
            type: 'event',
            badge: `${e.registeredCount} Attending`,
            targetTab: 'events',
            targetId: e.id
          });
        });
    }

    // 3. Documents & Minutes
    if (activeCategory === 'all' || activeCategory === 'documents') {
      driveFiles
        .filter(d => activeChapter.id === 'org-wide' || d.chapterId === activeChapter.id)
        .filter(d =>
          d.name.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.tags.some(t => t.toLowerCase().includes(q))
        )
        .forEach(d => {
          results.push({
            id: d.id,
            title: d.name,
            subtitle: `${d.category} • ${d.fileSize} • Uploaded by ${d.uploadedBy}`,
            type: 'document',
            badge: d.fileType.toUpperCase(),
            targetTab: 'drive',
            targetId: d.id
          });
        });

      minutes
        .filter(m => activeChapter.id === 'org-wide' || m.chapterId === activeChapter.id)
        .filter(m =>
          m.title.toLowerCase().includes(q) ||
          m.meetingType.toLowerCase().includes(q) ||
          (m.description && m.description.toLowerCase().includes(q))
        )
        .forEach(m => {
          results.push({
            id: m.id,
            title: m.title,
            subtitle: `Minutes • ${m.meetingType} • ${m.meetingDate}`,
            type: 'minutes',
            badge: `${m.signaturesVerified} Signed`,
            targetTab: 'drive',
            targetId: m.id
          });
        });
    }

    return results;
  }, [globalSearchQuery, activeCategory, activeChapter, registeredMembers, applications, events, driveFiles, minutes]);

  if (!isGlobalSearchOpen) return null;

  const handleSelectResult = (item: GlobalSearchResult) => {
    setIsGlobalSearchOpen(false);
    setGlobalSearchQuery('');

    if (item.type === 'member') {
      setSelectedMemberId(item.id);
      setActiveSubScreen('members_directory');
    } else if (item.type === 'applicant') {
      setActiveTab('approvals');
      setSelectedApplicationId(item.targetId || null);
    } else if (item.type === 'event') {
      setActiveTab('events');
      setSelectedEventId(item.targetId || null);
    } else if (item.type === 'document' || item.type === 'minutes') {
      setActiveTab('drive');
      setSelectedFileId(item.targetId || null);
    }
  };

  const getResultIcon = (type: GlobalSearchResult['type']) => {
    switch (type) {
      case 'member':
      case 'applicant':
        return <User className="w-4 h-4 text-[#006699]" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-[#D99A2B]" />;
      case 'document':
      case 'minutes':
        return <FileText className="w-4 h-4 text-[#21865B]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-0 sm:p-4 pt-0 sm:pt-12 animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-b-3xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-[#E6EAED]">
        {/* Search Input Bar */}
        <div className="p-3 border-b border-[#E6EAED] bg-[#F7F9FA]">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#006699] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              autoFocus
              placeholder={`Search members, events, records in ${activeChapter.name}...`}
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-white rounded-xl border border-[#006699]/30 text-xs text-[#172B36] placeholder-[#71808A] focus:outline-none focus:ring-2 focus:ring-[#006699]/20 shadow-xs"
            />
            {globalSearchQuery ? (
              <button
                onClick={() => setGlobalSearchQuery('')}
                className="absolute right-3 text-[#71808A] hover:text-[#172B36] p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsGlobalSearchOpen(false)}
                className="absolute right-3 text-[#71808A] hover:text-[#172B36] text-[11px] font-semibold"
              >
                ESC
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 mt-2.5 text-[11px]">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-[#006699] text-white shadow-xs'
                  : 'bg-white text-[#71808A] border border-[#E6EAED] hover:bg-slate-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveCategory('members')}
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                activeCategory === 'members'
                  ? 'bg-[#006699] text-white shadow-xs'
                  : 'bg-white text-[#71808A] border border-[#E6EAED] hover:bg-slate-50'
              }`}
            >
              Members & Applicants
            </button>
            <button
              onClick={() => setActiveCategory('events')}
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                activeCategory === 'events'
                  ? 'bg-[#006699] text-white shadow-xs'
                  : 'bg-white text-[#71808A] border border-[#E6EAED] hover:bg-slate-50'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveCategory('documents')}
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                activeCategory === 'documents'
                  ? 'bg-[#006699] text-white shadow-xs'
                  : 'bg-white text-[#71808A] border border-[#E6EAED] hover:bg-slate-50'
              }`}
            >
              Drive & Minutes
            </button>
          </div>
        </div>

        {/* Results Container */}
        <div className="p-3 overflow-y-auto space-y-1.5 flex-1 min-h-[220px]">
          {!globalSearchQuery.trim() ? (
            <div className="py-8 px-4 text-center space-y-2">
              <Sparkles className="w-8 h-8 text-[#006699]/40 mx-auto" />
              <h4 className="text-xs font-bold text-[#172B36]">
                Quick Chapter Search
              </h4>
              <p className="text-[11px] text-[#71808A] max-w-xs mx-auto">
                Type names like <span className="font-semibold text-[#172B36]">"Elena"</span>, events like <span className="font-semibold text-[#172B36]">"Gala"</span>, or documents like <span className="font-semibold text-[#172B36]">"Constitution"</span>.
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-8 text-center space-y-1">
              <Search className="w-8 h-8 text-[#71808A]/30 mx-auto" />
              <h4 className="text-xs font-bold text-[#172B36]">No matches found</h4>
              <p className="text-[11px] text-[#71808A]">
                No records found matching "{globalSearchQuery}" in {activeChapter.name}.
              </p>
            </div>
          ) : (
            searchResults.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                onClick={() => handleSelectResult(item)}
                className="p-2.5 rounded-xl border border-[#E6EAED] hover:border-[#006699]/40 bg-white hover:bg-[#F7F9FA] transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-99"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#E6F2F7] flex items-center justify-center shrink-0">
                    {getResultIcon(item.type)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-[#172B36] group-hover:text-[#006699] truncate">
                        {item.title}
                      </h4>
                      {item.badge && (
                        <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded-xs bg-slate-100 text-[#71808A]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#71808A] truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-[#71808A] group-hover:text-[#006699] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-[#F7F9FA] border-t border-[#E6EAED] flex items-center justify-between text-[11px] text-[#71808A]">
          <span>
            Scope: <strong className="text-[#172B36]">{activeChapter.name}</strong>
          </span>
          <button
            onClick={() => setIsGlobalSearchOpen(false)}
            className="text-xs font-semibold text-[#006699] hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
