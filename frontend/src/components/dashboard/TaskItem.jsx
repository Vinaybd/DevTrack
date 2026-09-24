
import { useState } from 'react'

function TaskItem({ task, onComplete, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(task.title)

  function handleSave() {
    onEdit(draftTitle)
    setIsEditing(false)
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-main">
        <button
          className="task-toggle"
          onClick={onComplete}
          aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
        >
          {task.completed ? '✓' : ''}
        </button>

        {isEditing ? (
          <div className="task-edit-box">
            <input
              type="text"
              value={draftTitle}
              onChange={event => setDraftTitle(event.target.value)}
              aria-label="Edit task title"
            />
            <button type="button" className="save-button" onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div className="task-copy">
              <span className="task-title">{task.title}</span>
              {task.dueDate && (
                <span className="task-due">{new Date(task.dueDate).toLocaleDateString()}</span>
              )}
              <span className="task-priority">{task.priority}</span>
          </div>
        )}
      </div>

      <div className="task-actions">
        {!isEditing && (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        <button className="delete-button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem