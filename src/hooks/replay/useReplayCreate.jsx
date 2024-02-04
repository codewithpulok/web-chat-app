import { useCallback, useMemo, useState } from "react";
import { replyMessage } from "../../services/supabase";

const useReplayCreate = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(undefined);

  const action = useCallback(async (text, messageId) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await replyMessage(text, messageId);
      setData(response);
      setIsLoading(false);
      return { data: response };
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      return { error };
    }
  }, []);

  const states = useMemo(
    () => ({
      isLoading,
      isError,
      data,
    }),
    [data, isError, isLoading]
  );

  return [action, states];
};

export default useReplayCreate;
