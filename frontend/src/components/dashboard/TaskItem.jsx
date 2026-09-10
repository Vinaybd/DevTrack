


function TaskItem({ title , completed, onComplete }) {

  return (
    <div>
      <span>{title}</span>

      <button onClick={onComplete}>
        {completed ? 'Completed' : 'Complete'}
      </button>
    </div>
  )
}

export default TaskItem