import React, { useState } from 'react';
import {
  Bell,
  CheckCheck,
  X,
  UserPlus,
  CreditCard,
  Calendar,
  FileText,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NotificationItem } from '../../types';

export const NotificationsSheet: React.FC = () => {
  const {
    notifications,
    isNotificationsOpen,
    setIsNotificationsOpen,
    markNotificationRead,
    markAllNotificationsRead,
    setActiveTab,
    setSelectedApplicationId,
    setSelectedEventId,
    setSelectedFileId
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!isNotificationsOpen) return null;

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const handleNotificationClick = (item: NotificationItem) => {
    markNotificationRead(item.id);
    setIsNotificationsOpen(false);

    if (item.targetTab) {
      setActiveTab(item.targetTab);
    }
    if (item.targetTab === 'approvals' && item.targetId) {
      setSelectedApplicationId(item.targetId);
    } else if (item.targetTab === 'events' && item.targetId) {
      setSelectedEventId(item.targetId);
    } else if (item.targetTab === 'drive' && item.targetId) {
      setSelectedFileId(item.targetId);
    }
  };

  const getNotifIcon = (category: string) => {
    switch (category) {
      case 'applications':
        return <UserPlus className="w-4 h-4 text-[#006699]" />;
      case 'payments':
        return <CreditCard className="w-4 h-4 text-[#21865B]" />;
      case 'events':
        return <Calendar className="w-4 h-4 text-[#D99A2B]" />;
      case 'documents':
        return <FileText className="w-4 h-4 text-[#004B70]" />;
      default:
        return <Info className="w-4 h-4 text-[#71808A]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#E6EAED] flex items-center justify-between bg-[#F7F9FA]">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#006699]" />
            <div>
              <h3 className="text-base font-bold text-[#172B36]">
                Notifications
              </h3>
              <p className="text-xs text-[#71808A]">
                Administrative and chapter alerts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-[#006699] font-semibold hover:underline flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all read
            </button>
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="w-8 h-8 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#71808A] hover:text-[#172B36]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="px-4 py-2 border-b border-[#E6EAED] flex items-center gap-2 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full font-medium ${
              filter === 'all'
                ? 'bg-[#006699] text-white'
                : 'bg-[#F7F9FA] text-[#71808A]'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-full font-medium ${
              filter === 'unread'
                ? 'bg-[#006699] text-white'
                : 'bg-[#F7F9FA] text-[#71808A]'
            }`}
          >
            Unread ({notifications.filter(n => !n.read).length})
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
          {filteredNotifs.length === 0 ? (
            <div className="text-center py-8 text-[#71808A] text-xs">
              No notifications to display.
            </div>
          ) : (
            filteredNotifs.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer active:scale-99 flex items-start gap-3 ${
                  item.read
                    ? 'bg-white border-[#E6EAED]'
                    : 'bg-[#E6F2F7]/40 border-[#006699]/30'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-[#E6EAED] flex items-center justify-center shrink-0 shadow-xs">
                  {getNotifIcon(item.category)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#172B36] truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-[#71808A] shrink-0 font-medium">
                      {item.timeAgo}
                    </span>
                  </div>

                  <p className="text-xs text-[#71808A] mt-0.5 leading-snug">
                    {item.description}
                  </p>
                </div>

                {!item.read && (
                  <span className="w-2 h-2 rounded-full bg-[#006699] shrink-0 mt-1" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
