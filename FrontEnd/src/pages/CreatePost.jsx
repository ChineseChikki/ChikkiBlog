import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/CreatePost.css";

function CreatePost() {
  const navigate = useNavigate();
  const form = useRef();
  const [isSubmitting, setSubmit] = useState(false);
  const { state } = useLocation();
  const [formData, setFormData] = useState({
    content: "",
    title: "",
    image: "",
  });
  const handleChange = ({ target: { name, value, files } }) => {
    if (name === "image") value = files[0];
    setFormData((state) => ({ ...state, [name]: value }));
  };

  let action = {};

  useEffect(() => {
    if (state) {
      setFormData(function (_) {
        return {
          content: state.description,
          title: state.title,
          image: state.coverImg,
        };
      });
    }
  }, [state]);

  if (state) {
    action.url = "https://chikkiblog.onrender.com/api/update/" + state.id;
    action.method = "PUT";
    console.log("Update");
  } else {
    action.url = "https://chikkiblog.onrender.com/api/create";
    action.method = "POST";
    console.log("Create");
  }

  async function handleCreatePost(e) {
    e.preventDefault();
    const formData = new FormData(form.current);
    setSubmit(true);

    fetch(action.url, {
      method: action.method,
      body: formData,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(({ success, ...rest }) => {
        console.log(success, rest);
        if (success) {
          navigate("/posts");
        }
        setSubmit(false);
      })
      .catch((err) => {
        setSubmit(false);
        console.error(err);
      });
  }

  return (
    <div className="create__post chikki">
      <form
        ref={form}
        className="createPost__form shadow-md text-black bg-white rounded-md"
        onSubmit={handleCreatePost}
      >
        <h1 className="text-xl">Create New Post</h1>
        <br />
        <div className="w-full">
          <label htmlFor="" className="text-left block ml-2 ">
            Title
          </label>
          <input
            className="shadow-md px-3 py-2 w-full"
            type="text"
            name={"title"}
            placeholder="Enter Post Title"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="w-full">
          <label htmlFor="" className="text-left block ml-2">
            Description
          </label>
          <textarea
            className="shadow-md px-3 py-2 w-full outline-none resize-none"
            type="text"
            id="content"
            name={"content"}
            placeholder="Enter your description..."
            required
            value={formData.content}
            onChange={handleChange}
          ></textarea>
        </div>
        <br />
        <input type="file" name="image" onChange={handleChange} />

        <button
          disabled={isSubmitting}
          className="my_btn bg-black text-white mt-3"
          type="submit"
        >
          {isSubmitting ? "Sending..." : state ? "Update Post" : "Save Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
