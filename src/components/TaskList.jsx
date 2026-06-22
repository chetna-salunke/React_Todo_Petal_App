import { useSelector } from 'react-redux'
import { selectFilteredTodos } from '../store/todoSlice'
import TaskCard from './TaskCard'

const EMPTY_LINES = [
  { art: '🌿', title: 'Nothing here yet', sub: 'Add a task above to get started' },
  { art: '🍃', title: 'All clear', sub: 'No tasks match this view right now' },
  { art: '🪴', title: 'Quiet day', sub: 'Try a different filter or add something new' },
]

const TaskList = () => {
  const todos = useSelector(selectFilteredTodos)
  const { loading } = useSelector(s => s.todos)

  if (loading) {
    return (
      <div className="task-stack">
        {[1, 2, 3, 4].map(i => <div className="bone" key={i}></div>)}
      </div>
    )
  }

  if (todos.length === 0) {
    const pick = EMPTY_LINES[Math.floor(Math.random() * EMPTY_LINES.length)]
    return (
      <div className="nothing-here">
        <div className="nothing-art">{pick.art}</div>
        <div className="nothing-title">{pick.title}</div>
        <div className="nothing-sub">{pick.sub}</div>
      </div>
    )
  }

  return (
    <div className="task-stack">
      {todos.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}

export default TaskList
