import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Video,
  ExternalLink,
  CheckCircle2,
  Filter,
  Search,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EventItem } from '../../types';

export const EventsTab: React.FC = () => {
  const {
    events,
    activeChapter,
    createEvent,
    toggleCheckInAttendee,
    selectedEventId,
    setSelectedEventId
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'upcoming' | 'past' | 'draft'>('upcoming');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [attendeeSearchQuery, setAttendeeSearchQuery] = useState('');

  // Form state for creating event
  const [formData, setFormData] = useState({
    title: '',
    category: 'Networking & Gala',
    dateDisplay: '',
    timeDisplay: '',
    locationType: 'hybrid' as 'physical' | 'virtual' | 'hybrid',
    location: '',
    virtualLink: '',
    maxCapacity: 150,
    targetAudience: 'United States Chapter',
    description: ''
  });

  const activeEvent = events.find(e => e.id === selectedEventId);

  const filteredEvents = events.filter(e => {
    if (activeFilter === 'upcoming') return e.status === 'upcoming';
    if (activeFilter === 'past') return e.status === 'past';
    if (activeFilter === 'draft') return e.status === 'draft';
    return true;
  });

  const handleFormSubmit = (status: 'upcoming' | 'draft') => {
    if (!formData.title.trim()) return;

    createEvent({
      ...formData,
      status,
      daysBadge: status === 'draft' ? 'Draft' : 'Upcoming',
      bookedPercentBadge: '0% Booked'
    });

    setIsCreateModalOpen(false);
    setFormData({
      title: '',
      category: 'Networking & Gala',
      dateDisplay: '',
      timeDisplay: '',
      locationType: 'hybrid',
      location: '',
      virtualLink: '',
      maxCapacity: 150,
      targetAudience: 'United States Chapter',
      description: ''
    });
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Header with Title and Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#172B36]">
            Events Management
          </h1>
          <p className="text-xs text-[#71808A] font-medium">
            Schedule galas, chapter webinars, and member assemblies
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-3 py-2 bg-[#006699] hover:bg-[#004B70] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Event</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E6EAED] shadow-xs text-xs font-medium">
        <button
          onClick={() => setActiveFilter('upcoming')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-colors ${
            activeFilter === 'upcoming'
              ? 'bg-[#006699] text-white font-bold shadow-xs'
              : 'text-[#71808A] hover:text-[#172B36]'
          }`}
        >
          Upcoming ({events.filter(e => e.status === 'upcoming').length})
        </button>

        <button
          onClick={() => setActiveFilter('past')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-colors ${
            activeFilter === 'past'
              ? 'bg-[#006699] text-white font-bold shadow-xs'
              : 'text-[#71808A] hover:text-[#172B36]'
          }`}
        >
          Past ({events.filter(e => e.status === 'past').length})
        </button>

        <button
          onClick={() => setActiveFilter('draft')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-colors ${
            activeFilter === 'draft'
              ? 'bg-[#006699] text-white font-bold shadow-xs'
              : 'text-[#71808A] hover:text-[#172B36]'
          }`}
        >
          Drafts ({events.filter(e => e.status === 'draft').length})
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-[#E6EAED] text-center space-y-2">
            <Calendar className="w-10 h-10 text-[#71808A]/40 mx-auto" />
            <h3 className="text-sm font-bold text-[#172B36]">No events scheduled</h3>
            <p className="text-xs text-[#71808A] max-w-xs mx-auto">
              No events found in this category. Click 'New Event' to create an announcement for your chapter.
            </p>
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl border border-[#E6EAED] shadow-xs overflow-hidden hover:border-[#006699]/40 transition-all"
            >
              {/* Event Top Banner */}
              <div className="relative h-36 bg-slate-800">
                <img
                  src={evt.coverImage || '/assets/aistudio/Dashboard_266332e5.png'}
                  alt={evt.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/95 text-[#172B36] text-[11px] font-bold shadow-xs">
                    {evt.daysBadge}
                  </span>
                </div>

                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-[#006699] text-white text-[11px] font-bold">
                    {evt.category}
                  </span>
                </div>
              </div>

              {/* Event Content Details */}
              <div className="p-4 space-y-3">
                <h3 className="text-base font-bold text-[#172B36] leading-snug">
                  {evt.title}
                </h3>

                <div className="space-y-1 text-xs text-[#71808A]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#006699] shrink-0" />
                    <span>{evt.dateDisplay} • {evt.timeDisplay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#006699] shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                </div>

                {/* Progress / Capacity */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#172B36] font-mono tabular-nums">
                      {evt.registeredCount} / {evt.maxCapacity} Registered
                    </span>
                    <span className="text-[#71808A]">
                      {evt.remainingSeats} seats left
                    </span>
                  </div>
                  <div className="w-full bg-[#E6EAED] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#006699] h-full rounded-full"
                      style={{
                        width: `${Math.min(100, (evt.registeredCount / evt.maxCapacity) * 100)}%`
                      }}
                    />
                  </div>
                </div>

                {/* Event Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setSelectedEventId(evt.id)}
                    className="flex-1 py-2 rounded-xl bg-[#006699] hover:bg-[#004B70] text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    Manage & Attendees ({evt.registeredCount})
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                    }}
                    title="Share Event Link"
                    className="p-2 rounded-xl bg-[#F7F9FA] hover:bg-[#E6EAED] border border-[#E6EAED] text-[#71808A]"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Event Modal / Bottom Sheet */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#E6EAED] flex items-center justify-between bg-[#F7F9FA]">
              <div>
                <h3 className="text-base font-bold text-[#172B36]">
                  Create Chapter Event
                </h3>
                <p className="text-xs text-[#71808A]">
                  Publish an official event for {activeChapter.name}
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#71808A]"
              >
                ✕
              </button>
            </div>

            {/* Modal Form Scrollable */}
            <div className="p-4 overflow-y-auto space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Event Title *</label>
                <input
                  type="text"
                  placeholder="e.g. 2027 Annual Alumni Gala & Awards"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs focus:ring-1 focus:ring-[#006699]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#172B36]">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  >
                    <option value="Annual Gala">Annual Gala</option>
                    <option value="Networking & Mixer">Networking & Mixer</option>
                    <option value="General Assembly">General Assembly</option>
                    <option value="Webinar / Masterclass">Webinar / Masterclass</option>
                    <option value="Mentorship Session">Mentorship Session</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#172B36]">Format</label>
                  <select
                    value={formData.locationType}
                    onChange={(e) => setFormData({ ...formData, locationType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  >
                    <option value="physical">In-Person Only</option>
                    <option value="virtual">Virtual Only</option>
                    <option value="hybrid">Hybrid (Both)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#172B36]">Date *</label>
                  <input
                    type="text"
                    placeholder="e.g. Saturday, Dec 12, 2026"
                    value={formData.dateDisplay}
                    onChange={(e) => setFormData({ ...formData, dateDisplay: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#172B36]">Time *</label>
                  <input
                    type="text"
                    placeholder="e.g. 6:00 PM EST"
                    value={formData.timeDisplay}
                    onChange={(e) => setFormData({ ...formData, timeDisplay: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Physical Location / Venue</label>
                <input
                  type="text"
                  placeholder="e.g. University Club of New York, 1 W 54th St"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                />
              </div>

              {(formData.locationType === 'virtual' || formData.locationType === 'hybrid') && (
                <div className="space-y-1">
                  <label className="font-bold text-[#172B36]">Virtual Meeting Link</label>
                  <input
                    type="text"
                    placeholder="https://zoom.us/j/... or Google Meet URL"
                    value={formData.virtualLink}
                    onChange={(e) => setFormData({ ...formData, virtualLink: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#172B36]">Target Audience</label>
                  <select
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  >
                    <option value="Organization-wide">Entire Organization</option>
                    <option value="United States Chapter">United States Chapter</option>
                    <option value="New York Sub-Chapter">New York Sub-Chapter</option>
                    <option value="Executive Fellows">Executive Fellows Only</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#172B36]">Max Capacity</label>
                  <input
                    type="number"
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData({ ...formData, maxCapacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Description</label>
                <textarea
                  rows={3}
                  placeholder="Provide event details, dress code, speaker announcements..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-3 border-t border-[#E6EAED] bg-[#F7F9FA] flex items-center justify-between gap-2">
              <button
                onClick={() => handleFormSubmit('draft')}
                className="py-2.5 px-4 rounded-xl border border-[#E6EAED] bg-white text-[#172B36] font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                Save as Draft
              </button>

              <button
                onClick={() => handleFormSubmit('upcoming')}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#006699] hover:bg-[#004B70] text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                Publish Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Event & Attendees Roster Modal */}
      {activeEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-[#E6EAED] flex items-center justify-between bg-[#F7F9FA]">
              <div>
                <h3 className="text-base font-bold text-[#172B36]">
                  {activeEvent.title}
                </h3>
                <p className="text-xs text-[#71808A]">
                  Attendee Roster • {activeEvent.registeredCount} Registered
                </p>
              </div>
              <button
                onClick={() => setSelectedEventId(null)}
                className="w-8 h-8 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#71808A]"
              >
                ✕
              </button>
            </div>

            {/* Search Attendees */}
            <div className="p-3 border-b border-[#E6EAED]">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#71808A] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search attendee by name or email..."
                  value={attendeeSearchQuery}
                  onChange={(e) => setAttendeeSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#F7F9FA] rounded-lg border border-[#E6EAED] text-xs"
                />
              </div>
            </div>

            {/* Attendees List */}
            <div className="p-4 overflow-y-auto space-y-2 flex-1">
              {activeEvent.attendees.length === 0 ? (
                <div className="text-center py-8 text-[#71808A] text-xs">
                  No attendees have registered yet.
                </div>
              ) : (
                activeEvent.attendees
                  .filter(att =>
                    att.name.toLowerCase().includes(attendeeSearchQuery.toLowerCase()) ||
                    att.email.toLowerCase().includes(attendeeSearchQuery.toLowerCase())
                  )
                  .map(att => (
                    <div
                      key={att.id}
                      className="p-3 rounded-xl border border-[#E6EAED] bg-[#F7F9FA]/40 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <h4 className="font-bold text-[#172B36]">{att.name}</h4>
                        <p className="text-[#71808A] text-[11px]">{att.email}</p>
                        <span className="inline-block px-1.5 py-0.5 rounded-sm bg-[#E6F2F7] text-[#006699] text-[10px] font-semibold mt-1">
                          {att.ticketType}
                        </span>
                      </div>

                      {/* Check-in Toggle */}
                      <button
                        onClick={() => toggleCheckInAttendee(activeEvent.id, att.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          att.checkedIn
                            ? 'bg-[#21865B] text-white'
                            : 'bg-white border border-[#E6EAED] text-[#71808A] hover:text-[#172B36]'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{att.checkedIn ? 'Checked In' : 'Check In'}</span>
                      </button>
                    </div>
                  ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-[#E6EAED] bg-[#F7F9FA] flex items-center justify-between text-xs">
              <span className="text-[#71808A]">
                Capacity: {activeEvent.registeredCount}/{activeEvent.maxCapacity} ({activeEvent.remainingSeats} left)
              </span>
              <button
                onClick={() => setSelectedEventId(null)}
                className="px-4 py-2 bg-[#006699] text-white rounded-xl font-semibold"
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
