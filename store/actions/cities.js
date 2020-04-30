export function index(cities){
    return {type:'LIST_CITIES', cities};
}

export function fetch(){
    return {type:'FETCH_CITIES'};
}

export function createSuccess(){
    return {type:'CREATE_SUCCESS', cities};
}

export function destroySuccess(){
    return {type:'DESTROY_SUCCESS', cities};
}