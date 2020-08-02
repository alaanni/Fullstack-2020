import React from 'react';
import { CoursePart } from '../index';

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
      switch (part.name) {
        case "Fundamentals":
            return (
                <div>
                    <p><b>{part.name}</b> {part.exerciseCount} {part.description}</p>
                </div>
            );
        case "Using props to pass data":
            return(
                <div>
                    <p><b>{part.name}</b> {part.exerciseCount} {part.groupProjectCount}</p>
                </div>
            );
        case "Deeper type usage":
            return(
                <div>
                    <p><b>{part.name}</b> {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}</p>
                </div>
            );
        case "Benefits of TypeScript":
            return(
                <div>
                    <p><b>{part.name}</b> {part.exerciseCount} {part.description} {part.projectName}</p>
                </div>
            );
        default:
            return assertNever(part);
    }
};

export default Part;