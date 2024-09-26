import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { allInstructors } from "../../utils/APIRoutes";
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  max-height: 530px;
  padding: 20px;
  background-color: #f0f4f8; /* Light background color for contrast */
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
`;

const Heading = styled.h1`
  color: #ffffff; /* White */
  font-size: 36px;
  margin: 20px 0;
  background-color: #34495e; /* Darker shade for a professional look */
  padding: 15px 25px;
  border-radius: 10px;
  text-align: center;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 1000px; /* Adjust width for responsiveness */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Add shadow to the heading */
`;

const CardList = styled.div`
  width: 100%;
  max-width: 1200px; /* Limit the max-width for better layout */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
`;

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin: 10px;
  padding: 20px;
  width: 45%;
  max-width: 350px; /* Ensure consistent card width */
  box-sizing: border-box;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow for card depth */
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Deeper shadow on hover */
  }

  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 15px 15px 0 0;
  }

  .card-content {
    padding: 10px;
    text-align: center; /* Center the content */
  }

  h2 {
    margin-bottom: 10px;
    font-size: 20px;
  }

  p {
    margin-bottom: 5px;
    font-size: 16px;
    color: #7f8c8d; /* Subtle color for secondary text */
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
`;

const InstructorName = styled.h3`
  color: #2c3e50;
  font-size: 22px;
  margin-top: 12px;
  margin-bottom: 5px;
  font-weight: 600;
`;



export default function Instructors({ user }) {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        if (user) {
          const response = await axios.get(`${allInstructors}/${user._id}`);
          setInstructors(response.data);
        }
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };
    fetchInstructors();
  }, [user]);

  return (
    <Container>
      <Heading>Instructors</Heading>
      <CardList>
        {instructors.map((instructor) => (
          <Card key={instructor._id}>
            <CardLink
              to={{
                pathname: `/individualinstructor/${instructor.username}`,
                state: { instructorUsername: instructor.username }, // Pass username as state
              }}
            >
              {/* <img src={instructor.profileImage} alt={instructor.username} /> */}
              <div className="card-content">
                {/* <h2>{instructor.username}</h2> */}
                <InstructorName>{instructor.username}</InstructorName>
                {/* <p>{instructor.bio}</p> */}
              </div>
            </CardLink>
          </Card>
        ))}
      </CardList>
    </Container>
  );
}