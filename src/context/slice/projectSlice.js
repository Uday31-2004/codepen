import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: [], // Initial state for projects
    loading: false, // Indicates whether projects are being fetched
    error: null
}
export const projectSlice= createSlice({
    name:"project",
    initialState,
    reducers: {
        setProjects: (state, action) => {
            console.log(state);
            state.projects = action.payload
        },
    }
})

export const {setProjects} = projectSlice.actions

export default projectSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
   
// }
// export const projectSlice= createSlice({
//     name:"project",
//     initialState,
//     reducers: {
//         setProject: (state, action) => {
//             console.log(state);
//             state = action.payload
//         },
//     }
// })

// export const {setProject} = projectSlice.actions

// export default projectSlice.reducer;