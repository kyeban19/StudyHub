import React, { useState } from 'react';
import { CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';
import './Quizzes.css';

const MOCK_QUIZ = [
  {
    id: 1,
    question: "What is the Big O complexity of binary search?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which of the following is NOT a hook in React?",
    options: ["useState", "useEffect", "useHistory", "useFetch"],
    correctAnswer: 3
  },
  {
    id: 3,
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Coded Styling Source"],
    correctAnswer: 1
  }
];

export const Quizzes: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleNext = () => {
    if (selectedOption === null) return;

    if (selectedOption === MOCK_QUIZ[currentStep].correctAnswer) {
      setScore(score + 1);
    }

    if (currentStep < MOCK_QUIZ.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h1>Practice Quizzes</h1>
        <p>Test your knowledge with custom generated quizzes.</p>
      </div>

      <div className="quiz-container">
        {!isFinished ? (
          <div className="quiz-card glass-panel">
            <div className="quiz-progress">
              {MOCK_QUIZ.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`progress-bar-segment ${idx < currentStep ? 'completed' : idx === currentStep ? 'active' : ''}`}
                >
                  <div className="progress-bar-fill"></div>
                </div>
              ))}
            </div>

            <div className="quiz-question-container">
              <span className="question-number">Question {currentStep + 1} of {MOCK_QUIZ.length}</span>
              <h2 className="question-text">{MOCK_QUIZ[currentStep].question}</h2>
            </div>

            <div className="options-container">
              {MOCK_QUIZ[currentStep].options.map((option, idx) => (
                <div 
                  key={idx}
                  className={`quiz-option ${selectedOption === idx ? 'selected' : ''}`}
                  onClick={() => setSelectedOption(idx)}
                >
                  <div className="option-marker">
                    <div className="option-marker-dot"></div>
                  </div>
                  <span>{option}</span>
                </div>
              ))}
            </div>

            <div className="quiz-actions">
              <button 
                className="btn-primary" 
                onClick={handleNext}
                disabled={selectedOption === null}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                {currentStep === MOCK_QUIZ.length - 1 ? 'Finish Quiz' : 'Next Question'}
                {currentStep === MOCK_QUIZ.length - 1 ? <CheckCircle size={18} /> : <ArrowRight size={18} />}
              </button>
            </div>
          </div>
        ) : (
          <div className="quiz-card glass-panel result-screen">
            <h2>Quiz Completed!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Here's how you did on this practice run.</p>
            
            <div className="score-circle">
              {Math.round((score / MOCK_QUIZ.length) * 100)}%
            </div>
            
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
              You got {score} out of {MOCK_QUIZ.length} correct.
            </p>
            
            <button className="btn-primary" onClick={handleRestart} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <RotateCcw size={18} /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
