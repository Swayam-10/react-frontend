# Challenge 02: Todo List Application

## Problem Statement

Build a functional todo list where users can add, complete, and delete tasks. Create a todo list application with the following features:
- Input field to add new todos
- List of todos with checkboxes to mark as complete
- Delete button for each todo
- Visual distinction between completed and active todos

---

## What you need to do (summary)

1. **One file:** Implement `src/components/TodoList.tsx` (create or complete it). Do not modify App.tsx to add the component—it is already wired on the challenge route.
2. **Component:** A single React component named exactly `TodoList`, default-exported.
3. **State:** Use `useState` to hold an array of todo items. Each item must have: `id` (string or number), `text` (string), `completed` (boolean).
4. **UI:** An input (e.g. placeholder "Add todo" or similar) and a button to add a todo (button text must match `/add/i`, e.g. "Add"). A list of todos; each item has a checkbox to toggle `completed` and a delete button. Completed todos must look distinct (e.g. strikethrough).
5. **Behavior:** Add new todo from input + button; toggle completion; delete by id. Input must be controlled (value + onChange).
6. **Code style:** TypeScript (todo type/interface), functional component, descriptive handlers (e.g. `handleAddTodo`, `handleToggleTodo`, `handleDeleteTodo`), no `console.*`, pass ESLint.

If you do the above, the automated review (tests, ESLint, architecture, best practices) will pass. Anything not listed in **Technical Requirements** below is not required.

---

## How the app is structured

- The **home page** (`/`) lists all challenges. **"View Challenge UI"** for this challenge takes you to `/challenge/02-todo-list`.
- **App.tsx** already imports and renders `TodoList` on that route. **Do not modify App.tsx**—you only implement `src/components/TodoList.tsx`. The component is already wired; your job is to make it work.

## Instructions

1. **Do not modify App.tsx.** The `TodoList` component is already imported and rendered on `/challenge/02-todo-list`. Only implement (or complete) `src/components/TodoList.tsx`.
2. Create (or complete) the component in `src/components/TodoList.tsx`.
3. Implement state management for the list of todos (each todo: `id`, `text`, `completed`).
4. Your component is already used on the challenge route—visit `/challenge/02-todo-list` (or click **View Challenge UI** for this challenge) to see your implementation.

## Visual Requirements

- Completed todos should be visually distinct (strikethrough, different color)
- Clear input field and add button
- Each todo item should have a delete button
- Clean, organized layout

## How to Verify

1. Run `npm run dev` and open the app
2. From the home page, click **View Challenge UI** for this challenge, or go to `/challenge/02-todo-list`
3. Add a new todo—it should appear in the list
4. Check a todo—it should show as completed (strikethrough)
5. Click delete—the todo should be removed
6. All interactions should work smoothly

---

## What the review checks

The automated review runs in this order and only checks what is listed in **Technical Requirements** below:

| Step | What it does |
|------|----------------|
| **Functional tests** | Vitest: input and Add button present; can add todo; can toggle completion; can delete; completed items look distinct (e.g. strikethrough). |
| **Code quality** | ESLint on your code (no errors or warnings). |
| **Architecture** | AST check: functional component, `useState`, array methods (e.g. map, filter), controlled input (value + onChange). |
| **Best practices** | Heuristics: handler names, state names, TypeScript, list keys, etc. |
| **E2E** | Playwright: open `/challenge/02-todo-list`, add/toggle/delete todos, check visual distinction. |
| **AI review** | Optional: qualitative feedback (small % of score). |

**Pass threshold:** Weighted score ≥ 60%. Meet the Technical Requirements and you pass; there are no hidden checks.

---

## Technical Requirements (What Will Be Reviewed)

### Functional Requirements

1. ✅ Component must be named `TodoList` (exact name).
2. ✅ State must hold an array of todos (e.g. `useState` with array); each todo must have: `id`, `text`, `completed`.
3. ✅ Must be able to add new todos (e.g. input + button; button name must match `/add/i` so tests find it).
4. ✅ Must be able to toggle completion (checkbox or click; update `completed` for that todo).
5. ✅ Must be able to delete todos (remove item from state by id).
6. ✅ Completed todos must be visually distinct (e.g. strikethrough, different color).
7. ✅ Input for new todo must be controlled (value tied to state, onChange updates state).
8. ✅ Must use React state (e.g. `useState`) for the list; no class components.

### Code Quality Requirements

1. ✅ Must use TypeScript with proper type annotations
2. ✅ Todo interface/type must be defined with TypeScript
3. ✅ Must handle edge cases (empty input, duplicate todos, etc.)
4. ✅ Code must pass ESLint checks (no errors, warnings allowed)
5. ✅ No console.log, console.error, or console.warn statements in production code
6. ✅ Code must be readable and well-structured
7. ✅ Variable and function names must be descriptive and follow camelCase convention

### Architecture Requirements

1. ✅ File must be exactly `src/components/TodoList.tsx` (review looks at this path).
2. ✅ Component must be the default export.
3. ✅ Must use `useState` for the todos array.
4. ✅ Must use array methods (e.g. map for rendering list, filter for delete; review checks AST for map/filter).
5. ✅ Input must be controlled: has `value` and `onChange` (or equivalent) so the review can detect controlled pattern.
6. ✅ Must be a function component, not a class.
7. ✅ Event handlers must be named (e.g. `handleAddTodo`, `handleToggleTodo`, `handleDeleteTodo`).

### Best Practices Requirements

1. ✅ Component must be a functional component (not class component)
2. ✅ Todo type/interface must be properly defined with TypeScript
3. ✅ Event handlers must be properly named (e.g., `handleAddTodo`, `handleToggleTodo`, `handleDeleteTodo`)
4. ✅ State variable names must be descriptive (e.g., `todos`, not `items`)
5. ✅ Must use proper React patterns for list rendering (map with keys)
6. ✅ Input must be controlled (value + onChange)
7. ✅ Must handle empty state appropriately
8. ✅ Code must follow React best practices for state updates
9. ✅ No direct state mutations - must use setState properly
10. ✅ Component must be self-contained and maintainable

### Industry Standards

The following industry standards will be checked:

- **TypeScript**: Proper type safety, interface definitions
- **React Patterns**: Functional components, hooks, controlled components
- **Code Style**: ESLint compliance, consistent formatting
- **Naming Conventions**: camelCase for variables/functions, PascalCase for components
- **State Management**: Proper useState usage, immutable updates
- **Array Operations**: Proper use of map, filter, spread operator
- **Component Design**: Single responsibility, proper separation of concerns

**Important:** The review will **only** check what is specified above. There are no hidden requirements. If a requirement is unclear, treat the bullet above as the single source of truth.

---

## What the tests look for (so you can sync your UI)

The unit and E2E tests use these selectors. Match them so tests pass:

| What | Selector / requirement |
|------|------------------------|
| Input for new todo | Placeholder text matching **"add todo"** (e.g. `placeholder="Add todo"`). Case-insensitive. |
| Add button | A `<button>` (or button role) with **accessible name** matching **/add/i** (e.g. "Add", "Add Todo"). |
| Toggle completion | A **checkbox** (`role="checkbox"`) for each todo so users can mark it complete. |
| Delete button | A button with name matching **/delete/i** (e.g. "Delete", "Remove") per todo item. |
| Completed styling | Completed todos must be **visually distinct** (e.g. strikethrough, different color). E2E checks for `text-decoration: line-through` or similar. |

Use `data-testid="todo-list"` on the container if you want (optional); tests don’t require it. List items should be in a list (e.g. `<ul>`/`<li>`) with a checkbox and delete button per item.

## Learning Hints (no solution code)

- **State for the list**: Use `useState` with an array of items. Each item needs `id`, `text`, `completed` (see Technical Requirements above).
- **Adding todos**: Controlled input + button or form submit. Use placeholder like "Add todo" and a button with text "Add" (or similar matching /add/i).
- **Toggling and deleting**: Use a checkbox (role="checkbox") per todo for completion; a button with "Delete" or "Remove" per todo. Completed items must be visually distinct (e.g. strikethrough).

## Next Steps

1. **Read this file** - All requirements are listed above
2. **Implement the component** - Follow the instructions and requirements
3. **Verify visually** - Run `npm run dev` and check `/challenge/02-todo-list`
4. **Run review** - `npm run review -- --challenge=02-todo-list` to get scored

**Setup**: If you haven't run setup yet, go to repo root and run `npm run setup` to install all dependencies and Playwright browsers.  
**Full guide**: See repo root [README.md](../../../../../README.md) for setup, workflow, and completion policy.
