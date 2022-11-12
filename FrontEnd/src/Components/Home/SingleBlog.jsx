import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Chip from "../Common/Chip/Chip";
import Empty from "../Common/EmptyList/Empty";
import "./SingleBlog.css";

const SingleBlog = () => {
  const { state } = useLocation();
  const [blog, setBlog] = useState(state);
  const navigate = useNavigate();

  return (
    <>
      <Link className="blog-goBack" onClick={(_) => navigate(-1)}>
        <span> &#8592;</span> <span>Go Back</span>
      </Link>
      {blog ? (
        <div className="blog-wrap">
          <header className="header1">
            <p className="blog-date">Published {blog.createdAt}</p>
            <h1>{blog.title}</h1>
            <div className="blog-subCategory">
              {blog.subCategory.map((category, i) => (
                <div key={i}>
                  <Chip label={category} />
                </div>
              ))}
            </div>
          </header>
          <img src={blog.coverImg} alt="cover" className="meme" />
          <p className="blog-desc">{blog.description}</p>
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default SingleBlog;
