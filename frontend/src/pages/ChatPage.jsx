import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuthUser from '../hooks/useAuthUser';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api';
import ChatLoader from '../components/ChatLoader'
import { IoMdVideocam } from "react-icons/io";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react"
import { StreamChat } from 'stream-chat';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import CallButton from '../components/CallButton';

const STREAM_API_KEY = process.env.REACT_APP_STREAM_API_KEY

const ChatPage = () => {
  const { id: targetUserId } = useParams()

  const [chatClient, setClient] = useState(null)
  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(true)

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser // this will run oly when authUser is available
  })

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return

      try {
        console.log("Initiazing stream chat client...");
        const client = StreamChat.getInstance(STREAM_API_KEY)

        await client.connectUser({
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        }, tokenData.token)


        //create a channel
        const channelId = [authUser._id, targetUserId].sort().join("-")

        // you and me
        //if i start the chat  => channelId:[myId,youId]
        //if you start the chat => channelId:[yourId , myId] => [myId ,yourId]

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId]
        })

        await currChannel.watch()

        setClient(client);
        setChannel(currChannel);

      } catch (error) {
        console.error("Error initaizing chat:", error);
        toast.error("Could not connect to chat. please try again")


      } finally {
        setLoading(false)
      }
    }

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
      if(channel){
        const callUrl = `${window.location.origin}/call/${channel.id}`;
        channel.sendMessage({
          text:`I've started a video call with you. Click here to join: ${callUrl}`
        })
        toast.success("Video call link sent scuccessFully!")
      }
  }

  if (loading || !chatClient || !channel) return <ChatLoader />

  return (
    <StyleChatPage>
      <Chat client={chatClient}>
        <Channel channel={channel} >
          <div className="w-100 relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </StyleChatPage>
  );
}

const StyleChatPage = styled.div`
 
  height: 94vh;

`;
export default ChatPage;
