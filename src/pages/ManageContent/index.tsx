//MDB Components
import {
  MDBBtn,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBTextArea,
  MDBProgress,
  MDBProgressBar,
} from "mdb-react-ui-kit";
//App components
import PrevContent from "./components/PrevContent";

//ManageContent component
const ManageContent = () => {
  return (
    <MDBCol size="12" md="6" lg="4" className="mx-auto vh-100">
      {/* top */}
      <div className="top d-flex justify-content-between align-items-end">
        <h5 className="text-dark mb-0">Upload Content</h5>
        {/* input reset button */}
        <MDBBtn floating size="sm">
          <MDBIcon fas icon="sync-alt" size="sm" />
        </MDBBtn>
      </div>
      {/* manage content form */}
      <div className="manage-content-form my-3">
        {/* content title */}
        <MDBInput
          type="text"
          className="mb-1"
          label="Content Title"
          size="sm"
        />
        {/* content file */}
        <div className="content mb-2">
          <small className="form-label text-dark  fw-bold">
            Select File(Image,Video,Audio)
          </small>
          <MDBInput type="file" size="sm" />
        </div>

        {/* content desc */}
        <MDBTextArea
          label="Content Description"
          className="mb-3"
          rows={4}
          size="sm"
        />
        {/* upload progress bar */}
        <MDBProgress className="mb-2">
          <MDBProgressBar
            bgColor="warning"
            style={{ width: "75%" }}
            width="75"
            valuemin={0}
            valuemax={100}
          />
        </MDBProgress>
        {/* submit btn */}
        <MDBBtn block className="rounded-0">
          Submit
        </MDBBtn>
      </div>
    </MDBCol>
  );
};

export default ManageContent;
