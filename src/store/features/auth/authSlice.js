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
            const userPayload = action.payload;
            console.log('user paylod');
            console.log(userPayload);
            if (userPayload.currentUser) {
                state.currentUser = userPayload.currentUser;
                const { accessToken, refreshToken } = userPayload.currentUser;
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