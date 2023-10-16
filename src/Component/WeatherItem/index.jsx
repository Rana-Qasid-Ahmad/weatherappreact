import React, { useEffect, useState } from "react";
import "./Style.css";
import axios from "axios";
import { ApiURL, ApiKey } from "../../helper";

export default function index() {
  const [location, setlocation] = useState(null);
  const [current, setcurrent] = useState(null);
  const [forecast, setforcast] = useState(null);
  const [sLocation, setSLocation] = useState("Germany"); // Set a default value

  useEffect(() => {
    // Make a GET request using Axios

    axios
      .get(`${ApiURL}/forecast.json?key=${ApiKey}&q=${sLocation}`)
      .then((response) => {
        setlocation(response.data.location);
        setcurrent(response.data.current);
        setforcast(response.data.forecast);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [sLocation]);
  function searchFun() {
    const newLocation = document.getElementById("searchLocationID").value;
    setSLocation(newLocation);
  }
  function handleEventEnter(event) {
    if (event.key == "Enter") {
      searchFun();
    }
  }
  if (location && location.name && forecast.forecastday[0]) {
    return (
      <>
        <div className="sunny">
          <div className="container text-center vcenter">
            <h1> Local Weather</h1>
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-6 text-left">
                    <h3 id="city">
                      <i className="fa fa-map-marker"></i>&nbsp;&nbsp;
                      <span>
                        <input
                          type="text" defaultValue={sLocation}
                          id="searchLocationID"
                          onKeyDown={handleEventEnter}
                        />
                      </span>
                    </h3>
                  </div>
                  <div className="col-md-6 text-right temp-switch">
                    <h3>
                      <input
                        id="switch-temp"
                        type="checkbox"
                        data-off-color="info"
                        data-on-color="default"
                        data-label-text="<i className='wi wi-thermometer'></i>"
                        data-label-icon="<i className='wi wi-celsius'></i>"
                        data-on-text="<i className='wi wi-fahrenheit'></i>"
                        data-off-text="<i className='wi wi-celsius'></i>"
                      />
                    </h3>
                  </div>
                </div>
                <hr />
                <div id="display">
                  <div className="row">
                    <div className="col-md-6" id="weather-icon-display">
                      <div id="weather-icon">
                        {/* <i className="wi wi-sleet"></i> */}
                        <img
                          className="weatherIcon"
                          src={current.condition.icon}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6" id="temperature">
                      <h4>{`Today Weather in ${location.name}`}</h4>

                      <p>
                        <span id="temp">{parseInt(current.temp_c)}</span>
                        <sup>
                          &deg;<span id="metric">C </span>
                        </sup>
                      </p>
                      <h5>
                        High:{" "}
                        <span id="temp-max">
                          {forecast.forecastday[0].day.maxtemp_c}
                        </span>{" "}
                        / Low:{" "}
                        <span id="temp-min">
                          {forecast.forecastday[0].day.mintemp_c}
                        </span>
                      </h5>
                    </div>
                  </div>
                </div>
                <hr id="hr-bottom" />
                <div className="row" id="weather-condition">
                  <div className="col-md-2 col-md-offset-1">
                    <h6>
                      <img className="" src={current.condition.icon} alt="" />
                    </h6>
                    <p id="condition">{current.condition.text}</p>
                  </div>
                  <div className="col-md-2">
                    <h6>
                      <i className="wi wi-humidity"></i>
                    </h6>
                    <p id="humidity">{current.humidity}%</p>
                  </div>
                  <div className="col-md-2">
                    <h6>
                      <i className="wi wi-strong-wind"></i>
                    </h6>
                    <p id="wind">
                      {current.wind_kph} kph {current.wind_dir}
                    </p>
                  </div>
                  <div className="col-md-2">
                    <h6>
                      <i className="wi wi-barometer"></i>
                    </h6>
                    <p id="hpa">{current.pressure_in} psi</p>
                  </div>
                  <div className="col-md-2">
                    <h6>
                      <i className="wi wi-showers"></i>
                    </h6>
                    <p id="prec">{current.cloud}%</p>
                  </div>
                </div>
                <hr />
              </div>
            </div>
            <footer id="footer">
              <p>
                &copy; FreeCodeCamp - 2015 | User: DannyCoder | Photo Credit:
                Respective Owners on Flickr.com
              </p>
            </footer>
          </div>
        </div>
      </>
    );
  }
}
