import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import contentService from "./contentService";

//type of content data
type ContentDataType = {
  title: string;
  contentURL: string;
  desc: string;
};

//initial state
const initialState: {
  myContentList: ContentDataType[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
} = {
  myContentList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//create new content
export const createContent = createAsyncThunk(
  "content/create",
  async (contentData: ContentDataType, thunkAPI: any) => {
    try {
      //get the token for user ..
      const token = thunkAPI.getState().auth.user.token;
      //create a new content by using the token..
      return await contentService.createContent(contentData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get single content details
export const getSingleContentData = createAsyncThunk(
  "content/getSingleContentData",
  async (id: string, thunkAPI: any) => {
    try {
      //get the token for user ..
      const token = thunkAPI.getState().auth.user.token;
      //get the single conent details...
      return await contentService.getSingleContentData(id, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get the content list that only i have created
export const getMyContentList = createAsyncThunk(
  "content/getMyContentList",
  async (_, thunkAPI: any) => {
    try {
      //get the token for user ..
      const token = thunkAPI.getState().auth.user.token;
      //get content list by using the token..
      return await contentService.getMyContentList(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//data type of content to update
type updateContentDataType = {
  id: string;
  NewContentData: object;
};
//update the content
export const updateContent = createAsyncThunk(
  "content/update",
  async (data: updateContentDataType, thunkAPI: any) => {
    try {
      let { id, NewContentData } = data;
      //get the token for user ..
      const token = thunkAPI.getState().auth.user.token;
      //update content details by using the token..
      return await contentService.updateContent(id, NewContentData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//delete content
export const deleteContent = createAsyncThunk(
  "content/delete",
  async (id: string, thunkAPI: any) => {
    try {
      //get the token for user ..
      const token = thunkAPI.getState().auth.user.token;
      //delete the content by using the token..
      return await contentService.deleteContent(id, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//export manage content slice
export const manageContentSlice = createSlice({
  name: "manageContent",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContent.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(createContent.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myContentList.push(action.payload);
      })
      .addCase(createContent.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyContentList.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getMyContentList.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myContentList = action.payload;
      })
      .addCase(getMyContentList.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateContent.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateContent.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myContentList = state.myContentList.filter((content: any) => {
          if (content._id === action.payload.id) {
            return action.payload.data;
          }
        });
      })
      .addCase(updateContent.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteContent.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteContent.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myContentList = state.myContentList.filter(
          (content: any) => content._id !== action.payload.id
        );
      })
      .addCase(deleteContent.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

//export reset func
export const { reset } = manageContentSlice.actions;

//export manage news slice reducer
export default manageContentSlice.reducer;
