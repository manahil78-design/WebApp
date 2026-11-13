
import React from "react";
import "./Features.css";

function Features() {
  const features = [
    {
      number: "01",
      icon: "⚡",
      title: "Instant Translation",
      text: "Turn English words into Urdu quickly without complicated steps.",
    },
    {
      number: "02",
      icon: "ع",
      title: "Urdu First",
      text: "A beautiful interface designed with Urdu language support in mind.",
    },
    {
      number: "03",
      icon: "⌁",
      title: "Simple & Clean",
      text: "No distractions. Just type, translate, and understand.",
    },
  ];

  return (
    <section className="features-section" id="features">
      <div className="features-heading">
        <span>WHY TARJUMA?</span>

        <h2>
          Translation should feel
          <br />
          <strong>effortless.</strong>
        </h2>
      </div>

      <div className="features-grid">
        {features.map((feature) => (
          <div className="feature-card" key={feature.number}>
            <div className="feature-number">
              {feature.number}
            </div>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.text}</p>

            <div className="feature-line"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;