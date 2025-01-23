import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
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
          </div>
          <h1>statistics</h1>
          <div>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {all}</p>
            <p>average {avg/all}</p>
            <p>positive {(good/all)*100}%</p>
          </div>
      </div>
  )
}

export default App
