import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import "./CreateAssignment.css";
import { useDispatch } from "react-redux";
import { addAssignment } from "./assignmentSlice";

const CreateAssignment = () => {
  const dispatch = useDispatch();

  const [assignments, setAssignments] = useState({
    subject: "",
    assignmentDetails: "",
    date: "",
    isCompleted: false,
  });

  return (
    <div className="formAssignment">
      <Form>
        <Form.Group as={Row} controlId="plainText">
          <Form.Label column xl="2">
            Subject
          </Form.Label>
          <Col xl="10">
            <Form.Control
              type="text"
              placeholder="Enter Subject"
              value={assignments.subject}
              onChange={(e) =>
                setAssignments({ ...assignments, subject: e.target.value })
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="plainText">
          <Form.Label column xl="2">
            Assignment
          </Form.Label>
          <Col xl="10">
            <Form.Control
              type="text"
              placeholder="Assignment"
              value={assignments.assignmentDetails}
              onChange={(e) =>
                setAssignments({
                  ...assignments,
                  assignmentDetails: e.target.value,
                })
              }
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="plainText">
          <Form.Label column xl="2">
            Due Date
          </Form.Label>
          <Col xl="10">
            <Form.Control
              type="date"
              value={assignments.date}
              onChange={(e) =>
                setAssignments({
                  ...assignments,
                  date: e.target.value.toString(),
                })
              }
            />
          </Col>
        </Form.Group>
        <div className="buttonContainer">
          <div className="assignmentButton">
            <Button
              as="input"
              type="submit"
              value="Create"
              onClick={(e) => {
                e.preventDefault();
                dispatch(addAssignment(assignments));

                setAssignments({
                  ...assignments,
                  subject: "",
                  assignmentDetails: "",
                  date: "",
                });
              }}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreateAssignment;
