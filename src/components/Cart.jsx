import { ListGroup, Button, Card, Row, Col, Badge, Modal } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Cart({ items, onRemoveFromCart, onClearCart }) {
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    const handleCompletePurchase = () => {
        setShowModal(false)
        onClearCart()
        setTimeout(() => {
            navigate('/home')
        }, 2000)
    }
    
    const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)

    if (items.length === 0) {
        return (
            <div className="text-center py-5">
                <i className="bi bi-cart-x display-1 text-muted mb-4"></i>
                <h2 className="mb-4">Tu carrito está vacío</h2>
                <Link to="/" className="btn btn-primary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Continuar comprando
                </Link>
            </div>
        )
    }

    return (
        <div>
            <h2 className="mb-4 d-flex align-items-center">
                <i className="bi bi-cart3 me-2"></i>
                Carrito de Compras
            </h2>
            <Row>
                <Col md={8}>
                    <ListGroup className="shadow-sm">
                        {items.map(item => (
                            <ListGroup.Item
                                key={item.id}
                                className="py-3"
                            >
                                <Row className="align-items-center">
                                    <Col xs={3} sm={2}>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="img-fluid rounded"
                                            style={{ maxHeight: '80px', objectFit: 'contain' }}
                                        />
                                    </Col>
                                    <Col xs={9} sm={10}>
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <h6 className="mb-1">{item.title}</h6>
                                                <p className="mb-0 text-muted">
                                                    <small>${item.price}</small>
                                                    {item.quantity > 1 && (
                                                        <Badge bg="secondary" className="ms-2">
                                                            x{item.quantity}
                                                        </Badge>
                                                    )}
                                                </p>
                                            </div>
                                            <Button
                                                variant="link"
                                                className="text-danger p-0 ms-3"
                                                onClick={() => onRemoveFromCart(item.id)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h5 className="mb-3">Resumen del pedido</h5>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Envío</span>
                                <span className="text-success">Gratis</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-3">
                                <strong>Total</strong>
                                <strong className="h4 mb-0">${total.toFixed(2)}</strong>
                            </div>
                            <Button
                                variant="primary"
                                className="w-100"
                                onClick={() => setShowModal(true)}
                            >
                                <i className="bi bi-credit-card me-2"></i>
                                Pagar
                            </Button>

                            {/* Modal de Confirmación */}
                            <Modal
                                show={showModal}
                                onHide={() => setShowModal(false)}
                                centered
                                className="fade"
                            >
                                <Modal.Header className="border-0">
                                    <Modal.Title className="w-100 text-center">
                                        <i className="bi bi-check-circle-fill text-success display-1"></i>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="text-center pb-4">
                                    <h4>¡Pago exitoso!</h4>
                                    <p className="text-muted mb-4">
                                        Tu compra ha sido procesada correctamente.
                                    </p>
                                    <Button
                                        variant="primary"
                                        onClick={handleCompletePurchase}
                                        className="px-4"
                                    >
                                        Continuar
                                    </Button>
                                </Modal.Body>
                            </Modal>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Cart