import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { todoApi } from '../services/todoApi'
import { toast } from 'react-toastify'

// ─── Async Thunks ───
export const fetchTodos = createAsyncThunk('todos/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await todoApi.getAll()
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const addTodo = createAsyncThunk('todos/add', async (todo, { rejectWithValue }) => {
  try {
    return await todoApi.create(todo)
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const updateTodo = createAsyncThunk('todos/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    return await todoApi.update(id, data)
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const deleteTodo = createAsyncThunk('todos/delete', async (id, { rejectWithValue }) => {
  try {
    await todoApi.delete(id)
    return id
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const toggleTodo = createAsyncThunk('todos/toggle', async ({ id, completed }, { rejectWithValue }) => {
  try {
    return await todoApi.update(id, { completed })
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

// ─── Slice ───
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
    view: 'all',       // all | active | completed
    category: 'all',   // all | Work | Personal | Shopping | Health | Learning
    sort: 'newest',
    searchQuery: '',
  },
  reducers: {
    setView: (state, action) => { state.view = action.payload; state.category = 'all' },
    setCategory: (state, action) => { state.category = action.payload; state.view = 'all' },
    setSort: (state, action) => { state.sort = action.payload },
    setSearch: (state, action) => { state.searchQuery = action.payload },
    clearError: (state) => { state.error = null },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => { state.loading = true; state.error = null })
    builder.addCase(fetchTodos.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
    builder.addCase(fetchTodos.rejected, (state, action) => { state.loading = false; state.error = action.payload; toast.error('Could not load tasks') })

    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.items.unshift(action.payload)
      toast.success('Added to your list ✨')
    })
    builder.addCase(addTodo.rejected, (_, action) => { toast.error(action.payload) })

    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const idx = state.items.findIndex(t => t.id === action.payload.id)
      if (idx !== -1) state.items[idx] = action.payload
      toast.success('Task updated')
    })
    builder.addCase(updateTodo.rejected, (_, action) => { toast.error(action.payload) })

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload)
      toast.success('Removed')
    })
    builder.addCase(deleteTodo.rejected, (_, action) => { toast.error(action.payload) })

    builder.addCase(toggleTodo.fulfilled, (state, action) => {
      const idx = state.items.findIndex(t => t.id === action.payload.id)
      if (idx !== -1) state.items[idx] = action.payload
    })
  },
})

export const { setView, setCategory, setSort, setSearch, clearError } = todoSlice.actions
export default todoSlice.reducer

// ─── Selectors ───
export const selectFilteredTodos = (state) => {
  let items = [...state.todos.items]
  const { view, category, sort, searchQuery } = state.todos

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase()
    items = items.filter(t => t.title.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q))
  }

  if (category !== 'all') {
    items = items.filter(t => t.category === category)
  } else {
    if (view === 'active') items = items.filter(t => !t.completed)
    else if (view === 'completed') items = items.filter(t => t.completed)
  }

  if (sort === 'newest') items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  else if (sort === 'oldest') items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  else if (sort === 'priority') {
    const p = { high: 0, medium: 1, low: 2 }
    items.sort((a, b) => (p[a.priority] ?? 1) - (p[b.priority] ?? 1))
  } else if (sort === 'alpha') {
    items.sort((a, b) => a.title.localeCompare(b.title))
  }

  return items
}

export const selectStats = (state) => {
  const items = state.todos.items
  return {
    total: items.length,
    active: items.filter(t => !t.completed).length,
    completed: items.filter(t => t.completed).length,
    high: items.filter(t => t.priority === 'high' && !t.completed).length,
  }
}

export const CATEGORIES = ['Work', 'Personal', 'Shopping', 'Health', 'Learning']

export const selectCategoryCounts = (state) => {
  const items = state.todos.items
  const counts = {}
  CATEGORIES.forEach(c => { counts[c] = items.filter(t => t.category === c).length })
  return counts
}
