import React, { useState } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { getHistory, getFavourites } from "@/lib/userData";
import { authenticateUser } from "@/lib/authenticate";
import { favouritesAtom, searchHistoryAtom } from "@/store";

export default function Login(props) {
  const router = useRouter();
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [warnError, setWarnError] = useState("");

  async function updateAtoms() {
    setSearchHistory(await getHistory());
    setFavouritesList(await getFavourites());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(username, password);
      await updateAtoms();
      router.push("/favourites");
    } catch (err) {
      setWarnError(err.message);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          <p>Please enter your login information in the form below:</p>
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {warnError && (
          <>
            <br />
            <Alert variant="danger">{warnError}</Alert>
          </>
        )}
        <br />
        <Button variant="dark" className="pull-right" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}
