//MDB Components
import { MDBCol, MDBIcon } from "mdb-react-ui-kit";

//ContentDetails component
const ContentDetails = () => {
  return (
    <MDBCol size="12" md="8" lg="6" className="content-details mx-auto">
      {/* content */}
      <div className="content w-100   my-3">
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
              </video>s
            </div> */}
        {/* audio */}
        {/* <audio controls className="ratio ratio-16x9 p-1 mt-3">
            <source src="/assets/audio/spirit-blossom-15285.mp3" />
          </audio> */}
      </div>
      <div className="d-flex justify-content-between">
        {/* title */}
        <h6 className="text-dark">This is some demo title</h6>
        {/* manage buttons */}
        <div className="manage-buttons d-flex ">
          {/* edit */}
          <MDBIcon far icon="edit" role="button" className="me-4" />
          {/* delete */}
          <MDBIcon fas icon="trash" role="button" />
        </div>
      </div>
      {/* desc */}
      <small className="fw-bold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit
        inventore id corporis ratione atque deserunt natus quidem! Distinctio
        eveniet deleniti assumenda veritatis, quisquam temporibus nostrum
        repellat vero. Eos sed aliquam quod eum?
      </small>
    </MDBCol>
  );
};

export default ContentDetails;
