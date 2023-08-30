import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import stylesService from "../../../services/styles-service";

const stylesInitialState = {
    stylesToManage: [],
    loadingStatus: 'idle',
    currentRequestId: undefined,
    error: null
}

export const getAllStylesAsyncThunk = createAsyncThunk(
    "styles/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const allStyles = await stylesService.getAllStylesAsync();
            return allStyles;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getAllStylesWithDeletedAsyncThunk = createAsyncThunk(
    "styles/getAllWithDeleted",
    async (_, { rejectWithValue }) => {
        try {
            const allStylesWithDeleted = await stylesService.getAllStylesWithDeletedAsync();
            return allStylesWithDeleted;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getStyleByIdAsyncThunk = createAsyncThunk(
    "styles/getById",
    async ({ id }, { rejectWithValue }) => {
        try {
            const styleById = await stylesService.getStyleByIdAsync(id);
            return styleById;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const createStyleAsyncThunk = createAsyncThunk(
    "styles/create",
    async ({ styleToCreate }, { rejectWithValue }) => {
        try {
            await stylesService.createStyleAsync(styleToCreate);
            return styleToCreate;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const updateStyleAsyncThunk = createAsyncThunk(
    "styles/update",
    async ({ styleToUpdateId, updateStyleData }, { rejectWithValue }) => {
        try {   
            await stylesService.updateStyleAsync(styleToUpdateId, updateStyleData);
            return { id: styleToUpdateId, ...updateStyleData };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const softDeleteStyleAsyncThunk = createAsyncThunk(
    "styles/softDelete",
    async ({ styleToSoftDeleteId, softDeleteStyleData }, { rejectWithValue }) => {
        try {
            await stylesService.softDeleteStyleAsync(styleToSoftDeleteId, softDeleteStyleData);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const hardDeleteStyleAsyncThunk = createAsyncThunk(
    "styles/hardDelete",
    async ({ styleToHardDeleteId }, { rejectWithValue }) => {
        try {
            await stylesService.hardDeleteStyleAsync(styleToHardDeleteId);
            return styleToHardDeleteId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const stylesSlice = createSlice({
    name: "styles",
    initialState: stylesInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllStylesAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getAllStylesAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.stylesToManage = [...action.payload];
                }
            })
            .addCase(getAllStylesAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(getAllStylesWithDeletedAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getAllStylesWithDeletedAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.stylesToManage = [...action.payload];
                }
            })
            .addCase(getAllStylesWithDeletedAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(getStyleByIdAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getStyleByIdAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    return action.payload;
                }
            })
            .addCase(getStyleByIdAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(createStyleAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(createStyleAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    state.stylesToManage.push(action.payload);
                }
            })
            .addCase(createStyleAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(updateStyleAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(updateStyleAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    const { id, ...styleToSplice } = action.payload;
                    const styleToSpliceIndex = state.stylesToManage.findIndex(style => style.id === id);
                    state.stylesToManage.splice(styleToSpliceIndex, 1, styleToSplice);
                }
            })
            .addCase(updateStyleAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(softDeleteStyleAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(softDeleteStyleAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                }
            })
            .addCase(softDeleteStyleAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(hardDeleteStyleAsyncThunk.pending, (state, action) => {
                if (state.loadingStatus === 'idle') {
                    state.loadingStatus = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(hardDeleteStyleAsyncThunk.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.currentRequestId = undefined;
                    const {id } = action.payload;
                    state.stylesToManage = state.stylesToManage.filter(style => style.id !== id);
                }
            })
            .addCase(hardDeleteStyleAsyncThunk.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loadingStatus === 'pending' && state.currentRequestId === requestId) {
                    state.loadingStatus = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            })
    }
})

export default stylesSlice.reducer;