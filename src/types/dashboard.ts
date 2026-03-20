export interface Member {
  name: string;
  initials: string;
  role: string;
  isLeader: boolean;
}

export interface Team {
  id: any;
  name: string;
  filled: number;
  total: number;
  status: "Recruiting" | "Full";
  members: Member[];
}

export interface JoinRequest {
  id: number;
  name: string;
  initials: string;
  role: string;
  skills: string[];
  team: string;
  time: string;
  message: string;
  major: string;
}

export interface Notification {
  id: number;
  message: string;
  type: "success" | "info" | "warning";
  time: string;
}