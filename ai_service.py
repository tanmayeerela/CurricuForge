import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

def generate_curriculum(subject, level, duration):
    # Check if API key is missing or placeholder - use demo mode
    if not api_key or api_key == "your_key_here" or api_key == "sk-test-key-placeholder":
        # Return structured demo curriculum
        return f"""CURRICULUM: {subject.upper()}

Skill Level: {level}
Duration: {duration}

==================================
📚 COURSE STRUCTURE
==================================

Module 1: Introduction to {subject}
Week 1-2: Fundamentals & Core Concepts
- Topics: Basic principles, foundational theory
- Bloom's Taxonomy Level: Remember, Understand
- Activities: Lectures, reading materials, concept mapping
- Assessment: Knowledge checks, quizzes

Module 2: Core Concepts & Hands-on Practice
Week 3-4: Applied Learning
- Topics: Practical applications, case studies
- Bloom's Taxonomy Level: Apply, Analyze
- Activities: Hands-on projects, problem-solving exercises
- Assessment: Project assignments, case analysis

Module 3: Advanced Topics & Integration
Week 5-6: Synthesis & Evaluation
- Topics: Advanced concepts, industry best practices
- Bloom's Taxonomy Level: Evaluate, Create
- Activities: Capstone project, real-world scenarios
- Assessment: Final project, portfolio review

==================================
🎯 LEARNING OUTCOMES
==================================
✓ Master fundamental concepts of {subject}
✓ Apply theoretical knowledge to practical situations
✓ Analyze complex problems systematically
✓ Evaluate solutions critically
✓ Create innovative approaches and solutions

==================================
📊 BLOOM'S TAXONOMY DISTRIBUTION
==================================
Remember: 15% | Understand: 20% | Apply: 25%
Analyze: 20% | Evaluate: 12% | Create: 8%

==================================
💼 INDUSTRY ALIGNMENT
==================================
✓ Current market demand
✓ Professional certifications and standards
✓ Real-world applications
✓ Future skill development
✓ Career advancement opportunities"""
    
    # Use real OpenAI API if key is available
    try:
        client = OpenAI(api_key=api_key)
        
        prompt = f"""You are an expert academic curriculum designer specializing in creating comprehensive, structured learning programs.

Generate a detailed and structured curriculum for:

Subject: {subject}
Skill Level: {level}
Duration: {duration}

Please provide the curriculum in this exact format:

CURRICULUM: [SUBJECT NAME]

Skill Level: [level]
Duration: [duration]

==================================
COURSE STRUCTURE
==================================
[List modules with week numbers, topics, and learning levels]

==================================
LEARNING OUTCOMES
==================================
[List 5-6 specific, measurable learning outcomes]

==================================
BLOOM'S TAXONOMY DISTRIBUTION
==================================
[Show percentage breakdown of cognitive levels]

==================================
INDUSTRY ALIGNMENT
==================================
[List industry relevance and career benefits]

==================================
ASSESSMENT METHODS
==================================
[List assessment strategies and evaluation methods]
"""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )

        return response.choices[0].message.content
        
    except Exception as e:
        return f"Error connecting to OpenAI: {str(e)}\n\nPlease:\n1. Check your internet connection\n2. Verify your OpenAI API key in the .env file\n3. Make sure your API key is valid and has credits"
