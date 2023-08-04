import React from "react";
import useSWR from "swr";
import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import Error from "next/error";

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error && error.response && error.response.status === 404) {
    return <Error statusCode={404} />;
  } else {
    if (!data) {
      return null;
    } else if (data.message === "Not a valid object") {
      return null;
    } else {
      return (
        <Card className="card">
          {data.primaryImageSmall ? (
            <Card.Img variant="top" src={data.primaryImageSmall} />
          ) : (
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
            />
          )}
          <Card.Body>
            {data.title ? (
              <Card.Title>{data.title}</Card.Title>
            ) : (
              <Card.Title>N/A</Card.Title>
            )}
            <Card.Text>
              {data.objectDate ? <p>{data.objectDate}</p> : <p>N/A</p>}
              {data.classification ? <p>{data.classification}</p> : <p>N/A</p>}
              {data.medium ? <p>{data.medium}</p> : <p>N/A</p>}
            </Card.Text>
            <Link passHref legacyBehavior href={`/artwork/${objectID}`}>
              <Button variant="dark">{objectID}</Button>
            </Link>
          </Card.Body>
        </Card>
      );
    }
  }
}
