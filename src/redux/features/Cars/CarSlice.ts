import { createSlice } from "@reduxjs/toolkit";

const initialState={
    types:'',
    minPrice:'',
    maxPrice:'',
    isElectric:'',
    setCars:[]

    
}

const carSlice = createSlice({
    name:'car',
    initialState,
    reducers:{
        setType(state, action) {
            state.types = action.payload;
        },
        setMinPrice(state, action) {
            state.minPrice = action.payload;
        },
        setMaxPrice(state, action) {
            state.maxPrice = action.payload;
        },
        setIsElectric(state, action) {
            state.isElectric = action.payload;
        },
        resetFilters(state) {
            state.types = '';
            state.minPrice = '';
            state.maxPrice = '';
            state.isElectric = '';
        },
        setCars(state, action){
            state.setCars = action.payload;
        }
    }
})

export const { setType, setMinPrice, setMaxPrice, setIsElectric, resetFilters,setCars } = carSlice.actions;

export default carSlice.reducer;