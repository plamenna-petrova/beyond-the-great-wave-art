import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import mediaService from "../../../services/media-service";

const mediaInitialState = {
    mediaToManage: [],
    loadingStatus: 'idle',
    currentRequestId: undefined,
    error: null
}

export const getAllMediaAsyncThunk = createAsyncThunk(
    "media/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const allMedia = await mediaService.getAllMediaAsync();
            return allMedia;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getAllMediaWithDeletedAsyncThunk = createAsyncThunk(
    "media/getAllWithDeleted",
    async (_, { rejectWithValue }) => {
        try {
            const allMediaWithDeleted = await mediaService.getAllMediaWithDeletedAsync();
            return allMediaWithDeleted;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getMediumByIdAsyncThunk = createAsyncThunk(
    "media/getById",
    async ({ id }, { rejectWithValue }) => {
        try {
            const mediumById = await mediaService.getMediumByIdAsync(id);
            return mediumById;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const createMediumAsyncThunk = createAsyncThunk(
    "media/create",
    async ({ mediumToCreate }, { rejectWithValue }) => {
        try {
            await mediaService.createMediumAsync(mediumToCreate);
            return mediumToCreate;
        } catch (error) {   
            return rejectWithValue(error.response.data);
        }
    }
)

export const updateMediumAsyncThunk = createAsyncThunk(
    "media/update",
    async ({ mediumToUpdateId, updateMediumData }, { rejectWithValue }) => {
        try {
            await mediaService.updateMediumAsync(mediumToUpdateId, updateMediumData);
            return { id: mediumToUpdateId, ...updateMediumData };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const softDeleteMediumAsyncThunk = createAsyncThunk(
    "media/softDelete",
    async ({ mediumToSoftDeleteId, softDeleteMediumData }, { rejectWithValue }) => {
        try {
            await mediaService.softDeleteMediumAsync(mediumToSoftDeleteId, softDeleteMediumData);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const hardDeleteMediumAsyncThunk = createAsyncThunk(
    "media/hardDelete",
    async ({ mediumToHardDeleteId }, { rejectWithValue }) => {
        try {
            await mediaService.hardDeleteMediumAsync(mediumToHardDeleteId);
            return mediumToHardDeleteId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const mediaSlice = createSlice({
    name: "media",
    initialState: mediaInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllMediaAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getAllMediaAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.mediaToManage = [...action.payload];
                }
            })
            .addCase(getAllMediaAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(getAllMediaWithDeletedAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getAllMediaWithDeletedAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.mediaToManage = [...action.payload];
                }
            })
            .addCase(getAllMediaWithDeletedAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(getMediumByIdAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getMediumByIdAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    return action.payload;
                }
            })
            .addCase(getMediumByIdAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(createMediumAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(createMediumAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.mediaToManage.push(action.payload);
                }
            })
            .addCase(createMediumAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(updateMediumAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(updateMediumAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    const { id, ...mediumToSplice } = action.payload;
                    const mediumToSpliceIndex = state.mediaToManage.findIndex(medium => medium.id === id);
                    state.mediaToManage.splice(mediumToSpliceIndex, 1, mediumToSplice);
                }
            })
            .addCase(updateMediumAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(softDeleteMediumAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(softDeleteMediumAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                }
            })
            .addCase(softDeleteMediumAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(hardDeleteMediumAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(hardDeleteMediumAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    const { id } = action.payload;
                    state.mediaToManage = state.mediaToManage.filter(media => media.id !== id);
                }
            })
            .addCase(hardDeleteMediumAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
    }
})

export default mediaSlice.reducer;