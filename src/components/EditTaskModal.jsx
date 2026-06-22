import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTodo, CATEGORIES } from '../store/todoSlice'
import { closeEditModal } from '../store/uiSlice'
import { useForm } from '../hooks/useForm'

const EditTaskModal = () => {
  const dispatch = useDispatch()
  const task = useSelector(s => s.ui.editModalTask)
  const { values, errors, handleChange, validate, setValues } = useForm({
    title: '', description: '', priority: 'medium', category: '', dueDate: ''
  })

  useEffect(() => {
    if (task) {
      setValues({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        category: task.category || '',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      })
    }
  }, [task])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') dispatch(closeEditModal()) }
    if (task) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [task, dispatch])

  if (!task) return null

  const handleSubmit = () => {
    if (!validate({ title: { required: true, message: 'Give your task a name' } })) return
    dispatch(updateTodo({ id: task.id, data: values }))
    dispatch(closeEditModal())
  }

  return (
    <div className="veil" onClick={e => { if (e.target === e.currentTarget) dispatch(closeEditModal()) }}>
      <div className="sheet">
        <div className="sheet-head">
          <div className="sheet-title">
            <span>✏️</span> Edit Task
          </div>
          <button className="round-btn" onClick={() => dispatch(closeEditModal())}>
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
            placeholder="Task title"
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
            />
          </div>
        </div>

        <div className="sheet-foot">
          <button className="btn-quiet" onClick={() => dispatch(closeEditModal())}>Cancel</button>
          <button className="btn-bloom" onClick={handleSubmit}>
            <i className="bi bi-check-lg"></i> Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditTaskModal
