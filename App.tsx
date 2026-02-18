import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import CurriculumDisplay from './components/CurriculumDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { Curriculum, CurriculumGenerationConfig } from './types';
import { generateCurriculum } from './services/geminiService';
const App: React.FC = () => {
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleGenerateCurriculum = useCallback(
    async (config: CurriculumGenerationConfig) => {
      setLoading(true);
      setError(null);
      setCurriculum(null);
      try {
        const generatedCurriculum = await generateCurriculum(config);
        setCurriculum(generatedCurriculum);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred during curriculum generation.');
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <section className="py-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-indigo-800 mb-4 leading-tight">
            CurricuForge: AI-Powered Curriculum Design
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Automatically design structured curricula, learning outcomes, and assessments in seconds.
            Empower educators to create industry-aligned academic programs efficiently.
          </p>
        </section>
        <section className="my-8">
          <InputForm onSubmit={handleGenerateCurriculum} loading={loading} />
        </section>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {curriculum && (
          <section className="my-12">
            <CurriculumDisplay curriculum={curriculum} />
          </section>
        )}
      </main>
      <Footer /></div>
  );};
export default App;