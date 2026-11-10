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
  Search,
  Share2,
  ChevronRight,
  Info,
  CalendarCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EventItem } from '../../types';
import { MiniCalendar } from './MiniCalendar';

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [attendeeSearchQuery, setAttendeeSearchQuery] = useState('');
  const [modalTab, setModalTab] = useState<'details' | 'attendees'>('details');

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
    if (activeFilter === 'upcoming' && e.status !== 'upcoming') return false;
    if (activeFilter === 'past' && e.status !== 'past') return false;
    if (activeFilter === 'draft' && e.status !== 'draft') return false;

    if (selectedDate) {
      const selMonth = selectedDate.toLocaleString('en-US', { month: 'short' }).toLowerCase();
      const selDay = selectedDate.getDate();
      const dateStr = (e.dateDisplay || '').toLowerCase();
      const hasMonth = dateStr.includes(selMonth);
      const hasDay = dateStr.includes(` ${selDay},`) || dateStr.includes(` ${selDay} `) || dateStr.includes(` ${selDay}`) || (selDay < 10 && dateStr.includes(`0${selDay}`));
      return hasMonth && hasDay;
    }

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
    <div className="space-y-4 pb-24 pt-1">
      {/* 1. Mini Calendar Component on Top After Header */}
      <MiniCalendar
        events={events}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      {/* Top Action Bar with Event Count and New Event Button */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#71808A]">
          {selectedDate
            ? `Events for ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
            : `${filteredEvents.length} ${activeFilter} events`}
        </span>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-3 py-1.5 bg-[#006699] hover:bg-[#004B70] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
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

      {/* Events List — Entire Card is Clickable to View Event Details */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-[#E6EAED] text-center space-y-3">
            <Calendar className="w-10 h-10 text-[#71808A]/40 mx-auto" />
            <h3 className="text-sm font-bold text-[#172B36]">
              {selectedDate
                ? `No events on ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                : 'No events scheduled'}
            </h3>
            <p className="text-xs text-[#71808A] max-w-xs mx-auto">
              {selectedDate
                ? 'Try selecting another day or click below to view all chapter events.'
                : 'No events found in this category. Click \'New Event\' to create an announcement for your chapter.'}
            </p>
            {selectedDate && (
              <button
                onClick={() => setSelectedDate(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E6F2F7] text-[#006699] rounded-xl text-xs font-semibold hover:bg-[#d6eaf3] transition-colors"
              >
                Clear Date Filter
              </button>
            )}
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => {
                setSelectedEventId(evt.id);
                setModalTab('details');
              }}
              className="bg-white rounded-2xl border border-[#E6EAED] shadow-xs overflow-hidden hover:border-[#006699]/40 transition-all cursor-pointer group active:scale-99"
            >
              {/* Event Top Banner */}
              <div className="relative h-36 bg-slate-800">
                <img
                  src={evt.coverImage || '/assets/aistudio/Dashboard_266332e5.png'}
                  alt={evt.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
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
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-[#172B36] leading-snug group-hover:text-[#006699] transition-colors">
                    {evt.title}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-[#71808A] group-hover:text-[#006699] group-hover:translate-x-0.5 transition-transform shrink-0 mt-0.5" />
                </div>

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
                    <span className="font-bold text-[#172B36] tabular-nums">
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

                {/* Quick Hint */}
                <div className="flex items-center justify-between pt-1 border-t border-[#E6EAED]/60 text-[11px]">
                  <span className="text-[#006699] font-semibold flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Tap to view full event details & attendees
                  </span>
                  <span className="text-[#71808A]">
                    {evt.attendees.length} checked
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 2. Full Event Details Modal / Sheet */}
      {activeEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header Banner */}
            <div className="relative h-44 bg-slate-900 shrink-0">
              <img
                src={activeEvent.coverImage || '/assets/aistudio/Dashboard_266332e5.png'}
                alt={activeEvent.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedEventId(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors shadow-xs"
              >
                ✕
              </button>

              {/* Badges on Banner */}
              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-white/95 text-[#172B36] text-[11px] font-bold shadow-xs">
                  {activeEvent.daysBadge}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#006699] text-white text-[11px] font-bold shadow-xs">
                  {activeEvent.category}
                </span>
              </div>

              {/* Title on bottom of banner */}
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-lg font-bold text-white leading-snug drop-shadow-sm">
                  {activeEvent.title}
                </h3>
              </div>
            </div>

            {/* Segmented Control: Event Overview vs Attendee Roster */}
            <div className="p-3 border-b border-[#E6EAED] bg-[#F7F9FA] flex gap-1 text-xs">
              <button
                onClick={() => setModalTab('details')}
                className={`flex-1 py-1.5 rounded-xl font-bold transition-colors ${
                  modalTab === 'details'
                    ? 'bg-[#006699] text-white shadow-xs'
                    : 'bg-white text-[#71808A] border border-[#E6EAED] hover:bg-slate-50'
                }`}
              >
                Event Details
              </button>
              <button
                onClick={() => setModalTab('attendees')}
                className={`flex-1 py-1.5 rounded-xl font-bold transition-colors ${
                  modalTab === 'attendees'
                    ? 'bg-[#006699] text-white shadow-xs'
                    : 'bg-white text-[#71808A] border border-[#E6EAED] hover:bg-slate-50'
                }`}
              >
                Attendees ({activeEvent.registeredCount})
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-4 overflow-y-auto space-y-4 text-xs flex-1">
              {modalTab === 'details' ? (
                <>
                  {/* Schedule & Venue Card */}
                  <div className="p-3 bg-[#F7F9FA] rounded-xl border border-[#E6EAED] space-y-2">
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#006699] mt-0.5 shrink-0" />
                      <div>
                        <span className="font-bold text-[#172B36] block">Date & Time</span>
                        <p className="text-[#71808A]">{activeEvent.dateDisplay} • {activeEvent.timeDisplay}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 pt-1 border-t border-[#E6EAED]/60">
                      <MapPin className="w-4 h-4 text-[#006699] mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <span className="font-bold text-[#172B36] block">Venue / Location</span>
                        <p className="text-[#71808A]">{activeEvent.location}</p>
                      </div>
                    </div>

                    {activeEvent.virtualLink && (
                      <div className="flex items-start gap-2.5 pt-1 border-t border-[#E6EAED]/60">
                        <Video className="w-4 h-4 text-[#21865B] mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <span className="font-bold text-[#172B36] block">Virtual Meeting</span>
                          <a
                            href={activeEvent.virtualLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#006699] hover:underline flex items-center gap-1 font-semibold break-all"
                          >
                            <span>{activeEvent.virtualLink}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Capacity & Registrations Card */}
                  <div className="p-3 bg-white rounded-xl border border-[#E6EAED] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#172B36]">Attendance Capacity</span>
                      <span className="font-bold text-[#006699] tabular-nums">
                        {activeEvent.registeredCount} / {activeEvent.maxCapacity} ({Math.round((activeEvent.registeredCount / activeEvent.maxCapacity) * 100)}%)
                      </span>
                    </div>

                    <div className="w-full bg-[#E6EAED] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#006699] h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (activeEvent.registeredCount / activeEvent.maxCapacity) * 100)}%`
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#71808A]">
                      <span>Remaining Seats: <strong className="text-[#172B36]">{activeEvent.remainingSeats}</strong></span>
                      <span>Audience: <strong className="text-[#172B36]">{activeEvent.targetAudience}</strong></span>
                    </div>
                  </div>

                  {/* Description & Agenda */}
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-[#172B36] uppercase tracking-wider text-[10px]">
                      Event Description & Agenda
                    </h4>
                    <div className="p-3 bg-[#F7F9FA] rounded-xl border border-[#E6EAED] text-xs text-[#172B36] leading-relaxed">
                      {activeEvent.description || 'Join fellow chapter alumni for an evening of insightful addresses, peer networking, and executive collaboration.'}
                    </div>
                  </div>

                  {/* Action Shortcuts */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => setModalTab('attendees')}
                      className="p-2.5 rounded-xl border border-[#E6EAED] bg-white hover:bg-slate-50 flex items-center justify-center gap-1.5 font-semibold text-[#172B36]"
                    >
                      <Users className="w-4 h-4 text-[#006699]" />
                      <span>View Attendees ({activeEvent.registeredCount})</span>
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.href);
                        alert('Event invitation link copied to clipboard!');
                      }}
                      className="p-2.5 rounded-xl border border-[#E6EAED] bg-white hover:bg-slate-50 flex items-center justify-center gap-1.5 font-semibold text-[#172B36]"
                    >
                      <Share2 className="w-4 h-4 text-[#006699]" />
                      <span>Share Event Link</span>
                    </button>
                  </div>
                </>
              ) : (
                /* Attendee Roster Sub-Tab */
                <div className="space-y-3">
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

                  <div className="space-y-2">
                    {activeEvent.attendees.length === 0 ? (
                      <div className="text-center py-8 text-[#71808A] text-xs">
                        No attendees registered yet.
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
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-[#E6EAED] bg-[#F7F9FA] flex items-center justify-between text-xs">
              <span className="text-[#71808A]">
                {activeEvent.chapterName}
              </span>
              <button
                onClick={() => setSelectedEventId(null)}
                className="px-4 py-2 bg-[#006699] text-white rounded-xl font-semibold hover:bg-[#004B70] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
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
    </div>
  );
};
