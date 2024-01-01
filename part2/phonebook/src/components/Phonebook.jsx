import personService from '../services/persons'

const Filter = ({ filter, onChange }) => {
    return (
        <div>
            filter shown with <input id='filter-input'
                value={filter}
                onChange={onChange} />
        </div>
    )
}

const FormPerson = ({ onSubmit, newName, onChangeName, newNumber, onChangeNumber }) => {
    return (
        <>
            <h2>add a new</h2>
            <form id='phonebook-form' onSubmit={onSubmit}>
                <div>
                    name: <input id='name-input'
                        value={newName}
                        onChange={onChangeName} />
                </div>
                <div>
                    number: <input id='number-input'
                        value={newNumber}
                        onChange={onChangeNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>

    )
}

const Person = ({ person, handleDelete }) => {
    return (
        <div>
            {person.name} {person.number}
            <button onClick={
                () => {
                    if (window.confirm(`Delete ${person.name}?`)) {
                        handleDelete(person.id)
                    }
                }
            }>delete</button>
        </div>
    )
}

const Persons = ({ persons, handleDelete }) => {
    return (
        <div>
            <h2>Numbers</h2>
            {persons.map(
                person => <Person 
                    key={person.name} 
                    person={person} 
                    handleDelete={handleDelete} />)}
        </div>
    )
}

const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={type}>
            {message}
        </div>
    )
}

export { Filter, FormPerson, Persons, Notification }