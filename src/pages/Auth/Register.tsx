//MDB component
import { MDBBtn, MDBCol, MDBInput } from "mdb-react-ui-kit";
//App component
import LoginWithGoogleBtn from "./components/LoginWithGoogleBtn";
//Register component
const Register = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <MDBCol size="12" md="5" lg="3">
        <h5 className="text-dark text-center mb-3">
          Register to create an account
        </h5>
        {/* register form */}
        <div className="register-form">
          {/* username */}
          <MDBInput type="text" label="Username" className="mb-2" />
          {/* email */}
          <MDBInput type="email" label="Email Address" className="mb-2" />
          {/* password */}
          <MDBInput type="password" label="Password" className="mb-3" />
          {/* register btn */}
          <MDBBtn block className="rounded-0">
            Register
          </MDBBtn>
          {/* register page link */}
          <p className="text-center mt-2">
            <small>
              Already have an account? <a href="/register">Login</a>{" "}
            </small>
          </p>
          {/* login with google */}
          <LoginWithGoogleBtn />
        </div>
      </MDBCol>
    </div>
  );
};

export default Register;
