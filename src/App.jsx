import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { StorylineHero } from './components/StorylineHero';
import { AboutSection } from './components/AboutSection';
import { ScrollLockedVideoHero } from './components/ui/scroll-locked-video-hero';
import { TeacherDashboard } from './components/TeacherDashboard';
import { LearningCycleView } from './components/LearningCycleView';
import { MisconceptionRadar } from './components/MisconceptionRadar';
import { StudentAssessment } from './components/StudentAssessment';
import { ActivityGenerator } from './components/ActivityGenerator';
import { ImpactDashboard } from './components/ImpactDashboard';
import { StudentModal } from './components/StudentModal';
import { AskLearnLensDrawer } from './components/AskLearnLensDrawer';
import { TeacherAuthModal } from './components/TeacherAuthModal';
import { AddStudentModal } from './components/AddStudentModal';
import { AddClassModal } from './components/AddClassModal';
import { AssessmentEntryModal } from './components/AssessmentEntryModal';
import { CreateAssessmentModal } from './components/CreateAssessmentModal';
import { DocumentRosterImporterModal } from './components/DocumentRosterImporterModal';
import { KidWiseAnimatedBackground } from './components/ui/KidWiseAnimatedBackground';

function AppContent() {
  const { 
    currentView, 
    setCurrentView, 
    lang, 
    setLang, 
    selectedStudent, 
    setSelectedStudent,
    isAssistantOpen, 
    setIsAssistantOpen 
  } = useApp();

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* KidWise Animated Educational Background for dashboard/activities/tools */}
      {currentView !== 'storyline' && currentView !== 'intro' && (
        <KidWiseAnimatedBackground className="fixed inset-0 z-0 pointer-events-none" />
      )}

      {/* Top Navigation Bar with bilingual toggle & AI trigger */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        lang={lang}
        setLang={setLang}
        openAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative z-10">
        {currentView === 'intro' && (
          <ScrollLockedVideoHero
            onEnterOverview={() => setCurrentView('storyline')}
            onExploreCockpit={() => setCurrentView('dashboard')}
            onTryAssessment={() => setCurrentView('assessment')}
            lang={lang}
          />
        )}

        {currentView === 'storyline' && (
          <StorylineHero
            onExploreCockpit={() => setCurrentView('dashboard')}
            onTryAssessment={() => setCurrentView('assessment')}
            lang={lang}
          />
        )}

        {currentView === 'about' && (
          <div className="pt-6">
            <AboutSection
              onExploreCockpit={() => setCurrentView('dashboard')}
              onTryAssessment={() => setCurrentView('assessment')}
              lang={lang}
            />
          </div>
        )}

        {currentView === 'dashboard' && (
          <TeacherDashboard
            onSelectStudent={(stu) => setSelectedStudent(stu)}
            onOpenMisconception={() => setCurrentView('misconceptions')}
            onOpenActivityStudio={() => setCurrentView('activities')}
            lang={lang}
          />
        )}

        {currentView === 'cycle' && (
          <LearningCycleView />
        )}

        {currentView === 'assessment' && (
          <StudentAssessment
            lang={lang}
            onCompleteToDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'misconceptions' && (
          <MisconceptionRadar lang={lang} />
        )}

        {currentView === 'activities' && (
          <ActivityGenerator lang={lang} />
        )}

        {currentView === 'impact' && (
          <ImpactDashboard lang={lang} />
        )}
      </main>

      {/* Student Deep-Dive Profile Modal */}
      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          lang={lang}
          onStartActivity={() => {
            setSelectedStudent(null);
            setCurrentView('activities');
          }}
        />
      )}

      {/* Interactive Global Modals for Management */}
      <TeacherAuthModal />
      <AddStudentModal />
      <AddClassModal />
      <AssessmentEntryModal />
      <CreateAssessmentModal />
      <DocumentRosterImporterModal />

      {/* Floating AI Pedagogical Assistant Drawer */}
      <AskLearnLensDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        lang={lang}
      />

      {/* Footer with social impact tagline (hidden on Intro page for zero empty space) */}
      {currentView !== 'intro' && (
        <footer className="w-full border-t border-white/10 bg-[#02040a] py-8 px-4 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold font-display text-slate-200">NeevAI</span>
              <span>•</span>
              <span className="text-cyan-400 font-mono font-semibold">“See the Gap. Understand the Child. Take Action.”</span>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span>CBSE FLN Toolkit</span>
              <span>•</span>
              <span>Pratham ASER</span>
              <span>•</span>
              <span>J-PAL Validated</span>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
