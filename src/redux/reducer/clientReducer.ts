import {
  FETCH_CLIENTS_REQUEST,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_FAILURE,
  CLIENT_DETAILS_UPDATE,
} from '@/redux/constant';


const initialState = {
  clientID: "",
  clientDetails: null,
  clientsList: [],
  metaData: null,
  isLoading: false,
  error: null,
};


const clientReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_CLIENTS_REQUEST:
      return {
        clientID: action.payload.clientID,
        clientsList: action.payload.clientsList,
        clientDetails: action.payload.clientDetails,
        metaData: action.payload.metaData,
        isLoading: true,
        error: null
      };
    case FETCH_CLIENTS_SUCCESS:
      return {
        clientID: action.payload.clientID,
        clientsList: action.payload.clientsList,
        clientDetails: action.payload.clientDetails,
        metaData: action.payload.metaData,
        isLoading: false,
        error: null
      };
    case FETCH_CLIENTS_FAILURE:
      return {
        clientID: action.payload.clientID,
        clientsList: action.payload.clientsList,
        clientDetails: action.payload.clientDetails,
        metaData: action.payload.metaData,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default clientReducer;