import { useState, useEffect } from 'react'
import personService from './services/persons'
import { Filter, FormPerson, Persons } from './components/Phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
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

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
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
