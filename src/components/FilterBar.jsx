import { useDispatch, useSelector } from 'react-redux'
import { setView, setSort } from '../store/todoSlice'

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
]

const FilterBar = () => {
  const dispatch = useDispatch()
  const { view, sort } = useSelector(s => s.todos)

  return (
    <div className="tab-row">
      {tabs.map(t => (
        <button
          key={t.value}
          className={`tab-pill ${view === t.value ? 'is-active' : ''}`}
          onClick={() => dispatch(setView(t.value))}
        >
          {t.label}
        </button>
      ))}

      <div className="tab-row-spacer"></div>

      <select className="sort-field" value={sort} onChange={e => dispatch(setSort(e.target.value))}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="priority">Priority</option>
        <option value="alpha">A → Z</option>
      </select>
    </div>
  )
}

export default FilterBar
