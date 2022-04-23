//MDB Component
import { MDBBtn } from "mdb-react-ui-kit";
//firebase
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useGlobalAlertContext } from "../../../contexts/alertContext";
import { useAppDispatch } from "../../../app/hooks";
import { loginWithGoogle } from "../../../features/auth/authSlice";
//Login With Google Btn component
const LoginWithGoogleBtn = () => {
  let { setShowAlert } = useGlobalAlertContext();
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  //google signin
  const GoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const user = result.user;
        if (user) {
          const userData = {
            username: user.displayName,
            email: user.email,
          };
          dispatch(loginWithGoogle(userData));
        }
      })
      .catch((error) => {
        // Handle Errors here.
        setShowAlert({ msg: error.message, color: "danger" });
      });
  };

  return (
    <div className="login-with-google mt-3">
      <h6 className="text-dark mb-2 text-center">or use other methods</h6>
      {/* Login with google btn */}
      <MDBBtn block color="dark" className="rounded-0" onClick={GoogleSignIn}>
        Login with google
      </MDBBtn>
    </div>
  );
};

export default LoginWithGoogleBtn;
