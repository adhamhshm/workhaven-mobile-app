import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // the original code snippet from Rapid API
    // const options = {
    //     method: 'GET',
    //     url: 'https://jsearch.p.rapidapi.com/search',
    //     params: {
    //       query: 'Python developer in Texas, USA',
    //       page: '1',
    //       num_pages: '1'
    //     },
    //     headers: {
    //       'X-RapidAPI-Key': 'xxxxxxxx',
    //       'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    //     }
    // };

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': 'd6b3f97ca1mshdac178739f9ddfap1efea6jsn127cb94005b4',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query },
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
        }
        catch (error) {
            setError(error);
            alert("Error: " + error.message);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

    const refetchData = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, refetchData };
}

export default useFetch;
