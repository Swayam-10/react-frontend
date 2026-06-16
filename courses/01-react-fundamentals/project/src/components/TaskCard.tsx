import {
  useEffect,
  useState,
} from 'react'

interface TaskCardProps {
  id?: string | number
  title: string
  description: string
  priority?: string
  completed?: boolean

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

export default function TaskCard({
  id,
  title,
  description,
  priority = 'Medium',
  completed = false,
  onToggle,
  onDelete,
  onUpdateTask,
  editingId,
  setEditingId,
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
      style={{
        backgroundColor: completed
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
        {title}
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

      <p>{priority}</p>

      <button
        type="button"
        onClick={() =>
          setEditingId?.(id ?? null)
        }
      >
        Edit
      </button>

      {onDelete && (
        <button onClick={handleDelete}>
          Delete
        </button>
      )}
    </article>
  )
}