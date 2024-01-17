import React, { createContext, useContext, useReducer } from "react";
import productsReducer from "../reducer/productsReducer";

const ProductsContext = createContext();

const initialState = {
  search: "",
  productID: "",
  sortBy: "ascending",
  product: {
    sku: "",
    productID: "",
  },
};

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const handleSearch = (input) => {
    dispatch({ type: "SET_SEARCH", payload: input });
  };

  const handleProductID = (productID) => {
    dispatch({ type: "SET_PRODUCT_ID", payload: productID });
  };

  const handleSortBy = (value) => {
    dispatch({ type: "SET_SORT_BY", payload: value });
  };

  const handleProduct = (value) => {
    dispatch({ type: "SET_PRODUCT_DETAILS", payload: value });
  };

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        handleSearch,
        handleProductID,
        handleSortBy,
        handleProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Custom Hook
export const useProductsContext = () => {
  return useContext(ProductsContext);
};

export default ProductsProvider;
