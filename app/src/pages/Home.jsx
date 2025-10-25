import { Container, Row, Col } from 'react-bootstrap';
import ProductList from '../components/ProductList';

function Home({ onAddToCart }) {
    return (
        <Container
            className="d-flex flex-column align-items-center mx-auto text-center"
            style={{ maxWidth: '80%' }}
        >
            <Row className="mb-5 justify-content-center">
                <Col lg={8}>
                    <h1 className="display-4 mb-3 hero-title">Explora lo último en estilo y calidad</h1>
                    <p className="lead hero-subtitle">Productos seleccionados para ti — encuentra lo que te inspira.</p>
                </Col>
            </Row>
            <Row className="justify-content-center w-100">
                <Col lg={10}>
                    <ProductList onAddToCart={onAddToCart} />
                </Col>
            </Row>
        </Container>
    );
}

export default Home;