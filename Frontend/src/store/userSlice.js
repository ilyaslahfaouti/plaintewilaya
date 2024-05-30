import { createSlice } from "@reduxjs/toolkit"


const init = {
    user:{},
    isAuth:false,

}
const userSlice = createSlice({
    name:'user',
    initialState:init,
    reducers:{
        attemptLogin(state,action){
            const newUser = action.payload
            state.user = {...newUser}
            state.isAuth = true
        },
        attemptLogout(state,action){
            state.isAuth = false
        },
        
    }
})

export const userActons = userSlice.actions;
export default userSlice;