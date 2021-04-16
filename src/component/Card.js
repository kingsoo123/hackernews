import React, { useState, useEffect } from "react";
import {Accordion, Card, Button} from "react-bootstrap";
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
              <small style={{background:'yellow', padding: 3, borderRadius: 30}}>Author</small>: {data.author}
              <br />
              <small style={{background:'yellow', padding: 3, borderRadius: 30}}>Url</small>: {data.url}
              <br />
              <small style={{background:'yellow', padding: 3, borderRadius: 30}}>Number of comments</small>: {data.num_comments}
              <br/>
              <small style={{background:'yellow', padding: 3, borderRadius: 30}}>Date created</small>: {data.created_at}
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
