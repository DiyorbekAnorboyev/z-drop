import { InsertPhoto } from "@mui/icons-material";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setPhotoDisplay } from "../Slices/photodisplay/photoSlice";
import db from "../firebase/firebase";
import { storage } from "../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";

import { ref, deleteObject, getDownloadURL } from "firebase/storage";

function FileList({ img, title, id }) {
  const dispatch = useDispatch();

  const PhotoSelector = () => {
    dispatch(setPhotoDisplay({ photo: img, title: title }));
  };

  const handleImageDelete = async (folderId) => {
    try {
      const folderDocRef = doc(db, "post", folderId);
      await deleteDoc(folderDocRef);

      console.log("Successfully deleted folder from Firestore");
      const folderStorageRef = ref(storage, `post/${folderId}`);
      await deleteObject(folderStorageRef);
      console.log("Successfully deleted folder from Firebase Storage");
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const downloadUrlRef = useRef(null);

  const handleButtonClick = async (fileId) => {
    const filePath = `post/${fileId}/image`;
    const fileRef = ref(storage, filePath);

    try {
      const url = await getDownloadURL(fileRef);
      downloadUrlRef.current.value = url;
      downloadUrlRef.current.select();
      document.execCommand("copy");
      console.log("Download URL copied:", url);
    } catch (error) {
      console.error("Error getting download URL:", error);
    }
  };

  return (
    <Container>
      <PhotoContainer onClick={PhotoSelector}>
        <img src={img} alt="" />
      </PhotoContainer>
      <PhotoTitle>
        <div className="w-100 d-flex justify-content-space-between">
          <div className="w-75">
            <InsertPhoto />
            <span>{title}</span>
          </div>
          <div className="w-100 d-flex gap-1">
            <div>
              <button className="btn btn-success" onClick={() => handleButtonClick(id)}>
                Copy
              </button>
              <input
                ref={downloadUrlRef}
                type="text"
                readOnly
                style={{ position: "absolute", left: "-9999px" }}
              />
            </div>
            <button
              className="btn btn-outline-danger"
              onClick={() => handleImageDelete(id)}
            >
              delete{" "}
            </button>
          </div>
        </div>
      </PhotoTitle>
    </Container>
  );
}

export default FileList;

const Container = styled.div`
  max-width: 300px;
  max-height: 400px;
  height: 209px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  margin: 10px 0;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 /0.1);
`;

const PhotoContainer = styled.div`
  height: 60%;
  width: 100%;
  background-color: lightgray;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;

  img {
    height: 100%;
    width: 100%;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    object-fit: contain;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const PhotoTitle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 10px;
  svg {
    color: #70b5f9;
  }

  span {
    color: rgba(0, 0, 0, 0.72);
    margin-left: 28px;
    padding-bottom: 4px;
    font-size: 13px;
    font-weight: 600;
  }
`;
