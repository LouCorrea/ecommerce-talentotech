import { Container } from 'react-bootstrap';
import Cart from '../components/Cart';

function CartPage({ items, onRemoveFromCart, onClearCart }) {
    return (
        <Container>
            <Cart
                items={items}
                onRemoveFromCart={onRemoveFromCart}
                onClearCart={onClearCart}
            />
        </Container>
    );
}

export default CartPage;