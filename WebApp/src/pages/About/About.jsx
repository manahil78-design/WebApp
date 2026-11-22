
import "./About.css";

function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-copy">
          <span className="section-eyebrow">MORE THAN JUST TECHNOLOGY</span>
          <h1>
            Discover a world
            <br />
            of <span>possibilities.</span>
          </h1>
          <p>
            At NEXORA, we believe the best technology does more
            than work well. It inspires, connects and makes
            everyday experiences better.
          </p>
        </div>

        <div className="about-hero-image">
          <img
            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1100&q=85"
            alt="Modern laptop in a creative workspace"
          />
          <span>TECHNOLOGY WITH PURPOSE.</span>
        </div>
      </section>

      <section className="about-introduction">
        <div className="about-intro-title">
          <span className="section-eyebrow">OUR STORY</span>
          <h2>A more thoughtful way to discover technology.</h2>
        </div>

        <div className="about-intro-text">
          <p>
            NEXORA was imagined around a simple idea: finding
            technology should feel exciting, effortless and
            inspiring.
          </p>
          <p>
            We bring together a considered collection of
            electronics and everyday essentials, from
            smartphones and laptops to audio and accessories.
            Every category is part of a bigger idea: making
            useful innovation more accessible.
          </p>
        </div>
      </section>

      <section className="about-gallery">
        <div className="about-gallery-main">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&q=85"
            alt="Creative team working with technology"
          />
          <div>
            <span>01 / THE IDEA</span>
            <h3>Technology should make life feel easier.</h3>
          </div>
        </div>

        <div className="about-gallery-side">
          <div className="about-gallery-image">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85"
              alt="Modern smartwatch"
            />
          </div>

          <div className="about-gallery-note">
            <span>02 / OUR APPROACH</span>
            <h3>Good design. Useful innovation. Everyday value.</h3>
            <p>
              We value products that bring together thoughtful
              design, performance and convenience.
            </p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="about-values-heading">
          <span className="section-eyebrow">WHAT MATTERS TO US</span>
          <h2>Our values, in every detail.</h2>
        </div>

        <div className="about-values-grid">
          <article>
            <span>01</span>
            <h3>Thoughtful Selection</h3>
            <p>
              A collection built around products with a purpose,
              combining usefulness, design and innovation.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Quality & Experience</h3>
            <p>
              We believe shopping for technology should feel
              simple, clear and enjoyable.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Always Curious</h3>
            <p>
              Technology never stands still. Neither does our
              interest in discovering what's next.
            </p>
          </article>
        </div>
      </section>

      <section className="about-closing">
        <span>WELCOME TO NEXORA</span>
        <h2>Find what inspires your next move.</h2>
        <a href="/shop">EXPLORE OUR COLLECTION ↗</a>
      </section>
    </main>
  );
}

export default About;
