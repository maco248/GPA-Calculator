import React, { Component } from "react";
import Semester from "./semester";

class ReportCard extends Component {
  state = {
    semesters: [{ id: 1, semesterNum: 1, gpa: 0 }],
    totalGpa: 0.0
  };

  handleRemoveSemester = semesterId => {
    console.log("Removing semester with id: ", semesterId);
    const semesters = this.state.semesters.filter(c => c.id !== semesterId);
    this.setState({ semesters });
  };

  maxSemesterId = this.state.semesters.length;
  handleAddSemester = () => {
    console.log("Semsester added");
    const newSemesterId = ++this.maxSemesterId;
    const newSemesterNum = this.maxSemesterId;
    const newSemester = { id: newSemesterId, num: newSemesterNum, gpa: 0 };
    this.setState({
      semesters: [...this.state.semesters, newSemester]
    });
  };

  handleChange = event => {
    this.setState({ totalGpa: event.target.totalGpa });
  };

  updateOverallGpa = (semesterRef, semesterGpa) => {
    console.log("GPA Updated: ", semesterGpa);
    const semesters = [...this.state.semesters];
    const index = semesters.indexOf(semesterRef);
    // semesters[index] = { ...semesters };
    // semesters[index].gpa = semesterGpa;
    // this.setState({ semesters });
    // console.log("This semester: ", semesters);
    // const semesterFilter = semesters.filter(c => c.semesterGpa !== -1);
    // let overallGpa = 0;
    // for (let i = 0; i < semesterFilter.length; i++) {
    //   overallGpa += semesterFilter[i].gpa;
    // }
    // this.setState({
    //   totalGpa: Number(overallGpa / semesterFilter.length).toFixed(2)
    // });
  };

  render() {
    return (
      <div>
        {this.state.semesters.map(semester => (
          <Semester
            key={semester.id}
            onRemoveSemester={this.handleRemoveSemester}
            updateOverallGpa={this.updateOverallGpa}
            semester={semester}
          />
        ))}
        <div className="form-row">
          <button
            onClick={this.handleAddSemester}
            className="col-3 btn btn-primary m-1"
          >
            Add Semester
          </button>
          <form className="col-auto my-1">
            <input
              className="form-control "
              type="text"
              placeholder="Total GPA"
              value={this.state.totalGpa}
              onChange={this.handleChange}
              readOnly
            />
          </form>
        </div>
      </div>
    );
  }
}

export default ReportCard;
