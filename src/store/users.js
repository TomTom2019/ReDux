import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// THUNKS WILL HANDLE RESQUEST
// fetchUsers is key
// this code work with extraReducers
export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (thunkAPI) => {
        const res = await axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.data);
        return res;
    }
);

export const userSlice = createSlice({
    name: "users",
    initialState: {
        type: "Guest",
        user: [],
    },
    reducers: {
        setType: (state, action) => {
            state.type = action.payload || "Guest";
        }
    },

    /*YOU CAN DO ONLY FULFILLED IF YOU WANT*/
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.pending,(state)=>{
            console.log('pending')
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            console.log('fulfilled')
            state.user = action.payload
        })
           .addCase(fetchUsers.rejected,(state)=>{
            console.log('rejected')
        })
    }
});

export const { setType } = userSlice.actions;
export default userSlice.reducer;