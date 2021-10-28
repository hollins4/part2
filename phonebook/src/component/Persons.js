import React from "react";
import Listing from "./Listing";

const Person = ({ persons, searchName, deletePerson }) => {

    const numbersToShow = persons.filter( (person) => person.name.toLowerCase().includes(searchName) )

    return(
        <div>
            { 
                numbersToShow.map( ({name, number, id}) => 
                    <Listing 
                        name={name} 
                        number={number} 
                        id={id}
                        deletePerson={deletePerson} 
                        key={id} 
                    />   )
            }
        </div>
    )
}

export default Person
