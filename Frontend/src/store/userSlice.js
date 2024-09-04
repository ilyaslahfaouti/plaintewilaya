import { createSlice } from "@reduxjs/toolkit"


const init = {
    user:{},
    session_id:null,
    isAuth:false,


}
const userSlice = createSlice({
    name:'user',
    initialState:init,
    reducers:{
        connect(state,action){
            const user = action.payload.user
            state.user = {...user}
            state.session_id = action.payload.session_id
            state.isAuth = true
            
        },
        updateUser(state,action){
            const user = action.payload
            state.user = {...user};
        },
        forgetUser(state,action){
            state.isAuth = false
            state.user = {}
        },
        
    }
})

export const userActons = userSlice.actions;
export default userSlice;