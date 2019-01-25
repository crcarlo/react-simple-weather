import React, { Component } from "react";
import "./App.css";
import SimpleWeather from "./components/SimpleWeather";
import WeatherCard from "./example/WeatherCard";

class App extends Component {
  state = {};

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(location => {
      console.log(
        "COORDS",
        location.coords.latitude + "," + location.coords.longitude
      );
      this.setState({
        //'45.6481607,12.340719'
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    });
  }

  render() {
    const { latitude, longitude } = this.state;

    return (
      <div
        className="App"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {this.state.latitude && this.state.longitude ? (
          <SimpleWeather
            apiBaseUrl="https://yahoo-weather-api-proxy.now.sh/"
            latitude={latitude}
            longitude={longitude}
            unit="c"
          >
            {(weather, errorMessage) => {
              if (errorMessage) {
                return <div>{errorMessage}</div>;
              }
              if (weather) {
                console.log("WEATHER", weather);
                console.log("LOCATION", weather.location);
                return (
                  <WeatherCard
                    location={{
                      city: weather.location.city,
                      region: weather.location.region,
                      country: weather.location.country
                    }}
                    weatherDescription={
                      weather.current_observation.condition.text
                    }
                    weatherCode={weather.current_observation.condition.code}
                    temperature={
                      weather.current_observation.condition.temperature
                    }
                    wind={weather.current_observation.wind}
                  />
                );
              }
              return <div>Loading</div>;
            }}
          </SimpleWeather>
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}

export default App;
