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
  teams: { name: string; role: string; status: string }[];
  projects: { name: string; description: string }[];
  performance: {
    month: string;
    year: number;
    participations: number;
    wins: number;
    competitions: {
      name: string;
      team: string;
      result: "Winner" | "Runner-Up" | "Finalist" | "Participant";
    }[];
  }[];
  competitionHistory: {
    totalParticipated: number;
    wins: number;
    participations: Participation[];
  };
}

export const mockUsers: Record<number, UserDetail> = {
  1: {
    id: 1,
    name: "Andi Prasetyo",
    initials: "AP",
    institution: "Universitas Indonesia",
    major: "Computer Science",
    bio: "Full-stack developer yang berfokus pada skalabilitas aplikasi web. Berpengalaman memimpin tim di berbagai hackathon nasional.",
    skills: ["React", "Node.js", "Python", "TypeScript", "PostgreSQL"],
    teamsJoined: 4,
    projectsCompleted: 7,
    github: "https://github.com/andi",
    linkedin: "https://linkedin.com/in/andi",
    phone: "6281234567890",
    email: "andi.prasetyo@ui.ac.id",
    teams: [
      { name: "Hackathon UI/UX 2026", role: "Frontend Dev", status: "Active" },
      { name: "Web Dev Marathon", role: "Full Stack", status: "Completed" },
    ],
    projects: [
      {
        name: "EduConnect Platform",
        description: "Platform pembelajaran peer-to-peer untuk mahasiswa.",
      },
      {
        name: "GreenRoute App",
        description:
          "Perencana rute transportasi ramah lingkungan menggunakan AI.",
      },
    ],
    performance: [
      {
        month: "Aug",
        year: 2024,
        participations: 1,
        wins: 0,
        competitions: [
          { name: "Summer Code Jam", team: "ByteForce", result: "Participant" },
        ],
      },
      {
        month: "Sep",
        year: 2024,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Hackathon Merdeka", team: "ByteForce", result: "Winner" },
          { name: "Cloud Challenge", team: "SkyNet ID", result: "Finalist" },
          {
            name: "Data Viz Contest",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Oct",
        year: 2024,
        participations: 4,
        wins: 3,
        competitions: [
          { name: "Gemastik XVI", team: "ByteForce", result: "Winner" },
          { name: "Compfest XV", team: "CodeCrafters", result: "Winner" },
          { name: "IoT Smart Campus", team: "SensorLab", result: "Winner" },
          {
            name: "Mobile App Challenge",
            team: "AppStorm",
            result: "Runner-Up",
          },
        ],
      },
      {
        month: "Nov",
        year: 2024,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "DevFest Jakarta", team: "ByteForce", result: "Winner" },
          { name: "Startup Weekend", team: "LaunchPad", result: "Winner" },
          { name: "Code for Good", team: "ImpactDev", result: "Finalist" },
          {
            name: "AI Innovation Cup",
            team: "NeuralNet",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2024,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Year-End Hackfest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jan",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Code Jam", team: "ByteForce", result: "Winner" },
          { name: "Figma Config Jam", team: "PixelCraft", result: "Runner-Up" },
          { name: "Backend Blitz", team: "ServerSquad", result: "Participant" },
        ],
      },
      {
        month: "Feb",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Valentine Hack", team: "ByteForce", result: "Winner" },
          {
            name: "UX Research Sprint",
            team: "PixelCraft",
            result: "Finalist",
          },
        ],
      },
      {
        month: "Mar",
        year: 2025,
        participations: 5,
        wins: 2,
        competitions: [
          {
            name: "Google Solution Challenge",
            team: "ByteForce",
            result: "Winner",
          },
          {
            name: "Hackathon Nasional",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "AWS Build Day", team: "SkyNet ID", result: "Finalist" },
          { name: "Flutter Fest", team: "AppStorm", result: "Runner-Up" },
          {
            name: "Data Science Bowl",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Apr",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "Enterprise Hack", team: "ByteForce", result: "Winner" },
          {
            name: "Product Design Sprint",
            team: "PixelCraft",
            result: "Winner",
          },
          {
            name: "Blockchain Challenge",
            team: "ChainGang",
            result: "Finalist",
          },
          {
            name: "React Challenge",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "May",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "EdTech Hackathon", team: "ByteForce", result: "Winner" },
          { name: "Green Tech Sprint", team: "EcoCode", result: "Runner-Up" },
          { name: "Mobile UX Jam", team: "AppStorm", result: "Participant" },
        ],
      },
      {
        month: "Jun",
        year: 2025,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Mid-Year Code Fest", team: "ByteForce", result: "Finalist" },
          {
            name: "Design Systems Jam",
            team: "PixelCraft",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jul",
        year: 2025,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Summer Break Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Aug",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Independence Hack", team: "ByteForce", result: "Winner" },
          {
            name: "A11y Design Challenge",
            team: "PixelCraft",
            result: "Runner-Up",
          },
          {
            name: "Cloud Native Jam",
            team: "SkyNet ID",
            result: "Participant",
          },
        ],
      },
      {
        month: "Sep",
        year: 2025,
        participations: 5,
        wins: 3,
        competitions: [
          { name: "Compfest XVI", team: "ByteForce", result: "Winner" },
          {
            name: "Hackathon Merdeka II",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "iOS Dev Challenge", team: "AppStorm", result: "Winner" },
          { name: "Data Hackday", team: "DataMinds", result: "Finalist" },
          { name: "Cyber Security CTF", team: "SecOps", result: "Participant" },
        ],
      },
      {
        month: "Oct",
        year: 2025,
        participations: 5,
        wins: 4,
        competitions: [
          { name: "Gemastik XVII", team: "ByteForce", result: "Winner" },
          { name: "Google Dev Fest", team: "CodeCrafters", result: "Winner" },
          { name: "UI/UX Design Sprint", team: "PixelCraft", result: "Winner" },
          { name: "Smart City Hack", team: "UrbanDev", result: "Winner" },
          { name: "Startup Pitch Day", team: "LaunchPad", result: "Finalist" },
        ],
      },
      {
        month: "Nov",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "BizIT Challenge", team: "ByteForce", result: "Winner" },
          { name: "Creative Code Fest", team: "PixelCraft", result: "Winner" },
          { name: "Tech in Asia Hack", team: "LaunchPad", result: "Finalist" },
          {
            name: "DevOps Challenge",
            team: "ServerSquad",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Year-End Showcase", team: "ByteForce", result: "Winner" },
          { name: "Holiday Hack", team: "CodeCrafters", result: "Participant" },
        ],
      },
      {
        month: "Jan",
        year: 2026,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Innovation", team: "ByteForce", result: "Winner" },
          { name: "AI Ethics Hack", team: "NeuralNet", result: "Runner-Up" },
          {
            name: "Frontend Blitz",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "Feb",
        year: 2026,
        participations: 4,
        wins: 2,
        competitions: [
          {
            name: "Valentine Design Jam",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Cloud Innovation Cup", team: "SkyNet ID", result: "Winner" },
          {
            name: "React Challenge II",
            team: "CodeCrafters",
            result: "Finalist",
          },
          {
            name: "Agile Sprint Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Mar",
        year: 2026,
        participations: 5,
        wins: 3,
        competitions: [
          {
            name: "Hackathon UI/UX 2026",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Code for Impact", team: "ImpactDev", result: "Winner" },
          { name: "Flutter Fest II", team: "AppStorm", result: "Winner" },
          { name: "Blockchain Summit", team: "ChainGang", result: "Runner-Up" },
          { name: "Campus Dev Day", team: "ByteForce", result: "Finalist" },
        ],
      },
    ],
    competitionHistory: {
      totalParticipated: 7,
      wins: 3,
      participations: [
        {
          name: "Hackathon Nasional 2025",
          year: 2025,
          result: "Winner",
          role: "Frontend Developer",
        },
        {
          name: "Google Solution Challenge",
          year: 2025,
          result: "Finalist",
          role: "Full Stack Developer",
        },
        {
          name: "Gemastik XVI",
          year: 2024,
          result: "Winner",
          role: "Team Lead",
        },
        {
          name: "Web Dev Marathon",
          year: 2024,
          result: "Runner-Up",
          role: "Full Stack Developer",
        },
        {
          name: "Cloud Innovation Cup",
          year: 2024,
          result: "Winner",
          role: "Backend Developer",
        },
        {
          name: "UI/UX Design Sprint",
          year: 2023,
          result: "Participant",
          role: "Frontend Developer",
        },
        {
          name: "Startup Weekend Jakarta",
          year: 2023,
          result: "Finalist",
          role: "Tech Lead",
        },
      ],
    },
  },
  2: {
    id: 2,
    name: "Arvia Faustina",
    initials: "AF",
    institution: "Universitas Muria Kudus",
    major: "Informatics Engineering",
    bio: "Mahasiswa Teknik Informatika yang antusias dengan Web & Mobile Development. Memiliki ketertarikan kuat pada Laravel, Flutter, dan logika permainan Xiangqi.",
    skills: ["Laravel", "Flutter", "Python", "Kotlin", "UI/UX Design"],
    teamsJoined: 3,
    projectsCompleted: 6,
    github: "https://github.com/arvia",
    linkedin: "https://linkedin.com/in/arvia",
    phone: "6289512345678",
    email: "arvia.faustina@umk.ac.id",
    teams: [
      { name: "Lombain.id Dev", role: "Project Leader", status: "Active" },
      {
        name: "Xiangqi Strategy Club",
        role: "Lead Developer",
        status: "Active",
      },
    ],
    projects: [
      {
        name: "KelasKita App",
        description:
          "Aplikasi manajemen kelas yang dikembangkan sebagai proyek akhir sekolah kejuruan.",
      },
      {
        name: "Gaia-Rimba Monitor",
        description:
          "Sistem monitoring hutan pintar menggunakan sensor molekuler dan satelit.",
      },
    ],
    performance: [
      {
        month: "Aug",
        year: 2024,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Summer Code Jam", team: "ByteForce", result: "Participant" },
          { name: "UI/UX Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Sep",
        year: 2024,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Hackathon Merdeka", team: "ByteForce", result: "Winner" },
          { name: "Cloud Challenge", team: "SkyNet ID", result: "Finalist" },
          {
            name: "Data Viz Contest",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Oct",
        year: 2024,
        participations: 6,
        wins: 3,
        competitions: [
          { name: "Gemastik XVI", team: "ByteForce", result: "Winner" },
          { name: "Compfest XV", team: "CodeCrafters", result: "Winner" },
          { name: "IoT Smart Campus", team: "SensorLab", result: "Winner" },
          {
            name: "Mobile App Challenge",
            team: "AppStorm",
            result: "Runner-Up",
          },
          { name: "Web Dev Marathon", team: "ByteForce", result: "Finalist" },
          { name: "Design Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Nov",
        year: 2024,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "DevFest Jakarta", team: "ByteForce", result: "Winner" },
          { name: "Startup Weekend", team: "LaunchPad", result: "Winner" },
          { name: "Code for Good", team: "ImpactDev", result: "Finalist" },
          {
            name: "AI Innovation Cup",
            team: "NeuralNet",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2024,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Year-End Hackfest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jan",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Code Jam", team: "ByteForce", result: "Winner" },
          { name: "Figma Config Jam", team: "PixelCraft", result: "Runner-Up" },
          { name: "Backend Blitz", team: "ServerSquad", result: "Participant" },
        ],
      },
      {
        month: "Feb",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Valentine Hack", team: "ByteForce", result: "Winner" },
          {
            name: "UX Research Sprint",
            team: "PixelCraft",
            result: "Finalist",
          },
        ],
      },
      {
        month: "Mar",
        year: 2025,
        participations: 5,
        wins: 2,
        competitions: [
          {
            name: "Google Solution Challenge",
            team: "ByteForce",
            result: "Winner",
          },
          {
            name: "Hackathon Nasional",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "AWS Build Day", team: "SkyNet ID", result: "Finalist" },
          { name: "Flutter Fest", team: "AppStorm", result: "Runner-Up" },
          {
            name: "Data Science Bowl",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Apr",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "Enterprise Hack", team: "ByteForce", result: "Winner" },
          {
            name: "Product Design Sprint",
            team: "PixelCraft",
            result: "Winner",
          },
          {
            name: "Blockchain Challenge",
            team: "ChainGang",
            result: "Finalist",
          },
          {
            name: "React Challenge",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "May",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "EdTech Hackathon", team: "ByteForce", result: "Winner" },
          { name: "Green Tech Sprint", team: "EcoCode", result: "Runner-Up" },
          { name: "Mobile UX Jam", team: "AppStorm", result: "Participant" },
        ],
      },
      {
        month: "Jun",
        year: 2025,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Mid-Year Code Fest", team: "ByteForce", result: "Finalist" },
          {
            name: "Design Systems Jam",
            team: "PixelCraft",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jul",
        year: 2025,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Summer Break Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Aug",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Independence Hack", team: "ByteForce", result: "Winner" },
          {
            name: "A11y Design Challenge",
            team: "PixelCraft",
            result: "Runner-Up",
          },
          {
            name: "Cloud Native Jam",
            team: "SkyNet ID",
            result: "Participant",
          },
        ],
      },
      {
        month: "Sep",
        year: 2025,
        participations: 5,
        wins: 3,
        competitions: [
          { name: "Compfest XVI", team: "ByteForce", result: "Winner" },
          {
            name: "Hackathon Merdeka II",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "iOS Dev Challenge", team: "AppStorm", result: "Winner" },
          { name: "Data Hackday", team: "DataMinds", result: "Finalist" },
          { name: "Cyber Security CTF", team: "SecOps", result: "Participant" },
        ],
      },
      {
        month: "Oct",
        year: 2025,
        participations: 7,
        wins: 4,
        competitions: [
          { name: "Gemastik XVII", team: "ByteForce", result: "Winner" },
          { name: "Google Dev Fest", team: "CodeCrafters", result: "Winner" },
          { name: "UI/UX Design Sprint", team: "PixelCraft", result: "Winner" },
          { name: "Smart City Hack", team: "UrbanDev", result: "Winner" },
          { name: "ML Challenge", team: "NeuralNet", result: "Runner-Up" },
          { name: "Startup Pitch Day", team: "LaunchPad", result: "Finalist" },
          {
            name: "Open Source Fest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Nov",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "BizIT Challenge", team: "ByteForce", result: "Winner" },
          { name: "Creative Code Fest", team: "PixelCraft", result: "Winner" },
          { name: "Tech in Asia Hack", team: "LaunchPad", result: "Finalist" },
          {
            name: "DevOps Challenge",
            team: "ServerSquad",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Year-End Showcase", team: "ByteForce", result: "Winner" },
          { name: "Holiday Hack", team: "CodeCrafters", result: "Participant" },
        ],
      },
      {
        month: "Jan",
        year: 2026,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Innovation", team: "ByteForce", result: "Winner" },
          { name: "AI Ethics Hack", team: "NeuralNet", result: "Runner-Up" },
          {
            name: "Frontend Blitz",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "Feb",
        year: 2026,
        participations: 4,
        wins: 2,
        competitions: [
          {
            name: "Valentine Design Jam",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Cloud Innovation Cup", team: "SkyNet ID", result: "Winner" },
          {
            name: "React Challenge II",
            team: "CodeCrafters",
            result: "Finalist",
          },
          {
            name: "Agile Sprint Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Mar",
        year: 2026,
        participations: 5,
        wins: 3,
        competitions: [
          {
            name: "Hackathon UI/UX 2026",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Code for Impact", team: "ImpactDev", result: "Winner" },
          { name: "Flutter Fest II", team: "AppStorm", result: "Winner" },
          { name: "Blockchain Summit", team: "ChainGang", result: "Runner-Up" },
          { name: "Campus Dev Day", team: "ByteForce", result: "Finalist" },
        ],
      },
    ],
    competitionHistory: {
      totalParticipated: 6,
      wins: 2,
      participations: [
        {
          name: "Web Design Competition INNOVATE",
          year: 2026,
          result: "Winner",
          role: "UI/UX Designer",
        },
        {
          name: "GEMASTIK Software Development",
          year: 2026,
          result: "Finalist",
          role: "Mobile Developer",
        },
        {
          name: "LKS SMK Software Development",
          year: 2025,
          result: "Winner",
          role: "Full Stack Developer",
        },
        {
          name: "Xiangqi Student Championship",
          year: 2025,
          result: "Runner-Up",
          role: "Player",
        },
        {
          name: "Mobile App Competition UMK",
          year: 2025,
          result: "Winner",
          role: "Mobile Developer",
        },
        {
          name: "National Coding Challenge",
          year: 2024,
          result: "Participant",
          role: "Backend Developer",
        },
      ],
    },
  },
  3: {
    id: 3,
    name: "Siti Nurhaliza",
    initials: "SN",
    institution: "ITB",
    major: "Visual Communication Design",
    bio: "Desainer UI/UX yang fokus pada sistem desain dan aksesibilitas. Berpengalaman mengubah masalah kompleks menjadi solusi desain yang elegan.",
    skills: ["Figma", "Adobe XD", "UI Research", "Prototyping", "Blender"],
    teamsJoined: 5,
    projectsCompleted: 8,
    github: null,
    linkedin: "https://linkedin.com/in/siti",
    phone: "6282233445566",
    email: "siti.n@itb.ac.id",
    teams: [
      {
        name: "Design Sprint Jakarta",
        role: "Lead Designer",
        status: "Active",
      },
    ],
    projects: [
      {
        name: "HealthTrack Redesign",
        description: "Overhaul total UX untuk aplikasi pemantauan kesehatan.",
      },
    ],
    performance: [
      {
        month: "Aug",
        year: 2024,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Summer Code Jam", team: "ByteForce", result: "Participant" },
          { name: "UI/UX Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Sep",
        year: 2024,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Hackathon Merdeka", team: "ByteForce", result: "Winner" },
          { name: "Cloud Challenge", team: "SkyNet ID", result: "Finalist" },
          {
            name: "Data Viz Contest",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Oct",
        year: 2024,
        participations: 6,
        wins: 3,
        competitions: [
          { name: "Gemastik XVI", team: "ByteForce", result: "Winner" },
          { name: "Compfest XV", team: "CodeCrafters", result: "Winner" },
          { name: "IoT Smart Campus", team: "SensorLab", result: "Winner" },
          {
            name: "Mobile App Challenge",
            team: "AppStorm",
            result: "Runner-Up",
          },
          { name: "Web Dev Marathon", team: "ByteForce", result: "Finalist" },
          { name: "Design Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Nov",
        year: 2024,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "DevFest Jakarta", team: "ByteForce", result: "Winner" },
          { name: "Startup Weekend", team: "LaunchPad", result: "Winner" },
          { name: "Code for Good", team: "ImpactDev", result: "Finalist" },
          {
            name: "AI Innovation Cup",
            team: "NeuralNet",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2024,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Year-End Hackfest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jan",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Code Jam", team: "ByteForce", result: "Winner" },
          { name: "Figma Config Jam", team: "PixelCraft", result: "Runner-Up" },
          { name: "Backend Blitz", team: "ServerSquad", result: "Participant" },
        ],
      },
      {
        month: "Feb",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Valentine Hack", team: "ByteForce", result: "Winner" },
          {
            name: "UX Research Sprint",
            team: "PixelCraft",
            result: "Finalist",
          },
        ],
      },
      {
        month: "Mar",
        year: 2025,
        participations: 5,
        wins: 2,
        competitions: [
          {
            name: "Google Solution Challenge",
            team: "ByteForce",
            result: "Winner",
          },
          {
            name: "Hackathon Nasional",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "AWS Build Day", team: "SkyNet ID", result: "Finalist" },
          { name: "Flutter Fest", team: "AppStorm", result: "Runner-Up" },
          {
            name: "Data Science Bowl",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Apr",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "Enterprise Hack", team: "ByteForce", result: "Winner" },
          {
            name: "Product Design Sprint",
            team: "PixelCraft",
            result: "Winner",
          },
          {
            name: "Blockchain Challenge",
            team: "ChainGang",
            result: "Finalist",
          },
          {
            name: "React Challenge",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "May",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "EdTech Hackathon", team: "ByteForce", result: "Winner" },
          { name: "Green Tech Sprint", team: "EcoCode", result: "Runner-Up" },
          { name: "Mobile UX Jam", team: "AppStorm", result: "Participant" },
        ],
      },
      {
        month: "Jun",
        year: 2025,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Mid-Year Code Fest", team: "ByteForce", result: "Finalist" },
          {
            name: "Design Systems Jam",
            team: "PixelCraft",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jul",
        year: 2025,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Summer Break Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Aug",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Independence Hack", team: "ByteForce", result: "Winner" },
          {
            name: "A11y Design Challenge",
            team: "PixelCraft",
            result: "Runner-Up",
          },
          {
            name: "Cloud Native Jam",
            team: "SkyNet ID",
            result: "Participant",
          },
        ],
      },
      {
        month: "Sep",
        year: 2025,
        participations: 5,
        wins: 3,
        competitions: [
          { name: "Compfest XVI", team: "ByteForce", result: "Winner" },
          {
            name: "Hackathon Merdeka II",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "iOS Dev Challenge", team: "AppStorm", result: "Winner" },
          { name: "Data Hackday", team: "DataMinds", result: "Finalist" },
          { name: "Cyber Security CTF", team: "SecOps", result: "Participant" },
        ],
      },
      {
        month: "Oct",
        year: 2025,
        participations: 7,
        wins: 4,
        competitions: [
          { name: "Gemastik XVII", team: "ByteForce", result: "Winner" },
          { name: "Google Dev Fest", team: "CodeCrafters", result: "Winner" },
          { name: "UI/UX Design Sprint", team: "PixelCraft", result: "Winner" },
          { name: "Smart City Hack", team: "UrbanDev", result: "Winner" },
          { name: "ML Challenge", team: "NeuralNet", result: "Runner-Up" },
          { name: "Startup Pitch Day", team: "LaunchPad", result: "Finalist" },
          {
            name: "Open Source Fest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Nov",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "BizIT Challenge", team: "ByteForce", result: "Winner" },
          { name: "Creative Code Fest", team: "PixelCraft", result: "Winner" },
          { name: "Tech in Asia Hack", team: "LaunchPad", result: "Finalist" },
          {
            name: "DevOps Challenge",
            team: "ServerSquad",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Year-End Showcase", team: "ByteForce", result: "Winner" },
          { name: "Holiday Hack", team: "CodeCrafters", result: "Participant" },
        ],
      },
      {
        month: "Jan",
        year: 2026,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Innovation", team: "ByteForce", result: "Winner" },
          { name: "AI Ethics Hack", team: "NeuralNet", result: "Runner-Up" },
          {
            name: "Frontend Blitz",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "Feb",
        year: 2026,
        participations: 4,
        wins: 2,
        competitions: [
          {
            name: "Valentine Design Jam",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Cloud Innovation Cup", team: "SkyNet ID", result: "Winner" },
          {
            name: "React Challenge II",
            team: "CodeCrafters",
            result: "Finalist",
          },
          {
            name: "Agile Sprint Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Mar",
        year: 2026,
        participations: 5,
        wins: 3,
        competitions: [
          {
            name: "Hackathon UI/UX 2026",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Code for Impact", team: "ImpactDev", result: "Winner" },
          { name: "Flutter Fest II", team: "AppStorm", result: "Winner" },
          { name: "Blockchain Summit", team: "ChainGang", result: "Runner-Up" },
          { name: "Campus Dev Day", team: "ByteForce", result: "Finalist" },
        ],
      },
    ],
    competitionHistory: {
      totalParticipated: 8,
      wins: 4,
      participations: [
        {
          name: "Design Sprint Jakarta 2025",
          year: 2025,
          result: "Winner",
          role: "Lead Designer",
        },
        {
          name: "UXplore Indonesia",
          year: 2025,
          result: "Winner",
          role: "UX Researcher",
        },
        {
          name: "Mobile App Challenge",
          year: 2024,
          result: "Winner",
          role: "UI Designer",
        },
        {
          name: "Figma Config Jam",
          year: 2024,
          result: "Runner-Up",
          role: "Visual Designer",
        },
        {
          name: "Adobe Creative Jam",
          year: 2023,
          result: "Finalist",
          role: "Illustrator",
        },
        {
          name: "UX Design Award 2023",
          year: 2023,
          result: "Winner",
          role: "Lead Designer",
        },
        {
          name: "Startup Weekend",
          year: 2022,
          result: "Finalist",
          role: "UI Designer",
        },
        {
          name: "Creative Hackathon",
          year: 2022,
          result: "Participant",
          role: "UI/UX Intern",
        },
      ],
    },
  },
  4: {
    id: 4,
    name: "Dimas Saputra",
    initials: "DS",
    institution: "ITS Surabaya",
    major: "Electrical Engineering",
    bio: "IoT Engineer yang senang bereksperimen dengan mikrokontroler dan sistem tertanam. Fokus pada solusi energi terbarukan.",
    skills: ["C++", "Arduino", "IoT", "AWS IoT", "Embedded Systems"],
    teamsJoined: 2,
    projectsCompleted: 10,
    github: "https://github.com/dimas",
    linkedin: "https://linkedin.com/in/dimas",
    phone: "6283344556677",
    email: "dimas.s@its.ac.id",
    teams: [
      { name: "Smart City Project", role: "Hardware Lead", status: "Active" },
    ],
    projects: [
      {
        name: "IoT Smart Agriculture",
        description:
          "Sistem penyiraman otomatis berbasis sensor kelembaban tanah.",
      },
    ],
    performance: [
      {
        month: "Aug",
        year: 2024,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Summer Code Jam", team: "ByteForce", result: "Participant" },
          { name: "UI/UX Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Sep",
        year: 2024,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Hackathon Merdeka", team: "ByteForce", result: "Winner" },
          { name: "Cloud Challenge", team: "SkyNet ID", result: "Finalist" },
          {
            name: "Data Viz Contest",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Oct",
        year: 2024,
        participations: 6,
        wins: 3,
        competitions: [
          { name: "Gemastik XVI", team: "ByteForce", result: "Winner" },
          { name: "Compfest XV", team: "CodeCrafters", result: "Winner" },
          { name: "IoT Smart Campus", team: "SensorLab", result: "Winner" },
          {
            name: "Mobile App Challenge",
            team: "AppStorm",
            result: "Runner-Up",
          },
          { name: "Web Dev Marathon", team: "ByteForce", result: "Finalist" },
          { name: "Design Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Nov",
        year: 2024,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "DevFest Jakarta", team: "ByteForce", result: "Winner" },
          { name: "Startup Weekend", team: "LaunchPad", result: "Winner" },
          { name: "Code for Good", team: "ImpactDev", result: "Finalist" },
          {
            name: "AI Innovation Cup",
            team: "NeuralNet",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2024,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Year-End Hackfest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jan",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Code Jam", team: "ByteForce", result: "Winner" },
          { name: "Figma Config Jam", team: "PixelCraft", result: "Runner-Up" },
          { name: "Backend Blitz", team: "ServerSquad", result: "Participant" },
        ],
      },
      {
        month: "Feb",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Valentine Hack", team: "ByteForce", result: "Winner" },
          {
            name: "UX Research Sprint",
            team: "PixelCraft",
            result: "Finalist",
          },
        ],
      },
      {
        month: "Mar",
        year: 2025,
        participations: 5,
        wins: 2,
        competitions: [
          {
            name: "Google Solution Challenge",
            team: "ByteForce",
            result: "Winner",
          },
          {
            name: "Hackathon Nasional",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "AWS Build Day", team: "SkyNet ID", result: "Finalist" },
          { name: "Flutter Fest", team: "AppStorm", result: "Runner-Up" },
          {
            name: "Data Science Bowl",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Apr",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "Enterprise Hack", team: "ByteForce", result: "Winner" },
          {
            name: "Product Design Sprint",
            team: "PixelCraft",
            result: "Winner",
          },
          {
            name: "Blockchain Challenge",
            team: "ChainGang",
            result: "Finalist",
          },
          {
            name: "React Challenge",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "May",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "EdTech Hackathon", team: "ByteForce", result: "Winner" },
          { name: "Green Tech Sprint", team: "EcoCode", result: "Runner-Up" },
          { name: "Mobile UX Jam", team: "AppStorm", result: "Participant" },
        ],
      },
      {
        month: "Jun",
        year: 2025,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Mid-Year Code Fest", team: "ByteForce", result: "Finalist" },
          {
            name: "Design Systems Jam",
            team: "PixelCraft",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jul",
        year: 2025,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Summer Break Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Aug",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Independence Hack", team: "ByteForce", result: "Winner" },
          {
            name: "A11y Design Challenge",
            team: "PixelCraft",
            result: "Runner-Up",
          },
          {
            name: "Cloud Native Jam",
            team: "SkyNet ID",
            result: "Participant",
          },
        ],
      },
      {
        month: "Sep",
        year: 2025,
        participations: 5,
        wins: 3,
        competitions: [
          { name: "Compfest XVI", team: "ByteForce", result: "Winner" },
          {
            name: "Hackathon Merdeka II",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "iOS Dev Challenge", team: "AppStorm", result: "Winner" },
          { name: "Data Hackday", team: "DataMinds", result: "Finalist" },
          { name: "Cyber Security CTF", team: "SecOps", result: "Participant" },
        ],
      },
      {
        month: "Oct",
        year: 2025,
        participations: 7,
        wins: 4,
        competitions: [
          { name: "Gemastik XVII", team: "ByteForce", result: "Winner" },
          { name: "Google Dev Fest", team: "CodeCrafters", result: "Winner" },
          { name: "UI/UX Design Sprint", team: "PixelCraft", result: "Winner" },
          { name: "Smart City Hack", team: "UrbanDev", result: "Winner" },
          { name: "ML Challenge", team: "NeuralNet", result: "Runner-Up" },
          { name: "Startup Pitch Day", team: "LaunchPad", result: "Finalist" },
          {
            name: "Open Source Fest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Nov",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "BizIT Challenge", team: "ByteForce", result: "Winner" },
          { name: "Creative Code Fest", team: "PixelCraft", result: "Winner" },
          { name: "Tech in Asia Hack", team: "LaunchPad", result: "Finalist" },
          {
            name: "DevOps Challenge",
            team: "ServerSquad",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Year-End Showcase", team: "ByteForce", result: "Winner" },
          { name: "Holiday Hack", team: "CodeCrafters", result: "Participant" },
        ],
      },
      {
        month: "Jan",
        year: 2026,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Innovation", team: "ByteForce", result: "Winner" },
          { name: "AI Ethics Hack", team: "NeuralNet", result: "Runner-Up" },
          {
            name: "Frontend Blitz",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "Feb",
        year: 2026,
        participations: 4,
        wins: 2,
        competitions: [
          {
            name: "Valentine Design Jam",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Cloud Innovation Cup", team: "SkyNet ID", result: "Winner" },
          {
            name: "React Challenge II",
            team: "CodeCrafters",
            result: "Finalist",
          },
          {
            name: "Agile Sprint Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Mar",
        year: 2026,
        participations: 5,
        wins: 3,
        competitions: [
          {
            name: "Hackathon UI/UX 2026",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Code for Impact", team: "ImpactDev", result: "Winner" },
          { name: "Flutter Fest II", team: "AppStorm", result: "Winner" },
          { name: "Blockchain Summit", team: "ChainGang", result: "Runner-Up" },
          { name: "Campus Dev Day", team: "ByteForce", result: "Finalist" },
        ],
      },
    ],
    competitionHistory: {
      totalParticipated: 7,
      wins: 2,
      participations: [
        {
          name: "KRI (Kontes Robot Indonesia)",
          year: 2025,
          result: "Winner",
          role: "Electronic Lead",
        },
        {
          name: "IoT Innovation Challenge",
          year: 2025,
          result: "Runner-Up",
          role: "Hardware Engineer",
        },
        {
          name: "Technogine 2024",
          year: 2024,
          result: "Finalist",
          role: "Embedded Dev",
        },
        {
          name: "Energy Saving Award",
          year: 2024,
          result: "Winner",
          role: "IoT Engineer",
        },
        {
          name: "Hackathon Industri 4.0",
          year: 2023,
          result: "Finalist",
          role: "Hardware Specialist",
        },
        {
          name: "Electrical Day ITS",
          year: 2023,
          result: "Winner",
          role: "Project Member",
        },
        {
          name: "Science Fair National",
          year: 2022,
          result: "Participant",
          role: "Researcher",
        },
      ],
    },
  },
  5: {
    id: 5,
    name: "Maya Putri",
    initials: "MP",
    institution: "Binus University",
    major: "Information Systems",
    bio: "Software Engineer dengan ketertarikan pada pengembangan mobile lintas platform. Aktif berkontribusi di komunitas Open Source.",
    skills: ["React Native", "Flutter", "Firebase", "SQL Server", "Dart"],
    teamsJoined: 6,
    projectsCompleted: 12,
    github: "https://github.com/maya",
    linkedin: "https://linkedin.com/in/maya",
    phone: "6285566778899",
    email: "maya.putri@binus.ac.id",
    teams: [
      { name: "App Development Circle", role: "Senior Dev", status: "Active" },
    ],
    projects: [
      {
        name: "E-Commerce App",
        description: "Aplikasi belanja online dengan fitur real-time tracking.",
      },
    ],
    performance: [
      {
        month: "Aug",
        year: 2024,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Summer Code Jam", team: "ByteForce", result: "Participant" },
          { name: "UI/UX Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Sep",
        year: 2024,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Hackathon Merdeka", team: "ByteForce", result: "Winner" },
          { name: "Cloud Challenge", team: "SkyNet ID", result: "Finalist" },
          {
            name: "Data Viz Contest",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Oct",
        year: 2024,
        participations: 6,
        wins: 3,
        competitions: [
          { name: "Gemastik XVI", team: "ByteForce", result: "Winner" },
          { name: "Compfest XV", team: "CodeCrafters", result: "Winner" },
          { name: "IoT Smart Campus", team: "SensorLab", result: "Winner" },
          {
            name: "Mobile App Challenge",
            team: "AppStorm",
            result: "Runner-Up",
          },
          { name: "Web Dev Marathon", team: "ByteForce", result: "Finalist" },
          { name: "Design Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Nov",
        year: 2024,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "DevFest Jakarta", team: "ByteForce", result: "Winner" },
          { name: "Startup Weekend", team: "LaunchPad", result: "Winner" },
          { name: "Code for Good", team: "ImpactDev", result: "Finalist" },
          {
            name: "AI Innovation Cup",
            team: "NeuralNet",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2024,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Year-End Hackfest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jan",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Code Jam", team: "ByteForce", result: "Winner" },
          { name: "Figma Config Jam", team: "PixelCraft", result: "Runner-Up" },
          { name: "Backend Blitz", team: "ServerSquad", result: "Participant" },
        ],
      },
      {
        month: "Feb",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Valentine Hack", team: "ByteForce", result: "Winner" },
          {
            name: "UX Research Sprint",
            team: "PixelCraft",
            result: "Finalist",
          },
        ],
      },
      {
        month: "Mar",
        year: 2025,
        participations: 5,
        wins: 2,
        competitions: [
          {
            name: "Google Solution Challenge",
            team: "ByteForce",
            result: "Winner",
          },
          {
            name: "Hackathon Nasional",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "AWS Build Day", team: "SkyNet ID", result: "Finalist" },
          { name: "Flutter Fest", team: "AppStorm", result: "Runner-Up" },
          {
            name: "Data Science Bowl",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Apr",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "Enterprise Hack", team: "ByteForce", result: "Winner" },
          {
            name: "Product Design Sprint",
            team: "PixelCraft",
            result: "Winner",
          },
          {
            name: "Blockchain Challenge",
            team: "ChainGang",
            result: "Finalist",
          },
          {
            name: "React Challenge",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "May",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "EdTech Hackathon", team: "ByteForce", result: "Winner" },
          { name: "Green Tech Sprint", team: "EcoCode", result: "Runner-Up" },
          { name: "Mobile UX Jam", team: "AppStorm", result: "Participant" },
        ],
      },
      {
        month: "Jun",
        year: 2025,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Mid-Year Code Fest", team: "ByteForce", result: "Finalist" },
          {
            name: "Design Systems Jam",
            team: "PixelCraft",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jul",
        year: 2025,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Summer Break Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Aug",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Independence Hack", team: "ByteForce", result: "Winner" },
          {
            name: "A11y Design Challenge",
            team: "PixelCraft",
            result: "Runner-Up",
          },
          {
            name: "Cloud Native Jam",
            team: "SkyNet ID",
            result: "Participant",
          },
        ],
      },
      {
        month: "Sep",
        year: 2025,
        participations: 5,
        wins: 3,
        competitions: [
          { name: "Compfest XVI", team: "ByteForce", result: "Winner" },
          {
            name: "Hackathon Merdeka II",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "iOS Dev Challenge", team: "AppStorm", result: "Winner" },
          { name: "Data Hackday", team: "DataMinds", result: "Finalist" },
          { name: "Cyber Security CTF", team: "SecOps", result: "Participant" },
        ],
      },
      {
        month: "Oct",
        year: 2025,
        participations: 7,
        wins: 4,
        competitions: [
          { name: "Gemastik XVII", team: "ByteForce", result: "Winner" },
          { name: "Google Dev Fest", team: "CodeCrafters", result: "Winner" },
          { name: "UI/UX Design Sprint", team: "PixelCraft", result: "Winner" },
          { name: "Smart City Hack", team: "UrbanDev", result: "Winner" },
          { name: "ML Challenge", team: "NeuralNet", result: "Runner-Up" },
          { name: "Startup Pitch Day", team: "LaunchPad", result: "Finalist" },
          {
            name: "Open Source Fest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Nov",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "BizIT Challenge", team: "ByteForce", result: "Winner" },
          { name: "Creative Code Fest", team: "PixelCraft", result: "Winner" },
          { name: "Tech in Asia Hack", team: "LaunchPad", result: "Finalist" },
          {
            name: "DevOps Challenge",
            team: "ServerSquad",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Year-End Showcase", team: "ByteForce", result: "Winner" },
          { name: "Holiday Hack", team: "CodeCrafters", result: "Participant" },
        ],
      },
      {
        month: "Jan",
        year: 2026,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Innovation", team: "ByteForce", result: "Winner" },
          { name: "AI Ethics Hack", team: "NeuralNet", result: "Runner-Up" },
          {
            name: "Frontend Blitz",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "Feb",
        year: 2026,
        participations: 4,
        wins: 2,
        competitions: [
          {
            name: "Valentine Design Jam",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Cloud Innovation Cup", team: "SkyNet ID", result: "Winner" },
          {
            name: "React Challenge II",
            team: "CodeCrafters",
            result: "Finalist",
          },
          {
            name: "Agile Sprint Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Mar",
        year: 2026,
        participations: 5,
        wins: 3,
        competitions: [
          {
            name: "Hackathon UI/UX 2026",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Code for Impact", team: "ImpactDev", result: "Winner" },
          { name: "Flutter Fest II", team: "AppStorm", result: "Winner" },
          { name: "Blockchain Summit", team: "ChainGang", result: "Runner-Up" },
          { name: "Campus Dev Day", team: "ByteForce", result: "Finalist" },
        ],
      },
    ],
    competitionHistory: {
      totalParticipated: 9,
      wins: 5,
      participations: [
        {
          name: "BCA Hackathon",
          year: 2025,
          result: "Winner",
          role: "Mobile Developer",
        },
        {
          name: "Google Solution Challenge",
          year: 2025,
          result: "Winner",
          role: "Tech Lead",
        },
        {
          name: "Fintech Innovation Day",
          year: 2024,
          result: "Winner",
          role: "Frontend Developer",
        },
        {
          name: "Mobile App Expo",
          year: 2024,
          result: "Runner-Up",
          role: "Mobile Lead",
        },
        {
          name: "Compfest UI",
          year: 2023,
          result: "Winner",
          role: "Full Stack Developer",
        },
        {
          name: "HackFest Binus",
          year: 2023,
          result: "Finalist",
          role: "Developer",
        },
        {
          name: "DevFest Jakarta",
          year: 2022,
          result: "Winner",
          role: "Backend Developer",
        },
        {
          name: "Youth Coding Award",
          year: 2022,
          result: "Runner-Up",
          role: "Frontend Dev",
        },
        {
          name: "Tech Jam",
          year: 2021,
          result: "Participant",
          role: "Junior Dev",
        },
      ],
    },
  },
  6: {
    id: 6,
    name: "Reza Firmansyah",
    initials: "RF",
    institution: "UGM",
    major: "Data Science",
    bio: "Data Scientist yang fokus pada NLP dan Machine Learning untuk pengolahan Bahasa Indonesia.",
    skills: ["Python", "TensorFlow", "Scikit-Learn", "R", "Tableau"],
    teamsJoined: 3,
    projectsCompleted: 5,
    github: "https://github.com/reza",
    linkedin: null,
    phone: null,
    email: "reza.firmansyah@ugm.ac.id",
    teams: [
      { name: "AI Research Lab", role: "Data Researcher", status: "Active" },
    ],
    projects: [
      {
        name: "SentimentID",
        description: "Model analisis sentimen untuk tweet berbahasa Indonesia.",
      },
    ],
    performance: [
      {
        month: "Aug",
        year: 2024,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Summer Code Jam", team: "ByteForce", result: "Participant" },
          { name: "UI/UX Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Sep",
        year: 2024,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Hackathon Merdeka", team: "ByteForce", result: "Winner" },
          { name: "Cloud Challenge", team: "SkyNet ID", result: "Finalist" },
          {
            name: "Data Viz Contest",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Oct",
        year: 2024,
        participations: 6,
        wins: 3,
        competitions: [
          { name: "Gemastik XVI", team: "ByteForce", result: "Winner" },
          { name: "Compfest XV", team: "CodeCrafters", result: "Winner" },
          { name: "IoT Smart Campus", team: "SensorLab", result: "Winner" },
          {
            name: "Mobile App Challenge",
            team: "AppStorm",
            result: "Runner-Up",
          },
          { name: "Web Dev Marathon", team: "ByteForce", result: "Finalist" },
          { name: "Design Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Nov",
        year: 2024,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "DevFest Jakarta", team: "ByteForce", result: "Winner" },
          { name: "Startup Weekend", team: "LaunchPad", result: "Winner" },
          { name: "Code for Good", team: "ImpactDev", result: "Finalist" },
          {
            name: "AI Innovation Cup",
            team: "NeuralNet",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2024,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Year-End Hackfest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jan",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Code Jam", team: "ByteForce", result: "Winner" },
          { name: "Figma Config Jam", team: "PixelCraft", result: "Runner-Up" },
          { name: "Backend Blitz", team: "ServerSquad", result: "Participant" },
        ],
      },
      {
        month: "Feb",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Valentine Hack", team: "ByteForce", result: "Winner" },
          {
            name: "UX Research Sprint",
            team: "PixelCraft",
            result: "Finalist",
          },
        ],
      },
      {
        month: "Mar",
        year: 2025,
        participations: 5,
        wins: 2,
        competitions: [
          {
            name: "Google Solution Challenge",
            team: "ByteForce",
            result: "Winner",
          },
          {
            name: "Hackathon Nasional",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "AWS Build Day", team: "SkyNet ID", result: "Finalist" },
          { name: "Flutter Fest", team: "AppStorm", result: "Runner-Up" },
          {
            name: "Data Science Bowl",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Apr",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "Enterprise Hack", team: "ByteForce", result: "Winner" },
          {
            name: "Product Design Sprint",
            team: "PixelCraft",
            result: "Winner",
          },
          {
            name: "Blockchain Challenge",
            team: "ChainGang",
            result: "Finalist",
          },
          {
            name: "React Challenge",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "May",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "EdTech Hackathon", team: "ByteForce", result: "Winner" },
          { name: "Green Tech Sprint", team: "EcoCode", result: "Runner-Up" },
          { name: "Mobile UX Jam", team: "AppStorm", result: "Participant" },
        ],
      },
      {
        month: "Jun",
        year: 2025,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Mid-Year Code Fest", team: "ByteForce", result: "Finalist" },
          {
            name: "Design Systems Jam",
            team: "PixelCraft",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jul",
        year: 2025,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Summer Break Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Aug",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Independence Hack", team: "ByteForce", result: "Winner" },
          {
            name: "A11y Design Challenge",
            team: "PixelCraft",
            result: "Runner-Up",
          },
          {
            name: "Cloud Native Jam",
            team: "SkyNet ID",
            result: "Participant",
          },
        ],
      },
      {
        month: "Sep",
        year: 2025,
        participations: 5,
        wins: 3,
        competitions: [
          { name: "Compfest XVI", team: "ByteForce", result: "Winner" },
          {
            name: "Hackathon Merdeka II",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "iOS Dev Challenge", team: "AppStorm", result: "Winner" },
          { name: "Data Hackday", team: "DataMinds", result: "Finalist" },
          { name: "Cyber Security CTF", team: "SecOps", result: "Participant" },
        ],
      },
      {
        month: "Oct",
        year: 2025,
        participations: 7,
        wins: 4,
        competitions: [
          { name: "Gemastik XVII", team: "ByteForce", result: "Winner" },
          { name: "Google Dev Fest", team: "CodeCrafters", result: "Winner" },
          { name: "UI/UX Design Sprint", team: "PixelCraft", result: "Winner" },
          { name: "Smart City Hack", team: "UrbanDev", result: "Winner" },
          { name: "ML Challenge", team: "NeuralNet", result: "Runner-Up" },
          { name: "Startup Pitch Day", team: "LaunchPad", result: "Finalist" },
          {
            name: "Open Source Fest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Nov",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "BizIT Challenge", team: "ByteForce", result: "Winner" },
          { name: "Creative Code Fest", team: "PixelCraft", result: "Winner" },
          { name: "Tech in Asia Hack", team: "LaunchPad", result: "Finalist" },
          {
            name: "DevOps Challenge",
            team: "ServerSquad",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Year-End Showcase", team: "ByteForce", result: "Winner" },
          { name: "Holiday Hack", team: "CodeCrafters", result: "Participant" },
        ],
      },
      {
        month: "Jan",
        year: 2026,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Innovation", team: "ByteForce", result: "Winner" },
          { name: "AI Ethics Hack", team: "NeuralNet", result: "Runner-Up" },
          {
            name: "Frontend Blitz",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "Feb",
        year: 2026,
        participations: 4,
        wins: 2,
        competitions: [
          {
            name: "Valentine Design Jam",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Cloud Innovation Cup", team: "SkyNet ID", result: "Winner" },
          {
            name: "React Challenge II",
            team: "CodeCrafters",
            result: "Finalist",
          },
          {
            name: "Agile Sprint Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Mar",
        year: 2026,
        participations: 5,
        wins: 3,
        competitions: [
          {
            name: "Hackathon UI/UX 2026",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Code for Impact", team: "ImpactDev", result: "Winner" },
          { name: "Flutter Fest II", team: "AppStorm", result: "Winner" },
          { name: "Blockchain Summit", team: "ChainGang", result: "Runner-Up" },
          { name: "Campus Dev Day", team: "ByteForce", result: "Finalist" },
        ],
      },
    ],
    competitionHistory: {
      totalParticipated: 7,
      wins: 2,
      participations: [
        {
          name: "Data Science Cup UGM",
          year: 2025,
          result: "Winner",
          role: "Data Scientist",
        },
        {
          name: "National AI Challenge",
          year: 2025,
          result: "Finalist",
          role: "ML Engineer",
        },
        {
          name: "Data Viz Competition",
          year: 2024,
          result: "Winner",
          role: "Data Analyst",
        },
        {
          name: "Kaggle Days Jakarta",
          year: 2024,
          result: "Runner-Up",
          role: "Data Scientist",
        },
        {
          name: "MIPA Expo",
          year: 2023,
          result: "Finalist",
          role: "Researcher",
        },
        {
          name: "Hackathon Merdeka",
          year: 2023,
          result: "Participant",
          role: "Data Support",
        },
        {
          name: "Sains Award",
          year: 2022,
          result: "Winner",
          role: "Data Analyst",
        },
      ],
    },
  },
  7: {
    id: 7,
    name: "Priskilla",
    initials: "PR",
    institution: "Muria Kudus University",
    major: "Management Information Systems",
    bio: "Senior Lead & Mentor di Lala Plays Games. Berpengalaman dalam manajemen operasional dan pengembangan komunitas kreatif.",
    skills: [
      "Project Management",
      "Leadership",
      "Public Speaking",
      "Community Outreach",
    ],
    teamsJoined: 8,
    projectsCompleted: 15,
    github: null,
    linkedin: "https://linkedin.com/in/priskilla",
    phone: "6289988776655",
    email: "priskilla@lalaplays.com",
    teams: [
      {
        name: "Lala Plays Games Ops",
        role: "Operational Manager",
        status: "Active",
      },
      {
        name: "Youth Leadership Forum",
        role: "Coordinator",
        status: "Completed",
      },
    ],
    projects: [
      {
        name: "Creative Therapy Center",
        description:
          "Pusat terapi melalui permainan Xiangqi dan Yoga untuk anak-anak.",
      },
      {
        name: "Social Impact Program",
        description: "Program pemberdayaan komunitas lokal melalui teknologi.",
      },
    ],
    performance: [
      {
        month: "Aug",
        year: 2024,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Summer Code Jam", team: "ByteForce", result: "Participant" },
          { name: "UI/UX Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Sep",
        year: 2024,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Hackathon Merdeka", team: "ByteForce", result: "Winner" },
          { name: "Cloud Challenge", team: "SkyNet ID", result: "Finalist" },
          {
            name: "Data Viz Contest",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Oct",
        year: 2024,
        participations: 6,
        wins: 3,
        competitions: [
          { name: "Gemastik XVI", team: "ByteForce", result: "Winner" },
          { name: "Compfest XV", team: "CodeCrafters", result: "Winner" },
          { name: "IoT Smart Campus", team: "SensorLab", result: "Winner" },
          {
            name: "Mobile App Challenge",
            team: "AppStorm",
            result: "Runner-Up",
          },
          { name: "Web Dev Marathon", team: "ByteForce", result: "Finalist" },
          { name: "Design Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Nov",
        year: 2024,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "DevFest Jakarta", team: "ByteForce", result: "Winner" },
          { name: "Startup Weekend", team: "LaunchPad", result: "Winner" },
          { name: "Code for Good", team: "ImpactDev", result: "Finalist" },
          {
            name: "AI Innovation Cup",
            team: "NeuralNet",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2024,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Year-End Hackfest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jan",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Code Jam", team: "ByteForce", result: "Winner" },
          { name: "Figma Config Jam", team: "PixelCraft", result: "Runner-Up" },
          { name: "Backend Blitz", team: "ServerSquad", result: "Participant" },
        ],
      },
      {
        month: "Feb",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Valentine Hack", team: "ByteForce", result: "Winner" },
          {
            name: "UX Research Sprint",
            team: "PixelCraft",
            result: "Finalist",
          },
        ],
      },
      {
        month: "Mar",
        year: 2025,
        participations: 5,
        wins: 2,
        competitions: [
          {
            name: "Google Solution Challenge",
            team: "ByteForce",
            result: "Winner",
          },
          {
            name: "Hackathon Nasional",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "AWS Build Day", team: "SkyNet ID", result: "Finalist" },
          { name: "Flutter Fest", team: "AppStorm", result: "Runner-Up" },
          {
            name: "Data Science Bowl",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Apr",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "Enterprise Hack", team: "ByteForce", result: "Winner" },
          {
            name: "Product Design Sprint",
            team: "PixelCraft",
            result: "Winner",
          },
          {
            name: "Blockchain Challenge",
            team: "ChainGang",
            result: "Finalist",
          },
          {
            name: "React Challenge",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "May",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "EdTech Hackathon", team: "ByteForce", result: "Winner" },
          { name: "Green Tech Sprint", team: "EcoCode", result: "Runner-Up" },
          { name: "Mobile UX Jam", team: "AppStorm", result: "Participant" },
        ],
      },
      {
        month: "Jun",
        year: 2025,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Mid-Year Code Fest", team: "ByteForce", result: "Finalist" },
          {
            name: "Design Systems Jam",
            team: "PixelCraft",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jul",
        year: 2025,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Summer Break Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Aug",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Independence Hack", team: "ByteForce", result: "Winner" },
          {
            name: "A11y Design Challenge",
            team: "PixelCraft",
            result: "Runner-Up",
          },
          {
            name: "Cloud Native Jam",
            team: "SkyNet ID",
            result: "Participant",
          },
        ],
      },
      {
        month: "Sep",
        year: 2025,
        participations: 5,
        wins: 3,
        competitions: [
          { name: "Compfest XVI", team: "ByteForce", result: "Winner" },
          {
            name: "Hackathon Merdeka II",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "iOS Dev Challenge", team: "AppStorm", result: "Winner" },
          { name: "Data Hackday", team: "DataMinds", result: "Finalist" },
          { name: "Cyber Security CTF", team: "SecOps", result: "Participant" },
        ],
      },
      {
        month: "Oct",
        year: 2025,
        participations: 7,
        wins: 4,
        competitions: [
          { name: "Gemastik XVII", team: "ByteForce", result: "Winner" },
          { name: "Google Dev Fest", team: "CodeCrafters", result: "Winner" },
          { name: "UI/UX Design Sprint", team: "PixelCraft", result: "Winner" },
          { name: "Smart City Hack", team: "UrbanDev", result: "Winner" },
          { name: "ML Challenge", team: "NeuralNet", result: "Runner-Up" },
          { name: "Startup Pitch Day", team: "LaunchPad", result: "Finalist" },
          {
            name: "Open Source Fest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Nov",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "BizIT Challenge", team: "ByteForce", result: "Winner" },
          { name: "Creative Code Fest", team: "PixelCraft", result: "Winner" },
          { name: "Tech in Asia Hack", team: "LaunchPad", result: "Finalist" },
          {
            name: "DevOps Challenge",
            team: "ServerSquad",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Year-End Showcase", team: "ByteForce", result: "Winner" },
          { name: "Holiday Hack", team: "CodeCrafters", result: "Participant" },
        ],
      },
      {
        month: "Jan",
        year: 2026,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Innovation", team: "ByteForce", result: "Winner" },
          { name: "AI Ethics Hack", team: "NeuralNet", result: "Runner-Up" },
          {
            name: "Frontend Blitz",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "Feb",
        year: 2026,
        participations: 4,
        wins: 2,
        competitions: [
          {
            name: "Valentine Design Jam",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Cloud Innovation Cup", team: "SkyNet ID", result: "Winner" },
          {
            name: "React Challenge II",
            team: "CodeCrafters",
            result: "Finalist",
          },
          {
            name: "Agile Sprint Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Mar",
        year: 2026,
        participations: 5,
        wins: 3,
        competitions: [
          {
            name: "Hackathon UI/UX 2026",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Code for Impact", team: "ImpactDev", result: "Winner" },
          { name: "Flutter Fest II", team: "AppStorm", result: "Winner" },
          { name: "Blockchain Summit", team: "ChainGang", result: "Runner-Up" },
          { name: "Campus Dev Day", team: "ByteForce", result: "Finalist" },
        ],
      },
    ],
    competitionHistory: {
      totalParticipated: 10,
      wins: 6,
      participations: [
        {
          name: "Global Leadership Award",
          year: 2025,
          result: "Winner",
          role: "Team Coordinator",
        },
        {
          name: "Community Impact Challenge",
          year: 2025,
          result: "Winner",
          role: "Project Manager",
        },
        {
          name: "Social Entrepreneurship Day",
          year: 2024,
          result: "Winner",
          role: "Lead Organizer",
        },
        {
          name: "National Business Plan",
          year: 2024,
          result: "Runner-Up",
          role: "Presenter",
        },
        {
          name: "Management Excellence Cup",
          year: 2023,
          result: "Winner",
          role: "Strategy Lead",
        },
        {
          name: "Creative Industry Forum",
          year: 2023,
          result: "Finalist",
          role: "Speaker",
        },
        {
          name: "NGO Innovation Summit",
          year: 2022,
          result: "Winner",
          role: "Project Lead",
        },
        {
          name: "Debate Competition",
          year: 2022,
          result: "Winner",
          role: "First Speaker",
        },
        {
          name: "Young Leader Summit",
          year: 2021,
          result: "Finalist",
          role: "Delegate",
        },
        {
          name: "National Speech Contest",
          year: 2021,
          result: "Winner",
          role: "Contestant",
        },
      ],
    },
  },
  8: {
    id: 8,
    name: "Bayu Ardianto",
    initials: "BA",
    institution: "Universitas Indonesia",
    major: "Computer Science",
    bio: "Backend specialist dengan fokus pada arsitektur microservices dan keamanan sistem.",
    skills: ["Go", "Docker", "Kubernetes", "Redis", "Cyber Security"],
    teamsJoined: 4,
    projectsCompleted: 6,
    github: "https://github.com/bayu",
    linkedin: "https://linkedin.com/in/bayu",
    phone: "6281112223334",
    email: "bayu.a@ui.ac.id",
    teams: [
      { name: "Cloud Infrastructure Team", role: "SRE", status: "Active" },
    ],
    projects: [
      {
        name: "SecureAuth Service",
        description: "Layanan autentikasi dengan enkripsi tingkat tinggi.",
      },
    ],
    performance: [
      {
        month: "Aug",
        year: 2024,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Summer Code Jam", team: "ByteForce", result: "Participant" },
          { name: "UI/UX Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Sep",
        year: 2024,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Hackathon Merdeka", team: "ByteForce", result: "Winner" },
          { name: "Cloud Challenge", team: "SkyNet ID", result: "Finalist" },
          {
            name: "Data Viz Contest",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Oct",
        year: 2024,
        participations: 6,
        wins: 3,
        competitions: [
          { name: "Gemastik XVI", team: "ByteForce", result: "Winner" },
          { name: "Compfest XV", team: "CodeCrafters", result: "Winner" },
          { name: "IoT Smart Campus", team: "SensorLab", result: "Winner" },
          {
            name: "Mobile App Challenge",
            team: "AppStorm",
            result: "Runner-Up",
          },
          { name: "Web Dev Marathon", team: "ByteForce", result: "Finalist" },
          { name: "Design Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Nov",
        year: 2024,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "DevFest Jakarta", team: "ByteForce", result: "Winner" },
          { name: "Startup Weekend", team: "LaunchPad", result: "Winner" },
          { name: "Code for Good", team: "ImpactDev", result: "Finalist" },
          {
            name: "AI Innovation Cup",
            team: "NeuralNet",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2024,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Year-End Hackfest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jan",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Code Jam", team: "ByteForce", result: "Winner" },
          { name: "Figma Config Jam", team: "PixelCraft", result: "Runner-Up" },
          { name: "Backend Blitz", team: "ServerSquad", result: "Participant" },
        ],
      },
      {
        month: "Feb",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Valentine Hack", team: "ByteForce", result: "Winner" },
          {
            name: "UX Research Sprint",
            team: "PixelCraft",
            result: "Finalist",
          },
        ],
      },
      {
        month: "Mar",
        year: 2025,
        participations: 5,
        wins: 2,
        competitions: [
          {
            name: "Google Solution Challenge",
            team: "ByteForce",
            result: "Winner",
          },
          {
            name: "Hackathon Nasional",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "AWS Build Day", team: "SkyNet ID", result: "Finalist" },
          { name: "Flutter Fest", team: "AppStorm", result: "Runner-Up" },
          {
            name: "Data Science Bowl",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Apr",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "Enterprise Hack", team: "ByteForce", result: "Winner" },
          {
            name: "Product Design Sprint",
            team: "PixelCraft",
            result: "Winner",
          },
          {
            name: "Blockchain Challenge",
            team: "ChainGang",
            result: "Finalist",
          },
          {
            name: "React Challenge",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "May",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "EdTech Hackathon", team: "ByteForce", result: "Winner" },
          { name: "Green Tech Sprint", team: "EcoCode", result: "Runner-Up" },
          { name: "Mobile UX Jam", team: "AppStorm", result: "Participant" },
        ],
      },
      {
        month: "Jun",
        year: 2025,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Mid-Year Code Fest", team: "ByteForce", result: "Finalist" },
          {
            name: "Design Systems Jam",
            team: "PixelCraft",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jul",
        year: 2025,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Summer Break Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Aug",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Independence Hack", team: "ByteForce", result: "Winner" },
          {
            name: "A11y Design Challenge",
            team: "PixelCraft",
            result: "Runner-Up",
          },
          {
            name: "Cloud Native Jam",
            team: "SkyNet ID",
            result: "Participant",
          },
        ],
      },
      {
        month: "Sep",
        year: 2025,
        participations: 5,
        wins: 3,
        competitions: [
          { name: "Compfest XVI", team: "ByteForce", result: "Winner" },
          {
            name: "Hackathon Merdeka II",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "iOS Dev Challenge", team: "AppStorm", result: "Winner" },
          { name: "Data Hackday", team: "DataMinds", result: "Finalist" },
          { name: "Cyber Security CTF", team: "SecOps", result: "Participant" },
        ],
      },
      {
        month: "Oct",
        year: 2025,
        participations: 7,
        wins: 4,
        competitions: [
          { name: "Gemastik XVII", team: "ByteForce", result: "Winner" },
          { name: "Google Dev Fest", team: "CodeCrafters", result: "Winner" },
          { name: "UI/UX Design Sprint", team: "PixelCraft", result: "Winner" },
          { name: "Smart City Hack", team: "UrbanDev", result: "Winner" },
          { name: "ML Challenge", team: "NeuralNet", result: "Runner-Up" },
          { name: "Startup Pitch Day", team: "LaunchPad", result: "Finalist" },
          {
            name: "Open Source Fest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Nov",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "BizIT Challenge", team: "ByteForce", result: "Winner" },
          { name: "Creative Code Fest", team: "PixelCraft", result: "Winner" },
          { name: "Tech in Asia Hack", team: "LaunchPad", result: "Finalist" },
          {
            name: "DevOps Challenge",
            team: "ServerSquad",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Year-End Showcase", team: "ByteForce", result: "Winner" },
          { name: "Holiday Hack", team: "CodeCrafters", result: "Participant" },
        ],
      },
      {
        month: "Jan",
        year: 2026,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Innovation", team: "ByteForce", result: "Winner" },
          { name: "AI Ethics Hack", team: "NeuralNet", result: "Runner-Up" },
          {
            name: "Frontend Blitz",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "Feb",
        year: 2026,
        participations: 4,
        wins: 2,
        competitions: [
          {
            name: "Valentine Design Jam",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Cloud Innovation Cup", team: "SkyNet ID", result: "Winner" },
          {
            name: "React Challenge II",
            team: "CodeCrafters",
            result: "Finalist",
          },
          {
            name: "Agile Sprint Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Mar",
        year: 2026,
        participations: 5,
        wins: 3,
        competitions: [
          {
            name: "Hackathon UI/UX 2026",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Code for Impact", team: "ImpactDev", result: "Winner" },
          { name: "Flutter Fest II", team: "AppStorm", result: "Winner" },
          { name: "Blockchain Summit", team: "ChainGang", result: "Runner-Up" },
          { name: "Campus Dev Day", team: "ByteForce", result: "Finalist" },
        ],
      },
    ],
    competitionHistory: {
      totalParticipated: 7,
      wins: 3,
      participations: [
        {
          name: "Cyber Jawara",
          year: 2025,
          result: "Winner",
          role: "Security Researcher",
        },
        {
          name: "Gemastik - Cyber Security",
          year: 2025,
          result: "Winner",
          role: "Team Member",
        },
        {
          name: "CTF National Competition",
          year: 2024,
          result: "Winner",
          role: "Powner",
        },
        {
          name: "Google Cloud Hackathon",
          year: 2024,
          result: "Finalist",
          role: "Cloud Architect",
        },
        {
          name: "Hackathon Merdeka",
          year: 2023,
          result: "Runner-Up",
          role: "Backend Developer",
        },
        {
          name: "Information Security UI",
          year: 2023,
          result: "Finalist",
          role: "Researcher",
        },
        {
          name: "Startup Challenge",
          year: 2022,
          result: "Participant",
          role: "DevOps Engineer",
        },
      ],
    },
  },
  9: {
    id: 9,
    name: "Lina Kartika",
    initials: "LK",
    institution: "Telkom University",
    major: "Telecommunication Engineering",
    bio: "Pakar jaringan yang tertarik pada pengembangan 5G dan Smart City di Indonesia.",
    skills: [
      "Cisco",
      "Networking",
      "Python",
      "Linux Administration",
      "Wireshark",
    ],
    teamsJoined: 2,
    projectsCompleted: 4,
    github: "https://github.com/lina",
    linkedin: "https://linkedin.com/in/lina",
    phone: "6284455667788",
    email: "lina.k@telkomuniversity.ac.id",
    teams: [
      {
        name: "Telkom Network Group",
        role: "Network Engineer",
        status: "Active",
      },
    ],
    projects: [
      {
        name: "Campus Fiber Network",
        description: "Perancangan ulang topologi jaringan kampus.",
      },
    ],
    performance: [
      {
        month: "Aug",
        year: 2024,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Summer Code Jam", team: "ByteForce", result: "Participant" },
          { name: "UI/UX Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Sep",
        year: 2024,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Hackathon Merdeka", team: "ByteForce", result: "Winner" },
          { name: "Cloud Challenge", team: "SkyNet ID", result: "Finalist" },
          {
            name: "Data Viz Contest",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Oct",
        year: 2024,
        participations: 6,
        wins: 3,
        competitions: [
          { name: "Gemastik XVI", team: "ByteForce", result: "Winner" },
          { name: "Compfest XV", team: "CodeCrafters", result: "Winner" },
          { name: "IoT Smart Campus", team: "SensorLab", result: "Winner" },
          {
            name: "Mobile App Challenge",
            team: "AppStorm",
            result: "Runner-Up",
          },
          { name: "Web Dev Marathon", team: "ByteForce", result: "Finalist" },
          { name: "Design Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Nov",
        year: 2024,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "DevFest Jakarta", team: "ByteForce", result: "Winner" },
          { name: "Startup Weekend", team: "LaunchPad", result: "Winner" },
          { name: "Code for Good", team: "ImpactDev", result: "Finalist" },
          {
            name: "AI Innovation Cup",
            team: "NeuralNet",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2024,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Year-End Hackfest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jan",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Code Jam", team: "ByteForce", result: "Winner" },
          { name: "Figma Config Jam", team: "PixelCraft", result: "Runner-Up" },
          { name: "Backend Blitz", team: "ServerSquad", result: "Participant" },
        ],
      },
      {
        month: "Feb",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Valentine Hack", team: "ByteForce", result: "Winner" },
          {
            name: "UX Research Sprint",
            team: "PixelCraft",
            result: "Finalist",
          },
        ],
      },
      {
        month: "Mar",
        year: 2025,
        participations: 5,
        wins: 2,
        competitions: [
          {
            name: "Google Solution Challenge",
            team: "ByteForce",
            result: "Winner",
          },
          {
            name: "Hackathon Nasional",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "AWS Build Day", team: "SkyNet ID", result: "Finalist" },
          { name: "Flutter Fest", team: "AppStorm", result: "Runner-Up" },
          {
            name: "Data Science Bowl",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Apr",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "Enterprise Hack", team: "ByteForce", result: "Winner" },
          {
            name: "Product Design Sprint",
            team: "PixelCraft",
            result: "Winner",
          },
          {
            name: "Blockchain Challenge",
            team: "ChainGang",
            result: "Finalist",
          },
          {
            name: "React Challenge",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "May",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "EdTech Hackathon", team: "ByteForce", result: "Winner" },
          { name: "Green Tech Sprint", team: "EcoCode", result: "Runner-Up" },
          { name: "Mobile UX Jam", team: "AppStorm", result: "Participant" },
        ],
      },
      {
        month: "Jun",
        year: 2025,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Mid-Year Code Fest", team: "ByteForce", result: "Finalist" },
          {
            name: "Design Systems Jam",
            team: "PixelCraft",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jul",
        year: 2025,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Summer Break Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Aug",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Independence Hack", team: "ByteForce", result: "Winner" },
          {
            name: "A11y Design Challenge",
            team: "PixelCraft",
            result: "Runner-Up",
          },
          {
            name: "Cloud Native Jam",
            team: "SkyNet ID",
            result: "Participant",
          },
        ],
      },
      {
        month: "Sep",
        year: 2025,
        participations: 5,
        wins: 3,
        competitions: [
          { name: "Compfest XVI", team: "ByteForce", result: "Winner" },
          {
            name: "Hackathon Merdeka II",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "iOS Dev Challenge", team: "AppStorm", result: "Winner" },
          { name: "Data Hackday", team: "DataMinds", result: "Finalist" },
          { name: "Cyber Security CTF", team: "SecOps", result: "Participant" },
        ],
      },
      {
        month: "Oct",
        year: 2025,
        participations: 7,
        wins: 4,
        competitions: [
          { name: "Gemastik XVII", team: "ByteForce", result: "Winner" },
          { name: "Google Dev Fest", team: "CodeCrafters", result: "Winner" },
          { name: "UI/UX Design Sprint", team: "PixelCraft", result: "Winner" },
          { name: "Smart City Hack", team: "UrbanDev", result: "Winner" },
          { name: "ML Challenge", team: "NeuralNet", result: "Runner-Up" },
          { name: "Startup Pitch Day", team: "LaunchPad", result: "Finalist" },
          {
            name: "Open Source Fest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Nov",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "BizIT Challenge", team: "ByteForce", result: "Winner" },
          { name: "Creative Code Fest", team: "PixelCraft", result: "Winner" },
          { name: "Tech in Asia Hack", team: "LaunchPad", result: "Finalist" },
          {
            name: "DevOps Challenge",
            team: "ServerSquad",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Year-End Showcase", team: "ByteForce", result: "Winner" },
          { name: "Holiday Hack", team: "CodeCrafters", result: "Participant" },
        ],
      },
      {
        month: "Jan",
        year: 2026,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Innovation", team: "ByteForce", result: "Winner" },
          { name: "AI Ethics Hack", team: "NeuralNet", result: "Runner-Up" },
          {
            name: "Frontend Blitz",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "Feb",
        year: 2026,
        participations: 4,
        wins: 2,
        competitions: [
          {
            name: "Valentine Design Jam",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Cloud Innovation Cup", team: "SkyNet ID", result: "Winner" },
          {
            name: "React Challenge II",
            team: "CodeCrafters",
            result: "Finalist",
          },
          {
            name: "Agile Sprint Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Mar",
        year: 2026,
        participations: 5,
        wins: 3,
        competitions: [
          {
            name: "Hackathon UI/UX 2026",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Code for Impact", team: "ImpactDev", result: "Winner" },
          { name: "Flutter Fest II", team: "AppStorm", result: "Winner" },
          { name: "Blockchain Summit", team: "ChainGang", result: "Runner-Up" },
          { name: "Campus Dev Day", team: "ByteForce", result: "Finalist" },
        ],
      },
    ],
    competitionHistory: {
      totalParticipated: 7,
      wins: 1,
      participations: [
        {
          name: "Netriders Competition",
          year: 2025,
          result: "Winner",
          role: "Engineer",
        },
        {
          name: "Smart City Challenge",
          year: 2025,
          result: "Finalist",
          role: "Network Planner",
        },
        {
          name: "IT Network Competition",
          year: 2024,
          result: "Runner-Up",
          role: "Support",
        },
        {
          name: "Huawei ICT Competition",
          year: 2024,
          result: "Finalist",
          role: "Network Specialist",
        },
        {
          name: "Hackathon Bandung",
          year: 2023,
          result: "Finalist",
          role: "DevOps",
        },
        {
          name: "Engineering Day",
          year: 2023,
          result: "Winner",
          role: "Project Member",
        },
        {
          name: "IOT National Award",
          year: 2022,
          result: "Participant",
          role: "Network Support",
        },
      ],
    },
  },
  10: {
    id: 10,
    name: "Citra Dewi",
    initials: "CD",
    institution: "ITB",
    major: "Digital Media Arts",
    bio: "Kreator konten digital dan desainer grafis yang mahir dalam motion graphics dan branding identity.",
    skills: [
      "After Effects",
      "Premiere Pro",
      "Illustrator",
      "Branding",
      "Motion Design",
    ],
    teamsJoined: 4,
    projectsCompleted: 20,
    github: null,
    linkedin: "https://linkedin.com/in/citra",
    phone: "6287766554433",
    email: "citra.dewi@itb.ac.id",
    teams: [
      {
        name: "Multimedia Club ITB",
        role: "Lead Motion Designer",
        status: "Active",
      },
    ],
    projects: [
      {
        name: "Official Branding ITB",
        description: "Rebranding aset digital untuk penerimaan mahasiswa baru.",
      },
    ],
    performance: [
      {
        month: "Aug",
        year: 2024,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Summer Code Jam", team: "ByteForce", result: "Participant" },
          { name: "UI/UX Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Sep",
        year: 2024,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Hackathon Merdeka", team: "ByteForce", result: "Winner" },
          { name: "Cloud Challenge", team: "SkyNet ID", result: "Finalist" },
          {
            name: "Data Viz Contest",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Oct",
        year: 2024,
        participations: 6,
        wins: 3,
        competitions: [
          { name: "Gemastik XVI", team: "ByteForce", result: "Winner" },
          { name: "Compfest XV", team: "CodeCrafters", result: "Winner" },
          { name: "IoT Smart Campus", team: "SensorLab", result: "Winner" },
          {
            name: "Mobile App Challenge",
            team: "AppStorm",
            result: "Runner-Up",
          },
          { name: "Web Dev Marathon", team: "ByteForce", result: "Finalist" },
          { name: "Design Sprint", team: "PixelCraft", result: "Participant" },
        ],
      },
      {
        month: "Nov",
        year: 2024,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "DevFest Jakarta", team: "ByteForce", result: "Winner" },
          { name: "Startup Weekend", team: "LaunchPad", result: "Winner" },
          { name: "Code for Good", team: "ImpactDev", result: "Finalist" },
          {
            name: "AI Innovation Cup",
            team: "NeuralNet",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2024,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Year-End Hackfest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jan",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Code Jam", team: "ByteForce", result: "Winner" },
          { name: "Figma Config Jam", team: "PixelCraft", result: "Runner-Up" },
          { name: "Backend Blitz", team: "ServerSquad", result: "Participant" },
        ],
      },
      {
        month: "Feb",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Valentine Hack", team: "ByteForce", result: "Winner" },
          {
            name: "UX Research Sprint",
            team: "PixelCraft",
            result: "Finalist",
          },
        ],
      },
      {
        month: "Mar",
        year: 2025,
        participations: 5,
        wins: 2,
        competitions: [
          {
            name: "Google Solution Challenge",
            team: "ByteForce",
            result: "Winner",
          },
          {
            name: "Hackathon Nasional",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "AWS Build Day", team: "SkyNet ID", result: "Finalist" },
          { name: "Flutter Fest", team: "AppStorm", result: "Runner-Up" },
          {
            name: "Data Science Bowl",
            team: "DataMinds",
            result: "Participant",
          },
        ],
      },
      {
        month: "Apr",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "Enterprise Hack", team: "ByteForce", result: "Winner" },
          {
            name: "Product Design Sprint",
            team: "PixelCraft",
            result: "Winner",
          },
          {
            name: "Blockchain Challenge",
            team: "ChainGang",
            result: "Finalist",
          },
          {
            name: "React Challenge",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "May",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "EdTech Hackathon", team: "ByteForce", result: "Winner" },
          { name: "Green Tech Sprint", team: "EcoCode", result: "Runner-Up" },
          { name: "Mobile UX Jam", team: "AppStorm", result: "Participant" },
        ],
      },
      {
        month: "Jun",
        year: 2025,
        participations: 2,
        wins: 0,
        competitions: [
          { name: "Mid-Year Code Fest", team: "ByteForce", result: "Finalist" },
          {
            name: "Design Systems Jam",
            team: "PixelCraft",
            result: "Participant",
          },
        ],
      },
      {
        month: "Jul",
        year: 2025,
        participations: 1,
        wins: 0,
        competitions: [
          {
            name: "Summer Break Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Aug",
        year: 2025,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "Independence Hack", team: "ByteForce", result: "Winner" },
          {
            name: "A11y Design Challenge",
            team: "PixelCraft",
            result: "Runner-Up",
          },
          {
            name: "Cloud Native Jam",
            team: "SkyNet ID",
            result: "Participant",
          },
        ],
      },
      {
        month: "Sep",
        year: 2025,
        participations: 5,
        wins: 3,
        competitions: [
          { name: "Compfest XVI", team: "ByteForce", result: "Winner" },
          {
            name: "Hackathon Merdeka II",
            team: "CodeCrafters",
            result: "Winner",
          },
          { name: "iOS Dev Challenge", team: "AppStorm", result: "Winner" },
          { name: "Data Hackday", team: "DataMinds", result: "Finalist" },
          { name: "Cyber Security CTF", team: "SecOps", result: "Participant" },
        ],
      },
      {
        month: "Oct",
        year: 2025,
        participations: 7,
        wins: 4,
        competitions: [
          { name: "Gemastik XVII", team: "ByteForce", result: "Winner" },
          { name: "Google Dev Fest", team: "CodeCrafters", result: "Winner" },
          { name: "UI/UX Design Sprint", team: "PixelCraft", result: "Winner" },
          { name: "Smart City Hack", team: "UrbanDev", result: "Winner" },
          { name: "ML Challenge", team: "NeuralNet", result: "Runner-Up" },
          { name: "Startup Pitch Day", team: "LaunchPad", result: "Finalist" },
          {
            name: "Open Source Fest",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Nov",
        year: 2025,
        participations: 4,
        wins: 2,
        competitions: [
          { name: "BizIT Challenge", team: "ByteForce", result: "Winner" },
          { name: "Creative Code Fest", team: "PixelCraft", result: "Winner" },
          { name: "Tech in Asia Hack", team: "LaunchPad", result: "Finalist" },
          {
            name: "DevOps Challenge",
            team: "ServerSquad",
            result: "Participant",
          },
        ],
      },
      {
        month: "Dec",
        year: 2025,
        participations: 2,
        wins: 1,
        competitions: [
          { name: "Year-End Showcase", team: "ByteForce", result: "Winner" },
          { name: "Holiday Hack", team: "CodeCrafters", result: "Participant" },
        ],
      },
      {
        month: "Jan",
        year: 2026,
        participations: 3,
        wins: 1,
        competitions: [
          { name: "New Year Innovation", team: "ByteForce", result: "Winner" },
          { name: "AI Ethics Hack", team: "NeuralNet", result: "Runner-Up" },
          {
            name: "Frontend Blitz",
            team: "CodeCrafters",
            result: "Participant",
          },
        ],
      },
      {
        month: "Feb",
        year: 2026,
        participations: 4,
        wins: 2,
        competitions: [
          {
            name: "Valentine Design Jam",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Cloud Innovation Cup", team: "SkyNet ID", result: "Winner" },
          {
            name: "React Challenge II",
            team: "CodeCrafters",
            result: "Finalist",
          },
          {
            name: "Agile Sprint Hack",
            team: "ByteForce",
            result: "Participant",
          },
        ],
      },
      {
        month: "Mar",
        year: 2026,
        participations: 5,
        wins: 3,
        competitions: [
          {
            name: "Hackathon UI/UX 2026",
            team: "PixelCraft",
            result: "Winner",
          },
          { name: "Code for Impact", team: "ImpactDev", result: "Winner" },
          { name: "Flutter Fest II", team: "AppStorm", result: "Winner" },
          { name: "Blockchain Summit", team: "ChainGang", result: "Runner-Up" },
          { name: "Campus Dev Day", team: "ByteForce", result: "Finalist" },
        ],
      },
    ],
    competitionHistory: {
      totalParticipated: 9,
      wins: 3,
      participations: [
        {
          name: "Film Pendek Nasional",
          year: 2025,
          result: "Winner",
          role: "Editor & Motion Artist",
        },
        {
          name: "Poster Competition ITB",
          year: 2025,
          result: "Winner",
          role: "Visual Designer",
        },
        {
          name: "Digital Art Award",
          year: 2024,
          result: "Finalist",
          role: "Illustrator",
        },
        {
          name: "Advertising Hackathon",
          year: 2024,
          result: "Winner",
          role: "Creative Lead",
        },
        {
          name: "Indonesian Graphic Design",
          year: 2023,
          result: "Runner-Up",
          role: "Junior Designer",
        },
        {
          name: "Video Ads Challenge",
          year: 2023,
          result: "Finalist",
          role: "Motion Designer",
        },
        {
          name: "Motion Graphic Award",
          year: 2022,
          result: "Finalist",
          role: "Artist",
        },
        {
          name: "Photography National",
          year: 2022,
          result: "Winner",
          role: "Photographer",
        },
        {
          name: "Creative Youth Summit",
          year: 2021,
          result: "Participant",
          role: "Delegate",
        },
      ],
    },
  },
};
