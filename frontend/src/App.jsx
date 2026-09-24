
import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Dashboard from './components/dashboard/Dashboard'

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('devtrack-theme')
    return savedTheme || 'light'
  })

  useEffect(() => {
    localStorage.setItem('devtrack-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme(currentTheme => currentTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`app-shell ${theme}`}>
      <Navbar title="DevTrack" theme={theme} onToggleTheme={toggleTheme} />
      <Dashboard />
    </div>
  )
}

export default App