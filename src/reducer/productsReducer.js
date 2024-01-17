const productsReducer = (state, action) => {
  if (action.type === "SET_SEARCH") {
    return { ...state, search: action.payload };
  }

  if (action.type === "SET_PRODUCT_ID") {
    return { ...state, productID: action.payload };
  }

  if (action.type === "SET_SORT_BY") {
    return { ...state, sortBy: action.payload };
  }

  if (action.type === "SET_PRODUCT_DETAILS") {
    return { ...state, product: action.payload };
  }

  return { ...state };
};

export default productsReducer;
