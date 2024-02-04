import { useCallback, useMemo, useState } from "react";
import { deleteReplay } from "../../services/supabase";

const useReplayDelete = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(undefined);

  const action = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await deleteReplay(id);
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

export default useReplayDelete;
