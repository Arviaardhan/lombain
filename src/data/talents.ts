import { Talent } from "@/types/talent";

export const allSkills = ["Laravel", "Python", "Figma", "React", "Node.js", "Flutter", "TensorFlow", "UI/UX", "Data Science", "Java", "Go", "Swift"];
export const allMajors = ["Computer Science", "Information Systems", "Design", "Data Science", "Informatics Engineering", "Electrical Engineering"];
export const allInstitutions = ["Muria Kudus University", "Universitas Indonesia", "ITB", "UGM", "Binus University", "ITS"];

export const mockUsers: Talent[] = [
  { id: 1, name: "Andi Prasetyo", initials: "AP", institution: "Universitas Indonesia", major: "Computer Science", skills: ["React", "Node.js", "Python"], teamsJoined: 4, projectsCompleted: 7, github: "#", linkedin: "#" },
  { id: 2, name: "Siti Nurhaliza", initials: "SN", institution: "ITB", major: "Design", skills: ["Figma", "UI/UX", "Flutter"], teamsJoined: 3, projectsCompleted: 5, github: "#", linkedin: "#" },
  { id: 3, name: "Reza Firmansyah", initials: "RF", institution: "UGM", major: "Data Science", skills: ["Python", "TensorFlow", "Data Science"], teamsJoined: 2, projectsCompleted: 3, github: "#", linkedin: null },
  { id: 4, name: "Maya Putri", initials: "MP", institution: "Binus University", major: "Information Systems", skills: ["Laravel", "Java", "React"], teamsJoined: 5, projectsCompleted: 9, github: "#", linkedin: "#" },
  { id: 5, name: "Dimas Saputra", initials: "DS", institution: "ITS", major: "Electrical Engineering", skills: ["Python", "Go", "TensorFlow"], teamsJoined: 1, projectsCompleted: 2, github: null, linkedin: "#" },
  { id: 6, name: "Lina Kartika", initials: "LK", institution: "Telkom University", major: "Business IT", skills: ["Figma", "UI/UX", "Swift"], teamsJoined: 3, projectsCompleted: 4, github: "#", linkedin: "#" },
  { id: 7, name: "Bayu Ardianto", initials: "BA", institution: "Universitas Indonesia", major: "Computer Science", skills: ["React", "Flutter", "Node.js"], teamsJoined: 6, projectsCompleted: 11, github: "#", linkedin: "#" },
  { id: 8, name: "Citra Dewi", initials: "CD", institution: "ITB", major: "Design", skills: ["Figma", "UI/UX", "React"], teamsJoined: 2, projectsCompleted: 3, github: "#", linkedin: null },
];