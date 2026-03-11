import { JoinRequest, Notification, Team } from "@/types/dashboard";

export const initialRequests: JoinRequest[] = [
  {
    id: 1,
    name: "Budi Santoso",
    initials: "BS",
    role: "Interaction Designer",
    skills: ["Figma", "After Effects"],
    team: "Hackathon UI/UX 2026",
    time: "1 hour ago",
    message: "I have 2 years of experience in interaction design and won a design award last year.",
    major: "Visual Communication Design",
  },
  {
    id: 2,
    name: "Lisa Chen",
    initials: "LC",
    role: "UX Researcher",
    skills: ["User Testing", "Analytics"],
    team: "Hackathon UI/UX 2026",
    time: "3 hours ago",
    message: "Passionate about healthcare UX. Currently writing my thesis on patient experience.",
    major: "Psychology",
  },
  {
    id: 3,
    name: "Ravi Kumar",
    initials: "RK",
    role: "Frontend Developer",
    skills: ["React", "TypeScript"],
    team: "Web Dev Marathon",
    time: "5 hours ago",
    message: "Full-stack developer with experience in React and Node.js. Ready for the marathon!",
    major: "Computer Science",
  },
];

export const notifications: Notification[] = [
  { id: 1, message: "Your request to join 'AI Chatbot Competition' was accepted!", type: "success", time: "30 min ago" },
  { id: 2, message: "New member joined your team 'Hackathon UI/UX 2026'", type: "info", time: "2 hours ago" },
  { id: 3, message: "Reminder: Competition deadline in 5 days", type: "warning", time: "1 day ago" },
];

export const initialTeams: Team[] = [
  {
    name: "Hackathon UI/UX 2026",
    filled: 2,
    total: 4,
    status: "Recruiting",
    members: [
      { name: "You (Andi Pratama)", initials: "AP", role: "Team Leader", isLeader: true },
      { name: "Sarah Chen", initials: "SC", role: "Member", isLeader: false },
    ],
  },
  {
    name: "Web Dev Marathon",
    filled: 4,
    total: 4,
    status: "Full",
    members: [
      { name: "You (Andi Pratama)", initials: "AP", role: "Team Leader", isLeader: true },
      { name: "John Doe", initials: "JD", role: "Member", isLeader: false },
      { name: "Jane Smith", initials: "JS", role: "Member", isLeader: false },
      { name: "Alex Wong", initials: "AW", role: "Member", isLeader: false },
    ],
  },
  {
    name: "AI Chatbot Competition",
    filled: 3,
    total: 4,
    status: "Recruiting",
    members: [
      { name: "You (Andi Pratama)", initials: "AP", role: "Team Leader", isLeader: true },
      { name: "Maria Garcia", initials: "MG", role: "Member", isLeader: false },
      { name: "Tom Lee", initials: "TL", role: "Member", isLeader: false },
    ],
  },
];