
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   searchQuery: "", // Initial search query
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        // Action to update search state
        setSearchState: (state, action) => {
            const { searchQuery } = action.payload;
            state.searchQuery = searchQuery;
            
        }
    }
});

// Export action
export const { setSearchState } = searchSlice.actions;

export default searchSlice.reducer;
