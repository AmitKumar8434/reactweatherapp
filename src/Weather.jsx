import React, { useEffect, useState } from 'react';
import web from './images/001-sunny.png';
import i1 from './images/050-rain.png';
import i2 from './images/007-thunder.png';
import i3 from './images/008-snow.png';
import i4 from './images/027-tree.png';
import i5 from './images/006-storm.png';
import i6 from './images/016-cloudy.png';



const Weather = () => {

    const [location, setLocation] = useState("");
    const [search, setsearch] = useState("");
    const [country, setcountry] = useState("");
    const [flag, setflag] = useState(false);
    const [image, setImage] = useState(web);
    const onSuccess=async(position)=> {
        let long;
        let lat;
        long=position.coords.longitude;
        lat = position.coords.latitude;
        try {
            const fetchApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=408c29a5868f31d539097c662762c8ca`;
            const response1 = await fetch(fetchApi);
            const jsonval = await response1.json();
            console.table(jsonval.sys.country);
            setsearch(jsonval.name)
            setLocation(jsonval.name);
            setcountry(jsonval.sys.country);
        }
        catch (err) {
            alert("Allow Location Permission!!");
        }
    }
    const onError = (err) => {
        console.log(err);
    }
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    },[])

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=408c29a5868f31d539097c662762c8ca`;
                const response = await fetch(url);
                const resJson = await response.json();
                if (resJson.cod < "400") {
                    let id = resJson.weather[0].id;

                    if(id<300 && id>200){
                        setImage(i5);
                    }
                    if(id<400 && id>300){
                        setImage(i1);
                    }
                    if(id<600 && id>500){
                        setImage(i2);
                    }
    
                    if(id<700 && id>600){
                        setImage(i3);
                    }
                    if(id<800 && id>700){
                        setImage(i4);
                    }
                    if(id===800){
                        setImage(web);
                    }
                    if(id>800){
                        setImage(i6);
                    }
                    setLocation(resJson.main.temp);
                    setcountry(resJson.sys.country);
                    setflag(true);
                }
                else {
                    setflag(false);
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchApi()
    },[search])
    const inputEvent = (e) => {
        setsearch(e.target.value);
    }

    return (
        <>
            <div className='box'>
                <div className="inputData">
                    <input type="search" className="inputfield"
                        onChange={inputEvent}
                        placeholder="Enter location" value={search} required autoComplete="off" />
                </div>
                {
                    (flag===false)? (
                        <p> No data found</p>
                    ) : (
                        <div className="container">
                                <h2 className="location">{search},{country}</h2>
                        <img className="image" src={image} alt="icon"/>
                                <h1 className="temp">{location} °C</h1>
                       </div>
                    )
                }
           </div>
        </>
    )
}
export default Weather;