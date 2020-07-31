import React from 'react';

interface CourseContent {
    name: string;
    exerciseCount: number;
  }

interface CoursePartProps {
    courseParts: Array<CourseContent>;
}


const Total: React.FC<{ courseParts: Array<CourseContent> }> = ({ courseParts }) => (
    <p>Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
);

export default Total;