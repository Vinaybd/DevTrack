function TaskList({ tasks, onTaskComplete }) {
  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>
          <span>{task.title}</span>

          <button onClick={() => onTaskComplete(task.id)}>
            {task.completed ? 'Completed' : 'Complete'}
          </button>
        </div>
      ))}
    </div>
  )
}

export default TaskList