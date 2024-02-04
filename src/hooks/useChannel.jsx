import { useEffect, useState } from "react";
import { getChannel } from "../services/supabase";

function useChannel(username) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(undefined);

  const fetchData = async (username) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await getChannel(username);
      setData(response);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchData(username);
    }
  }, [username]);

  return {
    isLoading,
    isError,
    data,
  };
}

export default useChannel;
