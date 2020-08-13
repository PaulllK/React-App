import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

import Location from "./Location.js";
import Icon from "./Icon.js";
import Condition from "./Condition.js";

const WeatherCard = ({ temp, condition, city, country, getWeather }) => {
  let highColor = 0;
  let lowColor = 0;
  let bg = null;

  if (temp > 12) {
    // for hot weather
    highColor = (1 - (temp - 12) / 28) * 255;
    lowColor = highColor - 200;
    bg = `linear-gradient(
      to top,
      rgba(255, ${highColor}, 0),
      rgb(255, ${Math.abs(lowColor)}, 0)
    )`;
  } else if (temp <= 12) {
    // for cold weather
    highColor = (1 - (temp + 20) / 32) * 255;
    lowColor = highColor - 200;
    bg = `linear-gradient(
      to top,
      rgba(0, ${highColor}, 255),
      rgb(0, ${Math.abs(lowColor)}, 255)
    )`;
  }

  const Card = styled.div`
    margin: 10px auto;
    background: ${bg};
    width: 220px;
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 15px;
    -webkit-box-shadow: 0px 8px 22px -4px rgba(0, 0, 0, 0.8);
    -moz-box-shadow: 0px 8px 22px -4px rgba(0, 0, 0, 0.8);
    box-shadow: 0px 8px 22px -4px rgba(0, 0, 0, 0.8);
  `;

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <Card>
        <Location getWeather={getWeather} city={city} country={country} />
        <Icon condition={condition} />
        <Condition temp={temp} condition={condition} />
      </Card>
    </motion.div>
  );
};

export default WeatherCard;
