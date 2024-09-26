import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <ErrorContainer>
      <ErrorMessage>Oops! Something went wrong.</ErrorMessage>
      <ErrorCode>404 - Page Not Found</ErrorCode>
      <BackButton onClick={handleBack}>Go Back</BackButton>
      <HelpMessage>If you need assistance, please contact support.</HelpMessage>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8d7da; /* Light red background */
`;

const ErrorMessage = styled.h1`
  font-size: 24px;
  color: #ff0000;
  margin-bottom: 20px;
`;

const ErrorCode = styled.p`
  font-size: 18px;
  color: #721c24; /* Dark red */
  margin-bottom: 15px;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #dc3545; /* Bootstrap Danger color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #c82333; /* Darker shade on hover */
  }
`;

const HelpMessage = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: #6c757d; /* Gray */
`;

export default ErrorPage;
