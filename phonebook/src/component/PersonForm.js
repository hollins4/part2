import React from "react";

const Form = ({ onSubmit, valueName, valueNumber, onChangeName, onChangeNumber}) => {



    return(
        <form onSubmit={onSubmit}>
            <br />
            <div>name: <input value={valueName} onChange={onChangeName} /></div>
            <div>number: <input value={valueNumber} onChange={onChangeNumber} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default Form