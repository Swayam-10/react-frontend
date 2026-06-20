import { useMemo } from 'react'

interface StatsPanelProps {
  total: number
  completed: number
  active: number
  overdue: number
}

export default function StatsPanel({
  total,
  completed,
  active,
  overdue,
}: StatsPanelProps) {
  const percentage = useMemo(() => {
    if (total === 0) {
      return 0
    }

    return Math.round(
      (completed / total) * 100
    )
  }, [total, completed])

  return (
    <div id="stats-panel">
      <h3>
        Task Statistics
      </h3>

      <p>Total: {total}</p>

      <p>
        Completed:{' '}
        {completed}
      </p>

      <p>Active: {active}</p>

      <p>
        Overdue: {overdue}
      </p>

      <p>
        Completion: {percentage}%
      </p>

      <div
        role="progressbar"
        aria-valuenow={
          percentage
        }
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '10px',
            backgroundColor:
              '#4caf50',
          }}
        />
      </div>
    </div>
  )
}