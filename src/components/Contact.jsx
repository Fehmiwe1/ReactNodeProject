import React from "react";
import "../assets/styles/Contact.css";
function Contact() {
  return (
    <div className="main container">
      <h1 className="contact__wrap">Contact Us</h1>
      <div className="contactContainer">
        <div className="leftContainer">
          <h2>Getting in touch is easy!</h2>
          <p>
            For any question on any topic.
            <br />
            You are welcome to send us an email.
          </p>
        </div>
        <div className="rightContainer">
          <form>
            <div class="form-group">
              <label for="name">Name:</label>
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                required
              />
            </div>

            <div class="form-group">
              <label for="email">Email:</label>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                required
              />
            </div>

            <div class="form-group">
              <label for="message">Message:</label>
              <textarea
                class="form-control"
                id="message"
                name="message"
                rows="5"
                required
              ></textarea>
            </div>
            <div>
              <button type="submit" class="btn btn-primary">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
