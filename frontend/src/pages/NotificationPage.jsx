import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { acceptFriendRequest, getFriendRequests } from '../lib/api'
import styled from "styled-components";
import { FaBell } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import PageLoader from '../components/PageLoader';
import { TiMessageTyping } from "react-icons/ti";

const NotificationPage = () => {

  const queryClient = useQueryClient()

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      console.log(acceptRequestMutation);

      queryClient.invalidateQueries(["friendRequests"])
      queryClient.invalidateQueries(["friends"])
    }
  })

  const incomingRequests = friendRequests?.incomingReqs || []
  const acceptedRequests = friendRequests?.acceptedReqs || []

  return (
    <NotificationPageStyle>
      <div className="text-center">
        <div className="d-flex px-2  gap-2 align-items-center">
          <h2>Notifications</h2>
          <span className='text-2xl mb-1' style={{ color: "#00fb00" }}><FaBell /></span>
        </div>
        {
          isLoading ? (
            <PageLoader />
          ) : (
            <>
              {incomingRequests.length > 0 && (
                <section>
                  <div className="d-flex px-2 mt-5 mx-2 gap-2 align-items-center">
                    <span className='text-2xl mb-1' style={{ color: "#00fb00" }}><FaUserPlus /></span>
                    <h3>Friend Requests</h3>
                    <span className='text-1xl mb-1 rounded-full text-dark px-2' style={{ backgroundColor: "#00fb00" }}>{incomingRequests.length}</span>
                  </div>
                  <div className="container">
                    <div className="row flex-nowrap overflow-auto py-2">
                      {incomingRequests.map((request) => (
                        <div
                          className="col-auto"
                          key={request._id}
                          style={{ width: "100%" }}
                        >
                          <div className="card shadow-sm rounded-4 bg-dark text-white mb-0 h-100">
                            <div className="card-body d-flex flex-row align-items-center justify-content-between">
                              <div className="d-flex align-items-center">
                                <img
                                  src={request.sender.profilePic}
                                  className="rounded-circle border border-success me-3"
                                  alt={request.sender.fullName}
                                  style={{ width: 62, height: 62, objectFit: "cover" }}
                                />
                                <div>
                                  <h4 className="fw-bold mb-1 ">{request.sender.fullName}</h4>
                                  <span className="badge text-1xl" style={{ backgroundColor: "#00fbff", color: "black" }}>
                                    Native: {request.sender.nativeLanguage}
                                  </span>
                                </div>
                              </div>
                              <button
                                className="btn btn-sm ms-3"
                                style={{ backgroundColor: "#00ff59" }}
                                onClick={() => acceptRequestMutation(request._id)}
                                disabled={isPending}
                              >
                                Accept
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Accepted Reqts */}

              {acceptedRequests.length > 0 && (
                <section>
                  <div className="d-flex px-2 mt-5 mx-2 gap-2 align-items-center">
                    <span className='text-2xl mb-1' style={{ color: "#00fb00" }}><FaUserPlus /></span>
                    <h3>New Connections</h3>
                    <span className='text-1xl mb-1 rounded-full text-dark px-2' style={{ backgroundColor: "#00fb00" }}>{acceptedRequests.length}</span>
                  </div>
                  <div className="container">
                    <div className="row flex-nowrap overflow-auto py-2">
                      {acceptedRequests.map((notification) => (
                        <div
                          className="col-auto"
                          key={notification._id}
                          style={{ width: "100%" }}
                        >
                          <div className="card shadow-sm rounded-4 bg-dark text-white mb-3 h-100">
                            <div className="card-body d-flex flex-row align-items-center justify-content-between">
                              <div className="d-flex align-items-start">
                                <img
                                  src={notification.recipient.profilePic}
                                  className="rounded-circle border border-success me-3"
                                  alt={notification.recipient.fullName}
                                  style={{ width: 62, height: 62, objectFit: "cover" }}
                                />
                                <div className=''>
                                  <h4 className="fw-bold mb-1 mr-35">{notification.recipient.fullName}</h4>

                                  <p className="text-sm my-1 mb-1 text-info opacity-75">
                                    {notification.recipient.fullName} accepted your friend request
                                  </p>
                                  <p className="text-xs mr-45 mb-0" style={{color:"#00ff26"}}>
                                    Recently
                                  </p>
                                </div>
                              </div>
                              <span className="badge text-dark ms-3 d-flex text-2xl" style={{backgroundColor:"#00ff26"}}><TiMessageTyping className='size-6'/> New Friend</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

            </>
          )}
      </div>
    </NotificationPageStyle>
  )
}

const NotificationPageStyle = styled.div`
    background-color: #1e1e1e;
    color: white;
    max-width: 900px;
    margin: 0 auto;
`;

export default NotificationPage