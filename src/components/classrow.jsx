import React, { Component } from "react";

class ClassRow extends Component {
  createDropDown() {
    let dropDownOptions = [];
    let letters = ["", "A", "B", "C", "D", "F"];
    let mods = ["+", "", "-"];
    let grade;
    //use this.props.maxValue??
    dropDownOptions.push(
      <option key={"default"} value={"default"}>
        {""}
      </option>
    );
    for (let i = 0; i < letters.length; i++) {
      for (let j = 0; j < mods.length; j++) {
        if (i > 0) {
          grade = letters[i] + mods[j];
          dropDownOptions.push(
            <option key={grade} value={grade}>
              {grade}
            </option>
          );
        }
      }
    }
    return dropDownOptions;
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row form-row my-1">
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control"
                placeholder="Class Name"
                onChange={this.props.onGradeChange}
              />
            </div>
            <div className="col-sm-2">
              <select
                value={this.props.classRow.grade}
                onChange={event =>
                  this.props.onGpaChange(event, this.props.classRow)
                }
              >
                {this.createDropDown()}
              </select>
            </div>
            <div className="col">
              <button
                onClick={() => this.props.onRemoveClass(this.props.classRow.id)}
                className="btn btn-outline-danger col-sm-3"
              >
                Remove Class
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClassRow;
