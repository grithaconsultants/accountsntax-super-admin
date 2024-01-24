import {
  FETCH_CLIENTS_REQUEST,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_FAILURE,
} from '@/redux/constant';


const initialState = {
  clientsList: [],
  clietnDetails: null,
  metaData: null,
  loading: false,
  error: null,
};


const clientReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_CLIENTS_REQUEST:
      return {
        clientsList: [],
        clietnDetails: null,
        metaData: null,
        loading: true,
        error: null
      };
    case FETCH_CLIENTS_SUCCESS:
      return {
        clientsList: action.payload.clientsList,
        clietnDetails: null,
        metaData: action.payload.metaData,
        loading: false,
        error: null
      };
    case FETCH_CLIENTS_FAILURE:
      return {
        clientsList: [],
        clietnDetails: null,
        metaData: null,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default clientReducer;