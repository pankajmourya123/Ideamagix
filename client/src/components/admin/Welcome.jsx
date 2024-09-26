import React, { useEffect } from "react";
import styled from "styled-components";
import Logout from "../Logout";
import { useNavigate } from "react-router-dom";
import Instructors from "./Instructors";
import Courses from "./CoursesAdmin";

export default function Welcome({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <WelcomeContainer>
      <TopBar>
        <Logout />
        <Heading>Welcome Admin</Heading>
      </TopBar>
      <MainContent>
        <InstructorsContainer>
          <Instructors user={user} />
        </InstructorsContainer>
        <CoursesContainer>
          <Courses user={user} />
        </CoursesContainer>
      </MainContent>
    </WelcomeContainer>
  );
}

const WelcomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom right, #4a90e2, #d9e2f0);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  min-height: 100%;
  width: 100%;
  padding: 20px;
`;

const InstructorsContainer = styled.div`
  width: 40%;
  background-color: #f39c12; /* Bright Orange */
  color: #ffffff; /* White */
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CoursesContainer = styled.div`
  width: 60%;
  background-color: #2c3e50; /* Dark Gray */
  color: #ecf0f1; /* Light Gray */
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const TopBar = styled.div`
  width: 100%;
  background: #34495e; /* Darker Gray */
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h1`
  color: #ecf0f1; /* Light Gray */
  font-size: 32px;
  font-weight: bold;
  margin: 0; /* Reset margin */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* Subtle text shadow */
`;
