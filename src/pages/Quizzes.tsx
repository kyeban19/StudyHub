import React, { useState } from 'react';
import { CheckCircle, ArrowRight, RotateCcw, Plus, Save, X } from 'lucide-react';
import './Quizzes.css';

const INITIAL_QUIZ = [
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
  const [quizQuestions, setQuizQuestions] = useState(INITIAL_QUIZ);
  
  // Playing states
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  // Builder states
  const [isBuilding, setIsBuilding] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);
  const [newCorrectAnswer, setNewCorrectAnswer] = useState(0);

  // Playing logic
  const handleNext = () => {
    if (selectedOption === null) return;
    if (selectedOption === quizQuestions[currentStep].correctAnswer) {
      setScore(score + 1);
    }
    if (currentStep < quizQuestions.length - 1) {
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
    setIsBuilding(false);
  };

  // Builder logic
  const handleOptionChange = (idx: number, val: string) => {
    const updatedOptions = [...newOptions];
    updatedOptions[idx] = val;
    setNewOptions(updatedOptions);
  };

  const handleCreateQuestion = () => {
    if (!newQuestion.trim() || newOptions.some(opt => !opt.trim())) {
      alert("Please fill out the question and all options!");
      return;
    }
    const newQList = [...quizQuestions, {
      id: Date.now(),
      question: newQuestion,
      options: newOptions,
      correctAnswer: newCorrectAnswer
    }];
    setQuizQuestions(newQList);
    setNewQuestion("");
    setNewOptions(["", "", "", ""]);
    setNewCorrectAnswer(0);
    setIsBuilding(false);
    
    // Automatically restart so the new question is included in the flow
    setCurrentStep(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="quiz-page">
      <div className="quiz-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Practice Quizzes</h1>
          <p>Test your knowledge with custom generated quizzes.</p>
        </div>
        {!isBuilding && !isFinished && (
          <button className="btn-secondary" onClick={() => setIsBuilding(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Make a Quiz Question
          </button>
        )}
      </div>

      <div className="quiz-container">
        {isBuilding ? (
           <div className="quiz-card glass-panel" style={{ padding: '2rem' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
               <h2>Create New Question</h2>
               <button className="btn-secondary" onClick={() => setIsBuilding(false)} style={{ padding: '0.5rem', border: 'none' }}>
                 <X size={18} />
               </button>
             </div>
             
             <div style={{ marginBottom: '1.5rem' }}>
               <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Question text</label>
               <input 
                 style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-tertiary)', color: 'white' }}
                 value={newQuestion}
                 onChange={(e) => setNewQuestion(e.target.value)}
                 placeholder="e.g. What is the powerhouse of the cell?"
               />
             </div>

             <div className="options-builder" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
               <label style={{ display: 'block', color: 'var(--text-secondary)' }}>Answers (select the correct one)</label>
               {newOptions.map((opt, idx) => (
                 <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                   <input 
                     type="radio" 
                     name="correctAnswer" 
                     checked={newCorrectAnswer === idx} 
                     onChange={() => setNewCorrectAnswer(idx)} 
                     style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                   />
                   <input 
                     style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: newCorrectAnswer === idx ? '1px solid var(--accent-green)' : '1px solid var(--glass-border)', background: 'rgba(255, 255, 255, 0.03)', color: 'white' }}
                     value={opt}
                     onChange={(e) => handleOptionChange(idx, e.target.value)}
                     placeholder={`Option ${idx + 1}`}
                   />
                 </div>
               ))}
             </div>

             <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
               <button className="btn-primary" onClick={handleCreateQuestion} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <Save size={18} /> Add to Quiz
               </button>
             </div>
           </div>
        ) : !isFinished && quizQuestions.length > 0 ? (
          <div className="quiz-card glass-panel">
            <div className="quiz-progress">
              {quizQuestions.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`progress-bar-segment ${idx < currentStep ? 'completed' : idx === currentStep ? 'active' : ''}`}
                >
                  <div className="progress-bar-fill"></div>
                </div>
              ))}
            </div>

            <div className="quiz-question-container">
              <span className="question-number">Question {currentStep + 1} of {quizQuestions.length}</span>
              <h2 className="question-text">{quizQuestions[currentStep].question}</h2>
            </div>

            <div className="options-container">
              {quizQuestions[currentStep].options.map((option, idx) => (
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
                {currentStep === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                {currentStep === quizQuestions.length - 1 ? <CheckCircle size={18} /> : <ArrowRight size={18} />}
              </button>
            </div>
          </div>
        ) : (
          <div className="quiz-card glass-panel result-screen">
            <h2>Quiz Completed!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Here's how you did on this practice run.</p>
            
            <div className="score-circle">
              {Math.round((score / Math.max(1, quizQuestions.length)) * 100)}%
            </div>
            
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
              You got {score} out of {quizQuestions.length} correct.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn-secondary" onClick={() => setIsBuilding(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} /> Add More Questions
              </button>          
              <button className="btn-primary" onClick={handleRestart} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <RotateCcw size={18} /> Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
