import React from "react";
import Part from "./part";

const Content = ({ course }) => {
    let parts = course.parts
    
    return (
      <div>
        {
        parts.map( part => <Part key={part.id} part={part} />)
        }
      </div>
    )
}

export default Content;