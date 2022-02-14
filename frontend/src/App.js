import React from "react";
import "./components/fontAwesomeIcons";
//import { Counter } from "./features/counter/Counter";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";

import "./App.css";
import BookCreate from "./components/desk/BookCreate/BookCreate";
import Desk from "./components/desk/Desk";
import Assignment from "./components/assignment/Assignment";
import ExamTime from "./components/examTime/ExamTime";
import BookDisplay from "./components/desk/BookDisplay/BookDisplay";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
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
