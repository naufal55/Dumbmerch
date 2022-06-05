import React from "react";
import gambar from "../Assets/error-404.png";
const NotFound = () => {
  return (
    <div className="d-grid v-100 mt-4">
      <div className="text-light mx-auto">
        <div className="d-grid">
          <img className="w-75 mx-auto" src={gambar} alt="gambar" />
        </div>
        <h1 className="text-center">Oops...</h1>
        <p className="text-center">Your page is not found!</p>
      </div>
    </div>
  );
};

export default NotFound;
