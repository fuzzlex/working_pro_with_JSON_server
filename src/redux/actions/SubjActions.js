import axios from 'axios';
import { FILTER_CATEGORY, ADD_TO_CARD ,SEARCH,FETCH_ALL} from './blogTypes';

export const setShopActionFilter = payload => ({ type: FILTER_CATEGORY, state: payload });
export const setShopActionAddCard = (payload, id) => ({ type: ADD_TO_CARD, state:payload, id : id});
export const setShopActionSearch = (payload) => ({ type: SEARCH, state:payload });
export const setShopActionFetch = (payload) => ({ type: FETCH_ALL, state:payload });


export const fetchAllData = () =>{
  return async dispatch =>{
     await fetch(`http://localhost:5000/dersler/`)
    .then(res => res.json())
    .then(data => dispatch(setShopActionFetch(data)))
    
  }
}


export const filterCategory = (item, id) => {
  return async  dispatch => {

    const newData = item.filter(i=>{
      return i.id === id
    })
    dispatch(setShopActionFilter(newData));
  }
};

export const addCard = (id, item) => {
  return async dispatch => {
    const response = await axios.put(`http://localhost:5000/dersler/${id}`, ...item)

    dispatch(setShopActionAddCard(response))  
  }
  
}

export const searchProduct = (value) => {
  return async dispatch => {
    const response = await fetch("http://127.0.0.1:8000/api/article/")
    .then(res => res.json())
    .then(data => data)
    const newData = response?.filter(item=>{
      return item.title.toLowerCase().includes(value.toLowerCase())
    })
    dispatch(setShopActionSearch(newData))
    // console.log(newData.length)

  }
  
}


