import { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo, toggleTodo } from '../store/todoSlice'
import { openEditModal } from '../store/uiSlice'

const PRIORITY_META = {
  high:   { color: 'var(--coral)',  deep: 'var(--coral-deep)',  bg: 'rgba(241,168,162,0.20)', label: 'High' },
  medium: { color: 'var(--peach)',  deep: 'var(--peach-deep)',  bg: 'rgba(241,197,167,0.24)', label: 'Medium' },
  low:    { color: 'var(--sky)',    deep: 'var(--sky-deep)',    bg: 'rgba(167,211,241,0.20)', label: 'Low' },
}

const CATEGORY_TINT = {
  Work:     { bg: 'rgba(167,211,241,0.20)', deep: 'var(--sky-deep)' },
  Personal: { bg: 'rgba(168,162,241,0.18)', deep: 'var(--lavender-deep)' },
  Shopping: { bg: 'rgba(241,168,162,0.20)', deep: 'var(--coral-deep)' },
  Health:   { bg: 'rgba(241,197,167,0.22)', deep: 'var(--peach-deep)' },
  Learning: { bg: 'rgba(241,225,167,0.30)', deep: 'var(--butter-deep)' },
}

const formatDue = (iso) => {
  if (!iso) return null
  const d = new Date(iso)
  const now = new Date()
  d.setHours(0,0,0,0); now.setHours(0,0,0,0)
  const diffDays = Math.round((d - now) / 86400000)
  if (diffDays < 0) return { label: 'Overdue', late: true }
  if (diffDays === 0) return { label: 'Today', late: false }
  if (diffDays === 1) return { label: 'Tomorrow', late: false }
  return { label: `${diffDays}d left`, late: false }
}

const TaskCard = memo(({ task }) => {
  const dispatch = useDispatch()

  const handleToggle = useCallback(() => {
    dispatch(toggleTodo({ id: task.id, completed: !task.completed }))
  }, [dispatch, task.id, task.completed])

  const handleDelete = useCallback(() => {
    if (window.confirm('Remove this task?')) dispatch(deleteTodo(task.id))
  }, [dispatch, task.id])

  const handleEdit = useCallback(() => {
    dispatch(openEditModal(task))
  }, [dispatch, task])

  const pri = PRIORITY_META[task.priority] || PRIORITY_META.medium
  const catTint = CATEGORY_TINT[task.category]
  const due = formatDue(task.dueDate)

  return (
    <div className={`task-row ${task.completed ? 'is-done' : ''}`}>
      <div
        className={`task-tick ${task.completed ? 'checked' : ''}`}
        style={{ '--tick-color': pri.deep }}
        onClick={handleToggle}
        role="checkbox"
        aria-checked={task.completed}
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && handleToggle()}
      >
        {task.completed && <i className="bi bi-check-lg"></i>}
      </div>

      <div className="task-main">
        <div className="task-name">{task.title}</div>
        {task.description && <div className="task-note">{task.description}</div>}

        <div className="task-tags">
          <span className="pebble" style={{ background: pri.bg, color: pri.deep }}>
            {pri.label}
          </span>
          {task.category && catTint && (
            <span className="pebble" style={{ background: catTint.bg, color: catTint.deep }}>
              {task.category}
            </span>
          )}
          {due && (
            <span className={`due-note ${due.late ? 'is-late' : ''}`}>
              <i className={`bi ${due.late ? 'bi-exclamation-circle-fill' : 'bi-calendar3'}`}></i>
              {due.label}
            </span>
          )}
        </div>
      </div>

      <div className="task-tools">
        <button className="tool-btn t-edit" onClick={handleEdit} title="Edit">
          <i className="bi bi-pencil"></i>
        </button>
        <button className="tool-btn t-del" onClick={handleDelete} title="Delete">
          <i className="bi bi-trash3"></i>
        </button>
      </div>
    </div>
  )
})

TaskCard.displayName = 'TaskCard'
export default TaskCard
