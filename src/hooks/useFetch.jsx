import { useEffect, useState } from "react";

const DEFAULT_HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
};

export default function useFetch(
  { url = "", method = "GET", headers = {} },
  { enabled } = { enabled: true },
) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (enabled) {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const res = await fetch(`${import.meta.env.VITE_API_HOST}${url}`, {
            method,
            headers: {
              ...DEFAULT_HEADERS,
              ...headers,
            },
          });

          if (res.status === 204) {
            setData(null);
          } else if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          } else {
            const data = await res.json();
            setData(data);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      if (url) {
        fetchData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, method, JSON.stringify(headers), enabled]);

  return { isLoading, data, error };
}
