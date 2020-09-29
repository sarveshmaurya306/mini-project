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
          Copyright &copy; {new Date().getFullYear()} KietTalks Web Application
          <strong>
            &nbsp;
            <a
              href="https://www.linkedin.com/in/sarvesh-kumar-53986861"
              target="_blank"
              style={{ textDecoration: "none", color: "orange" }}
            >
              Contact Us.
            </a>
          </strong>
        </center>
      </div>
    </div>
  );
}
