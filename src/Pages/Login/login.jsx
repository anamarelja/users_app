import "./login.scss";
import React, { useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { Header } from "../../Components/Header";
import { themeContext } from "../../App";
import { loginContext } from "../../App";
import TextField from "@material-ui/core/TextField";

const Login = () => {
  const { theme } = useContext(themeContext);
  const { login, setLogin } = useContext(loginContext);

  return (
    <div>
      {localStorage.getItem('login')!=='null' && <Redirect to="/users" />}
      <Header></Header>
      <div className={`Login ${theme}`}>
        <p className="is-size-5-mobile is-size-4-tablet	is-size-3-desktop	has-text-centered login-title p-5">
          Login
        </p>
        <p
          id="simple-modal-description"
          className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center"
        >
          <TextField
            required
            id="filled-basic"
            type="email"
            label="Email"
            variant="filled"
            className="m-5 edit-inputs"
            onChange={(e) => {
              setLogin(e.target.value);
            }}
          />

          <Link
            to="/users"
            className={`login-link is-size-5 ${theme}`}
            onClick={() => localStorage.setItem("login", login)}
          >
            Login <i class="fas fa-sign-in-alt"></i>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
