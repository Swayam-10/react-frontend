import { useState } from 'react'
import type { Task } from './TaskList'

interface TaskFormProps {
  onAddTask: (task: Task) => void
}

export default function TaskForm({
  onAddTask,
}: TaskFormProps) {
  const [title, setTitle] =
    useState('')

  const [
    description,
    setDescription,
  ] = useState('')

  const [priority, setPriority] =
    useState('Medium')

  const [category, setCategory] =
    useState('General')

  const [tagsInput, setTagsInput] =
    useState('')

  const [error, setError] =
    useState('')

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!title.trim()) {
      setError('Title is required')
      return
    }

    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    setError('')

    onAddTask({
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
      category,
      tags,
    })

    setTitle('')
    setDescription('')
    setPriority('Medium')
    setCategory('General')
    setTagsInput('')
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p id="task-form-error">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="task-title">
          Title
        </label>

        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />
      </div>

      <div>
        <label htmlFor="task-description">
          Description
        </label>

        <textarea
          id="task-description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />
      </div>

      <div>
        <label htmlFor="task-priority">
          Priority
        </label>

        <select
          id="task-priority"
          value={priority}
          onChange={(e) =>
            setPriority(
              e.target.value
            )
          }
        >
          <option value="Low">
            Low
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">
            High
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="task-category">
          Category
        </label>

        <select
          id="task-category"
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >
          <option value="General">
            General
          </option>

          <option value="Work">
            Work
          </option>

          <option value="Personal">
            Personal
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="task-tags-input">
          Tags
        </label>

        <input
          id="task-tags-input"
          type="text"
          placeholder="react, frontend, urgent"
          value={tagsInput}
          onChange={(e) =>
            setTagsInput(
              e.target.value
            )
          }
        />
      </div>

      <button type="submit">
        Add Task
      </button>
    </form>
  )
}