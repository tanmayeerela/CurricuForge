// types.ts

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

export enum BloomLevel {
  REMEMBER = 'Remember',
  UNDERSTAND = 'Understand',
  APPLY = 'Apply',
  ANALYZE = 'Analyze',
  EVALUATE = 'Evaluate',
  CREATE = 'Create',
}

export interface LearningOutcome {
  description: string;
  bloomLevel: BloomLevel;
}

export interface Module {
  title: string;
  description: string;
  topics: string[];
  learningOutcomes: LearningOutcome[];
}

export interface Curriculum {
  courseTitle: string;
  courseDescription: string;
  modules: Module[];
  assessments: string[];
}

export interface CurriculumGenerationConfig {
  subject: string;
  skillLevel: SkillLevel;
  duration: string;
  bloomLevels: BloomLevel[];
}
