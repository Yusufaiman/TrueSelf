"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Compass, Sparkles, X } from "lucide-react";
import {
  TEST_CATEGORIES,
  getColorClasses,
  getIcon,
  type TestCategory,
} from "@/config/testCategories";
import type {
  TrueSelf16Profile,
  TypeFamily,
} from "@/lib/trueself-16/types";
import {
  TYPE_FAMILIES,
  TYPE_FAMILY_BY_CODE,
} from "@/lib/trueself-16/layers";
import { TypeDetailModal } from "@/components/types/TypeDetailModal";
import { FAMILY_COLORS, TYPE_COLORS } from "@/lib/trueself-16/colors";

type DomainTab = TestCategory["id"];

type DomainTypeProfile = {
  id: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  strengths: string[];
  dimensions: string[];
  growth: string[];
};

const DOMAIN_TYPE_PROFILES: Record<string, DomainTypeProfile[]> = {
  identity: [
    domainType("ID01", "The Self-Explorer", "Still discovering what feels true.", "You are actively comparing who you are internally with the version of you shaped by roles, expectations, and social context.", ["Self-questioning", "Reflection", "Growth openness"], ["Self-clarity", "Authenticity", "Social adaptation"], ["Name what is actually yours", "Separate values from expectations", "Practice clearer self-expression"]),
    domainType("ID02", "The Grounded Self", "Stable, clear, and internally aligned.", "You show a more consistent sense of self across situations, with values that stay visible even when the environment changes.", ["Consistency", "Values alignment", "Inner steadiness"], ["Identity stability", "Values alignment", "Authenticity"], ["Stay flexible without losing clarity", "Keep updating old self-beliefs", "Use stability as a base for growth"]),
    domainType("ID03", "The Adaptive Persona", "Flexible across people and settings.", "You naturally adjust your expression to fit context, which can be useful socially but may blur what feels most authentic.", ["Social reading", "Adaptability", "Context awareness"], ["Social adaptation", "External influence", "Expression gap"], ["Track when adaptation becomes self-erasure", "Protect private truth", "Choose where to be less edited"]),
    domainType("ID04", "The Values-Led Self", "Identity organized around personal principles.", "Your sense of self becomes clearest when your choices match what you believe matters, even if others do not fully understand it.", ["Conviction", "Meaning", "Personal integrity"], ["Values alignment", "Self-clarity", "External influence"], ["Translate values into daily choices", "Avoid rigid self-definition", "Let values evolve with evidence"]),
    domainType("ID05", "The Social Mirror", "You notice yourself through others.", "Feedback, approval, comparison, or social response may strongly affect how you understand yourself.", ["Empathy", "Social sensitivity", "Responsiveness"], ["External influence", "Social adaptation", "Self-concept"], ["Build inner reference points", "Pause before absorbing feedback", "Choose trusted mirrors carefully"]),
    domainType("ID06", "The Masked Self", "Protected, controlled, and carefully presented.", "You may hide important parts of yourself to stay safe, accepted, capable, or in control.", ["Composure", "Self-protection", "Situational awareness"], ["Social mask", "Expression gap", "Authenticity"], ["Reveal truth gradually", "Find safe contexts", "Notice what the mask is protecting"]),
    domainType("ID07", "The Rebuilding Self", "Reforming identity after change.", "You may be reassembling your self-concept after a shift, loss, transition, or realization that changed how you see yourself.", ["Resilience", "Honesty", "Reconstruction"], ["Identity stability", "Self-clarity", "Values alignment"], ["Let the new self be unfinished", "Keep one stable anchor", "Document what is changing"]),
    domainType("ID08", "The Integrated Self", "Inner truth and outer expression align.", "You show a stronger connection between who you are privately, how you act socially, and what you choose in life.", ["Authenticity", "Coherence", "Self-trust"], ["Authenticity", "Identity stability", "Values alignment"], ["Stay open to new evidence", "Use clarity without becoming fixed", "Help others without absorbing them"]),
  ],
  relationships: [
    domainType("RL01", "The Secure Connector", "Close, steady, and communicative.", "You are usually comfortable building closeness while keeping enough trust, communication, and security for relationships to feel stable.", ["Trust", "Warmth", "Repair"], ["Closeness", "Communication", "Security"], ["Keep naming needs early", "Do not assume others read stability the same way", "Protect mutual repair"]),
    domainType("RL02", "The Independent Connector", "Connected without losing autonomy.", "You value meaningful connection, but you also protect your own direction, interests, and personal space.", ["Autonomy", "Clear space", "Selective closeness"], ["Independence", "Trust", "Communication"], ["Tell people what space means", "Avoid disappearing when overwhelmed", "Let closeness coexist with freedom"]),
    domainType("RL03", "The Deep Bond Builder", "Depth, care, and emotional investment.", "You tend to invest deeply in important relationships and may prefer fewer connections that feel emotionally meaningful.", ["Loyalty", "Care", "Depth"], ["Emotional closeness", "Care expression", "Trust"], ["Balance depth with boundaries", "Check reciprocity", "Avoid over-investing too early"]),
    domainType("RL04", "The Careful Opener", "Trust grows gradually.", "You may take time before allowing people into your inner world, while still being capable of meaningful care once trust is earned.", ["Discernment", "Patience", "Loyalty"], ["Trust", "Closeness", "Security"], ["Let safe people in slowly", "Communicate your pace", "Separate caution from avoidance"]),
    domainType("RL05", "The Harmony Keeper", "Careful with tension, oriented toward peace.", "You may prioritize preserving connection and emotional calm, sometimes delaying direct disagreement to keep the relationship steady.", ["Peacemaking", "Care", "Sensitivity"], ["Conflict avoidance", "Care expression", "Accommodation"], ["Practice honest tension", "Do not confuse silence with peace", "Repair without self-erasing"]),
    domainType("RL06", "The Direct Resolver", "Clear, direct, and repair-oriented.", "You are more likely to address issues directly and clarify problems before they build into larger distance.", ["Directness", "Repair", "Clarity"], ["Conflict directness", "Communication", "Trust"], ["Pair truth with timing", "Make room for softer processors", "Keep repair warmer than the critique"]),
    domainType("RL07", "The Adaptive Partner", "Responsive to what the relationship needs.", "You can adjust between care, autonomy, communication, and compromise depending on the relationship context.", ["Flexibility", "Responsiveness", "Balance"], ["Adaptation", "Care", "Independence"], ["Know your non-negotiables", "Avoid over-adjusting", "Let patterns become explicit"]),
    domainType("RL08", "The Guarded Independent", "Autonomy first, closeness gradually.", "You may protect your independence and allow closeness more gradually, especially before trust is established.", ["Self-protection", "Independence", "Discernment"], ["Relational independence", "Trust", "Closeness"], ["Notice when protection becomes isolation", "Share expectations early", "Let trust be tested, not assumed"]),
  ],
  career: [
    domainType("CR01", "The Connector", "People, collaboration, and shared outcomes.", "You may find work more meaningful when it includes communication, team energy, service, and visible human impact.", ["Collaboration", "Communication", "Shared progress"], ["Social work", "Leadership", "Contribution"], ["Protect focus time", "Avoid people-pleasing through work", "Choose teams with healthy communication"]),
    domainType("CR02", "The Independent Specialist", "Autonomy, depth, and ownership.", "You do best when trusted with meaningful work and enough independence to solve problems your own way.", ["Autonomy", "Expertise", "Self-direction"], ["Work autonomy", "Problem complexity", "Structure preference"], ["Ask for clear outcomes", "Do not isolate from feedback", "Build sustainable work rhythm"]),
    domainType("CR03", "The Structured Builder", "Plans, systems, and reliable execution.", "You tend to thrive when responsibilities can be organized into clear steps, milestones, and measurable progress.", ["Organization", "Follow-through", "Reliability"], ["Structure", "Stability", "Achievement"], ["Keep flexibility in the plan", "Avoid over-controlling uncertainty", "Review systems as context changes"]),
    domainType("CR04", "The Creative Problem Solver", "Ideas, experimentation, and original solutions.", "You may work best where problems are open enough for invention, pattern recognition, and flexible experimentation.", ["Creativity", "Problem solving", "Exploration"], ["Creative expression", "Problem complexity", "Autonomy"], ["Finish before chasing novelty", "Build testing loops", "Translate ideas into usable output"]),
    domainType("CR05", "The Strategic Leader", "Direction, decisions, and momentum.", "You are drawn to work where you can set direction, make decisions, coordinate people or systems, and move toward outcomes.", ["Leadership", "Strategy", "Execution"], ["Leadership drive", "Achievement drive", "Autonomy"], ["Listen before directing", "Share ownership", "Balance speed with context"]),
    domainType("CR06", "The Stable Contributor", "Consistency, quality, and dependable output.", "You may prefer work that offers stability, clarity, and a chance to become trusted through reliable contribution.", ["Consistency", "Quality", "Dependability"], ["Stability", "Structure", "Achievement"], ["Avoid staying too long in undergrowth", "Ask for development paths", "Keep work meaningful, not just safe"]),
    domainType("CR07", "The Adaptive Operator", "Flexible, practical, and context-aware.", "You can shift with changing priorities and may be useful in work that needs responsiveness, problem-solving, and practical movement.", ["Adaptability", "Practicality", "Responsiveness"], ["Problem complexity", "Social work", "Structure"], ["Avoid constant urgency", "Document what works", "Make recovery part of performance"]),
    domainType("CR08", "The Mission-Driven Worker", "Purpose, contribution, and values-fit.", "You do your strongest work when the role connects to a mission, people, values, or a larger reason beyond tasks.", ["Purpose", "Commitment", "Values alignment"], ["Contribution", "Meaning", "Social impact"], ["Check practical sustainability", "Avoid over-identifying with work", "Choose missions with healthy systems"]),
  ],
  mind: [
    domainType("MN01", "The Adaptive Thinker", "Balanced reasoning and flexible perspective.", "Your mind may shift between analysis, pattern recognition, depth, and practical movement depending on the situation.", ["Flexibility", "Context reading", "Balanced processing"], ["Mental flexibility", "Decision style", "Uncertainty tolerance"], ["Name your decision criteria", "Avoid staying neutral too long", "Choose the mode the problem needs"]),
    domainType("MN02", "The Analytical Processor", "Logic, accuracy, and structured reasoning.", "You tend to trust clear reasoning, internal consistency, and careful evaluation before accepting an idea.", ["Analysis", "Precision", "Coherence"], ["Analytical processing", "Decision deliberation", "Depth"], ["Avoid over-analysis", "Test ideas in reality", "Leave room for human context"]),
    domainType("MN03", "The Intuitive Synthesizer", "Connections, patterns, and larger meaning.", "You may quickly connect ideas and recognize larger patterns before every step is consciously explicit.", ["Pattern recognition", "Synthesis", "Possibility"], ["Intuitive processing", "Conceptual depth", "Learning exploration"], ["Explain your leaps", "Ground insights in evidence", "Finish one thread before opening five"]),
    domainType("MN04", "The Deep Explorer", "Depth, complexity, and layered understanding.", "You like going beneath surface answers and may enjoy complex subjects that reward sustained attention.", ["Depth", "Curiosity", "Nuance"], ["Conceptual depth", "Focus", "Learning exploration"], ["Avoid complexity as avoidance", "Translate depth into action", "Set stopping points"]),
    domainType("MN05", "The Practical Solver", "Useful, grounded, and action-oriented.", "You prefer ideas that can be tested, applied, or made useful in the real world.", ["Practicality", "Action", "Testing"], ["Practical orientation", "Decision speed", "Focus"], ["Leave room for abstract insight", "Do not dismiss early-stage ideas", "Reflect after action"]),
    domainType("MN06", "The Flexible Learner", "Exploratory, active, and responsive.", "You learn through movement, experimentation, comparison, and changing approaches when the first method does not work.", ["Learning agility", "Experimentation", "Adaptation"], ["Learning exploration", "Mental flexibility", "Uncertainty tolerance"], ["Build retention systems", "Return to unfinished basics", "Practice depth when needed"]),
    domainType("MN07", "The Deliberate Decider", "Careful judgment before commitment.", "You prefer to slow down enough to compare options, consequences, and criteria before choosing.", ["Careful decisions", "Risk awareness", "Reflection"], ["Decision deliberation", "Analytical processing", "Focus"], ["Avoid decision paralysis", "Set deadlines", "Use enough data, not endless data"]),
    domainType("MN08", "The Focused Systemizer", "Order, structure, and mental organization.", "You like understanding how pieces fit into a system and may think best when information is organized clearly.", ["Systems thinking", "Organization", "Focus"], ["Focus consistency", "Analytical processing", "Structure"], ["Stay flexible with messy inputs", "Do not over-systemize people", "Make space for discovery"]),
  ],
  motivation: [
    domainType("MV01", "The Security Builder", "Stability, safety, and preparation.", "You are motivated by protecting the future, reducing risk, and creating a stable base before moving forward.", ["Preparation", "Stability", "Responsibility"], ["Security", "Stability", "Progress"], ["Do not let safety become stagnation", "Define enough preparation", "Take measured risks"]),
    domainType("MV02", "The Autonomy Seeker", "Freedom, choice, and self-direction.", "You move best when you feel ownership over your time, methods, and direction.", ["Independence", "Ownership", "Self-direction"], ["Autonomy", "Challenge", "Growth"], ["Communicate your constraints", "Build accountability without control", "Choose freedom with structure"]),
    domainType("MV03", "The Achievement Driver", "Progress, challenge, and visible wins.", "You are energized by goals, momentum, performance, and the sense that your effort is creating measurable progress.", ["Ambition", "Momentum", "Execution"], ["Achievement", "Challenge", "Recognition"], ["Do not turn worth into output", "Rest before depletion", "Make goals meaningful"]),
    domainType("MV04", "The Purpose Builder", "Meaning, contribution, and personal why.", "Motivation increases when the task connects to something that matters beyond completion itself.", ["Meaning", "Contribution", "Conviction"], ["Purpose", "Contribution", "Growth"], ["Translate purpose into habits", "Avoid waiting for perfect meaning", "Protect practical needs"]),
    domainType("MV05", "The Growth Seeker", "Development, learning, and becoming better.", "You are motivated by improvement, skill-building, feedback, and seeing yourself develop over time.", ["Learning", "Improvement", "Curiosity"], ["Growth", "Challenge", "Progress"], ["Celebrate current ability", "Avoid endless self-fixing", "Use feedback selectively"]),
    domainType("MV06", "The Recognition Striver", "Being seen, valued, and affirmed.", "External acknowledgment can strongly activate effort, especially when it confirms that your contribution matters.", ["Visibility", "Validation", "Performance"], ["Recognition", "Achievement", "Contribution"], ["Build inner validation", "Choose healthy audiences", "Separate visibility from worth"]),
    domainType("MV07", "The Challenge Activator", "Difficulty wakes up your energy.", "You may become more engaged when there is a problem to solve, a limit to push, or a meaningful obstacle to overcome.", ["Challenge", "Energy", "Competitiveness"], ["Challenge", "Autonomy", "Achievement"], ["Avoid creating pressure to feel alive", "Choose worthy challenges", "Recover after intensity"]),
    domainType("MV08", "The Contribution Giver", "Helping, usefulness, and shared impact.", "You feel more motivated when your effort benefits others, supports a team, or contributes to something shared.", ["Service", "Usefulness", "Care"], ["Contribution", "Purpose", "Recognition"], ["Avoid over-giving", "Name your needs", "Let contribution include yourself"]),
  ],
  growth: [
    domainType("GR01", "SEE-led Growth", "Insight before change.", "You grow by noticing patterns clearly before trying to change them.", ["Pattern awareness", "Reflection", "Insight"], ["See", "Self-awareness", "Learning"], ["Move from insight to experiment", "Do not analyze forever", "Track one pattern at a time"]),
    domainType("GR02", "ACCEPT-led Growth", "Acceptance before movement.", "You grow when you can face reality without denial, defensiveness, or self-attack.", ["Honesty", "Acceptance", "Self-compassion"], ["Accept", "Feedback", "Discomfort tolerance"], ["Acceptance is not resignation", "Name the next action", "Practice receiving truth gently"]),
    domainType("GR03", "ADAPT-led Growth", "Adjustment through feedback.", "You grow by changing strategy when new information shows that the old approach is not working.", ["Flexibility", "Feedback use", "Responsiveness"], ["Adapt", "Change", "Recovery"], ["Avoid constant pivoting", "Keep core commitments", "Document lessons"]),
    domainType("GR04", "CONTINUE-led Growth", "Consistency after motivation fades.", "You grow by staying with the chosen action long enough for the new pattern to become real.", ["Discipline", "Persistence", "Follow-through"], ["Continue", "Self-discipline", "Setback recovery"], ["Use smaller commitments", "Expect friction", "Reward consistency, not intensity"]),
    domainType("GR05", "The Reflective Learner", "Experience becomes self-knowledge.", "You turn experiences into lessons and may grow fastest when you review what happened and why.", ["Reflection", "Learning", "Self-awareness"], ["Reflective learning", "See", "Feedback"], ["Do not stop at insight", "Test the lesson", "Share learning with action"]),
    domainType("GR06", "The Resilient Rebuilder", "Setbacks become reset points.", "You can recover from difficulty by extracting a lesson and rebuilding with more honesty.", ["Resilience", "Recovery", "Adaptation"], ["Setback recovery", "Accept", "Adapt"], ["Rest before rebuilding", "Avoid romanticizing struggle", "Ask for support sooner"]),
    domainType("GR07", "The Discipline Builder", "Growth through structure.", "You develop through routines, systems, and repeated action.", ["Structure", "Consistency", "Practice"], ["Self-discipline", "Continue", "Growth mindset"], ["Keep structure humane", "Adjust before quitting", "Let routines serve growth"]),
    domainType("GR08", "The Flexible Developer", "Growth through experimentation.", "You improve by trying, adjusting, and learning through iteration.", ["Experimentation", "Flexibility", "Curiosity"], ["Adapt", "Discomfort tolerance", "Learning"], ["Choose one experiment at a time", "Measure what works", "Avoid novelty without integration"]),
  ],
  "stress-emotions": [
    domainType("SE01", "Contextual / Balanced Response", "Mixed, flexible, and situation-dependent.", "Your stress and emotional response may change depending on context rather than following one extreme pattern.", ["Flexibility", "Context awareness", "Balanced response"], ["Regulation", "Expression", "Recovery"], ["Notice what each context triggers", "Name your patterns sooner", "Build consistent recovery anchors"]),
    domainType("SE02", "The Overstimulated Responder", "Pressure rises quickly.", "You may become flooded or activated when too many demands, emotions, or uncertainties stack together.", ["Sensitivity", "Urgency awareness", "Energy"], ["Stress reactivity", "Emotional intensity", "Recovery"], ["Reduce inputs", "Slow the body first", "Use simpler next steps"]),
    domainType("SE03", "The Internal Processor", "Emotion moves inward first.", "You may need private processing before you can clearly express what you feel or need.", ["Reflection", "Containment", "Depth"], ["Emotional clarity", "Expression", "Recovery"], ["Signal when you need time", "Return to the conversation", "Avoid disappearing into silence"]),
    domainType("SE04", "The Direct Expresser", "Emotion comes out visibly.", "You may express stress or emotion outwardly and need direct channels for repair and clarity.", ["Expressiveness", "Honesty", "Release"], ["Expression", "Regulation", "Communication"], ["Pair expression with grounding", "Repair quickly", "Check impact after intensity"]),
    domainType("SE05", "The Recovery Seeker", "You need deliberate reset time.", "Your system may recover best when rest, space, routine, or low-stimulation time is protected.", ["Recovery awareness", "Boundaries", "Self-care"], ["Recovery", "Regulation", "Stress load"], ["Schedule recovery before collapse", "Tell others what reset means", "Reduce shame around needing space"]),
    domainType("SE06", "The Controlled Container", "Composed outside, pressured inside.", "You may hold emotional pressure in a controlled way, which can look stable while still costing energy internally.", ["Composure", "Responsibility", "Control"], ["Expression", "Regulation", "Stress sensitivity"], ["Release pressure safely", "Let trusted people see more", "Watch for delayed burnout"]),
    domainType("SE07", "The Emotional Clarifier", "Understanding emotion restores control.", "You regain steadiness when you can name what you feel, why it is happening, and what it is asking for.", ["Clarity", "Self-understanding", "Emotional insight"], ["Understand", "Notice", "Regulate"], ["Name feelings earlier", "Do not intellectualize everything", "Turn clarity into support"]),
    domainType("SE08", "The Pressure Adapter", "You adjust under strain.", "You may become highly resourceful under pressure, but too much adaptation can hide how much strain you are carrying.", ["Adaptability", "Resourcefulness", "Endurance"], ["Coping flexibility", "Stress recovery", "Regulation"], ["Do not normalize overload", "Ask for help before breaking point", "Let adaptation include rest"]),
  ],
  life: [
    domainType("LF01", "The Grounded Connector", "Life feels meaningful when it includes belonging.", "Your current life may feel most aligned when direction, people, stability, and daily experience connect.", ["Belonging", "Groundedness", "Meaning"], ["Connection", "Life balance", "Alignment"], ["Protect meaningful relationships", "Clarify direction", "Make belonging mutual"]),
    domainType("LF02", "The Direction Seeker", "Looking for a clearer next chapter.", "You may be searching for direction, priorities, or a stronger sense of where your life is heading.", ["Questioning", "Reflection", "Possibility"], ["Life direction", "Future outlook", "Meaning"], ["Choose one next experiment", "Stop waiting for total certainty", "Let direction emerge through action"]),
    domainType("LF03", "The Alignment Builder", "Bringing life back toward values.", "You are trying to make your daily choices, environment, and commitments fit more closely with what matters.", ["Values", "Adjustment", "Integrity"], ["Lifestyle alignment", "Values", "Personal agency"], ["Change one misaligned pattern", "Make values practical", "Review commitments"]),
    domainType("LF04", "The Experience Explorer", "Learning through life in motion.", "You may want life to feel active, varied, and experientially alive rather than overly fixed.", ["Experience", "Variety", "Curiosity"], ["Life experience", "Future outlook", "Agency"], ["Balance exploration with roots", "Finish open loops", "Choose meaningful novelty"]),
    domainType("LF05", "The Future Planner", "Stability through long-range direction.", "You feel more settled when there is a clear future path, preparation, and a sense of strategic movement.", ["Planning", "Preparation", "Direction"], ["Future outlook", "Life direction", "Security"], ["Stay open to new evidence", "Do not postpone living", "Make the plan flexible"]),
    domainType("LF06", "The Balance Restorer", "Trying to recover rhythm and capacity.", "Your current life may need more balance, recovery, and sustainable pacing before deeper alignment becomes clear.", ["Recovery", "Sustainability", "Honesty"], ["Life balance", "Stress load", "Satisfaction"], ["Reduce overload", "Rebuild rhythm", "Treat rest as data"]),
    domainType("LF07", "The Meaning Builder", "Purpose is being made, not found all at once.", "You may create meaning through values, contribution, relationships, learning, and deliberate choices.", ["Purpose", "Contribution", "Reflection"], ["Meaning", "Connection", "Direction"], ["Make meaning actionable", "Avoid abstract purpose loops", "Notice what gives energy"]),
    domainType("LF08", "The Transition Navigator", "Between old life and new direction.", "You may be in a season where old structures no longer fit, but the new shape is still forming.", ["Transition", "Adaptability", "Self-honesty"], ["Change style", "Future outlook", "Identity"], ["Allow the in-between", "Keep one grounding practice", "Make temporary plans"]),
  ],
};

function domainType(
  code: string,
  name: string,
  tagline: string,
  description: string,
  strengths: string[],
  dimensions: string[],
  growth: string[],
): DomainTypeProfile {
  return { id: `${code}-${name}`, code, name, tagline, description, strengths, dimensions, growth };
}

interface TrueSelfTypesExplorerProps {
  profiles: TrueSelf16Profile[];
  families: Array<
    typeof TYPE_FAMILIES[TypeFamily] & { profiles: TrueSelf16Profile[] }
  >;
}

export function TrueSelfTypesExplorer({
  profiles,
  families,
}: TrueSelfTypesExplorerProps) {
  const [activeDomain, setActiveDomain] = useState<DomainTab>("personality");
  const [selectedType, setSelectedType] = useState<TrueSelf16Profile | null>(
    null,
  );
  const [selectedDomainType, setSelectedDomainType] =
    useState<DomainTypeProfile | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedType || selectedDomainType ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedType(null);
        setSelectedDomainType(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedType, selectedDomainType]);

  const activeCategory =
    TEST_CATEGORIES.find((category) => category.id === activeDomain) ||
    TEST_CATEGORIES[0];
  const activeColor = getColorClasses(activeCategory.color);
  const activeIcon = getIcon(activeCategory.icon);
  const activeDomainTypes = DOMAIN_TYPE_PROFILES[activeDomain] || [];
  const isPersonality = activeDomain === "personality";

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 via-cyan-50/50 to-white px-6 py-20 text-center md:py-24">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <Sparkles size={16} />
            TrueSelf Type Library
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Explore every TrueSelf type system
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Personality is only one domain. Browse the type patterns behind
            identity, relationships, career, mind, motivation, growth, stress,
            and life too.
          </p>
          <Link
            href={activeCategory.href}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-md transition hover:from-blue-600 hover:to-cyan-600"
          >
            Take {activeCategory.testName}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {TEST_CATEGORIES.map((category) => {
            const Icon = getIcon(category.icon);
            const colors = getColorClasses(category.color);
            const active = activeDomain === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveDomain(category.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition ${
                  active
                    ? `${colors.bg} ${colors.text} ${colors.border}`
                    : "border-slate-200 bg-white text-slate-500 hover:text-slate-900"
                }`}
              >
                <Icon size={15} />
                {category.name}
              </button>
            );
          })}
        </div>

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {isPersonality
                ? "Explore all 16 personality types"
                : `Explore ${activeCategory.name} types`}
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              {isPersonality
                ? "Tap any type to open a deeper profile with overview, analytics, background, life expression, and growth tabs."
                : `Tap any ${activeCategory.name.toLowerCase()} type to open its overview, signals, strengths, and growth path.`}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
            {React.createElement(activeIcon, { size: 16, className: activeColor.text })}
            {isPersonality
              ? "4 axes · 16 outcomes"
              : `${activeDomainTypes.length} ${activeCategory.name.toLowerCase()} patterns`}
          </div>
        </div>

        {isPersonality ? (
          <>
            <div className="mb-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {families.map((family) => {
                const color = FAMILY_COLORS[family.code];

                return (
                  <article
                    key={family.code}
                    className="rounded-2xl border bg-white p-5 shadow-sm"
                    style={{ borderColor: color.border }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="text-3xl font-black"
                        style={{ color: color.accent }}
                      >
                        {family.code}
                      </span>
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{ backgroundColor: color.soft, color: color.accent }}
                      >
                        {family.name}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {family.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {family.profiles.map((profile) => (
                        <span
                          key={profile.code}
                          className="rounded-full px-3 py-1 text-xs font-semibold"
                          style={{
                            backgroundColor: TYPE_COLORS[profile.code].soft,
                            color: TYPE_COLORS[profile.code].accent,
                          }}
                        >
                          {profile.code}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {profiles.map((profile) => {
                const family = TYPE_FAMILIES[TYPE_FAMILY_BY_CODE[profile.code]];
                const color = TYPE_COLORS[profile.code];

                return (
                  <PersonalityTypeCard
                    key={profile.code}
                    profile={profile}
                    family={family}
                    color={color}
                    onOpen={() => setSelectedType(profile)}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {activeDomainTypes.map((profile) => (
              <DomainTypeCard
                key={profile.id}
                profile={profile}
                category={activeCategory}
                onOpen={() => setSelectedDomainType(profile)}
              />
            ))}
          </div>
        )}
      </section>

      {selectedType && (
        <TypeDetailModal
          profile={selectedType}
          color={TYPE_COLORS[selectedType.code]}
          onClose={() => setSelectedType(null)}
        />
      )}

      {selectedDomainType && (
        <DomainTypeModal
          profile={selectedDomainType}
          category={activeCategory}
          onClose={() => setSelectedDomainType(null)}
        />
      )}
    </div>
  );
}

function PersonalityTypeCard({
  profile,
  family,
  color,
  onOpen,
}: {
  profile: TrueSelf16Profile;
  family: typeof TYPE_FAMILIES[TypeFamily];
  color: { accent: string; soft: string; border: string };
  onOpen: () => void;
}) {
  return (
    <article
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      className="flex h-full cursor-pointer flex-col rounded-2xl border bg-white p-6 shadow-sm outline-none transition hover:-translate-y-1 hover:shadow-lg focus:ring-4"
      style={{
        borderColor: color.border,
        ["--tw-ring-color" as string]: color.soft,
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className="text-3xl font-black tracking-tight"
          style={{ color: color.accent }}
        >
          {profile.code}
        </span>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: color.soft, color: color.accent }}
        >
          {family.code} · {family.name}
        </span>
      </div>
      <h3 className="text-xl font-bold text-slate-900">{profile.name}</h3>
      <p className="mt-1 text-sm italic text-slate-500">{profile.tagline}</p>
      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
        {profile.description}
      </p>
      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Core strengths
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.strengths.map((strength) => (
            <span
              key={strength}
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: color.soft,
                color: color.accent,
              }}
            >
              {strength}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm font-semibold" style={{ color: color.accent }}>
          View full profile
        </p>
      </div>
    </article>
  );
}

function DomainTypeCard({
  profile,
  category,
  onOpen,
}: {
  profile: DomainTypeProfile;
  category: TestCategory;
  onOpen: () => void;
}) {
  const colors = getColorClasses(category.color);

  return (
    <article
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      className={`flex h-full cursor-pointer flex-col rounded-2xl border bg-white p-6 shadow-sm outline-none transition hover:-translate-y-1 hover:shadow-lg focus:ring-4 ${colors.border}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className={`text-3xl font-black tracking-tight ${colors.text}`}>
          {profile.code}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colors.bg} ${colors.text}`}>
          {category.name}
        </span>
      </div>
      <h3 className="text-xl font-bold text-slate-900">{profile.name}</h3>
      <p className="mt-1 text-sm italic text-slate-500">{profile.tagline}</p>
      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
        {profile.description}
      </p>
      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Core signals
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.strengths.map((strength) => (
            <span
              key={strength}
              className={`rounded-full px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}
            >
              {strength}
            </span>
          ))}
        </div>
        <p className={`mt-4 text-sm font-semibold ${colors.text}`}>
          View full profile
        </p>
      </div>
    </article>
  );
}

function DomainTypeModal({
  profile,
  category,
  onClose,
}: {
  profile: DomainTypeProfile;
  category: TestCategory;
  onClose: () => void;
}) {
  const colors = getColorClasses(category.color);
  const Icon = getIcon(category.icon);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="types-modal-scrollbar-hidden scrollbar-hidden max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur md:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${colors.bg} ${colors.text}`}>
                  <Icon size={14} />
                  {category.name}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  TrueSelf Domain Type
                </span>
              </div>
              <p className={`mt-4 text-5xl font-black tracking-tight md:text-6xl ${colors.text}`}>
                {profile.code}
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">
                {profile.name}
              </h2>
              <p className="mt-2 max-w-3xl text-sm italic leading-6 text-slate-500">
                {profile.tagline}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
              aria-label="Close domain type detail"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-6 p-5 md:p-8">
          <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex items-center gap-2">
                <Compass size={20} className={colors.text} />
                <h3 className="text-lg font-bold text-slate-900">
                  Type overview
                </h3>
              </div>
              <p className="text-sm leading-7 text-slate-700">
                {profile.description}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                This type belongs to the {category.name.toLowerCase()} domain.
                It does not replace your personality type; it adds a focused
                layer to your connected TrueSelf profile.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center gap-2">
                <BarChart3 size={20} className={colors.text} />
                <h3 className="text-lg font-bold text-slate-900">
                  Measured dimensions
                </h3>
              </div>
              <div className="space-y-3">
                {profile.dimensions.map((dimension) => (
                  <div key={dimension} className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-bold text-slate-900">{dimension}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      One of the signals that helps this domain pattern become
                      visible in assessment results.
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-bold text-slate-900">
                Strength signals
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.strengths.map((strength) => (
                  <span
                    key={strength}
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${colors.bg} ${colors.text}`}
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-bold text-slate-900">Growth path</h3>
              <div className="mt-4 space-y-3">
                {profile.growth.map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm leading-6 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <div className="flex justify-center">
            <Link
              href={category.href}
              className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r px-5 py-3 font-semibold text-white shadow-md transition ${category.colorClass}`}
            >
              Take {category.testName}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
