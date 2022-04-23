import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
//auth reducer
import authReducer from "../features/auth/authSlice";
//contnet reducer
import contentReducer from "../features/content/contentSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
