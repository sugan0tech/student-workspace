import React from "react";
import ExamTimeCreate from "./ExamTimeCreate";
import ExamTimeList from "./ExamTimeList";
import "./ExamTime.css";
import { useSelector } from "react-redux";

const ExamTime = () => {
  const examTime = useSelector((state) => state.examTime);
  console.log(examTime);
  return (
    <div>
      <ExamTimeCreate />
      <div className="ExamTimeheading">Time Tables </div>
      <div className="Exam-timeContainer">
        {examTime.map((exams, id) => {
          if (exams !== undefined) {
            return <ExamTimeList key={id} exams={exams} />;
          }
          return <></>;
        })}
      </div>
    </div>
  );
};

export default ExamTime;
