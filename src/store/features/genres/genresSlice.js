import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import genresService from "../../../services/genres-service";

const genresInitialState = [];

export const getAllGenresAsyncThunk = createAsyncThunk(
    "genres/getAll",
    async() => {
        const allGenres = await genresService.getAllGenresAsync();
        return allGenres;
    }
);

export const getGenreByIdAsyncThunk = createAsyncThunk(
    "genres/getById",
    async (id) => {
        const genreById = await genresService.getGenreByIdAsync(id);
        return genreById;
    }
);

export const createGenreAsyncThunk = createAsyncThunk(
    "genres/create",
    async (genreToCreate) => {
        const createdGenre = await genresService.createGenreAsync(genreToCreate);
        return createdGenre;
    }
);

const genresSlice = createSlice({
    name: "genres",
    initialState: genresInitialState,
    extraReducers: {
        [getAllGenresAsyncThunk.fulfilled]: (_, action) => {
            console.log('action', action);
            return [...action.payload];
        },
        [getGenreByIdAsyncThunk.fulfilled]: (state, action) => {
            console.log('action', action);
            return state[action.payload.id];
        },
        [createGenreAsyncThunk.fulfilled]: (state, action) => {
            console.log('action', action);
            state.push(action.payload);
        }
    }
});

export default genresSlice.reducer;