import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fieldsService from "../../../services/fields-service";

const fieldsInitialState = {
    fields: [],
    error: undefined,
    loading: false
}

export const getAllFieldsAsyncThunk = createAsyncThunk(
    "fields/getAll",
    async () => {
        const allFields = await fieldsService.getAllFieldsAsync();
        return allFields;
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
    extraReducers: {
        [getAllFieldsAsyncThunk.fulfilled]: (_, action) => {
            console.log('action', action);
            return [...action.payload];
        },
        [getFieldByIdAsyncThunk.fulfilled]: (state, action) => {
            console.log('action', action);
            return state[action.payload.id];
        },
        [createFieldAsyncThunk.fulfilled]: (state, action) => {
            console.log('action', action);
            state.push(action.payload);
        }
    }
});

export default fieldsSlice.reducer;


