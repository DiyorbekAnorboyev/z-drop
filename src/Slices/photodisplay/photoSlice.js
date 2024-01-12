import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photo: null,
  title: null,
};

const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setPhotoDisplay: (state, action) => {
      state.title = action.payload.title;
      state.photo = action.payload.photo;
    },
    deleteFolder: (state, action) => {
      return state.filter((folder) => folder.id !== action.payload);
    },
  },
});

export const { setPhotoDisplay, deleteFolder } = photoSlice.actions;

export const selectPhotoDisplay = (state) => state.photos.photo;
export const selectTitleDisplay = (state) => state.photos.title;

export default photoSlice.reducer;
