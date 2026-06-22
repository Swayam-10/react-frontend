import React, {useEffect,useState,} from 'react'
import { Link } from 'react-router-dom'
interface TaskCardProps {
  id?: string | number
  title: string
  description: string
  priority?: string
  completed?: boolean
  linkToTaskDetail?: boolean
  category?: string
  tags?: string[]
  dueDate?: string
  onToggle?: () => void
  onDelete?: (id: string | number) => void

  onUpdateTask?: (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: string
    }
  ) => void

  editingId?: string | number | null

  setEditingId?: (
    id: string | number | null
  ) => void
}

function TaskCard({
  id,
  title,
  description,
  priority = 'Medium',
  completed = false,
  category = 'General',
  tags = [],
  dueDate,
  onToggle,
  onDelete,
  onUpdateTask,
  editingId,
  setEditingId,
  linkToTaskDetail,
}: TaskCardProps) {
  const isEditing =
    editingId !== undefined &&
    editingId !== null &&
    editingId === id

  const [editTitle, setEditTitle] =
    useState(title)

  const [
    editDescription,
    setEditDescription,
  ] = useState(description)

  const [
    editPriority,
    setEditPriority,
  ] = useState(priority)

  useEffect(() => {
    if (isEditing) {
      setEditTitle(title)
      setEditDescription(description)
      setEditPriority(priority)
    }
  }, [
    isEditing,
    title,
    description,
    priority,
  ])

  const handleDelete = () => {
    if (
      id !== undefined &&
      onDelete &&
      window.confirm('Are you sure?')
    ) {
      onDelete(id)
    }
  }

  const handleSave = () => {
    if (
      id === undefined ||
      !onUpdateTask
    ) {
      return
    }

    const trimmedTitle =
      editTitle.trim()

    if (!trimmedTitle) {
      return
    }

    onUpdateTask(id, {
      title: trimmedTitle,
      description:
        editDescription,
      priority: editPriority,
    })

    setEditingId?.(null)
  }

  const handleCancel = () => {
    setEditTitle(title)
    setEditDescription(description)
    setEditPriority(priority)

    setEditingId?.(null)
  }

  const today =
  new Date()

today.setHours(
  0,
  0,
  0,
  0
)

const due =
  dueDate
    ? new Date(dueDate)
    : null

if (due) {
  due.setHours(
    0,
    0,
    0,
    0
  )
}

const isOverdue =
  !!due &&
  due < today &&
  !completed

const isDueToday =
  !!due &&
  due.getTime() ===
    today.getTime()

const isDueSoon =
  !!due &&
  !isOverdue &&
  !isDueToday &&
  due.getTime() -
    today.getTime() <=
    3 *24 *
      60 *
      60 *
      1000

  if (isEditing) {
    return (
      <article id="task-card">
        <input
          type="text"
          value={editTitle}
          onChange={(e) =>
            setEditTitle(
              e.target.value
            )
          }
        />

        <textarea
          value={editDescription}
          onChange={(e) =>
            setEditDescription(
              e.target.value
            )
          }
        />

        <select
          value={editPriority}
          onChange={(e) =>
            setEditPriority(
              e.target.value
            )
          }
        >
          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>
        </select>

        <button
          type="button"
          onClick={handleSave}
        >
          Save
        </button>

        <button
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </article>
    )
  }

  return (
    <article
      id="task-card"
      data-completed={completed}
      data-overdue={isOverdue}
      style={{
        backgroundColor: isOverdue
          ? '#fee2e2'
          : completed
          ? '#f3f4f6'
          : '',
      }}
    >
      {onToggle && (
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
        />
      )}

      <h2
  style={{
    textDecoration: completed
      ? 'line-through'
      : 'none',
  }}
>
  {linkToTaskDetail ? (
    <Link
      to={`/challenge/21-react-router/task/${id}`}
    >
      {title}
    </Link>
  ) : (
    title
  )}
</h2>

      <p
        style={{
          textDecoration: completed
            ? 'line-through'
            : 'none',
        }}
      >
        {description}
      </p>

      <p>
        Priority: {priority}
      </p>

      <div id="task-category">
        {category}
      </div>

      <div id="task-tags">
        {tags.map((tag) => (
          <span
            key={tag}
            data-tag={tag}
            style={{
              display:
                'inline-block',
              marginRight: '6px',
              padding:
                '2px 8px',
              border:
                '1px solid #ccc',
              borderRadius:
                '999px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      {isOverdue && (
        <p>Overdue</p>
      )}

      {isDueToday && (
        <p>Due Today</p>
      )}

      {isDueSoon && (
        <p>Due Soon</p>
      )}
      <button
        type="button"
        onClick={() =>
          setEditingId?.(
            id ?? null
          )
        }
      >
        Edit
      </button>

      {onDelete && (
        <button
          onClick={
            handleDelete
          }
        >
          Delete
        </button>
      )}
    </article>
  )
}
export default React.memo(TaskCard)