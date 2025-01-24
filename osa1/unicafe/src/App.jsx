import { useState } from 'react'

const Button = (props) => {

  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


const Statistics = (props) => {
    const avg = props.avg/props.all
    const pos = (props.good/props.all)*100+"%"

    if (props.all == 0){
      return(
        <div>
          <h1>Statistics</h1>
          <div>
            <p>No feedback given</p>
          </div>
        </div>
      )
    }
    {
      return(
        <div>
          <h1>statistics</h1>
          <div>
            <table>
            <StatisticsLine text="good" value={props.good}/>
            <StatisticsLine text="neutral" value={props.neutral}/>
            <StatisticsLine text="bad" value={props.bad}/>
            <StatisticsLine text="all" value={props.all}/>
            <StatisticsLine text="average" value={avg}/>
            <StatisticsLine text="positive" value={pos}/>
            </table>
          </div>
        </div>
      )
    }
  }

  
  const StatisticsLine = (props) => {
     return(
      <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
      </tr>
     )
  }

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAvg(avg - 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAvg(avg + 1)
  }


  return (
      <div>
        <h1>give feedback</h1>
          <div>
          <Button handleClick={handleBad} text='bad'/>
          <Button handleClick={handleNeutral} text='neutral'/>
          <Button handleClick={handleGood} text='good'/>
          <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg}/>
          </div>
      </div>
  )
}

export default App
