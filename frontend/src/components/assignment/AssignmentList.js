import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AssignmentList.css";

import "./AssignmentListHeader.css";

const AssignmentList = ({ subject, date, assignment, isCompleted, sNo }) => {
  return (
    <div className="AssignmentList">
      <p className="number">{sNo}</p>
      <p className="subject">{subject}</p>
      <p className="assignment">{assignment}</p>
      <div className="due">
        <p className="date">{date}</p>
        <FontAwesomeIcon className="check-square" icon="check-square" />
        <FontAwesomeIcon className="trash-alt" icon="trash-alt" />
      </div>
    </div>
  );
};

export default AssignmentList;
