import { createSlice } from "@reduxjs/toolkit"


const init = {
    user:{},
    isAuth:false,

}
const userSlice = createSlice({
    name:'user',
    initialState:init,
    reducers:{
        saveUser(state,action){
            const user = action.payload
            state.user = {...user}
            state.isAuth = true
        },
        forgetUser(state,action){
            state.isAuth = false
            state.user = {}
        },
        
    }
})

export const userActons = userSlice.actions;
export default userSlice;