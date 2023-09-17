import { useNavigate, useParams } from "react-router-dom";
import "../../components/landingPage/styles/register.css";
import { useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { planId } = useParams();

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      FirstName: fullName,
      Email: emailAddress,
      Password: password,
      CompanyName: companyName,
      PlanId: planId,
    };

    try {
      const result = await axios.request({
        method: "POST",
        url: "api/users/adduser",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: data,
      });
      if (result.data) {
        console.log(result.data);
        setRedirect(true);
        setLoading(false);
      } else {
        setLoading(false);
        setErrorMessage(
          "There was a problem with your registration. Please make sure to fill in the appropriate details and try again."
        );
      }
    } catch (error: any) {
      console.log(error.response.data)
      setLoading(false);
      setErrorMessage(
        error.response.data
      );
    }
  };

  const navigate = useNavigate();

  if (redirect) {
    navigate("/confirmemail");
  }
  return (
    <div className="register">
      <div className="asset__signup">
        <div className="asset__signup-header">
          <h3>Sign Up</h3>
        </div>
        <hr />
        <div className="signup_section">
          {errorMessage === "" ? null : (
            <Box
              display={"flex"}
              justifyContent={"center"}
              textAlign={"center"}
              margin={"4"}
            >
              <Box
                as="span"
                style={{ fontSize: "20px", marginBottom: "5px" }}
                color={"brandRed.100"}
              >
                {errorMessage}
              </Box>
            </Box>
          )}
          <div className="form-group">
            <input
              placeholder="FullName"
              className="form-control"
              type="text"
              name="fullname"
              id=""
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Email Address"
              className="form-control"
              type="text"
              name="email"
              id=""
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Organization Name"
              className="form-control"
              type="text"
              name="company"
              id=""
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Password"
              className="form-control"
              type="text"
              name="password"
              id=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="register">
            <input type="checkbox" name="" id="" />
            <label htmlFor="Remember Me">
              <span>
                By clicking the Sign Up button, you agree to our terms and
                conditions.
              </span>
            </label>
          </div>
          <div className="form-group">
            <button className="btn" onClick={handleSubmit}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
          <p>
            <a href="/login">Already have an account? Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
