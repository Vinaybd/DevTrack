import { useState } from 'react'
import ProgressCard from './ProgressCard'
import TaskList from './TaskList'

function Dashboard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete React practice',
      completed: false
    },
    {
      id: 2,
      title: 'Solve DSA problem',
      completed: false
    }
  ])

  const completedTasks = tasks.filter(task => task.completed).length

  function handleTaskComplete(id) {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  return (
    <main>
      <h1>Welcome to DevTrack</h1>
      <p>Track your daily development progress.</p>

      <ProgressCard
        title="Today's Progress"
        completed={completedTasks}
        label="tasks completed"
      />

      <h2>Today's Tasks</h2>

      <TaskList
        tasks={tasks}
        onTaskComplete={handleTaskComplete}
      />
    </main>
  )
}

export default Dashboard