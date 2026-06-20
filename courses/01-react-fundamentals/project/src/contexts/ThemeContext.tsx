import {createContext,useContext,useState,useEffect,type ReactNode,} from 'react'
export type Theme = 'light' | 'dark'

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({
  children,
}: {
  children: ReactNode
}) {
  const [theme, setTheme] =
    useState<Theme>('light')

  useEffect(() => {
    const saved =
      localStorage.getItem(
        'task-app-theme'
      )

    if (
      saved === 'light' ||
      saved === 'dark'
    ) {
      setTheme(saved)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'task-app-theme',
      theme
    )
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === 'light'
        ? 'dark'
        : 'light'
    )
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
