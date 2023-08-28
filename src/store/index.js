
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice';
import loadingReducer from './features/loading/loadingSlice';
import fieldsReducer from './features/fields/fieldsSlice';
import genresReducer from './features/genres/genresSlice';
import nationalitiesReducer from './features/nationalities/nationalitiesSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        loading: loadingReducer,
        fields: fieldsReducer,
        genres: genresReducer,
        nationalities: nationalitiesReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});
