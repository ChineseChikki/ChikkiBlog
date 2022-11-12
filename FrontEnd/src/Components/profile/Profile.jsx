import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "./Modal";

export default function Profile({ open, setOpen, setUser }) {
  const className = "text-left";
  const [payload, setPayload] = useState({});

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const { firstName, lastName, email, role } = JSON.parse(
        localStorage.getItem("user")
      );
      setPayload((state) => ({ firstName, lastName, email, role }));
      setUser(payload);
    }
  }, [open]);

  const action = {
    btnText: "Update",
    send: (e) => {
      fetch("http://localhost:8000/auth/update", {
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
            htmlFor="firstName"
            className="block mt-2 mb-1 text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={payload.firstName}
            onChange={handleChange}
            minLength="3"
            required
            className="block w-full rounded-md border-gray-300 border px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div {...{ className }}>
          <label
            htmlFor="lastName"
            className="block mt-2 mb-1 text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            value={payload.lastName}
            onChange={handleChange}
            type="text"
            name="lastName"
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
            value={payload.password}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 border px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </Modal>
    </form>
  );
}

// export default function Profile({ open, setOpen, setUser }) {
//   const className = "text-left";
//   const [payload, setPayload] = useState({});
//   const [isSubmitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem("user")) {
//       const { createdAt, updatedAt, password, ...rest } = JSON.parse(
//         localStorage.getItem("user")
//       );
//       setPayload(() => rest);
//       setUser(payload);
//     }
//   }, [open]);

//   const action = {
//     btnText: "Update",
//     send: (e) => {
//       setSubmitting(true);
//       fetch("http://localhost:8000/auth/update", {
//         method: "PUT",
//         body: JSON.stringify(payload),
//         headers: {
//           "content-type": "application/json",
//           authorization: localStorage.getItem("token"),
//         },
//       })
//         .then((res) => res.json())
//         .then(({ data, success }) => {
//           if (success) {
//             setUser(data);
//             setOpen(false);
//             localStorage.setItem("user", JSON.stringify(data));
//           }
//           setSubmitting(false);
//         })
//         .catch((err) => {
//           setSubmitting(false);
//           console.error(err);
//         });
//     },
//   };

//   function handleChange({ target: { name, value } }) {
//     setPayload((state) => ({ ...state, [name]: value }));
//   }
//   return (
//     <form>
//       <Modal
//         {...{
//           open,
//           setOpen,
//           title: "Preview Profile",
//           type: "profile",
//           action,
//         }}
//       >
//         <div {...{ className }}>
//           <label
//             htmlFor="name"
//             className="block mt-2 mb-1 text-sm font-medium text-gray-700"
//           >
//             Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             id="name"
//             value={payload.name}
//             onChange={handleChange}
//             minLength="3"
//             required
//             className="block w-full rounded-md border-gray-300 border px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           />
//         </div>

//         <div {...{ className }}>
//           <label
//             htmlFor="username"
//             className="block mt-3 mb-1 text-sm font-medium text-gray-700"
//           >
//             Username
//           </label>
//           <input
//             value={payload.username}
//             onChange={handleChange}
//             type="text"
//             name="username"
//             id="username"
//             minLength="3"
//             required
//             className="block border w-full rounded-md border-gray-300 px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           />
//         </div>

//         <div {...{ className }}>
//           <label
//             htmlFor="email"
//             className="block text-sm mt-3 font-medium text-gray-700"
//           >
//             Email
//           </label>
//           <input
//             value={payload.email}
//             onChange={handleChange}
//             type="email"
//             name="email"
//             id="email"
//             minLength="3"
//             required
//             className="block w-full mb-1 border rounded-md border-gray-300 px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           />
//         </div>

//         <div {...{ className }}>
//           <label
//             htmlFor="role"
//             className="block text-sm mt-3 mb-1 font-medium text-gray-700"
//           >
//             Role
//           </label>
//           <input
//             type="text"
//             name="role"
//             id="role"
//             minLength="5"
//             value={payload.role}
//             disabled
//             onChange={handleChange}
//             required
//             className="block w-full border rounded-md border-gray-300 px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           />
//         </div>

//         <div {...{ className }}>
//           <label
//             htmlFor="password"
//             className="block text-sm mt-3 mb-1 font-medium text-gray-700"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             minLength="5"
//             value={payload.password}
//             onChange={handleChange}
//             required
//             className="block w-full border rounded-md border-gray-300 px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           />
//         </div>
//       </Modal>
//     </form>
//   );
// }
