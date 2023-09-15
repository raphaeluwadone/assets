import { useState, useEffect } from 'react';
import axios from 'axios';

// const BASE_API_URL = import.meta.env.VITE_APP_API_BASEURL;
axios.defaults.baseURL = 'http://api.asset.bz/';

export const useAxios = (axiosParams: any) => {
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async (params: any) => {
      try {
       const result = await axios.request(params);
       setResponse(result.data);
       } catch( error: any ) {
         setError(error);
       } finally {
         setLoading(false);
       }
    };

    useEffect(() => {
        fetchData(axiosParams);
    }, []); // execute once only

    return { response, error, loading };
};