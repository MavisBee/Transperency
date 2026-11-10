import {
  LayoutGrid,
  ShieldCheck,
  Calendar,
  Video,
  MoreHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNavigation: React.FC = () => {
  const { activeTab, setActiveTab, setActiveSubScreen, applications, meetings } = useApp();

  const pendingApprovalsCount = applications.filter(
    a => a.status === 'pending' || a.status === 'awaiting_payment'
  ).length;

  const liveMeetingsCount = meetings.filter(m => m.status === 'live').length;

  const navItems = [
    {
      id: 'home' as const,
      label: 'Home',
      icon: LayoutGrid,
      badge: 0
    },
    {
      id: 'approvals' as const,
      label: 'Approvals',
      icon: ShieldCheck,
      badge: pendingApprovalsCount
    },
    {
      id: 'events' as const,
      label: 'Events',
      icon: Calendar,
      badge: 0
    },
    {
      id: 'meet' as const,
      label: 'Meet',
      icon: Video,
      badge: liveMeetingsCount
    },
    {
      id: 'more' as const,
      label: 'More',
      icon: MoreHorizontal,
      badge: 0
    }
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed bottom-3 inset-x-0 mx-auto max-w-[390px] px-4 z-40 pointer-events-none"
    >
      <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-[#E6EAED] shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full px-4 py-2 flex items-center justify-between">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveSubScreen(null);
                setActiveTab(item.id);
              }}
              className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'text-[#006699]'
                  : 'text-[#71808A] hover:text-[#172B36]'
              }`}
            >
              <div
                className={`p-1.5 rounded-full transition-colors ${
                  isActive ? 'bg-[#E6F2F7]' : 'bg-transparent'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'
                  }`}
                />
              </div>

              {/* Unread / Pending Badge on Approvals */}
              {item.badge > 0 && (
                <span className="absolute top-1 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#006699] text-white text-[9px] font-bold flex items-center justify-center border border-white shadow-xs">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
