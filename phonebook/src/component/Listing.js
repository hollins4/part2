import React from "react";

const Listing = ({  name, number, id, deletePerson }) => {

    return (
        <div>{name} {number} 
        <span> <button onClick={() => deletePerson(id)}>Delete</button></span>
        </div>
    )
}

export default Listing
