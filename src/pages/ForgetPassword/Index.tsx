import { useState } from "react";
import { Link } from "react-router-dom";
import "../../components/landingPage/styles/reset.css";

// state = {
//   isSuccessful: false,
//   Code:"",
//   errorMessage: "",
//   Loading:false,
//   Email:"",
//   Password:"",
//   emailSent:false,
//   pass:false,
// }

// componentDidMount(){
//   const { match: { params } } = this.props
//     console.log(params.code);
//     this.setState({
//         Code : params.code
//     });
// }
// handleChanges = e => {
//   const input = e.target;
//   const name = input.name;
//   const value = input.type === "checkbox" ? input.checked : input.value;
//   this.setState({ [name]: value });
// };
// handleSubmit = e => {
//   this.setState({Loading:true})
//   Connect("users/requestpasswordreset/" + this.state.Email, "POST", )
//   .then(res => res.json())
//   .then(response => {
//       this.setState({Loading : false })
//       console.log(response);
//       if(response === "Success"){
//           this.setState({emailSent: true})
//       }else{
//           this.setState({errorMessage:response})
//       }
//   })
//   .catch(error => console.error('Error:', error));
//   e.preventDefault();
// }
// handleReset = e => {
//   this.setState({Loading:true})
//   var data = {
//       VerificationCode: this.state.Code,
//       Password: this.state.Password
//   }
//   var Data = JSON.stringify(data);
//   Connect("users/resetpassword/", "POST", Data)
//   .then(res => res.json())
//   .then(response => {
//       this.setState({Loading : false })
//       console.log(response);
//       if(response === "Success"){
//           this.setState({isSuccessful: true})
//       }else{
//           this.setState({errorMessage:response})
//       }
//   })
//   .catch(error => console.error('Error:', error));
//   e.preventDefault();
// }

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="main__container">
      <div className="container">
        <h3>Recover Password</h3>
        <hr />
        <div className="input__section">
          <form>
            <div className="form__group">
              <input
                className="form__control"
                type="text"
                placeholder="E-Mail Address"
                name="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form__group">
              <button className="form__button">Reset Password</button>
            </div>
          </form>
          <div className="footer__links">
            <Link to="/login">
              <p>Login Instead?</p>
            </Link>
            <Link to="/register">
              <p>Create an account</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
