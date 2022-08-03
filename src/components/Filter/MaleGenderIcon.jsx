import React from "react";

const MaleGenderIcon = (props) => {
  return (
    <svg
      width="43"
      height="43"
      viewBox="0 0 43 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.4688 37.625C24.1479 37.625 29.5625 32.2104 29.5625 25.5312C29.5625 18.8521 24.1479 13.4375 17.4688 13.4375C10.7896 13.4375 5.375 18.8521 5.375 25.5312C5.375 32.2104 10.7896 37.625 17.4688 37.625Z"
        stroke={props.active ? "#ffffff" : "#80CFCE"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.0183 16.9816L36.2812 6.71875"
        stroke={props.active ? "#ffffff" : "#80CFCE"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.2188 6.71875H36.2812V14.7812"
        stroke={props.active ? "#ffffff" : "#80CFCE"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MaleGenderIcon;
