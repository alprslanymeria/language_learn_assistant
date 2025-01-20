import { create } from "zustand";

const editFormStore = create((set) => ({
  formData: {
    language: '',
    input1: '',
    input2: '',
    file1: null,
    file2: null
  },
  
  setFormData: (newFormData) => set((state) => ({
    formData: { ...state.formData, ...newFormData }
  }))
}));

export default editFormStore;