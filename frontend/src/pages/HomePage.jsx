import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from '../lib/api';
import { Link } from 'react-router-dom';
import NoFriendsFound from '../components/NoFriendsFound';
import FriendCard, { getLanguageFlag } from '../components/FriendCard';
import { IoLocationOutline } from "react-icons/io5";

const HomePage = () => {
    const queryClient = useQueryClient();
    const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

    const { data: friends = [], isPending: loadingFriends } = useQuery({
        queryKey: ["friends"],
        queryFn: getUserFriends,
    });

    const { data: recommendedUsers = [], isPending: loadingUsers } = useQuery({
        queryKey: ["users"],
        queryFn: getRecommendedUsers,
    });

    const { data: outgoingFriendReqs } = useQuery({
        queryKey: ["outgoingFriendReqs"],
        queryFn: getOutgoingFriendReqs,
    });

    const { mutate: sendRequestMutation, isPending: isSending } = useMutation({
        mutationFn: sendFriendRequest,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] })
    });

    useEffect(() => {
        const outgoingIds = new Set();
        if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
            outgoingFriendReqs.forEach((req) => {
                outgoingIds.add(req.recipient._id);
            });
            setOutgoingRequestsIds(outgoingIds);
        }
    }, [outgoingFriendReqs]);

    return (
        <HomePageStyle>
            <div className="container">
                <div className="header">
                    <h1>👥 Your Friends</h1>
                    <Link to="/notifications" className="friend-btn">Friend Requests</Link>
                </div>

                {loadingFriends ? (
                    <Spinner />
                ) : friends.length === 0 ? (
                    <NoFriendsFound />
                ) : (
                    <UserGrid>
                        {friends.map((friend) => (
                            <FriendCard key={friend.id} friend={friend} />
                        ))}
                    </UserGrid>
                )}

                <SectionTitle>
                    <h2>🌐 Meet New Learners</h2>
                    <p>Connect with language partners who match your vibe.</p>
                </SectionTitle>

                {loadingUsers ? (
                    <Spinner />
                ) : recommendedUsers.length === 0 ? (
                    <NoData>
                        <h3>No Recommendations</h3>
                        <p>Check back later for more language learners!</p>
                    </NoData>
                ) : (
                    <UserGrid>
                        {recommendedUsers.map((user) => {
                            const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                            return (
                                <Card key={user._id}>
                                    <div className="card-header">
                                        <img src={user.profilePic} alt={user.fullName} />
                                        <div>
                                            <h4>{user.fullName}</h4>
                                            {user.location && (
                                                <span className="location">
                                                    <IoLocationOutline /> {user.location}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="lang">
                                        {getLanguageFlag(user.nativeLanguage)}
                                        Native: {capitalize(user.nativeLanguage)}
                                    </div>

                                    {user.bio && <p className="bio">{user.bio}</p>}

                                    <button
                                        disabled={hasRequestBeenSent || isSending}
                                        onClick={() => sendRequestMutation(user._id)}
                                        className="request-btn"
                                    >
                                        {hasRequestBeenSent ? "Request Sent" : "Send Friend Request"}
                                    </button>
                                </Card>
                            );
                        })}
                    </UserGrid>
                )}
            </div>
        </HomePageStyle>
    );
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default HomePage;

// Styled Components

const HomePageStyle = styled.div`
  background: linear-gradient(to bottom, #121212, #1e1e1e);
  min-height: 100vh;
  color: #f5f5f5;
  font-family: 'Segoe UI', sans-serif;
  padding: 1.5rem;

  .container {
    max-width: 1140px;
    margin: auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2rem;
      color: #22c55e;
    }

    .friend-btn {
      background: transparent;
      border: 2px solid #22c55e;
      color: #22c55e;
      padding: 0.5rem 1rem;
      border-radius: 999px;
      font-weight: bold;
      text-decoration: none;
      transition: 0.3s ease;

      &:hover {
        background: #22c55e;
        color: #121212;
      }
    }
  }
`;

const SectionTitle = styled.div`
  margin: 2rem 0 1rem;
  h2 {
    font-size: 1.8rem;
    font-weight: bold;
    color: #38bdf8;
  }
  p {
    color: #b0b0b0;
    font-size: 1rem;
    margin-top: 0.5rem;
  }
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.5rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: #272727;
  padding: 1.2rem;
  border-radius: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2f2f2f;
    transform: translateY(-4px);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      object-fit: cover;
    }

    h4 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .location {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      color: #aaa;
      gap: 4px;
    }
  }

  .lang {
    background: #00ffaed9;
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    color: #000;
    font-weight: 500;
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  .bio {
    font-size: 0.95rem;
    color: #ccc;
    margin-bottom: 1rem;
  }

  .request-btn {
    background-color: #22c55e;
    color: #0e0e0e;
    font-weight: bold;
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 999px;
    width: 100%;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background-color: #16a34a;
    }

    &:disabled {
      background-color: #444;
      cursor: not-allowed;
      color: #888;
    }
  }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid #22c55e;
  border-top: 5px solid transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 3rem auto;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const NoData = styled.div`
  background: #333;
  color: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  text-align: center;
  margin-top: 1rem;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #f87171;
  }

  p {
    font-size: 0.95rem;
    color: #aaa;
  }
`;
