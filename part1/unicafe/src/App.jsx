import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  const getAll = () => good + neutral + bad
  const getAverage = () => {
    const all = getAll()
    if (all === 0) return 0
    return (good - bad) / all
  }
  const getPositive = () => {
    const all = getAll()
    if (all === 0) return 'No data'
    return `${(good / all) * 100} %`
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {getAll()}</p>
      <p>average {getAverage()}</p>
      <p>positive {getPositive()}</p>
    </div>
  )
}

export default App