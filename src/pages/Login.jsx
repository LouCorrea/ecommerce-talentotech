import { useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, user } = useAuth();
    
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (user) {
            navigate('/home', { replace: true });
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (credentials.email === 'user@example.com' && credentials.password === 'password') {
                await login({
                    email: credentials.email,
                    isAuthenticated: true
                });
                const destination = from && from !== '/' ? from : '/home';
                navigate(destination, { replace: true });
            } else {
                setError('Credenciales incorrectas');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Error al iniciar sesión');
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh', width: '100vw', padding: 0, margin: 0, overflow: 'hidden' }}
        >
            <Card style={{ width: '100%', maxWidth: '400px' }} className="shadow">
                <Card.Body className="p-4">
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>
                    {error && (
                        <Alert variant="danger">{error}</Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="usuario@ejemplo.com"
                                value={credentials.email}
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="********"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Ingresar
                        </Button>
                    </Form>

                    <div className="mt-3 text-center text-muted">
                        <small>
                            Credenciales de prueba:<br />
                            Email: user@example.com<br />
                            Contraseña: password
                        </small>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;