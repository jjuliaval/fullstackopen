const Header = (props) => {
    return (
      <div>
        <h2 key={props.id} >{props.name}</h2>
      </div>
    )
  }

  const Part = (props) => {
    return (
      <div>
        <p key={props.id}>{props.name} {props.exercises}</p>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map((part) =>
            <Part key={part.id} name={part.name} exercises={part.exercises}></Part>
        )}
      </div>
    )
  }
  
  
  const Total = ({parts}) => {
    
    const total = (parts.map((part) => part.exercises)).reduce((a,b)=>a+b)

    return (
      <div>
        <b>Number of exercises {total}</b>
      </div>
    )
  }
  

const Course = ({course}) =>{
    return(
        <div>
            <Header id={course.id} name={course.name}></Header>
            <Content parts={course.parts}></Content>
            <Total parts={course.parts}></Total>
        </div>
    )
}

export default Course