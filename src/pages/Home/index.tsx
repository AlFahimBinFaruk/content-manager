import { useState } from "react";
//MDB Componets
import { MDBBtn, MDBCol, MDBRow } from "mdb-react-ui-kit";
import SingleContentCard from "./components/SingleContentCard";
//Home component
const Home = () => {
  const [count, setcount] = useState([1,2,3,4,5,67,])
  return (
    <div className="home">
      {/* top */}
      <div className="top d-flex justify-content-between align-items-center">
        <h5 className="text-dark">Manage All Your Contents.</h5>
        {/* add new button */}
        <MDBBtn className="rounded-0">Add New</MDBBtn>
      </div>
{/* contents */}
<MDBRow className="contents gy-3 my-2">
{count.map((i,index)=>{
  return(
    <MDBCol size="12" md="4" xl="3">
      <SingleContentCard/>
    </MDBCol>
  )
})}
</MDBRow>
    </div>
  );
};

export default Home;
