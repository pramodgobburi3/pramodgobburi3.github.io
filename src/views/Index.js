import React, { useEffect } from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";

import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";

const Index = props => {

  useEffect(() => {
    document.body.classList.toggle("index-page");
    return () => {
      document.body.classList.toggle("index-page");
    }
  },[]);

  useEffect(() => {
    window.location.hash = window.decodeURIComponent(window.location.hash);
    const scrollToAnchor = () => {
      const hashParts = window.location.hash.split('#');
      if (hashParts.length >= 2) {
        const hash = hashParts.slice(-1)[0];
        var element = document.getElementById(`${hash}`);
        var headerOffset = 100;
        var elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        var offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    };
    scrollToAnchor();
    window.onhashchange = scrollToAnchor;
  });
  
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <PageHeader />
        <div className="main">
          <section id="experience">
            <Experience id="experience" />
          </section>
          <section id="education">
            <Education id="education" />
          </section>
          <section id="skills">
            <Skills id="skills" />
          </section>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default Index;
