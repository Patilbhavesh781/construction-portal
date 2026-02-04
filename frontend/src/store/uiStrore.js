import create from "zustand";

const useUIStore = create((set) => ({
  isSidebarOpen: false,
  isModalOpen: false,
  modalContent: null,
  isLoading: false,
  notification: null,

  // Sidebar
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  // Modal
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),

  // Global loading
  showLoader: () => set({ isLoading: true }),
  hideLoader: () => set({ isLoading: false }),

  // Notification
  showNotification: (message, type = "info") =>
    set({ notification: { message, type } }),
  hideNotification: () => set({ notification: null }),
}));

export default useUIStore;
