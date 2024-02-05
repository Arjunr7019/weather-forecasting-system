import React, { useState } from 'react';
import './Weather.css';
import { Icon } from '@iconify/react';
import Input from '../../Components/Input/Input';
import one_d from '../../WeatherIcons/01d-clear-sky.png';
import one_n from '../../WeatherIcons/01n-clear-sky.png';
import two_d from '../../WeatherIcons/02d-few-clouds.png';
import two_n from '../../WeatherIcons/02n-few-clouds.png';
import three_d_n from '../../WeatherIcons/03d-03n-scattered-clouds.png';
import four_d_n from '../../WeatherIcons/04d-04n-broken-clouds.png';
import nine_d_n from '../../WeatherIcons/09d-09n-shower-rain.png';
import ten_d from '../../WeatherIcons/10d-rain.png';
import ten_n from '../../WeatherIcons/10n-rain.png';
import eleven_d_n from '../../WeatherIcons/11d-11n-thunderstorm.png';
import thirteen_d_n from '../../WeatherIcons/13d-13n-snow.png';
import fifty_d_n from '../../WeatherIcons/50d-50n-mist.png';
import { quantum } from 'ldrs';
import Swal from 'sweetalert2';

quantum.register()

export default function Weather() {

    const [txtValue, setValue] = useState('');
    const [weatherIcons, setWeatherIcons] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [location, setLocation] = useState('');
    const [temperature, setTemperature] = useState('');
    const [description, setDescription] = useState('');
    const [humidity, setHumidity] = useState('');
    const [wind, setWind] = useState('');
    const [pressure, setPressure] = useState('');

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    }

    const apiKey = "2858092d7472f3fb75d67766ac57415f";

    function onChangeValue() {
        let inputValue = document.getElementById('inputText').value;
        setValue(inputValue);
    }

    const search = async () => {
        // {txtValue===''?alert('Enter City Name'):consoleFunction()}
        setLoading(true);
        setVisible(false);
        if (txtValue === '') {
            // alert('Enter City Name');
            Swal.fire("Enter City Name!");
            setLoading(false);
        } else {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${txtValue}&units=metric&appid=${apiKey}`;
            let response = await fetch(url);
            let data = await response.json();
            if (!response.ok) {
                // alert('Enter Proper City');
                Swal.fire("Enter Proper City!");
                setLoading(false);
            } else {
                const { name } = data;
                const { country } = data.sys;
                const { icon, description } = data.weather[0];
                const { temp, humidity } = data.main;
                const { speed } = data.wind;
                const { pressure } = data.main;

                switch (icon) {
                    case '01d': setWeatherIcons(one_d); break;
                    case '01n': setWeatherIcons(one_n); break;
                    case '02d': setWeatherIcons(two_d); break;
                    case '02n': setWeatherIcons(two_n); break;
                    case '03d': setWeatherIcons(three_d_n); break;
                    case '03n': setWeatherIcons(three_d_n); break;
                    case '04d': setWeatherIcons(four_d_n); break;
                    case '04n': setWeatherIcons(four_d_n); break;
                    case '09d': setWeatherIcons(nine_d_n); break;
                    case '09n': setWeatherIcons(nine_d_n); break;
                    case '10d': setWeatherIcons(ten_d); break;
                    case '10n': setWeatherIcons(ten_n); break;
                    case '11d': setWeatherIcons(eleven_d_n); break;
                    case '11n': setWeatherIcons(eleven_d_n); break;
                    case '13d': setWeatherIcons(thirteen_d_n); break;
                    case '13n': setWeatherIcons(thirteen_d_n); break;
                    case '50d': setWeatherIcons(fifty_d_n); break;
                    case '50n': setWeatherIcons(fifty_d_n); break;

                    default: setWeatherIcons(null);
                        break;
                }
                setVisible(true);
                setLoading(false);
                setLocation(name + "," + country);
                setTemperature(temp + "°C");
                setDescription(description);
                setHumidity(humidity + "%");
                setWind(speed + "m/s");
                setPressure(pressure + "hPa");
            }
        }
    }

    return (
        <>
            <div className='main p-3 p-lg-5'>
                <div className='inputElements d-flex flex-row justify-content-between align-items-center mb-3'>
                    <Input onKeyPress={handleKeyPress}
                        onChange={onChangeValue}
                        value={txtValue}
                        type="text"
                        className='formControl width-100 px-3 py-2'
                        id="inputText"
                        aria-describedby="passwordHelp">{['City Name', '']}</Input>
                    {/* <input onChange={onChangeValue} onKeyPress={handleKeyPress} id='inputText' placeholder='Enter City Name' className='common-bg-card-noBoder' type="text" value={txtValue} /> */}
                    <div className='searchIconDiv d-flex justify-content-center align-items-end'>
                        <button onClick={search} className='searchIcon rounded-circle p-2 d-flex justify-content-center align-items-center'>
                            <span className="material-symbols-outlined">
                                search
                            </span>
                        </button>
                    </div>
                </div>
                {loading ? <div className='d-flex justify-content-center align-items-center'>
                    <l-quantum size="45" speed="1.75" color="black"></l-quantum>
                </div> : <></>}
                {visible ? <>
                    <div className='width-100 common-bg-card d-flex flex-row justify-content-center align-items-center mb-3 p-1'>
                        <Icon icon="ion:location-outline" />
                        <p id='cityCountry' className='m-0 px-1'>{location}</p>
                    </div>
                    <div className='width-100 common-bg-card p-3 d-flex flex-column flex-lg-row justify-content-around align-items-center mb-3'>
                        <div className='width-100 d-flex justify-content-center align-items-center flex-column'>
                            <img id='weatherIcon' className='p-3' src={weatherIcons} alt="img" />
                        </div>
                        <div className='width-100 d-flex justify-content-center align-items-center flex-column'>
                            <p className='m-0'>Temperature</p>
                            <p id='weatherTemperature' className='m-0 fs-1 fw-bolder'>{temperature}</p>
                            <p id='weatherDescription' className='m-0'>{description}</p>
                        </div>
                    </div>
                    <div className='width-100 common-bg-card p-3 d-flex flex-row justify-content-around align-items-center'>
                        <div className='humidity d-flex justify-content-center align-items-center flex-column'>
                            <Icon className='fs-2' icon="solar:waterdrops-outline" />
                            <p className='m-0'>Humidity</p>
                            <p id='weatherHumidity' className='m-0'>{humidity}</p>
                        </div>
                        <div className='wind d-flex justify-content-center align-items-center flex-column'>
                            <Icon className='fs-2' icon="ph:wind" />
                            <p className='m-0'>Wind</p>
                            <p id='weatherWind' className='m-0'>{wind}</p>
                        </div>
                        <div className='pressure d-flex justify-content-center align-items-center flex-column'>
                            <Icon className='fs-2' icon="lets-icons:pressure-light" />
                            <p className='m-0'>Pressure</p>
                            <p id='weatherPressure' className='m-0'>{pressure}</p>
                        </div>
                    </div>
                </> : <></>}
            </div>
        </>
    )
}
