import React, { useState } from 'react';
import {
  CalendarPlus,
  Megaphone,
  FileUp,
  X,
  Send,
  Upload
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickActionsModal: React.FC = () => {
  const {
    activeQuickAction,
    setActiveQuickAction,
    createEvent,
    publishAnnouncement,
    uploadMinutes,
    events,
    activeChapter
  } = useApp();

  // Event quick form state
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  // Announcement quick form state
  const [announceTitle, setAnnounceTitle] = useState('');
  const [announceMsg, setAnnounceMsg] = useState('');
  const [announceAudience, setAnnounceAudience] = useState('All Chapter Members');

  // Minutes quick form state
  const [minutesTitle, setMinutesTitle] = useState('');
  const [minutesDate, setMinutesDate] = useState('');
  const [minutesEvent, setMinutesEvent] = useState('');

  if (!activeQuickAction || activeQuickAction === 'view_approvals') return null;

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;
    createEvent({
      title: eventTitle,
      dateDisplay: eventDate || 'Upcoming Date',
      timeDisplay: '6:00 PM EST',
      location: eventLocation || 'Main Assembly Hall & Virtual',
      locationType: 'hybrid'
    });
    setActiveQuickAction(null);
  };

  const handlePublishAnnounce = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announceTitle.trim() || !announceMsg.trim()) return;
    publishAnnouncement({
      title: announceTitle,
      message: announceMsg,
      targetAudience: announceAudience
    });
    setActiveQuickAction(null);
  };

  const handleUploadMinutes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!minutesTitle.trim()) return;
    uploadMinutes({
      title: minutesTitle,
      meetingDate: minutesDate || new Date().toLocaleDateString(),
      associatedEventTitle: minutesEvent || undefined,
      meetingType: 'Executive Board'
    });
    setActiveQuickAction(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#E6EAED] flex items-center justify-between bg-[#F7F9FA]">
          <div className="flex items-center gap-2">
            {activeQuickAction === 'create_event' && (
              <>
                <CalendarPlus className="w-5 h-5 text-[#006699]" />
                <div>
                  <h3 className="text-base font-bold text-[#172B36]">Create Event</h3>
                  <p className="text-xs text-[#71808A]">Quick schedule for {activeChapter.name}</p>
                </div>
              </>
            )}

            {activeQuickAction === 'make_announcement' && (
              <>
                <Megaphone className="w-5 h-5 text-[#006699]" />
                <div>
                  <h3 className="text-base font-bold text-[#172B36]">Make Announcement</h3>
                  <p className="text-xs text-[#71808A]">Broadcast to members</p>
                </div>
              </>
            )}

            {activeQuickAction === 'upload_minutes' && (
              <>
                <FileUp className="w-5 h-5 text-[#006699]" />
                <div>
                  <h3 className="text-base font-bold text-[#172B36]">Upload Minutes</h3>
                  <p className="text-xs text-[#71808A]">Archive official meeting notes</p>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setActiveQuickAction(null)}
            className="w-8 h-8 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#71808A]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Content Body */}
        <div className="p-4 overflow-y-auto text-xs">
          {/* Quick Create Event */}
          {activeQuickAction === 'create_event' && (
            <form onSubmit={handleCreateEvent} className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Event Title</label>
                <input
                  type="text"
                  placeholder="e.g. Winter Alumni Networking Mixer"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Date & Time</label>
                <input
                  type="text"
                  placeholder="e.g. Friday, Dec 18, 2026 • 6:30 PM EST"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Location / Venue</label>
                <input
                  type="text"
                  placeholder="e.g. University Club of New York"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveQuickAction(null)}
                  className="px-4 py-2 border border-[#E6EAED] rounded-xl text-xs font-semibold text-[#71808A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#006699] text-white rounded-xl text-xs font-semibold hover:bg-[#004B70]"
                >
                  Publish Event
                </button>
              </div>
            </form>
          )}

          {/* Quick Announcement */}
          {activeQuickAction === 'make_announcement' && (
            <form onSubmit={handlePublishAnnounce} className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Announcement Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Call for Mentorship Volunteers"
                  value={announceTitle}
                  onChange={(e) => setAnnounceTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Target Audience</label>
                <select
                  value={announceAudience}
                  onChange={(e) => setAnnounceAudience(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                >
                  <option value="Entire Organization">Entire Organization</option>
                  <option value="All Chapter Members">All Chapter Members</option>
                  <option value="Executive Fellows">Executive Fellows Guild</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Message Content</label>
                <textarea
                  rows={3}
                  placeholder="Enter the broadcast statement..."
                  value={announceMsg}
                  onChange={(e) => setAnnounceMsg(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveQuickAction(null)}
                  className="px-4 py-2 border border-[#E6EAED] rounded-xl text-xs font-semibold text-[#71808A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#006699] text-white rounded-xl text-xs font-semibold hover:bg-[#004B70] flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Broadcast Now
                </button>
              </div>
            </form>
          )}

          {/* Quick Minutes Upload */}
          {activeQuickAction === 'upload_minutes' && (
            <form onSubmit={handleUploadMinutes} className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Minutes Document Title</label>
                <input
                  type="text"
                  placeholder="e.g. October 2026 Executive Council Minutes"
                  value={minutesTitle}
                  onChange={(e) => setMinutesTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Meeting Date</label>
                <input
                  type="text"
                  placeholder="e.g. October 24, 2026"
                  value={minutesDate}
                  onChange={(e) => setMinutesDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Associated Event (Optional)</label>
                <select
                  value={minutesEvent}
                  onChange={(e) => setMinutesEvent(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                >
                  <option value="">None / External</option>
                  {events.map(ev => (
                    <option key={ev.id} value={ev.title}>{ev.title}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveQuickAction(null)}
                  className="px-4 py-2 border border-[#E6EAED] rounded-xl text-xs font-semibold text-[#71808A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#006699] text-white rounded-xl text-xs font-semibold hover:bg-[#004B70] flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Save & Archive
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
