//MDB component
import { MDBBtn, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGlobalAlertContext } from "../../contexts/alertContext";
import { login, reset } from "../../features/auth/authSlice";
//App component
import LoginWithGoogleBtn from "./components/LoginWithGoogleBtn";

//Login component
const Login = () => {
  let { setShowAlert } = useGlobalAlertContext();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //get initial state from auth store
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );
  //form data interface
  interface formDataInterface {
    email: string;
    password: string;
  }
  const [formData, setFormData] = useState<formDataInterface>({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  //handle change of input
  const handleChange = (e: any) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  //handle submit
  const handleSubmit = () => {
    //see if user provided all info
    if (email && password) {
      const userData = {
        email,
        password,
      };
      dispatch(login(userData));
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

    //if login is successfull
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
    return <h5>Loading..</h5>;
  }
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <MDBCol size="12" md="5" lg="3">
        <h5 className="text-dark text-center mb-3">Login to get started</h5>
        {/* login form */}
        <div className="login-form">
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
          {/* login btn */}
          <MDBBtn block className="rounded-0" onClick={handleSubmit}>
            Login
          </MDBBtn>
          {/* register page link */}
          <p className="text-center mt-2">
            <small>
              Dont have an account? <Link to="/">Register</Link>{" "}
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
