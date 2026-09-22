import { Milestone } from '../types';

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(date);
};

export const calculateMilestones = (startDate: Date): Milestone[] => {
  const now = new Date();
  
  const definitions = [
    { value: 1_000_000, unit: 'seconds', title: '1 Million Seconds', desc: 'Approx. 11.5 days' },
    { value: 10_000_000, unit: 'seconds', title: '10 Million Seconds', desc: 'Approx. 4 months' },
    { value: 100_000, unit: 'minutes', title: '100,000 Minutes', desc: 'Approx. 69 days' },
    { value: 100_000_000, unit: 'seconds', title: '100 Million Seconds', desc: 'Approx. 3.17 years' },
    { value: 1_000, unit: 'weeks', title: '1,000 Weeks', desc: 'Approx. 19.1 years' },
    { value: 500_000_000, unit: 'seconds', title: 'Half Billion Seconds', desc: 'Approx. 15.8 years' },
    { value: 777_777_777, unit: 'seconds', title: 'Lucky Sevens', desc: '777,777,777 Seconds (Approx 24.6 years)' },
    { value: 1_000_000_000, unit: 'seconds', title: '1 Billion Seconds', desc: 'Approx. 31.7 years' },
    { value: 2_000, unit: 'weeks', title: '2,000 Weeks', desc: 'Approx. 38.3 years' },
    { value: 1_500_000_000, unit: 'seconds', title: '1.5 Billion Seconds', desc: 'Approx. 47.5 years' },
    { value: 2_000_000_000, unit: 'seconds', title: '2 Billion Seconds', desc: 'Approx. 63.4 years' },
    { value: 3_000_000_000, unit: 'seconds', title: '3 Billion Seconds', desc: 'Approx. 95.1 years' },
    { value: 10_000, unit: 'days', title: '10,000 Days', desc: 'Approx. 27.3 years' },
    { value: 20_000, unit: 'days', title: '20,000 Days', desc: 'Approx. 54.7 years' },
    { value: 123_456_789, unit: 'seconds', title: '123,456,789 Seconds', desc: 'Approx 3.9 years' },
  ] as const;

  return definitions.map((def, index) => {
    let milestoneDate = new Date(startDate.getTime());
    
    if (def.unit === 'seconds') {
      milestoneDate.setSeconds(milestoneDate.getSeconds() + def.value);
    } else if (def.unit === 'days') {
      milestoneDate.setDate(milestoneDate.getDate() + def.value);
    } else if (def.unit === 'minutes') {
      milestoneDate.setMinutes(milestoneDate.getMinutes() + def.value);
    } else if (def.unit === 'weeks') {
      milestoneDate.setDate(milestoneDate.getDate() + (def.value * 7));
    }

    return {
      id: `milestone-${index}`,
      title: def.title,
      description: def.desc,
      date: milestoneDate,
      isPast: milestoneDate < now,
      value: def.value,
      unit: def.unit
    };
  }).sort((a, b) => a.date.getTime() - b.date.getTime());
};

export const getTimeAliveStats = (birthDate: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - birthDate.getTime();
  
  return {
    seconds: Math.floor(diffMs / 1000),
    minutes: Math.floor(diffMs / (1000 * 60)),
    hours: Math.floor(diffMs / (1000 * 60 * 60)),
    days: Math.floor(diffMs / (1000 * 60 * 60 * 24)),
  };
};