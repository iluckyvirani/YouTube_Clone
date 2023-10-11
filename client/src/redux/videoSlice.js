import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      if (!state.currentVideo.likes.includes(action.payload)) {
        state.currentVideo.likes.push(action.payload);
        state.currentVideo.dislikes = state.currentVideo.dislikes.filter(
          (userId) => userId !== action.payload
        );
      }
    },
    dislike: (state, action) => {
      if (!state.currentVideo.dislikes.includes(action.payload)) {
        state.currentVideo.dislikes.push(action.payload);
        state.currentVideo.likes = state.currentVideo.likes.filter(
          (userId) => userId !== action.payload
        );
      }
    },
    increaseView: (state) => {
      if (state.currentVideo) {
        state.currentVideo.views += 1;
      }
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  like,
  dislike,
  increaseView,
} = videoSlice.actions;

export default videoSlice.reducer;
