//MDB component
import { MDBBtn, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
//React router
import { Link, useNavigate } from "react-router-dom";
//React redux
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGlobalAlertContext } from "../../contexts/alertContext";
import { reset, register } from "../../features/auth/authSlice";

//App component
import LoginWithGoogleBtn from "./components/LoginWithGoogleBtn";
//Register component
const Register = () => {
  let { setShowAlert } = useGlobalAlertContext();
  interface formDataInterface {
    username: string;
    email: string;
    password: string;
  }
  const [formData, setFormData] = useState<formDataInterface>({
    username: "",
    email: "",
    password: "",
  });

  let { username, email, password } = formData;

  //handle change of input
  const handleChange = (e: any) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //get initial state from auth store
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  //handle submit
  const handleSubmit = () => {
    //see if user provided all info
    if (username && email && password) {
      const userData = {
        username,
        email,
        password,
      };
      dispatch(register(userData));
    } else {
      setShowAlert({ msg: "Provide all info", color: "danger" });
    }
  };

  //listen for change
  useEffect(() => {
    //if there are error
    if (isError) {
      setShowAlert({
        msg: message,
        color: "danger",
      });
    }

    //if register is successfull
    if (isSuccess) {
      setShowAlert({
        msg: "login successful",
        color: "success",
      });
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch, setShowAlert]);

  //if the page is loading
  if (isLoading) {
    return <h5>Loading...</h5>;
  }
  
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <MDBCol size="12" md="5" lg="3">
        <h5 className="text-dark text-center mb-3">
          Register to create an account
        </h5>
        {/* register form */}
        <div className="register-form">
          {/* username */}
          <MDBInput
            type="text"
            id="username"
            value={username}
            onChange={handleChange}
            label="Username"
            className="mb-2"
            size="sm"
          />
          {/* email */}
          <MDBInput
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            label="Email Address"
            className="mb-2"
            size="sm"
          />
          {/* password */}
          <MDBInput
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
            label="Password"
            className="mb-3"
            size="sm"
          />
          {/* register btn */}
          <MDBBtn block className="rounded-0" onClick={handleSubmit}>
            Register
          </MDBBtn>
          {/* register page link */}
          <p className="text-center mt-2">
            <small>
              Already have an account? <Link to="/login">Login</Link>{" "}
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
