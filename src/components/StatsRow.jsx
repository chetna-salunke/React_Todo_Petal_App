import { useSelector } from 'react-redux'
import { selectStats } from '../store/todoSlice'

const StatsRow = () => {
  const stats = useSelector(selectStats)
  const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
  const radius = 21
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="ribbon">
      <div className="ribbon-ring">
        <svg width="52" height="52" viewBox="0 0 52 52">
          <circle cx="26" cy="26" r={radius} fill="none" stroke="#ece3dc" strokeWidth="5" />
          <circle
            cx="26" cy="26" r={radius} fill="none"
            stroke="url(#ringGrad)" strokeWidth="5" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 26 26)"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f1a8a2" />
              <stop offset="100%" stopColor="#a8a2f1" />
            </linearGradient>
          </defs>
          <text x="26" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="Inter" fill="#3a3431">{pct}%</text>
        </svg>
      </div>

      <div className="ribbon-stats">
        <div className="ribbon-stat">
          <span className="ribbon-num">{stats.total}</span>
          <span className="ribbon-lbl">total</span>
        </div>
        <div className="ribbon-stat">
          <span className="ribbon-num" style={{ color: 'var(--sky-deep)' }}>{stats.active}</span>
          <span className="ribbon-lbl">active</span>
        </div>
        <div className="ribbon-stat">
          <span className="ribbon-num" style={{ color: 'var(--lavender-deep)' }}>{stats.completed}</span>
          <span className="ribbon-lbl">done</span>
        </div>
        <div className="ribbon-stat">
          <span className="ribbon-num" style={{ color: 'var(--coral-deep)' }}>{stats.high}</span>
          <span className="ribbon-lbl">urgent</span>
        </div>
      </div>
    </div>
  )
}

export default StatsRow
