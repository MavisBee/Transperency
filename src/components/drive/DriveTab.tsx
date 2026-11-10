import React, { useState } from 'react';
import {
  Folder,
  FileText,
  Search,
  Upload,
  Download,
  Eye,
  FileSpreadsheet,
  FileCheck,
  ChevronRight,
  Filter,
  Shield,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DriveFileItem } from '../../types';

export const DriveTab: React.FC = () => {
  const { driveFiles, uploadDriveFile, selectedFileId, setSelectedFileId, activeChapter } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newFileForm, setNewFileForm] = useState({
    name: '',
    category: 'Organizational Documents' as DriveFileItem['category'],
    fileType: 'pdf' as DriveFileItem['fileType'],
    tagInput: ''
  });

  const categories = [
    'All',
    'Organizational Documents',
    'Meeting Minutes',
    'Events',
    'Membership Documents',
    'Financial Records',
    'Elections'
  ];

  const activeFile = driveFiles.find(f => f.id === selectedFileId);

  const filteredFiles = driveFiles.filter(file => {
    if (activeCategory !== 'All' && file.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = file.name.toLowerCase().includes(q);
      const matchCat = file.category.toLowerCase().includes(q);
      const matchTag = file.tags.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchCat && !matchTag) return false;
    }
    return true;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileForm.name.trim()) return;

    const tags = newFileForm.tagInput
      ? newFileForm.tagInput.split(',').map(t => t.trim()).filter(Boolean)
      : ['Official'];

    uploadDriveFile({
      name: newFileForm.name.endsWith(`.${newFileForm.fileType}`)
        ? newFileForm.name
        : `${newFileForm.name}.${newFileForm.fileType}`,
      category: newFileForm.category,
      fileType: newFileForm.fileType,
      fileSize: '1.6 MB',
      tags
    });

    setIsUploadModalOpen(false);
    setNewFileForm({
      name: '',
      category: 'Organizational Documents',
      fileType: 'pdf',
      tagInput: ''
    });
  };

  const getFileIcon = (fileType: string) => {
    if (fileType === 'pdf') return <FileText className="w-5 h-5 text-[#D94B4B]" />;
    if (fileType === 'xlsx') return <FileSpreadsheet className="w-5 h-5 text-[#21865B]" />;
    return <FileCheck className="w-5 h-5 text-[#006699]" />;
  };

  return (
    <div className="space-y-4 pb-24 pt-1">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#71808A]">
          {filteredFiles.length} documents archived
        </span>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-3 py-1.5 bg-[#006699] hover:bg-[#004B70] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#71808A] absolute left-3 top-3 pointer-events-none" />
        <input
          type="text"
          placeholder="Search documents by name, category, or tag..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E6EAED] text-xs text-[#172B36] placeholder-[#71808A] focus:outline-none focus:ring-1 focus:ring-[#006699] shadow-xs"
        />
      </div>

      {/* Folder Categories Scroll */}
      <div className="space-y-1.5">
        <h2 className="text-xs font-bold text-[#172B36] uppercase tracking-wider px-1">
          Document Repositories
        </h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeCategory === cat
                  ? 'bg-[#006699] text-white shadow-xs'
                  : 'bg-white text-[#71808A] border border-[#E6EAED] hover:bg-slate-50'
              }`}
            >
              <Folder className="w-3.5 h-3.5" />
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Files List */}
      <div className="space-y-2.5">
        {filteredFiles.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-[#E6EAED] text-center space-y-2">
            <Folder className="w-10 h-10 text-[#71808A]/40 mx-auto" />
            <h3 className="text-sm font-bold text-[#172B36]">Your organizational documents will appear here</h3>
            <p className="text-xs text-[#71808A] max-w-xs mx-auto">
              No files found matching "{activeCategory}". Click 'Upload' to store chapter records.
            </p>
          </div>
        ) : (
          filteredFiles.map((file) => (
            <div
              key={file.id}
              onClick={() => setSelectedFileId(file.id)}
              className="bg-white rounded-2xl p-3.5 border border-[#E6EAED] shadow-xs hover:border-[#006699]/40 transition-all cursor-pointer active:scale-99 flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#F7F9FA] border border-[#E6EAED] flex items-center justify-center shrink-0">
                  {getFileIcon(file.fileType)}
                </div>

                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-[#172B36] group-hover:text-[#006699] transition-colors truncate">
                    {file.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-[#71808A] mt-0.5">
                    <span>{file.category}</span>
                    <span>•</span>
                    <span>{file.fileSize}</span>
                    <span>•</span>
                    <span>{file.uploadDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-[#E6F2F7] text-[#006699]">
                  {file.fileType}
                </span>
                <ChevronRight className="w-4 h-4 text-[#71808A] group-hover:text-[#006699] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[#E6EAED] flex items-center justify-between bg-[#F7F9FA]">
              <div>
                <h3 className="text-base font-bold text-[#172B36]">Upload to Drive</h3>
                <p className="text-xs text-[#71808A]">Secure organizational repository upload</p>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#71808A]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-4 space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Document Title *</label>
                <input
                  type="text"
                  placeholder="e.g. 2026_Q4_Audited_Treasury_Report"
                  value={newFileForm.name}
                  onChange={(e) => setNewFileForm({ ...newFileForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs focus:ring-1 focus:ring-[#006699]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#172B36]">Category</label>
                  <select
                    value={newFileForm.category}
                    onChange={(e) => setNewFileForm({ ...newFileForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  >
                    <option value="Organizational Documents">Organizational Documents</option>
                    <option value="Meeting Minutes">Meeting Minutes</option>
                    <option value="Events">Events</option>
                    <option value="Membership Documents">Membership Documents</option>
                    <option value="Financial Records">Financial Records</option>
                    <option value="Elections">Elections</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#172B36]">File Type</label>
                  <select
                    value={newFileForm.fileType}
                    onChange={(e) => setNewFileForm({ ...newFileForm, fileType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="xlsx">Excel Spreadsheet (XLSX)</option>
                    <option value="docx">Word Document (DOCX)</option>
                    <option value="zip">Archive (ZIP)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#172B36]">Tags (Comma separated)</label>
                <input
                  type="text"
                  placeholder="Audit, Statutory, 2026, Executive"
                  value={newFileForm.tagInput}
                  onChange={(e) => setNewFileForm({ ...newFileForm, tagInput: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F9FA] border border-[#E6EAED] rounded-xl text-xs"
                />
              </div>

              {/* Drag and drop mock zone */}
              <div className="p-6 border-2 border-dashed border-[#006699]/30 rounded-2xl bg-[#E6F2F7]/30 text-center space-y-1 cursor-pointer">
                <Upload className="w-8 h-8 text-[#006699] mx-auto" />
                <p className="font-bold text-[#172B36]">Attach Official File</p>
                <p className="text-[11px] text-[#71808A]">PDF, DOCX, XLSX up to 50MB</p>
              </div>

              <div className="p-3 border-t border-[#E6EAED] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 border border-[#E6EAED] rounded-xl text-xs font-semibold text-[#71808A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#006699] text-white rounded-xl text-xs font-semibold hover:bg-[#004B70]"
                >
                  Confirm Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Preview & Details Modal */}
      {activeFile && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[#E6EAED] flex items-center justify-between bg-[#F7F9FA]">
              <div className="flex items-center gap-2">
                {getFileIcon(activeFile.fileType)}
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#172B36] truncate max-w-[240px]">
                    {activeFile.name}
                  </h3>
                  <p className="text-[10px] text-[#71808A]">
                    {activeFile.category} • {activeFile.fileSize}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedFileId(null)}
                className="w-8 h-8 rounded-full bg-white border border-[#E6EAED] flex items-center justify-center text-[#71808A]"
              >
                ✕
              </button>
            </div>

            {/* Document Viewer Simulator */}
            <div className="p-4 bg-slate-100 flex-1 flex flex-col items-center justify-center min-h-[260px] overflow-hidden text-center">
              <div className="w-full max-w-xs bg-white rounded-lg shadow-lg p-5 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="w-8 h-8 rounded-full bg-[#E6F2F7] flex items-center justify-center text-[#006699] font-bold text-xs">
                    TH
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#71808A]">
                    Official Seal
                  </span>
                </div>

                <div className="space-y-1.5 text-left">
                  <p className="text-xs font-bold text-[#172B36]">{activeFile.name}</p>
                  <p className="text-[10px] text-[#71808A]">Transparency Hub Alumni Network</p>
                  <p className="text-[10px] text-[#71808A]">Chapter: {activeChapter.name}</p>
                  <div className="p-2 bg-slate-50 rounded border text-[10px] text-slate-600 font-mono">
                    Document SHA-256: 4a9f...e02b verified.
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      alert(`Downloading ${activeFile.name}...`);
                    }}
                    className="w-full py-2 bg-[#006699] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download File
                  </button>
                </div>
              </div>
            </div>

            {/* Metadata breakdown */}
            <div className="p-4 bg-white border-t border-[#E6EAED] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#71808A]">
                <span>Uploaded By:</span>
                <span className="font-semibold text-[#172B36]">{activeFile.uploadedBy}</span>
              </div>
              <div className="flex items-center justify-between text-[#71808A]">
                <span>Upload Date:</span>
                <span className="font-semibold text-[#172B36]">{activeFile.uploadDate}</span>
              </div>
              <div className="flex items-center justify-between text-[#71808A]">
                <span>Tags:</span>
                <div className="flex gap-1">
                  {activeFile.tags.map(t => (
                    <span key={t} className="px-1.5 py-0.5 rounded-sm bg-[#F7F9FA] border border-[#E6EAED] text-[10px] text-[#172B36]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
