//mdb
import { MDBBtn, MDBCol, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGlobalAlertContext } from "../../contexts/alertContext";
import { logout, updateAccount } from "../../features/auth/authSlice";

//account settings components
const AccountSettings = () => {
  let { setShowAlert } = useGlobalAlertContext();
  const navigate = useNavigate();
  //get initial state from auth store
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );
  let { email, username } = user;
  console.log("user", user);

  interface formDataInterface {
    newUsername: string | any;
    newEmail: string | any;
    newPassword: string;
  }
  const [formData, setFormData] = useState<formDataInterface>({
    newUsername: "",
    newEmail: "",
    newPassword: "",
  });
  let { newUsername, newEmail, newPassword } = formData;

  //handle change of input
  const handleChange = (e: any) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const dispatch = useAppDispatch();

  //handle submit
  const handleSubmit = () => {
    newUsername = newUsername || username;
    newEmail = newEmail || email;
    //see if user provided all info
    let userData;
    if (newPassword) {
      userData = {
        username: newUsername,
        email: newEmail,
        password: newPassword,
      };
    } else {
      userData = {
        username: newUsername,
        email: newEmail,
      };
    }
    dispatch(updateAccount(userData))
      .then(() => {
        setShowAlert({ msg: "Account Updated", color: "success" });
      })
      .catch(() => {
        setShowAlert({ msg: "Some Error Occured", color: "danger" });
      });
  };

  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        setShowAlert({ msg: "Logout Successful", color: "success" });
        navigate("/");
      })
      .catch(() => {
        setShowAlert({ msg: "Some Error Occured", color: "danger" });
      });
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
  }, [user, isError, isSuccess, message, navigate, setShowAlert]);

  //if the page is loading
  if (isLoading) {
    return <h5>Loading...</h5>;
  }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <MDBCol size="12" md="6" lg="3">
        {/* top */}
        <div className="top d-flex justify-content-between align-items-baseline mb-2">
          <h6 className="text-dark">Account Settings</h6>
          {/* logout btn */}
          <MDBIcon
            fas
            icon="sign-in-alt"
            role="button"
            onClick={handleLogout}
          />
        </div>
        {/* account settings form */}
        <div className="account-settings-form">
          {/* username */}
          <div className="mb-3">
            {/* old */}
            <MDBInput label={username} disabled className="mb-2" size="sm" />
            {/* new */}
            <MDBInput
              type="text"
              id="newUsername"
              value={newUsername}
              onChange={handleChange}
              label="New Username"
              size="sm"
            />
          </div>
          {/* email */}
          <div className="mb-3">
            {/* old */}
            <MDBInput label={email} disabled className="mb-2" size="sm" />
            {/* new */}
            <MDBInput
              type="email"
              id="newEmail"
              value={newEmail}
              onChange={handleChange}
              label="New Email"
              size="sm"
            />
          </div>
          {/* password */}
          <div className="mb-3">
            {/* new */}
            <MDBInput
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={handleChange}
              label="New Password"
              size="sm"
            />
          </div>
          {/* handle submit btn */}
          <MDBBtn block className="rounded-0" onClick={handleSubmit}>
            Update
          </MDBBtn>
        </div>
      </MDBCol>
    </div>
  );
};

export default AccountSettings;
