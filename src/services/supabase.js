import { createClient } from "@supabase/supabase-js";
import supbaseConfig, { supabaseTables } from "../config/supabase.config";

export const supabase = createClient(...supbaseConfig);

// auth functions
export const authSignout = supabase.auth.signOut;
export const authStateChange = supabase.auth.onAuthStateChange;
export const authSession = supabase.auth.getSession;

// send message function
export const sendMessage = async (text, channelId) => {
  try {
    const message = {
      text,
      channel_id: channelId,
    };
    const response = await supabase
      .from(supabaseTables.messages)
      .insert(message);
    const { data, error } = response;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Send Message Error: ", error);
  }
};

// replay messsage function
export const replyMessage = async (text, messageId) => {
  try {
    const reply = {
      text,
      message_id: messageId,
    };
    const response = await supabase.from(supabaseTables.replies).insert(reply);
    const { data, error } = response;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Send Replay Error: ", error);
  }
};

// delete message function
export const deleteMessage = async (messageId) => {
  try {
    const response = await supabase
      .from(supabaseTables.messages)
      .delete()
      .eq("id", messageId);
    const { data, error } = response;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Delete Message Error: ", error);
  }
};

// delete replay function
export const deleteReplay = async (replayId) => {
  try {
    const response = await supabase
      .from(supabaseTables.replies)
      .delete()
      .eq("id", replayId);
    const { data, error } = response;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Delete Replay Error: ", error);
  }
};

// get messages
export const getMessages = async (channelId) => {
  try {
    const response = await supabase
      .from(supabaseTables.messages)
      .select(`*, profiles(full_name, avatar, id)`)
      .eq("channel_id", channelId);
    const { data, error } = response;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Get Messages Error: ", error);
  }
};

// get replies
export const getReplies = async (messageId) => {
  try {
    const response = await supabase
      .from(supabaseTables.replies)
      .select("*")
      .eq("message_id", messageId);
    const { data, error } = response;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Get Replies Error: ", error);
  }
};

// get profiles
export const getProfiles = async () => {
  try {
    const response = await supabase.from(supabaseTables.profiles).select("*");
    const { data, error } = response;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Get Profiles Error: ", error);
  }
};

// get channels
export const getChannels = async () => {
  try {
    const response = await supabase.from(supabaseTables.channels).select("*");
    const { data, error } = response;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Get Channels Error: ", error);
  }
};

// get channel
export const getChannel = async (username) => {
  try {
    const response = await supabase
      .from(supabaseTables.channels)
      .select("*")
      .eq("username", username)
      .single();
    const { data, error } = response;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Get Channel By username Error: ", error);
  }
};
