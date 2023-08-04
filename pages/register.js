import React, { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "@/lib/authenticate";
import { Card, Form, Button, Alert } from "react-bootstrap";

export default function Register(props) {
  const router = useRouter();
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [warnError, setWarnError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser(username, password, password2);
      router.push("/login");
    } catch (err) {
      setWarnError(err.message);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Register</h2>
          <p>Please register using the form below to create an account:</p>
          {warnError && (
            <>
              <br />
              <Alert variant="danger">{warnError}</Alert>
            </>
          )}
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
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="dark" className="pull-right" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
}
