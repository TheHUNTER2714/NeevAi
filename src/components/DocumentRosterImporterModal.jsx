import React, { useState, useRef } from 'react';
import { 
  X, 
  UploadCloud, 
  FileType, 
  Check, 
  AlertCircle, 
  Trash2, 
  Plus, 
  Sparkles, 
  ArrowRight,
  FileCheck,
  ClipboardPaste
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BorderBeam } from './ui/BorderBeam';
import { ShimmerButton } from './ui/ShimmerButton';

/**
 * DocumentRosterImporterModal
 * Enables teachers to import student rosters directly from PDF, Word (.docx/.doc),
 * plain text/CSV, or direct clipboard paste.
 */
export function DocumentRosterImporterModal() {
  const { 
    isImportDocModalOpen, 
    setIsImportDocModalOpen, 
    addStudentsBatch, 
    lang,
    setCurrentView
  } = useApp();

  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'paste'
  const [pastedText, setPastedText] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedStudents, setParsedStudents] = useState([]);
  const [parseError, setParseError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);

  if (!isImportDocModalOpen) return null;

  // Heuristic parser to extract student records from raw text lines
  const extractStudentsFromText = (rawText) => {
    if (!rawText || !rawText.trim()) return [];

    const lines = rawText.split(/[\r\n]+/);
    const results = [];
    let currentRoll = 1;

    // Filter out obvious header words
    const headerKeywords = [
      'student name', 'roll no', 'attendance', 'serial', 'sr no',
      'grade', 'class', 'section', 'academic year', 'roster', 'list of students'
    ];

    for (let rawLine of lines) {
      let line = rawLine.trim();
      if (!line || line.length < 2) continue;

      const lower = line.toLowerCase();
      // Skip table header rows
      if (headerKeywords.some(kw => lower.includes(kw) && lower.length < 35)) {
        continue;
      }

      // Format patterns:
      // Pattern 1: CSV / Tab separated (e.g., "1, Priya Sharma, 8, F" or "Priya Sharma\t8")
      if (line.includes(',') || line.includes('\t') || line.includes('|')) {
        const parts = line.split(/[,|\t]+/).map(p => p.trim()).filter(Boolean);
        if (parts.length >= 1) {
          // Check if first part is roll number
          let roll = currentRoll;
          let namePart = parts[0];
          let gender = 'other';
          let age = 8;
          let level = 'Grade 1.2';

          if (/^\d+$/.test(parts[0]) && parts.length > 1) {
            roll = parseInt(parts[0], 10);
            namePart = parts[1];
          }

          // Scan other parts for age/gender
          for (let p of parts.slice(1)) {
            const pLow = p.toLowerCase();
            if (pLow === 'm' || pLow === 'male' || pLow === 'boy') gender = 'male';
            if (pLow === 'f' || pLow === 'female' || pLow === 'girl') gender = 'female';
            if (/^\d{1,2}$/.test(p) && parseInt(p, 10) >= 5 && parseInt(p, 10) <= 15) {
              age = parseInt(p, 10);
            }
            if (pLow.includes('grade') || pLow.includes('class')) {
              level = p;
            }
          }

          // Clean name
          namePart = cleanStudentName(namePart);
          if (namePart && namePart.length >= 2) {
            results.push({
              id: Date.now() + results.length,
              rollNo: roll,
              name: namePart,
              gender,
              age,
              level,
              status: 'unassessed'
            });
            currentRoll = roll + 1;
            continue;
          }
        }
      }

      // Pattern 2: Numbered lines like "1. Rahul Kumar" or "Roll 02: Anita Roy"
      let clean = line.replace(/^(roll\s*no\.?|sr\.?\s*no\.?|\d+[\.\)\-:]*)\s*/i, '').trim();
      clean = cleanStudentName(clean);

      if (clean && clean.length >= 2 && !clean.toLowerCase().startsWith('page')) {
        results.push({
          id: Date.now() + results.length,
          rollNo: currentRoll,
          name: clean,
          gender: detectGenderFromName(clean),
          age: 8,
          level: 'Grade 1.4',
          status: 'unassessed'
        });
        currentRoll++;
      }
    }

    return results;
  };

  const cleanStudentName = (str) => {
    if (!str) return '';
    return str
      .replace(/[^\w\s\u0900-\u097F\.\'-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const detectGenderFromName = (name) => {
    const lower = name.toLowerCase();
    const femaleHints = ['kumari', 'devi', 'priya', 'pooja', 'anita', 'sunita', 'kavita', 'neha', 'anjali', 'aarti', 'riya'];
    if (femaleHints.some(h => lower.includes(h))) return 'female';
    return 'male';
  };

  // Handle uploaded files: .docx, .doc, .pdf, .txt, .csv
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize(`${(file.size / 1024).toFixed(1)} KB`);
    setIsProcessing(true);
    setParseError('');

    try {
      const ext = file.name.split('.').pop()?.toLowerCase();

      if (ext === 'txt' || ext === 'csv') {
        const text = await file.text();
        const extracted = extractStudentsFromText(text);
        finishExtraction(extracted);
      } else if (ext === 'docx') {
        // Docx files are zip archives with word/document.xml.
        // We read as text or binary and regex-extract text from XML tags <w:t>...</w:t>
        const arrayBuffer = await file.arrayBuffer();
        const decoder = new TextDecoder('utf-8', { fatal: false });
        const rawContent = decoder.decode(arrayBuffer);
        
        // Find text nodes
        const matches = rawContent.match(/<w:t[^>]*>([^<]+)<\/w:t>/g);
        if (matches && matches.length > 0) {
          const extractedText = matches
            .map(m => m.replace(/<[^>]+>/g, ''))
            .join('\n');
          const extracted = extractStudentsFromText(extractedText);
          finishExtraction(extracted);
        } else {
          // Fallback: extract plain text words
          const textOnly = rawContent.replace(/<[^>]+>/g, ' ').replace(/[^\x20-\x7E\u0900-\u097F\n]/g, ' ');
          const extracted = extractStudentsFromText(textOnly);
          finishExtraction(extracted);
        }
      } else if (ext === 'pdf') {
        // Client-side text decode for PDF streams
        const text = await file.text();
        // Extract text tokens inside parentheses in PDF streams (e.g. (Student Name) Tj)
        const pdfTextMatches = text.match(/\(([^\)]+)\)\s*(Tj|TJ|\')/g);
        let reconstructed = '';
        if (pdfTextMatches && pdfTextMatches.length > 0) {
          reconstructed = pdfTextMatches
            .map(m => m.replace(/[\(\)\'\s]/g, ' ').replace(/(Tj|TJ)/g, ''))
            .join('\n');
        } else {
          reconstructed = text.replace(/[\x00-\x1F\x7F-\x9F]/g, ' ');
        }
        
        const extracted = extractStudentsFromText(reconstructed);
        if (extracted.length > 0) {
          finishExtraction(extracted);
        } else {
          // If the PDF is compressed or an image scan, prompt switch to Paste tab
          setIsProcessing(false);
          setParseError(
            lang === 'hi' 
              ? 'पीडीएफ से सीधा टेक्स्ट नहीं मिला। कृपया पीडीएफ से नाम कॉपी करके "पेस्ट करें" टैब में दर्ज करें।'
              : 'Could not extract direct text stream from PDF. Please copy the student names from your document and paste into the "Paste Roster" tab.'
          );
          setActiveTab('paste');
        }
      } else {
        // General text read fallback
        const text = await file.text();
        const extracted = extractStudentsFromText(text);
        finishExtraction(extracted);
      }
    } catch (err) {
      console.error('Document parsing error:', err);
      setIsProcessing(false);
      setParseError('Failed to parse document: ' + (err.message || 'Unknown error.'));
    }
  };

  const finishExtraction = (extracted) => {
    setIsProcessing(false);
    if (!extracted || extracted.length === 0) {
      setParseError(
        lang === 'hi'
          ? 'दस्तावेज़ में कोई वैध छात्र नाम नहीं मिला। कृपया टेक्स्ट पेस्ट विकल्प का उपयोग करें।'
          : 'No student names detected in document. Try pasting the list directly in the Paste tab.'
      );
    } else {
      setParsedStudents(extracted);
    }
  };

  // Handle pasted text parse
  const handleParsePastedText = () => {
    if (!pastedText.trim()) {
      setParseError('Please paste student list text before analyzing.');
      return;
    }
    setParseError('');
    setIsProcessing(true);
    setTimeout(() => {
      const extracted = extractStudentsFromText(pastedText);
      finishExtraction(extracted);
    }, 200);
  };

  // Load sample government school class roster for 1-click test
  const loadSampleRoster = () => {
    const sample = [
      { id: 101, rollNo: 1, name: 'Ananya Verma', gender: 'female', age: 8, level: 'Grade 1.2', status: 'unassessed' },
      { id: 102, rollNo: 2, name: 'Vikram Singh', gender: 'male', age: 8, level: 'Grade 1.4', status: 'unassessed' },
      { id: 103, rollNo: 3, name: 'Manish Kumar', gender: 'male', age: 9, level: 'Grade 1.1', status: 'unassessed' },
      { id: 104, rollNo: 4, name: 'Sunita Meena', gender: 'female', age: 8, level: 'Grade 2.0', status: 'unassessed' },
      { id: 105, rollNo: 5, name: 'Rohit Sahu', gender: 'male', age: 8, level: 'Grade 1.3', status: 'unassessed' }
    ];
    setFileName('Sample_Class3_FLN_Roster.docx');
    setFileSize('14.2 KB');
    setParsedStudents(sample);
    setParseError('');
  };

  const updateParsedRow = (index, field, value) => {
    setParsedStudents(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const removeParsedRow = (index) => {
    setParsedStudents(prev => prev.filter((_, i) => i !== index));
  };

  const addNewParsedRow = () => {
    setParsedStudents(prev => [
      ...prev,
      {
        id: Date.now(),
        rollNo: prev.length + 1,
        name: 'New Student',
        gender: 'male',
        age: 8,
        level: 'Grade 1.4',
        status: 'unassessed'
      }
    ]);
  };

  // Confirm and enroll batch into AppContext
  const handleConfirmEnrollment = async () => {
    if (parsedStudents.length === 0) return;
    await addStudentsBatch(parsedStudents);
    setImportSuccess(true);
    setTimeout(() => {
      setImportSuccess(false);
      setIsImportDocModalOpen(false);
      setCurrentView('dashboard');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      
      {/* Outer Card */}
      <div className="relative w-full max-w-3xl bg-[#090d1f] rounded-[28px] border border-white/15 shadow-2xl overflow-hidden flex flex-col text-slate-100 max-h-[92vh]">
        
        <BorderBeam 
          size={240} 
          duration={8} 
          colorFrom="#06b6d4" 
          colorTo="#8b5cf6" 
          borderWidth={1.5}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
              <FileType className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-display text-white">
                  {lang === 'hi' ? 'दस्तावेज़ (PDF / Word) से छात्र सूची आयात करें' : 'Import Students from PDF / Word Document'}
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                  Auto-Extract
                </span>
              </div>
              <p className="text-xs text-slate-400 font-body">
                {lang === 'hi' 
                  ? 'अपनी विद्यालय उपस्थिति पंजिका, वर्ड या पीडीएफ फाइल अपलोड करें या टेक्स्ट पेस्ट करें।'
                  : 'Upload school register, Word (.docx) or PDF document, or copy-paste the student roster.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsImportDocModalOpen(false)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 pb-2 border-b border-white/5 bg-slate-900/30">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-display transition-all ${
              activeTab === 'upload'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>{lang === 'hi' ? 'दस्तावेज़ अपलोड (PDF, DOCX)' : 'Upload PDF / Word File'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('paste')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-display transition-all ${
              activeTab === 'paste'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ClipboardPaste className="w-4 h-4" />
            <span>{lang === 'hi' ? 'रोस्टर टेक्स्ट पेस्ट करें' : 'Paste Roster Text / Table'}</span>
          </button>

          <div className="ml-auto">
            <button
              type="button"
              onClick={loadSampleRoster}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'डेमो वर्ड फाइल टेस्ट' : 'Test with Sample Roster'}</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* TAB 1: FILE UPLOAD DROPZONE */}
          {activeTab === 'upload' && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 bg-slate-900/50 hover:bg-slate-900/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 group-hover:bg-cyan-500/25 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-white font-display mb-1">
                  {lang === 'hi' ? 'यहाँ फ़ाइल खींचें या ब्राउज़ करें' : 'Drag & Drop your Roster File or Click to Browse'}
                </h4>
                <p className="text-xs text-slate-400 font-body mb-3">
                  Supports <strong className="text-cyan-300">PDF (.pdf)</strong>, <strong className="text-purple-300">Microsoft Word (.docx, .doc)</strong>, Text & CSV
                </p>
                <span className="px-3 py-1 text-[11px] font-mono rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Max file size: 10MB • Direct client-side privacy preserved
                </span>
              </div>

              {fileName && (
                <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-white">{fileName}</span>
                    <span className="text-slate-400">({fileSize})</span>
                  </div>
                  <span className="text-emerald-400 font-mono">Ready</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PASTE TEXT AREA */}
          {activeTab === 'paste' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-mono font-semibold text-slate-300 block mb-1.5 flex items-center justify-between">
                  <span>{lang === 'hi' ? 'छात्रों के नाम अथवा तालिका चिपकाएँ' : 'Paste Student Roster (Names, Roll Numbers or CSV Table)'}</span>
                  <span className="text-[11px] text-slate-400 font-normal">One student per line</span>
                </label>
                <textarea
                  rows={6}
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder={`Example format:\n1. Aarav Sharma, 8, Male\n2. Priya Patel, 8, Female\n3. Deepak Verma, 9, Male\n4. Sunita Yadav, 8, Female`}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-100 placeholder:text-slate-500 font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleParsePastedText}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isProcessing ? 'Analyzing...' : 'Parse & Extract Students'}</span>
                </button>
              </div>
            </div>
          )}

          {/* PARSE ERROR ALERT */}
          {parseError && (
            <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{parseError}</p>
                <p className="text-[11px] text-amber-300/80 mt-0.5">
                  Tip: Copy text from Word or PDF and paste into the "Paste Roster" tab for direct parsing.
                </p>
              </div>
            </div>
          )}

          {/* EXTRACTED PREVIEW TABLE */}
          {parsedStudents.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                    {lang === 'hi' ? 'निकाले गए छात्र विवरण' : 'Extracted Student Candidates'} ({parsedStudents.length})
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={addNewParsedRow}
                  className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Row</span>
                </button>
              </div>

              <div className="border border-slate-700/80 rounded-xl overflow-hidden bg-slate-900/60 max-h-56 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-400 font-mono text-[11px] uppercase sticky top-0">
                    <tr>
                      <th className="p-2.5 pl-3">Roll</th>
                      <th className="p-2.5">Student Name</th>
                      <th className="p-2.5">Gender</th>
                      <th className="p-2.5">Age</th>
                      <th className="p-2.5">Initial FLN Level</th>
                      <th className="p-2.5 pr-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-body">
                    {parsedStudents.map((s, idx) => (
                      <tr key={s.id || idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-2 pl-3 font-mono text-cyan-400 w-16">
                          <input
                            type="number"
                            value={s.rollNo}
                            onChange={(e) => updateParsedRow(idx, 'rollNo', e.target.value)}
                            className="w-12 bg-slate-950/60 border border-slate-700 rounded px-1.5 py-0.5 text-center text-xs"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={s.name}
                            onChange={(e) => updateParsedRow(idx, 'name', e.target.value)}
                            className="w-full bg-slate-950/60 border border-slate-700 rounded px-2 py-0.5 text-xs text-white font-semibold"
                          />
                        </td>
                        <td className="p-2 w-24">
                          <select
                            value={s.gender}
                            onChange={(e) => updateParsedRow(idx, 'gender', e.target.value)}
                            className="bg-slate-950/60 border border-slate-700 rounded px-1.5 py-0.5 text-xs text-slate-300"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </td>
                        <td className="p-2 w-16">
                          <input
                            type="number"
                            value={s.age}
                            onChange={(e) => updateParsedRow(idx, 'age', e.target.value)}
                            className="w-12 bg-slate-950/60 border border-slate-700 rounded px-1.5 py-0.5 text-center text-xs"
                          />
                        </td>
                        <td className="p-2 w-32">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-mono">
                            {s.level || 'Grade 1.2'}
                          </span>
                        </td>
                        <td className="p-2 pr-3 text-right">
                          <button
                            type="button"
                            onClick={() => removeParsedRow(idx)}
                            className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
                            title="Remove student from import"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-5 border-t border-white/10 bg-slate-900/80">
          <div className="text-xs text-slate-400">
            {parsedStudents.length > 0 ? (
              <span className="text-emerald-400 font-semibold">
                ✓ {parsedStudents.length} student{parsedStudents.length > 1 ? 's' : ''} ready to enroll
              </span>
            ) : (
              <span>Select document or paste text to begin</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsImportDocModalOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Cancel
            </button>

            <ShimmerButton
              type="button"
              onClick={handleConfirmEnrollment}
              disabled={parsedStudents.length === 0}
              shimmerColor="#06b6d4"
              className="px-6 py-2.5 text-white font-bold text-xs bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/25 border-none disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="flex items-center gap-2">
                {importSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Enrolled into Cockpit!</span>
                  </>
                ) : (
                  <>
                    <span>Enroll {parsedStudents.length > 0 ? `(${parsedStudents.length}) Students` : ''}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </span>
            </ShimmerButton>
          </div>
        </div>

      </div>
    </div>
  );
}
