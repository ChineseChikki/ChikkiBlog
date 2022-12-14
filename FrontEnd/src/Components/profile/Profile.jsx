import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "./Modal";

export default function Profile({ open, setOpen, setUser }) {
  const className = "text-left";
  const [payload, setPayload] = useState({});

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const { name, username, email, role } = JSON.parse(
        localStorage.getItem("user")
      );
      setPayload((state) => ({ name, username, email, role }));
      setUser(payload);
    }
  }, [open]);

  const action = {
    btnText: "Update",
    send: (e) => {
      fetch("https://chikkiblog.onrender.com/auth/update", {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "content-type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then(({ data, success }) => {
          if (success) {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
          }
        })
        .catch(console.error);
    },
  };

  function handleChange({ target: { name, value } }) {
    setPayload((state) => ({ ...state, [name]: value }));
  }
  return (
    <form>
      <Modal
        {...{
          open,
          setOpen,
          title: "Preview Profile",
          type: "profile",
          action,
        }}
      >
        <div {...{ className }}>
          <label
            htmlFor="name"
            className="block mt-2 mb-1 text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={payload.name}
            onChange={handleChange}
            minLength="3"
            required
            className="block w-full rounded-md border-gray-300 border px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div {...{ className }}>
          <label
            htmlFor="username"
            className="block mt-2 mb-1 text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            value={payload.username}
            onChange={handleChange}
            type="text"
            name="username"
            id="lastName"
            minLength="3"
            required
            className="block w-full rounded-md border-gray-300 border px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div {...{ className }}>
          <label
            htmlFor="email"
            className="block mt-2 mb-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            value={payload.email}
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            minLength="3"
            required
            className="block w-full rounded-md border-gray-300 border px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div {...{ className }}>
          <label
            htmlFor="password"
            className="block mt-2 mb-1 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            minLength="5"
            value={payload.password}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 border px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div {...{ className }}>
          <label
            htmlFor="role"
            className="block mt-2 mb-1 text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <input
            type="role"
            name="role"
            id="role"
            minLength="5"
            value={payload.role}
            onChange={handleChange}
            disabled
            className="block w-full rounded-md border-gray-300 border px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </Modal>
    </form>
  );
}
