import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAvatar } from "../utils/icons";
import BlogItem from "../Components/Home/BlogItem";

export default function Posts() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  function getAllPosts() {
    fetch("https://chikkiblog.onrender.com/api/all")
      .then((res) => res.json())
      .then(({ success, data }) => {
        console.log(data);
        if (success) setPosts(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetch("https://chikkiblog.onrender.com/auth/user", {
      headers: { authorization: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then(({ success, data }) => {
        if (success) localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      })
      .catch((err) => {
        if (localStorage.getItem("user"))
          setUser(JSON.parse(localStorage.getItem("user")));
        console.error(err);
      });

    getAllPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-center sm:justify-between mt-10 px-[8%]">
        {posts.map((data, index) => {
          const blog = {
            description: data.content,
            coverImg: data.image,
            title: data.title,
            createdAt: data.createdAt,
            authorName: data?.user.name,
            authorAvatar: IAvatar,
            category: "Decentralize",
            subCategory: ["Economy", "Growth", "Advance"],
            id: data._id,
          };
          return <BlogItem {...{ blog, refresh: getAllPosts }} />;
        })}
      </div>
    </div>
  );
}
