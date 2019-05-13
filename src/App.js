import React from "react";
import AppRouter from "./router/appRouter";
import NavigationBar from "./components/common/navigationBar";
import Footer from "./components/common/footer";

import styled from "styled-components";

const ContainerDiv = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <React.Fragment>
      <ContainerDiv>
        <NavigationBar />
        <AppRouter />
        <Footer />
      </ContainerDiv>
    </React.Fragment>
  );
}

export default App;
