import { create } from "zustand";

const editFormStore = create((set) => ({
  formData: {
    language: '',
    wordCategory: '',
    input1: '',
    input2: '',
    file1: null,
    file2: null,
    wordOptions: []
  },
  
  setFormData: (newFormData) => set((state) => ({
    formData: { ...state.formData, ...newFormData }
  }))
}));

export default editFormStore;