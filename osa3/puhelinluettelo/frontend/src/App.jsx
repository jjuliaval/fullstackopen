import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm.jsx'
import FilterField from './components/FilterField.jsx'
import People from './components/People.jsx'
import personService from './services/persons.js'
import Notification from './components/Notification.jsx'
import './index.css'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] =useState('')
  const [message, setMessage] = useState(null)
  const [className, setClassName] = useState('notif')

  useEffect(() => {
    personService.getAll().then(initialPeople => {
      console.log('Fetched people:', initialPeople)
      setPersons(initialPeople)
    })
  }, [])


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
        .catch(error => {
        setClassName('error')
        setMessage(`Information of ${newName} has already been removed from the server`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
        setClassName('notif')
        return
        })

        setMessage(`Changed number for ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
        return
      }
      else {
        setNewName('')
        setNewNumber('')
        return
      }
      
    }

    personService
    .create(nameObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    })
  }


  const removeName = (props) => {
    event.preventDefault()

    if (window.confirm(`Delete ${props.name}`)) {
      personService.deleteName(props.id)
      .then(allPersons => setPersons(allPersons))
      setMessage(`Deleted ${props.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
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
      <Notification message={message} style={className} ></Notification>
        <FilterField newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
        <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <People filteredPersons={filteredPersons} remove={removeName} />
    </div>
  )

}

export default App
