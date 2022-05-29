import React, { useEffect, useState } from "react";

import Spinner from "../components/Spinner";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";

import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import jsonData from "../data.json";

const Index = props => {

  const [data, setData] = useState(jsonData);
  const [loading, setLoading] = useState(false);

  function fetchLiveData() {
    setLoading(true);
    fetch('https://pramod-portfolio.deno.dev')
        .then(response => response.json())
        .then(d => setData(d))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
  }

  useEffect(() => {
    document.body.classList.toggle("index-page");
    fetchLiveData();
    return () => {
      document.body.classList.toggle("index-page");
    }
  },[]);

  useEffect(() => {
    var totalHash = window.location.hash.split('/');
    if(totalHash.length > 1 && totalHash[1] !== "") {
      const scrollToAnchor = () => {
        const hashParts = totalHash[1].split('#');
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
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });
  

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <PageHeader data={data} />
        <div className="main">
          <section id="experience">
            <Experience id="experience" data={data} />
          </section>
          <section id="education">
            <Education id="education" data={data} />
          </section>
          <section id="skills">
            <Skills id="skills" data={data} />
          </section>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default Index;
