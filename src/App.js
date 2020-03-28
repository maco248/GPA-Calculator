import React, { Component } from "react";
import "./App.css";
import ReportCard from "./components/reportcard";

class App extends Component {
  constructor() {
    super();
    console.log("App - Constructor");
  }




  render() {
    return (
      <React.Fragment>
        <main className="container">
          <h1>GPA Calculator</h1>
          <ReportCard
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
