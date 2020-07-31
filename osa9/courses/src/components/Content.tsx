import React from 'react';

interface CourseContent {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartProps {
      courseParts: Array<CourseContent>;
  }

  const Content: React.FC<CoursePartProps> = (props) => {
    return (<>{props.courseParts.map((c) => (<p key={c.name}>{c.name} {c.exerciseCount}</p>))}</>
  )}

export default Content;