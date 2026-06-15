interface TaskCardProps {
  id?: string | number
  title: string
  description: string
  priority?: string
  completed?: boolean
  onToggle?: () => void
  onDelete?: (id: string | number) => void
}

export default function TaskCard({
  id,
  title,
  description,
  completed = false,
  onToggle,
  onDelete,
}: TaskCardProps) {
  const handleDelete = () => {
    if (
      id !== undefined &&
      onDelete &&
      window.confirm('Are you sure?')
    ) {
      onDelete(id)
    }
  }

  return (
    <article
      id="task-card"
      data-completed={completed}
      style={{
        backgroundColor: completed ? '#f3f4f6' : '',
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
          textDecoration: completed ? 'line-through' : 'none',
        }}
      >
        {title}
      </h2>

      <p
        style={{
          textDecoration: completed ? 'line-through' : 'none',
        }}
      >
        {description}
      </p>

      {onDelete && (
        <button onClick={handleDelete}>
          Delete
        </button>
      )}
    </article>
  )
}