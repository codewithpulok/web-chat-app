import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { supabaseTables } from "../config/supabase.config";
import useMessages from "../hooks/message/useMessages";
import useReplies from "../hooks/replay/useReplies";
import useChannels from "../hooks/useChannels";
import useProfiles from "../hooks/useProfiles";
import { supabase } from "../services/supabase";

const defaultValues = {
  messages: {
    data: [],
    isLoading: true,
    isError: false,
  },
  replies: {
    data: [],
    isLoading: true,
    isError: false,
  },
  users: {
    data: [],
    isLoading: true,
    isError: false,
  },
  channels: {
    data: [],
    isLoading: true,
    isError: false,
  },
  chatId: null,
  threadId: null,
  updateChatId: () => {},
  updateThreadId: () => {},
};

export const ChatContext = createContext(defaultValues);

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
export const ChatProvider = (props) => {
  const { children } = props;

  // url states
  const params = useParams();
  const urlChatId = params?.chatId;

  // app state
  const [chatId, setChatId] = useState(urlChatId || null);
  const [threadId, setThreadId] = useState(null);

  // api state
  const users = useProfiles();
  const channels = useChannels();
  const messages = useMessages(chatId, users?.data || []);
  const replies = useReplies(threadId, users?.data || []);

  // update chat id
  const updateChatId = useCallback((id) => setChatId(id), []);
  // update thread id
  const updateThreadId = useCallback((id) => setThreadId(id), []);

  // memorized value
  const value = useMemo(
    () => ({
      users,
      channels,
      messages,
      replies,
      updateChatId,
      updateThreadId,
      chatId,
      threadId,
    }),
    [
      channels,
      chatId,
      messages,
      replies,
      threadId,
      updateChatId,
      updateThreadId,
      users,
    ]
  );

  // update message
  const structureMessage = useCallback(
    (message) => {
      const profiles = users?.data?.find((p) => p.id === message.sender_id);

      if (!profiles) {
        profiles.id = message.sender_id;
        profiles.full_name = "New User";
        profiles.avatar = "";
      }

      return { ...message, profiles };
    },
    [users?.data]
  );

  // invoke on url states
  useEffect(() => {
    setChatId(urlChatId || null);
  }, [urlChatId]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: supabaseTables.messages },
        (payload) => {
          const newMessage = payload.new;

          messages.update((prev) => {
            const prevM = [...prev];

            if (!prev.find((message) => message.id === newMessage.id)) {
              prevM.push(structureMessage(newMessage));
            }

            return prevM;
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: supabaseTables.messages },
        (payload) => {
          // console.log(payload);
          const oldMessage = payload.old;

          messages.update((prev) => {
            const prevM = [...prev].filter((i) => i?.id !== oldMessage?.id);

            return prevM;
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: supabaseTables.replies },
        (payload) => {
          // console.log(payload);
          const newMessage = payload.new;

          replies.update((prev) => {
            const prevM = [...prev];

            if (!prev.find((message) => message.id === newMessage.id)) {
              prevM.push(structureMessage(newMessage));
            }

            return prevM;
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: supabaseTables.replies },
        (payload) => {
          // console.log(payload);
          const oldMessage = payload.old;

          replies.update((prev) => {
            const prevM = [...prev].filter((i) => i?.id !== oldMessage?.id);

            return prevM;
          });
        }
      )
      .subscribe();

    return () => {
      console.log("HELLO");
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

const Props = {
  children: PropTypes.node,
};
ChatProvider.propTypes = Props;
