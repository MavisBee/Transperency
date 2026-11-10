import React, { useState } from 'react';
import {
  Video,
  Plus,
  Users,
  Clock,
  Calendar,
  Share2,
  ExternalLink,
  Shield,
  FileText,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Radio,
  CheckCircle2,
  Copy
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MeetingItem } from '../../types';
import { CreateMeetingModal } from './CreateMeetingModal';
import { LiveMeetingRoomModal } from './LiveMeetingRoomModal';

export const MeetTab: React.FC = () => {
  const {
    meetings,
    activeChapter,
    selectedMeetingId,
    setSelectedMeetingId,
    liveMeetingRoomId,
    setLiveMeetingRoomId
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'live' | 'past'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [expandedMeetingId, setExpandedMeetingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chapterMeetings = meetings.filter(
    m => m.chapterId === activeChapter.id || m.chapterId === 'org-wide'
  );

  const filteredMeetings = chapterMeetings.filter(m => {
    if (activeFilter === 'upcoming') return m.status === 'upcoming';
    if (activeFilter === 'live') return m.status === 'live';
    if (activeFilter === 'past') return m.status === 'concluded';
    return true;
  });

  const liveMeeting = chapterMeetings.find(m => m.status === 'live');
  const activeMeetingForRoom = meetings.find(m => m.id === liveMeetingRoomId);

  const handleCopyLink = (m: MeetingItem) => {
    navigator.clipboard?.writeText(m.meetingUrl);
    setCopiedId(m.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-4 pb-24 pt-1 animate-in fade-in">
      {/* 1. Top Section for Creating Meeting & Fast Quick Launch */}
      <div className="bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#E6F2F7] text-[#006699] flex items-center justify-center shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#172B36] leading-tight">
                Alumni Meeting Hub
              </h2>
              <p className="text-[11px] text-[#71808A]">
                Virtual rooms, executive syncs & statutory town halls
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3.5 py-2 bg-[#006699] hover:bg-[#004B70] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Meet</span>
          </button>
        </div>

        {/* Quick Launch Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E6EAED]/60">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="p-2.5 rounded-xl border border-[#006699]/30 bg-[#E6F2F7]/40 hover:bg-[#E6F2F7] flex items-center justify-center gap-2 text-xs font-semibold text-[#006699] transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Create Chapter Meeting</span>
          </button>

          <button
            onClick={() => {
              if (liveMeeting) {
                setLiveMeetingRoomId(liveMeeting.id);
              } else if (chapterMeetings.length > 0) {
                setLiveMeetingRoomId(chapterMeetings[0].id);
              } else {
                setIsCreateModalOpen(true);
              }
            }}
            className="p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-50/50 hover:bg-emerald-50 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Instant Room</span>
          </button>
        </div>
      </div>

      {/* 2. Live Meeting Banner if Active */}
      {liveMeeting && (
        <div className="bg-gradient-to-r from-slate-900 to-[#004B70] rounded-2xl p-4 text-white shadow-md space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              LIVE IN PROGRESS
            </span>
            <span className="text-[11px] text-white/80 font-medium">
              {liveMeeting.attendeesCount} Officers Connected
            </span>
          </div>

          <div>
            <h3 className="text-base font-bold text-white leading-snug">
              {liveMeeting.title}
            </h3>
            <p className="text-xs text-white/80 mt-0.5">
              Host: {liveMeeting.hostName} • Room Code: <strong className="text-white">{liveMeeting.roomCode}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setLiveMeetingRoomId(liveMeeting.id)}
              className="flex-1 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-98"
            >
              <Video className="w-4 h-4" />
              <span>Join Live Meeting Room</span>
            </button>

            <button
              onClick={() => handleCopyLink(liveMeeting)}
              className="px-3 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-medium transition-colors"
              title="Copy Room Link"
            >
              {copiedId === liveMeeting.id ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* 3. Filter Segment Tabs */}
      <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E6EAED] shadow-xs text-xs font-medium">
        <button
          onClick={() => setActiveFilter('all')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-colors ${
            activeFilter === 'all'
              ? 'bg-[#006699] text-white font-bold shadow-xs'
              : 'text-[#71808A] hover:text-[#172B36]'
          }`}
        >
          All ({chapterMeetings.length})
        </button>

        <button
          onClick={() => setActiveFilter('upcoming')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-colors ${
            activeFilter === 'upcoming'
              ? 'bg-[#006699] text-white font-bold shadow-xs'
              : 'text-[#71808A] hover:text-[#172B36]'
          }`}
        >
          Upcoming ({chapterMeetings.filter(m => m.status === 'upcoming').length})
        </button>

        <button
          onClick={() => setActiveFilter('live')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-colors ${
            activeFilter === 'live'
              ? 'bg-[#006699] text-white font-bold shadow-xs'
              : 'text-[#71808A] hover:text-[#172B36]'
          }`}
        >
          Live ({chapterMeetings.filter(m => m.status === 'live').length})
        </button>

        <button
          onClick={() => setActiveFilter('past')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-colors ${
            activeFilter === 'past'
              ? 'bg-[#006699] text-white font-bold shadow-xs'
              : 'text-[#71808A] hover:text-[#172B36]'
          }`}
        >
          Past Minutes ({chapterMeetings.filter(m => m.status === 'concluded').length})
        </button>
      </div>

      {/* 4. Meetings List */}
      <div className="space-y-3">
        {filteredMeetings.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-[#E6EAED] text-center space-y-2">
            <Video className="w-10 h-10 text-[#71808A]/40 mx-auto" />
            <h3 className="text-sm font-bold text-[#172B36]">No meetings found</h3>
            <p className="text-xs text-[#71808A] max-w-xs mx-auto">
              No meetings scheduled under this category. Click 'Schedule Meet' to organize a live session.
            </p>
          </div>
        ) : (
          filteredMeetings.map((meet) => {
            const isExpanded = expandedMeetingId === meet.id;

            return (
              <div
                key={meet.id}
                className="bg-white rounded-2xl border border-[#E6EAED] shadow-xs overflow-hidden transition-all hover:border-[#006699]/40"
              >
                <div className="p-4 space-y-3">
                  {/* Top Bar: Badge & Room Code */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E6F2F7] text-[#006699] text-[11px] font-bold">
                      {meet.type}
                    </span>

                    <span className="text-[11px] text-[#71808A] font-mono">
                      {meet.roomCode}
                    </span>
                  </div>

                  {/* Meeting Title & Details */}
                  <div>
                    <h3 className="text-base font-bold text-[#172B36] leading-snug">
                      {meet.title}
                    </h3>

                    <div className="mt-2 space-y-1 text-xs text-[#71808A]">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#006699] shrink-0" />
                        <span>{meet.dateDisplay} • {meet.timeDisplay} ({meet.duration})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-[#006699] shrink-0" />
                        <span>Target: {meet.targetAudience}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="flex items-center gap-2 pt-1 border-t border-[#E6EAED]/60">
                    <button
                      onClick={() => setLiveMeetingRoomId(meet.id)}
                      className="flex-1 py-2 px-3 bg-[#006699] hover:bg-[#004B70] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>{meet.status === 'live' ? 'Join Call Now' : 'Enter Meeting Room'}</span>
                    </button>

                    <button
                      onClick={() => handleCopyLink(meet)}
                      className="p-2 border border-[#E6EAED] rounded-xl hover:bg-slate-50 text-[#71808A] text-xs font-semibold flex items-center gap-1 transition-colors"
                      title="Copy meeting link"
                    >
                      {copiedId === meet.id ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      onClick={() => setExpandedMeetingId(isExpanded ? null : meet.id)}
                      className="p-2 border border-[#E6EAED] rounded-xl hover:bg-slate-50 text-[#71808A] transition-colors"
                      title="Toggle agenda"
                    >
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* Expandable Agenda & Minutes Section */}
                  {isExpanded && (
                    <div className="pt-2 border-t border-[#E6EAED] space-y-2.5 animate-in fade-in text-xs">
                      <div className="space-y-1">
                        <h4 className="font-bold text-[#172B36] uppercase tracking-wider text-[10px]">
                          Meeting Agenda
                        </h4>
                        <div className="space-y-1 bg-[#F7F9FA] p-2.5 rounded-xl border border-[#E6EAED]">
                          {meet.agenda.map((ag, i) => (
                            <div key={i} className="text-[#172B36] text-[11px] leading-relaxed">
                              {ag}
                            </div>
                          ))}
                        </div>
                      </div>

                      {meet.notes && (
                        <div className="space-y-1">
                          <h4 className="font-bold text-[#172B36] uppercase tracking-wider text-[10px]">
                            Secretariat Notes
                          </h4>
                          <p className="text-[11px] text-[#71808A] leading-relaxed">
                            {meet.notes}
                          </p>
                        </div>
                      )}

                      {meet.hasMinutes && (
                        <div className="flex items-center justify-between p-2 rounded-xl bg-[#E6F2F7] border border-[#006699]/20 text-[#006699]">
                          <span className="font-bold flex items-center gap-1.5 text-[11px]">
                            <FileText className="w-3.5 h-3.5" />
                            Official Certified Minutes Attached
                          </span>
                          <span className="text-[10px] font-semibold underline cursor-pointer">
                            View PDF
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create Meeting Modal */}
      <CreateMeetingModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Live Meeting Room Modal */}
      {activeMeetingForRoom && (
        <LiveMeetingRoomModal
          meeting={activeMeetingForRoom}
          onClose={() => setLiveMeetingRoomId(null)}
        />
      )}
    </div>
  );
};
