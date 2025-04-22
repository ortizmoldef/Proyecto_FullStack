import React from 'react'; // Importamos React para poder crear el componente
import '../styles/footer.scss'; // Importamos el archivo SCSS para los estilos del pie de página

const Footer = () => {
  return (
    <footer className="footer"> {/* Elemento <footer> para definir la sección del pie de página */}
      <div className="footer__content"> {/* Contenedor principal para los contenidos del pie de página */}
        <p>&copy; {new Date().getFullYear()} TuAppPeliculas. Todos los derechos reservados.</p> 
        {/* Muestra el copyright dinámico con el año actual utilizando JavaScript */}
        
        <div className="footer__links"> {/* Contenedor para los enlaces del pie de página */}
          <a href="/">Política de Privacidad</a> {/* Enlace a la política de privacidad */}
          <a href="/">Términos de uso</a> {/* Enlace a los términos de uso */}
          <a href="/">Contacto</a> {/* Enlace de contacto */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
