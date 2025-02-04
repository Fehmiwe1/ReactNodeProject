import React from "react";
import "../assets/styles/About.css";
function About() {
  return (
    <div className="main container">
      <div className="aboutContainer1">
        <h1 className="title">Who Are We?</h1>
        <p>
          We are a professional and efficient team of security officers working
          in the Technion's security unit.
          <br /> Our mission is to ensure the safety of all visitors and staff
          on campus by conducting thorough inspections and stringent controls.
          <br /> During our work, we identified the need to upgrade the guest
          screening process, which led us to develop an innovative idea.
          <br /> We decided to transition from traditional checks using a binder
          to an advanced web-based system, aimed at improving our efficiency and
          speeding up our workflow.
          <br /> The environment in which we operate is dynamic and challenging,
          requiring quick responses and constant monitoring.
          <br /> The new system will allow us to address these challenges more
          professionally, ease our daily tasks, and enhance the quality of
          service we provide.
        </p>
      </div>
      <div className="aboutContainer2">
        <h1 className="title">About Us</h1>
        <p>
          We are Fehmi Wehby and Maor David, security officers in the Technion's
          security unit.
          <br /> During our work, we encountered certain challenges in screening
          specific types of visitors.
          <br /> This inspired us to develop a new system to improve efficiency
          and speed in our operations.
          <br /> Instead of relying on a traditional binder for screening, we
          decided to upgrade the process with a dedicated website.
          <br /> The system will enable us to conduct checks quickly and easily
          while maintaining high-security standards.
          <br /> With the new interface, we will be able to organize data more
          effectively, track completed checks, and streamline communication with
          other security team members.
        </p>
      </div>
    </div>
  );
}

export default About;
