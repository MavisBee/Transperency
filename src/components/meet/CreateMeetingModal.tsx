import React, { useState } from 'react';
import {
  Video,
  Calendar,
  Clock,
  Users,
  Shield,
  Link,
  Plus,
  Trash2,
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MeetingItem } from '../../types';

interface CreateMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMeetingCreated?: (meeting: MeetingItem) => void;
}

export const CreateMeetingModal: React.FC<CreateMeetingModalProps> = ({
  isOpen,
  onClose
}) => {
  const { activeChapter, createMeeting } = useApp();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<MeetingItem['type']>('Executive Board');
  const [dateDisplay, setDateDisplay] = useState('Thursday, Nov 12, 2026');
  const [timeDisplay, setTimeDisplay] = useState('6:30 PM EST');
  const [duration, setDuration] = useState('45 mins');
  const [platform, setPlatform] = useState<MeetingItem['platform']>('Built-in Meet');
  const [customLink, setCustomLink] = useState('');
  const [targetAudience, setTargetAudience] = useState('Executive Committee & Chapter Officers');
  const [subChapter, setSubChapter] = useState('');
  const [agendaList, setAgendaList] = useState<string[]>([
    '1. Quorum verification & statutory agenda opening',
    '2. Prospective member 3rd-party receipts backlog review',
    '3. Direct clearance of existing member annual dues'
  ]);
  const [newAgendaItem, setNewAgendaItem] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleAddAgenda = () => {
    if (!newAgendaItem.trim()) return;
    setAgendaList(prev => [...prev, `${prev.length + 1}. ${newAgendaItem.trim()}`]);
    setNewAgendaItem('');
  };

  const handleRemoveAgenda = (idx: number) => {
    setAgendaList(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (startNow: boolean = false) => {
    if (!title.trim()) return;

    const roomCode = `TH-${activeChapter.code}-${Math.floor(1000 + Math.random() * 9000)}`;
    const meetingUrl = platform === 'Built-in Meet'
      ? `https://meet.transparencyhub.org/${roomCode.toLowerCase()}`
      : (customLink || `https://meet.google.com/${roomCode.toLowerCase()}`);

    createMeeting({
      title: title.trim(),
      type,
      dateDisplay: startNow ? 'Starting Now' : dateDisplay,
      timeDisplay: startNow ? 'Live' : timeDisplay,
      duration,
      status: startNow ? 'live' : 'upcoming',
      platform,
      meetingUrl,
      roomCode,
      targetAudience,
      subChapterName: subChapter || undefined,
      agenda: agendaList,
      notes: notes.trim()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#E6EAED] flex items-center justify-between bg-[#F7F9FA]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E6F2F7] text-[#006699] flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#172B36]">
                Schedule Chapter Meeting
              </h3>
              <p className="text-xs text-[#71808A]">
                Official meeting room for {activeChapter.name}
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

        {/* Scrollable Form Body */}
        <div className="p-4 overflow-y-auto space-y-3.5 text-xs flex-1">
          {/* Meeting Title */}
          <div className="space-y-1">
            <label className="font-bold text-[#172B36]">Meeting Title *</label>
            <input
              type="text"
              placeholder="e.g. Q4 Executive Board Statutory Meeting"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs focus:ring-1 focus:ring-[#006699]"
            />
          </div>

          {/* Meeting Type & Platform */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-[#172B36]">Meeting Classification</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
              >
                <option value="Executive Board">Executive Board Sync</option>
                <option value="General Assembly">General Assembly & Town Hall</option>
                <option value="Sub-Chapter Sync">Sub-Chapter Officers Meeting</option>
                <option value="Committee">Standing Committee</option>
                <option value="Mentorship Circle">Mentorship & Young Alumni</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#172B36]">Room Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
              >
                <option value="Built-in Meet">Transparency Hub Built-in Meet</option>
                <option value="Google Meet">Google Meet URL</option>
                <option value="Zoom">Zoom Video Room</option>
                <option value="Hybrid Room">Hybrid (Physical & Virtual)</option>
              </select>
            </div>
          </div>

          {/* Custom Link if external */}
          {platform !== 'Built-in Meet' && (
            <div className="space-y-1">
              <label className="font-bold text-[#172B36]">External Meeting URL</label>
              <div className="relative">
                <Link className="w-3.5 h-3.5 text-[#71808A] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="https://meet.google.com/xyz or Zoom link"
                  value={customLink}
                  onChange={(e) => setCustomLink(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                />
              </div>
            </div>
          )}

          {/* Date, Time, Duration */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-[#172B36]">Date *</label>
              <input
                type="text"
                placeholder="Nov 12, 2026"
                value={dateDisplay}
                onChange={(e) => setDateDisplay(e.target.value)}
                className="w-full px-2.5 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
              >
              </input>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#172B36]">Time *</label>
              <input
                type="text"
                placeholder="6:30 PM EST"
                value={timeDisplay}
                onChange={(e) => setTimeDisplay(e.target.value)}
                className="w-full px-2.5 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#172B36]">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-2 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
              >
                <option value="30 mins">30 mins</option>
                <option value="45 mins">45 mins</option>
                <option value="1 hour">1 hour</option>
                <option value="1.5 hours">1.5 hours</option>
                <option value="2 hours">2 hours</option>
              </select>
            </div>
          </div>

          {/* Target Audience */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-[#172B36]">Audience / Access</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
              >
                <option value="Executive Committee & Chapter Officers">Executive Committee Only</option>
                <option value="All Chapter Members">All Registered Chapter Members</option>
                <option value="Sub-Chapter Leaders">Sub-Chapter Leaders Only</option>
                <option value="Executive Tier & Mentors">Executive Tier & Mentors</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#172B36]">Sub-Chapter Focus</label>
              <select
                value={subChapter}
                onChange={(e) => setSubChapter(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
              >
                <option value="">All Sub-Chapters</option>
                {activeChapter.subChapters.map(sub => (
                  <option key={sub.id} value={sub.name}>{sub.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Agenda Items */}
          <div className="space-y-1.5 pt-1">
            <label className="font-bold text-[#172B36] flex items-center justify-between">
              <span>Discussion Agenda Items</span>
              <span className="text-[10px] text-[#71808A]">{agendaList.length} items</span>
            </label>

            <div className="space-y-1.5">
              {agendaList.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-[#F7F9FA] p-2 rounded-lg border border-[#E6EAED]">
                  <span className="text-xs text-[#172B36]">{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAgenda(idx)}
                    className="text-[#71808A] hover:text-[#D94B4B] p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-1.5 pt-1">
              <input
                type="text"
                placeholder="Add agenda topic..."
                value={newAgendaItem}
                onChange={(e) => setNewAgendaItem(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAgenda();
                  }
                }}
                className="flex-1 px-3 py-1.5 bg-[#F7F9FA] border border-[#E6EAED] rounded-lg text-xs"
              />
              <button
                type="button"
                onClick={handleAddAgenda}
                className="px-3 py-1.5 bg-[#E6F2F7] hover:bg-[#d6eaf3] text-[#006699] rounded-lg font-bold text-xs"
              >
                Add
              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="font-bold text-[#172B36]">Meeting Notice & Notes</label>
            <textarea
              rows={2}
              placeholder="Provide preparatory instructions, required documents, or access passcodes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-[#E6EAED] bg-[#F7F9FA] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            className="py-2.5 px-3.5 rounded-xl border border-[#006699]/30 bg-white text-[#006699] font-bold text-xs hover:bg-[#E6F2F7] transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#006699]" />
            <span>Start Now</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={!title.trim()}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#006699] hover:bg-[#004B70] disabled:opacity-50 text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Meeting</span>
          </button>
        </div>
      </div>
    </div>
  );
};
