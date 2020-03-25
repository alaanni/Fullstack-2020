import React from 'react'

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce(function(sum, part) {
      console.log('sum and part: ', sum, part)
      return sum + part.exercises
    }, 0)
    return(
      <b>Number of exercises {sum}</b>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    console.log(course.parts)
    return (
      <div>
        {course.parts.map((part) => <Part key={part.id} part={part}/>
        )}
      </div>
    )
  }
  const Course = ({ course }) => {
    return (
      <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
    )
  }

  export default Course