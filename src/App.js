import React from "react";
import AppRouter from "./router/appRouter";
import NavigationBar from "./components/navigationBar";
import { Container, Row } from "react-bootstrap";

import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <Container fluid>
        <AppRouter />
      </Container>
    </React.Fragment>
  );
}

export default App;
