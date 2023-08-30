import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import artMovementsService from "../../../services/art-movements-service";

const artMovementsInitialState = {
    artMovementsToManage: [],
    loadingStatus: 'idle',
    currentRequestId: undefined,
    error: null
}

export const getAllArtMovementsAsyncThunk = createAsyncThunk(
    "artMovements/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const allArtMovements = await artMovementsService.getAllArtMovementsAsync();
            return allArtMovements;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getAllArtMovementsWithDeletedAsyncThunk = createAsyncThunk(
    "artMovements/getAllWithDeleted",
    async (_, { rejectWithValue }) => {
        try {
            const allArtMovementsWithDeleted = await artMovementsService.getAllArtMovementWithDeletedAsync();
            return allArtMovementsWithDeleted;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getArtMovementByIdAsyncThunk = createAsyncThunk(
    "artMovements/getById",
    async ({ id }, { rejectWithValue }) => {
        try {
            const artMovementById = await artMovementsService.getArtMovementByIdAsync(id);
            return artMovementById;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const createArtMovementAsyncThunk = createAsyncThunk(
    "artMovements/create",
    async ({ artMovementToCreate }, { rejectWithValue }) => {
        try {
            await artMovementsService.createArtMovementAsync(artMovementToCreate);
            return artMovementToCreate;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const updateArtMovementAsyncThunk = createAsyncThunk(
    "artMovements/update",
    async ({ artMovementToUpdateId, updateArtMovementData }, { rejectWithValue }) => {
        try {
            await artMovementsService.updateArtMovementAsync(artMovementToUpdateId, updateArtMovementData);
            return { id: artMovementToUpdateId, ...updateArtMovementData };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const softDeleteArtMovementAsyncThunk = createAsyncThunk(
    "artMovements/softDelete",
    async ({ artMovementToSoftDeleteId, softDeleteArtMovementData }, { rejectWithValue }) => {
        try {
            await artMovementsService.softDeleteArtMovementAsync(artMovementToSoftDeleteId, softDeleteArtMovementData);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const hardDeleteArtMovementAsyncThunk = createAsyncThunk(
    "artMovements/hardDelete",
    async ({ artMovementToHardDeleteId }, { rejectWithValue }) => {
        try {
            await artMovementsService.hardDeleteArtMovementAsync(artMovementToHardDeleteId);
            return artMovementToHardDeleteId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const artMovementsSlice = createSlice({
    name: "artMovements",
    initialState: artMovementsInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllArtMovementsAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getAllArtMovementsAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.artMovementsToManage = [...action.payload];
                }
            })
            .addCase(getAllArtMovementsAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(getAllArtMovementsWithDeletedAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getAllArtMovementsWithDeletedAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.artMovementsToManage = [...action.payload];
                }
            })
            .addCase(getAllArtMovementsWithDeletedAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(getArtMovementByIdAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getArtMovementByIdAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    return action.payload;
                }
            })
            .addCase(getArtMovementByIdAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(createArtMovementAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(createArtMovementAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.artMovementsToManage.push(action.payload);
                }
            })
            .addCase(createArtMovementAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(updateArtMovementAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(updateArtMovementAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    const { id, ...artMovementToSplice } = action.payload;
                    const artMovementToSpliceIndex = state.artMovementsToManage
                        .findIndex(artMovement => artMovement.id === id);
                    state.artMovementsToManage.splice(artMovementToSpliceIndex, 1, artMovementToSplice);
                }
            })
            .addCase(updateArtMovementAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(softDeleteArtMovementAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(softDeleteArtMovementAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                }
            })
            .addCase(softDeleteArtMovementAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(hardDeleteArtMovementAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(hardDeleteArtMovementAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    const { id } = action.payload;
                    state.artMovementsToManage = state.artMovementsToManage
                        .filter(artMovement => artMovement.id !== id); 
                }
            })
            .addCase(hardDeleteArtMovementAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
    }
})

export default artMovementsSlice.reducer;