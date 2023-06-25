'use client'

import React, { useEffect, useState} from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import Media from "./Media";
import Loading from "./Loading";
import axios from 'axios';


const Weather = () => {
   const [location,setLocation]=useState('');
   const [weather, setWeather] = useState({});
   const [nextday, setNextDay]= useState({});
  const [locationTime, setLocationTime] = useState({})
   const [loading, setLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
  const [cache, setCache] = useState([]);

   const api={
    API_KEY:'441b726bf1a7ed503599126056aee569',
    Primary_key:'089b25b685c8418ca71aaade0ebec484',
   }

   const fetchweather=(e)=>{
    console.log(location)

    
   const weather1=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api.API_KEY}` ;
   const time=`https://timezone.abstractapi.com/v1/current_time/?api_key=${api.Primary_key}&location=${location}`;
   const next=`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${api.API_KEY}`;

   e.preventDefault();
   setLoading(true)
   setErrorMessage('')

   if(location){

   axios.get(weather1).then((response)=>{
    console.log (response.data) ;
      setWeather(response.data);
      setCache(prev => [...prev, location])
    }).catch((err)=>{
      setWeather('')
      err?.response.status === 404 && setErrorMessage(err)
    }
    )
    axios.get(next).then((response)=>{
      console.log (response.data) ;
      setNextDay(response.data);
    }) .catch((err) => {
      setNextDay('')
      console.error(err)
    })

    axios.get(time).then((response)=>{
     console.log (response.data) ;
  setLocationTime(response.data)
    }) .catch((err) => {
      setLocationTime("")
      console.error(err)
    })

   }
   setLoading(false)
   }
  
    return ( 
    <div >
        <div className='flex flex-col text-center'>
           <div className='text-5xl font-sans font-semibold tracking-tight text-white/40'> Open Weather App</div> 
           <div>
           <form onSubmit={fetchweather} className=' order-first my-14 mx-3 text-2xl'> 
            <input onChange={(e)=>setLocation(e.target.value)} placeholder='Search Location' type='text' className=' shadow-xl w-80 p-1 pl-3 pr-10 rounded-full focus:outline-0 ring-4 hover:ring-sky-400 hover:ring-5 '/>
            <button className='-ml-8 bg-trasparent text-gray-400 my-1 hover:text-gray-700' type='submit'  >
            <FaSearchLocation/>
            </button>  
            </form>
            </div>
            <p className='text-5xl relative flex justify-center max-w-[500px] w-full m-auto pt-4 text-white z-10'>{errorMessage &&  "Sorry, No Records For City"}</p>
           <div>{loading ? <Loading /> :( weather?.main&&nextday?.list)? <  Media data={weather} locationTime={locationTime} fetchweather={fetchweather} setLocation={setLocation} temp={cache} nextday={nextday}/> : null}</div>
           
</div>
       </div>
   );
}
 
export default Weather;


