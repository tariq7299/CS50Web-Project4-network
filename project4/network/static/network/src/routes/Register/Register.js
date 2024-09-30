import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import * as React from "react"
import "./Register.scss";


export default function Register() {

  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmation: "",
  });

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.firstname !== "" && input.lastname !== "" && input.email !== "" && input.username !== "" && input.password !== "" && input.confirmation !== "") {
      auth.registerAction(input);
      return;
    }
    alert("please provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmitEvent}>
      <div className="form_control">
        <label htmlFor="user-firstname">firstname:</label>
        <input
          type="text"
          id="user-firstname"
          name="firstname"
          placeholder="Enter your firstname"
          aria-describedby="user-firstname"
          aria-invalid="false"
          autoComplete="off"
          onChange={handleInput}
        />
        <div id="user-firstname" className="sr-only">
          Please enter your first name
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="user-lastname">lastname:</label>
        <input
          type="text"
          id="user-lastname"
          name="lastname"
          placeholder="Enter your lastname"
          aria-describedby="user-lastname"
          aria-invalid="false"
          autoComplete="off"
          onChange={handleInput}
        />
        <div id="user-lastname" className="sr-only">
          Please enter your last name
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="user-email">email:</label>
        <input
          type="text"
          id="user-email"
          name="email"
          placeholder="Enter your email"
          aria-describedby="user-email"
          aria-invalid="false"
          autoComplete="off"
          onChange={handleInput}
        />
        <div id="user-email" className="sr-only">
          Please enter your email address
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="user-username">Username:</label>
        <input
          type="text"
          id="user-username"
          name="username"
          placeholder="Enter your username"
          aria-describedby="user-username"
          aria-invalid="false"
          autoComplete="off"
          onChange={handleInput}
        />
        <div id="user-username" className="sr-only">
          Please enter a valid username. It must contain at least 6 characters.
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-describedby="user-password"
          aria-invalid="false"
          autoComplete="off"
          onChange={handleInput}
        />
        <div id="user-password" className="sr-only">
          your password should be more than 6 character
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="confirmation">confirmation:</label>
        <input
          type="password"
          id="confirmation"
          name="confirmation"
          aria-describedby="user-confirmation"
          aria-invalid="false"
          autoComplete="off"
          onChange={handleInput}
        />
        <div id="user-confirmation" className="sr-only">
          Enter your password again please !
        </div>
      </div>
      <button className="btn-submit">Submit</button>
    </form>
  );
};