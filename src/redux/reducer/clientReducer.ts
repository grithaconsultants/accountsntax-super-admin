import {
  FETCH_CLIENTS_REQUEST,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_FAILURE,
  CLIENT_DETAILS_UPDATE,
  CLIENT_ID_UPDATE
} from '@/redux/constant';


const initialState = {
  clientID: "",
  clientDetails: null,
  clientsList: [],
  metaData: null,
  loading: false,
  error: null,
};


const clientReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_CLIENTS_REQUEST:
      return {
        clientID: "",
        clientsList: [],
        clientDetails: null,
        metaData: null,
        loading: true,
        error: null
      };
    case FETCH_CLIENTS_SUCCESS:
      return {
        clientID: "",
        clientsList: action.payload.clientsList,
        clientDetails: null,
        metaData: action.payload.metaData,
        loading: false,
        error: null
      };
    case FETCH_CLIENTS_FAILURE:
      return {
        clientID: "",
        clientsList: [],
        clientDetails: null,
        metaData: null,
        loading: false,
        error: action.payload
      };
    case CLIENT_DETAILS_UPDATE:
      return {
        clientID: action.payload.clientID,
        clientsList: action.payload.clientsList,
        clientDetails: action.payload.clientDetails,
        metaData: action.payload.metaData,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

export default clientReducer;