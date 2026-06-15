interface TaskCardProps {
  title: string
  description: string
  priority?: string
  completed?: boolean
  onToggle?: () => void
}

export default function TaskCard({
  title,
  description,
  completed = false,
  onToggle,
}: TaskCardProps) {
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
    </article>
  )
}