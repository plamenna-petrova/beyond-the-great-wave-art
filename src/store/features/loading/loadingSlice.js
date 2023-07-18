import { createSlice } from "@reduxjs/toolkit"

const loadingState = {
    isLoadingSpinnerActive: false
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: loadingState,
    reducers: {
        setLoadingSpinner: (state, action) => {
            const isLoading = action.payload;
            state.isLoadingSpinnerActive = isLoading;
        }
    }
})

export const { setLoadingSpinner } = loadingSlice.actions;

export default loadingSlice.reducer
