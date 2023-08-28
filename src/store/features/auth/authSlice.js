import { createSlice } from "@reduxjs/toolkit"
import { removeItemFromLocalStorage, setItemToLocalStorage } from "../../../services/local-storage-service";

const authInitialState = {
    currentUser: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        authenticateUser: (state, action) => {
            const { currentUser: userToSet } = action.payload;         
            if (userToSet) {
                state.currentUser = userToSet;
                const { accessToken, refreshToken } = userToSet;
                setItemToLocalStorage("accessToken", accessToken);
                setItemToLocalStorage("refreshToken", refreshToken);
            }
            else {
                state.currentUser = null;
                removeItemFromLocalStorage("accessToken");
                removeItemFromLocalStorage("refreshToken");
            }
        }
    }
})

export const { authenticateUser } = authSlice.actions;

export default authSlice.reducer