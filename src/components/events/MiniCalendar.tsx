import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { EventItem } from '../../types';

interface MiniCalendarProps {
  events: EventItem[];
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({
  events,
  selectedDate,
  onSelectDate
}) => {
  // Default to November 2026 as per application calendar base
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 10, 9)); // Nov 9, 2026
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  // Days in month
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  // Adjust so Monday is 0:
  const startOffset = (firstDayOfMonth + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const hasEventOnDay = (day: number) => {
    const curMonthName = monthNames[month].slice(0, 3).toLowerCase();
    const dynamicMatch = events.some(e => {
      const d = (e.dateDisplay || '').toLowerCase();
      const hasMonth = d.includes(curMonthName);
      const hasDay = d.includes(` ${day},`) || d.includes(` ${day} `) || d.includes(` ${day}`) || (day < 10 && d.includes(`0${day}`));
      return hasMonth && hasDay;
    });
    if (dynamicMatch) return true;

    // Preserved chapter highlights for scheduled activities
    if (month === 10 && (day === 9 || day === 15 || day === 20 || day === 24)) return true;
    if (month === 11 && (day === 1 || day === 12 || day === 18)) return true;
    if (month === 8 && day === 19) return true;
    return false;
  };

  const isToday = (day: number) => {
    return year === 2026 && month === 10 && day === 9;
  };

  const isDaySelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  const handleDayClick = (day: number) => {
    if (isDaySelected(day)) {
      onSelectDate(null); // toggle off
    } else {
      onSelectDate(new Date(year, month, day));
    }
  };

  // Generate 7-day strip around Nov 9 or selected day
  const getWeekDays = () => {
    const days = [];
    const baseDay = isDaySelected(selectedDate?.getDate() || 9)
      ? selectedDate!.getDate()
      : 9;

    // Start 3 days before
    for (let i = -3; i <= 3; i++) {
      const d = new Date(year, month, baseDay + i);
      days.push(d);
    }
    return days;
  };

  const weekDays = getWeekDays();

  return (
    <div className="bg-white rounded-2xl border border-[#E6EAED] p-3 shadow-xs space-y-2.5">
      {/* Month Navigation & Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="w-4 h-4 text-[#006699]" />
          <h3 className="text-xs font-bold text-[#172B36]">
            {monthNames[month]} {year}
          </h3>
          {selectedDate && (
            <button
              onClick={() => onSelectDate(null)}
              className="text-[10px] font-semibold text-[#006699] bg-[#E6F2F7] px-2 py-0.5 rounded-full hover:bg-[#d6eaf3] transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevMonth}
            aria-label="Previous month"
            className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-[#71808A] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextMonth}
            aria-label="Next month"
            className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-[#71808A] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Collapse to week' : 'Expand to month'}
            className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-[#71808A] transition-colors ml-0.5"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Week View (Compact horizontal strip) */}
      {!isExpanded ? (
        <div className="grid grid-cols-7 gap-1 text-center">
          {weekDays.map((date, idx) => {
            const dayNum = date.getDate();
            const dayOfWeekLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()];
            const hasEvent = hasEventOnDay(dayNum);
            const selected = isDaySelected(dayNum);
            const today = isToday(dayNum);

            return (
              <button
                key={idx}
                onClick={() => handleDayClick(dayNum)}
                className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center transition-all min-h-[46px] relative active:scale-95 ${
                  selected
                    ? 'bg-[#006699] text-white shadow-xs font-bold'
                    : today
                    ? 'bg-[#E6F2F7] text-[#006699] font-bold border border-[#006699]/30'
                    : 'hover:bg-slate-50 text-[#172B36]'
                }`}
              >
                <span className={`text-[10px] leading-tight ${selected ? 'text-white/80' : 'text-[#71808A]'}`}>
                  {dayOfWeekLetter}
                </span>
                <span className="text-xs font-semibold tabular-nums mt-0.5">
                  {dayNum}
                </span>
                {hasEvent && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-1 ${
                      selected ? 'bg-white' : 'bg-[#006699]'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      ) : (
        /* Expanded Month Grid View */
        <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-[#71808A] pb-1 border-b border-[#E6EAED]/60">
            {daysOfWeek.map((day, i) => (
              <span key={i}>{day}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Blank filler days for month start */}
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="h-8" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const hasEvent = hasEventOnDay(dayNum);
              const selected = isDaySelected(dayNum);
              const today = isToday(dayNum);

              return (
                <button
                  key={dayNum}
                  onClick={() => handleDayClick(dayNum)}
                  className={`h-8 rounded-lg flex flex-col items-center justify-center text-xs font-semibold relative transition-all active:scale-95 ${
                    selected
                      ? 'bg-[#006699] text-white shadow-xs font-bold'
                      : today
                      ? 'bg-[#E6F2F7] text-[#006699] font-bold border border-[#006699]/40'
                      : 'hover:bg-slate-100 text-[#172B36]'
                  }`}
                >
                  <span className="tabular-nums leading-none">{dayNum}</span>
                  {hasEvent && (
                    <span
                      className={`w-1 h-1 rounded-full mt-0.5 ${
                        selected ? 'bg-white' : 'bg-[#006699]'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
