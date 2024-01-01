const Total = ({ parts }) => {
    return (
        <p><b>Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b></p>
    )
}

export default Total