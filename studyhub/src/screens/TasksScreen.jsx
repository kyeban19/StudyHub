import { useState } from 'react'

const initialTasks = [
  { id: 1, name: 'Submit Lab Report – Photosynthesis', subject: 'Science', due: '3:00 PM', urgent: true, done: false },
  { id: 2, name: 'Math Problem Set – Module 4', subject: 'Math', due: '5:00 PM', urgent: true, done: false },
  { id: 3, name: 'Read Noli Me Tangere Ch. 3', subject: 'Filipino', due: '6:00 PM', urgent: false, done: true },
  { id: 4, name: 'Essay Draft – Comparative Analysis', subject: 'English', due: 'Apr 15', urgent: false, done: false },
  { id: 5, name: 'Group Presentation – APEC Nations', subject: 'AP', due: 'Apr 17', urgent: false, done: false },
  { id: 6, name: 'Quarterly Exam – Gen. Math', subject: 'Math', due: 'Apr 19', urgent: false, done: false },
  { id: 7, name: 'Research Paper Outline – Climate', subject: 'Science', due: 'Apr 21', urgent: false, done: false },
  { id: 8, name: 'PE Portfolio Submission', subject: 'PE', due: 'Apr 22', urgent: false, done: false },
]

const subjectColors = {
  Math:    'bg-indigo-100 text-indigo-800',
  Science: 'bg-green-100 text-green-800',
  English: 'bg-yellow-100 text-yellow-800',
  Filipino:'bg-pink-100 text-pink-800',
  AP:      'bg-purple-100 text-purple-800',
  PE:      'bg-red-100 text-red-800',
}

export default function TasksScreen() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [newTask, setNewTask] = useState({ name: '', subject: 'Math', due: '' })

  const filters = ['All', 'Today', 'Upcoming', 'Done']

  const filtered = tasks.filter(t => {
    if (filter === 'Done') return t.done
    if (filter === 'Today') return t.urgent && !t.done
    if (filter === 'Upcoming') return !t.urgent && !t.done
    return true
  })

  const toggle = (id) =>
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))

  const addTask = () => {
    if (!newTask.name.trim()) return
    setTasks([...tasks, { ...newTask, id: Date.now(), urgent: false, done: false }])
    setNewTask({ name: '', subject: 'Math', due: '' })
    setShowModal(false)
  }

  const remaining = tasks.filter(t => !t.done).length

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-12 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">My Tasks</h1>
          <p className="text-xs text-gray-400">{remaining} tasks remaining</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-xl font-light"
        >+</button>
      </div>

      {/* Filter tabs */}
      <div className="bg-white border-b border-gray-100 px-4 py-2 flex gap-2 overflow-x-auto">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              filter === f ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >{f}</button>
        ))}
      </div>

      {/* Task list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2">
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 text-sm mt-10">No tasks here!</div>
        )}
        {filtered.map(task => (
          <div
            key={task.id}
            onClick={() => toggle(task.id)}
            className="bg-white rounded-xl border border-gray-100 px-3 py-3 flex items-start gap-3 cursor-pointer active:scale-95 transition-transform"
          >
            <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors ${
              task.done ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'
            }`}>
              {task.done && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm leading-snug ${task.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {task.name}
              </p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${subjectColors[task.subject] || 'bg-gray-100 text-gray-600'}`}>
                  {task.subject}
                </span>
                <span className={`text-xs ${task.urgent && !task.done ? 'text-red-500' : 'text-gray-400'}`}>
                  {task.due}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-2xl w-full max-w-md p-5 flex flex-col gap-3">
            <h2 className="text-base font-semibold text-gray-900">Add Task</h2>
            <input
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400"
              placeholder="Task name"
              value={newTask.name}
              onChange={e => setNewTask({ ...newTask, name: e.target.value })}
            />
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
              value={newTask.subject}
              onChange={e => setNewTask({ ...newTask, subject: e.target.value })}
            >
              {Object.keys(subjectColors).map(s => <option key={s}>{s}</option>)}
            </select>
            <input
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400"
              placeholder="Due date (e.g. Apr 20)"
              value={newTask.due}
              onChange={e => setNewTask({ ...newTask, due: e.target.value })}
            />
            <div className="flex gap-2 mt-1">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-500">Cancel</button>
              <button onClick={addTask} className="flex-1 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium">Add Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}