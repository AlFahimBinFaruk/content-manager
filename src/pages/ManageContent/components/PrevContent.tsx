//MDB components
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
//PrevContent componet
const PrevContent = () => {
  return (
    <div className="prev-content my-3 d-flex  justify-content-between align-items-center">
      {/* content */}
      <div className="content col-10">
        {/* image */}
        <img
          src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
          className="img-fluid"
          alt="Fissure in Sandstone"
        />
        {/* video */}
        {/* <div className="ratio ratio-16x9">
              <video controls>
                <source src="/assets/videos/01.mp4" />
              </video>
            </div> */}
        {/* audio */}
        {/* <audio controls className="ratio ratio-16x9 p-1 mt-3">
            <source src="/assets/audio/spirit-blossom-15285.mp3" />
          </audio> */}
      </div>
      {/* content delete btn */}
      <MDBBtn floating color="danger" size="sm">
        <MDBIcon fas icon="trash" role="button" size="sm" />
      </MDBBtn>
    </div>
  );
};

export default PrevContent;
