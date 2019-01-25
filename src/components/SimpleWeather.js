import React, { Component } from 'react';

export default class SimpleWeather extends Component {
	state = {};

	static defaultProps = {
		unit: 'c'
	};

	async getWeatherFromLatitudeLongitude(latitude, longitude) {
		const { apiBaseUrl } = this.props;

		const response = await fetch(
			apiBaseUrl +
				`forecastrss?lat=${latitude}&lon=${longitude}&format=json`
		);

		const responseBody = await response.json();

		const responseBodyJson = JSON.parse(responseBody);

		console.log('RESPONSE', responseBody);

		this.setState({ weather: responseBodyJson });
	}

	componentDidMount() {
		const {
			apiBaseUrl,
			latitude,
			longitude,
			location,
			woeid,
			unit
		} = this.props;

		if (latitude != null && longitude != null) {
			this.getWeatherFromLatitudeLongitude(latitude, longitude);
		}
	}

	render() {
		const { unit, children, apiBaseUrl, ...restProps } = this.props;
		const { weather, errorMessage } = this.state;

		return <div {...restProps}>{children(weather, errorMessage)}</div>;
	}
}
