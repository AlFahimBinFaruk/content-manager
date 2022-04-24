//MDB components
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useGlobalAlertContext } from "../../../contexts/alertContext";
//firebase
import { getStorage, ref, deleteObject } from "firebase/storage";
type AppProps = {
  prevContentURL: any;
  setPrevContentURL: any;
};
//PrevContent componet
const PrevContent = ({ prevContentURL, setPrevContentURL }: AppProps) => {
  let { setShowAlert } = useGlobalAlertContext();

  const deleteContent = () => {
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(storage, prevContentURL);
    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        setShowAlert({ msg: "deleted successfully", color: "success" });
        setPrevContentURL(false);
      })
      .catch((error) => {
        setShowAlert({ msg: "failded to delete file ", color: "danger" });
      });
  };
  return (
    <div className="prev-content my-3 d-flex  justify-content-between align-items-center">
      {/* content */}
      <div className="content col-10">
        {/* image */}
        {(prevContentURL.includes(".PNG") ||
          prevContentURL.includes(".jpg") ||
          prevContentURL.includes(".jpeg") ||
          prevContentURL.includes(".png")) && (
          <img
            src={prevContentURL}
            className="img-fluid"
            alt="Fissure in Sandstone"
          />
        )}

        {/* video */}
        {prevContentURL.includes("mp4") && (
          <div className="ratio ratio-16x9">
            <video controls>
              <source src={prevContentURL} />
            </video>
          </div>
        )}

        {/* audio */}
        {prevContentURL.includes("mp3") && (
          <audio controls className="ratio ratio-16x9 p-1 mt-3">
            <source src="/assets/audio/spirit-blossom-15285.mp3" />
          </audio>
        )}
      </div>
      {/* content delete btn */}
      <MDBBtn floating color="danger" size="sm" onClick={deleteContent}>
        <MDBIcon fas icon="trash" role="button" size="sm" />
      </MDBBtn>
    </div>
  );
};

export default PrevContent;
