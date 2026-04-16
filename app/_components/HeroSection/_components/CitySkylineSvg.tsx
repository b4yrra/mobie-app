export const CitySkyline = () => (
  <svg
    viewBox="0 0 1400 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    preserveAspectRatio="xMidYMax slice"
  >
    {/* Solid Dark Blue Base Silhouette */}
    <path
      d="M0 220V180L40 160V185L100 140V185L180 160V185H250V140L300 110L350 140V185H450V130H550V185H600V120L650 100L700 120V185H800V60H880V185H950V140H1050V185H1150V120L1250 120V185H1400V220H0Z"
      fill="#162c6b"
    />
    {/* The subtle lighter blue overlay for depth */}
    <path
      d="M0 220V195L200 175L400 190L600 165L800 185L1100 170L1400 195V220H0Z"
      fill="#1e3a8a"
      fillOpacity="0.4"
    />
  </svg>
);
