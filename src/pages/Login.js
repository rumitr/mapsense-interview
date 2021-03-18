import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context";
import "../icons/user.css";
import "../icons/password.css";

const Login = () => {
  let history = useHistory();
  let auth = useAuth();

  let login = (e) => {
    e.preventDefault();
    auth.signin(() => {
      history.replace("feed");
    });
  };
  return (
    <div className=" page align">
      <div className="grid">
        <form className="form login" action="">
          <div className="form__field">
            <label htmlFor="login_username">
              <span className="gg-user"></span>
              <span class="hidden">Username</span>
            </label>
            <input
              autoComplete="username"
              id="login__username"
              type="text"
              name="username"
              className="form__input"
              placeholder="Username"
              required=""
            ></input>
          </div>

          <div class="form__field">
            <label for="login__password">
              <span className="gg-password"></span>
              <span class="hidden">Password</span>
            </label>
            <input
              id="login__password"
              type="password"
              name="password"
              className="form__input"
              placeholder="Password"
              required
            />
          </div>

          <div class="form__field">
            <input type="submit" onClick={login} value="Sign In" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
