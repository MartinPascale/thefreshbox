import React from "react";

import workingMen from "../assets/walkingMen.JPG";
import mixedFruits from "../assets/mixedFruits.JPG";
import Header from "../components/Header";

import "../styles/AboutUs.scss";
import Contacto from "../components/Contacto";

const AboutUs = () => {
  return (
    <div className="about-us">
      <Header fromAbout={true} />
      <div className="about-us__item">
        <img src={workingMen} width={600} alt="working men" />
        <p>
          <span>Misión:</span>
          Nuestra misión es mejorar la calidad de vida de la comunidad,
          estimulando el hábito saludable del consumo de frutas y vegetales,
          mediante una eficiente gestión que le ahorre tiempo, dinero y
          satisfaga las necesidades de los clientes y consumidores.
        </p>
      </div>
      <div className="about-us__item">
        <img src={mixedFruits} width={600} alt="working men" />
        <p>
          <span>Visión:</span>
          Aspiramos a liderar el mercado de entrega de frutas y vegetales en
          hogares, oficinas, colectivos y eventos. Ofreciendo a nuestros
          clientes acceso a alimentación de calidad y los mejores precios!
        </p>
      </div>
      <Contacto />
    </div>
  );
};

export default AboutUs;
