import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async () => {
  const { data } = await axios.get(`http://localhost:5000/api/v1/products`, {
    withCredentials: true,
  });
  console.log(data);
  return data;
};

const useFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export default useFetchProducts;
