import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthenticationContext";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const { logIn } = AuthContext();
  const [state, setState] = useState({
    loading: false,
    message: "",
    isError: false,
  });

  function collectInputData({ target: { name, value } }) {
    setPayload((state) => ({ ...state, [name]: value }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState((state) => ({
      ...state,
      message: "Logging in ...",
      loading: true,
      isError: false,
    }));
    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "post",
        body: JSON.stringify(payload),
        headers: { "content-type": "application/json" },
      });
      const jsonResponse = await res.json();

      setState((state) => ({
        ...state,
        message: jsonResponse.message,
        loading: false,
        isError: !jsonResponse.success,
      }));

      if (jsonResponse.success) {
        localStorage.setItem("token", jsonResponse.token);
        localStorage.setItem("user", jsonResponse.data);
        window.setTimeout(() => {
          logIn();
          navigate("/posts");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDBContainer
        fluid
        className="d-flex align-items-center justify-content-center bg-image"
        style={{
          backgroundImage:
            "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
        }}
      >
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{
                borderRadius: "1rem",
                maxWidth: "400px",
                height: "70vh",
              }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-2">
                  Please enter your login and password!
                </p>
                <p
                  id="msg"
                  style={{
                    color:
                      !state.isError && state.loading
                        ? "black"
                        : state.isError && !state.loading
                        ? "tomato"
                        : "green",
                  }}
                >
                  {state.message}
                </p>

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Email address"
                  name="email"
                  id="formControlLg1"
                  type="email"
                  size="lg"
                  required
                  onChange={collectInputData}
                  value={payload.email}
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Password"
                  name="password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  required
                  onChange={collectInputData}
                  value={payload.password}
                />

                <p className="small mb-3 pb-lg-2">
                  <a className="text-white-50" href="#!">
                    Forgot password?
                  </a>
                </p>
                <MDBBtn
                  outline
                  className="mx-2 px-5"
                  color="white"
                  size="lg"
                  type="submit"
                >
                  Login
                </MDBBtn>
                <div className="d-flex flex-row mt-3 mb-5">
                  <MDBBtn
                    tag="a"
                    color="none"
                    className="m-3"
                    style={{ color: "white" }}
                  >
                    <MDBIcon fab icon="facebook-f" size="lg" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="m-3"
                    style={{ color: "white" }}
                  >
                    <MDBIcon fab icon="twitter" size="lg" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="m-3"
                    style={{ color: "white" }}
                  >
                    <MDBIcon fab icon="google" size="lg" />
                  </MDBBtn>
                </div>

                <div>
                  <p className="mb-0">
                    Don't have an account?
                    <a href="#!" className="text-white-50 fw-bold">
                      Sign Up
                    </a>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
};

export default Login;
