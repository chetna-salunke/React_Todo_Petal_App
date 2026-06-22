import { useDispatch, useSelector } from 'react-redux'
import { setView, setCategory, selectStats, selectCategoryCounts, CATEGORIES } from '../store/todoSlice'
import { closeSidebar } from '../store/uiSlice'

const VIEWS = [
  { key: 'all', label: 'All Tasks', emoji: '📋', statKey: 'total' },
  { key: 'active', label: 'Active', emoji: '⚡', statKey: 'active' },
  { key: 'completed', label: 'Completed', emoji: '✅', statKey: 'completed' },
]

const CATEGORY_META = {
  Work:     { emoji: '💼', dot: 'var(--sky)',     tint: 'rgba(167,211,241,0.20)', deep: 'var(--sky-deep)' },
  Personal: { emoji: '🏠', dot: 'var(--lavender)', tint: 'rgba(168,162,241,0.18)', deep: 'var(--lavender-deep)' },
  Shopping: { emoji: '🛒', dot: 'var(--coral)',    tint: 'rgba(241,168,162,0.20)', deep: 'var(--coral-deep)' },
  Health:   { emoji: '💪', dot: 'var(--peach)',    tint: 'rgba(241,197,167,0.22)', deep: 'var(--peach-deep)' },
  Learning: { emoji: '📚', dot: 'var(--butter)',   tint: 'rgba(241,225,167,0.28)', deep: 'var(--butter-deep)' },
}

const Sidebar = () => {
  const dispatch = useDispatch()
  const { view, category } = useSelector(s => s.todos)
  const { sidebarOpen } = useSelector(s => s.ui)
  const stats = useSelector(selectStats)
  const catCounts = useSelector(selectCategoryCounts)

  const pick = (fn) => { fn(); dispatch(closeSidebar()) }

  return (
    <>
      <aside className={`sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="sidebar-head">
          <div className="mark">
            <div className="mark-bloom">🌸</div>
            <div>
              <div className="mark-name">Petal</div>
              <div className="mark-sub">your daily list</div>
            </div>
          </div>
        </div>

        <div className="sidebar-scroll">
          <div className="side-label">Views</div>
          {VIEWS.map(v => (
            <button
              key={v.key}
              className={`side-item ${category === 'all' && view === v.key ? 'is-active' : ''}`}
              style={{ '--item-tint': 'rgba(168,162,241,0.14)', '--item-deep': 'var(--lavender-deep)' }}
              onClick={() => pick(() => dispatch(setView(v.key)))}
            >
              <span className="side-emoji">{v.emoji}</span>
              <span className="side-name">{v.label}</span>
              <span className="side-count">{stats[v.statKey]}</span>
            </button>
          ))}

          <div className="side-label">Categories</div>
          <button
            className={`side-item ${category === 'all' && view === 'all' ? 'is-active' : ''}`}
            style={{ '--item-tint': 'rgba(168,162,241,0.14)', '--item-deep': 'var(--lavender-deep)' }}
            onClick={() => pick(() => dispatch(setView('all')))}
          >
            <span className="side-dot" style={{ '--dot-color': 'var(--ink-faint)' }}></span>
            <span className="side-name">All</span>
            <span className="side-count">{stats.total}</span>
          </button>

          {CATEGORIES.map(cat => {
            const meta = CATEGORY_META[cat]
            const active = category === cat
            return (
              <button
                key={cat}
                className={`side-item ${active ? 'is-active' : ''}`}
                style={{ '--item-tint': meta.tint, '--item-deep': meta.deep }}
                onClick={() => pick(() => dispatch(setCategory(cat)))}
              >
                <span className="side-emoji">{meta.emoji}</span>
                <span className="side-name">{cat}</span>
                <span className="side-count">{catCounts[cat]}</span>
              </button>
            )
          })}
        </div>

        <div className="sidebar-foot">
          <p className="brew-note">"Small steps, every day."</p>
        </div>
      </aside>
      <div className="scrim" onClick={() => dispatch(closeSidebar())}></div>
    </>
  )
}

export default Sidebar
