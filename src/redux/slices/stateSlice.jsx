import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

export const addState = createAsyncThunk(
  "state/add",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/state/add`, payload);
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to add state";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchStates = createAsyncThunk(
  "state/list",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/state/list`, payload);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch states";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getStateById = createAsyncThunk(
  "state/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/state/${id}`);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch state";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateState = createAsyncThunk(
  "state/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put( `/state/update/${id}`, payload);
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update state";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteState = createAsyncThunk(
  "state/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/state/delete/${id}`);
      toast.success(res.data.message);
      return id;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete state";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);


const stateSlice = createSlice({
  name: "state",
  initialState: {
    loading: false,
    states: [],
    singleState: null,
    totalRecords: 0,
    error: null,
  },
  reducers: {
    clearSingleState: (state) => {
      state.singleState = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ADD */
      .addCase(addState.pending, (state) => {
        state.loading = true;
      })
      .addCase(addState.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* LIST */
      .addCase(fetchStates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload.data;
        state.totalRecords = action.payload.totalRecords;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET BY ID */
      .addCase(getStateById.fulfilled, (state, action) => {
        state.singleState = action.payload.data;
      })

      /* UPDATE */
      .addCase(updateState.fulfilled, (state) => {
        state.loading = false;
      })

      /* DELETE */
      .addCase(deleteState.fulfilled, (state, action) => {
        state.states = state.states.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export const { clearSingleState } = stateSlice.actions;
export default stateSlice.reducer;