import React from 'react';
import { 
  Sparkles, 
  Brain, 
  Target, 
  BookOpen, 
  ArrowRight, 
  ExternalLink,
  CheckCircle2, 
  Library,
  FileText,
  TrendingUp, 
  GraduationCap,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { CircularGallery, LEARNLENS_GALLERY_DATA } from './ui/circular-gallery';
import { SpotlightCard } from './ui/SpotlightCard';
import { BorderBeam } from './ui/BorderBeam';
import { ShimmerButton } from './ui/ShimmerButton';

export function AboutSection({ onExploreCockpit, onTryAssessment, lang = 'en' }) {
  const isHi = lang === 'hi';

  // 1. Foundational Reading Literature to Advance Understanding
  const foundationalReading = [
    {
      title: isHi ? 'द ग्रेट फिक्शन ऑफ इंडियाज क्लासरूम्स (Frontline, 2025)' : 'The Great Fiction of India’s Classrooms (Frontline, 2025)',
      subtitle: isHi ? 'बहु-स्तरीय एवं बहु-श्रेणी कक्षाओं की जमीनी सच्चाई' : 'Multigrade & Multilevel Classrooms in India: Policy vs Ground Reality',
      url: 'https://frontline.thehindu.com/the-nation/education/multigrade-multilevel-classrooms-india-policy-reform/article69909413.ece',
      tag: 'Policy & Field Investigation',
      tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      summary: isHi
        ? 'फ्रंटलाइन 2025 की विस्तृत जांच दर्शाती है कि भारतीय कक्षाओं में एक ही शिक्षक के सामने 5 अलग-अलग सीखने के स्तर होते हैं। एकल-गति का पाठ्यक्रम बच्चों को हमेशा के लिए पीछे छोड़ देता है।'
        : 'Exposes the structural fiction that Indian classrooms are mono-grade. In reality, single teachers face students across up to 5 distinct learning tiers. Uniform syllabus pacing forces teachers to lecture ahead while vulnerable cohorts drop off the learning cliff.',
      keyTakeaway: isHi
        ? 'मुख्य निष्कर्ष: पाठ्यक्रम पूरा करने के दबाव के बजाय योग्यता-आधारित लचीले समूहन की आवश्यकता।'
        : 'Key Insight: Syllabi must shift from age/grade rigidity to diagnostic multi-level grouping (MGML).'
    },
    {
      title: isHi ? 'टीचिंग एट द राइट लेवल (TaRL) - जे-पाल (J-PAL, 2022)' : 'Teaching at the Right Level (TaRL) to Improve Learning (J-PAL, 2022)',
      subtitle: isHi ? 'सीखने की तत्परता पर आधारित 20+ वर्षों के वैज्ञानिक परीक्षण' : '20+ Years of Randomized Evaluations Across 60 Million Children',
      url: 'https://www.povertyactionlab.org/case-study/teaching-right-level-improve-learning',
      tag: 'Nobel Laureate Empirical Evidence',
      tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      summary: isHi
        ? 'यादृच्छिक नियंत्रित परीक्षणों (RCTs) में साबित हुआ कि बच्चों को उनकी उम्र के बजाय सीखने की वास्तविक तत्परता के अनुसार समूहित करने से सीखने में +0.70 मानक विचलन का स्थायी सुधार होता है।'
        : 'Pioneered by Pratham and rigorously evaluated by J-PAL researchers (including Nobel laureates Abhijit Banerjee & Esther Duflo). Grouping children by current learning readiness rather than age/grade generates +0.70 SD gains in basic reading and arithmetic.',
      keyTakeaway: isHi
        ? 'मुख्य निष्कर्ष: प्रतिदिन 1-2 घंटे का समर्पित बुनियादी शिक्षण स्थायी साक्षरता और संख्याज्ञान बहाल करता है।'
        : 'Key Insight: 1-2 hours of daily level-targeted instruction closes years of accumulated learning loss.'
    }
  ];

  // 2. Standardized Assessment Toolkits Informing NeevAI
  const assessmentToolkits = [
    {
      title: isHi ? 'CBSE बुनियादी साक्षरता एवं संख्याज्ञान (FLN) टूलकिट' : 'CBSE Foundational Literacy & Numeracy (FLN) Toolkit',
      subtitle: isHi ? 'अध्यापक कॉर्नर एवं प्रश्न बैंक' : 'Assessment Toolkit, Learning Outcomes & Question Banks',
      url: 'https://cbseacademic.nic.in/fln/teacher-corner.html',
      tag: 'National Curriculum Standard',
      tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      description: isHi
        ? 'CBSE द्वारा कक्षा 1 से 3 के लिए निर्धारित दक्षताएं, मौखिक पठन प्रवाह (ORF), संख्या पहचान एवं सीखने के प्रतिफल (LOs) पर आधारित प्रश्न बैंक।'
        : 'Official CBSE FLN framework providing competency-mapped item banks, Oral Reading Fluency (ORF) rubrics, and formative assessment questions aligned with NIPUN Bharat benchmarks.',
      neevRole: isHi
        ? 'नींव AI में उपयोग: मानकीकृत प्रश्न बैंक और ग्रेड-विशिष्ट सीखने के प्रतिफल (M301, L304)।'
        : 'Role in NeevAI: Calibrates Grade 1-3 diagnostic item difficulty and learning outcome tags.'
    },
    {
      title: isHi ? 'प्रथम ASER बुनियादी पठन एवं गणित आकलन (DIYA)' : 'ASER Basic Reading & Maths Assessment (Pratham DIYA)',
      subtitle: isHi ? 'डू इट योरसेल्फ असर (DIYA) टूल' : 'Do-It-Yourself ASER (DIYA) Rapid Field Assessment',
      url: 'https://asercentre.org/do-it-yourself-aser-diya/',
      tag: 'National Diagnostic Baseline',
      tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      description: isHi
        ? 'भारत का स्वर्ण-मानक बुनियादी टूल: पठन में 4 स्तर (अक्षर → शब्द → अनुच्छेद → कहानी) एवं गणित में 4 स्तर (संख्या पहचान → 2-अंकीय घटाव → 3-अंकीय भाग)।'
        : 'The gold-standard rapid screener: 4-tier Reading tool (Letters → Words → Paragraph → Grade 2 Story) and 4-tier Math tool (1-digit → 2-digit numbers → 2-digit Subtraction with borrow → Division).',
      neevRole: isHi
        ? 'नींव AI में उपयोग: छात्र की सटीक बुनियादी स्थिति (कहानी स्तर बनाम अक्षर स्तर) का तुरंत निर्धारण।'
        : 'Role in NeevAI: Structures our 3-minute oral screener and 52 - 27 subtraction diagnostic test.'
    },
    {
      title: isHi ? 'अर्ली ग्रेड रीडिंग असेसमेंट (EGRA) टूलकिट - द्वितीय संस्करण' : 'Early Grade Reading Assessment (EGRA) Toolkit (Second Edition)',
      subtitle: isHi ? 'RTI इंटरनेशनल द्वारा विकसित' : 'RTI International Global Oral Reading Assessment',
      url: 'https://shared.rti.org/content/early-grade-reading-assessment-egra-toolkit-second-edition',
      tag: 'International Speech Metric',
      tagColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      description: isHi
        ? 'अक्षर-ध्वनि पहचान, परिचित शब्द पठन, मौखिक पठन प्रवाह (WCPM) और सुनने-समझने की क्षमता का वैज्ञानिक मापन।'
        : 'Standardized assessment of core reading components: letter-sound knowledge, phonemic awareness, familiar word decoding, Oral Reading Fluency (WCPM), and listening comprehension.',
      neevRole: isHi
        ? 'नींव AI में उपयोग: वास्तविक समय वाक् पहचान (Speech AI) द्वारा WCPM और सटीकता प्रतिशत की गणना।'
        : 'Role in NeevAI: Powers our Speech AI engine for real-time WCPM and phonics hesitation tracking.'
    },
    {
      title: isHi ? 'अर्ली ग्रेड मैथ्स असेसमेंट (EGMA) टूलकिट' : 'Early Grade Maths Assessment (EGMA) Toolkit',
      subtitle: isHi ? 'RTI इंटरनेशनल द्वारा विकसित' : 'RTI International Foundational Numeracy Diagnostic',
      url: 'https://shared.rti.org/content/early-grade-mathematics-assessment-egma-toolkit',
      tag: 'Cognitive Numeracy Diagnostics',
      tagColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      description: isHi
        ? 'संख्या पहचान, परिमाण विभेदन (Quantity Discrimination), अनुपस्थित संख्या और जोड़-घटाव में स्थानीय मान की समझ का आकलन।'
        : 'Diagnoses core early mathematics concepts: number identification, quantity discrimination (which is greater), missing number patterns, addition/subtraction fluency, and word problem reasoning.',
      neevRole: isHi
        ? 'नींव AI में उपयोग: परिमाण विभेदन (7 बनाम 5) एवं पुनर्समूहन (Borrowing) भ्रांति की ठोस पहचान।'
        : 'Role in NeevAI: Direct foundation for our quantity comparison and base-10 borrowing diagnosis.'
    }
  ];

  return (
    <div id="about" className="w-full bg-[#050816] text-slate-100 relative overflow-hidden select-none border-t border-white/10">
      
      {/* ===================================================================== */}
      {/* 1. TOP BANNER & PHILOSOPHICAL FOUNDATION                              */}
      {/* ===================================================================== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-12 text-center relative z-20">
        <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-xs font-medium mb-6 shadow-xl backdrop-blur-xl">
          <BorderBeam size={90} duration={7} colorFrom="#f97316" colorTo="#06b6d4" borderWidth={1.5} />
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-slate-200">
            {isHi ? 'शिक्षा शास्त्र, शोध एवं नीतिगत आधार' : 'The Pedagogical Science & Mission Behind NeevAI'}
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white max-w-4xl mx-auto leading-[1.18] mb-6">
          {isHi ? (
            <>
              हर बच्चे की सीखने की वास्तविक स्थिति को देखना
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400">
                और ठोस 15-मिनट कदम उठाना।
              </span>
            </>
          ) : (
            <>
              Transforming Invisible Learning Gaps
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400">
                Into Daily Teacher Action.
              </span>
            </>
          )}
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-body leading-relaxed mb-6">
          {isHi
            ? 'भारत की बहु-स्तरीय कक्षाओं में पाठ्यक्रम यह मान लेता है कि सभी 40 बच्चे कक्षा 3 के स्तर पर हैं। वास्तविकता यह है कि बच्चे 5 अलग-अलग स्तरों पर बिखरे होते हैं। नींव AI अंकों के बजाय सोच की मूल भ्रांति को पहचानता है और शिक्षक को शून्य-लागत ठोस गतिविधियां देता है।'
            : 'In an elementary classroom with 40 children and a single teacher, syllabus pacing hides the reality that single classrooms conceal up to 5 distinct foundational skill levels. NeevAI diagnoses the cognitive misconception behind the mistake and equips teachers with zero-cost daily interventions.'}
        </p>
      </div>

      {/* ===================================================================== */}
      {/* 2. CIRCULAR 3D ROTATING GALLERY SHOWCASE                              */}
      {/* ===================================================================== */}
      <div className="relative w-full py-16 px-4 flex flex-col items-center justify-center overflow-hidden border-t border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold mb-3">
            {isHi ? 'नींव AI के 6 मूल शैक्षणिक स्तंभ' : 'The 6 Core Pedagogical Pillars'}
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white mb-2">
            {isHi ? '3D इंटरएक्टिव नवाचार प्रदर्शनी' : 'Interactive 3D Innovation Showcase'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-body">
            {isHi ? 'स्क्रॉल या माउस के साथ घूमाकर देखें कि किस प्रकार नींव AI बुनियादी शिक्षा में क्रांति लाता है।' : 'Rotate or scroll to explore how NeevAI operationalizes empirical research in every classroom.'}
          </p>
        </div>

        <div className="w-full h-[480px] sm:h-[540px] relative flex items-center justify-center">
          <CircularGallery items={LEARNLENS_GALLERY_DATA} radius={520} autoRotateSpeed={0.025} />
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. WHAT CAN YOU READ TO ADVANCE YOUR UNDERSTANDING?                   */}
      {/* ===================================================================== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 relative z-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Essential Literature & Field Evidence</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white mb-3">
            {isHi ? 'अपनी समझ को गहरा करने के लिए क्या पढ़ें?' : 'What Can You Read to Advance Your Understanding?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-body max-w-2xl mx-auto">
            {isHi 
              ? 'ये दो प्रमुख दस्तावेज़ भारत की बुनियादी शिक्षा की वास्तविक स्थिति और समाधान की सबसे पुख्ता वैज्ञानिक नींव प्रस्तुत करते हैं।'
              : 'Direct research papers that dissect the ground realities of Indian classrooms and provide empirical evidence for competency-based solutions.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {foundationalReading.map((item, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor="rgba(244, 63, 94, 0.18)"
              className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
                  >
                    <span>Read Paper</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <h4 className="text-lg sm:text-xl font-bold font-display text-white mb-1.5 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs font-semibold text-cyan-300 mb-3 font-mono">
                  {item.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body mb-4">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10">
                <p className="text-xs font-mono text-amber-300 font-semibold flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-400 mt-0.5" />
                  <span>{item.keyTakeaway}</span>
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* =================================================================== */}
        {/* 4. ASSESSMENT TOOLKITS & DIAGNOSTIC FRAMEWORKS                      */}
        {/* =================================================================== */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-3">
            <Library className="w-3.5 h-3.5" />
            <span>Standardized Diagnostic Toolkits Grounding NeevAI</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white mb-3">
            {isHi ? 'समाधान निर्माण हेतु संसाधन: आकलन उपकरण' : 'Resources to Help Build Solution: Assessment Tools'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-body max-w-2xl mx-auto">
            {isHi 
              ? 'नींव AI का नैदानिक इंजन राष्ट्रीय एवं अंतर्राष्ट्रीय रूप से प्रमाणित इन 4 बुनियादी आकलन ढांचों पर पूर्णतः आधारित है।'
              : 'NeevAI operationalizes these four validated assessment toolkits into a rapid, child-friendly 3-minute diagnostic interface.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessmentToolkits.map((tool, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor="rgba(6, 182, 212, 0.16)"
              className="p-6 sm:p-7 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${tool.tagColor}`}>
                    {tool.tag}
                  </span>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
                    title="Open official toolkit"
                  >
                    <span>View Toolkit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <h4 className="text-base sm:text-lg font-bold font-display text-white mb-1 leading-snug">
                  {tool.title}
                </h4>
                <p className="text-[11px] font-mono text-cyan-300 mb-2">
                  {tool.subtitle}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-body mb-4">
                  {tool.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 bg-cyan-950/20 -mx-6 -mb-6 p-4 rounded-b-3xl">
                <div className="flex items-start gap-1.5 text-xs text-cyan-200 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-[11px]">{tool.neevRole}</span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* =================================================================== */}
        {/* 5. BOTTOM COCKPIT TRIGGER CARD                                      */}
        {/* =================================================================== */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90 border border-cyan-500/30 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-2xl">
          <div className="text-left">
            <h4 className="text-xl font-bold font-display text-white mb-1">
              {isHi ? 'कक्षा में आज ही ठोस बदलाव लाएं' : 'Ready to Close Learning Gaps in Your Classroom?'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-body">
              {isHi 
                ? '40 विद्यार्थियों की वास्तविक स्थिति देखें, नैदानिक जांच चलाएं और 15-मिनट की गतिविधियां उत्पन्न करें।' 
                : 'Explore Section A cockpit, diagnose student misconceptions with CBSE & ASER screeners, and launch zero-cost interventions.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <ShimmerButton
              onClick={onExploreCockpit}
              shimmerColor="#06b6d4"
              borderRadius="14px"
              className="shadow-xl shadow-cyan-950/60"
            >
              <div className="flex items-center gap-2 px-4 py-1.5 font-bold text-xs text-white">
                <span>{isHi ? 'शिक्षक कॉकपिट खोलें' : 'Enter Teacher Cockpit'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </div>
            </ShimmerButton>

            <button
              onClick={onTryAssessment}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-white/10 transition-colors cursor-pointer"
            >
              {isHi ? 'FLN नैदानिक जांच' : 'Try Diagnostic Test'}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

export default AboutSection;
