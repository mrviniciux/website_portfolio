import {combineReducers} from "redux";


//import * as showPeople from './people/show';

function index(state = {}, action) {
    switch (action.type) {
        case 'LOADING':
            return action;
        case 'DONE_LOADING':
            return action;
      default:
        return state
    }
}


const rootReducer = combineReducers({index});

export default rootReducer;