// Comprehensive Classroom & Student Dataset based on ASER & TaRL FLN frameworks

export const CLASS_METADATA = {
  id: "class-3a",
  name: "Class 3 — Section A",
  grade: 3,
  section: "A",
  academicYear: "2025-2026",
  schoolName: "Rajkiya Sarvodaya Vidyalaya, Sector 4",
  teacherName: "Sunita Sharma",
  totalStudents: 0,
  assessedStudents: 0,
  pendingStudents: 0,
  flnTargetDate: "March 2026",
  nipunTargetStatus: "FLN Foundational Recovery"
};

export const FLN_COMPETENCY_TAXONOMY = {
  literacy: [
    { id: "lit-1", name: "Letter / Akshar Recognition", nameHi: "अक्षर पहचान", max: 100, benchmark: 80, desc: "Recognize 25+ letters/varnamala accurately" },
    { id: "lit-2", name: "Letter-Sound Association", nameHi: "ध्वनि-अक्षर संबंध", max: 100, benchmark: 75, desc: "Connect phonemes to symbols & matras" },
    { id: "lit-3", name: "Word Decoding", nameHi: "शब्द पठन", max: 100, benchmark: 70, desc: "Read 2-3 letter simple and conjunct words" },
    { id: "lit-4", name: "Sentence Fluency", nameHi: "वाक्य धाराप्रवाह", max: 100, benchmark: 65, desc: "Read sentences at 30-40 WCPM with expression" },
    { id: "lit-5", name: "Reading Comprehension", nameHi: "समझ के साथ पढ़ना", max: 100, benchmark: 60, desc: "Answer direct inferential questions from a 4-line story" },
  ],
  numeracy: [
    { id: "num-1", name: "1-Digit Number Sense (1-9)", nameHi: "1-अंकीय संख्या ज्ञान", max: 100, benchmark: 90, desc: "Quantity matching, counting & comparison" },
    { id: "num-2", name: "2-Digit Place Value (10-99)", nameHi: "दहाई-इकाई स्थानीय मान", max: 100, benchmark: 80, desc: "Tens & ones grouping with concrete objects" },
    { id: "num-3", name: "Addition (with/without carry)", nameHi: "जोड़ (हासिल सहित)", max: 100, benchmark: 75, desc: "Solve 2-digit sums with regrouping" },
    { id: "num-4", name: "Subtraction with Borrowing", nameHi: "घटाव (उधार/पुनर्समूहन)", max: 100, benchmark: 70, desc: "Regrouping across place values (e.g. 52 - 27)" },
    { id: "num-5", name: "Multiplication & Word Problems", nameHi: "गुणा एवं व्यावहारिक प्रश्न", max: 100, benchmark: 60, desc: "Repeated addition and simple real-life story sums" },
  ]
};

export const TWO_DEMO_STUDENTS = [
  {
    id: "stu-1",
    rollNo: 1,
    name: "Priya Sharma",
    nameHi: "प्रिया शर्मा",
    gender: "Female",
    age: 8,
    attendance: "94%",
    status: "intervention",
    currentLevel: "Grade 1.2",
    currentLevelHi: "कक्षा 1.2",
    tarlGroup: "Group B — Borrowing & Problem Solving",
    tarlGroupHi: "समूह ख — घटाव व स्थानीय मान",
    overallScore: 38,
    skills: {
      reading: 42,
      letterSound: 68,
      wordDecoding: 48,
      numberSense: 75,
      placeValue: 35,
      addition: 55,
      subtractionBorrowing: 25,
      comprehension: 40,
    },
    primaryGap: "Subtraction with Borrowing / Regrouping (e.g., 52 - 27 = 35)",
    primaryGapHi: "उधार लेकर घटाव में कठिनाई (जैसे 52 - 27 = 35 लिखना)",
    secondaryGap: "Sentence Reading Fluency (28 WCPM, pauses on conjunct matras)",
    secondaryGapHi: "वाक्य पठन में रुकना (28 WCPM, संयुक्त मात्राओं पर अटकना)",
    detectedMisconception: {
      type: "Top-From-Bottom Independent Digit Subtraction",
      title: "Subtracting smaller digit from larger digit regardless of position",
      example: "52 - 27 = 35 (Student did: 7 - 2 = 5 in units, 5 - 2 = 3 in tens)",
      remediation: "15-min hands-on activity using 10-rupee note & 1-rupee coin exchange game"
    },
    growthHistory: [
      { date: "Baseline (W0)", score: 38, label: "Initial Test" },
      { date: "Week 2", score: 54, label: "After 10-Frame Blocks" },
      { date: "Week 4", score: 80, label: "Post-Intervention Reassessment" }
    ],
    recommendedPlan: [
      { day: "Day 1", task: "Physical matchstick bundles: decompose 1 bundle of 10 into 10 ones", done: true },
      { day: "Day 2", task: "Play 'The Bank Teller': trade one 10-rupee note for ten 1-rupee coins", done: true },
      { day: "Day 3", task: "Step-by-step subtraction grid crossing out the tens digit", done: false },
      { day: "Day 4", task: "Peer-guided pair practice with 3 two-digit problems", done: false },
      { day: "Day 5", task: "Quick 2-minute oral check on 63 - 28", done: false },
    ]
  },
  {
    id: "stu-2",
    rollNo: 2,
    name: "Aarav Patel",
    nameHi: "आरव पटेल",
    gender: "Male",
    age: 8,
    attendance: "96%",
    status: "attention",
    currentLevel: "Grade 2.1",
    currentLevelHi: "कक्षा 2.1",
    tarlGroup: "Group C — Reading Fluency & Phonics",
    tarlGroupHi: "समूह ग — धाराप्रवाह पठन व ध्वनि",
    overallScore: 65,
    skills: {
      reading: 52,
      letterSound: 80,
      wordDecoding: 62,
      numberSense: 88,
      placeValue: 74,
      addition: 75,
      subtractionBorrowing: 60,
      comprehension: 58,
    },
    primaryGap: "Oral Reading Speed on multi-syllabic words (34 WCPM vs 45 benchmark)",
    primaryGapHi: "बहु-अक्षरीय शब्दों में गति धीमी (34 WCPM)",
    secondaryGap: "Word problems involving two operational steps",
    secondaryGapHi: "दो चरणों वाले व्यावहारिक इबारती प्रश्न",
    detectedMisconception: {
      type: "Phonetic Hesitation on Compound Letters",
      title: "Pausing for >4 seconds on conjunct consonants (संयुक्त अक्षर)",
      example: "Reads 'पुस्तकालय' as 'पु...स...त...क...लय'",
      remediation: "Paired Peer Reading with Decodable Graded Primers (PaRL)"
    },
    growthHistory: [
      { date: "Baseline (W0)", score: 48, label: "Initial Test" },
      { date: "Week 2", score: 62, label: "After Paired Reading" },
      { date: "Week 4", score: 81, label: "Post-Intervention Check" }
    ],
    recommendedPlan: [
      { day: "Day 1", task: "Flashcard drill on 10 common conjunct consonants (क्ष, त्र, ज्ञ, श्र)", done: true },
      { day: "Day 2", task: "Paired reading of Level-2 story with fluent peer buddy", done: true },
      { day: "Day 3", task: "Choral echo reading for sentence cadence and expression", done: false },
      { day: "Day 4", task: "Timed 1-minute sight word sprint", done: false },
      { day: "Day 5", task: "Oral story comprehension check", done: false }
    ]
  }
];

export const STUDENTS_DATA = [];

export const TARL_GROUPS = [
  {
    id: "group-a",
    name: "Group A — Foundation",
    nameHi: "समूह क — बुनियादी आधार",
    count: 0,
    color: "rose",
    focusSkill: "Letter Recognition & 1-Digit Numbers",
    focusSkillHi: "अक्षर पहचान व 1-अंकीय संख्या ज्ञान",
    targetGoal: "Recognize all 52 Hindi varnamala & count up to 20 with objects",
    targetGoalHi: "सभी 52 वर्णों की पहचान व 20 तक वस्तुओं से गिनती",
    students: [],
    recommendedActivityId: "act-foundation-1"
  },
  {
    id: "group-b",
    name: "Group B — Developing (Borrowing & Place Value)",
    nameHi: "समूह ख — विकासशील (घटाव व स्थानीय मान)",
    count: 0,
    color: "amber",
    focusSkill: "Subtraction with Regrouping (52 - 27)",
    focusSkillHi: "उधार वाला घटाव एवं दहाई स्थानीय मान",
    targetGoal: "Decompose tens into ones using manipulatives before abstract sums",
    targetGoalHi: "मूर्तिक वस्तुओं द्वारा दहाई से इकाई में पुनर्समूहन की समझ",
    students: [],
    recommendedActivityId: "act-subtraction-borrow"
  },
  {
    id: "group-c",
    name: "Group C — Reading Fluency",
    nameHi: "समूह ग — धाराप्रवाह पठन",
    count: 0,
    color: "cyan",
    focusSkill: "Word Decoding & Sentence Fluency (35+ WCPM)",
    focusSkillHi: "शब्द पठन एवं 35+ शब्द/मिनट की धाराप्रवाह गति",
    targetGoal: "Transition from spelling individual akshars to sight word automaticity",
    targetGoalHi: "अक्षरों को अलग-अलग जोड़कर पढ़ने से पूरे शब्द को एक बार में पढ़ने की ओर बढ़ना",
    students: [],
    recommendedActivityId: "act-reading-fluency"
  },
  {
    id: "group-d",
    name: "Group D — On Track & Excelling",
    nameHi: "समूह घ — स्तरानुकूल एवं उन्नत",
    count: 0,
    color: "emerald",
    focusSkill: "Grade-Level Mastery & Peer Mentoring",
    focusSkillHi: "कक्षा स्तर प्रवीणता एवं सहपाठी शिक्षण",
    targetGoal: "Solve multi-step reasoning story sums & independent chapter reading",
    targetGoalHi: "बहु-चरणीय इबारती सवाल हल करना व स्वतंत्र कहानी पठन",
    students: [],
    recommendedActivityId: "act-accelerated"
  }
];

export function getDynamicTarlGroups(studentsList = []) {
  if (!studentsList || studentsList.length === 0) {
    return [
      {
        id: "group-a",
        name: "Group A — Foundation",
        nameHi: "समूह क — बुनियादी आधार",
        count: 0,
        color: "rose",
        focusSkill: "Letter Recognition & 1-Digit Numbers",
        focusSkillHi: "अक्षर पहचान व 1-अंकीय संख्या ज्ञान",
        targetGoal: "Recognize all 52 Hindi varnamala & count up to 20 with objects",
        targetGoalHi: "सभी 52 वर्णों की पहचान व 20 तक वस्तुओं से गिनती",
        students: [],
        recommendedActivityId: "act-foundation-1"
      },
      {
        id: "group-b",
        name: "Group B — Developing (Borrowing & Place Value)",
        nameHi: "समूह ख — विकासशील (घटाव व स्थानीय मान)",
        count: 0,
        color: "amber",
        focusSkill: "Subtraction with Regrouping (52 - 27)",
        focusSkillHi: "उधार वाला घटाव एवं दहाई स्थानीय मान",
        targetGoal: "Decompose tens into ones using manipulatives before abstract sums",
        targetGoalHi: "मूर्तिक वस्तुओं द्वारा दहाई से इकाई में पुनर्समूहन की समझ",
        students: [],
        recommendedActivityId: "act-subtraction-borrow"
      },
      {
        id: "group-c",
        name: "Group C — Reading Fluency",
        nameHi: "समूह ग — धाराप्रवाह पठन",
        count: 0,
        color: "cyan",
        focusSkill: "Word Decoding & Sentence Fluency (35+ WCPM)",
        focusSkillHi: "शब्द पठन एवं 35+ शब्द/मिनट की धाराप्रवाह गति",
        targetGoal: "Transition from spelling individual akshars to sight word automaticity",
        targetGoalHi: "अक्षरों को अलग-अलग जोड़कर पढ़ने से पूरे शब्द को एक बार में पढ़ने की ओर बढ़ना",
        students: [],
        recommendedActivityId: "act-reading-fluency"
      },
      {
        id: "group-d",
        name: "Group D — On Track & Excelling",
        nameHi: "समूह घ — स्तरानुकूल एवं उन्नत",
        count: 0,
        color: "emerald",
        focusSkill: "Grade-Level Mastery & Peer Mentoring",
        focusSkillHi: "कक्षा स्तर प्रवीणता एवं सहपाठी शिक्षण",
        targetGoal: "Solve multi-step reasoning story sums & independent chapter reading",
        targetGoalHi: "बहु-चरणीय इबारती सवाल हल करना व स्वतंत्र कहानी पठन",
        students: [],
        recommendedActivityId: "act-accelerated"
      }
    ];
  }

  const groupAStudents = [];
  const groupBStudents = [];
  const groupCStudents = [];
  const groupDStudents = [];

  studentsList.forEach((s) => {
    const name = s.name || 'Student';
    const status = s.status || 'unassessed';
    const tGroup = (s.tarlGroup || '').toLowerCase();

    if (status === 'intervention' && (tGroup.includes('a') || (s.skills && s.skills.numberSense < 50))) {
      groupAStudents.push(name);
    } else if (status === 'intervention' || tGroup.includes('b') || (s.primaryGap && s.primaryGap.toLowerCase().includes('subtract'))) {
      groupBStudents.push(name);
    } else if (status === 'attention' || tGroup.includes('c') || (s.skills && s.skills.reading < 50)) {
      groupCStudents.push(name);
    } else {
      groupDStudents.push(name);
    }
  });

  return [
    {
      id: "group-a",
      name: "Group A — Foundation",
      nameHi: "समूह क — बुनियादी आधार",
      count: groupAStudents.length,
      color: "rose",
      focusSkill: "Letter Recognition & 1-Digit Numbers",
      focusSkillHi: "अक्षर पहचान व 1-अंकीय संख्या ज्ञान",
      targetGoal: "Recognize all 52 Hindi varnamala & count up to 20 with objects",
      targetGoalHi: "सभी 52 वर्णों की पहचान व 20 तक वस्तुओं से गिनती",
      students: groupAStudents,
      recommendedActivityId: "act-foundation-1"
    },
    {
      id: "group-b",
      name: "Group B — Developing (Borrowing & Place Value)",
      nameHi: "समूह ख — विकासशील (घटाव व स्थानीय मान)",
      count: groupBStudents.length,
      color: "amber",
      focusSkill: "Subtraction with Regrouping (52 - 27)",
      focusSkillHi: "उधार वाला घटाव एवं दहाई स्थानीय मान",
      targetGoal: "Decompose tens into ones using manipulatives before abstract sums",
      targetGoalHi: "मूर्तिक वस्तुओं द्वारा दहाई से इकाई में पुनर्समूहन की समझ",
      students: groupBStudents,
      recommendedActivityId: "act-subtraction-borrow"
    },
    {
      id: "group-c",
      name: "Group C — Reading Fluency",
      nameHi: "समूह ग — धाराप्रवाह पठन",
      count: groupCStudents.length,
      color: "cyan",
      focusSkill: "Word Decoding & Sentence Fluency (35+ WCPM)",
      focusSkillHi: "शब्द पठन एवं 35+ शब्द/मिनट की धाराप्रवाह गति",
      targetGoal: "Transition from spelling individual akshars to sight word automaticity",
      targetGoalHi: "अक्षरों को अलग-अलग जोड़कर पढ़ने से पूरे शब्द को एक बार में पढ़ने की ओर बढ़ना",
      students: groupCStudents,
      recommendedActivityId: "act-reading-fluency"
    },
    {
      id: "group-d",
      name: "Group D — On Track & Excelling",
      nameHi: "समूह घ — स्तरानुकूल एवं उन्नत",
      count: groupDStudents.length,
      color: "emerald",
      focusSkill: "Grade-Level Mastery & Peer Mentoring",
      focusSkillHi: "कक्षा स्तर प्रवीणता एवं सहपाठी शिक्षण",
      targetGoal: "Solve multi-step reasoning story sums & independent chapter reading",
      targetGoalHi: "बहु-चरणीय इबारती सवाल हल करना व स्वतंत्र कहानी पठन",
      students: groupDStudents,
      recommendedActivityId: "act-accelerated"
    }
  ];
}
