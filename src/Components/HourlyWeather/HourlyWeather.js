import React, { useEffect, useMemo, useState } from 'react';
import './HourlyWeather.css';
import one_d from './../../WeatherIcons/01d-clear-sky.png';
import one_n from './../../WeatherIcons/01n-clear-sky.png';
import two_d from './../../WeatherIcons/02d-few-clouds.png';
import two_n from './../../WeatherIcons/02n-few-clouds.png';
import three_d_n from './../../WeatherIcons/03d-03n-scattered-clouds.png';
import four_d_n from './../../WeatherIcons/04d-04n-broken-clouds.png';
import nine_d_n from './../../WeatherIcons/09d-09n-shower-rain.png';
import ten_d from './../../WeatherIcons/10d-rain.png';
import ten_n from './../../WeatherIcons/10n-rain.png';
import eleven_d_n from './../../WeatherIcons/11d-11n-thunderstorm.png';
import thirteen_d_n from './../../WeatherIcons/13d-13n-snow.png';
import fifty_d_n from './../../WeatherIcons/50d-50n-mist.png';
import { Line } from 'react-chartjs-2';
import {
    Chart as Chartjs,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
} from 'chart.js';

Chartjs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
)

export default function HourlyWeather({ value }) {
    const [weatherList, setWeatherList] = useState([]);

    useEffect(() => {
        setTimeout(async () => {
            let url = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&appid=2858092d7472f3fb75d67766ac57415f`;
            let response = await fetch(url);
            let data = await response.json();
            if (!response.ok) {
                // Swal.fire("Enter Proper City!");
            } else {
                setWeatherList(data.list);
            }
        }, 10)
    }, [])

    const weatherIcon = (icon) => {
        switch (icon) {
            case '01d': return one_d; break;
            case '01n': return one_n; break;
            case '02d': return two_d; break;
            case '02n': return two_n; break;
            case '03d': return three_d_n; break;
            case '03n': return three_d_n; break;
            case '04d': return four_d_n; break;
            case '04n': return four_d_n; break;
            case '09d': return nine_d_n; break;
            case '09n': return nine_d_n; break;
            case '10d': return ten_d; break;
            case '10n': return ten_n; break;
            case '11d': return eleven_d_n; break;
            case '11n': return eleven_d_n; break;
            case '13d': return thirteen_d_n; break;
            case '13n': return thirteen_d_n; break;
            case '50d': return fifty_d_n; break;
            case '50n': return fifty_d_n; break;

            default: return null;
                break;
        }
    }

    const data = {
        labels: weatherList.map((date) => (date.dt_txt).substring(8)),
        datasets: [{
            label: 'Temp',
            data: weatherList.map((date) => date.main.temp),
            backgroundColor: '#296dc0',
            borderColor: '#3690fe',
            pointBorderColor: '#296dc0',
            fill: false,
            tension: 0.1,
        }]
    }
    const options = {
        plugins: {
            legend: true,
        },
        scales: {
            y: {

            }
        }
    }

    return (
        <div className='width-95'>
            <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center my-3'>
                <div className='w-100 h-auto common-theme-bg-card p-3 d-flex flex-column justify-content-center align-items-center mb-3 mb-lg-0'>
                    <Line
                        data={data}
                        options={options}
                        className='w-100 h-auto'></Line>
                </div>
            </div>

            <div className='scrollAble width-100 d-flex flex-column justify-content-center align-items-center'>
                <div className='weatherList w-100'>
                    {weatherList.map((date) => (
                        <div className='d-flex justify-content-center align-items-center flex-column rounded-3 bg-primary-subtle p-3 m-3'>
                            <p className='mb-1' key={date.dt_txt}>{(date.dt_txt).substring(0,date.dt_txt.length - 8 )}</p>
                            <p className='mb-1' key={date.dt_txt}>{(date.dt_txt).substring(10)}</p>
                            <h4 className='items'>{date.main.temp + "°c"}</h4>
                            <img className='w-25 mb-2' src={weatherIcon(date.weather[0].icon)} alt="icon" />
                            <h6>{date.weather[0].description}</h6>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
