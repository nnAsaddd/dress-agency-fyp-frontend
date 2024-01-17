import React from "react";
import { useProductsContext } from "../context/ProductsProvider";
import { ColumnHeadings } from "../components";

const DisplayAllProducts = ({ products }) => {
  const { search, sortBy } = useProductsContext();

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "ascending") {
        return a.name.toLowerCase().localeCompare(b.name);
      } else {
        return b.name.toLowerCase().localeCompare(a.name);
      }
    });

  return (
    <div className="wrapper products-wrapper">
      <table>
        <caption>{filteredProducts.length} products in the inventory</caption>
        <tbody>
          <ColumnHeadings />
          {filteredProducts.map((product) => {
            const { _id, sku, name, color, paid, price, size, type, supplier } =
              product;
            const { name: supplierName } = supplier;
            return (
              <tr key={_id} className={`product ${paid && "row-grey"}`}>
                <td datatype="sku">{sku}</td>
                <td datatype="name">{name}</td>
                <td datatype="price">{price}</td>
                <td datatype="type">{type}</td>
                <td datatype="size">{size}</td>
                <td datatype="color">{color}</td>
                <td datatype="supplier">{supplierName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayAllProducts;
