import React, { useState } from 'react';
import { Milestone } from '../types';
import { formatDate } from '../utils/dateUtils';
import { generateDateTrivia } from '../services/geminiService';
import { Sparkles, CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface MilestoneCardProps {
  milestone: Milestone;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone }) => {
  const [trivia, setTrivia] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetTrivia = async () => {
    setLoading(true);
    const fact = await generateDateTrivia(
      formatDate(milestone.date), 
      `The user will pass/passed the milestone of ${milestone.title} on this date.`
    );
    setTrivia(fact);
    setLoading(false);
  };

  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl group
        ${milestone.isPast 
          ? 'bg-slate-900/40 border-slate-800 hover:border-slate-600' 
          : 'bg-slate-800/60 border-indigo-500/30 hover:border-indigo-400 hover:bg-slate-800'
        }
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {milestone.isPast ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <Circle className="w-5 h-5 text-indigo-400" />
            )}
            <h3 className={`font-bold text-lg ${milestone.isPast ? 'text-slate-400' : 'text-indigo-100'}`}>
              {milestone.title}
            </h3>
          </div>
          <p className="text-sm text-slate-500 font-mono">{milestone.description}</p>
        </div>
        <div className={`
          px-3 py-1 rounded-full text-xs font-medium border
          ${milestone.isPast 
            ? 'bg-slate-900 text-slate-500 border-slate-800' 
            : 'bg-indigo-900/30 text-indigo-300 border-indigo-500/30'
          }
        `}>
          {milestone.isPast ? 'ACHIEVED' : 'UPCOMING'}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xl font-semibold text-slate-200">
          {formatDate(milestone.date)}
        </p>
      </div>

      {trivia ? (
        <div className="mt-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800/50 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> Cosmic Insight
          </div>
          <p className="text-sm text-slate-300 leading-relaxed italic">
            "{trivia}"
          </p>
        </div>
      ) : (
        <button
          onClick={handleGetTrivia}
          disabled={loading}
          className="w-full mt-2 py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm text-slate-300 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4 text-yellow-500" />
          )}
          {loading ? 'Consulting the Archives...' : 'Reveal Time Fact'}
        </button>
      )}
    </div>
  );
};