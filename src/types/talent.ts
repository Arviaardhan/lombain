export interface Talent {
  id: number;
  name: string;
  initials: string;
  institution: string;
  major: string;
  skills: string[];
  teamsJoined: number;
  projectsCompleted: number;
  github: string | null;
  linkedin: string | null;
}