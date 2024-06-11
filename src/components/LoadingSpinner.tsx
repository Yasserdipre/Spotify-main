
const LoadingSpinner = ({size} : {size : string}) => {
  return (
    <div className= {`border-8 mt-2 border-t-8 border-gray-200 border-t-green-600 rounded-full ${size} animate-spin`}></div>
  );
};

export default LoadingSpinner;
