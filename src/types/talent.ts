export interface Talent {
  id: number;
  name: string;
  initials: string;
  major: string;
  institution: string;
  avatar?: string;
  bio?: string;
  skills: string[] | any[];
  teamsJoined?: number;
  projectsCompleted?: number;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  teams_count?: number;
  projects_count?: number;
}
