import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';


function App () {
  const [data,setData] = useState ({ })
  const [location,setLocation] = useState ('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&type=hour&start={start}&cnt={cnt}&appid=e95ed9e937eafb40daf59e05e53d86eb&units=imperial`;

const searchLocation = (event) => {
  if (event.key === 'Enter') {
  axios.get(url).then((response) => {
    setData(response.data)
    console.log(response.data)
  })
  setLocation('')
}}

return (

<div className="app" style={{backgroundImage: `url(/cartagena.jpeg)`}}>
    <div className="container">   
    <div className="search">
      <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text"/>
      </div>
{data.name !== undefined &&
        <div className="top">
          <div className="location">
            <h2>{data.name}</h2>
            {/* <p>Location</p> */}
          </div>         

        <div className="time">
          <h4>{moment(data.dt*1000).format("MMM Do YY | h:mm:ss a")}</h4> 
{/* <TimeAndLocation />  */}

        </div> 
        
         <div className="temp">
            <h1>{data.weather ? <h1>{data.main.temp.toFixed(0)} °F </h1> : null}
            </h1>
            {/* <p>Temperature</p> */}
          </div>

          <div className="high">
          {/* <p>High</p> */}
            <i>Today the high in {data.name} is {data.weather ? <b>{data.main.temp_max.toFixed(0)}°F  </b> : null}. </i>
          </div>
          <div className="low">
          <i>The {data.name} low is {data.weather ? <b>{data.main.temp_min.toFixed(0)} °F </b> : null}. </i>
          </div>

          <div className="description">
          {/* <p>Condition</p> */}
            {data.weather ? <b>{data.weather[0].main} </b> : null}
          </div>
        </div>
}
{data.name !== undefined &&
        <div className="bottom">
        <div className="feels">
          {data.weather ? <b>{data.main.feels_like.toFixed(0)} °F </b> : null}
          <p>Feels Like</p>
        </div>
        <div className="humidity">
          {data.weather ? <b>{data.main.humidity}% </b> : null}
          <p>Humidity</p>
        </div>
        <div className="wind">
          {data.weather ? <b>{data.wind.speed.toFixed(0)} MPH</b> : null}
          <p>Wind Speed</p>
        </div>
      </div>
}
    </div>
    </div>
  );
}
export default App;