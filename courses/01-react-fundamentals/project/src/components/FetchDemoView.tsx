import { useEffect, useState } from 'react'

interface TodoItem {
  id: number
  title: string
}

export default function FetchDemoView() {
  const [items, setItems] = useState<TodoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(
          '/api/todos.json',
          {
            signal: controller.signal,
          }
        )

        if (!res.ok) {
          throw new Error(
            'Failed to fetch data'
          )
        }

        const data =
          await res.json()

        setItems(data)
        setLoading(false)
      } catch (err) {
        if (
          err instanceof Error &&
          err.name === 'AbortError'
        ) {
          return
        }

        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong'
        )

        setLoading(false)
      }
    }

    loadData()

    return () => {
      controller.abort()
    }
  }, [])

  if (loading) {
    return (
      <div id="fetch-loading">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div id="fetch-error">
        {error}
      </div>
    )
  }

  return (
    <ul id="fetch-list">
      {items.map((item) => (
        <li key={item.id}>
          {item.title}
        </li>
      ))}
    </ul>
  )
}