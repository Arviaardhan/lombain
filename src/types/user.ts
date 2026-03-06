export interface UserTeam {
  name: string;
  role: string;
  status: "Active" | "Completed";
}

export interface UserProject {
  name: string;
  description: string;
}

export interface Participation {
  name: string;
  year: number;
  result: "Winner" | "Runner-Up" | "Finalist" | "Participant";
  role: string;
}

export interface UserDetail {
  id: number;
  name: string;
  initials: string;
  institution: string;
  major: string;
  bio: string;
  skills: string[];
  teamsJoined: number;
  projectsCompleted: number;
  github: string | null;
  linkedin: string | null;
  phone: string | null;
  email: string;
  teams: UserTeam[];
  projects: UserProject[];
  competitionHistory: {
    totalParticipated: number;
    wins: number;
    participations: Participation[];
  };
}