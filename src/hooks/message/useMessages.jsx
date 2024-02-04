import { useEffect, useState } from "react";
import { getMessages } from "../../services/supabase";

function useMessages(channel) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async (channelId) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await getMessages(channelId);
      setData(response);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (channel) {
      fetchData(channel);
    }
  }, [channel]);

  return {
    isLoading,
    isError,
    data,
    update: setData,
  };
}

export default useMessages;
