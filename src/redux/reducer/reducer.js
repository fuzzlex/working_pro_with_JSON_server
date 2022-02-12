import { FILTER_CATEGORY , ADD_TO_CARD,SEARCH,FETCH_ALL} from '../actions/blogTypes';



const initialState = {
  productList: [],
  toAddedIds : [],
  toAddedProduct: [],
};



const Reducer = (state = initialState , action) => {


  console.log(action)
    switch (action.type) {
      case FILTER_CATEGORY:
        return {
          ...state,
          productList : action.state
        };
      case ADD_TO_CARD:
        return {
          ...state,
          productList : action.state
        };
      case SEARCH:
        return {
          ...state,
          productList : action.state
        };
        case FETCH_ALL:
          return {
            ...state,
            productList : action.state
          };
      default:
        return state;
    }
  };
  
  export default Reducer;
