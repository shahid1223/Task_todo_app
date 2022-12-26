import { configureStore } from '@reduxjs/toolkit';
import detailsSlice from './details/detailsSlice';
import todoSlice from './todo/todoSlice';

const store = configureStore({
    reducer: {
        detail: detailsSlice,
        todo: todoSlice
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store