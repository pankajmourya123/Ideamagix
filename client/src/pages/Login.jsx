import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username and Password are required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and Password are required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        if (data.user.isAdmin) {
          localStorage.setItem("secret-key-admin", JSON.stringify(data.user));
          navigate("/admin");
        } else {
          localStorage.setItem("secret-key", JSON.stringify(data.user));
          navigate("/instructor");
        }
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Course Schedule</h1>
          </div>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <SubmitButton type="submit">Log In</SubmitButton>
          <span>
            Don't have an account? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(to right, #f3e0db, #d4af37); /* Gradient background */
  padding: 2rem;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    h1 {
      color: #fff; /* Change to white for contrast */
      text-transform: uppercase;
      font-size: 2.5rem; /* Increase font size */
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2); /* Shadow for depth */
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #fff; /* Silken Ivory */
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); /* More pronounced shadow */
    width: 100%;
    max-width: 400px;
    margin: 0 auto;

    @media (max-width: 500px) {
      padding: 1.5rem; /* Reduce padding on small screens */
      gap: 1rem; /* Reduce gap */
    }
  }

  span {
    color: #d4af37; /* Golden Honey */
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
    font-size: 0.9rem;

    a {
      color: #4e0eff; /* Deep Blue Text */
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease; /* Smooth color transition */

      &:hover {
        color: #b76e79; /* Change color on hover */
      }
    }
  }
`;

const Input = styled.input`
  padding: 1rem;
  border: 0.1rem solid #d2b48c; /* Tan */
  border-radius: 0.4rem;
  color: #4e0eff; /* Deep Blue Text */
  width: 100%;
  font-size: 1rem;
  transition: border-color 0.3s ease; /* Smooth transition for border color */

  &:focus {
    border: 0.1rem solid #b76e79; /* Rose Gold Focus Border */
    outline: none;
  }

  &::placeholder {
    color: #a9a9a9; /* Placeholder color */
    opacity: 1; /* Ensures placeholder is visible */
  }
`;

const SubmitButton = styled.button`
  background-color: #d4af37; /* Golden Honey */
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth transitions */

  &:hover {
    background-color: #b76e79; /* Rose Gold Hover */
    transform: scale(1.05); /* Slightly enlarge button */
  }

  &:disabled {
    background-color: #ccc; /* Grey out button when disabled */
    cursor: not-allowed; /* Change cursor to indicate disabled state */
  }
`;
