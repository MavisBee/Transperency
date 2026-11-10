import React, { useState } from 'react';
import {
  FileText,
  Megaphone,
  Vote,
  Users2,
  DollarSign,
  ClipboardList,
  Settings,
  ChevronRight,
  ArrowLeft,
  Plus,
  Send,
  Upload,
  CheckCircle2,
  Clock,
  ShieldAlert,
  User,
  Sliders,
  BellRing
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';

export const MoreTab: React.FC = () => {
  const {
    activeChapter,
    announcements,
    publishAnnouncement,
    minutes,
    uploadMinutes,
    events,
    elections,
    communities,
    auditLogs,
    currentMetrics,
    userRole,
    setUserRole
  } = useApp();

  const [activeSection, setActiveSection] = useState<
    'menu' | 'minutes' | 'announcements' | 'elections' | 'communities' | 'financials' | 'audit_log' | 'settings'
  >('menu');

  // Form states
  const [isAnnounceModalOpen, setIsAnnounceModalOpen] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    message: '',
    targetAudience: 'All United States Chapter Members',
    attachmentName: ''
  });

  const [isUploadMinutesOpen, setIsUploadMinutesOpen] = useState(false);
  const [minutesForm, setMinutesForm] = useState({
    title: '',
    meetingDate: '',
    meetingType: 'Executive Board',
    associatedEventTitle: '',
    description: ''
  });

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementForm.title.trim()) return;

    publishAnnouncement({
      title: announcementForm.title,
      message: announcementForm.message,
      targetAudience: announcementForm.targetAudience,
      attachmentName: announcementForm.attachmentName || undefined
    });

    setIsAnnounceModalOpen(false);
    setAnnouncementForm({
      title: '',
      message: '',
      targetAudience: 'All United States Chapter Members',
      attachmentName: ''
    });
  };

  const handleUploadMinutes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!minutesForm.title.trim()) return;

    uploadMinutes({
      title: minutesForm.title,
      meetingDate: minutesForm.meetingDate || new Date().toLocaleDateString(),
      meetingType: minutesForm.meetingType,
      associatedEventTitle: minutesForm.associatedEventTitle || undefined,
      description: minutesForm.description
    });

    setIsUploadMinutesOpen(false);
    setMinutesForm({
      title: '',
      meetingDate: '',
      meetingType: 'Executive Board',
      associatedEventTitle: '',
      description: ''
    });
  };

  const menuItems = [
    {
      id: 'announcements' as const,
      title: 'Announcements Broadcaster',
      subtitle: `${announcements.length} published bulletins & notices`,
      icon: Megaphone,
      color: 'bg-blue-50 text-[#006699]'
    },
    {
      id: 'minutes' as const,
      title: 'Meeting Minutes Registry',
      subtitle: `${minutes.length} signed executive & general assembly minutes`,
      icon: FileText,
      color: 'bg-emerald-50 text-[#21865B]'
    },
    {
      id: 'elections' as const,
      title: 'Elections & Ballots',
      subtitle: 'Monitor voting tallies & executive transitions',
      icon: Vote,
      color: 'bg-amber-50 text-[#D99A2B]'
    },
    {
      id: 'communities' as const,
      title: 'Communities & Sections',
      subtitle: `${communities.length} alumni interest guilds & networks`,
      icon: Users2,
      color: 'bg-purple-50 text-purple-700'
    },
    {
      id: 'financials' as const,
      title: 'Dues & Financial Ledger',
      subtitle: `${currentMetrics.duesCollectedFormatted} collected • ${currentMetrics.outstandingBalanceFormatted}`,
      icon: DollarSign,
      color: 'bg-teal-50 text-teal-700'
    },
    {
      id: 'audit_log' as const,
      title: 'Administrative Audit Trail',
      subtitle: 'Immutable record of approvals & actions',
      icon: ClipboardList,
      color: 'bg-slate-100 text-[#172B36]'
    },
    {
      id: 'settings' as const,
      title: 'Settings & Administration',
      subtitle: 'Roles, notification preferences, chapter setup',
      icon: Settings,
      color: 'bg-sky-50 text-[#004B70]'
    }
  ];

  return (
    <div className="space-y-4 pb-24">
      {/* Back button when inside sub-section */}
      {activeSection !== 'menu' && (
        <div className="flex items-center gap-2 pt-1 pb-1">
          <button
            onClick={() => setActiveSection('menu')}
            className="w-8 h-8 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#71808A] hover:text-[#172B36] transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-bold tracking-tight text-[#172B36] capitalize">
              {activeSection.replace('_', ' ')}
            </h2>
            <p className="text-[11px] text-[#71808A] font-medium">
              Transparency Hub • {activeChapter.name}
            </p>
          </div>
        </div>
      )}

      {/* Main Menu Grid / List */}
      {activeSection === 'menu' && (
        <div className="space-y-2.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="w-full text-left bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs hover:border-[#006699]/40 transition-all flex items-center justify-between gap-3 group active:scale-99"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#172B36] group-hover:text-[#006699] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#71808A] mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-[#71808A] group-hover:text-[#006699] group-hover:translate-x-0.5 transition-transform" />
              </button>
            );
          })}
        </div>
      )}

      {/* Sub-view: Announcements */}
      {activeSection === 'announcements' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#172B36]">Published Notices</h2>
            <button
              onClick={() => setIsAnnounceModalOpen(true)}
              className="px-3 py-1.5 bg-[#006699] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Broadcast</span>
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-[#172B36]">{ann.title}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#E6F2F7] text-[#006699] text-[10px] font-bold shrink-0">
                    {ann.status}
                  </span>
                </div>
                <p className="text-xs text-[#71808A] leading-relaxed">{ann.message}</p>
                <div className="flex items-center justify-between pt-2 border-t border-[#E6EAED] text-[11px] text-[#71808A]">
                  <span>Audience: <strong className="text-[#172B36]">{ann.targetAudience}</strong></span>
                  <span>{ann.publishingDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-view: Meeting Minutes */}
      {activeSection === 'minutes' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#172B36]">Official Meeting Minutes</h2>
            <button
              onClick={() => setIsUploadMinutesOpen(true)}
              className="px-3 py-1.5 bg-[#006699] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Minutes</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {minutes.map((m) => (
              <div key={m.id} className="bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#172B36]">{m.title}</h3>
                    <p className="text-xs text-[#006699] font-medium mt-0.5">
                      {m.meetingType} • {m.meetingDate}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-[#21865B]/10 text-[#21865B] text-[10px] font-bold">
                    {m.signaturesVerified} Signatures
                  </span>
                </div>

                {m.description && (
                  <p className="text-xs text-[#71808A]">{m.description}</p>
                )}

                {m.associatedEventTitle && (
                  <p className="text-[11px] text-[#71808A]">
                    Associated Event: <span className="font-semibold text-[#172B36]">{m.associatedEventTitle}</span>
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-[#E6EAED] text-[11px] text-[#71808A]">
                  <span>By {m.uploadedBy}</span>
                  <span>{m.fileSize} • {m.fileType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-view: Elections */}
      {activeSection === 'elections' && (
        <div className="space-y-3">
          {elections.map((el) => (
            <div key={el.id} className="bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-[#172B36]">{el.title}</h3>
                  <p className="text-xs text-[#71808A]">{el.votingPeriod}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#21865B]/10 text-[#21865B] text-[10px] font-bold uppercase">
                  {el.status}
                </span>
              </div>

              {/* Progress */}
              <div className="space-y-1 bg-[#F7F9FA] p-3 rounded-xl border border-[#E6EAED]">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-[#172B36]">Turnout</span>
                  <span className="font-mono">{el.totalVotesCast} / {el.eligibleVoters} Votes Cast</span>
                </div>
                <div className="w-full bg-[#E6EAED] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#006699] h-full rounded-full"
                    style={{ width: `${Math.round((el.totalVotesCast / el.eligibleVoters) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Positions and Candidates */}
              <div className="space-y-3 pt-1">
                {el.positions.map((pos) => (
                  <div key={pos.id} className="space-y-2 border-t border-[#E6EAED] pt-2">
                    <h4 className="text-xs font-bold text-[#172B36]">{pos.title}</h4>
                    <div className="space-y-1.5">
                      {pos.candidates.map((cand) => (
                        <div
                          key={cand.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-[#F7F9FA] text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#E6F2F7] text-[#006699] font-bold text-[10px] flex items-center justify-center">
                              {cand.initials}
                            </div>
                            <span className="font-semibold text-[#172B36]">{cand.name}</span>
                            {cand.isLeading && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#21865B]/10 text-[#21865B] rounded-xs">
                                Leading
                              </span>
                            )}
                          </div>
                          <span className="font-bold font-mono text-[#006699]">{cand.votes} votes</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sub-view: Communities */}
      {activeSection === 'communities' && (
        <div className="space-y-2.5">
          {communities.map((com) => (
            <div key={com.id} className="bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#172B36]">{com.name}</h3>
                  <span className="text-[10px] font-semibold text-[#006699]">{com.category}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#E6F2F7] text-[#006699] text-[10px] font-bold">
                  {com.memberCount} Members
                </span>
              </div>
              <p className="text-xs text-[#71808A]">{com.description}</p>
              <div className="pt-2 border-t border-[#E6EAED] text-xs text-[#71808A] flex items-center justify-between">
                <span>Lead Administrator: <strong className="text-[#172B36]">{com.adminName}</strong></span>
                <span className="text-[#21865B] font-bold capitalize">● {com.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sub-view: Financials & Dues */}
      {activeSection === 'financials' && (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#172B36]">Financial Overview ({activeChapter.currency})</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-[#F7F9FA] rounded-xl border border-[#E6EAED]">
                <span className="text-[#71808A] block">Total Collected</span>
                <span className="text-lg font-bold text-[#21865B] font-mono">
                  {currentMetrics.duesCollectedFormatted}
                </span>
              </div>
              <div className="p-3 bg-[#F7F9FA] rounded-xl border border-[#E6EAED]">
                <span className="text-[#71808A] block">Outstanding Dues</span>
                <span className="text-lg font-bold text-[#D94B4B] font-mono">
                  {currentMetrics.outstandingBalanceFormatted}
                </span>
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-[#172B36]">Collection Progress</span>
                <span className="font-mono text-[#006699] font-bold">{currentMetrics.duesPercent}%</span>
              </div>
              <div className="w-full bg-[#E6EAED] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#006699] h-full rounded-full"
                  style={{ width: `${currentMetrics.duesPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-view: Audit Log */}
      {activeSection === 'audit_log' && (
        <div className="space-y-2">
          {auditLogs.map((log) => (
            <div key={log.id} className="bg-white rounded-xl p-3 border border-[#E6EAED] shadow-xs text-xs space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-[#006699]">{log.adminName}</span>
                <span className="text-[#71808A]">{log.timestamp}</span>
              </div>
              <div className="font-bold text-[#172B36]">{log.action}</div>
              <p className="text-[#71808A]">{log.details}</p>
              <div className="text-[10px] text-[#71808A] font-mono">Record: {log.affectedRecord}</div>
            </div>
          ))}
        </div>
      )}

      {/* Sub-view: Settings */}
      {activeSection === 'settings' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#172B36]">Administrator Profile</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#006699] text-white font-bold text-base flex items-center justify-center">
                MO
              </div>
              <div>
                <h4 className="font-bold text-[#172B36] text-sm">Mavis Okonjo</h4>
                <p className="text-[#006699] font-semibold">{userRole}</p>
                <p className="text-[#71808A]">mavis.okonjo@transparencyhub.org</p>
              </div>
            </div>
          </div>

          {/* Switch Role Simulator */}
          <div className="bg-white rounded-2xl p-4 border border-[#E6EAED] shadow-xs space-y-2.5 text-xs">
            <h3 className="text-sm font-bold text-[#172B36]">Role-Based Access Control (RBAC)</h3>
            <p className="text-[#71808A]">Switch current administrative role to test permission boundaries:</p>
            <div className="grid grid-cols-2 gap-2">
              {(['Chapter Admin', 'Super Admin', 'Finance Admin', 'Community Admin'] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setUserRole(r)}
                  className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                    userRole === r
                      ? 'border-[#006699] bg-[#E6F2F7] text-[#006699]'
                      : 'border-[#E6EAED] bg-white text-[#172B36] hover:bg-slate-50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Announcement Modal */}
      {isAnnounceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[#E6EAED] flex items-center justify-between bg-[#F7F9FA]">
              <h3 className="text-base font-bold text-[#172B36]">Publish Announcement</h3>
              <button onClick={() => setIsAnnounceModalOpen(false)} className="w-8 h-8 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#71808A]">✕</button>
            </div>
            <form onSubmit={handlePublishAnnouncement} className="p-4 space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Title *</label>
                <input
                  type="text"
                  placeholder="e.g. 2027 Chapter Dues Schedule and Early Bird Discount"
                  value={announcementForm.title}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Target Audience</label>
                <select
                  value={announcementForm.targetAudience}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, targetAudience: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                >
                  <option value="Entire Organization">Entire Organization</option>
                  <option value="All United States Chapter Members">All United States Chapter Members</option>
                  <option value="New York Sub-Chapter">New York Sub-Chapter</option>
                  <option value="Executive Fellows">Executive Fellows Guild</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Message *</label>
                <textarea
                  rows={4}
                  placeholder="Type the broadcast message..."
                  value={announcementForm.message}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  required
                />
              </div>

              <div className="p-3 border-t border-[#E6EAED] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAnnounceModalOpen(false)}
                  className="px-4 py-2 border border-[#E6EAED] rounded-xl text-xs font-semibold text-[#71808A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#006699] text-white rounded-xl text-xs font-semibold hover:bg-[#004B70] flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Publish Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Minutes Modal */}
      {isUploadMinutesOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[#E6EAED] flex items-center justify-between bg-[#F7F9FA]">
              <h3 className="text-base font-bold text-[#172B36]">Upload Official Minutes</h3>
              <button onClick={() => setIsUploadMinutesOpen(false)} className="w-8 h-8 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#71808A]">✕</button>
            </div>
            <form onSubmit={handleUploadMinutes} className="p-4 space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Minutes Title *</label>
                <input
                  type="text"
                  placeholder="e.g. October 2026 Executive Council Session"
                  value={minutesForm.title}
                  onChange={(e) => setMinutesForm({ ...minutesForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#172B36]">Meeting Date</label>
                  <input
                    type="text"
                    placeholder="e.g. October 24, 2026"
                    value={minutesForm.meetingDate}
                    onChange={(e) => setMinutesForm({ ...minutesForm, meetingDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#172B36]">Meeting Type</label>
                  <select
                    value={minutesForm.meetingType}
                    onChange={(e) => setMinutesForm({ ...minutesForm, meetingType: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  >
                    <option value="Executive Board">Executive Board</option>
                    <option value="General Assembly">General Assembly</option>
                    <option value="Finance Committee">Finance Committee</option>
                    <option value="Electoral Board">Electoral Board</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Associate with Event (Optional)</label>
                <select
                  value={minutesForm.associatedEventTitle}
                  onChange={(e) => setMinutesForm({ ...minutesForm, associatedEventTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                >
                  <option value="">None / External Meeting</option>
                  {events.map((e) => (
                    <option key={e.id} value={e.title}>{e.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Description / Resolutions</label>
                <textarea
                  rows={3}
                  placeholder="Brief summary of resolutions and key actions..."
                  value={minutesForm.description}
                  onChange={(e) => setMinutesForm({ ...minutesForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                />
              </div>

              <div className="p-3 border-t border-[#E6EAED] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadMinutesOpen(false)}
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
          </div>
        </div>
      )}
    </div>
  );
};
