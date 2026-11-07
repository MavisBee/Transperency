import React from 'react';
import { Check, Globe, MapPin, ChevronRight, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChapterSelectorDrawer: React.FC = () => {
  const {
    chapters,
    activeChapterId,
    setActiveChapterId,
    isChapterSelectorOpen,
    setIsChapterSelectorOpen
  } = useApp();

  if (!isChapterSelectorOpen) return null;

  const handleSelectChapter = (id: string) => {
    setActiveChapterId(id);
    setIsChapterSelectorOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#E6EAED] flex items-center justify-between bg-[#F7F9FA]">
          <div>
            <h3 className="text-base font-bold text-[#172B36]">
              Switch Chapter
            </h3>
            <p className="text-xs text-[#71808A]">
              Select an alumni chapter or sub-chapter to manage
            </p>
          </div>
          <button
            onClick={() => setIsChapterSelectorOpen(false)}
            className="w-8 h-8 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#71808A] hover:text-[#172B36]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chapters List */}
        <div className="p-4 overflow-y-auto space-y-2.5">
          {chapters.map((chapter) => {
            const isSelected = activeChapterId === chapter.id;

            return (
              <div
                key={chapter.id}
                className={`rounded-2xl border transition-all ${
                  isSelected
                    ? 'border-[#006699] bg-[#E6F2F7]/40 ring-1 ring-[#006699]'
                    : 'border-[#E6EAED] bg-white hover:border-[#006699]/30'
                }`}
              >
                {/* Main Chapter Header Row */}
                <button
                  onClick={() => handleSelectChapter(chapter.id)}
                  className="w-full text-left p-3.5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#006699] text-white'
                          : 'bg-[#F7F9FA] text-[#006699] border border-[#E6EAED]'
                      }`}
                    >
                      {chapter.id === 'org-wide' ? (
                        <Globe className="w-5 h-5" />
                      ) : (
                        <MapPin className="w-5 h-5" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-[#172B36] truncate">
                          {chapter.name}
                        </h4>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-xs bg-slate-100 text-[#71808A]">
                          {chapter.currency} ({chapter.currencySymbol})
                        </span>
                      </div>
                      <p className="text-xs text-[#71808A] mt-0.5">
                        {chapter.totalMembers.toLocaleString()} Registered Members
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#006699] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>

                {/* Sub-Chapters (if any) */}
                {chapter.subChapters && chapter.subChapters.length > 0 && (
                  <div className="px-3.5 pb-3 pt-1 border-t border-[#E6EAED]/50 flex flex-wrap gap-1.5">
                    {chapter.subChapters.map((sub) => (
                      <span
                        key={sub.id}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white border border-[#E6EAED] text-[#172B36] font-medium"
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="p-3 bg-[#F7F9FA] border-t border-[#E6EAED] text-center text-[11px] text-[#71808A]">
          Switching chapters immediately updates metrics, currency, and approvals.
        </div>
      </div>
    </div>
  );
};
