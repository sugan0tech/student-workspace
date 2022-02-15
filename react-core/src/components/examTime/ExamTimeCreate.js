import React, { useState } from "react";
import "./ExamTimeCreate.css";
import { useDispatch } from "react-redux";
import { addExam } from "./ExamTimeSlice";
import { Form, Col, Row, Button } from "react-bootstrap";

const ExamTimeCreate = () => {
  const [isFormActive, setIsFormActive] = useState(false);
  const [inputFields, setInputFields] = useState([
    { title: "", subject: "", date: "" },
  ]);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const handlePlus = () => {
    if (isFormActive) {
      setInputFields([{ title: "", subject: "", date: "" }]);
    }
    setIsFormActive(!isFormActive);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputFields[0].subject === "" || inputFields[0].date === "") {
      return;
    }
    inputFields[0].title = title;

    dispatch(addExam(inputFields));
    handlePlus();
  };
  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "subject") {
      values[index].subject = event.target.value;
    } else {
      values[index].date = event.target.value.toString();
    }

    setInputFields(values);
  };

  const handleAddFields = () => {
    if (inputFields.length >= 7) {
      return;
    }
    const values = [...inputFields];

    values.push({ subject: "", date: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    if (index == 0) {
      return;
    }
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };
  return (
    <div className="ExamTimeCreate">
      <p className="textHeading">Create Exam Time Table</p>
      <p className="plusButton" onClick={handlePlus}>
        <span className="plus">+</span>
      </p>

      <div id="form" className={isFormActive ? "form active" : "form"}>
        <div className="form-header">
          <div className="form-title">Enter Exam Dates</div>
          <div className="close-button" onClick={handlePlus}>
            &times;
          </div>
        </div>
        <Form>
          <Form.Group as={Col} controlId="plainText">
            <Form.Label column xl="2">
              Exam Title
            </Form.Label>
            <Col xl="10">
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Col>
          </Form.Group>
          {inputFields.map((inputField, index) => (
            <div className="inputForm">
              <Form.Group as={Col} controlId="plainText">
                <Form.Label column xl="2">
                  Date
                </Form.Label>
                <Col xl="10">
                  <Form.Control
                    type="date"
                    placeholder="Enter Date"
                    name="date"
                    value={inputField.date}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Col} controlId="plainText">
                <Form.Label column xl="2">
                  Subject
                </Form.Label>
                <Col xl="10">
                  <Form.Control
                    type="text"
                    placeholder="Enter Subject"
                    name="subject"
                    value={inputField.subject}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="plusMinus">
                <button
                  className={
                    index === 0 ? "btn btn-link hidden" : "btn btn-link"
                  }
                  type="button"
                  id="minusButtonExamForm"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button>
                <button
                  id="plusButtonExamForm"
                  className="btn btn-link "
                  type="button"
                  onClick={() => handleAddFields()}
                >
                  +
                </button>
              </Form.Group>
            </div>
          ))}
          <div className="examSubmitButtonContainer">
            <Button type="submit" onClick={handleSubmit}>
              Create
            </Button>
          </div>
        </Form>
      </div>

      <div
        id="overlay"
        className={isFormActive ? "active" : ""}
        onClick={handlePlus}
      ></div>
    </div>
  );
};

export default ExamTimeCreate;
