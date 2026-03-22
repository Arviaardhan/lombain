export interface Talent {
  id: number;
  name: string;
  major: string;
  institution: string;
  avatar?: string;
  bio?: string;
  skills: string[] | any[];
  github_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  teams_count?: number; 
  projects_count?: number;
}