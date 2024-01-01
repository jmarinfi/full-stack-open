import { useState, useEffect } from 'react'
import personService from './services/persons'
import { Filter, FormPerson, Persons, Notification } from './components/Phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.find(person => person.name === newName).id
        personService
          .update(id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotification({
              message: `Updated ${returnedPerson.name}`,
              type: 'success'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setNotification({
              message: `Information of ${personObject.name} has already been removed from server`,
              type: 'error'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id))
            setNewName('')
            setNewNumber('')
          })
        return
      }
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification({
          message: `Added ${returnedPerson.name}`,
          type: 'success'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setNotification({
          message: error.response.data.error,
          type: 'error'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const handleDelete = id => {
    personService
      .deletePerson(id)
      .then(() => {
        const person = persons.find(person => person.id === id)
        setPersons(persons.filter(person => person.id !== id))
        setNotification({
          message: `Deleted ${person.name}`,
          type: 'success'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification?.message} type={notification?.type} />
      <Filter filter={filter} onChange={(event) => setFilter(event.target.value)} />
      <FormPerson
        onSubmit={addPerson}
        newName={newName}
        onChangeName={(event) => setNewName(event.target.value)}
        newNumber={newNumber}
        onChangeNumber={(event) => setNewNumber(event.target.value)} />
      <Persons
        persons={personsToShow}
        handleDelete={handleDelete} />
    </div>
  )
}

export default App
