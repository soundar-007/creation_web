// store/userSlice.js
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { redirect } from "next/navigation";

export interface UserState {
  userId: string | null;
  username: string | null;
  email: string | null;
  avatarUrl: string | null;
}

const initialState: UserState = {
  userId: null,
  username: null,
  email: null,
  avatarUrl: null,
};
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { dispatch }) => {
    try {
      await axios.post(
        "https://creation-web.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatarUrl = action.payload.avatarUrl;
    },
    setProfile: (state, action: PayloadAction<{ avatarUrl: string }>) => {
      state.avatarUrl = action.payload.avatarUrl;
    },
    logout: (state) => {
      state.userId = null;
      state.username = null;
      state.email = null;
      state.avatarUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      console.log("User logged out successfully");
    });
  },
});

export const { setUser, logout, setProfile } = userSlice.actions;

export default userSlice.reducer;
