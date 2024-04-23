import React, { useState, useEffect } from 'react';
import './product_list.css';

import { orderUrl } from '../../backendUrls/urls';

function ProductList({ getProductListUrl, userId }) {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch(`${getProductListUrl}/all`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then(fetchedProducts => {
                console.log(fetchedProducts); // Check the actual structure of products
                const productsWithCount = fetchedProducts.map(product => {
                    // Ensure that each product has a price and it's a number
                    const price = typeof product.unitPrice === 'number' ? product.unitPrice.toFixed(2) : '0.00';
                    return { ...product, price, count: 0 }; // Include the formatted price
                });
                setProducts(productsWithCount);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, [getProductListUrl]);

    const incrementQuantity = (id) => {
        setProducts(products => products.map(product =>
            product.productId === id ? { ...product, count: product.count + 1 } : product
        ));
    };
    
    const decrementQuantity = (id) => {
        setProducts(products => products.map(product =>
            product.productId === id ? { ...product, count: product.count > 0 ? product.count - 1 : 0 } : product
        ));
    };

    const handleBuy = (id) => {
        const productToBuy = products.find(product => product.productId === id);
        if (!productToBuy) {
            console.error('Product not found!');
            return;
        }

        fetch(orderUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                productId: id,
                quantity: productToBuy.count
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Purchase successful:', data);
        })
        .catch(error => {
            console.error("Error purchasing product:", error);
            alert("not enough products in stock or an error occurred");
        });
    };

    return (
        <div>
            <p className='product-heading'>Product List {userId}</p>
            <div className='product-table-container'>
                <table className='product-table'>
                    <thead>
                        <tr className='product-row'>
                            <th>Product</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr className='product-row' key={product.productId}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>
                                    <div className="quantity-container">
                                        <button className="quantity-btn" onClick={() => decrementQuantity(product.productId)}>-</button>
                                        <span className="quantity">{product.count}</span>
                                        <button className="quantity-btn" onClick={() => incrementQuantity(product.productId)}>+</button>
                                    </div>
                                </td>
                                <td>
                                    <button className="buy-btn" onClick={() => handleBuy(product.productId)}>Buy</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export { ProductList };
