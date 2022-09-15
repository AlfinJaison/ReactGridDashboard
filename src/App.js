import React from "react";
import "./assets/rgl.css";
import "./assets/styles.css";

import { Container } from "reactstrap";
import Grid from "./Grid";
import NavigationBar from "./Navbar";

function App() {
  return (
    <div className="App">
      <NavigationBar></NavigationBar>
      <Container fluid={true}>
        <Grid/>
      </Container>
    </div>
  );
}

export default App;
