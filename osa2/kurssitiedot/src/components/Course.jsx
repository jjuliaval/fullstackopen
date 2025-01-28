const Header = (props) => {
    return (
      <div>
        <h1 key={props.id} >{props.name}</h1>
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
  
  const Total = (props) => {
  
    return (
      <div>
        <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
      </div>
    )
  }
  

const Course = ({course}) =>{

    return(
        <div>
            <Header id={course.id} name={course.name}></Header>
            <Content parts={course.parts}></Content>
        </div>
    )
}

export default Course