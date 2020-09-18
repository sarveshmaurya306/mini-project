import React from "react";

export default function Footer() {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#00000094",
          color: "white",
          width: "100%",
          marginTop: 30,
          padding: 12,
        }}
      >
        <center>
          Copyright &copy; 2020 KietTalks Web Application{" "}
          <a href="#" style={{ textDecoration: "none", color: "orange" }}>
            Contact Us.
          </a>
        </center>
      </div>
    </div>
  );
}
