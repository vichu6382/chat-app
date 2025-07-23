import React from 'react';
import styled, { keyframes } from 'styled-components';

const PageLoader = () => {
    return (
        <LoaderWrapper>
            <div className="spinner" />
            <div className="text-glow">VibeChat</div>
        </LoaderWrapper>
    );
};

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 10px #0f0, 0 0 20px #0f0; }
  50% { text-shadow: 0 0 20px #0f0, 0 0 30px #0f0; }
`;

const LoaderWrapper = styled.div`
  background: transparent;
  color: #fff;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .spinner {
    border: 6px solid #222;
    border-top: 6px solid #0f0;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${rotate} 1s linear infinite;
  }

  .text-glow {
    margin-top: 16px;
    font-size: 1.25rem;
    font-weight: bold;
    color: #0f0;
    animation: ${glow} 1.5s ease-in-out infinite;
    font-family: 'Segoe UI', sans-serif;
    letter-spacing: 1px;
  }
`;

export default PageLoader;
