import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAuthUser from '../hooks/useAuthUser'
import { getStreamToken } from '../lib/api'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  CallControls,
  SpeakerLayout,
  StreamTheme,
} from '@stream-io/video-react-sdk';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import toast from 'react-hot-toast'
import PageLoader from '../components/ChatLoader'
import styled from 'styled-components'


const STREAM_API_KEY = process.env.REACT_APP_STREAM_API_KEY

const CallPage = () => {

  const { id: callId } = useParams()
  const [client, setClient] = useState(null)
  const [call, setCall] = useState(null)
  const [isConnecting, setIsConneting] = useState(true);


  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser // this will run oly when authUser is available
  });

  useEffect(() => {
    const initCall = async () => {

        if (!tokenData || !tokenData.token || !authUser || !callId) return

      try {
        console.log("Initiazing stream Video call client...");

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        }

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        })

        const callInstance = videoClient.call("default", callId)
        await callInstance.join({ create: true });
        console.log("Joined call successfully");

        setClient(videoClient)
        setCall(callInstance)

      } catch (error) {
        console.error("Error joinging call:", error);
        toast.error("Could not join the call. Please try again")
      } finally {
        setIsConneting(false)
      }

    }
    initCall()
  }, [tokenData, authUser, callId])


  if (isLoading || isConnecting) return <PageLoader />



  return (
    <StyleCallPage className='d-flex flex-column justify-content-center align-items-center'>
      <div className="position-relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="d-flex justify-content-center align-items-center h-100">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )
        }
      </div>
    </StyleCallPage>
  )
}

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()

  const navigate = useNavigate()

  if (callingState === CallingState.LEFT) return navigate("/")
  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls/>
    </StreamTheme>
  )
}

const StyleCallPage = styled.div`
  height: screen;


`;

export default CallPage