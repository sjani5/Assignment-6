import React, { useState } from "react";
import { Container, Navbar, Nav, Button, Form,NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from '../lib/userData';
import {removeToken,readToken} from '../lib/authenticate';
export default function MainNav() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  let token = readToken();
   const submitForm = async(e) => {
    e.preventDefault();
    console.log("Search value:", searchValue);
    setIsExpanded(false);
    setSearchValue("");
    var queryString = `title=true&q=${searchValue}`;
    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?title=true&q=${searchValue}`);
  };
  const logout=() => {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  const handleClick = (e) => {
    setIsExpanded(false);
  };
  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-dark" expand="lg"expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Shubh Jani</Navbar.Brand>
          <Navbar.Toggle onClick={handleToggle} aria-controls="basic-navbar-nav" aria-label="Toggle navigation" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
            <Nav.Link onClick={handleClick}>Home</Nav.Link> 
              </Link>
             
              {token && ( <Link href="/search" passHref legacyBehavior>
              <Nav.Link onClick={handleClick}>Advanced Search</Nav.Link> 
              </Link>)}
            </Nav>
            {!token && (<Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    onClick={handleClick}
                    active={router.pathname === "/register"}
                  >
                    Register
                  </Nav.Link>
                </Link>
                 <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    onClick={handleClick}
                    active={router.pathname === "/login"}
                  >
                            Log in
                  </Nav.Link>
                </Link>
               </Nav>)}
            {token && (<Form className="d-flex" onSubmit={submitForm}>
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="me-2 form-control"
                value={searchValue}
                onChange={handleSearchChange}
              />
              <Button variant="success" type="submit">
                Search
              </Button>
            </Form>)}&nbsp
            {token &&(<Nav>
              <NavDropdown title="User Name" id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item
                    active={router.pathname === "/favourites"}
                    onClick={handleClick}
                  >
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item
                   onClick={handleClick}
                    active={router.pathname === "/history"}
                     >
                    Search History
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item
                   onClick={logout}
                    
                     >
                    Logout
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>)}
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
      <br/><br/>
    </>
  );
}