import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice'
import plaintSlice from './plaintSlice';


const store = configureStore({
    reducer:{
        user:userSlice.reducer,
        plaint:plaintSlice.reducer
    }
})

export default store ;

