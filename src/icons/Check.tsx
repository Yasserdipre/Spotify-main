import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {}

const Check: React.FC<Props> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="2.8em" height="2.8em" viewBox="0 0 48 48" {...props}><defs><mask id="ipSCheckOne0"><g fill="none" strokeLinejoin="round" strokeWidth={4}><path fill="#fff" stroke="#fff" d="M24 44a19.937 19.937 0 0 0 14.142-5.858A19.937 19.937 0 0 0 44 24a19.938 19.938 0 0 0-5.858-14.142A19.937 19.937 0 0 0 24 4A19.938 19.938 0 0 0 9.858 9.858A19.938 19.938 0 0 0 4 24a19.937 19.937 0 0 0 5.858 14.142A19.938 19.938 0 0 0 24 44Z"></path><path stroke="#000" strokeLinecap="round" d="m16 24l6 6l12-12"></path></g></mask></defs><path fill="#22c55e" d="M0 0h48v48H0z" mask="url(#ipSCheckOne0)"></path></svg>
);

export default Check;