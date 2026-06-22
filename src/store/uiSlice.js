import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: false,
    addModalOpen: false,
    editModalTask: null,
  },
  reducers: {
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen },
    closeSidebar: (state) => { state.sidebarOpen = false },
    openAddModal: (state) => { state.addModalOpen = true },
    closeAddModal: (state) => { state.addModalOpen = false },
    openEditModal: (state, action) => { state.editModalTask = action.payload },
    closeEditModal: (state) => { state.editModalTask = null },
  },
})

export const { toggleSidebar, closeSidebar, openAddModal, closeAddModal, openEditModal, closeEditModal } = uiSlice.actions
export default uiSlice.reducer
