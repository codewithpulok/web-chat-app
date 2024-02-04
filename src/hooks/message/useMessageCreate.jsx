import { useCallback, useMemo, useState } from "react";
import { sendMessage } from "../../services/supabase";

const useMessageCreate = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(undefined);

  const action = useCallback(async (text, channelId) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await sendMessage(text, channelId);
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

export default useMessageCreate;
