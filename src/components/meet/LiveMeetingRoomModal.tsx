import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Users,
  MessageSquare,
  Share2,
  FileText,
  Send,
  CheckCircle2,
  Volume2,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MeetingItem } from '../../types';

interface LiveMeetingRoomModalProps {
  meeting: MeetingItem;
  onClose: () => void;
}

export const LiveMeetingRoomModal: React.FC<LiveMeetingRoomModalProps> = ({
  meeting,
  onClose
}) => {
  const { activeChapter, uploadMinutes } = useApp();

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeSidePanel, setActiveSidePanel] = useState<'none' | 'chat' | 'participants' | 'notes'>('none');
  const [chatMessages, setChatMessages] = useState<{ id: string; sender: string; text: string; time: string }[]>([
    { id: 'c1', sender: 'Marcus Vance', text: 'Good evening everyone. Quorum confirmed with 14 officers online.', time: '6:01 PM' },
    { id: 'c2', sender: 'Dr. Kelechi Okafor', text: 'Reporting from NY Sub-Chapter. All 3rd-party receipts verified on our end.', time: '6:04 PM' },
    { id: 'c3', sender: 'Elena Rostova', text: 'Executive table sponsorships are ready for approval.', time: '6:08 PM' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [meetingNotes, setMeetingNotes] = useState(
    'Meeting called to order by Mavis Okonjo. Direct clearance of annual dues confirmed for existing members. 3rd-party candidate payment receipts verified across Chase Zelle and Bank Wire.'
  );
  const [savedNotesMessage, setSavedNotesMessage] = useState(false);

  const participants = [
    { name: 'Mavis Okonjo (You)', role: 'Host / Admin', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', isSpeaking: false, isMuted },
    { name: 'Marcus Vance', role: 'President', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', isSpeaking: true, isMuted: false },
    { name: 'Dr. Kelechi Okafor', role: 'Secretary', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', isSpeaking: false, isMuted: false },
    { name: 'Elena Rostova', role: 'Executive Fellow', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80', isSpeaking: false, isMuted: true }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages(prev => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'Mavis Okonjo',
        text: chatInput.trim(),
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      }
    ]);
    setChatInput('');
  };

  const handleSaveMinutes = () => {
    uploadMinutes({
      title: `${meeting.title} - Minutes of Proceeding`,
      meetingDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      associatedEventTitle: meeting.title,
      fileType: 'PDF Certified',
      fileSize: '820 KB',
      description: meetingNotes,
      meetingType: meeting.type
    });

    setSavedNotesMessage(true);
    setTimeout(() => setSavedNotesMessage(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A] text-white flex flex-col animate-in fade-in">
      {/* Top Bar */}
      <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <div className="min-w-0">
            <h3 className="text-xs font-bold truncate text-white leading-tight">
              {meeting.title}
            </h3>
            <span className="text-[10px] text-slate-400 block truncate">
              Room: {meeting.roomCode} • {activeChapter.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
            LIVE • 14 Joined
          </span>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Video Grid & Side Drawer */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Video Tiles Grid */}
        <div className="flex-1 p-3 grid grid-cols-2 gap-2.5 overflow-y-auto">
          {participants.map((p, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden bg-slate-800 border flex flex-col items-center justify-center aspect-4/3 transition-all ${
                p.isSpeaking ? 'border-[#006699] ring-2 ring-[#006699]/40' : 'border-slate-700'
              }`}
            >
              {idx === 0 && !isVideoOn ? (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-14 h-14 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-lg font-bold">
                    MO
                  </div>
                  <span className="text-[10px] text-slate-400">Camera Off</span>
                </div>
              ) : (
                <>
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </>
              )}

              {/* Participant badge */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white">
                <span className="font-semibold truncate drop-shadow-sm flex items-center gap-1">
                  {p.name}
                  {p.isSpeaking && (
                    <Volume2 className="w-3 h-3 text-emerald-400 animate-pulse shrink-0" />
                  )}
                </span>
                <span className="p-1 rounded-md bg-black/60 shrink-0">
                  {p.isMuted ? <MicOff className="w-3 h-3 text-red-400" /> : <Mic className="w-3 h-3 text-emerald-400" />}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Side Panel (Chat / Notes / Attendees) */}
        {activeSidePanel !== 'none' && (
          <div className="w-72 bg-slate-900 border-l border-slate-800 flex flex-col animate-in slide-in-from-right duration-200">
            {/* Panel Header */}
            <div className="p-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {activeSidePanel === 'chat' && 'In-Call Chat'}
                {activeSidePanel === 'participants' && 'Attendees (14)'}
                {activeSidePanel === 'notes' && 'Live Meeting Minutes'}
              </span>
              <button
                onClick={() => setActiveSidePanel('none')}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
              {activeSidePanel === 'chat' && (
                <div className="space-y-2.5">
                  {chatMessages.map(msg => (
                    <div key={msg.id} className="bg-slate-800 p-2 rounded-xl border border-slate-700/60 space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-bold text-[#006699]">{msg.sender}</span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="text-slate-200 text-xs leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeSidePanel === 'participants' && (
                <div className="space-y-2">
                  {participants.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-800 border border-slate-700/50">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={p.avatar} alt={p.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-200 truncate">{p.name}</p>
                          <span className="text-[10px] text-slate-400 block">{p.role}</span>
                        </div>
                      </div>
                      {p.isMuted ? <MicOff className="w-3.5 h-3.5 text-red-400" /> : <Mic className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                  ))}
                </div>
              )}

              {activeSidePanel === 'notes' && (
                <div className="space-y-3">
                  <p className="text-[11px] text-slate-400">
                    Record official meeting minutes live. Click below to save into Transparency Hub Vault.
                  </p>
                  <textarea
                    rows={8}
                    value={meetingNotes}
                    onChange={(e) => setMeetingNotes(e.target.value)}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#006699]"
                  />
                  <button
                    onClick={handleSaveMinutes}
                    className="w-full py-2 bg-[#006699] hover:bg-[#004B70] text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Save to Chapter Vault</span>
                  </button>
                  {savedNotesMessage && (
                    <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-center font-bold text-xs flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Minutes Archived!</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Chat Input if in chat */}
            {activeSidePanel === 'chat' && (
              <form onSubmit={handleSendMessage} className="p-2 border-t border-slate-800 flex gap-1.5">
                <input
                  type="text"
                  placeholder="Send message to room..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#006699] text-white rounded-xl font-bold"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Control Action Dock */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-3">
        {/* Mic Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            isMuted ? 'bg-red-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
          }`}
          title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Video Toggle */}
        <button
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            !isVideoOn ? 'bg-red-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
          }`}
          title={isVideoOn ? 'Turn Camera Off' : 'Turn Camera On'}
        >
          {!isVideoOn ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
        </button>

        {/* Screen Share */}
        <button
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            isScreenSharing ? 'bg-[#006699] text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
          }`}
          title="Share Screen"
        >
          <Share2 className="w-5 h-5" />
        </button>

        {/* Attendees Drawer Toggle */}
        <button
          onClick={() => setActiveSidePanel(activeSidePanel === 'participants' ? 'none' : 'participants')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            activeSidePanel === 'participants' ? 'bg-[#006699] text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
          }`}
          title="Attendees Roster"
        >
          <Users className="w-5 h-5" />
        </button>

        {/* Chat Drawer Toggle */}
        <button
          onClick={() => setActiveSidePanel(activeSidePanel === 'chat' ? 'none' : 'chat')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            activeSidePanel === 'chat' ? 'bg-[#006699] text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
          }`}
          title="In-Call Chat"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        {/* Meeting Minutes Notepad Toggle */}
        <button
          onClick={() => setActiveSidePanel(activeSidePanel === 'notes' ? 'none' : 'notes')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            activeSidePanel === 'notes' ? 'bg-[#006699] text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
          }`}
          title="Live Minutes Notepad"
        >
          <FileText className="w-5 h-5" />
        </button>

        {/* End / Leave Call */}
        <button
          onClick={onClose}
          className="w-12 h-11 px-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center gap-1 transition-colors"
          title="Leave Meeting Room"
        >
          <PhoneOff className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
