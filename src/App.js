import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { Routes, Route, Link } from "react-router-dom";

// import EditProduct from "./Components/product/edit.component";
import ProductList from "./Components/Show";
import CreateWebsite from "./Components/CreateWebsite";

function App() {
  return (
    <React.Fragment>
      <Navbar bg="primary">
        <Container>
          <Link to={"/"} className="navbar-brand text-white">
            WebIna
          </Link>
        </Container>
      </Navbar>

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
    </React.Fragment>);
}

export default App;