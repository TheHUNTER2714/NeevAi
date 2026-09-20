// Comprehensive Classroom & Student Dataset based on ASER & TaRL FLN frameworks

export const CLASS_METADATA = {
  id: "class-3a",
  name: "Class 3 — Section A",
  grade: 3,
  section: "A",
  academicYear: "2025-2026",
  schoolName: "Rajkiya Sarvodaya Vidyalaya, Sector 4",
  teacherName: "Sunita Sharma",
  totalStudents: 42,
  assessedStudents: 38,
  pendingStudents: 4,
  flnTargetDate: "March 2026",
  nipunTargetStatus: "68% on track towards NIPUN Bharat Foundational Goal"
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

export const getDynamicTarlGroups = (studentsList = []) => {
  const groupA = studentsList.filter(s => s.status === 'unassessed' || s.currentLevel?.includes('1.0') || s.currentLevel?.includes('1.1'));
  const groupB = studentsList.filter(s => s.status === 'intervention' || s.tarlGroup?.includes('Group B') || s.currentLevel?.includes('1.'));
  const groupC = studentsList.filter(s => s.status === 'attention' || s.tarlGroup?.includes('Group C') || s.currentLevel?.includes('2.'));
  const groupD = studentsList.filter(s => s.status === 'on_track' || s.status === 'excelling' || s.tarlGroup?.includes('Group D') || s.currentLevel?.includes('3.'));

  return [
    {
      id: "group-a",
      name: "Group A — Foundation",
      nameHi: "समूह क — बुनियादी आधार",
      count: groupA.length,
      color: "rose",
      focusSkill: "Letter Recognition & 1-Digit Numbers",
      focusSkillHi: "अक्षर पहचान व 1-अंकीय संख्या ज्ञान",
      targetGoal: "Recognize all 52 Hindi varnamala & count up to 20 with objects",
      targetGoalHi: "सभी 52 वर्णों की पहचान व 20 तक वस्तुओं से गिनती",
      students: groupA.map(s => s.name),
      recommendedActivityId: "act-foundation-1"
    },
    {
      id: "group-b",
      name: "Group B — Developing (Borrowing & Place Value)",
      nameHi: "समूह ख — विकासशील (घटाव व स्थानीय मान)",
      count: groupB.length,
      color: "amber",
      focusSkill: "Subtraction with Regrouping (52 - 27)",
      focusSkillHi: "उधार वाला घटाव एवं दहाई स्थानीय मान",
      targetGoal: "Decompose tens into ones using manipulatives before abstract sums",
      targetGoalHi: "मूर्तिक वस्तुओं द्वारा दहाई से इकाई में पुनर्समूहन की समझ",
      students: groupB.map(s => s.name),
      recommendedActivityId: "act-subtraction-borrow"
    },
    {
      id: "group-c",
      name: "Group C — Reading Fluency",
      nameHi: "समूह ग — धाराप्रवाह पठन",
      count: groupC.length,
      color: "cyan",
      focusSkill: "Word Decoding & Sentence Fluency (35+ WCPM)",
      focusSkillHi: "शब्द पठन एवं 35+ शब्द/मिनट की धाराप्रवाह गति",
      targetGoal: "Transition from spelling individual akshars to sight word automaticity",
      targetGoalHi: "अक्षरों को अलग-अलग जोड़कर पढ़ने से पूरे शब्द को एक बार में पढ़ने की ओर बढ़ना",
      students: groupC.map(s => s.name),
      recommendedActivityId: "act-reading-fluency"
    },
    {
      id: "group-d",
      name: "Group D — On Track & Excelling",
      nameHi: "समूह घ — स्तरानुकूल एवं उन्नत",
      count: groupD.length,
      color: "emerald",
      focusSkill: "Grade-Level Mastery & Peer Mentoring",
      focusSkillHi: "कक्षा स्तर प्रवीणता एवं सहपाठी शिक्षण",
      targetGoal: "Solve multi-step reasoning story sums & independent chapter reading",
      targetGoalHi: "बहु-चरणीय इबारती सवाल हल करना व स्वतंत्र कहानी पठन",
      students: groupD.map(s => s.name),
      recommendedActivityId: "act-accelerated"
    }
  ];
};

export const STUDENTS_DATA = [
  {
    id: "stu-1",
    rollNo: 1,
    name: "Rahul Sharma",
    nameHi: "राहुल शर्मा",
    gender: "Male",
    attendance: "91%",
    status: "intervention", // "excelling", "on_track", "attention", "intervention", "unassessed"
    currentLevel: "Grade 1.8 Equivalent",
    currentLevelHi: "कक्षा 1.8 समकक्ष",
    tarlGroup: "Group B — Borrowing & Problem Solving",
    tarlGroupHi: "समूह ख — घटाव व स्थानीय मान",
    overallScore: 42,
    skills: {
      reading: 58,
      letterSound: 72,
      wordDecoding: 64,
      numberSense: 91,
      placeValue: 54,
      addition: 60,
      subtractionBorrowing: 35, // Root gap
      comprehension: 48,
    },
    primaryGap: "Subtraction with Borrowing / Regrouping (e.g., 52 - 27 = 35)",
    primaryGapHi: "उधार लेकर घटाव में कठिनाई (जैसे 52 - 27 = 35 लिखना)",
    secondaryGap: "Sentence Reading Fluency (pauses on conjunct matras)",
    secondaryGapHi: "वाक्य पठन में रुकना (संयुक्त मात्राओं पर अटकना)",
    detectedMisconception: {
      type: "Top-From-Bottom Independent Digit Subtraction",
      title: "Subtracting smaller digit from larger digit regardless of position",
      example: "52 - 27 = 35 (Student did: 7 - 2 = 5 in units, 5 - 2 = 3 in tens)",
      remediation: "15-min hands-on activity using 10-rupee note & 1-rupee coin exchange game"
    },
    growthHistory: [
      { date: "Baseline (W0)", score: 42, label: "Initial Test" },
      { date: "Week 2", score: 58, label: "After 10-Frame Blocks" },
      { date: "Week 4", score: 78, label: "Post-Intervention Reassessment" }
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
    name: "Priya Patel",
    nameHi: "प्रिया पटेल",
    gender: "Female",
    attendance: "95%",
    status: "attention",
    currentLevel: "Grade 2.3 Equivalent",
    currentLevelHi: "कक्षा 2.3 समकक्ष",
    tarlGroup: "Group C — Reading Fluency & Phonics",
    tarlGroupHi: "समूह ग — धाराप्रवाह पठन व ध्वनि",
    overallScore: 61,
    skills: {
      reading: 46,
      letterSound: 62,
      wordDecoding: 55,
      numberSense: 88,
      placeValue: 74,
      addition: 78,
      subtractionBorrowing: 65,
      comprehension: 42,
    },
    primaryGap: "Reading Fluency & Complex Matra Blends ('कृ', 'त्र', 'प्र')",
    primaryGapHi: "कठिन मात्राओं और संयुक्त अक्षरों को धाराप्रवाह पढ़ने में कठिनाई",
    secondaryGap: "Reading comprehension of inference questions",
    secondaryGapHi: "अनुमानित प्रश्नों का उत्तर देने में हिचकिचाहट",
    detectedMisconception: {
      type: "Phoneme Blending Hesitation",
      title: "Letter-by-letter spelling instead of whole-word automaticity",
      example: "Spells 'क... ि... त... ा... ब' aloud for 8 seconds before saying 'किताब'",
      remediation: "Flashcard rapid-sight drills and paired choral reading for 10 mins"
    },
    growthHistory: [
      { date: "Baseline (W0)", score: 48, label: "Initial Test" },
      { date: "Week 2", score: 61, label: "After Choral Reading" },
      { date: "Week 4 (Projected)", score: 76, label: "Target" }
    ],
    recommendedPlan: [
      { day: "Day 1", task: "High-frequency word cards: 10 common 2-syllable words", done: true },
      { day: "Day 2", task: "Finger-tracking timed story reading (30 seconds)", done: false },
      { day: "Day 3", task: "Choral echo reading with teacher", done: false },
      { day: "Day 4", task: "Matra bingo game with partner", done: false },
      { day: "Day 5", task: "Record 1-minute audio story in student mode", done: false },
    ]
  },
  {
    id: "stu-3",
    rollNo: 3,
    name: "Aarav Singh",
    nameHi: "आरव सिंह",
    gender: "Male",
    attendance: "87%",
    status: "intervention",
    currentLevel: "Grade 1.2 Equivalent",
    currentLevelHi: "कक्षा 1.2 समकक्ष",
    tarlGroup: "Group A — Foundation Literacy & Number Sense",
    tarlGroupHi: "समूह क — बुनियादी साक्षरता व संख्या ज्ञान",
    overallScore: 36,
    skills: {
      reading: 28,
      letterSound: 34,
      wordDecoding: 22,
      numberSense: 58,
      placeValue: 32,
      addition: 45,
      subtractionBorrowing: 20,
      comprehension: 25,
    },
    primaryGap: "Letter-Sound Confusion ('ब' vs 'व', 'म' vs 'भ') & 2-Digit Place Value",
    primaryGapHi: "अक्षर भ्रम ('ब' और 'व', 'म' और 'भ') तथा दहाई की समझ का अभाव",
    secondaryGap: "Counts single units on fingers; cannot group in tens",
    secondaryGapHi: "उंगलियों पर एक-एक गिनना; 10 के समूह नहीं बना पाना",
    detectedMisconception: {
      type: "Letter Reversal & Zero Place Value Gap",
      title: "Confusing visually similar Hindi akshars and treating 20 as '2 and 0'",
      example: "Writes 25 as 52; identifies 'भ' as 'म'",
      remediation: "Sandpaper tactile tracing & bottle cap ten-frame sorting"
    },
    growthHistory: [
      { date: "Baseline (W0)", score: 36, label: "Initial Test" },
      { date: "Week 2", score: 48, label: "After Tactile Tracing" },
      { date: "Week 4 (Projected)", score: 68, label: "Target" }
    ],
    recommendedPlan: [
      { day: "Day 1", task: "Tactile tracing of 'म' and 'भ' on textured paper", done: true },
      { day: "Day 2", task: "Bottle cap counting in rows of 10", done: false },
      { day: "Day 3", task: "Letter sound hopscotch on classroom floor", done: false },
      { day: "Day 4", task: "Peer buddy support with roll no 5 (Ananya)", done: false },
      { day: "Day 5", task: "Visual card match: quantity to numeral", done: false },
    ]
  },
  {
    id: "stu-4",
    rollNo: 4,
    name: "Ananya Verma",
    nameHi: "अनन्या वर्मा",
    gender: "Female",
    attendance: "98%",
    status: "excelling",
    currentLevel: "Grade 4.2 Equivalent",
    currentLevelHi: "कक्षा 4.2 समकक्ष",
    tarlGroup: "Group D — Accelerated Mastery",
    tarlGroupHi: "समूह घ — उन्नत प्रवीणता",
    overallScore: 94,
    skills: {
      reading: 96,
      letterSound: 100,
      wordDecoding: 98,
      numberSense: 100,
      placeValue: 92,
      addition: 95,
      subtractionBorrowing: 90,
      comprehension: 92,
    },
    primaryGap: "None (Mastered foundational competencies)",
    primaryGapHi: "कोई नहीं (बुनियादी कौशलों में पारंगत)",
    secondaryGap: "Ready for multi-step reasoning word problems and creative writing",
    secondaryGapHi: "बहु-चरणीय समस्याओं एवं रचनात्मक लेखन के लिए तैयार",
    detectedMisconception: null,
    growthHistory: [
      { date: "Baseline (W0)", score: 88, label: "Initial Test" },
      { date: "Week 2", score: 92, label: "Enrichment" },
      { date: "Week 4", score: 94, label: "Current Master" }
    ],
    recommendedPlan: [
      { day: "Day 1", task: "Serve as peer learning buddy during 15-min station rotation", done: true },
      { day: "Day 2", task: "Create own illustrated 3-page mini book for the class reading corner", done: true },
      { day: "Day 3", task: "Solve 3-digit subtraction puzzle with missing digits", done: false },
      { day: "Day 4", task: "Lead group reading aloud session", done: false },
      { day: "Day 5", task: "Challenge worksheet: Math story creator", done: false },
    ]
  },
  {
    id: "stu-5",
    rollNo: 5,
    name: "Rohit Kumar",
    nameHi: "रोहित कुमार",
    gender: "Male",
    attendance: "92%",
    status: "on_track",
    currentLevel: "Grade 3.0 On-Track",
    currentLevelHi: "कक्षा 3.0 स्तरानुकूल",
    tarlGroup: "Group D — Accelerated Mastery",
    tarlGroupHi: "समूह घ — उन्नत प्रवीणता",
    overallScore: 78,
    skills: {
      reading: 80,
      letterSound: 85,
      wordDecoding: 82,
      numberSense: 88,
      placeValue: 78,
      addition: 82,
      subtractionBorrowing: 72,
      comprehension: 70,
    },
    primaryGap: "Minor hesitation on 3-step word problems involving subtraction",
    primaryGapHi: "घटाव से संबंधित 3-चरणीय इबारती प्रश्नों में कभी-कभी संकोच",
    secondaryGap: "Expressive reading prosody (intonation on punctuation)",
    secondaryGapHi: "विराम चिन्हों के अनुसार हाव-भाव से पढ़ना",
    detectedMisconception: null,
    growthHistory: [
      { date: "Baseline (W0)", score: 68, label: "Initial Test" },
      { date: "Week 2", score: 74, label: "Practice" },
      { date: "Week 4", score: 78, label: "Current" }
    ],
    recommendedPlan: [
      { day: "Day 1", task: "Practice reading with exclamation and question marks", done: true },
      { day: "Day 2", task: "Solve real-life shopping word problem with change return", done: false },
      { day: "Day 3", task: "Speed math race with dice rolling", done: false },
    ]
  },
  {
    id: "stu-6",
    rollNo: 6,
    name: "Neha Gupta",
    nameHi: "नेहा गुप्ता",
    gender: "Female",
    attendance: "89%",
    status: "intervention",
    currentLevel: "Grade 1.9 Equivalent",
    currentLevelHi: "कक्षा 1.9 समकक्ष",
    tarlGroup: "Group B — Borrowing & Problem Solving",
    tarlGroupHi: "समूह ख — घटाव व स्थानीय मान",
    overallScore: 44,
    skills: {
      reading: 62,
      letterSound: 70,
      wordDecoding: 66,
      numberSense: 85,
      placeValue: 50,
      addition: 64,
      subtractionBorrowing: 32, // Gap
      comprehension: 54,
    },
    primaryGap: "Subtraction with Borrowing: Omitting the reduction in tens column",
    primaryGapHi: "घटाव में दहाई के अंक को 1 कम करना भूल जाना (उदा. 64 - 28 = 46 के बजाय 46)",
    secondaryGap: "Needs practice with 10s place value regrouping",
    secondaryGapHi: "दहाई के स्थानीय मान पुनर्समूहन में अभ्यास की जरूरत",
    detectedMisconception: {
      type: "Forgotten Borrowing Reduction",
      title: "Borrows 10 to units but forgets to decrement the tens digit by 1",
      example: "64 - 28 = 46 instead of 36 (Student added 10 to 4 to make 14 - 8 = 6, but did 6 - 2 = 4 in tens!)",
      remediation: "Cross-out physical reminder routine using color-coded chips"
    },
    growthHistory: [
      { date: "Baseline (W0)", score: 44, label: "Initial" },
      { date: "Week 2", score: 55, label: "Progress" },
      { date: "Week 4 (Projected)", score: 74, label: "Target" }
    ],
    recommendedPlan: [
      { day: "Day 1", task: "Color-coded cross-out drill: Slash the tens digit first", done: true },
      { day: "Day 2", task: "Use red pencil for regrouped tens, blue for units", done: false },
      { day: "Day 3", task: "15-minute guided practice with Rahul Sharma in small group", done: false },
    ]
  },
  {
    id: "stu-7",
    rollNo: 7,
    name: "Vikram Meena",
    nameHi: "विक्रम मीना",
    gender: "Male",
    attendance: "84%",
    status: "attention",
    currentLevel: "Grade 2.1 Equivalent",
    currentLevelHi: "कक्षा 2.1 समकक्ष",
    tarlGroup: "Group C — Reading Fluency & Phonics",
    tarlGroupHi: "समूह ग — धाराप्रवाह पठन व ध्वनि",
    overallScore: 56,
    skills: {
      reading: 42,
      letterSound: 58,
      wordDecoding: 48,
      numberSense: 82,
      placeValue: 70,
      addition: 75,
      subtractionBorrowing: 58,
      comprehension: 40,
    },
    primaryGap: "Hindi Matra Confusion ('ू' vs 'ु' and 'ी' vs 'ि')",
    primaryGapHi: "हिंदी मात्रा भ्रम (ह्रस्व 'ि' व दीर्घ 'ी' तथा 'ु' व 'ू' में अंतर)",
    secondaryGap: "Reading rate is below 22 words per minute",
    secondaryGapHi: "पठन गति 22 शब्द प्रति मिनट से कम",
    detectedMisconception: {
      type: "Vowel Length Ignorance",
      title: "Pronouncing short and long vowels identically, altering word meaning",
      example: "Reads 'दिन' (day) and 'दीन' (poor) with the same sound",
      remediation: "Stretching sound game: Short hop for 'ि', long slide for 'ी'"
    },
    growthHistory: [
      { date: "Baseline (W0)", score: 45, label: "Initial" },
      { date: "Week 2", score: 56, label: "Current" },
      { date: "Week 4 (Projected)", score: 72, label: "Target" }
    ],
    recommendedPlan: [
      { day: "Day 1", task: "Vowel sound duration game with body movements", done: true },
      { day: "Day 2", task: "Minimal pairs reading cards (मिल/मील, कुल/कूल)", done: false },
    ]
  },
  {
    id: "stu-8",
    rollNo: 8,
    name: "Pooja Joshi",
    nameHi: "पूजा जोशी",
    gender: "Female",
    attendance: "94%",
    status: "on_track",
    currentLevel: "Grade 3.1 Equivalent",
    currentLevelHi: "कक्षा 3.1 समकक्ष",
    tarlGroup: "Group D — Accelerated Mastery",
    tarlGroupHi: "समूह घ — उन्नत प्रवीणता",
    overallScore: 81,
    skills: {
      reading: 85,
      letterSound: 88,
      wordDecoding: 86,
      numberSense: 90,
      placeValue: 80,
      addition: 84,
      subtractionBorrowing: 78,
      comprehension: 76,
    },
    primaryGap: "Solid on foundational competencies; needs enrichment in vocabulary",
    primaryGapHi: "बुनियादी कौशलों में मजबूत; शब्दावली विस्तार की आवश्यकता",
    secondaryGap: "Multiplication tables beyond 6",
    secondaryGapHi: "6 से आगे के पहाड़े",
    detectedMisconception: null,
    growthHistory: [
      { date: "Baseline (W0)", score: 72, label: "Initial" },
      { date: "Week 2", score: 78, label: "Mid" },
      { date: "Week 4", score: 81, label: "Current" }
    ],
    recommendedPlan: [
      { day: "Day 1", task: "Array pattern drawing for 7x and 8x multiplication", done: true },
      { day: "Day 2", task: "Word explorer notebook: 3 new Hindi words daily", done: false },
    ]
  },
  {
    id: "stu-9",
    rollNo: 9,
    name: "Karan Yadav",
    nameHi: "करण यादव",
    gender: "Male",
    attendance: "80%",
    status: "unassessed",
    currentLevel: "Pending Assessment",
    currentLevelHi: "आकलन प्रतीक्षारत",
    tarlGroup: "Unassigned",
    tarlGroupHi: "अविभाजित",
    overallScore: 0,
    skills: {
      reading: 0,
      letterSound: 0,
      wordDecoding: 0,
      numberSense: 0,
      placeValue: 0,
      addition: 0,
      subtractionBorrowing: 0,
      comprehension: 0,
    },
    primaryGap: "Assessment scheduled for today",
    primaryGapHi: "आज का आकलन निर्धारित",
    secondaryGap: "Absent during baseline diagnostic week",
    secondaryGapHi: "आरंभिक नैदानिक सप्ताह में अनुपस्थित",
    detectedMisconception: null,
    growthHistory: [],
    recommendedPlan: [
      { day: "Day 1", task: "Administer 10-minute 1-on-1 ASER FLN diagnostic screener", done: false }
    ]
  },
  {
    id: "stu-10",
    rollNo: 10,
    name: "Sanya Malik",
    nameHi: "सान्या मलिक",
    gender: "Female",
    attendance: "96%",
    status: "on_track",
    currentLevel: "Grade 3.2 Equivalent",
    currentLevelHi: "कक्षा 3.2 समकक्ष",
    tarlGroup: "Group D — Accelerated Mastery",
    tarlGroupHi: "समूह घ — उन्नत प्रवीणता",
    overallScore: 84,
    skills: {
      reading: 88,
      letterSound: 92,
      wordDecoding: 88,
      numberSense: 92,
      placeValue: 84,
      addition: 88,
      subtractionBorrowing: 80,
      comprehension: 82,
    },
    primaryGap: "Minor hesitation in explaining mathematical reasoning verbally",
    primaryGapHi: "गणितीय तर्कों को मौखिक रूप से समझाने में संकोच",
    secondaryGap: "None",
    secondaryGapHi: "कोई नहीं",
    detectedMisconception: null,
    growthHistory: [
      { date: "Baseline (W0)", score: 76, label: "Initial" },
      { date: "Week 2", score: 80, label: "Mid" },
      { date: "Week 4", score: 84, label: "Current" }
    ],
    recommendedPlan: [
      { day: "Day 1", task: "Math Talk: Explain 'How I solved it' to partner", done: true }
    ]
  }
];

export const TARL_GROUPS = [
  {
    id: "group-a",
    name: "Group A — Foundation",
    nameHi: "समूह क — बुनियादी आधार",
    count: 8,
    color: "rose",
    focusSkill: "Letter Recognition & 1-Digit Numbers",
    focusSkillHi: "अक्षर पहचान व 1-अंकीय संख्या ज्ञान",
    targetGoal: "Recognize all 52 Hindi varnamala & count up to 20 with objects",
    targetGoalHi: "सभी 52 वर्णों की पहचान व 20 तक वस्तुओं से गिनती",
    students: ["Aarav Singh", "Ritu Devi", "Mohan Das", "Sunil Rai", "Farhan Ali", "Geeta Bai", "Suraj Pal", "Meena Kumari"],
    recommendedActivityId: "act-foundation-1"
  },
  {
    id: "group-b",
    name: "Group B — Developing (Borrowing & Place Value)",
    nameHi: "समूह ख — विकासशील (घटाव व स्थानीय मान)",
    count: 12,
    color: "amber",
    focusSkill: "Subtraction with Regrouping (52 - 27)",
    focusSkillHi: "उधार वाला घटाव एवं दहाई स्थानीय मान",
    targetGoal: "Decompose tens into ones using manipulatives before abstract sums",
    targetGoalHi: "मूर्तिक वस्तुओं द्वारा दहाई से इकाई में पुनर्समूहन की समझ",
    students: ["Rahul Sharma", "Neha Gupta", "Deepak Verma", "Kavita Soni", "Amit Rawat", "Pooja Devi", "Manoj Tiwari", "Sonam Bano", "Harish Sen", "Chanchal", "Alok Nath", "Pankaj"],
    recommendedActivityId: "act-subtraction-borrow"
  },
  {
    id: "group-c",
    name: "Group C — Reading Fluency",
    nameHi: "समूह ग — धाराप्रवाह पठन",
    count: 7,
    color: "cyan",
    focusSkill: "Word Decoding & Sentence Fluency (35+ WCPM)",
    focusSkillHi: "शब्द पठन एवं 35+ शब्द/मिनट की धाराप्रवाह गति",
    targetGoal: "Transition from spelling individual akshars to sight word automaticity",
    targetGoalHi: "अक्षरों को अलग-अलग जोड़कर पढ़ने से पूरे शब्द को एक बार में पढ़ने की ओर बढ़ना",
    students: ["Priya Patel", "Vikram Meena", "Swati Mishra", "Arjun Rana", "Komal Seth", "Bhavna Negi", "Gaurav Sen"],
    recommendedActivityId: "act-reading-fluency"
  },
  {
    id: "group-d",
    name: "Group D — On Track & Excelling",
    nameHi: "समूह घ — स्तरानुकूल एवं उन्नत",
    count: 15,
    color: "emerald",
    focusSkill: "Grade-Level Mastery & Peer Mentoring",
    focusSkillHi: "कक्षा स्तर प्रवीणता एवं सहपाठी शिक्षण",
    targetGoal: "Solve multi-step reasoning story sums & independent chapter reading",
    targetGoalHi: "बहु-चरणीय इबारती सवाल हल करना व स्वतंत्र कहानी पठन",
    students: ["Ananya Verma", "Rohit Kumar", "Pooja Joshi", "Sanya Malik", "Divya Thakur", "Kunal Shah", "Nikhil Rao", "Tanvi Jain", "Manish Paul", "Aayush Goyal", "Sakshi", "Rehan", "Preeti", "Lalit", "Hina"],
    recommendedActivityId: "act-accelerated"
  }
];
