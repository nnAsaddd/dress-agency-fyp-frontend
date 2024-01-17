import React from "react";
import { useProductsContext } from "../context/ProductsProvider";

const Form = () => {
  const { search, handleSearch } = useProductsContext();

  return (
    <form className="wrapper search-form" onSubmit={(e) => e.preventDefault()}>
      <input
        className="search-input"
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button className="btn" onClick={() => handleSearch("")}>
        Clear
      </button>
    </form>
  );
};

export default Form;
