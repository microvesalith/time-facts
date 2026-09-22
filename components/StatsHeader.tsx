import React, { useEffect, useState } from 'react';
import { getTimeAliveStats } from '../utils/dateUtils';

interface StatsHeaderProps {
  startDate: Date;
  onReset: () => void;
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({ startDate, onReset }) => {
  const [stats, setStats] = useState(getTimeAliveStats(startDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(getTimeAliveStats(startDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 sticky top-0 z-10 backdrop-blur-md bg-slate-900/80">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onReset}
            className="text-xs font-semibold text-slate-400 hover:text-white uppercase tracking-wider hover:underline"
          >
            ← New Date
          </button>
          <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
          <div>
            <span className="text-slate-400 text-sm">Time Elapsed:</span>
          </div>
        </div>

        <div className="flex gap-4 md:gap-8 text-center">
          <div className="flex flex-col">
            <span className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">{stats.days.toLocaleString()}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Days</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold font-mono text-blue-400 tabular-nums">{stats.hours.toLocaleString()}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Hours</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold font-mono text-indigo-400 tabular-nums">{stats.seconds.toLocaleString()}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};