import { useState, useEffect } from 'react'
import { Card, Button, Row, Col, Alert, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/api'

function ProductList({ onAddToCart }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading]   = useState(true)
    const [error, setError]       = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts()
                setProducts(data)
                setLoading(false)
            } catch (err) {
                setError('Error al cargar los productos. Por favor, intente más tarde.')
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])  // Solo carga inicial de productos
    
    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
        )
    }

    if (error) {
        return (
            <Alert variant="danger">
                {error}
            </Alert>
        )
    }

    return (
        <Row className="g-4">
            {products.map(product => (
                <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Card className="h-100 shadow-sm hover-shadow transition-all" style={{ transition: 'all 0.3s ease' }}>
                        <div className="position-relative">
                            <Card.Img
                                variant="top"
                                src={product.image}
                                style={{
                                    height: '200px',
                                    objectFit: 'contain',
                                    padding: '1rem',
                                    backgroundColor: '#f8f9fa'
                                }}
                            />
                            <span
                                className="position-absolute top-0 end-0 m-2 badge bg-primary rounded-pill"
                                style={{ fontSize: '0.9rem' }}
                            >
                                ${product.price}
                            </span>
                        </div>
                        <Card.Body className="d-flex flex-column">
                            <Link
                                to={`/product/${product.id}`}
                                className="text-decoration-none"
                            >
                                <Card.Title className="text-primary h5 mb-3" style={{ minHeight: '48px' }}>
                                    {product.title}
                                </Card.Title>
                                <Card.Text className="flex-grow-1 text-dark" style={{ fontSize: '0.9rem' }}>
                                    {product.description.substring(0, 80)}...
                                </Card.Text>
                            </Link>
                            <div className="mt-auto pt-3 border-top">
                                <Button
                                    variant="outline-primary"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onAddToCart(product);
                                    }}
                                    className="w-100 d-flex align-items-center justify-content-center gap-2"
                                >
                                    <i className="bi bi-cart-plus"></i>
                                    Agregar al carrito
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default ProductList