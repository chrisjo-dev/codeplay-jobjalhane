import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PDFUploader from './components/PDFUploader'
import ResultPage from './pages/ResultPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <header className="App-header">
              <h1>잡잘하다</h1>
              <p className="subtitle">AI 기반 적성검사 분석 및 커리어 추천 서비스</p>
            </header>
            <main className="App-main">
              <PDFUploader />
            </main>
            <footer className="App-footer">
              <p>&copy; 2024 잡잘하다. All rights reserved.</p>
            </footer>
          </div>
        } />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  )
}

export default App
