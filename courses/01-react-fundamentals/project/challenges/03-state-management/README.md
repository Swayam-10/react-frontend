# Challenge 03: State Management with Context

## Problem Statement

Implement a theme switcher using React Context API to manage global state. Create a theme system that allows users to switch between light and dark modes. The theme should be:
- Accessible throughout the app via Context
- Persisted to localStorage
- Applied to all components

---

## What you need to do (summary)

1. **One file:** Implement `src/contexts/ThemeContext.tsx`. It should export: a context (from `createContext`), a `ThemeProvider` component, and a `ThemeToggle` component (or equivalent). You will also modify `App.tsx` to wrap the app with `ThemeProvider`.
2. **Context:** Use React's `createContext`. The context value must include: current theme (e.g. `'light'` or `'dark'`) and a way to toggle (e.g. `toggleTheme` or `setTheme`).
3. **ThemeProvider:** Wraps children, holds theme state with `useState`, reads/writes `localStorage` (e.g. key `'theme'`) so theme persists on reload, provides the value to the context.
4. **ThemeToggle:** A component that uses the context (e.g. `useContext` or a custom `useTheme` hook) and renders a button that toggles between light and dark. Must support at least "light" and "dark" themes.
5. **App.tsx:** Wrap the app (or the `BrowserRouter` subtree) with `<ThemeProvider>` so the theme applies app-wide. `ThemeToggle` is already rendered on `/challenge/03-state-management`; it must consume your context.
6. **Code style:** TypeScript (context type), functional components, no `console.*`, pass ESLint.

If you do the above, the automated review (tests, ESLint, architecture, best practices) will pass. Anything not listed in **Technical Requirements** below is not required.

---

## How the app is structured

- The **home page** lists all challenges. **"View Challenge UI"** for this challenge takes you to `/challenge/03-state-management`, where the theme toggle is shown.
- **App.tsx** already imports `ThemeToggle` and renders it on that route. You implement `ThemeContext` and `ThemeProvider` in `src/contexts/ThemeContext.tsx`, and you **modify App.tsx only to wrap the app** with `<ThemeProvider>`. Do not change routes, links, or other App content—only add the Provider wrapper so theme is available app-wide.

## Instructions

1. **Modify App.tsx only to wrap with ThemeProvider.** Do not change routes or other content in App.tsx. Wrap the app (e.g. `<ThemeProvider>` around `<BrowserRouter>`) so your context is available everywhere. The `ThemeToggle` component is already imported and rendered on `/challenge/03-state-management`; you implement the context it consumes.
2. Create `src/contexts/ThemeContext.tsx` with: a context (from `createContext`), `ThemeProvider`, and `ThemeToggle` (or export `ThemeToggle` from there if you prefer; the project may already have a stub in `src/components/ThemeToggle.tsx` that you wire to your context).
3. In ThemeContext: provide theme state (e.g. `'light'` or `'dark'`) and a toggle function via context value.
4. Persist theme to `localStorage` and load it on mount (see **What the tests look for** below for the key name tests expect).
5. Apply theme classes/styles so the app reflects the current theme.

## Visual Requirements

- Clear toggle button/switch
- Smooth transition between themes
- All components should reflect the theme change
- Theme preference should persist on page reload

## How to Verify

1. Run `npm run dev` and open the app
2. From the home page, click **View Challenge UI** for this challenge, or go to `/challenge/03-state-management`
3. Click the theme toggle—the entire app should change theme
4. Refresh the page—the theme should persist
5. All components should respect the current theme

---

## What the review checks

The automated review runs in this order and only checks what is listed in **Technical Requirements** below:

| Step | What it does |
|------|----------------|
| **Functional tests** | Vitest: context created; Provider provides theme and toggle; theme persists in localStorage; theme loads on mount; useContext (or custom hook) used; "light" and "dark" supported; consuming components see theme change. |
| **Code quality** | ESLint on your code (no errors or warnings). |
| **Architecture** | AST check: `createContext`, `useContext`, Provider usage, localStorage usage, functional components. |
| **Best practices** | Heuristics: TypeScript context type, custom hook, proper Provider placement, etc. |
| **E2E** | Playwright: open `/challenge/03-state-management`, click toggle, check theme change and persistence. |
| **AI review** | Optional: qualitative feedback (small % of score). |

**Pass threshold:** Weighted score ≥ 60%. Meet the Technical Requirements and you pass; there are no hidden checks.

---

## Technical Requirements (What Will Be Reviewed)

### Functional Requirements

1. ✅ Must create a context using React's `createContext` (e.g. `ThemeContext`).
2. ✅ Must have a `ThemeProvider` component that wraps children and provides the context value (theme + toggle function).
3. ✅ Context value must include: current theme (string) and a function to toggle or set theme.
4. ✅ Must persist theme to `localStorage` when theme changes. **Unit tests expect the key `'theme'`** (e.g. `localStorage.getItem('theme')`). Use this key so tests pass.
5. ✅ On mount, must read theme from localStorage (key `'theme'`) if present and use it as initial state; otherwise default to `'light'`.
6. ✅ Consuming components must get the theme via `useContext` or a custom hook that uses `useContext`.
7. ✅ Must support at least the values `"light"` and `"dark"` for the theme.
8. ✅ When theme is toggled, all components that consume the context must reflect the new theme.

### Code Quality Requirements

1. ✅ Context must be properly typed with TypeScript (ContextType interface)
2. ✅ Must handle localStorage errors gracefully (try-catch or null checks)
3. ✅ Must use proper React Context patterns
4. ✅ Code must pass ESLint checks (no errors, warnings allowed)
5. ✅ No console.log, console.error, or console.warn statements in production code
6. ✅ Code must be readable and well-structured
7. ✅ Variable and function names must be descriptive and follow camelCase convention

### Architecture Requirements

1. ✅ File must be exactly `src/contexts/ThemeContext.tsx` (review looks at this path).
2. ✅ Must call `createContext` to create the context.
3. ✅ Consuming code must use `useContext` (e.g. inside a custom hook like `useTheme`).
4. ✅ `ThemeProvider` must wrap the app (or the main subtree) in App.tsx (or main.tsx) so theme is available app-wide.
5. ✅ A custom hook (e.g. `useTheme`) that uses `useContext` is recommended so the review can detect context consumption.
6. ✅ Must use functional components only (no class components).
7. ✅ Provider must use `useState` (or equivalent) to hold theme state and provide it via context value.

### Best Practices Requirements

1. ✅ Context must be properly typed with TypeScript interface
2. ✅ Custom hook must handle context undefined case (throw error or return default)
3. ✅ Provider must manage state using useState
4. ✅ localStorage operations must be in useEffect hooks
5. ✅ Must handle localStorage read/write errors gracefully
6. ✅ Theme state must be properly initialized (default to 'light' or from localStorage)
7. ✅ Toggle function must be properly implemented
8. ✅ Context value must be memoized or properly structured
9. ✅ Must follow React Context best practices (separate Provider and hook)
10. ✅ Code must be maintainable and follow single responsibility principle

### Industry Standards

The following industry standards will be checked:

- **TypeScript**: Proper type safety, ContextType interface
- **React Patterns**: Context API, custom hooks, Provider pattern
- **Code Style**: ESLint compliance, consistent formatting
- **Naming Conventions**: camelCase for variables/functions, PascalCase for components
- **State Management**: Proper useState usage, localStorage integration
- **Error Handling**: Graceful handling of localStorage errors
- **Component Design**: Proper separation of concerns, reusable context pattern


**Important:** The review will **only** check what is specified above. There are no hidden requirements. If a requirement is unclear, treat the bullet above as the single source of truth.

---

## What the tests look for (so you can sync your implementation)

The unit and E2E tests expect the following. Match them so tests pass:

| What | Requirement |
|------|-------------|
| **localStorage key** | Use the key **`'theme'`**. Unit tests call `localStorage.getItem('theme')` and expect `'dark'` after toggling. |
| **Theme values** | Use exactly **`'light'`** and **`'dark'`** (lowercase strings). Unit tests expect `toHaveTextContent('light')` and `toHaveTextContent('dark')`. |
| **useTheme (or context consumption)** | Unit tests render a component that calls `useTheme()` and expects `{ theme }` with the current value. Your ThemeContext must export a hook (e.g. `useTheme`) that returns `{ theme, toggleTheme }` (or equivalent) so ThemeToggle and tests can read the current theme. |
| **ThemeToggle button** | E2E looks for a button with name matching /theme\|toggle\|dark\|light\|mode/i. Give your toggle button an accessible name (e.g. "Toggle theme", "Dark mode"). |

**App.tsx:** Only add `<ThemeProvider>` as a wrapper (e.g. around `<BrowserRouter>`). Do not remove or change existing routes or imports other than wrapping with Provider.

## Learning Hints (no solution code)

- **Context**: Use React's `createContext` and `useContext`. Provide a value object (e.g. `{ theme, toggleTheme }`). Wrap the app in the Provider in App.tsx.
- **Persistence**: Read/write `localStorage` with key **`'theme'`** so unit tests pass. Values `'light'` and `'dark'`.
- **ThemeToggle**: A button that calls the context's toggle function. Must be inside the Provider. App already renders ThemeToggle on the challenge route; ensure it uses your context (e.g. `useTheme()`).

## Next Steps

1. **Read this file** - All requirements are listed above
2. **Implement the context** - Follow the instructions and requirements
3. **Verify visually** - Run `npm run dev` and check `/challenge/03-state-management`
4. **Run review** - `npm run review -- --challenge=03-state-management` to get scored

**Setup**: If you haven't run setup yet, go to repo root and run `npm run setup` to install all dependencies and Playwright browsers.  
**Full guide**: See repo root [README.md](../../../../../README.md) for setup, workflow, and completion policy.
