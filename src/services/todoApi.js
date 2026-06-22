import axios from 'axios'

// ─── Axios Instance ───
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg = error.response?.data?.message || error.message || 'Network error'
    return Promise.reject(new Error(msg))
  }
)

const STORAGE_KEY = 'petal_todos_v2'

const getLocal = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null } catch { return null }
}

const saveLocal = (data) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch {}
}

const days = (n) => new Date(Date.now() + n * 86400000).toISOString()
const hoursAgo = (n) => new Date(Date.now() - n * 3600000).toISOString()

const seedData = [
  // Work
  { id: 1, title: 'Finish quarterly report', description: 'Pull numbers from finance and write the summary section.', priority: 'high', category: 'Work', completed: false, createdAt: hoursAgo(70), dueDate: days(1) },
  { id: 2, title: 'Review pull requests', description: 'Three PRs waiting on review in the dashboard repo.', priority: 'medium', category: 'Work', completed: true, createdAt: hoursAgo(60), dueDate: days(-1) },
  { id: 3, title: 'Prep slides for Monday standup', description: '', priority: 'medium', category: 'Work', completed: false, createdAt: hoursAgo(20), dueDate: days(3) },
  { id: 4, title: 'Email client about timeline', description: 'They asked for an updated delivery estimate.', priority: 'low', category: 'Work', completed: false, createdAt: hoursAgo(5), dueDate: days(2) },

  // Personal
  { id: 5, title: 'Call mom for her birthday', description: '', priority: 'high', category: 'Personal', completed: false, createdAt: hoursAgo(40), dueDate: days(0) },
  { id: 6, title: 'Organize the bookshelf', description: 'Donate the ones I have not touched in a year.', priority: 'low', category: 'Personal', completed: true, createdAt: hoursAgo(90), dueDate: days(-3) },
  { id: 7, title: 'Plan weekend trip', description: 'Look at cabins near the lake for next month.', priority: 'medium', category: 'Personal', completed: false, createdAt: hoursAgo(12), dueDate: days(6) },
  { id: 8, title: 'Write in journal', description: '', priority: 'low', category: 'Personal', completed: false, createdAt: hoursAgo(2), dueDate: days(0) },

  // Shopping
  { id: 9, title: 'Buy birthday gift for Sam', description: 'He mentioned wanting new headphones.', priority: 'high', category: 'Shopping', completed: false, createdAt: hoursAgo(30), dueDate: days(1) },
  { id: 10, title: 'Grocery run', description: 'Milk, eggs, spinach, coffee beans, pasta.', priority: 'medium', category: 'Shopping', completed: true, createdAt: hoursAgo(48), dueDate: days(-2) },
  { id: 11, title: 'Order new running shoes', description: '', priority: 'low', category: 'Shopping', completed: false, createdAt: hoursAgo(8), dueDate: days(5) },
  { id: 12, title: 'Pick up dry cleaning', description: '', priority: 'low', category: 'Shopping', completed: false, createdAt: hoursAgo(1), dueDate: days(0) },

  // Health
  { id: 13, title: 'Morning run — 5k', description: '', priority: 'medium', category: 'Health', completed: true, createdAt: hoursAgo(15), dueDate: days(-1) },
  { id: 14, title: 'Dentist appointment', description: 'Annual checkup at 3:30pm.', priority: 'high', category: 'Health', completed: false, createdAt: hoursAgo(55), dueDate: days(4) },
  { id: 15, title: 'Meal prep for the week', description: 'Chicken, rice, roasted vegetables.', priority: 'medium', category: 'Health', completed: false, createdAt: hoursAgo(3), dueDate: days(0) },
  { id: 16, title: 'Refill prescription', description: '', priority: 'high', category: 'Health', completed: false, createdAt: hoursAgo(6), dueDate: days(2) },

  // Learning
  { id: 17, title: 'Finish React course module 4', description: 'The section on custom hooks and context.', priority: 'medium', category: 'Learning', completed: false, createdAt: hoursAgo(25), dueDate: days(3) },
  { id: 18, title: 'Read 30 pages of current book', description: '', priority: 'low', category: 'Learning', completed: true, createdAt: hoursAgo(80), dueDate: days(-4) },
  { id: 19, title: 'Practice Spanish on Duolingo', description: '', priority: 'low', category: 'Learning', completed: false, createdAt: hoursAgo(4), dueDate: days(0) },
  { id: 20, title: 'Watch design systems talk', description: 'Saved it last week, about 40 minutes long.', priority: 'low', category: 'Learning', completed: false, createdAt: hoursAgo(10), dueDate: days(7) },
]

let nextId = 100

export const todoApi = {
  async getAll() {
    const local = getLocal()
    if (local) return local
    saveLocal(seedData)
    return seedData
  },

  async create(todo) {
    const newTodo = {
      id: Date.now() + nextId++,
      ...todo,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    const local = getLocal() || []
    const updated = [newTodo, ...local]
    saveLocal(updated)

    try {
      await api.post('/todos', { title: todo.title, completed: false, userId: 1 })
    } catch {}

    return newTodo
  },

  async update(id, data) {
    const local = getLocal() || []
    const idx = local.findIndex(t => t.id === id)
    if (idx === -1) throw new Error('Task not found')
    const updated = { ...local[idx], ...data, updatedAt: new Date().toISOString() }
    local[idx] = updated
    saveLocal(local)

    try {
      await api.patch(`/todos/${id <= 200 ? id : 1}`, data)
    } catch {}

    return updated
  },

  async delete(id) {
    const local = getLocal() || []
    const filtered = local.filter(t => t.id !== id)
    saveLocal(filtered)

    try {
      await api.delete(`/todos/1`)
    } catch {}

    return true
  },
}
