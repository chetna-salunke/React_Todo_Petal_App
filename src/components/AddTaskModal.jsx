import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, CATEGORIES } from '../store/todoSlice'
import { closeAddModal } from '../store/uiSlice'
import { useForm } from '../hooks/useForm'

const INITIAL = { title: '', description: '', priority: 'medium', category: '', dueDate: '' }

const AddTaskModal = () => {
  const dispatch = useDispatch()
  const { addModalOpen } = useSelector(s => s.ui)
  const { values, errors, handleChange, validate, reset } = useForm(INITIAL)

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') dispatch(closeAddModal()) }
    if (addModalOpen) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [addModalOpen, dispatch])

  if (!addModalOpen) return null

  const handleSubmit = () => {
    if (!validate({ title: { required: true, message: 'Give your task a name' } })) return
    dispatch(addTodo({ ...values, category: values.category || 'Personal' }))
    dispatch(closeAddModal())
    reset()
  }

  return (
    <div className="veil" onClick={e => { if (e.target === e.currentTarget) dispatch(closeAddModal()) }}>
      <div className="sheet">
        <div className="sheet-head">
          <div className="sheet-title">
            <span>🌱</span> New Task
          </div>
          <button className="round-btn" onClick={() => dispatch(closeAddModal())}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="field-block">
          <label className="field-label">Title</label>
          <input
            className="field-input"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="What needs doing?"
            autoFocus
          />
          {errors.title && <div className="field-error">{errors.title}</div>}
        </div>

        <div className="field-block">
          <label className="field-label">Notes</label>
          <textarea
            className="field-textarea"
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="Any details worth remembering..."
          />
        </div>

        <div className="field-grid">
          <div>
            <label className="field-label">Priority</label>
            <select className="field-input" name="priority" value={values.priority} onChange={handleChange}>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🔵 Low</option>
            </select>
          </div>
          <div>
            <label className="field-label">Category</label>
            <select className="field-input" name="category" value={values.category} onChange={handleChange}>
              <option value="">Personal</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Due</label>
            <input
              type="date"
              className="field-input"
              name="dueDate"
              value={values.dueDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="sheet-foot">
          <button className="btn-quiet" onClick={() => { dispatch(closeAddModal()); reset() }}>Cancel</button>
          <button className="btn-bloom" onClick={handleSubmit}>
            <i className="bi bi-check-lg"></i> Add Task
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddTaskModal
