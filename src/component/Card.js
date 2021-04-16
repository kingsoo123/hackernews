import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/card";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Cards = () => {
  const [hits, setHits] = useState([]);
  function GetAllUSers() {
    axios
      .get("http://hn.algolia.com/api/v1/search?tags=front_page")
      .then((response) => {
        console.log(response.data);
        setHits(response.data.hits);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    GetAllUSers();
  }, []);

console.log("::::::::::::::::::HITS", hits);

  const cardData = hits.map((data, i) => {
    return (
      <Accordion style={{ marginTop: 10 }} key={i}>
        <Card>
          <Card.Header>
            <p>{data.title}</p>
            <Accordion.Toggle as={Button} eventKey="0">
              {`More details`}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              Author: {data.author}
              <br />
              Url: {data.url}
              <br />
              Number of comments: {data.num_comments}
              <br/>
              Date created: {data.created_at}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  });

  return (
    <div className="d-flex align-content-around flex-wrap p-5">{cardData}</div>
  );
};

export default Cards;
