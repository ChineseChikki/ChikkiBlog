import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Chip from "../common/Chip/Chip";
import "./BlogItem.css";
import dayjs from "dayjs";

const BlogItem = ({ blog, refresh }) => {
  const {
    description,
    title,
    createdAt,
    authorName,
    authorAvatar,
    coverImg,
    category,
    id,
  } = blog;

  const navigate = useNavigate(),
    { pathname } = useLocation();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this post?")) {
      fetch("https://chikkiblog.onrender.com/api/delete/" + id, {
        method: "DELETE",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) refresh?.();
          else alert(data.message);
        })
        .catch(console.error);
    }
  }

  const revealAction = (e) => {
    if (e.type === "mouseenter") {
      e.currentTarget.firstElementChild.classList.replace(
        "opacity-0",
        "opacity-100"
      );
    } else
      e.currentTarget.firstElementChild.classList.replace(
        "opacity-100",
        "opacity-0"
      );
  };

  const handleEdit = (_) => {
    navigate("/createPost", { state: blog });
  };

  return (
    <div
      className="blogItem-wrap relative"
      onMouseEnter={revealAction}
      onMouseLeave={revealAction}
    >
      {pathname !== "/blogs" && (
        <div className="flex justify-end absolute top-0 right-0 left-0 bg-[rgba(0,0,0,.5)] py-2 pr-3 opacity-0 hover:opacity-100 transition-opacity z-5">
          <button
            className="mr-3 px-2 py-1 w-20 text-center text-black bg-white"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-[red] py-1 w-20 text-center px-2 text-white"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}

      <img className="blogItem-cover" src={coverImg} alt="cover" />
      <Chip label={category} />
      <h3 className="titleItem">{title}</h3>
      <h5 className="blogItem-desc">{description}</h5>
      <footer className="leg">
        <div className="blogItem-author">
          <img src={authorAvatar} alt="avatar" />
          <div>
            <h6>{authorName}</h6>
            <p className="p">{dayjs(createdAt).format("MMM DD, YYYY")}</p>
          </div>
        </div>
        <Link className="blogItem-link" state={blog} to={`/singleBlog/${id}`}>
          ➝
        </Link>
      </footer>
    </div>
  );
};

export default BlogItem;
