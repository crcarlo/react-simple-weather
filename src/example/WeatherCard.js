import React from 'react';
import WeatherCardRow from './WeatherCardRow';

const compass = [
	'n',
	'nne',
	'ne',
	'ene',
	'e',
	'ese',
	'se',
	'sse',
	's',
	'ssw',
	'sw',
	'wsw',
	'w',
	'wnw',
	'nw',
	'nnw',
	'n'
];

export default ({
	location,
	weatherDescription,
	weatherCode,
	temperature,
	wind
}) => (
	<div className="weather-card">
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between'
			}}
		>
			<div
				style={{
					fontSize: 20,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					textAlign: 'left'
				}}
			>
				<div>
					{location.city}, {location.region}
				</div>
				<div style={{ fontSize: 16 }}>{location.country}</div>
			</div>
			<div style={{ width: 120 }}>
				<i
					style={{
						fontSize: 40,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						paddingBottom: 10
					}}
					className={'wi wi-yahoo-' + weatherCode}
				/>
				<span>{weatherDescription}</span>
			</div>
		</div>
		<div
			style={{
				display: 'flex',
				flexDirection: 'column ',
				paddingTop: 40,
				alignItems: 'center'
			}}
		>
			<WeatherCardRow
				icon={
					<i
						style={{
							fontSize: 30
						}}
						className="wi wi-thermometer"
					/>
				}
			>
				<div style={{ fontSize: 24 }}>
					<span> {temperature}</span>
					<i className="wi wi-celsius" />
				</div>
			</WeatherCardRow>
			<WeatherCardRow
				icon={
					<i
						style={{
							fontSize: 30
						}}
						className={'wi wi-strong-wind'}
					/>
				}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						fontSize: 24
					}}
				>
					<i
						style={{
							fontSize: 30
						}}
						className={
							'wi wi-wind wi-from-' +
							compass[Math.round(wind.direction / 22.5)]
						}
					/>
					<span style={{ marginLeft: 5 }}>
						{Math.round(wind.speed) + '  km/h'}
					</span>
				</div>
			</WeatherCardRow>
		</div>
	</div>
);
