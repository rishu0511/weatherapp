import React, { useState,useEffect,useRef,useCallback } from "react";
import axios from "axios";

const Apps = (props) => {
  // State to store the fetched data
  const [input, setinput] = useState({
    city: "Pratapgarh",
    state: "Utter Pradesh"});
  const[weather_info,setweather] = useState([]);
  function handleChange(event) {
    const { name, value } = event.target;
    setinput((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  }
const Fetchdata = useCallback(async() => {
    await axios.get( `${process.env.BACKEND_API}/api/weather/${input.city}`)
    .then(({ data }) => {
      setweather(data)
  })
  .catch(console.warn);
  console.log(weather_info)
});
useEffect(()=>{
  props.SETW(weather_info)
},[weather_info])

  // Function to fetch data using Axio
  // Call fetchData on component mount
  return (
    <div  class="FORM">
       <input
          class="Input"
          onChange={handleChange}
          name="city"
          placeholder="City..."
          value={input.city}
        />
        <button class="Input"onClick={Fetchdata}>Search</button>
    </div>
  );
};

export default Apps;