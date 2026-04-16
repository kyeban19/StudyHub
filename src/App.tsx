import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { Dashboard } from './pages/Dashboard';
import { VideoRoom } from './pages/VideoRoom';
import { CalendarView } from './pages/CalendarView';
import { Flashcards } from './pages/Flashcards';
import { Quizzes } from './pages/Quizzes';
import { GClassTasks } from './pages/GClassTasks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="video" element={<VideoRoom />} />
          <Route path="calendar" element={<CalendarView />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="tasks" element={<GClassTasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
