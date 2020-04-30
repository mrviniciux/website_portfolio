export function index(states){
    return {type:'LIST_STATES', states};
}

export function fetch(){
    return {type:'FETCH_STATES'};
}

export function createSuccess(){
    return {type:'CREATE_SUCCESS', states};
}

export function destroySuccess(){
    return {type:'DESTROY_SUCCESS', states};
}