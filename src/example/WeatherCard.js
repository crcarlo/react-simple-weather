import React from 'react';
import WeatherCardRow from './WeatherCardRow';

export default ({
	location,
	weatherDescription,
	weatherCode,
	temperature,
	wind
}) => (
	<div
		style={{
			width: 380,
			color: 'lightgray',
			backgroundColor: '#333',
			fontFamily: 'Roboto',
			borderRadius: 20,
			padding: 30
		}}
	>
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
						justifyContent: 'center'
					}}
					className={'wi wi-yahoo-' + weatherCode}
				/>
				<span>{weatherDescription}</span>
			</div>
		</div>
		<div style={{ paddingTop: 40 }}>
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
							'wi wi-wind wi-from-' + wind.direction.toLowerCase()
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
