import React, { Component } from "react";
import CityDataService from "../services/cityService";

export default class AddCity extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveCity = this.saveCity.bind(this);
    this.newCity = this.newCity.bind(this);

    this.state = {
      name: "",
      description: "",
      status: 1,
      submitted: false,
    };
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  //TODO Create a new City
  saveCity() {

   //call service
   CityDataService.create(this.state).then(this.setState({submitted: true}))

   // then
    
  }

  newCity() {
    this.setState({
      name: "",
      description: "",
      status: 1,
      submitted: false,
    });
   
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCity}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveCity} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
