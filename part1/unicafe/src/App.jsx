import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => <p>{text} {value} {(text === 'positive')? '%':''}</p>

const Statistics = ({ good, neutral, bad }) => {
  const getAll = () => good + neutral + bad
  const getAverage = () => (good - bad) / getAll()
  const getPositive = () => (good / getAll()) * 100

  if (getAll() === 0) return <p>No feedback given</p>

  return (
    <>
      <h1>statistics</h1>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={getAll()} />
      <StatisticLine text='average' value={getAverage()} />
      <StatisticLine text='positive' value={getPositive()} />
    </>
  )

}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App