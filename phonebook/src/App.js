import React, { useState, useEffect } from 'react'
import Filter from './component/Filter'
import Form from './component/PersonForm'
import Person from './component/Persons'
import personService from './services/persons';
import Notification from './component/Notification';

const App = () => {

  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    personService
        .getAll()
        .then(retrievePersons => {
          setPersons(retrievePersons)
      })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchName = (e) => {
    setSearchName(e.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault();

    let doesPersonExist = persons.some( person => person.name === newName)

    if (doesPersonExist) {
      let confirmation = window.confirm(`${newName} has already ` +
        `been added to the phonebook, would you like to replace old number with` +
        ` new one?`)

      let person = persons.find(person => person.name === newName)
      person.number = newNumber

      if (confirmation) {
        personService
        .update(person.id, person)
        .then(response => {
          if (response === 200)
            setErrorMessage(`${person.name} has been updated `)
            setTimeout( () => setErrorMessage(null), 2000)
            
        })
        .catch(error => {
          setErrorMessage(`${person.name} was already removed from server`)
          setTimeout( () => setErrorMessage(null), 2000)
          setPersons(persons.filter( p => p.id !== person.id))
        })
      }
      setNewName('')
      setNewNumber('')
      return 
     
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(newPerson)
      .then(createPerson => {
        setPersons(persons.concat(createPerson))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`${newPerson.name} has been added`)
        setTimeout( () => setErrorMessage(null), 2000)
      })

  }
  
  const deletePerson = (id) => {

    let personToDelete = persons.find( person => person.id === id)
    let confirmation = window.confirm(`Delete ${personToDelete.name} ? `)
    
    if (confirmation) { 
      personService
        .deleteThisPerson(id)
        .then(response => {
          if (response === 200) {
            setErrorMessage(`${personToDelete.name} has been deleted`)
            setTimeout( () => setErrorMessage(null), 2000)
          }
          setPersons(persons.filter( p => p.id !== id))
        })
      
    }
  }


  return (
    <div>
      <h2>Phonebook</h2> 
      <Notification message={errorMessage} />
        
      <Filter value={searchName} onChange={handleSearchName} />
      <h2>Add a new</h2>
      <Form 
        onSubmit={addPerson} 
        valueName={newName}
        valueNumber={newNumber}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumberChange}  
      />

      <h2>Numbers</h2>
      <Person 
        persons={persons} 
        searchName={searchName} 
        deletePerson={deletePerson}  
      />
        ...
    </div>
  )
}

export default App

