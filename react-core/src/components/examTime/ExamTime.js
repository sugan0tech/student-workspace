import React, { useEffect } from "react";
import ExamTimeCreate from "./ExamTimeCreate";
import ExamTimeList from "./ExamTimeList";
import "./ExamTime.css";
import { useDispatch, useSelector } from "react-redux";
import { selectExam } from "./ExamTimeSlice";
import { getExams } from "./ExamTimeSlice";

const ExamTime = () => {
  const dispatch = useDispatch();
  const examTime = useSelector(selectExam);
  useEffect(() => {
    dispatch(getExams([]));
  });
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
