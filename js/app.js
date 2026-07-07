// ============================================================
// SITE DATA — edit anything in this file to update the website.
// This replaces the old React /src/data/*.ts files.
// ============================================================

export const siteConfig = {
  teamName: "Rafia & Salma",
  tagline: "Internship Final Showcase",
  organization: "QAPCO",
  year: "2026",
};

export const navItems = [
  { id: "hero", label: "Welcome", icon: "home" },
  { id: "about", label: "About Us", icon: "users" },
  { id: "weekly", label: "Weekly Highlights", icon: "calendar-days" },
  { id: "innovation", label: "Innovation Centre", icon: "lightbulb" },
  { id: "rca-assignment", label: "RCA Assignment", icon: "search" },
  { id: "cyber", label: "Cyber Corner", icon: "shield-check" },
  { id: "activities", label: "Activities", icon: "trophy" },
  { id: "conclusion", label: "Thank You", icon: "sparkles" },
];

// ---------- ABOUT ----------
export const teamIntro = {
  name: "Rafia & Salma",
  mission:
    "Two curious interns on a mission to learn fast, build thoughtfully, and leave the organization a little more digital than we found it.",
};

export const teamMembers = [
  {
    name: "Rafia Zubair",
    role: "IT Intern",
    skills: ["Python", "React", "AI Prompting", "Generative AI"],
    theme: "primary",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/rafia-zubair?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" }
    ],
  },
  {
    name: "Salma Ismail",
    role: "IT Intern",
    skills: ["Web Development", "Microsoft PowerBI", "Data Analysis", "Microsoft PowerApps"],
    theme: "accent",
    socials: [
      { label: "LinkedIn", href: "www.linkedin.com/in/salma-ismail-08b92824a" }
    ],
  },
];

export const internshipTimeline = [
  { period: "Week 1", title: "IT Week", description: "Started with introductions and internship goals, then explored IT Operations, Database Management Systems, IT Business Solutions, Project Management, and Microsoft SharePoint.", icon: "compass" },
  { period: "Week 2", title: "Digital Week", description: "Explored the Digital Department through sessions on the Digital Catalyst Program, Data & Analytics, Value Realization, Change Management, and concluded with a Digital Idea presentation.", icon: "book-open" },
  { period: "Week 3", title: "Cyber Security Week", description: "Learned cybersecurity fundamentals through sessions on network security, cyber threats, data protection, VAPT, email security, and enterprise security tools, culminating in designing and implementing a custom cipher.", icon: "hammer" },
  { period: "Week 4", title: "Delivery & Reflection", description: "Polished deliverables, documented learnings, and prepared this showcase.", icon: "flag" },
];

// ---------- WEEKLY ----------
export const weeklyEntries = [
  { week: 1, member: "Rafia Zubair", dateRange: "June 15 – June 18", learned: "How the team plans sprints and breaks large goals into small shippable tasks.", technologies: ["Git", "VS Code", "Jira"], challenge: "Setting up the full local dev environment with all internal dependencies.", achievement: "Completed onboarding and pushed my first commit on day three.", reflection: "Asking questions early saved me hours. The team is incredibly welcoming.", progress: 100, badges: ["First Commit", "Fast Starter"] },
  { week: 1, member: "Salma Ismail", dateRange: "June 15 – June 18", learned: "The organization's security policies and why least-privilege access matters.", technologies: ["Linux", "VPN", "Password Managers"], challenge: "Understanding the internal network topology for the first time.", achievement: "Documented the onboarding security checklist for future interns.", reflection: "Security is everyone's job, not just the security team's.", progress: 100, badges: ["Security Aware", "Documenter"] },
  { week: 2, member: "Rafia Zubair", dateRange: "June 21 – June 25", learned: "Component-driven UI development and the value of a design system.", technologies: ["React", "Tailwind CSS", "TypeScript"], challenge: "Refactoring a messy component into reusable, typed pieces.", achievement: "Built a reusable card component now used across three internal tools.", reflection: "Small, focused components are easier to test and reason about.", progress: 90, badges: ["Refactor Hero"] },
  { week: 2, member: "Salma Ismail", dateRange: "June 21 – June 25", learned: "Fundamentals of symmetric vs asymmetric encryption.", technologies: ["OpenSSL", "Wireshark"], challenge: "Reading captured packets and identifying unencrypted traffic.", achievement: "Presented a 5-minute talk on phishing awareness to the team.", reflection: "Hands-on labs made abstract crypto concepts finally click.", progress: 85, badges: ["Public Speaker"] },
  { week: 3, member: "Rafia Zubair", dateRange: "June 28 – July 2", learned: "How to design a simple automation pipeline that saves manual effort.", technologies: ["Python", "REST APIs", "Cron"], challenge: "Handling edge cases and failures gracefully in the automation script.", achievement: "Automated a weekly report that previously took 2 hours by hand.", reflection: "Automation is most valuable when it's reliable and observable.", progress: 80, badges: ["Automator", "Time Saver"] },
  { week: 3, member: "Salma Ismail", dateRange: "June 28 – July 2", learned: "Threat modeling and how attackers think about a system.", technologies: ["OWASP", "Burp Suite"], challenge: "Mapping realistic attack paths without overcomplicating the model.", achievement: "Identified and reported two minor configuration improvements.", reflection: "Thinking like an attacker makes you a better defender.", progress: 75, badges: ["Threat Hunter"] },
  { week: 4, member: "Rafia Zubair", dateRange: "July 5 – July 7", learned: "How to design a simple automation pipeline that saves manual effort.", technologies: ["Python", "REST APIs", "Cron"], challenge: "Handling edge cases and failures gracefully in the automation script.", achievement: "Automated a weekly report that previously took 2 hours by hand.", reflection: "Automation is most valuable when it's reliable and observable.", progress: 80, badges: ["Automator", "Time Saver"] },
  { week: 4, member: "Salma Ismail", dateRange: "July 5 – July 7", learned: "Threat modeling and how attackers think about a system.", technologies: ["OWASP", "Burp Suite"], challenge: "Mapping realistic attack paths without overcomplicating the model.", achievement: "Identified and reported two minor configuration improvements.", reflection: "Thinking like an attacker makes you a better defender.", progress: 75, badges: ["Threat Hunter"] },
];

// ---------- INNOVATION ----------
export const innovationStats = [
  { label: "Ideas Proposed", value: 4, suffix: "" },
  { label: "Avg. ROI", value: 230, suffix: "%" },
  { label: "Hours Saved / Week", value: 46, suffix: "h" },
  { label: "Teams Impacted", value: 7, suffix: "" },
];

export const innovationIdeas = [
  { id: "ai-chatbot", title: "AI Chatbot for Internal Support", category: "AI", icon: "bot", summary: "A conversational assistant that answers HR, IT, and policy questions instantly, reducing the load on support teams.", benefits: ["24/7 instant answers for employees", "Frees support staff for complex cases", "Consistent, policy-accurate responses"], inputs: ["Knowledge base export", "LLM API access", "2 weeks build time"], roi: "~280% in year one", roiValue: 280, impact: 88, effort: 45, before: "Employees wait hours for routine answers; tickets pile up.", after: "80% of routine questions answered in seconds, ticket volume down ~40%." },
  { id: "auto-reporting", title: "Automated Reporting System", category: "Automation", icon: "file-bar-chart", summary: "Scheduled pipelines that gather data and generate stakeholder reports automatically, eliminating manual spreadsheet work.", benefits: ["Saves ~10 hours/week", "Removes copy-paste errors", "Always up-to-date dashboards"], inputs: ["Data source access", "Reporting template", "1 week build time"], roi: "~210% in year one", roiValue: 210, impact: 78, effort: 35, before: "Analysts manually compile reports every Monday morning.", after: "Reports delivered automatically at 7am with zero manual effort." },
  { id: "smart-docs", title: "Smart Document Processing", category: "AI", icon: "scan-text", summary: "AI-powered extraction that reads invoices and forms, classifies them, and routes data into the right systems.", benefits: ["Faster invoice processing", "Reduced data-entry cost", "Searchable document archive"], inputs: ["Sample documents", "OCR + LLM service", "3 weeks build time"], roi: "~190% in year one", roiValue: 190, impact: 82, effort: 60, before: "Staff manually key in data from hundreds of documents.", after: "Documents auto-processed with human review only on exceptions." },
  { id: "workflow-automation", title: "Workflow Automation Hub", category: "Digital Transformation", icon: "workflow", summary: "Connect existing tools with no-code automations so approvals, notifications, and hand-offs happen automatically.", benefits: ["Faster approvals", "Fewer dropped tasks", "Clear audit trail"], inputs: ["Process map", "Automation platform", "2 weeks build time"], roi: "~240% in year one", roiValue: 240, impact: 85, effort: 40, before: "Approvals stall in email threads; tasks slip through cracks.", after: "Automated routing keeps every request moving with full visibility." },
];

// ---------- CYBER ----------
export const cyberConcepts = [
  { title: "Encryption Basics", description: "Symmetric vs asymmetric encryption and when to use each.", icon: "lock" },
  { title: "Phishing Awareness", description: "Spotting social-engineering attempts before they cause damage.", icon: "fish" },
  { title: "Least Privilege", description: "Granting only the access each role truly needs.", icon: "key-round" },
  { title: "Secure Passwords", description: "Length, uniqueness, and password managers over memorization.", icon: "shield-check" },
];

export const securityTips = [
  "Enable multi-factor authentication on every account that supports it.",
  "Never reuse passwords — use a password manager.",
  "Hover before you click: inspect links in unexpected emails.",
  "Keep software and devices updated to patch known vulnerabilities.",
  "Lock your screen whenever you step away from your desk.",
];

export const cyberTools = [
  { name: "Wireshark", use: "Network packet analysis" },
  { name: "Burp Suite", use: "Web security testing" },
  { name: "OpenSSL", use: "Encryption & certificates" },
  { name: "Nmap", use: "Network scanning" },
  { name: "OWASP ZAP", use: "Vulnerability scanning" },
];

export const ctfChallenges = [
  { title: "Caesar's Secret", difficulty: "Easy", points: 100, prompt: "Decode this Caesar cipher (shift 3): 'FdhvduFlskhu'", hint: "Shift each letter back by 3 positions in the alphabet.", answer: "CaesarCipher" },
  { title: "Base of Operations", difficulty: "Medium", points: 200, prompt: "Decode this Base64 string: 'aW50ZXJuc2hpcA=='", hint: "Base64 often ends with '=' padding.", answer: "internship" },
  { title: "Reversed Reality", difficulty: "Easy", points: 100, prompt: "What does this say backwards: 'ytiruceS'", hint: "Read it right-to-left.", answer: "Security" },
];

// ---------- ACTIVITIES ----------
export const technicalSkills = [
  { name: "React & TypeScript", level: 85 },
  { name: "Python Automation", level: 80 },
  { name: "Cybersecurity Fundamentals", level: 75 },
  { name: "SQL & Data", level: 70 },
  { name: "Git & CI/CD", level: 78 },
  { name: "AI / Prompt Engineering", level: 82 },
];

export const softSkills = [
  { name: "Communication", level: 90 },
  { name: "Teamwork", level: 92 },
  { name: "Problem Solving", level: 88 },
  { name: "Time Management", level: 84 },
  { name: "Professionalism", level: 90 },
];

export const skillRadar = [
  { axis: "Technical", score: 82 },
  { axis: "Communication", score: 90 },
  { axis: "Security", score: 75 },
  { axis: "Automation", score: 85 },
  { axis: "Teamwork", score: 92 },
  { axis: "Creativity", score: 80 },
];

export const projects = [
  { title: "Event Management Platform", description: "web based platform designe to simplify the planning and management of events.", tags: ["Python", "Automation", "APIs"], icon: "file-bar-chart", highlights: ["Saved ~2 hours/week", "Zero manual errors", "Configurable templates"] },
  { title: "Digital Implementation",
    description: "Developed a digital solution to address a key industry pain point, applying digital transformation principles and presenting the proposed implementation.",
    tags: ["Digital Transformation", "Innovation", "Problem Solving"], icon: "component", highlights: ["Identified a real-world challenge",
    "Designed a practical digital solution",
    "Presented the implementation proposal"] },
  { title: "Custom Cipher Creation",
    description: "Designed and implemented a custom encryption cipher with both encryption and decryption functionality as part of a cybersecurity assignment.",
    tags: ["CyberSecurity", "Python"],icon: "shield-check", highlights: ["Designed custom algorithm", "Implemented encryption & decryption", "Tested with sample messages"] },
];

export const certificates = [
  { title: "Cybersecurity Essentials", issuer: "Cisco Networking Academy", date: "2026", icon: "award" },
  { title: "Python for Everybody", issuer: "Coursera", date: "2026", icon: "award" },
  { title: "Intro to AI & LLMs", issuer: "Internal Training", date: "2026", icon: "award" },
];

// Replace src with your own screenshots in assets/images/
export const gallery = [
  { src: "assets/images/gallery-1.jpg", caption: "Automated reporting dashboard" },
  { src: "assets/images/gallery-2.jpg", caption: "Innovation brainstorming session" },
  { src: "assets/images/gallery-3.jpg", caption: "Cybersecurity lab environment" },
  { src: "assets/images/gallery-4.jpg", caption: "Final project presentation" },
];

// ---------- CONCLUSION ----------
export const conclusionStats = [
  { label: "Weeks Completed", value: 4, suffix: "" },
  { label: "Projects Delivered", value: 3, suffix: "" },
  { label: "Skills Gained", value: 5, suffix: "+" },
  { label: "Hours of Learning", value: 60, suffix: "+" },
];

export const summary =
  "Over ten weeks we grew from curious newcomers into confident contributors. We shipped real tools, proposed innovations, and deepened our understanding of security and automation — all while learning how a great team operates.";

export const takeaways = [
  { title: "Learn by Building", text: "Hands-on projects taught us more than any tutorial could.", icon: "hammer" },
  { title: "Communicate Early", text: "Asking questions and sharing progress kept everything moving.", icon: "messages-square" },
  { title: "Security is Everyone's Job", text: "Good habits protect the whole organization.", icon: "shield-check" },
  { title: "Small Wins Compound", text: "Consistent, focused effort produced real impact over time.", icon: "trending-up" },
];

export const appreciation =
  "Thank you to our mentors, managers, and colleagues for your patience, guidance, and trust. You made this internship a genuinely transformative experience. We are grateful to every department that welcomed our questions and shared their knowledge.";

export const signatures = ["Rafia Zubair", "Salma Ismail"];
