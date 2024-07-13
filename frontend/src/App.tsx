import './App.css'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='main-container'>
        <h1>Student Dashboard</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </div>
    </>
  )
}

export default App
