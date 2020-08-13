import React, { useState } from "react";

import styled from "@emotion/styled";

import { Form, Button, InputGroup } from "react-bootstrap";

import { BsSearch } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { motion } from "framer-motion";

const Container = styled.div`
  text-align: center;
`;

const City = styled.h1`
  font-family: "Merriweather", sans-serif;
  font-size: 1.6rem;
  position: relative;
  transition: transform 200ms ease-in-out, color 500ms;
  cursor: pointer;
  &:hover {
    transform: translate(0, -5px);
    color: darkblue;
  }
`;

const Country = styled.h3`
  font-family: "Fira Sans", sans-serif;
  font-size: 1.1rem;
`;

export const states = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
};

const Location = ({ city, country, getWeather }) => {
  const [query, setQuery] = useState("");
  const [inputMode, setInputMode] = useState(false);

  return (
    <Container>
      {!inputMode ? (
        <motion.div initial="hidden" animate="visible" variants={states}>
          <City onClick={() => setInputMode(true)}>{city}</City>
        </motion.div>
      ) : (
        <motion.form
          style={{ margin: "0.4rem" }}
          onSubmit={(e) => {
            e.preventDefault();
            getWeather(query);
          }}
          initial="hidden"
          animate="visible"
          variants={states}
        >
          <InputGroup size="sm">
            <InputGroup.Prepend>
              <Button variant="danger" onClick={() => setInputMode(false)}>
                <MdCancel />
              </Button>
            </InputGroup.Prepend>
            <Form.Control
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter city"
            />
            <InputGroup.Append>
              <Button variant="dark" type="submit">
                <BsSearch />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </motion.form>
      )}

      <Country>{country}</Country>
    </Container>
  );
};

export default Location;
