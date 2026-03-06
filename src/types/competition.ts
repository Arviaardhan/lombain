export interface Competition {
  id: string;
  title: string;
  desc: string;
  category: string;
  slots: string;
  skills: string[];
  posted: string;
  campus: string;
  lookingFor: string[];
  daysLeft: number;
  applicants: number;
}