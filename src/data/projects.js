export const projects = [
    {
        id: "example-project",
        title: "Example Project",
        date: "2024-03",                       // YYYY-MM, used for chronological sort
        summary: "One or two sentences on what it is and why it exists.",
        details: [                             // 2-4 short bullets: what you did / what you learned
            "Built X using Y to solve Z.",
            "Designed the data model and API.",
        ],
        tags: ["Full-stack", "Solo", "Hackathon"],   // free-form, anything goes
        technicalSkills: ["React", "Node.js", "PostgreSQL"],
        softSkills: ["Scoping", "Documentation"],
        image: "/projects/example.png",        // optional; falls back to a gradient
        focus: "70% 30%",                      // where the sharp patch sits (x% y%)
        links: [
            { label: "GitHub", url: "https://github.com/you/repo", type: "repo" },
            { label: "Live demo", url: "https://example.com", type: "demo" },
        ],
    },
];