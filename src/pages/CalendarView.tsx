import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import './CalendarView.css';

const INITIAL_EVENTS = [
  { id: 1, date: 15, title: 'Math Midterm', type: 'red' },
  { id: 2, date: 15, title: 'Study Group', type: 'blue' },
  { id: 3, date: 5, title: 'Essay Draft Due', type: 'purple' },
  { id: 4, date: 22, title: 'Biology Lab', type: 'green' },
  { id: 5, date: 28, title: 'History Final', type: 'red' },
];

export const CalendarView: React.FC = () => {
  const [currentDate] = useState(new Date());
  const [events, setEvents] = useState(INITIAL_EVENTS);
  
  const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
  
  // Simplified for mocking: assumes month starts on Wednesday (offset 3)
  const firstDayOffset = 3; 

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOffset }, (_, i) => i);

  const handleAddEvent = (date?: number) => {
    const title = window.prompt(`Enter event title${date ? ` for ${currentMonthName} ${date}` : ''}:`);
    if (title) {
      const typeOptions = ['blue', 'purple', 'green', 'red'];
      const randomType = typeOptions[Math.floor(Math.random() * typeOptions.length)];
      setEvents([...events, { id: Date.now(), date: date || Math.floor(Math.random() * 28) + 1, title, type: randomType }]);
    }
  };

  const removeEvent = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (window.confirm("Delete this event?")) {
      setEvents(events.filter(ev => ev.id !== id));
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div>
          <h1>{currentMonthName} {currentYear}</h1>
          <p>Organize your study schedules and deadlines.</p>
        </div>
        <div className="calendar-controls">
          <button className="btn-secondary" style={{ padding: '0.5rem' }}><ChevronLeft /></button>
          <button className="btn-secondary" style={{ padding: '0.5rem' }}><ChevronRight /></button>
          <button className="btn-primary" onClick={() => handleAddEvent()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> New Event
          </button>
        </div>
      </div>

      <div className="glass-panel calendar-grid-container">
        <div className="calendar-days-header">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        <div className="calendar-grid">
          {blanks.map((blank) => (
            <div key={`blank-${blank}`} className="calendar-cell empty"></div>
          ))}
          
          {days.map((day) => {
            const isToday = day === currentDate.getDate();
            const dayEvents = events.filter(e => e.date === day);
            
            return (
              <div 
                key={day} 
                className={`calendar-cell ${isToday ? 'today' : ''}`}
                onClick={() => handleAddEvent(day)}
                style={{ cursor: 'pointer' }}
                title="Click to add event"
              >
                <span className="calendar-date">{day}</span>
                {dayEvents.map(event => (
                  <div 
                    key={event.id} 
                    className={`event-chip event-${event.type}`}
                    onClick={(e) => removeEvent(e, event.id)}
                    title="Click to delete"
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
