import React, { useState } from "react";
import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  let token = readToken();

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsExpanded(false);
    let queryString = `title=true&q=${searchValue}`;
    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?${queryString}`);
  }

  function updatingSearchValue(event) {
    setSearchValue(event.target.value);
  }

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const linkClick = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-dark navbar-dark fixed-top nav-bar"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>Jason Shin</Navbar.Brand>
          <Navbar.Toggle onClick={handleToggle} aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {token ? (
              <>
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Link href="/" passHref legacyBehavior>
                    <Nav.Link
                      active={router.pathname === "/"}
                      onClick={linkClick}
                    >
                      Home
                    </Nav.Link>
                  </Link>
                  <Link href="/search" passHref legacyBehavior>
                    <Nav.Link
                      active={router.pathname === "/search"}
                      onClick={linkClick}
                    >
                      Advanced Search
                    </Nav.Link>
                  </Link>
                </Nav>
                &nbsp;
                <Form className="d-flex" onSubmit={handleSubmit}>
                  <Form.Control
                    value={searchValue}
                    onChange={updatingSearchValue}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button type="submit" variant="outline-success">
                    Search
                  </Button>
                </Form>
                &nbsp;
                <Nav>
                  <NavDropdown title={token.userName} id="basic-nav-dropdown">
                    <Link href="/favourites" passHref legacyBehavior>
                      <NavDropdown.Item onClick={linkClick}>
                        Favourites
                      </NavDropdown.Item>
                    </Link>
                    <Link href="/history" passHref legacyBehavior>
                      <NavDropdown.Item onClick={linkClick}>
                        History
                      </NavDropdown.Item>
                    </Link>
                    <Link href="/login" passHref legacyBehavior>
                      <NavDropdown.Item onClick={logout}>
                        Logout
                      </NavDropdown.Item>
                    </Link>
                  </NavDropdown>
                </Nav>
              </>
            ) : (
              <>
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Link href="/" passHref legacyBehavior>
                    <Nav.Link
                      active={router.pathname === "/"}
                      onClick={linkClick}
                    >
                      Home
                    </Nav.Link>
                  </Link>
                </Nav>
                <Nav
                  className="my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link onClick={linkClick}>Register</Nav.Link>
                  </Link>
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link onClick={linkClick}>Login</Nav.Link>
                  </Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
