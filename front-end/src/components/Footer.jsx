import React from "react";
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
export default function Footer() {
  return (
    <div>
      <br /><br /><br />
      <div
        style={{
          backgroundColor: "#00000094",
          color: "white",
          padding: 12,
          // position:'fixed',
          bottom: " 0",
          width: " 100%",
        }}
      >
        <center>
          Copyright &copy; {new Date().getFullYear()} KietTalks Web Application
          <strong>
            &nbsp;
            <span>Contact ?</span>
            &nbsp;
          </strong>
          <a href="https://www.linkedin.com/in/sarvesh-kumar-53986861" target="_blank"><LinkedInIcon style={{color:' orange',}} /></a>&nbsp;
            <a href="https://www.instagram.com/seesh_sarvesh_maurya/?hl=en" target="_blank"><InstagramIcon style={{color:'orange'}}/></a>
        </center>
      </div>
    </div>
  );
}
