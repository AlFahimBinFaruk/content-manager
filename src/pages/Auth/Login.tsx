//MDB component
import { MDBBtn, MDBCol, MDBInput } from "mdb-react-ui-kit";
//App component
import LoginWithGoogleBtn from "./components/LoginWithGoogleBtn";
//Login component
const Login = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <MDBCol size="12" md="5" lg="3">
        <h5 className="text-dark text-center mb-3">Login to get started</h5>
        {/* login form */}
        <div className="login-form">
          {/* email */}
          <MDBInput type="email" label="Email Address" className="mb-2" />
          {/* password */}
          <MDBInput type="password" label="Password" className="mb-3" />
          {/* login btn */}
          <MDBBtn block className="rounded-0">
            Login
          </MDBBtn>
          {/* register page link */}
          <p className="text-center mt-2">
            <small>
              Dont have an account? <a href="/register">Register</a>{" "}
            </small>
          </p>
          {/* login with google */}
          <LoginWithGoogleBtn />
        </div>
      </MDBCol>
    </div>
  );
};

export default Login;
