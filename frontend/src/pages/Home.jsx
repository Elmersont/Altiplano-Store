import React, { useState } from 'react';
import FooterAltiplano from '../components/Footer.jsx';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useAuth } from '../context/AutentificacionContext';
import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/Home.css';

const videoSrc = '/assets/videos/Video.mp4';

const products = [
  {
    src: '/assets/carrusel/1 color/Clase 1 color/Clase 2.png',
    title: 'Lienzo Clásico',
    description: 'Diseño elegante que combina tradición y modernidad.',
    category: 1, 
  },
  {
    src: '/assets/carrusel/1 color/Rupturista 1 color/Rupturista_3.png',
    title: 'Lienzo Rupturista',
    description: 'Innovador y atrevido, perfecto para espacios modernos.',
    category: 1, 
  },
  {
    src: '/assets/carrusel/2 color/Clase 2 color/Clase2_2.png',
    title: 'Lienzo Doble Clase',
    description: 'Dos colores que destacan la distinción de tu espacio.',
    category: 2, 
  },
  {
    src: '/assets/carrusel/2 color/Nativa 2 Color/Nativa2_1.png',
    title: 'Lienzo Nativo',
    description: 'Inspirado en la naturaleza, fusiona materiales nobles.',
    category: 2, 
  },
  {
    src: '/assets/carrusel/2 color/Rústica 2 color/Rustica2_3.png',
    title: 'Lienzo Rústico Bicolor',
    description: 'Combinación de texturas y colores que capturan la esencia rural.',
    category: 2, 
  },
  {
    src: '/assets/carrusel/3 colores/3colores_1.png',
    title: 'Lienzo Tricolor',
    description: 'Diseño que juega con tres tonalidades para un look audaz.',
    category: 3, 
  },
  {
    src: '/assets/carrusel/3 colores/3colores_2.png',
    title: 'Lienzo Vanguardista',
    description: 'Un lienzo que se adelanta a su tiempo con un estilo único.',
    category: 3, 
  },
];

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const handlePersonalizaClick = () => {
    if (user) {
      navigate('/store'); 
    } else {
      navigate('/login'); 
    }
  };

  const handleVerPrecioClick = (category) => {
    if (user) {
      navigate(`/product/${category}`);
    } else {
      navigate('/login'); 
    }
  };

  return (
    <>
      <section className="hero-section">
        <video
          className="hero-video"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          Tu navegador no soporta el video HTML5.
        </video>

        <Container className="texto-hero">
          <Row>
            <Col>
              <h1 className="display-4 text-dark">Altiplano Store</h1>
              <p className="lead">
                Cada puerta es un lienzo en blanco. Cada uno de nuestros lienzos busca representar la esencia de tus espacios y generar ese efecto "Woou".
              </p>
              <Button variant="primary" size="lg" className="mt-3" onClick={handlePersonalizaClick}>
                Personaliza tu puerta aquí
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="text-center my-5">
        <h2 style={{ color: '#000', marginBottom: '10px' }}>Nuestros Lienzos</h2>
        <hr style={{ width: '50px', margin: 'auto', borderTop: '2px solid #000' }} />
      </Container>

      {/* Sección del carrusel */}
      <section className="product-carousel my-5 py-5" style={{ backgroundColor: '#fff' }}>
        <Container>
          <Swiper
            modules={[Navigation]}
            navigation
            slidesPerView={3}
            centeredSlides
            spaceBetween={30}
            loop
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                  <img
                    className="d-block"
                    src={product.src}
                    alt={product.title}
                    style={{
                      maxHeight: activeIndex === index ? '400px' : '300px',
                      objectFit: 'contain',
                      margin: '0 auto',
                      width: activeIndex === index ? '90%' : '60%',
                      transition: 'transform 0.3s',
                      transform: activeIndex === index ? 'scale(1.1)' : 'scale(0.9)',
                    }}
                  />
                  {activeIndex === index && (
                    <div className="product-caption">
                      <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>{product.title}</h3>
                      <p style={{ marginBottom: '10px' }}>
                        <span style={{ fontWeight: 'bold' }}>Descripción:</span> {product.description}
                      </p>
                      <Button
                        variant="secondary"
                        onClick={() => handleVerPrecioClick(product.category)}
                      >
                        Ver precio
                      </Button>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <p className="text-center mt-5">
            Descubre cómo cada una de nuestras puertas se transforma en un lienzo único para tu espacio,
            capturando tu esencia y creando ese efecto sorprendente.
          </p>
        </Container>
      </section>

      <FooterAltiplano />
    </>
  );
}

export default Home;
