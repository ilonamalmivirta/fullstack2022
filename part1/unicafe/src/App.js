import { useState } from 'react'

const Header = (props) => {
  console.log(props)
  return (
      <h1>
         {props.title}
      </h1>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.stats.all===0) {
    return (
      <div>
        <p>No feecback given</p>
      </div>
    )
  }
  else {
    return (
      <table>
        <tbody> 
          <StatisticLine text="good" value={props.stats.good} />
          <StatisticLine text="neutral" value={props.stats.neutral} />
          <StatisticLine text="bad" value={props.stats.bad} />
          <StatisticLine text="all" value={props.stats.all} />
          <StatisticLine text="average" value={props.stats.average} />
          <StatisticLine text="positive" value={props.stats.positive} />
        </tbody>
      </table>
    )
  }
}

const App = () => {
  const title1 = 'give feedback'
  const title2 = 'statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good+neutral+bad
  const average = ((good-bad)/all)
  const positive = ((good/all)*100) + '%'

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average,
    positive: positive,
  }

  const setToGood = newValue => {
    setGood(newValue)
  }

  const setToNeutral = newValue => {
    setNeutral(newValue)
  }

  const setToBad = newValue => {
    setBad(newValue)
  }

  return (
    <div>
      <Header title={title1} />
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <Header title={title2} />
      <Statistics stats={stats} />
    </div>
  )
}

export default App