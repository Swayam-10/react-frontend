# Challenge 01: User Profile Component

## Problem Statement

Build a user profile component that displays user information with proper React patterns. Create a `UserProfile` component that displays:
- User name
- Email address
- Profile picture (or placeholder)
- A "Follow" button that toggles between "Follow" and "Following"

---

## What you need to do (summary)

1. **One file:** Implement `src/components/UserProfile.tsx` (create or complete it). Do not modify App.tsx to add the component—it is already wired on the challenge route.
2. **Component:** A single React component named exactly `UserProfile`, default-exported.
3. **Props:** The component must accept exactly these props: `name` (string), `email` (string), `avatar` (optional string). Use a TypeScript interface (e.g. `UserProfileProps`).
4. **UI:** Render the name, email, and either an `<img>` when `avatar` is provided or a placeholder (e.g. circle with initial letter) when it is not. Render a button that shows "Follow" or "Following".
5. **State:** Use `useState` to track whether the user is following (e.g. `isFollowing`). Clicking the button toggles between "Follow" and "Following".
6. **Code style:** Functional component, TypeScript, destructured props, descriptive handlers (e.g. `handleFollowClick`), no `console.*`, pass ESLint.

If you do the above, the automated review (tests, ESLint, architecture checks, best practices) will pass. Anything not listed in **Technical Requirements** below is not required.

---

## How the app is structured

- The **home page** (`/`) shows a list of challenges. Each challenge has a **"View Challenge UI"** button that takes you to that challenge’s route (e.g. `/challenge/01-user-profile`).
- **App.tsx** already imports and renders your component on that route. **Do not modify App.tsx**—you only implement `src/components/UserProfile.tsx`. The component is already wired; your job is to make it work.

## Instructions

1. **Do not modify App.tsx.** The `UserProfile` component is already imported and rendered on `/challenge/01-user-profile`. Only implement (or complete) `src/components/UserProfile.tsx`.
2. Create (or complete) the component file: `src/components/UserProfile.tsx`.
3. The component should accept user data as props: `name`, `email`, `avatar` (optional).
4. Implement state management for the follow button (e.g. `useState` for "Follow" / "Following").
5. Your component is already used on the challenge route—visit `/challenge/01-user-profile` (or click **View Challenge UI** for this challenge) to see your implementation.

## Visual Requirements

- The profile should be visually appealing
- Use proper spacing and layout
- The follow button should have clear visual feedback

## How to Verify

1. Run `npm run dev` and open the app in your browser
2. From the home page, click **View Challenge UI** for this challenge, or go directly to `/challenge/01-user-profile`
3. You should see the user profile displayed (name, email, avatar or placeholder, and Follow button)
4. Click the Follow button—it should toggle between "Follow" and "Following"
5. The UI should look clean and professional

---

## What the review checks

The automated review runs in this order and only checks what is listed in **Technical Requirements** below:

| Step | What it does |
|------|----------------|
| **Functional tests** | Vitest unit tests: component renders name, email, avatar/placeholder, Follow button; button toggles text between "Follow" and "Following"; file contains `useState`. |
| **Code quality** | ESLint on your code (no errors or warnings). |
| **Architecture** | AST check: functional component, props (e.g. params), `useState` in `UserProfile.tsx`. |
| **Best practices** | Heuristics: handler names, state names, TypeScript, no magic strings, etc. |
| **E2E** | Playwright: open `/challenge/01-user-profile`, check profile, name, email, button, toggle, avatar/placeholder. |
| **AI review** | Optional: qualitative feedback (small % of score). |

**Pass threshold:** Weighted score ≥ 60%. Meet the Technical Requirements and you pass; there are no hidden checks.

---

## Technical Requirements (What Will Be Reviewed)

### Functional Requirements

1. ✅ Component must be named `UserProfile` (PascalCase, exact name).
2. ✅ Component must accept props: `name` (string), `email` (string), `avatar` (optional string). Typed with a TypeScript interface.
3. ✅ Component must display user name (render the `name` prop).
4. ✅ Component must display user email (render the `email` prop).
5. ✅ Component must display avatar (when `avatar` is provided) or a placeholder (e.g. initial letter or icon when `avatar` is not provided).
6. ✅ Component must have a button with text "Follow" (exact spelling; tests are case-insensitive).
7. ✅ When clicked, the button text must toggle to "Following", and clicking again must toggle back to "Follow".
8. ✅ That state must be managed with React's `useState` hook (e.g. `const [isFollowing, setIsFollowing] = useState(false)`).

### Code Quality Requirements

1. ✅ Component must use TypeScript with proper type annotations
2. ✅ Props must be properly typed with TypeScript interface
3. ✅ Component must follow React functional component pattern
4. ✅ Code must pass ESLint checks (no errors, warnings allowed)
5. ✅ No console.log, console.error, or console.warn statements in production code
6. ✅ Code must be readable and well-structured
7. ✅ Variable and function names must be descriptive and follow camelCase convention

### Architecture Requirements

1. ✅ File must be exactly `src/components/UserProfile.tsx` (review looks at this path).
2. ✅ Component must be the default export (e.g. `export default UserProfile`).
3. ✅ Must be a function component (e.g. `function UserProfile(...)` or `const UserProfile = (...) =>`), not a class.
4. ✅ Must take at least one parameter (props); destructure in the signature (e.g. `{ name, email, avatar }`).
5. ✅ Must call `useState` inside the component for the follow state.
6. ✅ No class components—only functional components.

### Best Practices Requirements

1. ✅ Component must be a functional component (not class component)
2. ✅ Props interface must be defined with TypeScript
3. ✅ Event handlers must be properly named (e.g., `handleFollowClick`, not `onClick`)
4. ✅ State variable names must be descriptive (e.g., `isFollowing`, not `state`)
5. ✅ Conditional rendering must use proper React patterns (ternary or &&)
6. ✅ No hardcoded magic numbers or strings - use constants or props
7. ✅ Code must follow React best practices for component structure
8. ✅ Component must be self-contained and reusable

### Industry Standards

The following industry standards will be checked:

- **TypeScript**: Proper type safety and type annotations
- **React Patterns**: Functional components, hooks, proper state management
- **Code Style**: ESLint compliance, consistent formatting
- **Naming Conventions**: camelCase for variables/functions, PascalCase for components
- **Component Design**: Single responsibility, reusability, proper prop interfaces
- **Error Handling**: Graceful handling of edge cases (optional props, etc.)

**Important:** The review will **only** check what is specified above. There are no hidden requirements. If a requirement is unclear, treat the bullet above as the single source of truth.

---

## What the tests look for (so you can sync your UI)

The unit and E2E tests use these selectors. Match them so tests pass:

| What | Requirement |
|------|-------------|
| **Container** | `data-testid="user-profile"` on the root element of your component (so E2E can find it). |
| **Avatar or placeholder** | When `avatar` is not passed, show a placeholder (e.g. circle with initial). Give it `data-testid="user-profile-avatar"` so E2E can assert "avatar or placeholder". When `avatar` is passed, use an `<img>` with the same `data-testid="user-profile-avatar"`. |
| **Follow button** | A `<button>` with text **"Follow"** (initial) and **"Following"** after click. Tests match /follow/i and /following/i (case-insensitive). |
| **Name and email** | Render the `name` and `email` props so they are visible (unit tests pass "John Doe" and "john@example.com"; E2E on the challenge route sees "John Doe" and "john.doe@example.com" from App). |

---

## Learning Hints (no solution code)

- **State for the button**: Use the React docs for `useState` to store follow/unfollow. The tests expect the button text to change (e.g. "Follow" ↔ "Following").
- **Props**: Type your props (name, email, avatar optional). See Technical Requirements above for exact prop names and types.
- **File and export**: Component must live in `src/components/UserProfile.tsx` and be the default export. The review checks file path and patterns.

## Next Steps

1. **Read this file** - All requirements are listed above
2. **Implement the component** - Follow the instructions and requirements
3. **Verify visually** - Run `npm run dev` and check `/challenge/01-user-profile`
4. **Run review** - `npm run review -- --challenge=01-user-profile` to get scored

**Setup**: If you haven't run setup yet, go to repo root and run `npm run setup` to install all dependencies and Playwright browsers.  
**Full guide**: See repo root [README.md](../../../../../README.md) for setup, workflow, and completion policy.
