// AI Misconception Detection & Pedagogical Diagnosis Engine

export const MISCONCEPTIONS_CATALOG = [
  {
    id: "misc-sub-top-bottom",
    domain: "numeracy",
    title: "Top-From-Bottom Independent Digit Subtraction",
    titleHi: "ऊपर-नीचे के क्रम को समझे बिना छोटे अंक को बड़े अंक से घटाना",
    symptomProblem: "52 - 27 = 35",
    studentAnswer: 35,
    correctAnswer: 25,
    detectionRule: (a, b, studentAns) => {
      // Problem: 52 - 27. Units: 2 - 7. If student does 7 - 2 = 5, and 5 - 2 = 3 => 35
      return studentAns === 35;
    },
    cognitiveDiagnosis: "The student does not yet grasp the principle of 'regrouping' across place values. When seeing that 2 is smaller than 7 in the units column, the child inverts the subtraction order to 7 - 2 = 5 to avoid negative numbers, then subtracts 5 - 2 = 3 in tens column.",
    cognitiveDiagnosisHi: "बच्चे को अभी तक स्थानीय मान में 'पुनर्समूहन' (उधार लेने) का सिद्धांत स्पष्ट नहीं है। इकाई के स्थान पर 2 में से 7 न घट पाने पर, बच्चा नियम उलट कर 7 - 2 = 5 कर देता है और दहाई में 5 - 2 = 3 करके 35 लिख देता है।",
    pedagogicalRootCause: "Procedural rote learning without physical place-value representation (Base-10 bundling). The child treats columns as independent arithmetic problems rather than a unified quantity.",
    pedagogicalRootCauseHi: "मूर्त रूप से दहाई के बंडल खोले बिना केवल कागज़ पर घटाने की रटंत आदत। बच्चा हर कॉलम को अलग सवाल मान रहा है, पूरी संख्या को नहीं।",
    recommendedAction: "15-Minute Guided Intervention: 'The 10-Rupee Note & 1-Rupee Coin Exchange Game'",
    recommendedActionHi: "15 मिनट की प्रत्यक्ष गतिविधि: 'दुकानदार और 10 के नोट की अदला-बदली का खेल'",
    concreteManipulative: "Ten-Frame blocks or bundles of 10 matchsticks + single sticks",
    concreteManipulativeHi: "10-10 तीलियों के 5 बंडल और 2 खुली तीलियां",
    teacherStepByStep: [
      "Ask the child to show 52 using 5 bundles of ten sticks and 2 single sticks.",
      "Ask: 'Can you give me 7 single sticks from just your 2 loose sticks?' The child realizes they cannot.",
      "Ask: 'What can we open?' Have the child untie ONE bundle of 10. Count together: 'Now how many single sticks do you have? 10 + 2 = 12!'",
      "Now ask: 'Give me 7 from the 12.' Child hands over 7 sticks, leaving 5 loose sticks.",
      "Ask: 'How many bundles of 10 are left?' Child counts: 4 bundles. 'Give me 2 bundles.' Left: 2 bundles and 5 loose = 25!"
    ],
    teacherStepByStepHi: [
      "बच्चे से 52 को 10-10 तीलियों के 5 बंडलों और 2 खुली तीलियों से दिखाने को कहें।",
      "पूछें: 'क्या तुम मुझे 2 खुली तीलियों में से 7 तीलियां दे सकते हो?' बच्चा समझेगा कि यह संभव नहीं है।",
      "पूछें: 'हम क्या खोल सकते हैं?' बच्चे से 1 बंडल खुलवाएं। 'अब कितनी खुली तीलियां हुईं? 10 + 2 = 12!'",
      "अब कहें: '12 में से 7 तीलियां मुझे दो।' बचीं: 5 खुली तीलियां।",
      "पूछें: 'अब कितने बंडल बचे हैं?' 4 बंडल। 'उनमें से 2 बंडल दो।' बचे: 2 बंडल और 5 खुली = 25!"
    ]
  },
  {
    id: "misc-sub-zero-borrow",
    domain: "numeracy",
    title: "Zero-Crossing Borrowing Confusion",
    titleHi: "शून्य (0) के ऊपर से उधार लेने में कठिनाई",
    symptomProblem: "304 - 158 = 254",
    studentAnswer: 254,
    correctAnswer: 146,
    detectionRule: (a, b, studentAns) => studentAns === 254 || studentAns === 246,
    cognitiveDiagnosis: "The student attempts to borrow from zero in the tens place, gets confused because zero has nothing to lend, and either skips the tens decrement or subtracts downward blindly.",
    cognitiveDiagnosisHi: "बच्चा दहाई के शून्य (0) से उधार लेने की कोशिश करता है, पर शून्य के पास कुछ न होने के कारण भ्रमित होकर दहाई के बदलाव को छोड़ देता है।",
    pedagogicalRootCause: "Failure to see multi-digit numbers as nested base-10 powers (304 is 30 tens and 4 ones).",
    pedagogicalRootCauseHi: "संख्या को 30 दहाई और 4 इकाई के रूप में न देख पाना।",
    recommendedAction: "10-Minute 'Chain of Banks' 3-Tier Currency Exchange",
    recommendedActionHi: "10 मिनट की 'तीन बैंकों की श्रृंखला' नोट विनिमय गतिविधि",
    concreteManipulative: "Fake currency notes: ₹100, ₹10, and ₹1 coins",
    concreteManipulativeHi: "नकली नोट: ₹100, ₹10 और ₹1 के सिक्के",
    teacherStepByStep: [
      "Represent 304 as three ₹100 notes and four ₹1 coins.",
      "To pay ₹8 coins, you need coins. The ₹10 wallet is empty (0 tens).",
      "Go to the ₹100 bank: Break one ₹100 note into TEN ₹10 notes.",
      "Now the ₹10 wallet has 10 notes! Take ONE ₹10 note and break it into ten ₹1 coins.",
      "Now you have two ₹100 notes, nine ₹10 notes, and 14 coins. Subtract 158 smoothly."
    ],
    teacherStepByStepHi: [
      "304 को 100 के 3 नोट और 1-1 के 4 सिक्कों के रूप में रखें।",
      "दुकानदार को 8 सिक्के चाहिए, लेकिन 10 के पर्स में 0 नोट हैं।",
      "100 के बड़े बैंक जाएं: एक ₹100 का नोट देकर 10 के 10 नोट लें।",
      "अब 10 के नोटों में से एक नोट तुड़वाकर 10 सिक्के बनाएं।",
      "अब आपके पास 2 सौ के नोट, 9 दस के नोट और 14 सिक्के हैं। अब आसानी से 158 घटाएं।"
    ]
  },
  {
    id: "misc-place-value-reversal",
    domain: "numeracy",
    title: "Digit Inversion & Directional Reading Confusion",
    titleHi: "संख्या के अंकों का उलटाव (स्थानीय मान का उल्टा पढ़ना)",
    symptomProblem: "Write 'Fifty-Two' (52)",
    studentAnswer: 25,
    correctAnswer: 52,
    detectionRule: (a, b, studentAns) => studentAns === 25,
    cognitiveDiagnosis: "Child hears 'Fifty' (दहाई) and 'Two' (इकाई), but because Hindi/English spoken order sometimes emphasizes the units or because spatial orientation is developing, the child writes the unit digit first from left to right.",
    cognitiveDiagnosisHi: "बच्चा बावन (52) को पच्चीस (25) लिखता है क्योंकि वह बाईं और दाईं दिशा में दहाई और इकाई के स्थान को उलट देता है।",
    pedagogicalRootCause: "Spatial-directional tracking and lack of anchored place-value columns (TENS | ONES).",
    pedagogicalRootCauseHi: "दिशा ज्ञान और 'दहाई | इकाई' के खानों की स्पष्ट अवधारणा न होना।",
    recommendedAction: "Place-Value Two-Pocket Color Sliders (Green for Tens, Yellow for Ones)",
    recommendedActionHi: "दो रंगों वाली स्थानीय मान जेब (दहाई हरी, इकाई पीली)",
    concreteManipulative: "Cardboard 2-pocket organizer with number cards",
    concreteManipulativeHi: "गत्ते का दो-खानों वाला बॉक्स और संख्या कार्ड",
    teacherStepByStep: [
      "Always anchor the left pocket with the color Green (Ghar 1: Tens = Bundles).",
      "Right pocket with Yellow (Ghar 2: Ones = Loose items).",
      "Place 5 bundles in the green pocket first. Place 2 loose sticks in the yellow pocket.",
      "Read out loud: 5 tens = Fifty, 2 ones = Two. Fifty-Two!"
    ],
    teacherStepByStepHi: [
      "बाएं खाने को हमेशा हरा रंग दें (दहाई का घर: पूरे बंडल)।",
      "दाएं खाने को पीला रंग दें (इकाई का घर: खुली तीलियां)।",
      "हरे खाने में 5 बंडल रखें, पीले में 2 खुली तीलियां रखें।",
      "बोलकर पढ़ें: 5 दहाई = पचास, 2 इकाई = दो। मिलकर बना बावन!"
    ]
  },
  {
    id: "misc-phoneme-akshar-confusion",
    domain: "literacy",
    title: "Hindi Visually Similar Akshar Confusion ('ब' vs 'व', 'म' vs 'भ')",
    titleHi: "समान दिखने वाले वर्णों में भ्रम ('ब' और 'व', 'म' और 'भ')",
    symptomProblem: "Read word: 'भारत' (Bharat)",
    studentAnswer: "मारत (Maarat)",
    correctAnswer: "भारत (Bharat)",
    detectionRule: (word, ans) => ans.includes("मारत") || ans.includes("म"),
    cognitiveDiagnosis: "The student ignores the distinguishing visual loop/knot (घुंडी) of the letter 'भ' and decodes it as 'म'.",
    cognitiveDiagnosisHi: "बच्चा 'भ' की ऊपरी घुंडी और खुले मुख को अनदेखा करके उसे 'म' के रूप में पढ़ता है।",
    pedagogicalRootCause: "Lack of fine visual discrimination and tactile kinesthetic stroke recognition in early literacy.",
    pedagogicalRootCauseHi: "आरंभिक लेखन में उंगली से बनावट को महसूस न करना और केवल सरसरी नज़र से देखना।",
    recommendedAction: "Clay Modeling & Sand-Tray Tracing of 'Knot vs No-Knot' Letters",
    recommendedActionHi: "मिट्टी या बालू की थाली में घुंडी वाले और बिना घुंडी वाले अक्षरों की बनावट का अभ्यास",
    concreteManipulative: "Sand tray or clay dough strips",
    concreteManipulativeHi: "रेत की ट्रे या गीली मिट्टी",
    teacherStepByStep: [
      "Roll two clay worms with the student.",
      "Make 'म': Straight standing line, folded foot, straight head line covering completely.",
      "Make 'भ': Make a small circle head (घुंडी) at the top! Notice the head line does NOT cover the circle.",
      "Feel with eyes closed: Which one has a round head knot? 'भ' has the knot!"
    ],
    teacherStepByStepHi: [
      "बच्चे के साथ मिट्टी की दो बत्तियां बनाएं।",
      "पहला 'म' बनाएं: सीधी रेखा, मोड़, और ऊपर पूरी छत (शिरोरेखा)।",
      "दूसरा 'भ' बनाएं: ऊपर एक छोटी घुंडी बनाएं! ध्यान दें कि शिरोरेखा इस घुंडी के ऊपर नहीं जाएगी।",
      "आंखें बंद करके छुएं: किसमें गोल घुंडी है? 'भ' में!"
    ]
  },
  {
    id: "misc-matra-omission",
    domain: "literacy",
    title: "Vowel Sign (Matra) Omission during Reading",
    titleHi: "पठन के समय मात्राओं को छोड़ देना (उदा. 'किताब' को 'कतब' पढ़ना)",
    symptomProblem: "Read word: 'किताब' (Kitaab)",
    studentAnswer: "कतब (Katab)",
    correctAnswer: "किताब (Kitaab)",
    detectionRule: (word, ans) => ans.includes("कतब"),
    cognitiveDiagnosis: "The student only attends to base consonant glyphs (व्यंजन) and treats vowel diacritics (मात्राएं) as decorative strokes rather than modifying phonetic values.",
    cognitiveDiagnosisHi: "बच्चा केवल मूल व्यंजनों पर ध्यान देता है और मात्राओं को सिर्फ सजावट मानकर उनके स्वर प्रभाव को छोड़ देता है।",
    pedagogicalRootCause: "Rote alphabet memorization without blending practice (बाराखड़ी की यांत्रिक रटंत बिना अर्थपूर्ण शब्द संदर्भ के)।",
    pedagogicalRootCauseHi: "मात्राओं को अक्षरों की पोशाक या आवाज़ बदलने वाले साधन के रूप में न समझना।",
    recommendedAction: "10-Minute 'Costume Party of Akshars' (मात्रा का मुखौटा खेल)",
    recommendedActionHi: "10 मिनट की 'अक्षरों की पोशाक' गतिविधि",
    concreteManipulative: "Cardboard cutouts of consonants + transparent plastic overlays of matras",
    concreteManipulativeHi: "व्यंजनों के गत्ते के कार्ड + पारदर्शी मात्रा पट्टियां",
    teacherStepByStep: [
      "Show card 'क'. Ask for the sound: /k/.",
      "Slide the transparent 'ि' card in front of 'क'. Shout: 'Who arrived? The short 'i' came! Now it sings /ki/!'",
      "Have the student slide 'ि' onto 'त' with 'ा' and 'ब' to watch /ki-taa-b/ appear.",
      "Read out loud in a funny squeaky voice for short 'i', normal voice for 'ta'."
    ],
    teacherStepByStepHi: [
      "कार्ड 'क' दिखाएं। पूछें: 'इसकी आवाज़ क्या है?' /क/।",
      "'क' के आगे पारदर्शी 'ि' की पट्टी लगाएं। कहें: 'छोटी इ की टोपी आ गई! अब यह बोलेगा /कि/!'",
      "बच्चे से खुद 'ि' को 'क' पर, 'ा' को 'त' पर और 'ब' को रखकर शब्द बनाने को कहें।",
      "हंसते हुए आवाज़ में परिवर्तन महसूस कराएं: /कि/ + /ता/ + /ब/ = किताब!"
    ]
  }
];
