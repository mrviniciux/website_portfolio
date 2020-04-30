import {combineReducers} from "redux";
import auth from './auth';
import employees from './employees';
import employee from './employee';
import companies  from './companies';
import company  from './company';
import cities  from './cities';
import states  from './states';

//import * as showPeople from './people/show';

const rootReducer = combineReducers({auth, employee, employees, companies, company, cities, states});

export default rootReducer;