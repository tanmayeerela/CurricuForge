import { GoogleGenAI, Type } from '@google/genai';
import { Curriculum, CurriculumGenerationConfig, BloomLevel } from '../types';
import { GEMINI_MODEL_TEXT } from '../constants';

/**
 * Initializes the GoogleGenAI client with the API key from environment variables.
 * @returns An instance of GoogleGenAI.
 */
const getGeminiClient = (): GoogleGenAI => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Generates a curriculum using the Gemini API based on the provided configuration.
 * @param config The configuration for curriculum generation (subject, skill level, duration, Bloom's Taxonomy levels).
 * @returns A Promise that resolves to the generated Curriculum object.
 * @throws An error if the API call fails or the response is not in the expected format.
 */
export const generateCurriculum = async (
  config: CurriculumGenerationConfig,
): Promise<Curriculum> => {
  const ai = getGeminiClient();

  const bloomLevelsString =
    config.bloomLevels.length > 0
      ? `Ensure learning outcomes are mapped to the following Bloom's Taxonomy levels: ${config.bloomLevels.join(', ')}.`
      : '';
  const prompt = `
  You are an expert curriculum designer. Design a comprehensive and structured curriculum based on the following requirements:
  Subject: ${config.subject}
  Skill Level: ${config.skillLevel}
  Duration: ${config.duration}
  ${bloomLevelsString}
  The curriculum should be detailed and include the following:
  1.  An overall course title.
  2.  A concise course description.
  3.  A list of modules, each with:
      a.  A clear module title.
      b.  A brief module description.
      c.  A list of key topics covered within the module.
      d.  A list of specific learning outcomes for the module, each clearly stating the outcome and mapping it to an appropriate Bloom's Taxonomy level from the given list (${Object.values(BloomLevel).join(', ')}).
  4.  A list of suggested assessment methods for the entire course (e.g., quizzes, projects, exams, presentations).

  Return the response in JSON format according to the specified schema.
  `;
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            courseTitle: {
              type: Type.STRING,
              description: 'The overall title of the course.',
            },
            courseDescription: {
              type: Type.STRING,
              description: 'A brief description of the course content and goals.',
            },
            modules: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: {
                    type: Type.STRING,
                    description: 'The title of the module.',
                  },
                  description: {
                    type: Type.STRING,
                    description: 'A brief description of the module content.',
                  },
                  topics: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.STRING,
                    },
                    description: 'Key topics covered in the module.',
                  },
                  learningOutcomes: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        description: {
                          type: Type.STRING,
                          description: 'The learning outcome description.',
                        },
                        bloomLevel: {
                          type: Type.STRING,
                          enum: Object.values(BloomLevel),
                          description:
                            'The Bloom\'s Taxonomy level for this learning outcome.',
                        },
                      },
                      required: ['description', 'bloomLevel'],
                    },
                    description: 'Learning outcomes for the module.',
                  },
                },
                required: ['title', 'description', 'topics', 'learningOutcomes'],
              },
              description: 'A list of course modules.',
            },
            assessments: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
              description: 'Suggested assessment methods for the course.',
            },
          },
          required: [
            'courseTitle',
            'courseDescription',
            'modules',
            'assessments',
          ],
          propertyOrdering: [
            'courseTitle',
            'courseDescription',
            'modules',
            'assessments',
          ],
        },
      },
    });
    const jsonStr = response.text?.trim();
    if (!jsonStr) {
      throw new Error('No curriculum data received from the AI.');
    }

    const curriculum: Curriculum = JSON.parse(jsonStr);
    if (
      !curriculum.courseTitle ||
      !curriculum.modules ||
      !Array.isArray(curriculum.modules)
    ) {
      throw new Error('Invalid curriculum structure received from the AI.');
    }
    return curriculum;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error generating curriculum:', error.message);
      throw new Error(
        `Failed to generate curriculum: ${error.message}. Please try again.`,
      );
    }
    console.error('Unknown error during curriculum generation:', error);
    throw new Error('An unknown error occurred during curriculum generation.');
  }
};
