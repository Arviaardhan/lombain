export interface Talent {
  avatar: string | Blob | undefined;
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