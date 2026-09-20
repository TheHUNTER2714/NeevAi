import React, { createContext, useContext, useState, useEffect } from 'react';
import { STUDENTS_DATA, TWO_DEMO_STUDENTS } from '../data/classroomData';
import { 
  getSupabaseCredentials, 
  saveSupabaseCredentials, 
  syncTeacherToCloud, 
  syncStudentToCloud, 
  syncAssessmentToCloud 
} from '../lib/supabase';

const AppContext = createContext(null);

export const DEMO_TEACHER = {
  id: 'tch-sunita-1',
  name: 'Sunita Devi',
  nameHi: 'सुनीता देवी',
  school: 'Govt. Primary School, Kheda',
  schoolHi: 'शासकीय प्राथमिक शाला, खेड़ा',
  district: 'Bilaspur',
  state: 'Chhattisgarh',
  email: 'sunita.devi.edu@gov.in',
  phone: '+91 98271 45092',
  grade: 'Grade 3',
  isDemo: true,
  isAuthenticated: true
};

export const UNAUTHENTICATED_TEACHER = {
  id: null,
  name: '',
  nameHi: '',
  school: '',
  schoolHi: '',
  district: '',
  state: '',
  email: '',
  phone: '',
  grade: 'Grade 3',
  isDemo: false,
  isAuthenticated: false
};

export const DEMO_LEARNING_CYCLES = [
  {
    id: 'cycle-priya-1',
    studentId: 'stu-1',
    studentName: 'Priya Sharma',
    studentNameHi: 'प्रिया शर्मा',
    rollNo: 1,
    cycleName: '2-Digit Subtraction with Regrouping',
    cycleNameHi: 'घटाव में पुनर्समूहन (उधार) संक्रिया',
    step: 3,
    baselineScore: 25,
    baselineLevel: 'Grade 1.2',
    targetGap: 'Top-From-Bottom Subtraction (52 - 27 = 35)',
    targetGapHi: 'अंक उलटाव भ्रांति (उधार न लेना)',
    intervention: '10-Rupee Note & Coin Exchange Station (15-min)',
    interventionHi: '10 के नोट और सिक्कों का खेल (15-मिनट)',
    reassessmentScore: null,
    reassessmentLevel: null,
    growth: 'In Progress...',
    status: 'in_progress',
    date: 'Active Now'
  },
  {
    id: 'cycle-aarav-1',
    studentId: 'stu-2',
    studentName: 'Aarav Patel',
    studentNameHi: 'आरव पटेल',
    rollNo: 2,
    cycleName: 'Oral Reading Fluency & Conjunct Matras',
    cycleNameHi: 'मौखिक पठन प्रवाह एवं संयुक्त मात्राएं',
    step: 5,
    baselineScore: 22,
    baselineLevel: '18 WCPM',
    targetGap: 'Spelling letter-by-letter with long pauses',
    targetGapHi: 'अक्षर जोड़-जोड़ कर पढ़ना, लंबे ठहराव',
    intervention: 'Choral Echo Reading & Sight-Word Hopscotch',
    interventionHi: 'समूह प्रतिध्वनि पठन एवं शब्द ग्रिड कूद',
    reassessmentScore: 76,
    reassessmentLevel: '44 WCPM',
    growth: '+54% Fluency Gain',
    status: 'gap_closed',
    date: 'Completed'
  }
];

const DEFAULT_TEACHER = UNAUTHENTICATED_TEACHER;

const DEFAULT_CLASSES = [
  { 
    id: 'cls-3a', 
    name: 'Class 3 — Section A', 
    nameHi: 'कक्षा 3 — वर्ग अ', 
    grade: 'Grade 3', 
    section: 'A', 
    year: '2025-2026', 
    targetFLN: 'Grade 3 Reading Fluency & 2-Digit Regrouping' 
  },
  { 
    id: 'cls-2b', 
    name: 'Class 2 — Section B (Foundational)', 
    nameHi: 'कक्षा 2 — वर्ग ब (बुनियादी)', 
    grade: 'Grade 2', 
    section: 'B', 
    year: '2025-2026', 
    targetFLN: 'Letter Recognition & 1-Digit Number Sense' 
  }
];

const DEFAULT_ASSESSMENTS = [
  {
    id: 'asmt-fln-3a',
    title: 'Grade 3 ASER & CBSE FLN Screener',
    titleHi: 'कक्षा 3 ASER व CBSE FLN बुनियादी नैदानिक जांच',
    grade: 'Grade 3',
    subject: 'Combined FLN',
    numCompare: {
      left: 7,
      right: 5,
      correct: 7,
      promptEn: 'Which number is greater?',
      promptHi: 'कौन सी संख्या बड़ी है?'
    },
    mathProblem: {
      expression: '52 − 27',
      promptEn: 'Fifty-two minus twenty-seven. What is the answer?',
      promptHi: 'बावन में से सत्ताईस घटाएं। उत्तर क्या होगा?',
      correctAnswer: '25',
      misconceptions: [
        { code: '35', label: 'Top-From-Bottom Independent Subtraction (Missing Regrouping)' },
        { code: '46', label: 'Forgotten Tens Decrement' }
      ]
    },
    readingTest: {
      textHi: 'राम स्कूल जाता है और किताब पढ़ता है।',
      textEn: 'The quick brown fox jumps over the lazy dog.',
      targetWcpm: 38,
      gradeLevel: 'Grade 2.8 Fluency'
    }
  },
  {
    id: 'asmt-fln-2b',
    title: 'Grade 2 Addition & Story Screener',
    titleHi: 'कक्षा 2 जोड़ एवं मौखिक शब्द धाराप्रवाह जांच',
    grade: 'Grade 2',
    subject: 'Combined FLN',
    numCompare: {
      left: 9,
      right: 4,
      correct: 9,
      promptEn: 'Which number is greater?',
      promptHi: 'कौन सी संख्या बड़ी है?'
    },
    mathProblem: {
      expression: '18 + 15',
      promptEn: 'Eighteen plus fifteen. What is the answer?',
      promptHi: 'अठारह और पंद्रह को जोड़ें। उत्तर क्या होगा?',
      correctAnswer: '33',
      misconceptions: [
        { code: '213', label: 'Place-Value Concatenation without Carry' },
        { code: '23', label: 'Carrying digit dropped' }
      ]
    },
    readingTest: {
      textHi: 'कमल घर चल कर मीठे फल खा।',
      textEn: 'Mina plays with a little brown puppy.',
      targetWcpm: 28,
      gradeLevel: 'Grade 2.0 Fluency'
    }
  }
];

export function AppProvider({ children }) {
  // 1. Language state: 'en' or 'hi'
  const [lang, setLang] = useState(() => localStorage.getItem('learnlens_lang') || 'en');

  // 2. Current View state (intro page starting before overview page)
  const [currentView, setCurrentView] = useState('intro');

  // 3. Upwise theme intensity: 'subtle', 'balanced', 'vibrant'
  const [themeIntensity, setThemeIntensity] = useState(
    () => localStorage.getItem('learnlens_theme_intensity') || 'balanced'
  );

  // 4. Teacher & School state (Default is UNAUTHENTICATED)
  const [teacher, setTeacher] = useState(() => {
    const saved = localStorage.getItem('learnlens_teacher');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      } catch (_) {}
    }
    return UNAUTHENTICATED_TEACHER;
  });

  // 5. Classes state
  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem('learnlens_classes');
    return saved ? JSON.parse(saved) : DEFAULT_CLASSES;
  });
  const [activeClassId, setActiveClassId] = useState('cls-3a');

  // 6. Assessments state (Teacher Created & Benchmarks)
  const [assessments, setAssessments] = useState(() => {
    const saved = localStorage.getItem('learnlens_assessments');
    return saved ? JSON.parse(saved) : DEFAULT_ASSESSMENTS;
  });
  const [activeAssessmentId, setActiveAssessmentId] = useState(() => {
    return localStorage.getItem('learnlens_active_assessment_id') || 'asmt-fln-3a';
  });

  // 7. Students state
  // Clean onboarding: real teachers start with [] (zero pre-loaded student data).
  // Demo mode has exactly the 2 demo students (Priya Sharma & Aarav Patel).
  const [students, setStudents] = useState(() => {
    const savedTeacherStr = localStorage.getItem('learnlens_teacher');
    let isDemo = false;
    let isAuthenticated = false;
    let email = '';
    if (savedTeacherStr) {
      try {
        const tObj = JSON.parse(savedTeacherStr);
        isDemo = !!tObj.isDemo;
        isAuthenticated = !!tObj.isAuthenticated;
        email = tObj.email || '';
      } catch (_) {}
    }

    // Unauthenticated: clean empty slate!
    if (!isAuthenticated) {
      return [];
    }

    // Demo mode: exactly 2 demo students
    if (isDemo) {
      return TWO_DEMO_STUDENTS;
    }

    // Authenticated real educator: load their specific enrolled students only
    if (email) {
      const savedReal = localStorage.getItem(`learnlens_real_students_${email}`);
      if (savedReal) {
        try {
          const parsed = JSON.parse(savedReal);
          if (Array.isArray(parsed)) return parsed;
        } catch (_) {}
      }
    }

    // If new login or no prior students: strictly clean empty array!
    return [];
  });

  // 8. Selected student for inspection modal
  const [selectedStudent, setSelectedStudent] = useState(null);

  // 9. Assistant drawer state
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // 10. Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isCreateAssessmentModalOpen, setIsCreateAssessmentModalOpen] = useState(false);
  const [isImportDocModalOpen, setIsImportDocModalOpen] = useState(false);
  const [assessmentTargetStudent, setAssessmentTargetStudent] = useState(null);

  // 11. Supabase configuration status
  const [supabaseConfig, setSupabaseConfig] = useState(() => getSupabaseCredentials());

  // 12. Learning Improvement Cycle Tracking state
  // Demo mode gets 2 demo cycles for Priya Sharma & Aarav Patel.
  // Real educators and guests start with [] (zero pre-data!).
  const [learningCycles, setLearningCycles] = useState(() => {
    const savedTeacherStr = localStorage.getItem('learnlens_teacher');
    let isDemo = false;
    let isAuthenticated = false;
    let email = '';
    if (savedTeacherStr) {
      try {
        const tObj = JSON.parse(savedTeacherStr);
        isDemo = !!tObj.isDemo;
        isAuthenticated = !!tObj.isAuthenticated;
        email = tObj.email || '';
      } catch (_) {}
    }

    if (!isAuthenticated) return [];
    if (isDemo) return DEMO_LEARNING_CYCLES;

    if (email) {
      const savedCycles = localStorage.getItem(`learnlens_cycles_${email}`);
      if (savedCycles) {
        try {
          const parsed = JSON.parse(savedCycles);
          if (Array.isArray(parsed)) return parsed;
        } catch (_) {}
      }
    }
    return [];
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('learnlens_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('learnlens_theme_intensity', themeIntensity);
  }, [themeIntensity]);

  useEffect(() => {
    localStorage.setItem('learnlens_teacher', JSON.stringify(teacher));
  }, [teacher]);

  useEffect(() => {
    localStorage.setItem('learnlens_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('learnlens_students', JSON.stringify(students));
    if (teacher && !teacher.isDemo && teacher.email) {
      localStorage.setItem(`learnlens_real_students_${teacher.email}`, JSON.stringify(students));
    }
  }, [students, teacher]);

  useEffect(() => {
    localStorage.setItem('learnlens_assessments', JSON.stringify(assessments));
  }, [assessments]);

  useEffect(() => {
    localStorage.setItem('learnlens_active_assessment_id', activeAssessmentId);
  }, [activeAssessmentId]);

  useEffect(() => {
    localStorage.setItem('learnlens_learning_cycles', JSON.stringify(learningCycles));
    if (teacher && !teacher.isDemo && teacher.email) {
      localStorage.setItem(`learnlens_cycles_${teacher.email}`, JSON.stringify(learningCycles));
    }
  }, [learningCycles, teacher]);

  // -------------------------------------------------------------
  // ACTIONS: TEACHER & SCHOOL MANAGEMENT
  // -------------------------------------------------------------
  const updateTeacherProfile = async (newProfile) => {
    const updated = { 
      ...teacher, 
      ...newProfile, 
      isDemo: false, 
      isAuthenticated: true 
    };
    setTeacher(updated);
    localStorage.setItem('learnlens_teacher', JSON.stringify(updated));
    try {
      await syncTeacherToCloud(updated);
    } catch (e) {
      console.warn('Teacher cloud sync error:', e);
    }
    setCurrentView('dashboard');
  };

  const loginTeacher = async ({ email, name, password }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const updated = {
      id: `tch-${Date.now()}`,
      name: name || (cleanEmail ? cleanEmail.split('@')[0] : 'Educator'),
      nameHi: name || 'शिक्षक',
      school: 'Primary School',
      schoolHi: 'शासकीय प्राथमिक शाला',
      district: 'District Center',
      state: 'State',
      email: cleanEmail,
      phone: '',
      grade: 'Grade 3',
      isDemo: false,
      isAuthenticated: true
    };
    setTeacher(updated);
    localStorage.setItem('learnlens_teacher', JSON.stringify(updated));

    // Load saved students ONLY if this educator previously added them, otherwise [] (ZERO PRE-DATA)
    const savedKey = `learnlens_real_students_${cleanEmail || 'custom'}`;
    const savedReal = localStorage.getItem(savedKey);
    let realStudents = [];
    if (savedReal) {
      try {
        const p = JSON.parse(savedReal);
        if (Array.isArray(p)) realStudents = p;
      } catch (_) {}
    }
    setStudents(realStudents);
    localStorage.setItem('learnlens_students', JSON.stringify(realStudents));

    // Load saved cycles ONLY if this educator had them, otherwise [] (ZERO PRE-DATA)
    const cycleKey = `learnlens_cycles_${cleanEmail || 'custom'}`;
    const savedCycles = localStorage.getItem(cycleKey);
    let realCycles = [];
    if (savedCycles) {
      try {
        const p = JSON.parse(savedCycles);
        if (Array.isArray(p)) realCycles = p;
      } catch (_) {}
    }
    setLearningCycles(realCycles);
    localStorage.setItem('learnlens_learning_cycles', JSON.stringify(realCycles));

    setCurrentView('dashboard');
    setIsAuthModalOpen(false);
    return updated;
  };

  const registerTeacher = async (details) => {
    const cleanEmail = (details.email || `${(details.name || 'educator').toLowerCase().replace(/\s+/g, '.')}@school.edu`).trim().toLowerCase();
    const newTeacher = {
      id: `tch-${Date.now()}`,
      name: details.name,
      nameHi: details.nameHi || details.name,
      school: details.school,
      schoolHi: details.schoolHi || details.school,
      district: details.district,
      state: details.state,
      email: cleanEmail,
      phone: details.phone || '',
      grade: details.grade || 'Grade 3',
      isDemo: false,
      isAuthenticated: true
    };
    setTeacher(newTeacher);
    localStorage.setItem('learnlens_teacher', JSON.stringify(newTeacher));

    // Preserve existing students if this educator previously enrolled them; otherwise clean empty roster
    const studentStorageKey = `learnlens_real_students_${cleanEmail}`;
    const savedRealStudents = localStorage.getItem(studentStorageKey);
    let teacherStudents = [];
    if (savedRealStudents) {
      try {
        const parsed = JSON.parse(savedRealStudents);
        if (Array.isArray(parsed)) teacherStudents = parsed;
      } catch (_) {}
    }
    setStudents(teacherStudents);
    localStorage.setItem('learnlens_students', JSON.stringify(teacherStudents));
    localStorage.setItem(studentStorageKey, JSON.stringify(teacherStudents));

    // Preserve existing cycles if this educator previously had them; otherwise clean empty cycles
    const cycleStorageKey = `learnlens_cycles_${cleanEmail}`;
    const savedCycles = localStorage.getItem(cycleStorageKey);
    let teacherCycles = [];
    if (savedCycles) {
      try {
        const parsed = JSON.parse(savedCycles);
        if (Array.isArray(parsed)) teacherCycles = parsed;
      } catch (_) {}
    }
    setLearningCycles(teacherCycles);
    localStorage.setItem('learnlens_learning_cycles', JSON.stringify(teacherCycles));
    localStorage.setItem(cycleStorageKey, JSON.stringify(teacherCycles));

    setCurrentView('dashboard');
    setIsAuthModalOpen(false);

    // Asynchronous background sync to Supabase without blocking UI
    syncTeacherToCloud(newTeacher).catch((e) => {
      console.warn('Teacher cloud sync background error:', e);
    });

    return newTeacher;
  };

  const setDemoTeacher = () => {
    setTeacher(DEMO_TEACHER);
    localStorage.setItem('learnlens_teacher', JSON.stringify(DEMO_TEACHER));

    // Demo mode has exactly the 2 demo students & 2 demo cycles
    setStudents(TWO_DEMO_STUDENTS);
    localStorage.setItem('learnlens_students', JSON.stringify(TWO_DEMO_STUDENTS));

    setLearningCycles(DEMO_LEARNING_CYCLES);
    localStorage.setItem('learnlens_learning_cycles', JSON.stringify(DEMO_LEARNING_CYCLES));

    setCurrentView('dashboard');
    setIsAuthModalOpen(false);
  };

  const logoutTeacher = () => {
    setTeacher(UNAUTHENTICATED_TEACHER);
    localStorage.removeItem('learnlens_teacher');
    setStudents([]);
    localStorage.setItem('learnlens_students', JSON.stringify([]));
    setLearningCycles([]);
    localStorage.removeItem('learnlens_learning_cycles');
    setSelectedStudent(null);
    setCurrentView('intro');
  };

  const resetToDemoData = () => {
    setTeacher(DEMO_TEACHER);
    localStorage.setItem('learnlens_teacher', JSON.stringify(DEMO_TEACHER));
    setStudents(TWO_DEMO_STUDENTS);
    localStorage.setItem('learnlens_students', JSON.stringify(TWO_DEMO_STUDENTS));
    setLearningCycles(DEMO_LEARNING_CYCLES);
    localStorage.setItem('learnlens_learning_cycles', JSON.stringify(DEMO_LEARNING_CYCLES));
  };

  // -------------------------------------------------------------
  // ACTIONS: CLASS MANAGEMENT
  // -------------------------------------------------------------
  const addClass = (classData) => {
    const newClass = {
      id: `cls-${Date.now()}`,
      name: classData.name,
      nameHi: classData.nameHi || classData.name,
      grade: classData.grade || 'Grade 3',
      section: classData.section || 'A',
      year: classData.year || '2025-2026',
      targetFLN: classData.targetFLN || 'FLN Foundational Recovery'
    };
    setClasses((prev) => [...prev, newClass]);
    setActiveClassId(newClass.id);
  };

  // -------------------------------------------------------------
  // ACTIONS: STUDENT MANAGEMENT
  // -------------------------------------------------------------
  const addStudent = async (studentData) => {
    const newRoll = studentData.rollNo ? Number(studentData.rollNo) : students.length + 1;
    const initialStatus = studentData.status || (studentData.level?.includes('1') ? 'intervention' : 'attention');
    
    // Auto calculate baseline skill vector based on level
    let defaultSkills = {
      numberSense: 75,
      placeValue: 40,
      addition: 60,
      subtractionBorrowing: 35,
      letterSound: 80,
      reading: 50
    };

    if (studentData.level === 'Grade 1' || initialStatus === 'intervention') {
      defaultSkills = {
        numberSense: 50,
        placeValue: 20,
        addition: 40,
        subtractionBorrowing: 15,
        letterSound: 60,
        reading: 25
      };
    } else if (studentData.level === 'Grade 3+' || initialStatus === 'excelling') {
      defaultSkills = {
        numberSense: 95,
        placeValue: 90,
        addition: 92,
        subtractionBorrowing: 88,
        letterSound: 98,
        reading: 92
      };
    }

    const newStudent = {
      id: Date.now(),
      rollNo: newRoll,
      name: studentData.name,
      nameHi: studentData.nameHi || studentData.name,
      age: Number(studentData.age) || 8,
      gender: studentData.gender || 'other',
      status: initialStatus,
      currentLevel: studentData.level || 'Grade 1.4',
      currentLevelHi: studentData.levelHi || 'कक्षा 1.4',
      tarlGroup: initialStatus === 'intervention' ? 'Group B — Developing' : 'Group C — Fluent',
      tarlGroupHi: initialStatus === 'intervention' ? 'समूह ख — विकासशील' : 'समूह ग — धाराप्रवाह',
      attendance: studentData.attendance ? `${studentData.attendance}%` : '92%',
      primaryGap: studentData.primaryGap || 'Subtraction with Borrowing (Regrouping)',
      primaryGapHi: studentData.primaryGapHi || 'घटाव में उधार लेना (पुनर्समूहन)',
      secondaryGap: studentData.secondaryGap || 'Oral reading fluency & conjunct matras',
      secondaryGapHi: studentData.secondaryGapHi || 'मौखिक पठन धाराप्रवाह',
      skills: defaultSkills,
      detectedMisconception: initialStatus === 'intervention' ? {
        title: 'Top-From-Bottom Inversion',
        example: '52 - 27 = 35',
        remediation: '10-Rupee Note exchange activity with matchstick bundles.'
      } : null,
      recommendedPlan: [
        { day: 'Day 1', task: 'Manipulative Counting with Matchstick Bundles', done: false },
        { day: 'Day 2', task: '10-Rupee Note & Coin Exchange station drill', done: false },
        { day: 'Day 3', task: 'Slate bookkeeping: slash and write first', done: false },
        { day: 'Day 4', task: 'Peer relay challenge in TaRL circle', done: false },
        { day: 'Day 5', task: '30-Second Formative Check & Exit Ticket', done: false }
      ]
    };

    setStudents((prev) => [newStudent, ...prev]);
    await syncStudentToCloud(newStudent);
    return newStudent;
  };

  const deleteStudent = (studentId) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    if (selectedStudent?.id === studentId) setSelectedStudent(null);
  };

  const addStudentsBatch = async (newStudentsList) => {
    const startingRoll = students.length + 1;
    const prepared = newStudentsList.map((s, idx) => ({
      id: Date.now() + idx,
      rollNo: s.rollNo ? Number(s.rollNo) : startingRoll + idx,
      name: s.name,
      nameHi: s.nameHi || s.name,
      age: Number(s.age) || 8,
      gender: s.gender || 'other',
      status: s.status || 'unassessed',
      currentLevel: s.level || 'Grade 1.2',
      currentLevelHi: s.levelHi || 'कक्षा 1.2',
      tarlGroup: 'Group B — Developing',
      tarlGroupHi: 'समूह ख — विकासशील',
      attendance: s.attendance ? (String(s.attendance).includes('%') ? s.attendance : `${s.attendance}%`) : '95%',
      primaryGap: s.primaryGap || 'Pending baseline assessment',
      primaryGapHi: s.primaryGapHi || 'प्रारंभिक जांच प्रतीक्षित',
      skills: {
        numberSense: 50,
        placeValue: 30,
        addition: 40,
        subtractionBorrowing: 20,
        letterSound: 60,
        reading: 35
      },
      growthHistory: [
        { date: "Enrollment", score: 35, label: "Roster Enrolled" }
      ],
      recommendedPlan: [
        { day: "Day 1", task: "Administer ASER & CBSE FLN Diagnostic Screener", done: false },
        { day: "Day 2", task: "Assign to initial TaRL group based on error analysis", done: false },
        { day: "Day 3", task: "Begin daily 15-minute concrete manipulative station", done: false },
        { day: "Day 4", task: "Peer learning check", done: false },
        { day: "Day 5", task: "Formative exit check", done: false }
      ]
    }));

    const updated = [...students, ...prepared];
    setStudents(updated);
    localStorage.setItem('learnlens_students', JSON.stringify(updated));

    if (teacher && !teacher.isDemo && teacher.email) {
      localStorage.setItem(`learnlens_real_students_${teacher.email}`, JSON.stringify(updated));
    }
    return updated;
  };

  // -------------------------------------------------------------
  // ACTIONS: ASSESSMENT ENGINE & COGNITIVE ANALYSIS
  // -------------------------------------------------------------
  const recordAssessment = async (studentId, assessmentData) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return null;

    const mathAns = assessmentData.mathAnswer ? String(assessmentData.mathAnswer).trim() : '35';
    const numAns = Number(mathAns);

    // Cognitive Diagnostic Algorithm for 52 - 27
    let misconceptionDetected = null;
    let newStatus = student.status;
    let newLevel = student.currentLevel;
    let newLevelHi = student.currentLevelHi;
    let newTarlGroup = student.tarlGroup;
    let newTarlGroupHi = student.tarlGroupHi;
    let subSkillScore = 35;

    if (numAns === 25) {
      // Correct!
      newStatus = 'on_track';
      newLevel = 'Grade 3.0';
      newLevelHi = 'कक्षा 3.0';
      newTarlGroup = 'Group C — Fluent';
      newTarlGroupHi = 'समूह ग — धाराप्रवाह';
      subSkillScore = 85;
    } else if (numAns === 35) {
      // Top-From-Bottom Independent Inversion
      misconceptionDetected = {
        title: 'Top-From-Bottom Independent Subtraction',
        example: '52 - 27 = 35 (computed 7 - 2 = 5 and 5 - 2 = 3)',
        remediation: '10-Rupee Note Exchange game to physically untie 1 ten.'
      };
      newStatus = 'intervention';
      newLevel = 'Grade 1.4';
      newLevelHi = 'कक्षा 1.4';
      newTarlGroup = 'Group B — Developing (Subtraction Focus)';
      newTarlGroupHi = 'समूह ख — विकासशील (घटाव सहारा)';
      subSkillScore = 35;
    } else if (numAns === 46) {
      // Forgotten Decrement
      misconceptionDetected = {
        title: 'Forgotten Tens Decrement',
        example: '52 - 27 = 46 (borrowed 10 to get 12 - 7 = 5, but forgot to reduce 5 to 4)',
        remediation: 'Institute "Slash & Write First" visible bookkeeping on slate.'
      };
      newStatus = 'attention';
      newLevel = 'Grade 2.2';
      newLevelHi = 'कक्षा 2.2';
      newTarlGroup = 'Group B — Developing';
      newTarlGroupHi = 'समूह ख — विकासशील';
      subSkillScore = 55;
    } else {
      newStatus = 'attention';
      newLevel = 'Grade 2.0';
      newLevelHi = 'कक्षा 2.0';
      subSkillScore = 45;
    }

    const updatedStudent = {
      ...student,
      status: newStatus,
      currentLevel: newLevel,
      currentLevelHi: newLevelHi,
      tarlGroup: newTarlGroup,
      tarlGroupHi: newTarlGroupHi,
      detectedMisconception: misconceptionDetected,
      skills: {
        ...student.skills,
        subtractionBorrowing: subSkillScore,
        reading: assessmentData.wcpm ? Math.min(100, Math.round(Number(assessmentData.wcpm) * 1.8)) : student.skills.reading
      }
    };

    setStudents((prev) => prev.map((s) => s.id === studentId ? updatedStudent : s));

    // Update or add to Learning Cycle
    const newCycleEntry = {
      id: `cycle-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      studentNameHi: student.nameHi,
      rollNo: student.rollNo,
      cycleName: 'Foundational Competency Assessment',
      cycleNameHi: 'बुनियादी दक्षता आकलन',
      step: numAns === 25 ? 5 : 2, // If gap detected, go to Step 2 (Identify Gaps)
      baselineScore: subSkillScore,
      baselineLevel: newLevel,
      targetGap: misconceptionDetected ? misconceptionDetected.title : 'Subtraction with regrouping',
      targetGapHi: misconceptionDetected ? 'अंक उलटाव भ्रांति' : 'घटाव में पुनर्समूहन',
      intervention: '10-Rupee Note & Coin Exchange (15-min Manipulative Session)',
      interventionHi: '10 के नोट और सिक्कों का खेल (15-मिनट)',
      reassessmentScore: numAns === 25 ? 88 : null,
      reassessmentLevel: numAns === 25 ? 'Grade 3.0' : null,
      growth: numAns === 25 ? '+53% Growth' : 'Action Recommended',
      status: numAns === 25 ? 'gap_closed' : 'in_progress',
      date: 'Just Now'
    };

    setLearningCycles((prev) => [newCycleEntry, ...prev]);

    // Sync assessment to cloud
    await syncAssessmentToCloud({
      student_id: student.id,
      math_problem: '52 - 27',
      student_math_answer: mathAns,
      detected_misconception: misconceptionDetected ? misconceptionDetected.title : null,
      cognitive_diagnosis: misconceptionDetected ? misconceptionDetected.example : 'Normal evaluation',
      recommended_tarl_group: newTarlGroup,
      wcpm: Number(assessmentData.wcpm) || 35
    });

    await syncStudentToCloud(updatedStudent);

    return updatedStudent;
  };

  // -------------------------------------------------------------
  // ACTIONS: REASSESSMENT & LEARNING CYCLE STEP ADVANCEMENT
  // -------------------------------------------------------------
  const advanceLearningCycle = (cycleId, reassessmentScore = 86) => {
    setLearningCycles((prev) => 
      prev.map((c) => {
        if (c.id === cycleId) {
          return {
            ...c,
            step: 5,
            reassessmentScore: Number(reassessmentScore),
            reassessmentLevel: 'Grade 3.1',
            growth: `+${Number(reassessmentScore) - c.baselineScore}% Mastery Recovery`,
            status: 'gap_closed',
            date: 'Completed'
          };
        }
        return c;
      })
    );
  };

  // -------------------------------------------------------------
  // ACTIONS: TEACHER CREATED ASSESSMENTS
  // -------------------------------------------------------------
  const createAssessment = (newAsmtData) => {
    const leftVal = Number(newAsmtData.numLeft) || 8;
    const rightVal = Number(newAsmtData.numRight) || 6;
    const correctVal = Math.max(leftVal, rightVal);

    const newAsmt = {
      id: `asmt-${Date.now()}`,
      title: newAsmtData.title || 'Teacher FLN Diagnostic Screener',
      titleHi: newAsmtData.titleHi || newAsmtData.title || 'शिक्षक FLN नैदानिक जांच',
      grade: newAsmtData.grade || 'Grade 3',
      subject: newAsmtData.subject || 'Combined FLN',
      numCompare: {
        left: leftVal,
        right: rightVal,
        correct: correctVal,
        promptEn: 'Which number is greater?',
        promptHi: 'कौन सी संख्या बड़ी है?'
      },
      mathProblem: {
        expression: newAsmtData.expression || '43 − 18',
        promptEn: newAsmtData.mathPromptEn || `${newAsmtData.expression || '43 minus 18'}. What is the answer?`,
        promptHi: newAsmtData.mathPromptHi || `${newAsmtData.expression || 'तैंतालीस में से अठारह घटाएं'}। उत्तर क्या होगा?`,
        correctAnswer: String(newAsmtData.correctAnswer || '25').trim(),
        misconceptions: [
          {
            code: String(newAsmtData.misconceptionCode || '35').trim(),
            label: newAsmtData.misconceptionTitle || 'Top-From-Bottom Subtraction (Missing Regrouping)'
          }
        ]
      },
      readingTest: {
        textHi: newAsmtData.readingTextHi || 'सूरज पूर्व से निकलता है और बच्चे स्कूल जाते हैं।',
        textEn: newAsmtData.readingTextEn || 'The morning sun shines bright and children walk to school.',
        targetWcpm: Number(newAsmtData.targetWcpm) || 35,
        gradeLevel: `${newAsmtData.grade || 'Grade 3'} Fluency`
      }
    };

    setAssessments((prev) => [newAsmt, ...prev]);
    setActiveAssessmentId(newAsmt.id);
    return newAsmt;
  };

  // -------------------------------------------------------------
  // ACTIONS: SUPABASE CREDENTIALS
  // -------------------------------------------------------------
  const updateSupabaseKeys = (url, key) => {
    saveSupabaseCredentials(url, key);
    setSupabaseConfig(getSupabaseCredentials());
  };

  const activeClass = classes.find((c) => c.id === activeClassId) || classes[0];
  const activeAssessment = assessments.find((a) => a.id === activeAssessmentId) || assessments[0] || DEFAULT_ASSESSMENTS[0];

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        currentView,
        setCurrentView,
        themeIntensity,
        setThemeIntensity,
        teacher,
        updateTeacherProfile,
        loginTeacher,
        registerTeacher,
        setDemoTeacher,
        logoutTeacher,
        classes,
        activeClass,
        activeClassId,
        setActiveClassId,
        addClass,
        assessments,
        activeAssessmentId,
        setActiveAssessmentId,
        activeAssessment,
        createAssessment,
        students,
        addStudent,
        addStudentsBatch,
        deleteStudent,
        resetToDemoData,
        selectedStudent,
        setSelectedStudent,
        recordAssessment,
        learningCycles,
        advanceLearningCycle,
        supabaseConfig,
        updateSupabaseKeys,
        isAssistantOpen,
        setIsAssistantOpen,
        // Modal toggles
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAddStudentModalOpen,
        setIsAddStudentModalOpen,
        isAddClassModalOpen,
        setIsAddClassModalOpen,
        isAssessmentModalOpen,
        setIsAssessmentModalOpen,
        isCreateAssessmentModalOpen,
        setIsCreateAssessmentModalOpen,
        isImportDocModalOpen,
        setIsImportDocModalOpen,
        assessmentTargetStudent,
        setAssessmentTargetStudent
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
