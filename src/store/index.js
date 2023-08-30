
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice';
import loadingReducer from './features/loading/loadingSlice';
import fieldsReducer from './features/fields/fieldsSlice';
import genresReducer from './features/genres/genresSlice';
import artMovementsReducer from './features/art-movements/artMovementsSlice';
import nationalitiesReducer from './features/nationalities/nationalitiesSlice';
import centuriesReducer from './features/centuries/centuriesSlice';
import stylesReducer from './features/styles/stylesSlice';
import mediaReducer from './features/media/mediaSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        loading: loadingReducer,
        fields: fieldsReducer,
        artMovements: artMovementsReducer,
        genres: genresReducer,
        nationalities: nationalitiesReducer,
        centuries: centuriesReducer,
        styles: stylesReducer,
        media: mediaReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});
