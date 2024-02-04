import { useEffect, useState } from "react";
import { supabaseTables } from "../config/supabase.config";
import { getProfiles, supabase } from "../services/supabase";

function useProfiles() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await getProfiles();
      setData(response);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: supabaseTables.profiles },
        (payload) => {
          const newProfile = payload.new;

          setData((prev) => {
            const prevData = [...prev];

            if (!prev.find((profile) => profile.id === newProfile.id)) {
              prevData.push(newProfile);
            }

            return prevData;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    isLoading,
    isError,
    data,
  };
}

export default useProfiles;
