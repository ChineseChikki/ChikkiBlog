import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { MDBNavbar } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthenticationContext";
import Profile from "../Components/profile/Profile";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logOut } = AuthContext();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("user"));

  const handleLogout = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/");
      logOut();
    }, 500);
  };

  return (
    <>
      <MDBNavbar sticky className="px-2 sm:px-4 text-black">
        <div className="navbar shadow-0 sm:px-28">
          <h2 className="h2">
            Chikki's <span className="span">Blog</span>
          </h2>
          <div className="navbar_list">
            {isLoggedIn ? (
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/posts">Posts</Link>
                </li>
                <li>
                  <Link to="/createPost">Create</Link>
                </li>
                <li>
                  <Link onClick={() => setOpen(true)}>Profile</Link>
                </li>
                <li>
                  <Link to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/blogs">Blog</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </MDBNavbar>

      <Profile {...{ open, setOpen, setUser }} />
    </>
  );
};

export default Navbar;
