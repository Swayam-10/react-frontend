import { useParams, useNavigate } from 'react-router-dom'
import type { Task } from './TaskList'

export default function TaskDetailPage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const stored =
    localStorage.getItem(
      'task-app-tasks'
    )

  let tasks: Task[] = []

  try {
    tasks = stored
      ? JSON.parse(stored)
      : []
  } catch {
    tasks = []
  }

  const task = tasks.find(
    (t) => String(t.id) === id
  )

  return (
    <div id="task-detail-page">
      <button
        id="task-detail-back"
        onClick={() =>
          navigate(
            '/challenge/21-react-router'
          )
        }
      >
        Back to list
      </button>

      {!task ? (
        <p>Task not found</p>
      ) : (
        <>
          <h1>{task.title}</h1>

          <p>
            {task.description}
          </p>

          <p>
            Priority:{' '}
            {task.priority}
          </p>

          <p>
            Category:{' '}
            {task.category}
          </p>

          {task.dueDate && (
            <p>
              Due Date:{' '}
              {task.dueDate}
            </p>
          )}
        </>
      )}
    </div>
  )
}