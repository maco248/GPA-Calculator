import React, { Component } from "react";
import ClassRow from "./classrow";

class Semester extends Component {
  state = {
    classRows: [{ id: 1, pointValue: -1 }]
  };

  maxClassId = this.state.classRows.length;

  handleAddClass = () => {
    console.log("Class has been added");
    const newId = ++this.maxClassId;
    console.log("New Id: ", newId);
    const newClassRow = { id: newId, pointValue: -1 };
    this.setState({
      classRows: [...this.state.classRows, newClassRow]
    });
  };

  handleRemoveClass = classRowId => {
    console.log("Removing classRow with id: ", classRowId);
    const classRows = this.state.classRows.filter(c => c.id !== classRowId);

    this.setState({ classRows });
    console.log("LENGTH ONE: ", classRows.length);
    this.updateGpa(classRows);
  };

  handleSemesterGpaChange = (event, classRow) => {
    console.log("Grade selected ", event.target.value);
    let grade = event.target.value;
    let pointValue = 0;

    switch (grade) {
      case "A+":
      case "A":
        pointValue = 4.0;
        break;
      case "A-":
        pointValue = 3.7;
        break;
      case "B+":
        pointValue = 3.3;
        break;
      case "B":
        pointValue = 3.0;
        break;
      case "B-":
        pointValue = 2.7;
        break;
      case "C+":
        pointValue = 2.3;
        break;
      case "C":
        pointValue = 2.0;
        break;
      case "C-":
        pointValue = 1.7;
        break;
      case "D+":
        pointValue = 1.3;
        break;
      case "D":
        pointValue = 1.0;
        break;
      case "D-":
        pointValue = 0.7;
        break;
      case "F+":
      case "F":
      case "F-":
        pointValue = 0;
        break;
      default:
        pointValue = -1;
    }

    const classRows = [...this.state.classRows];
    const index = classRows.indexOf(classRow);
    classRows[index] = { ...classRow };

    let newState = Object.assign({}, this.state);
    newState.classRows[index].pointValue = pointValue;
    this.setState(newState);
    this.updateGpa(newState.classRows);
  };

  updateGpa(classRows) {
    let totalPointValue = 0;
    let semesterGpa = this.state.semesterGpa;
    console.log("LENGTH: ", classRows.length);
    console.log("CLASSROW: ", classRows);
    for (let i = 0; i < classRows.length; i++) {
      if (classRows[i].pointValue !== -1) {
        totalPointValue += classRows[i].pointValue;
      }
    }
    semesterGpa = Number(
      (
        totalPointValue / classRows.filter(c => c.pointValue !== -1).length
      ).toFixed(1)
    );
    if (isNaN(semesterGpa) || semesterGpa === -1) {
      semesterGpa = "N/A";
    }
    console.log("Total: ", totalPointValue);
    console.log("GPA: ", semesterGpa);
    this.setState({
      semesterGpa
    });

    this.props.updateOverallGpa(this.props.semester, semesterGpa);
  }

  //   handleGradeChange = classRowId => {
  //     console.log("ClassRowId: ", classRowId);
  //     const classRows = [...this.state.classRows];
  //     const index = classRows.indexOf(classRowId);
  //     classRows[index] = { ...classRows };
  //     classRows[index].name = name;
  //     this.setState({
  //       classRows
  //     });
  //   };

  handleGradeChange = event => {
    console.log("Event: ", event.target.value);
    //let name = event.target.value;
    const classRows = [...this.state.classRows];
    this.setState({
      classRows
    });
  };

  render() {
    return (
      <div>
        <h3>Semester #</h3>
        <div>
          {this.state.classRows.map(classRow => (
            <ClassRow
              key={classRow.id}
              onRemoveClass={this.handleRemoveClass}
              onGradeChange={this.handleGradeChange}
              onGpaChange={this.handleSemesterGpaChange}
              classRow={classRow}
            />
          ))}
        </div>
        <div className="container">
          <div className="row form-row my-1">
            <div className="col">
              <button
                onClick={this.handleAddClass}
                className="btn btn-outline-primary"
              >
                Add Class
              </button>
            </div>
            <div className="col-sm-2">
              <input
                className="form-control"
                type="text"
                value={this.props.semester.gpa}
                //onChange={this.handleSemesterGpaChange}
                placeholder="Semester GPA"
                readOnly
              />
            </div>
            <div className="col">
              <button
                onClick={() =>
                  this.props.onRemoveSemester(this.props.semester.id)
                }
                className="btn btn-danger col-sm-3"
              >
                Remove Semester
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Semester;
