//react router
import { useParams } from "react-router-dom";
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
import { useGlobalAlertContext } from "../../contexts/alertContext";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getSingleContentData,
  reset,
} from "../../features/content/contentSlice";
import handleSubmit from "./utils/handleSubmit";

//ManageContent component
const ManageContent = () => {
  //id of todo to update
  const { id } = useParams();
  let { setShowAlert } = useGlobalAlertContext();
  //state for update
  const [updateId, setUpdateId] = useState<any | boolean>(false);
  //state for prev uploaded content see if it is changing in case of updating
  const [prevContentURL, setPrevContentURL] = useState<string | boolean>(false);
  //uploading progress
  const [uploadingProgress, setUploadingProgress] = useState<any>(0);
  //form data interface
  interface formDataInterface {
    title: string;
    desc: string;
  }
  //form data
  const [formData, setFormData] = useState<formDataInterface>({
    title: "",
    desc: "",
  });

  //uploaded content
  const [uploadedContent, setUploadedContent] = useState<File | null>(null);
  const { title, desc } = formData;

  //use dipatch
  const dispatch = useAppDispatch();

  //handle change of input
  const handleChange = (e: any) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleContentUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files != null) {
      setUploadedContent(evt.target.files[0]); //error
    }
  };
  //onsubmit
  const onSubmit = () => {
    handleSubmit(
      formData,
      uploadedContent,
      updateId,
      prevContentURL,
      setUploadingProgress,
      setShowAlert,
      dispatch
    );
  };

  //get initial state from manage news store
  const { singleContentData, isError, message, isLoading } = useAppSelector(
    (state) => state.content
  );

  //listen for change
  useEffect(() => {
    //if there are error
    if (isError) {
      setShowAlert({
        msg: "some error occured",
        color: "danger",
      });
    }

    dispatch(reset());
  }, [isError, message, dispatch, setShowAlert]);

  //is we get the value of id from query then it is update route..
  useEffect(() => {
    if (id) {
      dispatch(getSingleContentData(id));
    }
    dispatch(reset());
  }, [id, dispatch]);

  //listen for any change in singleNewsData
  useEffect(() => {
    //at first we will reset everything if there are any prev value
    setFormData({
      title: "",
      desc: "",
    });
    setPrevContentURL(false);
    setUpdateId(false);

    //then we will set new content..
    if (singleContentData) {
      //set the news id we want to update in isUpdate
      setUpdateId(id);
      //get data from single news data
      let { title, desc, contentURL }: any = singleContentData;
      //set the prev data in input fields.
      setFormData({ title, desc });
      setPrevContentURL(contentURL);
    }
  }, [id, singleContentData]);

  //fuction to reset input fields
  const resetInput = () => {
    setFormData({
      title: "",
      desc: "",
    });
    let x: any = document.getElementById("content");
    x.value = null;
  };

  if (isLoading) {
    return <h5>Loading..</h5>;
  }

  return (
    <MDBCol size="12" md="6" lg="4" className="mx-auto vh-100">
      {/* top */}
      <div className="top d-flex justify-content-between align-items-end">
        <h5 className="text-dark mb-0">Upload Content</h5>
        {/* input reset button */}
        <MDBBtn floating size="sm" onClick={resetInput}>
          <MDBIcon fas icon="sync-alt" size="sm" />
        </MDBBtn>
      </div>
      {/* manage content form */}
      <div className="manage-content-form my-3">
        {/* content title */}
        <MDBInput
          type="text"
          id="title"
          value={title}
          onChange={handleChange}
          className="mb-1"
          label="Content Title"
          size="sm"
        />
        {/* content file */}
        <div className="content mb-2">
          <small className="form-label text-dark  fw-bold">
            Select File(Image,Video,Audio)
          </small>
          <MDBInput
            type="file"
            size="sm"
            onChange={handleContentUpload}
            id="content"
          />
        </div>

        {/* content desc */}
        <MDBTextArea
          label="Content Description"
          id="desc"
          value={desc}
          onChange={handleChange}
          className="mb-3"
          rows={4}
          size="sm"
        />
        {/* upload progress bar */}
        {uploadingProgress > 0 && (
          <MDBProgress className="mb-2">
            <MDBProgressBar
              bgColor="warning"
              style={{ width: "75%" }}
              width={uploadingProgress}
              valuemin={0}
              valuemax={100}
            />
          </MDBProgress>
        )}
        {/* submit btn */}
        <MDBBtn block className="rounded-0" onClick={onSubmit}>
          Submit
        </MDBBtn>
      </div>
    </MDBCol>
  );
};

export default ManageContent;
