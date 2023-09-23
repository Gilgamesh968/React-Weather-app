import { useEffect, useState } from 'react'
import './App.css';


function App() {
  const APIKEY = '42c8044161cea377ea3f413f87c4b5b6';
  const APIURL = `https://api.openweathermap.org/data/2.5/weather?q=Taungoo&appid=${APIKEY}`
  const API_MAIN = `https://api.openweathermap.org/data/2.5`
  
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async () => {
    const response = await fetch(`${API_MAIN}/weather?q=${query}&appid=${APIKEY}&units=metric`);
    const weather = await response.json();
    setWeather(weather);
    setQuery('');
    // if(weather.weather?.[0].main == 'Clouds' & 'Clear'){
    //   document.querySelector('.inputCard').classList.toggle('clouds');
    // }else if(weather.weather?.[0].main == 'Rain' & 'Drizzle'){
    //   document.querySelector('.inputCard').classList.toggle('rain');
    // }else if(weather.weather?.[0].main == 'Snow'){
    //   document.querySelector('.inputCard').classList.toggle('snow');
    // }
    console.log(weather.weather?.[0].main);
    console.log(weather)
  }

  useEffect(() => {
    search();
  }, [])

  setInterval(setTime, 1)

  function setTime(){
    const dateTime = document.querySelector('.DateTime')
    const date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let amOrPm = hrs <= 12 ? 'AM' : 'PM';
    hrs = (hrs % 12)
    hrs = pad(hrs);
    mins = pad(mins);
    secs = pad(secs);

    const time =  `${hrs}:${mins}:${secs} ${amOrPm}`;
    dateTime.textContent = time;
    function pad(unit){
      return unit < 10 ? '0' + unit : unit;
    }
  }

  return (
    <>
      <div className='app'>
        <div className='weather-card'>
          <div className='inputCard'>
            <div className='form'>
              <input type='text' placeholder='Enter city name' onChange={(e) => {
                setQuery(e.target.value)}} value={query} />
              <button onClick={search}>Search</button>
            </div>
            {typeof weather.main != 'undefined' ? (
            <div className='infos'>
              <h1 className='info'>{weather.name}</h1>
              <h2 className='info'>{weather.weather?.[0].main}</h2>
            </div>
            ) : (
              <div className='infos'>
                <h1>No city found</h1>
              </div>
            )}
            <h3 className='DateTime'></h3>
          </div>
          <div className='weatherDetail'>
            {typeof weather.main != 'undefined' ? (
              <>
              <div className='icon'>
                <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} />
                <h2><strong>{weather.main?.temp}°C</strong></h2>
              </div>
              <div className='weather-info'>
                <div className='infolist'>
                  <label>Description:</label><h3>{weather.weather?.[0].description}</h3>
                </div>
                <div className='infolist'>
                  <label>Wind Speed:</label><h3>{weather.wind.speed}Km/h</h3>
                </div>
                <div className='infolist'>
                  <label>Visibility:</label><h3>{weather.visibility}Mi</h3>
                </div>
                <div className='infolist'>
                  <label>Humidity:</label><h3>{weather.main.humidity}%</h3>
                </div>
              </div>
              </>
            ) : (
              <div></div>
            )}
          </div>
        </div>      
      </div>
    </>
  )
}

export default App
