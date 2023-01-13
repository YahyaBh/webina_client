import React , { Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Routes, Route, Link } from "react-router-dom";

// import EditProduct from "./Components/product/edit.component";
import ProductList from "./Components/Show";
import CreateWebsite from "./Components/CreateWebsite";
import Navbar from "./Components/Navbar";
import SideBar from "./Components/SideBar";

function App() {
  return (
    <Fragment>
      <Navbar/>

      <SideBar/>

      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <Routes>
              <Route path="/website/create" element={<CreateWebsite />} />
              <Route exact path='/' element={<ProductList />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Fragment>);
}

export default App;