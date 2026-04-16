import React, { useState } from 'react';
import { RefreshCw, CheckCircle, Circle, Clock, Book, Filter } from 'lucide-react';
import './GClassTasks.css';

const MOCK_TASKS = [
  {
    id: 1,
    course: "CS101: Intro to Computer Science",
    title: "Programming Assignment 3: Data Structures",
    dueDate: "Today, 11:59 PM",
    dueSoon: true,
    completed: false
  },
  {
    id: 2,
    course: "History 204: World War II",
    title: "Read Chapter 5 & Discussion Board Post",
    dueDate: "Tomorrow, 8:00 AM",
    dueSoon: true,
    completed: false
  },
  {
    id: 3,
    course: "Math 301: Linear Algebra",
    title: "Problem Set 4",
    dueDate: "Friday, 5:00 PM",
    dueSoon: false,
    completed: false
  },
  {
    id: 4,
    course: "Biology 101",
    title: "Lab Report: Cell Mitosis",
    dueDate: "Past Due",
    dueSoon: true,
    completed: true
  }
];

export const GClassTasks: React.FC = () => {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1500);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="gclass-container">
      <div className="gclass-header">
        <div className="gclass-header-text">
          <h1>
            <span className="gclass-icon">
              <Book size={24} color="#1a73e8" />
            </span>
            Classroom Tasks
          </h1>
          <p>Your assignments synced from Google Classroom.</p>
        </div>
        
        <button 
          className={`sync-btn ${isSyncing ? 'syncing' : ''}`} 
          onClick={handleSync}
          disabled={isSyncing}
        >
          <RefreshCw size={18} className="sync-icon" />
          {isSyncing ? 'Syncing...' : 'Sync with Classroom'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
         <button 
           className={`btn-secondary ${filter === 'all' ? 'active-filter' : ''}`} 
           onClick={() => setFilter('all')}
           style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: filter === 'all' ? 'rgba(88, 166, 255, 0.1)' : 'transparent', borderColor: filter === 'all' ? 'var(--accent-blue)' : 'var(--glass-border)' }}
         >
           <Filter size={16} /> All
         </button>
         <button 
           className={`btn-secondary ${filter === 'pending' ? 'active-filter' : ''}`} 
           onClick={() => setFilter('pending')}
           style={{ background: filter === 'pending' ? 'rgba(88, 166, 255, 0.1)' : 'transparent', borderColor: filter === 'pending' ? 'var(--accent-blue)' : 'var(--glass-border)' }}
         >
           Pending
         </button>
         <button 
           className={`btn-secondary ${filter === 'completed' ? 'active-filter' : ''}`} 
           onClick={() => setFilter('completed')}
           style={{ background: filter === 'completed' ? 'rgba(88, 166, 255, 0.1)' : 'transparent', borderColor: filter === 'completed' ? 'var(--accent-blue)' : 'var(--glass-border)' }}
         >
           Completed
         </button>
      </div>

      <div className="tasks-container">
        {filteredTasks.length === 0 ? (
           <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No tasks found for this filter.</p>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className={`task-card glass-panel ${task.completed ? 'completed' : ''}`}>
              <button className={`task-status ${task.completed ? 'completed' : ''}`} onClick={() => toggleTask(task.id)}>
                {task.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
              </button>
              
              <div className="task-content">
                <div className="task-course">{task.course}</div>
                <h3 className="task-title">{task.title}</h3>
                
                <div className="task-meta">
                  <span className={`meta-item ${task.dueSoon && !task.completed ? 'due-soon' : ''}`}>
                    <Clock size={16} />
                    <span className="due-date">Due: {task.dueDate}</span>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
