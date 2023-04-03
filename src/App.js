import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import defaultBackgroundImage from "./images/default.avif";
import rainyImage from "./images/rain.jpeg";
import cloudImage from "./images/cloud.jpeg";
import sunnyDayImage from "./images/sunny.jpeg";
import clearSkyImage from "./images/clearsky.jpeg";
import mistImage from "./images/mist.jpeg";
import hazeImage from "./images/haze.jpeg";

function App() {
  const [description, setDescription] = useState("");
  const [temperature, settemperature] = useState("");
  const [windSpeed, setwindSpeed] = useState("");
  const [humidity, setHumidity] = useState("");
  const [bgImage, setbgImage] = useState(defaultBackgroundImage);
  const [ccity, setCity] = useState("");

  async function showOutput() {
    let city = document.getElementById("standard-basic").value;
    setCity(city);
    try {
      const result = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&appid=c988e1f9fbee14a0d1c620ddbc1a0d6b"
      );
      const responseData = await result.json();
      let weatherDescriptipon = responseData.weather[0].description;
      let temperature = responseData.main.temp;
      let windSpeed = responseData.wind.speed;
      let humidity = responseData.main.humidity;

      if (weatherDescriptipon.includes("clouds")) {
        setbgImage(cloudImage);
      } else if (weatherDescriptipon.includes("rain")) {
        setbgImage(rainyImage);
      } else if (weatherDescriptipon.includes("sun")) {
        setbgImage(sunnyDayImage);
      } else if (weatherDescriptipon.includes("clear")) {
        setbgImage(clearSkyImage);
      } else if (weatherDescriptipon.includes("mist")) {
        setbgImage(mistImage);
      } else if (weatherDescriptipon.includes("haze")) {
        setbgImage(hazeImage);
      } else {
        setbgImage(defaultBackgroundImage);
      }

      if (weatherDescriptipon) {
        setDescription(weatherDescriptipon);
      }
      if (temperature) {
        settemperature("Temp : " + parseInt(temperature - 273));
      }
      if (windSpeed) {
        setwindSpeed("Wind Speed : " + windSpeed);
      }
      if (humidity) {
        setHumidity("Humidity : " + humidity);
      }
    } catch (e) {
      alert("Something Went Wrong please check your Input");
      console.log(e);
    }
  }
  return (
    <div className="main-outer">
      <h1 className="top-text">Weather App</h1>
      <div className="App">
        <TextField id="standard-basic" label="Enter City" variant="outlined" />
        <Button variant="outlined" onClick={showOutput}>
          go
        </Button>
      </div>

      {description !== "" && (
        <Card sx={{ maxWidth: 600 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="340"
              image={bgImage}
              alt="green iguana"
            />
            <CardContent>
              <h1>{ccity}</h1>
              <Typography gutterBottom variant="h5" component="div">
                {description.charAt(0).toUpperCase() + description.slice(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <h3 id="temperature">{temperature}</h3>
                <h3 id="windSpeed">{windSpeed}</h3>
                <h3 id="humidity">{humidity}</h3>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </div>
  );
}

export default App;
