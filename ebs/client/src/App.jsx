import { useEffect, useState } from 'react'
import getQuestionsList from '../helpers/question.js';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  useEffect(()=>{
    getQuestionsList();
  },[])
  return (
    <>
      
    </>
  )
}

export default App
