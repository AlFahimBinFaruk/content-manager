//MDB Component
import { MDBBtn } from "mdb-react-ui-kit";
//Login With Google Btn component
const LoginWithGoogleBtn = () => {
  return (
    <div className="login-with-google mt-3">
      <h6 className="text-dark mb-2 text-center">or use other methods</h6>
      {/* Login with google btn */}
      <MDBBtn block color="dark" className="rounded-0">
        Login with google
      </MDBBtn>
    </div>
  );
};

export default LoginWithGoogleBtn;
