import TaskList, { Task } from './TaskList'

interface TaskAppProps {
  tasks: Task[]
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>
  showForm?: boolean
  countFormat?: string

  [key: string]: unknown
}

export default function TaskApp({
  tasks,
}: TaskAppProps) {
  const countText = `${tasks.length} Tasks`

  return (
    <>
      <div id="task-count">{countText}</div>

      <TaskList
        tasks={tasks}
        countText={countText}
      />
    </>
  )
}