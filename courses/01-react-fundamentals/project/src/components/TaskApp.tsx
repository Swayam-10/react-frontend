import React, { useState } from 'react'
import TaskForm from './TaskForm'
import TaskList, { Task } from './TaskList'
import FilterBar from './FilterBar'

type FilterType =
  | 'all'
  | 'active'
  | 'completed'

type SortType =
  | 'recent'
  | 'high-low'
  | 'low-high'
  | 'alphabetical'

interface TaskAppProps {
  tasks: Task[]
  setTasks?: React.Dispatch<
    React.SetStateAction<Task[]>
  >

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
  onDelete,
  showFilterBar,
}: TaskAppProps) {
  const [filter, setFilter] =
    useState<FilterType>('all')

  const [sortOrder, setSortOrder] =
    useState<SortType>('recent')

  const handleAddTask = (task: Task) => {
    setTasks?.((prev) => [...prev, task])
  }

  const handleToggle = (
    id: string | number
  ) => {
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

  const handleDelete = (
    id: string | number
  ) => {
    setTasks?.((prev) =>
      prev.filter(
        (task) => task.id !== id
      )
    )
  }

  let filteredTasks = tasks

  if (filter === 'active') {
    filteredTasks = tasks.filter(
      (task) => !task.completed
    )
  }

  if (filter === 'completed') {
    filteredTasks = tasks.filter(
      (task) => task.completed
    )
  }

  const priorityRank = {
    High: 3,
    Medium: 2,
    Low: 1,
  }

  const sortedTasks = [...filteredTasks]

  if (sortOrder === 'high-low') {
    sortedTasks.sort(
      (a, b) =>
        priorityRank[
          b.priority as keyof typeof priorityRank
        ] -
        priorityRank[
          a.priority as keyof typeof priorityRank
        ]
    )
  }

  if (sortOrder === 'low-high') {
    sortedTasks.sort(
      (a, b) =>
        priorityRank[
          a.priority as keyof typeof priorityRank
        ] -
        priorityRank[
          b.priority as keyof typeof priorityRank
        ]
    )
  }

  if (sortOrder === 'alphabetical') {
    sortedTasks.sort((a, b) =>
      a.title
        .toLowerCase()
        .localeCompare(
          b.title.toLowerCase()
        )
    )
  }

  const countText = showFilterBar
    ? `Showing ${sortedTasks.length} of ${tasks.length} tasks`
    : countFormat === 'completed'
      ? `${
          tasks.filter(
            (task) => task.completed
          ).length
        } of ${tasks.length} completed`
      : `${tasks.length} Tasks`

  return (
    <>
      {showForm && (
        <TaskForm
          onAddTask={handleAddTask}
        />
      )}

      {showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
      )}

      {showFilterBar &&
        sortedTasks.length === 0 && (
          <div id="filter-empty-message">
            No tasks match this filter
          </div>
        )}

      <TaskList
        tasks={sortedTasks}
        countText={countText}
        onToggle={handleToggle}
        onDelete={
          onDelete ?? handleDelete
        }
      />
    </>
  )
}