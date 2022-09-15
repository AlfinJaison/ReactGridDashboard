import React from "react";
import "./assets/rgl.css";
import "./assets/styles.css";

import { Container } from "reactstrap";
import Grid from "./Grid";
import NavigationBar from "./Navbar";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavigationBar></NavigationBar>
        <Container fluid={true}>
          <Grid></Grid>
        </Container>
      </div>
    );
  }
}

export default App;
