import React from "react";
function App() {
  async function showOutput() {
    let city = document.getElementById("cityId").value;
    console.log(city);
    try {
      const result = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&appid=c988e1f9fbee14a0d1c620ddbc1a0d6b"
      );
      const responseData = await result.json();
      let weatherDescriptipon = responseData.weather[0].description;

      let temperature = responseData.main.temp - -273.15;
      let windSpeed = responseData.wind.speed;
      let humidity = responseData.main.humidity;

      if (weatherDescriptipon) {
        document.getElementById("description").innerHTML = weatherDescriptipon;
      }
      if (temperature) {
        document.getElementById("temperature").innerHTML =
          "Temp : " + temperature;
      }
      if (windSpeed) {
        document.getElementById("windSpeed").innerHTML =
          "Wind Speed : " + windSpeed;
      }
      if (humidity) {
        document.getElementById("humidity").innerHTML =
          "Humidity : " + humidity;
      }

      // console/.log(responseData);
    } catch (e) {
      alert("Something Went Wrong please check your Input");
      console.log(e);
    }
  }
  return (
    <div className="main-outer">
      <div className="App center">
        <input type="text" name="city" id="cityId"></input>
        <button onClick={showOutput}> Click</button>;
      </div>

      <div id="resultDiv">
        <h1 id="description"></h1>
        <h3 id="temperature"></h3>
        <h3 id="windSpeed"></h3>
        <h3 id="humidity"></h3>
      </div>
    </div>
  );
}

export default App;
