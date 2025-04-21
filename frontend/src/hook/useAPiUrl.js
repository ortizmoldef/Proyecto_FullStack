const useApiUrl = () => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const localUrl = 'http://localhost:5000';
    const productionUrl = process.env.REACT_APP_API_URL;
  
    return isDevelopment ? localUrl : productionUrl;
  };
  
  export default useApiUrl;