import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUser: null,
    isModalOpen: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        selectUser: (state, action) => {
            state.selectedUser = action.payload;
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
    },
});

export const { selectUser, closeModal } = userSlice.actions;
export default userSlice.reducer;