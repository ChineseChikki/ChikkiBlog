import React, { useState } from "react";
import Empty from "../../Components/Common/EmptyList/Empty";
import BlogList from "./BlogList";
import blogList from "../../utils/data";
import SearchBar from "../Common/SearchBar/SearchBar";

const Blogs = () => {
  const [blogs, setBlogs] = useState(blogList);
  const [searchKey, setSearchKey] = useState("");

  // Search submit
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  // Search for blog by category
  const handleSearchResults = () => {
    const filteredBlogs = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setBlogs(filteredBlogs);
  };

  // Clear search and show all blogs
  const handleClearSearch = () => {
    setBlogs(blogList);
    setSearchKey("");
  };

  return (
    <div className="px-4 mb-5">
      <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />

      {/* Blog List & Empty View */}
      {blogs.length == 0 ? <Empty /> : <BlogList blogs={blogs} />}
    </div>
  );
};

export default Blogs;
