import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

export default function CreateWebsite() {
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [token_id] = useState(uuidv4())
    const [category, setCategory] = useState("")
    const [developing_time, setDevTime] = useState("1 to 30 days")
    const [price, setPrice] = useState(0)
    const [validationError, setValidationError] = useState({})

    const createwebsite = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('website_name', name)
        formData.append('token', token_id)
        formData.append('category', category)
        formData.append('price', price)
        formData.append('Developing_Time', developing_time)



        await axios.post(`http://localhost:8000/api/websites/create`, formData).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            navigate("/websites")
        }).catch(({ response }) => {
            if (response.status === 422) {
                setValidationError(response.data.errors)
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                })
            }
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Create Product</h4>
                            <hr />
                            <div className="form-wrapper">
                                {
                                    Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-danger">
                                                    <ul className="mb-0">
                                                        {
                                                            Object.entries(validationError).map(([key, value]) => (
                                                                <li key={key}>{value}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <Form onSubmit={createwebsite}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Name">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" value={name} onChange={(event) => {
                                                    setName(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col>
                                            <Form.Group controlId="ID">
                                                <Form.Label>ID</Form.Label>
                                                <Form.Control as="textarea" rows={3} value={token_id} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col>
                                            <Form.Group controlId="Price">
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control as="textarea" rows={3} value={price} onChange={(event) => {
                                                    setPrice(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col>
                                            <Form.Group controlId="Price">
                                                <Form.Label>Developing Time</Form.Label>
                                                <Form.Control as="textarea" rows={3} value={developing_time} onChange={(event) => {
                                                    setDevTime(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Category" className="mb-3">
                                                <Form.Label>Category</Form.Label>
                                                <Form.Control type="text" value={category} onChange={(event) => {
                                                    setCategory(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                                        Save
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}