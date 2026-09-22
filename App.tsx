import React, { useState } from 'react';
import { DateSelector } from './components/DateSelector';
import { MilestoneCard } from './components/MilestoneCard';
import { StatsHeader } from './components/StatsHeader';
import { calculateMilestones } from './utils/dateUtils';
import { Milestone, ViewState } from './types';
import { Hourglass } from 'lucide-react';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.INPUT);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
    setMilestones(calculateMilestones(date));
    setViewState(ViewState.RESULTS);
  };

  const handleReset = () => {
    setViewState(ViewState.INPUT);
    setSelectedDate(null);
    setMilestones([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {viewState === ViewState.RESULTS && selectedDate && (
        <StatsHeader startDate={selectedDate} onReset={handleReset} />
      )}

      <main className="flex-grow flex flex-col items-center justify-center p-4 relative z-0">
        
        {viewState === ViewState.INPUT ? (
          <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="mb-10 text-center">
              <div className="inline-flex items-center justify-center p-3 bg-slate-900 rounded-2xl mb-4 shadow-lg border border-slate-800">
                <Hourglass className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 tracking-tight mb-4">
                ChronoFacts
              </h1>
              <p className="text-lg text-slate-400 max-w-lg mx-auto">
                Time is more than just hours and minutes. Discover the exact moment you cross the 1 billion second mark and other cosmic milestones.
              </p>
            </div>
            <DateSelector onDateSelected={handleDateSelected} />
          </div>
        ) : (
          <div className="w-full max-w-6xl mx-auto py-12 animate-in slide-in-from-bottom-8 duration-700">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Your Timeline</h2>
              <p className="text-slate-400">Significant temporal landmarks based on your input.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {milestones.map((milestone, index) => (
                <MilestoneCard key={milestone.id} milestone={milestone} />
              ))}
            </div>

            <div className="mt-16 text-center border-t border-slate-800 pt-8">
               <p className="text-slate-500 text-sm">
                 AI-generated insights powered by Google Gemini.
               </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;