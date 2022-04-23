import {
    createContent,
    updateContent,
} from "../../../features/content/contentSlice";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
type fromDataType = {
    title: string;
    desc: string;
};
const handleSubmit = (
    formData: fromDataType,
    uploadedContent: File | null,
    updateId: string | boolean,
    prevContentURL: string | any,
    setUploadingProgress: any,
    setShowAlert: any,
    dispatch: any
) => {
    //if update is fasle we will crate new news
    if (!updateId) {
        uploadNewContent(
            updateId,
            formData,
            uploadedContent,
            setUploadingProgress,
            setShowAlert,
            dispatch
        );
    } else {
        //if update is true
        if (uploadedContent) {
            // if the prev Content is changed we will upload the content
            uploadNewContent(
                updateId,
                formData,
                uploadedContent,
                setUploadingProgress,
                setShowAlert,
                dispatch
            );
        } else {
            //or we will just update other data.
            const { title, desc } = formData;
            updatePrevContent(
                updateId,
                title,
                desc,
                prevContentURL,
                setShowAlert,
                dispatch
            );
        }
    }
};

//updateContent
const uploadNewContent = (
    updateId: string | boolean,
    formData: fromDataType,
    uploadedContent: File | null,
    setUploadingProgress: any,
    setShowAlert: any,
    dispatch: any
) => {
    //if uploaded contnet is there
    if (uploadedContent) {
        const storage = getStorage();
        const storageRef = ref(storage, uploadedContent.name + new Date());
        const uploadTask = uploadBytesResumable(storageRef, uploadedContent);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Get task progress
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadingProgress(progress);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case "storage/unauthorized":
                        break;
                    case "storage/canceled":
                        break;
                    case "storage/unknown":
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const { title, desc } = formData;
                    if (!updateId) {
                        //crate new news
                        createNewContent(title, desc, downloadURL, setShowAlert, dispatch);
                    } else {
                        //update news
                        updatePrevContent(
                            updateId,
                            title,
                            desc,
                            downloadURL,
                            setShowAlert,
                            dispatch
                        );
                    }
                });
            }
        );
    } else {
        setShowAlert({
            msg: "please provide all info",
            color: "warning",
        });
    }
};

//crate new news function
const createNewContent = (
    title: string,
    desc: string,
    contentURL: string,
    setShowAlert: any,
    dispatch: any
) => {
    if (title && desc && contentURL) {
        const newsData = {
            title,
            desc,
            contentURL,
        };
        dispatch(createContent(newsData)).then(() => {
            setShowAlert({
                msg: "Content Added",
                color: "success",
            });
        });
    } else {
        setShowAlert({
            msg: "please provide all info",
            color: "warning",
        });
    }
};

//update news fuction.
const updatePrevContent = (
    updateId: any,
    title: string,
    desc: string,
    contentURL: string,
    setShowAlert: any,
    dispatch: any
) => {
    // updateId holds the news id we want to update
    if (title && desc && contentURL) {
        type NewContentDataType = {
            title: string;
            desc: string;
            contentURL: string;
        };
        const NewContentData: NewContentDataType = {
            title,
            desc,
            contentURL,
        };
        dispatch(
            updateContent({
                id: updateId,
                NewContentData,
            })
        ).then(() => {
            setShowAlert({
                msg: "Content Updated",
                color: "success",
            });
        });
    } else {
        setShowAlert({
            msg: "please provide all info",
            color: "warning",
        });
    }
};

export default handleSubmit;
