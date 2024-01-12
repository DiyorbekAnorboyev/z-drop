import { Folder } from "@mui/icons-material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setFolder } from "../Slices/channel/channelSlice";
import {
  deleteFolder,
  setPhotoDisplay,
} from "../Slices/photodisplay/photoSlice";
import db from "../firebase/firebase";
import { storage } from "../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";

import { ref, deleteObject } from "firebase/storage";

function FileContainer({ title, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SelectChannel = () => {
    if (id) {
      dispatch(setFolder({ folderId: id, folderName: title }));
      navigate(`/folder/${title}/${id}`);
    }
  };

  const handleFolderDelete = async (folderId) => {
    try {
      const folderDocRef = doc(db, "folder", folderId);
      await deleteDoc(folderDocRef);
      console.log("Successfully deleted folder from Firestore");
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  return (
    <>
      <Container>
        <div className="d-flex justify-content-space-between w-100">
          <div onClick={SelectChannel} className="w-100">
            <Folder />
            <span>{title}</span>
          </div>
          <div className="w-100">
            <button className="btn btn-outline-danger"
              onClick={() => {
                handleFolderDelete(id);
              }}
            >
              delete
            </button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default FileContainer;

const Container = styled.div`
  width: 287.5px;
  height: 48px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.35);
  border-radius: 4px;

  svg {
    height: 24px;
    width: 24px;
    color: rgba(95, 99, 104);
    margin-left: 4px;
  }

  span {
    font-size: 13px;
    margin-left: 10px;
    text-transform: capitalize;
  }
`;
