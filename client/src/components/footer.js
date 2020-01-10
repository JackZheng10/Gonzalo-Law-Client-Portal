import React from "react";

export default function Footer() {
  return (
    <div>

          <nav className="navbar navbar-dark bg-secondary sticky-bottom"
              style={{ margin: "10px ", color: "#fff", justifyContent: "center"}}>
              <p> Developed by {''}
              <a className="navbar-brand" href="https://www.satyasandeep.in">{" "}
              Satya Sandeep
              </a>
          {/* <br /> */}
          <a style={{textDecorationLine:"none" , color:"#fff" , justifyContent: "center"}}
              className="navbar nav-item "
              href="https://github.com/satyasandeep007/react-redux-login">
                   View Code
              </a>
              </p>
              
          </nav>
      </div>
  );
}
