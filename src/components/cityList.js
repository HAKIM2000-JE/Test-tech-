import React, { Component } from "react";
import CityDataService from "../services/cityService";

import City from "./city";

export default class CitiesList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCity = this.setActiveCity.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      cities: [],
      currentCity: null,
      currentIndex: -1,
    };

    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = CityDataService.getAll().orderBy("name", "asc").onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let cities = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      cities.push({
        id: id,
        name: data.name,
        description: data.description,
        status: data.status,
      });
    });

    this.setState({
      cities: cities,
    });
  }

  refreshList() {
    this.setState({
      currentCity: null,
      currentIndex: -1,
    });
  }

  setActiveCity(city, index) {
    this.setState({
      currentCity: city,
      currentIndex: index,
    });
  }

  render() {
    const { cities, currentCity, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Cities List</h4>

          <ul className="list-group">
            {cities &&
              cities.map((city, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCity(city, index)}
                  key={index}
                >
                  {city.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentCity ? (
            <City
              city={currentCity}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Choose a City...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
