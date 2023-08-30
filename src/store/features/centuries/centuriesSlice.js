import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import centuriesService from "../../../services/centuries-service";

const centuriesInitialState = {
    centuriesToManage: [],
    loadingStatus: 'idle',
    currentRequestId: undefined,
    error: null
}

export const getAllCenturiesAsyncThunk = createAsyncThunk(
    "centuries/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const allCenturies = await centuriesService.getAllCenturiesAsync();
            return allCenturies;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getAllCenturiesWithDeletedAsyncThunk = createAsyncThunk(
    "centuries/getAllWithDeleted",
    async (_, { rejectWithValue }) => {
        try {
            const allCenturiesWithDeleted = await centuriesService.getAllCenturiesWithDeletedAsync();
            return allCenturiesWithDeleted;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    } 
)

export const getCenturyByIdAsyncThunk = createAsyncThunk(
    "centuries/getById",
    async ({ id }, { rejectWithValue }) => {
        try {
            const centuryById = await centuriesService.getCenturyByIdAsync(id);
            return centuryById;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const createCenturyAsyncThunk = createAsyncThunk(
    "centurites/create",
    async ({ centuryToCreate }, { rejectWithValue }) => {
        try {
            await centuriesService.createCenturyAsync(centuryToCreate);
            return centuryToCreate;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const updateCenturyAsyncThunk = createAsyncThunk(
    "centuries/update",
    async ({ centuryToUpdateId, updateCenturyData }, { rejectWithValue }) => {
        try {
            await centuriesService.updateCenturyAsync(centuryToUpdateId, updateCenturyData);
            return { id: centuryToUpdateId, ...updateCenturyData };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const softDeleteCenturyAsyncThunk = createAsyncThunk(
    "centuries/softDelete",
    async ({ centuryToSoftDeleteId, softDeleteCenturyData }, { rejectWithValue }) => {
        try {
            await centuriesService.softDeleteCenturyAsync(centuryToSoftDeleteId, softDeleteCenturyData);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const hardDeleteCenturyAsyncThunk = createAsyncThunk(
    "centuries/hardDelete",
    async ({ centuryToHardDeleteId }, { rejectWithValue }) => {
        try {
            await centuriesService.hardDeleteCenturyAsync(centuryToHardDeleteId);
            return centuryToHardDeleteId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const centuriesSlice = createSlice({
    name: "centuries",
    initialState: centuriesInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCenturiesAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getAllCenturiesAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.centuriesToManage = [...action.payload];
                }
            })
            .addCase(getAllCenturiesAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(getAllCenturiesWithDeletedAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pendig';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getAllCenturiesWithDeletedAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.centuriesToManage = [...action.payload];
                } 
            })
            .addCase(getAllCenturiesWithDeletedAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(getCenturyByIdAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getCenturyByIdAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    return action.payload;
                }
            })
            .addCase(getCenturyByIdAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(createCenturyAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(createCenturyAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.centuriesToManage.push(action.payload);
                }
            })
            .addCase(createCenturyAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(updateCenturyAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(updateCenturyAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    const { id, ...centuryToSplice } = action.payload;
                    const centuryToSpliceIndex = state.centuriesToManage.findIndex(century => century.id === id);
                    state.centuriesToManage.splice(centuryToSpliceIndex, 1, centuryToSplice);
                }
            })
            .addCase(updateCenturyAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(softDeleteCenturyAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(softDeleteCenturyAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                }
            })
            .addCase(softDeleteCenturyAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(hardDeleteCenturyAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(hardDeleteCenturyAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    const { id } = action.payload;
                    state.centuriesToManage = state.centuriesToManage.filter(century => century.id !== id);
                }
            })
            .addCase(hardDeleteCenturyAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
    }
})

export default centuriesSlice.reducer;