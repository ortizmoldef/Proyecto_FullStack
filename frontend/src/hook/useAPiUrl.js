const useApiUrl = () => {
    const localUrl = 'http://localhost:5000';
    const productionUrl = process.env.REACT_APP_API_URL;
  
    const isLocalhost = window.location.hostname === 'localhost';
    const apiUrl = isLocalhost ? localUrl : productionUrl;
    
    console.log('API URL:', apiUrl);  // Verifica el valor aquí
    return apiUrl;
};
