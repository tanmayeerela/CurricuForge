import { BloomLevel, SkillLevel } from './types';
export const APP_NAME = 'CurricuForge';
export const GEMINI_MODEL_TEXT = 'gemini-3-flash-preview';
export const SKILL_LEVEL_OPTIONS = [
  { value: SkillLevel.BEGINNER, label: 'Beginner' },
  { value: SkillLevel.INTERMEDIATE, label: 'Intermediate' },
  { value: SkillLevel.ADVANCED, label: 'Advanced' },
];
export const BLOOM_LEVEL_OPTIONS = [
  { value: BloomLevel.REMEMBER, label: 'Remember' },
  { value: BloomLevel.UNDERSTAND, label: 'Understand' },
  { value: BloomLevel.APPLY, label: 'Apply' },
  { value: BloomLevel.ANALYZE, label: 'Analyze' },
  { value: BloomLevel.EVALUATE, label: 'Evaluate' },
  { value: BloomLevel.CREATE, label: 'Create' },
];
