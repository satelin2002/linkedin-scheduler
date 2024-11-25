import React from 'react';

const ThumbsUpIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    id="praise-consumption-small"
    data-supported-dps="16x16"
  >
    <defs>
      <mask id="reactions-praise-consumption-small-a" x="0" y="0" width="16" height="16" maskUnits="userSpaceOnUse">
        <path d="M8 1a7 7 0 017 7 7 7 0 01-7 7 7 7 0 01-7-7 7 7 0 017-7z" fill="#fff" fillRule="evenodd" />
      </mask>
    </defs>
    <g>
      <path d="M8 0a8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8z" fill="none" />
      <g>
        <path d="M8 1a7 7 0 017 7 7 7 0 01-7 7 7 7 0 01-7-7 7 7 0 017-7z" fill="#d8d8d8" />
      </g>
      <g mask="url(#reactions-praise-consumption-small-a)">
        <circle cx="8" cy="8" r="7" fill="#6dae4f" />
        <path
          d="M12.13 9.22a9.19 9.19 0 00-.36-2.32A4.29 4.29 0 0110.44 5c-.16-.53-.27-.72-.74-.73a.74.74 0 00-.65.8c0 .24 0 .49.06.72a11.5 11.5 0 00.58 1.92l-4.5-3.38a.75.75 0 00-1.11.07.73.73 0 00.27 1L6.6 7.1l.59.56L3.62 5a.71.71 0 00-.75-.16.69.69 0 00-.46.61.71.71 0 00.36.67L5 7.77l1.35 1-2.9-2.19a.79.79 0 00-.57-.21.8.8 0 00-.54.28c-.31.4-.06.81.26 1.06L4.85 9.4l1.15.85-2.27-1.7a.74.74 0 00-1.09 0 .76.76 0 00.24 1.09l4.1 3c.6.45 2.07.84 2.72.27"
          fill="none"
          stroke="#165209"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
);

export default ThumbsUpIcon;
