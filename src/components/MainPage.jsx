import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/MainPage.css";
import security from "../assets/img/security.png";
import thinking from "../assets/img/thinking.png";
import diagram from "../assets/img/diagram.png";
import accessibility from "../assets/img/accessibility.png";

function MainPage() {
  const articles = [
    {
      id: 1,
      title: "Why Choose Us?",
      image: thinking,
      content:
        "We are a professional team specializing in technological solutions that streamline processes and drive innovation within organizations.\n" +
        "In our work, we emphasize creating intelligent, fast, and efficient systems tailored to the specific needs of our clients.\n" +
        "Our mission is to transform cumbersome processes into automated ones, thereby improving service, reducing workload, and enhancing operational efficiency.",
    },
    {
      id: 2,
      title: "What Is Our Goal?",
      image: diagram,
      content:
        "Our goal is to create digital solutions that enhance the quality of work and life while promoting a green environment and continuous innovation.",
    },
    {
      id: 3,
      title: "Accessibility Statement",
      image: accessibility,
      content:
        "We are committed to making the information and services on our website accessible to all users, including individuals with disabilities.\n" +
        "We have invested significant efforts to ensure the website is accessible, user-friendly, and functional for everyone, adhering to the Web Content Accessibility Guidelines (WCAG 2.0) at the AA level.\n" +
        "The website is compatible with assistive technologies such as screen readers, keyboard-only navigation, and more.",
    },
  ];

  return (
    <div className="main">
      <section className="articles">
        <div className="container">
          <h1 className="main-page-title">Security Unit</h1>
          <div className="mainPageContainer">
            <div className="imgContainer">
              <h2>Security Man</h2>
              <img src={security} alt="Security" />
            </div>
            <div className="articles-container">
              {articles &&
                articles.map((article) => (
                  <div key={article.id} className="article-card">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="article-image"
                    />
                    <h2 className="article-title">{article.title}</h2>
                    <Link
                      to={`/post/${article.id}`}
                      state={{ post: article }}
                      className="view-button"
                    >
                      View
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainPage;
