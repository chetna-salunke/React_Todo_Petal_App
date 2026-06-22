import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import StatsRow from './components/StatsRow'
import FilterBar from './components/FilterBar'
import Composer from './components/Composer'
import TaskList from './components/TaskList'
import AddTaskModal from './components/AddTaskModal'
import EditTaskModal from './components/EditTaskModal'

const VIEW_TITLES = {
  all: { title: 'All Tasks', eyebrow: 'Everything on your plate' },
  active: { title: 'Active', eyebrow: 'Still in motion' },
  completed: { title: 'Completed', eyebrow: 'Look how far you\'ve come' },
}

const todayLabel = () => new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

function App() {
  const { view, category } = useSelector(s => s.todos)

  const heading = category !== 'all'
    ? { title: category, eyebrow: `${category} tasks` }
    : (VIEW_TITLES[view] || VIEW_TITLES.all)

  return (
    <>
      <div className="app-shell">
        <Sidebar />

        <div className="main">
          <Topbar />

          <div className="body-scroll">
            <div className="canvas">
              <div className="page-head">
                <div>
                  <div className="page-eyebrow">{heading.eyebrow}</div>
                  <h1 className="page-title">{heading.title}</h1>
                  <div className="page-date">{todayLabel()}</div>
                </div>
              </div>

              <StatsRow />
              <Composer />
              <FilterBar />
              <TaskList />
            </div>
          </div>
        </div>
      </div>

      <AddTaskModal />
      <EditTaskModal />

      <ToastContainer
        position="bottom-right"
        autoClose={2200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
