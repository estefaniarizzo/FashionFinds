import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const Slice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    isLoading: false,
    error: null,
    filterProducts:[]
  },
  reducers: {
    getProductsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    },
    getProductsFilterSuccess: (state, action) =>{
      state.isLoading = false;
      state.filterProducts = action.payload;
    },
    clearRender: (state, action) =>{
      state.filterProducts = []
    },
    getProductsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getProductsStart, getProductsSuccess, getProductsFailure, getProductsFilterSuccess, clearRender } =
  Slice.actions;

export const getProducts = (gender, category) => async (dispatch) => {
  dispatch(getProductsStart());
  try {
    let url = "http://localhost:3001/products";
    if (gender && category) {
      const query = { gender, category };
      const queryString = Object.entries(query)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      url += `/search?${queryString}`;
    }
    const response = await axios.get(url);
    const allProducts = response.data.documents;
    dispatch(getProductsSuccess(allProducts));
  } catch (error) {
    dispatch(getProductsFailure(error.message));
  }
};

export const getFilterProducts = (gender, category, brand, color) => async (dispatch) => {
  dispatch(getProductsStart());
  try {
    let url = "http://localhost:3001/products";
    if ((gender && category) || (brand || color)) {
      const query = { gender, category, brand, color };
      const queryString = Object.entries(query)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      url += `/search?${queryString}`;
    }
    const response = await axios.get(url);
    const allProducts = response.data.documents;
    console.log({FIJATEESTO:category})
    dispatch(clearRender())
    dispatch(getProductsFilterSuccess(allProducts));
  } catch (error) {
    dispatch(getProductsFailure(error.message));
  }
};

export default Slice.reducer;