// react router
import { BrowserRouter, Route, Routes } from "react-router-dom";
//MDB components
import { MDBContainer } from "mdb-react-ui-kit";
//App components
import Alert from "./common_components/Alert";
import Footer from "./common_components/Footer";
import Header from "./common_components/Header";
import AccountSettings from "./pages/Auth/AccountSettings";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ContentDetails from "./pages/ContentDetails";
import Home from "./pages/Home";
import ManageContent from "./pages/ManageContent";
import Error from "./pages/Error";
//Main App
function App() {
  //check if use is logged in
  let login = true;
  return (
    <div className="App">
      <BrowserRouter>
        {/* header */}
        <Header />
        {/* alert */}
        <Alert />
        {/* main container */}
        <MDBContainer className="my-5">
          <Routes>
            {login ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/manage-content" element={<ManageContent />} />
                <Route path="/manage-content/:id" element={<ManageContent />} />
                <Route
                  path="/content-details/:id"
                  element={<ContentDetails />}
                />
                <Route path="/account-settings" element={<AccountSettings />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            )}
            <Route path="*" element={<Error />} />
          </Routes>
        </MDBContainer>
        {/* footer */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
