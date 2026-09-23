import React, { useState } from 'react';
import { 
  X, 
  Bot, 
  Send, 
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BorderBeam } from './ui/BorderBeam';
import { AnimatedShinyText } from './ui/AnimatedShinyText';
import { PulsingBadge } from './ui/PulsingBadge';
import { ElisaLogo } from './ui/ElisaLogo';
import { TRANSLATIONS } from '../data/translations';

export function AskLearnLensDrawer({ isOpen, onClose, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const { students, activeClass, teacher } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const studentCount = students?.length || 0;
  const sampleStudent = students?.[0]?.name || (lang === 'hi' ? 'छात्र' : 'Student');
  const flaggedStudents = (students || []).filter(s => s.status === 'intervention' || s.status === 'remediation' || s.status === 'attention');
  const flaggedNames = flaggedStudents.slice(0, 3).map(s => s.name).join(', ') || 'flagged students';
  const otherCount = Math.max(0, flaggedStudents.length - 3);
  const cohortText = otherCount > 0 ? `${flaggedNames}, and ${otherCount} other students` : flaggedNames;

  const flaggedNamesHi = flaggedStudents.slice(0, 3).map(s => s.nameHi || s.name).join(', ') || 'पहचाने गए विद्यार्थी';
  const cohortTextHi = otherCount > 0 ? `${flaggedNamesHi}, और ${otherCount} अन्य बच्चे` : flaggedNamesHi;

  const onTrackCount = (students || []).filter(s => s.status === 'on_track' || s.status === 'excelling').length;
  const needSupportCount = flaggedStudents.length;

  // Initial chat history with realistic classroom-grounded prompts
  const [messages, setMessages] = useState(() => [
    {
      id: 'm1',
      sender: 'ai',
      text: lang === 'hi' 
        ? `नमस्ते ${teacher?.name || 'शिक्षक'} जी! मैं नींव AI (NeevAI) शिक्षक सहायक हूं। मैं ${activeClass?.name || 'आपकी कक्षा'} के ${studentCount} नामांकित विद्यार्थियों के आकलन डेटा से जुड़ा हूं। आप मुझसे किसी भी बच्चे की सीखने की कमी, गलतियों के पीछे का कारण या 15-मिनट की गतिविधियों के बारे में पूछ सकते हैं।`
        : `Good morning ${teacher?.name || 'Educator'}! I am your NeevAI Pedagogical Assistant, synced directly with ${activeClass?.name || 'your classroom'}'s ${studentCount} student profiles. You can ask me why specific students are struggling, how to conduct TaRL groupings, or request a 15-min zero-cost activity.`
    }
  ]);

  const presetQuestions = lang === 'hi' ? [
    { label: 'ये छात्र घटाव में क्यों संघर्ष कर रहे हैं?', q: 'ये छात्र घटाव में क्यों संघर्ष कर रहे हैं? इसके पीछे क्या मानसिक भ्रांति है?' },
    { label: 'इन छात्रों के लिए 20-मिनट की गतिविधि बनाएं', q: 'कक्षा के कमजोर छात्रों के लिए 20-मिनट की मजेदार गतिविधि बनाएं।' },
    { label: 'अकेले शिक्षक के साथ 4 समूहों को कैसे संभालें?', q: 'एक कमरे में अकेले शिक्षक के साथ TaRL के 4 समूहों को एक साथ कैसे संचालित करें?' },
    { label: `${sampleStudent} के लिए 10-मिनट का घरेलू अभ्यास बताएं`, q: `${sampleStudent} के सीखने में सुधार के लिए माता-पिता को क्या 10-मिनट का काम दिया जाए?` },
  ] : [
    { label: 'Why are these students struggling with subtraction?', q: 'Why are these students struggling with subtraction? What is the root misconception?' },
    { label: 'Create a 20-minute activity for these students', q: 'Create a 20-minute high-impact classroom activity for these struggling students.' },
    { label: 'How to manage 4 TaRL groups with 1 teacher?', q: 'How can a single teacher manage 4 TaRL ability groups simultaneously in one classroom?' },
    { label: `Suggest a 10-minute home quest for ${sampleStudent}`, q: `Suggest a zero-cost 10-minute activity for ${sampleStudent} that parents can do with kitchen items.` },
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    // Append user message
    const userMsg = { id: `user-${Date.now()}`, sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Contextual AI pedagogical response synthesis
    setTimeout(() => {
      let replyText = '';
      const lowerQ = query.toLowerCase();

      if (lowerQ.includes('why') && (lowerQ.includes('subtraction') || lowerQ.includes('struggling') || lowerQ.includes('संघर्ष') || lowerQ.includes('घटाव'))) {
        replyText = lang === 'hi'
          ? `🔍 **घटाव में संघर्ष का गहन संज्ञानात्मक विश्लेषण (Cognitive Diagnosis):**\n\n${activeClass?.name || 'कक्षा 3-अ'} के लक्षित बच्चे (${cohortTextHi}) घटाव में इसलिए अटक रहे हैं क्योंकि वे **"अंक उलटाव भ्रांति" (Top-from-Bottom Inversion Bug)** का शिकार हैं:\n\n1. **मूल कारण:** जब इकाई स्तंभ में 2 में से 7 घटाना होता है, तो बच्चे समझ नहीं पाते कि छोटी संख्या से बड़ी कैसे घटाएं। ऋणात्मक संख्या की असुविधा से बचने के लिए वे सहज रूप से बड़ी में से छोटी संख्या घटा देते हैं (7 - 2 = 5)।\n2. **दहाई का स्थानीय मान अभाव:** वे 52 को "5 दहाई + 2 इकाई" के रूप में देखने के बजाय दो स्वतंत्र अंक '5' और '2' मानते हैं। इसलिए वे दहाई से उधार लेने की आवश्यकता को नहीं पहचान पाते।\n\n🎯 **अगला कदम (शिक्षक के लिए):**\n- लिखित वर्कशीट बंद करें।\n- 10-10 तीलियों के 5 बंडल और 2 खुली तीलियां देकर उनसे 27 तीलियां अलग करने को कहें। जब वे देखेंगे कि 2 में से 7 नहीं निकल सकता, तो वे खुद 1 बंडल खोलेंगे (Unbundling)!`
          : `🔍 **Cognitive Diagnosis: Why Students Struggle with Subtraction:**\n\nOur assessment reveals that ${cohortText} are exhibiting the classic **Top-From-Bottom Independent Digit Subtraction Bug**:\n\n1. **The Root Gap:** In problems like $52 - 27$, the units place requires subtracting $7$ from $2$. Because $2 < 7$, students feel cognitive dissonance. Instead of borrowing, they invert the operation: they subtract $7 - 2 = 5$.\n2. **Lack of Unitizing in Place Value:** They view $52$ as two detached digits ('5' and '2') rather than 5 bundles of ten and 2 units. Consequently, the concept of "regrouping 1 ten into 10 ones" is absent in their mental model.\n\n🎯 **Teacher Action Step:**\n- Stop abstract symbol worksheets.\n- Give them 5 matchstick bundles (of 10) and 2 loose sticks. Ask them to physically hand you 27 sticks. To give 7 ones, they will naturally be forced to untie 1 ten-bundle into 10 loose sticks!`;
      } else if (lowerQ.includes('20-minute') || lowerQ.includes('20 minute') || lowerQ.includes('20-मिनट') || lowerQ.includes('20 मिनट') || lowerQ.includes('activity')) {
        replyText = lang === 'hi'
          ? '📋 **20-मिनट की त्वरित कक्षा गतिविधि कार्ड: "दुकानदार और ग्राहक (10 का नोट)"**\n\n⏱️ **समय विभाजन (20 मिनट):**\n- **0-4 मिनट (हुक):** कक्षा में 2 बच्चों को दुकानदार और ग्राहक बनाएं। टॉफी की कीमत ₹27 है, ग्राहक के पास केवल ₹10 के 5 नोट और दो ₹1 के सिक्के हैं।\n- **4-12 मिनट (मूर्त मॉडल):** बच्चे देखते हैं कि ₹2 से ₹7 नहीं दे सकते, इसलिए दुकानदार 1 ₹10 का नोट लेकर 10 सिक्के खुले करवाता है। अब उसके पास 12 सिक्के हो जाते हैं!\n- **12-17 मिनट (सहपाठी अभ्यास):** 4-4 के समूह में कंकड़/तीलियों से $43 - 18$ और $61 - 25$ को इसी तरह हल करते हैं।\n- **17-20 मिनट (त्वरित जांच):** स्लेट पर 1 सवाल ($52 - 27$) हल करके दिखाते हैं।\n\n📦 **आवश्यक सामग्री:** शून्य लागत (कागज के नोट या कंकड़)।'
          : '📋 **20-Minute High-Impact Classroom Activity: "The Bank Vault & 10-Rupee Exchange"**\n\n⏱️ **Timeline Breakdown (20 Minutes):**\n- **04:00 (Hook & Context):** Stage a market stall. A toy costs ₹27. The student buyer has five ₹10 notes and two ₹1 coins ($52). How do we pay 7 coins?\n- **08:00 (Concrete Modeling):** Show that units cannot pay 7 ones. The student must go to the "Banker" to break one ₹10 note into ten ₹1 coins. Units now equal $10 + 2 = 12$ coins!\n- **05:00 (Paired Peer Work):** Students pair up at TaRL Group B station to model $43 - 18$ and $64 - 29$ using bottle caps or matchsticks.\n- **03:00 (Exit Slip Quick Check):** Every child writes $52 - 27$ on their slate and draws the unbundled ten.\n\n📦 **Materials:** Zero-cost (Chalk, slate, and bottle caps).';
      } else if (lowerQ.includes('52 - 27') || lowerQ.includes('35')) {
        replyText = lang === 'hi'
          ? '🔍 **52 - 27 = 35 का निदान:**\n\nविद्यार्थी इकाई में 7 - 2 = 5 और दहाई में 5 - 2 = 3 कर रहे हैं। इसे हल करने के लिए कल सुबह 15 मिनट 10 के नोट और सिक्कों का खेल खिलाएं।'
          : '🔍 **52 - 27 = 35 Misconception:**\n\nStudents are inverting units $7 - 2 = 5$ and tens $5 - 2 = 3$. Use concrete regrouping with bundles to resolve this within 3 classroom cycles.';
      } else if (lowerQ.includes('groups') || lowerQ.includes('1 teacher') || lowerQ.includes('अकेले शिक्षक') || lowerQ.includes('tarl')) {
        replyText = lang === 'hi'
          ? `🏫 **1 शिक्षक + 4 TaRL समूह प्रबंधन रणनीति:**\n\n1. **समूह घ (उन्नत - ${onTrackCount} छात्र):** इन्हें "गणित जासूस" पहेली कार्ड दें और सहपाठी मॉनिटर नियुक्त करें।\n2. **समूह क और ग:** फर्श पर चाक ग्रिड और शब्द कार्ड रिले में लगाएं।\n3. **शिक्षक का 15 मिनट का केंद्रित समय:** आपका पूरा 15 मिनट **लक्षित समूह (${needSupportCount} सहायता-प्राप्त छात्र)** के साथ गोल घेरे में तीलियों के बंडल के साथ बीतेगा।\n\nहर 15 मिनट बाद स्टेशन बदलें।`
          : `🏫 **Single-Teacher TaRL Group Management:**\n\n1. **Group D (${onTrackCount} On-Track students):** Give self-correcting Math Detective cards with peer captain.\n2. **Groups A & C:** Stationed at floor hopscotch grid with sight-word matching pairs.\n3. **Your Focused 15-Minute Block:** Spend 100% of direct instruction with **Targeted Cohort (${needSupportCount} support students)** using matchstick bundles.`;
      } else {
        replyText = lang === 'hi'
          ? `सलाह: ${activeClass?.name || 'कक्षा 3'} के अनुसार, बुनियादी दहाई के स्थानीय मान पर ध्यान केंद्रित करने से 80% सीखने की खाइयां एक साथ भरी जा सकती हैं। क्या आप इसके लिए 15-मिनट की कार्ययोजना चाहते हैं?`
          : `Pedagogical Recommendation: According to ${activeClass?.name || 'Class 3A'}'s assessment matrix, focusing on Base-10 concrete grouping will simultaneously accelerate both subtraction and reading fluency. Would you like a printable lesson card for this?`;
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, { id: `ai-${Date.now()}`, sender: 'ai', text: replyText }]);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-md animate-fade-in flex justify-end">
      
      <div className="relative w-full max-w-md h-full bg-slate-950/95 border-l border-white/10 shadow-2xl flex flex-col justify-between text-slate-100 overflow-hidden">
        
        {/* 21st.dev BorderBeam radiant light traveling down the drawer border */}
        <BorderBeam 
          size={200} 
          duration={6} 
          colorFrom="#06b6d4" 
          colorTo="#f97316" 
          borderWidth={1.5}
        />

        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/80 backdrop-blur-xl relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-amber-400 p-0.5 shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center p-1">
                <ElisaLogo variant="icon" className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold font-display text-white flex items-center gap-1.5">
                <AnimatedShinyText>
                  {t.askLearnLens}
                </AnimatedShinyText>
              </h3>
              <PulsingBadge variant="emerald" className="text-[9px] py-0 px-2 mt-0.5">
                {activeClass?.name || 'Class 3A'} Synced ({studentCount} Students)
              </PulsingBadge>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
          
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col text-xs leading-relaxed ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`p-3.5 rounded-2xl max-w-[85%] whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold rounded-tr-none shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/90 border border-slate-800/90 text-slate-200 rounded-tl-none font-body shadow-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono p-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>Analyzing classroom pedagogical data...</span>
            </div>
          )}

        </div>

        {/* Quick Question Chips */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/90 relative z-10">
          <span className="text-[10px] font-mono text-slate-400 block mb-1.5 uppercase tracking-wider font-semibold">
            Suggested Pedagogical Queries:
          </span>
          <div className="flex flex-col gap-1.5">
            {presetQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q.q)}
                className="text-left text-[11px] p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 hover:border-cyan-500/40 text-cyan-300 truncate transition-colors shadow-sm"
              >
                💬 {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Input Field */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/70 relative z-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={lang === 'hi' ? 'शिक्षण संबंधी प्रश्न पूछें...' : 'Ask about a student, skill, or activity...'}
              className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-body"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 disabled:opacity-40 transition-all shadow-md shadow-cyan-500/25"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
