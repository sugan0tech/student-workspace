import React from "react";
import ExamTimeCreate from "./ExamTimeCreate";
import ExamTimeList from "./ExamTimeList";
import "./ExamTime.css";
import { useSelector } from "react-redux";
import { selectExam } from "./ExamTimeSlice";

const ExamTime = () => {
  const examTime = useSelector(selectExam);
  console.log(examTime);
  return (
    <div>
      <ExamTimeCreate />
      <div className="ExamTimeheading">Time Tables </div>
      <div className="Exam-timeContainer">
        {examTime.map((exams, i) => {
          if (exams !== undefined) {
            return <ExamTimeList key={i} exams={exams} />;
          }
          return <></>;
        })}
      </div>
    </div>
  );
};

export default ExamTime;
