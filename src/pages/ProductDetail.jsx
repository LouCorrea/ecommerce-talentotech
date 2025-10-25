import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProductsById } from '../services/api';

function ProductDetail({ onAddToCart }) {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductsById(id);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container>
                <h2>Producto no encontrado</h2>
            </Container>
        );
    }

    return (
        <Container className="py-5 d-flex align-items-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
            <div className="w-100">
                <Row className="justify-content-center">
                    <Col md={11} lg={10}>
                        <div className="card shadow-lg border-0">
                            <Row className="g-0">
                                <Col md={6} className="p-5 d-flex align-items-center bg-light">
                                    <div className="w-100 text-center">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="img-fluid hover-zoom"
                                            style={{
                                                maxHeight: '450px',
                                                objectFit: 'contain',
                                                transition: 'transform 0.3s ease',
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="card-body p-5 d-flex flex-column h-100">
                                        <div>
                                            <h2 className="display-6 fw-bold mb-4">{product.title}</h2>
                                            <div className="d-flex align-items-center mb-4">
                                                <span className="display-4 mb-0 text-primary fw-bold">
                                                    ${product.price}
                                                </span>
                                                <span className="badge bg-success ms-3">
                                                    En stock
                                                </span>
                                            </div>
                                            <p className="card-text mb-4">{product.description}</p>
                                        </div>
                                        <div className="mt-auto">
                                            <button
                                                className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center gap-2"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onAddToCart(product);
                                                }}
                                            >
                                                <i className="bi bi-cart-plus"></i>
                                                Agregar al carrito
                                            </button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default ProductDetail;