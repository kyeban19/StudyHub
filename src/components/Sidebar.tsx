import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Video, Calendar, Layers, PenTool, CheckSquare } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/video', label: 'Study Rooms', icon: Video },
  { path: '/calendar', label: 'Calendar', icon: Calendar },
  { path: '/flashcards', label: 'Flashcards', icon: Layers },
  { path: '/quizzes', label: 'Quizzes', icon: PenTool },
  { path: '/tasks', label: 'GClass Tasks', icon: CheckSquare },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon"></div>
          <h2>StudyHub</h2>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon className="nav-icon" size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
