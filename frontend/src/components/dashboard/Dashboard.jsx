import { useEffect, useMemo, useState } from 'react'
import ProgressCard from './ProgressCard'
import TaskList from './TaskList'

const initialTasks = [
  {
    id: 1,
    title: 'Complete React practice',
    completed: false,
    priority: 'High'
  },
  {
    id: 2,
    title: 'Solve DSA problem',
    completed: true,
    priority: 'Medium'
  },
  {
    id: 3,
    title: 'Review backend API contract',
    completed: false,
    priority: 'Low'
  }
]

function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('devtrack-tasks')
    return savedTasks ? JSON.parse(savedTasks) : initialTasks
  })
  const [newTask, setNewTask] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('Medium')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('devtrack-tasks', JSON.stringify(tasks))
  }, [tasks])

  const completedTasks = useMemo(
    () => tasks.filter(task => task.completed).length,
    [tasks]
  )

  const pendingTasks = tasks.length - completedTasks
  const progressPercent = tasks.length === 0
    ? 0
    : Math.round((completedTasks / tasks.length) * 100)

  const visibleTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  function handleTaskComplete(id) {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  function handleDeleteTask(id) {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== id))
  }

  function handleEditTask(id, updatedTitle) {
    const trimmedTitle = updatedTitle.trim()
    if (!trimmedTitle) return

    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === id
          ? { ...task, title: trimmedTitle }
          : task
      )
    )
  }

  function handleAddTask(event) {
    if (event && event.preventDefault) event.preventDefault()
    // debug aid: log when handler runs
    // eslint-disable-next-line no-console
    console.log('handleAddTask called', { newTask, selectedPriority })

    const trimmedTask = newTask.trim()
    if (!trimmedTask) return

    setTasks(currentTasks => [
      {
        id: Date.now(),
        title: trimmedTask,
        completed: false,
        priority: selectedPriority
      },
      ...currentTasks
    ])
    setNewTask('')
    setSelectedPriority('Medium')
  }

  return (
    <main className="dashboard-shell">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">Productivity dashboard</p>
          <h1>Welcome to DevTrack</h1>
        </div>
        <div className="streak-badge">
          <span>🔥</span>
          <div>
            <strong>5 day</strong>
            <small>focus streak</small>
          </div>
        </div>
      </section>

      <p className="subtitle">Track your daily development progress and stay consistent.</p>

      <section className="stats-grid">
        <ProgressCard title="Today's Progress" completed={completedTasks} label="tasks completed" />
        <ProgressCard title="Remaining" completed={pendingTasks} label="tasks left" />
        <ProgressCard title="Completion" completed={`${progressPercent}%`} label="done" />
      </section>

      <section className="task-panel">
        <form className="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            value={newTask}
            onChange={event => setNewTask(event.target.value)}
            placeholder="Add a new task..."
            aria-label="Add a new task"
          />

          <select
            value={selectedPriority}
            onChange={event => setSelectedPriority(event.target.value)}
            aria-label="Select task priority"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button type="button" onClick={handleAddTask}>Add task</button>
        </form>

        <div className="task-toolbar">
          <h2>Today's Tasks</h2>

          <div className="filter-group" aria-label="Task filters">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
            <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
            <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Done</button>
          </div>
        </div>

        <TaskList
          tasks={visibleTasks}
          onTaskComplete={handleTaskComplete}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      </section>
    </main>
  )
}

export default Dashboard