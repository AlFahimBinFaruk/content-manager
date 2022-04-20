//MDB components
import { MDBContainer } from "mdb-react-ui-kit";
//App components
import Alert from "./common_components/Alert";
import Header from "./common_components/Header";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
//Main App
function App() {
  return (
    <div className="App">
      {/* header */}
      <Header />
      {/* alert */}
      <Alert />
      {/* main container */}
      <MDBContainer>
        {/* <Home /> */}
        {/* <Login /> */}
        <Register/>
      </MDBContainer>
    </div>
  );
}

export default App;
