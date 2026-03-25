export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
export const API_BASE_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_BACKEND_API_PATH}`;

export const ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  LOGOUT: `${API_BASE_URL}/logout`,
  USER: `${API_BASE_URL}/user`,

  // Skill
  SKILL_CATEGORIES: `${API_BASE_URL}/skill-categories`,

  // Explore & Talents
  EXPLORE_TEAMS: `${API_BASE_URL}/explore/teams`,
  TALENTS: `${API_BASE_URL}/talents`, // Get All Talents
  TALENT_DETAIL: (id: string | number) => `${API_BASE_URL}/talents/${id}`,

  // Teams
  CREATE_TEAM: `${API_BASE_URL}/create-teams`,
  TEAM_DETAIL: (id: string | number) => `${API_BASE_URL}/teams/${id}`,
  JOIN_TEAM: (id: string | number) => `${API_BASE_URL}/teams/${id}/join`,
  MY_TEAMS: `${API_BASE_URL}/my/teams`,

  // Team Management
  TEAM_REQUESTS: (id: string | number) =>
    `${API_BASE_URL}/teams/${id}/requests`,
  TEAM_STRUCTURE: (id: string | number) =>
    `${API_BASE_URL}/teams/${id}/structure`,
  INVITE_MEMBER: `${API_BASE_URL}/teams/invite`,
  RESPOND_INVITE: `${API_BASE_URL}/teams/respond-invite`,
  ASSIGN_ROLE: `${API_BASE_URL}/teams/assign-role`,
  REJECT_REQUEST: (id: string | number) => `${API_BASE_URL}/teams/reject/${id}`,
  REMOVE_MEMBER: (teamId: string | number, userId: string | number) =>
    `${API_BASE_URL}/teams/${teamId}/members/${userId}`,

  // Roles
  CREATE_ROLE: (id: string | number) => `${API_BASE_URL}/teams/${id}/roles`,
  UPDATE_ROLE: (id: string | number) => `${API_BASE_URL}/update-roles/${id}`,
  DELETE_ROLE: (id: string | number) => `${API_BASE_URL}/delete-roles/${id}`,

  // User Dashboard & Search
  USER_DASHBOARD: `${API_BASE_URL}/user/dashboard`,
  USER_SEARCH: `${API_BASE_URL}/users/search`,

  // Profile
  GET_PROFILE: `${API_BASE_URL}/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/profile/update`,
};
