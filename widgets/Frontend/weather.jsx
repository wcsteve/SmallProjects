import React from 'react';
import { weatherAPI } from '../system_env';

const toQueryString = (obj) => {
  let parts = [];
  for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
          parts.push(`${encodeURIComponent(i)}=${encodeURIComponent(obj[i])}`);
      }
  }
  return parts.join('&');
}

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      temp: ''
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(weatherAPI)
      // this.setState({
      //   lat: position.coords.latitude,
      //   long: position.coords.longitude
      // }, () => console.log(this.state.lat) )
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const request = new XMLHttpRequest();
      const parameters = toQueryString({
        units: 'imperial',
        lat: lat,
        lon: long,
        APPID: weatherAPI
      })
      request.open(
        'GET',
        `http://api.openweathermap.org/data/2.5/weather?${parameters}`,
        true
      );

      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var resp = JSON.parse(request.responseText);
          console.log(resp);

          this.setState({
            city: resp.name,
            temp: resp.main.temp
          }, () => console.log(this.state) )

        } else {
          console.log(request.responseText);
        }
      };

      request.onerror = function() {
        console.log('error')
      };

      request.send();
    });
  }

  render() {

    return (
      <div className="weather">
        <h1>{this.state.city}</h1>
        <h1>{this.state.temp}</h1>
      </div>
    );
  }
}

export default Weather;
