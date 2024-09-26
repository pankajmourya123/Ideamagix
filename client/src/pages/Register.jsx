import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    }
  }, []);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be the same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
        isAdmin: values.isAdmin,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        if (data.user.isAdmin === true) {
          localStorage.setItem("secret-key-admin", JSON.stringify(data.user));
          navigate("/admin");
        } else if (data.user.isAdmin === false) {
          localStorage.setItem("secret-key", JSON.stringify(data.user));
          navigate("/instructor");
        }
      }
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setValues({ ...values, [name]: newValue });
  };

  return (
    <>
      <FormContainer onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          <h1>Course Schedule</h1>
        </div>
        <form>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <div className="checkbox-container">
            <Checkbox
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              checked={values.isAdmin}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="isAdmin">Admin</label>
          </div>
          <SubmitButton type="submit">Create User</SubmitButton>
          <span>
            Already have an account? <Link to="/login">Login.</Link>
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
  background-color: #f3f4f6; /* Soft Gray */
  padding: 2rem;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    h1 {
      color: #1e40af; /* Deep Blue */
      text-transform: uppercase;
      font-size: 2rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #ffffff; /* White */
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  span {
    color: #1e40af; /* Deep Blue */
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
    font-size: 0.9rem;

    a {
      color: #1e3a8a; /* Darker Blue */
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

const Input = styled.input`
  padding: 1rem;
  border: 0.1rem solid #cbd5e1; /* Light Gray */
  border-radius: 0.4rem;
  color: #1e40af; /* Deep Blue Text */
  width: 100%;
  font-size: 1rem;

  &:focus {
    border: 0.1rem solid #1e3a8a; /* Darker Blue Focus Border */
    outline: none;
  }
`;

const Checkbox = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 0.1rem solid #1e40af; /* Deep Blue */
  border-radius: 0.2rem;
  outline: none;
  margin-right: 0.5rem;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #1e40af; /* Deep Blue Background */
    border-color: #1e40af; /* Deep Blue Border */

    &:before {
      content: "\u2713";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 1.2rem;
    }
  }
`;

const SubmitButton = styled.button`
  background-color: #1e40af; /* Deep Blue */
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;

  &:hover {
    background-color: #1e3a8a; /* Darker Blue on Hover */
  }
`;
