import React, { useState, useEffect } from "react";

import PulseLoader from "react-spinners/PulseLoader";

import WeatherCard from "./WeatherCard/component.js";
import { states } from "./WeatherCard/Location.js";

import { Button, Alert } from "react-bootstrap";

import { motion } from "framer-motion";

import { GrPowerReset } from "react-icons/gr";

const WeatherEngine = ({ defaultLocation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); // for invalid input data

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    condition: null,
    country: null,
  });

  // data fetching function
  const getWeather = async (q) => {
    setQuery(""); // set input field empty

    setLoading(true);

    try {
      const apiRes = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=87b5617cb7c68a2fe008d839ed855ec4`
      );
      const resJSON = await apiRes.json();
      setWeather({
        temp: resJSON.main.temp,
        city: resJSON.name,
        condition: resJSON.weather[0].main,
        country: resJSON.sys.country,
      });
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    getWeather(defaultLocation);
  }, [defaultLocation]);

  return (
    <div>
      {!loading && !error ? (
        <>
          <WeatherCard
            temp={weather.temp}
            condition={weather.condition}
            city={weather.city}
            country={weather.country}
            getWeather={getWeather}
          />
        </>
      ) : loading ? (
        <div
          style={{
            display: "flex",
            width: "200px",
            height: "240px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PulseLoader size={15} color="purple" />
        </div>
      ) : error ? (
        <motion.div initial="hidden" animate="visible" variants={states}>
          <Alert variant="danger">
            There has been an error!
            <Button
              className="ml-2 text-white"
              variant="danger"
              onClick={() => {
                setError(false);
              }}
            >
              <GrPowerReset />
            </Button>
          </Alert>
        </motion.div>
      ) : null}
    </div>
  );
};

export default WeatherEngine;
