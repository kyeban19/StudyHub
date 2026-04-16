import React, { useState } from 'react';
import { BookOpen, Calendar as CalendarIcon, CheckSquare, Users, X } from 'lucide-react';
import './Dashboard.css';

const INITIAL_ACTIVITIES = [
  { id: 1, text: 'Completed "Biology Chapter 4" Quiz', time: '2 hours ago', score: '95%', color: 'var(--accent-blue)' },
  { id: 2, text: 'Joined Video Room "Calculus Study Group"', time: 'Yesterday', score: undefined, color: 'var(--accent-purple)' },
  { id: 3, text: 'Created 20 new Flashcards for "History 101"', time: 'Yesterday', score: undefined, color: 'var(--accent-green)' }
];

export const Dashboard: React.FC = () => {
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);

  const removeActivity = (id: number) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back! 👋</h1>
        <p>Here's what's happening with your studies today.</p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card glass-panel">
          <div className="stat-icon bg-blue">
            <CheckSquare size={24} />
          </div>
          <div className="stat-info">
            <h3>Pending Tasks</h3>
            <p>5</p>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon bg-purple">
            <CalendarIcon size={24} />
          </div>
          <div className="stat-info">
            <h3>Events Today</h3>
            <p>2</p>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon bg-green">
            <BookOpen size={24} />
          </div>
          <div className="stat-info">
            <h3>Flashcards Due</h3>
            <p>12</p>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon bg-red">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>Study Groups</h3>
            <p>1</p>
          </div>
        </div>
      </div>

      <div className="recent-activity glass-panel">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {activities.length === 0 ? (
             <p style={{ color: 'var(--text-secondary)' }}>No recent activity to show.</p>
          ) : (
            activities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-dot" style={{ backgroundColor: activity.color }}></div>
                <div className="activity-content">
                  <p>{activity.text}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
                {activity.score && (
                  <span className="score" style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>{activity.score}</span>
                )}
                <button 
                  onClick={() => removeActivity(activity.id)} 
                  className="btn-secondary" 
                  style={{ border: 'none', padding: '0.25rem', opacity: 0.5 }}
                  title="Dismiss"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
