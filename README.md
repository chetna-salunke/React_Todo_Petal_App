# 🌸 Petal — Your Daily Tasks

A single-page task manager with a warm, hand-arranged aesthetic. Built with **Vite + React 18**, **Redux Toolkit**, **Axios**, and **Bootstrap 5**.

## Palette
| Coral | Peach | Butter | Sky | Lavender |
|---|---|---|---|---|
| `#f1a8a2` | `#f1c5a7` | `#f1e1a7` | `#a7d3f1` | `#a8a2f1` |

Paired with a warm off-white paper background (`#fffaf6`), a `Fraunces` display serif for headings, and `Inter` for body text — designed to feel composed by hand, not generated.

## Structure
- **Views**: All Tasks, Active, Completed
- **Categories**: Work 💼 · Personal 🏠 · Shopping 🛒 · Health 💪 · Learning 📚
- Inline composer to quick-add tasks, plus a full modal for detailed entries
- Circular progress ring, priority pebbles, due-date chips
- Fully responsive: sidebar collapses to a slide-over drawer under 920px

## Tech Stack
- ⚡ Vite — build tool
- ⚛️ React 18 — hooks (`useState`, `useEffect`, `useCallback`, `memo`)
- 🔴 Redux Toolkit — `createSlice`, `createAsyncThunk`, `configureStore`, selectors
- 🌐 Axios — instance with interceptors + JSONPlaceholder integration
- 🎨 Bootstrap 5 (grid/utilities) + a fully custom design system on top
- 🍞 react-toastify — toast notifications

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — tasks persist to `localStorage` and reseed with 20 sample tasks across all 5 categories on first run.

## Project Structure
```
src/
├── components/     Sidebar, Topbar, Composer, TaskCard, TaskList,
│                   FilterBar, StatsRow, AddTaskModal, EditTaskModal
├── store/          store.js, todoSlice.js (views/categories/thunks), uiSlice.js
├── services/       todoApi.js (axios + localStorage persistence)
├── hooks/          useTodos.js, useForm.js
└── styles/         global.css (full pastel design-token system)
```
