import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { Row, Col, Card, Image, Button, ListGroup } from 'react-bootstrap'
import axios from 'axios'

const ProductScreen = () => {
  const match = window.location.pathname

  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api${match}`)

      setProduct(data)
    }

    fetchProduct()
  }, [match])

  return (
    <>
      <Link className='btn-btn-light my-3 ' to='/'>
        Go back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid></Image>
        </Col>
        <Col ms={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? 'In stock' : 'Out of Stock'}{' '}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
