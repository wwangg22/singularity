import { useEffect, useState } from 'react';

function ProductsPage() {
const [products, setProducts] = useState([]);

useEffect(() => {
  async function fetchProducts() {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data.products);
  }

  fetchProducts();
}, []);

return (
  <div>
    <h1>Products</h1>
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  </div>
);
}

export default ProductsPage;