import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";
import { getUserSchedule } from "../../utils/APIRoutes";
import axios from "axios";
import loaderImage from "../../assets/loader.gif";

const Instructor = () => {
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState(undefined);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminKey = localStorage.getItem("secret-key-admin");
  const userKey = localStorage.getItem("secret-key");

  useEffect(() => {
    if (adminKey) {
      navigate("/admin");
    } else if (userKey) {
      setCurrUser(JSON.parse(userKey).username);
    } else {
      navigate("/");
    }
  }, [adminKey, userKey, navigate]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(getUserSchedule, {
          params: { currUser },
        });
        setSchedules(response.data.schedules);
      } catch (error) {
        console.error("Error fetching Schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currUser) {
      fetchSchedules();
    }
  }, [currUser]);

  if (loading) {
    return (
      <LoaderContainer>
        <LoaderImage src={loaderImage} alt="Loading..." />
      </LoaderContainer>
    );
  }

  return (
    <WelcomeContainer>
      <TopBar>
        <Logout />
        <Heading>Welcome {currUser}</Heading>
      </TopBar>
      <MainContent>
        <LecturesContainer>
          <SectionHeading>Your Upcoming Lectures</SectionHeading>
          <ScrollableContent>
            {schedules.length > 0 ? (
              schedules.map((schedule, index) => (
                <LectureCard key={index}>
                  <CardHeading>Course:</CardHeading>
                  <CourseContent>{schedule.course}</CourseContent>

                  <CardHeading>Lecture:</CardHeading>
                  <LectureContent>{schedule.lecture}</LectureContent>

                  <CardHeading>Date:</CardHeading>
                  <DateContent>
                    {new Date(schedule.date).toLocaleDateString()}
                  </DateContent>

                  <CardHeading>Location:</CardHeading>
                  <LocationContent>{schedule.location}</LocationContent>
                </LectureCard>
              ))
            ) : (
              <NoSchedulesMessage>No upcoming lectures found.</NoSchedulesMessage>
            )}
          </ScrollableContent>
        </LecturesContainer>
      </MainContent>
    </WelcomeContainer>
  );
};

const LoaderContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoaderImage = styled.img`
  width: 80px; /* Adjust the width as needed */
  height: 80px; /* Adjust the height as needed */
`;

const WelcomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #4d394b; /* Charcoal Plum */
  padding-bottom: 1rem;
`;

const TopBar = styled.div`
  width: 100%;
  background: #eadce6; /* Satin Pearl */
  padding: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h1`
  color: #fff; /* White */
  font-size: 36px;
  font-weight: bold;
  margin: 0; /* Reset margin */
`;

const LecturesContainer = styled.div`
  width: 100%;
  padding: 20px; /* Added padding for spacing */
`;

const ScrollableContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
  max-height: 450px;
  overflow-y: auto;
`;

const LectureCard = styled.div`
  background-color: #420f0f; /* Deep Burgundy */
  border-radius: 15px;
  padding: 25px; /* Increased padding */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  width: 40%; /* Reduced width */
  box-sizing: border-box;
  transition: transform 0.2s; /* Smooth scaling effect */
  
  &:hover {
    transform: scale(1.05); /* Slight scale on hover */
  }
`;

const SectionHeading = styled.h2`
  color: #fff; /* White */
  font-size: 24px;
  margin-bottom: 15px;
`;

const CardHeading = styled.h3`
  color: #fff; /* White */
  font-size: 20px; /* Adjusted font size */
  margin-bottom: 10px; /* Increased margin */
`;

const CardContent = styled.p`
  margin-bottom: 15px;
  font-size: 18px; /* Increased font size */
  color: #c0c0c0; /* Silver Mist */
`;

const CourseContent = styled(CardContent)`
  color: #ffd700; /* Lustrous Gold */
  font-weight: bold;
  font-size: 20px; /* Adjusted font size */
`;

const LectureContent = styled(CardContent)`
  color: #000000; /* Ivory Lace */
  font-style: italic;
  font-weight: bold;
`;

const DateContent = styled(CardContent)`
  color: #d4a2b0; /* Mauve Mist */
  font-weight: bold;
`;

const LocationContent = styled(CardContent)`
  color: #c0c0c0; /* Silver Mist */
  font-size: 16px; /* Adjusted font size */
`;

const NoSchedulesMessage = styled.p`
  color: #fff; /* White */
  font-size: 18px; /* Adjusted font size */
  text-align: center; /* Centered text */
  margin-top: 20px; /* Added margin */
`;

const MainContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  padding: 10px;
  overflow: hidden;
  width: 100%;
`;

export default Instructor;
