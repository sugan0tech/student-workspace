import React, { useState } from "react";
import "./ExamTimeList.css";

const ExamTimeList = ({ exams }) => {
  const [slideIn, setslideIn] = useState(false);
  if (!exams) {
    return <div></div>;
  }
  return (
    <div
      className={slideIn ? "ExamTimeList slide-in" : "ExamTimeList"}
      onClick={() => setslideIn(!slideIn)}
    >
      <div className="title">
        <div className="ExamDeleteButton">&times;</div>
        {exams ? exams[0].title : ""}
      </div>
      <div className="overlay">
        {exams ? (
          <div className="ExamTimeListHeading">
            <p>s.no</p>
            <p>Subject</p>
            <p>Date</p>
          </div>
        ) : (
          <></>
        )}
        {exams ? (
          exams.map((exam, id) => {
            if (exam !== undefined) {
              return (
                <div key={id} className="row">
                  <p className="sNoExamTime">{id + 1}</p>
                  <p className="textSubjectExamTime">{exam.subject}</p>
                  <p className="textDateExamTime">{exam.date}</p>
                </div>
              );
            }
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ExamTimeList;
