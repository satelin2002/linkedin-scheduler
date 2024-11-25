import React from "react";

const HeartIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    id="empathy-consumption-small"
    data-supported-dps="16x16"
  >
    <g>
      <path
        d="M8 0a8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8z"
        fill="none"
      />
      <circle cx="8" cy="8" r="7" fill="#df704d" />
      <path
        d="M7.71 5A2.64 2.64 0 004 8.75l4 4 4-4A2.64 2.64 0 0012 5a2.61 2.61 0 00-1.85-.77h0A2.57 2.57 0 008.3 5l-.3.3z"
        fill="#fff3f0"
        stroke="#77280c"
        fillRule="evenodd"
      />
    </g>
  </svg>
);

export default HeartIcon;
