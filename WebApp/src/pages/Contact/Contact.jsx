
import "./Contact.css";

function Contact() {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-copy">
          <span className="section-eyebrow">A LITTLE HELP GOES A LONG WAY</span>

          <h1>
            Good technology.
            <br />
            <span>Great conversations.</span>
          </h1>

          <p>
            We're here to make your experience with NEXORA
            as thoughtful as the technology we bring together.
            Questions, ideas or a little guidance? Let's talk.
          </p>

          <a href="#contact-details" className="contact-hero-link">
            GET IN TOUCH <span>↘</span>
          </a>
        </div>

        <div className="contact-hero-visual">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&q=85"
            alt="Modern creative workspace"
          />

          <div className="contact-image-caption">
            <span>THE NEXORA EXPERIENCE</span>
            <strong>Here when you need us.</strong>
          </div>

          <div className="contact-floating-note">
            <span>✳</span>
            Thoughtful support,
            <br />
            every step of the way.
          </div>
        </div>
      </section>

      <section className="contact-details" id="contact-details">
        <div className="contact-details-heading">
          <span className="section-eyebrow">LET'S CONNECT</span>
          <h2>How can we <span>help?</span></h2>
          <p>
            Choose what you need help with and reach out.
            We'll be happy to hear from you.
          </p>
        </div>

        <div className="contact-cards">
          <article className="contact-card contact-card-email">
            <span className="contact-card-icon">✉</span>
            <span className="contact-card-label">01 / GENERAL ENQUIRIES</span>
            <h3>Drop us a line.</h3>
            <p>
              Have a question about our collection or need
              some assistance? Send us an email.
            </p>
            <a href="mailto:manahilmasood78@gmail.com">
              Email NEXORA <span>↗</span>
            </a>
          </article>

          <article className="contact-card contact-card-orders">
            <span className="contact-card-icon">↗</span>
            <span className="contact-card-label">02 / ORDER ASSISTANCE</span>
            <h3>Need help with an order?</h3>
            <p>
              If you have questions about a purchase,
              include your order details in your email.
            </p>
            <a href="mailto:manahilmasood78@gmail.com?subject=Order%20Assistance">
              Ask about an order <span>↗</span>
            </a>
          </article>

          <article className="contact-card contact-card-products">
            <span className="contact-card-icon">✳</span>
            <span className="contact-card-label">03 / PRODUCT QUESTIONS</span>
            <h3>Curious about something?</h3>
            <p>
              Want to know more about a product?
              Tell us what you're looking for.
            </p>
            <a href="mailto:manahilmasood78@gmail.com?subject=Product%20Enquiry">
              Ask a question <span>↗</span>
            </a>
          </article>
        </div>
      </section>

      <section className="contact-bottom">
        <span>WE LOOK FORWARD TO HEARING FROM YOU</span>
        <h2>Let's make your next tech discovery a great one.</h2>
        <a href="mailto:manahilmasood78@gmail.com">
          manahilmasood78@gmail.com
        </a>
      </section>
    </main>
  );
}

export default Contact;
