import React from "react";

const Button = ({ text, onClick, className = "" }) => {
  console.log(className);
  return (
    <button
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
