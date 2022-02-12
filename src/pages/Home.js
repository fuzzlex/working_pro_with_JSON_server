import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllData } from '../redux/actions/SubjActions';

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect( () => {
     dispatch(fetchAllData())
    }, []);

    const filteredList = useSelector(state =>state.Reducer.productList)

    const handleAlan = (newId) => {
    
      navigate("/alan", {state : {newId}})
    }
    
  

  return (
    <div className='home-container'>
            <div className='home-buttons'>
            <h1 style={{textAlign:'center',marginBottom:"5rem"}}>ÇALIŞMA PROGRAMI</h1>
    {filteredList?.map(item => (
      <Button key={item.id} onClick={() => handleAlan(item.id)}   variant="primary">{item.main}</Button>

    ))}
        
            
               </div>
        </div>
  ) 
};

export default Home;
