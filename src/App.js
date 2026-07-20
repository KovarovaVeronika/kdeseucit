import { Routes, Route } from 'react-router-dom'
import { PageView } from './ui/PageView'
import { routes } from './routes'

function App() {
  return (
    <div className="App">
      <Routes>
        {routes.map(({ path, slug }) => (
          <Route key={path} path={path} element={<PageView slug={slug} />} />
        ))}
      </Routes>
    </div>
  )
}

export default App
