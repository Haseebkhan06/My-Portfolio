/* Content: roles, projects, skills, experience, certificates. Edit text here. */

const { useState, useEffect, useRef } = React,
  h = React.createElement;
const PHOTO = IMG.photo;
const ROLES = [
  "Computer Science Engineer",
  "AI / ML Builder",
  "UI & Graphic Designer",
];
const PROJ = [
  {
    n: "AgriSathi",
    t: "AI-powered smart agriculture platform",
    s: "Built",
    k: [
      "Python",
      "Flask",
      "Machine Learning",
      "Open-Meteo",
      "Open-Elevation",
      "JavaScript",
    ],
    b: [
      "Recommends crops from weather, soil and terrain analysis.",
      "Uses GIS and elevation data to flag landslide-risk areas.",
      "Adds market-price insights and a chatbot for farmers.",
      "Designed for people with limited smartphone or internet access.",
    ],
  },
  {
    n: "Vikraya",
    t: "AI-powered hyper-local business advisory platform",
    s: "In development",
    k: [
      "React",
      "Tailwind CSS",
      "FastAPI",
      "Supabase",
      "scikit-learn",
      "PyTorch",
    ],
    b: [
      "Helps rural entrepreneurs check demand, competition and feasibility.",
      "Generates SWOT analysis, project costs, EMI plans and scheme matches.",
      "Includes explainable AI, multilingual NLP and an AI document vault.",
      "Reachable through WhatsApp and IVR.",
    ],
  },
  {
    n: "ResQ",
    t: "Emergency and flood rescue platform",
    s: "In development",
    k: ["React Native", "Expo", "JavaScript"],
    b: [
      "Mobile app for reporting emergencies and coordinating flood rescue.",
      "Connects people in trouble with rescue resources.",
      "Built for fast, accessible response in critical moments.",
    ],
  },
];
const SK = [
  ["Languages", ["Python", "C++", "Java", "JavaScript", "SQL"]],
  ["Web", ["HTML", "CSS", "React.js", "Django", "Flask", "REST APIs"]],
  ["AI / ML", ["Machine Learning", "Artificial Intelligence"]],
  [
    "Core CS",
    [
      "Data Structures",
      "Operating Systems",
      "Cryptography & Network Security",
      "Network Analysis",
      "Digital Systems",
      "System Design",
    ],
  ],
  ["Tools", ["Git", "GitHub", "Figma", "Canva"]],
  [
    "Design & Leadership",
    [
      "UI / Graphic Design",
      "Branding",
      "Team Coordination",
      "Project Management",
    ],
  ],
];
const LOGO = {
  csi: IMG.csi,
  acm: IMG.acm,
  su: IMG.su,
  gdg: IMG.gdg,
};
const EXP = [
  [
    "Secretary of Organisation",
    "CSI MJCET",
    "2026 – Present",
    [
      "Coordinating organizational activities and initiatives.",
      "Managing planning and execution of events.",
      "Working with teams to ensure smooth operations.",
    ],
    [],
    "csi",
    1,
  ],
  [
    "Associate Chief Coordinator",
    "CSI MJCET",
    "Sep 2025 – Present",
    [
      "Oversaw planning and execution of technical events.",
      "Coordinated faculty, volunteers, logistics, publicity, and registrations.",
    ],
    [],
    "csi",
    1,
  ],
  [
    "Freelance Graphic Designer",
    "",
    "Sep 2024 – Present",
    [
      "Designed jackets, hoodies, merchandise, yearbooks, posters, and social media creatives.",
      "Managed projects from client requirements to final delivery.",
    ],
    [],
    null,
    1,
  ],
  [
    "Design Associate Head",
    "CSI MJCET",
    "Sep 2024 – May 2025",
    [
      "Managed design activities and promotional creatives.",
      "Worked with Canva and coordinated design projects.",
    ],
    [],
    "csi",
    0,
  ],
  [
    "Design Team",
    "SU Knowledge Hub Foundation",
    "Apr 2024 – Jun 2025",
    [
      "Created visual content using Canva and Figma.",
      "Contributed to design requirements and team projects.",
    ],
    [],
    "su",
    0,
  ],
  [
    "Design Team",
    "ACM MJCET",
    "Dec 2023 – Sep 2024",
    ["Created design and promotional content using Canva."],
    [],
    "acm",
    0,
  ],
];
const CERT = [
  [
    "Web Development By Doing: HTML / CSS From Scratch",
    "Udemy",
    "Dec 2024",
    null,
  ],
  [
    "Complete JavaScript with HTML5, CSS3: Zero to Expert",
    "Udemy, 17 hours",
    "Sep 2024",
    null,
  ],
  ["GDSC Build Week", "GDSC MJCET", "May 2024", "gdg"],
  ["AI Genesis (Certificate of Appreciation)", "GDSC MJCET", "Feb 2024", "gdg"],
];
