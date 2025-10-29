
# Weather App

**Weather Now** is a fast and visually appealing weather app designed for users like **Jamie**, an outdoor enthusiast who wants to check the weather instantly before heading out.  
It uses **Open-Meteo’s free API** to fetch live temperature, condition, wind speed, and dynamically updates the UI with matching weather icons and background gradients.


## Features

- Search current weather by city name  
- Detects your location automatically (with    permission)  
- Live updating clock (seconds update dynamically)  
- Shows temperature and “feels like” data  
- Weather icons and conditions (Clear Sky, Rainy, Snowy, etc.)  
- Smooth gradient backgrounds based on weather type  
- Handles city not found and network errors gracefully  
- Fully responsive, mobile-friendly UI  
- Built with **React + TailwindCSS + Axios**


## Screenshots

![App Screenshot](https://github.com/Raktimmaity/weather/blob/main/public/screenshot.png?raw=true)


## API Reference

### Open-Meteo Weather API

Fetches current weather data using latitude and longitude.

```
GET https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `latitude` | `number` | **Required**. Latitude of the city |
| `longitude` | `number` | **Required**. Longitude of the city |
| `current_weather` | `boolean` | Set to true to ```get``` current weather data |

### Open-Meteo Geocoding API

Used to convert city names into geographic coordinates.

```http
  GET https://geocoding-api.open-meteo.com/v1/search?name={city}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. City name to search |

### BigDataCloud Reverse Geocoding API

Used to get a readable city name from geographic coordinates.

```
GET https://api.bigdatacloud.net/data/reverse-geocode-client?latitude={lat}&longitude={lon}&localityLanguage=en

```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `latitude` | `number` | **Required**. Latitude of the city |
| `longitude` | `number` | **Required**. Longitude of the city |
| `localityLanguage` | `string` | Set to ```en``` for English results |


## Installation

Clone the repository
```bash
  git clone https://github.com/yourusername/weather-now.git
```
Navigate to the project directory
```
cd weather-now
```
Install dependencies
```
npm install

```
Run locally
```
npm run dev

```
Open your browser at
```
http://localhost:5173
```
## Acknowledgements

 - [Open-Meteo API](https://open-meteo.com/) — for accurate, free weather data
 - [BigDataCloud](https://www.bigdatacloud.com/) — for geolocation and reverse geocoding
 - [Tailwind CSS](https://tailwindcss.com/) — for fast, responsive UI design
 - [Lucide Icons](https://lucide.dev/) — for clean SVG icons


## Tech Stack
- **FrontEnd**: React, Tailwind CSS
- **Data Fetching**: Axios
- **API Source**: Open-Meteo, BigDataCloud