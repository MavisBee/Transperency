import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Chapter,
  ChapterMetrics,
  MemberApplication,
  EventItem,
  ActivityItem,
  AnnouncementItem,
  MeetingMinutesItem,
  DriveFileItem,
  ElectionItem,
  CommunityItem,
  NotificationItem,
  AuditLogEntry,
  Role,
  RegisteredMember,
  SubscriptionRecord,
  InvoiceRecord,
  SubScreenType,
  MeetingItem
} from '../types';
import {
  INITIAL_CHAPTERS,
  CHAPTER_METRICS_MAP,
  INITIAL_APPLICATIONS,
  INITIAL_EVENTS,
  INITIAL_ACTIVITIES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_MINUTES,
  INITIAL_DRIVE_FILES,
  INITIAL_ELECTIONS,
  INITIAL_COMMUNITIES,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_MEMBERS,
  INITIAL_SUBSCRIPTIONS,
  INITIAL_INVOICES,
  INITIAL_MEETINGS
} from '../data/mockData';

interface AppContextType {
  activeChapterId: string;
  activeChapter: Chapter;
  currentMetrics: ChapterMetrics;
  chapters: Chapter[];
  applications: MemberApplication[];
  registeredMembers: RegisteredMember[];
  subscriptions: SubscriptionRecord[];
  invoices: InvoiceRecord[];
  events: EventItem[];
  meetings: MeetingItem[];
  activities: ActivityItem[];
  announcements: AnnouncementItem[];
  minutes: MeetingMinutesItem[];
  driveFiles: DriveFileItem[];
  elections: ElectionItem[];
  communities: CommunityItem[];
  notifications: NotificationItem[];
  unreadNotifCount: number;
  auditLogs: AuditLogEntry[];
  userRole: Role;
  activeTab: 'home' | 'approvals' | 'events' | 'meet' | 'more' | 'drive';
  activeSubScreen: SubScreenType;
  isMobileFrameEnabled: boolean;
  selectedApplicationId: string | null;
  selectedEventId: string | null;
  selectedMeetingId: string | null;
  liveMeetingRoomId: string | null;
  selectedFileId: string | null;
  selectedMemberId: string | null;
  isChapterSelectorOpen: boolean;
  isNotificationsOpen: boolean;
  isGlobalSearchOpen: boolean;
  globalSearchQuery: string;
  activeQuickAction: 'create_event' | 'make_announcement' | 'upload_minutes' | 'view_approvals' | null;

  setActiveTab: (tab: 'home' | 'approvals' | 'events' | 'meet' | 'more' | 'drive') => void;
  setActiveSubScreen: (sub: SubScreenType) => void;
  setActiveChapterId: (id: string) => void;
  setUserRole: (role: Role) => void;
  setIsMobileFrameEnabled: (val: boolean) => void;
  setSelectedApplicationId: (id: string | null) => void;
  setSelectedEventId: (id: string | null) => void;
  setSelectedMeetingId: (id: string | null) => void;
  setLiveMeetingRoomId: (id: string | null) => void;
  setSelectedFileId: (id: string | null) => void;
  setSelectedMemberId: (id: string | null) => void;
  setIsChapterSelectorOpen: (val: boolean) => void;
  setIsNotificationsOpen: (val: boolean) => void;
  setIsGlobalSearchOpen: (val: boolean) => void;
  setGlobalSearchQuery: (val: string) => void;
  setActiveQuickAction: (action: 'create_event' | 'make_announcement' | 'upload_minutes' | 'view_approvals' | null) => void;

  approveApplication: (id: string, note?: string) => void;
  rejectApplication: (id: string, reason: string) => void;
  requestApplicationInfo: (id: string, message: string) => void;
  addApplicationNote: (appId: string, noteText: string) => void;
  verifyNewMemberReceipt: (applicationId: string, verified: boolean, note?: string) => void;
  simulateUploadReceipt: (applicationId: string, receiptData: { receiptApp: 'Zelle' | 'Bank Wire' | 'Stripe' | 'PayPal' | 'Remita' | 'CashApp' | 'Paystack' | 'Other App'; receiptReference: string; receiptPayerName: string; receiptThumbnail?: string }) => void;
  approveExistingMemberDues: (memberId: string, paymentMethod: string, reference?: string, note?: string) => void;
  bulkApproveExistingDues: (memberIds: string[], paymentMethod: string) => void;
  createEvent: (eventData: Partial<EventItem>) => void;
  createMeeting: (meetingData: Partial<MeetingItem>) => void;
  toggleCheckInAttendee: (eventId: string, attendeeId: string) => void;
  publishAnnouncement: (data: Partial<AnnouncementItem>) => void;
  uploadMinutes: (data: Partial<MeetingMinutesItem>) => void;
  uploadDriveFile: (data: Partial<DriveFileItem>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addAuditLog: (action: string, details: string, affectedRecord: string, category: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeChapterId, setActiveChapterId] = useState<string>('us-chapter');
  const [chapters] = useState<Chapter[]>(INITIAL_CHAPTERS);
  const [applications, setApplications] = useState<MemberApplication[]>(() => {
    const saved = localStorage.getItem('th_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });
  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('th_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });
  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem('th_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });
  const [registeredMembers, setRegisteredMembers] = useState<RegisteredMember[]>(() => {
    const saved = localStorage.getItem('th_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });
  const [subscriptions, setSubscriptions] = useState<SubscriptionRecord[]>(() => {
    const saved = localStorage.getItem('th_subscriptions');
    return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTIONS;
  });
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(() => {
    const saved = localStorage.getItem('th_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(() => {
    const saved = localStorage.getItem('th_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });
  const [minutes, setMinutes] = useState<MeetingMinutesItem[]>(() => {
    const saved = localStorage.getItem('th_minutes');
    return saved ? JSON.parse(saved) : INITIAL_MINUTES;
  });
  const [driveFiles, setDriveFiles] = useState<DriveFileItem[]>(() => {
    const saved = localStorage.getItem('th_drive_files');
    return saved ? JSON.parse(saved) : INITIAL_DRIVE_FILES;
  });
  const [meetings, setMeetings] = useState<MeetingItem[]>(() => {
    const saved = localStorage.getItem('th_meetings');
    return saved ? JSON.parse(saved) : INITIAL_MEETINGS;
  });
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);
  const [liveMeetingRoomId, setLiveMeetingRoomId] = useState<string | null>(null);
  const [elections] = useState<ElectionItem[]>(INITIAL_ELECTIONS);
  const [communities] = useState<CommunityItem[]>(INITIAL_COMMUNITIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('th_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('th_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [userRole, setUserRole] = useState<Role>('Chapter Admin');
  const [activeTab, setActiveTab] = useState<'home' | 'approvals' | 'events' | 'meet' | 'more' | 'drive'>('home');
  const [activeSubScreen, setActiveSubScreen] = useState<SubScreenType>(null);
  const [isMobileFrameEnabled, setIsMobileFrameEnabled] = useState<boolean>(true);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [isChapterSelectorOpen, setIsChapterSelectorOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState<boolean>(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [activeQuickAction, setActiveQuickAction] = useState<'create_event' | 'make_announcement' | 'upload_minutes' | 'view_approvals' | null>(null);

  // Sync state to local storage for persistence across reloads
  useEffect(() => {
    localStorage.setItem('th_applications', JSON.stringify(applications));
  }, [applications]);
  useEffect(() => {
    localStorage.setItem('th_members', JSON.stringify(registeredMembers));
  }, [registeredMembers]);
  useEffect(() => {
    localStorage.setItem('th_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);
  useEffect(() => {
    localStorage.setItem('th_invoices', JSON.stringify(invoices));
  }, [invoices]);
  useEffect(() => {
    localStorage.setItem('th_events', JSON.stringify(events));
  }, [events]);
  useEffect(() => {
    localStorage.setItem('th_meetings', JSON.stringify(meetings));
  }, [meetings]);
  useEffect(() => {
    localStorage.setItem('th_activities', JSON.stringify(activities));
  }, [activities]);
  useEffect(() => {
    localStorage.setItem('th_announcements', JSON.stringify(announcements));
  }, [announcements]);
  useEffect(() => {
    localStorage.setItem('th_minutes', JSON.stringify(minutes));
  }, [minutes]);
  useEffect(() => {
    localStorage.setItem('th_drive_files', JSON.stringify(driveFiles));
  }, [driveFiles]);
  useEffect(() => {
    localStorage.setItem('th_notifications', JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    localStorage.setItem('th_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const activeChapter = chapters.find(c => c.id === activeChapterId) || chapters[0];
  const currentMetrics = CHAPTER_METRICS_MAP[activeChapterId] || CHAPTER_METRICS_MAP['us-chapter'];
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const addAuditLog = (action: string, details: string, affectedRecord: string, category: string) => {
    const newLog: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      adminName: 'Mavis Okonjo',
      action,
      details,
      affectedRecord,
      category
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const approveApplication = (id: string, note?: string) => {
    const target = applications.find(a => a.id === id);
    if (!target) return;

    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status: 'approved',
          adminNotes: note
            ? [...app.adminNotes, { id: `n-${Date.now()}`, author: 'Mavis Okonjo', text: note, timestamp: 'Just now' }]
            : app.adminNotes
        };
      }
      return app;
    }));

    // Record activity
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: 'Mavis Okonjo',
      description: `Approved membership application for ${target.fullName} (${target.membershipType}).`,
      referenceText: `Ref: #${target.id}`,
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
      authorName: 'Mavis Okonjo',
      authorInitials: 'MO',
      type: 'approval'
    };
    setActivities(prev => [newActivity, ...prev]);

    addAuditLog('Application Approved', `Approved ${target.fullName} as ${target.membershipType}`, target.id, 'Membership');
  };

  const rejectApplication = (id: string, reason: string) => {
    const target = applications.find(a => a.id === id);
    if (!target) return;

    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status: 'rejected',
          rejectionReason: reason,
          adminNotes: [
            ...app.adminNotes,
            { id: `n-${Date.now()}`, author: 'Mavis Okonjo', text: `Application rejected: ${reason}`, timestamp: 'Just now' }
          ]
        };
      }
      return app;
    }));

    addAuditLog('Application Rejected', `Rejected ${target.fullName}: ${reason}`, target.id, 'Membership');
  };

  const requestApplicationInfo = (id: string, message: string) => {
    const target = applications.find(a => a.id === id);
    if (!target) return;

    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status: 'info_requested',
          adminNotes: [
            ...app.adminNotes,
            { id: `n-${Date.now()}`, author: 'Mavis Okonjo', text: `Requested information: "${message}"`, timestamp: 'Just now' }
          ]
        };
      }
      return app;
    }));

    addAuditLog('Info Requested', `Requested more info from ${target.fullName}`, target.id, 'Membership');
  };

  const addApplicationNote = (appId: string, noteText: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          adminNotes: [
            ...app.adminNotes,
            { id: `n-${Date.now()}`, author: 'Mavis Okonjo', text: noteText, timestamp: 'Just now' }
          ]
        };
      }
      return app;
    }));
  };

  const createEvent = (eventData: Partial<EventItem>) => {
    const newEvt: EventItem = {
      id: `evt-${Date.now()}`,
      title: eventData.title || 'Untitled Chapter Event',
      coverImage: eventData.coverImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
      daysBadge: 'Upcoming',
      bookedPercentBadge: '0% Booked',
      dateDisplay: eventData.dateDisplay || 'Upcoming Date',
      timeDisplay: eventData.timeDisplay || 'TBD',
      location: eventData.location || 'TBD',
      locationType: eventData.locationType || 'physical',
      virtualLink: eventData.virtualLink,
      chapterId: activeChapterId,
      chapterName: activeChapter.name,
      registeredCount: 0,
      maxCapacity: eventData.maxCapacity || 100,
      remainingSeats: eventData.maxCapacity || 100,
      status: eventData.status || 'upcoming',
      category: eventData.category || 'Alumni Gathering',
      description: eventData.description || '',
      targetAudience: eventData.targetAudience || 'Chapter Members',
      attendees: []
    };

    setEvents(prev => [newEvt, ...prev]);

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: 'Mavis Okonjo',
      description: `Created new event: "${newEvt.title}" for ${activeChapter.name}.`,
      referenceText: `Event #${newEvt.id}`,
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
      authorName: 'Mavis Okonjo',
      authorInitials: 'MO',
      type: 'event'
    };
    setActivities(prev => [newActivity, ...prev]);
    addAuditLog('Event Created', `Created "${newEvt.title}"`, newEvt.id, 'Events');
  };

  const createMeeting = (meetingData: Partial<MeetingItem>) => {
    const newMeet: MeetingItem = {
      id: `meet-${Date.now()}`,
      title: meetingData.title || 'Chapter Meeting',
      type: meetingData.type || 'Sub-Chapter Sync',
      dateDisplay: meetingData.dateDisplay || 'Upcoming',
      timeDisplay: meetingData.timeDisplay || 'TBD',
      timestamp: new Date().toISOString(),
      duration: meetingData.duration || '45 mins',
      status: meetingData.status || 'upcoming',
      platform: meetingData.platform || 'Built-in Meet',
      meetingUrl: meetingData.meetingUrl || `https://meet.transparencyhub.org/room-${Date.now().toString().slice(-4)}`,
      roomCode: meetingData.roomCode || `TH-${activeChapter.code}-${Date.now().toString().slice(-4)}`,
      hostName: 'Mavis Okonjo (Admin)',
      chapterId: activeChapterId,
      chapterName: activeChapter.name,
      subChapterName: meetingData.subChapterName,
      targetAudience: meetingData.targetAudience || 'Chapter Members',
      attendeesCount: 1,
      maxAttendees: meetingData.maxAttendees || 100,
      agenda: meetingData.agenda || ['1. Meeting opening and roll call', '2. Statutory discussion points'],
      notes: meetingData.notes || ''
    };

    setMeetings(prev => [newMeet, ...prev]);

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: 'Mavis Okonjo',
      description: `Scheduled meeting: "${newMeet.title}" for ${activeChapter.name}.`,
      referenceText: `Room: #${newMeet.roomCode}`,
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
      authorName: 'Mavis Okonjo',
      authorInitials: 'MO',
      type: 'event'
    };
    setActivities(prev => [newActivity, ...prev]);
    addAuditLog('Meeting Scheduled', `Created meeting "${newMeet.title}" (${newMeet.type})`, newMeet.id, 'Meetings');
  };

  const verifyNewMemberReceipt = (applicationId: string, verified: boolean, note?: string) => {
    const target = applications.find(a => a.id === applicationId);
    if (!target) return;

    if (verified) {
      setApplications(prev => prev.map(app => {
        if (app.id === applicationId) {
          return {
            ...app,
            status: 'approved',
            paymentStatus: 'paid',
            receiptVerified: true,
            adminNotes: [
              ...app.adminNotes,
              { id: `n-${Date.now()}`, author: 'Mavis Okonjo', text: `3rd-party ${app.receiptApp || 'payment'} receipt verified. Candidate inducted. ${note || ''}`.trim(), timestamp: 'Just now' }
            ]
          };
        }
        return app;
      }));

      // Induct as registered member if not already registered
      const alreadyMember = registeredMembers.some(m => m.email.toLowerCase() === target.email.toLowerCase());
      if (!alreadyMember) {
        const newMember: RegisteredMember = {
          id: `MEM-${Math.floor(1000 + Math.random() * 9000)}`,
          fullName: target.fullName,
          initials: target.initials,
          avatarUrl: target.avatarUrl,
          email: target.email,
          phone: target.phone,
          membershipType: target.membershipType,
          chapterId: target.chapterId,
          subChapterName: target.subChapterName,
          status: 'active',
          duesStatus: 'up_to_date',
          duesAmount: target.membershipFee,
          duesCycle: '2026/2027 Annual Dues',
          duesApprovedByAdmin: true,
          duesApprovalDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          duesPaymentMethod: `${target.receiptApp || '3rd-Party App'} Receipt Verified`,
          duesReference: target.receiptReference || target.paymentReference,
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          graduationYear: target.graduationYear
        };
        setRegisteredMembers(prev => [newMember, ...prev]);
      }

      addAuditLog('New Member Receipt Verified', `Verified ${target.receiptApp || '3rd-party'} receipt for ${target.fullName}. Inducted as active member.`, target.id, 'Verification');
    } else {
      setApplications(prev => prev.map(app => {
        if (app.id === applicationId) {
          return {
            ...app,
            receiptVerified: false,
            status: 'info_requested',
            adminNotes: [
              ...app.adminNotes,
              { id: `n-${Date.now()}`, author: 'Mavis Okonjo', text: `Receipt issue: ${note || 'Receipt verification unsuccessful. Please re-upload legible 3rd-party receipt.'}`, timestamp: 'Just now' }
            ]
          };
        }
        return app;
      }));

      addAuditLog('Receipt Clarification Requested', `Requested receipt update from ${target.fullName}: ${note || 'Illegible receipt'}`, target.id, 'Verification');
    }
  };

  const simulateUploadReceipt = (applicationId: string, receiptData: { receiptApp: 'Zelle' | 'Bank Wire' | 'Stripe' | 'PayPal' | 'Remita' | 'CashApp' | 'Paystack' | 'Other App'; receiptReference: string; receiptPayerName: string; receiptThumbnail?: string }) => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: 'pending',
          paymentStatus: 'paid',
          amountPaid: app.membershipFee,
          outstandingBalance: 0,
          receiptApp: receiptData.receiptApp,
          receiptReference: receiptData.receiptReference,
          receiptDate: 'Just now',
          receiptPayerName: receiptData.receiptPayerName,
          receiptThumbnail: receiptData.receiptThumbnail || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
          receiptVerified: false,
          isNewMember: true
        };
      }
      return app;
    }));

    addAuditLog('Receipt Uploaded', `New member candidate uploaded ${receiptData.receiptApp} payment receipt (${receiptData.receiptReference})`, applicationId, 'Verification');
  };

  const approveExistingMemberDues = (memberId: string, paymentMethod: string, reference?: string, note?: string) => {
    const target = registeredMembers.find(m => m.id === memberId);
    if (!target) return;

    const ref = reference || `TREAS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    setRegisteredMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          duesStatus: 'up_to_date',
          duesApprovedByAdmin: true,
          duesApprovalDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          duesPaymentMethod: paymentMethod,
          duesReference: ref
        };
      }
      return m;
    }));

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: 'Mavis Okonjo',
      description: `Approved annual dues for existing member ${target.fullName} via ${paymentMethod} (No receipt required).`,
      referenceText: `Dues Ref: #${ref}`,
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
      authorName: 'Mavis Okonjo',
      authorInitials: 'MO',
      type: 'disbursement'
    };
    setActivities(prev => [newActivity, ...prev]);

    addAuditLog('Existing Dues Approved', `Direct clearance of annual dues for ${target.fullName} via ${paymentMethod}. (No receipt required)`, target.id, 'Dues');
  };

  const bulkApproveExistingDues = (memberIds: string[], paymentMethod: string) => {
    setRegisteredMembers(prev => prev.map(m => {
      if (memberIds.includes(m.id)) {
        return {
          ...m,
          duesStatus: 'up_to_date',
          duesApprovedByAdmin: true,
          duesApprovalDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          duesPaymentMethod: paymentMethod,
          duesReference: `TREAS-BULK-${Date.now().toString().slice(-4)}`
        };
      }
      return m;
    }));

    addAuditLog('Bulk Dues Clearance', `Admin approved dues for ${memberIds.length} existing members via ${paymentMethod} (No receipt required).`, 'BULK', 'Dues');
  };

  const toggleCheckInAttendee = (eventId: string, attendeeId: string) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return {
          ...evt,
          attendees: evt.attendees.map(att => att.id === attendeeId ? { ...att, checkedIn: !att.checkedIn } : att)
        };
      }
      return evt;
    }));
  };

  const publishAnnouncement = (data: Partial<AnnouncementItem>) => {
    const newAnn: AnnouncementItem = {
      id: `ann-${Date.now()}`,
      title: data.title || 'Announcement',
      message: data.message || '',
      targetAudience: data.targetAudience || 'All Chapter Members',
      chapterId: activeChapterId,
      publishingDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: 'Mavis Okonjo (Admin)',
      status: data.status || 'published',
      attachmentName: data.attachmentName
    };

    setAnnouncements(prev => [newAnn, ...prev]);

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: 'Mavis Okonjo',
      description: `Published announcement: "${newAnn.title}".`,
      referenceText: `Target: ${newAnn.targetAudience}`,
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
      authorName: 'Mavis Okonjo',
      authorInitials: 'MO',
      type: 'announcement'
    };
    setActivities(prev => [newActivity, ...prev]);
    addAuditLog('Announcement Published', `Published "${newAnn.title}" to ${newAnn.targetAudience}`, newAnn.id, 'Communications');
  };

  const uploadMinutes = (data: Partial<MeetingMinutesItem>) => {
    const newMin: MeetingMinutesItem = {
      id: `min-${Date.now()}`,
      title: data.title || 'Official Meeting Minutes',
      meetingDate: data.meetingDate || new Date().toLocaleDateString(),
      chapterId: activeChapterId,
      chapterName: activeChapter.name,
      associatedEventTitle: data.associatedEventTitle,
      uploadedBy: 'Mavis Okonjo',
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      fileType: 'PDF',
      fileSize: '1.8 MB',
      signaturesVerified: 4,
      description: data.description || '',
      meetingType: data.meetingType || 'Executive Board'
    };

    setMinutes(prev => [newMin, ...prev]);

    // Also register in Drive
    const newDriveDoc: DriveFileItem = {
      id: `drv-${Date.now()}`,
      name: `${newMin.title.replace(/[\s/]/g, '_')}.pdf`,
      category: 'Meeting Minutes',
      fileType: 'pdf',
      fileSize: '1.8 MB',
      uploadDate: newMin.uploadDate,
      uploadedBy: 'Mavis Okonjo',
      chapterId: activeChapterId,
      tags: ['Minutes', 'Executive', 'Signed']
    };
    setDriveFiles(prev => [newDriveDoc, ...prev]);

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: 'Mavis Okonjo',
      description: `Uploaded official minutes: "${newMin.title}".`,
      referenceText: `PDF • 1.8 MB • 4 Signatures`,
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
      authorName: 'Mavis Okonjo',
      authorInitials: 'MO',
      type: 'minutes'
    };
    setActivities(prev => [newActivity, ...prev]);
    addAuditLog('Minutes Uploaded', `Uploaded minutes for "${newMin.title}"`, newMin.id, 'Records');
  };

  const uploadDriveFile = (data: Partial<DriveFileItem>) => {
    const newFile: DriveFileItem = {
      id: `drv-${Date.now()}`,
      name: data.name || 'document.pdf',
      category: data.category || 'Organizational Documents',
      fileType: data.fileType || 'pdf',
      fileSize: data.fileSize || '1.2 MB',
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      uploadedBy: 'Mavis Okonjo',
      chapterId: activeChapterId,
      tags: data.tags || ['Document']
    };
    setDriveFiles(prev => [newFile, ...prev]);
    addAuditLog('Drive File Uploaded', `Added file "${newFile.name}" to ${newFile.category}`, newFile.id, 'Drive');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        activeChapterId,
        activeChapter,
        currentMetrics,
        chapters,
        applications,
        registeredMembers,
        subscriptions,
        invoices,
        events,
        meetings,
        activities,
        announcements,
        minutes,
        driveFiles,
        elections,
        communities,
        notifications,
        unreadNotifCount,
        auditLogs,
        userRole,
        activeTab,
        activeSubScreen,
        isMobileFrameEnabled,
        selectedApplicationId,
        selectedEventId,
        selectedMeetingId,
        liveMeetingRoomId,
        selectedFileId,
        selectedMemberId,
        isChapterSelectorOpen,
        isNotificationsOpen,
        isGlobalSearchOpen,
        globalSearchQuery,
        activeQuickAction,

        setActiveTab,
        setActiveSubScreen,
        setActiveChapterId,
        setUserRole,
        setIsMobileFrameEnabled,
        setSelectedApplicationId,
        setSelectedEventId,
        setSelectedMeetingId,
        setLiveMeetingRoomId,
        setSelectedFileId,
        setSelectedMemberId,
        setIsChapterSelectorOpen,
        setIsNotificationsOpen,
        setIsGlobalSearchOpen,
        setGlobalSearchQuery,
        setActiveQuickAction,

        approveApplication,
        rejectApplication,
        requestApplicationInfo,
        addApplicationNote,
        verifyNewMemberReceipt,
        simulateUploadReceipt,
        approveExistingMemberDues,
        bulkApproveExistingDues,
        createEvent,
        createMeeting,
        toggleCheckInAttendee,
        publishAnnouncement,
        uploadMinutes,
        uploadDriveFile,
        markNotificationRead,
        markAllNotificationsRead,
        addAuditLog
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
