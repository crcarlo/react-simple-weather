# React Simple Weather

⚛🌦React enhancer for retriving Yahoo Weather API data

## Usage

```jsx
import { SimpleWeather } from 'react-simple-weather';

<SimpleWeather latitude="45.6481607" longitude="12.340719" unit="c">
  {
    (weather, errorMessage) => 
      errorMessage || <MyComponent weather={weather} />
  }
</SimpleWeather>
```

You can see what the returned `weather` object contains in the [Yahoo Weather API documentation](https://developer.yahoo.com/weather/documentation.html).

## Required props

|prop|description|
|---|----|
|`latitude` and `longitude`| the `latitude` and `longitude` for the desired position|
|`location`| the city name of the location
|`woeid`| the [woeid](https://en.wikipedia.org/wiki/WOEID) of the location
|`unit`|unit used for temperature (`'c'` or `'f'`)| 

## Running demo
You can find a demo on this repository which is running at [crcarlo.github.io/react-simple-weather](https://crcarlo.github.io/react-simple-weather)
