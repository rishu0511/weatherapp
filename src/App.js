import "./index.css";
import React, { useEffect, useRef, useState } from "react";
import Apps from "./fetch.js";
import Canvas from "./tapp.js";
import Canvasb from "./box_can.js";
import Canvasimg from "./can_img.js";
import Canvascimg from "./can_cutimg.js";
import Clock from "./clock.js";
import CanvasReal from "./real_clock.js"; 
import Canvasr from "./canvas_r.js";

export default function App() {
    const [place, setplace] = useState("")
    const [lat,setlat] = useState(0)
    const [lon,setlon] = useState(0)
    const [weath,setweath] = useState(0)
    const [tem_max,setmax] = useState(0)
    const [tem_min,setmin] = useState('')
    const [visible,setvisible] = useState('')
    const [wind,setwind] = useState(0)
    const [gust,setgust] = useState(0)
    const [deg,setdeg] = useState(0)
    const [Air_p,setAirp] = useState(0)
    const [ground_l,setgrnd] = useState(0)
    const [slevel,setslevel] = useState(0)
    const[sunr,setsunrise] = useState(0)
    const[suns,setsunset] = useState(0)
    const [humid,sethumid] = useState(0)
    const [des,setdes] = useState([])
    const [desc,setdesc] = useState('')
    const data = useRef({})
    const [value,setvalue] = useState(0)
    const ref = useRef(0)
    useEffect(()=>{
        ref.current=value
        if(data.current){
             setweath((data.current.main.temp-273))
             setmax((data.current.main.temp_max-273)) 
             setmin((data.current.main.temp_min-273))
             setAirp(data.current.main.pressure)
             setgrnd(data.current.main.grnd_level)
             setslevel(data.current.main.sea_level)
             sethumid(data.current.main.humidity)
             setwind(data.current.wind.speed)
             setgust(data.current.wind.gust) 
             setdeg(data.current.wind.deg)
             setsunrise(data.current.sys.sunrise) 
             setsunset(data.current.sys.sunset) 
             setlat(data.current.coord.lat)
             setlon(data.current.coord.lon)
             setvisible(data.current.visibility)
            data.current.weather.map((element,index)=>{
                if(index===0){
                  setdesc(element.main)
                }
            })
        setplace(data.current.name)
        setdes(data.current.weather);
        }
    },[value])
    function set_w(Data){
        data.current=Data.current
        setvalue(value+1)
    }
    return(
    <div class="canvas">
        <Canvas  DESCRIPT={desc} PLACE={place} TEMP={Math.floor(weath)} DES={desc}/>
        <Apps SETW={set_w}/>
        
        <Canvasb class="Box" TEM={tem_min} DES={"Min temprature"}/>
        <Canvasb TEM={tem_max} DES={"Max temprature"}/>
        <Canvasimg IMG={"./icons/visible.png"} DESC={"Visibility"} VAL={visible} X={50} UNIT= {" m"}/>
        <Canvasimg IMG={"./icons/air-pressure.png"} DESC={"Air pressure"} VAL={Air_p} X={10}  UNIT= {" Hpa"}/>
        <Canvasimg IMG={"./icons/wind-speed.png"} DESC={"Wind speed"} VAL={wind} X={10}  UNIT= {" m/s"}/>
        <Canvasimg IMG={"./icons/humid.png"} DESC={"Humidity"} VAL={humid} X={10}  UNIT= {" %"}/>
        <Canvasimg IMG={"./icons/groundlevel.png"} DESC={"Ground level"} VAL={ground_l} X={10}  UNIT= {" m"}/>
        <Canvascimg IMG={"./icons/wind-speed.png"} DESC={"Wind gust"} VAL={gust} X={10} UNIT= {" m/s"}/>
        <Clock NOW={sunr} DES={"Sunrise"} MRDN= {"AM"}/>
        <Clock NOW={suns} DES={"Sunset"} MRDN= {"PM"}/>
        <div class="bottom_box">
            <p class="para">Latitude : {lat}°</p>
            <p class="para">Longitude : {lon}°</p>
            <p class="para">Sea level : {slevel} meter</p>
            <p class="last_p">Wind flowing degree : {deg}°</p> 
            <CanvasReal/>
        </div>
    </div>
)}