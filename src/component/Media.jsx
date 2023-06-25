'use client'

import React from 'react';
import { FiRefreshCw } from "react-icons/fi";


const Media = ({data, locationTime, fetchWeather, temp, setLocation, nextday}) => {

  const dtime = locationTime.datetime?.slice(11,16);
  const dH = dtime?.slice(0,2);
  const dM = dtime?.slice(3);
  const dday = locationTime.datetime?.slice(8,10);
  const dmonth = locationTime.datetime?.slice(6,7);
  const dyear = locationTime.datetime?.slice(0,4);
  const months = {1:"January",2:"February",3:"March",4:"April",5:"May",6:"June",7:"July",8:"August",9:"September",10:"October",11:"November",12:"December"}
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  let day = d.getDay();

  const refreshData = (e) => {

    setLocation(temp[temp.length-1])
    fetchWeather(e)
  }
  
  return ( 

        <div>
        <div className='relative flex flex-col max-w-[1280px] w-full m-auto p-4 text-gray-300 z-10'>
      
      <div className='flex justify-center items-center text-2xl text-gray-600 text-center'>
        <p className='mr-2'>Weather in {data.name}</p>
        <button onClick={(e)=>refreshData(e)}><FiRefreshCw /></button>
      </div>



           <div className=' lg:flex gap-10 justify-center'>
            <div className='bg-gray-800/60 text-white text-center shadow-xl p-7 rounded-xl my-10'>
            <p className='text-4xl'>{days[day]}</p>
            <p className='text-2xl pb-10' >{dH>12 ? `${dH-12}:${dM}` : dtime} <span className='text-1xl inline'>{dH<12 ? 'AM' : 'PM'}</span></p>
            <p className='text-3xl'> {months[dmonth]} {dday}, {dyear}</p>
            <p className='text-xl'>{locationTime.requested_location} {data.sys.country} </p>
            <p className='text-xl'>{locationTime.timezone_abbreviation}</p> 
            </div >
            <div className='bg-gray-800/60 text-white text-center shadow-xl p-7 rounded-xl my-10'>
            <p className='text-4xl'> Tempurature</p>
            <p className='text-2xl pb-5' >{data.main.temp.toFixed(0)}&#176;C</p>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather Icon" />
            <p className='text-3xl'>{data?.weather[0].main}</p>
            <p className='text-xl'>{data?.weather[0].description}</p>
            </div>
            <div className='bg-gray-800/60 text-white text-center shadow-xl p-7 rounded-xl my-10'>
            <p className='text-4xl'> Humidity</p>
            <p className='text-2xl pb-10' >{data.main.humidity} %</p>
            <p className='text-4xl'>Wind Speed</p>
            <p className='text-2xl' >{data.wind.speed} m/s</p>
            </div>
            <div className='bg-gray-800/60 text-white text-center shadow-xl p-7 rounded-xl my-10 ' >
              <p className='text-4xl pb-2'>Tomorrow</p>
            <p className='text-2xl '>{days[day+1]}</p>
            <p className='text-2xl pb-5' > {nextday?.list[0]?.main.temp}&#8457; </p>
            <img src={`https://openweathermap.org/img/wn/${nextday?.list[0]?.weather[0]?.icon}@2x.png`} alt="weather Icon" />
            <p className='text-3xl'>{ nextday?.list[0]?.weather[0]?.main }</p>
            </div>
            </div>

        </div>
        </div>
     );
}
 
export default Media;