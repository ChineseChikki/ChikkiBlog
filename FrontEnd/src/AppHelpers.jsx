import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";
import Blogs from "./Components/Home/Blogs";
import SingleBlog from "./Components/Home/SingleBlog";
import { AuthContext } from "./AuthenticationContext";
import Posts from "./pages/Posts";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";

const AppHelpers = () => {
  const { isLoggedIn } = AuthContext();
  return (
    <>
      <Navbar />
      <div>
        {isLoggedIn ? (
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route path="/posts" element={<Posts />} />

            <Route path="/singleBlog/:id" element={<SingleBlog />} />

            <Route path="/createPost" element={<CreatePost />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route path="/register" element={<Register />} />

            <Route path="/blogs" element={<Blogs />} />

            <Route path="/singleBlog/:id" element={<SingleBlog />} />

            <Route path="/login" element={<Login />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AppHelpers;
