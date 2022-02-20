import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "./components/fontAwesomeIcons";

import Login from "./components/login";
import Header from "./components/header/Header";
import BookCreate from "./components/desk/BookCreate/BookCreate";
import Desk from "./components/desk/Desk";
import Assignment from "./components/assignment/Assignment";
import ExamTime from "./components/examTime/ExamTime";
import BookDisplay from "./components/desk/BookDisplay/BookDisplay";

function App() {
  const [isLogedIn, setIsLogedIn] = useState(true);
  return (
    <Router>
      <div className="App">
        {isLogedIn ? <Header /> : null}
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Desk} />
          <Route path="/desk/create" exact component={BookCreate} />
          <Route path="/desk/display/:id" component={BookDisplay} />
          <Route path="/assignment" component={Assignment} />
          <Route path="/exam-time" component={ExamTime} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
