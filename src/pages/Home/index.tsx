import { useEffect } from "react";
//MDB Componets
import { MDBBtn, MDBCol, MDBRow } from "mdb-react-ui-kit";
import SingleContentCard from "./components/SingleContentCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getMyContentList, reset } from "../../features/content/contentSlice";
//React router dom
import { useNavigate } from "react-router-dom";
//Home component
const Home = () => {
  let navigate = useNavigate();
  //get initial state from  content store
  const { myContentList, isLoading, isError, message } = useAppSelector(
    (state) => state.content
  );

  //use dipatch
  const dispatch = useAppDispatch();

  //listen for change
  useEffect((): any => {
    //if there are error
    if (isError) {
      console.log(message);
    }

    dispatch(getMyContentList());
    return () => dispatch(reset());
  }, [isError, message, dispatch]);

  //show loading spinner if data is loading...
  if (isLoading) {
    return <h5>Loading...</h5>;
  }
  return (
    <div className="home">
      {/* top */}
      <div className="top d-flex justify-content-between align-items-center">
        <h5 className="text-dark">Manage All Your Contents.</h5>
        {/* add new button */}
        <MDBBtn
          className="rounded-0"
          onClick={() => navigate("/manage-content")}
        >
          Add New
        </MDBBtn>
      </div>
      {/* contents */}
      <MDBRow className="contents gy-3 my-2">
        {myContentList && myContentList.length > 0 ? (
          myContentList.map((i, index) => {
            return (
              <MDBCol size="12" md="4" xl="3" key={index}>
                <SingleContentCard _id={""} {...i} />
              </MDBCol>
            );
          })
        ) : (
          <h6 className="vh-100 text-center">
            You Don't Have Any Content Yet.Upload Some!!!!
          </h6>
        )}
      </MDBRow>
    </div>
  );
};

export default Home;
