import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fieldsService from "../../../services/fields-service";

const fieldsInitialState = {
    fieldsToManage: [],
    loadingStatus: 'idle',
    currentRequestId: undefined,
    error: null
}

export const getAllFieldsAsyncThunk = createAsyncThunk(
    "fields/getAll",
    async (_, { rejectWithValue }) => {
        try {
            console.log('fired thunk');
            const allFields = await fieldsService.getAllFieldsAsync();
            return allFields;
        } catch (error) {
            console.log('error');
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const getFieldByIdAsyncThunk = createAsyncThunk(
    "fields/getById",
    async (id) => {
        const fieldById = await fieldsService.getFieldByIdAsync(id);
        return fieldById;
    }
);

export const createFieldAsyncThunk = createAsyncThunk(
    "fields/create",
    async (fieldToCreate) => {
        const createdField = await fieldsService.createFieldAsync(fieldToCreate);
        return createdField;
    }
);

const fieldsSlice = createSlice({
    name: "fields",
    initialState: fieldsInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllFieldsAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getAllFieldsAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.fieldsToManage = [...action.payload];
                }
            })
            .addCase(getAllFieldsAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
    }
});

export default fieldsSlice.reducer;


