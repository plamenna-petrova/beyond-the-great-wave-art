
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice'; 
import loadingReducer from './features/loading/loadingSlice';
import fieldsReducer from './features/fields/fieldsSlice';
import genresReducer from './features/genres/genresSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        loading: loadingReducer,
        fields: fieldsReducer,
        genres: genresReducer
    }
});
