import React from "react";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <div>
        <img
          className="home_image sm:w-2/3 w-full sm:h-full h-[80vh]"
          src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
          alt="splash"
        />
      </div>
      <div className="home_para">
        <h1>Welcome to my Blog</h1>
        <br />
        <p>
          Chikki’s Blog is a tech blog in Nigeria that covers topics
          <br />
          on tech, digital marketing and online money making ideas.
        </p>
      </div>
    </div>
  );
};

export default Home;
