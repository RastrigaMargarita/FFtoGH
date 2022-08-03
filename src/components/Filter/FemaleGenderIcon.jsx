import React from "react";

const FemaleGenderIcon = (props) => {
  return (
    <svg
      width="43"
      height="43"
      viewBox="0 0 43 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.5 28.2188C28.1792 28.2188 33.5938 22.8042 33.5938 16.125C33.5938 9.44581 28.1792 4.03125 21.5 4.03125C14.8208 4.03125 9.40625 9.44581 9.40625 16.125C9.40625 22.8042 14.8208 28.2188 21.5 28.2188Z"
        stroke={props.active ? "#ffffff" : "#80CFCE"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.5 28.2188V40.3125"
        stroke={props.active ? "#ffffff" : "#80CFCE"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.7812 34.9375H28.2188"
        stroke={props.active ? "#ffffff" : "#80CFCE"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FemaleGenderIcon;
