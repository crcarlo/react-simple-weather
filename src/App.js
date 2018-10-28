import React, { Component } from 'react';
import './App.css';
import SimpleWeather from './components/SimpleWeather';
import WeatherCard from './example/WeatherCard';

class App extends Component {
	state = {};

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(location => {
			console.log(
				'COORDS',
				location.coords.latitude + ',' + location.coords.longitude
			);
			this.setState({
				location:
					//'45.6481607,12.340719'
					location.coords.latitude + ',' + location.coords.longitude
			});
		});
	}

	render() {
		return (
			<div
				className="App"
				style={{ display: 'flex', justifyContent: 'center' }}
			>
				{this.state.location ? (
					<SimpleWeather location={this.state.location} unit="c">
						{(weather, errorMessage) => {
							if (errorMessage) {
								return <div>{errorMessage}</div>;
							}
							if (weather) {
								return (
									<WeatherCard
										location={{
											city: weather.city,
											region: weather.region,
											country: weather.country
										}}
										weatherDescription={weather.currently}
										weatherCode={weather.code}
										temperature={weather.temp}
										wind={weather.wind}
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
