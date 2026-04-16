import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Plus, Shuffle } from 'lucide-react';
import './Flashcards.css';

const INITIAL_DECK = [
  { id: 1, question: 'What is the powerhouse of the cell?', answer: 'Mitochondria' },
  { id: 2, question: 'What is the sum of the angles in a triangle?', answer: '180 degrees' },
  { id: 3, question: 'Who wrote "Romeo and Juliet"?', answer: 'William Shakespeare' },
  { id: 4, question: 'What is the chemical symbol for Gold?', answer: 'Au' },
];

export const Flashcards: React.FC = () => {
  const [deck, setDeck] = useState(INITIAL_DECK);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = deck[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => Math.min(prev + 1, deck.length - 1));
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }, 150);
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const shuffleDeck = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const shuffled = [...deck].sort(() => Math.random() - 0.5);
      setDeck(shuffled);
      setCurrentIndex(0);
    }, 150);
  };

  return (
    <div className="flashcards-container">
      <div className="flashcards-header">
        <h1>Flashcards</h1>
        <p>Review your custom decks with spaced repetition.</p>
      </div>

      <div className="flashcards-deck-container">
        <div className="deck-controls">
          <select className="glass-panel" style={{ padding: '0.5rem 1rem', borderRadius: '8px' }}>
            <option>General Knowledge Mix</option>
            <option>Biology 101</option>
            <option>History Exam Prep</option>
          </select>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-secondary" onClick={shuffleDeck} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shuffle size={18} /> Shuffle
            </button>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={18} /> Create Deck
            </button>
          </div>
        </div>

        {currentCard && (
          <div className="flashcard-scene" onClick={toggleFlip}>
            <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}>
              <div className="flashcard-face flashcard-front">
                <span className="card-label">Question</span>
                <div className="flashcard-content">{currentCard.question}</div>
                <span className="card-hint">Click to flip <RotateCw size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '0.25rem' }}/></span>
              </div>
              
              <div className="flashcard-face flashcard-back">
                <span className="card-label">Answer</span>
                <div className="flashcard-content">{currentCard.answer}</div>
                <span className="card-hint">Click to flip back</span>
              </div>
            </div>
          </div>
        )}

        <div className="action-controls">
          <button 
            className="btn-nav" 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={20} /> Previous
          </button>
          
          <div className="progress-indicator">
            {deck.length > 0 ? currentIndex + 1 : 0} / {deck.length}
          </div>

          <button 
            className="btn-nav" 
            onClick={handleNext}
            disabled={currentIndex === deck.length - 1}
          >
            Next <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
