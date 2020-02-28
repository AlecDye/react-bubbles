import React, { useState } from "react";

import axiosWithAuth from "../utils/axiosWithAuth"

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [state, setState] = useState({
    credentials: {
      username: "",
      password: ""
    }
  })

  const handleChange = e => {
    e.preventDefault();
    setState({
      credentials: {
        ...state.credentials,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("Login", state.credentials)
      .then(res => {
        window.localStorage.setItem("token", res.data.payload)
        props.history.push("/protected");
      })
      .catch(err => {
        console.log("Post failed", err)
      })
  }
  return (
    <div className="form-container">
      <h2>Have an account? Log in here!</h2>
      <p> (user: "Lambda School" pw: "i&lt;3Lambd4")</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
        <input
            type="text"
            name="username"
            onChange={handleChange}
            value={state.credentials.username}
          />
        </label>
        <label>
          Password:
        <input
            type="password"
            name="password"
            onChange={handleChange}
            value={state.credentials.password}
          />
        </label>
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
