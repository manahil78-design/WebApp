
import React from "react";
import "./Stats.css";

function Stats() {
  const stats = [
    {
      number: "100%",
      label: "Simple Interface",
    },
    {
      number: "EN",
      label: "English Input",
    },
    {
      number: "اردو",
      label: "Urdu Output",
    },
    {
      number: "∞",
      label: "Words To Explore",
    },
  ];

  return (
    <section className="stats-section">
      {stats.map((stat) => (
        <div className="stat" key={stat.label}>
          <h2>{stat.number}</h2>
          <p>{stat.label}</p>
        </div>
      ))}
    </section>
  );
}

export default Stats;