import { useEffect, useState } from "react";
import { getChannels } from "../services/supabase";

function useChannels() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const fetchChannels = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await getChannels();
      setData(response);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  return {
    isLoading,
    isError,
    data,
  };
}

export default useChannels;
