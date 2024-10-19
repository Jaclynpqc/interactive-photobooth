/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
// eslint-disable-next-line no-unused-vars
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className = "max-w-screen-sm bg-gray-100 overflow-hidden">
      <p className = "text-center font-serif text-gray-950"> Hello World</p>
    </div>
  )
}

export default App
