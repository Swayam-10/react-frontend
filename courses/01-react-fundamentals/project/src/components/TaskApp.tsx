import React, {
  useEffect,
  useState,
} from 'react'
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

  const [searchInput, setSearchInput] =
    useState('')

  const [search, setSearch] =
    useState('')

  const [isSearching, setIsSearching] =
    useState(false)

  const [editingId, setEditingId] =
    useState<string | number | null>(null)

 
const [
  selectedCategory,
  setSelectedCategory,
] = useState(
  'All categories'
)

const categories = [
  ...new Set(
    tasks.map(
      (task) =>
        task.category ??
        'General'
    )
  ),
]
  useEffect(() => {
    if (searchInput === search) {
      setIsSearching(false)
      return
    }

    setIsSearching(true)

    const timeoutId = window.setTimeout(
      () => {
        setSearch(searchInput)
        setIsSearching(false)
      },
      300
    )

    return () => {
      clearTimeout(timeoutId)
    }
  }, [searchInput, search])

  const handleAddTask = (
    task: Task
  ) => {
    setTasks?.((prev) => [
      ...prev,
      task,
    ])
  }

  const handleToggle = (
    id: string | number
  ) => {
    setTasks?.((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed:
                !task.completed,
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

  const handleUpdateTask = (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: string
    }
  ) => {
    setTasks?.((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updates,
            }
          : task
      )
    )

    setEditingId(null)
  }

  let filteredTasks = tasks

  if (filter === 'active') {
    filteredTasks =
      filteredTasks.filter(
        (task) =>
          !task.completed
      )
  }

  if (filter === 'completed') {
    filteredTasks =
      filteredTasks.filter(
        (task) =>
          task.completed
      )
  }

  if (
  selectedCategory !==
  'All categories'
) {
  filteredTasks =
    filteredTasks.filter(
      (task) =>
        task.category ===
        selectedCategory
    )
}

  if (search.trim()) {
    const searchLower =
      search.toLowerCase()

    filteredTasks =
      filteredTasks.filter(
        (task) =>
          task.title
            .toLowerCase()
            .includes(
              searchLower
            ) ||
          task.description
            .toLowerCase()
            .includes(
              searchLower
            )
      )
  }

  const priorityRank = {
    High: 3,
    Medium: 2,
    Low: 1,
  }

  const sortedTasks = [
    ...filteredTasks,
  ]

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

  if (
    sortOrder ===
    'alphabetical'
  ) {
    sortedTasks.sort((a, b) =>
      a.title
        .toLowerCase()
        .localeCompare(
          b.title.toLowerCase()
        )
    )
  }

  const countText =
    showFilterBar
      ? `Showing ${sortedTasks.length} of ${tasks.length} tasks`
      : countFormat ===
          'completed'
        ? `${
            tasks.filter(
              (task) =>
                task.completed
            ).length
          } of ${
            tasks.length
          } completed`
        : `${tasks.length} Tasks`

  return (
    <>
      {showForm && (
        <TaskForm
          onAddTask={
            handleAddTask
          }
        />
      )}

      {showFilterBar && (
        <>
          <FilterBar
  filter={filter}
  onFilterChange={
    setFilter
  }
  sortOrder={sortOrder}
  onSortChange={
    setSortOrder
  }
  search={searchInput}
  onSearchChange={
    setSearchInput
  }
  categories={categories}
  selectedCategory={
    selectedCategory
  }
  onCategoryChange={
    setSelectedCategory
  }
/>

          {isSearching && (
            <div id="searching-indicator">
              Searching...
            </div>
          )}
        </>
      )}

      {showFilterBar &&
        sortedTasks.length ===
          0 && (
          <div id="filter-empty-message">
            No tasks found
          </div>
        )}

      <TaskList
        tasks={sortedTasks}
        countText={countText}
        onToggle={
          handleToggle
        }
        onDelete={
          onDelete ??
          handleDelete
        }
        onUpdateTask={
          handleUpdateTask
        }
        editingId={
          editingId
        }
        setEditingId={
          setEditingId
        }
      />
    </>
  )
}