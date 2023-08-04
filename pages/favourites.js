import React from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Col, Container, Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
  const [favourites] = useAtom(favouritesAtom);
  let [artworkList, setArtworkList] = useState([]);

  useEffect(() => {
    if (favourites) {
      setArtworkList(favourites);
    }
  }, [favourites]);

  if (!favourites) return null;

  if (artworkList.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Nothing Here</Card.Title>
          <Card.Text>Try searching for some new artwork.</Card.Text>
        </Card.Body>
      </Card>
    );
  }
  return (
    <Container>
      <Row>
        {artworkList.map((currentObjectID) => (
          <Col key={currentObjectID} sm={6} md={3} lg={3}>
            <ArtworkCard objectID={currentObjectID} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
