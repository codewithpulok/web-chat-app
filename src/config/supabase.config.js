import envConfig from "./env.cofig";

const supbaseConfig = [envConfig.SUPABASE_URL, envConfig.SUPABASE_ANON];

export default supbaseConfig;

export const supabaseTables = {
  profiles: "profiles",
  channels: "channels",
  messages: "messages",
  replies: "replies",
};
