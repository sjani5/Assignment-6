import MainNav from "./MainNav";
import React from "react";
import { Container } from "react-bootstrap";
export default function Layout(props) {
  
    return (
      <>
        <MainNav />
<br />
<Container>
    {props.children}
</Container>
<br />

      </>
    );
  }