export const projects = [
    {
        id: "cafe-gato",
        title: "Café Gato",
        date: "2023-01",
        dateLabel: "January – May 2023",
        summary: "A café events web app built for AP Computer Science Principles at Del Norte High School, with a Python backend and SQL database behind it. This was my first full-stack project and one of my first introductions to programming.",
        details: [
            "Programmed a Python FastAPI/Flask backend with SQL database management for café events",
            "Organized and displayed data retrieved over an end-to-end backend connection",
            "Managed a 4-person Agile team as Scrum Master"
        ],
        tags: ["Team", "Coursework", "Full-Stack"],
        technicalSkills: ["Python", "FastAPI", "Flask", "SQL", "REST API"],
        softSkills: ["Scrum leadership", "Agile", "Team coordination"],
        links: [
            { label: "Frontend Repository", url: "https://github.com/drewreed2005/cafegato", type: "repo" },
            { label: "Backend Repository", url: "https://github.com/drewreed2005/cafendback", type: "repo" }
        ],
        image: "/projects/screenshots/cafe_gato_events_page.png",
        position: "right",
        focus: "35% 10%"
    },
    {
        id: "nighthawk-resources",
        title: "Nighthawk Resources",
        date: "2024-01",
        dateLabel: "January – June 2024",
        summary: "A student-focused web platform built for AP Computer Science A, backed by a Java Spring Boot API and SQL database. This site integrates basic Canvas functionality in addition to tools for graphing, statistics, and student outreach.",
        details: [
            "Programmed a Java Spring Boot backend and SQL database modeling student-class relationships",
            "Handled frontend-backend communication and account authorization with JSON Web Tokens",
            "Managed a 13-person Agile team as Scrum Master"
        ],
        tags: ["Team", "Coursework", "Full-Stack"],
        technicalSkills: ["Java", "Spring Boot", "SQL", "JWT authentication", "REST API"],
        softSkills: ["Pair Programming", "Scrum leadership", "Agile", "Team coordination"],
        links: [
            { label: "Frontend Repository", url: "https://github.com/John-sCC/jcc_frontend", type: "repo" },
            { label: "Backend Repository", url: "https://github.com/John-sCC/jcc_backend", type: "repo" }
        ],
        image: "/projects/screenshots/old_nighthawk_resources_image.jpeg",
        position: "5%",
        focus: "28% 45%"
    },
    {
        id: "9-to-christmas-eve",
        title: "9-to-Christmas Eve",
        date: "2024-10",
        dateLabel: "October – December 2024",
        summary: "A typing-based game built in Unity with the UC Irvine Video Game Development Club. As one of Santa's elves, you are tasked with transcribing partially illegible children's letters as fast as you can.",
        details: [
            "Programmed C# in the Unity engine",
            "Handled core typing mechanics and transition states",
            "Created placeholder and final visual assets for the game's Windows XP-aesthetic interface",
            "Collaborated with an 8-person team of designers, programmers, and managers"
        ],
        tags: ["Team", "Game Development", "Club"],
        technicalSkills: ["C#", "Unity", "Game development", "Input handling"],
        softSkills: ["Cross-discipline collaboration", "Team coordination", "Visual asset design"],
        links: [{ "label": "Itch.io Page", url: "https://nathantandrews.itch.io/9-to-christmas-eve", type: "link" }],
        image: "/projects/screenshots/typinggaem_irlbackground.png",
        position: "",
        focus: "72% 45%"
    },
    {
        id: "automation-internship",
        title: "BetterNight Automation Internship",
        date: "2025-06",
        dateLabel: "June – September 2025",
        summary: "During my time with BetterNight, I built Python automation bots that retrieve patient data from webpages. I also handled the manipulation and storage of retrieved data in specified formats, as well as bot migration to an AWS instance. (Proprietary work; no public code or demo shown.)",
        details: [
            "Programmed 5+ Python automation bots using Selenium WebDriver and Playwright to retrieve patient data from the web",
            "Functionally decomposed and optimized existing bots to improve retrieval efficiency and preempt technical debt",
            "Redefined existing data searching to rely upon consistent frontend elements, minimizing unsuccessful information searches",
            "Migrated locally-running bots to AWS instance and set up data storage via an S3 bucket"
        ],
        tags: ["Internship", "Automation", "Professional"],
        technicalSkills: ["Python", "Selenium", "Playwright", "Pandas", "AWS"],
        softSkills: ["Working to specification", "Cross-discipline collaboration", "Solo programming", "Team cooperation"],
        links: [], // N/A
        image: "/projects/screenshots/BN_Social-Preview_2023.jpg",
        position: "center",
        focus: "10% 90%"
    },
    {
        id: "pintos",
        title: "Pintos OS Thread Scheduler",
        date: "2026-06",
        dateLabel: "April – June 2026",
        summary: "An optional Principles of Operating Systems project in which three thread scheduling algorithms are implemented within Pintos OS. (Full source code cannot be provided due to academic dishonesty concerns; see design document.)",
        details: [
            "Programmed base C following Pintos conventions",
            "Designed queue-based thread scheduling algorithms",
            "Enforced synchronization using semaphores and spinlocks"
        ],
        tags: ["Solo", "Coursework"],
        technicalSkills: ["C", "OS Programming", "Process scheduling", "Synchronization", "Data structures"],
        softSkills: ["Solo programming", "Working to specification", "Documentation", "Time management"],
        links: [{ label: "Design Document", url: "/public/projects/files/pintos_threads_design_doc", type: "file" }],
        image: "/projects/screenshots/pintos_scheduler_bg.png",
        position: "",
        focus: "20% 80%"
    },
    {
        id: "guideware",
        title: "Guideware",
        date: "2026-08",
        dateLabel: "August 2026 – Now",
        summary: "A site that allows users to create, export, and share uniformly-formatted instructional documents for use in industries like education and business. Simultaneously an exercise in developing a Python FastAPI backend and React/TypeScript frontend. While still in development, a demo of .gware file parsing and frontend representation is linked below, as well as the working GitHub repository. (The backend is being hosted for free with Render, so data may take a while to load guide data.)",
        details: [
            "Programmed Python FastAPI backend to store and interpret guides",
            "Designed frontend and established end-to-end connection using React and TypeScript",
            "Implemented abstract data parsing and custom filetype support for .gware files"
        ],
        tags: ["Solo", "Full-Stack", "PersonalProject"],
        technicalSkills: ["Python", "FastAPI", "React", "TypeScript", "CSS", "REST API"],
        softSkills: ["Solo programming", "Scoping", "Visual asset design", "Documentation"],
        links: [{ label: "Frontend Demo", url: "https://guideware.vercel.app/", type: "demo" },
                { label: "GitHub Repository", url: "https://github.com/drewreed2005/Guideware", type: "repo" }],
        image: "/projects/screenshots/guideware_mockup.png",
        position: "left bottom",
        focus: "40% 60%",
    }
];