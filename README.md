# React Simple Weather

A React implementation of [simpleWeather](https://github.com/monkeecreate/jquery.simpleWeather) jQuery plugin.

Here's an exemple usage

```jsx
import { SimpleWeather } from 'react-simple-weather';

<SimpleWeather location="45.6481607,12.340719" unit="c">
  {
    (weather, errorMessage) => 
      errorMessage || <MyComponent weather={weather} />
  }
</SimpleWeather>
```

You can see what the returned `weather` object contains in the [simpleWeather documentation](https://monkeecreate.github.io/jquery.simpleWeather/).

## Required props

|prop|description|
|---|----|
|`location` | the `latitude,longitude` string for the desired position|
|or `woeid`| the [woeid](https://en.wikipedia.org/wiki/WOEID) of the location
|`unit`|unit used for temperature (`'c'` or `'f'`)| 

## Running demo
You can find a demo on this repository which is running at [crcarlo.github.io/react-simple-weather](https://crcarlo.github.io/react-simple-weather)
