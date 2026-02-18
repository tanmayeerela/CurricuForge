import React from 'react';
import { Curriculum, LearningOutcome, Module } from '../types';
interface CurriculumDisplayProps {
  curriculum: Curriculum;
}
const LearningOutcomeItem: React.FC<{ outcome: LearningOutcome }> = ({ outcome }) => (
  <li className="flex items-center text-gray-700">
    <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
    <span className="font-medium">{outcome.description}</span>
    <span className="ml-2 text-sm px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
      {outcome.bloomLevel}
    </span></li>
);
const ModuleDisplay: React.FC<{ module: Module; index: number }> = ({ module, index }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-indigo-500">
    <h3 className="text-2xl font-semibold text-indigo-700 mb-3">
      Module {index + 1}: {module.title}
    </h3>
    <p className="text-gray-700 mb-4">{module.description}</p>
    <div className="mb-6">
      <h4 className="text-lg font-medium text-gray-800 mb-2">Key Topics:</h4>
      <ul className="list-disc list-inside space-y-1">
        {module.topics.map((topic, i) => (
          <li key={i} className="text-gray-700">{topic}</li>
        ))}
      </ul></div>
    <div>
      <h4 className="text-lg font-medium text-gray-800 mb-2">Learning Outcomes:</h4>
      <ul className="space-y-2">
        {module.learningOutcomes.map((outcome, i) => (
          <LearningOutcomeItem key={i} outcome={outcome} />
        ))}
      </ul></div></div>
);
const CurriculumDisplay: React.FC<CurriculumDisplayProps> = ({ curriculum }) => {
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl mt-8 mb-8 animate-fade-in">
      <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-6">
        {curriculum.courseTitle}
      </h2>
      <p className="text-xl text-center text-gray-600 mb-10 leading-relaxed">
        {curriculum.courseDescription}
      </p>
      <section className="mb-12">
        <h3 className="text-3xl font-bold text-indigo-700 mb-6 border-b-2 pb-2 border-indigo-200">
          Course Modules
        </h3>
        <div className="space-y-8">
          {curriculum.modules.map((module, index) => (
            <ModuleDisplay key={index} module={module} index={index} />
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-3xl font-bold text-indigo-700 mb-6 border-b-2 pb-2 border-indigo-200">
          Assessment Methods
        </h3>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          {curriculum.assessments.map((assessment, index) => (
            <li key={index} className="flex items-center">
                <svg className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.725c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
                {assessment}
            </li>
          ))}
        </ul></section></div>
  );};
export default CurriculumDisplay;