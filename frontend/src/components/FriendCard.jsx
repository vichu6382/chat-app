import React from 'react'
import styled from 'styled-components';
import { LANGUAGE_TO_FLAG } from '../contants';
import { Link } from 'react-router-dom';

const FriendCard = ({ friend }) => {

    return (
        <FriendCardStyle>
            <div className="col-12 col-sm-6 col-lg-4 mb-4 w-100">
                <div className="card shadow-sm bg-dark text-white w-100 h-100">
                    <div className="card-body text-center d-flex flex-column align-items-center">
                        <img
                            src={friend.profilePic}
                            className="rounded-circle mb-3 border border-success"
                            alt={friend.fullName}
                            style={{ width: "70px", height: "70px", objectFit: "cover" }}
                        />
                        <h3 className="card-title mb-2">{friend.fullName}</h3>
                    </div>
                    <div className="d-flex flex-wrap g-2 mb-3 mt-3">
                        <span className='badge badge-secondary text-xs'>
                            {getLanguageFlag(friend.nativeLanguage)}
                            Native : {friend.nativeLanguage}
                        </span>
                    </div>
                    <Link to={`/chat/${friend._id}`}
                        className='btn btn-outline-success w-full'
                    >
                        Message
                    </Link>
                </div>
            </div>
        </FriendCardStyle>
    )

}

const FriendCardStyle = styled.div`
  
`;
export default FriendCard;

 export function getLanguageFlag(language) {
    if (!language) return null;

    const langLower = language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[langLower];

    if (countryCode) {
        return (
            <img src={`https://flagcdn.com/w20/${countryCode}.png`} alt={`${langLower} flag`}
                className='h-3 mr-1 d-inline-block'
            />
        )
    }
}