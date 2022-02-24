import React, { useCallback, useEffect } from "react";
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
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  if (!user.exits) {
    history.push("/login");
  }

  return (
    <div className="App">
      {location.pathname !== "/login" ? <Header /> : null}
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Desk} />
        <Route path="/desk/create" exact component={BookCreate} />
        <Route path="/desk/display/:id" component={BookDisplay} />
        <Route path="/assignment" component={Assignment} />
        <Route path="/exam-time" component={ExamTime} />
      </Switch>
    </div>
  );
}

export default App;
