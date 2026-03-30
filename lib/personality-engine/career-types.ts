// Career Types System
// 6-dimensional career behavior and decision pattern system

export type CareerFamily =
  | "thinking-style"
  | "work-style"
  | "motivation"
  | "energy"
  | "leadership"
  | "career-direction";

export interface CareerType {
  id: string;
  name: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  behavior: string[];
  strengths: string[];
  blindSpots: string[];
  bestFit: string[];
  actionItems: string[];
  family: CareerFamily;
}

const CAREER_TYPES: CareerType[] = [
  // THINKING STYLE FAMILY
  {
    id: "car-strategic",
    name: "The Strategic Planner",
    tagline: "Sees direction and builds structured plans",
    shortDesc:
      "You think in long term outcomes. You like clarity before action and prefer planning over reacting. You are strong at connecting decisions with future impact.",
    fullDesc:
      "You think in terms of long-term direction and outcomes. Before taking action, you like to understand the full picture and plan systematically. You excel at connecting individual decisions to their broader impact and creating roadmaps that guide teams or projects toward defined goals. Your strength lies in seeing the whole system and how pieces fit together.",
    behavior: [
      "Plan before executing major decisions",
      "Connect short-term actions to long-term outcomes",
      "Create structured roadmaps and timelines",
      "Anticipate future challenges",
      "Think in systems and frameworks",
    ],
    strengths: [
      "See the big picture clearly",
      "Create coherent long-term strategies",
      "Prevent costly mistakes through planning",
      "Align teams around shared direction",
      "Build sustainable progress",
    ],
    blindSpots: [
      "May over-plan and delay action",
      "Can miss immediate opportunities",
      "Others may see you as slow or hesitant",
      "May be rigid when plans need to change",
      "Can create analysis paralysis",
    ],
    bestFit: [
      "Strategic roles requiring long-term thinking",
      "Leadership and management positions",
      "Product planning and architecture",
      "Project management and planning",
      "Business development and strategy",
    ],
    actionItems: [
      "Learn to balance planning with action",
      "Practice speed in decision-making",
      "Build flexibility into your plans",
      "Communicate plans clearly to others",
      "Set milestones to track progress",
    ],
    family: "thinking-style",
  },
  {
    id: "car-analytical",
    name: "The Analytical Problem Solver",
    tagline: "Breaks complexity into clear logic",
    shortDesc:
      "You rely on structure and reasoning. You enjoy solving problems step by step and prefer clarity, data, and precision over assumptions.",
    fullDesc:
      "You are driven by logic and systematic reasoning. You break complex problems into manageable parts and solve them methodically. You prefer data-driven decisions over intuition and require clarity before moving forward. Your strength is turning confusion into clear understanding through rigorous analysis.",
    behavior: [
      "Request data before making decisions",
      "Break problems into components",
      "Follow logical step-by-step processes",
      "Question assumptions",
      "Seek precision and accuracy",
    ],
    strengths: [
      "Solve complex problems effectively",
      "Reduce uncertainty through analysis",
      "Make sound, logic-based decisions",
      "Catch errors and inconsistencies",
      "Build robust systems",
    ],
    blindSpots: [
      "May over-analyze and delay decisions",
      "Can seem cold or overly critical",
      "May miss human or emotional factors",
      "Others perceive you as pedantic",
      "Can get lost in details",
    ],
    bestFit: [
      "Technical and engineering roles",
      "Data analysis and research positions",
      "Quality assurance and testing",
      "Process improvement roles",
      "Finance and compliance functions",
    ],
    actionItems: [
      "Balance analysis with action",
      "Develop emotional intelligence",
      "Learn to communicate findings clearly",
      "Set analysis time limits",
      "Value intuition alongside data",
    ],
    family: "thinking-style",
  },
  {
    id: "car-visionary",
    name: "The Intuitive Visionary",
    tagline: "Sees possibilities beyond the present",
    shortDesc:
      "You think in ideas and future potential. You are drawn to innovation, creativity, and big picture thinking rather than detailed structure.",
    fullDesc:
      "You operate from intuition and imagination. You see possibilities and potential before they become obvious. You are drawn to innovation, creative thinking, and exploring new directions. You prefer working with ideas and possibilities rather than getting into detailed execution details. Your strength is imagining new futures.",
    behavior: [
      "Jump to possibilities quickly",
      "Think about how things could be",
      "Connect ideas in novel ways",
      "Prefer exploring over executing",
      "Act on intuitive hunches",
    ],
    strengths: [
      "Envision innovative solutions",
      "Inspire others with vision",
      "See possibilities others miss",
      "Drive creative breakthroughs",
      "Generate new ideas continuously",
    ],
    blindSpots: [
      "May lack follow-through on ideas",
      "Overlook practical constraints",
      "Seem scattered or unfocused",
      "Struggle with implementation details",
      "Can frustrate detail-oriented colleagues",
    ],
    bestFit: [
      "Innovation and R&D roles",
      "Creative positions (design, marketing)",
      "Entrepreneurship and startups",
      "Visionary leadership roles",
      "Strategy and future thinking",
    ],
    actionItems: [
      "Find partners who can execute",
      "Document your ideas systematically",
      "Learn to follow through",
      "Balance vision with reality",
      "Value practical implementation",
    ],
    family: "thinking-style",
  },
  {
    id: "car-practical",
    name: "The Practical Executor",
    tagline: "Focuses on what works in reality",
    shortDesc:
      "You prioritize action and results. You are grounded, efficient, and focused on execution rather than theory.",
    fullDesc:
      "You are grounded in reality and focused on execution. You prioritize what works over what sounds good on paper. You enjoy taking action and seeing concrete results. You are efficient, pragmatic, and results-oriented. Your strength is turning ideas into working reality quickly.",
    behavior: [
      "Focus on immediate results",
      "Take action quickly",
      "Skip unnecessary theory",
      "Evaluate based on what works",
      "Keep things simple",
    ],
    strengths: [
      "Execute efficiently",
      "Get things done quickly",
      "Adapt solutions to reality",
      "Build trust through results",
      "Solve problems practically",
    ],
    blindSpots: [
      "May miss long-term consequences",
      "Can lack strategic vision",
      "Might overlook important planning",
      "Others see you as short-sighted",
      "May skip necessary preparation",
    ],
    bestFit: [
      "Operations and execution roles",
      "Sales and business development",
      "Project delivery roles",
      "Troubleshooting and fixing",
      "Front-line management positions",
    ],
    actionItems: [
      "Learn strategic thinking",
      "Plan more before executing",
      "Consider long-term impact",
      "Build relationships with planners",
      "Document processes for others",
    ],
    family: "thinking-style",
  },

  // WORK STYLE FAMILY
  {
    id: "car-independent",
    name: "The Independent Operator",
    tagline: "Works best with full autonomy",
    shortDesc:
      "You prefer control over your work. You do not like being micromanaged and perform best when trusted to operate independently.",
    fullDesc:
      "You thrive with autonomy and control. You do not perform well under micromanagement. You prefer being trusted to handle your work your way. You are most productive when given clear goals and freedom to determine how to reach them. You value independence over structure.",
    behavior: [
      "Prefer minimum supervision",
      "Want control over methods",
      "Take ownership of work",
      "Dislike detailed instructions",
      "Work best solo",
    ],
    strengths: [
      "Self-directed and responsible",
      "Don't need constant feedback",
      "Solve problems independently",
      "Feel ownership of results",
      "High motivation without oversight",
    ],
    blindSpots: [
      "May struggle in team environments",
      "Can resist feedback or guidance",
      "Difficulty collaborating",
      "May not adapt to team norms",
      "Can seem stubborn or uncooperative",
    ],
    bestFit: [
      "Remote or independent work",
      "Entrepreneurial roles",
      "Specialized expert positions",
      "Freelance or consultant work",
      "Roles with clear autonomy",
    ],
    actionItems: [
      "Develop collaboration skills",
      "Learn to work in teams",
      "Practice receiving feedback",
      "Find roles matching autonomy needs",
      "Build relationships with peers",
    ],
    family: "work-style",
  },
  {
    id: "car-collaborative",
    name: "The Collaborative Builder",
    tagline: "Thrives in team environments",
    shortDesc:
      "You enjoy working with others and building together. You gain energy from collaboration and shared progress.",
    fullDesc:
      "You are energized by working with others. You enjoy building with team members, sharing ideas, and achieving together. Collaboration is not just how you work—it's what motivates you. You excel in team environments and contribute both ideas and support to group success.",
    behavior: [
      "Seek input from others",
      "Share ideas freely",
      "Build relationships at work",
      "Coordinate with colleagues",
      "Celebrate team wins",
    ],
    strengths: [
      "Create positive team dynamics",
      "Leverage diverse perspectives",
      "Build strong relationships",
      "Increase collective output",
      "Motivate others through energy",
    ],
    blindSpots: [
      "May struggle with independent work",
      "Can become too consensus-driven",
      "Difficulty making solo decisions",
      "May take longer to decide",
      "Can rely too much on others",
    ],
    bestFit: [
      "Team-based environments",
      "Cross-functional coordination",
      "Mentoring and coaching roles",
      "Project management",
      "Community and culture building",
    ],
    actionItems: [
      "Practice independent decision-making",
      "Learn to work effectively alone",
      "Balance collaboration with decisiveness",
      "Set boundaries on consensus-building",
      "Develop individual expertise",
    ],
    family: "work-style",
  },
  {
    id: "car-structured",
    name: "The Structured Performer",
    tagline: "Needs clarity and systems",
    shortDesc:
      "You perform best in organized environments with clear expectations. You prefer defined roles and predictable workflows.",
    fullDesc:
      "You perform best with clear structure and expectations. You prefer organized environments with defined processes and roles. Chaos reduces your effectiveness. You excel when you understand exactly what is expected and how to deliver. You build reliable performance through systematic approaches.",
    behavior: [
      "Ask for clear expectations",
      "Follow processes and procedures",
      "Organize work systematically",
      "Prefer predictable workflows",
      "Document and standardize",
    ],
    strengths: [
      "Reliable and consistent",
      "Build repeatable processes",
      "Excel in organized environments",
      "Reduce errors through systems",
      "Manage complex workflows",
    ],
    blindSpots: [
      "May struggle with ambiguity",
      "Can be too rigid",
      "Slow to adapt to change",
      "Difficulty with uncertainty",
      "May resist new approaches",
    ],
    bestFit: [
      "Regulated industries",
      "Administrative and operations roles",
      "Process management",
      "Quality assurance positions",
      "Structured corporate environments",
    ],
    actionItems: [
      "Build flexibility into thinking",
      "Learn to handle ambiguity",
      "Practice adapting to change",
      "Develop comfort with uncertainty",
      "Balance structure with adaptability",
    ],
    family: "work-style",
  },
  {
    id: "car-flexible",
    name: "The Flexible Adapter",
    tagline: "Adjusts easily to change",
    shortDesc:
      "You are comfortable with uncertainty. You can shift direction quickly and adapt without losing momentum.",
    fullDesc:
      "You thrive in uncertain, changing environments. You adapt quickly to new situations without losing momentum. You do not need rigid structure to be effective. You are comfortable with ambiguity and can shift direction as needed while maintaining productivity. You are resilient and energized by change.",
    behavior: [
      "Adapt quickly to changes",
      "Comfortable with uncertainty",
      "Shift priorities fluidly",
      "Stay productive amid chaos",
      "Embrace new approaches",
    ],
    strengths: [
      "Navigate change easily",
      "Maintain productivity amid uncertainty",
      "Learn and adjust quickly",
      "Discover creative solutions",
      "Stay calm during transitions",
    ],
    blindSpots: [
      "May lack direction or focus",
      "Can seem scattered",
      "Difficulty with long-term commitment",
      "May struggle with consistency",
      "Others see you as unfocused",
    ],
    bestFit: [
      "Startups and fast-moving environments",
      "Consulting and advisory roles",
      "Crisis management and troubleshooting",
      "Research and development",
      "Rapidly changing industries",
    ],
    actionItems: [
      "Build direction and focus",
      "Commit to longer-term goals",
      "Practice consistency",
      "Channel adaptability into leadership",
      "Develop structured thinking",
    ],
    family: "work-style",
  },

  // MOTIVATION FAMILY
  {
    id: "car-purpose",
    name: "The Purpose Driven",
    tagline: "Needs meaning in work",
    shortDesc:
      "You want your work to matter. You are driven by impact, values, and deeper purpose beyond just income.",
    fullDesc:
      "You are driven by meaning and purpose. Income and job title matter less than knowing your work matters. You are motivated by alignment with your values and seeing real impact. You seek work that contributes to something larger than yourself. Purpose is your primary motivator.",
    behavior: [
      "Consider values alignment",
      "Think about impact and meaning",
      "Question work relevance",
      "Seek purposeful roles",
      "Evaluate employer values",
    ],
    strengths: [
      "Stay committed to meaningful work",
      "Maintain intrinsic motivation",
      "Drive positive change",
      "Build culture around values",
      "Inspire others with purpose",
    ],
    blindSpots: [
      "May overlook financial needs",
      "Can be idealistic about reality",
      "Difficulty in purely commercial roles",
      "May judge non-purpose-driven colleagues",
      "Can seem naive about business",
    ],
    bestFit: [
      "Mission-driven organizations",
      "Non-profit and social impact roles",
      "Healthcare and education",
      "Purpose-aligned companies",
      "Roles with clear positive impact",
    ],
    actionItems: [
      "Balance idealism with pragmatism",
      "Find purpose in any role",
      "Understand business needs",
      "Build sustainable impact",
      "Value financial sustainability",
    ],
    family: "motivation",
  },
  {
    id: "car-achievement",
    name: "The Achievement Seeker",
    tagline: "Driven by goals and progress",
    shortDesc:
      "You are motivated by success, targets, and growth. You enjoy improving and reaching higher levels.",
    fullDesc:
      "You are driven by goals, targets, and measurable progress. You are motivated by success, recognition, and improvement. You enjoy winning and advancing. You set increasingly higher goals and drive yourself to reach them. Achievement and progress are what drive you.",
    behavior: [
      "Set and pursue ambitious goals",
      "Measure progress and results",
      "Celebrate successes",
      "Seek recognition",
      "Drive for continuous improvement",
    ],
    strengths: [
      "High performer and self-starter",
      "Drive team results",
      "Achieve ambitious goals",
      "Personal growth and development",
      "Push for excellence",
    ],
    blindSpots: [
      "May overlook well-being",
      "Can be overly competitive",
      "Difficulty appreciating wins",
      "May burn out from overdriving",
      "Others see you as relentless",
    ],
    bestFit: [
      "Sales and business roles",
      "Commission-based positions",
      "Performance-driven environments",
      "Growth-focused companies",
      "Leadership and advancement roles",
    ],
    actionItems: [
      "Balance achievement with well-being",
      "Appreciate progress made",
      "Help others achieve goals",
      "Build sustainable pace",
      "Celebrate smaller wins",
    ],
    family: "motivation",
  },
  {
    id: "car-secure",
    name: "The Security Seeker",
    tagline: "Values stability and consistency",
    shortDesc:
      "You prioritize predictable income and low risk environments. Stability matters more than excitement.",
    fullDesc:
      "You are motivated by stability, consistency, and security. You value predictable income, job security, and low-risk environments. You prefer steady progress over risky ventures. You are comfortable in your current success and prioritize keeping what you have over pursuing higher risk opportunities.",
    behavior: [
      "Prioritize financial security",
      "Avoid unnecessary risks",
      "Build stable career path",
      "Value job security",
      "Prefer predictable roles",
    ],
    strengths: [
      "Reliable and consistent",
      "Build stable careers",
      "Minimize risk exposure",
      "Create peaceful work environments",
      "Maintain focus and dedication",
    ],
    blindSpots: [
      "May miss growth opportunities",
      "Can become too risk-averse",
      "Difficulty with change",
      "May stagnate in comfort",
      "Seem stuck to growth-focused people",
    ],
    bestFit: [
      "Established large organizations",
      "Government and civil service",
      "Union and protected roles",
      "Regulated industries",
      "Stable, predictable positions",
    ],
    actionItems: [
      "Balance security with growth",
      "Take calculated risks",
      "Develop resilience to changes",
      "Build skills despite comfort",
      "Maintain career progression",
    ],
    family: "motivation",
  },
  {
    id: "car-freedom",
    name: "The Freedom Seeker",
    tagline: "Wants control over time and life",
    shortDesc:
      "You value flexibility and independence. You dislike rigid systems and prefer choosing how you work.",
    fullDesc:
      "You are motivated by freedom and autonomy. You value flexibility in how and when you work. You dislike rigid schedules and imposed rules. Control over your time and choices is essential to your well-being. You will often sacrifice income or advancement for freedom.",
    behavior: [
      "Prioritize flexibility",
      "Resist rigid requirements",
      "Seek autonomous roles",
      "Question unnecessary rules",
      "Build control over time",
    ],
    strengths: [
      "Self-directed and motivated",
      "Maintain healthy work-life balance",
      "Create flexible arrangements",
      "Challenge unnecessary constraints",
      "Stay true to values",
    ],
    blindSpots: [
      "May struggle in traditional roles",
      "Can resist needed structure",
      "Difficulty with authority",
      "May leave before commitments",
      "Can seem unreliable to rigid cultures",
    ],
    bestFit: [
      "Remote work opportunities",
      "Freelance and contract work",
      "Flexible schedule roles",
      "Entrepreneurial ventures",
      "Results-only environments",
    ],
    actionItems: [
      "Find aligned work structures",
      "Build reliable reputation",
      "Learn to work within constraints",
      "Develop discipline",
      "Balance freedom with commitment",
    ],
    family: "motivation",
  },

  // ENERGY FAMILY
  {
    id: "car-highperf",
    name: "The High Performer",
    tagline: "Thrives under pressure",
    shortDesc:
      "You perform better when challenged. Pressure pushes you to deliver at a higher level.",
    fullDesc:
      "You perform at your best when challenged and under pressure. Deadlines, responsibility, and high stakes push you to deliver exceptional work. Easy tasks bore you. You thrive on challenge and adrenaline. You are most engaged when performing at your edge.",
    behavior: [
      "Seek challenging projects",
      "Rise to pressure situations",
      "Deliver under deadlines",
      "Take on stretch assignments",
      "Perform when stakes are high",
    ],
    strengths: [
      "Exceptional performance under pressure",
      "Deliver in critical moments",
      "Handle responsibility well",
      "Drive through challenges",
      "Excel in high-stake situations",
    ],
    blindSpots: [
      "May create unnecessary pressure",
      "Risk of burnout if unchecked",
      "Difficulty with slow-paced work",
      "Can seem reckless",
      "May avoid routine or boring tasks",
    ],
    bestFit: [
      "High-stakes industries",
      "Fast-paced environments",
      "Crisis management roles",
      "Sales and deal-making",
      "Emergency response positions",
    ],
    actionItems: [
      "Build sustainable pace",
      "Develop awareness of burnout signs",
      "Find meaning in routine work",
      "Create internal motivation",
      "Balance intensity with recovery",
    ],
    family: "energy",
  },
  {
    id: "car-steady",
    name: "The Steady Worker",
    tagline: "Consistent and balanced",
    shortDesc:
      "You prefer stability over intensity. You work best in calm, sustainable environments.",
    fullDesc:
      "You prefer a sustainable, balanced pace. You work best in calm, predictable environments. You are consistent and reliable. You prefer steady progress over intensity. This is not laziness—it's a preference for sustainable, maintainable work. You build reliability through consistency.",
    behavior: [
      "Maintain consistent pace",
      "Prefer calm environments",
      "Work sustainably",
      "Build relationships over time",
      "Focus on long-term contribution",
    ],
    strengths: [
      "Reliable and consistent",
      "Avoid mistakes through focus",
      "Maintain long-term productivity",
      "Support team stability",
      "Build deep expertise",
    ],
    blindSpots: [
      "May struggle with urgency",
      "Can seem unmotivated",
      "Difficulty with high-pressure situations",
      "May miss emergency response moments",
      "Can seem slow to action-oriented peers",
    ],
    bestFit: [
      "Stable, long-term roles",
      "Research and development",
      "Long-term project management",
      "Academic and educational roles",
      "Maintenance and operations",
    ],
    actionItems: [
      "Build capacity for intensity",
      "Develop emergency responsiveness",
      "Maintain passion and engagement",
      "Learn to handle pressure",
      "Balance steadiness with progress",
    ],
    family: "energy",
  },
  {
    id: "car-burnout",
    name: "The Burnout Prone",
    tagline: "Gives a lot, drains quickly",
    shortDesc:
      "You push yourself hard but struggle to sustain it. Without balance, you easily feel exhausted.",
    fullDesc:
      "You give a lot at work. You push yourself hard and often sacrifice your own needs for the job. But you struggle to sustain this pace. Without deliberate balance and boundaries, you quickly feel exhausted and overwhelmed. You need intentional self-care and recovery.",
    behavior: [
      "Give more than sustainable",
      "Struggle to say no",
      "Push past limits",
      "Neglect recovery",
      "Feel guilty taking breaks",
    ],
    strengths: [
      "Highly dedicated and committed",
      "Go above and beyond",
      "Care deeply about work",
      "Give exceptional effort",
      "Invest in success",
    ],
    blindSpots: [
      "Unsustainable pace",
      "Risk of serious burnout",
      "Damage to health and relationships",
      "Decreased long-term performance",
      "Model unhealthy work patterns",
    ],
    bestFit: [
      "Roles with clear boundaries",
      "Organizations valuing well-being",
      "Positions with sustainable pace",
      "Mentors who enforce boundaries",
      "Teams supporting balance",
    ],
    actionItems: [
      "Set and maintain strict boundaries",
      "Prioritize self-care intentionally",
      "Learn to say no",
      "Schedule recovery time",
      "Build professional relationships",
      "Track energy levels carefully",
    ],
    family: "energy",
  },
  {
    id: "car-avoider",
    name: "The Avoider",
    tagline: "Withdraws when overwhelmed",
    shortDesc:
      "You tend to delay or escape when pressure builds. You need structure and support to stay consistent.",
    fullDesc:
      "You tend to withdraw or delay when things become overwhelming. Pressure makes you want to escape rather than engage. You perform better with external structure, accountability, and support. You struggle with self-motivation under stress. You need environments that help you stay consistent.",
    behavior: [
      "Delay when overwhelmed",
      "Withdraw from pressure",
      "Need external motivation",
      "Procrastinate under stress",
      "Escape difficult situations",
    ],
    strengths: [
      "Understand need for support",
      "Perform well with structure",
      "Can maintain effort with accountability",
      "Recognize own needs",
      "Seek help when needed",
    ],
    blindSpots: [
      "Avoidance increases problems",
      "Miss deadlines",
      "Create crisis through delay",
      "Undependable under pressure",
      "Difficult to trust with critical work",
    ],
    bestFit: [
      "Roles with clear accountability",
      "Structured environments",
      "Supportive team cultures",
      "Positions with external deadlines",
      "Mentoring and coaching relationships",
    ],
    actionItems: [
      "Develop self-compassion",
      "Create accountability structures",
      "Build stress management skills",
      "Learn to face challenges",
      "Develop consistent effort habits",
      "Seek ongoing support and coaching",
    ],
    family: "energy",
  },

  // LEADERSHIP FAMILY
  {
    id: "car-natural",
    name: "The Natural Leader",
    tagline: "Leads with confidence",
    shortDesc:
      "You take charge easily and are comfortable making decisions. People tend to follow your direction.",
    fullDesc:
      "You are comfortable in leadership. You make decisions confidently, take charge naturally, and people tend to follow your direction. Leadership is not a burden for you—it energizes you. You are decisive and comfortable with responsibility. Others look to you for direction.",
    behavior: [
      "Take charge naturally",
      "Make decisions confidently",
      "Guide others easily",
      "Accept responsibility",
      "Inspire trust in leadership",
    ],
    strengths: [
      "Effective leadership",
      "Decisive and confident",
      "Inspire others",
      "Build trust naturally",
      "Navigate complex situations",
    ],
    blindSpots: [
      "May overlook others' input",
      "Can be overly commanding",
      "Difficulty listening",
      "May dominate discussions",
      "Others feel controlled",
    ],
    bestFit: [
      "Leadership and management roles",
      "Executive positions",
      "Entrepreneurial ventures",
      "Strategic leadership",
      "Crisis management",
    ],
    actionItems: [
      "Develop active listening",
      "Seek diverse input",
      "Balance confidence with humility",
      "Develop emotional intelligence",
      "Mentor others into leadership",
    ],
    family: "leadership",
  },
  {
    id: "car-support",
    name: "The Support Specialist",
    tagline: "Strengthens from behind",
    shortDesc:
      "You prefer supporting roles. You focus on stability, improvement, and helping systems run smoothly.",
    fullDesc:
      "You prefer supporting roles to leading from the front. You excel at strengthening systems, improving processes, and helping things run smoothly. You do not need visibility or authority—you want to contribute meaningfully. Your impact comes from stabilizing and improving.",
    behavior: [
      "Support from behind",
      "Improve systems and processes",
      "Focus on stability",
      "Help others succeed",
      "Build foundations",
    ],
    strengths: [
      "Build stable systems",
      "Improve operations",
      "Support team success",
      "Focus on what matters",
      "Create reliability",
    ],
    blindSpots: [
      "May be invisible in organization",
      "Limited advancement opportunities",
      "Can be taken for granted",
      "Difficulty getting recognition",
      "May feel unappreciated",
    ],
    bestFit: [
      "Operations and support roles",
      "Process improvement positions",
      "Administrative leadership",
      "COO or operations executive",
      "Infrastructure and foundation roles",
    ],
    actionItems: [
      "Increase visibility of impact",
      "Build leadership presence",
      "Develop stakeholder relationships",
      "Document contributions",
      "Seek recognition appropriately",
    ],
    family: "leadership",
  },
  {
    id: "car-reluctant",
    name: "The Reluctant Leader",
    tagline: "Leads only when needed",
    shortDesc:
      "You can lead, but it drains you. You prefer collaboration over authority.",
    fullDesc:
      "You can lead when necessary, but it does not energize you. Leadership feels like a responsibility rather than a calling. You prefer collaborative approaches to hierarchical authority. You would choose contribution to leading if given the option. Leadership costs you energy.",
    behavior: [
      "Lead when required",
      "Prefer collaboration",
      "Avoid spotlight",
      "Seek shared decision-making",
      "Drain from authority",
    ],
    strengths: [
      "Effective when leading",
      "Humble and grounded",
      "Empower others",
      "Build consensus",
      "Create inclusive teams",
    ],
    blindSpots: [
      "May avoid leadership opportunities",
      "Hesitate in critical moments",
      "Miss advancement due to reluctance",
      "Others may step in",
      "Can seem indecisive",
    ],
    bestFit: [
      "Collaborative team environments",
      "Distributed leadership models",
      "Peer-based organizations",
      "Consulting and advisory roles",
      "Project-based leadership",
    ],
    actionItems: [
      "Accept leadership when appropriate",
      "Build leadership confidence",
      "Find leadership style that fits",
      "Develop executive presence",
      "Balance collaboration with decisiveness",
    ],
    family: "leadership",
  },
  {
    id: "car-follower",
    name: "The Follower",
    tagline: "Works best with clear direction",
    shortDesc:
      "You are reliable when expectations are defined. You prefer guidance over leading.",
    fullDesc:
      "You work best with clear direction and guidance. You are reliable and committed when expectations are defined. You do not seek leadership—you prefer contributing within a structured framework. You are dependable, but need clear direction to perform at your best.",
    behavior: [
      "Ask for clear direction",
      "Follow processes reliably",
      "Respect authority",
      "Execute defined roles",
      "Seek guidance readily",
    ],
    strengths: [
      "Reliable and dependable",
      "Follow through on commitments",
      "Execute clearly defined work",
      "Respect organizational structure",
      "Support leadership effectively",
    ],
    blindSpots: [
      "Struggle without clear direction",
      "Limited initiative",
      "Depend on others for decisions",
      "Difficulty adapting alone",
      "Can seem unmotivated",
    ],
    bestFit: [
      "Structured organizational roles",
      "Individual contributor positions",
      "Clearly defined job roles",
      "Organizations with strong culture",
      "Regulated industries",
    ],
    actionItems: [
      "Build independent judgment",
      "Develop self-directed skills",
      "Take initiative gradually",
      "Seek mentorship and guidance",
      "Contribute ideas and suggestions",
    ],
    family: "leadership",
  },

  // CAREER DIRECTION FAMILY
  {
    id: "car-climber",
    name: "The Climber",
    tagline: "Focused on growth and advancement",
    shortDesc:
      "You aim to move upward. You are driven by progression, higher roles, and continuous improvement.",
    fullDesc:
      "You are focused on growth and progression. You aim to move up the career ladder. You are driven by advancement, higher roles, and continuous improvement. You set sights on roles ahead and work toward them. Your career path is upward.",
    behavior: [
      "Work toward higher roles",
      "Seek advancement opportunities",
      "Build skills for next level",
      "Network strategically",
      "Pursue continuous growth",
    ],
    strengths: [
      "Drive career progression",
      "Build career momentum",
      "Continuous development",
      "Achieve higher impact roles",
      "Model career growth",
    ],
    blindSpots: [
      "May neglect current role",
      "Overly focused on next level",
      "Can overlook relationships",
      "May lack patience",
      "Risk burning bridges in advancement",
    ],
    bestFit: [
      "Large organizations with hierarchy",
      "Growth-focused companies",
      "Leadership development programs",
      "Organizations with clear advancement",
      "Mentoring relationships",
    ],
    actionItems: [
      "Balance growth with current excellence",
      "Appreciate the journey",
      "Build relationships not just credentials",
      "Develop patience",
      "Help others advance too",
    ],
    family: "career-direction",
  },
  {
    id: "car-explorer",
    name: "The Explorer",
    tagline: "Still discovering the right path",
    shortDesc:
      "You are exploring different options. You value experience and learning over immediate stability.",
    fullDesc:
      "You are exploring what fits you. You are in discovery mode, trying different paths to understand what resonates. You value experience and learning over immediate stability. You have not yet settled on a direction. Your path is still forming.",
    behavior: [
      "Try different roles",
      "Seek diverse experiences",
      "Value learning",
      "Maintain flexibility",
      "Avoid early commitments",
    ],
    strengths: [
      "Discover what truly fits",
      "Build broad experience",
      "Stay flexible",
      "Learn continuously",
      "Adaptable to opportunities",
    ],
    blindSpots: [
      "Lack of clear direction",
      "May seem unfocused",
      "Limited deep expertise",
      "Difficult to plan ahead",
      "Others may see as uncommitted",
    ],
    bestFit: [
      "Rotational programs",
      "Consulting and advisory work",
      "Project-based roles",
      "Research and learning roles",
      "Early career mentoring",
    ],
    actionItems: [
      "Begin intentional exploration",
      "Document learnings",
      "Build decision criteria",
      "Identify patterns in preferences",
      "Prepare for eventual commitment",
    ],
    family: "career-direction",
  },
  {
    id: "car-specialist",
    name: "The Specialist",
    tagline: "Master of one field",
    shortDesc:
      "You prefer depth over variety. You focus on becoming highly skilled in a specific area.",
    fullDesc:
      "You are committed to mastery in a specific field. You prefer depth over breadth. You focus on becoming highly skilled and knowledgeable in your domain. You build deep expertise over time. Your career is about mastery, not variety.",
    behavior: [
      "Focus on one area deeply",
      "Build specialized expertise",
      "Seek advancement within field",
      "Develop mastery over time",
      "Contribute specialized knowledge",
    ],
    strengths: [
      "Become true expert",
      "High value from specialization",
      "Deep understanding",
      "Respected authority in field",
      "Solve specialized problems",
    ],
    blindSpots: [
      "Limited breadth of skill",
      "Difficulty pivoting careers",
      "Narrow view of possibilities",
      "May miss broader opportunities",
      "Field-dependent job market",
    ],
    bestFit: [
      "Specialized technical roles",
      "Expert-level positions",
      "Consulting roles",
      "Research and academic positions",
      "Domain-specific leadership",
    ],
    actionItems: [
      "Develop adjacent skills",
      "Stay current in field",
      "Build network in specialization",
      "Share expertise widely",
      "Plan for field changes",
    ],
    family: "career-direction",
  },
  {
    id: "car-drifter",
    name: "The Drifter",
    tagline: "Moving without clear direction",
    shortDesc:
      "You are unsure where you belong. You often follow opportunities without strong alignment.",
    fullDesc:
      "You are unsure of your career direction. You often follow opportunities without strong alignment to a larger vision. You are reactive rather than proactive about career choices. You have not yet clarified what you want. Your path is not intentional.",
    behavior: [
      "Follow opportunities",
      "React to job openings",
      "Lack clear direction",
      "Change roles without pattern",
      "Unclear decision criteria",
    ],
    strengths: [
      "Remain flexible",
      "Open to possibilities",
      "Try different things",
      "Adaptable to change",
      "No limiting self-beliefs",
    ],
    blindSpots: [
      "No clear career path",
      "Limited progression",
      "Lack of deep expertise",
      "Feel lost professionally",
      "Difficult to track growth",
    ],
    bestFit: [
      "Coaching and career guidance",
      "Mentorship relationships",
      "Roles allowing exploration",
      "Career development programs",
      "Organizations with flexibility",
    ],
    actionItems: [
      "Take career assessment",
      "Work with career coach",
      "Identify values and preferences",
      "Set intentional goals",
      "Create career vision",
    ],
    family: "career-direction",
  },
  {
    id: "car-builder",
    name: "The Builder",
    tagline: "Creates something of your own",
    shortDesc:
      "You are drawn to building systems, businesses, or projects. Ownership matters more than position.",
    fullDesc:
      "You are drawn to building and creating. You prefer ownership to position. You want to create something of your own—a business, system, project, or initiative. Ownership and creation drive you more than traditional career advancement. Your success is measured by what you build.",
    behavior: [
      "Seek ownership opportunities",
      "Build new things",
      "Take full responsibility",
      "Create systems",
      "Drive projects forward",
    ],
    strengths: [
      "Create and build effectively",
      "Take full ownership",
      "Build sustainable systems",
      "Inspire others to build",
      "See projects through",
    ],
    blindSpots: [
      "Difficulty working for others",
      "May struggle with role constraints",
      "High startup risk",
      "Difficulty handling feedback",
      "Can overcommit",
    ],
    bestFit: [
      "Entrepreneurial ventures",
      "Startup environments",
      "New initiative leadership",
      "Project ownership roles",
      "Organizations supporting ownership",
    ],
    actionItems: [
      "Build strong foundations first",
      "Learn sustainable growth",
      "Develop team skills",
      "Balance vision with execution",
      "Plan for scaling",
    ],
    family: "career-direction",
  },
];

export function getCareerTypesByFamily(family: CareerFamily): CareerType[] {
  return CAREER_TYPES.filter((type) => type.family === family);
}

export function getAllCareerTypes(): CareerType[] {
  return CAREER_TYPES;
}

export function getCareerType(id: string): CareerType | undefined {
  return CAREER_TYPES.find((type) => type.id === id);
}
