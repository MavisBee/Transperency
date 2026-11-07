import {
  Chapter,
  ChapterMetrics,
  MonthlyDuePoint,
  DemographicSegment,
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
  RegisteredMember,
  SubscriptionRecord,
  InvoiceRecord
} from '../types';

export const INITIAL_CHAPTERS: Chapter[] = [
  {
    id: 'us-chapter',
    name: 'United States Chapter',
    code: 'USA-NAT',
    country: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    totalMembers: 1420,
    subChapters: [
      { id: 'us-ny', name: 'New York Sub-Chapter', code: 'NY-01', chapterId: 'us-chapter' },
      { id: 'us-tx', name: 'Texas Sub-Chapter', code: 'TX-02', chapterId: 'us-chapter' },
      { id: 'us-ca', name: 'California Sub-Chapter', code: 'CA-03', chapterId: 'us-chapter' },
      { id: 'us-dc', name: 'Washington D.C. Sub-Chapter', code: 'DC-04', chapterId: 'us-chapter' },
    ]
  },
  {
    id: 'ng-chapter',
    name: 'Nigeria Chapter',
    code: 'NGA-NAT',
    country: 'Nigeria',
    currency: 'NGN',
    currencySymbol: '₦',
    totalMembers: 2150,
    subChapters: [
      { id: 'ng-lagos', name: 'Lagos Sub-Chapter', code: 'LOS-01', chapterId: 'ng-chapter' },
      { id: 'ng-abuja', name: 'Abuja Sub-Chapter', code: 'ABJ-02', chapterId: 'ng-chapter' },
      { id: 'ng-ph', name: 'Port Harcourt Sub-Chapter', code: 'PH-03', chapterId: 'ng-chapter' },
    ]
  },
  {
    id: 'uk-chapter',
    name: 'United Kingdom Chapter',
    code: 'GBR-NAT',
    country: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    totalMembers: 890,
    subChapters: [
      { id: 'uk-london', name: 'London Metropolitan Sub-Chapter', code: 'LDN-01', chapterId: 'uk-chapter' },
      { id: 'uk-manchester', name: 'Manchester & North Sub-Chapter', code: 'MCR-02', chapterId: 'uk-chapter' },
    ]
  },
  {
    id: 'ca-chapter',
    name: 'Canada Chapter',
    code: 'CAN-NAT',
    country: 'Canada',
    currency: 'CAD',
    currencySymbol: 'CA$',
    totalMembers: 640,
    subChapters: [
      { id: 'ca-ontario', name: 'Toronto & Greater Ontario Sub-Chapter', code: 'ONT-01', chapterId: 'ca-chapter' },
      { id: 'ca-bc', name: 'Vancouver & British Columbia Sub-Chapter', code: 'BC-02', chapterId: 'ca-chapter' },
    ]
  },
  {
    id: 'org-wide',
    name: 'All Chapters (Global Alumni)',
    code: 'GLOBAL',
    country: 'Global',
    currency: 'USD',
    currencySymbol: '$',
    totalMembers: 5100,
    subChapters: []
  }
];

export const CHAPTER_METRICS_MAP: Record<string, ChapterMetrics> = {
  'us-chapter': {
    totalMembers: 1420,
    memberGrowth: '+6.2%',
    activeSubscriptions: 1280,
    pendingRenewals: 42,
    duesCollected: 84200,
    duesTarget: 100000,
    duesCollectedFormatted: '$84.2K',
    duesPercent: 84,
    totalBilling: 100000,
    totalBillingFormatted: '$100K',
    outstandingBalance: 15750,
    outstandingBalanceFormatted: '$15,750 Outstanding'
  },
  'ng-chapter': {
    totalMembers: 2150,
    memberGrowth: '+11.4%',
    activeSubscriptions: 1940,
    pendingRenewals: 88,
    duesCollected: 48500000,
    duesTarget: 60000000,
    duesCollectedFormatted: '₦48.5M',
    duesPercent: 81,
    totalBilling: 60000000,
    totalBillingFormatted: '₦60M',
    outstandingBalance: 11500000,
    outstandingBalanceFormatted: '₦11,500,000 Outstanding'
  },
  'uk-chapter': {
    totalMembers: 890,
    memberGrowth: '+4.8%',
    activeSubscriptions: 810,
    pendingRenewals: 21,
    duesCollected: 62400,
    duesTarget: 75000,
    duesCollectedFormatted: '£62.4K',
    duesPercent: 83,
    totalBilling: 75000,
    totalBillingFormatted: '£75K',
    outstandingBalance: 12600,
    outstandingBalanceFormatted: '£12,600 Outstanding'
  },
  'ca-chapter': {
    totalMembers: 640,
    memberGrowth: '+5.1%',
    activeSubscriptions: 590,
    pendingRenewals: 16,
    duesCollected: 41800,
    duesTarget: 50000,
    duesCollectedFormatted: 'CA$41.8K',
    duesPercent: 84,
    totalBilling: 50000,
    totalBillingFormatted: 'CA$50K',
    outstandingBalance: 8200,
    outstandingBalanceFormatted: 'CA$8,200 Outstanding'
  },
  'org-wide': {
    totalMembers: 5100,
    memberGrowth: '+8.3%',
    activeSubscriptions: 4620,
    pendingRenewals: 167,
    duesCollected: 236900,
    duesTarget: 285000,
    duesCollectedFormatted: '$236.9K',
    duesPercent: 83,
    totalBilling: 285000,
    totalBillingFormatted: '$285K',
    outstandingBalance: 48100,
    outstandingBalanceFormatted: '$48,100 Outstanding'
  }
};

export const MONTHLY_DUES_DATA: MonthlyDuePoint[] = [
  { month: 'Jan', confirmed: 3.2, awaiting: 0.8, status: 'successful' },
  { month: 'Feb', confirmed: 4.1, awaiting: 0.9, status: 'successful' },
  { month: 'Mar', confirmed: 5.5, awaiting: 1.2, status: 'successful' },
  { month: 'Apr', confirmed: 6.0, awaiting: 1.5, status: 'successful' },
  { month: 'May', confirmed: 7.2, awaiting: 1.8, status: 'successful' },
  { month: 'Jun', confirmed: 8.4, awaiting: 2.1, status: 'successful' },
  { month: 'Jul', confirmed: 7.8, awaiting: 2.0, status: 'successful' },
  { month: 'Aug', confirmed: 9.1, awaiting: 2.5, status: 'successful' },
  { month: 'Sep', confirmed: 2.4, awaiting: 10.0, status: 'pending' },
  { month: 'Oct', confirmed: 0.0, awaiting: 0.0, status: 'no-activity' },
];

export const DEMOGRAPHIC_SEGMENTS: DemographicSegment[] = [
  { label: 'Nigeria', percentage: 38, count: 540, color: '#006699' },
  { label: 'USA', percentage: 26, count: 370, color: '#991B6B' },
  { label: 'South Africa', percentage: 20, count: 284, color: '#4F5D75' },
  { label: 'Others', percentage: 16, count: 226, color: '#B36B00' },
];

export const INITIAL_APPLICATIONS: MemberApplication[] = [
  {
    id: 'APP-2025-042',
    fullName: 'Sarah Jenkins',
    initials: 'SJ',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    email: 'sarah.jenkins@alumni-network.org',
    phone: '+1 (212) 555-0192',
    country: 'United States',
    location: 'Brooklyn, New York',
    membershipType: 'Regular Alumnus',
    chapterId: 'us-chapter',
    chapterName: 'United States Chapter',
    subChapterName: 'New York Sub-Chapter',
    section: 'Finance & Banking Guild',
    applicationDate: 'Today, 8:45 AM',
    status: 'awaiting_payment',
    paymentStatus: 'outstanding',
    membershipFee: 150,
    amountPaid: 0,
    outstandingBalance: 150,
    graduationYear: 2018,
    degree: 'B.Sc. Economics & Public Policy',
    responses: [
      { question: 'Why do you wish to join the United States Chapter?', answer: 'To actively participate in mentoring recent graduates entering financial institutions in Wall Street.' },
      { question: 'Previous alumni leadership experience', answer: 'Class Secretary (2016-2018), Co-organizer for Class of 2018 5-Year Reunion.' }
    ],
    adminNotes: [
      { id: 'note-1', author: 'Mavis Okonjo', text: 'Verified student credentials with university registrar portal.', timestamp: '1 hour ago' }
    ]
  },
  {
    id: 'APP-2025-041',
    fullName: 'Dr. Kelechi Okafor',
    initials: 'KO',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    email: 'k.okafor@nyu-langone.org',
    phone: '+1 (646) 555-3810',
    country: 'United States',
    location: 'Manhattan, New York',
    membershipType: 'Executive Tier',
    chapterId: 'us-chapter',
    chapterName: 'United States Chapter',
    subChapterName: 'New York Sub-Chapter',
    section: 'Healthcare & Medicine Guild',
    applicationDate: 'Yesterday, 3:20 PM',
    status: 'pending',
    paymentStatus: 'paid',
    membershipFee: 250,
    amountPaid: 250,
    outstandingBalance: 0,
    paymentReference: 'TXN-NY-992014-OK',
    paymentDate: 'Nov 06, 2026',
    graduationYear: 2011,
    degree: 'MBBS, M.Sc. Health Informatics',
    responses: [
      { question: 'Motivation for joining', answer: 'Looking to establish the Northeast Medical Alumni Mentorship network and sponsor health research awards.' },
      { question: 'Leadership background', answer: 'Vice President of University Medical Students Association (2010).' }
    ],
    adminNotes: [
      { id: 'note-2', author: 'Marcus Vance', text: 'Executive background check clear. Ready for executive board signoff.', timestamp: '3 hours ago' }
    ]
  },
  {
    id: 'APP-2025-040',
    fullName: 'David Adeleke',
    initials: 'DA',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    email: 'd.adeleke@venturecapital.io',
    phone: '+1 (415) 555-7822',
    country: 'United States',
    location: 'San Francisco, California',
    membershipType: 'Lifetime Fellow',
    chapterId: 'us-chapter',
    chapterName: 'United States Chapter',
    subChapterName: 'California Sub-Chapter',
    section: 'Tech & Founders Guild',
    applicationDate: 'Nov 04, 2026',
    status: 'pending',
    paymentStatus: 'paid',
    membershipFee: 1000,
    amountPaid: 1000,
    outstandingBalance: 0,
    paymentReference: 'STRIPE-CHG-993881',
    paymentDate: 'Nov 04, 2026',
    graduationYear: 2008,
    degree: 'B.Eng. Computer Engineering',
    responses: [
      { question: 'Contribution commitment', answer: 'Offering $10k annual fellowship grant for undergraduate innovation awards.' }
    ],
    adminNotes: []
  },
  {
    id: 'APP-2025-039',
    fullName: 'Amara Diallo',
    initials: 'AD',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    email: 'amara.diallo@alumni-network.org',
    phone: '+1 (713) 555-0814',
    country: 'United States',
    location: 'Houston, Texas',
    membershipType: 'Young Alumni',
    chapterId: 'us-chapter',
    chapterName: 'United States Chapter',
    subChapterName: 'Texas Sub-Chapter',
    section: 'Energy & Sustainability',
    applicationDate: 'Nov 02, 2026',
    status: 'pending',
    paymentStatus: 'paid',
    membershipFee: 75,
    amountPaid: 75,
    outstandingBalance: 0,
    paymentReference: 'PAYPAL-991204',
    paymentDate: 'Nov 02, 2026',
    graduationYear: 2024,
    degree: 'B.Sc. Petroleum Engineering',
    responses: [
      { question: 'Why join', answer: 'Connect with alumni energy executives in Houston energy corridor.' }
    ],
    adminNotes: []
  },
  {
    id: 'APP-2025-038',
    fullName: 'Michael Chen',
    initials: 'MC',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    email: 'mchen@columbia.edu',
    phone: '+1 (917) 555-9012',
    country: 'United States',
    location: 'Manhattan, New York',
    membershipType: 'Regular Alumnus',
    chapterId: 'us-chapter',
    chapterName: 'United States Chapter',
    subChapterName: 'New York Sub-Chapter',
    section: 'Legal & Policy Guild',
    applicationDate: 'Oct 30, 2026',
    status: 'awaiting_payment',
    paymentStatus: 'outstanding',
    membershipFee: 150,
    amountPaid: 0,
    outstandingBalance: 150,
    graduationYear: 2017,
    degree: 'LL.M International Law',
    responses: [
      { question: 'Interest', answer: 'Constitutional committee support for association bylaws revision.' }
    ],
    adminNotes: []
  },
  {
    id: 'APP-2025-035',
    fullName: 'Elena Rostova',
    initials: 'EL',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    email: 'elena.rostova@luxuryholdings.com',
    phone: '+1 (310) 555-4921',
    country: 'United States',
    location: 'Los Angeles, California',
    membershipType: 'Executive Tier',
    chapterId: 'us-chapter',
    chapterName: 'United States Chapter',
    subChapterName: 'California Sub-Chapter',
    section: 'Executive Leadership Tier',
    applicationDate: 'Oct 28, 2026',
    status: 'approved',
    paymentStatus: 'paid',
    membershipFee: 500,
    amountPaid: 500,
    outstandingBalance: 0,
    paymentReference: 'REF-#MEM-4491',
    paymentDate: 'Oct 28, 2026',
    graduationYear: 2012,
    degree: 'MBA Global Management',
    responses: [
      { question: 'Executive commitment', answer: 'Direct sponsorship of annual gala venue.' }
    ],
    adminNotes: [
      { id: 'n-elena', author: 'Mavis Okonjo', text: 'Renewal confirmed and credentials updated.', timestamp: 'Oct 29, 2026' }
    ]
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-leadership-gala-2025',
    title: '2025 Global Alumni Leadership Dinner',
    coverImage: '/assets/aistudio/Dashboard_266332e5.png',
    daysBadge: 'In 140 Days',
    bookedPercentBadge: '81% Booked',
    dateDisplay: 'Friday, Nov 15, 2027',
    timeDisplay: '6:30 PM EST',
    location: 'University Club of New York, Manhattan',
    locationType: 'hybrid',
    virtualLink: 'https://meet.transparencyhub.org/alumni-gala-2027',
    chapterId: 'us-chapter',
    chapterName: 'United States Chapter',
    registeredCount: 284,
    maxCapacity: 350,
    remainingSeats: 66,
    status: 'upcoming',
    category: 'Annual Gala',
    description: 'The premier annual gathering of distinguished alumni, chapter executives, and distinguished honorees. Black-tie attire required. Keynote addresses on global alumni endowment growth and student scholarship endowments.',
    targetAudience: 'Organization-wide & United States Chapter',
    attendees: [
      { id: 'att-1', name: 'Marcus Vance', email: 'm.vance@alum.org', ticketType: 'VIP Patron', checkedIn: false, registrationDate: 'Oct 12, 2026' },
      { id: 'att-2', name: 'Elena Rostova', email: 'e.rostova@alum.org', ticketType: 'Executive Table', checkedIn: false, registrationDate: 'Oct 15, 2026' },
      { id: 'att-3', name: 'Dr. Kelechi Okafor', email: 'k.okafor@alum.org', ticketType: 'Standard Member', checkedIn: false, registrationDate: 'Nov 01, 2026' },
      { id: 'att-4', name: 'David Adeleke', email: 'd.adeleke@alum.org', ticketType: 'Fellow Sponsor', checkedIn: false, registrationDate: 'Nov 02, 2026' },
      { id: 'att-5', name: 'Sarah Jenkins', email: 's.jenkins@alum.org', ticketType: 'Standard Member', checkedIn: false, registrationDate: 'Nov 03, 2026' },
    ]
  },
  {
    id: 'evt-spring-tech-summit',
    title: 'Alumni Tech & Founders Venture Roundtable',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
    daysBadge: 'In 24 Days',
    bookedPercentBadge: '94% Booked',
    dateDisplay: 'Thursday, Dec 01, 2026',
    timeDisplay: '5:00 PM PST',
    location: 'Palace of Fine Arts, San Francisco & Online',
    locationType: 'hybrid',
    virtualLink: 'https://zoom.us/j/9928172648',
    chapterId: 'us-chapter',
    chapterName: 'United States Chapter',
    registeredCount: 188,
    maxCapacity: 200,
    remainingSeats: 12,
    status: 'upcoming',
    category: 'Networking',
    description: 'An exclusive demo day and venture capital matchmaking session for alumni tech founders, investors, and startup engineers.',
    targetAudience: 'United States Chapter (California & Virtual)',
    attendees: [
      { id: 'att-6', name: 'David Adeleke', email: 'd.adeleke@alum.org', ticketType: 'Investor Pass', checkedIn: false, registrationDate: 'Nov 01, 2026' },
      { id: 'att-7', name: 'Maya Lin', email: 'mlin@tech.co', ticketType: 'Founder Demo', checkedIn: false, registrationDate: 'Nov 02, 2026' }
    ]
  },
  {
    id: 'evt-agm-2026',
    title: '2026 Annual General Assembly & Elections',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    daysBadge: 'Completed',
    bookedPercentBadge: '100% Attended',
    dateDisplay: 'Saturday, Sep 19, 2026',
    timeDisplay: '10:00 AM EST',
    location: 'Marriott Marquis Convention Hall, New York',
    locationType: 'physical',
    chapterId: 'us-chapter',
    chapterName: 'United States Chapter',
    registeredCount: 420,
    maxCapacity: 420,
    remainingSeats: 0,
    status: 'past',
    category: 'Constitutional Meeting',
    description: 'Official statutory meeting for annual audited accounts presentation, constitution amendments voting, and presidential transition.',
    targetAudience: 'All Chapter Members',
    attendees: []
  }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Marcus Vance',
    description: 'Approved disbursement of $4,200 for annual gala venue reservation deposit.',
    referenceText: 'Disbursement #2025-089',
    referenceLink: '#disbursement',
    timeAgo: '18m ago',
    timestamp: '2026-11-07T06:13:00Z',
    authorName: 'Marcus Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    type: 'disbursement'
  },
  {
    id: 'act-2',
    title: 'Elena Rostova',
    description: 'Submitted renewal for Lifetime Executive membership status.',
    referenceText: 'Executive Tier • Ref: #MEM-4491',
    referenceLink: '#renewal',
    timeAgo: '1h ago',
    timestamp: '2026-11-07T05:31:00Z',
    authorName: 'Elena Rostova',
    authorInitials: 'EL',
    type: 'renewal'
  },
  {
    id: 'act-3',
    title: 'Board Secretariat',
    description: 'Uploaded confirmed minutes: October 2025 National Executive Council Meeting.',
    referenceText: 'PDF • 1.4 MB • 6 Signatures Verified',
    referenceLink: '#minutes',
    timeAgo: '3h ago',
    timestamp: '2026-11-07T03:30:00Z',
    authorName: 'Board Secretariat',
    type: 'minutes'
  },
  {
    id: 'act-4',
    title: 'Mavis Okonjo',
    description: 'Broadcasted announcement "2027 Chapter Dues Schedule and Early Bird Discount" to United States Chapter.',
    referenceText: 'Announcement #ANN-104',
    timeAgo: '5h ago',
    timestamp: '2026-11-07T01:30:00Z',
    authorName: 'Mavis Okonjo',
    type: 'announcement'
  },
  {
    id: 'act-5',
    title: 'Financial Controller',
    description: 'Reconciled 14 batch subscription payments totaling $3,500 via Stripe Gateway.',
    referenceText: 'Batch #STR-2026-B11',
    timeAgo: 'Yesterday',
    timestamp: '2026-11-06T18:00:00Z',
    authorName: 'Financial Controller',
    type: 'disbursement'
  }
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: '2027 Annual Dues Early Renewal Window & Tier Benefits',
    message: 'The National Executive Council announces the opening of the 2027 Annual Dues renewal period. Members settling before December 31 will enjoy early bird ticketing for the Leadership Dinner and continuous access to digital alumni directory perks.',
    targetAudience: 'All United States Chapter Members',
    chapterId: 'us-chapter',
    publishingDate: 'Nov 06, 2026',
    author: 'Mavis Okonjo (Chapter Admin)',
    status: 'published',
    attachmentName: '2027_Dues_Structure.pdf'
  },
  {
    id: 'ann-2',
    title: 'Call for Nominations: 2027-2029 Chapter Executive Board',
    message: 'Nominations are now officially open for positions including Chapter Vice President, Financial Secretary, and Welfare Officer. Please review eligibility guidelines in Drive.',
    targetAudience: 'United States Chapter & Sub-Chapters',
    chapterId: 'us-chapter',
    publishingDate: 'Nov 02, 2026',
    author: 'Electoral Committee Chair',
    status: 'published',
    attachmentName: 'Election_Guidelines_2027.pdf'
  },
  {
    id: 'ann-3',
    title: 'Thanksgiving Networking Breakfast - New York Sub-Chapter',
    message: 'Join fellow alumni in Manhattan for our annual Thanksgiving gratitude breakfast. Special welcome address by our honorary patrons.',
    targetAudience: 'New York Sub-Chapter',
    chapterId: 'us-chapter',
    publishingDate: 'Nov 12, 2026 (Scheduled)',
    author: 'NY Sub-Chapter Chair',
    status: 'scheduled',
    scheduledDate: 'Nov 12, 2026'
  }
];

export const INITIAL_MINUTES: MeetingMinutesItem[] = [
  {
    id: 'min-1',
    title: 'October 2026 National Executive Council Ordinary Session',
    meetingDate: 'October 24, 2026',
    chapterId: 'us-chapter',
    chapterName: 'United States Chapter',
    associatedEventTitle: 'Executive Council Q3 Strategic Retreat',
    uploadedBy: 'Board Secretariat',
    uploadDate: 'Nov 07, 2026',
    fileType: 'PDF',
    fileSize: '1.4 MB',
    signaturesVerified: 6,
    description: 'Adoption of audited financial quarter statements, review of member induction list, and budget approval for Leadership Dinner.',
    meetingType: 'Executive Board'
  },
  {
    id: 'min-2',
    title: 'September 2026 General Assembly Meeting Minutes',
    meetingDate: 'September 19, 2026',
    chapterId: 'us-chapter',
    chapterName: 'United States Chapter',
    associatedEventTitle: '2026 Annual General Assembly & Elections',
    uploadedBy: 'Secretary General',
    uploadDate: 'Sep 25, 2026',
    fileType: 'PDF',
    fileSize: '3.2 MB',
    signaturesVerified: 8,
    description: 'Official record of assembly resolutions, constitutional voting tallies, and executive accountability statements.',
    meetingType: 'General Assembly'
  },
  {
    id: 'min-3',
    title: 'July 2026 Finance & Endowment Committee Minutes',
    meetingDate: 'July 15, 2026',
    chapterId: 'us-chapter',
    chapterName: 'United States Chapter',
    uploadedBy: 'Marcus Vance',
    uploadDate: 'July 18, 2026',
    fileType: 'PDF',
    fileSize: '890 KB',
    signaturesVerified: 4,
    description: 'Discussion on treasury yield optimization, scholarship fund disbursement, and multi-currency exchange hedging.',
    meetingType: 'Finance Committee'
  }
];

export const INITIAL_DRIVE_FILES: DriveFileItem[] = [
  {
    id: 'drv-1',
    name: 'Transparency_Hub_Alumni_Constitution_Amended_2026.pdf',
    category: 'Organizational Documents',
    fileType: 'pdf',
    fileSize: '4.8 MB',
    uploadDate: 'Oct 02, 2026',
    uploadedBy: 'Legal Advisory Board',
    chapterId: 'us-chapter',
    tags: ['Constitution', 'Bylaws', 'Legal', 'Statutory']
  },
  {
    id: 'drv-2',
    name: 'FY2025-2026_Audited_Financial_Statement.xlsx',
    category: 'Financial Records',
    fileType: 'xlsx',
    fileSize: '2.1 MB',
    uploadDate: 'Sep 28, 2026',
    uploadedBy: 'External Auditors (KPMG)',
    chapterId: 'us-chapter',
    tags: ['Audit', 'Financials', 'P&L', 'Treasury']
  },
  {
    id: 'drv-3',
    name: '2025_Global_Leadership_Dinner_Sponsorship_Deck.pdf',
    category: 'Events',
    fileType: 'pdf',
    fileSize: '6.4 MB',
    uploadDate: 'Oct 14, 2026',
    uploadedBy: 'Gala Planning Committee',
    chapterId: 'us-chapter',
    tags: ['Gala', 'Sponsorship', 'Events', 'Dinner']
  },
  {
    id: 'drv-4',
    name: 'Executive_Membership_Code_of_Conduct_v4.pdf',
    category: 'Membership Documents',
    fileType: 'pdf',
    fileSize: '950 KB',
    uploadDate: 'Aug 10, 2026',
    uploadedBy: 'Membership Committee',
    chapterId: 'us-chapter',
    tags: ['Membership', 'Ethics', 'Charter']
  },
  {
    id: 'drv-5',
    name: 'Elections_Nomination_Verification_Form_2027.docx',
    category: 'Elections',
    fileType: 'docx',
    fileSize: '320 KB',
    uploadDate: 'Nov 01, 2026',
    uploadedBy: 'Electoral Commission',
    chapterId: 'us-chapter',
    tags: ['Elections', 'Nomination', 'Ballot']
  },
  {
    id: 'drv-6',
    name: 'Minutes_NEC_October_2026_Signed.pdf',
    category: 'Meeting Minutes',
    fileType: 'pdf',
    fileSize: '1.4 MB',
    uploadDate: 'Nov 07, 2026',
    uploadedBy: 'Board Secretariat',
    chapterId: 'us-chapter',
    tags: ['Minutes', 'Executive', 'Signed']
  }
];

export const INITIAL_ELECTIONS: ElectionItem[] = [
  {
    id: 'elec-2027',
    title: '2027-2029 United States Chapter Executive Council Election',
    chapterId: 'us-chapter',
    chapterName: 'United States Chapter',
    votingPeriod: 'Dec 10, 2026 - Dec 17, 2026',
    status: 'active',
    positionsCount: 4,
    eligibleVoters: 1280,
    totalVotesCast: 742,
    positions: [
      {
        id: 'pos-1',
        title: 'Chapter President & National Delegate',
        description: 'Chief Executive Officer of the United States Chapter, representing over 1,400 members.',
        candidates: [
          { id: 'cand-1', name: 'Dr. Kelechi Okafor', initials: 'KO', bio: 'Distinguished Fellow, Healthcare Leadership Director at NYU.', votes: 412, isLeading: true },
          { id: 'cand-2', name: 'Brenda Miller', initials: 'BM', bio: 'Senior Partner at Morgan Stanley, NY Sub-Chapter Trustee.', votes: 330, isLeading: false }
        ]
      },
      {
        id: 'pos-2',
        title: 'Chapter Vice President (Strategy & Programs)',
        description: 'Oversees regional sub-chapters, alumni professional guilds, and international relations.',
        candidates: [
          { id: 'cand-3', name: 'David Adeleke', initials: 'DA', bio: 'Managing Partner at Silicon Vista Ventures.', votes: 498, isLeading: true },
          { id: 'cand-4', name: 'Susan Ward', initials: 'SW', bio: 'Former Texas Sub-Chapter Secretary.', votes: 244, isLeading: false }
        ]
      }
    ]
  }
];

export const INITIAL_COMMUNITIES: CommunityItem[] = [
  {
    id: 'com-1',
    name: 'Finance, Banking & Private Equity Guild',
    description: 'High-level network of alumni investment bankers, venture capitalists, portfolio managers and financial advisors.',
    chapterId: 'us-chapter',
    chapterName: 'United States Chapter',
    memberCount: 384,
    adminName: 'Marcus Vance',
    status: 'active',
    category: 'Professional Guild'
  },
  {
    id: 'com-2',
    name: 'Healthcare, BioTech & Medicine Council',
    description: 'Physicians, healthcare executives, clinical researchers, and biotech founders exchanging innovations and mentorship.',
    chapterId: 'us-chapter',
    chapterName: 'United States Chapter',
    memberCount: 295,
    adminName: 'Dr. Kelechi Okafor',
    status: 'active',
    category: 'Professional Guild'
  },
  {
    id: 'com-3',
    name: 'Tech Founders, Engineers & AI Innovators',
    description: 'Founders building frontier companies, engineering leaders, and product architects.',
    chapterId: 'us-chapter',
    chapterName: 'United States Chapter',
    memberCount: 410,
    adminName: 'David Adeleke',
    status: 'active',
    category: 'Technology'
  },
  {
    id: 'com-4',
    name: 'Young Alumni & Rising Leaders (Classes 2020-2026)',
    description: 'Transition accelerator providing career guidance, resume roundtables, and relocation assistance.',
    chapterId: 'us-chapter',
    chapterName: 'United States Chapter',
    memberCount: 331,
    adminName: 'Amara Diallo',
    status: 'active',
    category: 'Affinity Group'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Membership Application',
    description: 'Sarah Jenkins submitted an application for Regular Alumnus in New York Sub-Chapter.',
    timeAgo: '15m ago',
    timestamp: '2026-11-07T06:16:00Z',
    read: false,
    category: 'applications',
    targetTab: 'approvals',
    targetId: 'APP-2025-042'
  },
  {
    id: 'notif-2',
    title: 'Dues Payment Awaiting Verification',
    description: 'Michael Chen attempted payment of $150; gateway marked pending verification.',
    timeAgo: '42m ago',
    timestamp: '2026-11-07T05:49:00Z',
    read: false,
    category: 'payments',
    targetTab: 'approvals',
    targetId: 'APP-2025-038'
  },
  {
    id: 'notif-3',
    title: 'Document Uploaded: October Minutes',
    description: 'Board Secretariat uploaded signed minutes for the National Executive Council Meeting.',
    timeAgo: '3h ago',
    timestamp: '2026-11-07T03:31:00Z',
    read: false,
    category: 'documents',
    targetTab: 'drive',
    targetId: 'drv-6'
  },
  {
    id: 'notif-4',
    title: 'Event Milestone Reached',
    description: '2025 Global Leadership Dinner reached 81% booked capacity (284 registered).',
    timeAgo: 'Yesterday',
    timestamp: '2026-11-06T15:00:00Z',
    read: true,
    category: 'events',
    targetTab: 'events',
    targetId: 'evt-leadership-gala-2025'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-1',
    timestamp: 'Nov 07, 2026 06:13 AM',
    adminName: 'Marcus Vance',
    action: 'Disbursement Approved',
    details: 'Authorized $4,200 for venue deposit (Ref: #2025-089)',
    affectedRecord: 'Ledger TXN-89',
    category: 'Financial'
  },
  {
    id: 'aud-2',
    timestamp: 'Nov 07, 2026 05:31 AM',
    adminName: 'Mavis Okonjo',
    action: 'Renewal Validated',
    details: 'Verified Lifetime Executive membership for Elena Rostova',
    affectedRecord: 'APP-2025-035',
    category: 'Membership'
  },
  {
    id: 'aud-3',
    timestamp: 'Nov 07, 2026 03:30 AM',
    adminName: 'Board Secretariat',
    action: 'Document Upload',
    details: 'Uploaded signed NEC October Minutes PDF (1.4 MB)',
    affectedRecord: 'DOC-MIN-OCT26',
    category: 'Records'
  },
  {
    id: 'aud-4',
    timestamp: 'Nov 06, 2026 08:15 PM',
    adminName: 'Mavis Okonjo',
    action: 'Announcement Published',
    details: 'Broadcasted "2027 Annual Dues Early Renewal Window"',
    affectedRecord: 'ANN-001',
    category: 'Communications'
  }
];

export const INITIAL_MEMBERS: RegisteredMember[] = [
  {
    id: 'MEM-4491',
    fullName: 'Elena Rostova',
    initials: 'EL',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    email: 'elena.rostova@luxuryholdings.com',
    phone: '+1 (310) 555-4921',
    membershipType: 'Executive Tier',
    chapterId: 'us-chapter',
    subChapterName: 'California Sub-Chapter',
    status: 'active',
    duesStatus: 'up_to_date',
    joinedDate: 'Oct 28, 2021',
    graduationYear: 2012
  },
  {
    id: 'MEM-4420',
    fullName: 'Marcus Vance',
    initials: 'MV',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    email: 'm.vance@alum.org',
    phone: '+1 (212) 555-4019',
    membershipType: 'Lifetime Fellow',
    chapterId: 'us-chapter',
    subChapterName: 'New York Sub-Chapter',
    status: 'active',
    duesStatus: 'up_to_date',
    joinedDate: 'Sep 14, 2018',
    graduationYear: 2005
  },
  {
    id: 'MEM-3910',
    fullName: 'Dr. Kelechi Okafor',
    initials: 'KO',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    email: 'k.okafor@nyu-langone.org',
    phone: '+1 (646) 555-3810',
    membershipType: 'Executive Tier',
    chapterId: 'us-chapter',
    subChapterName: 'New York Sub-Chapter',
    status: 'active',
    duesStatus: 'up_to_date',
    joinedDate: 'Nov 06, 2026',
    graduationYear: 2011
  },
  {
    id: 'MEM-2841',
    fullName: 'David Adeleke',
    initials: 'DA',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    email: 'd.adeleke@venturecapital.io',
    phone: '+1 (415) 555-7822',
    membershipType: 'Lifetime Fellow',
    chapterId: 'us-chapter',
    subChapterName: 'California Sub-Chapter',
    status: 'active',
    duesStatus: 'up_to_date',
    joinedDate: 'Jan 12, 2019',
    graduationYear: 2008
  },
  {
    id: 'MEM-5012',
    fullName: 'Amara Diallo',
    initials: 'AD',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    email: 'amara.diallo@alumni-network.org',
    phone: '+1 (713) 555-0814',
    membershipType: 'Young Alumni',
    chapterId: 'us-chapter',
    subChapterName: 'Texas Sub-Chapter',
    status: 'active',
    duesStatus: 'up_to_date',
    joinedDate: 'Nov 02, 2026',
    graduationYear: 2024
  },
  {
    id: 'MEM-1904',
    fullName: 'Brenda Miller',
    initials: 'BM',
    email: 'bmiller@morganstanley.com',
    phone: '+1 (212) 555-8911',
    membershipType: 'Executive Tier',
    chapterId: 'us-chapter',
    subChapterName: 'New York Sub-Chapter',
    status: 'pending_renewal',
    duesStatus: 'overdue',
    joinedDate: 'Jun 19, 2017',
    graduationYear: 2009
  },
  {
    id: 'MEM-1102',
    fullName: 'Professor Chidi Nnamdi',
    initials: 'CN',
    email: 'chidi.nnamdi@oxford.edu',
    phone: '+44 20 7946 0912',
    membershipType: 'Lifetime Fellow',
    chapterId: 'ng-chapter',
    subChapterName: 'Lagos Sub-Chapter',
    status: 'active',
    duesStatus: 'up_to_date',
    joinedDate: 'Aug 04, 2012',
    graduationYear: 1998
  }
];

export const INITIAL_SUBSCRIPTIONS: SubscriptionRecord[] = [
  {
    id: 'SUB-901',
    memberId: 'MEM-4491',
    memberName: 'Elena Rostova',
    memberEmail: 'elena.rostova@luxuryholdings.com',
    planTier: 'Executive Tier',
    billingCycle: 'Annual',
    amount: 500,
    currency: 'USD',
    startDate: 'Oct 28, 2026',
    renewalDate: 'Oct 28, 2027',
    status: 'active',
    paymentMethod: 'Mastercard •••• 8812'
  },
  {
    id: 'SUB-902',
    memberId: 'MEM-4420',
    memberName: 'Marcus Vance',
    memberEmail: 'm.vance@alum.org',
    planTier: 'Lifetime Fellow',
    billingCycle: 'Lifetime',
    amount: 1500,
    currency: 'USD',
    startDate: 'Sep 14, 2020',
    renewalDate: 'Perpetual',
    status: 'active',
    paymentMethod: 'Bank Wire #8839'
  },
  {
    id: 'SUB-903',
    memberId: 'MEM-3910',
    memberName: 'Dr. Kelechi Okafor',
    memberEmail: 'k.okafor@nyu-langone.org',
    planTier: 'Executive Tier',
    billingCycle: 'Annual',
    amount: 250,
    currency: 'USD',
    startDate: 'Nov 06, 2026',
    renewalDate: 'Nov 06, 2027',
    status: 'active',
    paymentMethod: 'Visa •••• 4019'
  },
  {
    id: 'SUB-904',
    memberId: 'MEM-1904',
    memberName: 'Brenda Miller',
    memberEmail: 'bmiller@morganstanley.com',
    planTier: 'Executive Tier',
    billingCycle: 'Annual',
    amount: 250,
    currency: 'USD',
    startDate: 'Nov 01, 2025',
    renewalDate: 'Nov 01, 2026',
    status: 'pending_renewal',
    paymentMethod: 'Amex •••• 1004'
  },
  {
    id: 'SUB-905',
    memberId: 'MEM-5012',
    memberName: 'Amara Diallo',
    memberEmail: 'amara.diallo@alumni-network.org',
    planTier: 'Young Alumni',
    billingCycle: 'Annual',
    amount: 75,
    currency: 'USD',
    startDate: 'Nov 02, 2026',
    renewalDate: 'Nov 02, 2027',
    status: 'active',
    paymentMethod: 'PayPal #991204'
  }
];

export const INITIAL_INVOICES: InvoiceRecord[] = [
  {
    id: 'INV-2026-101',
    invoiceNumber: 'INV-101',
    memberName: 'Elena Rostova',
    memberEmail: 'elena.rostova@luxuryholdings.com',
    description: 'Executive Tier 2026/2027 Dues',
    amount: 500,
    amountPaid: 500,
    outstandingBalance: 0,
    issueDate: 'Oct 28, 2026',
    dueDate: 'Nov 15, 2026',
    status: 'paid',
    chapterId: 'us-chapter'
  },
  {
    id: 'INV-2026-102',
    invoiceNumber: 'INV-102',
    memberName: 'Brenda Miller',
    memberEmail: 'bmiller@morganstanley.com',
    description: 'Executive Annual Dues Renewal',
    amount: 250,
    amountPaid: 0,
    outstandingBalance: 250,
    issueDate: 'Oct 15, 2026',
    dueDate: 'Nov 01, 2026',
    status: 'overdue',
    chapterId: 'us-chapter'
  },
  {
    id: 'INV-2026-103',
    invoiceNumber: 'INV-103',
    memberName: 'Michael Chen',
    memberEmail: 'mchen@columbia.edu',
    description: 'Regular Alumnus Membership Induction Fee',
    amount: 150,
    amountPaid: 0,
    outstandingBalance: 150,
    issueDate: 'Oct 30, 2026',
    dueDate: 'Nov 20, 2026',
    status: 'outstanding',
    chapterId: 'us-chapter'
  },
  {
    id: 'INV-2026-104',
    invoiceNumber: 'INV-104',
    memberName: 'Sarah Jenkins',
    memberEmail: 'sarah.jenkins@alumni-network.org',
    description: 'Regular Alumnus Induction Fee',
    amount: 150,
    amountPaid: 0,
    outstandingBalance: 150,
    issueDate: 'Nov 07, 2026',
    dueDate: 'Nov 21, 2026',
    status: 'outstanding',
    chapterId: 'us-chapter'
  },
  {
    id: 'INV-2026-105',
    invoiceNumber: 'INV-105',
    memberName: 'Dr. Kelechi Okafor',
    memberEmail: 'k.okafor@nyu-langone.org',
    description: 'Executive Membership Dues',
    amount: 250,
    amountPaid: 250,
    outstandingBalance: 0,
    issueDate: 'Nov 06, 2026',
    dueDate: 'Nov 20, 2026',
    status: 'paid',
    chapterId: 'us-chapter'
  }
];

