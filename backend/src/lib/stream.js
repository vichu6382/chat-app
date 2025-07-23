import { StreamChat } from "stream-chat";
import "dotenv/config";

// FIX: Correct environment variable names
const apikey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apikey || !apiSecret) {
  console.error("Missing Stream key or secret");
  // Optionally, throw an error to prevent further execution
  throw new Error("Missing Stream key or secret");
}

const streamClient = StreamChat.getInstance(apikey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    // Ensure userId is a string
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};
