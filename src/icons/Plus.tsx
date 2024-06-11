import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {}

const Plus: React.FC<Props> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" {...props}>
    <path fill="white" d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17m0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15" />
    <path fill="white" d="M16 24h18v2H16z" />
    <path fill="white" d="M24 16h2v18h-2z" />
  </svg>
);

export default Plus;
