import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ListPage, DetailPage, FormPage } from './pages'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/property/:id" element={<DetailPage />} />
          <Route path="/property/:id/edit" element={<FormPage />} />
          <Route path="/create" element={<FormPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
