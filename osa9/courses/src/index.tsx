import React from "react";
import ReactDOM from "react-dom";
import App from "./App"

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseTwo extends CoursePartBase{
  description: string;
}

interface CoursePartOne extends CoursePartBaseTwo {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseTwo {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseTwo {
  name: "Benefits of TypeScript";
  projectName: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

ReactDOM.render(<App />, document.getElementById("root"));