import { combineReducers } from 'redux';

import clientReducer from './clientReducer';
import { commonReducer } from './commonReducer';


const rootReducer: any = combineReducers({
  adminData: commonReducer.loginReducer,
  clientsData: clientReducer,
});


export default rootReducer;

