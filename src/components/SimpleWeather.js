import React, { Component } from "react";

export default class SimpleWeather extends Component {
  state = {};

  static defaultProps = {
    unit: "c"
  };

  async getWeatherFromLatitudeLongitude(latitude, longitude) {
    const { apiBaseUrl } = this.props;
    const response = await fetch(
      apiBaseUrl + `forecastrss?lat=${latitude}&lon=${longitude}&format=json`
    );
    const responseBody = await response.json();
    const responseBodyJson = JSON.parse(responseBody);
    this.setState({ weather: responseBodyJson });
  }

  async getWeatherFromLocation(location) {
    const { apiBaseUrl, unit } = this.props;
    const response = await fetch(
      `${apiBaseUrl}forecastrss?location=${location}&format=json` +
        (unit && `&u=${unit}`)
    );
    const responseBody = await response.json();
    const responseBodyJson = JSON.parse(responseBody);
    this.setState({ weather: responseBodyJson });
  }

  async getWeatherFromWoeid(woeid) {
    const { apiBaseUrl, unit } = this.props;
    const response = await fetch(
      `${apiBaseUrl}forecastrss?woeid=${woeid}&format=json` +
        (unit && `&u=${unit}`)
    );
    const responseBody = await response.json();
    const responseBodyJson = JSON.parse(responseBody);
    this.setState({ weather: responseBodyJson });
  }

  componentDidMount() {
    const { latitude, longitude, location, woeid } = this.props;

    if (latitude != null && longitude != null) {
      this.getWeatherFromLatitudeLongitude(latitude, longitude);
    } else if (location) {
      this.getWeatherFromLocation(location);
    } else if (woeid) {
      this.getWeatherFromWoeid(woeid);
    }
  }

  render() {
    const { children } = this.props;
    const { weather, errorMessage } = this.state;

    return <>{children(weather, errorMessage)}</>;
  }
}
