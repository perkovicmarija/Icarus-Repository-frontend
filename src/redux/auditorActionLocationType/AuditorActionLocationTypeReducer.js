import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locationTypes: []
}

const auditorActionLocationTypeSlice = createSlice({
    name: 'auditorActionLocationType',
    initialState: initialState,
    reducers: {
        getLocationTypes() {},
        setLocationTypes(state, action) {
            state.locationTypes = action.locationTypes;
        }
    }
});

export const auditorActionLocationType = auditorActionLocationTypeSlice.actions;
export default auditorActionLocationTypeSlice.reducer;