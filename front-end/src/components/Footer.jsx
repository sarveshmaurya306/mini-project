import React from "react";

export default function Footer() {
  return (
    <div>
      <br/><br/><br/>
      <div
        style={{
          backgroundColor: "#00000094",
          color: "white",
          padding: 12,
          // position:'fixed',
          bottom:" 0",
          width:" 100%",
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
