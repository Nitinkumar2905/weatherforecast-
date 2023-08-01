import React from "react";
import logo from "./img/icons8-forecast-30.png";
const Navbar = () => {
  return (
    <>
      <nav className="d-flex justify-content-center" style={{width:'100vw',height:'15vh'}}>
        <div className="align-items-center d-flex" style={{width:'80vw'}}>
          <img src={logo} alt="" />
          <span className="text-primary" style={{fontSize:'2rem',fontFamily:'sans-serif'}}>Weather Forecast</span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
