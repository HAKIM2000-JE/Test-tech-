import React, { Component } from "react";
import CityDataService from "../services/cityService";

export default class City extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.deleteCity = this.deleteCity.bind(this);
    this.state = {
      currentCity: {
        id: null,
        name: "",
        description: "",
        status: 1,
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { city } = nextProps;
    if (prevState.currentCity.id !== city.id) {
      return {
        currentCity: city,
        message: ""
      };
    }

    return prevState.currentCity;
  }

  componentDidMount() {
    this.setState({
      currentCity: this.props.city,
    });
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentCity: {
          ...prevState.currentCity,
          name: name,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentCity: {
        ...prevState.currentCity,
        description: description,
      },
    }));
  }

 
 onChnageSatus(status){
  this.setState(function (prevState) {
    return {
      currentCity: {
        ...prevState.currentCity,
        status: status,
      },
    };
  })

 }


  // TODO function that updates the status of the city
  async updateStatus(status) {

    await this.onChnageSatus(status)
    this.updateCity()
    
   

    
  }

  // TODO function that updates city informations
  updateCity() {
    CityDataService.update(this.state.id, this.state.currentCity)
    .then(this.setState({
      
      message: "The city was updated successfully!",
    }))

       // After you update,  set your new status and state message to "The status was updated successfully!"

  }

  // TODO 
  deleteCity() {
    CityDataService.delete(this.state.id)
      // don't forget to refresh list after you delete 
  }

  render() {
    const { currentCity } = this.state;

    return (
      <div>
        <h4>City</h4>
        {currentCity ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentCity.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentCity.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentCity.status===1?"Draft":currentCity.status===2?"Deployed":"Desactivated"}
              </div>
            
            
            </form>

            {currentCity.status===2 ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(3)}
              >
                Desactivate
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(2)}
              >
                Deploy
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCity}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCity}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a City...</p>
          </div>
        )}
      </div>
    );
  }
}
