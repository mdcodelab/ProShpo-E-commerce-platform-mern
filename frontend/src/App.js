import React from 'react';
import {Container} from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen"

function App() {
  return (
    <>
      <Header></Header>
        <main className="py-3">
          <Container>
            <h1>Welcome to ProShop</h1>
            <HomeScreen></HomeScreen>
          </Container>
        </main>
      <Footer></Footer>
    </>
  )
}

export default App;
