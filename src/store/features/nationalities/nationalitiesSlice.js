import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import nationalitiesService from "../../../services/nationalities-service";

const nationalitiesInitialState = {
    nationalitiesToManage: [],
    loadingStatus: 'idle',
    currentRequestId: undefined,
    error: null
}

export const getAllNationalitiesAsyncThunk = createAsyncThunk(
    "nationalities/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const allNationalities = await nationalitiesService.getAllNationalitiesAsync();
            return allNationalities;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getAllNationalitiesWithDeletedAsyncThunk = createAsyncThunk(
    "nationalities/getAllWithDeleted",
    async (_, { rejectWithValue }) => {
        try {
            const allNationalitiesWithDeleted = await nationalitiesService.getAllNationalitiesWithDeletedAsync();
            return allNationalitiesWithDeleted;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getNationalityByIdAsyncThunk = createAsyncThunk(
    "nationalities/getById",
    async ({ id }, { rejectWithValue }) => {
        try {
            const nationalityById = await nationalitiesService.getNationalityByIdAsync(id);
            return nationalityById;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const createNationalityAsyncThunk = createAsyncThunk(
    "nationalities/create",
    async ({ nationalityToCreate }, { rejectWithValue }) => {
        try {
            await nationalitiesService.createNationalityAsync(nationalityToCreate);
            return nationalityToCreate;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const updateNationalityAsyncThunk = createAsyncThunk(
    "nationalities/update",
    async ({ nationalityToUpdateId, updateNationalityData }, { rejectWithValue }) => {
        try {
            await nationalitiesService.updateNationalityAsync(nationalityToUpdateId, updateNationalityData);
            return { id: nationalityToUpdateId, ...updateNationalityData };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const softDeleteNationalityAsyncThunk = createAsyncThunk(
    "nationalities/softDelete",
    async ({ nationalityToSoftDeleteId, softDeleteNationalityData }, { rejectWithValue }) => {
        try {
            await nationalitiesService.softDeleteNationalityAsync(nationalityToSoftDeleteId, softDeleteNationalityData);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const hardDeleteNationalityAsyncThunk = createAsyncThunk(
    "nationalities/hardDelete",
    async ({ nationalityToHardDeleteId }, { rejectWithValue }) => {
        try {
            await nationalitiesService.hardDeleteNationalityAsync(nationalityToHardDeleteId);
            return nationalityToHardDeleteId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const nationalitiesSlice = createSlice({
    name: "nationalities",
    initialState: nationalitiesInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllNationalitiesAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getAllNationalitiesAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.nationalitiesToManage = [...action.payload];
                }
            })
            .addCase(getAllNationalitiesAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(getAllNationalitiesWithDeletedAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getAllNationalitiesWithDeletedAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.nationalitiesToManage = [...action.payload];
                }
            })
            .addCase(getAllNationalitiesWithDeletedAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(getNationalityByIdAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getNationalityByIdAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    return action.payload;
                }
            })
            .addCase(getNationalityByIdAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(createNationalityAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(createNationalityAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.nationalitiesToManage.push(action.payload);
                }
            })
            .addCase(createNationalityAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(updateNationalityAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(updateNationalityAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    const { id, ...nationalityToSplice } = action.payload;
                    const nationalityToSpliceIndex = state.nationalitiesToManage
                        .findIndex(nationality => nationality.id === id);
                    state.nationalitiesToManage.splice(nationalityToSpliceIndex, 1, nationalityToSplice);
                }
            })
            .addCase(updateNationalityAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(softDeleteNationalityAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                } 
            })
            .addCase(softDeleteNationalityAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                }
            })
            .addCase(softDeleteNationalityAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(hardDeleteNationalityAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(hardDeleteNationalityAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    const { id } = action.payload;
                    state.nationalitiesToManage = state.nationalitiesToManage
                        .filter(nationality => nationality.id === id);
                }
            })
            .addCase(hardDeleteNationalityAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
    }
})

export default nationalitiesSlice.reducer;