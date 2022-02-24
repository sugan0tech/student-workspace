import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import "./components/fontAwesomeIcons";

import Login from "./components/login";
import Header from "./components/header/Header";
import BookCreate from "./components/desk/BookCreate/BookCreate";
import Desk from "./components/desk/Desk";
import Assignment from "./components/assignment/Assignment";
import ExamTime from "./components/examTime/ExamTime";
import BookDisplay from "./components/desk/BookDisplay/BookDisplay";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogin } from "./components/login/loginSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  if (!user.exists) {
    return (
      <div>
        <Login />
      </div>
    );
  } else {
    dispatch(getUserLogin());
  }

  return (
    <div className="App">
      {location.pathname !== "/login" ? <Header /> : null}
      <Switch>
        <Route path="/" exact component={Desk} />
        <Route path="/login" exact component={Login} />
        <Route path="/desk/create" exact component={BookCreate} />
        <Route path="/desk/display/:id" component={BookDisplay} />
        <Route path="/assignment" component={Assignment} />
        <Route path="/exam-time" component={ExamTime} />
      </Switch>
    </div>
  );
}

export default App;
