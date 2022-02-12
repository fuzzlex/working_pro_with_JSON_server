import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Alan from '../components/Alan';
import Details from '../components/Details';
import Home from '../pages/Home';

const AppRouter = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alan" element={<Alan />} />
            <Route path="/detail" element={<Details />} />



        </Routes>


        </BrowserRouter>



    </div>


  ) 
};

export default AppRouter;
