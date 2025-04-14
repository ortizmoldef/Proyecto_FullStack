import React from 'react';
import '../css/footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>&copy; {new Date().getFullYear()} TuAppPeliculas. Todos los derechos reservados.</p>
        <div className="footer__links">
          <a href="/">Política de Privacidad</a>
          <a href="/">Términos de uso</a>
          <a href="/">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
