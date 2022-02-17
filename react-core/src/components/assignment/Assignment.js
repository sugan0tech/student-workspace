import React from "react";
import CreateAssignment from "./CreateAssignment";
import AssignmentList from "./AssignmentList";
import AssignmentListHeader from "./AssignmentListHeader";
import { useSelector } from "react-redux";
import { assignmentSelector } from "./assignmentSlice";
import "./Assignment.css";
const Assignment = () => {
  const assignments = useSelector(assignmentSelector);

  return (
    <div className="Assignment">
      <div className="createAssignmentContainer">
        <div className="createAssignment">
          <CreateAssignment />
        </div>
      </div>
      <div className="assignmentListContainer">
        <div className="assignmentList">
          <AssignmentListHeader />
          <hr />

          {assignments.map((assignmentDetails, idx) => (
            <>
              <AssignmentList
                id={assignmentDetails.id}
                sNo={(idx + 1).toString()}
                subject={assignmentDetails.subject}
                assignment={assignmentDetails.assignmentDetails}
                date={assignmentDetails.date}
                isCompleted={assignmentDetails.isCompleted}
              />
              <hr />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assignment;
