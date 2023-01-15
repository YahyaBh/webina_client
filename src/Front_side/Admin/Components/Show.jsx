import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Show.scss'


export default function Show() {

    const [websites, setWebsites] = useState([])

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        await axios.get(`http://localhost:8000/api/websites`).then(({ data }) => {
            setWebsites(data)

        })
    }

    const deleteProduct = async (token) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            return result.isConfirmed
        });

        if (!isConfirm) {
            return;
        }

        await axios.delete(`http://localhost:8000/api/website/${token}`).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            fetchProducts()
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })
    }

    return (
        <div className="container">
            <div className="table-container-show">
                <div className="row">
                    <div className='col-12'>
                        <Link className='btn btn-primary mb-2 float-end' to={'/admin/website/create'}>
                            Create Product
                        </Link>
                    </div>
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-bordered mb-0 text-center">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Developing Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        websites.length > 0 && (
                                            websites.map((row) => (
                                                <tr key={row.token}>
                                                    <td>{row.website_name}</td>
                                                    <td>{row.category}</td>
                                                    <td>{row.price}$</td>
                                                    <td>{row.Developing_Time}</td>
                                                    <td>
                                                        <Link to={`/product/edit/${row.token}`} className='btn btn-secondary me-2'>
                                                            Edit
                                                        </Link>
                                                        <Button variant="danger" onClick={() => deleteProduct(row.token)}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}