import React from 'react'
import TaskForm from './TaskForm'
import TaskList, { Task } from './TaskList'

interface TaskAppProps {
  tasks: Task[]
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>

  showForm?: boolean
  countFormat?: string

  onDelete?: (id: string | number) => void
  showFilterBar?: boolean
  showStatsPanel?: boolean
  linkToTaskDetail?: boolean

  [key: string]: unknown
}

export default function TaskApp({
  tasks,
  setTasks,
  showForm,
  countFormat,
}: TaskAppProps) {
  const handleAddTask = (task: Task) => {
    setTasks?.((prev) => [...prev, task])
  }

  const handleToggle = (id: string | number) => {
    setTasks?.((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    )
  }

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length

  const countText =
    countFormat === 'completed'
      ? `${completedCount} of ${tasks.length} completed`
      : `${tasks.length} Tasks`

  return (
    <>
      {showForm && (
        <TaskForm onAddTask={handleAddTask} />
      )}

      <TaskList
        tasks={tasks}
        countText={countText}
        onToggle={handleToggle}
      />
    </>
  )
}