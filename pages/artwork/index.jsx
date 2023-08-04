/*******************************************************************************
 *  WEB422 – Assignment 6
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Jason Shin
 *  Student ID: 111569216
 *  Date: Aug 04, 2023
 *  Deploy Link: a6-my-8sipgkfb7-classick93.vercel.app
 ******************************************************************************/

import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import { Container, Row, Col, Card, Pagination } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import React, { useState, useEffect } from "react";
import validObjectIDList from "@/public/data/validObjectIDList.json";

const PER_PAGE = 12;

export default function ArtWork() {
  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];
  let [artworkList, setArtWorkList] = useState(null);
  let [page, setPage] = useState(1);

  const previousPage = () => {
    page > !1 && setPage(page - 1);
  };

  const nextPage = () => {
    page < artworkList.length && setPage(page + 1);
  };

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  useEffect(() => {
    if (data != null && data != undefined) {
      let filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs?.includes(x)
      );
      let results = [];
      for (let i = 0; i < filteredResults?.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtWorkList(results);
      console.log(artworkList);
      setPage(1);
    }
  }, [data]);

  if (error) {
    return <Error statusCode={404} />;
  } else if (!artworkList) {
    return null;
  }

  return (
    <Container>
      {artworkList.length > 0 ? (
        <>
          <Row className="gy-4">
            {artworkList[page - 1].map((currentObjectID) => (
              <Col lg={3} key={currentObjectID}>
                <ArtworkCard objectID={currentObjectID} />
              </Col>
            ))}
          </Row>
          <Row>
            <Col className="d-flex justify-content-center mt-3">
              <br />
              <br />
              <Pagination>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          </Row>
        </>
      ) : (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            <p>Try searching for something else.</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
