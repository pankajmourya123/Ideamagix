import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    }
  }, [navigate]);

  return (
    <MainContainer>
      <Overlay>
        <Message>Welcome to Course Schedule</Message>
        <ButtonContainer>
          <Button onClick={handleLoginClick}>Login</Button>
          <Button onClick={handleRegisterClick}>Register</Button>
        </ButtonContainer>
      </Overlay>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #e6f2ff, #cce0ff); /* Soft gradient background */
`;

const Overlay = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const Message = styled.h1`
  font-size: 32px; /* Increased font size */
  margin-bottom: 30px;
  color: #2a2a2a; /* Dark gray for better contrast */
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px; /* Reduced gap for a tighter layout */
`;

const Button = styled.button`
  padding: 15px;
  background-color: #007bff; /* Bright blue */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease, transform 0.2s ease; /* Added transform for animation */

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
    transform: translateY(-2px); /* Slight lift effect on hover */
  }
`;

export default Main;
