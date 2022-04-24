//MDB Components
import { MDBCard, MDBCardBody, MDBIcon } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useGlobalAlertContext } from "../../../contexts/alertContext";
//firebase
import { getStorage, ref, deleteObject } from "firebase/storage";
import { deleteContent } from "../../../features/content/contentSlice";
import { useEffect } from "react";
type AppProps = {
  _id: string;
  title: string;
  desc: string;
  contentURL: any;
};
//SingleContentCard component
const SingleContentCard = ({ _id, title, desc, contentURL }: AppProps) => {
  //alert
  let { setShowAlert } = useGlobalAlertContext();
  let navigate = useNavigate();
  //dispatch
  const dispatch = useAppDispatch();

  //get initial state from manage news store
  const { isError, isSuccess, message } = useAppSelector(
    (state) => state.content
  );

  //delete content from both mongoDB and firebase(content)
  const deleteContentFromList = (id: string, contentURL: string) => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, contentURL);

    // Delete the file from storage
    deleteObject(desertRef)
      .then(() => {
        //delete from mongodb.
        dispatch(deleteContent(id));
        setShowAlert({
          msg: "News Deleted",
          color: "success",
        });
      })
      .catch((error) => {
        setShowAlert({
          msg: "Storage Error.Can't delete this",
          color: "danger",
        });
      });
  };

  //listen for change
  useEffect(() => {
    //if there are error
    if (isError) {
      setShowAlert({
        msg: message,
        color: "danger",
      });
    }
  }, [isError, isSuccess, message, dispatch, setShowAlert]);

  return (
    <MDBCard className="h-100 rounded-0 shadow">
      <MDBCardBody className="p-0">
        {/* content */}
        <div className="content">
          {/* image */}
          {(contentURL.includes(".PNG") ||
            contentURL.includes(".jpg") ||
            contentURL.includes(".jpeg") ||
            contentURL.includes(".png")) && (
            <img
              src={contentURL}
              className="card-img-top rounded-0"
              alt="Fissure in Sandstone"
            />
          )}

          {/* video */}
          {contentURL.includes("mp4") && (
            <div className="ratio ratio-16x9">
              <video controls>
                <source src={contentURL} />
              </video>
            </div>
          )}
          {/*  */}
          {/* audio */}
          {contentURL.includes("mp3") && (
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
            <MDBIcon
              far
              icon="edit"
              role="button"
              onClick={() => navigate(`/manage-content/${_id}`)}
            />
            {/* delete */}
            <MDBIcon
              fas
              icon="trash"
              role="button"
              onClick={() => deleteContentFromList(_id, contentURL)}
            />
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default SingleContentCard;
