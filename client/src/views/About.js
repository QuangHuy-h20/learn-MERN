import React from "react";
import styled from "styled-components";
const StyledAbout = styled.section`

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  .myWeb{
    color: rgb(255, 255, 255);
    padding: 16px 40px;
    font-size: 16px;
    background: #ef9974;
    border-radius: 9999px;
    text-decoration:none;
  }
`;

const About = () => {
  return (
    <StyledAbout>
      <div className="direct">
        <a className="myWeb" rel="noreferrer" target="_blank" href="https://quanghuy-portfolio.vercel.app">
          My website
        </a>
      </div>
    </StyledAbout>
  );
};

export default About;
