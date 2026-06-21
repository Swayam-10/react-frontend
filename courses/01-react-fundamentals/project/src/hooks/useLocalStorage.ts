import {
  useState,
} from 'react'

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
) {
  const [value, setValue] =
    useState<T>(() => {
      try {
        const item =
          localStorage.getItem(
            key
          )

        if (!item) {
          return initialValue
        }

        return JSON.parse(item)
      } catch {
        return initialValue
      }
    })

  const setStoredValue = (
    newValue:
      | T
      | ((
          prev: T
        ) => T)
  ) => {
    const valueToStore =
      newValue instanceof
      Function
        ? newValue(value)
        : newValue

    setValue(valueToStore)

    try {
      localStorage.setItem(
        key,
        JSON.stringify(
          valueToStore
        )
      )
    } catch {
      // ignore
    }
  }

  return [
    value,
    setStoredValue,
  ] as const
}