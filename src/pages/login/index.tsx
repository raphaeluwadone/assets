import { useState } from "react";
import "../../components/landingPage/styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PulseLoader } from "react-spinners";

const Login = () => {
  const [email, setEmail] = useState<undefined | string>();
  const [password, setPassword] = useState<undefined | string>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = async () => {
    setLoading(true);
    try {
      const result = await axios.request({
        method: "POST",
        url: "api/users/login",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          Email: email,
          Password: password,
        },
      });
      if (result) {
        localStorage.setItem("user", JSON.stringify(result.data));
        navigate("/dashboard");
        console.log(result.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div>
      {/* <MainHeader /> */}
      <div className="auth">
        <div className="auth__section">
          <h3>Login</h3>
          <hr />
          {/* {isError && <Error text="Invalid Username or Password" />} */}
          <div className="input__section">
            <div>
              <div className="form__group">
                <input
                  className="form__control"
                  type="text"
                  placeholder="E-Mail Address"
                  name="Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value as unknown as string)
                  }
                />
              </div>
              <div className="form__group">
                <input
                  className="form__control"
                  type="password"
                  placeholder="Password"
                  name="Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value as unknown as string)
                  }
                />
              </div>
              <div className="form__group">
                <button className="form__button" onClick={login}>
                  {loading ? (
                    <PulseLoader
                      color={"#ffffff"}
                      loading={loading}
                      size={10}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </div>
            <div className="form__group-terms">
              <div className="save__user">
                <input type="checkbox" />
                <span>Remember me</span>
              </div>
              <Link to="/reset-password">
                <p className="forget__password">Forgot Password</p>
              </Link>
            </div>
            <p className="login__link">
              <Link to="/register">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
