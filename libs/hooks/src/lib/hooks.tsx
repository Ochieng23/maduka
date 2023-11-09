// In your custom hook file
import { useEffect, useState } from 'react';
import axios from 'axios';

const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from your API or data source
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return { products }; // Make sure to return an object with a 'products' property
};

export default useProducts;


// export const useProductId = () => {
//   const [productId, setProductuId] = useState({});
//   const [error, setError] = useState(null);

//   axios.get('');
// };
