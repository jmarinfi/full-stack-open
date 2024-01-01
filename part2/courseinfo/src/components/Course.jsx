
const Header = ({ name }) => {
    return <h2>{name}</h2>
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </>
    )
}

const Total = ({ parts }) => {
    return (
        <p><b>Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b></p>
    )
}

const Course = ({ course }) => {
    return (
        <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </>
    )
}

export default Course