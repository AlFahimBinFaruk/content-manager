//MDB Components
import { MDBCard, MDBCardBody, MDBIcon } from "mdb-react-ui-kit";
type AppProps = {
  _id: string;
  title: string;
  desc: string;
  contentURL: string;
};
//SingleContentCard component
const SingleContentCard = ({ _id, title, desc, contentURL }: AppProps) => {
  return (
    <MDBCard className="h-100 rounded-0 shadow">
      <MDBCardBody className="p-0">
        {/* content */}
        <div className="content">
          {/* image */}
          {contentURL.includes(".png") && (
            <img
              src={contentURL}
              className="card-img-top rounded-0"
              alt="Fissure in Sandstone"
            />
          )}

          {/* video */}
          {contentURL.includes(".mp4") && (
            <div className="ratio ratio-16x9">
              <video controls>
                <source src={contentURL} />
              </video>
            </div>
          )}
          {/*  */}
          {/* audio */}
          {contentURL.includes(".mp3") && (
            <audio controls className="ratio ratio-16x9 p-1 mt-3">
              <source src={contentURL} />
            </audio>
          )}
        </div>
        <div className="p-3">
          {/* text */}
          <div className="text">
            <h6 className="text-dark">{title}</h6>
            <p className="fw-bold text-muted">
              <small>
                {desc.length > 60 ? desc.substring(0, 60) + "..." : desc}
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
