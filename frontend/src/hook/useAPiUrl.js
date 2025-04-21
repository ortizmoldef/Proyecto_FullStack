const useApiUrl = () => {
    const localUrl = 'http://localhost:5000';
    const productionUrl = process.env.REACT_APP_API_URL;
  
    const isLocalhost = window.location.hostname === 'localhost';
    return isLocalhost ? localUrl : productionUrl;
  };
  
  export default useApiUrl;
  