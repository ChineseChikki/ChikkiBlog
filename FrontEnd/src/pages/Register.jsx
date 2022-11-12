import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const Register = () => {
  const [payload, setPayload] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let navigate = useNavigate();

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
      message: "Submitting data...",
      loading: true,
      isError: false,
    }));
    try {
      const res = await fetch("http://localhost:8000/auth/signup", {
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
      if (jsonResponse.success)
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      else {
        setTimeout(() => {
          navigate("/signup");
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
        <MDBCard
          className="m-4 bg-dark text-white"
          style={{ maxWidth: "400px", height: "75vh", borderRadius: "1rem" }}
        >
          <MDBCardBody className="px-4 d-flex flex-column align-items-center mx-auto w-100">
            <h2
              className="text-uppercase text-center mb-5"
              style={{ color: "white", fontSize: "18px" }}
            >
              SIGN-UP FORM
            </h2>
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
              label="Name"
              name="name"
              size="lg"
              id="form1"
              type="text"
              value={payload.name}
              onChange={collectInputData}
              required
            />
            <MDBInput
              wrapperClass="mb-4 mx-5 w-100"
              labelClass="text-white"
              label="Email"
              name="email"
              size="lg"
              id="form2"
              type="email"
              value={payload.email}
              onChange={collectInputData}
              required
            />
            <MDBInput
              wrapperClass="mb-4 mx-5 w-100"
              labelClass="text-white"
              label="UserName"
              name="username"
              size="lg"
              id="form3"
              type="text"
              value={payload.username}
              onChange={collectInputData}
              required
            />
            <MDBInput
              wrapperClass="mb-4 mx-5 w-100"
              labelClass="text-white"
              label="Password"
              name="password"
              size="lg"
              id="form4"
              type="password"
              value={payload.password}
              onChange={collectInputData}
              required
            />
            <MDBInput
              wrapperClass="mb-4 mx-5 w-100"
              labelClass="text-white"
              label="Confirm password"
              name="confirmPassword"
              size="lg"
              id="form5"
              type="password"
              value={payload.confirmPassword}
              onChange={collectInputData}
              required
            />
            <div className="d-flex flex-row text-white justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="I agree with Terms of service"
              />
            </div>{" "}
            <MDBBtn
              className="mb-4 w-100 gradient-custom-4"
              size="lg"
              style={{ color: "white" }}
              type="submit"
            >
              SignUp
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </form>
  );
};

export default Register;
