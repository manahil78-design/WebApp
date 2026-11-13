
import React from "react";
import "./HowItWorks.css";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Write",
      text: "Enter your English sentence or phrase.",
    },
    {
      number: "02",
      title: "Translate",
      text: "Press the translate button and let Tarjuma do the work.",
    },
    {
      number: "03",
      title: "Understand",
      text: "Read the Urdu translation and copy it wherever you need.",
    },
  ];

  return (
    <section className="how-section" id="how-it-works">
      <div className="how-heading">
        <span>HOW IT WORKS</span>

        <h2>
          Three steps.
          <br />
          <strong>One simple idea.</strong>
        </h2>
      </div>

      <div className="steps">
        {steps.map((step, index) => (
          <div className="step" key={step.number}>
            <div className="step-number">
              {step.number}
            </div>

            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>

            {index !== steps.length - 1 && (
              <div className="step-arrow">→</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;