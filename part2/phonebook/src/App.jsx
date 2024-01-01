import { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter, FormPerson, Persons } from './components/Phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, number: newNumber
    }
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} onChange={(event) => setFilter(event.target.value)} />
      <FormPerson
        onSubmit={addPerson}
        newName={newName}
        onChangeName={(event) => setNewName(event.target.value)}
        newNumber={newNumber}
        onChangeNumber={(event) => setNewNumber(event.target.value)} />
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
