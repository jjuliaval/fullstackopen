import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm.jsx'
import FilterField from './components/FilterField.jsx'
import People from './components/People.jsx'
import personService from './services/persons.js'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] =useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPeople => {
      setPersons(initialPeople)
    })
  },[])


  const addName = (event) => {
    event.preventDefault()

    const nameObject ={
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      
      const exists = persons.find(person => person.name === newName)

      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        personService.update(exists.id, nameObject)
        .then(allPersons => setPersons(allPersons))
        return
      }
    }

    personService
    .create(nameObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }


  const removeName = (props) => {
    event.preventDefault()

    if (window.confirm(`Delete ${props.name}`)) {
      personService.deleteName(props.id)
      .then(allPersons => setPersons(allPersons))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  }


  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
        <FilterField newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
        <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <People filteredPersons={filteredPersons} remove={removeName} />
    </div>
  )

}

export default App
