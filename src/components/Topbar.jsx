import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../store/uiSlice'
import { setSearch } from '../store/todoSlice'
import { openAddModal } from '../store/uiSlice'

const Topbar = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(s => s.todos.searchQuery)

  return (
    <header className="topbar">
      <button className="menu-toggle" onClick={() => dispatch(toggleSidebar())}>
        <i className="bi bi-list"></i>
      </button>

      <div className="search-field">
        <i className="bi bi-search"></i>
        <input
          placeholder="Search your tasks..."
          value={searchQuery}
          onChange={e => dispatch(setSearch(e.target.value))}
        />
      </div>

      <div className="topbar-spacer"></div>

      <div className="topbar-actions">
        <button className="round-btn" title="Notifications">
          <i className="bi bi-bell"></i>
        </button>
        <button className="btn-bloom" onClick={() => dispatch(openAddModal())}>
          <i className="bi bi-plus-lg"></i>
          <span>New Task</span>
        </button>
        <div className="avatar-chip" title="Profile">P</div>
      </div>
    </header>
  )
}

export default Topbar
