import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import { Icon } from '@iconify/react';
import { quantum } from 'ldrs';
import Swal from 'sweetalert2';
// import Headroom from 'react-headroom';
import humidityIcon from '../../WeatherIcons/humidity.png';
import pressureIcon from '../../WeatherIcons/Pressure.png';
import windIcon from '../../WeatherIcons/wind.png';
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
import SearchBarInput from '../../Components/SearchBar/SearchBarInput';
import WeatherForecastLogo from '../../WeatherIcons/WethearForecastLogo.png';
import HourlyWeather from '../../Components/HourlyWeather/HourlyWeather';
import Iframe from 'react-iframe';

quantum.register()

export default function Weather() {

    const [txtValue, setValue] = useState('bengaluru');
    const [weatherIcons, setWeatherIcons] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [location, setLocation] = useState('');
    const [temperature, setTemperature] = useState('');
    const [description, setDescription] = useState('');
    const [humidity, setHumidity] = useState('');
    const [wind, setWind] = useState('');
    const [pressure, setPressure] = useState('');
    const [time, setTime] = useState('');
    const [heighSm, setHeighSm] = useState(false);
    const [sunriseAndSunset, setSunriseAndSunset] = useState(['', '']);
    const [hourlyWeather, setHourlyWeather] = useState(true);


    const googleMapUrl = useRef('');

    // const cityOneName = useRef('');
    // const cityOneDescription = useRef('');
    // const cityOneTem = useRef('');
    // const cityTwoName = useRef('');
    // const cityTwoDescription = useRef('');
    // const cityTwoTem = useRef('');
    // const cityThreeName = useRef('');
    // const cityThreeDescription = useRef('');
    // const cityThreeTem = useRef('');

    useEffect(() => {
        search();
    },[]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            search();
            setHeighSm(false);
            // CityOne("Bengaluru");
            // CityOne("Mumbai");
            // CityOne("Hyderabad");
        }
    }

    const apiKey = "2858092d7472f3fb75d67766ac57415f";

    function onChangeValue() {
        let inputValue = document.getElementById('inputText').value;
        setValue(inputValue);
    }

    const search = async () => {
        setLoading(true);
        setVisible(false);

        let mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCq6H-8BHpjg06AvrNQvAOaUXJEia8b0EA&q=${txtValue}`;
        googleMapUrl.current = mapUrl;

        if (txtValue === '') {
            Swal.fire("Enter City Name!");
            setLoading(false);
        } else {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${txtValue}&units=metric&appid=${apiKey}`;
            let response = await fetch(url);
            let data = await response.json();
            if (!response.ok) {
                Swal.fire("Enter Proper City!");
                setLoading(false);
                setHeighSm(false);
            } else {
                const { name } = data;
                const { country, sunrise, sunset } = data.sys;
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
                setHeighSm(true);
                setVisible(true);
                setLoading(false);
                setLocation(name + "," + country);
                setTemperature(temp + "°C");
                setDescription(description);
                setHumidity(humidity + "%");
                setWind(speed + "m/s");
                setPressure(pressure + "hPa");
                let sunriseConverted = new Date(sunrise * 1000);
                let sunsetConverted = new Date(sunset * 1000);
                setSunriseAndSunset([sunriseConverted.getHours() % 12 + ":" + sunriseConverted.getMinutes() + ":" + sunriseConverted.getSeconds() + " " + "AM",
                sunsetConverted.getHours() % 12 + ":" + sunsetConverted.getMinutes() + ":" + sunsetConverted.getSeconds() + " " + "PM"]);
            }
        }
    }
    // const googleMapSearch = () => {
    //     let mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCq6H-8BHpjg06AvrNQvAOaUXJEia8b0EA&q=hassan`;
    //     setMapLocation(mapUrl);
    // }

    // const CityOne = async (cityName) => {
    //     let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    //     let response1 = await fetch(url1);
    //     let data1 = await response1.json();
    //     const { name } = data1;
    //     const { country } = data1.sys;
    //     const { description } = data1.weather[0];
    //     const { temp } = data1.main;
    //     if (cityName === 'Bengaluru') {
    //         cityOneName.current = name + "," + country;
    //         cityOneDescription.current = description;
    //         cityOneTem.current = temp + "°";
    //     } else if (cityName === 'Mumbai') {
    //         cityTwoName.current = name + "," + country;
    //         cityTwoDescription.current = description;
    //         cityTwoTem.current = temp + "°";
    //     } else if (cityName === 'Hyderabad') {
    //         cityThreeName.current = name + "," + country;
    //         cityThreeDescription.current = description;
    //         cityThreeTem.current = temp + "°";
    //     }
    // }

    setInterval(() => {
        let currentTime = new Date();
        currentTime.getHours();
        currentTime.getMinutes();
        currentTime.getSeconds();

        setTime(currentTime.getHours() % 12 === "0" ? 12 : currentTime.getHours() % 12 + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds());
    }, 1000);

    return (
        <>
            <div className={heighSm ? 'default-padingX heightSm-fitContent width-100 py-3 py-lg-5' : 'default-padingX height-100vh width-100 py-3 py-lg-5'}>
                {/* <Headroom>
                    
                </Headroom> */}
                <div className='header width-100 d-flex flex-column flex-lg-row justify-content-between align-items-center mt-3 mt-lg-0 mb-3 mb-lg-5'>
                    <div className='Logo d-flex justify-content-start align-items-center'>
                        <img src={WeatherForecastLogo} alt="Logo" />
                    </div>
                    <div className='inputElements width-60 d-flex flex-row justify-content-center align-items-center my-3 my-lg-0 mx-3'>
                        <SearchBarInput onKeyPress={handleKeyPress}
                            onChange={onChangeValue}
                            value={txtValue}
                            type="text"
                            className={txtValue === '' ? ['formControl width-100 px-3 py-2', 'formLabelSearchBar'] : ['formControl width-100 px-3 py-2', 'formLabelSearchBarOnContent']}
                            id="inputText"
                            aria-describedby="passwordHelp">{['City Name', '']}</SearchBarInput>
                        <div className='searchIconDiv d-flex justify-content-center align-items-center'>
                            <button onClick={search} className='searchIcon rounded-circle p-2 mx-2 d-flex justify-content-center align-items-center'>
                                <span className="material-symbols-outlined">
                                    search
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className='d-none d-lg-flex justify-content-center align-items-center'>
                        <div className='common-button-bg-card px-3 py-2 width-100 d-flex justify-content-around align-items-center flex-row'>
                            <a className='loginButton mx-3' href="/">Login</a>
                        </div>
                    </div>
                </div>


                {loading ? <div className='d-flex justify-content-center align-items-center'>
                    <l-quantum size="45" speed="1.75" color="black"></l-quantum>
                </div> : <></>}
                {visible ?
                    <div className='w-100 d-flex flex-row justify-content-between align-items-center'>
                        <div className='width-5 d-flex justify-content-start align-items-center'>
                            <div className='d-flex flex-column common-bg-card px-2 py-5'>
                                <span onClick={()=> setHourlyWeather(true)} className={hourlyWeather ? "material-symbols-outlined colorActive cursorPointer pb-5" : "material-symbols-outlined colorInActive cursorPointer pb-5"}>
                                    home
                                </span>
                                <span onClick={()=> setHourlyWeather(false)} className={hourlyWeather ? "material-symbols-outlined colorInActive cursorPointer" : "material-symbols-outlined colorActive cursorPointer"}>
                                    timeline
                                </span>
                            </div>
                        </div>
                        {hourlyWeather ?
                            <div className='width-95'>
                                <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center my-3'>
                                    <div className='mainWeatherValues width-74 height-38vh common-theme-bg-card p-3 d-flex flex-column justify-content-center align-items-center mb-3 mb-lg-0'>
                                        <div className='width-100 d-flex flex-row justify-content-center align-items-center p-1'>
                                            <Icon icon="ion:location-outline" />
                                            <p id='cityCountry' className='m-0 px-1'>{location}</p>
                                        </div>
                                        <div className='width-100 d-flex flex-row flex-lg-row flex-wrap-reverse flex-lg-nowrap justify-content-around align-items-center'>
                                            <div className='width-100 d-flex flex-row justify-content-center align-items-center'>
                                                <div className='width-100 d-flex justify-content-center align-items-center flex-column'>
                                                    <p id='weatherTemperature' className='m-0 fs-1 fw-bolder'>{temperature}</p>
                                                    <p id='weatherDescription' className='m-0'>{description}</p>
                                                </div>
                                            </div>
                                            <div className='width-100 d-flex justify-content-center align-items-center flex-column'>
                                                <img id='weatherIcon' className='p-3' src={weatherIcons} alt="img" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='smDispaly-none width-24'>
                                        <Iframe
                                            id='mapBox'
                                            className='map rounded-4'
                                            src={googleMapUrl.current}
                                            width="100%" height="264.18" >
                                        </Iframe>
                                    </div>

                                    {/* <div className='smDispaly-none width-24'>
                                    <h5>Other City's</h5>
                                    <div className='width-100 d-flex justify-content-center align-items-center flex-column'>
                                        <div className='width-100 common-bg-card d-flex justify-content-around align-items-center flex-row py-2 mb-3'>
                                            <div className='d-flex justify-content-center align-items-center flex-column'>
                                                <h5 id='cityNameOne' className='m-0 text-center'>{cityOneName.current}</h5>
                                                <p id='cityDescriptionOne' className='m-0'>{cityOneDescription.current}</p>
                                            </div>
                                            <h5 id='cityTempOne' className='m-0 text-center'>{cityOneTem.current}</h5>
                                        </div>
                                        <div className='width-100 common-bg-card d-flex justify-content-around align-items-center flex-row py-2 mb-3'>
                                            <div className='d-flex justify-content-center align-items-center flex-column'>
                                                <h5 id='cityNameTwo' className='m-0 text-center'>{cityTwoName.current}</h5>
                                                <p id='cityDescriptionTwo' className='m-0'>{cityTwoDescription.current}</p>
                                            </div>
                                            <h5 id='cityTempTwo' className='m-0 text-center'>{cityTwoTem.current}</h5>
                                        </div>
                                        <div className='width-100 common-bg-card d-flex justify-content-around align-items-center flex-row py-2 mb-3'>
                                            <div className='d-flex justify-content-center align-items-center flex-column'>
                                                <h5 id='cityNameThree' className='m-0 text-center'>{cityThreeName.current}</h5>
                                                <p id='cityDescriptionThree' className='m-0'>{cityThreeDescription.current}</p>
                                            </div>
                                            <h5 id='cityTempThree' className='m-0 text-center'>{cityThreeTem.current}</h5>
                                        </div>
                                        </div>
                                    </div> */}
                                </div>


                                <div className='width-100 d-flex flex-column justify-content-around align-items-center'>
                                    <h5 className='width-100'>Today's Highlights</h5>
                                    <div className='width-100 d-flex flex-column flex-lg-row justify-content-between align-items-center'>
                                        <div className='humidity width-100 mx-2 height-30vh common-bg-card d-flex justify-content-evenly justify-content-lg-center align-items-center flex-row flex-lg-column py-4 px-3 mb-2 mb-lg-0'>
                                            <div className='d-flex flex-row justify-content-between align-items-center'>
                                                <img className='w-25 mx-3' src={humidityIcon} alt="Humidity" />
                                                {/* <Icon className='fs-1 mx-3' icon="solar:waterdrops-outline" /> */}
                                                <p className='m-0'>Humidity</p>
                                            </div>
                                            <p id='weatherHumidity' className='m-0'>{humidity}</p>
                                        </div>
                                        <div className='wind width-100 mx-2 height-30vh common-bg-card d-flex justify-content-evenly justify-content-lg-center align-items-center flex-row flex-lg-column py-4 px-3 mb-2 mb-lg-0'>
                                            <div className='d-flex flex-row justify-content-between align-items-center'>
                                                <img className='w-25 mx-3' src={windIcon} alt="Wind" />
                                                {/* <Icon className='fs-1 mx-3' icon="ph:wind" /> */}
                                                <p className='m-0'>Wind</p>
                                            </div>
                                            <p id='weatherWind' className='m-0'>{wind}</p>
                                        </div>
                                        <div className='pressure width-100 mx-2 height-30vh common-bg-card d-flex justify-content-evenly justify-content-lg-center align-items-center flex-row flex-lg-column py-4 px-3 mb-2 mb-lg-0'>
                                            <div className='d-flex flex-row justify-content-between align-items-center'>
                                                <img className='w-25 mx-3' src={pressureIcon} alt="Pressure" />
                                                {/* <Icon className='fs-1 mx-3' icon="lets-icons:pressure-light" /> */}
                                                <p className='m-0'>Pressure</p>
                                            </div>
                                            <p id='weatherPressure' className='m-0'>{pressure}</p>
                                        </div>
                                        <div className='common-theme-bg-card width-100 mx-2 currentTime d-flex justify-content-center align-items-center flex-column py-4 px-3'>
                                            <p className='m-0 fs-5 text-white'>Current Time</p>
                                            <p className='fs-5 text-white'>{time}</p>
                                            <div className='width-100 d-flex flex-row justify-content-around align-items-center'>
                                                <div className='d-flex flex-column justify-content-center align-items-center mx-2'>
                                                    <p className='m-0 text-white'>Sunrise</p>
                                                    <p className='m-0 text-white'>{sunriseAndSunset[0]}</p>
                                                </div>
                                                <div className='d-flex flex-column justify-content-center align-items-center mx-2'>
                                                    <p className='m-0 text-white'>Sunset</p>
                                                    <p className='m-0 text-white'>{sunriseAndSunset[1]}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : <HourlyWeather value={txtValue}></HourlyWeather>}
                    </div> : <></>}
            </div>
        </>
    )
}
