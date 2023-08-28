import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import genresService from "../../../services/genres-service";

const genresInitialState = {
    genresToManage: [],
    loadingStatus: 'idle',
    currentRequestId: undefined,
    error: null
}

export const getAllGenresAsyncThunk = createAsyncThunk(
    "genres/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const allGenres = await genresService.getAllGenresAsync();
            return allGenres;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllGenresWithDeletedAsyncThunk = createAsyncThunk(
    "genres/getAllWithDeleted",
    async (_, { rejectWithValue }) => {
        try {
            const allGenresWithDeleted = await genresService.getAllGenresWithDeletedAsync();
            return allGenresWithDeleted;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getGenreByIdAsyncThunk = createAsyncThunk(
    "genres/getById",
    async ({ id }, { rejectWithValue }) => {
        try {
            const genreById = await genresService.getGenreByIdAsync(id);
            return genreById;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const createGenreAsyncThunk = createAsyncThunk(
    "genres/create",
    async ({ genreToCreate }, { rejectWithValue }) => {
        try {
            await genresService.createGenreAsync(genreToCreate);
            return genreToCreate;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const updateGenreAsyncThunk = createAsyncThunk(
    "genres/update",
    async ({ genreToUpdateId, updateGenreData }, { rejectWithValue }) => {
        try {
            await genresService.updateGenreAsync(genreToUpdateId, updateGenreData);
            return { id: genreToUpdateId, ...updateGenreData };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const softDeleteGenreAsyncThunk = createAsyncThunk(
    "genres/softDelete",
    async ({ genreToSoftDeleteId, softDeleteGenreData }, { rejectWithValue }) => {
        try {
            await genresService.softDeleteGenreAsync(genreToSoftDeleteId, softDeleteGenreData);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const hardDeleteGenreAsyncThunk = createAsyncThunk(
    "genres/hardDelete",
    async ({ genreToHardDeleteId }, { rejectWithValue }) => {
        try {
            await genresService.hardDeleteGenreAsync(genreToHardDeleteId);
            return genreToHardDeleteId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const genresSlice = createSlice({
    name: "genres",
    initialState: genresInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllGenresAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getAllGenresAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.genresToManage = [...action.payload];
                }
            })
            .addCase(getAllGenresAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(getAllGenresWithDeletedAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getAllGenresWithDeletedAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(getAllGenresWithDeletedAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(getGenreByIdAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getGenreByIdAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    return action.payload;
                }
            })
            .addCase(getGenreByIdAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(createGenreAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(createGenreAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.genresToManage.push(action.payload);
                }
            })
            .addCase(createGenreAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(updateGenreAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(updateGenreAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    const { id, ...genreToSplice } = action.payload;
                    const genreToSpliceIndex = state.genresToManage.findIndex(genre => genre.id === id);
                    state.genresToManage.splice(genreToSpliceIndex, 1, genreToSplice);
                }
            })
            .addCase(updateGenreAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(softDeleteGenreAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(softDeleteGenreAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pendng' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                }
            })
            .addCase(softDeleteGenreAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(hardDeleteGenreAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(hardDeleteGenreAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    const { id } = action.payload;
                    state.genresToManage = state.genresToManage.filter(genre => genre.id === id);
                }
            })
            .addCase(hardDeleteGenreAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
    }
})

export default genresSlice.reducer;