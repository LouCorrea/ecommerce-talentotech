import React from 'react';

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="app-footer text-center mt-5 py-3">
            <small>© {year} Lourdes Correa. Todos los derechos reservados.</small>
        </footer>
    );
}
