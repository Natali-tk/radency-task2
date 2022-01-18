import rootReducer from './notesSlicers';
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer:rootReducer,
});
export default store;


