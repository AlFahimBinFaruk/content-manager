import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//get user from localstorage if it exits.
const user = JSON.parse(localStorage.getItem("user")!);

type UserType = {
  id: String;
  username: String;
  email: String;
  token: any;
};

//initial state
const initialState: {
  user: UserType;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
} = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//register user
export const register = createAsyncThunk(
  "auth/register",
  async (user: object, thunkAPI) => {
    try {
      //pass user to register function from authservice..
      return await authService.register(user);
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

//login user
export const login = createAsyncThunk(
  "auth/login",
  async (user: object, thunkAPI) => {
    try {
      //pass user to login function from authservice..
      return await authService.login(user);
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

//login with google
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (user: object, thunkAPI) => {
    try {
      //pass user to login function from authservice..
      return await authService.loginWithGoogle(user);
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

//updateAccount
export const updateAccount = createAsyncThunk(
  "/auth/updateAccount",
  async (userData: object, thunkAPI: any) => {
    try {
      //pass user to login function from authservice..
      //get the token for user ..
      const token = thunkAPI.getState().auth.user.token;
      return await authService.updateAccount(userData, token);
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

//logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  //call logout function from authService
  authService.logout();
});

//auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(loginWithGoogle.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state: any) => {
        state.user = null;
      })
      .addCase(updateAccount.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateAccount.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateAccount.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

//export auth slice reset function
export const { reset } = authSlice.actions;

//export the auth slice
export default authSlice.reducer;
