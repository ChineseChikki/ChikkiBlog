import React from "react";

export default function App() {
  return (
    <footer className="bg-black text-center text-white  h-20">
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-white">ChineseCHIKKI</a>
      </div>
    </footer>
  );
}
