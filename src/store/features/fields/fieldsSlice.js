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
            const allFields = await fieldsService.getAllFieldsAsync();
            return allFields;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getAllFieldsWithDeletedAsyncThunk = createAsyncThunk(
    "fields/getAllWithDeleted",
    async (_, { rejectWithValue }) => {
        try {
            const allFieldsWithDeleted = await fieldsService.getAllFieldsWithDeletedAsync();
            return allFieldsWithDeleted;
        } catch (error) {
            return rejectWithValue(error.repsonse.data);
        }
    }
)

export const getFieldByIdAsyncThunk = createAsyncThunk(
    "fields/getById",
    async ({ id }, { rejectWithValue }) => {
        try {
            const fieldById = await fieldsService.getFieldByIdAsync(id);
            return fieldById;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const createFieldAsyncThunk = createAsyncThunk(
    "fields/create",
    async ({ fieldToCreate }, { rejectWithValue }) => {
        try {
            await fieldsService.createFieldAsync(fieldToCreate);
            return fieldToCreate;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const updateFieldAsyncThunk = createAsyncThunk(
    "fields/update",
    async ({ fieldToUpdateId, updateFieldData }, { rejectWithValue }) => {
        try {
            await fieldsService.updateFieldAsync(fieldToUpdateId, updateFieldData);
            return { id: fieldToUpdateId, ...updateFieldData };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const softDeleteFieldAsyncThunk = createAsyncThunk(
    "fields/softDelete",
    async ({ fieldToSoftDeleteId, softDeleteFieldData }, { rejectWithValue }) => {
        try {
            await fieldsService.softDeleteFieldAsync(fieldToSoftDeleteId, softDeleteFieldData);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const hardDeleteFieldAsyncThunk = createAsyncThunk(
    "fields/hardDelete",
    async ({ fieldToHardDeleteId }, { rejectWithValue }) => {
        try {
            await fieldsService.hardDeleteFieldAsync(fieldToHardDeleteId);
            return fieldToHardDeleteId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

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
            .addCase(getAllFieldsWithDeletedAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getAllFieldsWithDeletedAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.fieldsToManage = [...action.payload];
                }
            })
            .addCase(getAllFieldsWithDeletedAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(getFieldByIdAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getFieldByIdAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    return action.payload;
                }
            })
            .addCase(getFieldByIdAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(createFieldAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(createFieldAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.fieldsToManage.push(action.payload);
                }
            })
            .addCase(createFieldAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(updateFieldAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(updateFieldAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    const { id, ...fieldToSplice } = action.payload;
                    const fieldToSpliceIndex = state.fieldsToManage.findIndex(field => field.id === id);
                    state.fieldsToManage.splice(fieldToSpliceIndex, 1, fieldToSplice);
                }
            })
            .addCase(updateFieldAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(softDeleteFieldAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(softDeleteFieldAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                }
            })
            .addCase(softDeleteFieldAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(hardDeleteFieldAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(hardDeleteFieldAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    const { id } = action.payload;
                    state.fieldsToManage = state.fieldsToManage.filter(field => field.id !== id);
                }
            })
            .addCase(hardDeleteFieldAsyncThunk.rejected, (state, action) => {
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