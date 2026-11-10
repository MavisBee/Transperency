export type Role = 'Super Admin' | 'Chapter Admin' | 'Community Admin' | 'Finance Admin';

export interface Chapter {
  id: string;
  name: string;
  code: string;
  country: string;
  currency: string;
  currencySymbol: string;
  subChapters: SubChapter[];
  totalMembers: number;
}

export interface SubChapter {
  id: string;
  name: string;
  code: string;
  chapterId: string;
}

export interface ChapterMetrics {
  totalMembers: number;
  memberGrowth: string;
  activeSubscriptions: number;
  pendingRenewals: number;
  duesCollected: number;
  duesTarget: number;
  duesCollectedFormatted: string;
  duesPercent: number;
  totalBilling: number;
  totalBillingFormatted: string;
  outstandingBalance: number;
  outstandingBalanceFormatted: string;
}

export interface MonthlyDuePoint {
  month: string;
  confirmed: number; // in thousands
  awaiting: number;  // in thousands
  status: 'successful' | 'pending' | 'no-activity';
}

export interface DemographicSegment {
  label: string;
  percentage: number;
  count: number;
  color: string;
}

export type ApplicationStatus = 'pending' | 'awaiting_payment' | 'approved' | 'rejected' | 'info_requested';
export type PaymentStatus = 'paid' | 'outstanding' | 'partial' | 'waived';

export interface MemberApplication {
  id: string;
  fullName: string;
  initials: string;
  avatarUrl?: string;
  email: string;
  phone: string;
  country: string;
  location: string;
  membershipType: 'Executive Tier' | 'Regular Alumnus' | 'Associate Member' | 'Lifetime Fellow' | 'Young Alumni';
  chapterId: string;
  chapterName: string;
  subChapterName?: string;
  section: string;
  applicationDate: string;
  status: ApplicationStatus;
  paymentStatus: PaymentStatus;
  membershipFee: number;
  amountPaid: number;
  outstandingBalance: number;
  paymentReference?: string;
  paymentDate?: string;
  paymentMethod?: string;
  receiptUrl?: string;
  receiptThumbnail?: string;
  receiptApp?: 'Zelle' | 'Bank Wire' | 'Stripe' | 'PayPal' | 'Remita' | 'CashApp' | 'Paystack' | 'Other App';
  receiptReference?: string;
  receiptDate?: string;
  receiptPayerName?: string;
  receiptVerified?: boolean;
  isNewMember?: boolean;
  graduationYear: number;
  degree: string;
  responses: {
    question: string;
    answer: string;
  }[];
  adminNotes: {
    id: string;
    author: string;
    text: string;
    timestamp: string;
  }[];
  rejectionReason?: string;
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  ticketType: string;
  checkedIn: boolean;
  registrationDate: string;
}

export interface EventItem {
  id: string;
  title: string;
  coverImage?: string;
  daysBadge: string;
  bookedPercentBadge: string;
  dateDisplay: string;
  timeDisplay: string;
  location: string;
  locationType: 'physical' | 'virtual' | 'hybrid';
  virtualLink?: string;
  chapterId: string;
  chapterName: string;
  registeredCount: number;
  maxCapacity: number;
  remainingSeats: number;
  status: 'upcoming' | 'past' | 'draft';
  category: string;
  description: string;
  targetAudience: string;
  attendees: Attendee[];
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  referenceText?: string;
  referenceLink?: string;
  timeAgo: string;
  timestamp: string;
  authorName: string;
  authorAvatar?: string;
  authorInitials?: string;
  type: 'disbursement' | 'renewal' | 'minutes' | 'approval' | 'event' | 'announcement';
}

export interface AnnouncementItem {
  id: string;
  title: string;
  message: string;
  targetAudience: string;
  chapterId: string;
  publishingDate: string;
  author: string;
  status: 'published' | 'draft' | 'scheduled';
  scheduledDate?: string;
  attachmentName?: string;
}

export interface MeetingMinutesItem {
  id: string;
  title: string;
  meetingDate: string;
  chapterId: string;
  chapterName: string;
  associatedEventTitle?: string;
  uploadedBy: string;
  uploadDate: string;
  fileType: string;
  fileSize: string;
  signaturesVerified: number;
  description?: string;
  meetingType: string;
}

export interface DriveFileItem {
  id: string;
  name: string;
  category: 'Organizational Documents' | 'Meeting Minutes' | 'Events' | 'Membership Documents' | 'Financial Records' | 'Elections' | 'Other Documents';
  fileType: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'zip';
  fileSize: string;
  uploadDate: string;
  uploadedBy: string;
  chapterId: string;
  tags: string[];
}

export interface ElectionCandidate {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  bio: string;
  votes: number;
  isLeading?: boolean;
}

export interface ElectionPosition {
  id: string;
  title: string;
  description: string;
  candidates: ElectionCandidate[];
}

export interface ElectionItem {
  id: string;
  title: string;
  chapterId: string;
  chapterName: string;
  votingPeriod: string;
  status: 'upcoming' | 'active' | 'completed' | 'draft';
  positionsCount: number;
  eligibleVoters: number;
  totalVotesCast: number;
  positions: ElectionPosition[];
}

export interface CommunityItem {
  id: string;
  name: string;
  description: string;
  chapterId: string;
  chapterName: string;
  memberCount: number;
  adminName: string;
  adminAvatar?: string;
  status: 'active' | 'inactive';
  category: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  timestamp: string;
  read: boolean;
  category: 'applications' | 'payments' | 'events' | 'documents' | 'system';
  targetTab?: 'home' | 'approvals' | 'events' | 'drive' | 'more';
  targetId?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  details: string;
  affectedRecord: string;
  category: string;
}

export interface RegisteredMember {
  id: string;
  fullName: string;
  initials: string;
  avatarUrl?: string;
  email: string;
  phone: string;
  membershipType: 'Executive Tier' | 'Regular Alumnus' | 'Associate Member' | 'Lifetime Fellow' | 'Young Alumni';
  chapterId: string;
  subChapterName?: string;
  status: 'active' | 'pending_renewal' | 'lapsed';
  duesStatus: 'up_to_date' | 'overdue' | 'exempt';
  duesAmount?: number;
  duesCycle?: string;
  duesApprovedByAdmin?: boolean;
  duesApprovalDate?: string;
  duesPaymentMethod?: string;
  duesReference?: string;
  joinedDate: string;
  graduationYear: number;
}

export interface MeetingItem {
  id: string;
  title: string;
  type: 'Executive Board' | 'General Assembly' | 'Sub-Chapter Sync' | 'Committee' | 'Mentorship Circle';
  dateDisplay: string;
  timeDisplay: string;
  timestamp: string;
  duration: string;
  status: 'live' | 'upcoming' | 'concluded';
  platform: 'Built-in Meet' | 'Google Meet' | 'Zoom' | 'Hybrid Room';
  meetingUrl: string;
  roomCode: string;
  hostName: string;
  hostAvatar?: string;
  chapterId: string;
  chapterName: string;
  subChapterName?: string;
  targetAudience: string;
  attendeesCount: number;
  maxAttendees?: number;
  agenda: string[];
  notes?: string;
  recordingUrl?: string;
  hasMinutes?: boolean;
}

export interface SubscriptionRecord {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  planTier: string;
  billingCycle: 'Annual' | 'Lifetime' | 'Monthly';
  amount: number;
  currency: string;
  startDate: string;
  renewalDate: string;
  status: 'active' | 'pending_renewal' | 'expired';
  paymentMethod: string;
}

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  memberName: string;
  memberEmail: string;
  description: string;
  amount: number;
  amountPaid: number;
  outstandingBalance: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'partial' | 'outstanding' | 'overdue';
  chapterId: string;
}

export interface GlobalSearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'member' | 'applicant' | 'event' | 'document' | 'minutes';
  badge?: string;
  targetTab: 'home' | 'approvals' | 'events' | 'meet' | 'drive' | 'more';
  targetId?: string;
}

export type SubScreenType =
  | null
  | 'members_directory'
  | 'subscriptions_manager'
  | 'dues_ledger'
  | 'billing_manager'
  | 'verify_new_members'
  | 'existing_dues_approvals'
  | 'create_meeting';

