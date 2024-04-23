import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './app.css';
import { ProductList } from './components/products/product_list';
import logo from './components/img/99pricture.jpg';
import { DropdownMenu } from './components/DropDownMenu/DropDownMenu';

import { productsUrl } from './backendUrls/urls';
import { Reward } from './pages/rewardPage';

function App() {
    const [userId, setUserId] = useState(1);

    const handleUserChange  = (userId) => {
        setUserId(userId);
    }

    return (
        <Router>
            <div className='containerHeader'>
                <img src={logo} alt="Logo" width='200px' height='100px' />
                <DropdownMenu changeUserHandler={handleUserChange}/>
            </div>
            <div className='container'>
                <nav>
                    <ul>
                        <li><Link to="/">Product List</Link></li>
                        <li><Link to="/reward">Reward</Link></li>
                    </ul>
                </nav>
            </div>
            <div className='container'>
                <Routes>
                    <Route path="/" 
                        element={
                        <ProductList 
                            getProductListUrl={productsUrl} 
                            userId={userId}/>} />
                    <Route path="/reward" 
                        element={
                            <Reward 
                                userId={userId}
                            />
                            } />
                </Routes>
            </div>
        </Router>
    );

}

export default App;