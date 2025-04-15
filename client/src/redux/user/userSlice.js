import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://prime-zone.vercel.app";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/users/${userId}`);
      const data = await response.json();
      // console.log("Fetched User Data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user data");
      }
      return data; // Returns the user data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  properties: [],
  paymentHistory: [],
  pendingPayments: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },

    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    updateUserStart: (state) => {
      state.loading = true;
    },

    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    deleteUserStart: (state) => {
      state.loading = true;
    },

    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },

    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    signOutUserStart: (state) => {
      state.loading = true;
    },

    signoutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },

    signoutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    // Handle user data fetch success
    // builder.addCase(fetchUserData.fulfilled, (state, action) => {
    //   const { properties, paymentHistory, pendingPayments } = action.payload;
    //   state.properties = properties || [];
    //   state.paymentHistory = paymentHistory || [];
    //   state.pendingPayments = pendingPayments || [];
    // });

    // Handle user data fetch failure
    // builder.addCase(fetchUserData.rejected, (state, action) => {
    //   state.error = action.payload;
    //   state.loading = false;
    // });

    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      const { properties, paymentHistory, pendingPayments, ...userInfo } =
        action.payload;

      state.currentUser = userInfo; // ⬅️ this is the fix
      state.properties = properties || [];
      state.paymentHistory = paymentHistory || [];
      state.pendingPayments = pendingPayments || [];
      state.loading = false;
      state.error = null;
    });

    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signoutUserSuccess,
  signoutUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
