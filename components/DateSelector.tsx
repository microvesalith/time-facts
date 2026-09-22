import React, { useState, useRef } from 'react';
import { Calendar, Clock, ArrowRight, Sparkles, History, Zap, ChevronDown } from 'lucide-react';

interface DateSelectorProps {
  onDateSelected: (date: Date) => void;
}

const PRESETS = [
  { label: 'Now', id: 'now' },
  { label: 'Y2K', id: 'y2k', date: '2000-01-01', time: '00:00' },
  { label: 'Unix Epoch', id: 'epoch', date: '1970-01-01', time: '00:00' },
  { label: 'Bitcoin Genesis', id: 'btc', date: '2009-01-03', time: '18:15' },
];

export const DateSelector: React.FC<DateSelectorProps> = ({ onDateSelected }) => {
  // Initialize with empty strings to prompt user
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('12:00');
  const [isHovered, setIsHovered] = useState(false);

  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  // Helper to format date for display
  const getDisplayDate = () => {
    if (!date) return 'SELECT DATE';
    const d = new Date(date + 'T12:00:00'); // Time doesn't matter for date display
    if (isNaN(d.getTime())) return 'INVALID DATE';
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(d).toUpperCase();
  };

  const handlePreset = (preset: typeof PRESETS[0]) => {
    if (preset.id === 'now') {
      const now = new Date();
      // Format to local ISO date string part
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      
      setDate(`${year}-${month}-${day}`);
      setTime(`${hours}:${minutes}`);
    } else if (preset.date && preset.time) {
      setDate(preset.date);
      setTime(preset.time);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
        // Trigger date picker if trying to submit empty
        dateInputRef.current?.showPicker?.();
        return;
    }
    const dateTimeString = `${date}T${time}`;
    const selectedDate = new Date(dateTimeString);
    if (!isNaN(selectedDate.getTime())) {
        onDateSelected(selectedDate);
    }
  };

  return (
    <div 
      className="relative w-full max-w-xl mx-auto group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        {/* CSS Hack to ensure clicking anywhere on the input opens the picker on Webkit browsers */}
        <style>{`
            .picker-input::-webkit-calendar-picker-indicator {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                opacity: 0;
                cursor: pointer;
            }
        `}</style>

      {/* Decorative Glow Behind */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 ${isHovered ? 'scale-105' : 'scale-100'}`}></div>

      <div className="relative bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-[1.5rem] p-6 md:p-8 shadow-2xl overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
            <Sparkles className="w-24 h-24 text-white" />
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8">
            
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <History className="w-5 h-5 text-cyan-400" />
                TEMPORAL INPUT
              </h2>
              <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">Configure Start Sequence</p>
            </div>
            
            {/* Presets */}
            <div className="flex flex-wrap gap-2">
               {PRESETS.map((p) => (
                 <button
                   key={p.id}
                   type="button"
                   onClick={() => handlePreset(p)}
                   className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-medium text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all hover:bg-slate-800 z-20 relative"
                 >
                   {p.label}
                 </button>
               ))}
            </div>
          </div>

          {/* Main Inputs Display */}
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Date Input Card */}
            <div className="flex-1 relative group/input">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl opacity-0 group-hover/input:opacity-100 transition-opacity pointer-events-none"></div>
                <div 
                  className="bg-slate-900/50 border border-slate-700 rounded-2xl p-4 flex flex-col gap-1 transition-colors group-hover/input:border-cyan-500/50 focus-within:border-cyan-500 focus-within:ring-4 ring-cyan-500/20 relative"
                >
                    <label className="text-xs text-cyan-500/80 font-bold uppercase tracking-wider flex items-center gap-2 pointer-events-none">
                        <Calendar className="w-3 h-3" /> Date
                    </label>
                    <div className="text-2xl md:text-3xl font-mono font-bold text-white tracking-tight truncate pointer-events-none min-h-[40px]">
                        {getDisplayDate()}
                    </div>
                    
                    {/* Overlay Input: Completely covers the card and captures clicks */}
                    <input
                        ref={dateInputRef}
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="picker-input absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer font-mono"
                        required
                        aria-label="Select Date"
                        onClick={(e) => {
                            // Try to force picker on click for browsers that support it
                            try { e.currentTarget.showPicker(); } catch(err) {}
                        }}
                    />
                    
                    <ChevronDown className="absolute right-4 bottom-5 w-4 h-4 text-slate-600 group-hover/input:text-cyan-400 transition-colors pointer-events-none" />
                </div>
            </div>

            {/* Time Input Card */}
            <div className="flex-1 md:flex-[0.6] relative group/input">
                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover/input:opacity-100 transition-opacity pointer-events-none"></div>
                <div 
                  className="bg-slate-900/50 border border-slate-700 rounded-2xl p-4 flex flex-col gap-1 transition-colors group-hover/input:border-purple-500/50 focus-within:border-purple-500 focus-within:ring-4 ring-purple-500/20 relative"
                >
                    <label className="text-xs text-purple-500/80 font-bold uppercase tracking-wider flex items-center gap-2 pointer-events-none">
                        <Clock className="w-3 h-3" /> Time
                    </label>
                    <div className="text-2xl md:text-3xl font-mono font-bold text-white tracking-tight pointer-events-none min-h-[40px]">
                        {time}
                    </div>

                    {/* Overlay Input */}
                    <input
                        ref={timeInputRef}
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="picker-input absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer font-mono"
                        required
                        aria-label="Select Time"
                        onClick={(e) => {
                             try { e.currentTarget.showPicker(); } catch(err) {}
                        }}
                    />

                    <ChevronDown className="absolute right-4 bottom-5 w-4 h-4 text-slate-600 group-hover/input:text-purple-400 transition-colors pointer-events-none" />
                </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={!date}
            className="group/btn relative w-full bg-slate-100 hover:bg-white text-slate-950 font-bold py-5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] z-20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out skew-x-12"></div>
            <span className="relative flex items-center justify-center gap-3 text-lg">
              <Zap className={`w-5 h-5 ${date ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
              INITIATE CALCULATION
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </button>
          
        </form>
      </div>
    </div>
  );
};