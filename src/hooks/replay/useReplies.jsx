import { useEffect, useState } from "react";
import { getReplies } from "../../services/supabase";

function useReplies(messageId) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async (id) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await getReplies(id);
      setData(response);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (messageId) {
      fetchData(messageId);
    }
  }, [messageId]);

  return {
    isLoading,
    isError,
    data,
    update: setData,
  };
}

export default useReplies;
