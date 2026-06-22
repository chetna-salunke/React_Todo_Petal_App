import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, CATEGORIES } from '../store/todoSlice'

const Composer = () => {
  const dispatch = useDispatch()
  const { category } = useSelector(s => s.todos)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [cat, setCat] = useState(category !== 'all' ? category : '')
  const [dueDate, setDueDate] = useState('')

  const reset = useCallback(() => {
    setTitle(''); setDescription(''); setPriority('medium'); setDueDate('')
    setCat(category !== 'all' ? category : '')
    setOpen(false)
  }, [category])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (!title.trim()) return
    dispatch(addTodo({ title: title.trim(), description, priority, category: cat || 'Personal', dueDate }))
    reset()
  }, [title, description, priority, cat, dueDate, dispatch, reset])

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <div className="composer-row">
        <i className="bi bi-plus-circle"></i>
        <input
          className="composer-input"
          placeholder="Add a task... press Enter to expand details"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onFocus={() => setOpen(true)}
        />
      </div>

      {open && (
        <div className="composer-expand">
          <textarea
            className="composer-desc"
            placeholder="Add a note (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <div className="composer-controls">
            <select className="chip-select" value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🔵 Low</option>
            </select>
            <select className="chip-select" value={cat} onChange={e => setCat(e.target.value)}>
              <option value="">Category</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input
              type="date"
              className="date-chip"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
            <button type="button" className="btn-quiet" onClick={reset}>Cancel</button>
            <button type="submit" className="composer-submit" disabled={!title.trim()}>
              <i className="bi bi-arrow-return-left"></i> Add
            </button>
          </div>
        </div>
      )}
    </form>
  )
}

export default Composer
