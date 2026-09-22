export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: Date;
  isPast: boolean;
  value: number; // The raw number (e.g., 1,000,000)
  unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks';
  icon?: string;
}

export interface FactRequest {
  date: string;
  topic?: string;
}

export enum ViewState {
  INPUT,
  RESULTS
}