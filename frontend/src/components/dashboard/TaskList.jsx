import TaskItem from './TaskItem'

function TaskList({ tasks, onTaskComplete, onDeleteTask, onEditTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks in this view yet.</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={() => onTaskComplete(task.id)}
          onDelete={() => onDeleteTask(task.id)}
          onEdit={value => onEditTask(task.id, value)}
        />
      ))}
    </div>
  )
}

export default TaskList