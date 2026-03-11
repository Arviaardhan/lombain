export const categories = [
    { value: "web", label: "Web Development" },
    { value: "mobile", label: "Mobile Development" },
    { value: "design", label: "UI/UX Design" },
    { value: "data", label: "Data Science" },
    { value: "business", label: "Business Case" },
    { value: "iot", label: "IoT / Hardware" },
    { value: "debate", label: "Debate" },
    { value: "research", label: "Research / Academic" },
    { value: "creative", label: "Creative / Multimedia" },
];

export const competitionSuggestions: Record<string, string[]> = {
    web: ["Hackathon UI/UX 2026", "Google Solution Challenge", "BINUS Hackathon", "Compfest Hackaday"],
    mobile: ["Flutter Forward Extended", "Apple Developer Academy Challenge", "Google Developer Student Clubs"],
    design: ["UXTopia Design Sprint", "Figma Design Jam", "Adobe Creative Jam"],
    data: ["Kaggle Competitions", "Data Science Bowl", "DrivenData Challenges"],
    business: ["Hult Prize", "Enactus World Cup", "MIT $100K Entrepreneurship Competition"],
    iot: ["IoT World Championship", "Hackster Hardware Weekend", "Microsoft Imagine Cup"],
    debate: ["World Universities Debating Championship", "Asian Universities Debating Championship", "National Debate Tournament"],
    research: ["ICML Student Research Competition", "IEEE Research Challenge", "ACM Student Research Competition"],
    creative: ["Adobe Creative Jam", "YouTube NextUp", "TikTok Creator Fund"],

};