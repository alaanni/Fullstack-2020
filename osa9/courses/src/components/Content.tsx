import React from 'react';
import Part from '../components/Part';
import { CoursePart } from '../index';

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
    return (
        <>{courseParts.map((p) => (
            <Part key={p.name} part={p} />
        ))}</>
    )};

export default Content;