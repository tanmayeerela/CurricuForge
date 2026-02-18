import React, { useState, useCallback } from 'react';
import Button from './Button';
import Select from './Select';
import CheckboxGroup from './CheckboxGroup';
import { BloomLevel, CurriculumGenerationConfig, SkillLevel } from '../types';
import { BLOOM_LEVEL_OPTIONS, SKILL_LEVEL_OPTIONS } from '../constants';
interface InputFormProps {
  onSubmit: (config: CurriculumGenerationConfig) => void;
  loading: boolean;
}
const InputForm: React.FC<InputFormProps> = ({ onSubmit, loading }) => {
  const [subject, setSubject] = useState<string>('');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(SkillLevel.BEGINNER);
  const [duration, setDuration] = useState<string>('');
  const [bloomLevels, setBloomLevels] = useState<BloomLevel[]>([]);
  const handleSubmit = useCallback((event: React.FormEvent) =>{
  event.preventDefault();
  if (!subject || !duration) {
    alert('Please fill in Subject and Duration.');
    return;
    }
    onSubmit({ subject, skillLevel, duration, bloomLevels });
  }, [subject, skillLevel, duration, bloomLevels, onSubmit]);
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Design Your Curriculum</h2>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g., Data Science, Web Development"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
          required
        />
      </div>
      <Select
        id="skillLevel"
        name="skillLevel"
        label="Skill Level"
        options={SKILL_LEVEL_OPTIONS}
        value={skillLevel}
        onChange={(e) => setSkillLevel(e.target.value as SkillLevel)}
      />
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
          Duration <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="e.g., 8 weeks, 3 months"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
          required
        />
      </div>
      <CheckboxGroup
        label="Bloom's Taxonomy Levels (optional)"
        name="bloomLevels"
        options={BLOOM_LEVEL_OPTIONS}
        selectedValues={bloomLevels}
        onChange={(values) => setBloomLevels(values as BloomLevel[])}
      />
      <Button type="submit" loading={loading} className="w-full">
        Generate Curriculum
      </Button></form>
  );
};
export default InputForm;