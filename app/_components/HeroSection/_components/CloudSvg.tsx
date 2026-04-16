import React from "react";

// This is a named export for a clean SVG path matching the provided image
export const CloudSvg = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M34.8 52.5C34.8 45.4 39 39.7 44.5 39.7C49.9 39.7 54.3 45.4 54.3 52.5C54.3 59.6 49.9 65.2 44.5 65.2C39 65.2 34.8 59.6 34.8 52.5ZM24.4 69.9C24.4 62.1 29 55.6 34.8 55.6C40.6 55.6 45.2 62.1 45.2 69.9C45.2 77.7 40.6 84.2 34.8 84.2C29 84.2 24.4 77.7 24.4 69.9ZM5.6 77.6C5.6 70.4 10.4 64.6 16.4 64.6C22.4 64.6 27.2 70.4 27.2 77.6C27.2 84.8 22.4 90.5 16.4 90.5C10.4 90.5 5.6 84.8 5.6 77.6ZM55.4 61C55.4 53.2 60 46.7 65.8 46.7C71.6 46.7 76.2 53.2 76.2 61C76.2 68.8 71.6 75.3 65.8 75.3C60 75.3 55.4 68.8 55.4 61Z"
        fill="white"
      />
    </svg>
  );
};
