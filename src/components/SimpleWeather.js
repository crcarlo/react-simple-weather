import React, { Component } from 'react';

import { getJSON } from '../utils/HTTPRequest';
import OAUthConfig from '../config/OAuthConfig';

const getAltTemp = (unit, temp) => {
	if (unit === 'f') {
		return Math.round((5.0 / 9.0) * (temp - 32.0));
	} else {
		return Math.round((9.0 / 5.0) * temp + 32.0);
	}
};

const OAuth = require('oauth');
const header = {
	'Yahoo-App-Id': OAUthConfig.yahooAppID
};
const request = new OAuth.OAuth(
	null,
	null,
	OAUthConfig.yahooCliendID,
	OAUthConfig.yahooClientSecret,
	'1.0',
	null,
	'HMAC-SHA1',
	null,
	header
);

export default class SimpleWeather extends Component {
	state = {};

	static defaultProps = {
		unit: 'c'
	};

	componentDidMount() {
		let { location, woeid, unit } = this.props;

		let now = new Date();
		let weatherUrl =
			'https://query.yahooapis.com/v1/public/yql?format=json&rnd=' +
			now.getFullYear() +
			now.getMonth() +
			now.getDay() +
			now.getHours() +
			'&diagnostics=true&q=';

		if (location) {
			/* If latitude/longitude coordinates, need to format a little different. */
			if (/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/.test(location)) {
				location = '(' + location + ')';
			} else {
				location = location;
			}

			weatherUrl +=
				'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' +
				location +
				'") and u="' +
				unit +
				'"';
		} else if (woeid) {
			weatherUrl +=
				'select * from weather.forecast where woeid=' +
				woeid +
				' and u="' +
				unit +
				'"';
		} else {
			this.setState({
				errorMessage:
					'Could not retrieve weather due to an invalid location.'
			});
			return false;
		}

		// getJSON(encodeURI(weatherUrl)).then(data => {
		request.get(
			`https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${location},ca&format=json`,
			null,
			null,
			(err, data, result) => {
				if (
					data &&
					data.query !== null &&
					data.query.results !== null &&
					data.query.results.channel.description !==
						'Yahoo! Weather Error'
				) {
					var result = data.query.results.channel,
						weather = {},
						forecast,
						compass = [
							'N',
							'NNE',
							'NE',
							'ENE',
							'E',
							'ESE',
							'SE',
							'SSE',
							'S',
							'SSW',
							'SW',
							'WSW',
							'W',
							'WNW',
							'NW',
							'NNW',
							'N'
						],
						image404 =
							'https://s.yimg.com/os/mit/media/m/weather/images/icons/l/44d-100567.png';

					weather.title = result.item.title;
					weather.temp = result.item.condition.temp;
					weather.code = result.item.condition.code;
					weather.todayCode = result.item.forecast[0].code;
					weather.currently = result.item.condition.text;
					weather.high = result.item.forecast[0].high;
					weather.low = result.item.forecast[0].low;
					weather.text = result.item.forecast[0].text;
					weather.humidity = result.atmosphere.humidity;
					weather.pressure = result.atmosphere.pressure;
					weather.rising = result.atmosphere.rising;
					weather.visibility = result.atmosphere.visibility;
					weather.sunrise = result.astronomy.sunrise;
					weather.sunset = result.astronomy.sunset;
					weather.description = result.item.description;
					weather.city = result.location.city;
					weather.country = result.location.country;
					weather.region = result.location.region;
					weather.updated = result.item.pubDate;
					weather.link = result.item.link;
					weather.units = {
						temp: result.units.temperature,
						distance: result.units.distance,
						pressure: result.units.pressure,
						speed: result.units.speed
					};
					weather.wind = {
						chill: result.wind.chill,
						direction:
							compass[Math.round(result.wind.direction / 22.5)],
						speed: result.wind.speed
					};

					if (
						result.item.condition.temp < 80 &&
						result.atmosphere.humidity < 40
					) {
						weather.heatindex =
							-42.379 +
							2.04901523 * result.item.condition.temp +
							10.14333127 * result.atmosphere.humidity -
							0.22475541 *
								result.item.condition.temp *
								result.atmosphere.humidity -
							6.83783 *
								Math.pow(10, -3) *
								Math.pow(result.item.condition.temp, 2) -
							5.481717 *
								Math.pow(10, -2) *
								Math.pow(result.atmosphere.humidity, 2) +
							1.22874 *
								Math.pow(10, -3) *
								Math.pow(result.item.condition.temp, 2) *
								result.atmosphere.humidity +
							8.5282 *
								Math.pow(10, -4) *
								result.item.condition.temp *
								Math.pow(result.atmosphere.humidity, 2) -
							1.99 *
								Math.pow(10, -6) *
								Math.pow(result.item.condition.temp, 2) *
								Math.pow(result.atmosphere.humidity, 2);
					} else {
						weather.heatindex = result.item.condition.temp;
					}

					if (result.item.condition.code == '3200') {
						weather.thumbnail = image404;
						weather.image = image404;
					} else {
						weather.thumbnail =
							'https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/' +
							result.item.condition.code +
							'ds.png';
						weather.image =
							'https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/' +
							result.item.condition.code +
							'd.png';
					}

					weather.alt = {
						temp: getAltTemp(unit, result.item.condition.temp),
						high: getAltTemp(unit, result.item.forecast[0].high),
						low: getAltTemp(unit, result.item.forecast[0].low)
					};
					if (unit === 'f') {
						weather.alt.unit = 'c';
					} else {
						weather.alt.unit = 'f';
					}

					weather.forecast = [];
					for (var i = 0; i < result.item.forecast.length; i++) {
						forecast = result.item.forecast[i];
						forecast.alt = {
							high: getAltTemp(
								unit,
								result.item.forecast[i].high
							),
							low: getAltTemp(unit, result.item.forecast[i].low)
						};

						if (result.item.forecast[i].code == '3200') {
							forecast.thumbnail = image404;
							forecast.image = image404;
						} else {
							forecast.thumbnail =
								'https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/' +
								result.item.forecast[i].code +
								'ds.png';
							forecast.image =
								'https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/' +
								result.item.forecast[i].code +
								'd.png';
						}

						weather.forecast.push(forecast);
					}

					this.setState({ weather });
				} else {
					this.setState({
						errorMessage:
							'There was a problem retrieving the latest weather information.'
					});
				}
			}
		);
	}

	render() {
		const { location, unit, children, ...restProps } = this.props;
		const { weather, errorMessage } = this.state;

		return <div {...restProps}>{children(weather, errorMessage)}</div>;
	}
}
