

const People = (props) => {
    return(
    <ul>{props.filteredPersons.map(person => 
      <div key={person.id}>{person.name} {person.number}
      <button onClick={ () => props.remove(person)}>Delete</button></div>
      )}
    </ul>
    )
  }

export default People