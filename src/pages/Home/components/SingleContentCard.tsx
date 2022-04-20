//MDB Components
import { MDBCard, MDBCardBody, MDBIcon } from "mdb-react-ui-kit";

//SingleContentCard component
const SingleContentCard = () => {
  return (
    <MDBCard className="h-100 rounded-0 shadow">
      <MDBCardBody className="p-0">
        {/* content */}
        <div className="content">
          {/* image */}
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
            className="card-img-top rounded-0"
            alt="Fissure in Sandstone"
          />
          {/* video */}
          {/* <div className="ratio ratio-16x9">
              <video controls>
                <source src="/assets/videos/01.mp4" />
              </video>s
            </div> */}
          {/* audio */}
          {/* <audio controls className="ratio ratio-16x9 p-1 mt-3">
            <source src="/assets/audio/spirit-blossom-15285.mp3" />
          </audio> */}
        </div>
        <div className="p-3">
          {/* text */}
          <div className="text">
            <h6 className="text-dark">Demo Title</h6>
            <p className="fw-bold text-muted">
              <small>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolores modi sunt totam molestias placeat libero.
              </small>
            </p>
          </div>
          {/* manage buttons */}
          <div className="manage-buttons d-flex justify-content-between">
            {/* edit */}
            <MDBIcon far icon="edit" role="button" />
            {/* delete */}
            <MDBIcon fas icon="trash" role="button" />
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default SingleContentCard;
