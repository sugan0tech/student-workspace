import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AssignmentList.css";
import { useDispatch } from "react-redux";
import { changeIsComplete } from "./assignmentSlice";

import "./AssignmentListHeader.css";

const AssignmentList = ({
  subject,
  date,
  assignment,
  isCompleted,
  sNo,
  id,
}) => {
  const dispatch = useDispatch();
  return (
    <div
      className={isCompleted ? "AssignmentList completed" : "AssignmentList"}
    >
      <p className="number">{sNo}</p>
      <p className="subject">{subject}</p>
      <p className="assignment">{assignment}</p>
      <div className="due">
        <p className="date">{date}</p>
        {!isCompleted ? (
          <FontAwesomeIcon
            className="check-square"
            icon="check-square"
            onClick={() => dispatch(changeIsComplete(id))}
          />
        ) : (
          <i className="cross" onClick={() => dispatch(changeIsComplete(id))}>
            &times;
          </i>
        )}
        <FontAwesomeIcon className="trash-alt" icon="trash-alt" />
      </div>
    </div>
  );
};

export default AssignmentList;
