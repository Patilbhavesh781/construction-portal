import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

/**
 * Custom hook for fetching data from API
 * @param {string} url - API endpoint
 * @param {object} options - Axios request options (optional)
 * @param {boolean} autoFetch - whether to fetch immediately (default: true)
 */
export const useFetch = (url, options = {}, autoFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api({ url, ...options });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return { data, loading, error, refetch: fetchData };
};
