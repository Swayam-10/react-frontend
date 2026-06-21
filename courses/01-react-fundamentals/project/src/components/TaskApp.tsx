import React, {useEffect,useState,} from 'react'
import {ADD_TASK,UPDATE_TASK,DELETE_TASK,TOGGLE_TASK,} from '../reducers/taskReducer'
import TaskForm from './TaskForm'
import TaskList, { Task } from './TaskList'
import FilterBar from './FilterBar'
import StatsPanel from './StatsPanel'
import { useMemo } from 'react'
import { useTheme } from '../contexts/ThemeContext'
type FilterType =
  | 'all'
  | 'active'
  | 'completed'

type SortType =
  | 'recent'
  | 'high-low'
  | 'low-high'
  | 'alphabetical'
  | 'due-date'

interface TaskAppProps {
  tasks: Task[]
  dispatch?: React.Dispatch<any>

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
  dispatch,
  showForm,
  countFormat,
  onDelete,
  showFilterBar,
  showStatsPanel,
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
  const {
    theme,
    toggleTheme,
  } = useTheme()
 
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
const stats = useMemo(() => {
  const total = tasks.length

  const completed =
    tasks.filter(
      (task) =>
        task.completed
    ).length

  const active =
    total - completed

  const overdue =
    tasks.filter(
      (task) => {
        if (
          !task.dueDate ||
          task.completed
        ) {
          return false
        }

        return (
          new Date(
            task.dueDate
          ) < new Date()
        )
      }
    ).length

  return {
    total,
    completed,
    active,
    overdue,
  }
}, [tasks])
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
    dispatch?.({
      type: ADD_TASK,
      payload: task,
    })
  }

  const handleToggle = (
  id: string | number
) => {
  dispatch?.({
    type: TOGGLE_TASK,
    payload: id,
  })
}

  const handleDelete = (
  id: string | number
) => {
  dispatch?.({
    type: DELETE_TASK,
    payload: id,
  })
}

  const handleUpdateTask = (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: string
    }
  ) => {
    dispatch?.({
  type: UPDATE_TASK,
  payload: {
    id,
    ...updates,
  },
})

setEditingId(null)

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

  if (
  sortOrder ===
  'due-date'
) {
  sortedTasks.sort(
    (a, b) => {
      if (
        !a.dueDate &&
        !b.dueDate
      ) {
        return 0
      }

      if (!a.dueDate) {
        return 1
      }

      if (!b.dueDate) {
        return -1
      }

      return (
        new Date(
          a.dueDate
        ).getTime() -
        new Date(
          b.dueDate
        ).getTime()
      )
    }
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
  <div
    data-theme={theme}
    style={{
      backgroundColor:
        theme === 'dark'
          ? '#1f2937'
          : '#ffffff',
      color:
        theme === 'dark'
          ? '#ffffff'
          : '#000000',
      minHeight: '100vh',
    }}
  >
    <button
      id="theme-toggle"
      type="button"
      onClick={toggleTheme}
    >
      {theme === 'light'
        ? 'Dark Mode'
        : 'Light Mode'}
    </button>
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
      {showStatsPanel && (
        <StatsPanel
          total={stats.total}
          completed={
            stats.completed
          }
          active={stats.active}
          overdue={stats.overdue}
      />
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
    </div>
  )
}