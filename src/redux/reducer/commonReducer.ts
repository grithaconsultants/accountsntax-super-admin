import {
  SET_ADMIN_DATA
} from '@/redux/constant';

const userInitialState = {
  cookie: null,
  adminData: null,
  token: null,
  loading: false,
  error: null
};


const loginReducer = (state = userInitialState, action: any) => {
  switch (action.type) {
    case SET_ADMIN_DATA:
      return {
        cookie: action.payload.cookie,
        adminData: action.payload.loginData,
        token: action.payload.token,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};


export const commonReducer = {
  loginReducer,
};