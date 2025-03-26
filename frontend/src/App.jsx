import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Button'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Router>
      <Header />
      </Router>
      <div className="card">
        <Button text={`Count is ${count}`} onClick={() => setCount((count) => count + 1)} className={"cursor-not-allowed opacity-50"}/>
        <button text="okkk">
      Hello
      </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button text="Go to Dashboard" />

      
     

    </>
  )
}

export default App
